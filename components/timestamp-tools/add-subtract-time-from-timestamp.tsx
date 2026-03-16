"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function AddSubtractTimeFromTimestamp() {
  const [timestamp, setTimestamp] = useState("");
  const [amount, setAmount] = useState("1");
  const [unit, setUnit] = useState<"seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years">("days");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState<{ timestamp: number; date: string } | null>(null);

  const handleCalculate = () => {
    const ts = parseInt(timestamp);
    const amt = parseInt(amount);

    if (isNaN(ts) || isNaN(amt)) {
      setResult(null);
      return;
    }

    // Auto-detect milliseconds vs seconds
    const baseTs = ts > 10000000000 ? ts : ts * 1000;
    let multiplier = 1;

    switch (unit) {
      case "seconds": multiplier = 1000; break;
      case "minutes": multiplier = 60000; break;
      case "hours": multiplier = 3600000; break;
      case "days": multiplier = 86400000; break;
      case "weeks": multiplier = 604800000; break;
      case "months": multiplier = 2592000000; break;
      case "years": multiplier = 31536000000; break;
    }

    const adjustment = amt * multiplier;
    const newTs = operation === "add" ? baseTs + adjustment : baseTs - adjustment;

    setResult({
      timestamp: Math.floor(newTs / 1000),
      date: new Date(newTs).toLocaleString(),
    });
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.timestamp.toString());
    }
  };

  const handleClear = () => {
    setTimestamp("");
    setAmount("1");
    setResult(null);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Add/Subtract Time from Timestamp</h2>
        <p className="text-sm text-muted-foreground">
          Add or subtract time from a given Unix timestamp
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timestamp">Timestamp</Label>
            <Input
              id="timestamp"
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1705312200"
              className="font-mono"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as typeof unit)}
                className="w-full p-2 rounded-md border border-input bg-background"
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Operation</Label>
              <div className="flex gap-2">
                <Button
                  variant={operation === "add" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setOperation("add")}
                >
                  Add
                </Button>
                <Button
                  variant={operation === "subtract" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setOperation("subtract")}
                >
                  Subtract
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} disabled={!timestamp || !amount} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Calculate
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!timestamp}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleCalculate} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Calculate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!timestamp}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-sm text-muted-foreground">New Timestamp</Label>
              <div className="text-2xl font-bold font-mono mt-1">{result.timestamp}</div>
              <div className="text-muted-foreground mt-1">{result.date}</div>
            </div>
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
          </div>
        </Card>
      )}
    </div>
  );
}
