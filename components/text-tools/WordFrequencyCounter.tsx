"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Copy, Check, Download } from "lucide-react";
import { toast } from "sonner";

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

export default function WordFrequencyCounter() {
  const [text, setText] = useState("");
  const [excludeStopWords, setExcludeStopWords] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordData = useMemo(() => {
    if (!text.trim()) return [];

    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const totalWords = words.length;

    const frequency: Record<string, number> = {};
    words.forEach(word => {
      if (excludeStopWords && STOP_WORDS.has(word)) return;
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .map(([word, count]) => ({
        word,
        count,
        percentage: Math.round((count / totalWords) * 1000) / 10
      }))
      .sort((a, b) => b.count - a.count);
  }, [text, excludeStopWords]);

  const handleCopy = () => {
    const csvContent = "Word,Count,Percentage\n" + 
      wordData.map(item => `${item.word},${item.count},${item.percentage}%`).join("\n");
    navigator.clipboard.writeText(csvContent);
    setCopied(true);
    toast.success("Data copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const csvContent = "Word,Count,Percentage\n" + 
      wordData.map(item => `${item.word},${item.count},${item.percentage}%`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-frequency.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
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
          placeholder="Paste your text here to analyze word frequency..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="exclude-stop-words"
            checked={excludeStopWords}
            onCheckedChange={(checked) => setExcludeStopWords(checked as boolean)}
          />
          <Label htmlFor="exclude-stop-words" className="text-sm">Exclude stop words</Label>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!wordData.length}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy CSV"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={!wordData.length}
          >
            <Download className="h-4 w-4" />
            Export CSV
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

      {wordData.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Word Frequency ({wordData.length} unique words)</h3>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 bg-muted p-3 font-medium text-sm">
              <div className="col-span-6">Word</div>
              <div className="col-span-3">Count</div>
              <div className="col-span-3">Percentage</div>
            </div>
            <div className="max-h-[400px] overflow-auto">
              {wordData.map((item, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-12 p-3 border-t text-sm"
                >
                  <div className="col-span-6 font-medium">{item.word}</div>
                  <div className="col-span-3">{item.count}</div>
                  <div className="col-span-3">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
