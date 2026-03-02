"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Play, Square } from "lucide-react";

export default function CssAnimationGeneratorPage() {
  const [animationName, setAnimationName] = useState("fadeIn");
  const [duration, setDuration] = useState(1);
  const [timingFunction, setTimingFunction] = useState("ease");
  const [delay, setDelay] = useState(0);
  const [iterationCount, setIterationCount] = useState(1);
  const [direction, setDirection] = useState("normal");
  const [fillMode, setFillMode] = useState("none");
  const [isPlaying, setIsPlaying] = useState(true);

  const generateAnimation = () => {
    const iterations = iterationCount === Infinity ? "infinite" : iterationCount.toString();
    return `animation: ${animationName} ${duration}s ${timingFunction} ${delay}s ${iterations} ${direction} ${fillMode};`;
  };

  const generateKeyframes = () => {
    return `@keyframes ${animationName} {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const animationCSS = generateAnimation();
  const keyframesCSS = generateKeyframes();

  const customTiming = `cubic-bezier(0.68, -0.55, 0.265, 1.55)`;

  const presetAnimations = [
    { name: "Fade In", keyframes: `@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}` },
    { name: "Slide In", keyframes: `@keyframes slideIn {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}` },
    { name: "Scale Up", keyframes: `@keyframes scaleUp {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}` },
    { name: "Rotate", keyframes: `@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}` },
    { name: "Bounce", keyframes: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}` },
    { name: "Pulse", keyframes: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}` },
  ];

  const applyPreset = (preset: typeof presetAnimations[0]) => {
    setAnimationName(preset.keyframes.split(" ")[1]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Animation Generator</h1>
        <p className="text-muted-foreground">
          Create CSS keyframe animations with customizable timing, duration, and effects.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Animation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Animation Name</Label>
                <Input
                  value={animationName}
                  onChange={(e) => setAnimationName(e.target.value)}
                  className="mt-2 font-mono"
                />
              </div>

              <div>
                <Label>Duration: {duration}s</Label>
                <Slider
                  value={[duration]}
                  onValueChange={([v]) => setDuration(v)}
                  min={0.1}
                  max={5}
                  step={0.1}
                />
              </div>

              <div>
                <Label>Timing Function</Label>
                <Select value={timingFunction} onValueChange={setTimingFunction}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ease">Ease</SelectItem>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="ease-in">Ease In</SelectItem>
                    <SelectItem value="ease-out">Ease Out</SelectItem>
                    <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                    <SelectItem value={customTiming}>Custom Bounce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Delay: {delay}s</Label>
                <Slider
                  value={[delay]}
                  onValueChange={([v]) => setDelay(v)}
                  min={0}
                  max={3}
                  step={0.1}
                />
              </div>

              <div>
                <Label>Iteration Count</Label>
                <Select value={iterationCount.toString()} onValueChange={(v) => setIterationCount(v === "infinite" ? Infinity : parseInt(v))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="infinite">Infinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Direction</Label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="reverse">Reverse</SelectItem>
                    <SelectItem value="alternate">Alternate</SelectItem>
                    <SelectItem value="alternate-reverse">Alternate Reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fill Mode</Label>
                <Select value={fillMode} onValueChange={setFillMode}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="forwards">Forwards</SelectItem>
                    <SelectItem value="backwards">Backwards</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preset Animations</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {presetAnimations.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.name}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Live Preview</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center p-8 overflow-hidden">
                <div
                  className={`w-24 h-24 bg-primary rounded-lg ${isPlaying ? "animate-custom" : ""}`}
                  style={{
                    animation: isPlaying ? `${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount === Infinity ? "infinite" : iterationCount} ${direction} ${fillMode}` : "none",
                  }}
                />
              </div>
              <style>{`
                @keyframes ${animationName} {
                  0% {
                    opacity: 0;
                    transform: translateY(-20px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Keyframes</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {keyframesCSS}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(keyframesCSS, "Keyframes")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Animation Property</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                    {animationCSS}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(animationCSS, "Animation")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Complete Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {`${keyframesCSS}

.element {
  ${animationCSS}
}`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${keyframesCSS}\n\n.element {\n  ${animationCSS}\n}`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(`${keyframesCSS}\n\n.element {\n  ${animationCSS}\n}`, "CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
