"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ColorState {
  h: number;
  s: number;
  l: number;
  v: number;
  a: number;
}

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

const hslToHsv = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const sv = s * Math.min(l, 1 - l);
  const v = l + sv;
  const newS = v === 0 ? 0 : (2 * sv) / v;
  return {
    h,
    s: Math.round(newS * 100),
    v: Math.round(v * 100),
  };
};

const hsvToHsl = (h: number, s: number, v: number) => {
  s /= 100;
  v /= 100;
  const l = v * (1 - s / 2);
  const newS = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h,
    s: Math.round(newS * 100),
    l: Math.round(l * 100),
  };
};

const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export default function AdvancedColorPickerPage() {
  const [color, setColor] = useState<ColorState>({
    h: 260,
    s: 70,
    l: 55,
    v: 73,
    a: 100,
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [hexInput, setHexInput] = useState("");
  const [activeTab, setActiveTab] = useState("hsl");

  const hex = hslToHex(color.h, color.s, color.l);
  const rgb = hslToRgb(color.h, color.s, color.l);
  const hsv = hslToHsv(color.h, color.s, color.l);

  const updateHsl = (h: number, s: number, l: number) => {
    const hsv = hslToHsv(h, s, l);
    setColor((prev) => ({ ...prev, h, s, l, v: hsv.v }));
  };

  const updateHsv = (h: number, s: number, v: number) => {
    const hsl = hsvToHsl(h, s, v);
    setColor((prev) => ({ ...prev, h, s: hsl.s, l: hsl.l, v }));
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    const hsl = hexToHsl(value);
    if (hsl) {
      const hsv = hslToHsv(hsl.h, hsl.s, hsl.l);
      setColor((prev) => ({ ...prev, ...hsl, v: hsv.v }));
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const CopyButton = ({
    text,
    field,
    className = "",
  }: {
    text: string;
    field: string;
    className?: string;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className}`}
      onClick={() => copyToClipboard(text, field)}
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  const SliderInput = ({
    label,
    value,
    onChange,
    min,
    max,
    suffix,
    color,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    suffix?: string;
    color?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-muted-foreground">
          {label}
        </Label>
        <span className="text-sm font-mono">
          {value}
          {suffix}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={([v]) => onChange(v)}
        className={color ? "[&_.bg-primary]:!bg-transparent" : ""}
      />
    </div>
  );

  const ColorWheel = () => {
    const canvasSize = 280;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const radius = 120;
    const innerRadius = 40;

    const handleWheelClick = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      const h = angle < 0 ? angle + 360 : angle;

      const distance = Math.sqrt(x * x + y * y);
      const normalizedDistance = Math.max(
        0,
        Math.min(1, (distance - innerRadius) / (radius - innerRadius)),
      );

      const s = 50 + normalizedDistance * 50;
      const l = 50 + (1 - normalizedDistance) * 30;

      const hsv = hslToHsv(h, s, l);
      setColor((prev) => ({ ...prev, h, s, l, v: hsv.v }));
    };

    const selectorAngle = color.h;
    const selectorDistance =
      innerRadius + ((color.s - 50) / 50) * (radius - innerRadius);
    const selectorX =
      centerX + selectorDistance * Math.cos((selectorAngle * Math.PI) / 180);
    const selectorY =
      centerY + selectorDistance * Math.sin((selectorAngle * Math.PI) / 180);

    return (
      <div className="flex justify-center">
        <svg
          width={canvasSize}
          height={canvasSize}
          className="cursor-crosshair"
          onClick={handleWheelClick}
        >
          <defs>
            <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#808080" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {[...Array(36)].map((_, i) => (
            <path
              key={i}
              d={`M ${centerX + innerRadius * Math.cos((i * 10 * Math.PI) / 180)} ${centerY + innerRadius * Math.sin((i * 10 * Math.PI) / 180)}
                  L ${centerX + radius * Math.cos((i * 10 * Math.PI) / 180)} ${centerY + radius * Math.sin((i * 10 * Math.PI) / 180)}
                  A ${radius} ${radius} 0 0 1 ${centerX + radius * Math.cos(((i + 1) * 10 * Math.PI) / 180)} ${centerY + radius * Math.sin(((i + 1) * 10 * Math.PI) / 180)}
                  L ${centerX + innerRadius * Math.cos(((i + 1) * 10 * Math.PI) / 180)} ${centerY + innerRadius * Math.sin(((i + 1) * 10 * Math.PI) / 180)}
                  A ${innerRadius} ${innerRadius} 0 0 0 ${centerX + innerRadius * Math.cos((i * 10 * Math.PI) / 180)} ${centerY + innerRadius * Math.sin((i * 10 * Math.PI) / 180)} Z`}
              fill={`hsl(${i * 10}, 100%, 50%)`}
              stroke="none"
            />
          ))}

          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius}
            fill="url(#wheelGradient)"
          />

          <circle
            cx={selectorX}
            cy={selectorY}
            r="10"
            fill="white"
            stroke="#333"
            strokeWidth="2"
            className="pointer-events-none"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Advanced Color Picker with RGB, HSL & HSV Sliders
          </h1>
          <p className="text-muted-foreground">
            Professional color picker featuring a full color wheel, RGB, HSL,
            and HSV sliders, alpha transparency control, and a live preview —
            all in one tool.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div
                className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: hex, opacity: color.a / 100 }}
              >
                <div className="text-center">
                  <p
                    className="text-sm font-mono mb-1"
                    style={{
                      color: color.l > 50 ? "#000" : "#fff",
                      textShadow: color.l > 50 ? "none" : "0 0 2px #fff",
                    }}
                  >
                    {hex}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: color.l > 50 ? "#000" : "#fff",
                      opacity: 0.7,
                    }}
                  >
                    Alpha: {color.a}%
                  </p>
                </div>
              </div>

              <ColorWheel />

              <div className="space-y-4 pt-2">
                <SliderInput
                  label="Hue"
                  value={color.h}
                  onChange={(v) => updateHsl(v, color.s, color.l)}
                  min={0}
                  max={360}
                  suffix="°"
                />
                <div
                  className="h-6 rounded-full"
                  style={{
                    background: `linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`,
                  }}
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                  <TabsTrigger value="hsv">HSV</TabsTrigger>
                  <TabsTrigger value="rgb">RGB</TabsTrigger>
                </TabsList>

                <TabsContent value="hsl" className="space-y-4 mt-4">
                  <SliderInput
                    label="Saturation"
                    value={color.s}
                    onChange={(v) => updateHsl(color.h, v, color.l)}
                    min={0}
                    max={100}
                    suffix="%"
                  />
                  <SliderInput
                    label="Lightness"
                    value={color.l}
                    onChange={(v) => updateHsl(color.h, color.s, v)}
                    min={0}
                    max={100}
                    suffix="%"
                  />
                </TabsContent>

                <TabsContent value="hsv" className="space-y-4 mt-4">
                  <SliderInput
                    label="Saturation"
                    value={hsv.s}
                    onChange={(v) => updateHsv(color.h, v, color.v)}
                    min={0}
                    max={100}
                    suffix="%"
                  />
                  <SliderInput
                    label="Value"
                    value={color.v}
                    onChange={(v) => updateHsv(color.h, hsv.s, v)}
                    min={0}
                    max={100}
                    suffix="%"
                  />
                </TabsContent>

                <TabsContent value="rgb" className="space-y-4 mt-4">
                  <SliderInput
                    label="Red"
                    value={rgb.r}
                    onChange={(v) => {
                      const newHex = `#${v.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`;
                      const hsl = hexToHsl(newHex);
                      if (hsl) {
                        const hsv = hslToHsv(hsl.h, hsl.s, hsl.l);
                        setColor((prev) => ({ ...prev, ...hsl, v: hsv.v }));
                      }
                    }}
                    min={0}
                    max={255}
                  />
                  <div
                    className="h-6 rounded-full"
                    style={{
                      background: `linear-gradient(to right, #000, #ff0000)`,
                    }}
                  />
                  <SliderInput
                    label="Green"
                    value={rgb.g}
                    onChange={(v) => {
                      const newHex = `#${rgb.r.toString(16).padStart(2, "0")}${v.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`;
                      const hsl = hexToHsl(newHex);
                      if (hsl) {
                        const hsv = hslToHsv(hsl.h, hsl.s, hsl.l);
                        setColor((prev) => ({ ...prev, ...hsl, v: hsv.v }));
                      }
                    }}
                    min={0}
                    max={255}
                  />
                  <div
                    className="h-6 rounded-full"
                    style={{
                      background: `linear-gradient(to right, #000, #00ff00)`,
                    }}
                  />
                  <SliderInput
                    label="Blue"
                    value={rgb.b}
                    onChange={(v) => {
                      const newHex = `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${v.toString(16).padStart(2, "0")}`;
                      const hsl = hexToHsl(newHex);
                      if (hsl) {
                        const hsv = hslToHsv(hsl.h, hsl.s, hsl.l);
                        setColor((prev) => ({ ...prev, ...hsl, v: hsv.v }));
                      }
                    }}
                    min={0}
                    max={255}
                  />
                  <div
                    className="h-6 rounded-full"
                    style={{
                      background: `linear-gradient(to right, #000, #0000ff)`,
                    }}
                  />
                </TabsContent>
              </Tabs>

              <div className="space-y-4 pt-2 border-t">
                <SliderInput
                  label="Alpha (Opacity)"
                  value={color.a}
                  onChange={(v) => setColor((prev) => ({ ...prev, a: v }))}
                  min={0}
                  max={100}
                  suffix="%"
                />
                <div
                  className="h-6 rounded-full "
                  style={{
                    background: `linear-gradient(to right, transparent, ${hex})`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="hex"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    HEX
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        #
                      </span>
                      <Input
                        id="hex"
                        value={hexInput.replace("#", "")}
                        onChange={(e) => handleHexChange("#" + e.target.value)}
                        className="pl-7 font-mono"
                        maxLength={6}
                      />
                    </div>
                    <div
                      className="w-12 h-10 rounded border "
                      style={{ backgroundColor: hex }}
                    />
                    <CopyButton text={hex} field="HEX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    RGB
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                      readOnly
                      className="font-mono flex-1"
                    />
                    <CopyButton
                      text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                      field="RGB"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    HSL
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
                      readOnly
                      className="font-mono flex-1"
                    />
                    <CopyButton
                      text={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
                      field="HSL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    HSV
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                      readOnly
                      className="font-mono flex-1"
                    />
                    <CopyButton
                      text={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                      field="HSV"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    RGBA
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(color.a / 100).toFixed(2)})`}
                      readOnly
                      className="font-mono flex-1"
                    />
                    <CopyButton
                      text={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(color.a / 100).toFixed(2)})`}
                      field="RGBA"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    HSLA
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={`hsla(${color.h}, ${color.s}%, ${color.l}%, ${(color.a / 100).toFixed(2)})`}
                      readOnly
                      className="font-mono flex-1"
                    />
                    <CopyButton
                      text={`hsla(${color.h}, ${color.s}%, ${color.l}%, ${(color.a / 100).toFixed(2)})`}
                      field="HSLA"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateHsl(260, 70, 55);
                      setColor((prev) => ({ ...prev, a: 100 }));
                    }}
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
