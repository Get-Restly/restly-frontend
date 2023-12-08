import React, { type FC } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import * as commands from "@uiw/react-md-editor/commands"

type MarkdownEditorProps = {
  text: string;
  setText: (text: string) => void;
};

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const MarkdownEditor: FC<MarkdownEditorProps> = ({ text, setText }) => {
  const handleOnChange = (e?: string) => {
    setText(e ?? "");
  }
  return (
  <div className="container">
    <MDEditor value={text} onChange={handleOnChange} commands={[
      commands.codeEdit, commands.codePreview
    ]} />
  </div>);
};

export default MarkdownEditor;
