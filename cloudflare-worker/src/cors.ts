import type { MiddlewareHandler } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./index";

/**
 * Reflective CORS limited to ALLOWED_ORIGINS (comma separated env var).
 * Browser preflights are handled automatically by hono/cors.
 */
export const corsMiddleware = (): MiddlewareHandler<{ Bindings: Env }> =>
  cors({
    origin: (origin, c) => {
      const allowed = (c.env.ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      // If no explicit allowed origins are configured, allow all origins.
      if (allowed.length === 0) return "*";

      // If the request has no Origin (e.g. server-side), return the first allowed origin.
      if (!origin) return allowed[0] ?? "*";

      // Allow exact matches.
      if (allowed.includes(origin)) return origin;

      // Allow localhost variants when any localhost is configured.
      const hasLocal = allowed.some((a) => a.includes("localhost"));
      if (hasLocal && origin.includes("localhost")) return origin;

      // Otherwise do not set CORS for this origin.
      return "";
    },
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposeHeaders: ["Content-Length", "Content-Type"],
    maxAge: 86400,
    credentials: false,
  });
