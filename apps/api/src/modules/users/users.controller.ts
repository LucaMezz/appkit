import type { RequestHandler } from "express";

import { usersService } from "./users.service";

export const listUsers: RequestHandler = async (_req, res, next) => {
  try {
    const users = await usersService.list();
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
};
