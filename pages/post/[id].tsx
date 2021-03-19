import { useEffect, useRef } from "react";
import Md from "markdown-it";
import Head from "next/head";
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
    }
  }, [postRef.current]);
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          property="og:title"
          content={post.title}
          key={`${post.title}-${Math.random()}`}
        />
      </Head>
      <div
        ref={postRef}
        className="post px-2 space-y-3 md:px-32 lg:px-72 py-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
        <p className="text-sm">El {post.date}</p>
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
