"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { History, Copy, Check, Calendar, Globe } from "lucide-react";

const majorTimezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
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

// Historical timezone offset data (simplified - major changes)
const historicalOffsets: Record<string, { year: number; offset: number }[]> = {
  "America/New_York": [
    { year: 1883, offset: -4.93 }, // Before standardization
    { year: 1918, offset: -5 }, // EST established
    { year: 1966, offset: -5 }, // UST Act
  ],
  "Europe/London": [
    { year: 1847, offset: 0 }, // GMT adopted
    { year: 1916, offset: 0 }, // BST introduced
    { year: 1968, offset: 1 }, // Experimental BST
    { year: 1971, offset: 0 }, // Reverted
  ],
  "Europe/Moscow": [
    { year: 1919, offset: 3 }, // Moscow Time established
    { year: 1981, offset: 3 }, // DST introduced
    { year: 2011, offset: 4 }, // Permanent DST
    { year: 2014, offset: 3 }, // Permanent standard time
  ],
  "Asia/Shanghai": [
    { year: 1912, offset: 8 }, // Standard time adopted
    { year: 1986, offset: 8 }, // DST period
    { year: 1992, offset: 8 }, // DST abolished
  ],
};

export default function HistoricalTimeZoneConverter() {
  const [date, setDate] = useState("");
  const [fromTimezone, setFromTimezone] = useState("America/New_York");
  const [toTimezone, setToTimezone] = useState("Europe/London");
  const [time, setTime] = useState("12:00");
  const [result, setResult] = useState<string | null>(null);
  const [historicalInfo, setHistoricalInfo] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const getHistoricalOffset = useCallback((timezone: string, year: number): number => {
    const history = historicalOffsets[timezone];
    if (!history) return 0;

    let offset = 0;
    for (const entry of history) {
      if (year >= entry.year) {
        offset = entry.offset;
      }
    }
    return offset;
  }, []);

  const convertHistorical = useCallback(() => {
    if (!date || !time) return;

    const inputDate = new Date(`${date}T${time}:00`);
    const year = inputDate.getFullYear();

    const fromOffset = getHistoricalOffset(fromTimezone, year);
    const toOffset = getHistoricalOffset(toTimezone, year);

    const offsetDiff = toOffset - fromOffset;
    const resultDate = new Date(inputDate.getTime() + offsetDiff * 60 * 60 * 1000);

    const formattedResult = resultDate.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    setResult(formattedResult);

    // Generate historical info
    const fromHistory = historicalOffsets[fromTimezone];
    const toHistory = historicalOffsets[toTimezone];

    let info = `Historical Context for ${year}:\n\n`;
    info += `${fromTimezone}: `;
    if (fromHistory) {
      const relevant = fromHistory.filter((h) => h.year <= year);
      if (relevant.length > 0) {
        info += `Offset UTC${relevant[relevant.length - 1].offset >= 0 ? "+" : ""}${relevant[relevant.length - 1].offset}`;
      } else {
        info += "Standard offset applied";
      }
    } else {
      info += "Using modern timezone rules (historical data not available)";
    }

    info += `\n\n${toTimezone}: `;
    if (toHistory) {
      const relevant = toHistory.filter((h) => h.year <= year);
      if (relevant.length > 0) {
        info += `Offset UTC${relevant[relevant.length - 1].offset >= 0 ? "+" : ""}${relevant[relevant.length - 1].offset}`;
      } else {
        info += "Standard offset applied";
      }
    } else {
      info += "Using modern timezone rules (historical data not available)";
    }

    setHistoricalInfo(info);
  }, [date, time, fromTimezone, toTimezone, getHistoricalOffset]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(`${result}\n\n${historicalInfo}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, historicalInfo]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Historical Time Zone Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromTimezone">From Timezone</Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  id="fromTimezone"
                  value={fromTimezone}
                  onChange={(e) => setFromTimezone(e.target.value)}
                  className="w-full pl-10 p-2 border rounded-md bg-background"
                >
                  {majorTimezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="toTimezone">To Timezone</Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  id="toTimezone"
                  value={toTimezone}
                  onChange={(e) => setToTimezone(e.target.value)}
                  className="w-full pl-10 p-2 border rounded-md bg-background"
                >
                  {majorTimezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Button onClick={convertHistorical} className="w-full">
            Convert Historical Time
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <Label>Converted Time</Label>
                <p className="text-lg font-semibold mt-2">{result}</p>
              </div>

              <div className="relative">
                <Label>Historical Context</Label>
                <Textarea
                  value={historicalInfo}
                  readOnly
                  className="mt-1 font-mono text-sm h-32"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-8 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">Note:</p>
            <p className="text-muted-foreground">
              This tool uses simplified historical timezone data. Actual historical
              timezone rules were often more complex with frequent changes. For
              precise historical timezone calculations, consult official timezone
              databases like the IANA Time Zone Database.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
