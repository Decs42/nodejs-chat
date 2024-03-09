import { Request, Response } from "express";

/**
 * Middleware
 * Primary Goal: Returns 500 and logs any error passed up by next
 */

export const errorHandler = (err: Error, _: Request, res: Response) => {
  console.error(err);
  res.status(500).send("Internal server error");
};
