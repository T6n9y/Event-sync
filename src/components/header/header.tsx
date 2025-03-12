"use client";

import {
  Anchor,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import classes from "./header.module.css";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <UnstyledButton component={Link} href="/" className={classes.logo}>
            <Text fw={700}>
              eventsync
              <Text span fw={500}>
                .com
              </Text>{" "}
            </Text>
          </UnstyledButton>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor component={Link} href="/" className={classes.link}>
              Home
            </Anchor>
            <Anchor href="#" className={classes.link}>
              Find Events
            </Anchor>
            <Anchor href="#" className={classes.link}>
              Reviews
            </Anchor>
            <Anchor href="#" className={classes.link}>
              Support
            </Anchor>
          </Group>

          <Group visibleFrom="sm">
            <Button component={Link} href="/auth/login" variant="default">
              Log in
            </Button>
            <Button component={Link} href="/auth/signup">
              Sign up
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <Flex direction="column" gap={25} py="md">
            <Anchor component={Link} href="/" className={classes.link}>
              Home
            </Anchor>
            <Anchor href="#" className={classes.link}>
              Find Events
            </Anchor>
            <Anchor href="#" className={classes.link}>
              Reviews
            </Anchor>
            <Anchor href="#" className={classes.link}>
              Support
            </Anchor>
          </Flex>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md" py="md">
            <Button component={Link} href="/auth/login" variant="default">
              Log in
            </Button>
            <Button component={Link} href="/auth/signup">
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
