
import { PostWrapper } from "@/stores/postStore";
import { formatDate } from "@/utils/clientUtils.service";
import Link from "next/link";
import React from "react";

export default function Post({ post }: PostWrapper) {
  return (
    <div className="card">
      <div className="post-date">
        Posted on {formatDate(post.metaData.date)}
      </div>

      <h3>{post.metaData.title}</h3>

      <p>{post.metaData.excerpt}</p>

      <Link href={`/${post.slug}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
}
