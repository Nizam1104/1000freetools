"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function Rfc2822TimestampConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to" | "from">("to");
  const [output, setOutput] = useState("");

  const parseRfc2822 = (dateString: string) => {
    // RFC 2822 format: "Mon, 15 Jan 2024 10:30:00 +0000"
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }
    return null;
  };

  const toRfc2822 = (date: Date) => {
    // RFC 2822 format
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    
    return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} +0000`;
  };

  const handleConvert = () => {
    if (!input) return;

    if (mode === "to") {
      // RFC 2822 to Unix timestamp
      const date = parseRfc2822(input);
      if (date) {
        const seconds = Math.floor(date.getTime() / 1000);
        setOutput(`${seconds}\nMilliseconds: ${date.getTime()}`);
      } else {
        setOutput("Invalid RFC 2822 format");
      }
    } else {
      // Unix timestamp to RFC 2822
      const ts = parseInt(input);
      if (!isNaN(ts)) {
        const date = new Date(ts > 10000000000 ? ts : ts * 1000);
        setOutput(toRfc2822(date));
      } else {
        setOutput("Invalid timestamp");
      }
    }
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Invalid")) {
      await navigator.clipboard.writeText(output.split("\n")[0]);
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
        <h2 className="text-2xl font-bold">RFC 2822 / 3339 Timestamp Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert timestamps to and from RFC 2822 and RFC 3339 date-time string formats
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "to" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("to")}
            >
              RFC → Unix
            </Button>
            <Button
              variant={mode === "from" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("from")}
            >
              Unix → RFC
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "to" ? "RFC 2822 Date" : "Unix Timestamp"}
            </Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "to" ? "Mon, 15 Jan 2024 10:30:00 +0000" : "1705312200"}
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
        <Card className={`p-4 ${output.startsWith("Invalid") ? "border-destructive" : ""}`}>
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Result</Label>
              <pre className={`font-mono mt-2 whitespace-pre-wrap ${output.startsWith("Invalid") ? "text-destructive" : ""}`}>
                {output}
              </pre>
            </div>
            {!output.startsWith("Invalid") && (
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
        <h3 className="font-semibold mb-2">Format Examples</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">RFC 2822 (Email)</div>
            <div>Mon, 15 Jan 2024 10:30:00 +0000</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-muted-foreground mb-1">RFC 3339 (Internet)</div>
            <div>2024-01-15T10:30:00Z</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
