"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function EnglishToCronConverter() {
  const [input, setInput] = useState("");
  const [cronExpression, setCronExpression] = useState("");
  const [explanation, setExplanation] = useState("");

  const parseEnglish = (text: string) => {
    const lower = text.toLowerCase();
    
    // Default values
    let minute = "*";
    let hour = "*";
    let dayOfMonth = "*";
    let month = "*";
    let dayOfWeek = "*";

    // Parse minute
    const minuteMatch = lower.match(/at\s+(\d{1,2})\s*(?:am|pm)?\s*(?:and\s+(\d{1,2}))?\s*minutes?/);
    if (minuteMatch) {
      minute = minuteMatch[1];
      if (minuteMatch[2]) {
        minute = `${minuteMatch[1]},${minuteMatch[2]}`;
      }
    } else if (lower.includes("every minute")) {
      minute = "*";
    } else if (lower.includes("minute")) {
      const everyMinuteMatch = lower.match(/every\s+(\d+)\s*minutes?/);
      if (everyMinuteMatch) {
        minute = `*/${everyMinuteMatch[1]}`;
      }
    }

    // Parse hour
    const hourMatch = lower.match(/at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
    if (hourMatch) {
      let h = parseInt(hourMatch[1]);
      const ampm = hourMatch[3];
      if (ampm === "pm" && h !== 12) h += 12;
      if (ampm === "am" && h === 12) h = 0;
      hour = h.toString();
      if (!minuteMatch) {
        minute = hourMatch[2] || "0";
      }
    } else if (lower.includes("every hour")) {
      const everyHourMatch = lower.match(/every\s+(\d+)\s*hours?/);
      if (everyHourMatch) {
        hour = `*/${everyHourMatch[1]}`;
      }
    }

    // Parse day of week
    const dayOfWeekMap: Record<string, string> = {
      sunday: "0", monday: "1", tuesday: "2", wednesday: "3",
      thursday: "4", friday: "5", saturday: "6",
    };
    
    if (lower.includes("every day")) {
      dayOfWeek = "*";
    } else {
      for (const [day, num] of Object.entries(dayOfWeekMap)) {
        if (lower.includes(day)) {
          dayOfWeek = num;
          break;
        }
      }
    }

    // Parse day of month
    const dayMatch = lower.match(/on the\s+(\d{1,2})(?:st|nd|rd|th)?/);
    if (dayMatch) {
      dayOfMonth = dayMatch[1];
      dayOfWeek = "*";
    }

    // Parse month
    const monthMap: Record<string, string> = {
      january: "1", february: "2", march: "3", april: "4",
      may: "5", june: "6", july: "7", august: "8",
      september: "9", october: "10", november: "11", december: "12",
    };
    
    for (const [monthName, num] of Object.entries(monthMap)) {
      if (lower.includes(monthName)) {
        month = num;
        break;
      }
    }

    // Common patterns
    if (lower.includes("every day at")) {
      dayOfWeek = "*";
      dayOfMonth = "*";
    }
    
    if (lower.includes("every monday")) {
      dayOfWeek = "1";
    }
    
    if (lower.includes("every weekday")) {
      dayOfWeek = "1-5";
    }
    
    if (lower.includes("every weekend")) {
      dayOfWeek = "0,6";
    }

    if (lower.includes("midnight")) {
      hour = "0";
      minute = "0";
    }
    
    if (lower.includes("noon") || lower.includes("midday")) {
      hour = "12";
      minute = "0";
    }

    const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    
    const explanations: string[] = [];
    if (minute === "*") explanations.push("every minute");
    else if (minute.startsWith("*/")) explanations.push(`every ${minute.slice(2)} minutes`);
    else explanations.push(`at minute ${minute}`);
    
    if (hour === "*") explanations.push("of every hour");
    else if (hour.startsWith("*/")) explanations.push(`every ${hour.slice(2)} hours`);
    else explanations.push(`past hour ${hour}`);
    
    if (dayOfMonth === "*") explanations.push("every day");
    else explanations.push(`on day ${dayOfMonth}`);
    
    if (month === "*") explanations.push("of every month");
    else explanations.push(`in ${Object.entries(monthMap).find(([_, v]) => v === month)?.[0]}`);
    
    if (dayOfWeek === "*") explanations.push("every day of the week");
    else if (dayOfWeek === "1-5") explanations.push("Monday through Friday");
    else if (dayOfWeek === "0,6") explanations.push("on weekends");
    else {
      const dayNames = Object.entries(dayOfWeekMap).filter(([_, v]) => dayOfWeek.includes(v)).map(([k]) => k);
      if (dayNames.length > 0) explanations.push(`on ${dayNames.join("s and ")}`);
    }

    return { cron, explanation: explanations.join(" ") };
  };

  const handleConvert = () => {
    const result = parseEnglish(input);
    setCronExpression(result.cron);
    setExplanation(result.explanation);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput("");
    setCronExpression("");
    setExplanation("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">English to CRON Expression Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert natural language descriptions into valid CRON expressions
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="input">English Description</Label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Every day at 3:30 PM"
          className="w-full min-h-[100px] p-3 rounded-md border border-input"
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Convert to CRON
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {(cronExpression || explanation) && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">CRON Expression</Label>
                <div className="text-2xl font-mono font-bold mt-1">{cronExpression}</div>
                <div className="text-sm text-muted-foreground mt-2">{explanation}</div>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  handleCopy(cronExpression);
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

          <Card className="p-4">
            <h3 className="font-semibold mb-2">CRON Format</h3>
            <div className="grid grid-cols-5 gap-2 text-center text-sm">
              <div>
                <div className="font-mono font-bold">{cronExpression.split(" ")[0]}</div>
                <div className="text-muted-foreground">Minute</div>
              </div>
              <div>
                <div className="font-mono font-bold">{cronExpression.split(" ")[1]}</div>
                <div className="text-muted-foreground">Hour</div>
              </div>
              <div>
                <div className="font-mono font-bold">{cronExpression.split(" ")[2]}</div>
                <div className="text-muted-foreground">Day</div>
              </div>
              <div>
                <div className="font-mono font-bold">{cronExpression.split(" ")[3]}</div>
                <div className="text-muted-foreground">Month</div>
              </div>
              <div>
                <div className="font-mono font-bold">{cronExpression.split(" ")[4]}</div>
                <div className="text-muted-foreground">Weekday</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Example Phrases</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Every day at 3:30 PM",
            "Every Monday at 9:00 AM",
            "Every 15 minutes",
            "Every hour",
            "Every weekday at noon",
            "On the 1st at midnight",
          ].map((example) => (
            <Button
              key={example}
              variant="outline"
              className="justify-start text-left h-auto py-2"
              onClick={() => setInput(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
