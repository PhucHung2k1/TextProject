import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { Button, Spin } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const { status, data } = useSession();
  console.log("🚀 ~ file: index.tsx:11 ~ Index ~ session:", status);
  console.log(data);
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  return (
    <>
      {status == "authenticated" ? (
        <Main
          meta={
            <Meta title={AppConfig.title} description={AppConfig.description} />
          }
        >
          {data?.user ? (
            <Button type="default" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Button type="default" onClick={() => signIn()}>
              Sign in
            </Button>
          )}
        </Main>
      ) : (
        <div className="w-screen h-screen bg-sky-100 flex items-center justify-center">
          <Spin></Spin>
        </div>
      )}
    </>
  );
};

export default Index;
