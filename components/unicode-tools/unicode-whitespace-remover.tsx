"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeWhitespaceRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [action, setAction] = useState<"remove" | "normalize" | "visualize">("remove");
  const [options, setOptions] = useState({
    removeLeading: true,
    removeTrailing: true,
    removeMultiple: true,
    removeNonBreaking: true,
    removeZeroWidth: true,
  });

  const whitespaceChars = [
    { name: "Space", char: " ", code: "U+0020" },
    { name: "Non-breaking Space", char: "\u00A0", code: "U+00A0" },
    { name: "En Space", char: "\u2002", code: "U+2002" },
    { name: "Em Space", char: "\u2003", code: "U+2003" },
    { name: "Thin Space", char: "\u2009", code: "U+2009" },
    { name: "Zero Width Space", char: "\u200B", code: "U+200B" },
    { name: "Zero Width Non-Joiner", char: "\u200C", code: "U+200C" },
    { name: "Zero Width Joiner", char: "\u200D", code: "U+200D" },
    { name: "Tab", char: "\t", code: "U+0009" },
    { name: "Line Feed", char: "\n", code: "U+000A" },
    { name: "Carriage Return", char: "\r", code: "U+000D" },
  ];

  const processText = () => {
    if (!input) return;

    let result = input;

    if (action === "remove") {
      if (options.removeZeroWidth) {
        result = result.replace(/[\u200B-\u200D\uFEFF]/g, "");
      }
      if (options.removeNonBreaking) {
        result = result.replace(/\u00A0/g, " ");
      }
      if (options.removeMultiple) {
        result = result.replace(/[ \t]+/g, " ");
      }
      if (options.removeLeading) {
        result = result.replace(/^[ \t]+/gm, "");
      }
      if (options.removeTrailing) {
        result = result.replace(/[ \t]+$/gm, "");
      }
    } else if (action === "normalize") {
      result = result.replace(/\u00A0/g, " ");
      result = result.replace(/\t/g, "    ");
      result = result.replace(/\r\n/g, "\n");
      result = result.replace(/[ \t]+/g, " ");
    }

    setOutput(result);
  };

  const visualizeWhitespace = (text: string) => {
    return text
      .replace(/ /g, "·")
      .replace(/\t/g, "→   ")
      .replace(/\n/g, "↵\n")
      .replace(/\u00A0/g, "°")
      .replace(/\u200B/g, "[]")
      .replace(/\u200C/g, "[]")
      .replace(/\u200D/g, "[]");
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Whitespace Remover</h2>
        <p className="text-sm text-muted-foreground">
          Remove or visualize all Unicode whitespace characters
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={action === "remove" ? "default" : "outline"}
              size="sm"
              onClick={() => setAction("remove")}
            >
              Remove
            </Button>
            <Button
              variant={action === "normalize" ? "default" : "outline"}
              size="sm"
              onClick={() => setAction("normalize")}
            >
              Normalize
            </Button>
            <Button
              variant={action === "visualize" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setAction("visualize");
                setOutput(visualizeWhitespace(input));
              }}
            >
              Visualize
            </Button>
          </div>

          {action === "remove" && (
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="removeLeading"
                  checked={options.removeLeading}
                  onChange={(e) => setOptions({ ...options, removeLeading: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="removeLeading" className="text-sm">Remove leading whitespace</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="removeTrailing"
                  checked={options.removeTrailing}
                  onChange={(e) => setOptions({ ...options, removeTrailing: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="removeTrailing" className="text-sm">Remove trailing whitespace</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="removeMultiple"
                  checked={options.removeMultiple}
                  onChange={(e) => setOptions({ ...options, removeMultiple: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="removeMultiple" className="text-sm">Collapse multiple spaces</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="removeNonBreaking"
                  checked={options.removeNonBreaking}
                  onChange={(e) => setOptions({ ...options, removeNonBreaking: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="removeNonBreaking" className="text-sm">Convert non-breaking spaces</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="removeZeroWidth"
                  checked={options.removeZeroWidth}
                  onChange={(e) => setOptions({ ...options, removeZeroWidth: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="removeZeroWidth" className="text-sm">Remove zero-width characters</Label>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with whitespace to process..."
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={action === "visualize" ? () => setOutput(visualizeWhitespace(input)) : processText} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {action === "visualize" ? "Visualize" : action === "normalize" ? "Normalize" : "Remove"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={action === "visualize" ? () => setOutput(visualizeWhitespace(input)) : processText} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          {action === "visualize" ? "Visualize" : action === "normalize" ? "Normalize" : "Remove"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Output</Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap break-all bg-muted p-3 rounded">
                {output}
              </pre>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleCopy();
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Common Unicode Whitespace Characters</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {whitespaceChars.map((ws) => (
            <div key={ws.code} className="flex justify-between items-center p-2 bg-muted rounded font-mono text-sm">
              <span>{ws.name}</span>
              <span className="text-muted-foreground">{ws.code}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
