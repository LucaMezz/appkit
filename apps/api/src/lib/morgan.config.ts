import morgan from "morgan";

import { env } from "@/config/env";

export const morganConfig = morgan(env.NODE_ENV === "production" ? "combined" : "dev");
