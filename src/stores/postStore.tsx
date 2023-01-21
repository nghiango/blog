import Post from "@/commons/post";
import { createContext, useContext, useMemo, useState } from "react";

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

export interface Post extends MarkDown {
  slug?: string;
  content?: string;
  link: string;
}
enum PostKind {
  AUTOMATION = 'automation'
}
const usePostController = (posts: Post[]) => {
  const [choosingKind, setChoosingKind] = useState<PostKind>();
  const [postName, setPostName] = useState<string>();
  const choosingPosts = useMemo(() => {
    return posts?.filter((post: Post) => post.metaData.kind === choosingKind);
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
  posts: Post[];
  children: React.ReactNode;
}
export const PostProvider = ({posts, children}: PostProviderProps) => (
  <PostContext.Provider value={usePostController(posts)}>
    {children}
  </PostContext.Provider>
)

export const usePost = () => useContext(PostContext);