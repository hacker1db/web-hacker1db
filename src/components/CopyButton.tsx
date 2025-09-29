"use client";

import { useEffect } from "react";

export default function CopyButton() {
  useEffect(() => {
    const addCopyButtons = () => {
      // Find all code blocks that don't already have copy buttons
      const codeBlocks = document.querySelectorAll("pre:not(.copy-enhanced)");

      codeBlocks.forEach((pre) => {
        // Mark as enhanced
        pre.classList.add("copy-enhanced");

        // Create copy button
        const copyButton = document.createElement("button");
        copyButton.className = "copy-btn";
        copyButton.innerHTML = `
          <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="m5 15-3-3 3-3"></path><path d="M5 15h6"></path>
          </svg>
          <span class="copy-text">Copy</span>
        `;
        copyButton.title = "Copy code";

        // Add click handler
        copyButton.addEventListener("click", () => {
          void (async () => {
            const codeElement = pre.querySelector("code");
            const textToCopy = codeElement?.textContent || "";

            try {
              if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
              } else {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
              }

              // Update button to show success
              copyButton.innerHTML = `
              <svg class="copy-icon success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              <span class="copy-text success">Copied!</span>
            `;

              // Reset after 2 seconds
              setTimeout(() => {
                copyButton.innerHTML = `
                <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="m5 15-3-3 3-3"></path><path d="M5 15h6"></path>
                </svg>
                <span class="copy-text">Copy</span>
              `;
              }, 2000);
            } catch (err) {
              console.error("Failed to copy:", err);
            }
          })();
        });

        // Insert the button into the pre element
        (pre as HTMLElement).style.position = "relative";
        pre.appendChild(copyButton);
      });
    };

    // Run immediately and after a brief delay to catch any dynamic content
    addCopyButtons();
    const timeout = setTimeout(addCopyButtons, 100);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
