import App from "next/app";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KMUTT Election 2022</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Script
        src="https://kit.fontawesome.com/a7ef51f3aa.js"
        crossOrigin="anonymous"
        id="fontawesome"
      ></Script>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
