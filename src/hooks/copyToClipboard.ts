import React, { useEffect } from "react";

const useCopyToClipboard = (tutorialContent: string) => {
  useEffect(() => {
    // Function to copy text
    const copyText = (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    };

    // Click event handler
    const handleCopyClick = (e: Event) => {
      let element = e.target as HTMLElement;
      // Traverse up to find the 'pre' element
      while (element && element.tagName !== "PRE") {
        if (element.parentElement) {
          element = element.parentElement;
        } else {
          break;
        }
      }

      // Once the 'pre' element is found, find the 'span.code-block' within it
      if (element) {
        const codeBlockSpan = element.querySelector("span.code-block");
        const textToCopy = codeBlockSpan ? codeBlockSpan.textContent : "";
        copyText(textToCopy || "");
      }
    };

    // Function to add click listeners to copy buttons
    const addClickListeners = () => {
      const codeBlock = document.querySelectorAll(
        "article#md-editor-rt-preview > pre",
      );
      codeBlock.forEach((button) => {
        button.addEventListener("click", handleCopyClick);
      });
    };

    // Initial setup
    addClickListeners();

    // Cleanup
    return () => {
      const preTags = document.querySelectorAll(
        "article#md-editor-rt-preview > pre",
      );
      preTags.forEach((button) => {
        button.removeEventListener("click", handleCopyClick);
      });
    };
  }, [tutorialContent]);
};

export default useCopyToClipboard;
