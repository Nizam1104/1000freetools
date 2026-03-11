"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeTextConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"text" | "utf8" | "utf16" | "utf32" | "html" | "escape">("text");
  const [output, setOutput] = useState("");

  const textToUtf8 = (text: string) => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join(" ");
  };

  const textToUtf16 = (text: string) => {
    return Array.from(text).map((char) => {
      const code = char.charCodeAt(0);
      return `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
    }).join(" ");
  };

  const textToUtf32 = (text: string) => {
    return Array.from(text).map((char) => {
      const code = char.codePointAt(0) || 0;
      return `U+${code.toString(16).toUpperCase().padStart(8, "0")}`;
    }).join(" ");
  };

  const textToHtmlEntities = (text: string) => {
    return Array.from(text).map((char) => {
      const code = char.charCodeAt(0);
      if (code < 128) return char;
      return `&#x${code.toString(16).toUpperCase()};`;
    }).join("");
  };

  const textToEscape = (text: string) => {
    return Array.from(text).map((char) => {
      const code = char.charCodeAt(0);
      return `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
    }).join("");
  };

  const utf8ToText = (utf8: string) => {
    const bytes = utf8.split(/\s+/).map((b) => parseInt(b, 16)).filter((b) => !isNaN(b));
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
  };

  const unicodeToText = (unicode: string, prefix: string) => {
    const regex = new RegExp(`${prefix}([0-9A-Fa-f]+)`, "g");
    let result = "";
    let match;
    while ((match = regex.exec(unicode)) !== null) {
      const code = parseInt(match[1], 16);
      result += String.fromCodePoint(code);
    }
    return result;
  };

  const handleConvert = () => {
    if (!input) return;

    let result = "";

    if (["utf8", "utf16", "utf32", "html", "escape"].includes(mode)) {
      switch (mode) {
        case "utf8": result = textToUtf8(input); break;
        case "utf16": result = textToUtf16(input); break;
        case "utf32": result = textToUtf32(input); break;
        case "html": result = textToHtmlEntities(input); break;
        case "escape": result = textToEscape(input); break;
      }
    } else {
      // Decode modes
      if (input.includes("U+")) {
        result = unicodeToText(input, "U+");
      } else if (input.match(/^[0-9A-Fa-f\s]+$/)) {
        result = utf8ToText(input);
      } else {
        result = input;
      }
    }

    setOutput(result);
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
        <h2 className="text-2xl font-bold">Unicode Text Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert plain text to various Unicode formats and vice versa
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {([
              { value: "text", label: "Text" },
              { value: "utf8", label: "UTF-8 Hex" },
              { value: "utf16", label: "UTF-16" },
              { value: "utf32", label: "UTF-32" },
              { value: "html", label: "HTML Entities" },
              { value: "escape", label: "Escape Sequence" },
            ] as const).map((m) => (
              <Button
                key={m.value}
                variant={mode === m.value ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(m.value)}
              >
                {m.label}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "text" ? "Unicode Input" : "Text Input"}
            </Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "text" ? "U+0048 U+0065 U+006C U+006C U+006F" : "Hello World"}
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Convert
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
              <pre className="font-mono mt-2 whitespace-pre-wrap break-all">{output}</pre>
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
        <h3 className="font-semibold mb-2">Format Examples</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">UTF-8 Hex</div>
            <div>48 65 6C 6C 6F</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">UTF-16</div>
            <div>U+0048 U+0065 U+006C U+006C U+006F</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">HTML Entities</div>
            <div>&#x48;&#x65;&#x6C;&#x6C;&#x6F;</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Escape Sequence</div>
            <div>\u0048\u0065\u006C\u006C\u006F</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
