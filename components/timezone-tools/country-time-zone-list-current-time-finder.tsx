"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Globe, Clock, Search } from "lucide-react";

interface CountryTimezone {
  country: string;
  code: string;
  timezones: string[];
}

const countriesData: CountryTimezone[] = [
  { country: "United States", code: "US", timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu"] },
  { country: "United Kingdom", code: "GB", timezones: ["Europe/London"] },
  { country: "France", code: "FR", timezones: ["Europe/Paris"] },
  { country: "Germany", code: "DE", timezones: ["Europe/Berlin"] },
  { country: "Italy", code: "IT", timezones: ["Europe/Rome"] },
  { country: "Spain", code: "ES", timezones: ["Europe/Madrid"] },
  { country: "Russia", code: "RU", timezones: ["Europe/Moscow", "Asia/Vladivostok", "Asia/Kamchatka"] },
  { country: "China", code: "CN", timezones: ["Asia/Shanghai"] },
  { country: "Japan", code: "JP", timezones: ["Asia/Tokyo"] },
  { country: "India", code: "IN", timezones: ["Asia/Kolkata"] },
  { country: "Australia", code: "AU", timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Perth", "Australia/Adelaide", "Australia/Darwin"] },
  { country: "Brazil", code: "BR", timezones: ["America/Sao_Paulo", "America/Manaus", "America/Fortaleza"] },
  { country: "Canada", code: "CA", timezones: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax"] },
  { country: "Mexico", code: "MX", timezones: ["America/Mexico_City", "America/Tijuana", "America/Cancun"] },
  { country: "South Korea", code: "KR", timezones: ["Asia/Seoul"] },
  { country: "Singapore", code: "SG", timezones: ["Asia/Singapore"] },
  { country: "United Arab Emirates", code: "AE", timezones: ["Asia/Dubai"] },
  { country: "South Africa", code: "ZA", timezones: ["Africa/Johannesburg"] },
  { country: "New Zealand", code: "NZ", timezones: ["Pacific/Auckland"] },
  { country: "Argentina", code: "AR", timezones: ["America/Argentina/Buenos_Aires"] },
];

export default function CountryTimeZoneListCurrentTimeFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryTimezone | null>(null);
  const [currentTime, setCurrentTime] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      if (selectedCountry) {
        selectedCountry.timezones.forEach((tz) => {
          times[tz] = new Intl.DateTimeFormat("en-US", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            weekday: "short",
          }).format(new Date());
        });
      }
      setCurrentTime(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedCountry]);

  const filteredCountries = useCallback(() => {
    if (!searchQuery) return countriesData;
    return countriesData.filter((c) =>
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectCountry = useCallback((country: CountryTimezone) => {
    setSelectedCountry(country);
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!selectedCountry) return;
    try {
      let text = `Current Time in ${selectedCountry.country}\n\n`;
      selectedCountry.timezones.forEach((tz) => {
        text += `${tz}: ${currentTime[tz]}\n`;
      });
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [selectedCountry, currentTime]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Country List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search Country</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by country name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto space-y-2">
              {filteredCountries().map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCountry?.code === country.code
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{country.country}</span>
                    <span className="text-sm opacity-70">{country.code}</span>
                  </div>
                  <div className="text-xs opacity-60 mt-1">
                    {country.timezones.length} timezone{country.timezones.length !== 1 ? "s" : ""}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Current Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedCountry ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedCountry.country}</h2>
                      <p className="text-sm text-muted-foreground">Country Code: {selectedCountry.code}</p>
                    </div>
                    <Button variant="outline" onClick={copyToClipboard}>
                      {copied ? (
                        <Check className="w-4 h-4 mr-2" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      Copy Times
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCountry.timezones.map((tz) => (
                    <div key={tz} className="p-4 border rounded-lg">
                      <Label className="text-xs">{tz}</Label>
                      <p className="text-xl font-bold mt-2">{currentTime[tz]}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-semibold mb-2">Timezone Information</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCountry.country} has {selectedCountry.timezones.length} timezone
                    {selectedCountry.timezones.length !== 1 ? "s" : ""}. 
                    Times update in real-time.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Globe className="w-12 h-12 mx-auto mb-4" />
                <p>Select a country to view current time in all its timezones</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
