import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import userReview from "@/models/user-review";

export const GET = async () => {
  await connect();
  const reviews = await userReview.find();
  return NextResponse.json(reviews);
};

export const POST = async (req: Request) => {
  await connect();
  const { userName, eventName, rating, date } = await req.json();
  await userReview.create({ userName, eventName, rating, date });
  return NextResponse.json(
    { message: "Review created successfully" },
    { status: 201 }
  );
};
