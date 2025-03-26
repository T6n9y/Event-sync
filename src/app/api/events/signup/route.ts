// /app/api/events/signup/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { eventId, title, description, date, userEmail } = await req.json();

  // Generate ICS content for the calendar event
  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtStart =
    new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EventSync//EN
BEGIN:VEVENT
UID:${eventId}
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR
  `.trim();

  // Create a nodemailer transporter using SMTP credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || "587"),
    secure: false, // upgrade later with STARTTLS if needed
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM, // e.g., 'no-reply@eventsync.com'
    to: userEmail,
    subject: `Event Signup Confirmation: ${title}`,
    text: `You have successfully signed up for ${title} on ${new Date(
      date
    ).toLocaleString()}.
Please find the attached calendar invite to add the event to your calendar.`,
    attachments: [
      {
        filename: `${title}.ics`,
        content: icsContent,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Signup successful. Email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Signup failed. Email not sent." },
      { status: 500 }
    );
  }
}
