import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  );
}
