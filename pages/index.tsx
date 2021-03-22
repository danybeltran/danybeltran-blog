import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Select from "src/components/Select";
import Note from "src/components/Note";
import Nav from "src/components/Nav";

export default function Home({ posts: postsData }) {
  if (typeof window === "undefined") return [];

  const [posts, setPosts] = useState([...postsData].reverse());

  const sortBy = (
    sorting: "fecha" | "fecha2" | "nombre" | "nombre2" | "none"
  ) => {
    const pts = [...postsData].reverse();
    if (sorting === "fecha") {
      setPosts(pts);
    }
    if (sorting === "fecha2") {
      setPosts(pts.reverse());
    }
    if (sorting === "nombre") {
      pts.sort((a, b) => {
        if (b.title > a.title) {
          return -1;
        } else if (b.title < a.title) {
          return 1;
        }
        return 0;
      });
      setPosts(pts);
    }
    if (sorting === "nombre2") {
      pts.sort((a, b) => {
        if (b.title < a.title) {
          return -1;
        } else if (b.title > a.title) {
          return 1;
        }
        return 0;
      });
      setPosts(pts);
    }
  };

  const allNotes = posts.map((post) => <Note {...post} />);

  const updateSort = (e) => {
    const { target } = e;
    console.log(target?.value);
    sortBy(target?.value);
  };
  return (
    <>
      <Head>
        <meta property="og:url" content="http://blog.danybeltran.me" />
        <meta
          property="og:description"
          content="Blog para hablar de cosas que me gustan/interesan"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/MnYGs0L/image.png"
        />
        <title>Blog - danybeltran.me</title>
      </Head>
      <div className="">
        <Nav />
        <h2 className="pt-3 pb-1 border-b-2 border-gray-400 inline-block">
          Blog para hablar sobre las cosas que me gustan y algunas que quizá no
          :P
        </h2>
        <div className="w-full pt-4 flex space-x-4 items-center">
          <span>Ordenar por</span>
          <Select onChange={updateSort} className="w-36 text-sm bg-white">
            <option value="fecha">Fecha (reciente)</option>
            <option value="fecha2">Fecha (antiguo)</option>
            <option value="nombre">Nombre (a - z)</option>
            <option value="nombre2">Nombre (z - a)</option>
          </Select>
        </div>
        <div className="flex flex-wrap items-stretch">{allNotes}</div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const postData = await fetch(
    "https://danybeltran-blog-api.danybeltran.repl.co/posts"
  );
  const posts = await postData.json();
  return {
    props: {
      posts,
    },
  };
}
