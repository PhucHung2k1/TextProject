import '../styles/global.css';
import 'animate.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store, wrapper } from '@/store/store';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import ToastContainer from '@/components/Toast';
import PrevLoader from '@/components/Loading/PrevLoader';
import ModalContainer from '@/components/Modal';
import type { IMetaSEOProps } from '@/components/MetaSEO';
import MetaSEO from '@/components/MetaSEO';
import ModalMUIContainer from '@/components/Modal/ModalMUI';

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  trickleSpeed: 800,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pageDetail } = pageProps;

  Router.events.on('routeChangeStart', (_url: any) => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', (_url: any) => {
    NProgress.done();
  });

  const configMetaSeoPostDetail: IMetaSEOProps = {
    title: pageDetail?.title ?? process.env.NEXT_PUBLIC_TITLE,
    defaultMeta: {
      name: {
        description: pageDetail?.description ?? process.env.NEXT_PUBLIC_TITLE,
      },
    },
  };

  return (
    <Provider store={store}>
      <MetaSEO {...configMetaSeoPostDetail} />
      <SessionProvider session={pageProps.session}>
        <main>
          <Component {...pageProps} />
          <PrevLoader />
          <ModalContainer />
          <ModalMUIContainer />
          <ToastContainer />
        </main>
      </SessionProvider>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
