import Link from "next/link";

export default function _Link({
  to = "https://blog.danybeltran.me",
  children,
  className = "",
}) {
  return (
    <Link href={to}>
      <a
        className={`flex items-center space-x-2 hover:underline ${className}`}
        target="_blank"
      >
        {children}
      </a>
    </Link>
  );
}
