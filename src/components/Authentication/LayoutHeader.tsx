import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export interface LayoutHeaderProps {
  children: React.ReactNode;
}

export default function LayoutHeader({ children }: LayoutHeaderProps) {
  return (
    <div className="h-screen bg-mango-gray-light-2">
      <nav className="flex h-16 items-center bg-mango-primary-blue px-3">
        <Link href="/">
          <Image
            src="/assets/images/Authentication/logoIcon.svg"
            width="120"
            height="28"
            alt="logo"
            objectFit="cover"
            className="cursor-pointer"
          />
        </Link>
      </nav>
      <div className="h-[calc(100vh-64px)]">{children}</div>
    </div>
  );
}
