"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Code2, Minimize2 } from "lucide-react";

export default function CodeBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<"javascript" | "css" | "html" | "json">("javascript");
  const [indentSize, setIndentSize] = useState("2");
  const [copied, setCopied] = useState(false);

  const beautify = useCallback(() => {
    try {
      let result = input;

      if (language === "json") {
        result = JSON.stringify(JSON.parse(input), null, parseInt(indentSize));
      } else if (language === "javascript") {
        // Basic JS beautification
        result = input
          .replace(/([{}])/g, "\n$1\n")
          .replace(/([;])/g, "$1\n")
          .replace(/(\s+)/g, " ")
          .split("\n")
          .filter((line) => line.trim())
          .map((line, i, arr) => {
            const prevLine = arr[i - 1] || "";
            const openBraces = (prevLine.match(/{/g) || []).length - (prevLine.match(/}/g) || []).length;
            const indent = " ".repeat(Math.max(0, openBraces) * parseInt(indentSize));
            return indent + line.trim();
          })
          .join("\n");
      } else if (language === "css") {
        // Basic CSS beautification
        result = input
          .replace(/{/g, " {\n")
          .replace(/}/g, "\n}\n")
          .replace(/;/g, ";\n")
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => " ".repeat(parseInt(indentSize)) + line.trim())
          .join("\n");
      } else if (language === "html") {
        // Basic HTML beautification
        const tags = input.split(/(<[^>]+>)/g);
        let indent = 0;
        result = tags.map((tag) => {
          if (!tag.trim()) return "";
          if (tag.match(/^<\//)) indent = Math.max(0, indent - 1);
          const line = " ".repeat(indent * parseInt(indentSize)) + tag.trim();
          if (tag.match(/^<(?!\/|!|br|hr|img|input|meta|link)/) && !tag.match(/\/>$/)) indent++;
          return line;
        }).join("\n");
      }

      setOutput(result);
    } catch (err) {
      setOutput("Error: Could not beautify. Please check your input syntax.");
    }
  }, [input, language, indentSize]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [output]);

  const minify = useCallback(() => {
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{};:,])\s*/g, "$1")
      .trim();
    setOutput(minified);
  }, [input]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Input Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <Label>Language</Label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as typeof language)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              <div>
                <Label>Indent Size</Label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="8">8 spaces</option>
                  <option value="1">1 tab</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="input">Paste Code</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your minified code here..."
                className="mt-1 h-64 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Characters: {input.length}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={beautify} className="flex-1">
                <Code2 className="w-4 h-4 mr-2" />
                Beautify
              </Button>
              <Button onClick={minify} variant="outline" className="flex-1">
                <Minimize2 className="w-4 h-4 mr-2" />
                Minify
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Beautified Code</Label>
              <Textarea
                value={output}
                readOnly
                className="mt-1 h-64 font-mono text-sm"
                placeholder="Output will appear here..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Characters: {output.length}
                  {input.length > 0 && (
                    <span className={output.length > input.length ? "text-green-600" : "text-red-600"}>
                      {" "}({((output.length - input.length) / input.length * 100).toFixed(1)}%)
                    </span>
                  )}
                </p>
                <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!output}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
