"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, RotateCcw, Palette, Type, Box, Layers } from "lucide-react";

export default function CSSPlaygroundPage() {
  // Typography
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState<"normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900">("normal");
  const [fontFamily, setFontFamily] = useState<"sans-serif" | "serif" | "monospace" | "cursive" | "fantasy">("sans-serif");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "justify">("left");
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textTransform, setTextTransform] = useState<"none" | "uppercase" | "lowercase" | "capitalize">("none");
  const [textDecoration, setTextDecoration] = useState<"none" | "underline" | "line-through" | "overline">("none");

  // Box Model
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [padding, setPadding] = useState(20);
  const [margin, setMargin] = useState(0);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderStyle, setBorderStyle] = useState<"solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset" | "none">("solid");
  const [borderRadius, setBorderRadius] = useState(8);
  const [borderColor, setBorderColor] = useState("#000000");

  // Colors
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");

  // Display & Positioning
  const [display, setDisplay] = useState<"block" | "inline-block" | "flex" | "grid" | "none">("block");
  const [position, setPosition] = useState<"static" | "relative" | "absolute" | "fixed" | "sticky">("static");
  const [visibility, setVisibility] = useState<"visible" | "hidden">("visible");
  const [overflow, setOverflow] = useState<"visible" | "hidden" | "auto" | "scroll">("visible");

  // Effects
  const [opacity, setOpacity] = useState(100);
  const [boxShadow, setBoxShadow] = useState(true);
  const [transition, setTransition] = useState(true);

  // Custom CSS
  const [customCSS, setCustomCSS] = useState("");

  const generateCSS = () => {
    const css: string[] = [];

    // Typography
    css.push(`font-size: ${fontSize}px;`);
    css.push(`font-weight: ${fontWeight};`);
    css.push(`font-family: ${fontFamily};`);
    css.push(`text-align: ${textAlign};`);
    css.push(`line-height: ${lineHeight};`);
    css.push(`letter-spacing: ${letterSpacing}px;`);
    css.push(`text-transform: ${textTransform};`);
    css.push(`text-decoration: ${textDecoration};`);
    css.push(`color: ${textColor};`);

    // Box Model
    css.push(`width: ${width}px;`);
    css.push(`height: ${height}px;`);
    css.push(`padding: ${padding}px;`);
    css.push(`margin: ${margin}px;`);
    css.push(`border: ${borderWidth}px ${borderStyle} ${borderColor};`);
    css.push(`border-radius: ${borderRadius}px;`);

    // Colors
    css.push(`background-color: ${backgroundColor};`);

    // Display & Positioning
    css.push(`display: ${display};`);
    css.push(`position: ${position};`);
    css.push(`visibility: ${visibility};`);
    css.push(`overflow: ${overflow};`);

    // Effects
    css.push(`opacity: ${opacity / 100};`);
    if (boxShadow) {
      css.push(`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);`);
    }
    if (transition) {
      css.push(`transition: all 0.3s ease;`);
    }

    // Custom CSS
    if (customCSS.trim()) {
      css.push(customCSS.trim());
    }

    return css.join("\n  ");
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const resetAll = () => {
    setFontSize(16);
    setFontWeight("normal");
    setFontFamily("sans-serif");
    setTextAlign("left");
    setLineHeight(1.5);
    setLetterSpacing(0);
    setTextTransform("none");
    setTextDecoration("none");
    setWidth(300);
    setHeight(200);
    setPadding(20);
    setMargin(0);
    setBorderWidth(2);
    setBorderStyle("solid");
    setBorderRadius(8);
    setBorderColor("#000000");
    setBackgroundColor("#3b82f6");
    setTextColor("#ffffff");
    setDisplay("block");
    setPosition("static");
    setVisibility("visible");
    setOverflow("visible");
    setOpacity(100);
    setBoxShadow(true);
    setTransition(true);
    setCustomCSS("");
    toast.success("All settings reset!");
  };

  const cssCode = generateCSS();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Playground</h1>
        <p className="text-muted-foreground">
          Interactive CSS generator with live preview. Customize typography, box model, colors, positioning, and effects.
        </p>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="xl:col-span-2 space-y-6">
          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Font Size: {fontSize}px</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={([v]) => setFontSize(v)}
                    min={8}
                    max={72}
                    step={1}
                  />
                </div>
                <div>
                  <Label>Line Height: {lineHeight}</Label>
                  <Slider
                    value={[lineHeight]}
                    onValueChange={([v]) => setLineHeight(v)}
                    min={0.8}
                    max={3}
                    step={0.1}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Font Weight</Label>
                  <Select value={fontWeight} onValueChange={(v) => setFontWeight(v as typeof fontWeight)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">Thin (100)</SelectItem>
                      <SelectItem value="200">Extra Light (200)</SelectItem>
                      <SelectItem value="300">Light (300)</SelectItem>
                      <SelectItem value="400">Normal (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semi Bold (600)</SelectItem>
                      <SelectItem value="700">Bold (700)</SelectItem>
                      <SelectItem value="800">Extra Bold (800)</SelectItem>
                      <SelectItem value="900">Black (900)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Font Family</Label>
                  <Select value={fontFamily} onValueChange={(v) => setFontFamily(v as typeof fontFamily)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sans-serif">Sans Serif</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                      <SelectItem value="cursive">Cursive</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Text Align</Label>
                  <Select value={textAlign} onValueChange={(v) => setTextAlign(v as typeof textAlign)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="justify">Justify</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Text Transform</Label>
                  <Select value={textTransform} onValueChange={(v) => setTextTransform(v as typeof textTransform)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="uppercase">Uppercase</SelectItem>
                      <SelectItem value="lowercase">Lowercase</SelectItem>
                      <SelectItem value="capitalize">Capitalize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Letter Spacing: {letterSpacing}px</Label>
                  <Slider
                    value={[letterSpacing]}
                    onValueChange={([v]) => setLetterSpacing(v)}
                    min={-5}
                    max={20}
                    step={0.5}
                  />
                </div>
                <div>
                  <Label>Text Decoration</Label>
                  <Select value={textDecoration} onValueChange={(v) => setTextDecoration(v as typeof textDecoration)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="underline">Underline</SelectItem>
                      <SelectItem value="line-through">Line Through</SelectItem>
                      <SelectItem value="overline">Overline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Text Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Box Model */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="w-5 h-5" />
                Box Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Width: {width}px</Label>
                  <Slider
                    value={[width]}
                    onValueChange={([v]) => setWidth(v)}
                    min={50}
                    max={600}
                    step={10}
                  />
                </div>
                <div>
                  <Label>Height: {height}px</Label>
                  <Slider
                    value={[height]}
                    onValueChange={([v]) => setHeight(v)}
                    min={50}
                    max={400}
                    step={10}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Padding: {padding}px</Label>
                  <Slider
                    value={[padding]}
                    onValueChange={([v]) => setPadding(v)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
                <div>
                  <Label>Margin: {margin}px</Label>
                  <Slider
                    value={[margin]}
                    onValueChange={([v]) => setMargin(v)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Border Width: {borderWidth}px</Label>
                  <Slider
                    value={[borderWidth]}
                    onValueChange={([v]) => setBorderWidth(v)}
                    min={0}
                    max={20}
                    step={1}
                  />
                </div>
                <div>
                  <Label>Border Style</Label>
                  <Select value={borderStyle} onValueChange={(v) => setBorderStyle(v as typeof borderStyle)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="groove">Groove</SelectItem>
                      <SelectItem value="ridge">Ridge</SelectItem>
                      <SelectItem value="inset">Inset</SelectItem>
                      <SelectItem value="outset">Outset</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Border Radius: {borderRadius}px</Label>
                  <Slider
                    value={[borderRadius]}
                    onValueChange={([v]) => setBorderRadius(v)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </div>

              <div>
                <Label>Border Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Display & Positioning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Display & Positioning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display</Label>
                  <Select value={display} onValueChange={(v) => setDisplay(v as typeof display)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="block">Block</SelectItem>
                      <SelectItem value="inline-block">Inline Block</SelectItem>
                      <SelectItem value="flex">Flex</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Position</Label>
                  <Select value={position} onValueChange={(v) => setPosition(v as typeof position)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">Static</SelectItem>
                      <SelectItem value="relative">Relative</SelectItem>
                      <SelectItem value="absolute">Absolute</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="sticky">Sticky</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Visibility</Label>
                  <Select value={visibility} onValueChange={(v) => setVisibility(v as typeof visibility)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible">Visible</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Overflow</Label>
                  <Select value={overflow} onValueChange={(v) => setOverflow(v as typeof overflow)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible">Visible</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="scroll">Scroll</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Opacity: {opacity}%</Label>
                <Slider
                  value={[opacity]}
                  onValueChange={([v]) => setOpacity(v)}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Box Shadow</Label>
                <Switch checked={boxShadow} onCheckedChange={setBoxShadow} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Transition Animation</Label>
                <Switch checked={transition} onCheckedChange={setTransition} />
              </div>
            </CardContent>
          </Card>

          {/* Custom CSS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Custom CSS (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                placeholder="Add additional CSS properties here (one per line, e.g., 'transform: rotate(45deg);')"
                className="font-mono text-sm min-h-[100px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Preview & Output Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] p-4 bg-muted/50 rounded-lg border border-dashed flex items-center justify-center overflow-auto">
                <div
                  className="transition-all"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontWeight,
                    fontFamily,
                    textAlign,
                    lineHeight,
                    letterSpacing: `${letterSpacing}px`,
                    textTransform,
                    textDecoration,
                    color: textColor,
                    width: `${width}px`,
                    height: `${height}px`,
                    padding: `${padding}px`,
                    margin: `${margin}px`,
                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                    borderRadius: `${borderRadius}px`,
                    backgroundColor,
                    display,
                    position,
                    visibility,
                    overflow,
                    opacity: opacity / 100,
                    boxShadow: boxShadow ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
                    transition: transition ? "all 0.3s ease" : "none",
                  }}
                >
                  Sample Text
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap break-all max-h-[400px] overflow-auto">
                  {`.element {
  ${cssCode}
}`}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`.element {\n  ${cssCode}\n}`, "CSS")}
                  className="shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(`.element {\n  ${cssCode}\n}`, "CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS Code
              </Button>

              <Button variant="outline" className="w-full" onClick={resetAll}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Use <code className="bg-muted px-1 py-0.5 rounded">position: relative</code> as a reference for absolute positioning</p>
              <p>• <code className="bg-muted px-1 py-0.5 rounded">overflow: hidden</code> clips content that exceeds the box</p>
              <p>• Combine <code className="bg-muted px-1 py-0.5 rounded">opacity</code> with transitions for fade effects</p>
              <p>• Use custom CSS for advanced properties like transforms and animations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
