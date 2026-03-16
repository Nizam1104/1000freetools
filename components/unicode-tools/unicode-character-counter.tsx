"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UnicodeCharacterCounter() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    codePoints: 0,
    graphemeClusters: 0,
    bytes: { utf8: 0, utf16: 0, utf32: 0 },
    words: 0,
    lines: 0,
  });

  const calculateStats = (text: string) => {
    // Characters (length)
    const characters = text.length;
    
    // Code points (handles surrogate pairs)
    const codePoints = [...text].length;
    
    // Grapheme clusters (handles combining characters)
    const graphemeClusters = Array.from(new Intl.Segmenter().segment(text)).length;
    
    // Bytes
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(text).length;
    const utf16Bytes = characters * 2;
    const utf32Bytes = codePoints * 4;
    
    // Words and lines
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\n/).length : 0;

    setStats({
      characters,
      codePoints,
      graphemeClusters,
      bytes: {
        utf8: utf8Bytes,
        utf16: utf16Bytes,
        utf32: utf32Bytes,
      },
      words,
      lines,
    });
  };

  const handleClear = () => {
    setInput("");
    setStats({
      characters: 0,
      codePoints: 0,
      graphemeClusters: 0,
      bytes: { utf8: 0, utf16: 0, utf32: 0 },
      words: 0,
      lines: 0,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Character Counter</h2>
        <p className="text-sm text-muted-foreground">
          Count characters, code points, grapheme clusters, and bytes in Unicode text
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                calculateStats(e.target.value);
              }}
              placeholder="Enter text to analyze..."
              className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => calculateStats(input)} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Analyze
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={() => calculateStats(input)} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Analyze
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {input && (
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Character Counts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{stats.characters}</div>
                <div className="text-sm text-muted-foreground">Characters (UTF-16)</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{stats.codePoints}</div>
                <div className="text-sm text-muted-foreground">Code Points</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{stats.graphemeClusters}</div>
                <div className="text-sm text-muted-foreground">Grapheme Clusters</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{stats.words}</div>
                <div className="text-sm text-muted-foreground">Words</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Byte Sizes by Encoding</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold font-mono">{stats.bytes.utf8.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">UTF-8 Bytes</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold font-mono">{stats.bytes.utf16.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">UTF-16 Bytes</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold font-mono">{stats.bytes.utf32.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">UTF-32 Bytes</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Lines</div>
                <div className="text-2xl font-bold">{stats.lines}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Reading Time</div>
                <div className="text-2xl font-bold">~{Math.ceil(stats.words / 200)} min</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Understanding the Counts</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Characters:</strong> UTF-16 code units (JavaScript string length)</p>
          <p><strong>Code Points:</strong> Actual Unicode code points (handles emojis and special chars)</p>
          <p><strong>Grapheme Clusters:</strong> User-perceived characters (handles combining marks)</p>
          <p><strong>Example:</strong> "é" can be 1 or 2 code points depending on encoding</p>
        </div>
      </Card>
    </div>
  );
}
