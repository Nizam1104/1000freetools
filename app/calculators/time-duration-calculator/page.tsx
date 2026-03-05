"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Clock, Calendar } from "lucide-react";

interface DurationResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number;
  totalSeconds: number;
  days: number;
  formatted: string;
}

export default function TimeDurationCalculatorPage() {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [result, setResult] = useState<DurationResult | null>(null);

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      setResult(null);
      return;
    }

    const start = new Date(`${startDate || '2000-01-01'}T${startTime}`);
    const end = new Date(`${endDate || '2000-01-01'}T${endTime}`);

    let diff = end.getTime() - start.getTime();

    if (endDate && startDate) {
      diff = end.getTime() - start.getTime();
    } else if (end < start) {
      end.setDate(end.getDate() + 1);
      diff = end.getTime() - start.getTime();
    }

    if (diff < 0) {
      setResult(null);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const days = Math.floor(hours / 24);

    let formatted = "";
    if (days > 0) {
      formatted = `${days}d ${hours % 24}h ${minutes}m`;
    } else if (hours > 0) {
      formatted = `${hours}h ${minutes}m ${seconds}s`;
    } else {
      formatted = `${minutes}m ${seconds}s`;
    }

    setResult({
      hours,
      minutes,
      seconds,
      totalMinutes,
      totalSeconds,
      days,
      formatted,
    });
  };

  const reset = () => {
    setStartTime("");
    setEndTime("");
    setStartDate("");
    setEndDate("");
    setResult(null);
  };

  useEffect(() => {
    calculateDuration();
  }, [startTime, endTime, startDate, endDate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Time Duration Calculator – Calculate Time Between Two Times</h1>
          <p className="text-muted-foreground">
            Find the duration between any two times or dates. This free time calculator shows hours, minutes, and seconds between start and end times for scheduling, payroll, or project tracking.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Time Range</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date (optional)</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (optional)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  If end time is before start time, calculator assumes it's the next day. Add dates for multi-day calculations.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDuration} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Duration</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Duration</p>
                    <p className="text-2xl font-bold text-primary">{result.formatted}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Hours</p>
                      <p className="text-lg font-semibold">{result.hours}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Minutes</p>
                      <p className="text-lg font-semibold">{result.totalMinutes}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Total Seconds</p>
                      <p className="text-lg font-semibold">{result.totalSeconds.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Days</p>
                      <p className="text-lg font-semibold">{result.days}</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p>Exact: {result.hours}h {result.minutes}m {result.seconds}s</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter start and end times to calculate duration</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Time Duration</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Start Time</h3>
                <p className="text-sm text-muted-foreground">Set when the activity or event begins.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Enter End Time</h3>
                <p className="text-sm text-muted-foreground">Set when the activity or event ends.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Duration</h3>
                <p className="text-sm text-muted-foreground">Calculator shows exact time between start and end.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Time Only or Full Dates
                </h3>
                <p className="text-sm text-muted-foreground">Calculate within one day or across multiple days with dates.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Overnight Support
                </h3>
                <p className="text-sm text-muted-foreground">Automatically handles times that cross midnight.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Formats
                </h3>
                <p className="text-sm text-muted-foreground">Shows duration in hours, total minutes, and total seconds.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Instant Results
                </h3>
                <p className="text-sm text-muted-foreground">Updates automatically as you change times.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate time duration?</h3>
                <p className="text-sm text-muted-foreground">Subtract start time from end time. For example, 5:00 PM - 9:00 AM = 8 hours. This calculator handles the math automatically.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I calculate overnight duration?</h3>
                <p className="text-sm text-muted-foreground">Yes, if end time is before start time (like 10 PM to 6 AM), the calculator assumes next day and shows 8 hours.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate hours worked?</h3>
                <p className="text-sm text-muted-foreground">Enter clock-in time as start and clock-out as end. Subtract any unpaid break time from the result for actual hours worked.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I calculate multi-day events?</h3>
                <p className="text-sm text-muted-foreground">Yes, use the date fields for both start and end. The calculator shows total days, hours, and minutes between dates.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What format should I use?</h3>
                <p className="text-sm text-muted-foreground">Use 24-hour or 12-hour time format. The calculator accepts standard time inputs. Dates use YYYY-MM-DD format.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/countdown-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Countdown Calculator</h3>
                <p className="text-sm text-muted-foreground">Count down days until an event.</p>
              </a>
              <a href="/calculators/date-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Date Calculator</h3>
                <p className="text-sm text-muted-foreground">Add or subtract days from a date.</p>
              </a>
              <a href="/calculators/work-hours-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Work Hours Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate work hours and overtime pay.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
