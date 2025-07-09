import { prisma } from "@/lib/DB.config";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
//create a post method to create a new category
export async function POST(req:NextRequest,res:NextResponse){
     const { name } = await req.json();
     const slug = slugify(name, { lower: true });
     const category = await prisma.category.create({
       data: {
         name,
         slug,
       },
     });
     return NextResponse.json({
        message:"Category created successfully",
        category
     });
}

export async function GET(req:NextRequest,res:NextResponse){
    const categories = await prisma.category.findMany();
    return NextResponse.json({
        message:"Categories fetched successfully",
        categories
    });
}