"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function HtmlToJsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<"pretty" | "compact">("pretty");

  const parseHtml = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const nodeToJson = (node: Node): unknown => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        return text || null;
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const result: Record<string, unknown> = {
          tag: element.tagName.toLowerCase(),
        };
        
        // Add attributes
        if (element.attributes.length > 0) {
          const attrs: Record<string, string> = {};
          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            attrs[attr.name] = attr.value;
          }
          result.attributes = attrs;
        }
        
        // Add children
        const children: unknown[] = [];
        for (const child of element.childNodes) {
          const childJson = nodeToJson(child);
          if (childJson !== null) {
            children.push(childJson);
          }
        }
        if (children.length > 0) {
          result.children = children;
        }
        
        return result;
      }
      
      return null;
    };
    
    const body = doc.body;
    const children: unknown[] = [];
    
    for (const child of body.childNodes) {
      const childJson = nodeToJson(child);
      if (childJson !== null) {
        children.push(childJson);
      }
    }
    
    return children.length === 1 ? children[0] : children;
  };

  const handleConvert = () => {
    try {
      const json = parseHtml(input);
      const outputStr = format === "pretty" 
        ? JSON.stringify(json, null, 2) 
        : JSON.stringify(json);
      setOutput(outputStr);
    } catch (e) {
      setOutput("Error: Invalid HTML");
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">HTML to JSON Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert HTML code into a JSON structure
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-2">
          <Button
            variant={format === "pretty" ? "default" : "outline"}
            size="sm"
            onClick={() => setFormat("pretty")}
          >
            Pretty Print
          </Button>
          <Button
            variant={format === "compact" ? "default" : "outline"}
            size="sm"
            onClick={() => setFormat("compact")}
          >
            Compact
          </Button>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">HTML Input</Label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div><p>Hello World</p></div>"
            className="w-full min-h-[300px] p-3 font-mono text-sm rounded-md border border-input"
          />
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output">JSON Output</Label>
          <textarea
            id="output"
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
            className="w-full min-h-[300px] p-3 font-mono text-sm rounded-md border border-input bg-muted"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCopy}
              disabled={!output}
              className="flex-1"
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
            <Button
              variant="outline"
              onClick={handleDownload}
              disabled={!output}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Example Conversion</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-2">HTML Input</div>
            <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
{`<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`}
            </pre>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">JSON Output</div>
            <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
{`{
  "tag": "ul",
  "children": [
    {
      "tag": "li",
      "children": ["Item 1"]
    },
    {
      "tag": "li",
      "children": ["Item 2"]
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
