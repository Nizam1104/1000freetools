"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Phone, Clock, Globe } from "lucide-react";

const countries = [
  { name: "United States", code: "US", timezones: ["America/New_York", "America/Chicago", "America/Los_Angeles"], businessHours: { start: 9, end: 17 } },
  { name: "United Kingdom", code: "GB", timezones: ["Europe/London"], businessHours: { start: 9, end: 17 } },
  { name: "France", code: "FR", timezones: ["Europe/Paris"], businessHours: { start: 9, end: 17 } },
  { name: "Germany", code: "DE", timezones: ["Europe/Berlin"], businessHours: { start: 9, end: 17 } },
  { name: "India", code: "IN", timezones: ["Asia/Kolkata"], businessHours: { start: 9, end: 18 } },
  { name: "China", code: "CN", timezones: ["Asia/Shanghai"], businessHours: { start: 9, end: 18 } },
  { name: "Japan", code: "JP", timezones: ["Asia/Tokyo"], businessHours: { start: 9, end: 18 } },
  { name: "Australia", code: "AU", timezones: ["Australia/Sydney"], businessHours: { start: 9, end: 17 } },
  { name: "Brazil", code: "BR", timezones: ["America/Sao_Paulo"], businessHours: { start: 9, end: 18 } },
  { name: "UAE", code: "AE", timezones: ["Asia/Dubai"], businessHours: { start: 9, end: 17 } },
];

export default function InternationalPhoneCallTimeFinder() {
  const [yourTimezone, setYourTimezone] = useState("America/New_York");
  const [theirCountry, setTheirCountry] = useState("GB");
  const [preferredTime, setPreferredTime] = useState("14:00");
  const [preferredDate, setPreferredDate] = useState("");
  const [result, setResult] = useState<{
    yourTime: string;
    theirTime: string;
    isBusinessHours: boolean;
    alternativeTimes: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const findBestCallTime = useCallback(() => {
    if (!preferredDate) return;

    const theirCountryData = countries.find((c) => c.code === theirCountry);
    if (!theirCountryData) return;

    const theirTimezone = theirCountryData.timezones[0];
    const yourDate = new Date(`${preferredDate}T${preferredTime}:00`);

    // Format your time
    const yourTimeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: yourTimezone,
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(yourDate);

    // Calculate their time
    const theirTimeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: theirTimezone,
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(yourDate);

    // Check if it's during their business hours
    const theirHour = new Intl.DateTimeFormat("en-US", {
      timeZone: theirTimezone,
      hour: "numeric",
      hour12: false,
    }).format(yourDate);
    const isBusinessHours = parseInt(theirHour) >= theirCountryData.businessHours.start && 
                            parseInt(theirHour) < theirCountryData.businessHours.end;

    // Generate alternative times
    const alternatives: string[] = [];
    for (let hour = theirCountryData.businessHours.start; hour < theirCountryData.businessHours.end; hour++) {
      const altDate = new Date(yourDate);
      altDate.setHours(hour, 0, 0, 0);
      
      const yourAltTime = new Intl.DateTimeFormat("en-US", {
        timeZone: yourTimezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(altDate);
      
      alternatives.push(`${yourAltTime} your time = ${hour}:00 their time`);
    }

    setResult({
      yourTime: yourTimeStr,
      theirTime: theirTimeStr,
      isBusinessHours,
      alternativeTimes: alternatives.slice(0, 5),
    });
  }, [yourTimezone, theirCountry, preferredTime, preferredDate]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      const theirCountryData = countries.find((c) => c.code === theirCountry);
      const text = `International Call Time Finder

Your Time (${yourTimezone}):
${result.yourTime}

Their Time (${theirCountryData?.name}):
${result.theirTime}

During Business Hours: ${result.isBusinessHours ? "Yes ✓" : "No ✗"}

Alternative Times (Their Business Hours):
${result.alternativeTimes.join("\n")}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, yourTimezone, theirCountry]);

  const theirCountryData = countries.find((c) => c.code === theirCountry);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            International Phone Call Time Finder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yourTimezone">Your Timezone</Label>
              <select
                id="yourTimezone"
                value={yourTimezone}
                onChange={(e) => setYourTimezone(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {countries.flatMap((c) => c.timezones).map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="theirCountry">Their Country</Label>
              <select
                id="theirCountry"
                value={theirCountry}
                onChange={(e) => setTheirCountry(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Date</Label>
              <Input
                id="preferredDate"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="preferredTime">Your Preferred Time</Label>
              <Input
                id="preferredTime"
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={findBestCallTime} className="w-full">
            <Clock className="w-4 h-4 mr-2" />
            Find Best Call Time
          </Button>

          {result && theirCountryData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${result.isBusinessHours ? "bg-green-50 dark:bg-green-950" : "bg-amber-50 dark:bg-amber-950"}`}>
                  <Label>Your Time</Label>
                  <p className="text-lg font-semibold mt-2">{result.yourTime}</p>
                  <p className="text-sm text-muted-foreground">{yourTimezone}</p>
                </div>
                <div className={`p-4 rounded-lg ${result.isBusinessHours ? "bg-green-50 dark:bg-green-950" : "bg-amber-50 dark:bg-amber-950"}`}>
                  <Label>Their Time</Label>
                  <p className="text-lg font-semibold mt-2">{result.theirTime}</p>
                  <p className="text-sm text-muted-foreground">{theirCountryData.name}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${result.isBusinessHours ? "bg-green-100 dark:bg-green-900" : "bg-amber-100 dark:bg-amber-900"}`}>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <p className="font-semibold">
                    {result.isBusinessHours
                      ? "✓ Good time! It's during their business hours"
                      : "⚠ Outside their business hours"}
                  </p>
                </div>
                <p className="text-sm mt-1">
                  Their business hours: {theirCountryData.businessHours.start}:00 - {theirCountryData.businessHours.end}:00
                </p>
              </div>

              <div>
                <Label>Alternative Times (During Their Business Hours)</Label>
                <div className="mt-2 space-y-1">
                  {result.alternativeTimes.map((time, i) => (
                    <div key={i} className="p-2 bg-muted rounded text-sm">
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">Tips for International Calls:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Always confirm the time in both timezones</li>
              <li>Consider daylight saving time changes</li>
              <li>Schedule calls during overlapping business hours</li>
              <li>Be mindful of lunch hours and local holidays</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
