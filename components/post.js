import Link from "next/link";
import { formatDate } from "../utils/ui-utils";

export default function Post({ post }) {
  return (
    <div className="card">
      <div className="post-date">
        Posted on {formatDate(post.frontmatter.date)}
      </div>

      <h3>{post.frontmatter.title}</h3>

      <p>{post.frontmatter.excerpt}</p>

      <Link href={`/${post.slug}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
}
