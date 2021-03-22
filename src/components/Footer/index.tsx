import {
  FaCode,
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import _Link from "./link";

export default function Footer() {
  return (
    <div className="h-40 bg-gray-900 text-gray-200 p-4 absolute bottom-0 left-0 w-full">
      <div className="inline-block space-y-1">
        <_Link to="https://me.danybeltran.me">
          <FaFacebookSquare />
          <span>Dany</span>
        </_Link>
        <_Link to="https://www.instagram.com/grun_dany/">
          <FaInstagram />
          <span>grun_dany</span>
        </_Link>
        <_Link to="https://github.com/danybeltran">
          <FaGithub />
          <span>danybeltran</span>
        </_Link>
        <_Link to="https://github.com/danybeltran/danybeltran-blog">
          <FaCode />
          <span>Código fuente del blog</span>
        </_Link>
      </div>
    </div>
  );
}
