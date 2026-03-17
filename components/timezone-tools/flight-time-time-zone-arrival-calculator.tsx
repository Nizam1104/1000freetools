"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Plane, Clock, Globe } from "lucide-react";

const majorAirports = [
  { code: "JFK", city: "New York", timezone: "America/New_York" },
  { code: "LAX", city: "Los Angeles", timezone: "America/Los_Angeles" },
  { code: "ORD", city: "Chicago", timezone: "America/Chicago" },
  { code: "LHR", city: "London", timezone: "Europe/London" },
  { code: "CDG", city: "Paris", timezone: "Europe/Paris" },
  { code: "FRA", city: "Frankfurt", timezone: "Europe/Berlin" },
  { code: "DXB", city: "Dubai", timezone: "Asia/Dubai" },
  { code: "BOM", city: "Mumbai", timezone: "Asia/Kolkata" },
  { code: "NRT", city: "Tokyo", timezone: "Asia/Tokyo" },
  { code: "ICN", city: "Seoul", timezone: "Asia/Seoul" },
  { code: "PVG", city: "Shanghai", timezone: "Asia/Shanghai" },
  { code: "SIN", city: "Singapore", timezone: "Asia/Singapore" },
  { code: "SYD", city: "Sydney", timezone: "Australia/Sydney" },
  { code: "AKL", city: "Auckland", timezone: "Pacific/Auckland" },
  { code: "GRU", city: "Sao Paulo", timezone: "America/Sao_Paulo" },
  { code: "MEX", city: "Mexico City", timezone: "America/Mexico_City" },
];

// Average flight speeds and typical flight times (in hours) for reference
const flightSpeedMph = 550; // Average commercial flight speed

export default function FlightTimeZoneArrivalCalculator() {
  const [departureAirport, setDepartureAirport] = useState("JFK");
  const [arrivalAirport, setArrivalAirport] = useState("LHR");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("18:00");
  const [flightDuration, setFlightDuration] = useState("");
  const [result, setResult] = useState<{
    departureLocal: string;
    arrivalLocal: string;
    arrivalDate: string;
    flightDuration: string;
    timeDifference: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateArrival = useCallback(() => {
    if (!departureDate || !departureTime || !flightDuration) return;

    const departure = majorAirports.find((a) => a.code === departureAirport);
    const arrival = majorAirports.find((a) => a.code === arrivalAirport);
    if (!departure || !arrival) return;

    // Parse departure time
    const departureDateTime = new Date(`${departureDate}T${departureTime}:00`);
    
    // Parse flight duration (supports formats like "7", "7:30", "7.5")
    let durationHours: number;
    if (flightDuration.includes(":")) {
      const [hours, minutes] = flightDuration.split(":").map(Number);
      durationHours = hours + minutes / 60;
    } else {
      durationHours = parseFloat(flightDuration);
    }

    // Calculate arrival time in UTC
    const arrivalDateTime = new Date(departureDateTime.getTime() + durationHours * 60 * 60 * 1000);

    // Format departure time in local timezone
    const departureLocal = new Intl.DateTimeFormat("en-US", {
      timeZone: departure.timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(departureDateTime);

    // Format arrival time in destination timezone
    const arrivalLocal = new Intl.DateTimeFormat("en-US", {
      timeZone: arrival.timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(arrivalDateTime);

    // Format just the date for arrival
    const arrivalDateStr = new Intl.DateTimeFormat("en-US", {
      timeZone: arrival.timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(arrivalDateTime);

    // Calculate time difference
    const depOffsetStr = new Intl.DateTimeFormat("en-US", {
      timeZone: departure.timezone,
      timeZoneName: "shortOffset",
    }).formatToParts(departureDateTime);
    const arrOffsetStr = new Intl.DateTimeFormat("en-US", {
      timeZone: arrival.timezone,
      timeZoneName: "shortOffset",
    }).formatToParts(arrivalDateTime);
    
    const depOffset = depOffsetStr.find((p) => p.type === "timeZoneName")?.value || "";
    const arrOffset = arrOffsetStr.find((p) => p.type === "timeZoneName")?.value || "";

    setResult({
      departureLocal,
      arrivalLocal,
      arrivalDate: arrivalDateStr,
      flightDuration: `${Math.floor(durationHours)}h ${Math.round((durationHours % 1) * 60)}m`,
      timeDifference: `${depOffset} → ${arrOffset}`,
    });
  }, [departureAirport, arrivalAirport, departureDate, departureTime, flightDuration]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      const departure = majorAirports.find((a) => a.code === departureAirport);
      const arrival = majorAirports.find((a) => a.code === arrivalAirport);
      const text = `Flight Time Calculator

Departure:
${departure?.code} (${departure?.city}) - ${result.departureLocal}

Arrival:
${arrival?.code} (${arrival?.city}) - ${result.arrivalLocal}

Flight Duration: ${result.flightDuration}
Time Difference: ${result.timeDifference}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, departureAirport, arrivalAirport]);

  const departure = majorAirports.find((a) => a.code === departureAirport);
  const arrival = majorAirports.find((a) => a.code === arrivalAirport);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Flight Time & Time Zone Arrival Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departureAirport">Departure Airport</Label>
              <select
                id="departureAirport"
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {majorAirports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.code} - {airport.city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="arrivalAirport">Arrival Airport</Label>
              <select
                id="arrivalAirport"
                value={arrivalAirport}
                onChange={(e) => setArrivalAirport(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {majorAirports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.code} - {airport.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                id="departureTime"
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="flightDuration">Flight Duration</Label>
              <Input
                id="flightDuration"
                type="text"
                placeholder="e.g., 7:30 or 7.5"
                value={flightDuration}
                onChange={(e) => setFlightDuration(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">Hours:Minutes or decimal</p>
            </div>
          </div>

          <Button onClick={calculateArrival} className="w-full">
            <Clock className="w-4 h-4 mr-2" />
            Calculate Arrival Time
          </Button>

          {result && departure && arrival && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5" />
                  <h3 className="font-semibold">Flight Route</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{departure.code}</p>
                    <p className="text-sm text-muted-foreground">{departure.city}</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="border-t-2 border-dashed border-muted-foreground relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                        <Plane className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                    <p className="text-center text-sm mt-2">{result.flightDuration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{arrival.code}</p>
                    <p className="text-sm text-muted-foreground">{arrival.city}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Label>Departure (Local Time)</Label>
                  <p className="text-lg font-semibold mt-2">{result.departureLocal}</p>
                  <p className="text-sm text-muted-foreground">{departure.timezone}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Label>Arrival (Local Time)</Label>
                  <p className="text-lg font-semibold mt-2">{result.arrivalLocal}</p>
                  <p className="text-sm text-muted-foreground">{arrival.timezone}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <p className="font-semibold">Time Difference: {result.timeDifference}</p>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy Flight Details
              </Button>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Common Flight Durations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div>NYC → London: ~7h</div>
              <div>NYC → Tokyo: ~14h</div>
              <div>LA → Sydney: ~15h</div>
              <div>London → Dubai: ~7h</div>
              <div>Dubai → Mumbai: ~3h</div>
              <div>Singapore → Sydney: ~8h</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
