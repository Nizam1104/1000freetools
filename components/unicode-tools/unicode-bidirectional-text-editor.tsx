"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeBidirectionalTextEditor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [direction, setDirection] = useState<"ltr" | "rtl" | "auto">("auto");

  const directionalChars = {
    LRO: "\u202D", // Left-to-Right Override
    RLO: "\u202E", // Right-to-Left Override
    LRM: "\u200E", // Left-to-Right Mark
    RLM: "\u200F", // Right-to-Left Mark
    PDF: "\u202C", // Pop Directional Formatting
    LRE: "\u202A", // Left-to-Right Embedding
    RLE: "\u202B", // Right-to-Left Embedding
  };

  const applyDirection = (text: string, dir: typeof direction) => {
    if (dir === "auto") return text;
    
    const mark = dir === "ltr" ? directionalChars.LRM : directionalChars.RLM;
    return mark + text + mark;
  };

  const insertControlChar = (char: string) => {
    setInput(input + char);
  };

  const visualizeDirectional = (text: string) => {
    return text
      .replace(directionalChars.LRO, "[LRO]")
      .replace(directionalChars.RLO, "[RLO]")
      .replace(directionalChars.LRM, "[LRM]")
      .replace(directionalChars.RLM, "[RLM]")
      .replace(directionalChars.PDF, "[PDF]")
      .replace(directionalChars.LRE, "[LRE]")
      .replace(directionalChars.RLE, "[RLE]");
  };

  const handleApply = () => {
    if (!input) return;
    setOutput(applyDirection(input, direction));
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
        <h2 className="text-2xl font-bold">Unicode Bidirectional Text Editor</h2>
        <p className="text-sm text-muted-foreground">
          Edit and visualize bidirectional text mixing left-to-right and right-to-left scripts
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={direction === "ltr" ? "default" : "outline"}
              size="sm"
              onClick={() => setDirection("ltr")}
            >
              Left-to-Right
            </Button>
            <Button
              variant={direction === "rtl" ? "default" : "outline"}
              size="sm"
              onClick={() => setDirection("rtl")}
            >
              Right-to-Left
            </Button>
            <Button
              variant={direction === "auto" ? "default" : "outline"}
              size="sm"
              onClick={() => setDirection("auto")}
            >
              Auto
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Insert Directional Control Characters</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => insertControlChar(directionalChars.LRM)}>
                LRM
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertControlChar(directionalChars.RLM)}>
                RLM
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertControlChar(directionalChars.LRE)}>
                LRE
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertControlChar(directionalChars.RLE)}>
                RLE
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertControlChar(directionalChars.LRO)}>
                LRO
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertControlChar(directionalChars.RLO)}>
                RLO
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertControlChar(directionalChars.PDF)}>
                PDF
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with mixed directions (e.g., English and Arabic/Hebrew)..."
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
              dir="auto"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleApply} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Apply Direction
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleApply} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Apply
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Rendered Output</Label>
              <div className="text-xl p-4 border rounded mt-2" dir="auto">
                {output}
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Visualized Control Characters</Label>
              <pre className="font-mono text-sm p-3 bg-muted rounded mt-2 break-all">
                {visualizeDirectional(output)}
              </pre>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                handleCopy();
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
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
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Directional Control Characters</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="p-2 bg-muted rounded font-mono text-sm">
            <span className="font-semibold">LRM (U+200E)</span>
            <div className="text-muted-foreground">Left-to-Right Mark</div>
          </div>
          <div className="p-2 bg-muted rounded font-mono text-sm">
            <span className="font-semibold">RLM (U+200F)</span>
            <div className="text-muted-foreground">Right-to-Left Mark</div>
          </div>
          <div className="p-2 bg-muted rounded font-mono text-sm">
            <span className="font-semibold">LRE (U+202A)</span>
            <div className="text-muted-foreground">Left-to-Right Embedding</div>
          </div>
          <div className="p-2 bg-muted rounded font-mono text-sm">
            <span className="font-semibold">RLE (U+202B)</span>
            <div className="text-muted-foreground">Right-to-Left Embedding</div>
          </div>
          <div className="p-2 bg-muted rounded font-mono text-sm">
            <span className="font-semibold">LRO (U+202D)</span>
            <div className="text-muted-foreground">Left-to-Right Override</div>
          </div>
          <div className="p-2 bg-muted rounded font-mono text-sm">
            <span className="font-semibold">RLO (U+202E)</span>
            <div className="text-muted-foreground">Right-to-Left Override</div>
          </div>
          <div className="p-2 bg-muted rounded font-mono text-sm">
            <span className="font-semibold">PDF (U+202C)</span>
            <div className="text-muted-foreground">Pop Directional Formatting</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
