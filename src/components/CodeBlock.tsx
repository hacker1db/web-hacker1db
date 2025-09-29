"use client";

import { useState } from "react";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  children,
  language,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      },
    );
  };

  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const lang = language || className?.replace("language-", "") || "text";

  return (
    <div className="relative group mb-6 rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Terminal-style header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-b border-gray-600">
        {/* Terminal dots */}
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-3 text-xs font-mono text-gray-400">
            {lang === "bash" || lang === "shell" || lang === "sh"
              ? "terminal"
              : lang}
          </div>
        </div>

        {/* Language badge and copy button */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 text-xs font-bold text-gray-300 bg-gray-700 rounded-md uppercase tracking-widest border border-gray-600">
            {lang}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 
                     bg-gray-700 hover:bg-gray-600 rounded-md transition-all duration-200 
                     opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-600
                     hover:border-gray-500 hover:text-white"
            title={copied ? "Copied!" : "Copy code"}
            type="button"
          >
            {copied ? (
              <>
                <CheckIcon className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code content with terminal-like appearance */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black">
        <pre className="!mt-0 !mb-0 !bg-transparent !border-none p-4 overflow-x-auto text-sm leading-relaxed">
          <code
            className={`${className} !bg-transparent !p-0 font-mono text-gray-100`}
          >
            {children}
          </code>
        </pre>

        {/* Subtle bottom gradient effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-20"></div>
      </div>
    </div>
  );
}
