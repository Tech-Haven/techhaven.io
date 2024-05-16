import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PlausibleProvider domain="techhaven.io" customDomain='https://analytics.techhaven.io' selfHosted={true} trackOutboundLinks={true} enabled={true}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
