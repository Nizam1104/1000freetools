"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SpeedToPaceConverter() {
  const [speed, setSpeed] = useState<string>("");
  const [unit, setUnit] = useState<"km" | "mile">("km");
  const [pace, setPace] = useState<{min: number, sec: number} | null>(null);

  const calculate = () => {
    const s = parseFloat(speed);

    if (isNaN(s) || s <= 0) return;

    // Pace = 60 / speed (in min per unit)
    const totalMinutes = 60 / s;
    const min = Math.floor(totalMinutes);
    const sec = Math.round((totalMinutes - min) * 60);
    
    setPace({ min, sec });
  };

  const reset = () => {
    setSpeed("");
    setPace(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Speed to Pace Converter – Convert Speed to Running Pace Online</CardTitle>
          <CardDescription>
            Convert speed to pace instantly with our free tool. Whether you prefer km/h or mph, get your per-kilometer or per-mile pace in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Speed Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "km" | "mile")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">km/h → min/km</SelectItem>
                  <SelectItem value="mile">mph → min/mile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="speed">Speed</Label>
              <Input
                id="speed"
                type="number"
                step="0.1"
                placeholder={unit === "km" ? "e.g., 10" : "e.g., 6"}
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {pace !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Pace</p>
                <p className="text-4xl font-bold mt-1">
                  {pace.min}:{pace.sec.toString().padStart(2, "0")}
                </p>
                <p className="text-lg font-medium mt-1">
                  min/{unit === "km" ? "km" : "mile"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {speed} {unit === "km" ? "km/h" : "mph"} = {pace.min}:{pace.sec.toString().padStart(2, "0")} {unit === "km" ? "min/km" : "min/mile"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
