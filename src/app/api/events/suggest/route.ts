// /app/api/events/suggest/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // ----- Ticketmaster API Call -----
    const ticketmasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&countryCode=US`;
    const ticketmasterRes = await fetch(ticketmasterUrl);
    const ticketmasterData = await ticketmasterRes.json();
    const ticketmasterEvents = ticketmasterData._embedded?.events || [];

    const mappedTicketmasterEvents = ticketmasterEvents.map((event: any) => ({
      id: event.id,
      title: event.name,
      description: event.info || event.pleaseNote || "No description available",
      date: event.dates?.start?.dateTime || new Date().toISOString(),
      source: "Ticketmaster",
      image:
        event.images && event.images.length > 0
          ? event.images[0].url
          : "https://via.placeholder.com/300x200?text=No+Image",
    }));

    // ----- Eventbrite API Call -----
    const eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?token=${process.env.EVENTBRITE_API_KEY}&location.address=New+York`;
    const eventbriteRes = await fetch(eventbriteUrl);
    const eventbriteData = await eventbriteRes.json();
    const eventbriteEvents = eventbriteData.events || [];

    const mappedEventbriteEvents = eventbriteEvents.map((event: any) => ({
      id: event.id,
      title: event.name.text,
      description: event.description?.text || "No description available",
      date: event.start?.local || new Date().toISOString(),
      source: "Eventbrite",
      image:
        event.logo && event.logo.url
          ? event.logo.url
          : "https://via.placeholder.com/300x200?text=No+Image",
    }));

    // Combine events from both sources
    const combinedEvents = [
      ...mappedTicketmasterEvents,
      ...mappedEventbriteEvents,
    ];

    return NextResponse.json(combinedEvents);
  } catch (error) {
    console.error("Error fetching real events:", error);
    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}
