"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function SvgGradientGenerator() {
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [stops, setStops] = useState<Array<{ offset: number; color: string }>>([
    { offset: 0, color: "#3b82f6" },
    { offset: 100, color: "#8b5cf6" },
  ]);
  const [angle, setAngle] = useState(90);
  const [output, setOutput] = useState("");

  const addStop = () => {
    if (stops.length < 10) {
      setStops([...stops, { offset: 50, color: "#ffffff" }]);
    }
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index));
    }
  };

  const updateStop = (index: number, field: "offset" | "color", value: number | string) => {
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], [field]: value };
    setStops(newStops);
  };

  const generateGradient = () => {
    const gradientId = "gradient";
    const sortedStops = [...stops].sort((a, b) => a.offset - b.offset);

    const stopsXml = sortedStops
      .map((stop) => `<stop offset="${stop.offset}%" stop-color="${stop.color}" />`)
      .join("\n      ");

    let gradientXml: string;

    if (gradientType === "linear") {
      const rad = (angle * Math.PI) / 180;
      const x2 = Math.cos(rad) * 100;
      const y2 = Math.sin(rad) * 100;
      gradientXml = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="${x2.toFixed(0)}%" y2="${y2.toFixed(0)}%">
      ${stopsXml}
    </linearGradient>`;
    } else {
      gradientXml = `<radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%">
      ${stopsXml}
    </radialGradient>`;
    }

    const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${gradientXml}
  </defs>
  <rect width="400" height="300" fill="url(#${gradientId})"/>
</svg>`;

    setOutput(svg);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gradient.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Gradient Generator</h2>
        <p className="text-sm text-muted-foreground">
          Create and edit linear and radial SVG gradients visually
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={gradientType === "linear" ? "default" : "outline"}
              size="sm"
              onClick={() => setGradientType("linear")}
            >
              Linear Gradient
            </Button>
            <Button
              variant={gradientType === "radial" ? "default" : "outline"}
              size="sm"
              onClick={() => setGradientType("radial")}
            >
              Radial Gradient
            </Button>
          </div>

          {gradientType === "linear" && (
            <div className="space-y-2">
              <Label htmlFor="angle">Angle: {angle}°</Label>
              <Slider
                id="angle"
                value={[angle]}
                min={0}
                max={360}
                step={1}
                onValueChange={(v) => setAngle(v[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>270°</span>
                <span>360°</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Color Stops ({stops.length}/10)</Label>
              <Button variant="outline" size="sm" onClick={addStop} disabled={stops.length >= 10}>
                + Add Stop
              </Button>
            </div>
            <div className="space-y-2">
              {stops.map((stop, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-6">{i + 1}</span>
                  <Input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateStop(i, "color", e.target.value)}
                    className="w-16 h-8"
                  />
                  <Slider
                    value={[stop.offset]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(v) => updateStop(i, "offset", v[0])}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono w-12">{stop.offset}%</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStop(i)}
                    disabled={stops.length <= 2}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={generateGradient} className="w-full">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Generate Gradient
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={generateGradient} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!output}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-lg overflow-hidden" dangerouslySetInnerHTML={{ __html: output }} />
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">SVG Code</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleCopy();
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto max-h-[300px]">
              {output}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}
