// /models/event.ts
import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: Date;
  description?: string;
  location?: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  location: { type: String },
});

const Event = models.Event || model<IEvent>("Event", EventSchema);
export default Event;
