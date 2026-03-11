"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function TimezoneTimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [fromTz, setFromTz] = useState("UTC");
  const [toTz, setToTz] = useState("America/New_York");
  const [result, setResult] = useState<string | null>(null);

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Moscow",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Shanghai",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Auckland",
  ];

  const handleConvert = () => {
    if (!timestamp) return;

    const ts = parseInt(timestamp);
    const date = new Date(ts > 10000000000 ? ts : ts * 1000);

    if (isNaN(date.getTime())) {
      setResult("Invalid timestamp");
      return;
    }

    // Convert to target timezone
    const options: Intl.DateTimeFormatOptions = {
      timeZone: toTz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(date);
    
    const partMap: Record<string, string> = {};
    parts.forEach((part) => {
      partMap[part.type] = part.value;
    });

    const formatted = `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}:${partMap.second}`;
    const offset = getDateOffset(date, toTz);
    
    setResult(`${formatted} (${toTz}, ${offset})`);
  };

  const getDateOffset = (date: Date, timezone: string) => {
    const str = date.toLocaleString("en-US", { timeZone: timezone, timeZoneName: "shortOffset" });
    const match = str.match(/GMT([+-]\d+)?/);
    return match ? `UTC${match[1] || ""}` : timezone;
  };

  const handleCopy = async () => {
    if (result && !result.startsWith("Invalid")) {
      await navigator.clipboard.writeText(result);
    }
  };

  const handleClear = () => {
    setTimestamp("");
    setResult(null);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Timezone Timestamp Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert a timestamp between different timezones
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timestamp">Unix Timestamp</Label>
            <Input
              id="timestamp"
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1705312200"
              className="font-mono"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fromTz">From Timezone</Label>
              <select
                id="fromTz"
                value={fromTz}
                onChange={(e) => setFromTz(e.target.value)}
                className="w-full p-2 rounded-md border border-input bg-background"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toTz">To Timezone</Label>
              <select
                id="toTz"
                value={toTz}
                onChange={(e) => setToTz(e.target.value)}
                className="w-full p-2 rounded-md border border-input bg-background"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!timestamp} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!timestamp}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Convert
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!timestamp}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <Card className={`p-4 ${result.startsWith("Invalid") ? "border-destructive" : ""}`}>
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-sm text-muted-foreground">Converted Time</Label>
              <div className={`text-2xl font-bold mt-1 font-mono ${result.startsWith("Invalid") ? "text-destructive" : ""}`}>
                {result}
              </div>
            </div>
            {!result.startsWith("Invalid") && (
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
            )}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Current Times</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {timezones.slice(0, 6).map((tz) => (
            <div key={tz} className="p-2 bg-muted rounded">
              <div className="text-xs text-muted-foreground">{tz}</div>
              <div className="font-mono text-sm">
                {new Date().toLocaleString("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
