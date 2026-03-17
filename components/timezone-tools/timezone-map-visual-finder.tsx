"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Clock, Copy, Check } from "lucide-react";

interface TimezoneInfo {
  name: string;
  offset: string;
  abbreviation: string;
  currentTime: string;
  isDST: boolean;
}

const regions = [
  { value: "all", label: "All Regions" },
  { value: "americas", label: "Americas" },
  { value: "europe", label: "Europe" },
  { value: "africa", label: "Africa" },
  { value: "asia", label: "Asia" },
  { value: "oceania", label: "Oceania" },
];

const timezonesByRegion: Record<string, string[]> = {
  americas: [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Anchorage",
    "America/Honolulu",
    "America/Sao_Paulo",
    "America/Mexico_City",
    "America/Toronto",
    "America/Vancouver",
  ],
  europe: [
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Rome",
    "Europe/Madrid",
    "Europe/Moscow",
    "Europe/Amsterdam",
    "Europe/Stockholm",
    "Europe/Vienna",
    "Europe/Warsaw",
  ],
  africa: [
    "Africa/Cairo",
    "Africa/Johannesburg",
    "Africa/Lagos",
    "Africa/Nairobi",
    "Africa/Casablanca",
    "Africa/Addis_Ababa",
    "Africa/Accra",
    "Africa/Tunis",
  ],
  asia: [
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Shanghai",
    "Asia/Tokyo",
    "Asia/Seoul",
    "Asia/Singapore",
    "Asia/Bangkok",
    "Asia/Jakarta",
    "Asia/Manila",
    "Asia/Hong_Kong",
  ],
  oceania: [
    "Australia/Sydney",
    "Australia/Melbourne",
    "Australia/Perth",
    "Pacific/Auckland",
    "Pacific/Fiji",
    "Pacific/Guam",
    "Pacific/Honolulu",
  ],
};

export default function TimezoneMapVisualFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
  const [timezoneInfo, setTimezoneInfo] = useState<TimezoneInfo | null>(null);
  const [copied, setCopied] = useState(false);

  const getFilteredTimezones = useCallback(() => {
    let timezones: string[] = [];

    if (selectedRegion === "all") {
      timezones = Object.values(timezonesByRegion).flat();
    } else {
      timezones = timezonesByRegion[selectedRegion] || [];
    }

    if (searchQuery) {
      timezones = timezones.filter((tz) =>
        tz.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return timezones;
  }, [searchQuery, selectedRegion]);

  const getTimezoneInfo = useCallback((timezone: string): TimezoneInfo => {
    const now = new Date();
    const parts = timezone.split("/");
    const city = parts[parts.length - 1].replace(/_/g, " ");

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const offsetFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });

    const offsetParts = offsetFormatter.formatToParts(now);
    const offset = offsetParts.find((p) => p.type === "timeZoneName")?.value || "UTC";

    const abbrFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    });
    const abbrParts = abbrFormatter.formatToParts(now);
    const abbreviation = abbrParts.find((p) => p.type === "timeZoneName")?.value || "";

    // Check if DST is in effect
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    const janOffset = -jan.getTimezoneOffset();
    const julOffset = -jul.getTimezoneOffset();
    const currentOffset = -now.getTimezoneOffset();
    const isDST = currentOffset === Math.max(janOffset, julOffset);

    return {
      name: city,
      offset: offset.replace("GMT", "UTC"),
      abbreviation: abbreviation || "",
      currentTime: formatter.format(now),
      isDST,
    };
  }, []);

  const handleSelectTimezone = useCallback((timezone: string) => {
    setSelectedTimezone(timezone);
    const info = getTimezoneInfo(timezone);
    setTimezoneInfo(info);
  }, [getTimezoneInfo]);

  const copyToClipboard = useCallback(async () => {
    if (!timezoneInfo || !selectedTimezone) return;
    try {
      await navigator.clipboard.writeText(
        `${selectedTimezone}\nCurrent Time: ${timezoneInfo.currentTime}\nOffset: ${timezoneInfo.offset}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [timezoneInfo, selectedTimezone]);

  const filteredTimezones = getFilteredTimezones();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Timezone Finder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search Timezone</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search city or timezone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredTimezones.map((tz) => (
                <button
                  key={tz}
                  onClick={() => handleSelectTimezone(tz)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTimezone === tz
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="font-medium">{tz.split("/").pop()?.replace(/_/g, " ")}</div>
                  <div className="text-xs opacity-70">{tz}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Timezone Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {timezoneInfo && selectedTimezone ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Timezone</Label>
                    <p className="text-lg font-semibold mt-2">{selectedTimezone}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Location</Label>
                    <p className="text-lg font-semibold mt-2">{timezoneInfo.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <Label>Current Time</Label>
                    <p className="text-xl font-bold mt-2">{timezoneInfo.currentTime}</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Globe className="w-6 h-6 mx-auto mb-2" />
                    <Label>Offset</Label>
                    <p className="text-xl font-bold mt-2">{timezoneInfo.offset}</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <Label>Abbreviation</Label>
                    <p className="text-xl font-bold mt-2">{timezoneInfo.abbreviation}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div>
                    <p className="font-semibold">Daylight Saving Time</p>
                    <p className="text-sm text-muted-foreground">
                      {timezoneInfo.isDST ? "Currently in effect" : "Not in effect"}
                    </p>
                  </div>
                  <Button variant="outline" onClick={copyToClipboard}>
                    {copied ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy Info
                  </Button>
                </div>

                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive map visualization</p>
                    <p className="text-sm">Location: {timezoneInfo.name}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Select a timezone from the list to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
