"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Database, Search, Copy, Check, Globe, Clock } from "lucide-react";

interface IANAData {
  timezone: string;
  country: string;
  coordinates: string;
  utcOffset: string;
  dstOffset: string;
  rawOffset: number;
  abbreviations: string[];
  transitions: string[];
}

// Simplified IANA timezone database
const ianaDatabase: Record<string, Partial<IANAData>> = {
  "America/New_York": {
    country: "United States",
    coordinates: "40.7128,-74.0060",
    utcOffset: "-05:00",
    dstOffset: "-04:00",
    rawOffset: -5,
    abbreviations: ["EST", "EDT"],
  },
  "America/Chicago": {
    country: "United States",
    coordinates: "41.8781,-87.6298",
    utcOffset: "-06:00",
    dstOffset: "-05:00",
    rawOffset: -6,
    abbreviations: ["CST", "CDT"],
  },
  "America/Los_Angeles": {
    country: "United States",
    coordinates: "34.0522,-118.2437",
    utcOffset: "-08:00",
    dstOffset: "-07:00",
    rawOffset: -8,
    abbreviations: ["PST", "PDT"],
  },
  "Europe/London": {
    country: "United Kingdom",
    coordinates: "51.5074,-0.1278",
    utcOffset: "+00:00",
    dstOffset: "+01:00",
    rawOffset: 0,
    abbreviations: ["GMT", "BST"],
  },
  "Europe/Paris": {
    country: "France",
    coordinates: "48.8566,2.3522",
    utcOffset: "+01:00",
    dstOffset: "+02:00",
    rawOffset: 1,
    abbreviations: ["CET", "CEST"],
  },
  "Europe/Berlin": {
    country: "Germany",
    coordinates: "52.5200,13.4050",
    utcOffset: "+01:00",
    dstOffset: "+02:00",
    rawOffset: 1,
    abbreviations: ["CET", "CEST"],
  },
  "Europe/Moscow": {
    country: "Russia",
    coordinates: "55.7558,37.6173",
    utcOffset: "+03:00",
    dstOffset: "+03:00",
    rawOffset: 3,
    abbreviations: ["MSK"],
  },
  "Asia/Dubai": {
    country: "United Arab Emirates",
    coordinates: "25.2048,55.2708",
    utcOffset: "+04:00",
    dstOffset: "+04:00",
    rawOffset: 4,
    abbreviations: ["GST"],
  },
  "Asia/Kolkata": {
    country: "India",
    coordinates: "28.6139,77.2090",
    utcOffset: "+05:30",
    dstOffset: "+05:30",
    rawOffset: 5.5,
    abbreviations: ["IST"],
  },
  "Asia/Shanghai": {
    country: "China",
    coordinates: "31.2304,121.4737",
    utcOffset: "+08:00",
    dstOffset: "+08:00",
    rawOffset: 8,
    abbreviations: ["CST"],
  },
  "Asia/Tokyo": {
    country: "Japan",
    coordinates: "35.6762,139.6503",
    utcOffset: "+09:00",
    dstOffset: "+09:00",
    rawOffset: 9,
    abbreviations: ["JST"],
  },
  "Australia/Sydney": {
    country: "Australia",
    coordinates: "-33.8688,151.2093",
    utcOffset: "+10:00",
    dstOffset: "+11:00",
    rawOffset: 10,
    abbreviations: ["AEST", "AEDT"],
  },
  "Pacific/Auckland": {
    country: "New Zealand",
    coordinates: "-36.8485,174.7633",
    utcOffset: "+12:00",
    dstOffset: "+13:00",
    rawOffset: 12,
    abbreviations: ["NZST", "NZDT"],
  },
  UTC: {
    country: "Universal",
    coordinates: "0.0000,0.0000",
    utcOffset: "+00:00",
    dstOffset: "+00:00",
    rawOffset: 0,
    abbreviations: ["UTC"],
  },
};

export default function TimezoneDatabaseIanaLookup() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
  const [timezoneData, setTimezoneData] = useState<IANAData | null>(null);
  const [jsonOutput, setJsonOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const searchTimezones = useCallback(() => {
    const query = searchQuery.toLowerCase();
    const matches = Object.keys(ianaDatabase).filter((tz) =>
      tz.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      setSelectedTimezone(matches[0]);
      handleSelectTimezone(matches[0]);
    }
  }, [searchQuery]);

  const handleSelectTimezone = useCallback((timezone: string) => {
    setSelectedTimezone(timezone);
    const data = ianaDatabase[timezone];

    if (data) {
      const now = new Date();
      const jan = new Date(now.getFullYear(), 0, 1);
      const jul = new Date(now.getFullYear(), 6, 1);
      const isDST = -now.getTimezoneOffset() === Math.max(-jan.getTimezoneOffset(), -jul.getTimezoneOffset());

      const fullData: IANAData = {
        timezone,
        country: data.country || "Unknown",
        coordinates: data.coordinates || "N/A",
        utcOffset: data.utcOffset || "N/A",
        dstOffset: data.dstOffset || data.utcOffset || "N/A",
        rawOffset: data.rawOffset || 0,
        abbreviations: data.abbreviations || [],
        transitions: [
          "Second Sunday in March (DST Start)",
          "First Sunday in November (DST End)",
        ],
      };

      setTimezoneData(fullData);
      setJsonOutput(JSON.stringify(fullData, null, 2));
    }
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [jsonOutput]);

  const getCurrentTime = useCallback((timezone: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date());
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              IANA Timezone Database Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search Timezone</Label>
              <div className="flex gap-2 mt-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Enter timezone (e.g., America/New_York)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchTimezones()}
                    className="pl-10"
                  />
                </div>
                <Button onClick={searchTimezones}>Search</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Available Timezones</Label>
              <div className="max-h-96 overflow-y-auto grid grid-cols-1 gap-2">
                {Object.keys(ianaDatabase).map((tz) => (
                  <button
                    key={tz}
                    onClick={() => handleSelectTimezone(tz)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedTimezone === tz
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{tz}</span>
                      <span className="text-xs opacity-70">{getCurrentTime(tz)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Timezone Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {timezoneData ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <Label className="text-xs">Timezone</Label>
                    <p className="font-semibold">{timezoneData.timezone}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Label className="text-xs">Country</Label>
                    <p className="font-semibold">{timezoneData.country}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Coordinates</Label>
                    <p className="font-mono text-sm">{timezoneData.coordinates}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">UTC Offset</Label>
                    <p className="font-semibold">{timezoneData.utcOffset}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">DST Offset</Label>
                    <p className="font-semibold">{timezoneData.dstOffset}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Abbreviations</Label>
                    <p className="font-semibold">{timezoneData.abbreviations.join(", ")}</p>
                  </div>
                </div>

                <div>
                  <Label>DST Transitions</Label>
                  <ul className="mt-2 space-y-1 text-sm">
                    {timezoneData.transitions.map((transition, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {transition}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative">
                  <Label>JSON Output</Label>
                  <Textarea
                    value={jsonOutput}
                    readOnly
                    className="mt-1 font-mono text-xs h-48"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-8 right-2"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Database className="w-12 h-12 mx-auto mb-4" />
                <p>Select a timezone to view IANA database information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
