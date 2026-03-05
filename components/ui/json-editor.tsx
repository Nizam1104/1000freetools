"use client";

import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css";

interface JsonEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  id?: string;
}

const editorStyle = {
  fontFamily: '"Fira Code", "Fira Mono", monospace',
  fontSize: 14,
  minHeight: "500px",
  maxHeight: "500px",
  overflow: "auto",
  backgroundColor: "transparent",
};

export function JsonEditor({ value, onChange, readOnly = false, placeholder = "", id }: JsonEditorProps) {
  return (
    <div className="border rounded-md bg-muted/50 overflow-hidden">
      <Editor
        value={value}
        onValueChange={onChange || (() => {})}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages.json, "json")
        }
        padding={16}
        style={editorStyle}
        className="w-full"
        textareaClassName="w-full outline-none resize-none"
        disabled={readOnly}
      />
      {id && <input type="hidden" id={id} value={value} readOnly />}
      {placeholder && readOnly && (
        <div className="hidden" data-placeholder={placeholder} />
      )}
    </div>
  );
}
