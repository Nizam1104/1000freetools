"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRightLeft, Copy, Check, RotateCcw } from "lucide-react";

const leetMap: Record<string, string[]> = {
  a: ["4", "@", "/\\", "^"],
  b: ["8", "|3", "13", "|o"],
  c: ["(", "[", "<", "{"],
  d: [")", "|)", "[)", "|>"],
  e: ["3", "&", "[-", "€"],
  f: ["|=", "ph", "|#", "v"],
  g: ["6", "9", "&", "[+"],
  h: ["#", "|-|", "}{", "]-["],
  i: ["1", "!", "|", "[]"],
  j: ["_|", ";", "</", "¿"],
  k: ["|<", "|{", "X", "|c"],
  l: ["1", "|", "|_", "/"],
  m: ["/\\/\\", "|v|", "^^", "|'|'"],
  n: ["^/", "|\\|", "/\\/", "|v"],
  o: ["0", "()", "[]", "{}"],
  p: ["|*", "|o", "|>", "|7"],
  q: ["0_", "9", "(_,)", "0,"],
  r: ["|2", "|^", "lz", "|2"],
  s: ["5", "$", "z", "es"],
  t: ["7", "+", "-|-", "']['"],
  u: ["|_|", "(_)", "v", "L|"],
  v: ["\\/", "|/", "|^", "√"],
  w: ["\\/\\/", "|/\\|", "vv", "'//"],
  x: ["><", "}{", ")(", "ecks"],
  y: ["`/", "¥", "j", "|/"],
  z: ["2", "7_", "~/", "≥"],
};

const basicLeetMap: Record<string, string> = {
  a: "4",
  b: "8",
  c: "(",
  d: ")",
  e: "3",
  f: "|=",
  g: "6",
  h: "#",
  i: "1",
  j: "_|",
  k: "|<",
  l: "1",
  m: "/\\/",
  n: "^/",
  o: "0",
  p: "|*",
  q: "0_",
  r: "|2",
  s: "5",
  t: "7",
  u: "|_|",
  v: "\\/",
  w: "\\/\\/",
  x: "><",
  y: "`/",
  z: "2",
};

const advancedLeetMap: Record<string, string> = {
  a: "@",
  b: "|3",
  c: "[",
  d: "|)",
  e: "&",
  f: "ph",
  g: "9",
  h: "}{",
  i: "!",
  j: "</",
  k: "|{",
  l: "|_",
  m: "|v|",
  n: "/\\/",
  o: "()",
  p: "|o",
  q: "(_,)",
  r: "|^",
  s: "$",
  t: "+",
  u: "(_)",
  v: "|/",
  w: "'//",
  x: "}{",
  y: "¥",
  z: "7_",
};

const reverseLeetMap: Record<string, string> = {
  "4": "a",
  "8": "b",
  "(": "c",
  ")": "d",
  "3": "e",
  "|=": "f",
  "6": "g",
  "#": "h",
  "1": "i",
  "_|": "j",
  "|<": "k",
  "|": "l",
  "/\\/\\": "m",
  "^/": "n",
  "0": "o",
  "|*": "p",
  "0_": "q",
  "|2": "r",
  "5": "s",
  "7": "t",
  "|_|": "u",
  "\\/": "v",
  "\\/\\/": "w",
  "><": "x",
  "`/": "y",
  "2": "z",
  "@": "a",
  "[": "c",
  "|)": "d",
  "&": "e",
  "ph": "f",
  "9": "g",
  "}{": "h",
  "!": "i",
  "</": "j",
  "|{": "k",
  "|_": "l",
  "|v|": "m",
  "/\\/": "n",
  "()": "o",
  "|o": "p",
  "(_,)": "q",
  "|^": "r",
  "$": "s",
  "+": "t",
  "(_)": "u",
  "|/": "v",
  "'//": "w",
  "¥": "y",
  "7_": "z",
};

export default function LeetSpeakConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [level, setLevel] = useState<"basic" | "advanced" | "random">("basic");
  const [mode, setMode] = useState<"toLeet" | "fromLeet">("toLeet");
  const [copied, setCopied] = useState(false);

  const convertToLeet = (text: string, lvl: string) => {
    return text
      .split("")
      .map((char) => {
        const lowerChar = char.toLowerCase();
        if (lvl === "basic" && basicLeetMap[lowerChar]) {
          return basicLeetMap[lowerChar];
        } else if (lvl === "advanced" && advancedLeetMap[lowerChar]) {
          return advancedLeetMap[lowerChar];
        } else if (lvl === "random" && leetMap[lowerChar]) {
          const options = leetMap[lowerChar];
          return options[Math.floor(Math.random() * options.length)];
        }
        return char;
      })
      .join("");
  };

  const convertFromLeet = (text: string) => {
    let result = text;
    // Sort by length (longest first) to match multi-char patterns first
    const sortedKeys = Object.keys(reverseLeetMap).sort((a, b) => b.length - a.length);
    
    sortedKeys.forEach((leet) => {
      const regex = new RegExp(leet.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"), "gi");
      result = result.replace(regex, reverseLeetMap[leet]);
    });
    
    return result;
  };

  const handleConvert = () => {
    if (mode === "toLeet") {
      setOutput(convertToLeet(input, level));
    } else {
      setOutput(convertFromLeet(input));
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Leet Speak Converter</h2>
          <p className="text-sm text-muted-foreground">
            Convert text to leet speak (1337) and back
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={mode === "toLeet" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("toLeet")}
          >
            Text → Leet
          </Button>
          <Button
            variant={mode === "fromLeet" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("fromLeet")}
          >
            Leet → Text
          </Button>
        </div>
      </div>

      {mode === "toLeet" && (
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Label>Leet Level:</Label>
            <div className="flex gap-2">
              <Button
                variant={level === "basic" ? "default" : "outline"}
                size="sm"
                onClick={() => setLevel("basic")}
              >
                Basic
              </Button>
              <Button
                variant={level === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setLevel("advanced")}
              >
                Advanced
              </Button>
              <Button
                variant={level === "random" ? "default" : "outline"}
                size="sm"
                onClick={() => setLevel("random")}
              >
                Random
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="input">
            {mode === "toLeet" ? "Text Input" : "Leet Speak Input"}
          </Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "toLeet"
                ? "Enter text to convert to leet speak..."
                : "Enter leet speak to convert to text..."
            }
            className="min-h-[200px] font-mono"
          />
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="output">
            {mode === "toLeet" ? "Leet Speak Output" : "Text Output"}
          </Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[200px] font-mono bg-muted"
          />
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Leet Speak Reference</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 text-sm">
          {Object.entries(basicLeetMap).map(([letter, leet]) => (
            <div
              key={letter}
              className="flex items-center gap-1 bg-muted px-2 py-1 rounded"
            >
              <span className="font-semibold">{letter.toUpperCase()}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-mono">{leet}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
