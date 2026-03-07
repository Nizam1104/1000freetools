"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function FindAndReplaceText() {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text || !findText) return { output: text, count: 0 };

    let pattern: string | RegExp = findText;
    
    if (useRegex) {
      try {
        pattern = new RegExp(findText, caseSensitive ? "g" : "gi");
      } catch {
        return { output: text, count: 0, error: "Invalid regex pattern" };
      }
    } else {
      const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (wholeWord) {
        pattern = new RegExp(`\\b${escaped}\\b`, caseSensitive ? "g" : "gi");
      } else {
        pattern = new RegExp(escaped, caseSensitive ? "g" : "gi");
      }
    }

    const matches = text.match(pattern);
    const count = matches ? matches.length : 0;
    const output = text.replace(pattern, replaceText);

    return { output, count };
  }, [text, findText, replaceText, caseSensitive, useRegex, wholeWord]);

  const handleReplaceAll = () => {
    if (result.output) {
      setText(result.output);
      toast.success(`Replaced ${result.count} occurrence${result.count !== 1 ? 's' : ''}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setFindText("");
    setReplaceText("");
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
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="find" className="text-base font-medium block mb-2">
            Find
          </Label>
          <Input
            id="find"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Text to find..."
          />
        </div>
        <div>
          <Label htmlFor="replace" className="text-base font-medium block mb-2">
            Replace
          </Label>
          <Input
            id="replace"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="Replacement text..."
          />
        </div>
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
            id="use-regex"
            checked={useRegex}
            onCheckedChange={(checked) => setUseRegex(checked as boolean)}
          />
          <Label htmlFor="use-regex" className="text-sm">Use regex</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="whole-word"
            checked={wholeWord}
            onCheckedChange={(checked) => setWholeWord(checked as boolean)}
            disabled={useRegex}
          />
          <Label htmlFor="whole-word" className="text-sm">Whole word only</Label>
        </div>
      </div>

      {findText && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {result.count} occurrence{result.count !== 1 ? 's' : ''}
          {"error" in result && result.error && (
            <span className="text-destructive ml-2">({result.error})</span>
          )}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <Button
          onClick={handleReplaceAll}
          disabled={!findText || result.count === 0}
        >
          Replace All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!result.output || result.output === text}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      {result.output !== text && (
        <div>
          <Label className="text-base font-medium block mb-2">Result</Label>
          <Textarea
            value={result.output}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-muted"
          />
        </div>
      )}
    </div>
  );
}
