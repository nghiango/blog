import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { buildLink, retrieveAllMdFiles, sortByDate } from '../../../utils';

const paths: string[] = [];
retrieveAllMdFiles(path.join("posts"), paths);
const posts = paths.map((currentPath) => {
  const parts = currentPath.split("/");
  const filename = parts.pop() as string;
  const slug = filename.replace(/.md$/, "");
  const markdownWithMeta = fs.readFileSync(currentPath, "utf-8");

  const { data: frontmatter } = matter(markdownWithMeta);
  return {
    slug,
    frontmatter,
    topic: parts.pop(),
    link: buildLink(currentPath),
  };
});

export async function GET(request: Request) {
  return Response.json({ posts: posts.sort(sortByDate) });
}