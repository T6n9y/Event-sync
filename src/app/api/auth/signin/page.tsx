"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  TextInput,
  Container,
  Title,
  Text,
  Paper,
  Divider,
} from "@mantine/core";
import classes from "@/styles/features.module.css"; // Adjust the import path if necessary

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title className={classes.title} align="center">
        Sign In to EventSync
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Password"
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          {error && (
            <Text color="red" mt="sm">
              {error}
            </Text>
          )}
          <Button type="submit" fullWidth mt="xl">
            Sign In
          </Button>
        </form>
        <Divider my="lg" label="Or continue with" labelPosition="center" />
        <Button
          variant="default"
          fullWidth
          mt="md"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </Button>
        <Button
          variant="default"
          fullWidth
          mt="md"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </Button>
      </Paper>
    </Container>
  );
}
