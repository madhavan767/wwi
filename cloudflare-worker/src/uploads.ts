import { Hono } from "hono";
import type { Env } from "./index";

const app = new Hono<{ Bindings: Env }>();

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const uid = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

const str = (v: FormDataEntryValue | null) => (v == null ? "" : typeof v === "string" ? v : "");

/**
 * POST /upload
 * multipart/form-data:
 *   resume (File, required)
 *   fullName, email, phone (required)
 *   plus any optional applicant fields
 *
 * Public endpoint (no admin token) — this is the public job-application form.
 */
app.post("/", async (c) => {
  let form: FormData;
  try {
    form = await c.req.formData();
  } catch {
    return c.json({ error: "Invalid multipart body" }, 400);
  }

  const file = form.get("resume");
  if (!(file instanceof File)) {
    return c.json({ error: "resume file is required" }, 400);
  }
  if (file.size === 0 || file.size > MAX_BYTES) {
    return c.json({ error: "Resume must be 0–10 MB" }, 400);
  }
  if (file.type && !ALLOWED_TYPES.has(file.type)) {
    return c.json({ error: `Unsupported file type: ${file.type}` }, 400);
  }

  const fullName = str(form.get("fullName")).trim();
  const email = str(form.get("email")).trim().toLowerCase();
  const phone = str(form.get("phone")).trim();
  if (!fullName || !email || !phone) {
    return c.json({ error: "fullName, email and phone are required" }, 400);
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return c.json({ error: "Invalid email" }, 400);
  }

  const id = uid();
  const ext = (file.name.match(/\.[a-zA-Z0-9]+$/)?.[0] ?? "").toLowerCase();
  const key = `resumes/${new Date().toISOString().slice(0, 10)}/${id}-${slug(fullName)}${ext}`;

  // Stream into R2
  await c.env.RESUMES.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type || "application/octet-stream",
      contentDisposition: `inline; filename="${file.name.replace(/"/g, "")}"`,
    },
    customMetadata: { applicantEmail: email, applicantName: fullName },
  });

  // Resolve job snapshot if jobId provided
  const jobId = str(form.get("jobId")).trim() || null;
  let jobTitle: string | null = str(form.get("jobTitle")).trim() || null;
  if (jobId && !jobTitle) {
    const row = await c.env.DB.prepare(`SELECT title FROM jobs WHERE id = ?`)
      .bind(jobId)
      .first<{ title: string }>();
    jobTitle = row?.title ?? null;
  }

  await c.env.DB.prepare(
    `INSERT INTO applications
      (id, job_id, job_title, full_name, email, phone, location, linkedin, portfolio,
       education, university, graduation_year, experience, current_role, current_company,
       cover_letter, resume_key, resume_name, resume_size, resume_type, status, notes)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  )
    .bind(
      id,
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      str(form.get("location")) || null,
      str(form.get("linkedin")) || null,
      str(form.get("portfolio")) || null,
      str(form.get("education")) || null,
      str(form.get("university")) || null,
      str(form.get("graduationYear")) || null,
      str(form.get("experience")) || null,
      str(form.get("currentRole")) || null,
      str(form.get("currentCompany")) || null,
      str(form.get("coverLetter")) || null,
      key,
      file.name,
      file.size,
      file.type || "application/octet-stream",
      "NEW",
      "",
    )
    .run();

  const publicBase = (c.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");
  return c.json(
    {
      ok: true,
      id,
      resume: {
        key,
        name: file.name,
        size: file.size,
        type: file.type,
        url: publicBase ? `${publicBase}/${key}` : null,
      },
    },
    201,
  );
});

export default app;
