"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CssButtonGeneratorPage() {
  const [buttonText, setButtonText] = useState("Click Me");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [hoverBgColor, setHoverBgColor] = useState("#4f46e5");
  const [hoverTextColor, setHoverTextColor] = useState("#ffffff");
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(12);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(600);
  const [borderRadius, setBorderRadius] = useState(8);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#6366f1");
  const [hasShadow, setHasShadow] = useState(true);
  const [shadowColor, setShadowColor] = useState("rgba(99, 102, 241, 0.4)");
  const [shadowSize, setShadowSize] = useState(2);
  const [gradientEnabled, setGradientEnabled] = useState(false);
  const [gradientEndColor, setGradientEndColor] = useState("#8b5cf6");
  const [gradientAngle, setGradientAngle] = useState(90);
  const [transformHover, setTransformHover] = useState<"none" | "scale" | "translate" | "rotate">("scale");
  const [transformValue, setTransformValue] = useState(1.05);

  const generateButtonCSS = () => {
    const baseStyles: string[] = [
      `padding: ${paddingY}px ${paddingX}px`,
      `font-size: ${fontSize}px`,
      `font-weight: ${fontWeight}`,
      `border-radius: ${borderRadius}px`,
      `border: ${borderWidth}px solid ${borderColor}`,
      `background: ${gradientEnabled ? `linear-gradient(${gradientAngle}deg, ${bgColor}, ${gradientEndColor})` : bgColor}`,
      `color: ${textColor}`,
      `cursor: pointer`,
      `transition: all 0.3s ease`,
    ];

    if (hasShadow) {
      baseStyles.push(`box-shadow: 0 ${shadowSize}px ${shadowSize * 2}px ${shadowColor}`);
    }

    const hoverStyles: string[] = [];
    
    if (gradientEnabled) {
      hoverStyles.push(`background: linear-gradient(${gradientAngle}deg, ${hoverBgColor}, ${gradientEndColor})`);
    } else {
      hoverStyles.push(`background: ${hoverBgColor}`);
    }
    
    hoverStyles.push(`color: ${hoverTextColor}`);
    
    if (transformHover === "scale") {
      hoverStyles.push(`transform: scale(${transformValue})`);
    } else if (transformHover === "translate") {
      hoverStyles.push(`transform: translateY(-${transformValue - 1}px)`);
    } else if (transformHover === "rotate") {
      hoverStyles.push(`transform: rotate(${(transformValue - 1) * 10}deg)`);
    }

    if (hasShadow) {
      hoverStyles.push(`box-shadow: 0 ${shadowSize * 2}px ${shadowSize * 4}px ${shadowColor}`);
    }

    return `.btn {
  ${baseStyles.join(";\n  ")};
}

.btn:hover {
  ${hoverStyles.join(";\n  ")};
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

  const buttonCSS = generateButtonCSS();

  const getButtonStyles = () => {
    const base: React.CSSProperties = {
      padding: `${paddingY}px ${paddingX}px`,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      borderRadius: `${borderRadius}px`,
      border: `${borderWidth}px solid ${borderColor}`,
      background: gradientEnabled ? `linear-gradient(${gradientAngle}deg, ${bgColor}, ${gradientEndColor})` : bgColor,
      color: textColor,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "inline-block",
    };

    if (hasShadow) {
      base.boxShadow = `0 ${shadowSize}px ${shadowSize * 2}px ${shadowColor}`;
    }

    return base;
  };

  const getHoverStyles = () => {
    const hover: React.CSSProperties = {};
    
    if (transformHover === "scale") {
      hover.transform = `scale(${transformValue})`;
    } else if (transformHover === "translate") {
      hover.transform = `translateY(-${transformValue - 1}px)`;
    } else if (transformHover === "rotate") {
      hover.transform = `rotate(${(transformValue - 1) * 10}deg)`;
    }

    if (hasShadow) {
      hover.boxShadow = `0 ${shadowSize * 2}px ${shadowSize * 4}px ${shadowColor}`;
    }

    return hover;
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Button Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful buttons with hover effects, gradients, shadows, and animations. Generate production-ready CSS code.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content & Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Button Text</Label>
                <Input value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Background</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-9" />
                    <Input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="font-mono text-sm" />
                  </div>
                </div>
                <div>
                  <Label>Text Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-12 h-9" />
                    <Input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="font-mono text-sm" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hover Background</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="color" value={hoverBgColor} onChange={(e) => setHoverBgColor(e.target.value)} className="w-12 h-9" />
                    <Input type="text" value={hoverBgColor} onChange={(e) => setHoverBgColor(e.target.value)} className="font-mono text-sm" />
                  </div>
                </div>
                <div>
                  <Label>Hover Text</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="color" value={hoverTextColor} onChange={(e) => setHoverTextColor(e.target.value)} className="w-12 h-9" />
                    <Input type="text" value={hoverTextColor} onChange={(e) => setHoverTextColor(e.target.value)} className="font-mono text-sm" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Gradient</Label>
                <Switch checked={gradientEnabled} onCheckedChange={setGradientEnabled} />
              </div>
              {gradientEnabled && (
                <>
                  <div>
                    <Label>Gradient End Color</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input type="color" value={gradientEndColor} onChange={(e) => setGradientEndColor(e.target.value)} className="w-12 h-9" />
                      <Input type="text" value={gradientEndColor} onChange={(e) => setGradientEndColor(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                  <div>
                    <Label>Gradient Angle: {gradientAngle}°</Label>
                    <Slider value={[gradientAngle]} onValueChange={([v]) => setGradientAngle(v)} min={0} max={360} step={45} className="mt-2" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Size & Spacing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Horizontal Padding: {paddingX}px</Label>
                <Slider value={[paddingX]} onValueChange={([v]) => setPaddingX(v)} min={8} max={64} step={2} className="mt-2" />
              </div>
              <div>
                <Label>Vertical Padding: {paddingY}px</Label>
                <Slider value={[paddingY]} onValueChange={([v]) => setPaddingY(v)} min={4} max={32} step={2} className="mt-2" />
              </div>
              <div>
                <Label>Font Size: {fontSize}px</Label>
                <Slider value={[fontSize]} onValueChange={([v]) => setFontSize(v)} min={12} max={32} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Font Weight: {fontWeight}</Label>
                <Slider value={[fontWeight]} onValueChange={([v]) => setFontWeight(v)} min={100} max={900} step={100} className="mt-2" />
              </div>
              <div>
                <Label>Border Radius: {borderRadius}px</Label>
                <Slider value={[borderRadius]} onValueChange={([v]) => setBorderRadius(v)} min={0} max={50} step={1} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Border & Shadow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Border Width: {borderWidth}px</Label>
                <Slider value={[borderWidth]} onValueChange={([v]) => setBorderWidth(v)} min={0} max={4} step={1} className="mt-2" />
              </div>
              {borderWidth > 0 && (
                <div>
                  <Label>Border Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-12 h-9" />
                    <Input type="text" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="font-mono text-sm" />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <Label>Enable Shadow</Label>
                <Switch checked={hasShadow} onCheckedChange={setHasShadow} />
              </div>
              {hasShadow && (
                <>
                  <div>
                    <Label>Shadow Size: {shadowSize}px</Label>
                    <Slider value={[shadowSize]} onValueChange={([v]) => setShadowSize(v)} min={0} max={10} step={1} className="mt-2" />
                  </div>
                  <div>
                    <Label>Shadow Color</Label>
                    <Input type="text" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="mt-2 font-mono text-sm" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hover Transform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Transform Type</Label>
                <Select value={transformHover} onValueChange={(v) => setTransformHover(v as typeof transformHover)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="scale">Scale</SelectItem>
                    <SelectItem value="translate">Translate</SelectItem>
                    <SelectItem value="rotate">Rotate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {transformHover !== "none" && (
                <div>
                  <Label>Transform Value: {transformValue}</Label>
                  <Slider value={[transformValue]} onValueChange={([v]) => setTransformValue(v)} min={0.8} max={1.2} step={0.01} className="mt-2" />
                </div>
              )}
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
              <div className="flex items-center justify-center p-12 bg-muted/50 rounded-lg">
                <button
                  className="transition-all duration-300 ease-in-out"
                  style={getButtonStyles()}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span style={isHovered ? getHoverStyles() : {}}>{buttonText}</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setBgColor("#6366f1");
                  setTextColor("#ffffff");
                  setHoverBgColor("#4f46e5");
                  setBorderRadius(8);
                  setGradientEnabled(false);
                  setHasShadow(true);
                }}
              >
                Primary
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBgColor("#ffffff");
                  setTextColor("#333333");
                  setHoverBgColor("#f3f4f6");
                  setBorderRadius(8);
                  setGradientEnabled(false);
                  setHasShadow(true);
                  setBorderColor("#e5e7eb");
                  setBorderWidth(1);
                }}
              >
                Secondary
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBgColor("#ef4444");
                  setTextColor("#ffffff");
                  setHoverBgColor("#dc2626");
                  setBorderRadius(50);
                  setGradientEnabled(true);
                  setGradientEndColor("#f97316");
                  setHasShadow(true);
                }}
              >
                Gradient Pill
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBgColor("transparent");
                  setTextColor("#6366f1");
                  setHoverBgColor("#6366f1");
                  setHoverTextColor("#ffffff");
                  setBorderRadius(8);
                  setBorderWidth(2);
                  setBorderColor("#6366f1");
                  setHasShadow(false);
                }}
              >
                Outline
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                  {buttonCSS}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(buttonCSS, "Button CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(buttonCSS, "Button CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Button CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS Buttons</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Buttons are one of the most important interactive elements in web design. A well-designed button 
              communicates its purpose, invites interaction, and provides visual feedback to users.
            </p>
            <p>
              Modern CSS buttons use a combination of properties including padding, border-radius, box-shadow, 
              gradients, and transitions to create polished, professional-looking call-to-action elements.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Button Design Tips</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clear Hierarchy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use different button styles for primary, secondary, and tertiary actions. Primary buttons should 
                be the most visually prominent.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hover Feedback</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Always provide hover states to indicate interactivity. Use color changes, shadows, or transforms 
                to signal the button is clickable.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Ensure sufficient color contrast (4.5:1 minimum). Add focus states for keyboard navigation and 
                screen reader support.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
