"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

type EscapeMode = "javascript" | "html" | "xml" | "json" | "css" | "sql" | "url" | "unicode";

export default function StringEscapeUnescape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<EscapeMode>("javascript");
  const [action, setAction] = useState<"escape" | "unescape">("escape");
  const [copied, setCopied] = useState(false);

  const escapeFunctions: Record<EscapeMode, (text: string) => string> = {
    javascript: (text) => {
      return text
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f")
        .replace(/\v/g, "\\v")
        .replace(/\0/g, "\\0");
    },
    html: (text) => {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },
    xml: (text) => {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    },
    json: (text) => {
      return text
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f")
        .replace(/\b/g, "\\b");
    },
    css: (text) => {
      return text.replace(/["'\\]/g, (match) => `\\${match}`);
    },
    sql: (text) => {
      return text.replace(/'/g, "''").replace(/"/g, '""');
    },
    url: (text) => {
      return encodeURIComponent(text);
    },
    unicode: (text) => {
      return text.replace(/[\u0080-\uFFFF]/g, (char) => {
        const code = char.charCodeAt(0);
        return `\\u${code.toString(16).padStart(4, "0")}`;
      });
    },
  };

  const unescapeFunctions: Record<EscapeMode, (text: string) => string> = {
    javascript: (text) => {
      return text
        .replace(/\\0/g, "\0")
        .replace(/\\v/g, "\v")
        .replace(/\\f/g, "\f")
        .replace(/\\t/g, "\t")
        .replace(/\\r/g, "\r")
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, "\\");
    },
    html: (text) => {
      return text
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&amp;/g, "&");
    },
    xml: (text) => {
      return text
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&");
    },
    json: (text) => {
      return text
        .replace(/\\b/g, "\b")
        .replace(/\\f/g, "\f")
        .replace(/\\t/g, "\t")
        .replace(/\\r/g, "\r")
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\");
    },
    css: (text) => {
      return text.replace(/\\(["'\\])/g, "$1");
    },
    sql: (text) => {
      return text.replace(/''/g, "'").replace(/""/g, '"');
    },
    url: (text) => {
      return decodeURIComponent(text);
    },
    unicode: (text) => {
      return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      });
    },
  };

  const handleConvert = () => {
    try {
      if (action === "escape") {
        setOutput(escapeFunctions[mode](input));
      } else {
        setOutput(unescapeFunctions[mode](input));
      }
    } catch (error) {
      setOutput("Error: Invalid input for unescaping");
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleSwap = () => {
    setAction(action === "escape" ? "unescape" : "escape");
    setInput(output);
    setOutput(input);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">String Escape/Unescape</h2>
        <p className="text-sm text-muted-foreground">
          Escape and unescape special characters for various programming languages
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Label>Format:</Label>
            <div className="flex flex-wrap gap-2">
              {(["javascript", "html", "xml", "json", "css", "sql", "url", "unicode"] as EscapeMode[]).map(
                (m) => (
                  <Button
                    key={m}
                    variant={mode === m ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMode(m)}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Label>Action:</Label>
            <div className="flex gap-2">
              <Button
                variant={action === "escape" ? "default" : "outline"}
                size="sm"
                onClick={() => setAction("escape")}
              >
                Escape
              </Button>
              <Button
                variant={action === "unescape" ? "default" : "outline"}
                size="sm"
                onClick={() => setAction("unescape")}
              >
                Unescape
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">
            {action === "escape" ? "Plain Text Input" : "Escaped Text Input"}
          </Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              action === "escape"
                ? "Enter text to escape..."
                : "Enter escaped text to unescape..."
            }
            className="min-h-[200px] font-mono"
          />
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {action === "escape" ? "Escape" : "Unescape"}
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={handleSwap}>
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output">
            {action === "escape" ? "Escaped Output" : "Unescaped Output"}
          </Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[200px] font-mono bg-muted"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">
          {mode.charAt(0).toUpperCase() + mode.slice(1)} Escape Characters
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Character</th>
                <th className="text-left py-2 pr-4">Escaped</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {mode === "javascript" && (
                <>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">\</td>
                    <td className="py-2 pr-4 font-mono">\\</td>
                    <td className="py-2">Backslash</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">"</td>
                    <td className="py-2 pr-4 font-mono">\"</td>
                    <td className="py-2">Double quote</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">'</td>
                    <td className="py-2 pr-4 font-mono">\'</td>
                    <td className="py-2">Single quote</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">newline</td>
                    <td className="py-2 pr-4 font-mono">\n</td>
                    <td className="py-2">New line</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">tab</td>
                    <td className="py-2 pr-4 font-mono">\t</td>
                    <td className="py-2">Tab</td>
                  </tr>
                </>
              )}
              {mode === "html" && (
                <>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">&lt;</td>
                    <td className="py-2 pr-4 font-mono">&amp;lt;</td>
                    <td className="py-2">Less than</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">&gt;</td>
                    <td className="py-2 pr-4 font-mono">&amp;gt;</td>
                    <td className="py-2">Greater than</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">&amp;</td>
                    <td className="py-2 pr-4 font-mono">&amp;amp;</td>
                    <td className="py-2">Ampersand</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">"</td>
                    <td className="py-2 pr-4 font-mono">&amp;quot;</td>
                    <td className="py-2">Double quote</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">'</td>
                    <td className="py-2 pr-4 font-mono">&amp;#39;</td>
                    <td className="py-2">Single quote</td>
                  </tr>
                </>
              )}
              {mode === "json" && (
                <>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">\</td>
                    <td className="py-2 pr-4 font-mono">\\</td>
                    <td className="py-2">Backslash</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">"</td>
                    <td className="py-2 pr-4 font-mono">\"</td>
                    <td className="py-2">Double quote</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">newline</td>
                    <td className="py-2 pr-4 font-mono">\n</td>
                    <td className="py-2">New line</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">tab</td>
                    <td className="py-2 pr-4 font-mono">\t</td>
                    <td className="py-2">Tab</td>
                  </tr>
                </>
              )}
              {mode === "sql" && (
                <>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">'</td>
                    <td className="py-2 pr-4 font-mono">''</td>
                    <td className="py-2">Single quote</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">"</td>
                    <td className="py-2 pr-4 font-mono">""</td>
                    <td className="py-2">Double quote</td>
                  </tr>
                </>
              )}
              {mode === "url" && (
                <>
                  <tr className="border-b">
                    <td className="py-2 pr-4">space</td>
                    <td className="py-2 pr-4 font-mono">%20</td>
                    <td className="py-2">Space character</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">&amp;</td>
                    <td className="py-2 pr-4 font-mono">%26</td>
                    <td className="py-2">Ampersand</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono">=</td>
                    <td className="py-2 pr-4 font-mono">%3D</td>
                    <td className="py-2">Equals sign</td>
                  </tr>
                </>
              )}
              {(mode === "xml" || mode === "css" || mode === "unicode") && (
                <tr>
                  <td className="py-2 pr-4" colSpan={3}>
                    See documentation for {mode.toUpperCase()} escape sequences
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
