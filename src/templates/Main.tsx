import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <header className="border-b border-gray-300">
        <div className="pb-8 pt-16">
          <h1 className="text-3xl font-bold text-gray-900">
            {AppConfig.title}
          </h1>
          <h2 className="pt-3 text-xl">{AppConfig.description}</h2>
        </div>
        <nav>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href="/permission"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Permission
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href="/manage-role"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Manage Role
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href="/store-profile"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Store Profile
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href="/salon-setting"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Salon Setting
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="content py-5 text-xl">{props.children}</main>
    </div>
  </div>
);

export { Main };
