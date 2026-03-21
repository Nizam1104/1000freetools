"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Shuffle, RefreshCw } from "lucide-react";

const googleFonts = [
  { name: "Inter", category: "sans-serif", weights: ["400", "500", "600", "700"] },
  { name: "Poppins", category: "sans-serif", weights: ["400", "500", "600", "700"] },
  { name: "Roboto", category: "sans-serif", weights: ["400", "500", "700"] },
  { name: "Open Sans", category: "sans-serif", weights: ["400", "600", "700"] },
  { name: "Lato", category: "sans-serif", weights: ["400", "700", "900"] },
  { name: "Montserrat", category: "sans-serif", weights: ["400", "500", "600", "700"] },
  { name: "Playfair Display", category: "serif", weights: ["400", "500", "600", "700"] },
  { name: "Merriweather", category: "serif", weights: ["400", "700", "900"] },
  { name: "Georgia", category: "serif", weights: ["400", "700"] },
  { name: "Times New Roman", category: "serif", weights: ["400", "700"] },
  { name: "Source Code Pro", category: "monospace", weights: ["400", "500", "600", "700"] },
  { name: "Fira Code", category: "monospace", weights: ["400", "500", "600", "700"] },
  { name: "JetBrains Mono", category: "monospace", weights: ["400", "500", "600", "700"] },
  { name: "Oswald", category: "sans-serif", weights: ["400", "500", "600", "700"] },
  { name: "Raleway", category: "sans-serif", weights: ["400", "500", "600", "700"] },
  { name: "Nunito", category: "sans-serif", weights: ["400", "600", "700", "800"] },
  { name: "Work Sans", category: "sans-serif", weights: ["400", "500", "600", "700"] },
  { name: "Crimson Text", category: "serif", weights: ["400", "600", "700"] },
  { name: "Lora", category: "serif", weights: ["400", "500", "600", "700"] },
  { name: "PT Serif", category: "serif", weights: ["400", "700"] },
];

const popularPairings = [
  { heading: "Playfair Display", body: "Lato", description: "Elegant & Modern" },
  { heading: "Montserrat", body: "Merriweather", description: "Bold & Readable" },
  { heading: "Oswald", body: "Open Sans", description: "Strong & Clean" },
  { heading: "Poppins", body: "PT Serif", description: "Friendly & Professional" },
  { heading: "Raleway", body: "Lora", description: "Sophisticated" },
  { heading: "Inter", body: "Merriweather", description: "Tech & Traditional" },
];

