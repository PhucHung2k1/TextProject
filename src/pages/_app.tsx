import '../styles/global.css';
import '../styles/mapbox.css';
import 'animate.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store, wrapper } from '@/store/store';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import ToastContainer from '@/components/Toast';
import PrevLoader from '@/components/Loading/PrevLoader';
import type { IMetaSEOProps } from '@/components/MetaSEO';
import MetaSEO from '@/components/MetaSEO';
import { ThemeProvider, createTheme } from '@mui/material';
import DrawerRolePermission from '@/components/SalonSetting/Employee/RolePermission/LayoutDrawer.tsx/DrawerRolePermission';
import DrawerPayStructure from '@/components/SalonSetting/Employee/PayStructure/AddPayStructure/DrawerPayStructure';

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  trickleSpeed: 800,
});
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    success: {
      main: '#69B000',
    },
    error: {
      main: '#DA2036',
    },
    secondary: {
      main: '#FFFFFF',
    },
    warning: {
      main: '#F28500',
    },
    primary: {
      main: '#00BDD6',
    },
  },
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
      <ThemeProvider theme={theme}>
        <MetaSEO {...configMetaSeoPostDetail} />
        <SessionProvider session={pageProps.session}>
          <main>
            <Component {...pageProps} />
            <PrevLoader />

            <ToastContainer />
            <DrawerRolePermission />
            <DrawerPayStructure />
          </main>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
