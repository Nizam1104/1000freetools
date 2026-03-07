"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function TextToListConverter() {
  const [text, setText] = useState("");
  const [outputFormat, setOutputFormat] = useState<"comma" | "bullet" | "numbered" | "json">("comma");
  const [splitBy, setSplitBy] = useState<"newline" | "period" | "comma" | "custom">("newline");
  const [customDelimiter, setCustomDelimiter] = useState(",");
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text.trim()) return "";

    let items: string[] = [];

    switch (splitBy) {
      case "newline":
        items = text.split('\n');
        break;
      case "period":
        items = text.split('.');
        break;
      case "comma":
        items = text.split(',');
        break;
      case "custom":
        items = text.split(customDelimiter);
        break;
    }

    if (trimWhitespace) {
      items = items.map(item => item.trim());
    }

    if (removeEmpty) {
      items = items.filter(item => item.length > 0);
    }

    switch (outputFormat) {
      case "comma":
        return items.join(", ");
      case "bullet":
        return items.map(item => `• ${item}`).join("\n");
      case "numbered":
        return items.map((item, i) => `${i + 1}. ${item}`).join("\n");
      case "json":
        return JSON.stringify(items, null, 2);
      default:
        return items.join(", ");
    }
  }, [text, outputFormat, splitBy, customDelimiter, trimWhitespace, removeEmpty]);

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
          Enter your text
        </Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-base font-medium block mb-3">Split by</Label>
          <RadioGroup value={splitBy} onValueChange={(v) => setSplitBy(v as typeof splitBy)}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="newline" id="newline" />
              <Label htmlFor="newline" className="text-sm">New line</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="period" id="period" />
              <Label htmlFor="period" className="text-sm">Period (.)</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="comma" id="comma-split" />
              <Label htmlFor="comma-split" className="text-sm">Comma (,)</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="custom" id="custom-split" />
              <Label htmlFor="custom-split" className="text-sm">Custom</Label>
            </div>
          </RadioGroup>
          {splitBy === "custom" && (
            <div className="mt-2">
              <input
                type="text"
                value={customDelimiter}
                onChange={(e) => setCustomDelimiter(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                placeholder="Enter delimiter..."
              />
            </div>
          )}
        </div>

        <div>
          <Label className="text-base font-medium block mb-3">Output format</Label>
          <RadioGroup value={outputFormat} onValueChange={(v) => setOutputFormat(v as typeof outputFormat)}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="comma" id="comma-out" />
              <Label htmlFor="comma-out" className="text-sm">Comma-separated</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="bullet" id="bullet" />
              <Label htmlFor="bullet" className="text-sm">Bullet list</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="numbered" id="numbered" />
              <Label htmlFor="numbered" className="text-sm">Numbered list</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="json" id="json" />
              <Label htmlFor="json" className="text-sm">JSON array</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="trim"
            checked={trimWhitespace}
            onCheckedChange={(checked) => setTrimWhitespace(checked as boolean)}
          />
          <Label htmlFor="trim" className="text-sm">Trim whitespace</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="remove-empty"
            checked={removeEmpty}
            onCheckedChange={(checked) => setRemoveEmpty(checked as boolean)}
          />
          <Label htmlFor="remove-empty" className="text-sm">Remove empty items</Label>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {result && (
            <span>{result.split('\n').length} items</span>
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
