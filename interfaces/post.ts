export interface IPost {
  frontmatter: {
    title?: string;
    date?: string;
    cover_image?: string;
    excerpt?: string;
    tag?: string;
    author?: string;
    [key: string]: any;
  };
  topic: string;
  link: string;
  slug: string;
  content?: string;
}