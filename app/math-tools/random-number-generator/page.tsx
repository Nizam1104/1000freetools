"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    setError("");
    setResults([]);

    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const numCount = parseInt(count);

    if (isNaN(minVal) || isNaN(maxVal)) {
      setError("Please enter valid numbers for min and max");
      return;
    }

    if (minVal >= maxVal) {
      setError("Minimum must be less than maximum");
      return;
    }

    if (isNaN(numCount) || numCount < 1) {
      setError("Please enter at least 1 for count");
      return;
    }

    const range = maxVal - minVal + 1;
    if (!allowDuplicates && numCount > range) {
      setError(`Cannot generate ${numCount} unique numbers from a range of ${range}`);
      return;
    }

    try {
      const generated: number[] = [];

      if (allowDuplicates) {
        for (let i = 0; i < numCount; i++) {
          generated.push(Math.floor(Math.random() * range) + minVal);
        }
      } else {
        const available: number[] = [];
        for (let i = minVal; i <= maxVal; i++) {
          available.push(i);
        }

        for (let i = 0; i < numCount; i++) {
          const randomIndex = Math.floor(Math.random() * available.length);
          generated.push(available[randomIndex]);
          available.splice(randomIndex, 1);
        }
      }

      setResults(generated);
    } catch (e) {
      setError("Unable to generate numbers. Please try again.");
    }
  };

  const reset = () => {
    setMin("1");
    setMax("100");
    setCount("1");
    setAllowDuplicates(false);
    setResults([]);
    setError("");
  };

  const loadPreset = (preset: string) => {
    if (preset === "dice") {
      setMin("1");
      setMax("6");
      setCount("1");
    } else if (preset === "coin") {
      setMin("1");
      setMax("2");
      setCount("1");
    } else if (preset === "lottery") {
      setMin("1");
      setMax("49");
      setCount("6");
      setAllowDuplicates(false);
    }
    setResults([]);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Random Number Generator</h1>
        <p className="text-muted-foreground">
          Generate random numbers within any range with our free online random number generator. Supports unique or duplicate numbers, perfect for games, lotteries, and statistical sampling.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadPreset("dice")}>🎲 Dice (1-6)</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset("coin")}>🪙 Coin (1-2)</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset("lottery")}>🎰 Lottery (1-49)</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Minimum:</Label>
            <Input
              type="number"
              placeholder="1"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div>
            <Label>Maximum:</Label>
            <Input
              type="number"
              placeholder="100"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div>
            <Label>How many numbers:</Label>
            <Input
              type="number"
              placeholder="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="duplicates"
            checked={allowDuplicates}
            onCheckedChange={setAllowDuplicates}
          />
          <Label htmlFor="duplicates">Allow duplicate numbers</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={generate} className="text-lg px-8">Generate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">Generated Numbers</p>
              <div className="flex flex-wrap justify-center gap-3">
                {results.map((num, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-2xl font-bold shadow-md"
                  >
                    {num}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                {results.join(', ')}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Minimum</p>
                  <p className="text-lg font-bold">{Math.min(...results)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Maximum</p>
                  <p className="text-lg font-bold">{Math.max(...results)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Average</p>
                  <p className="text-lg font-bold">{(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
