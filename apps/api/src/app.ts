import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { ExpressAuth } from "@auth/express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "@/config/env";
import { errorMiddleware } from "@/middleware/error.middleware";
import { notFoundMiddleware } from "@/middleware/not-found.middleware";
import { healthRoutes } from "@/modules/health/health.routes";
import { usersRoutes } from "@/modules/users/users.routes";

import { db } from "./db";
import { users, accounts, sessions, verificationTokens } from "./db/schema";
import { credentialsProvider } from "./lib/auth/auth.config";

export const app = express();

app.use(helmet());

const allowedOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  "/auth",
  ExpressAuth({
    providers: [credentialsProvider],
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    session: {
      strategy: "jwt",
    },
  }),
);

app.use("/health", healthRoutes);
app.use("/users", usersRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
