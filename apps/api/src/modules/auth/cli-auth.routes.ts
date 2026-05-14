import { Router } from "express";

import {
  authorizeCli,
  exchangeCliToken,
  getCliMe,
  refreshCliToken,
  revokeCliToken,
} from "./cli-auth.controller";

export const cliAuthRoutes = Router();

cliAuthRoutes.post("/cli/authorize", authorizeCli);
cliAuthRoutes.post("/cli/token", exchangeCliToken);
cliAuthRoutes.post("/cli/refresh", refreshCliToken);
cliAuthRoutes.post("/cli/revoke", revokeCliToken);
cliAuthRoutes.get("/me", getCliMe);
