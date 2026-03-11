"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, AlertTriangle } from "lucide-react";

export default function UnicodeConfusablesHomoglyphDetector() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Array<{
    char: string;
    position: number;
    confusables: string[];
    risk: "high" | "medium" | "low";
  }>>([]);

  // Common confusables/homoglyphs
  const confusables: Record<string, { chars: string[]; risk: "high" | "medium" | "low" }> = {
    "a": { chars: ["а", "ɑ", "α", "a"], risk: "high" }, // Cyrillic, Latin alpha, Greek alpha
    "A": { chars: ["А", "Α", "A"], risk: "high" }, // Cyrillic, Greek
    "b": { chars: ["Ь", "6"], risk: "medium" }, // Cyrillic soft sign, digit
    "c": { chars: ["с", "ϲ", "ᴄ"], risk: "high" }, // Cyrillic, Greek lunate
    "C": { chars: ["С", "Ϲ", "Ⅽ"], risk: "high" }, // Cyrillic, Greek, Roman numeral
    "d": { chars: ["ԁ"], risk: "medium" },
    "D": { chars: ["D", "Ⅾ"], risk: "low" }, // Roman numeral
    "e": { chars: ["е", "ε", "ᴇ"], risk: "high" }, // Cyrillic, Greek epsilon
    "E": { chars: ["Е", "Ε", "ᴱ"], risk: "high" }, // Cyrillic, Greek
    "h": { chars: ["һ"], risk: "medium" }, // Cyrillic
    "H": { chars: ["Н", "Η", "H"], risk: "high" }, // Cyrillic, Greek
    "i": { chars: ["і", "ι", "ɪ", "¡"], risk: "high" }, // Cyrillic, Greek iota
    "I": { chars: ["І", "Ι", "I", "Ⅰ"], risk: "high" }, // Cyrillic, Greek, Roman numeral
    "j": { chars: ["ј"], risk: "medium" }, // Cyrillic
    "k": { chars: ["κ", "ᴋ"], risk: "medium" }, // Greek kappa
    "K": { chars: ["К", "Κ"], risk: "high" }, // Cyrillic, Greek
    "l": { chars: ["ӏ", "ℓ", "ⅼ"], risk: "high" }, // Cyrillic palochka, Roman numeral
    "L": { chars: ["L", "Ⅼ"], risk: "low" }, // Roman numeral
    "m": { chars: ["м", "ᴍ"], risk: "medium" }, // Cyrillic
    "M": { chars: ["М", "Μ", "M"], risk: "high" }, // Cyrillic, Greek
    "n": { chars: ["п", "η", "ɴ"], risk: "high" }, // Cyrillic, Greek eta
    "N": { chars: ["Ν", "N", "Ⅳ"], risk: "medium" }, // Greek, Roman numeral
    "o": { chars: ["о", "ο", "ᴏ", "°"], risk: "high" }, // Cyrillic, Greek omicron
    "O": { chars: ["О", "Ο", "O", "Ⅿ"], risk: "high" }, // Cyrillic, Greek, Roman numeral
    "p": { chars: ["р", "ρ", "ᴘ"], risk: "high" }, // Cyrillic, Greek rho
    "P": { chars: ["Р", "Ρ", "P"], risk: "high" }, // Cyrillic, Greek
    "r": { chars: ["г", "ʀ"], risk: "medium" }, // Cyrillic
    "R": { chars: ["R", "ⅅ", "ⅆ"], risk: "low" },
    "s": { chars: ["ѕ", "ѕ"], risk: "medium" }, // Cyrillic
    "S": { chars: ["Ѕ", "S"], risk: "medium" }, // Cyrillic
    "t": { chars: ["т", "τ", "ᴛ"], risk: "high" }, // Cyrillic, Greek tau
    "T": { chars: ["Т", "Τ", "T"], risk: "high" }, // Cyrillic, Greek
    "u": { chars: ["ս", "ᴜ"], risk: "medium" }, // Armenian
    "U": { chars: ["U"], risk: "low" },
    "v": { chars: ["ᴠ", "ν"], risk: "medium" }, // Greek nu
    "V": { chars: ["V", "Ⅴ"], risk: "low" }, // Roman numeral
    "w": { chars: ["ᴡ", "ω"], risk: "medium" }, // Greek omega
    "W": { chars: ["W", "Ω"], risk: "low" }, // Greek omega
    "x": { chars: ["х", "χ", "ˣ"], risk: "high" }, // Cyrillic, Greek chi
    "X": { chars: ["Х", "Χ", "X", "Ⅹ"], risk: "high" }, // Cyrillic, Greek, Roman numeral
    "y": { chars: ["у", "γ", "ʏ"], risk: "high" }, // Cyrillic, Greek gamma
    "Y": { chars: ["У", "Υ", "Y"], risk: "high" }, // Cyrillic, Greek upsilon
    "z": { chars: ["ᴢ"], risk: "low" },
    "Z": { chars: ["Z", "Ζ", "ⅤⅠ"], risk: "medium" }, // Greek
    "0": { chars: ["0", "O", "Ο"], risk: "high" }, // Letter O
    "1": { chars: ["1", "l", "I", "Ⅰ"], risk: "high" }, // Letter l, I
    "2": { chars: ["2", "Z"], risk: "low" },
    "3": { chars: ["3", "Ɛ"], risk: "low" },
    "4": { chars: ["4"], risk: "low" },
    "5": { chars: ["5", "S"], risk: "low" },
    "6": { chars: ["6", "b"], risk: "low" },
    "7": { chars: ["7"], risk: "low" },
    "8": { chars: ["8", "B"], risk: "low" },
    "9": { chars: ["9", "q"], risk: "low" },
    ".": { chars: [".", "。"], risk: "low" }, // Fullwidth full stop
    "-": { chars: ["-", "‐", "‑", "‒", "–", "—"], risk: "medium" }, // Various dashes
  };

  const detectConfusables = () => {
    if (!input) return;

    const detected: typeof results = [];
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const confusable = confusables[char];
      
      if (confusable) {
        detected.push({
          char,
          position: i + 1,
          confusables: confusable.chars,
          risk: confusable.risk,
        });
      }
    }

    setResults(detected);
  };

  const handleCopy = async () => {
    if (input) {
      await navigator.clipboard.writeText(input);
    }
  };

  const handleClear = () => {
    setInput("");
    setResults([]);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode Confusables & Homoglyph Detector</h2>
        <p className="text-sm text-muted-foreground">
          Detect visually similar characters that can be used for phishing or spoofing
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Text to Analyze</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to check for confusable characters..."
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Useful for detecting homoglyph attacks in URLs, usernames, and domain names
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={detectConfusables} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Detect Confusables
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={detectConfusables} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Detect
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {results.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">
              Found {results.length} character{results.length !== 1 ? "s" : ""} with confusables
            </h3>
          </div>
          <div className="space-y-3">
            {results.map((result, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono p-2 bg-muted rounded">"{result.char}"</span>
                    <span className="text-sm text-muted-foreground">
                      Position {result.position}, U+{result.char.codePointAt(0)?.toString(16).toUpperCase()}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.risk === "high" 
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      : result.risk === "medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  }`}>
                    {result.risk} risk
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Confusables: </span>
                  <span className="font-mono">
                    {result.confusables.map((c) => `"${c}"`).join(" ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {input && results.length === 0 && (
        <Card className="p-4 border-green-500">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-700 dark:text-green-300">
              No confusable characters detected in the input
            </p>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">What are Confusables?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Confusables (homoglyphs) are characters that look similar but have different Unicode code points.
          They can be used in phishing attacks to create deceptive URLs or usernames.
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-red-50 dark:bg-red-950 rounded">
            <div className="font-semibold text-red-700 dark:text-red-300">High Risk Examples</div>
            <div className="font-mono mt-1">
              а (Cyrillic) vs a (Latin) | е (Cyrillic) vs e (Latin) | о (Cyrillic) vs o (Latin)
            </div>
          </div>
          <div className="p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
            <div className="font-semibold text-yellow-700 dark:text-yellow-300">Common Attack</div>
            <div className="font-mono mt-1">
              "аррӏе.com" (with Cyrillic characters) vs "apple.com"
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
