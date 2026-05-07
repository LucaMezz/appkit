import { Router } from "express";

import { listUsers } from "./users.controller";

export const usersRoutes = Router();

usersRoutes.get("/", listUsers);
