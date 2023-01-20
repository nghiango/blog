import Head from "next/head";
import React from "react";
import { Card } from "../components/card";
import { getProps, Post } from "../utils/data-utils";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <div>
        {(posts as Post[]).map((post, index) => (
          <Card key={index} card={post}></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return getProps('posts');
}
