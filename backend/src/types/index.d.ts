import { Request } from "express";

export type JWTUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: JWTUser;
  }
}
