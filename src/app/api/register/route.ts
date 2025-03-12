// /app/api/register/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  // Connect to MongoDB
  await connect();

  // Parse the request body
  const { name, email, password } = await req.json();

  // Check if a user with the given email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save the new user
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  // Remove sensitive fields before sending the response
  const { password: _password, ...userWithoutPassword } = newUser.toObject();

  return NextResponse.json(
    { message: "User registered successfully", user: userWithoutPassword },
    { status: 201 }
  );
}
