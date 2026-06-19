import { Hono } from "hono";
import { corsMiddleware } from "./cors";
import jobs from "./jobs";
import applications from "./applications";
import upload from "./uploads";
import settings from "./settings";

export type Env = {
  DB: D1Database;
  RESUMES: R2Bucket;
  KV: KVNamespace;
  ALLOWED_ORIGINS: string;
  R2_PUBLIC_URL: string;
  ADMIN_TOKEN: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", corsMiddleware());

app.get("/", (c) =>
  c.json({
    name: "wwi-careers-api",
    status: "ok",
    endpoints: [
      "GET    /health",
      "GET    /jobs",
      "GET    /jobs/open",
      "GET    /jobs/archived",
      "GET    /jobs/count",
      "GET    /jobs/:id",
      "POST   /jobs               (admin)",
      "PUT    /jobs/:id           (admin)",
      "DELETE /jobs/:id           (admin)",
      "POST   /upload             (public, multipart)",
      "GET    /applications       (admin)",
      "GET    /applications/:id   (admin)",
      "PUT    /applications/:id/status  (admin)",
      "PUT    /applications/:id/notes   (admin)",
      "DELETE /applications/:id   (admin)",
      "GET    /settings",
      "PUT    /settings           (admin)",
    ],
  }),
);

app.get("/health", (c) => c.json({ ok: true, time: new Date().toISOString() }));

app.route("/jobs", jobs);
app.route("/applications", applications);
app.route("/upload", upload);
app.route("/settings", settings);

app.notFound((c) => c.json({ error: "Not found", path: c.req.path }, 404));

app.onError((err, c) => {
  console.error("worker error", err);
  return c.json({ error: err.message || "Internal error" }, 500);
});

export default app;
