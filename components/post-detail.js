import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../components/code-block";
export function PostDetail({
  frontmatter: { title, date, cover_image, author },
  slug,
  content,
}) {
  return (
    <>
      <div className="card card-page">
        <div className="post__header">
          <h1 className="post__title post--padding">{title}</h1>
          <div className="post__author post--padding">
            <p>
              By <span className="font-bold">{author}</span>
            </p>
            <span className="text-sm">{date}</span>
          </div>
          <img
            className="post__image-cover"
            src={`${process.env.BASE_PATH}${cover_image}`}
            alt="image-cover"
          />
        </div>
        <div className="post__body post--padding">
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => (
                <CodeBlock value={children} className={className} {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
