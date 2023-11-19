"use client";

import React from "react";
import { Button } from "flowbite-react";

const ActiveTab = (props: any) => (
  <Button color="blue" className="focus:ring-1 focus:ring-gray-200" {...props}>
    {props.children}
  </Button>
);

const InactiveTab = (props: any) => (
  <Button
    color="gray"
    className="hover:text-gray-900 focus:ring-1 focus:ring-gray-200"
    {...props}
  >
    {props.children}
  </Button>
);

const MarkdownPreviewSwitcher = () => {
  const [isMarkdown, setIsMarkdown] = React.useState(true);

  return (
    <Button.Group>
      {isMarkdown ? (
        <ActiveTab onClick={() => setIsMarkdown(true)}>Markdown</ActiveTab>
      ) : (
        <InactiveTab onClick={() => setIsMarkdown(true)}>Markdown</InactiveTab>
      )}
      {!isMarkdown ? (
        <ActiveTab onClick={() => setIsMarkdown(false)}>Preview</ActiveTab>
      ) : (
        <InactiveTab onClick={() => setIsMarkdown(false)}>Preview</InactiveTab>
      )}
    </Button.Group>
  );
};

export default MarkdownPreviewSwitcher;
