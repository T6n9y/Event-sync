"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Modal,
  TextInput,
  Rating,
} from "@mantine/core";
import { UserReview as ReviewType } from "@/models/user-review";

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [editReview, setEditReview] = useState<ReviewType | null>(null);
  const [userName, setUserName] = useState("");
  const [eventName, setEventName] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState<Date | null>(new Date());

  // Fetch reviews on mount
  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch("/api/user-reviews");
      const data = await response.json();
      setReviews(data);
    }

    fetchReviews();
  }, []);

  // Handle creating/updating review
  const handleSaveReview = async () => {
    if (editReview) {
      // Update review
      await fetch(`/api/user-reviews/${editReview._id}`, {
        method: "PUT",
        body: JSON.stringify({
          userName,
          eventName,
          rating,
          date,
        }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Create review
      await fetch("/api/user-reviews", {
        method: "POST",
        body: JSON.stringify({
          userName,
          eventName,
          rating,
          date,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }

    setModalOpened(false);
    setUserName("");
    setEventName("");
    setRating(0);
    setDate(new Date());
    setEditReview(null);
    // Refresh the reviews list
    const response = await fetch("/api/user-reviews");
    const data = await response.json();
    setReviews(data);
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId: string) => {
    await fetch(`/api/user-reviews/${reviewId}`, {
      method: "DELETE",
    });

    const updatedReviews = reviews.filter((review) => review._id !== reviewId);
    setReviews(updatedReviews);
  };

  const openEditModal = (review: ReviewType) => {
    setEditReview(review);
    setUserName(review.userName);
    setEventName(review.eventName);
    setRating(review.rating);

    // Ensure that date is a valid Date object
    setDate(new Date(review.date)); // Ensure it's parsed correctly as a Date
    setModalOpened(true);
  };

  return (
    <>
      <Group gap="lg">
        {reviews.map((review) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={review._id}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{review.eventName}</Text>
              <Badge color="pink">Rating: {review.rating}</Badge>
            </Group>

            <Text size="sm" color="dimmed">
              Reviewed by: {review.userName}
            </Text>

            <Text size="sm" mt="sm">
              {new Date(review.date).toLocaleDateString()}
            </Text>

            <Group mt="sm">
              <Button
                onClick={() => openEditModal(review)}
                color="blue"
                radius="md"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteReview(review._id)}
                color="red"
                radius="md"
              >
                Delete
              </Button>
            </Group>
          </Card>
        ))}
        <Button
          onClick={() => setModalOpened(true)}
          color="green"
          fullWidth
          mt="md"
          radius="md"
        >
          Add New Review
        </Button>
      </Group>

      {/* Modal for Add/Edit Review */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editReview ? "Edit Review" : "Add Review"}
      >
        <TextInput
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextInput
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <Rating value={rating} onChange={(val) => setRating(val)} />
        <TextInput
          label="Date"
          value={date ? date.toLocaleDateString() : ""} // Ensure date is valid before calling toLocaleDateString
          onChange={(e) => setDate(new Date(e.target.value))}
          type="date"
        />
        <Button onClick={handleSaveReview} color="blue" fullWidth mt="md">
          {editReview ? "Save Changes" : "Add Review"}
        </Button>
      </Modal>
    </>
  );
}