export default function GoogleFontsPairingToolPage() {
  const [headingFont, setHeadingFont] = useState("Playfair Display");
  const [bodyFont, setBodyFont] = useState("Lato");
  const [headingWeight, setHeadingWeight] = useState("700");
  const [bodyWeight, setBodyWeight] = useState("400");
  const [headingSize, setHeadingSize] = useState(48);
  const [bodySize, setBodySize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const generateFontPairingCSS = () => {
    const headingFontObj = googleFonts.find((f) => f.name === headingFont);
    const bodyFontObj = googleFonts.find((f) => f.name === bodyFont);

    return `@import url('https://fonts.googleapis.com/css2?family=${headingFont?.replace(/ /g, "+")}:wght@${headingWeight}&family=${bodyFont?.replace(/ /g, "+")}:wght@${bodyWeight}&display=swap');

:root {
  --font-heading: "${headingFont}", ${headingFontObj?.category || "sans-serif"};
  --font-body: "${bodyFont}", ${bodyFontObj?.category || "sans-serif"};
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: ${headingWeight};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}em;
}

body {
  font-family: var(--font-body);
  font-weight: ${bodyWeight};
  font-size: ${bodySize}px;
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}em;
}`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const randomizePairing = () => {
    const sansFonts = googleFonts.filter((f) => f.category === "sans-serif");
    const serifFonts = googleFonts.filter((f) => f.category === "serif");

    const randomSans = sansFonts[Math.floor(Math.random() * sansFonts.length)];
    const randomSerif = serifFonts[Math.floor(Math.random() * serifFonts.length)];

    if (Math.random() > 0.5) {
      setHeadingFont(randomSerif.name);
      setBodyFont(randomSans.name);
    } else {
      setHeadingFont(randomSans.name);
      setBodyFont(randomSerif.name);
    }
  };

  const applyPreset = (preset: typeof popularPairings[0]) => {
    setHeadingFont(preset.heading);
    setBodyFont(preset.body);
  };

  const fontCSS = generateFontPairingCSS();

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Google Fonts Pairing Tool</h1>
        <p className="text-muted-foreground">
          Discover and preview beautiful Google Fonts combinations. Find the perfect heading and body font pairing for your project.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Font Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Heading Font</Label>
                <Select value={headingFont} onValueChange={setHeadingFont}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {googleFonts.map((font) => (
                      <SelectItem key={font.name} value={font.name}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Body Font</Label>
                <Select value={bodyFont} onValueChange={setBodyFont}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {googleFonts.map((font) => (
                      <SelectItem key={font.name} value={font.name}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={randomizePairing} className="w-full">
                <Shuffle className="w-4 h-4 mr-2" />
                Randomize Pairing
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Heading Weight: {headingWeight}</Label>
                <Select value={headingWeight} onValueChange={setHeadingWeight}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">Regular (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi Bold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                    <SelectItem value="800">Extra Bold (800)</SelectItem>
                    <SelectItem value="900">Black (900)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Body Weight: {bodyWeight}</Label>
                <Select value={bodyWeight} onValueChange={setBodyWeight}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">Light (300)</SelectItem>
                    <SelectItem value="400">Regular (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi Bold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Heading Size: {headingSize}px</Label>
                <Slider value={[headingSize]} onValueChange={([v]) => setHeadingSize(v)} min={24} max={96} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Body Size: {bodySize}px</Label>
                <Slider value={[bodySize]} onValueChange={([v]) => setBodySize(v)} min={12} max={24} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Line Height: {lineHeight}</Label>
                <Slider value={[lineHeight]} onValueChange={([v]) => setLineHeight(v)} min={1} max={2.5} step={0.1} className="mt-2" />
              </div>
              <div>
                <Label>Letter Spacing: {letterSpacing}em</Label>
                <Slider value={[letterSpacing]} onValueChange={([v]) => setLetterSpacing(v)} min={-0.1} max={0.2} step={0.01} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Pairings</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              {popularPairings.map((preset) => (
                <Button
                  key={preset.description}
                  variant="outline"
                  onClick={() => applyPreset(preset)}
                  className="justify-start"
                >
                  <div className="text-left">
                    <div className="font-medium">{preset.heading} + {preset.body}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="space-y-4 p-6 bg-muted/50 rounded-lg"
                style={{
                  fontFamily: bodyFont,
                  fontSize: `${bodySize}px`,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}em`,
                }}
              >
                <div
                  className="text-4xl font-bold mb-4"
                  style={{
                    fontFamily: headingFont,
                    fontSize: `${headingSize}px`,
                    fontWeight: headingWeight,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}em`,
                  }}
                >
                  The Quick Brown Fox
                </div>
                <p>
                  Typography is the art and technique of arranging type to make written language legible, readable,
                  and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes,
                  line lengths, line-spacing, and letter-spacing.
                </p>
                <h2 style={{ fontFamily: headingFont, fontSize: `${headingSize * 0.75}px`, fontWeight: headingWeight }}>
                  Subheading Example
                </h2>
                <p>
                  Good typography establishes a strong visual hierarchy, provides graphic balance, and helps set
                  the overall mood and visual tone of your design.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>CSS Variables & Import</Label>
                <div className="flex gap-2 mt-2">
                  <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                    {fontCSS}
                  </pre>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(fontCSS, "Font CSS")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Google Fonts URL</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {`https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, "+")}:wght@${headingWeight}&family=${bodyFont.replace(/ /g, "+")}:wght@${bodyWeight}&display=swap`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(
                      `https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, "+")}:wght@${headingWeight}&family=${bodyFont.replace(/ /g, "+")}:wght@${bodyWeight}&display=swap`,
                      "Google Fonts URL"
                    )}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(fontCSS, "Font Pairing CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Complete CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Font Pairing</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Font pairing is the art of combining two or more fonts in a way that creates visual harmony and enhances
              readability. Good font pairing establishes hierarchy, creates interest, and improves the overall user experience.
            </p>
            <p>
              The most successful pairings often combine fonts from different categories—such as a serif heading font
              with a sans-serif body font, or vice versa. The key is finding fonts that complement each other while
              maintaining enough contrast to create visual interest.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips for Great Font Pairing</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contrast Categories</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Pair serif with sans-serif, or display fonts with simple body fonts. Contrast creates visual interest
                and helps establish hierarchy.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Limit Your Choices</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Stick to 2-3 fonts maximum. Too many fonts create visual chaos and confuse your visual hierarchy.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consider Mood</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Choose fonts that match your brand personality. A playful brand might use rounded sans-serifs,
                while a luxury brand might prefer elegant serifs.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Readability</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Always test your font pairings with real content. What looks good in headings might not work
                for body text at smaller sizes.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
