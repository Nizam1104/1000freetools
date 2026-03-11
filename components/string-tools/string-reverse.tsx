"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function StringReverse() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"reverse" | "reverseWords" | "reverseLines" | "flip">("reverse");

  const reverse = (text: string) => {
    return text.split("").reverse().join("");
  };

  const reverseWords = (text: string) => {
    return text.split(" ").reverse().join(" ");
  };

  const reverseLines = (text: string) => {
    return text.split("\n").reverse().join("\n");
  };

  const flip = (text: string) => {
    const flipMap: Record<string, string> = {
      a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ",
      j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ",
      s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
      A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I",
      J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ",
      S: "S", T: "┴", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
      "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "h", "5": "S", "6": "9",
      "7": "L", "8": "8", "9": "6",
      ".": "˙", ",": "'", "'": ",", "?": "¿", "!": "¡",
      "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
      "<": ">", ">": "<", "_": "‾", "&": "⅋",
    };
    
    return text
      .split("")
      .map((char) => flipMap[char] || char)
      .reverse()
      .join("");
  };

  const handleConvert = () => {
    if (!input) return;
    
    switch (mode) {
      case "reverse":
        setOutput(reverse(input));
        break;
      case "reverseWords":
        setOutput(reverseWords(input));
        break;
      case "reverseLines":
        setOutput(reverseLines(input));
        break;
      case "flip":
        setOutput(flip(input));
        break;
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">String Reverse Tool</h2>
        <p className="text-sm text-muted-foreground">
          Reverse text, reverse words, reverse lines, or flip text upside down
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {([
              { value: "reverse", label: "Reverse Text" },
              { value: "reverseWords", label: "Reverse Words" },
              { value: "reverseLines", label: "Reverse Lines" },
              { value: "flip", label: "Flip Upside Down" },
            ] as const).map((m) => (
              <Button
                key={m.value}
                variant={mode === m.value ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(m.value)}
              >
                {m.label}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Text Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hello World"
              className="w-full min-h-[100px] p-3 rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {mode === "flip" ? "Flip Text" : mode === "reverseWords" ? "Reverse Words" : mode === "reverseLines" ? "Reverse Lines" : "Reverse"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          {mode === "flip" ? "Flip" : mode === "reverseWords" ? "Reverse Words" : mode === "reverseLines" ? "Reverse Lines" : "Reverse"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Output</Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap break-all bg-muted p-3 rounded">
                {output}
              </pre>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleCopy();
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
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
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Examples</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Reverse Text</div>
            <div className="font-mono">"Hello" → "olleH"</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Reverse Words</div>
            <div className="font-mono">"Hello World" → "World Hello"</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Reverse Lines</div>
            <div className="font-mono">Line 1\nLine 2 → Line 2\nLine 1</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">Flip Upside Down</div>
            <div className="font-mono">"Hello" → "o˥˥ǝH"</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
