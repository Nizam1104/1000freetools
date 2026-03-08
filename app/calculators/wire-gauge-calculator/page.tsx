"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WireGaugeCalculator() {
  const [current, setCurrent] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [material, setMaterial] = useState<"copper" | "aluminum">("copper");
  const [voltageDrop, setVoltageDrop] = useState<string>("3");
  const [results, setResults] = useState<any>(null);

  // AWG data: [diameter mm, area mm², resistance Ω/km for copper]
  const awgData: Record<string, [number, number, number]> = {
    14: [1.63, 2.08, 8.29],
    12: [2.05, 3.31, 5.21],
    10: [2.59, 5.26, 3.28],
    8: [3.26, 8.37, 2.06],
    6: [4.11, 13.3, 1.30],
    4: [5.19, 21.1, 0.82],
    2: [6.54, 33.6, 0.52],
    1: [7.35, 42.4, 0.41],
    0: [8.25, 53.5, 0.32],
    "00": [9.27, 67.4, 0.26],
    "000": [10.4, 85.0, 0.20],
    "0000": [11.7, 107.2, 0.16],
  };

  const calculate = () => {
    const I = parseFloat(current);
    const L = parseFloat(length);
    const V = parseFloat(voltage);
    const maxDrop = parseFloat(voltageDrop) / 100;

    if (I > 0 && L > 0 && V > 0) {
      const maxVoltageDrop = V * maxDrop;
      const maxResistance = maxVoltageDrop / (2 * I); // Round trip
      const maxResistancePerKm = (maxResistance / (2 * L)) * 1000;

      // Find appropriate AWG
      let selectedAWG = 14;
      const multiplier = material === "aluminum" ? 1.6 : 1;

      for (const [awg, [diam, area, res]] of Object.entries(awgData)) {
        if (res * multiplier <= maxResistancePerKm) {
          selectedAWG = parseFloat(awg) || 0;
          break;
        }
      }

      const awgInfo = awgData[String(selectedAWG)] || awgData[14];
      const actualDrop = (2 * L * (awgInfo[2] * (material === "aluminum" ? 1.6 : 1))) / 1000 * I;

      setResults({
        awg: selectedAWG,
        diameter: awgInfo[0],
        area: awgInfo[1],
        voltageDrop: actualDrop,
        dropPercent: (actualDrop / V) * 100,
      });
    }
  };

  const reset = () => {
    setCurrent(""); setLength(""); setVoltage(""); setVoltageDrop("3"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Current (A)</Label><Input value={current} onChange={e => setCurrent(e.target.value)} /></div>
              <div><Label>One-way Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>System Voltage (V)</Label><Input value={voltage} onChange={e => setVoltage(e.target.value)} /></div>
              <div>
                <Label>Material</Label>
                <Select value={material} onValueChange={(v) => setMaterial(v as typeof material)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copper">Copper</SelectItem>
                    <SelectItem value="aluminum">Aluminum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Max Voltage Drop (%)</Label>
              <Input value={voltageDrop} onChange={e => setVoltageDrop(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Recommended: 3% for branch circuits, 5% total</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Wire Size</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended Wire</p>
                    <p className="text-4xl font-bold">AWG {results.awg}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diameter</p>
                    <p className="text-2xl font-bold">{results.diameter} mm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cross-section</p>
                    <p className="text-2xl font-bold">{results.area} mm²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Actual Voltage Drop</p>
                    <p className="text-xl font-bold">{Math.round(results.voltageDrop * 100) / 100}V ({Math.round(results.dropPercent * 10) / 10}%)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Wire Gauge</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Current & Length</h3>
              <p className="text-sm text-muted-foreground">Input the current (amps) and wire run length for your circuit.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Set Voltage & Drop Limit</h3>
              <p className="text-sm text-muted-foreground">Enter system voltage and maximum acceptable voltage drop percentage.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Recommended AWG</h3>
              <p className="text-sm text-muted-foreground">See the recommended wire gauge with actual voltage drop results.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Wire Gauge Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**AWG Selection**</h3>
            <p className="text-sm text-muted-foreground">Recommends proper American Wire Gauge from 14 AWG to 4/0 AWG.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Material Options**</h3>
            <p className="text-sm text-muted-foreground">Support for both copper and aluminum wire calculations.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Voltage Drop Analysis**</h3>
            <p className="text-sm text-muted-foreground">Calculates actual voltage drop to ensure code compliance.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**NEC Guidelines**</h3>
            <p className="text-sm text-muted-foreground">Uses standard 3% voltage drop recommendation for branch circuits.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What wire gauge do I need?</h3>
            <p className="text-sm text-muted-foreground">Wire gauge depends on current, length, and voltage. Higher current and longer runs need thicker wire (lower AWG number). This calculator determines the proper size for your application.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is voltage drop?</h3>
            <p className="text-sm text-muted-foreground">Voltage drop is the reduction in voltage as electricity travels through wire. NEC recommends max 3% drop for branch circuits, 5% total from service to load.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Copper vs aluminum wire?</h3>
            <p className="text-sm text-muted-foreground">Copper conducts better and is more durable but costs more. Aluminum is cheaper but needs larger gauge for same current. Aluminum requires special connectors and anti-oxidant paste.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What does AWG mean?</h3>
            <p className="text-sm text-muted-foreground">AWG (American Wire Gauge) is the standard wire sizing system. Counterintuitively, smaller numbers = thicker wire. 14 AWG is thinner than 10 AWG. 0000 (4/0) is very thick.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why does wire length matter?</h3>
            <p className="text-sm text-muted-foreground">Longer wires have more resistance, causing more voltage drop and heat. Double the length = double the resistance. Long runs need thicker wire to compensate.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
