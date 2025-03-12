// /api/auth/register/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connect();
  const { email, password, name } = await req.json();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, name });
  return NextResponse.json(
    { message: "User registered", user },
    { status: 201 }
  );
}
