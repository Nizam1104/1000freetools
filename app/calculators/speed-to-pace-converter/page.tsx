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

            {/* How It Works Section */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-4">How to Convert Speed to Pace</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">1</div>
                  <h5 className="font-medium text-sm mb-1">Select Unit</h5>
                  <p className="text-xs text-muted-foreground">Choose km/h for metric or mph for imperial pace.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">2</div>
                  <h5 className="font-medium text-sm mb-1">Enter Speed</h5>
                  <p className="text-xs text-muted-foreground">Input your running or cycling speed.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">3</div>
                  <h5 className="font-medium text-sm mb-1">Get Pace</h5>
                  <p className="text-xs text-muted-foreground">See your per-km or per-mile pace instantly.</p>
                </div>
              </div>
            </div>

            {/* Formula Section */}
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Pace Formula</h4>
              <p className="font-mono text-sm">Pace (min/unit) = 60 ÷ Speed (unit/h)</p>
              <p className="text-xs text-muted-foreground mt-2">Example: 10 km/h = 60 ÷ 10 = 6:00 min/km</p>
            </div>

            {/* Pace Reference Table */}
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Common Running Paces</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1">Speed</th>
                      <th className="text-left py-1">Pace (km)</th>
                      <th className="text-left py-1">Pace (mile)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-1">8 km/h (5 mph)</td>
                      <td className="py-1">7:30</td>
                      <td className="py-1">12:04</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1">10 km/h (6.2 mph)</td>
                      <td className="py-1">6:00</td>
                      <td className="py-1">9:39</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1">12 km/h (7.5 mph)</td>
                      <td className="py-1">5:00</td>
                      <td className="py-1">8:03</td>
                    </tr>
                    <tr>
                      <td className="py-1">15 km/h (9.3 mph)</td>
                      <td className="py-1">4:00</td>
                      <td className="py-1">6:26</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
