import { Hono } from "hono";
import type { Env } from "./index";
import { requireAdmin } from "./auth";

const app = new Hono<{ Bindings: Env }>();

const FIELDS = ["company_name", "email", "phone", "linkedin", "instagram", "logo_url"] as const;

type FieldKey = (typeof FIELDS)[number];

const toCamel = (k: FieldKey) => k.replace(/_([a-z])/g, (_, ch) => ch.toUpperCase());
const fromCamel = (k: string) => k.replace(/[A-Z]/g, (ch) => "_" + ch.toLowerCase());

app.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT key, value FROM settings`).all<{
    key: string;
    value: string;
  }>();
  const out: Record<string, string> = {};
  for (const k of FIELDS) out[toCamel(k)] = "";
  for (const row of results ?? []) {
    if ((FIELDS as readonly string[]).includes(row.key)) {
      out[toCamel(row.key as FieldKey)] = row.value;
    }
  }
  return c.json(out);
});

app.put("/", requireAdmin(), async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as Record<string, unknown>;
  const stmts = [];
  for (const [k, v] of Object.entries(body)) {
    const snake = fromCamel(k);
    if (!(FIELDS as readonly string[]).includes(snake)) continue;
    stmts.push(
      c.env.DB.prepare(
        `INSERT INTO settings(key,value) VALUES(?,?)
         ON CONFLICT(key) DO UPDATE SET value=excluded.value`,
      ).bind(snake, String(v ?? "")),
    );
  }
  if (stmts.length) await c.env.DB.batch(stmts);
  return c.json({ ok: true });
});

export default app;
