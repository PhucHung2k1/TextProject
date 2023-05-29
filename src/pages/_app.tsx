import "../styles/global.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store, wrapper } from "@/store/store";
import NProgress from "nprogress";
import { Router } from "next/router";
import ModalContainer from "@/components/Modal";

NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
  trickleSpeed: 800,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  Router.events.on("routeChangeStart", (_url) => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (_url) => {
    NProgress.done();
  });

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
        <ModalContainer />
      </Provider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
