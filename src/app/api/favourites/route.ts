// /api/favourites/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import FavouriteEvent from "@/models/favoriteEvent";

export async function GET(req: Request) {
  await connect();
  // For demonstration, using a query parameter.
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const favourites = await FavouriteEvent.find(userId ? { userId } : {});
  return NextResponse.json(favourites);
}

export async function POST(req: Request) {
  await connect();
  const { userId, eventId, title, date, description } = await req.json();
  const favourite = await FavouriteEvent.create({
    userId,
    eventId,
    title,
    date,
    description,
  });
  return NextResponse.json(
    { message: "Favourite event saved", favourite },
    { status: 201 }
  );
}

export async function DELETE(req: Request) {
  await connect();
  // Expecting an "id" query parameter to delete a specific favourite.
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  const deleted = await FavouriteEvent.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json(
      { message: "Favourite event not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "Favourite event removed" });
}
