// /api/notifications/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import Notification from "@/models/notification";

export async function POST(req: Request) {
  await connect();
  const { userId, eventId, reminderTime } = await req.json();
  const notification = await Notification.create({
    userId,
    eventId,
    reminderTime: new Date(reminderTime),
    status: "pending",
  });
  return NextResponse.json(
    { message: "Notification scheduled", notification },
    { status: 201 }
  );
}
