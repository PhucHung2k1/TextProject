import '../styles/global.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store, wrapper } from '@/store/store';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import ToastContainer from '@/components/Toast';
import PrevLoader from '@/components/Loading/PrevLoader';
import ModalContainer from '@/components/Modal';

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  trickleSpeed: 800,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  Router.events.on('routeChangeStart', (_url: any) => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', (_url: any) => {
    NProgress.done();
  });

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <main>
          <Component {...pageProps} />
          <PrevLoader />
          <ModalContainer />
          <ToastContainer />
        </main>
      </SessionProvider>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
