"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Type } from "lucide-react";

const pangrams = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "Sphinx of black quartz, judge my vow.",
  "Two driven jocks help fax my big quiz.",
  "The five boxing wizards jump quickly.",
  "Jackdaws love my big sphinx of quartz.",
  "Quick zephyrs blow, vexing daft Jim.",
];

const kerningPairs = [
  { pair: "AV", description: "Classic kerning pair" },
  { pair: "WA", description: "Wide letters" },
  { pair: "To", description: "Capital + lowercase" },
  { pair: "Ty", description: "Overhang test" },
  { pair: "LT", description: "Diagonal meeting" },
  { pair: "r.", description: "Punctuation spacing" },
  { pair: "Va", description: "Mixed case" },
  { pair: "Yo", description: "Round + diagonal" },
];

export default function MonospaceFontTester() {
  const [selectedFont, setSelectedFont] = useState("Courier New");
  const [fontSize, setFontSize] = useState("16");
  const [testText, setTestText] = useState(pangrams[0]);
  const [showGrid, setShowGrid] = useState(true);
  const [columnWidth, setColumnWidth] = useState("8");
  const [copied, setCopied] = useState(false);

  const monospaceFonts = [
    "Courier New",
    "Consolas",
    "Monaco",
    "Lucida Console",
    "Andale Mono",
    "Ubuntu Mono",
    "Fira Code",
    "Source Code Pro",
    "Roboto Mono",
    "JetBrains Mono",
  ];

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(testText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [testText]);

  const generateCodeBlock = useCallback(() => {
    return `// Code sample in ${selectedFont}
function helloWorld() {
  const message = "Hello, World!";
  console.log(message);
  
  // Numbers: 0123456789
  // Special: !@#$%^&*()_+-=[]{}|;':",./<>?
  return true;
}`;
  }, [selectedFont]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Monospace Font Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="font">Monospace Font</Label>
              <select
                id="font"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {monospaceFonts.map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="fontSize">Font Size (px)</Label>
              <Input
                id="fontSize"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="columnWidth">Column Width (chars)</Label>
              <Input
                id="columnWidth"
                type="number"
                value={columnWidth}
                onChange={(e) => setColumnWidth(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              Show Character Grid
            </label>
          </div>

          <div>
            <Label htmlFor="testText">Test Text</Label>
            <Textarea
              id="testText"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="mt-1 font-mono"
              rows={4}
            />
            <div className="flex gap-2 mt-2">
              {pangrams.slice(0, 4).map((pangram, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => setTestText(pangram)}
                >
                  Pangram {index + 1}
                </Button>
              ))}
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Text Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border rounded-lg p-4 ${showGrid ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:var(--char-width)_100%]" : ""}`}
              style={{
                fontFamily: selectedFont,
                fontSize: `${fontSize}px`,
                // @ts-ignore
                "--char-width": `${parseInt(columnWidth) * 0.6}em`,
              }}
            >
              <pre className="whitespace-pre overflow-x-auto">
                {testText}
              </pre>
            </div>

            <div className="mt-4">
              <Label>Character Width Test</Label>
              <div
                className="mt-2 p-2 border rounded font-mono"
                style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
              >
                <div>iiiiiiiiii (10 i's)</div>
                <div>MMMMMMMMMM (10 M's)</div>
                <div>0000000000 (10 0's)</div>
                <div>.......... (10 .'s)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              className="p-4 bg-muted rounded-lg overflow-x-auto text-sm"
              style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
            >
              {generateCodeBlock()}
            </pre>

            <div className="mt-4">
              <Label>Kerning Test Pairs</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {kerningPairs.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded flex items-center justify-between"
                    style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
                  >
                    <span className="font-bold">{item.pair}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Alignment Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="p-4 border rounded-lg overflow-x-auto"
            style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
          >
            <pre>
{`// Column alignment test
const data = [
  { id: 1,   name: "Alice",   score: 95 },
  { id: 2,   name: "Bob",     score: 87 },
  { id: 3,   name: "Charlie", score: 92 },
  { id: 10,  name: "David",   score: 88 },
  { id: 100, name: "Eve",     score: 91 },
];`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
