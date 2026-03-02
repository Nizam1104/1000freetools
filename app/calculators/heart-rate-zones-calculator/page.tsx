"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Zone {
  name: string;
  min: number;
  max: number;
  description: string;
}

export default function HeartRateZonesCalculator() {
  const [age, setAge] = useState<string>("");
  const [zones, setZones] = useState<Zone[] | null>(null);

  const calculate = () => {
    const ageValue = parseFloat(age);
    if (isNaN(ageValue) || ageValue <= 0 || ageValue > 120) return;

    const maxHR = 220 - ageValue;

    const calculatedZones: Zone[] = [
      {
        name: "Zone 1 - Very Light",
        min: Math.round(maxHR * 0.50),
        max: Math.round(maxHR * 0.60),
        description: "Warm-up, recovery, and cool-down exercises"
      },
      {
        name: "Zone 2 - Light",
        min: Math.round(maxHR * 0.60),
        max: Math.round(maxHR * 0.70),
        description: "Fat burning and base fitness building"
      },
      {
        name: "Zone 3 - Moderate",
        min: Math.round(maxHR * 0.70),
        max: Math.round(maxHR * 0.80),
        description: "Aerobic endurance and cardiovascular fitness"
      },
      {
        name: "Zone 4 - Hard",
        min: Math.round(maxHR * 0.80),
        max: Math.round(maxHR * 0.90),
        description: "Anaerobic capacity and lactate threshold"
      },
      {
        name: "Zone 5 - Maximum",
        min: Math.round(maxHR * 0.90),
        max: Math.round(maxHR * 1.00),
        description: "Peak performance and maximum effort"
      }
    ];

    setZones(calculatedZones);
  };

  const reset = () => {
    setAge("");
    setZones(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate Zones Calculator – Find Your Target Heart Rate Zones</CardTitle>
          <CardDescription>
            Train smarter with our heart rate zones calculator. Discover your five heart rate training zones to optimize fat burn, aerobic fitness, and peak performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Zones</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {zones && (
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Estimated Maximum Heart Rate</p>
                  <p className="text-3xl font-bold mt-1">{220 - parseFloat(age)} <span className="text-lg font-normal">bpm</span></p>
                </div>

                <div className="space-y-2">
                  {zones.map((zone, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <p className="font-semibold">{zone.name}</p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {zone.min} - {zone.max} <span className="text-sm font-normal text-muted-foreground">bpm</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{zone.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
