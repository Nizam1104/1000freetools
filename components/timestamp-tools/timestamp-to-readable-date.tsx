"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function TimestampToReadableDate() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<"full" | "date" | "time" | "iso" | "relative">("full");
  const [timezone, setTimezone] = useState<"local" | "utc">("local");

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    full: { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
    date: { year: "numeric", month: "long", day: "numeric" },
    time: { hour: "2-digit", minute: "2-digit", second: "2-digit" },
    iso: {},
    relative: {},
  };

  const handleConvert = () => {
    if (!input) return;

    const timestamp = parseInt(input);
    const isMilliseconds = timestamp > 10000000000;
    const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);

    if (isNaN(date.getTime())) {
      setOutput("Invalid timestamp");
      return;
    }

    let result: string;

    if (format === "iso") {
      result = timezone === "utc" ? date.toISOString() : date.toISOString();
    } else if (format === "relative") {
      result = new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -Math.floor((Date.now() - date.getTime()) / 1000),
        "second"
      );
      // Simplified relative time
      const diff = Date.now() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) result = `${days} day${days > 1 ? "s" : ""} ago`;
      else if (hours > 0) result = `${hours} hour${hours > 1 ? "s" : ""} ago`;
      else if (minutes > 0) result = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      else result = "just now";
    } else {
      result = date.toLocaleString("en-US", {
        ...formatOptions[format],
        timeZone: timezone === "utc" ? "UTC" : undefined,
      });
    }

    setOutput(result);
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
        <h2 className="text-2xl font-bold">Timestamp to Readable Date</h2>
        <p className="text-sm text-muted-foreground">
          Convert Unix timestamps to human-readable dates
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timestamp">Timestamp</Label>
            <Input
              id="timestamp"
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="1705312200 or 1705312200000"
              className="font-mono"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Format</Label>
              <div className="flex flex-wrap gap-2">
                {(["full", "date", "time", "iso", "relative"] as const).map((f) => (
                  <Button
                    key={f}
                    variant={format === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormat(f)}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <div className="flex gap-2">
                <Button
                  variant={timezone === "local" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimezone("local")}
                >
                  Local
                </Button>
                <Button
                  variant={timezone === "utc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimezone("utc")}
                >
                  UTC
                </Button>
              </div>
            </div>
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
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-sm text-muted-foreground">Formatted Date</Label>
              <div className="text-2xl font-bold mt-1">{output}</div>
            </div>
            {!output.startsWith("Invalid") && (
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
    </div>
  );
}
