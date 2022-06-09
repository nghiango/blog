import { marked } from "marked";
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