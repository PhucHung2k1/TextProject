import React from 'react';

export interface LayoutAuthenProps {
  children: React.ReactNode;
}

export default function LayoutAuthen({ children }: LayoutAuthenProps) {
  return (
    <div
      className="flex h-screen w-full items-center  justify-start bg-cover  bg-center bg-no-repeat pl-72"
      style={{
        backgroundImage: `url('/assets/images/Authentication/image_bg.png')`,
      }}
    >
      {children}
    </div>
  );
}
