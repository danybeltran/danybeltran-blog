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
        <meta
          property="og:description"
          content="Blog para hablar de cosas que me gustan/interesan"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/MnYGs0L/image.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Blog - danybeltran.me</title>
      </Head>
      <>
        <div className="px-6 py-5 h-screen w-full">
          {/* <nav className="fixed shadow z-10 bg-white top-0 left-0 w-full space-x-2 h-12 flex items-center px-4 select-none">
            <Link href="/">
              <span className="font-semibold text-xl cursor-pointer">
                Inicio
              </span>
            </Link>
          </nav> */}
          <Component {...pageProps} />
        </div>
      </>
    </>
  );
}

export default MyApp;
