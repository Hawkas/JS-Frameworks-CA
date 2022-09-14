import Layout from '@AppShell/Layout';
import { FormModal, formModalSettings } from '@components/Contact/FormModal';
import { ColorScheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { pokemonTheme } from '@styles/themeOverride';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>PokemonTCG API Test</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider theme={pokemonTheme} withGlobalStyles withNormalizeCSS>
        <ModalsProvider
          modals={{
            contact: FormModal,
          }}
          modalProps={formModalSettings}
        >
          <NotificationsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
