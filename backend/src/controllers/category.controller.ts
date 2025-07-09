import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../DB/db";
import slugify from "slugify";

export async function getCategory(req:Request,res:Response,next:NextFunction){
    try {
      const categories = await prisma.category.findMany({
        orderBy: {
          id: "asc",
        }
      });
      res.status(200).json({
        success: true,
        message: "Categories fetched successfully! 🎉",
        categories,
      })
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const slug = slugify(name);
      const category = await prisma.category.create({
        data: {
          name,
          slug,
        },
      });
      res.status(200).json({
        success: true,
        message: "Category created successfully! 🎉",
        category
      })
      return;
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
}
export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  if(!id){
    return next(new AppError("Category id is required", 400));
  }
  try {
    const category = await prisma.category.findFirst({
      where: {
        id:+id
      }
    })
    if(!category){
      return next(new AppError("Category not found", 404));
    }
    await prisma.category.delete({
      where: {
        id:+id
      }
    })
    res.status(200).json({
      success: true,
      message: "Category deleted successfully! 🎉",
      category,
    });
  } catch (error:any) {
      return next(new AppError(error.message, 500));
    
  }
}
export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("Category id is required", 400));
  }
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: +id,
      },
    });
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
    const {name} = req.body;
    const slug = slugify(name);
    const result = await prisma.category.update({
      where: {
        id: +id,
      },
      data:{
        name,
        slug
      }
    });
    res.status(200).json({
      success: true,
      message: "Category updated successfully! 🎉",
      category: {
        ...result
      },
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
}