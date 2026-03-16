"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function SvgViewerInspector() {
  const [svgInput, setSvgInput] = useState("");
  const [svgUrl, setSvgUrl] = useState("");
  const [mode, setMode] = useState<"input" | "url">("input");
  const [tree, setTree] = useState<Record<string, unknown> | null>(null);
  const [selectedElement, setSelectedElement] = useState<Record<string, unknown> | null>(null);

  const parseSvg = (svgString: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");
      const svgElement = doc.querySelector("svg");
      
      if (!svgElement) {
        return null;
      }
      
      const nodeToTree = (node: Node): Record<string, unknown> | null => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          if (text) {
            return { type: "text", content: text };
          }
          return null;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const result: Record<string, unknown> = {
            type: "element",
            tag: element.tagName,
          };
          
          if (element.attributes.length > 0) {
            const attrs: Record<string, string> = {};
            for (let i = 0; i < element.attributes.length; i++) {
              const attr = element.attributes[i];
              attrs[attr.name] = attr.value;
            }
            result.attributes = attrs;
          }
          
          const children: Record<string, unknown>[] = [];
          for (const child of element.childNodes) {
            const childTree = nodeToTree(child);
            if (childTree) {
              children.push(childTree);
            }
          }
          if (children.length > 0) {
            result.children = children;
          }
          
          return result;
        }
        
        return null;
      };
      
      return nodeToTree(svgElement);
    } catch (e) {
      console.error("Failed to parse SVG:", e);
      return null;
    }
  };

  const handleParse = () => {
    const content = mode === "input" ? svgInput : svgUrl;
    if (!content) return;
    
    const result = parseSvg(content);
    setTree(result);
    setSelectedElement(null);
  };

  const handleClear = () => {
    setSvgInput("");
    setSvgUrl("");
    setTree(null);
    setSelectedElement(null);
  };

  const renderTree = (node: Record<string, unknown>, depth = 0) => {
    if (!node || node.type !== "element") return null;
    
    const tag = node.tag as string;
    const attrs = node.attributes as Record<string, string> | undefined;
    const children = node.children as Record<string, unknown>[] | undefined;
    
    return (
      <div key={Math.random()} className="select-none">
        <div
          className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-muted ${
            selectedElement === node ? "bg-muted" : ""
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => setSelectedElement(node)}
        >
          <span className="text-blue-600 font-mono">&lt;{tag}</span>
          {attrs && Object.keys(attrs).length > 0 && (
            <span className="text-muted-foreground">
              {Object.keys(attrs).slice(0, 3).join(" ")}
              {Object.keys(attrs).length > 3 ? "..." : ""}
            </span>
          )}
          <span className="text-blue-600 font-mono">&gt;</span>
          {children && children.length > 0 && (
            <span className="text-muted-foreground text-xs">
              ({children.length} children)
            </span>
          )}
        </div>
        {children && children.map((child) => renderTree(child, depth + 1))}
        <div
          className="text-blue-600 font-mono py-1"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          &lt;/{tag}&gt;
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Viewer & Inspector</h2>
        <p className="text-sm text-muted-foreground">
          Upload an SVG file to view and inspect its internal structure
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "input" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("input")}
          >
            SVG Input
          </Button>
          <Button
            variant={mode === "url" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("url")}
          >
            SVG URL
          </Button>
        </div>

        {mode === "input" ? (
          <div className="space-y-2">
            <Label htmlFor="svg">SVG Code</Label>
            <textarea
              id="svg"
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              placeholder='<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="url">SVG URL</Label>
            <Input
              id="url"
              type="url"
              value={svgUrl}
              onChange={(e) => setSvgUrl(e.target.value)}
              placeholder="https://example.com/image.svg"
            />
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button onClick={handleParse} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Parse SVG
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {tree && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">SVG Preview</h3>
            <div className="border rounded-lg p-4 bg-background">
              {mode === "input" && svgInput ? (
                <div dangerouslySetInnerHTML={{ __html: svgInput }} />
              ) : svgUrl ? (
                <img src={svgUrl} alt="SVG" className="max-w-full" />
              ) : null}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Element Tree</h3>
            <div className="border rounded-lg p-2 max-h-[400px] overflow-auto font-mono text-sm">
              {renderTree(tree)}
            </div>
          </Card>
        </div>
      )}

      {selectedElement && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Selected Element</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Tag</Label>
              <div className="font-mono text-lg">{selectedElement.tag as string}</div>
            </div>
            {(selectedElement.attributes as Record<string, string>) && (
              <div>
                <Label className="text-sm text-muted-foreground">Attributes</Label>
                <div className="grid gap-2 sm:grid-cols-2 mt-2">
                  {Object.entries(selectedElement.attributes as Record<string, string>).map(
                    ([key, value]) => (
                      <div key={key} className="flex gap-2 p-2 bg-muted rounded">
                        <span className="font-mono text-blue-600">{key}</span>
                        <span className="font-mono">=</span>
                        <span className="font-mono text-green-600">"{value}"</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
