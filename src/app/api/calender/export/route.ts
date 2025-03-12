// /api/calendar/export/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import FavouriteEvent from "@/models/favouriteEvent";
import { createEvents } from "ics";

export async function GET(req: Request) {
  await connect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const events = await FavouriteEvent.find(userId ? { userId } : {});

  const icsEvents = events.map((ev) => {
    const evDate = new Date(ev.date);
    return {
      title: ev.title,
      start: [
        evDate.getFullYear(),
        evDate.getMonth() + 1,
        evDate.getDate(),
        evDate.getHours(),
        evDate.getMinutes(),
      ],
      duration: { hours: 1 },
      description: ev.description || "",
    };
  });

  return new Promise((resolve) => {
    createEvents(icsEvents, (error, value) => {
      if (error) {
        resolve(NextResponse.json({ message: error.message }, { status: 500 }));
      } else {
        resolve(
          new NextResponse(value, {
            headers: {
              "Content-Type": "text/calendar",
              "Content-Disposition": "attachment; filename=calendar.ics",
            },
          })
        );
      }
    });
  });
}
