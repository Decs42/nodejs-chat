import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.status(200).json({ message: "TEST" });
};
