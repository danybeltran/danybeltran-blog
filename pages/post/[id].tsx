import { useEffect, useRef } from "react";
import Md from "markdown-it";
import Head from "next/head";
import Nav from "src/components/Nav";
import Post, { IPost } from "../../src/components/Post/index";
import { addClassNameTo } from "src/utils";
const md = Md();

export default function _Post({ post }: { post: IPost }) {
  const postRef = useRef();

  useEffect(() => {
    const { current }: { current: HTMLElement } = postRef;
    if (current) {
      addClassNameTo(current, [
        /** images */
        ["img", "margin-auto my-5 shadow rounded mx-auto"],
        /** For code snippets */
        ["pre", "bg-gray-800 overflow-x-auto px-4 text-gray-200"],
        /** Tailwind doens't add any styling for blockquotes */
        [
          "blockquote",
          "pl-4 py-2 border-l-4 bg-gray-100 overflow-x-auto px-4 text-gray-700",
        ],
        /** Different sizing for headings, same font weight */
        ["h1", "text-5xl font-bold"],
        ["h2", "text-4xl font-bold"],
        ["h3", "text-3xl font-bold"],
        ["h4", "text-2xl font-bold"],
        ["h5", "text-xl font-bold"],
        ["h6", "text-lg font-bold"],
      ]);
    }
  }, [postRef.current]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          property="og:url"
          content={`http://blog.danybeltran.me/post/${post.url}`}
        />
        <meta property="og:image" content={post.previewImage} />
        <meta property="og:description" content={post.description} />
        <title>{post.title} - danybeltran</title>
      </Head>
      <Nav />
      <Post ref={postRef} {...post} />
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
  const post: IPost = await foundPost.json();
  console.log({ post });
  return {
    props: {
      post: {
        ...post,
        content: md.render(post.content),
      },
    },
  };
}
