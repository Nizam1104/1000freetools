"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Timer } from "lucide-react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

export default function CountdownCalculatorPage() {
  const [targetDate, setTargetDate] = useState<string>("");
  const [targetTime, setTargetTime] = useState<string>("00:00");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!targetDate) {
      setTimeRemaining(null);
      return;
    }

    const target = new Date(`${targetDate}T${targetTime}`);
    const now = currentTime;
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isPast: true,
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining({
      days,
      hours,
      minutes,
      seconds,
      totalSeconds: Math.floor(diff / 1000),
      isPast: false,
    });
  }, [targetDate, targetTime, currentTime]);

  const reset = () => {
    setTargetDate("");
    setTargetTime("00:00");
    setTimeRemaining(null);
  };

  const formatUnit = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Countdown Timer Calculator – Calculate Time Remaining Until Any Date</h1>
          <p className="text-muted-foreground">
            Track time remaining until important events, deadlines, or special occasions. This free countdown calculator shows days, hours, minutes, and seconds until your target date with live updates.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Set Target Date</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetTime">Target Time</Label>
                    <Input
                      id="targetTime"
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={reset} variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Time Remaining</h3>
              {timeRemaining ? (
                <div className="space-y-4">
                  {timeRemaining.isPast ? (
                    <div className="p-6 bg-muted rounded-lg text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-lg font-semibold">Date has passed</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary">{formatUnit(timeRemaining.days)}</p>
                          <p className="text-xs text-muted-foreground">Days</p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary">{formatUnit(timeRemaining.hours)}</p>
                          <p className="text-xs text-muted-foreground">Hours</p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary">{formatUnit(timeRemaining.minutes)}</p>
                          <p className="text-xs text-muted-foreground">Minutes</p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary">{formatUnit(timeRemaining.seconds)}</p>
                          <p className="text-xs text-muted-foreground">Seconds</p>
                        </div>
                      </div>

                      <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                        <p>{Math.floor(timeRemaining.totalSeconds / 3600)} hours remaining</p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a target date to start countdown</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Use the Countdown Calculator</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Choose Target Date</h3>
                <p className="text-sm text-muted-foreground">Select the date of your event, deadline, or special occasion.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Set Specific Time</h3>
                <p className="text-sm text-muted-foreground">Optionally set the exact time for more precise countdown.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Watch Live Countdown</h3>
                <p className="text-sm text-muted-foreground">See days, hours, minutes, and seconds update in real-time.</p>
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
                  Live Updates
                </h3>
                <p className="text-sm text-muted-foreground">Countdown updates every second for accurate time tracking.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Days to Seconds
                </h3>
                <p className="text-sm text-muted-foreground">See time remaining broken down into days, hours, minutes, and seconds.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Any Future Date
                </h3>
                <p className="text-sm text-muted-foreground">Count down to birthdays, holidays, deadlines, or any future event.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  No Sign-up Required
                </h3>
                <p className="text-sm text-muted-foreground">Free countdown calculator with no registration or limits.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How does the countdown calculator work?</h3>
                <p className="text-sm text-muted-foreground">Enter your target date and time, and the calculator computes the difference between now and that moment. It updates every second to show accurate remaining time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can I count down to a past date?</h3>
                <p className="text-sm text-muted-foreground">If you select a date that has already passed, the calculator will show that the date has passed instead of displaying negative time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does this work for long-term countdowns?</h3>
                <p className="text-sm text-muted-foreground">Yes, you can count down to dates years in the future. The calculator shows total days along with hours, minutes, and seconds.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Do I need to keep the page open?</h3>
                <p className="text-sm text-muted-foreground">The countdown only updates while the page is open. For long-term tracking, bookmark the page and return to check progress.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What time zone does this use?</h3>
                <p className="text-sm text-muted-foreground">The calculator uses your device's local time zone. The countdown reflects the time on your computer or phone.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
