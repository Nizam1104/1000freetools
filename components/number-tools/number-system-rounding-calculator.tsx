"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberRoundingCalculator() {
  const [number, setNumber] = useState("");
  const [places, setPlaces] = useState("2");
  const [mode, setMode] = useState<"decimal" | "significant" | "nearest" | "up" | "down">("decimal");
  const [nearestValue, setNearestValue] = useState("0.5");
  const [result, setResult] = useState("");

  const roundToDecimal = (num: number, places: number) => {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
  };

  const roundToSignificant = (num: number, sigFigs: number) => {
    if (num === 0) return 0;
    const factor = Math.pow(10, sigFigs - Math.floor(Math.log10(Math.abs(num))) - 1);
    return Math.round(num * factor) / factor;
  };

  const roundToNearest = (num: number, nearest: number) => {
    return Math.round(num / nearest) * nearest;
  };

  const roundUp = (num: number, places: number) => {
    const factor = Math.pow(10, places);
    return Math.ceil(num * factor) / factor;
  };

  const roundDown = (num: number, places: number) => {
    const factor = Math.pow(10, places);
    return Math.floor(num * factor) / factor;
  };

  const handleRound = () => {
    const num = parseFloat(number);
    const placesNum = parseInt(places);
    const nearestNum = parseFloat(nearestValue);

    if (isNaN(num)) {
      setResult("Error: Invalid number");
      return;
    }

    let rounded: number;

    switch (mode) {
      case "decimal":
        rounded = roundToDecimal(num, placesNum || 0);
        break;
      case "significant":
        rounded = roundToSignificant(num, placesNum || 3);
        break;
      case "nearest":
        rounded = roundToNearest(num, nearestNum || 1);
        break;
      case "up":
        rounded = roundUp(num, placesNum || 0);
        break;
      case "down":
        rounded = roundDown(num, placesNum || 0);
        break;
      default:
        rounded = num;
    }

    // Format result to avoid floating point issues
    const formatted = Number.isInteger(rounded) 
      ? rounded.toString() 
      : parseFloat(rounded.toPrecision(12)).toString();
    
    setResult(formatted);
  };

  const handleCopy = async () => {
    if (result && !result.startsWith("Error")) {
      await navigator.clipboard.writeText(result);
    }
  };

  const handleClear = () => {
    setNumber("");
    setResult("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number System Rounding Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Round numbers to decimal places, significant figures, or nearest value
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {([
            { value: "decimal", label: "Decimal Places" },
            { value: "significant", label: "Significant Figures" },
            { value: "nearest", label: "Nearest Value" },
            { value: "up", label: "Round Up" },
            { value: "down", label: "Round Down" },
          ] as const).map((m) => (
            <Button
              key={m.value}
              variant={mode === m.value ? "default" : "outline"}
              size="sm"
              onClick={() => setMode(m.value)}
            >
              {m.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 items-end">
          <div className="space-y-2">
            <Label htmlFor="number">Number</Label>
            <Input
              id="number"
              type="number"
              step="any"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="3.14159"
              className="font-mono"
            />
          </div>

          {(mode === "decimal" || mode === "significant" || mode === "up" || mode === "down") && (
            <div className="space-y-2">
              <Label>{mode === "significant" ? "Significant Figures" : "Decimal Places"}</Label>
              <Input
                type="number"
                min="0"
                max="15"
                value={places}
                onChange={(e) => setPlaces(e.target.value)}
                placeholder="2"
                className="font-mono"
              />
            </div>
          )}

          {mode === "nearest" && (
            <div className="space-y-2">
              <Label>Nearest Value</Label>
              <Input
                type="number"
                step="any"
                value={nearestValue}
                onChange={(e) => setNearestValue(e.target.value)}
                placeholder="0.5"
                className="font-mono"
              />
            </div>
          )}

          <div className="sm:col-span-1">
            <Button onClick={handleRound} className="w-full">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Round
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleRound} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Round
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-sm text-muted-foreground">Rounded Result</Label>
              <div className="text-2xl font-bold font-mono mt-1">{result}</div>
            </div>
            {!result.startsWith("Error") && (
              <Button
                variant="outline"
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
            )}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Rounding Methods</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Decimal Places</div>
            <div className="text-sm text-muted-foreground">3.14159 → 3.14 (2 places)</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Significant Figures</div>
            <div className="text-sm text-muted-foreground">3.14159 → 3.1 (2 sig figs)</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Nearest Value</div>
            <div className="text-sm text-muted-foreground">3.7 → 4.0 (nearest 0.5)</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Round Up/Down</div>
            <div className="text-sm text-muted-foreground">3.14159 → 3.15 / 3.14</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
