"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function WhitespaceRemover() {
  const [text, setText] = useState("");
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeLeadingTrailing, setRemoveLeadingTrailing] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(false);
  const [removeConsecutiveBlanks, setRemoveConsecutiveBlanks] = useState(true);
  const [tabsToSpaces, setTabsToSpaces] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text) return "";

    let output = text;

    if (tabsToSpaces) {
      output = output.replace(/\t/g, "    ");
    }

    if (removeLeadingTrailing) {
      output = output.split('\n').map(line => line.trim()).join('\n');
    }

    if (removeExtraSpaces) {
      output = output.replace(/  +/g, " ");
    }

    if (removeBlankLines) {
      output = output.split('\n').filter(line => line.trim().length > 0).join('\n');
    } else if (removeConsecutiveBlanks) {
      output = output.replace(/\n{3,}/g, "\n\n");
    }

    return output;
  }, [text, removeExtraSpaces, removeLeadingTrailing, removeBlankLines, removeConsecutiveBlanks, tabsToSpaces]);

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
          placeholder="Paste your messy text here..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="extra-spaces"
              checked={removeExtraSpaces}
              onCheckedChange={(checked) => setRemoveExtraSpaces(checked as boolean)}
            />
            <Label htmlFor="extra-spaces" className="text-sm">Remove extra spaces (normalize)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="leading-trailing"
              checked={removeLeadingTrailing}
              onCheckedChange={(checked) => setRemoveLeadingTrailing(checked as boolean)}
            />
            <Label htmlFor="leading-trailing" className="text-sm">Remove leading/trailing whitespace per line</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="tabs-spaces"
              checked={tabsToSpaces}
              onCheckedChange={(checked) => setTabsToSpaces(checked as boolean)}
            />
            <Label htmlFor="tabs-spaces" className="text-sm">Convert tabs to spaces (4 spaces)</Label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="blank-lines"
              checked={removeBlankLines}
              onCheckedChange={(checked) => setRemoveBlankLines(checked as boolean)}
            />
            <Label htmlFor="blank-lines" className="text-sm">Remove all blank lines</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="consecutive-blanks"
              checked={removeConsecutiveBlanks}
              onCheckedChange={(checked) => setRemoveConsecutiveBlanks(checked as boolean)}
              disabled={removeBlankLines}
            />
            <Label htmlFor="consecutive-blanks" className="text-sm">Remove consecutive blank lines</Label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {text && (
            <span>Original: {text.length} chars → Cleaned: {result.length} chars</span>
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-medium block mb-2">Original</Label>
          <Textarea
            value={text}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted"
            placeholder="Original text..."
          />
        </div>
        <div>
          <Label className="text-base font-medium block mb-2">Cleaned Result</Label>
          <Textarea
            value={result}
            readOnly
            className="min-h-[200px] font-mono text-sm"
            placeholder="Cleaned text will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
