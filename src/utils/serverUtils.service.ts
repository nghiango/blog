import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData } from "@/stores/postStore";
import { sortByDate } from "./clientUtils.service";

export const getPath = (pathName: string) => {
  const pathArr = pathName.split("/");
  return `posts/${pathArr[pathArr.length - 1]}`;
};

export const buildStaticPath = (pathName: string) => {
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

export const buildStaticProps = (pathName: string, slug: string) => {
  
  const markdownWithMeta = fs.readFileSync(
    path.join(pathName, slug + ".md"),
    "utf-8"
  );

  const { data, content } = matter(markdownWithMeta);

  return {
    props: {
      metaData: data,
      slug,
      content,
    },
  };
};


export const getProps = (folderPath: string) => {
  // Get files from the posts dir
  const paths: string[] = [];
  retrieveAllMdFiles(path.join(folderPath), paths);

  // Get slug and frontmatter from posts
  const posts: PostData[] = paths.map((currentPath: string) => {
    const filename: string | undefined = currentPath?.split("/").pop();
    // Create slug
    const slug = filename?.replace(/.md$/, "");
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(currentPath, "utf-8");

    const matters = matter(markdownWithMeta) as any;
    return {
      slug,
      metaData: matters.data,
      link: buildLink(currentPath),
    };
  });

  return {
    props: {
      posts: posts.sort((a, b) => sortByDate(a.metaData.date, b.metaData.date)),
    },
  };
};



export const buildLink = (fullPath: string) => {
  const partPaths = fullPath.split("/");
  let link = "";
  partPaths.forEach((partPath: string, index: number) => {
    if (index) {
      link += partPath + "/";
    }
  });
  link = link.replace(/\/$/, "");
  link = link.replace(/.md$/, "");
  link = "/" + link;
  return link;
};

export const retrieveAllMdFiles = (currentPath: string, filePaths: string[]) => {
  const paths = fs.readdirSync(currentPath);
  paths.forEach((pathName) => {
    const fullPath = path.join(currentPath, pathName);
    if (fs.lstatSync(fullPath).isDirectory()) {
      retrieveAllMdFiles(path.join(currentPath, pathName), filePaths);
    } else if (isMarkdownFile(pathName)) {
      filePaths.push(path.join(currentPath, pathName));
    }
  });
};

export const isMarkdownFile = (filename: string) => {
  return filename?.endsWith(".md");
};
