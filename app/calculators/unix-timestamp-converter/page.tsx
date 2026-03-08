"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Calendar, Clock } from "lucide-react";

interface UnixResult {
  timestamp: number;
  date: string;
  time: string;
  dateTime: string;
  dayOfWeek: string;
  weekNumber: number;
  isPast: boolean;
}

export default function UnixTimestampConverterPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputType, setInputType] = useState<"unix" | "date">("unix");
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [result, setResult] = useState<UnixResult | null>(null);

  const convertTimestamp = () => {
    if (!inputValue) {
      setResult(null);
      return;
    }

    let date: Date;

    if (inputType === "unix") {
      const ts = parseFloat(inputValue);
      if (isNaN(ts)) {
        setResult(null);
        return;
      }
      const multiplier = unit === "seconds" ? 1000 : 1;
      date = new Date(ts * multiplier);
    } else {
      date = new Date(inputValue);
      if (isNaN(date.getTime())) {
        setResult(null);
        return;
      }
    }

    const timestamp = unit === "seconds" ? Math.floor(date.getTime() / 1000) : date.getTime();
    const now = new Date();
    const isPast = date < now;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];

    const getWeekNumber = (d: Date) => {
      const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = date.getUTCDay() || 7;
      date.setUTCDate(date.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };

    setResult({
      timestamp,
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      dateTime: date.toISOString().replace('T', ' ').substring(0, 19),
      dayOfWeek,
      weekNumber: getWeekNumber(date),
      isPast,
    });
  };

  const reset = () => {
    setInputValue("");
    setResult(null);
  };

  const setCurrentTime = () => {
    const now = new Date();
    const ts = Math.floor(now.getTime() / 1000);
    setInputValue(ts.toString());
    setInputType("unix");
    setUnit("seconds");
  };

  useEffect(() => {
    convertTimestamp();
  }, [inputValue, inputType, unit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Unix Timestamp Converter – Convert Between Unix Time and Date</h1>
          <p className="text-muted-foreground">
            Convert Unix timestamps to human-readable dates and vice versa. This free timestamp converter supports seconds and milliseconds, shows timezone info, and helps debug time-related programming issues.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Convert</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inputType">Input Type</Label>
                    <select
                      id="inputType"
                      value={inputType}
                      onChange={(e) => setInputType(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="unix">Unix Timestamp</option>
                      <option value="date">Date/Time</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inputValue">
                      {inputType === "unix" ? "Unix Timestamp" : "Date/Time"}
                    </Label>
                    <Input
                      id="inputValue"
                      type={inputType === "unix" ? "number" : "datetime-local"}
                      placeholder={inputType === "unix" ? "e.g., 1709251200" : ""}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>

                  {inputType === "unix" && (
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <select
                        id="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as any)}
                        className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                      >
                        <option value="seconds">Seconds (10 digits)</option>
                        <option value="milliseconds">Milliseconds (13 digits)</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={setCurrentTime} variant="outline" className="flex-1">
                  Use Current Time
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Unix time counts seconds since January 1, 1970 (UTC), excluding leap seconds. Also known as Epoch time.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Converted Result</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Unix Timestamp</p>
                    <p className="text-2xl font-bold text-primary font-mono">{result.timestamp}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {unit === "seconds" ? "seconds" : "milliseconds"} since Epoch
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-semibold">{result.date}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Time (UTC)</p>
                      <p className="font-semibold">{result.time}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Day of Week</p>
                      <p className="font-semibold">{result.dayOfWeek}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">ISO Format</p>
                      <p className="font-semibold font-mono text-sm">{result.dateTime}</p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg text-center text-sm ${result.isPast ? 'bg-muted' : 'bg-primary/10 text-primary'}`}>
                    {result.isPast ? "This date is in the past" : "This date is in the future"}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter a timestamp or date to convert</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Common Unix Timestamps</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Reference Points:
                </h4>
                <ul className="space-y-1 font-mono text-xs">
                  <li>0 = January 1, 1970 00:00:00 UTC</li>
                  <li>946684800 = January 1, 2000 00:00:00 UTC</li>
                  <li>1000000000 = September 9, 2001 01:46:40 UTC</li>
                  <li>1234567890 = February 13, 2009 23:31:30 UTC</li>
                  <li>2000000000 = May 18, 2033 03:33:20 UTC</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Programming Notes:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>JavaScript uses milliseconds</li>
                  <li>Python time.time() returns seconds</li>
                  <li>PHP time() returns seconds</li>
                  <li>Year 2038 problem: 32-bit systems overflow</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is Unix timestamp?</h3>
                <p className="text-sm text-muted-foreground">Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970 at 00:00:00 UTC. It's a standard way to represent points in time in computing.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why does Unix time start at 1970?</h3>
                <p className="text-sm text-muted-foreground">January 1, 1970 was chosen as the Unix Epoch because it was a convenient recent date when Unix was developed. It's the beginning of "computer time."</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the Year 2038 problem?</h3>
                <p className="text-sm text-muted-foreground">32-bit systems store Unix time as a signed 32-bit integer, which overflows on January 19, 2038. Systems must migrate to 64-bit time before then.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does Unix time include leap seconds?</h3>
                <p className="text-sm text-muted-foreground">No, Unix time ignores leap seconds. Each day is exactly 86400 seconds in Unix time, even when leap seconds are added to UTC.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I get current Unix time?</h3>
                <p className="text-sm text-muted-foreground">Click "Use Current Time" above, or use: JavaScript: Date.now()/1000, Python: time.time(), PHP: time(), Linux: date +%s</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
