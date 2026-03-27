"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function BatchTimestampConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to" | "from">("to");
  const [results, setResults] = useState<string[]>([]);

  const convertTimestamps = () => {
    const lines = input.split("\n").filter((l) => l.trim());
    const converted: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (mode === "to") {
        // Timestamp to date
        const ts = parseInt(trimmed);
        if (!isNaN(ts)) {
          const date = ts > 10000000000 
            ? new Date(ts).toLocaleString()
            : new Date(ts * 1000).toLocaleString();
          converted.push(date);
        } else {
          converted.push("Invalid");
        }
      } else {
        // Date to timestamp
        const date = new Date(trimmed);
        if (!isNaN(date.getTime())) {
          converted.push(Math.floor(date.getTime() / 1000).toString());
        } else {
          converted.push("Invalid");
        }
      }
    }

    setResults(converted);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(results.join("\n"));
  };

  const handleClear = () => {
    setInput("");
    setResults([]);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "to" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("to")}
            >
              Timestamp → Date
            </Button>
            <Button
              variant={mode === "from" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("from")}
            >
              Date → Timestamp
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "to" ? "Timestamps (one per line)" : "Dates (one per line)"}
            </Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "to" ? "1705312200\n1705398600\n1705485000" : "2024-01-15 10:30:00\n2024-01-16 10:30:00"}
              className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={convertTimestamps} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert All
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {results.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Results ({results.length})</h3>
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
                    Copy All
                  </>
                )}
              </Button>
            </div>
            <div className="space-y-1 font-mono text-sm max-h-[400px] overflow-auto">
              {results.map((result, i) => (
                <div key={i} className="flex justify-between py-1 border-b last:border-0">
                  <span className="text-muted-foreground">{i + 1}.</span>
                  <span>{result}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Input Preview</h3>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-auto max-h-[400px]">
              {input}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}
