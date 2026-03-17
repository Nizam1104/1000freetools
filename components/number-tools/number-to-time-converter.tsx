"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy, RotateCcw, Clock } from "lucide-react";

const NumberToTimeConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState<"seconds" | "minutes" | "hours" | "milliseconds">("seconds");
  const [outputFormat, setOutputFormat] = useState<"human" | "digital" | "iso" | "all">("all");
  const [converted, setConverted] = useState<{
    human: string;
    digital: string;
    iso: string;
    breakdown: { [key: string]: number };
  } | null>(null);

  const inputUnits = [
    { value: "milliseconds", label: "Milliseconds" },
    { value: "seconds", label: "Seconds" },
    { value: "minutes", label: "Minutes" },
    { value: "hours", label: "Hours" },
  ];

  const outputFormats = [
    { value: "human", label: "Human Readable" },
    { value: "digital", label: "Digital (HH:MM:SS)" },
    { value: "iso", label: "ISO 8601 Duration" },
    { value: "all", label: "All Formats" },
  ];

  const convertToTime = useCallback(() => {
    if (!inputValue) return;

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      return;
    }

    // Convert everything to seconds
    let totalSeconds: number;
    switch (inputUnit) {
      case "milliseconds":
        totalSeconds = value / 1000;
        break;
      case "minutes":
        totalSeconds = value * 60;
        break;
      case "hours":
        totalSeconds = value * 3600;
        break;
      default:
        totalSeconds = value;
    }

    // Calculate breakdown
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.round((totalSeconds % 1) * 1000);

    // Human readable
    const parts: string[] = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
    if (milliseconds > 0 && parts.length === 0) parts.push(`${milliseconds} millisecond${milliseconds !== 1 ? "s" : ""}`);
    const human = parts.length > 0 ? parts.join(", ") : "0 seconds";

    // Digital format
    const totalHours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);
    const digital = `${String(totalHours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    // ISO 8601 duration
    const iso = `P${days > 0 ? `${days}D` : ""}T${hours}H${minutes}M${seconds}s`;

    setConverted({
      human,
      digital,
      iso,
      breakdown: { days, hours, minutes, seconds, milliseconds, totalSeconds },
    });
  }, [inputValue, inputUnit]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setConverted(null);
  }, []);

  const handleCopy = useCallback(() => {
    if (converted) {
      const text = outputFormat === "all" 
        ? `Human: ${converted.human}\nDigital: ${converted.digital}\nISO 8601: ${converted.iso}`
        : converted[outputFormat as keyof typeof converted];
      navigator.clipboard.writeText(text);
    }
  }, [converted, outputFormat]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Number to Time Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Value</Label>
              <Input
                id="inputValue"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter number"
                step="0.001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inputUnit">Input Unit</Label>
              <select
                id="inputUnit"
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value as typeof inputUnit)}
                className="w-full p-2 border rounded-md"
              >
                {inputUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outputFormat">Output Format</Label>
              <select
                id="outputFormat"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
                className="w-full p-2 border rounded-md"
              >
                {outputFormats.map((fmt) => (
                  <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertToTime} disabled={!inputValue}>
              <Clock className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!converted}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {converted && (
            <div className="space-y-4">
              {(outputFormat === "all" || outputFormat === "human") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Human Readable</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold">{converted.human}</p>
                  </CardContent>
                </Card>
              )}

              {(outputFormat === "all" || outputFormat === "digital") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Digital Format</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-mono font-bold">{converted.digital}</p>
                  </CardContent>
                </Card>
              )}

              {(outputFormat === "all" || outputFormat === "iso") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">ISO 8601 Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-mono">{converted.iso}</p>
                  </CardContent>
                </Card>
              )}

              {outputFormat === "all" && converted.breakdown && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{converted.breakdown.days}</p>
                        <p className="text-xs text-gray-500">Days</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{converted.breakdown.hours}</p>
                        <p className="text-xs text-gray-500">Hours</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{converted.breakdown.minutes}</p>
                        <p className="text-xs text-gray-500">Minutes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{converted.breakdown.seconds}</p>
                        <p className="text-xs text-gray-500">Seconds</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{converted.breakdown.milliseconds}</p>
                        <p className="text-xs text-gray-500">Milliseconds</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{converted.breakdown.totalSeconds?.toFixed(3)}</p>
                        <p className="text-xs text-gray-500">Total Seconds</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-semibold mb-2">Quick Reference:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div>1 minute = 60 seconds</div>
              <div>1 hour = 3,600 seconds</div>
              <div>1 day = 86,400 seconds</div>
              <div>1 second = 1,000 ms</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberToTimeConverter;
