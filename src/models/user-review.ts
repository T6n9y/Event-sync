// models/user-review.ts

import mongoose from "mongoose";

const userReviewSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  eventName: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const UserReview = mongoose.model("UserReview", userReviewSchema);

export interface UserReview {
  _id: string;
  userName: string;
  eventName: string;
  rating: number;
  date: Date;
}

export default UserReview;
