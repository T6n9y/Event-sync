"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Text,
  Image,
  Loader,
  Container,
  Title,
  SimpleGrid,
} from "@mantine/core";

interface TicketmasterEvent {
  id: string;
  name: string;
  dates: {
    start: { localDate: string; localTime?: string };
  };
  images: { url: string }[];
  url: string;
}

export default function TicketmasterEvents() {
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from your Ticketmaster proxy API
  useEffect(() => {
    fetch("/api/ticketmaster/events")
      .then((res) => res.json())
      .then((data) => {
        if (data._embedded && data._embedded.events) {
          setEvents(data._embedded.events);
        } else {
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  // Call favourites API when user clicks "Favourite"
  const handleFavourite = async (event: TicketmasterEvent) => {
    const response = await fetch("/api/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "dummyUserId", // Replace with the authenticated user's ID
        eventId: event.id,
        title: event.name,
        date: new Date(event.dates.start.localDate).toISOString(),
        description: event.url,
      }),
    });
    if (response.ok) {
      alert("Event added to favourites!");
    } else {
      alert("Error adding event to favourites.");
    }
  };

  if (loading) return <Loader />;

  return (
    <Container my="xl">
      <Title order={2} align="center" mb="lg">
        Upcoming Events
      </Title>
      <SimpleGrid cols={5} spacing="md">
        {events.map((event) => (
          <Card key={event.id} shadow="sm" p="lg">
            {event.images && event.images.length > 0 && (
              <Card.Section>
                <Image
                  src={event.images[0].url}
                  alt={event.name}
                  height={160}
                />
              </Card.Section>
            )}
            <Text weight={500} size="lg" mt="md">
              {event.name}
            </Text>
            <Text size="sm" color="dimmed">
              {event.dates.start.localDate} {event.dates.start.localTime || ""}
            </Text>
            <Button mt="md" onClick={() => handleFavourite(event)}>
              Favourite
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
