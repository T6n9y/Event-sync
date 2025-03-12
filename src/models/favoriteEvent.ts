// /models/favouriteEvent.ts
import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IFavouriteEvent extends Document {
  userId: string;
  eventId: string;
  title: string;
  date: Date;
  description?: string;
}

const FavouriteEventSchema: Schema = new Schema({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const FavouriteEvent =
  models.FavouriteEvent ||
  model<IFavouriteEvent>("FavouriteEvent", FavouriteEventSchema);
export default FavouriteEvent;
