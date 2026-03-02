"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Type } from "lucide-react";

export default function LetterSpacingLineHeightVisualizerPage() {
  const [fontSize, setFontSize] = useState(16);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type.");

  const generateCSS = () => {
    return `font-size: ${fontSize}px;
letter-spacing: ${letterSpacing}em;
line-height: ${lineHeight};
word-spacing: ${wordSpacing}em;`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const cssCode = generateCSS();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Letter Spacing & Line Height Visualizer</h1>
        <p className="text-muted-foreground">
          Fine-tune typography by adjusting letter spacing, line height, and word spacing with live preview.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Font Size: {fontSize}px</Label>
                <Slider value={[fontSize]} onValueChange={([v]) => setFontSize(v)} min={12} max={72} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Letter Spacing: {letterSpacing}em</Label>
                <Slider value={[letterSpacing]} onValueChange={([v]) => setLetterSpacing(v)} min={-0.1} max={0.5} step={0.01} className="mt-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>-0.1em</span>
                  <span>0</span>
                  <span>0.5em</span>
                </div>
              </div>
              <div>
                <Label>Line Height: {lineHeight}</Label>
                <Slider value={[lineHeight]} onValueChange={([v]) => setLineHeight(v)} min={0.8} max={3} step={0.1} className="mt-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.8</span>
                  <span>1.5</span>
                  <span>3</span>
                </div>
              </div>
              <div>
                <Label>Word Spacing: {wordSpacing}em</Label>
                <Slider value={[wordSpacing]} onValueChange={([v]) => setWordSpacing(v)} min={-0.5} max={2} step={0.1} className="mt-2" />
              </div>
              <div>
                <Label>Sample Text</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-2"
                  placeholder="Enter your text..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Presets</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setFontSize(16);
                  setLetterSpacing(0);
                  setLineHeight(1.5);
                  setWordSpacing(0);
                }}
              >
                Default
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFontSize(14);
                  setLetterSpacing(0.05);
                  setLineHeight(1.6);
                  setWordSpacing(0);
                }}
              >
                Uppercase Style
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFontSize(18);
                  setLetterSpacing(-0.02);
                  setLineHeight(1.4);
                  setWordSpacing(0);
                }}
              >
                Tight Headline
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFontSize(16);
                  setLetterSpacing(0);
                  setLineHeight(1.8);
                  setWordSpacing(0.1);
                }}
              >
                Readable Body
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="p-6 bg-muted/50 rounded-lg border"
                style={{
                  fontSize: `${fontSize}px`,
                  letterSpacing: `${letterSpacing}em`,
                  lineHeight: lineHeight,
                  wordSpacing: `${wordSpacing}em`,
                }}
              >
                {text}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Character Grid Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {text.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center w-6 h-8 bg-muted rounded border text-sm font-mono"
                    style={{
                      fontSize: `${Math.min(fontSize, 16)}px`,
                      letterSpacing: `${letterSpacing}em`,
                    }}
                  >
                    {char === " " ? "␣" : char}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated CSS</CardTitle>
              <Type className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Typography CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {`.text {
  ${cssCode.split("\n").map((l) => "  " + l).join("\n")}
}`}
                </pre>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`.text {\n  ${cssCode.split("\n").map((l) => "  " + l).join("\n")}\n}`, "Complete CSS")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Typography CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-32 text-sm text-muted-foreground">Letter Spacing</div>
                  <div className="flex-1 h-8 bg-muted rounded flex items-center px-2" style={{ letterSpacing: "0.2em" }}>
                    A B C
                  </div>
                  <div className="text-xs text-muted-foreground w-16">0.2em</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 text-sm text-muted-foreground">Line Height</div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-primary/20 rounded">Line 1</div>
                    <div className="h-4 bg-primary/40 rounded">Line 2</div>
                  </div>
                  <div className="text-xs text-muted-foreground w-16">{lineHeight}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 text-sm text-muted-foreground">Word Spacing</div>
                  <div className="flex-1 h-8 bg-muted rounded flex items-center px-2" style={{ wordSpacing: "1em" }}>
                    word word
                  </div>
                  <div className="text-xs text-muted-foreground w-16">{wordSpacing}em</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Typography Spacing</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Letter Spacing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Also known as tracking, letter spacing adjusts the space between all characters. 
                Positive values add breathing room, negative values create tighter text.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Line Height</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                The vertical space between lines of text. Critical for readability—too tight causes 
                crowding, too loose disconnects lines.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Word Spacing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Controls the space between words. Useful for justified text or creating specific 
                visual rhythms in typography.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Typography Tips</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <ul className="space-y-2">
              <li><strong>Uppercase text:</strong> Add 0.05-0.1em letter spacing for better readability</li>
              <li><strong>Headlines:</strong> Use tighter line height (1.1-1.3) and slightly negative letter spacing</li>
              <li><strong>Body text:</strong> Aim for 1.5-1.7 line height for optimal readability</li>
              <li><strong>Small text:</strong> Increase letter spacing slightly to improve legibility</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
