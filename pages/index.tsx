import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Select from "src/components/Select";

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

  const [updater, setUpdater] = useState(0);
  const allNotes = posts.map((post) => {
    const previewContent = `${post.content
      .split("")
      .splice(0, window.innerWidth < 400 ? 40 : 90)
      .join("")}...`;

    const heart = useMemo(
      () =>
        localStorage[`danybeltran-post-${post.url}`] ? (
          <BsHeartFill className={`text-lg text-white`} />
        ) : (
          <BsHeart className={`text-lg text-white`} />
        ),
      [updater]
    );

    return (
      <div
        key={`blog-danybeltran-${post.title}-${Math.random()}`}
        className="w-full md:w-1/2 lg:w-1/3 pr-4 p-3"
      >
        <Link href={`/post/${post.url}`}>
          <div
            style={{
              transition: "0.05s",
            }}
            key={post.title.concat((Math.random() * 100).toString())}
            className="relative h-full flex border-gray-200 border w-full rounded-lg shadow-lg cursor-pointer text-gray-900"
          >
            <img
              src={post.previewImage}
              alt={`${post.title}'s preview image`}
              className="w-2/5 object-cover rounded-l-md"
            />
            <div className="px-4 py-2 relative">
              <p className="font-bold">{post.title}</p>
              <p style={{ fontSize: "0.7rem" }}>{post.date}</p>
              <p className="text-sm mb-2">{previewContent}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  const updateSort = (e) => {
    const { target } = e;
    console.log(target?.value);
    sortBy(target?.value);
  };
  return (
    <>
      <Head>
        <meta property="og:url" content="http://blog.danybeltran.me" />
      </Head>
      <div>
        <nav>
          <Link href="/">
            <a className="bg-gray-800 text-gray-100 py-1 mt-2 px-4 space-x-2 rounded">
              blog.danybeltran.me
            </a>
          </Link>
        </nav>
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
