"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function SentenceCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        sentences: 0,
        clauses: 0,
        paragraphs: 0,
        words: 0,
        avgSentenceLength: 0,
        avgWordsPerSentence: 0
      };
    }

    // Count sentences - handle abbreviations and edge cases
    const sentenceEndings = text.replace(/(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|vs|etc|e\.g|i\.e)\./gi, '$1<PERIOD>').split(/[.!?]+/);
    const sentences = sentenceEndings.filter(s => s.trim().length > 0 && !s.includes('<PERIOD>'));
    const sentenceCount = sentences.length || (text.trim().length > 0 ? 1 : 0);

    // Count paragraphs
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    // Count words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);

    // Count clauses (approximate - based on commas, semicolons, conjunctions)
    const clauseMarkers = text.match(/[,;:]|(?:\s+(?:and|or|but|because|although|while|if|when|since)\s+)/gi) || [];

    // Average sentence length in characters
    const avgSentenceLength = sentenceCount > 0 
      ? Math.round(text.replace(/\s/g, '').length / sentenceCount) 
      : 0;

    // Average words per sentence
    const avgWordsPerSentence = sentenceCount > 0 
      ? Math.round((words.length / sentenceCount) * 10) / 10 
      : 0;

    return {
      sentences: sentenceCount,
      clauses: clauseMarkers.length,
      paragraphs: paragraphs.length,
      words: words.length,
      avgSentenceLength,
      avgWordsPerSentence
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

  const getReadabilityFeedback = () => {
    if (stats.avgWordsPerSentence === 0) return null;
    if (stats.avgWordsPerSentence < 15) return { label: "Short", desc: "Easy to read, punchy sentences" };
    if (stats.avgWordsPerSentence < 25) return { label: "Medium", desc: "Good balance for most content" };
    if (stats.avgWordsPerSentence < 35) return { label: "Long", desc: "Consider breaking up some sentences" };
    return { label: "Very Long", desc: "Sentences may be hard to follow" };
  };

  const feedback = getReadabilityFeedback();

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
          placeholder="Paste your text here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.sentences}</div>
          <div className="text-sm text-muted-foreground">Sentences</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.clauses}</div>
          <div className="text-sm text-muted-foreground">Clauses</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.paragraphs}</div>
          <div className="text-sm text-muted-foreground">Paragraphs</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.words}</div>
          <div className="text-sm text-muted-foreground">Words</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.avgWordsPerSentence}</div>
          <div className="text-sm text-muted-foreground">Avg words/sentence</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.avgSentenceLength}</div>
          <div className="text-sm text-muted-foreground">Avg chars/sentence</div>
        </div>
      </div>

      {feedback && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">
            Readability: {feedback.label}
          </h3>
          <p className="text-muted-foreground">{feedback.desc}</p>
        </div>
      )}
    </div>
  );
}
