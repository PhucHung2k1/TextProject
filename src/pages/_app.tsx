import "../styles/global.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store, wrapper } from "@/store/store";
import { Roboto } from "next/font/google";
import NProgress from "nprogress";
import { Router } from "next/router";
import ModalContainer from "@/components/Modal";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
  trickleSpeed: 800,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  Router.events.on("routeChangeStart", (_url: any) => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (_url: any) => {
    NProgress.done();
  });

  return (
    <>
      <Provider store={store}>
        <main className={roboto.className}>
          <Component {...pageProps} />

          <ModalContainer />
        </main>
      </Provider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
