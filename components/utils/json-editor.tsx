"use client";
import React, { useRef, useCallback } from "react";

interface JsonEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  id?: string;
}

function highlightJson(code: string): string {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) return `<span style="color:#79b8ff">${match}</span>`; // key
        return `<span style="color:#9ecbff">${match}</span>`; // string
      }
      if (/true|false/.test(match)) return `<span style="color:#85e89d">${match}</span>`;
      if (/null/.test(match)) return `<span style="color:#f97583">${match}</span>`;
      return `<span style="color:#ffab70">${match}</span>`; // number
    }
  );
}

const sharedStyle: React.CSSProperties = {
  fontFamily: '"Fira Code", "Fira Mono", "Cascadia Code", monospace',
  fontSize: 14,
  lineHeight: "1.6",
  padding: 16,
  margin: 0,
  border: "none",
  outline: "none",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  tabSize: 2,
  boxSizing: "border-box" as const,
  width: "100%",
  minHeight: "500px",
};

export function JsonEditor({
  value,
  onChange,
  readOnly = false,
  placeholder = "",
  id,
}: JsonEditorProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const syncScroll = useCallback(() => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  return (
    <div
      className="border rounded-md overflow-hidden"
      style={{ position: "relative", background: "#1e2433" }}
    >
      {/* Syntax highlight layer */}
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{
          ...sharedStyle,
          position: "absolute",
          top: 0,
          left: 0,
          height: "500px",
          overflow: "hidden",
          pointerEvents: "none",
          color: "#e1e4e8",
          background: "transparent",
        }}
        dangerouslySetInnerHTML={{
          __html: highlightJson(value) + "\n",
        }}
      />

      {/* Actual textarea — transparent text so highlight shows through */}
      <textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onScroll={syncScroll}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        style={{
          ...sharedStyle,
          position: "relative",
          height: "500px",
          resize: "none",
          background: "transparent",
          color: "transparent",
          caretColor: "#e1e4e8",
          overflow: "auto",
        }}
      />
    </div>
  );
}
