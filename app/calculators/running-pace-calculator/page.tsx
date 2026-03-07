"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

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

  const racePaceData = paceResult
    ? [
        { distance: "5K", time: formatTime(paceResult.totalMinutes * (5 / (distanceUnit === "km" ? parseFloat(distance) : parseFloat(distance) * 1.60934))) },
        { distance: "10K", time: formatTime(paceResult.totalMinutes * (10 / (distanceUnit === "km" ? parseFloat(distance) : parseFloat(distance) * 1.60934))) },
        { distance: "Half", time: formatTime(paceResult.totalMinutes * (21.1 / (distanceUnit === "km" ? parseFloat(distance) : parseFloat(distance) * 1.60934))) },
        { distance: "Full", time: formatTime(paceResult.totalMinutes * (42.2 / (distanceUnit === "km" ? parseFloat(distance) : parseFloat(distance) * 1.60934))) },
      ]
    : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
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

          {activeTab === "pace" && paceResult && (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Pace / Mile</p>
                <p className="text-2xl font-bold">{paceResult.pacePerMile}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Pace / Km</p>
                <p className="text-2xl font-bold">{paceResult.pacePerKm}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Speed (mph)</p>
                <p className="text-2xl font-bold">{paceResult.speedMph}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Speed (km/h)</p>
                <p className="text-2xl font-bold">{paceResult.speedKmh}</p>
              </div>
            </div>
          )}

          {activeTab === "speed" && speedResult && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Time for {speedResult.distance} {distanceUnit}</p>
                <p className="text-3xl font-bold text-primary">{speedResult.time}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Pace</p>
                <p className="text-2xl font-bold">{speedResult.pace}</p>
              </div>
            </div>
          )}

          {activeTab === "time" && timeResult && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Finish Time</p>
                <p className="text-3xl font-bold text-primary">{timeResult.time}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Finish at (starting now)</p>
                <p className="text-2xl font-bold">{timeResult.finishTime}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {paceResult && racePaceData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Projected Race Times</CardTitle>
            <CardDescription>Estimated finish times at your current pace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  time: {
                    label: "Time",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={racePaceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="distance" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="time" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Understanding Running Pace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Running pace is the time it takes to cover a specific distance, usually expressed as minutes per mile or minutes per kilometer. Unlike speed (which measures distance per time), pace tells you how long each unit of distance takes - more intuitive for runners planning races.
          </p>

          <div className="rounded-lg border p-4 bg-muted">
            <h4 className="font-semibold text-sm mb-2">Pace vs Speed</h4>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-semibold mb-1">Pace (min/mile or min/km)</p>
                <p className="text-muted-foreground">Lower is faster. An 8:00/mile pace is quicker than a 10:00/mile pace. Used by runners for training and racing.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Speed (mph or km/h)</p>
                <p className="text-muted-foreground">Higher is faster. 7.5 mph is quicker than 6 mph. Common in fitness apps and treadmills.</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            A good running pace depends on your fitness level, age, and the distance you are running. Sprinting pace might be 5:00/km for a fit adult, while marathon pace could be 6:30/km. Beginners often start around 8-10 min/km (13-16 min/mile).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Race Distances</CardTitle>
          <CardDescription>Standard running race distances</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Race</TableHead>
                <TableHead>Distance (Miles)</TableHead>
                <TableHead>Distance (Kilometers)</TableHead>
                <TableHead>Typical Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">5K</TableCell>
                <TableCell className="font-mono text-xs">3.1 mi</TableCell>
                <TableCell className="font-mono text-xs">5 km</TableCell>
                <TableCell className="text-xs">Beginner races, speed work</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">10K</TableCell>
                <TableCell className="font-mono text-xs">6.2 mi</TableCell>
                <TableCell className="font-mono text-xs">10 km</TableCell>
                <TableCell className="text-xs">Intermediate distance, endurance building</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Half Marathon</TableCell>
                <TableCell className="font-mono text-xs">13.1 mi</TableCell>
                <TableCell className="font-mono text-xs">21.1 km</TableCell>
                <TableCell className="text-xs">Popular goal race, requires training</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Marathon</TableCell>
                <TableCell className="font-mono text-xs">26.2 mi</TableCell>
                <TableCell className="font-mono text-xs">42.2 km</TableCell>
                <TableCell className="text-xs">Ultimate endurance challenge</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">50K Ultra</TableCell>
                <TableCell className="font-mono text-xs">31.1 mi</TableCell>
                <TableCell className="font-mono text-xs">50 km</TableCell>
                <TableCell className="text-xs">Entry-level ultramarathon</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">50 Miler</TableCell>
                <TableCell className="font-mono text-xs">50 mi</TableCell>
                <TableCell className="font-mono text-xs">80.5 km</TableCell>
                <TableCell className="text-xs">Advanced ultramarathon</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">100 Miler</TableCell>
                <TableCell className="font-mono text-xs">100 mi</TableCell>
                <TableCell className="font-mono text-xs">160.9 km</TableCell>
                <TableCell className="text-xs">Elite ultramarathon distance</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pace Guidelines by Runner Level</CardTitle>
          <CardDescription>Average paces for different experience levels (per mile)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>5K Pace</TableHead>
                <TableHead>10K Pace</TableHead>
                <TableHead>Half Marathon Pace</TableHead>
                <TableHead>Marathon Pace</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Beginner</TableCell>
                <TableCell className="font-mono text-xs">11:00-13:00</TableCell>
                <TableCell className="font-mono text-xs">11:30-13:30</TableCell>
                <TableCell className="font-mono text-xs">12:00-14:00</TableCell>
                <TableCell className="font-mono text-xs">12:30-14:30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Intermediate</TableCell>
                <TableCell className="font-mono text-xs">9:00-11:00</TableCell>
                <TableCell className="font-mono text-xs">9:30-11:30</TableCell>
                <TableCell className="font-mono text-xs">10:00-12:00</TableCell>
                <TableCell className="font-mono text-xs">10:30-12:30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Advanced</TableCell>
                <TableCell className="font-mono text-xs">7:00-9:00</TableCell>
                <TableCell className="font-mono text-xs">7:30-9:30</TableCell>
                <TableCell className="font-mono text-xs">8:00-10:00</TableCell>
                <TableCell className="font-mono text-xs">8:30-10:30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Elite</TableCell>
                <TableCell className="font-mono text-xs">&lt;6:00</TableCell>
                <TableCell className="font-mono text-xs">&lt;6:30</TableCell>
                <TableCell className="font-mono text-xs">&lt;7:00</TableCell>
                <TableCell className="font-mono text-xs">&lt;7:30</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Paces are per mile. Women's paces average 1-2 minutes slower per mile than men's at equivalent levels. Age also affects pace - runners typically peak in their 20s-30s and gradually slow with age.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Training Pace Zones</CardTitle>
          <CardDescription>Different paces for different training purposes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Easy/Recovery Pace</h4>
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-mono bg-muted px-2 py-1 rounded">2-3 min/mile slower than 5K pace</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Comfortable conversational pace. Should feel easy - you can speak in full sentences. Builds aerobic base and aids recovery between hard workouts.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Tempo/Threshold Pace</h4>
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-mono bg-muted px-2 py-1 rounded">25-30 sec/mile slower than 5K pace</span>
              </p>
              <p className="text-xs text-muted-foreground">
                "Comfortably hard" - you can speak short phrases but not full sentences. Improves lactate threshold, allowing you to sustain faster paces longer.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Interval/VO2 Max Pace</h4>
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-mono bg-muted px-2 py-1 rounded">Same as 3K-5K race pace</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Hard effort - can only speak a few words. Typically done in repeats of 400m to 1600m with rest intervals. Increases maximum oxygen uptake.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Marathon Pace</h4>
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-mono bg-muted px-2 py-1 rounded">15-25 sec/mile slower than tempo</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Goal marathon race pace. Should feel steady but sustainable for hours. Practice this pace in long runs before race day.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a good 5K pace for beginners?</h4>
            <p className="text-xs text-muted-foreground">
              Most beginners run 5K at 11-13 minutes per mile (6:50-8:00 min/km). If you are new to running, aim to finish rather than hit a specific time. Many Couch to 5K graduates finish in 35-45 minutes. With training, you can gradually improve to sub-30 minutes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I improve my running pace?</h4>
            <p className="text-xs text-muted-foreground">
              Mix easy runs with speed work. Add one interval session per week (like 6 × 400m at faster than 5K pace). Include tempo runs at threshold pace. Most importantly, run most miles (80%) at easy pace - this builds the aerobic base that makes faster running possible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is my pace slower on hills?</h4>
            <p className="text-xs text-muted-foreground">
              Gravity works against you uphill. A 5% grade can slow your pace by 30-60 seconds per mile even at the same effort. Focus on effort, not pace, on hills. Shorten your stride and increase cadence. Downhill running is easier on pace but harder on your legs - control your descent.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I use a running watch or phone app?</h4>
            <p className="text-xs text-muted-foreground">
              GPS watches are more accurate than phones for pace tracking, especially in areas with tree cover or buildings. But don't become a slave to the data. Some runs should be by feel. Try running without watching your pace occasionally - it builds better intuition about effort levels.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is this pace calculator?</h4>
            <p className="text-xs text-muted-foreground">
              The calculator gives exact mathematical projections based on your input. Real race times vary due to fitness, weather, course elevation, and race-day conditions. Use it as a guide, not a guarantee. A well-trained runner might run slightly faster than projected; beginners might need more conservative estimates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
