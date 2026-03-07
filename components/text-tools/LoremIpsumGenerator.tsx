"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LOREM_IPSUM_WORDS = LOREM_IPSUM.split(/\s+/);

export default function LoremIpsumGenerator() {
  const [amount, setAmount] = useState(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [useHtml, setUseHtml] = useState(false);
  const [randomize, setRandomize] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateLorem = useCallback(() => {
    const getRandomWord = () => {
      if (!randomize) return LOREM_IPSUM_WORDS[Math.floor(Math.random() * LOREM_IPSUM_WORDS.length)];
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      const length = Math.floor(Math.random() * 8) + 3;
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const generateSentence = () => {
      const wordCount = Math.floor(Math.random() * 10) + 8;
      const words = Array.from({ length: wordCount }, getRandomWord);
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return words.join(' ') + '.';
    };

    if (unit === "words") {
      const words = Array.from({ length: amount }, getRandomWord).join(' ');
      return useHtml ? `<p>${words}</p>` : words;
    }

    if (unit === "sentences") {
      const sentences = Array.from({ length: amount }, generateSentence).join(' ');
      return useHtml ? `<p>${sentences}</p>` : sentences;
    }

    const paragraphs = Array.from({ length: amount }, () => {
      const sentenceCount = Math.floor(Math.random() * 4) + 3;
      const sentences = Array.from({ length: sentenceCount }, generateSentence).join(' ');
      return useHtml ? `<p>${sentences}</p>` : sentences;
    });

    return useHtml ? paragraphs.join('\n') : paragraphs.join('\n\n');
  }, [amount, unit, useHtml, randomize]);

  const output = generateLorem();

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="amount" className="text-base font-medium block mb-2">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            min="1"
            max="100"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="unit" className="text-base font-medium block mb-2">
            Unit
          </Label>
          <Select value={unit} onValueChange={(v) => setUnit(v as typeof unit)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Paragraphs</SelectItem>
              <SelectItem value="sentences">Sentences</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="use-html"
            checked={useHtml}
            onCheckedChange={(checked) => setUseHtml(checked as boolean)}
          />
          <Label htmlFor="use-html" className="text-sm">Wrap in HTML &lt;p&gt; tags</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="randomize"
            checked={randomize}
            onCheckedChange={(checked) => setRandomize(checked as boolean)}
          />
          <Label htmlFor="randomize" className="text-sm">Random gibberish</Label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-base font-medium">Generated Text</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <Textarea
          value={output}
          readOnly
          className="min-h-[200px] font-mono text-sm bg-muted"
        />
      </div>
    </div>
  );
}
