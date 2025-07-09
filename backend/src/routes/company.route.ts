import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { authorizedRoles, isAuth } from "../middleware/middleware";
import { createCompany, deleteCompany, getCompany, updateCompany, } from "../controllers/company.controller";

const companyRoute = Router();

companyRoute.get("/", getCompany);
companyRoute.post("/", isAuth, authorizedRoles("ADMIN"), createCompany);
companyRoute.delete("/:id", isAuth, authorizedRoles("ADMIN"), deleteCompany);
companyRoute.put("/:id", isAuth, authorizedRoles("ADMIN"), updateCompany);

export default companyRoute;
