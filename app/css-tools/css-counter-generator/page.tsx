"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CssCounterGeneratorPage() {
  const [counterName, setCounterName] = useState("section");
  const [counterStyle, setCounterStyle] = useState<"decimal" | "lower-roman" | "upper-roman" | "lower-alpha" | "upper-alpha" | "cjk-decimal" | "decimal-leading-zero">("decimal");
  const [resetSelector, setResetSelector] = useState("body");
  const [incrementSelector, setIncrementSelector] = useState("h2");
  const [displaySelector, setDisplaySelector] = useState("h2::before");
  const [contentFormat, setContentFormat] = useState("counter(section) \". \"");
  const [hasReset, setHasReset] = useState(true);
  const [resetValue, setResetValue] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);
  const [customPrefix, setCustomPrefix] = useState("");
  const [customSuffix, setCustomSuffix] = useState("");

  const generateCSS = () => {
    const lines: string[] = [];

    if (hasReset) {
      lines.push(`${resetSelector} {`);
      lines.push(`  counter-reset: ${counterName} ${resetValue};`);
      lines.push(`}`);
      lines.push("");
    }

    lines.push(`${incrementSelector} {`);
    lines.push(`  counter-increment: ${counterName} ${incrementValue};`);
    lines.push(`}`);
    lines.push("");

    let contentValue = "";
    if (customPrefix) contentValue += `"${customPrefix}" `;
    contentValue += `counter(${counterName}`;
    if (counterStyle !== "decimal") {
      contentValue += `, ${counterStyle}`;
    }
    contentValue += ")";
    if (customSuffix) contentValue += ` "${customSuffix}"`;

    lines.push(`${displaySelector} {`);
    lines.push(`  content: ${contentValue};`);
    lines.push(`}`);

    return lines.join("\n");
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

  const previewItems = Array.from({ length: 5 }, (_, i) => i + 1);

  const getCounterDisplay = (num: number) => {
    switch (counterStyle) {
      case "lower-roman":
        return toRoman(num).toLowerCase();
      case "upper-roman":
        return toRoman(num);
      case "lower-alpha":
        return String.fromCharCode(96 + num);
      case "upper-alpha":
        return String.fromCharCode(64 + num);
      case "decimal-leading-zero":
        return num.toString().padStart(2, "0");
      default:
        return num.toString();
    }
  };

  const toRoman = (num: number): string => {
    const roman: { [key: string]: number } = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let str = "";
    for (const [key, value] of Object.entries(roman)) {
      const q = Math.floor(num / value);
      num -= q * value;
      str += key.repeat(q);
    }
    return str;
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Counter Generator</h1>
        <p className="text-muted-foreground">
          Generate CSS counters for automatic numbering of headings, lists, and other elements. Create custom numbering systems.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Counter Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Counter Name</Label>
                <Input value={counterName} onChange={(e) => setCounterName(e.target.value)} className="mt-2" placeholder="section" />
              </div>
              <div>
                <Label>Numbering Style</Label>
                <Select value={counterStyle} onValueChange={(v) => setCounterStyle(v as typeof counterStyle)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="decimal">Decimal (1, 2, 3)</SelectItem>
                    <SelectItem value="decimal-leading-zero">Leading Zero (01, 02, 03)</SelectItem>
                    <SelectItem value="lower-roman">Lower Roman (i, ii, iii)</SelectItem>
                    <SelectItem value="upper-roman">Upper Roman (I, II, III)</SelectItem>
                    <SelectItem value="lower-alpha">Lower Alpha (a, b, c)</SelectItem>
                    <SelectItem value="upper-alpha">Upper Alpha (A, B, C)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Counter Reset</Label>
                <Switch checked={hasReset} onCheckedChange={setHasReset} />
              </div>
              {hasReset && (
                <>
                  <div>
                    <Label>Reset Selector</Label>
                    <Input value={resetSelector} onChange={(e) => setResetSelector(e.target.value)} className="mt-2" placeholder="body" />
                  </div>
                  <div>
                    <Label>Reset Value: {resetValue}</Label>
                    <Slider value={[resetValue]} onValueChange={([v]) => setResetValue(v)} min={-10} max={10} step={1} className="mt-2" />
                  </div>
                </>
              )}
              <div>
                <Label>Increment Selector</Label>
                <Input value={incrementSelector} onChange={(e) => setIncrementSelector(e.target.value)} className="mt-2" placeholder="h2" />
              </div>
              <div>
                <Label>Increment Value: {incrementValue}</Label>
                <Slider value={[incrementValue]} onValueChange={([v]) => setIncrementValue(v)} min={1} max={5} step={1} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Display Selector</Label>
                <Input value={displaySelector} onChange={(e) => setDisplaySelector(e.target.value)} className="mt-2" placeholder="h2::before" />
              </div>
              <div>
                <Label>Custom Prefix</Label>
                <Input value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} className="mt-2" placeholder="Section " />
              </div>
              <div>
                <Label>Custom Suffix</Label>
                <Input value={customSuffix} onChange={(e) => setCustomSuffix(e.target.value)} className="mt-2" placeholder=". " />
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
                  setCounterName("section");
                  setCounterStyle("decimal");
                  setIncrementSelector("h2");
                  setDisplaySelector("h2::before");
                  setCustomPrefix("Section ");
                  setCustomSuffix(". ");
                }}
              >
                Section Numbering
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCounterName("chapter");
                  setCounterStyle("upper-roman");
                  setIncrementSelector("h1");
                  setDisplaySelector("h1::before");
                  setCustomPrefix("");
                  setCustomSuffix(" - ");
                }}
              >
                Roman Chapters
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCounterName("step");
                  setCounterStyle("decimal-leading-zero");
                  setIncrementSelector("li");
                  setDisplaySelector("li::before");
                  setCustomPrefix("Step ");
                  setCustomSuffix(": ");
                }}
              >
                Step List
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCounterName("item");
                  setCounterStyle("upper-alpha");
                  setIncrementSelector("li");
                  setDisplaySelector("li::marker");
                  setCustomPrefix("");
                  setCustomSuffix("");
                }}
              >
                Alphabetical List
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
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                {previewItems.map((num) => (
                  <div key={num} className="flex items-center gap-3">
                    <span className="text-lg font-semibold min-w-[80px]">
                      {customPrefix}
                      {getCounterDisplay(num)}
                      {customSuffix}
                    </span>
                    <span className="text-muted-foreground">Heading Text {num}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Counter CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Counter CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HTML Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                {`<body>
  <h2>Introduction</h2>
  <h2>Getting Started</h2>
  <h2>Advanced Usage</h2>
  <h2>Conclusion</h2>
</body>`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS Counters</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS counters are variables that can be incremented by CSS to automatically number elements like
              headings, list items, or sections. They're controlled by three main properties:
              <code> counter-reset</code>, <code>counter-increment</code>, and the <code>counter()</code> function.
            </p>
            <p>
              CSS counters are perfect for creating automatic section numbering, multi-level lists, and custom
              numbering schemes without JavaScript or manual updates.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Counter Properties</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">counter-reset</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Initializes or resets a counter. Set on a parent element to start counting from a specific value.
                <div className="mt-2 font-mono text-xs">counter-reset: section 0;</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">counter-increment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Increases the counter value. Set on elements that should trigger numbering.
                <div className="mt-2 font-mono text-xs">counter-increment: section 1;</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">counter()</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Displays the counter value in content. Used with ::before or ::after pseudo-elements.
                <div className="mt-2 font-mono text-xs">content: counter(section);</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Counter Styles</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "decimal", example: "1, 2, 3" },
                  { name: "lower-roman", example: "i, ii, iii" },
                  { name: "upper-roman", example: "I, II, III" },
                  { name: "lower-alpha", example: "a, b, c" },
                  { name: "upper-alpha", example: "A, B, C" },
                  { name: "decimal-leading-zero", example: "01, 02, 03" },
                ].map((style) => (
                  <div key={style.name} className="p-3 bg-muted rounded">
                    <div className="font-mono text-sm mb-1">{style.name}</div>
                    <div className="text-xs text-muted-foreground">{style.example}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
