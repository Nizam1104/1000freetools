"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LedResistorCalculator() {
  const [supplyVoltage, setSupplyVoltage] = useState<string>("");
  const [ledVoltage, setLedVoltage] = useState<string>("");
  const [ledCurrent, setLedCurrent] = useState<string>("");
  const [numLeds, setNumLeds] = useState<string>("1");
  const [connection, setConnection] = useState<"series" | "parallel">("series");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Vs = parseFloat(supplyVoltage);
    const Vf = parseFloat(ledVoltage);
    const If = parseFloat(ledCurrent) / 1000; // Convert to Amps
    const n = parseInt(numLeds);

    if (Vs > 0 && Vf > 0 && If > 0 && n > 0) {
      let totalVf = Vf;
      let totalIf = If;

      if (connection === "series") {
        totalVf = Vf * n;
        if (totalVf >= Vs) {
          setResults({ error: "LED forward voltage exceeds supply voltage in series!" });
          return;
        }
      } else {
        totalIf = If * n;
      }

      const R = (Vs - totalVf) / totalIf;
      const power = totalIf * totalIf * R;
      const recommendedPower = power * 1.5; // 50% safety margin

      // Find standard resistor value
      const standardValues = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000];
      const standardR = standardValues.find(v => v >= R) || R;

      const actualCurrent = (Vs - totalVf) / standardR;

      setResults({
        resistance: R,
        standardResistance: standardR,
        power: power,
        recommendedPower: recommendedPower,
        actualCurrent: actualCurrent * 1000,
      });
    }
  };

  const reset = () => {
    setSupplyVoltage(""); setLedVoltage(""); setLedCurrent(""); setNumLeds("1"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Supply Voltage (V)</Label><Input value={supplyVoltage} onChange={e => setSupplyVoltage(e.target.value)} /></div>
              <div><Label>LED Forward Voltage (V)</Label><Input value={ledVoltage} onChange={e => setLedVoltage(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>LED Current (mA)</Label><Input value={ledCurrent} onChange={e => setLedCurrent(e.target.value)} placeholder="e.g., 20" /></div>
              <div><Label>Number of LEDs</Label><Input type="number" value={numLeds} onChange={e => setNumLeds(e.target.value)} /></div>
            </div>
            <div>
              <Label>LED Connection</Label>
              <Select value={connection} onValueChange={(v) => setConnection(v as typeof connection)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="series">Series</SelectItem>
                  <SelectItem value="parallel">Parallel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Resistor</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results?.error ? (
              <div className="p-4 bg-destructive/10 rounded-md text-destructive">
                {results.error}
              </div>
            ) : results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Calculated Resistance</p>
                    <p className="text-3xl font-bold">{Math.round(results.resistance)} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Standard Resistor</p>
                    <p className="text-3xl font-bold">{results.standardResistance} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Power Dissipation</p>
                    <p className="text-xl font-bold">{Math.round(results.power * 1000) / 1000} W</p>
                    <p className="text-xs text-muted-foreground">Use {Math.round(results.recommendedPower * 2) / 2}W resistor</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Actual Current</p>
                    <p className="text-xl font-bold">{Math.round(results.actualCurrent * 10) / 10} mA</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate LED Resistor Value</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter your supply voltage and LED forward voltage (from the LED datasheet).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Specify the LED current (typically 20mA for standard LEDs) and number of LEDs.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Choose series or parallel connection, then calculate to get the resistor value and power rating.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding LED Current Limiting Resistors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why LEDs Need Resistors</h4>
            <p className="text-sm text-muted-foreground">
              LEDs have almost zero resistance once they turn on. Without a current-limiting resistor, they draw unlimited current and burn out instantly. The resistor drops the excess voltage and sets the current to a safe level. Think of it like a flow restrictor in a water pipe.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Series vs Parallel LED Connections</h4>
            <p className="text-sm text-muted-foreground mb-3">
              How you connect multiple LEDs changes the calculation:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Series Connection</p>
                <p className="text-xs text-muted-foreground">
                  LEDs share the same current. Voltages add up. More efficient - one resistor for all LEDs. But if one LED fails, all go dark. Supply voltage must exceed total LED forward voltage.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Parallel Connection</p>
                <p className="text-xs text-muted-foreground">
                  Each LED gets full supply voltage. Currents add up. Needs one resistor per LED for even current distribution. If one LED fails, others stay lit. Better for reliability.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">LED Forward Voltage by Color</h4>
            <p className="text-sm text-muted-foreground">
              Different LED colors have different forward voltages. Red LEDs drop about 2V, blue and white drop 3-3.5V. Always check your LED's datasheet for exact values - manufacturing variations can be ±0.2V.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>LED Forward Voltage Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>LED Color</TableHead>
                <TableHead>Typical Forward Voltage</TableHead>
                <TableHead>Typical Current</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Red</TableCell>
                <TableCell className="font-mono">1.8-2.2 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Orange</TableCell>
                <TableCell className="font-mono">2.0-2.2 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Yellow</TableCell>
                <TableCell className="font-mono">2.0-2.4 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Green</TableCell>
                <TableCell className="font-mono">2.2-3.0 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Blue</TableCell>
                <TableCell className="font-mono">3.0-3.5 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>White</TableCell>
                <TableCell className="font-mono">3.0-3.5 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Infrared</TableCell>
                <TableCell className="font-mono">1.2-1.5 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>UV</TableCell>
                <TableCell className="font-mono">3.0-4.0 V</TableCell>
                <TableCell className="font-mono">20 mA</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            High-power LEDs (1W, 3W, 5W) typically run at 350mA, 700mA, or 1A. Check datasheets for exact specifications.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resistor Power Rating Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Resistor Power Formula</h4>
            <p className="font-mono text-sm mb-2">P = I² × R</p>
            <p className="text-xs text-muted-foreground">
              Power dissipated by the resistor equals current squared times resistance. Always use a resistor rated for at least 2x the calculated power for safety margin.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Common Resistor Power Ratings</h4>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>1/8W (0.125W): Small signal circuits, low current LEDs</li>
              <li>1/4W (0.25W): Most common, good for standard LEDs</li>
              <li>1/2W (0.5W): Higher current applications</li>
              <li>1W and above: Power LEDs, high brightness applications</li>
            </ul>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Standard Resistor Values</h4>
            <p className="text-xs text-muted-foreground">
              Resistors come in standard values (E12/E24 series). If your calculation gives 150Ω, use 150Ω. If it gives 173Ω, round up to 180Ω. Using a slightly higher resistance reduces current slightly - safer for the LED.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What resistor do I need for a 12V LED?</h4>
            <p className="text-sm text-muted-foreground">
              For a 12V supply and a typical white LED (3.2V, 20mA), you need R = (12-3.2) / 0.02 = 440Ω. Use the standard 470Ω resistor. Power rating: P = 0.02² × 470 = 0.188W, so use a 1/4W or 1/2W resistor.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can I connect an LED directly to a battery?</h4>
            <p className="text-sm text-muted-foreground">
              Only if the battery voltage matches the LED forward voltage exactly - which almost never happens. A 3V coin cell might work briefly with a red LED, but the LED will dim quickly as the battery drains. Always use a resistor for reliable operation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Do I need a resistor for each LED in parallel?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, ideally. LEDs have manufacturing variations - one might draw more current and hog all the power, burning out first. Then the next one takes more current, and so on. One resistor per LED ensures even current distribution.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What happens if I use a resistor that's too big?</h4>
            <p className="text-sm text-muted-foreground">
              The LED will be dimmer because less current flows. It won't damage anything - in fact, running LEDs at 10-15mA instead of 20mA extends their life and saves power. Just don't expect maximum brightness.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate resistor value for multiple LEDs in series?</h4>
            <p className="text-sm text-muted-foreground">
              Add up all the LED forward voltages, then subtract from supply voltage. For example, three white LEDs (3.2V each) on 12V: R = (12 - 9.6) / 0.02 = 120Ω. Make sure supply voltage exceeds total LED voltage.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/ohms-law-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Ohm's Law Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate voltage, current, and resistance</p>
            </a>
            <a href="/calculators/electric-power-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Electric Power Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate power dissipation</p>
            </a>
            <a href="/calculators/resistance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Resistance Calculator</p>
              <p className="text-xs text-muted-foreground">Find resistor values and combinations</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
