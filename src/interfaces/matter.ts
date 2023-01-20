export interface MarkDownData {
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  cover_image: string;
}

export interface MarkDown {
  data: MarkDownData;
}

export interface Post extends MarkDown {
  slug?: string;
  link: string;
}
