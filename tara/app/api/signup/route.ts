// /app/api/signup/route.ts or /pages/api/signup.ts
import { prisma } from "@/lib/DB.config";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return Response.json({ user: { id: user.id, name: user.name } });
}
