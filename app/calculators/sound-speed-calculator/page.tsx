"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SoundSpeedCalculator() {
  const [medium, setMedium] = useState<"air" | "water" | "steel" | "custom">("air");
  const [temperature, setTemperature] = useState<string>("");
  const [bulkModulus, setBulkModulus] = useState<string>("");
  const [density, setDensity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    if (medium === "air" && temperature) {
      const T = parseFloat(temperature);
      // v = 331.3 + 0.606 × T (°C)
      const v = 331.3 + 0.606 * T;
      setResults({ speed: Math.round(v * 10) / 10 });
    } else if (bulkModulus && density) {
      const K = parseFloat(bulkModulus);
      const ρ = parseFloat(density);
      if (K > 0 && ρ > 0) {
        const v = Math.sqrt(K / ρ);
        setResults({ speed: Math.round(v * 10) / 10 });
      }
    }
  };

  const handleMediumChange = (m: string) => {
    setMedium(m as typeof medium);
    if (m === "air") { setBulkModulus(""); setDensity(""); }
    else if (m === "water") { setBulkModulus("2.2e9"); setDensity("1000"); }
    else if (m === "steel") { setBulkModulus("160e9"); setDensity("7850"); }
  };

  const reset = () => {
    setMedium("air"); setTemperature(""); setBulkModulus(""); setDensity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sound Speed Calculator – Calculate Speed of Sound</CardTitle>
          <CardDescription>
            Calculate the speed of sound in various media. For air, enter temperature. For other media, use bulk modulus and density.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Medium</Label>
              <Select value={medium} onValueChange={handleMediumChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="air">Air (use temperature)</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {medium === "air" ? (
              <div>
                <Label>Temperature (°C)</Label>
                <Input value={temperature} onChange={e => setTemperature(e.target.value)} placeholder="e.g., 20" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Bulk Modulus K (Pa)</Label><Input value={bulkModulus} onChange={e => setBulkModulus(e.target.value)} /></div>
                <div><Label>Density ρ (kg/m³)</Label><Input value={density} onChange={e => setDensity(e.target.value)} /></div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Speed</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Speed of Sound</p>
                <p className="text-4xl font-bold">{results.speed} m/s</p>
                <p className="text-sm text-muted-foreground mt-2">≈ {Math.round(results.speed * 3.6)} km/h</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
