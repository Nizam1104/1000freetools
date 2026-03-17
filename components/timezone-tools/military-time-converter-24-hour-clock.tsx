"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Clock, ArrowRightLeft } from "lucide-react";

interface TimeFormat {
  label: string;
  value: string;
}

const timeFormats: TimeFormat[] = [
  { label: "12-hour (AM/PM)", value: "12" },
  { label: "24-hour (Military)", value: "24" },
  { label: "Decimal Hours", value: "decimal" },
  { label: "Minutes from Midnight", value: "minutes" },
];

export default function MilitaryTimeConverter24HourClock() {
  const [inputTime, setInputTime] = useState("");
  const [inputFormat, setInputFormat] = useState("12");
  const [outputFormat, setOutputFormat] = useState("24");
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const parseTime = useCallback((time: string, format: string): { hours: number; minutes: number } | null => {
    if (!time) return null;

    if (format === "12") {
      const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/i);
      if (!match) return null;
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const period = match[3]?.toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      return { hours, minutes };
    }

    if (format === "24") {
      const match = time.match(/(\d{1,2}):(\d{2})/);
      if (!match) return null;
      return {
        hours: parseInt(match[1]),
        minutes: parseInt(match[2]),
      };
    }

    if (format === "decimal") {
      const hours = parseFloat(time);
      if (isNaN(hours)) return null;
      return {
        hours: Math.floor(hours),
        minutes: Math.round((hours % 1) * 60),
      };
    }

    if (format === "minutes") {
      const totalMinutes = parseInt(time);
      if (isNaN(totalMinutes)) return null;
      return {
        hours: Math.floor(totalMinutes / 60) % 24,
        minutes: totalMinutes % 60,
      };
    }

    return null;
  }, []);

  const formatTime = useCallback((hours: number, minutes: number, format: string): string => {
    if (format === "12") {
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }

    if (format === "24") {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }

    if (format === "decimal") {
      const decimal = hours + minutes / 60;
      return decimal.toFixed(2);
    }

    if (format === "minutes") {
      return (hours * 60 + minutes).toString();
    }

    return "";
  }, []);

  const convert = useCallback(() => {
    const parsed = parseTime(inputTime, inputFormat);
    if (!parsed) {
      setResults({});
      return;
    }

    const converted: Record<string, string> = {};
    timeFormats.forEach((format) => {
      converted[format.value] = formatTime(parsed.hours, parsed.minutes, format.value);
    });

    setResults(converted);
  }, [inputTime, inputFormat, parseTime, formatTime]);

  const copyToClipboard = useCallback(async () => {
    if (Object.keys(results).length === 0) return;
    try {
      const text = Object.entries(results)
        .map(([format, value]) => {
          const label = timeFormats.find((f) => f.value === format)?.label || format;
          return `${label}: ${value}`;
        })
        .join("\n");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [results]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Military Time Converter (24-Hour Clock)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="inputTime">Time</Label>
              <Input
                id="inputTime"
                type="text"
                placeholder={inputFormat === "12" ? "2:30 PM" : inputFormat === "24" ? "14:30" : inputFormat === "decimal" ? "14.5" : "870"}
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="inputFormat">Input Format</Label>
              <select
                id="inputFormat"
                value={inputFormat}
                onChange={(e) => setInputFormat(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {timeFormats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={convert} className="w-full">
                Convert
              </Button>
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timeFormats.map((format) => (
                  <div
                    key={format.value}
                    className={`p-4 rounded-lg border ${
                      format.value === outputFormat ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <Label className={format.value === outputFormat ? "text-primary-foreground" : ""}>
                      {format.label}
                    </Label>
                    <p className="text-2xl font-bold mt-2">{results[format.value]}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h3 className="font-semibold mb-2">Quick Reference</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="font-mono">0000</span> = Midnight
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="font-mono">0600</span> = 6:00 AM
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="font-mono">1200</span> = Noon
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="font-mono">1800</span> = 6:00 PM
                  </div>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy All Conversions
              </Button>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">About Military Time</h3>
            <p className="text-sm text-muted-foreground">
              Military time (24-hour clock) is used by the military, aviation, maritime,
              and emergency services. It eliminates ambiguity between AM and PM by using
              hours 00-23. Midnight is 0000, and times are written without colons
              (e.g., 1430 instead of 14:30).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
