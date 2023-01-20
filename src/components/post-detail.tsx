import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./code-block";
import rehypeRaw from "rehype-raw";
import React from "react";
export function PostDetail({
  frontmatter: { title, date, cover_image, author },
  content,
}) {
  return (
    <>
      <div className="card card-page">
        <div className="post__header">
          <h1 className="post__title post--padding">{title}</h1>
          <div className="post__author post--padding">
            <p>
              By <span className="font-bold">{author || 'Nghia Ngo'}</span>
            </p>
            <span className="text-sm">{date}</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="post__image-cover"
            src={`${process.env.BASE_PATH}${cover_image}`}
            alt="image-cover"
          />
        </div>
        <div className="post__body post--padding">
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => (
                <CodeBlock value={children} className={className} {...props} />
              ),
            }}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
