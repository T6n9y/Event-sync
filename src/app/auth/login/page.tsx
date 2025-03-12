"use client";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // If response is not OK, parse the error message
        const errorData = await res.json();
        setErrorMsg(errorData.message || "Login failed");
        return;
      }

      const data = await res.json();
      // data should include { message, token, user } from your /api/auth/login route

      // Store token in localStorage (or cookies) for subsequent requests
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} href="/signup">
          Create account
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
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        {errorMsg && (
          <Text color="red" mt="sm">
            {errorMsg}
          </Text>
        )}
        <Button fullWidth mt="xl" onClick={handleSignIn}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
