// /api/events/[eventid]/share/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import Event from "@/models/event";

export async function GET(
  req: Request,
  { params }: { params: { eventid: string } }
) {
  await connect();
  const event = await Event.findById(params.eventid);
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  // Ensure NEXT_PUBLIC_APP_URL is set in your environment variables.
  const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/events/${event._id}`;
  return NextResponse.json({ shareLink });
}
