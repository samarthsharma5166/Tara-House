import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../DB/db";
import slugify from "slugify";

export async function getCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const companys = await prisma.company.findMany();
    res.status(200).json({
      success: true,
      message: "Companies fetched successfully! 🎉",
      companys,
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
}
export async function createCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body;
    const slug = slugify(name);
    const company = await prisma.company.create({
      data: {
        name,
        slug,
      },
    });
    res.status(200).json({
      success: true,
      message: "Company created successfully! 🎉",
      company,
    });
    return;
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
}
export async function deleteCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("Category id is required", 400));
  }
  try {
    const company = await prisma.company.findFirst({
      where: {
        id: +id,
      },
    });
    if (!company) {
      return next(new AppError("Category not found", 404));
    }
    await prisma.company.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Company deleted successfully! 🎉",
      company
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
}
export async function updateCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("Category id is required", 400));
  }
  try {
    const company = await prisma.company.findFirst({
      where: {
        id: +id,
      },
    });
    if (!company) {
      return next(new AppError("company not found", 404));
    }
    const { name } = req.body;
    const slug = slugify(name);
    const result = await prisma.company.update({
      where: {
        id: +id,
      },
      data: {
        name,
        slug,
      },
    });
    res.status(200).json({
      success: true,
      message: "Company updated successfully! 🎉",
      company: {
        ...result,
      },
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
}
