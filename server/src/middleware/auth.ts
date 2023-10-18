import { Response } from "express";
import { UserInfo } from "../server";
import { NextFunction } from "connect";

// middleware function to check if user has an active session
export const sessionCheck = (
  req: UserInfo,
  res: Response,
  next: NextFunction
) => {
  console.log("Session", req.session);
  const { user } = req.session;
  if (!user) {
    console.log("Fail");
    return res.status(401).send(req.session);
  }
  next();
};
