import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';


const NavBar = () => {

  const links = [{label: 'Dashboard', href: '/'}, {label: 'Issues', href: '/issues'}]
  return (
    <nav className="flex space-x-6 px-5 items-center border-b h-14 mb-5">
      <Link href="/"><AiFillBug/></Link>
      <ul className="flex space-x-6">
        {links.map(({label, href}) => (
          <li key={label} className='text-zinc-500 hover:text-zinc-800 transition-colors'>
            <Link href={href}>{
              label
            }</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar