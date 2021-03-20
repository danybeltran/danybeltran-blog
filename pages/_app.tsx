import Head from "next/head";
import Link from "next/link";
import "../styles/globals.css";
if (process.env.NODE_ENV === "production") {
  require("../styles/tailwind.css");
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:url" content="http://blog.danybeltran.me" />
        <meta
          property="og:description"
          content="Blog para hablar de cosas que me gustan/interesan"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/MnYGs0L/image.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dany Beltran's blog</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
