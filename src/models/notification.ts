// /models/notification.ts
import mongoose, { Schema, Document, model, models } from "mongoose";

export interface INotification extends Document {
  userId: string;
  eventId: string;
  reminderTime: Date;
  status: string; // e.g., "pending", "sent"
}

const NotificationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  reminderTime: { type: Date, required: true },
  status: { type: String, required: true, default: "pending" },
});

const Notification =
  models.Notification ||
  model<INotification>("Notification", NotificationSchema);
export default Notification;
