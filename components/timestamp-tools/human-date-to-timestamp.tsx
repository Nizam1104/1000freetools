"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HumanDateToTimestamp() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ seconds: number; milliseconds: number } | null>(null);
  const [error, setError] = useState("");

  const parseDate = (dateString: string) => {
    // Try various date formats
    const formats = [
      // ISO format
      () => new Date(dateString),
      // Unix timestamp
      () => {
        const ts = parseInt(dateString);
        if (!isNaN(ts)) {
          return ts > 10000000000 ? new Date(ts) : new Date(ts * 1000);
        }
        return new Date(NaN);
      },
      // Natural language
      () => new Date(dateString),
    ];

    for (const format of formats) {
      const date = format();
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return null;
  };

  const handleConvert = () => {
    if (!input) {
      setError("Please enter a date");
      return;
    }

    const date = parseDate(input);
    
    if (!date || isNaN(date.getTime())) {
      setError("Invalid date format. Try formats like: 2024-01-15, Jan 15 2024, 2024-01-15T10:30:00");
      setOutput(null);
      return;
    }

    setError("");
    setOutput({
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    });
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setOutput(null);
    setError("");
  };

  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Human Date to Timestamp</h2>
        <p className="text-sm text-muted-foreground">
          Convert human-readable dates to Unix timestamps
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date Input</Label>
            <Input
              id="date"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="2024-01-15 10:30:00 or 'next Friday' or '2024-01-15T10:30:00Z'"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Supports: ISO format, natural language, Unix timestamps
            </p>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
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
        <div className="space-y-4">
          <Card className="p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Timestamp (seconds)</Label>
                <div className="flex gap-2">
                  <Input value={output.seconds.toString()} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleCopy(output.seconds.toString());
                      setCopied("seconds");
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === "seconds" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Timestamp (milliseconds)</Label>
                <div className="flex gap-2">
                  <Input value={output.milliseconds.toString()} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleCopy(output.milliseconds.toString());
                      setCopied("milliseconds");
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === "milliseconds" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Parsed Date</h3>
            <p className="font-mono">
              {new Date(output.milliseconds).toLocaleString()}
            </p>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Supported Formats</h3>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">2024-01-15</div>
            <div className="text-muted-foreground">ISO Date</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">2024-01-15T10:30:00Z</div>
            <div className="text-muted-foreground">ISO DateTime</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">Jan 15, 2024</div>
            <div className="text-muted-foreground">Natural</div>
          </div>
          <div className="bg-muted p-2 rounded">
            <div className="font-mono">next Friday</div>
            <div className="text-muted-foreground">Relative</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
