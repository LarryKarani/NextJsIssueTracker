'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';


const NavBar = () => {

  const currentPath = usePathname()
  const { status, data: session } = useSession()
  const links = [{label: 'Dashboard', href: '/'}, {label: 'Issues', href: '/issues/list'}]
  return (
    <nav className="flex space-x-6 px-5 items-center border-b h-14 mb-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => (
          <li
            key={label}
            className={classnames({
              "text-zinc-900": href === currentPath,
              "text-zinc-500": href !== currentPath,
              "hover:text-zinc-800 transition-colors": true
            })}
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Box>
            <Link href="/api/auth/signout">Sign Out</Link>
          </Box>
        )}
        {status === 'unauthenticated' && (
          <Box>
            <Link href="/api/auth/signin">Sign In</Link>
          </Box>
        )}
      </Box>
    </nav>
  );
}

export default NavBar