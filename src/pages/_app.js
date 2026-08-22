import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>mqioman</title>
      </Head>

      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}