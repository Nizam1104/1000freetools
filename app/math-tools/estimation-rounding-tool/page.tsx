"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EstimationRoundingTool() {
  const [number, setNumber] = useState("");
  const [place, setPlace] = useState<string>("10");
  const [result, setResult] = useState<{
    original: number;
    rounded: number;
    place: string;
    explanation: string;
    difference: number;
  } | null>(null);
  const [error, setError] = useState("");

  const roundNumber = (num: number, placeValue: string) => {
    let rounded: number;
    let placeName: string;
    let divisor: number;

    switch (placeValue) {
      case "0.01":
        rounded = Math.round(num * 100) / 100;
        placeName = "nearest hundredth (0.01)";
        divisor = 100;
        break;
      case "0.1":
        rounded = Math.round(num * 10) / 10;
        placeName = "nearest tenth (0.1)";
        divisor = 10;
        break;
      case "1":
        rounded = Math.round(num);
        placeName = "nearest whole number";
        divisor = 1;
        break;
      case "10":
        rounded = Math.round(num / 10) * 10;
        placeName = "nearest ten";
        divisor = 10;
        break;
      case "100":
        rounded = Math.round(num / 100) * 100;
        placeName = "nearest hundred";
        divisor = 100;
        break;
      case "1000":
        rounded = Math.round(num / 1000) * 1000;
        placeName = "nearest thousand";
        divisor = 1000;
        break;
      case "10000":
        rounded = Math.round(num / 10000) * 10000;
        placeName = "nearest ten thousand";
        divisor = 10000;
        break;
      case "100000":
        rounded = Math.round(num / 100000) * 100000;
        placeName = "nearest hundred thousand";
        divisor = 100000;
        break;
      default:
        rounded = Math.round(num);
        placeName = "nearest whole number";
        divisor = 1;
    }

    const explanation = `${num} rounded to ${placeName} is ${rounded}`;
    const difference = Math.abs(num - rounded);

    return { original: num, rounded, place: placeName, explanation, difference };
  };

  const calculate = () => {
    const num = parseFloat(number.trim());

    if (isNaN(num)) {
      setError("Please enter a valid number");
      setResult(null);
      return;
    }

    setError("");
    setResult(roundNumber(num, place));
  };

  const reset = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Estimation & Rounding Tool – Round to Any Place Value</h1>
        <p className="text-muted-foreground">
          Round numbers to the nearest ten, hundred, thousand, or decimal place with our free online estimation tool. Perfect for quick estimates and mental math.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number to Round</Label>
            <Input
              type="text"
              placeholder="e.g., 1234.567"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
          <div>
            <Label>Round To</Label>
            <Select value={place} onValueChange={setPlace}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.01">Hundredth (0.01)</SelectItem>
                <SelectItem value="0.1">Tenth (0.1)</SelectItem>
                <SelectItem value="1">Whole Number (1)</SelectItem>
                <SelectItem value="10">Ten (10)</SelectItem>
                <SelectItem value="100">Hundred (100)</SelectItem>
                <SelectItem value="1000">Thousand (1,000)</SelectItem>
                <SelectItem value="10000">Ten Thousand (10,000)</SelectItem>
                <SelectItem value="100000">Hundred Thousand (100,000)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Round Number</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Rounded Result</p>
              <p className="text-4xl font-bold">{result.rounded}</p>
              <p className="text-sm text-muted-foreground mt-2">{result.explanation}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Original Number</p>
                <p className="text-2xl font-mono">{result.original}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Rounded To</p>
                <p className="text-2xl font-bold">{result.rounded}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Difference</p>
                <p className="text-2xl font-mono">{result.difference}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Number Line Visualization</p>
              <div className="relative h-16 bg-background border rounded">
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-0.5 bg-muted-foreground/30" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1 font-mono">{Math.floor(result.original / parseFloat(place)) * parseFloat(place)}</span>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1 font-mono">{Math.ceil(result.original / parseFloat(place)) * parseFloat(place)}</span>
                </div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background shadow"
                  style={{ 
                    left: `${Math.min(90, Math.max(10, ((result.original - Math.floor(result.original / parseFloat(place)) * parseFloat(place)) / parseFloat(place)) * 80 + 10))}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full border-2 border-background shadow flex items-center justify-center"
                  style={{ 
                    left: `${Math.min(90, Math.max(10, ((result.rounded - Math.floor(result.original / parseFloat(place)) * parseFloat(place)) / parseFloat(place)) * 80 + 10))}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span className="text-xs text-white font-bold">✓</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Blue dot shows original number, green shows rounded result
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
