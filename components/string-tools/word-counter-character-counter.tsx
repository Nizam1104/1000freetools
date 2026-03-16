"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function WordCounterCharacterCounter() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  const calculateStats = (text: string) => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
    const lines = text ? text.split(/\n/).length : 0;
    const readingTime = Math.ceil(words / 200); // 200 words per minute
    const speakingTime = Math.ceil(words / 130); // 130 words per minute

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs: paragraphs || (text.trim() ? 1 : 0),
      lines,
      readingTime,
      speakingTime,
    });
  };

  const handleClear = () => {
    setInput("");
    setStats({
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: 0,
      speakingTime: 0,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Word Counter & Character Counter</h2>
        <p className="text-sm text-muted-foreground">
          Count characters, words, sentences, paragraphs, and reading time in real-time
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
              placeholder="Start typing or paste your text here..."
              className="w-full min-h-[300px] p-3 rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => calculateStats(input)} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Recalculate
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
          Calculate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {input && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.characters}</div>
              <div className="text-sm text-muted-foreground">Characters</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.charactersNoSpaces}</div>
              <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.words}</div>
              <div className="text-sm text-muted-foreground">Words</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.sentences}</div>
              <div className="text-sm text-muted-foreground">Sentences</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.paragraphs}</div>
              <div className="text-sm text-muted-foreground">Paragraphs</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.lines}</div>
              <div className="text-sm text-muted-foreground">Lines</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.readingTime} min</div>
              <div className="text-sm text-muted-foreground">Reading Time</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.speakingTime} min</div>
              <div className="text-sm text-muted-foreground">Speaking Time</div>
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Platform Limits</h3>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Twitter / X</span>
            <span className="font-mono">280 characters</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Instagram Caption</span>
            <span className="font-mono">2,200 characters</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>LinkedIn Post</span>
            <span className="font-mono">3,000 characters</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Meta Description</span>
            <span className="font-mono">150-160 characters</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>Page Title</span>
            <span className="font-mono">50-60 characters</span>
          </div>
          <div className="flex justify-between p-2 bg-muted rounded">
            <span>SMS Message</span>
            <span className="font-mono">160 characters</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
