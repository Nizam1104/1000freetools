"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  pages: number;
  readingTime: string;
  speakingTime: string;
  avgSentenceLength: number;
  keywordDensity: Array<{ word: string; count: number; percentage: number }>;
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "must", "shall", "can", "need",
  "dare", "ought", "used", "it", "its", "this", "that", "these", "those",
  "i", "you", "he", "she", "we", "they", "what", "which", "who", "whom",
  "whose", "where", "when", "why", "how", "all", "each", "every", "both",
  "few", "more", "most", "other", "some", "such", "no", "nor", "not",
  "only", "own", "same", "so", "than", "too", "very", "just", "as"
]);

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats: TextStats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        pages: 0,
        readingTime: "0 min",
        speakingTime: "0 min",
        avgSentenceLength: 0,
        keywordDensity: []
      };
    }

    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, "").length;
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    const pages = Math.ceil(charCount / 1500) || 0;
    
    const wordsPerMinute = 200;
    const speakingWordsPerMinute = 130;
    const readingMinutes = Math.ceil(wordCount / wordsPerMinute);
    const speakingMinutes = Math.ceil(wordCount / speakingWordsPerMinute);

    const avgSentenceLen = sentences.length > 0 
      ? Math.round(wordCount / sentences.length * 10) / 10 
      : 0;

    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/gi, "");
      if (clean && !STOP_WORDS.has(clean)) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(wordFreq)
      .map(([word, count]) => ({
        word,
        count,
        percentage: Math.round((count / wordCount) * 1000) / 10
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      words: wordCount,
      characters: charCount,
      charactersNoSpaces: charNoSpaces,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      pages,
      readingTime: `${readingMinutes} min`,
      speakingTime: `${speakingMinutes} min`,
      avgSentenceLength: avgSentenceLen,
      keywordDensity
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
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
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="text-input" className="text-base font-medium">
            Enter your text
          </Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!text}
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
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.words}</div>
          <div className="text-sm text-muted-foreground">Words</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.characters}</div>
          <div className="text-sm text-muted-foreground">Characters</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.charactersNoSpaces}</div>
          <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.sentences}</div>
          <div className="text-sm text-muted-foreground">Sentences</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.paragraphs}</div>
          <div className="text-sm text-muted-foreground">Paragraphs</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.pages}</div>
          <div className="text-sm text-muted-foreground">Pages</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.readingTime}</div>
          <div className="text-sm text-muted-foreground">Reading time</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.speakingTime}</div>
          <div className="text-sm text-muted-foreground">Speaking time</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Social Media Limits</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Twitter (280)</span>
              <span className={`text-sm ${stats.characters > 280 ? "text-destructive" : "text-foreground"}`}>
                {stats.characters}/280
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Instagram (2200)</span>
              <span className={`text-sm ${stats.characters > 2200 ? "text-destructive" : "text-foreground"}`}>
                {stats.characters}/2200
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Meta description (160)</span>
              <span className={`text-sm ${stats.characters > 160 ? "text-destructive" : "text-foreground"}`}>
                {stats.characters}/160
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">
            Avg. Sentence Length: {stats.avgSentenceLength} words
          </h3>
          <div className="text-sm text-muted-foreground">
            {stats.avgSentenceLength < 15 && "Short and punchy sentences"}
            {stats.avgSentenceLength >= 15 && stats.avgSentenceLength < 25 && "Good balance"}
            {stats.avgSentenceLength >= 25 && "Consider breaking up long sentences"}
          </div>
        </div>
      </div>

      {stats.keywordDensity.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Top Keywords</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {stats.keywordDensity.map((item, i) => (
              <div key={i} className="bg-muted rounded p-2">
                <div className="font-medium text-sm truncate">{item.word}</div>
                <div className="text-xs text-muted-foreground">
                  {item.count} ({item.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
