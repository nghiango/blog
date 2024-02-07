import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa"

export function CodeBlock(props) {
    const match = /language-(\w+)/.exec(props.className || "");
    if (!props.inline && match) {
        return (
            <div className="code-block__block">
                <CopyToClipboard className="code-block__copy-func" text={props.value}><FaRegCopy/></CopyToClipboard>
                <SyntaxHighlighter language={match[1]} style={materialOceanic}>{props.value}</SyntaxHighlighter>
            </div>
        );
    }
    return (
        <code {...props} className={props.className || 'code-block__code'} >
            {props.value.toString()}
        </code>)
}
