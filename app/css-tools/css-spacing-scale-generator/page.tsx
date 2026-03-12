"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const scaleTypes = [
  { name: "4px Base", base: 4, label: "4px, 8px, 16px..." },
  { name: "8px Base", base: 8, label: "8px, 16px, 24px..." },
  { name: "Rem Scale", base: 0.25, label: "0.25rem, 0.5rem, 0.75rem..." },
  { name: "Custom", base: 0, label: "Custom multiplier" },
];

export default function CssSpacingScaleGeneratorPage() {
  const [baseUnit, setBaseUnit] = useState(8);
  const [scaleType, setScaleType] = useState<"linear" | "geometric" | "fibonacci" | "custom">("linear");
  const [steps, setSteps] = useState(12);
  const [multiplier, setMultiplier] = useState(2);
  const [unit, setUnit] = useState<"px" | "rem">("px");
  const [customValues, setCustomValues] = useState<string[]>([]);

  const generateScale = () => {
    if (scaleType === "custom" && customValues.length > 0) {
      return customValues.map((v, i) => ({ step: i, value: parseFloat(v) || 0 }));
    }

    const scale: { step: number; value: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      let value: number;

      if (scaleType === "linear") {
        value = baseUnit * i;
      } else if (scaleType === "geometric") {
        value = baseUnit * Math.pow(multiplier, i > 0 ? i - 1 : 0);
      } else if (scaleType === "fibonacci") {
        const fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
        value = baseUnit * (fib[i] || fib[fib.length - 1]);
      } else {
        value = baseUnit * i;
      }

      scale.push({ step: i, value: Math.round(value * 100) / 100 });
    }

    return scale;
  };

  const generateCSS = () => {
    const scale = generateScale();
    const cssVarName = (i: number) => `--space-${i === 0 ? "none" : i}`;
    const cssValue = (value: number) => {
      if (unit === "rem") {
        return `${(value / 16).toFixed(2)}rem`;
      }
      return `${value}px`;
    };

    return `:root {
${scale.map((item) => `  ${cssVarName(item.step)}: ${cssValue(item.value)};`).join("\n")}
}

/* Usage Examples */
.element {
  padding: var(--space-4);
  margin: var(--space-2);
  gap: var(--space-3);
}`;
  };

  const generateTailwind = () => {
    const scale = generateScale();

    return `// tailwind.config.js
module.exports = {
  theme: {
    spacing: {
${scale.map((item) => `      '${item.step}': '${unit === "rem" ? (item.value / 16).toFixed(2) : item.value}${unit}',`).join("\n")}
    },
  },
};`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const scale = generateScale();
  const cssCode = generateCSS();
  const tailwindCode = generateTailwind();

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Spacing Scale Generator</h1>
        <p className="text-muted-foreground">
          Generate consistent spacing scales for design tokens. Create CSS variables or Tailwind config for your design system.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scale Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Base Unit</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {scaleTypes.map((type) => (
                    <Button
                      key={type.name}
                      variant={baseUnit === type.base && type.name !== "Custom" ? "default" : "outline"}
                      onClick={() => {
                        if (type.name !== "Custom") {
                          setBaseUnit(type.base);
                          setUnit(type.base === 0.25 ? "rem" : "px");
                        }
                      }}
                      className="text-xs"
                    >
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>
              {baseUnit === 0 && (
                <div>
                  <Label>Custom Base Unit</Label>
                  <Input
                    type="number"
                    value={baseUnit || ""}
                    onChange={(e) => setBaseUnit(parseFloat(e.target.value) || 0)}
                    className="mt-2"
                    placeholder="Enter base unit"
                  />
                </div>
              )}
              <div>
                <Label>Scale Type</Label>
                <Select value={scaleType} onValueChange={(v) => setScaleType(v as typeof scaleType)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear (n × base)</SelectItem>
                    <SelectItem value="geometric">Geometric (base × multiplierⁿ)</SelectItem>
                    <SelectItem value="fibonacci">Fibonacci Sequence</SelectItem>
                    <SelectItem value="custom">Custom Values</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {scaleType === "geometric" && (
                <div>
                  <Label>Multiplier: {multiplier}</Label>
                  <Slider value={[multiplier]} onValueChange={([v]) => setMultiplier(v)} min={1.2} max={3} step={0.1} className="mt-2" />
                </div>
              )}
              <div>
                <Label>Number of Steps: {steps}</Label>
                <Slider value={[steps]} onValueChange={([v]) => setSteps(v)} min={6} max={20} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as typeof unit)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="px">Pixels (px)</SelectItem>
                    <SelectItem value="rem">REM (rem)</SelectItem>
                  </SelectContent>
                </Select>
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
                  setBaseUnit(4);
                  setScaleType("linear");
                  setUnit("px");
                  setSteps(12);
                }}
              >
                4px Linear
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBaseUnit(8);
                  setScaleType("linear");
                  setUnit("px");
                  setSteps(12);
                }}
              >
                8px Linear
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBaseUnit(8);
                  setScaleType("geometric");
                  setMultiplier(1.5);
                  setUnit("px");
                  setSteps(10);
                }}
              >
                Geometric 1.5×
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBaseUnit(0.25);
                  setScaleType("linear");
                  setUnit("rem");
                  setSteps(12);
                }}
              >
                REM Scale
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scale.slice(0, 10).map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="w-16 text-sm text-muted-foreground font-mono">
                      {unit === "rem" ? (item.value / 16).toFixed(2) : item.value}{unit}
                    </div>
                    <div
                      className="h-6 bg-primary rounded"
                      style={{ width: `${Math.min(item.value * 2, 300)}px` }}
                    />
                    <div className="text-sm text-muted-foreground">--space-{item.step}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {scale.slice(1, 9).map((item) => (
                  <div key={item.step} className="text-center">
                    <div
                      className="mx-auto bg-primary/20 border border-primary rounded"
                      style={{
                        width: `${Math.max(20, item.value)}px`,
                        height: `${Math.max(20, item.value)}px`,
                      }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {unit === "rem" ? (item.value / 16).toFixed(2) : item.value}
                    </p>
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
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "CSS Variables")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tailwind Config</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                  {tailwindCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(tailwindCode, "Tailwind Config")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Spacing Scale CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS Variables
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Spacing Scales</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              A spacing scale is a systematic approach to defining consistent spacing values across your design.
              Instead of using arbitrary pixel values, a scale ensures visual harmony and makes decisions faster.
            </p>
            <p>
              Common approaches include linear scales (4px, 8px, 12px...), geometric scales (8px, 16px, 32px...),
              and the Fibonacci sequence (8px, 13px, 21px, 34px...). Each creates a different visual rhythm.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Scale Types Explained</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Linear</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Each step increases by a fixed amount. Simple and predictable, great for precise control.
                <div className="mt-2 font-mono text-xs">4px, 8px, 12px, 16px, 20px...</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Geometric</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Each step multiplies by a factor. Creates more dramatic size differences.
                <div className="mt-2 font-mono text-xs">8px, 12px, 18px, 27px, 40px...</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fibonacci</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Based on the golden ratio. Naturally pleasing proportions found in nature.
                <div className="mt-2 font-mono text-xs">8px, 13px, 21px, 34px, 55px...</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
