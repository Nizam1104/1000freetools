"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function StringLengthCalculator() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [showPerLine, setShowPerLine] = useState(false);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!text) {
      return {
        length: 0,
        lengthNoSpaces: 0,
        codePoints: 0,
        bytes: 0,
        lines: [] as Array<{ line: number; length: number }>
      };
    }

    const length = text.length;
    const lengthNoSpaces = text.replace(/\s/g, "").length;
    
    // Count Unicode code points (handles emojis and surrogate pairs)
    const codePoints = [...text].length;
    
    // Byte length in UTF-8
    const bytes = new TextEncoder().encode(text).length;

    // Per-line lengths
    const lines = showPerLine 
      ? text.split('\n').map((line, i) => ({ line: i + 1, length: line.length }))
      : [];

    return { length, lengthNoSpaces, codePoints, bytes, lines };
  }, [text, excludeSpaces, showPerLine]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <Label htmlFor="text-input" className="text-base font-medium block mb-2">
          Enter your string
        </Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your string to measure..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="exclude-spaces"
            checked={excludeSpaces}
            onCheckedChange={(checked) => setExcludeSpaces(checked as boolean)}
          />
          <Label htmlFor="exclude-spaces" className="text-sm">Show length excluding spaces</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="show-per-line"
            checked={showPerLine}
            onCheckedChange={(checked) => setShowPerLine(checked as boolean)}
          />
          <Label htmlFor="show-per-line" className="text-sm">Show length per line</Label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{excludeSpaces ? stats.lengthNoSpaces : stats.length}</div>
          <div className="text-sm text-muted-foreground">
            {excludeSpaces ? "Length (no spaces)" : "Length (characters)"}
          </div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.codePoints}</div>
          <div className="text-sm text-muted-foreground">Unicode code points</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.bytes}</div>
          <div className="text-sm text-muted-foreground">Bytes (UTF-8)</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{text.split('\n').length}</div>
          <div className="text-sm text-muted-foreground">Lines</div>
        </div>
      </div>

      {showPerLine && stats.lines.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Length Per Line</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 bg-muted p-3 font-medium text-sm">
              <div className="col-span-2">Line</div>
              <div className="col-span-10">Length</div>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {stats.lines.map((item) => (
                <div 
                  key={item.line}
                  className="grid grid-cols-12 p-3 border-t text-sm font-mono"
                >
                  <div className="col-span-2">Line {item.line}</div>
                  <div className="col-span-10">{item.length} characters</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {text && (
            <span>
              {stats.length === stats.codePoints 
                ? "All characters are single code points" 
                : `Contains ${stats.codePoints - stats.length} multi-code-point characters (emojis, etc.)`}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!text}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!text}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
