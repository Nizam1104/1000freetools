"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [sortOutput, setSortOutput] = useState(false);
  const [keepLast, setKeepLast] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text.trim()) return { output: "", removed: 0 };

    const lines = text.split('\n');
    const seen = new Set<string>();
    const output: string[] = [];
    let removedCount = 0;

    const processedLines = keepLast ? [...lines].reverse() : lines;

    for (const line of processedLines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        output.push(line);
      } else {
        removedCount++;
      }
    }

    if (keepLast) {
      output.reverse();
    }

    if (sortOutput) {
      output.sort((a, b) => caseSensitive 
        ? a.localeCompare(b) 
        : a.toLowerCase().localeCompare(b.toLowerCase())
      );
    }

    return { output: output.join('\n'), removed: removedCount };
  }, [text, caseSensitive, sortOutput, keepLast]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output);
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
          Enter your text
        </Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your list here (one item per line)..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="case-sensitive"
            checked={caseSensitive}
            onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
          />
          <Label htmlFor="case-sensitive" className="text-sm">Case sensitive</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="sort-output"
            checked={sortOutput}
            onCheckedChange={(checked) => setSortOutput(checked as boolean)}
          />
          <Label htmlFor="sort-output" className="text-sm">Sort output alphabetically</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="keep-last"
            checked={keepLast}
            onCheckedChange={(checked) => setKeepLast(checked as boolean)}
          />
          <Label htmlFor="keep-last" className="text-sm">Keep last occurrence</Label>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {text.trim() && (
            <span>Removed {result.removed} duplicate{result.removed !== 1 ? 's' : ''}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!result.output}
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

      <div>
        <Label className="text-base font-medium block mb-2">Result</Label>
        <Textarea
          value={result.output}
          readOnly
          className="min-h-[200px] font-mono text-sm bg-muted"
          placeholder="Result will appear here..."
        />
      </div>
    </div>
  );
}
