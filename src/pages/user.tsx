import React from "react";
import { User } from "@/services/user.services/user.interface";
import { UserServices } from "@/services/user.services/user.services";
import { Button, Popover } from "antd";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useAppDispatch } from "@/store/hook";
import { showModal, setModalContent } from "@/store/modal/modalSlice";

interface UserPageProps {
  baseUrl: string;
  userList: User[];
}

function UserPage({ userList }: UserPageProps) {
  const router = useRouter();
  const dispath = useAppDispatch();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      {/* <header className="absolute inset-x-0 top-0 z-50"></header> */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Demo fetch all users from API. Using Tailwind and Ant Design.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              List User
            </h1>
            <div className="flex flex-row items-center justify-center space-x-4">
              <Button
                onClick={() => {
                  dispath(
                    setModalContent(
                      <>
                        <h1>aaaaaa</h1>
                      </>
                    )
                  );
                  dispath(showModal());
                }}
              >
                Show Modal
              </Button>
              <Button>Show Toast</Button>
              <Button>Fetch User</Button>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <ul className="space-y-1 px-20 pt-5 text-gray-500 list-inside">
              {userList?.length ? (
                <>
                  {userList.map((user) => (
                    <li key={user.id} className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <Popover
                        placement="topLeft"
                        title={user.name}
                        content={user.phone}
                      >
                        <span>{user.name}</span>
                      </Popover>
                    </li>
                  ))}
                </>
              ) : (
                <p>No users found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (_) => {
  const userServices = new UserServices();
  let userList = [];
  try {
    const { data } = await userServices.fetchUser();
    if (data) {
      userList = data;
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      userList,
      fallback: true,
    },
  };
};

export default UserPage;
