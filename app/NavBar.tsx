"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";


const NavBar = () => {
  return (
    <nav className=" border-b px-5 py-3 mb-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
   const currentPath = usePathname();
   const links = [
     { label: "Dashboard", href: "/" },
     { label: "Issues", href: "/issues/list" },
   ];
  return (
    <ul className="flex space-x-6">
      {links.map(({ label, href }) => (
        <li
          key={label}
          className={classnames({
            "nav-link": true,
            "!text-zinc-900": href === currentPath,
            
          })}
        >
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Skeleton width='3rem' />;
  }

  if (status === "unauthenticated") {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Sign In
      </Link>
    );
  }
  return (
    <Box>
        <Box>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session!.user!.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <Text size="2">{session!.user!.email}</Text>
              <DropdownMenu.Item>
                <Link className="nav-link" href="/api/auth/signout">Sign Out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
    </Box>
  );
}

export default NavBar;
