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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface OhmsLawResult {
  voltage?: number;
  current?: number;
  resistance?: number;
  power?: number;
  unknown: string;
}

export default function OhmsLawCalculatorPage() {
  const [activeTab, setActiveTab] = useState<"voltage" | "current" | "resistance" | "power">("voltage");

  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [power, setPower] = useState<string>("");

  const [result, setResult] = useState<OhmsLawResult | null>(null);

  const calculateVoltage = () => {
    const curr = parseFloat(current);
    const res = parseFloat(resistance);
    if (isNaN(curr) || isNaN(res) || res === 0) return;

    const volt = curr * res;
    const pwr = curr * volt;

    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Voltage" });
  };

  const calculateCurrent = () => {
    const volt = parseFloat(voltage);
    const res = parseFloat(resistance);
    if (isNaN(volt) || isNaN(res) || res === 0) return;

    const curr = volt / res;
    const pwr = volt * curr;

    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Current" });
  };

  const calculateResistance = () => {
    const volt = parseFloat(voltage);
    const curr = parseFloat(current);
    if (isNaN(volt) || isNaN(curr) || curr === 0) return;

    const res = volt / curr;
    const pwr = volt * curr;

    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Resistance" });
  };

  const calculatePower = () => {
    const volt = parseFloat(voltage);
    const curr = parseFloat(current);
    if (isNaN(volt) || isNaN(curr)) return;

    const pwr = volt * curr;
    const res = volt / curr;

    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Power" });
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setResult(null);
  };

  useEffect(() => {
    reset();
  }, [activeTab]);

  const generateOhmsLawData = () => {
    const data = [];
    const v = parseFloat(voltage) || 12;
    const r = parseFloat(resistance) || 100;
    for (let i = 0; i <= 10; i++) {
      const voltagePoint = (v / 10) * i;
      const currentPoint = voltagePoint / r;
      data.push({
        voltage: voltagePoint.toFixed(1),
        current: (currentPoint * 1000).toFixed(1),
      });
    }
    return data;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Ohm's Law Calculator</CardTitle>
          <CardDescription>
            Calculate voltage, current, resistance, or power using Ohm's Law. Enter any two known values to find the unknown parameters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="voltage">Find Voltage</TabsTrigger>
              <TabsTrigger value="current">Find Current</TabsTrigger>
              <TabsTrigger value="resistance">Find Resistance</TabsTrigger>
              <TabsTrigger value="power">Find Power</TabsTrigger>
            </TabsList>

            <TabsContent value="voltage" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-v">Current (I)</Label>
                  <Input
                    id="current-v"
                    type="number"
                    placeholder="e.g., 2"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Amperes (A)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resistance-v">Resistance (R)</Label>
                  <Input
                    id="resistance-v"
                    type="number"
                    placeholder="e.g., 100"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Ohms (Ω)</p>
                </div>
              </div>
              <Button onClick={calculateVoltage} className="w-full">Calculate Voltage</Button>
            </TabsContent>

            <TabsContent value="current" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage-i">Voltage (V)</Label>
                  <Input
                    id="voltage-i"
                    type="number"
                    placeholder="e.g., 12"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Volts (V)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resistance-i">Resistance (R)</Label>
                  <Input
                    id="resistance-i"
                    type="number"
                    placeholder="e.g., 100"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Ohms (Ω)</p>
                </div>
              </div>
              <Button onClick={calculateCurrent} className="w-full">Calculate Current</Button>
            </TabsContent>

            <TabsContent value="resistance" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage-r">Voltage (V)</Label>
                  <Input
                    id="voltage-r"
                    type="number"
                    placeholder="e.g., 12"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Volts (V)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-r">Current (I)</Label>
                  <Input
                    id="current-r"
                    type="number"
                    placeholder="e.g., 0.5"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Amperes (A)</p>
                </div>
              </div>
              <Button onClick={calculateResistance} className="w-full">Calculate Resistance</Button>
            </TabsContent>

            <TabsContent value="power" className="space-y-4 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage-p">Voltage (V)</Label>
                  <Input
                    id="voltage-p"
                    type="number"
                    placeholder="e.g., 120"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Volts (V)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-p">Current (I)</Label>
                  <Input
                    id="current-p"
                    type="number"
                    placeholder="e.g., 5"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Amperes (A)</p>
                </div>
              </div>
              <Button onClick={calculatePower} className="w-full">Calculate Power</Button>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={reset} className="flex-1">
              Reset
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Results</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Voltage</p>
                  <p className="text-xl font-bold">{result.voltage!.toFixed(2)} V</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-xl font-bold">{result.current!.toFixed(3)} A</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Resistance</p>
                  <p className="text-xl font-bold">{result.resistance!.toFixed(2)} Ω</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Power</p>
                  <p className="text-xl font-bold">{result.power!.toFixed(2)} W</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Voltage vs Current Relationship</CardTitle>
            <CardDescription>Linear relationship according to Ohm's Law</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateOhmsLawData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="voltage" label={{ value: "Voltage (V)", position: "insideBottom", offset: -5 }} tick={{ fontSize: 12 }} />
                  <YAxis label={{ value: "Current (mA)", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="current" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Understanding Ohm's Law</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ohm's Law is the fundamental relationship between voltage, current, and resistance in electrical circuits. German physicist Georg Ohm published it in 1827. It states that current through a conductor is directly proportional to voltage and inversely proportional to resistance.
          </p>

          <div className="rounded-lg border p-4 bg-muted">
            <h4 className="font-semibold text-sm mb-2">The Core Formula</h4>
            <div className="font-mono text-sm space-y-2 text-center">
              <p className="text-lg font-bold">V = I × R</p>
              <p className="text-xs text-muted-foreground">Voltage = Current × Resistance</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Voltage (V)</h4>
              <p className="text-xs text-muted-foreground">
                Electrical pressure that pushes electrons through a circuit. Measured in volts. Think of it like water pressure in a pipe.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Current (I)</h4>
              <p className="text-xs text-muted-foreground">
                Flow rate of electrons through the circuit. Measured in amperes (amps). Like the volume of water flowing through a pipe.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Resistance (R)</h4>
              <p className="text-xs text-muted-foreground">
                Opposition to current flow. Measured in ohms (Ω). Similar to pipe diameter - narrower pipes restrict flow more.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ohm's Law Formula Wheel</CardTitle>
          <CardDescription>All variations of Ohm's Law and power formulas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>To Find</TableHead>
                <TableHead>Formula</TableHead>
                <TableHead>When You Know</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Voltage (V)</TableCell>
                <TableCell className="font-mono text-xs">V = I × R</TableCell>
                <TableCell className="text-xs">Current and Resistance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Voltage (V)</TableCell>
                <TableCell className="font-mono text-xs">V = P / I</TableCell>
                <TableCell className="text-xs">Power and Current</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Current (I)</TableCell>
                <TableCell className="font-mono text-xs">I = V / R</TableCell>
                <TableCell className="text-xs">Voltage and Resistance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Current (I)</TableCell>
                <TableCell className="font-mono text-xs">I = P / V</TableCell>
                <TableCell className="text-xs">Power and Voltage</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Resistance (R)</TableCell>
                <TableCell className="font-mono text-xs">R = V / I</TableCell>
                <TableCell className="text-xs">Voltage and Current</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Resistance (R)</TableCell>
                <TableCell className="font-mono text-xs">R = V² / P</TableCell>
                <TableCell className="text-xs">Voltage and Power</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Power (P)</TableCell>
                <TableCell className="font-mono text-xs">P = V × I</TableCell>
                <TableCell className="text-xs">Voltage and Current</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Power (P)</TableCell>
                <TableCell className="font-mono text-xs">P = I² × R</TableCell>
                <TableCell className="text-xs">Current and Resistance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Power (P)</TableCell>
                <TableCell className="font-mono text-xs">P = V² / R</TableCell>
                <TableCell className="text-xs">Voltage and Resistance</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Voltage and Current Scenarios</CardTitle>
          <CardDescription>Typical values for everyday electrical devices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Voltage</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Resistance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">AA Battery</TableCell>
                <TableCell className="font-mono text-xs">1.5V</TableCell>
                <TableCell className="text-xs">Varies by load</TableCell>
                <TableCell className="text-xs">Internal: ~0.15Ω</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Car Battery</TableCell>
                <TableCell className="font-mono text-xs">12V</TableCell>
                <TableCell className="text-xs">Up to 500A (starting)</TableCell>
                <TableCell className="text-xs">Internal: ~0.02Ω</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">USB Port</TableCell>
                <TableCell className="font-mono text-xs">5V</TableCell>
                <TableCell className="text-xs">0.5A - 3A</TableCell>
                <TableCell className="text-xs">Device dependent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">US Wall Outlet</TableCell>
                <TableCell className="font-mono text-xs">120V</TableCell>
                <TableCell className="text-xs">15A - 20A (circuit)</TableCell>
                <TableCell className="text-xs">Device dependent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">LED (typical)</TableCell>
                <TableCell className="font-mono text-xs">2-3V</TableCell>
                <TableCell className="font-mono text-xs">20mA</TableCell>
                <TableCell className="text-xs">~150Ω (with resistor)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">60W Light Bulb</TableCell>
                <TableCell className="font-mono text-xs">120V</TableCell>
                <TableCell className="font-mono text-xs">0.5A</TableCell>
                <TableCell className="font-mono text-xs">240Ω (hot)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practical Ohm's Law Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Example 1: Finding Current</h4>
            <p className="text-xs text-muted-foreground mb-2">
              You have a 12V battery connected to a 100Ω resistor. How much current flows?
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              I = V / R = 12V / 100Ω = 0.12A (120mA)
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Example 2: Choosing a Resistor for an LED</h4>
            <p className="text-xs text-muted-foreground mb-2">
              You want to power a 2V LED with a 9V battery at 20mA. What resistor do you need?
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <p>Voltage across resistor = 9V - 2V = 7V</p>
              <p>R = V / I = 7V / 0.02A = 350Ω</p>
              <p>Use nearest standard value: 330Ω or 390Ω</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Example 3: Power Dissipation</h4>
            <p className="text-xs text-muted-foreground mb-2">
              A 10Ω resistor has 2A flowing through it. How much power does it dissipate as heat?
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <p>P = I² × R = (2A)² × 10Ω = 4 × 10 = 40W</p>
              <p>You would need a 50W+ resistor to avoid burning it up!</p>
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
            <h4 className="font-semibold text-sm mb-2">Does Ohm's Law apply to all circuits?</h4>
            <p className="text-xs text-muted-foreground">
              Ohm's Law applies to ohmic materials - resistors, wires, and simple conductors. It does not directly apply to non-ohmic components like diodes, transistors, or LEDs, which have non-linear voltage-current relationships. For AC circuits with capacitors and inductors, you need to consider impedance instead of simple resistance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is current denoted by I?</h4>
            <p className="text-xs text-muted-foreground">
              The symbol I comes from the French phrase "intensité du courant" (current intensity), used by André-Marie Ampère in the early 1800s. The unit of current (ampere) is named after him. Voltage (V) and resistance (R) use more intuitive abbreviations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens if resistance is zero?</h4>
            <p className="text-xs text-muted-foreground">
              If resistance approaches zero, current approaches infinity according to I = V/R. This is a short circuit - extremely dangerous as it can cause fires or explosions. Superconductors have zero resistance but require special conditions (extreme cold) and have current limits.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate resistance for multiple resistors?</h4>
            <p className="text-xs text-muted-foreground">
              For series resistors: R_total = R1 + R2 + R3 + ... For parallel resistors: 1/R_total = 1/R1 + 1/R2 + 1/R3 + ... Two parallel resistors simplify to: R_total = (R1 × R2) / (R1 + R2). Series increases resistance; parallel decreases it.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use Ohm's Law for AC circuits?</h4>
            <p className="text-xs text-muted-foreground">
              For purely resistive AC circuits, yes. But most AC circuits have inductance and capacitance, creating reactance. You then use impedance (Z) instead of resistance: V = I × Z. Impedance combines resistance and reactance and depends on frequency.
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
            <a href="/calculators/resistance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Resistance Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate resistor values and combinations</p>
            </a>
            <a href="/calculators/power-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Power Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate electrical power consumption</p>
            </a>
            <a href="/calculators/led-resistor-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">LED Resistor Calculator</p>
              <p className="text-xs text-muted-foreground">Find the right resistor for your LED</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
