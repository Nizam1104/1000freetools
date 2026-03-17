"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Clock, Timer, Plus, Trash2 } from "lucide-react";

interface CountdownEvent {
  id: string;
  name: string;
  targetTimezone: string;
  targetDate: string;
  targetTime: string;
}

const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function LiveCountdownTimerAcrossTimeZones() {
  const [events, setEvents] = useState<CountdownEvent[]>([]);
  const [eventName, setEventName] = useState("");
  const [targetTimezone, setTargetTimezone] = useState("UTC");
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("12:00");
  const [timeRemaining, setTimeRemaining] = useState<Record<string, TimeRemaining>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateCountdowns = () => {
      const remaining: Record<string, TimeRemaining> = {};
      const now = new Date();

      events.forEach((event) => {
        const targetDateTime = new Date(`${event.targetDate}T${event.targetTime}:00`);
        
        // Convert to target timezone
        const tzDate = new Date(targetDateTime.toLocaleString("en-US", { timeZone: event.targetTimezone }));
        const diff = tzDate.getTime() - now.getTime();

        const isPast = diff < 0;
        const absDiff = Math.abs(diff);

        remaining[event.id] = {
          days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((absDiff % (1000 * 60)) / 1000),
          isPast,
        };
      });

      setTimeRemaining(remaining);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [events]);

  const addEvent = useCallback(() => {
    if (!eventName || !targetDate || !targetTime) return;

    const newEvent: CountdownEvent = {
      id: Date.now().toString(),
      name: eventName,
      targetTimezone,
      targetDate,
      targetTime,
    };

    setEvents([...events, newEvent]);
    setEventName("");
    setTargetDate("");
    setTargetTime("12:00");
  }, [events, eventName, targetTimezone, targetDate, targetTime]);

  const removeEvent = useCallback((id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  }, [events]);

  const copyToClipboard = useCallback(async () => {
    if (events.length === 0) return;
    try {
      let text = "Countdown Timers\n\n";
      events.forEach((event) => {
        const remaining = timeRemaining[event.id];
        if (remaining) {
          text += `${event.name} (${event.targetTimezone})\n`;
          text += remaining.isPast
            ? `Ended ${remaining.days}d ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s ago\n\n`
            : `${remaining.days}d ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s remaining\n\n`;
        }
      });
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [events, timeRemaining]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            Add Countdown Event
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                type="text"
                placeholder="e.g., New Year 2025"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={targetTimezone}
                onChange={(e) => setTargetTimezone(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="targetDate">Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="targetTime">Time</Label>
              <Input
                id="targetTime"
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={addEvent} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Countdown
          </Button>
        </CardContent>
      </Card>

      {events.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Countdowns</h2>
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copy All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => {
              const remaining = timeRemaining[event.id];
              return (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">{event.targetTimezone}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeEvent(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {remaining && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="p-2 bg-muted rounded">
                            <div className="text-2xl font-bold">{remaining.days}</div>
                            <div className="text-xs">Days</div>
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <div className="text-2xl font-bold">{remaining.hours}</div>
                            <div className="text-xs">Hours</div>
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <div className="text-2xl font-bold">{remaining.minutes}</div>
                            <div className="text-xs">Minutes</div>
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <div className="text-2xl font-bold">{remaining.seconds}</div>
                            <div className="text-xs">Seconds</div>
                          </div>
                        </div>
                        {remaining.isPast && (
                          <p className="text-sm text-red-500 text-center">Event has passed</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Clock className="w-12 h-12 mx-auto mb-4" />
          <p>Add countdown events to track time across different timezones</p>
        </div>
      )}
    </div>
  );
}
