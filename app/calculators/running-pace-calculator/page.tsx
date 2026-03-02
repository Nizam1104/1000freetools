"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Flag, Timer, Info } from "lucide-react";

interface PaceResult {
  pacePerMile: string;
  pacePerKm: string;
  totalMinutes: number;
  speedMph: number;
  speedKmh: number;
}

interface SpeedResult {
  distance: number;
  time: string;
  pace: string;
}

export default function RunningPaceCalculatorPage() {
  const [activeTab, setActiveTab] = useState<"pace" | "speed" | "time">("pace");
  
  const [distance, setDistance] = useState<string>("");
  const [timeHours, setTimeHours] = useState<string>("");
  const [timeMinutes, setTimeMinutes] = useState<string>("");
  const [timeSeconds, setTimeSeconds] = useState<string>("");
  const [paceMinutes, setPaceMinutes] = useState<string>("");
  const [paceSeconds, setPaceSeconds] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  
  const [paceResult, setPaceResult] = useState<PaceResult | null>(null);
  const [speedResult, setSpeedResult] = useState<SpeedResult | null>(null);
  const [timeResult, setTimeResult] = useState<{ time: string; finishTime: string } | null>(null);

  const calculatePace = () => {
    const dist = parseFloat(distance);
    const hours = parseFloat(timeHours) || 0;
    const mins = parseFloat(timeMinutes) || 0;
    const secs = parseFloat(timeSeconds) || 0;

    if (isNaN(dist) || dist === 0) return;

    const totalMinutes = hours * 60 + mins + secs / 60;
    const paceMinPerMile = distanceUnit === "miles" ? totalMinutes / dist : totalMinutes / (dist * 0.621371);
    const paceMinPerKm = distanceUnit === "km" ? totalMinutes / dist : totalMinutes / (dist * 1.60934);

    const paceMinsMile = Math.floor(paceMinPerMile);
    const paceSecsMile = Math.round((paceMinPerMile - paceMinsMile) * 60);

    const paceMinsKm = Math.floor(paceMinPerKm);
    const paceSecsKm = Math.round((paceMinPerKm - paceMinsKm) * 60);

    const speedMph = distanceUnit === "miles" ? dist / (totalMinutes / 60) : (dist * 0.621371) / (totalMinutes / 60);
    const speedKmh = distanceUnit === "km" ? dist / (totalMinutes / 60) : (dist * 1.60934) / (totalMinutes / 60);

    setPaceResult({
      pacePerMile: `${paceMinsMile}:${paceSecsMile.toString().padStart(2, '0')} /mi`,
      pacePerKm: `${paceMinsKm}:${paceSecsKm.toString().padStart(2, '0')} /km`,
      totalMinutes,
      speedMph: Math.round(speedMph * 100) / 100,
      speedKmh: Math.round(speedKmh * 100) / 100,
    });
  };

  const calculateSpeed = () => {
    const paceMins = parseFloat(paceMinutes) || 0;
    const paceSecs = parseFloat(paceSeconds) || 0;
    const dist = parseFloat(distance) || 1;

    const totalPaceMinutes = paceMins + paceSecs / 60;

    const distanceInMiles = distanceUnit === "miles" ? dist : dist * 0.621371;
    const speedMph = distanceInMiles / (totalPaceMinutes / 60);

    const timeForDistance = totalPaceMinutes * dist;
    const timeStr = formatTime(timeForDistance);

    const paceStr = `${paceMins}:${paceSecs.toString().padStart(2, '0')} /${distanceUnit === "miles" ? "mi" : "km"}`;

    setSpeedResult({
      distance: dist,
      time: timeStr,
      pace: paceStr,
    });
  };

  const calculateTime = () => {
    const dist = parseFloat(distance);
    const paceMins = parseFloat(paceMinutes) || 0;
    const paceSecs = parseFloat(paceSeconds) || 0;

    if (isNaN(dist) || dist === 0) return;

    const totalPaceMinutes = paceMins + paceSecs / 60;
    const totalTimeMinutes = totalPaceMinutes * dist;

    const timeStr = formatTime(totalTimeMinutes);

    const now = new Date();
    const finishDate = new Date(now.getTime() + totalTimeMinutes * 60000);
    const finishTime = finishDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTimeResult({
      time: timeStr,
      finishTime,
    });
  };

  const formatTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.floor(totalMinutes % 60);
    const secs = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60);

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
      return `${mins}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const reset = () => {
    setDistance("");
    setTimeHours("");
    setTimeMinutes("");
    setTimeSeconds("");
    setPaceMinutes("");
    setPaceSeconds("");
    setPaceResult(null);
    setSpeedResult(null);
    setTimeResult(null);
  };

  useEffect(() => {
    if (activeTab === "pace") calculatePace();
    else if (activeTab === "speed") calculateSpeed();
    else calculateTime();
  }, [distance, timeHours, timeMinutes, timeSeconds, paceMinutes, paceSeconds, distanceUnit, activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Running Pace Calculator – Calculate Your Running Speed & Finish Time</h1>
          <p className="text-muted-foreground">
            Calculate your running pace, speed, and estimated finish times with our comprehensive Running Pace Calculator. Perfect for runners training for 5K, 10K, half marathon, or marathon distances.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="pace">Calculate Pace</TabsTrigger>
                  <TabsTrigger value="speed">Calculate Speed</TabsTrigger>
                  <TabsTrigger value="time">Calculate Time</TabsTrigger>
                </TabsList>

                <TabsContent value="pace" className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold">Find Your Pace</h3>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="distance-p">Distance</Label>
                      <div className="flex gap-2">
                        <Input
                          id="distance-p"
                          type="number"
                          placeholder="e.g., 5"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          className="flex-1"
                        />
                        <Select value={distanceUnit} onValueChange={(v) => setDistanceUnit(v as "miles" | "km")}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="miles">Miles</SelectItem>
                            <SelectItem value="km">Km</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hours">Hours</Label>
                      <Input
                        id="hours"
                        type="number"
                        placeholder="0"
                        value={timeHours}
                        onChange={(e) => setTimeHours(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minutes">Minutes</Label>
                      <Input
                        id="minutes"
                        type="number"
                        placeholder="e.g., 30"
                        value={timeMinutes}
                        onChange={(e) => setTimeMinutes(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seconds">Seconds</Label>
                      <Input
                        id="seconds"
                        type="number"
                        placeholder="0"
                        value={timeSeconds}
                        onChange={(e) => setTimeSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="speed" className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold">Find Your Speed</h3>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="distance-s">Distance</Label>
                      <div className="flex gap-2">
                        <Input
                          id="distance-s"
                          type="number"
                          placeholder="e.g., 10"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          className="flex-1"
                        />
                        <Select value={distanceUnit} onValueChange={(v) => setDistanceUnit(v as "miles" | "km")}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="miles">Miles</SelectItem>
                            <SelectItem value="km">Km</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pace-mins">Pace (min)</Label>
                      <Input
                        id="pace-mins"
                        type="number"
                        placeholder="e.g., 8"
                        value={paceMinutes}
                        onChange={(e) => setPaceMinutes(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pace-secs">Pace (sec)</Label>
                      <Input
                        id="pace-secs"
                        type="number"
                        placeholder="e.g., 30"
                        value={paceSeconds}
                        onChange={(e) => setPaceSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="time" className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold">Find Your Finish Time</h3>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="distance-t">Distance</Label>
                      <div className="flex gap-2">
                        <Input
                          id="distance-t"
                          type="number"
                          placeholder="e.g., 26.2"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          className="flex-1"
                        />
                        <Select value={distanceUnit} onValueChange={(v) => setDistanceUnit(v as "miles" | "km")}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="miles">Miles</SelectItem>
                            <SelectItem value="km">Km</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pace-mins-t">Pace (min)</Label>
                      <Input
                        id="pace-mins-t"
                        type="number"
                        placeholder="e.g., 9"
                        value={paceMinutes}
                        onChange={(e) => setPaceMinutes(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pace-secs-t">Pace (sec)</Label>
                      <Input
                        id="pace-secs-t"
                        type="number"
                        placeholder="e.g., 0"
                        value={paceSeconds}
                        onChange={(e) => setPaceSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={reset} variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {activeTab === "pace" && paceResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Pace / Mile</p>
                      <p className="text-lg font-bold text-primary">{paceResult.pacePerMile}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">Pace / Km</p>
                      <p className="text-lg font-bold text-primary">{paceResult.pacePerKm}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Speed (mph)</p>
                      <p className="text-lg font-bold">{paceResult.speedMph}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Speed (km/h)</p>
                      <p className="text-lg font-bold">{paceResult.speedKmh}</p>
                    </div>
                  </div>
                </div>
              ) : activeTab === "speed" && speedResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Time for {speedResult.distance} {distanceUnit}</p>
                    <p className="text-3xl font-bold text-primary">{speedResult.time}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Pace</p>
                    <p className="text-xl font-bold">{speedResult.pace}</p>
                  </div>
                </div>
              ) : activeTab === "time" && timeResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Finish Time</p>
                    <p className="text-3xl font-bold text-primary">{timeResult.time}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Finish at (starting now)</p>
                    <p className="text-xl font-bold">{timeResult.finishTime}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Timer className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter values to calculate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Common Race Distances
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-semibold">5K</p>
                <p className="text-muted-foreground">3.1 miles / 5 km</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-semibold">10K</p>
                <p className="text-muted-foreground">6.2 miles / 10 km</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-semibold">Half Marathon</p>
                <p className="text-muted-foreground">13.1 miles / 21.1 km</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-semibold">Marathon</p>
                <p className="text-muted-foreground">26.2 miles / 42.2 km</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-semibold">50K Ultra</p>
                <p className="text-muted-foreground">31.1 miles / 50 km</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-semibold">50 Miler</p>
                <p className="text-muted-foreground">50 miles / 80.5 km</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
