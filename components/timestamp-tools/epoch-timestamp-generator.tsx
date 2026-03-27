"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function TimestampEpochGenerator() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [output, setOutput] = useState<{ seconds: number; milliseconds: number } | null>(null);

  const handleGenerate = () => {
    if (!date) return;

    const dateTimeString = `${date}T${time || "00:00"}:00`;
    const tzOffset = getTimezoneOffset(timezone);
    
    const localDate = new Date(dateTimeString);
    localDate.setMinutes(localDate.getMinutes() - tzOffset - localDate.getTimezoneOffset());
    
    const seconds = Math.floor(localDate.getTime() / 1000);
    const milliseconds = localDate.getTime();
    
    setOutput({ seconds, milliseconds });
  };

  const getTimezoneOffset = (tz: string) => {
    const offsets: Record<string, number> = {
      "UTC": 0,
      "EST": -5 * 60,
      "PST": -8 * 60,
      "CST": -6 * 60,
      "MST": -7 * 60,
      "GMT": 0,
      "CET": 1 * 60,
      "EET": 2 * 60,
      "IST": 5.5 * 60,
      "JST": 9 * 60,
      "AEST": 10 * 60,
    };
    return offsets[tz] || 0;
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setDate("");
    setTime("");
    setOutput(null);
  };

  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      <Card className="p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background"
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST (UTC-5)</option>
              <option value="PST">PST (UTC-8)</option>
              <option value="CST">CST (UTC-6)</option>
              <option value="MST">MST (UTC-7)</option>
              <option value="GMT">GMT</option>
              <option value="CET">CET (UTC+1)</option>
              <option value="EET">EET (UTC+2)</option>
              <option value="IST">IST (UTC+5:30)</option>
              <option value="JST">JST (UTC+9)</option>
              <option value="AEST">AEST (UTC+10)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={handleGenerate} disabled={!date} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Generate Timestamp
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!date}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!date}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Timestamp (seconds)</Label>
                <div className="flex gap-2">
                  <Input value={output.seconds.toString()} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleCopy(output.seconds.toString());
                      setCopied("seconds");
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === "seconds" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Timestamp (milliseconds)</Label>
                <div className="flex gap-2">
                  <Input value={output.milliseconds.toString()} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleCopy(output.milliseconds.toString());
                      setCopied("milliseconds");
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === "milliseconds" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Formatted Date</h3>
            <p className="font-mono">
              {new Date(output.milliseconds).toLocaleString()}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
