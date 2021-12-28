import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { sortByDate, retrieveAllMdFiles, buildLink } from "../utils";
import { Card } from "../components/card";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
        {posts.map((post, index) => (
          <Card key={index} card={post}></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const paths = [];
  retrieveAllMdFiles(path.join("posts"), paths);

  // Get slug and frontmatter from posts
  const posts = paths.map((currentPath) => {
    const filename = currentPath.split("/").pop();
    // Create slug
    const slug = filename.replace(/.md$/, "");
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(currentPath, "utf-8");

    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
      link: buildLink(currentPath),
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
