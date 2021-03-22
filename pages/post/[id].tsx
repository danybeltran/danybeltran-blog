import { useEffect, useRef } from "react";
import Md from "markdown-it";
import Head from "next/head";
import Link from "next/link";
const md = Md();

export default function Post({ post }) {
  const postRef = useRef();

  useEffect(() => {
    const { current }: { current: HTMLElement } = postRef;
    if (current) {
      Array.from(current?.getElementsByTagName("img")).forEach(
        (img: HTMLImageElement) => {
          img.className = "margin-auto my-5 shadow rounded mx-auto";
        }
      );
      Array.from(current?.getElementsByTagName("pre")).forEach(
        (img: HTMLImageElement) => {
          img.className = " bg-gray-800 overflow-x-auto px-4 text-gray-200";
        }
      );
      Array.from(current?.getElementsByTagName("blockquote")).forEach(
        (blockquote: HTMLQuoteElement) => {
          blockquote.className =
            "pl-4 py-2 border-l-4 bg-gray-100 overflow-x-auto px-4 text-gray-700";
        }
      );
      Array.from(current?.querySelectorAll("h1")).forEach(
        (heading: HTMLHeadElement) => {
          heading.className = "font-bold text-5xl";
        }
      );
      Array.from(current?.querySelectorAll("h2")).forEach(
        (heading: HTMLHeadElement) => {
          heading.className = "font-bold text-4xl";
        }
      );
      Array.from(current?.querySelectorAll("h3")).forEach(
        (heading: HTMLHeadElement) => {
          heading.className = "font-bold text-3xl";
        }
      );
      Array.from(current?.querySelectorAll("h4")).forEach(
        (heading: HTMLHeadElement) => {
          heading.className = "font-bold text-2xl";
        }
      );
      Array.from(current?.querySelectorAll("h5")).forEach(
        (heading: HTMLHeadElement) => {
          heading.className = "font-bold text-xl";
        }
      );
      Array.from(current?.querySelectorAll("h6")).forEach(
        (heading: HTMLHeadElement) => {
          heading.className = "font-bold text-lg";
        }
      );
    }
  }, [postRef.current]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          property="og:url"
          content="http://blog.danybeltran.me"
          // key={`${post.title}-${Math.random()}`}
        />
        <meta
          property="og:image"
          content={post.previewImage}
          // key={`${post.title}-${Math.random()}`}
        />
        <meta
          property="og:description"
          content={post.description}
          // key={`${post.title}-${Math.random()}`}
        />
        <title>{post.title} - danybeltran</title>
        {/* <meta
          property="og:title"
          content={`${post.title} - Dany Beltran's blog`}
          key={`${post.title}-${Math.random()}`}
        /> */}
      </Head>
      <nav>
        <Link href="/">
          <a className="bg-gray-800 text-gray-100 py-1 mt-2 px-4 space-x-2 rounded">
            blog.danybeltran.me
          </a>
        </Link>
      </nav>
      <div
        ref={postRef}
        className="post px-2 space-y-3 md:px-32 lg:px-72 py-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-600">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </>
  );
}

export async function getStaticPaths(context) {
  const postsData = await fetch(
    "https://danybeltran-blog-api.danybeltran.repl.co/posts"
  );
  const posts = await postsData.json();
  return {
    paths: posts.map(({ url }) => ({
      params: {
        id: url,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postId = params.id;
  const foundPost = await fetch(
    `https://danybeltran-blog-api.danybeltran.repl.co/posts/${postId}`
  );
  const post = await foundPost.json();
  return {
    props: {
      post: {
        ...post,
        content: md.render(post.content),
      },
    },
  };
}
