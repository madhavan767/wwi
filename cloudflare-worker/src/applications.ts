import { Hono } from "hono";
import type { Env } from "./index";
import { requireAdmin } from "./auth";

const app = new Hono<{ Bindings: Env }>();

type AppRow = {
  id: string;
  job_id: string | null;
  job_title: string | null;
  full_name: string;
  email: string;
  phone: string;
  location: string | null;
  linkedin: string | null;
  portfolio: string | null;
  education: string | null;
  university: string | null;
  graduation_year: string | null;
  experience: string | null;
  current_role: string | null;
  current_company: string | null;
  cover_letter: string | null;
  resume_key: string;
  resume_name: string;
  resume_size: number;
  resume_type: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

const toApp = (r: AppRow, publicBase: string) => ({
  id: r.id,
  jobId: r.job_id,
  jobTitle: r.job_title,
  fullName: r.full_name,
  email: r.email,
  phone: r.phone,
  location: r.location,
  linkedin: r.linkedin,
  portfolio: r.portfolio,
  education: r.education,
  university: r.university,
  graduationYear: r.graduation_year,
  experience: r.experience,
  currentRole: r.current_role,
  currentCompany: r.current_company,
  coverLetter: r.cover_letter,
  resume: {
    key: r.resume_key,
    name: r.resume_name,
    size: r.resume_size,
    type: r.resume_type,
    url: publicBase ? `${publicBase.replace(/\/$/, "")}/${r.resume_key}` : null,
  },
  status: r.status,
  notes: r.notes,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const VALID_STATUS = new Set(["NEW", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"]);

// List (admin)
app.get("/", requireAdmin(), async (c) => {
  const status = c.req.query("status");
  const limit = Math.min(Number(c.req.query("limit") ?? 200), 500);
  const offset = Math.max(Number(c.req.query("offset") ?? 0), 0);
  const sql = status
    ? `SELECT * FROM applications WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
    : `SELECT * FROM applications ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  const stmt = status
    ? c.env.DB.prepare(sql).bind(status, limit, offset)
    : c.env.DB.prepare(sql).bind(limit, offset);
  const { results } = await stmt.all<AppRow>();
  return c.json((results ?? []).map((r) => toApp(r, c.env.R2_PUBLIC_URL)));
});

// Get one (admin)
app.get("/:id", requireAdmin(), async (c) => {
  const row = await c.env.DB.prepare(`SELECT * FROM applications WHERE id = ?`)
    .bind(c.req.param("id"))
    .first<AppRow>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json(toApp(row, c.env.R2_PUBLIC_URL));
});

// Update status
app.put("/:id/status", requireAdmin(), async (c) => {
  const { status } = await c.req.json().catch(() => ({ status: "" }));
  const next = String(status ?? "").toUpperCase();
  if (!VALID_STATUS.has(next)) return c.json({ error: "Invalid status" }, 400);
  const res = await c.env.DB.prepare(
    `UPDATE applications SET status=?, updated_at=datetime('now') WHERE id=?`,
  )
    .bind(next, c.req.param("id"))
    .run();
  if (!res.success) return c.json({ error: "Update failed" }, 500);
  return c.json({ ok: true, status: next });
});

// Update notes
app.put("/:id/notes", requireAdmin(), async (c) => {
  const { notes } = await c.req.json().catch(() => ({ notes: "" }));
  await c.env.DB.prepare(`UPDATE applications SET notes=?, updated_at=datetime('now') WHERE id=?`)
    .bind(String(notes ?? ""), c.req.param("id"))
    .run();
  return c.json({ ok: true });
});

// Delete (admin) — removes R2 object too
app.delete("/:id", requireAdmin(), async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT resume_key FROM applications WHERE id = ?`)
    .bind(id)
    .first<{ resume_key: string }>();
  if (row?.resume_key) {
    await c.env.RESUMES.delete(row.resume_key).catch(() => {});
  }
  await c.env.DB.prepare(`DELETE FROM applications WHERE id = ?`).bind(id).run();
  return c.json({ ok: true, id });
});

export default app;
