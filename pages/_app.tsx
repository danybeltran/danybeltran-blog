import Link from "next/link";
import "../styles/globals.css";
if (process.env.NODE_ENV === "production") {
  require("../styles/tailwind.css");
}

function MyApp({ Component, pageProps }) {
  return (
    <div className="px-4 py-12 h-screen">
      <nav className="fixed shadow z-10 bg-white top-0 left-0 w-full space-x-2 h-12 flex items-center px-4 select-none">
        <Link href="/">
          <span className="font-semibold text-xl cursor-pointer">
            Dany's blog
          </span>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
