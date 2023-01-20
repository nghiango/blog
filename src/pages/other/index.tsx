import Head from "next/head";
import { getProps } from "../../utils/data-utils";
import React from "react";
import { Card } from "../../components/card";

export default function Page({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <div>
        {posts.map((post, index) => (
          <Card key={index} card={post}></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return getProps('posts/other');
}
