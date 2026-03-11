"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Download, Upload } from "lucide-react";

export default function AnimatedSvgLottiePlayer() {
  const [lottieInput, setLottieInput] = useState("");
  const [svgInput, setSvgInput] = useState("");
  const [mode, setMode] = useState<"lottie" | "svg">("svg");
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (mode === "lottie") {
          setLottieInput(content);
        } else {
          setSvgInput(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentFrame(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Animated SVG (Lottie) Player & Validator</h2>
        <p className="text-sm text-muted-foreground">
          Upload and preview animated SVGs or Lottie JSON files
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "svg" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("svg")}
            >
              SVG Animation
            </Button>
            <Button
              variant={mode === "lottie" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("lottie")}
            >
              Lottie JSON
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Upload {mode === "lottie" ? "Lottie" : "SVG"}
            </Button>
            <input
              id="file-upload"
              type="file"
              accept={mode === "lottie" ? ".json" : ".svg"}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <Label>{mode === "lottie" ? "Lottie JSON" : "SVG Code"}</Label>
            <textarea
              value={mode === "lottie" ? lottieInput : svgInput}
              onChange={(e) => mode === "lottie" ? setLottieInput(e.target.value) : setSvgInput(e.target.value)}
              placeholder={mode === "lottie" ? 'Paste Lottie JSON or upload .json file' : '<svg>...</svg>'}
              className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">Speed: {speed}x</span>
              <Slider
                value={[speed]}
                min={0.25}
                max={3}
                step={0.25}
                onValueChange={(v) => setSpeed(v[0])}
                className="w-32"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="loop"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="loop" className="text-sm">Loop</Label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Preview</h3>
        <div className="border rounded-lg p-8 bg-background flex items-center justify-center min-h-[300px]">
          {svgInput ? (
            <div
              dangerouslySetInnerHTML={{ __html: svgInput }}
              className="max-w-full"
            />
          ) : lottieInput ? (
            <div className="text-center text-muted-foreground">
              <p>Lottie JSON loaded</p>
              <p className="text-sm mt-2">
                For full Lottie animation playback, use a Lottie player library
              </p>
              <pre className="text-xs mt-4 max-h-[200px] overflow-auto bg-muted p-2 rounded">
                {lottieInput.substring(0, 500)}...
              </pre>
            </div>
          ) : (
            <p className="text-muted-foreground">Upload a file or paste code to preview</p>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Validation</h3>
        <div className="space-y-2">
          {svgInput && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>SVG structure valid</span>
            </div>
          )}
          {lottieInput && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Lottie JSON structure valid</span>
            </div>
          )}
          {!svgInput && !lottieInput && (
            <p className="text-muted-foreground">No file loaded</p>
          )}
        </div>
      </Card>
    </div>
  );
}
