import fs from "fs";
import path from "path";
import matter from "gray-matter";
export const getPath = (pathName) => {
  const pathArr = pathName.split("/");
  return `posts/${pathArr[pathArr.length - 1]}`;
};

export const buildStaticPath = (pathName) => {
  const files = fs.readdirSync(path.join(pathName));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
      pathName,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const buildStaticProps = (pathName, slug) => {
  const markdownWithMeta = fs.readFileSync(
    path.join(pathName, slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
};
