import { HtmlHTMLAttributes } from "react";
import { FaAngleDown } from "react-icons/fa";
export default function Select(props: HtmlHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={`relative flex items-center ${props.className}`}>
      <div className="absolute right-0 py-1 pr-2">
        <FaAngleDown className="text-gray-600" />
      </div>
      <select
        {...props}
        className="px-3 font-semibold text-gray-700 appearance-none py-1 text-left border-2 border-gray-300 w-full rounded-md focus:outline-none focus:border-blue-400"
      >
        {props.children}
      </select>
    </div>
  );
}
