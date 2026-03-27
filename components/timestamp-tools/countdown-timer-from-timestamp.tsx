"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, Play, Pause } from "lucide-react";

export default function CountdownTimerFromTimestamp() {
  const [targetTimestamp, setTargetTimestamp] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && targetTimestamp) {
      interval = setInterval(() => {
        const target = parseInt(targetTimestamp);
        const targetMs = target > 10000000000 ? target : target * 1000;
        const now = Date.now();
        const diff = targetMs - now;

        if (diff <= 0) {
          setIsPast(true);
          setIsRunning(false);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
        } else {
          setIsPast(false);
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
            total: diff,
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, targetTimestamp]);

  const handleStart = () => {
    if (targetTimestamp) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(null);
    setIsPast(false);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (timeLeft) {
      const text = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timestamp">Target Timestamp</Label>
            <Input
              id="timestamp"
              type="number"
              value={targetTimestamp}
              onChange={(e) => setTargetTimestamp(e.target.value)}
              placeholder="1735689600"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Enter a future Unix timestamp (seconds or milliseconds)
            </p>
          </div>

          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={handleStart} disabled={!targetTimestamp} className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Start Countdown
              </Button>
            ) : (
              <Button onClick={handlePause} variant="outline" className="flex-1">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            <Button variant="outline" onClick={handleReset} disabled={!targetTimestamp && !timeLeft}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {timeLeft && (
        <Card className={`p-8 ${isPast ? "border-green-500 bg-green-50 dark:bg-green-950" : ""}`}>
          {isPast ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">🎉 Time's Up!</div>
              <p className="text-muted-foreground">The countdown has completed</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-4xl font-bold font-mono">{timeLeft.days}</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-4xl font-bold font-mono">{timeLeft.hours.toString().padStart(2, "0")}</div>
                  <div className="text-sm text-muted-foreground">Hours</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-4xl font-bold font-mono">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-4xl font-bold font-mono">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                  <div className="text-sm text-muted-foreground">Seconds</div>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCopy();
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
                      Copy Time
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Target Date</h3>
        {targetTimestamp && (
          <p className="font-mono">
            {new Date(parseInt(targetTimestamp) > 10000000000 
              ? parseInt(targetTimestamp) 
              : parseInt(targetTimestamp) * 1000
            ).toLocaleString()}
          </p>
        )}
      </Card>
    </div>
  );
}
