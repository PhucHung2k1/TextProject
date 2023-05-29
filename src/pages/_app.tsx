import "../styles/global.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  </Provider>
);

export default MyApp;
