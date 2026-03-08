"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypographyScale {
  name: string;
  ratio: number;
  description: string;
  sizes: Array<{ level: string; size: number; lineHeight: number }>;
}

const scaleRatios: Record<string, { ratio: number; description: string }> = {
  minorSecond: { ratio: 1.067, description: "Subtle - 6% increase" },
  majorSecond: { ratio: 1.125, description: "Gentle - 12% increase" },
  minorThird: { ratio: 1.2, description: "Classic - 20% increase" },
  majorThird: { ratio: 1.25, description: "Popular - 25% increase" },
  perfectFourth: { ratio: 1.333, description: "Bold - 33% increase" },
  augmentedFourth: { ratio: 1.414, description: "Dramatic - 41% increase" },
  perfectFifth: { ratio: 1.5, description: "Strong - 50% increase" },
  goldenRatio: { ratio: 1.618, description: "Divine proportion - 62% increase" },
};

export default function TypographyScaleCalculatorPage() {
  const [baseSize, setBaseSize] = useState<string>("16");
  const [scaleRatio, setScaleRatio] = useState<string>("majorThird");
  const [steps, setSteps] = useState<string>("6");
  const [result, setResult] = useState<TypographyScale | null>(null);

  const calculate = () => {
    const baseSizeNum = parseFloat(baseSize) || 16;
    const ratioData = scaleRatios[scaleRatio];
    const ratio = ratioData?.ratio || 1.25;
    const stepsNum = parseInt(steps) || 6;

    // Generate scale
    const sizes: Array<{ level: string; size: number; lineHeight: number }> = [];

    const levelNames = ["-2", "-1", "Base", "H4", "H3", "H2", "H1", "Display"];

    for (let i = -2; i <= stepsNum - 3; i++) {
      const size = baseSizeNum * Math.pow(ratio, i);
      // Line height decreases as size increases
      const lineHeight = i <= 0 ? 1.5 : Math.max(1.1, 1.5 - (i * 0.08));

      sizes.push({
        level: levelNames[i + 2] || `H${i}`,
        size: parseFloat(size.toFixed(2)),
        lineHeight: parseFloat(lineHeight.toFixed(2)),
      });
    }

    setResult({
      name: ratioData?.description.split(" - ")[0] || "Custom",
      ratio,
      description: ratioData?.description || `Custom ratio: ${ratio}`,
      sizes,
    });
  };

  const reset = () => {
    setBaseSize("16");
    setScaleRatio("majorThird");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Typography Scale Calculator – Generate a Harmonious Font Size Scale
          </h1>
          <p className="text-muted-foreground">
            Create beautiful typographic hierarchies with our Typography Scale Calculator.
            Enter your base font size and choose a scale ratio to generate a complete
            heading scale — perfect for web designers and UI developers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-size">Base Font Size (px)</Label>
                <Input
                  id="base-size"
                  type="number"
                  value={baseSize}
                  onChange={(e) => setBaseSize(e.target.value)}
                  placeholder="16"
                />
                <p className="text-xs text-muted-foreground">
                  Standard: 16px for body text
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scale-ratio">Scale Ratio</Label>
                <Select value={scaleRatio} onValueChange={setScaleRatio}>
                  <SelectTrigger id="scale-ratio">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(scaleRatios).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps">Number of Steps</Label>
                <Input
                  id="steps"
                  type="number"
                  min="4"
                  max="10"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="6"
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Ratio Guide:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 1.2-1.25: Body text, long-form content</li>
                  <li>• 1.33-1.414: Balanced hierarchy</li>
                  <li>• 1.5-1.618: Bold, impactful designs</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Generate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Typography Scale</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Selected Scale</p>
                    <p className="text-xl font-bold text-primary">
                      {result.name} (×{result.ratio})
                    </p>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </div>

                  <div className="space-y-2">
                    {result.sizes.map((size, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 border rounded-lg"
                      >
                        <div className="w-16 text-sm text-muted-foreground font-mono">
                          {size.level}
                        </div>
                        <div className="flex-1">
                          <p
                            className="text-gray-800 dark:text-gray-200"
                            style={{
                              fontSize: `${Math.min(size.size, 72)}px`,
                              lineHeight: size.lineHeight,
                            }}
                          >
                            The quick brown fox
                          </p>
                        </div>
                        <div className="w-24 text-right text-sm text-muted-foreground font-mono">
                          {size.size}px
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">CSS Variables</h4>
                    <pre className="text-xs font-mono overflow-x-auto p-2 bg-background rounded">
                      {`--text-xs: ${result.sizes[0]?.size || 10}px;
--text-sm: ${result.sizes[1]?.size || 12}px;
--text-base: ${result.sizes[2]?.size || 16}px;
--text-lg: ${result.sizes[3]?.size || 20}px;
--text-xl: ${result.sizes[4]?.size || 25}px;
--text-2xl: ${result.sizes[5]?.size || 31}px;`}
                    </pre>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> size = base × ratio^n
                      <br />
                      where n is the step number from base
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter base size and select ratio to generate scale</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Typography Scale Best Practices
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Base size:</strong> 16px is standard for readability
                  </li>
                  <li>
                    <strong>Line height:</strong> Decreases as font size increases
                  </li>
                  <li>
                    <strong>Scale ratio:</strong> Smaller ratios (1.2) for text-heavy
                    sites, larger (1.5+) for bold designs
                  </li>
                  <li>
                    <strong>Golden Ratio (1.618):</strong> Creates naturally pleasing
                    proportions
                  </li>
                  <li>
                    <strong>Consistency:</strong> Use the same scale across all pages
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Major Third (1.25) and Perfect Fourth (1.333)
                  are the most popular choices for web design as they provide clear
                  hierarchy without extreme size differences.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Generate a Typography Scale</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Set Your Base Font Size</h3>
                <p className="text-sm text-muted-foreground">Enter your body text size (typically 16px) as the foundation for your entire type scale.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Choose a Scale Ratio</h3>
                <p className="text-sm text-muted-foreground">Select from musical intervals like Major Third (1.25) or Golden Ratio (1.618) for harmonious sizing.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Generate & Export CSS</h3>
                <p className="text-sm text-muted-foreground">Get instant preview with live text samples and copy-ready CSS variables for your project.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Typography Scale Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Musical Scale Ratios</h3>
              <p className="text-sm text-muted-foreground">Choose from proven ratios like Minor Second (1.067) to Golden Ratio (1.618) for naturally harmonious type hierarchies.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Live Text Preview</h3>
              <p className="text-sm text-muted-foreground">See your actual scale rendered with sample text at each size level before implementing.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">CSS Variable Export</h3>
              <p className="text-sm text-muted-foreground">Get ready-to-use CSS custom properties (--text-xs, --text-base, etc.) for easy integration.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Automatic Line Height</h3>
              <p className="text-sm text-muted-foreground">Optimal line heights are calculated automatically, decreasing as font size increases for better readability.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Typography Scale Ratios Reference</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Scale Name</th>
                  <th className="text-left py-2">Ratio</th>
                  <th className="text-left py-2">Best For</th>
                  <th className="text-left py-2">Example (16px base)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Minor Second</td>
                  <td className="py-2 font-mono">1.067</td>
                  <td className="py-2">Subtle, minimal designs</td>
                  <td className="py-2">16px → 17px → 18px</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Major Second</td>
                  <td className="py-2 font-mono">1.125</td>
                  <td className="py-2">Gentle hierarchy</td>
                  <td className="py-2">16px → 18px → 20px</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Minor Third</td>
                  <td className="py-2 font-mono">1.2</td>
                  <td className="py-2">Classic, readable</td>
                  <td className="py-2">16px → 19px → 23px</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Major Third</td>
                  <td className="py-2 font-mono">1.25</td>
                  <td className="py-2">Popular web standard</td>
                  <td className="py-2">16px → 20px → 25px</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Perfect Fourth</td>
                  <td className="py-2 font-mono">1.333</td>
                  <td className="py-2">Bold, impactful</td>
                  <td className="py-2">16px → 21px → 28px</td>
                </tr>
                <tr>
                  <td className="py-2">Golden Ratio</td>
                  <td className="py-2 font-mono">1.618</td>
                  <td className="py-2">Dramatic, editorial</td>
                  <td className="py-2">16px → 26px → 42px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is a typography scale?</h3>
              <p className="text-sm text-muted-foreground">A typography scale is a set of harmonious font sizes based on a mathematical ratio. Starting from a base size, each level is multiplied by the ratio to create consistent, proportional headings and text sizes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the best font size ratio for websites?</h3>
              <p className="text-sm text-muted-foreground">Major Third (1.25) and Perfect Fourth (1.333) are most popular for websites. They provide clear visual hierarchy without extreme size jumps, working well for both body text and headings.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What should my base font size be?</h3>
              <p className="text-sm text-muted-foreground">16px is the web standard for body text, providing optimal readability on most devices. Some designers use 18px for more accessible, comfortable reading experiences.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I choose the right scale ratio?</h3>
              <p className="text-sm text-muted-foreground">For text-heavy sites (blogs, news), use smaller ratios (1.125-1.2). For marketing sites with bold headlines, use larger ratios (1.333-1.5). The Golden Ratio (1.618) creates dramatic contrast for editorial designs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What line height should I use?</h3>
              <p className="text-sm text-muted-foreground">Body text needs 1.5-1.6 line height for readability. Headings can use tighter spacing (1.1-1.3) since larger fonts are naturally more legible. Our calculator adjusts line height automatically for each size.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
