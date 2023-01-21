import { createContext, useContext, useMemo, useState } from "react";
import React from 'react'

export interface MetaData {
  title: string;
  date: string;
  excerpt: string;
  tags: string;
  kind: string;
  author: string;
  cover_image: string;
}

export interface MarkDown {
  metaData: MetaData;
}

export interface PostData extends MarkDown {
  slug?: string;
  content?: string;
  link: string;
}

export interface PostsWrapper {
  posts: PostData[];
}

export interface PostWrapper {
  post: PostData;
}
// enum PostKind {
//   AUTOMATION = 'automation'
// }

// console.log(PostKind.AUTOMATION);

const usePostController = (posts: PostData[]) => {
  const [choosingKind, setChoosingKind] = useState<string>();
  const [postName, setPostName] = useState<string>();
  const choosingPosts = useMemo(() => {
    return posts?.filter((post: PostData) => post.metaData.kind === choosingKind);
  }, [choosingKind]);

  const currentPost = useMemo(() => {
    return posts?.find((post) => post.slug === postName);
  }, [postName]);

  return {
    posts,
    choosingPosts,
    currentPost,
    setPostName,
    setChoosingKind
  }
}

const PostContext = createContext<ReturnType<typeof usePostController>>({
  posts: [],
  choosingPosts: [],
  currentPost: undefined,
  setPostName: () => {},
  setChoosingKind: () => {},
})

interface PostProviderProps {
  posts: PostData[];
  children: React.ReactNode;
}
export const PostProvider = ({posts, children}: PostProviderProps) => (
  <PostContext.Provider value={usePostController(posts)}>
    {children}
  </PostContext.Provider>
)

export const usePost = () => useContext(PostContext);