import React from 'react';
import App from 'next/app'
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SWRConfig } from 'swr';
import fetch from '../lib/fetchJson';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>HydraDev Calendars</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <CssBaseline />
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (err) => {
            console.error(err)
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp