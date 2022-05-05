import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { SessionProvider } from 'next-auth/react'
import {ChakraProvider, ColorModeProvider} from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps)
{
  return (
    <>
        <ChakraProvider>
            <SessionProvider session={pageProps.session}>
                 <Layout>
                     <Component {...pageProps} />
                 </Layout>
            </SessionProvider>
        </ChakraProvider>
    </>
  )
}

export default MyApp;