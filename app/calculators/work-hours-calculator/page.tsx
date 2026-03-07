"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Clock, DollarSign, Calculator } from "lucide-react";

interface WorkHoursResult {
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  totalPay: number;
  formatted: string;
}

export default function WorkHoursCalculatorPage() {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [breakDuration, setBreakDuration] = useState<string>("0");
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [overtimeRate, setOvertimeRate] = useState<string>("1.5");
  const [regularHours, setRegularHours] = useState<string>("8");
  const [result, setResult] = useState<WorkHoursResult | null>(null);

  const calculateWorkHours = () => {
    if (!startTime || !endTime || !hourlyRate) {
      setResult(null);
      return;
    }

    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const breakMins = parseFloat(breakDuration) || 0;
    const rate = parseFloat(hourlyRate);
    const otMultiplier = parseFloat(overtimeRate);
    const regularHrsLimit = parseFloat(regularHours);

    if (isNaN(rate) || rate <= 0) {
      setResult(null);
      return;
    }

    let diff = end.getTime() - start.getTime();

    if (end < start) {
      end.setDate(end.getDate() + 1);
      diff = end.getTime() - start.getTime();
    }

    let totalHours = diff / (1000 * 60 * 60);
    totalHours -= breakMins / 60;

    if (totalHours < 0) totalHours = 0;

    const regHours = Math.min(totalHours, regularHrsLimit);
    const otHours = Math.max(0, totalHours - regularHrsLimit);

    const regPay = regHours * rate;
    const otPay = otHours * rate * otMultiplier;
    const totalPay = regPay + otPay;

    const hours = Math.floor(totalHours);
    const mins = Math.round((totalHours - hours) * 60);
    const formatted = `${hours}h ${mins}m`;

    setResult({
      totalHours: Math.round(totalHours * 100) / 100,
      regularHours: Math.round(regHours * 100) / 100,
      overtimeHours: Math.round(otHours * 100) / 100,
      regularPay: Math.round(regPay * 100) / 100,
      overtimePay: Math.round(otPay * 100) / 100,
      totalPay: Math.round(totalPay * 100) / 100,
      formatted,
    });
  };

  const reset = () => {
    setStartTime("");
    setEndTime("");
    setBreakDuration("0");
    setHourlyRate("");
    setResult(null);
  };

  useEffect(() => {
    calculateWorkHours();
  }, [startTime, endTime, breakDuration, hourlyRate, overtimeRate, regularHours]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Work Hours Calculator – Calculate Hours Worked and Pay</h1>
          <p className="text-muted-foreground">
            Calculate total hours worked and earnings from clock-in and clock-out times. This timesheet calculator handles breaks, overtime rates, and shows regular vs overtime pay breakdown.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Work Schedule</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Clock In</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">Clock Out</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breakDuration">Break (minutes)</Label>
                    <Input
                      id="breakDuration"
                      type="number"
                      placeholder="e.g., 30"
                      value={breakDuration}
                      onChange={(e) => setBreakDuration(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Pay Rate</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="e.g., 25"
                      step="0.5"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="overtimeRate">Overtime Multiplier</Label>
                    <select
                      id="overtimeRate"
                      value={overtimeRate}
                      onChange={(e) => setOvertimeRate(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="1.5">1.5x (Time and half)</option>
                      <option value="2.0">2.0x (Double time)</option>
                      <option value="1.0">1.0x (Same as regular)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regularHours">Regular Hours/Day</Label>
                    <Input
                      id="regularHours"
                      type="number"
                      placeholder="e.g., 8"
                      value={regularHours}
                      onChange={(e) => setRegularHours(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  If clock-out is before clock-in, calculator assumes overnight shift. Break time is subtracted from total hours.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWorkHours} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Work Summary</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                    <p className="text-3xl font-bold text-primary">{result.formatted}</p>
                    <p className="text-sm text-muted-foreground">{result.totalHours} hours</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Regular</p>
                      <p className="text-lg font-semibold">{result.regularHours}h</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Overtime</p>
                      <p className="text-lg font-semibold">{result.overtimeHours}h</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Regular Pay:</span>
                      <span className="font-medium">${result.regularPay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overtime Pay:</span>
                      <span className="font-medium">${result.overtimePay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                      <span>Total Pay:</span>
                      <span className="text-primary">${result.totalPay.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p>Overtime calculated after {regularHours} hours at {overtimeRate}x rate</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter work times and rate to calculate pay</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Work Hours</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Clock In</h3>
                <p className="text-sm text-muted-foreground">Record your start time for the shift.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Clock Out</h3>
                <p className="text-sm text-muted-foreground">Record your end time when shift finishes.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Subtract Breaks</h3>
                <p className="text-sm text-muted-foreground">Deduct unpaid break time from total hours.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="font-semibold mb-2">Calculate Pay</h3>
                <p className="text-sm text-muted-foreground">Multiply hours by rate with overtime applied.</p>
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
                  Overnight Shift Support
                </h3>
                <p className="text-sm text-muted-foreground">Automatically handles shifts that cross midnight.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Break Deduction
                </h3>
                <p className="text-sm text-muted-foreground">Subtracts unpaid break time from worked hours.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Overtime Calculation
                </h3>
                <p className="text-sm text-muted-foreground">Applies overtime rate after regular hours threshold.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Pay Breakdown
                </h3>
                <p className="text-sm text-muted-foreground">Shows regular pay, overtime pay, and total earnings.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate hours worked?</h3>
                <p className="text-sm text-muted-foreground">Subtract clock-in time from clock-out time, then subtract any unpaid break time. For overnight shifts, add 24 hours if end time is before start time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is overtime pay?</h3>
                <p className="text-sm text-muted-foreground">Overtime pay is additional compensation for hours worked beyond regular hours. In the US, it's typically 1.5x regular rate for hours over 40/week or 8/day.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Should breaks be paid?</h3>
                <p className="text-sm text-muted-foreground">Short breaks (5-20 min) are typically paid. Meal breaks (30+ min) are usually unpaid if you're completely relieved of duties. Laws vary by location.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How is overtime calculated?</h3>
                <p className="text-sm text-muted-foreground">Overtime = (Hours over threshold) × (Hourly rate) × (Overtime multiplier). For example, 2 hours overtime at $20/hr with 1.5x rate = 2 × $20 × 1.5 = $60.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I use this for weekly calculations?</h3>
                <p className="text-sm text-muted-foreground">This calculator is for daily shifts. For weekly calculations, add up daily hours first, then apply overtime rules based on your local labor laws (typically 40 hours/week).</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
