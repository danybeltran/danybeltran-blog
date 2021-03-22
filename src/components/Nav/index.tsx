import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">
        <a className="bg-gray-800 text-gray-100 py-1 mt-2 px-4 space-x-2 rounded">
          blog.danybeltran.me
        </a>
      </Link>
    </nav>
  );
}
