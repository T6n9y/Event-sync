// /api/user/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import User from "@/models/user";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  await connect();
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "Authorization header missing" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Token missing" }, { status: 401 });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
