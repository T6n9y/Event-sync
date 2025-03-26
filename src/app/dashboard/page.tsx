"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Title,
  Paper,
  Button,
  Text,
  Card,
  Group,
  SimpleGrid,
  Image,
  TextInput,
} from "@mantine/core";
import classes from "./dashboard.module.css";
import { useEventStore, Event } from "@/store/eventStore";

export default function Dashboard() {
  const router = useRouter();
  const { events, searchQuery, setSearchQuery, setLocation, fetchEvents } =
    useEventStore();

  useEffect(() => {
    // Check if the user is logged in by verifying if token and email exist
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    if (!token || !userEmail) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    // Get user's location using the Geolocation API, then fetch events
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchEvents();
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchEvents();
        }
      );
    } else {
      fetchEvents();
    }
  }, [fetchEvents, setLocation]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSearchSubmit = () => {
    fetchEvents();
  };

  const handleSignUpForEvent = async (event: Event) => {
    // Implement the event signup functionality (calendar/email integration)
    console.log("Sign up for event:", event);
  };

  return (
    <Container size={700} className={classes.wrapper} mt="xl">
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Title order={2} className={classes.title}>
          Dashboard
        </Title>
        <Text size="lg" mt="md">
          Welcome!
        </Text>

        {/* Search Bar */}
        <Group mt="md" spacing="sm">
          <TextInput
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            style={{ flex: 1 }}
          />
          <Button onClick={handleSearchSubmit}>Search</Button>
        </Group>

        <Text size="md" mt="md">
          Available Events:
        </Text>
        <SimpleGrid
          cols={2}
          spacing="md"
          mt="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          {events && events.length > 0 ? (
            events.map((event: Event) => (
              <Card
                key={event.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Card.Section>
                  <Image src={event.image} alt={event.title} height={160} />
                </Card.Section>
                <Title order={3} mt="sm">
                  {event.title}
                </Title>
                <Text mt="xs">{event.description}</Text>
                <Text size="sm" color="dimmed" mt="xs">
                  {new Date(event.date).toLocaleDateString()}
                </Text>
                <Button mt="md" onClick={() => handleSignUpForEvent(event)}>
                  Sign Up for Event
                </Button>
              </Card>
            ))
          ) : (
            <Text>No events available.</Text>
          )}
        </SimpleGrid>
      </Paper>
    </Container>
  );
}
