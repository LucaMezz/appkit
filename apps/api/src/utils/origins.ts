import { env } from "@/config/env";

export const ALLOWED_ORIGINS = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
