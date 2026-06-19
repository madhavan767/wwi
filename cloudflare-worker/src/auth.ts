import type { MiddlewareHandler } from "hono";
import type { Env } from "./index";

/**
 * Bearer token guard for write endpoints.
 * Header: `Authorization: Bearer <ADMIN_TOKEN>`
 */
export const requireAdmin = (): MiddlewareHandler<{ Bindings: Env }> => async (c, next) => {
  const expected = c.env.ADMIN_TOKEN;
  if (!expected) {
    return c.json({ error: "ADMIN_TOKEN not configured" }, 500);
  }
  const header = c.req.header("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || token !== expected) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
};
