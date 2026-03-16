"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function SvgSplitterExtractor() {
  const [svgInput, setSvgInput] = useState("");
  const [extractedSvgs, setExtractedSvgs] = useState<string[]>([]);
  const [mode, setMode] = useState<"elements" | "layers">("elements");

  const extractElements = (svgString: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");
      const svgElement = doc.querySelector("svg");
      
      if (!svgElement) return [];

      const results: string[] = [];
      
      // Extract top-level elements
      const elements = ["path", "circle", "rect", "ellipse", "line", "polyline", "polygon", "text", "image", "g"];
      
      elements.forEach((tag) => {
        const foundElements = svgElement.querySelectorAll(tag);
        foundElements.forEach((el) => {
          const cloned = el.cloneNode(true) as Element;
          
          // Create standalone SVG
          const standaloneSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          standaloneSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          standaloneSvg.setAttribute("width", svgElement.getAttribute("width") || "100");
          standaloneSvg.setAttribute("height", svgElement.getAttribute("height") || "100");
          standaloneSvg.setAttribute("viewBox", svgElement.getAttribute("viewBox") || `0 0 ${svgElement.getAttribute("width") || 100} ${svgElement.getAttribute("height") || 100}`);
          standaloneSvg.appendChild(cloned);
          
          results.push(standaloneSvg.outerHTML);
        });
      });

      return results;
    } catch (e) {
      console.error("Failed to extract elements:", e);
      return [];
    }
  };

  const handleExtract = () => {
    if (!svgInput) return;
    const extracted = extractElements(svgInput);
    setExtractedSvgs(extracted);
  };

  const handleCopy = async (svg: string) => {
    await navigator.clipboard.writeText(svg);
  };

  const handleClear = () => {
    setSvgInput("");
    setExtractedSvgs([]);
  };

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Splitter / Extractor</h2>
        <p className="text-sm text-muted-foreground">
          Split complex SVG files into individual element files
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="svg">SVG Input</Label>
            <textarea
              id="svg"
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              placeholder='<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/><rect x="10" y="10" width="80" height="80"/></svg>'
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={mode === "elements" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("elements")}
            >
              By Elements
            </Button>
            <Button
              variant={mode === "layers" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("layers")}
              disabled
            >
              By Layers (coming soon)
            </Button>
          </div>

          <Button onClick={handleExtract} disabled={!svgInput} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Extract Elements
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleExtract} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Extract
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!svgInput}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {extractedSvgs.length > 0 && (
        <Card className="p-4">
          <div className="mb-4">
            <h3 className="font-semibold">Extracted Elements ({extractedSvgs.length})</h3>
            <p className="text-sm text-muted-foreground">
              Click copy to copy individual SVG code
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extractedSvgs.map((svg, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="border-b p-2 flex justify-between items-center">
                  <span className="text-sm font-medium">Element {i + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleCopy(svg);
                      setCopiedIndex(i);
                      setTimeout(() => setCopiedIndex(null), 1500);
                    }}
                  >
                    {copiedIndex === i ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="p-4 bg-background flex items-center justify-center min-h-[100px]">
                  <div dangerouslySetInnerHTML={{ __html: svg }} className="max-w-full" />
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
