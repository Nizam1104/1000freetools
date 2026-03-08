"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ElectricalLoadCalculator() {
  const [voltage, setVoltage] = useState<string>("");
  const [loads, setLoads] = useState<{ name: string; watts: string }[]>([{ name: "", watts: "" }]);
  const [results, setResults] = useState<any>(null);

  const addLoad = () => setLoads([...loads, { name: "", watts: "" }]);
  const removeLoad = (i: number) => setLoads(loads.filter((_, idx) => idx !== i));
  const updateLoad = (i: number, field: string, val: string) => {
    const newLoads = [...loads];
    (newLoads[i] as any)[field] = val;
    setLoads(newLoads);
  };

  const calculate = () => {
    const V = parseFloat(voltage);
    let totalWatts = 0;

    loads.forEach(l => {
      const w = parseFloat(l.watts);
      if (w > 0) totalWatts += w;
    });

    if (V > 0 && totalWatts > 0) {
      const current = totalWatts / V;
      const breaker = current * 1.25;
      const wireAmpacity = current * 1.25;

      setResults({
        totalWatts,
        current: Math.round(current * 100) / 100,
        breaker: Math.ceil(breaker * 10) / 10,
        wireAmpacity: Math.round(wireAmpacity),
      });
    }
  };

  const reset = () => {
    setVoltage("");
    setLoads([{ name: "", watts: "" }]);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>System Voltage (V)</Label>
              <Input value={voltage} onChange={e => setVoltage(e.target.value)} placeholder="e.g., 120, 230, 400" />
            </div>

            {loads.map((load, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-7">
                  <Label>Load</Label>
                  <Input value={load.name} onChange={e => updateLoad(i, "name", e.target.value)} placeholder="Device name" />
                </div>
                <div className="col-span-4">
                  <Label>Watts</Label>
                  <Input type="number" value={load.watts} onChange={e => updateLoad(i, "watts", e.target.value)} placeholder="W" />
                </div>
                <div className="col-span-1">
                  <Button variant="outline" size="sm" onClick={() => removeLoad(i)} disabled={loads.length === 1}>×</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addLoad}>+ Add Load</Button>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Load</p>
                    <p className="text-2xl font-bold">{results.totalWatts} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Draw</p>
                    <p className="text-2xl font-bold">{results.current} A</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Breaker Size</p>
                    <p className="text-3xl font-bold">{results.breaker} A</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Min Wire Ampacity</p>
                    <p className="text-2xl font-bold">{results.wireAmpacity} A</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Electrical Load</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter your system voltage (120V, 230V, or 400V depending on your region and application).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Add all devices connected to the circuit with their wattage ratings.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see total load, current draw, recommended breaker size, and minimum wire ampacity.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Electrical Load Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is Electrical Load</h4>
            <p className="text-sm text-muted-foreground">
              Electrical load is the total power consumed by all devices on a circuit. Think of it like passengers in an elevator - each device adds weight, and the circuit has a maximum capacity. Exceeding that capacity trips the breaker or, worse, overheats wires.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why Load Calculations Matter</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Proper load calculations prevent three common problems:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li><strong>Nuisance tripping:</strong> Breakers that trip randomly because the load exceeds 80% of rating for continuous use</li>
              <li><strong>Overheated wires:</strong> Undersized wires get hot and can start fires inside walls</li>
              <li><strong>Code violations:</strong> Electrical codes require specific safety margins that this calculator applies automatically</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">The 80% Rule Explained</h4>
            <p className="text-sm text-muted-foreground">
              Electrical codes require circuits to be sized at 125% of continuous load (anything running 3+ hours). A 15A circuit should only carry 12A of continuous load. This gives a safety margin so wires stay cool and breakers don't trip unnecessarily.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Circuit Capacity Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Breaker Rating</TableHead>
                <TableHead>Max Continuous Load (80%)</TableHead>
                <TableHead>Max Power at 120V</TableHead>
                <TableHead>Max Power at 230V</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">15 A</TableCell>
                <TableCell className="font-mono">12 A</TableCell>
                <TableCell className="font-mono">1,440 W</TableCell>
                <TableCell className="font-mono">2,760 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">20 A</TableCell>
                <TableCell className="font-mono">16 A</TableCell>
                <TableCell className="font-mono">1,920 W</TableCell>
                <TableCell className="font-mono">3,680 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">25 A</TableCell>
                <TableCell className="font-mono">20 A</TableCell>
                <TableCell className="font-mono">2,400 W</TableCell>
                <TableCell className="font-mono">4,600 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">30 A</TableCell>
                <TableCell className="font-mono">24 A</TableCell>
                <TableCell className="font-mono">2,880 W</TableCell>
                <TableCell className="font-mono">5,520 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">40 A</TableCell>
                <TableCell className="font-mono">32 A</TableCell>
                <TableCell className="font-mono">3,840 W</TableCell>
                <TableCell className="font-mono">7,360 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">50 A</TableCell>
                <TableCell className="font-mono">40 A</TableCell>
                <TableCell className="font-mono">4,800 W</TableCell>
                <TableCell className="font-mono">9,200 W</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Continuous loads (3+ hours) must not exceed 80% of breaker rating per NEC and IEC standards.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typical Device Wattages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { device: "Phone Charger", watts: 5 },
                  { device: "LED Bulb", watts: 10 },
                  { device: "Laptop", watts: 65 },
                  { device: "TV 55\"", watts: 120 },
                  { device: "Refrigerator", watts: 200 },
                  { device: "Microwave", watts: 1000 },
                  { device: "Space Heater", watts: 1500 },
                  { device: "Hair Dryer", watts: 1800 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: "Watts", position: "insideBottom", offset: -5 }} />
                <YAxis type="category" dataKey="device" width={100} />
                <Tooltip formatter={(value: number) => `${value} W`} />
                <Bar dataKey="watts" fill="#3b82f6" name="Power (W)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">
            Common household device wattages. Add up all devices on a circuit to check if you're within safe limits.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wire Size and Breaker Selection Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Breaker Sizing Formula</h4>
            <p className="font-mono text-sm mb-2">Breaker Rating ≥ Load Current × 1.25</p>
            <p className="text-xs text-muted-foreground">
              Multiply your total current by 1.25 to get the minimum breaker size. Round up to the nearest standard rating (15A, 20A, 25A, 30A, etc.).
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Wire Ampacity Requirements</h4>
            <p className="font-mono text-sm mb-2">Wire Ampacity ≥ Load Current × 1.25</p>
            <p className="text-xs text-muted-foreground mb-2">
              Wire must handle the same 125% of continuous load as the breaker. Common copper wire ratings at 60°C:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>14 AWG: 15 A (for 15A circuits)</li>
              <li>12 AWG: 20 A (for 20A circuits)</li>
              <li>10 AWG: 30 A (for 30A circuits)</li>
              <li>8 AWG: 40-50 A (for 40-50A circuits)</li>
            </ul>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Voltage Drop Considerations</h4>
            <p className="text-xs text-muted-foreground">
              For runs over 100 feet, increase wire size to reduce voltage drop. More than 3% voltage drop wastes energy and can damage motors. Use a voltage drop calculator for long runs.
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
            <h4 className="font-semibold text-sm mb-2">How do I calculate electrical load for a circuit?</h4>
            <p className="text-sm text-muted-foreground">
              Add up the wattage of all devices on the circuit, then divide by voltage to get current. For continuous loads, multiply by 1.25. A 15A circuit at 120V handles 1,800W total, or 1,440W for continuous use.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What size breaker do I need for my load?</h4>
            <p className="text-sm text-muted-foreground">
              Divide total watts by voltage to get amps, then multiply by 1.25 for continuous loads. Round up to standard breaker sizes: 15A, 20A, 25A, 30A, 40A, or 50A. Always match wire size to breaker rating.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can I put multiple outlets on one breaker?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but the total load from all outlets cannot exceed the breaker rating. A 20A circuit can have 10-12 outlets, but you need to consider what devices will plug in. Kitchen and bathroom outlets require dedicated 20A circuits.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why does my breaker keep tripping?</h4>
            <p className="text-sm text-muted-foreground">
              Either the load exceeds the breaker rating, or the breaker is old and weak. Check your total wattage - a space heater (1,500W) plus hair dryer (1,500W) on a 15A circuit will trip it. If load is fine, the breaker may need replacement.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What wire size for a 20 amp circuit?</h4>
            <p className="text-sm text-muted-foreground">
              Use 12 AWG copper wire for 20A circuits. This is standard for kitchen, bathroom, and outdoor receptacles. For runs over 100 feet, consider 10 AWG to reduce voltage drop.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
