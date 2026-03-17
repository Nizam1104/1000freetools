"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Clock, Radioactive } from "lucide-react";

const isotopes = [
  { name: "Carbon-14", halfLife: 5730, unit: "years" },
  { name: "Uranium-238", halfLife: 4.468e9, unit: "years" },
  { name: "Iodine-131", halfLife: 8.02, unit: "days" },
  { name: "Cesium-137", halfLife: 30.17, unit: "years" },
  { name: "Tritium (H-3)", halfLife: 12.32, unit: "years" },
  { name: "Radon-222", halfLife: 3.82, unit: "days" },
  { name: "Polonium-210", halfLife: 138.4, unit: "days" },
  { name: "Cobalt-60", halfLife: 5.27, unit: "years" },
];

export default function HalfLifeCalculator() {
  const [initialAmount, setInitialAmount] = useState("100");
  const [halfLife, setHalfLife] = useState("5730");
  const [time, setTime] = useState("1000");
  const [timeUnit, setTimeUnit] = useState("years");
  const [halfLifeUnit, setHalfLifeUnit] = useState("years");
  const [result, setResult] = useState<{
    remaining: number;
    decayed: number;
    halfLivesElapsed: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const convertToYears = useCallback((value: number, unit: string): number => {
    const conversions: Record<string, number> = {
      seconds: 1 / (60 * 60 * 24 * 365.25),
      minutes: 1 / (60 * 24 * 365.25),
      hours: 1 / (24 * 365.25),
      days: 1 / 365.25,
      weeks: 1 / 52.1775,
      months: 1 / 12,
      years: 1,
    };
    return value * (conversions[unit] || 1);
  }, []);

  const calculate = useCallback(() => {
    const N0 = parseFloat(initialAmount) || 0;
    const t = convertToYears(parseFloat(time) || 0, timeUnit);
    const T = convertToYears(parseFloat(halfLife) || 1, halfLifeUnit);

    // N(t) = N0 × (1/2)^(t/T)
    const halfLivesElapsed = t / T;
    const remaining = N0 * Math.pow(0.5, halfLivesElapsed);
    const decayed = N0 - remaining;

    setResult({
      remaining,
      decayed,
      halfLivesElapsed,
    });
  }, [initialAmount, halfLife, time, timeUnit, halfLifeUnit, convertToYears]);

  const loadIsotope = useCallback((isotope: typeof isotopes[0]) => {
    setHalfLife(isotope.halfLife.toString());
    setHalfLifeUnit(isotope.unit);
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Half-Life Calculation:\nInitial Amount: ${initialAmount}\nHalf-Life: ${halfLife} ${halfLifeUnit}\nTime Elapsed: ${time} ${timeUnit}\nRemaining: ${result.remaining.toFixed(4)}\nDecayed: ${result.decayed.toFixed(4)}\nHalf-lives Elapsed: ${result.halfLivesElapsed.toFixed(4)}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, initialAmount, halfLife, halfLifeUnit, time, timeUnit]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radioactive className="w-5 h-5" />
            Half-Life Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              N(t) = N₀ × (1/2)^(t/T)
            </p>
          </div>

          <div>
            <Label>Common Isotopes</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {isotopes.map((isotope) => (
                <Button
                  key={isotope.name}
                  size="sm"
                  variant="outline"
                  onClick={() => loadIsotope(isotope)}
                >
                  {isotope.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Initial Amount (N₀)</Label>
              <Input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Half-Life (T)</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  value={halfLife}
                  onChange={(e) => setHalfLife(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={halfLifeUnit}
                  onChange={(e) => setHalfLifeUnit(e.target.value)}
                  className="p-2 border rounded-md bg-background"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <Label>Time Elapsed (t)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="p-2 border rounded-md bg-background"
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            <Clock className="w-4 h-4 mr-2" />
            Calculate Decay
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                  <Label>Remaining Amount</Label>
                  <p className="text-2xl font-bold mt-2">{result.remaining.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground">
                    {((result.remaining / parseFloat(initialAmount)) * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg text-center">
                  <Label>Decayed Amount</Label>
                  <p className="text-2xl font-bold mt-2">{result.decayed.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground">
                    {((result.decayed / parseFloat(initialAmount)) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg text-center">
                <Label>Half-Lives Elapsed</Label>
                <p className="text-2xl font-bold mt-2">{result.halfLivesElapsed.toFixed(4)}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <Label>Decay Progress</Label>
                <div className="mt-2 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${(result.remaining / parseFloat(initialAmount)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Remaining: {((result.remaining / parseFloat(initialAmount)) * 100).toFixed(1)}%</span>
                  <span>Decayed: {((result.decayed / parseFloat(initialAmount)) * 100).toFixed(1)}%</span>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
