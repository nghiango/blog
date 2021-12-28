import fs from "fs-extra";
import path from "path";

export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

export const buildLink = (fullPath) => {
  const partPaths = fullPath.split("/");
  let link = "";
  partPaths.forEach((partPath, index) => {
    if (index) {
      link += partPath + "/";
    }
  });
  link = link.replace(/\/$/, "");
  link = link.replace(/.md$/, "");
  link = "/" + link;
  return link;
};

export const retrieveAllMdFiles = (currentPath, files) => {
  const paths = fs.readdirSync(currentPath);
  paths.forEach((pathName) => {
    const fullPath = path.join(currentPath, pathName);
    if (fs.lstatSync(fullPath).isDirectory()) {
      retrieveAllMdFiles(path.join(currentPath, pathName), files);
    } else if (isMarkdownFile(pathName)) {
      files.push(path.join(currentPath, pathName));
    }
  });
};

export const isMarkdownFile = (filename) => {
  return filename?.endsWith(".md");
};
