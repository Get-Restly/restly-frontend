import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer = (props: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      className="prose prose-p:leading-relaxed mt-1 w-full break-words"
      remarkPlugins={[remarkGfm]}
      // components={{
      //   // open links in new tab
      //   a: (props) => (
      //     <a {...props} target="_blank" rel="noopener noreferrer" />
      //   ),
      // }}
    >
      {props.content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
