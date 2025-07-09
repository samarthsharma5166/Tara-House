import { Router } from "express";

import { getUser, logout, signIn, signUp } from "../controllers/auth.controller";
const route = Router();

route.post("/signup", signUp);

route.post("/login", signIn);

route.get("/me/:id", getUser);

route.get("/logout", logout);

export default route;
