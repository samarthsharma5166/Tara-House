import { prisma } from "@/lib/DB.config";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req:NextRequest,res:NextResponse){
    const products = await prisma.product.findMany();
    return NextResponse.json({
        message:"Products fetched successfully",
        products
    });
}

export async function POST(req:NextRequest,res:NextResponse){
    const { name,description,price,stock,isFeatured,tags,images,category,company } = await req.json();
    const slug = slugify(name, { lower: true });
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        isFeatured,
        tags,
        images,
        category,
        company,
      },
    });
    return NextResponse.json({
       message:"Product created successfully",
       product
    });
}