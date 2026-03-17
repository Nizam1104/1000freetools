"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Search, Clock, Globe } from "lucide-react";

interface TimezoneAbbreviation {
  abbreviation: string;
  timezone: string;
  offset: string;
  description: string;
  regions: string[];
}

const abbreviationDatabase: TimezoneAbbreviation[] = [
  { abbreviation: "UTC", timezone: "UTC", offset: "+00:00", description: "Coordinated Universal Time", regions: ["Global"] },
  { abbreviation: "GMT", timezone: "Europe/London", offset: "+00:00", description: "Greenwich Mean Time", regions: ["Europe", "Africa"] },
  { abbreviation: "BST", timezone: "Europe/London", offset: "+01:00", description: "British Summer Time", regions: ["Europe"] },
  { abbreviation: "EST", timezone: "America/New_York", offset: "-05:00", description: "Eastern Standard Time", regions: ["North America"] },
  { abbreviation: "EDT", timezone: "America/New_York", offset: "-04:00", description: "Eastern Daylight Time", regions: ["North America"] },
  { abbreviation: "CST", timezone: "America/Chicago", offset: "-06:00", description: "Central Standard Time", regions: ["North America", "Asia"] },
  { abbreviation: "CDT", timezone: "America/Chicago", offset: "-05:00", description: "Central Daylight Time", regions: ["North America"] },
  { abbreviation: "MST", timezone: "America/Denver", offset: "-07:00", description: "Mountain Standard Time", regions: ["North America"] },
  { abbreviation: "MDT", timezone: "America/Denver", offset: "-06:00", description: "Mountain Daylight Time", regions: ["North America"] },
  { abbreviation: "PST", timezone: "America/Los_Angeles", offset: "-08:00", description: "Pacific Standard Time", regions: ["North America"] },
  { abbreviation: "PDT", timezone: "America/Los_Angeles", offset: "-07:00", description: "Pacific Daylight Time", regions: ["North America"] },
  { abbreviation: "CET", timezone: "Europe/Paris", offset: "+01:00", description: "Central European Time", regions: ["Europe"] },
  { abbreviation: "CEST", timezone: "Europe/Paris", offset: "+02:00", description: "Central European Summer Time", regions: ["Europe"] },
  { abbreviation: "EET", timezone: "Europe/Helsinki", offset: "+02:00", description: "Eastern European Time", regions: ["Europe"] },
  { abbreviation: "EEST", timezone: "Europe/Helsinki", offset: "+03:00", description: "Eastern European Summer Time", regions: ["Europe"] },
  { abbreviation: "MSK", timezone: "Europe/Moscow", offset: "+03:00", description: "Moscow Standard Time", regions: ["Europe"] },
  { abbreviation: "IST", timezone: "Asia/Kolkata", offset: "+05:30", description: "India Standard Time", regions: ["Asia"] },
  { abbreviation: "GST", timezone: "Asia/Dubai", offset: "+04:00", description: "Gulf Standard Time", regions: ["Middle East"] },
  { abbreviation: "JST", timezone: "Asia/Tokyo", offset: "+09:00", description: "Japan Standard Time", regions: ["Asia"] },
  { abbreviation: "KST", timezone: "Asia/Seoul", offset: "+09:00", description: "Korea Standard Time", regions: ["Asia"] },
  { abbreviation: "CST", timezone: "Asia/Shanghai", offset: "+08:00", description: "China Standard Time", regions: ["Asia"] },
  { abbreviation: "HKT", timezone: "Asia/Hong_Kong", offset: "+08:00", description: "Hong Kong Time", regions: ["Asia"] },
  { abbreviation: "SGT", timezone: "Asia/Singapore", offset: "+08:00", description: "Singapore Time", regions: ["Asia"] },
  { abbreviation: "AEST", timezone: "Australia/Sydney", offset: "+10:00", description: "Australian Eastern Standard Time", regions: ["Oceania"] },
  { abbreviation: "AEDT", timezone: "Australia/Sydney", offset: "+11:00", description: "Australian Eastern Daylight Time", regions: ["Oceania"] },
  { abbreviation: "AWST", timezone: "Australia/Perth", offset: "+08:00", description: "Australian Western Standard Time", regions: ["Oceania"] },
  { abbreviation: "NZST", timezone: "Pacific/Auckland", offset: "+12:00", description: "New Zealand Standard Time", regions: ["Oceania"] },
  { abbreviation: "NZDT", timezone: "Pacific/Auckland", offset: "+13:00", description: "New Zealand Daylight Time", regions: ["Oceania"] },
  { abbreviation: "HST", timezone: "Pacific/Honolulu", offset: "-10:00", description: "Hawaii Standard Time", regions: ["Pacific"] },
  { abbreviation: "AKST", timezone: "America/Anchorage", offset: "-09:00", description: "Alaska Standard Time", regions: ["North America"] },
  { abbreviation: "AKDT", timezone: "America/Anchorage", offset: "-08:00", description: "Alaska Daylight Time", regions: ["North America"] },
  { abbreviation: "BRT", timezone: "America/Sao_Paulo", offset: "-03:00", description: "Brasilia Time", regions: ["South America"] },
  { abbreviation: "ART", timezone: "America/Argentina/Buenos_Aires", offset: "-03:00", description: "Argentina Time", regions: ["South America"] },
  { abbreviation: "CAT", timezone: "Africa/Johannesburg", offset: "+02:00", description: "Central Africa Time", regions: ["Africa"] },
  { abbreviation: "WAT", timezone: "Africa/Lagos", offset: "+01:00", description: "West Africa Time", regions: ["Africa"] },
  { abbreviation: "EAT", timezone: "Africa/Nairobi", offset: "+03:00", description: "East Africa Time", regions: ["Africa"] },
];

