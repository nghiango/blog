import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import { MarkDown, Post } from "@/stores/postStore";
export const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY';

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

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
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
  const posts: Post[] = paths.map((currentPath: string) => {
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

export const formatDate = (date: string, format = DEFAULT_DATE_FORMAT) => {
  return dayjs(date).format(format);
}

export const sortByDate = (date1: string, date2: string): any => {
  return dayjs(date2).toDate().getTime() - dayjs(date1).toDate().getTime();
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
