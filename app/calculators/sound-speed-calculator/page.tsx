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

            {/* How It Works Section */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-4">How to Calculate Sound Speed</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">1</div>
                  <h5 className="font-medium text-sm mb-1">Select Medium</h5>
                  <p className="text-xs text-muted-foreground">Choose air, water, steel, or enter custom properties.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">2</div>
                  <h5 className="font-medium text-sm mb-1">Enter Parameters</h5>
                  <p className="text-xs text-muted-foreground">For air: temperature. For others: bulk modulus and density.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">3</div>
                  <h5 className="font-medium text-sm mb-1">Get Result</h5>
                  <p className="text-xs text-muted-foreground">Instantly see sound speed in m/s and km/h.</p>
                </div>
              </div>
            </div>

            {/* Formula Section */}
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Sound Speed Formulas</h4>
              <p className="font-mono text-sm mb-2">For air: v = 331.3 + 0.606 × T (°C)</p>
              <p className="font-mono text-sm">For solids/liquids: v = √(K/ρ)</p>
              <p className="text-xs text-muted-foreground mt-2">Where K = bulk modulus, ρ = density</p>
            </div>

            {/* Reference Table */}
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Speed of Sound in Common Materials</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted rounded">Air (20°C): 343 m/s</div>
                <div className="p-2 bg-muted rounded">Water (20°C): 1,482 m/s</div>
                <div className="p-2 bg-muted rounded">Steel: 5,960 m/s</div>
                <div className="p-2 bg-muted rounded">Aluminum: 6,320 m/s</div>
                <div className="p-2 bg-muted rounded">Glass: 4,540 m/s</div>
                <div className="p-2 bg-muted rounded">Diamond: 12,000 m/s</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
