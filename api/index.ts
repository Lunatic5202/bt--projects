import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../../../../Downloads/bt-projects-main/server/_core/oauth";
import { registerStorageProxy } from "../../../../Downloads/bt-projects-main/server/_core/storageProxy";
import { appRouter } from "../../../../Downloads/bt-projects-main/server/routers";
import { createContext } from "../../../../Downloads/bt-projects-main/server/_core/context";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerStorageProxy(app);
registerOAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Vercel invokes this as a request handler — no app.listen() here.
// (Local dev still uses server/_core/index.ts, unchanged.)
export default app;
