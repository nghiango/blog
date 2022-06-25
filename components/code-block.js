import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
export function CodeBlock(props) {
  const match = /language-(\w+)/.exec(props.className || "");
  return !props.inline && match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div" style={darcula}>
      {props.value}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {props.value}
    </code>
  );
}
