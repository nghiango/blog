import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../components/code-block";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export function PostDetail({
                               frontmatter: {title, date, cover_image, author},
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
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code: ({node, inline, className, children, ...props}) => (
                                <CodeBlock value={children} className={className} {...props} />
                            ),
                            p: ({node, inline, className, children, ...props}) => (
                                <p {...props}  className={`${className} code-block__paragraph`}>{children}</p>
                            ),
                            a: ({node, inline, className, children, ...props}) => (
                                <a {...props} className={`${className} code-block__link`}>{children}</a>
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
