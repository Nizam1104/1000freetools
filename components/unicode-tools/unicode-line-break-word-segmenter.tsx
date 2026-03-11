"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeLineBreakWordSegmenter() {
  const [input, setInput] = useState("");
  const [lineBreaks, setLineBreaks] = useState<string[]>([]);
  const [wordSegments, setWordSegments] = useState<string[]>([]);
  const [maxLineLength, setMaxLineLength] = useState(40);

  const segmentWords = () => {
    if (!input) return;
    
    const segmenter = new Intl.Segmenter("en", { granularity: "word" });
    const segments = Array.from(segmenter.segment(input));
    setWordSegments(segments.map((s) => s.segment));
  };

  const applyLineBreaks = () => {
    if (!input) return;

    const words = input.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + word).length <= maxLineLength) {
        currentLine = currentLine ? currentLine + " " + word : word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    setLineBreaks(lines);
  };

  const handleClear = () => {
    setInput("");
    setLineBreaks([]);
    setWordSegments([]);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Line Break & Word Segmenter</h2>
        <p className="text-sm text-muted-foreground">
          Analyze and apply Unicode line breaking and word segmentation rules
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to analyze..."
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxLineLength">Max Line Length: {maxLineLength} characters</Label>
            <Input
              id="maxLineLength"
              type="range"
              min="20"
              max="80"
              value={maxLineLength}
              onChange={(e) => setMaxLineLength(parseInt(e.target.value))}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={segmentWords} disabled={!input}>
              Segment Words
            </Button>
            <Button onClick={applyLineBreaks} disabled={!input}>
              Apply Line Breaks
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button onClick={segmentWords} disabled={!input}>
          Segment Words
        </Button>
        <Button onClick={applyLineBreaks} disabled={!input}>
          Apply Line Breaks
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {wordSegments.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Word Segments ({wordSegments.length})</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(wordSegments.join(" | "))}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {wordSegments.map((segment, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded text-sm ${
                  segment.trim() === "" ? "bg-yellow-100 text-yellow-800" : "bg-muted"
                }`}
              >
                "{segment}"{segment.trim() === "" && " (whitespace)"}
              </span>
            ))}
          </div>
        </Card>
      )}

      {lineBreaks.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Line Breaks ({lineBreaks.length} lines)</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(lineBreaks.join("\n"))}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="space-y-2">
            {lineBreaks.map((line, i) => (
              <div key={i} className="p-2 bg-muted rounded font-mono text-sm">
                <span className="text-muted-foreground mr-2">{i + 1}.</span>
                {line}
                <span className="text-muted-foreground ml-2">({line.length} chars)</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Unicode Line Breaking (UAX #14)</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Unicode defines complex rules for determining where line breaks can occur in text.
          These rules consider character properties, word boundaries, and language-specific rules.
        </p>
        <h4 className="font-semibold mb-2">Word Segmentation (UAX #29)</h4>
        <p className="text-sm text-muted-foreground">
          Word segmentation identifies word boundaries in text, which is essential for:
        </p>
        <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1">
          <li>Text selection and editing</li>
          <li>Spell checking</li>
          <li>Search functionality</li>
          <li>Text-to-speech systems</li>
        </ul>
      </Card>
    </div>
  );
}
