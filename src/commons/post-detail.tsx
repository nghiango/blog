import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./code-block";
import rehypeRaw from "rehype-raw";
import React from "react";
import { PostWrapper } from "@/stores/postStore";


export function PostDetail({post}: PostWrapper) {
  return (
    <>
      <div className="card card-page">
        <div className="post__header">
          <h1 className="post__title post--padding">{post?.metaData.title}</h1>
          <div className="post__author post--padding">
            <p>
              By <span className="font-bold">{post?.metaData.author || 'Nghia Ngo'}</span>
            </p>
            <span className="text-sm">{post?.metaData.date}</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="post__image-cover"
            src={`${process.env.BASE_PATH}${post?.metaData.cover_image}`}
            alt="image-cover"
          />
        </div>
        <div className="post__body post--padding">
          <ReactMarkdown
            components={{
              code: ({ className, children, ...props }) => (
                <CodeBlock value={children} className={className} {...props} />
              ),
            }}
            rehypePlugins={[rehypeRaw]}
          >
            {post?.content || 'hello'}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
