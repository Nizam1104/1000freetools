"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, BarChart3 } from "lucide-react";

interface FontStatistics {
  characterCount: number;
  wordCount: number;
  lineCount: number;
  avgWordLength: number;
  longestWord: string;
  shortestWord: string;
  uniqueCharacters: number;
  mostUsedChar: { char: string; count: number };
  leastUsedChar: { char: string; count: number };
  vowelCount: number;
  consonantCount: number;
  numberCount: number;
  spaceCount: number;
  specialCharCount: number;
  readabilityScore: number;
  avgSentenceLength: number;
}

export default function FontStatisticsAnalyzer() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState<FontStatistics | null>(null);
  const [charFrequency, setCharFrequency] = useState<Array<{ char: string; count: number; percentage: number }>>([]);
  const [wordFrequency, setWordFrequency] = useState<Array<{ word: string; count: number }>>([]);
  const [copied, setCopied] = useState(false);

  const analyzeText = useCallback(() => {
    if (!text) {
      setStats(null);
      setCharFrequency([]);
      setWordFrequency([]);
      return;
    }

    const characters = text.split("");
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const lines = text.split("\n");
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    // Character frequency
    const charFreq: Record<string, number> = {};
    characters.forEach((char) => {
      charFreq[char] = (charFreq[char] || 0) + 1;
    });

    const sortedChars = Object.entries(charFreq)
      .sort((a, b) => b[1] - a[1])
      .map(([char, count]) => ({
        char: char === " " ? "(space)" : char === "\n" ? "(newline)" : char,
        count,
        percentage: (count / characters.length) * 100,
      }));

    // Word frequency
    const wordFreq: Record<string, number> = {};
    words.forEach((word) => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({ word, count }));

    // Calculate statistics
    const vowels = text.toLowerCase().match(/[aeiou]/g) || [];
    const consonants = text.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g) || [];
    const numbers = text.match(/\d/g) || [];
    const spaces = text.match(/ /g) || [];
    const specialChars = text.match(/[^a-zA-Z0-9\s]/g) || [];

    const wordLengths = words.map((w) => w.length);
    const avgWordLength = wordLengths.length > 0
      ? wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length
      : 0;

    const sortedByLength = [...words].sort((a, b) => b.length - a.length);
    const longestWord = sortedByLength[0] || "";
    const shortestWord = sortedByLength[sortedByLength.length - 1] || "";

    const avgSentenceLength = sentences.length > 0
      ? words.length / sentences.length
      : 0;

    // Simple readability score (Flesch-Kincaid approximation)
    const syllableCount = words.reduce((acc, word) => {
      return acc + (word.match(/[aeiouy]+/g) || []).length;
    }, 0);
    const readabilityScore = words.length > 0 && sentences.length > 0
      ? 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllableCount / words.length)
      : 0;

    const statistics: FontStatistics = {
      characterCount: characters.length,
      wordCount: words.length,
      lineCount: lines.length,
      avgWordLength: parseFloat(avgWordLength.toFixed(2)),
      longestWord,
      shortestWord,
      uniqueCharacters: Object.keys(charFreq).length,
      mostUsedChar: sortedChars[0] || { char: "", count: 0 },
      leastUsedChar: sortedChars[sortedChars.length - 1] || { char: "", count: 0 },
      vowelCount: vowels.length,
      consonantCount: consonants.length,
      numberCount: numbers.length,
      spaceCount: spaces.length,
      specialCharCount: specialChars.length,
      readabilityScore: parseFloat(readabilityScore.toFixed(2)),
      avgSentenceLength: parseFloat(avgSentenceLength.toFixed(2)),
    };

    setStats(statistics);
    setCharFrequency(sortedChars.slice(0, 20));
    setWordFrequency(sortedWords);
  }, [text]);

  const copyToClipboard = useCallback(async () => {
    if (!stats) return;
    try {
      const textOutput = `Text Statistics:
Characters: ${stats.characterCount}
Words: ${stats.wordCount}
Lines: ${stats.lineCount}
Avg Word Length: ${stats.avgWordLength}
Longest Word: ${stats.longestWord}
Shortest Word: ${stats.shortestWord}
Unique Characters: ${stats.uniqueCharacters}
Most Used: ${stats.mostUsedChar.char} (${stats.mostUsedChar.count})
Readability Score: ${stats.readabilityScore}`;
      await navigator.clipboard.writeText(textOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [stats]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Text Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="text">Enter Text to Analyze</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here to analyze font statistics..."
                className="mt-1 h-64 font-mono text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={analyzeText} className="flex-1">
                Analyze
              </Button>
              <Button variant="outline" onClick={copyToClipboard} disabled={!stats}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats ? (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold">{stats.characterCount}</div>
                    <div className="text-xs text-muted-foreground">Characters</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold">{stats.wordCount}</div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold">{stats.lineCount}</div>
                    <div className="text-xs text-muted-foreground">Lines</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Avg Word Length</Label>
                    <p className="text-lg font-semibold">{stats.avgWordLength}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Unique Characters</Label>
                    <p className="text-lg font-semibold">{stats.uniqueCharacters}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Longest Word</Label>
                    <p className="text-sm font-semibold truncate">{stats.longestWord}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Shortest Word</Label>
                    <p className="text-sm font-semibold">{stats.shortestWord}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <Label className="text-xs">Vowels</Label>
                    <p className="text-lg font-semibold">{stats.vowelCount}</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Label className="text-xs">Consonants</Label>
                    <p className="text-lg font-semibold">{stats.consonantCount}</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <Label className="text-xs">Numbers</Label>
                    <p className="text-lg font-semibold">{stats.numberCount}</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <Label className="text-xs">Special Chars</Label>
                    <p className="text-lg font-semibold">{stats.specialCharCount}</p>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <Label className="text-xs">Readability Score</Label>
                  <p className={`text-lg font-semibold ${
                    stats.readabilityScore >= 60 ? "text-green-600" :
                    stats.readabilityScore >= 30 ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {stats.readabilityScore}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stats.readabilityScore >= 60 ? "Easy to read" :
                     stats.readabilityScore >= 30 ? "Moderate difficulty" : "Difficult to read"}
                  </p>
                </div>

                <div>
                  <Label>Character Frequency (Top 10)</Label>
                  <div className="mt-2 space-y-1">
                    {charFrequency.slice(0, 10).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-8 font-mono">{item.char}</span>
                        <div className="flex-1 bg-muted rounded h-4 overflow-hidden">
                          <div
                            className="bg-primary h-full"
                            style={{ width: `${item.percentage * 3}%` }}
                          />
                        </div>
                        <span className="text-xs w-12 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <p>Enter text and click "Analyze" to see statistics</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {wordFrequency.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Word Frequency (Top 20)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {wordFrequency.map((item, index) => (
                <div key={index} className="p-2 bg-muted rounded text-center">
                  <div className="font-semibold">{item.word}</div>
                  <div className="text-xs text-muted-foreground">{item.count}x</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
