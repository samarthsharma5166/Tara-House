import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { authorizedRoles, isAuth } from "../middleware/middleware";

const categoryRoute = Router();

categoryRoute.get("/", getCategory);
categoryRoute.post("/", isAuth, authorizedRoles("ADMIN"), createCategory);
categoryRoute.delete("/:id", isAuth, authorizedRoles("ADMIN"), deleteCategory);
categoryRoute.put("/:id", isAuth, authorizedRoles("ADMIN"), updateCategory);

export default categoryRoute;
