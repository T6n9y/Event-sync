// /app/api/ticketmaster/events/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";
  const size = searchParams.get("size") || "20";
  const apiKey = process.env.TICKETMASTER_API_KEY;

  // Build the Ticketmaster Discovery API URL
  const tmUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodeURIComponent(
    keyword
  )}&size=${size}`;

  const tmRes = await fetch(tmUrl);
  if (!tmRes.ok) {
    return NextResponse.json(
      { message: "Error fetching Ticketmaster events" },
      { status: 500 }
    );
  }

  const data = await tmRes.json();
  return NextResponse.json(data);
}
