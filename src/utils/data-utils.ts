import matter from "gray-matter";
import path from "path";
import fs from "fs-extra";
import { retrieveAllMdFiles, buildLink } from ".";
import { sortByDate } from "./date-utils";
import { Post, MarkDown } from "../interfaces";

export const getProps = (folderPath: string) => {
    // Get files from the posts dir
    const paths: string[] = [];
    retrieveAllMdFiles(path.join(folderPath), paths);
  
    // Get slug and frontmatter from posts
    const posts: Post[] = paths.map((currentPath: string) => {
      const filename: string | undefined = currentPath?.split("/").pop();
      // Create slug
      const slug = filename?.replace(/.md$/, "");
      // Get frontmatter
      const markdownWithMeta = fs.readFileSync(currentPath, "utf-8");
  
      const matters = matter(markdownWithMeta) as unknown as MarkDown;
      return {
        slug,
        data: matters.data,
        link: buildLink(currentPath),
      };
    });
  
    return {
      props: {
        posts: posts.sort((a, b) => sortByDate(a.data.date, b.data.date)),
      },
    };
  };