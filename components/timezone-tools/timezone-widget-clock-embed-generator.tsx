"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Copy, Check, RefreshCw, Code } from "lucide-react";

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
  "Asia/Seoul",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const clockStyles = [
  { value: "digital", label: "Digital" },
  { value: "analog", label: "Analog" },
  { value: "minimal", label: "Minimal" },
  { value: "colorful", label: "Colorful" },
];

export default function TimezoneWidgetClockEmbedGenerator() {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [clockStyle, setClockStyle] = useState("digital");
  const [showSeconds, setShowSeconds] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showTimezone, setShowTimezone] = useState(true);
  const [width, setWidth] = useState("300");
  const [height, setHeight] = useState("200");
  const [bgColor, setBgColor] = useState("#1a1a2e");
  const [textColor, setTextColor] = useState("#ffffff");
  const [embedCode, setEmbedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateEmbedCode = useCallback(() => {
    const config = {
      timezone: selectedTimezone,
      style: clockStyle,
      showSeconds,
      showDate,
      showTimezone,
      width: parseInt(width),
      height: parseInt(height),
      bgColor,
      textColor,
    };

    const code = `<!-- Timezone Clock Widget -->
<iframe 
  src="https://yourdomain.com/widgets/clock?config=${encodeURIComponent(JSON.stringify(config))}"
  width="${width}"
  height="${height}"
  frameborder="0"
  scrolling="no"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>

<!-- Or use the JavaScript SDK -->
<script src="https://yourdomain.com/widgets/clock-sdk.js"></script>
<div id="timezone-clock" 
  data-timezone="${selectedTimezone}"
  data-style="${clockStyle}"
  data-show-seconds="${showSeconds}"
  data-show-date="${showDate}"
  data-show-timezone="${showTimezone}"
  data-width="${width}"
  data-height="${height}"
  data-bg-color="${bgColor}"
  data-text-color="${textColor}"
></div>
<script>
  TimezoneClock.init({ elementId: 'timezone-clock' });
</script>`;

    setEmbedCode(code);
  }, [selectedTimezone, clockStyle, showSeconds, showDate, showTimezone, width, height, bgColor, textColor]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [embedCode]);

  const formatTime = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: showSeconds ? "2-digit" : undefined,
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Widget Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="style">Clock Style</Label>
                <select
                  id="style"
                  value={clockStyle}
                  onChange={(e) => setClockStyle(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-background"
                >
                  {clockStyles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bgColor">Background Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Display Options</Label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showSeconds}
                    onChange={(e) => setShowSeconds(e.target.checked)}
                  />
                  Show Seconds
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showDate}
                    onChange={(e) => setShowDate(e.target.checked)}
                  />
                  Show Date
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showTimezone}
                    onChange={(e) => setShowTimezone(e.target.checked)}
                  />
                  Show Timezone
                </label>
              </div>
            </div>

            <Button onClick={generateEmbedCode} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Embed Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Preview & Embed Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="flex items-center justify-center rounded-lg border p-6"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                minHeight: "150px",
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold font-mono">
                  {formatTime(currentTime, selectedTimezone)}
                </div>
                {showDate && (
                  <div className="text-sm mt-2 opacity-80">
                    {formatDate(currentTime, selectedTimezone)}
                  </div>
                )}
                {showTimezone && (
                  <div className="text-xs mt-1 opacity-60">{selectedTimezone}</div>
                )}
              </div>
            </div>

            <div className="relative">
              <Label>Embed Code</Label>
              <Textarea
                value={embedCode}
                readOnly
                className="mt-1 font-mono text-xs h-48"
                placeholder="Click 'Generate Embed Code' to create your embed code"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-8 right-2"
                onClick={copyToClipboard}
                disabled={!embedCode}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
