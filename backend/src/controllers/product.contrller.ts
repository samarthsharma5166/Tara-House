import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../DB/db";
import { handleUpload } from "../utils/helper";
import {v2 as cloudinary} from 'cloudinary'



export const getSearchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search } = req.query;

  if (!search || typeof search !== "string") {
    return next(new AppError("Search query is required", 400));
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            company: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            category: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        category: true,
        company: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully! 🎉",
      products,
    });
  } catch (error) {
    console.error(error);
    next(new AppError("Internal server error", 500));
  }
};
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return next(new AppError("Invalid product ID", 400));
  }

  try {
    const product = await prisma.product.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        tags: true,
        images: true,
        category: { select: { name: true } },
        company: { select: { name: true } },
      },
    });

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    next(new AppError("Internal server error", 500));
  }
};


export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, companyId, categoryId } = req.query;
    const havemore = await prisma.product.count();
        const where: any = {};
        if (companyId) where.companyId = Number(companyId);
        if (categoryId) where.categoryId = Number(categoryId);
    const products = await prisma.product.findMany({
      take: Number(limit) || 10,
      skip: Number(page) || 0,
      where,
      include: {
        category: true,
        company: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully! 🎉",
      products,
      havemore
    });
  } catch (error) {
    console.error(error);
    next(new AppError("Internal server error", 500));
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, stock, tags, categoryId, companyId } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !tags ||
      !categoryId ||
      !companyId
    ) {
      return next(new AppError("All fields are required", 400));
    }

    // ✅ Make sure images were uploaded
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return next(new AppError("At least one image is required", 400));
    }

    // ✅ Upload images to Cloudinary
    const imageUploads = await Promise.all(
      files.map((file) => handleUpload(file.path))
    );

    // ✅ Store only the secure_url strings
    const imageUrls = imageUploads.map((img) =>
      JSON.stringify({ secure_url: img.secure_url, public_id: img.public_id })
    );

    // ✅ Create the product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        tags: JSON.parse(tags),
        images: imageUrls,
        category: { connect: { id: parseInt(categoryId) } },
        company: { connect: { id: parseInt(companyId) } },
      },
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    next(new AppError("Internal server error", 500));
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return next(new AppError("Invalid product ID", 400));
  }

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return next(new AppError("Product not found", 404));
    }

    // Optionally: Delete images from Cloudinary using public_id
    const images = existingProduct.images.map(imgStr => JSON.parse(imgStr));
    for (const img of images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    const product = await prisma.product.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      product
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    next(new AppError("Internal server error", 500));
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return next(new AppError("Invalid product ID", 400));
  }

  const { name, description, price, stock, tags, categoryId, companyId } =
    req.body;

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return next(new AppError("Product not found", 404));
    }

    // ✅ Optional: handle new image uploads
    const files = req.files as Express.Multer.File[];
    let imageUrls: string[] = existingProduct.images; // retain existing images

    if (files && files.length > 0) {
      const uploads = await Promise.all(
        files.map((file) => handleUpload(file.path))
      );
      imageUrls = uploads.map((img) =>
        JSON.stringify({ secure_url: img.secure_url, public_id: img.public_id })
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? existingProduct.name,
        description: description ?? existingProduct.description,
        price: price ? parseFloat(price) : existingProduct.price,
        stock: stock ? parseInt(stock) : existingProduct.stock,
        tags:
          typeof tags === "string"
            ? tags.split(",")
            : tags ?? existingProduct.tags,
        images: imageUrls,
        category: categoryId
          ? { connect: { id: parseInt(categoryId) } }
          : undefined,
        company: companyId
          ? { connect: { id: parseInt(companyId) } }
          : undefined,
      },
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    next(new AppError("Internal server error", 500));
  }
};