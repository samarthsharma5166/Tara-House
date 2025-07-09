import { prisma } from "@/lib/DB.config";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req:NextRequest,res:NextResponse){
    const { name } = await req.json();
    const slug = slugify(name, { lower: true });
    const company = await prisma.company.create({
      data: {
        name,
        slug,
      },
    });
    return NextResponse.json({
       message:"Company created successfully",
       company
    });
    
}

export async function GET(req:NextRequest,res:NextResponse){
    const companies = await prisma.company.findMany();
    return NextResponse.json({
        message:"Companies fetched successfully",
        companies
    });
}