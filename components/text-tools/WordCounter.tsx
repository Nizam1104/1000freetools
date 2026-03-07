"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

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
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="text-input" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Enter your text
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full min-h-[200px] px-3 py-2.5 text-sm font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition"
        />
      </section>

      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
          Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.words}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Words</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.characters}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Characters</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.charactersNoSpaces}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Characters (no spaces)</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.sentences}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Sentences</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.paragraphs}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Paragraphs</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.pages}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Pages</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.readingTime}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Reading time</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-3 border border-zinc-100 dark:border-zinc-800">
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">{stats.speakingTime}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Speaking time</div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8 mt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Social Media Limits
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Twitter (280)</span>
                <span className={`text-sm font-mono ${stats.characters > 280 ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}`}>
                  {stats.characters}/280
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Instagram (2200)</span>
                <span className={`text-sm font-mono ${stats.characters > 2200 ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}`}>
                  {stats.characters}/2200
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Meta description (160)</span>
                <span className={`text-sm font-mono ${stats.characters > 160 ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}`}>
                  {stats.characters}/160
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Avg. Sentence Length: <span className="font-mono">{stats.avgSentenceLength}</span> words
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {stats.avgSentenceLength < 15 && "Short and punchy sentences."}
              {stats.avgSentenceLength >= 15 && stats.avgSentenceLength < 25 && "Good balance."}
              {stats.avgSentenceLength >= 25 && "Consider breaking up long sentences."}
            </p>
          </div>
        </div>
      </div>

      {stats.keywordDensity.length > 0 && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8 mt-8">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Top Keywords
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {stats.keywordDensity.map((item, i) => (
              <div key={i} className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-3 py-2 border border-zinc-100 dark:border-zinc-800">
                <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">{item.word}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
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
