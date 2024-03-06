import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  res.status(200).json({ message: "TEST" });
};
