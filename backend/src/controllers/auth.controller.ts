import { NextFunction, Request, Response } from "express";
import { prisma } from "../DB/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
        name,
      },
    });

    if (user) next(new AppError("user already exists", 400));
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });
    res.status(200).json({
      message: "user created",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error:any) {
     return next(new AppError(error.message, 500));
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if(!user) return next(new AppError("user not found", 404));
    const comparePassword = await bcrypt.compare(password, user?.password!);
    if (!comparePassword){
       next(new AppError("invalid credentials", 401));
      return;
    }
      

    const token = jwt.sign(
      { id: user?.id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET!
    );
    const newUser = {
      id: user?.id,
      name:user?.name,
      email: user?.email,
      role: user?.role,
    };
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as "none", // crucial for cross-site cookies
    };
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "user logged in",
      user: newUser,
    });
  } catch (error:any) {
     return next(new AppError(error.message, 500));
  }
};


export const getUser =  async (req:Request, res:Response, next:NextFunction) => {
   try {
     const userId = +req.params.id;
     const user = await prisma.user.findFirst({
       where: {
         id: userId,
       },
     });
     res.status(200).json({
       success: true,
       message: "User fetched successfully! 🎉",
       user,
     });
     return;
   } catch (error:any) {
     return next(new AppError(error.message, 500));
   }
 };

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "user logged out",
  });
};