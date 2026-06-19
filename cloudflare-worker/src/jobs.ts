import { Hono } from "hono";
import type { Context } from "hono";
import type { Env } from "./index";
import { requireAdmin } from "./auth";

const app = new Hono<{ Bindings: Env }>();

type JobRow = {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience: string;
  salary_range: string;
  skills: string;
  description: string;
  deadline: string | null;
  status: string;
  published: number;
  created_at: string;
  updated_at: string;
};

const toJob = (r: JobRow) => ({
  id: r.id,
  title: r.title,
  department: r.department,
  location: r.location,
  employmentType: r.employment_type,
  experience: r.experience,
  salaryRange: r.salary_range,
  skills: r.skills,
  description: r.description,
  deadline: r.deadline,
  status: r.status,
  published: r.published === 1,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const uid = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

const parseBody = async (c: Context<{ Bindings: Env }>) => {
  const b = await c.req.json().catch(() => ({}));
  return {
    title: String(b.title ?? "").trim(),
    department: String(b.department ?? "").trim(),
    location: String(b.location ?? "").trim(),
    employment_type: String(b.employmentType ?? b.employment_type ?? "Full Time").trim(),
    experience: String(b.experience ?? "").trim(),
    salary_range: String(b.salaryRange ?? b.salary_range ?? "").trim(),
    skills: String(b.skills ?? "").trim(),
    description: String(b.description ?? "").trim(),
    deadline: b.deadline ? String(b.deadline) : null,
    status: String(b.status ?? "OPEN").toUpperCase(),
    published: b.published === false ? 0 : 1,
  };
};

// ---- READ ----
app.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM jobs ORDER BY created_at DESC`,
  ).all<JobRow>();
  return c.json((results ?? []).map(toJob));
});

app.get("/open", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM jobs WHERE status = 'OPEN' AND published = 1 ORDER BY created_at DESC`,
  ).all<JobRow>();
  return c.json((results ?? []).map(toJob));
});

app.get("/archived", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM jobs WHERE status = 'ARCHIVED' ORDER BY updated_at DESC`,
  ).all<JobRow>();
  return c.json((results ?? []).map(toJob));
});

app.get("/count", async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT
       SUM(CASE WHEN status='OPEN'     AND published=1 THEN 1 ELSE 0 END) AS open,
       SUM(CASE WHEN status='ARCHIVED' THEN 1 ELSE 0 END)                 AS archived,
       SUM(CASE WHEN status='CLOSED'   THEN 1 ELSE 0 END)                 AS closed,
       COUNT(*) AS total
     FROM jobs`,
  ).first<{ open: number; archived: number; closed: number; total: number }>();
  return c.json({
    open: row?.open ?? 0,
    archived: row?.archived ?? 0,
    closed: row?.closed ?? 0,
    total: row?.total ?? 0,
  });
});

app.get("/:id", async (c) => {
  const row = await c.env.DB.prepare(`SELECT * FROM jobs WHERE id = ?`)
    .bind(c.req.param("id"))
    .first<JobRow>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json(toJob(row));
});

// ---- WRITE (admin) ----
app.post("/", requireAdmin(), async (c) => {
  const j = await parseBody(c);
  if (!j.title) return c.json({ error: "title is required" }, 400);
  const id = uid();
  await c.env.DB.prepare(
    `INSERT INTO jobs
      (id,title,department,location,employment_type,experience,salary_range,skills,description,deadline,status,published)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
  )
    .bind(
      id,
      j.title,
      j.department,
      j.location,
      j.employment_type,
      j.experience,
      j.salary_range,
      j.skills,
      j.description,
      j.deadline,
      j.status,
      j.published,
    )
    .run();
  const row = await c.env.DB.prepare(`SELECT * FROM jobs WHERE id = ?`).bind(id).first<JobRow>();
  return c.json(toJob(row!), 201);
});

app.put("/:id", requireAdmin(), async (c) => {
  const id = c.req.param("id");
  const existing = await c.env.DB.prepare(`SELECT id FROM jobs WHERE id = ?`).bind(id).first();
  if (!existing) return c.json({ error: "Not found" }, 404);
  const j = await parseBody(c);
  await c.env.DB.prepare(
    `UPDATE jobs SET
       title=?, department=?, location=?, employment_type=?, experience=?,
       salary_range=?, skills=?, description=?, deadline=?, status=?, published=?,
       updated_at=datetime('now')
     WHERE id=?`,
  )
    .bind(
      j.title,
      j.department,
      j.location,
      j.employment_type,
      j.experience,
      j.salary_range,
      j.skills,
      j.description,
      j.deadline,
      j.status,
      j.published,
      id,
    )
    .run();
  const row = await c.env.DB.prepare(`SELECT * FROM jobs WHERE id = ?`).bind(id).first<JobRow>();
  return c.json(toJob(row!));
});

app.delete("/:id", requireAdmin(), async (c) => {
  const id = c.req.param("id");
  const res = await c.env.DB.prepare(`DELETE FROM jobs WHERE id = ?`).bind(id).run();
  if (!res.success) return c.json({ error: "Delete failed" }, 500);
  return c.json({ ok: true, id });
});

export default app;
