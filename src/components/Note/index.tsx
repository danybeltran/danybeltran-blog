import Link from "next/link";
import { IPost } from "../Post";

export default function Note(props: IPost) {
  const previewContent = `${props.content
    .split("")
    .splice(0, window.innerWidth < 400 ? 40 : 90)
    .join("")}...`;

  return (
    <div
      key={`blog-danybeltran-${props.title}-${Math.random()}`}
      className="w-full md:w-1/2 lg:w-1/3 pr-4 p-3"
    >
      <Link href={`/post/${props.url}`}>
        <div
          style={{
            transition: "0.05s",
          }}
          key={props.title.concat((Math.random() * 100).toString())}
          className="relative h-full flex border-gray-200 border w-full rounded-lg shadow-lg cursor-pointer text-gray-900"
        >
          <img
            src={props.previewImage}
            alt={`${props.title}'s preview image`}
            className="w-2/5 object-cover rounded-l-md"
          />
          <div className="px-4 py-2 relative">
            <p className="font-bold">{props.title}</p>
            <p style={{ fontSize: "0.7rem" }}>{props.date}</p>
            <p className="text-sm mb-2">{previewContent}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
