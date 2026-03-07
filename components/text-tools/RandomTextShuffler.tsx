"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function RandomTextShuffler() {
  const [text, setText] = useState("");
  const [shuffleBy, setShuffleBy] = useState<"lines" | "sentences" | "words" | "characters">("lines");
  const [seed, setSeed] = useState("");
  const [useSeed, setUseSeed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Seeded random number generator
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    const seedValue = useSeed && seed ? hashString(seed) : Math.random() * 10000;
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seedValue + i) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const result = useMemo(() => {
    if (!text.trim()) return "";

    let items: string[] = [];
    let joiner = "";

    switch (shuffleBy) {
      case "lines":
        items = text.split('\n');
        joiner = '\n';
        break;
      case "sentences":
        items = text.match(/[^.!?]+[.!?]+/g) || [text];
        joiner = ' ';
        break;
      case "words":
        items = text.split(/\s+/);
        joiner = ' ';
        break;
      case "characters":
        items = text.split('');
        joiner = '';
        break;
    }

    const shuffled = shuffleArray(items);
    return shuffled.join(joiner);
  }, [text, shuffleBy, seed, useSeed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const handleReshuffle = () => {
    if (useSeed) {
      setSeed(seed + "1");
      setTimeout(() => setSeed(seed), 10);
    }
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

      <div className="mb-6">
        <Label className="text-base font-medium block mb-3">Shuffle by</Label>
        <RadioGroup value={shuffleBy} onValueChange={(v) => setShuffleBy(v as typeof shuffleBy)}>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="lines" id="lines" />
              <Label htmlFor="lines" className="text-sm">Lines</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="sentences" id="sentences" />
              <Label htmlFor="sentences" className="text-sm">Sentences</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="words" id="words" />
              <Label htmlFor="words" className="text-sm">Words</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="characters" id="characters" />
              <Label htmlFor="characters" className="text-sm">Characters</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="use-seed"
            checked={useSeed}
            onCheckedChange={(checked) => setUseSeed(checked as boolean)}
          />
          <Label htmlFor="use-seed" className="text-sm">Use seed for reproducible shuffle</Label>
        </div>
        {useSeed && (
          <Input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Enter seed value..."
            className="w-48"
          />
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleReshuffle}
          disabled={!text}
        >
          <RefreshCw className="h-4 w-4" />
          Reshuffle
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {result && (
            <span>Shuffled {shuffleBy}</span>
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
        <Label className="text-base font-medium block mb-2">Shuffled Result</Label>
        <Textarea
          value={result}
          readOnly
          className="min-h-[200px] font-mono text-sm bg-muted"
          placeholder="Shuffled result will appear here..."
        />
      </div>
    </div>
  );
}
