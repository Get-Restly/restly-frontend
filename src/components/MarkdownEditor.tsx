import React, { useState } from "react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

type Props = {
  text: string;
};

const MarkdownEditor = (props: Props) => {
  const [text, setText] = useState(props.text);
  return <MdEditor modelValue={text} onChange={setText} language="en-US" />;
};

export default MarkdownEditor;
