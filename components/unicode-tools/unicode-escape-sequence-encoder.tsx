"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeEscapeSequenceEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<
    "unicode" | "javascript" | "python" | "java" | "html" | "css"
  >("unicode");

  const encode = (text: string, fmt: typeof format) => {
    let result = "";

    for (const char of text) {
      const code = char.codePointAt(0) || 0;

      switch (fmt) {
        case "unicode":
          if (code > 0xffff) {
            result += `\\U{${code.toString(16).toUpperCase().padStart(8, "0")}}`;
          } else {
            result += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
          }
          break;
        case "javascript":
          if (code > 0xffff) {
            // Surrogate pair for JavaScript
            result += `\\u${(((code - 0x10000) >> 10) + 0xd800).toString(16).toUpperCase().padStart(4, "0")}`;
            result += `\\u${(((code - 0x10000) & 0x3ff) + 0xdc00).toString(16).toUpperCase().padStart(4, "0")}`;
          } else {
            result += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
          }
          break;
        case "python":
          if (code > 0xffff) {
            result += `\\U${code.toString(16).toUpperCase().padStart(8, "0")}`;
          } else {
            result += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
          }
          break;
        case "java":
          if (code > 0xffff) {
            result += `\\u${(((code - 0x10000) >> 10) + 0xd800).toString(16).toUpperCase().padStart(4, "0")}`;
            result += `\\u${(((code - 0x10000) & 0x3ff) + 0xdc00).toString(16).toUpperCase().padStart(4, "0")}`;
          } else {
            result += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
          }
          break;
        case "html":
          result += `&#x${code.toString(16).toUpperCase()};`;
          break;
        case "css":
          result += `\\${code.toString(16).toUpperCase().padStart(6, "0")} `;
          break;
      }
    }

    return result;
  };

  const decode = (text: string, fmt: typeof format) => {
    let result = text;

    try {
      switch (fmt) {
        case "unicode":
        case "javascript":
        case "python":
        case "java":
          result = result.replace(
            /\\u([0-9A-Fa-f]{4})|\\U([0-9A-Fa-f]{8})|\\U\{([0-9A-Fa-f]+)\}/g,
            (_, u4, u8, ub) => {
              const code = parseInt(u4 || u8 || ub, 16);
              return String.fromCodePoint(code);
            },
          );
          break;
        case "html":
          result = result.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => {
            return String.fromCodePoint(parseInt(hex, 16));
          });
          break;
        case "css":
          result = result.replace(/\\([0-9A-Fa-f]{1,6})\s?/g, (_, hex) => {
            return String.fromCodePoint(parseInt(hex, 16));
          });
          break;
      }
    } catch (e) {
      return "Error: Invalid escape sequence";
    }

    return result;
  };

  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    if (!input) return;

    if (mode === "encode") {
      setOutput(encode(input, format));
    } else {
      setOutput(decode(input, format));
    }
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
        <h2 className="text-2xl font-bold">
          Unicode Escape Sequence Encoder/Decoder
        </h2>
        <p className="text-sm text-muted-foreground">
          Encode text to Unicode escape sequences and decode them back to text
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("encode")}
            >
              Encode
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("decode")}
            >
              Decode
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              [
                "unicode",
                "javascript",
                "python",
                "java",
                "html",
                "css",
              ] as const
            ).map((f) => (
              <Button
                key={f}
                variant={format === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFormat(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Text Input" : "Escape Sequence Input"}
            </Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Hello 世界"
                  : "\\u0048\\u0065\\u006C\\u006C\\u006F"
              }
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleConvert}
              disabled={!input}
              className="flex-1"
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {mode === "encode" ? "Encode" : "Decode"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

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
        <h3 className="font-semibold mb-2">Format Examples</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Unicode</div>
            <div>{String.raw`\u0048\u0065\u006C\u006C\u006F`}</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">JavaScript</div>
            <div>{String.raw`\u0048\u0065\u006C\u006C\u006F`}</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Python</div>
            <div>{String.raw`\u0048\u0065\u006C\u006C\u006F or \U0001F600`}</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">HTML Entity</div>
            <div>{"&#x48;&#x65;&#x6C;&#x6C;&#x6F;"}</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">CSS</div>
            <div>{String.raw`\000048 \000065 \00006C \00006C \00006F`}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
