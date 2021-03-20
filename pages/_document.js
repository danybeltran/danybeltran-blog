import Document, { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <div className="px-4 py-12 h-screen">
            <nav className="fixed shadow z-10 bg-white top-0 left-0 w-full space-x-2 h-12 flex items-center px-4 select-none">
              <Link href="/">
                <span className="font-semibold text-xl cursor-pointer">
                  Dany's blog
                </span>
              </Link>
            </nav>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
