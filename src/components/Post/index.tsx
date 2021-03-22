import React, { forwardRef } from "react";
import ShareButton from "../ShareButton";

export interface IPost {
  url: string;
  title: string;
  date: string;
  description: string;
  content: string;
  previewImage: string;
}

const Post = forwardRef((props: IPost, ref: React.ForwardedRef<any>) => (
  <div ref={ref} className="post px-2 space-y-3 md:px-32 lg:px-72 py-10">
    <h1 className="text-4xl md:text-5xl font-bold">{props.title}</h1>
    <p className="text-sm text-gray-600 flex items-center space-x-2">
      <span></span>
      {props.date}
      <ShareButton postUrl={props.url} />
    </p>
    <div dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>
));

export default Post;
