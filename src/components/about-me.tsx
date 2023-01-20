import { marked } from "marked";
import React from "react";
export function AboutMe({
    frontmatter: { title, date, cover_image, author },
    slug,
    content,
  }) {
    const htmlContent = marked.parse(content);
    return (
      <>
      
      </>
    );
  }