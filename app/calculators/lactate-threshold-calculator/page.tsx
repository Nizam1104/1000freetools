"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LactateThresholdCalculator() {
  const [method, setMethod] = useState<"heartRate" | "pace" | "conconi">("heartRate");
  const [maxHeartRate, setMaxHeartRate] = useState<string>("");
  const [restingHeartRate, setRestingHeartRate] = useState<string>("");
  const [thresholdHeartRate, setThresholdHeartRate] = useState<string>("");
  const [thresholdPace, setThresholdPace] = useState<string>("");
  const [raceDistance, setRaceDistance] = useState<string>("");
  const [raceTime, setRaceTime] = useState<string>("");
  const [results, setResults] = useState<{
    thresholdHR?: number;
    thresholdPace?: string;
    zones?: { name: string; hrRange: string; paceRange?: string }[];
  } | null>(null);

  const calculateFromHeartRate = () => {
    const maxHR = parseFloat(maxHeartRate);
    const restingHR = parseFloat(restingHeartRate);

    if (isNaN(maxHR) || isNaN(restingHR)) return;

    // Lactate threshold is typically 80-90% of max HR or using Karvonen formula
    const hrReserve = maxHR - restingHR;
    const thresholdHR = Math.round(restingHR + hrReserve * 0.85);

    // Calculate zones
    const zones = [
      { name: "Zone 1 (Recovery)", hrRange: `${restingHR}-${Math.round(restingHR + hrReserve * 0.6)}` },
      { name: "Zone 2 (Aerobic)", hrRange: `${Math.round(restingHR + hrReserve * 0.6)}-${Math.round(restingHR + hrReserve * 0.7)}` },
      { name: "Zone 3 (Tempo)", hrRange: `${Math.round(restingHR + hrReserve * 0.7)}-${Math.round(restingHR + hrReserve * 0.8)}` },
      { name: "Zone 4 (Threshold)", hrRange: `${Math.round(restingHR + hrReserve * 0.8)}-${Math.round(restingHR + hrReserve * 0.9)}` },
      { name: "Zone 5 (VO2 Max)", hrRange: `${Math.round(restingHR + hrReserve * 0.9)}-${maxHR}` },
    ];

    setResults({ thresholdHR, zones });
  };

  const calculateFromPace = () => {
    const distance = parseFloat(raceDistance);
    const time = parseFloat(raceTime);

    if (isNaN(distance) || isNaN(time) || distance <= 0 || time <= 0) return;

    // Threshold pace is roughly the pace you can sustain for ~1 hour
    // For a race effort, threshold pace ≈ race pace for 10K-15K
    const pacePerKm = time / distance;
    const mins = Math.floor(pacePerKm);
    const secs = Math.round((pacePerKm - mins) * 60);
    const thresholdPaceStr = `${mins}:${String(secs).padStart(2, "0")}/km`;

    setResults({ thresholdPace: thresholdPaceStr });
  };

  const reset = () => {
    setMaxHeartRate("");
    setRestingHeartRate("");
    setThresholdHeartRate("");
    setThresholdPace("");
    setRaceDistance("");
    setRaceTime("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Method</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={method === "heartRate" ? "default" : "outline"}
                  onClick={() => setMethod("heartRate")}
                >
                  Heart Rate
                </Button>
                <Button
                  variant={method === "pace" ? "default" : "outline"}
                  onClick={() => setMethod("pace")}
                >
                  Race Pace
                </Button>
              </div>
            </div>

            {method === "heartRate" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxHR">Max Heart Rate (bpm)</Label>
                    <Input
                      id="maxHR"
                      type="number"
                      placeholder="e.g., 190"
                      value={maxHeartRate}
                      onChange={(e) => setMaxHeartRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
                    <Input
                      id="restingHR"
                      type="number"
                      placeholder="e.g., 60"
                      value={restingHeartRate}
                      onChange={(e) => setRestingHeartRate(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={calculateFromHeartRate}>Calculate Threshold</Button>
              </>
            )}

            {method === "pace" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="distance">Race Distance (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      placeholder="e.g., 10"
                      value={raceDistance}
                      onChange={(e) => setRaceDistance(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Race Time (minutes)</Label>
                    <Input
                      id="time"
                      type="number"
                      placeholder="e.g., 50"
                      value={raceTime}
                      onChange={(e) => setRaceTime(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={calculateFromPace}>Calculate Threshold Pace</Button>
              </>
            )}

            <Button variant="outline" onClick={reset}>Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                {results.thresholdHR && (
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Lactate Threshold HR</p>
                    <p className="text-4xl font-bold">{results.thresholdHR} bpm</p>
                  </div>
                )}
                {results.thresholdPace && (
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Threshold Pace</p>
                    <p className="text-4xl font-bold">{results.thresholdPace}</p>
                  </div>
                )}
                {results.zones && (
                  <div>
                    <p className="font-medium mb-2">Training Zones:</p>
                    <div className="space-y-2">
                      {results.zones.map((zone, i) => (
                        <div key={i} className="flex justify-between p-2 bg-background rounded">
                          <span>{zone.name}</span>
                          <span className="font-medium">{zone.hrRange} bpm</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
