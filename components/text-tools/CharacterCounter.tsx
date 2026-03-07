"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

const PLATFORM_LIMITS = [
  { name: "SMS", limit: 160 },
  { name: "Twitter/X", limit: 280 },
  { name: "Meta title", limit: 60 },
  { name: "Meta description", limit: 160 },
  { name: "Instagram bio", limit: 150 },
  { name: "YouTube title", limit: 100 },
];

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    return { withSpaces, withoutSpaces };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setText("");
  };

  const getProgressColor = (count: number, limit: number) => {
    const percentage = (count / limit) * 100;
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 80) return "bg-amber-500";
    return "bg-zinc-900 dark:bg-zinc-100";
  };

  return (
    <main className="mx-auto max-w-3xl py-10">
      <section className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="text-input" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Enter your text
          </label>
          <div className="flex gap-2">
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="flex-1 min-h-[150px] max-h-[500px] overflow-y-auto px-3 py-2.5 text-sm font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCopy}
                disabled={!text}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={handleClear}
                disabled={!text}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-4 border border-zinc-100 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 mb-1">Characters (with spaces)</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-zinc-50 font-mono">{stats.withSpaces}</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md px-4 py-4 border border-zinc-100 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 mb-1">Characters (without spaces)</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-zinc-50 font-mono">{stats.withoutSpaces}</p>
          </div>
        </div>
      </section>

      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">Platform Limits</h2>
        <div className="space-y-4">
          {PLATFORM_LIMITS.map((platform) => {
            const percentage = Math.min((stats.withSpaces / platform.limit) * 100, 100);
            const remaining = platform.limit - stats.withSpaces;
            const isOver = stats.withSpaces > platform.limit;

            return (
              <div key={platform.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{platform.name}</span>
                  <span className={`text-xs font-mono ${isOver ? "text-red-500" : "text-zinc-400"}`}>
                    {stats.withSpaces}/{platform.limit}
                    {!isOver && remaining > 0 && <span className="ml-1 text-zinc-400">({remaining} left)</span>}
                    {isOver && <span className="ml-1">({Math.abs(remaining)} over)</span>}
                  </span>
                </div>
                <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 h-full transition-all ${getProgressColor(stats.withSpaces, platform.limit)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
