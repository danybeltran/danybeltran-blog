import Head from "next/head";
import "../styles/globals.css";
if (process.env.NODE_ENV === "production") {
  require("../styles/tailwind.css");
}

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    document.getElementById("__next").classList.add("h-full");
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div>
        <div className="px-6 pt-5 pb-44 w-full h-full">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
