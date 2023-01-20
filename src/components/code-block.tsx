import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa"
import React from "react";
export function CodeBlock(props) {
  const className = props.className || '';
  const match = /language-(\w+)/.exec(className);
  return !props.inline && match ? (
    <div className="code-block__block">
      <CopyToClipboard className="code-block__copy-func" text={props.value}><FaRegCopy/></CopyToClipboard>
      <SyntaxHighlighter language={match[1]} style={darcula}>{props.value}</SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {props.value}
    </code>
  );
}
