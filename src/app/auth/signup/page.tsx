"use client";
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./signup.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    // Validate that password and confirm password match
    if (password !== cpassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setErrorMsg(""); // Clear any previous error

    try {
      // Call the registration endpoint (ensure it is at /api/register)
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Using the email as the name for simplicity; you can change this as needed
        body: JSON.stringify({ name: email, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If there's an error response from the server, display it
        setErrorMsg(data.message || "Registration failed");
        return;
      }

      // Registration successful; redirect to the login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome to Event Sync!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} href="./login">
          Log In
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          mt="md"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
        {errorMsg && (
          <Text color="red" mt="sm">
            {errorMsg}
          </Text>
        )}
        <Button fullWidth mt="xl" onClick={handleSignup}>
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