export default function TimeZoneAbbreviationLookupDecoder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"abbreviation" | "timezone">("abbreviation");
  const [results, setResults] = useState<TimezoneAbbreviation[]>([]);
  const [selectedResult, setSelectedResult] = useState<TimezoneAbbreviation | null>(null);
  const [copied, setCopied] = useState(false);

  const search = useCallback(() => {
    const query = searchQuery.toUpperCase().trim();
    if (!query) {
      setResults([]);
      setSelectedResult(null);
      return;
    }

    if (searchMode === "abbreviation") {
      const matches = abbreviationDatabase.filter((item) =>
        item.abbreviation.toUpperCase().includes(query)
      );
      setResults(matches);
      if (matches.length > 0) {
        setSelectedResult(matches[0]);
      }
    } else {
      const matches = abbreviationDatabase.filter((item) =>
        item.timezone.toLowerCase().includes(query.toLowerCase())
      );
      setResults(matches);
      if (matches.length > 0) {
        setSelectedResult(matches[0]);
      }
    }
  }, [searchQuery, searchMode]);

  const copyToClipboard = useCallback(async () => {
    if (!selectedResult) return;
    try {
      const text = `Abbreviation: ${selectedResult.abbreviation}
Timezone: ${selectedResult.timezone}
Offset: ${selectedResult.offset}
Description: ${selectedResult.description}
Regions: ${selectedResult.regions.join(", ")}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [selectedResult]);

  const getCurrentTime = useCallback((timezone: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Abbreviation Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Search Mode</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={searchMode === "abbreviation"}
                    onChange={() => setSearchMode("abbreviation")}
                  />
                  By Abbreviation
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={searchMode === "timezone"}
                    onChange={() => setSearchMode("timezone")}
                  />
                  By Timezone
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="search">
                {searchMode === "abbreviation" ? "Abbreviation" : "Timezone"}
              </Label>
              <div className="flex gap-2 mt-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    type="text"
                    placeholder={searchMode === "abbreviation" ? "e.g., EST, PST, GMT" : "e.g., America/New_York"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && search()}
                    className="pl-10"
                  />
                </div>
                <Button onClick={search}>Search</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Results</Label>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {results.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Enter a search term to find timezone abbreviations
                  </p>
                ) : (
                  results.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedResult(item)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedResult?.abbreviation === item.abbreviation
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold">{item.abbreviation}</span>
                          <span className="text-sm opacity-70 ml-2">{item.timezone}</span>
                        </div>
                        <span className="text-sm">{item.offset}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Abbreviation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedResult ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Abbreviation</Label>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-3xl font-bold">{selectedResult.abbreviation}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getCurrentTime(selectedResult.timezone)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Full Name</Label>
                    <p className="font-semibold">{selectedResult.description}</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Timezone</Label>
                    <p className="font-mono">{selectedResult.timezone}</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">UTC Offset</Label>
                    <p className="font-semibold">{selectedResult.offset}</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <Label className="text-xs">Regions</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedResult.regions.map((region, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-muted rounded text-sm"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button variant="outline" onClick={copyToClipboard} className="w-full">
                  {copied ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  Copy Details
                </Button>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4" />
                <p>Select an abbreviation to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Timezone Abbreviations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {abbreviationDatabase.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(item.abbreviation);
                  setSearchMode("abbreviation");
                  setSelectedResult(item);
                }}
                className="p-2 border rounded-lg hover:bg-muted text-left"
              >
                <div className="font-bold">{item.abbreviation}</div>
                <div className="text-xs text-muted-foreground">{item.offset}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
