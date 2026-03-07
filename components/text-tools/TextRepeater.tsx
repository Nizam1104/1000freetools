"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function TextRepeater() {
  const [text, setText] = useState("");
  const [repeatCount, setRepeatCount] = useState(5);
  const [separator, setSeparator] = useState<"newline" | "comma" | "space" | "custom">("newline");
  const [customSeparator, setCustomSeparator] = useState("");
  const [numberLines, setNumberLines] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text.trim()) return "";

    let sep = "";
    switch (separator) {
      case "newline": sep = "\n"; break;
      case "comma": sep = ", "; break;
      case "space": sep = " "; break;
      case "custom": sep = customSeparator; break;
    }

    const repeated = Array.from({ length: repeatCount }, (_, i) => 
      numberLines ? `${i + 1}. ${text.trim()}` : text.trim()
    );

    return repeated.join(sep);
  }, [text, repeatCount, separator, customSeparator, numberLines]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
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
          Text to repeat
        </Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to repeat..."
          className="min-h-[80px] font-mono text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="repeat-count" className="text-base font-medium block mb-2">
            Number of times
          </Label>
          <Input
            id="repeat-count"
            type="number"
            min="1"
            max="10000"
            value={repeatCount}
            onChange={(e) => setRepeatCount(parseInt(e.target.value) || 1)}
          />
        </div>

        <div>
          <Label htmlFor="separator" className="text-base font-medium block mb-2">
            Separator
          </Label>
          <select
            id="separator"
            value={separator}
            onChange={(e) => setSeparator(e.target.value as typeof separator)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="newline">Newline</option>
            <option value="comma">Comma</option>
            <option value="space">Space</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {separator === "custom" && (
          <div>
            <Label htmlFor="custom-sep" className="text-base font-medium block mb-2">
              Custom separator
            </Label>
            <Input
              id="custom-sep"
              value={customSeparator}
              onChange={(e) => setCustomSeparator(e.target.value)}
              placeholder="Enter separator..."
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Checkbox
          id="number-lines"
          checked={numberLines}
          onCheckedChange={(checked) => setNumberLines(checked as boolean)}
        />
        <Label htmlFor="number-lines" className="text-sm">Number each repetition (1., 2., 3...)</Label>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {text.trim() && (
            <span>Output: {result.length} characters, {result.split(separator === "newline" ? "\n" : separator === "comma" ? "," : " ").length} items</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!result}
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
          value={result}
          readOnly
          className="min-h-[200px] font-mono text-sm bg-muted"
          placeholder="Result will appear here..."
        />
      </div>
    </div>
  );
}
