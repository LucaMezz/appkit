import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "@/config/env";
import { errorMiddleware } from "@/middleware/error.middleware";
import { notFoundMiddleware } from "@/middleware/not-found.middleware";
import { healthRoutes } from "@/modules/health/health.routes";
import { usersRoutes } from "@/modules/users/users.routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/health", healthRoutes);
app.use("/users", usersRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
