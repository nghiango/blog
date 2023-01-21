import Head from 'next/head'
import { getProps } from '@/utils/serverUtils.service';
import { PostsWrapper } from '@/stores/postStore';
import { Card } from '@/commons/card';


export default function Home({ posts }: PostsWrapper) {
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
  return getProps('posts');
}