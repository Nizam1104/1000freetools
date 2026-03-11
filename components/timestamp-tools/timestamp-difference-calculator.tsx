"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function TimestampDifferenceCalculator() {
  const [timestamp1, setTimestamp1] = useState("");
  const [timestamp2, setTimestamp2] = useState("");
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calculateDifference = () => {
    const ts1 = parseInt(timestamp1);
    const ts2 = parseInt(timestamp2);

    if (isNaN(ts1) || isNaN(ts2)) {
      setResult(null);
      return;
    }

    // Auto-detect milliseconds vs seconds
    const t1 = ts1 > 10000000000 ? ts1 : ts1 * 1000;
    const t2 = ts2 > 10000000000 ? ts2 : ts2 * 1000;

    const diff = Math.abs(t2 - t1);

    setResult({
      milliseconds: diff,
      seconds: Math.floor(diff / 1000),
      minutes: Math.floor(diff / 60000),
      hours: Math.floor(diff / 3600000),
      days: Math.floor(diff / 86400000),
      weeks: Math.floor(diff / 604800000),
      months: Math.floor(diff / 2592000000),
      years: Math.floor(diff / 31536000000),
    });
  };

  const handleClear = () => {
    setTimestamp1("");
    setTimestamp2("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Timestamp Difference Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate the time difference between two timestamps
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ts1">Timestamp 1</Label>
              <Input
                id="ts1"
                type="number"
                value={timestamp1}
                onChange={(e) => setTimestamp1(e.target.value)}
                placeholder="1705312200"
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ts2">Timestamp 2</Label>
              <Input
                id="ts2"
                type="number"
                value={timestamp2}
                onChange={(e) => setTimestamp2(e.target.value)}
                placeholder="1705398600"
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateDifference} disabled={!timestamp1 || !timestamp2} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Calculate Difference
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!timestamp1 && !timestamp2}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={calculateDifference} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Calculate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!timestamp1 && !timestamp2}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Time Difference</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.years.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Years</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.months.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Months</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.weeks.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Weeks</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.days.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.hours.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.minutes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.seconds.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Seconds</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">{result.milliseconds.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Milliseconds</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
