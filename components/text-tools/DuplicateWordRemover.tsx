"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function DuplicateWordRemover() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [preservePunctuation, setPreservePunctuation] = useState(true);
  const [outputFormat, setOutputFormat] = useState<"paragraph" | "list">("paragraph");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text.trim()) return "";

    const words = text.match(preservePunctuation ? /\w+|[^\w\s]/g : /\w+/g) || [];
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const word of words) {
      const key = caseSensitive ? word : word.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(word);
      }
    }

    if (outputFormat === "list") {
      return unique.join(", ");
    }
    return unique.join(" ");
  }, [text, caseSensitive, preservePunctuation, outputFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const originalCount = (text.match(/\w+/g) || []).length;
  const resultCount = (result.match(/\w+/g) || []).length;
  const removed = originalCount - resultCount;

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
          placeholder="Paste your text or keyword list here..."
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
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
              id="preserve-punctuation"
              checked={preservePunctuation}
              onCheckedChange={(checked) => setPreservePunctuation(checked as boolean)}
            />
            <Label htmlFor="preserve-punctuation" className="text-sm">Preserve punctuation</Label>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium block mb-3">Output format</Label>
          <RadioGroup value={outputFormat} onValueChange={(v) => setOutputFormat(v as typeof outputFormat)}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="paragraph" id="paragraph" />
              <Label htmlFor="paragraph" className="text-sm">Paragraph</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="list" id="list" />
              <Label htmlFor="list" className="text-sm">Comma-separated list</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {text.trim() && (
            <span>Removed {removed} duplicate{removed !== 1 ? 's' : ''} ({originalCount} → {resultCount} words)</span>
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
          className="min-h-[150px] max-h-[500px] overflow-y-auto font-mono text-sm bg-muted"
          placeholder="Result will appear here..."
        />
      </div>
    </div>
  );
}
