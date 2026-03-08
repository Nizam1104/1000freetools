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

export default function GearRatioCalculator() {
  const [gears, setGears] = useState<{ driver: string; driven: string }[]>([{ driver: "", driven: "" }]);
  const [inputRpm, setInputRpm] = useState<string>("");
  const [inputTorque, setInputTorque] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const addGear = () => setGears([...gears, { driver: "", driven: "" }]);
  const removeGear = (i: number) => setGears(gears.filter((_, idx) => idx !== i));
  const updateGear = (i: number, field: string, val: string) => {
    const newGears = [...gears];
    (newGears[i] as any)[field] = val;
    setGears(newGears);
  };

  const calculate = () => {
    let totalRatio = 1;
    gears.forEach(g => {
      const d = parseFloat(g.driver);
      const D = parseFloat(g.driven);
      if (d > 0 && D > 0) totalRatio *= D / d;
    });

    const inputR = parseFloat(inputRpm);
    const inputT = parseFloat(inputTorque);

    if (totalRatio > 0) {
      const outputRpm = inputR > 0 ? inputR / totalRatio : null;
      const outputTorque = inputT > 0 ? inputT * totalRatio : null;

      setResults({
        ratio: totalRatio,
        outputRpm: outputRpm ? Math.round(outputRpm * 10) / 10 : null,
        outputTorque: outputTorque ? Math.round(outputTorque * 100) / 100 : null,
      });
    }
  };

  const reset = () => {
    setGears([{ driver: "", driven: "" }]);
    setInputRpm(""); setInputTorque(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            {gears.map((gear, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <Label>Driver Teeth</Label>
                  <Input type="number" value={gear.driver} onChange={e => updateGear(i, "driver", e.target.value)} placeholder="T₁" />
                </div>
                <div className="col-span-1 text-center pb-2">→</div>
                <div className="col-span-4">
                  <Label>Driven Teeth</Label>
                  <Input type="number" value={gear.driven} onChange={e => updateGear(i, "driven", e.target.value)} placeholder="T₂" />
                </div>
                <div className="col-span-2">
                  <Button variant="outline" size="sm" onClick={() => removeGear(i)} disabled={gears.length === 1}>×</Button>
                </div>
                <div className="col-span-1 text-center pb-2 text-sm text-muted-foreground">
                  {gear.driver && gear.driven ? `:${(parseFloat(gear.driven) / parseFloat(gear.driver)).toFixed(2)}` : ""}
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addGear}>+ Add Stage</Button>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Input RPM (optional)</Label><Input value={inputRpm} onChange={e => setInputRpm(e.target.value)} /></div>
              <div><Label>Input Torque (optional)</Label><Input value={inputTorque} onChange={e => setInputTorque(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Gear Ratio</p>
                  <p className="text-4xl font-bold">1 : {results.ratio.toFixed(2)}</p>
                </div>
                {results.outputRpm && (
                  <div>
                    <p className="text-sm text-muted-foreground">Output RPM</p>
                    <p className="text-3xl font-bold">{results.outputRpm}</p>
                  </div>
                )}
                {results.outputTorque && (
                  <div>
                    <p className="text-sm text-muted-foreground">Output Torque</p>
                    <p className="text-3xl font-bold">{results.outputTorque} N·m</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Gear Ratios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter the number of teeth on the driver gear (input) and driven gear (output) for each stage.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Optionally enter input RPM and torque to calculate output values.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see the total gear ratio, output RPM, and output torque.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Gear Ratios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is Gear Ratio</h4>
            <p className="text-sm text-muted-foreground">
              Gear ratio is the relationship between the number of teeth on two gears. If a 10-tooth gear drives a 30-tooth gear, the ratio is 3:1. The output turns once for every 3 input turns. You gain torque but lose speed. This is why low gears feel powerful but slow.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Speed vs Torque Trade-off</h4>
            <p className="text-sm text-muted-foreground">
              Gears trade speed for torque (or vice versa). A 4:1 ratio means output torque is 4x input torque, but output speed is 1/4 of input speed. This is why bicycles have multiple gears - low gears for climbing (high torque), high gears for speed on flats.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Multi-Stage Gear Trains</h4>
            <p className="text-sm text-muted-foreground">
              When gears are stacked in series, multiply individual ratios. A 3:1 stage followed by a 4:1 stage gives 12:1 total. This is how transmissions achieve wide ratio spreads - multiple gear pairs working together.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Gear Ratio Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application</TableHead>
                <TableHead>Typical Ratio</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Car 1st gear</TableCell>
                <TableCell className="font-mono">3.5:1</TableCell>
                <TableCell>Maximum torque for starting</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Car 5th gear</TableCell>
                <TableCell className="font-mono">0.8:1</TableCell>
                <TableCell>Overdrive for highway cruising</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bicycle low gear</TableCell>
                <TableCell className="font-mono">0.5:1</TableCell>
                <TableCell>Climbing steep hills</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bicycle high gear</TableCell>
                <TableCell className="font-mono">4:1</TableCell>
                <TableCell>Speed on flat terrain</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Electric drill</TableCell>
                <TableCell className="font-mono">10:1</TableCell>
                <TableCell>High torque for drilling</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Wind turbine gearbox</TableCell>
                <TableCell className="font-mono">50:1</TableCell>
                <TableCell>Slow blades to fast generator</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Ratios less than 1:1 are "overdrive" - output spins faster than input. Ratios greater than 1:1 are "reduction" - output spins slower with more torque.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you calculate gear ratio?</h4>
            <p className="text-sm text-muted-foreground">
              Divide driven gear teeth by driver gear teeth. A 40-tooth driven gear with a 10-tooth driver gives 40/10 = 4:1 ratio. The output turns once for every 4 input turns, with 4x the torque.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Does gear ratio affect horsepower?</h4>
            <p className="text-sm text-muted-foreground">
              No. Gears change torque and speed, but power (horsepower) stays the same (minus small friction losses). Power = Torque × Speed. If torque goes up 4x and speed goes down 4x, power is unchanged.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What is a 1:1 gear ratio?</h4>
            <p className="text-sm text-muted-foreground">
              A 1:1 ratio means input and output turn at the same speed with the same torque. This is called "direct drive." Many transmissions have 1:1 as one gear, usually 4th or 5th in manual transmissions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How do I choose the right gear ratio?</h4>
            <p className="text-sm text-muted-foreground">
              Match the ratio to your needs. Need more torque? Use a higher ratio (like 4:1). Need more speed? Use a lower ratio or overdrive (like 0.8:1). For vehicles, consider engine power band, vehicle weight, and intended use.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What is the difference between gear ratio and final drive ratio?</h4>
            <p className="text-sm text-muted-foreground">
              Gear ratio is for one gear pair. Final drive ratio is the differential ratio in a car. Total ratio = transmission gear ratio × final drive ratio. A 3:1 gear in a car with 4:1 final drive gives 12:1 total reduction.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
