"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function TimestampValidatorFormatter() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    seconds?: number;
    milliseconds?: number;
    date?: string;
    iso?: string;
  } | null>(null);

  const validateAndFormat = (ts: string) => {
    const num = parseInt(ts);
    
    if (isNaN(num)) {
      return { valid: false };
    }

    const isMilliseconds = num > 10000000000;
    const seconds = isMilliseconds ? Math.floor(num / 1000) : num;
    const milliseconds = isMilliseconds ? num : num * 1000;
    const date = new Date(milliseconds);

    if (isNaN(date.getTime())) {
      return { valid: false };
    }

    // Check if timestamp is in reasonable range (1970-2100)
    const minValid = new Date("1970-01-01").getTime();
    const maxValid = new Date("2100-12-31").getTime();
    
    if (milliseconds < minValid || milliseconds > maxValid) {
      return { valid: false };
    }

    return {
      valid: true,
      seconds,
      milliseconds,
      date: date.toLocaleString(),
      iso: date.toISOString(),
    };
  };

  const handleValidate = () => {
    if (!input) return;
    setResult(validateAndFormat(input));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Timestamp Validator & Formatter</h2>
        <p className="text-sm text-muted-foreground">
          Validate and format Unix timestamps
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

          <div className="flex gap-2">
            <Button onClick={handleValidate} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Validate & Format
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleValidate} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Validate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <Card className={`p-4 ${result.valid ? "border-green-500" : "border-destructive"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${result.valid ? "bg-green-500" : "bg-destructive"}`} />
            <div className="font-semibold text-lg">
              {result.valid ? "Valid Timestamp" : "Invalid Timestamp"}
            </div>
          </div>

          {result.valid && result.seconds && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Seconds</Label>
                <div className="flex gap-2">
                  <Input value={result.seconds.toString()} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleCopy(result.seconds!.toString());
                      setCopied("seconds");
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === "seconds" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Milliseconds</Label>
                <div className="flex gap-2">
                  <Input value={result.milliseconds!.toString()} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleCopy(result.milliseconds!.toString());
                      setCopied("milliseconds");
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === "milliseconds" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Local Date</Label>
                <Input value={result.date} readOnly className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label>ISO 8601</Label>
                <div className="flex gap-2">
                  <Input value={result.iso} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleCopy(result.iso!);
                      setCopied("iso");
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === "iso" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
