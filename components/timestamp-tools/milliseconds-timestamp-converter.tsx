"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function MillisecondsTimestampConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to" | "from">("to");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!input) return;

    if (mode === "to") {
      // Milliseconds to seconds and date
      const ms = parseInt(input);
      if (!isNaN(ms)) {
        const seconds = Math.floor(ms / 1000);
        const date = new Date(ms);
        setOutput(`Seconds: ${seconds}\nDate: ${date.toLocaleString()}\nISO: ${date.toISOString()}`);
      } else {
        setOutput("Invalid milliseconds");
      }
    } else {
      // Seconds to milliseconds
      const seconds = parseInt(input);
      if (!isNaN(seconds)) {
        const ms = seconds * 1000;
        const date = new Date(ms);
        setOutput(`Milliseconds: ${ms}\nDate: ${date.toLocaleString()}`);
      } else {
        setOutput("Invalid seconds");
      }
    }
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Invalid")) {
      await navigator.clipboard.writeText(output.split("\n")[0].split(": ")[1]);
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
        <h2 className="text-2xl font-bold">Milliseconds Timestamp Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert between milliseconds and seconds timestamps
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
              Milliseconds → Seconds
            </Button>
            <Button
              variant={mode === "from" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("from")}
            >
              Seconds → Milliseconds
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {mode === "to" ? "Milliseconds" : "Seconds"}
            </Label>
            <Input
              id="input"
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "to" ? "1705312200000" : "1705312200"}
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
        <h3 className="font-semibold mb-2">When to Use Each</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Seconds</div>
            <div className="text-muted-foreground">Unix timestamps, APIs, databases</div>
            <div className="font-mono text-xs mt-1">1705312200</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Milliseconds</div>
            <div className="text-muted-foreground">JavaScript Date, high-precision timing</div>
            <div className="font-mono text-xs mt-1">1705312200000</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
