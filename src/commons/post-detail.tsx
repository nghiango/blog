import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./code-block";
import rehypeRaw from "rehype-raw";
import React from "react";
import { PostData } from "@/stores/postStore";
import styled from "styled-components";

const PostDetailContainer = styled.div`

`
export function PostDetail({metaData, content}: PostData) {

  return (
      <PostDetailContainer>
        <div className="post__header">
          <h1 className="post__title post--padding">{metaData.title}</h1>
          <div className="post__author post--padding">
            <p>
              By <span className="font-bold">{metaData.author || 'Nghia Ngo'}</span>
            </p>
            <span className="text-sm">{metaData.date}</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="post__image-cover"
            src={`${process.env.BASE_PATH}${metaData.cover_image}`}
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
            {content || 'hello'}
          </ReactMarkdown>
        </div>
      </PostDetailContainer>
  );
}
