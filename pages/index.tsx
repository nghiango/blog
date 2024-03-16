import Head from "next/head";
import { Card } from "../components/card";
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../apis/post';
import { IPost } from '../interfaces/post';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Home() {
  const params = useSearchParams();
  const searchValue = params?.get('search');

  const { isPending, data, error } = useQuery<IPost[]>(
    {
      queryKey: ['posts'],
      queryFn: () => getPosts(), staleTime: 60 * 1000
    });

  const posts: IPost[] = useMemo<IPost[]>(() => {
    if (!searchValue) return data;
    if (!data) return [];
    return data.filter((post) => post.topic === searchValue);
  }, [searchValue, data]);

  if (isPending) return <div>Loading...</div>
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