"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HikingPaceCalculatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [elevationGain, setElevationGain] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<string>("km");
  const [elevationUnit, setElevationUnit] = useState<string>("m");
  const [fitnessLevel, setFitnessLevel] = useState<string>("average");
  const [result, setResult] = useState<{
    baseTime: string;
    adjustedTime: string;
    pace: string;
    totalElevationGain: number;
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const elev = parseFloat(elevationGain);
    
    if (isNaN(dist) || isNaN(elev)) return;

    // Convert to km and meters
    let distanceKm = dist;
    let elevationM = elev;

    if (distanceUnit === "mi") distanceKm = dist * 1.60934;
    if (elevationUnit === "ft") elevationM = elev * 0.3048;

    // Naismith's Rule: 1 hour per 5km + 1 hour per 600m ascent
    const baseWalkingTime = distanceKm / 5; // hours
    const elevationTime = elevationM / 600; // hours
    const totalTimeHours = baseWalkingTime + elevationTime;

    // Apply fitness level modifier
    let fitnessModifier = 1;
    switch (fitnessLevel) {
      case "beginner": fitnessModifier = 1.5; break;
      case "average": fitnessModifier = 1; break;
      case "fit": fitnessModifier = 0.75; break;
      case "very_fit": fitnessModifier = 0.6; break;
    }

    const adjustedTimeHours = totalTimeHours * fitnessModifier;

    // Format time
    const formatTime = (hours: number) => {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      if (h === 0) return `${m} min`;
      if (m === 0) return `${h}h`;
      return `${h}h ${m}m`;
    };

    // Calculate pace (min/km)
    const paceMinPerKm = (adjustedTimeHours * 60) / distanceKm;

    setResult({
      baseTime: formatTime(totalTimeHours),
      adjustedTime: formatTime(adjustedTimeHours),
      pace: `${Math.round(paceMinPerKm)} min/km`,
      totalElevationGain: Math.round(elevationM)
    });
  };

  const reset = () => {
    setDistance("");
    setElevationGain("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Hiking Pace Calculator – Estimate Trail Time with Naismith's Rule</h1>
          <p className="text-muted-foreground">
            Plan your hike with confidence using our Hiking Pace Calculator. Enter trail distance, elevation gain, and your fitness level to estimate total hiking time using Naismith's Rule — helping you plan water, food, and daylight requirements accurately.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="distance">Distance</Label>
                  <Input 
                    id="distance" 
                    type="number" 
                    placeholder="e.g., 10" 
                    value={distance} 
                    onChange={(e) => setDistance(e.target.value)} 
                  />
                </div>
                <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilometers</SelectItem>
                    <SelectItem value="mi">Miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="elevation">Elevation Gain</Label>
                  <Input 
                    id="elevation" 
                    type="number" 
                    placeholder="e.g., 500" 
                    value={elevationGain} 
                    onChange={(e) => setElevationGain(e.target.value)} 
                  />
                </div>
                <Select value={elevationUnit} onValueChange={setElevationUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Meters</SelectItem>
                    <SelectItem value="ft">Feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fitness">Fitness Level</Label>
                <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (Slower pace, more breaks)</SelectItem>
                    <SelectItem value="average">Average (Moderate pace)</SelectItem>
                    <SelectItem value="fit">Fit (Brisk pace)</SelectItem>
                    <SelectItem value="very_fit">Very Fit (Fast pace, minimal breaks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Time
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Hiking Time</p>
                    <p className="text-4xl font-bold text-primary">{result.adjustedTime}</p>
                    <p className="text-xs text-muted-foreground mt-1">Base time (no breaks): {result.baseTime}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Elevation Gain</p>
                      <p className="text-lg font-semibold">{result.totalElevationGain} m</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Average Pace</p>
                      <p className="text-lg font-semibold">{result.pace}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Hiking Tip:</p>
                    <p className="text-sm">Naismith's Rule: Allow 1 hour per 5km walking + 1 hour per 600m ascent. Add 10-15 minutes per hour for rest breaks.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter trail details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
