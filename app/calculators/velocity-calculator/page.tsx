"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

export default function VelocityCalculator() {
  const [displacement, setDisplacement] = useState<string>("");
  const [displacementUnit, setDisplacementUnit] = useState<"m" | "km" | "miles">("m");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"s" | "min" | "hours">("s");
  const [velocity, setVelocity] = useState<number | null>(null);
  const [outputUnit, setOutputUnit] = useState<"m/s" | "km/h" | "mph">("m/s");
  const [direction, setDirection] = useState<"positive" | "negative">("positive");
  const [graphData, setGraphData] = useState<any[]>([]);

  const convertToMeters = (value: number, unit: string): number => {
    switch (unit) {
      case "km": return value * 1000;
      case "miles": return value * 1609.34;
      default: return value;
    }
  };

  const convertToSeconds = (value: number, unit: string): number => {
    switch (unit) {
      case "min": return value * 60;
      case "hours": return value * 3600;
      default: return value;
    }
  };

  const convertFromMps = (value: number, unit: string): number => {
    switch (unit) {
      case "km/h": return value * 3.6;
      case "mph": return value * 2.23694;
      default: return value;
    }
  };

  const calculate = () => {
    const d = parseFloat(displacement);
    const t = parseFloat(time);

    if (isNaN(d) || isNaN(t) || t <= 0) return;

    const displacementInMeters = convertToMeters(Math.abs(d), displacementUnit);
    const timeInSeconds = convertToSeconds(t, timeUnit);

    const velocityInMps = displacementInMeters / timeInSeconds;
    const convertedVelocity = convertFromMps(velocityInMps, outputUnit);

    setVelocity(Math.round(convertedVelocity * 100) / 100);
    setDirection(d < 0 ? "negative" : "positive");
    generateVelocityGraph(displacementInMeters, timeInSeconds);
  };

  const generateVelocityGraph = (d: number, t: number) => {
    const data = [];
    for (let i = 0; i <= 10; i++) {
      const timePoint = (t / 10) * i;
      const displacementAtTime = (d / t) * timePoint;
      data.push({
        time: Math.round(timePoint * 100) / 100,
        displacement: Math.round(displacementAtTime * 100) / 100,
        velocity: Math.round((d / t) * 100) / 100,
      });
    }
    setGraphData(data);
  };

  const reset = () => {
    setDisplacement("");
    setTime("");
    setVelocity(null);
    setDirection("positive");
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="displacement">Displacement</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="displacement"
                    type="number"
                    placeholder="e.g., 100"
                    value={displacement}
                    onChange={(e) => setDisplacement(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={displacementUnit} onValueChange={(v) => setDisplacementUnit(v as "m" | "km" | "miles")}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="km">km</SelectItem>
                      <SelectItem value="miles">miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="time"
                    type="number"
                    placeholder="e.g., 10"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as "s" | "min" | "hours")}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">s</SelectItem>
                      <SelectItem value="min">min</SelectItem>
                      <SelectItem value="hours">hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label>Output Unit</Label>
              <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as "m/s" | "km/h" | "mph")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m/s">m/s</SelectItem>
                  <SelectItem value="km/h">km/h</SelectItem>
                  <SelectItem value="mph">mph</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Velocity</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {velocity !== null && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Velocity</p>
                  <p className="text-4xl font-bold mt-1">
                    {velocity} {outputUnit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Direction:</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                    direction === "positive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {direction === "positive" ? "→" : "←"} {direction === "positive" ? "Positive" : "Negative"}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground font-mono">Formula: v = Δx / Δt</p>
                </div>
              </div>
            )}
          </div>

          {graphData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Displacement vs Time</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    displacement: { label: "Displacement (m)", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis label={{ value: "Time (s)", position: "insideBottom", offset: -5 }} dataKey="time" />
                      <YAxis label={{ value: "Displacement (m)", angle: -90, position: "insideLeft" }} dataKey="displacement" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="displacement" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                The slope of the displacement-time graph equals velocity. Constant velocity = straight line.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Velocity vs Speed: What's the Difference?</CardTitle>
          <CardDescription>Understanding vector vs scalar quantities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Speed tells you how fast. Velocity tells you how fast AND which direction. Speed is a scalar (magnitude only). Velocity is a vector (magnitude + direction). This distinction matters in physics because direction affects outcomes.
          </p>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Example: Round Trip</h4>
            <p className="text-xs text-muted-foreground">
              You drive 100 km north in 1 hour, then 100 km south in 1 hour. Your average speed is 100 km/h (200 km ÷ 2 h). But your average velocity is 0 km/h – you ended up where you started, so net displacement is zero.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Negative velocity doesn't mean "slower" – it means moving in the opposite direction. If positive is east, -50 m/s means 50 m/s west. The speed is still 50 m/s in both cases.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Velocity Unit Conversions</CardTitle>
          <CardDescription>Common velocity units compared</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Equals 1 m/s</TableHead>
                <TableHead>Common Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">m/s</TableCell>
                <TableCell className="font-mono text-xs">1 m/s</TableCell>
                <TableCell className="text-xs">SI unit, physics</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">km/h</TableCell>
                <TableCell className="font-mono text-xs">3.6 km/h</TableCell>
                <TableCell className="text-xs">Road speeds (most countries)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">mph</TableCell>
                <TableCell className="font-mono text-xs">2.24 mph</TableCell>
                <TableCell className="text-xs">Road speeds (US, UK)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">knots</TableCell>
                <TableCell className="font-mono text-xs">1.94 knots</TableCell>
                <TableCell className="text-xs">Aviation, maritime</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ft/s</TableCell>
                <TableCell className="font-mono text-xs">3.28 ft/s</TableCell>
                <TableCell className="text-xs">Engineering (US)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mach</TableCell>
                <TableCell className="font-mono text-xs">~0.0029 Mach</TableCell>
                <TableCell className="text-xs">Aircraft speeds</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Mach 1 = speed of sound ≈ 343 m/s at sea level. Varies with temperature and altitude.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typical Velocities in Nature and Technology</CardTitle>
          <CardDescription>Reference values for context</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Object/Phenomenon</TableHead>
                <TableHead>Velocity</TableHead>
                <TableHead>Context</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Walking human</TableCell>
                <TableCell className="font-mono text-xs">1.4 m/s (5 km/h)</TableCell>
                <TableCell className="text-xs">Casual walking pace</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sprinting human</TableCell>
                <TableCell className="font-mono text-xs">10 m/s (36 km/h)</TableCell>
                <TableCell className="text-xs">Usain Bolt's top speed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Highway car</TableCell>
                <TableCell className="font-mono text-xs">28 m/s (100 km/h)</TableCell>
                <TableCell className="text-xs">Typical highway speed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Commercial jet</TableCell>
                <TableCell className="font-mono text-xs">250 m/s (900 km/h)</TableCell>
                <TableCell className="text-xs">Cruising speed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Speed of sound</TableCell>
                <TableCell className="font-mono text-xs">343 m/s (1235 km/h)</TableCell>
                <TableCell className="text-xs">At sea level, 20°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Earth orbiting Sun</TableCell>
                <TableCell className="font-mono text-xs">29,780 m/s</TableCell>
                <TableCell className="text-xs">Average orbital velocity</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Light (vacuum)</TableCell>
                <TableCell className="font-mono text-xs">299,792,458 m/s</TableCell>
                <TableCell className="text-xs">Universal speed limit</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Can velocity be negative?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Negative velocity means moving in the opposite direction from your defined positive axis. If you define east as positive, a car going west at 50 km/h has velocity -50 km/h. The speed (magnitude) is still 50 km/h.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between average and instantaneous velocity?</h4>
            <p className="text-xs text-muted-foreground">
              Average velocity = total displacement ÷ total time. Instantaneous velocity = velocity at a specific moment. Your car's speedometer shows instantaneous speed. If you drive 100 km in 2 hours, your average velocity is 50 km/h, even though you varied speed throughout.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is acceleration related to velocity?</h4>
            <p className="text-xs text-muted-foreground">
              Acceleration is the rate of change of velocity. a = Δv / Δt. Positive acceleration means velocity is increasing. Negative acceleration (deceleration) means velocity is decreasing. An object can have zero velocity but non-zero acceleration (like a ball at the top of its trajectory).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why use displacement instead of distance?</h4>
            <p className="text-xs text-muted-foreground">
              Displacement is the straight-line change in position (a vector). Distance is the total path length traveled (a scalar). Velocity uses displacement because it describes how position changes. A race car completing a lap has traveled distance but zero displacement – and therefore zero average velocity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is terminal velocity?</h4>
            <p className="text-xs text-muted-foreground">
              Terminal velocity is the constant speed a falling object reaches when air resistance equals gravitational force. For a skydiver in belly-down position, it's about 55 m/s (200 km/h). In a head-first dive, it can reach 90 m/s. With a parachute, it drops to about 5-7 m/s.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
