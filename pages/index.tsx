import Link from "next/link";
import { useMemo, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Select from "src/components/Select";
// const ShareButton = ({ postUrl = "awa" }) => {
//   const url =
//     typeof window !== "undefined"
//       ? window.location.href
//       : "https://blog.danybeltran.me/";
//   const shareUrl = encodeURIComponent(`${url}/post/${postUrl}`);
//   return (
//     <iframe
//       src={`https://www.facebook.com/plugins/share_button.php?href=${shareUrl}&layout=button&size=small&width=96&height=32&appId`}
//       width="96"
//       height="20"
//       style={{ border: "none", overflow: "hidden" }}
//       scrolling="no"
//       frameBorder="0"
//       className="-mr-7"
//       allowFullScreen={true}
//       allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//     ></iframe>
//   );
// };

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
  function addToLocalStorage(postUrl) {
    localStorage[`danybeltran-post-${postUrl}`] = "ok";
    console.log(`danybeltran-post-${postUrl}`);
    setUpdater((u) => u + 1);
  }
  function removeFromLocalStorage(postUrl) {
    delete localStorage[`danybeltran-post-${postUrl}`];
    setUpdater((u) => u + 1);
  }
  const allNotes = posts.map((post) => {
    const previewContent = `${post.content
      .split("")
      .splice(0, window.innerWidth < 400 ? 40 : 90)
      .join("")}...`;

    const clickHandler =
      typeof localStorage[`danybeltran-post-${post.url}`] === "undefined"
        ? () => addToLocalStorage(post.url)
        : () => removeFromLocalStorage(post.url);

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
      <div className="w-full md:w-1/2 lg:w-1/3 pr-4 p-3">
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
            {/* <div
              style={{
                transition: "0.12s",
              }}
              onClick={(e) => e.stopPropagation()}
              className="absolute w-2/5 top-0 left-0 w text-xs flex items-center justify-start"
            >
              <div
                style={{
                  opacity: 0.4,
                }}
                className="absolute left-0 top-0 w-8 rounded-tl-md h-7 bg-black"
              ></div>
              <button
                onClick={clickHandler}
                className="z-10 flex items-center px-1 rounded-md shadow-md focus:outline-none"
              >
                <span className="p-1 pt-1.5">{heart}</span>
              </button>
            </div> */}
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
    <div>
      <div className="w-full pt-4 px-3 flex space-x-4 items-center">
        <span>Ordenar por</span>
        <Select onChange={updateSort} className="w-48 bg-white">
          <option value="fecha">Fecha (reciente)</option>
          <option value="fecha2">Fecha (antiguo)</option>
          <option value="nombre">Nombre (a - z)</option>
          <option value="nombre2">Nombre (z - a)</option>
        </Select>
      </div>
      <div className="flex flex-wrap items-stretch">{allNotes}</div>
    </div>
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
