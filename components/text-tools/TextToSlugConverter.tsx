"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, Check, Link } from "lucide-react";
import { toast } from "sonner";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", 
  "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", 
  "to", "was", "were", "will", "with"
]);

export default function TextToSlugConverter() {
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    if (!text.trim()) return "";

    let result = text.toLowerCase();

    if (removeStopWords) {
      const words = result.split(/\s+/);
      result = words.filter(word => !STOP_WORDS.has(word)).join(" ");
    }

    result = result.replace(/[^\w\s-]/g, "");
    result = result.trim();
    result = result.replace(/\s+/g, separator);
    result = result.replace(/-+/g, separator);

    return result;
  }, [text, separator, removeStopWords]);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    toast.success("Slug copied to clipboard");
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
          placeholder="Enter your headline or title here..."
          className="min-h-[100px] font-mono text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-base font-medium block mb-3">Separator</Label>
          <RadioGroup value={separator} onValueChange={setSeparator}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="-" id="hyphen" />
              <Label htmlFor="hyphen" className="text-sm">Hyphen (-)</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="_" id="underscore" />
              <Label htmlFor="underscore" className="text-sm">Underscore (_)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center gap-2 pt-6">
          <Checkbox
            id="remove-stop-words"
            checked={removeStopWords}
            onCheckedChange={(checked) => setRemoveStopWords(checked as boolean)}
          />
          <Label htmlFor="remove-stop-words" className="text-sm">Remove stop words (a, the, is, etc.)</Label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-base font-medium">Result</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!slug}
            >
              {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
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
        <div className="bg-muted rounded-lg p-4 font-mono text-sm break-all">
          {slug || <span className="text-muted-foreground">Slug will appear here...</span>}
        </div>
      </div>

      {slug && (
        <div className="mt-6">
          <Label className="text-base font-medium block mb-2">URL Preview</Label>
          <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
            https://example.com/blog/{slug}
          </div>
        </div>
      )}
    </div>
  );
}
