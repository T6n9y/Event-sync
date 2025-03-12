"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Title, Paper, Button, Text } from "@mantine/core";
import classes from "./dashboard.module.css"; // Adjust if needed

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login
      router.push("/login");
    } else {
      // Optionally, you can fetch user data or decode token here
      setUser({ email: "example@example.com" }); // Replace with real data
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container size={700} className={classes.wrapper} mt="xl">
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Title order={2} className={classes.title}>
          Dashboard
        </Title>
        <Text size="lg" mt="md">
          Welcome, {user.email}!
        </Text>
        <Button color="red" mt="xl" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
}
