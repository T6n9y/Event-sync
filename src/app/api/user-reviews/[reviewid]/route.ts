import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import userReview from "@/models/user-review";

export const GET = async (
  req: Request,
  { params }: { params: { reviewid: string } }
) => {
  await connect();
  const review = await userReview.findById(params.reviewid);
  if (!review) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }
  return NextResponse.json(review);
};

export const PUT = async (
  req: Request,
  { params }: { params: { reviewid: string } }
) => {
  await connect();
  const { userName, eventName, rating, date } = await req.json();
  await userReview.findByIdAndUpdate(params.reviewid, {
    userName,
    eventName,
    rating,
    date,
  });
  return NextResponse.json({ message: "Review updated successfully" });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { reviewid: string } }
) => {
  await connect();
  const { reviewid } = await params;
  const deletedReview = await userReview.findByIdAndDelete(reviewid);
  if (!deletedReview) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Review deleted successfully" });
};
