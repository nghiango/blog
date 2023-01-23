import Head from "next/head";
import React from "react";
import { PostData, PostsWrapper } from "@/stores/postStore";
import { Card } from "@/commons/card";
import { getProps } from "@/utils/serverUtils.service";

export default function Page({ posts }: PostsWrapper) {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <div>
        {posts.map((post: PostData, index: number) => (
          <Card key={index} card={post}></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return getProps('posts/info');
}
