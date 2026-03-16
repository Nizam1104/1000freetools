"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function GpsTimestampConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"gps" | "unix">("gps");
  const [output, setOutput] = useState("");

  // GPS epoch: January 6, 1980
  const GPS_EPOCH = 315964800000; // milliseconds

  const convertGpsToUnix = (gpsWeeks: number, gpsSeconds: number) => {
    const gpsTimeMs = GPS_EPOCH + (gpsWeeks * 7 * 24 * 60 * 60 * 1000) + (gpsSeconds * 1000);
    // Account for leap seconds (currently 18 seconds difference)
    const unixTimeMs = gpsTimeMs - 18000;
    return Math.floor(unixTimeMs / 1000);
  };

  const convertUnixToGps = (unixSeconds: number) => {
    const unixTimeMs = unixSeconds * 1000;
    // Account for leap seconds
    const gpsTimeMs = unixTimeMs + 18000;
    const gpsWeeks = Math.floor((gpsTimeMs - GPS_EPOCH) / (7 * 24 * 60 * 60 * 1000));
    const gpsSeconds = Math.floor((gpsTimeMs - GPS_EPOCH - gpsWeeks * 7 * 24 * 60 * 60 * 1000) / 1000);
    return { gpsWeeks, gpsSeconds };
  };

  const handleConvert = () => {
    if (!input) return;

    if (mode === "gps") {
      const [weeks, seconds] = input.split(/[,\s]+/).map(Number);
      if (!isNaN(weeks) && !isNaN(seconds)) {
        const unixTs = convertGpsToUnix(weeks, seconds);
        setOutput(`${unixTs} (Unix seconds)\n${new Date(unixTs * 1000).toLocaleString()}`);
      }
    } else {
      const unixTs = parseInt(input);
      if (!isNaN(unixTs)) {
        const { gpsWeeks, gpsSeconds } = convertUnixToGps(unixTs);
        setOutput(`GPS Week: ${gpsWeeks}\nGPS Seconds: ${gpsSeconds}\n${new Date(unixTs * 1000).toLocaleString()}`);
      }
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">GPS Timestamp Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert between GPS time and Unix timestamps
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "gps" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("gps")}
            >
              GPS → Unix
            </Button>
            <Button
              variant={mode === "unix" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("unix")}
            >
              Unix → GPS
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "gps" ? "GPS Time (Weeks, Seconds)" : "Unix Timestamp (seconds)"}
            </Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "gps" ? "2300, 45000" : "1705312200"}
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
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
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Result</Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap">{output}</pre>
            </div>
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
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">About GPS Time</h3>
        <p className="text-sm text-muted-foreground">
          GPS time is measured in weeks and seconds since the GPS epoch (January 6, 1980).
          GPS time does not include leap seconds, so it currently runs 18 seconds ahead of UTC.
        </p>
      </Card>
    </div>
  );
}
