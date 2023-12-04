"user client";

import React, { type FC } from "react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

type MarkdownEditorProps = {
  text: string;
  setText: (text: string) => void;
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ text, setText }) => {
  return <MdEditor modelValue={text} onChange={setText} language="en-US" />;
};

export default MarkdownEditor;
