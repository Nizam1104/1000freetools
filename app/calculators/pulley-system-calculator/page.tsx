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

export default function PulleySystemCalculator() {
  const [load, setLoad] = useState<string>("");
  const [pulleys, setPulleys] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const W = parseFloat(load);
    const n = parseInt(pulleys);

    if (W > 0 && n > 0) {
      // Ideal mechanical advantage = number of supporting rope segments
      const ma = n;
      const effort = W / ma;
      const ropeLength = W > 0 ? n : 0; // For 1m lift

      setResults({ ma, effort: Math.round(effort * 100) / 100, ropeLength });
    }
  };

  const reset = () => {
    setLoad(""); setPulleys(""); setResults(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Load Weight (kg)</Label><Input value={load} onChange={e => setLoad(e.target.value)} /></div>
              <div><Label>Number of Pulleys</Label><Input type="number" value={pulleys} onChange={e => setPulleys(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Mechanical Advantage</p>
                    <p className="text-3xl font-bold">{results.ma}:1</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Required Effort</p>
                    <p className="text-2xl font-bold">{results.effort} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rope per 1m Lift</p>
                    <p className="text-2xl font-bold">{results.ropeLength} m</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Pulley Systems Work</CardTitle>
          <CardDescription>Understanding mechanical advantage in block and tackle systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Count the Supporting Rope Segments</h4>
                <p className="text-sm text-muted-foreground">
                  The mechanical advantage equals the number of rope segments supporting the load. In a simple pulley system, each additional pulley adds another supporting segment, effectively dividing the required effort.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Calculate Required Effort</h4>
                <p className="text-sm text-muted-foreground">
                  Divide the load weight by the mechanical advantage to find the effort needed. A 4-pulley system gives you 4:1 advantage, meaning you only need to pull with 25% of the load weight.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Determine Rope Length</h4>
                <p className="text-sm text-muted-foreground">
                  The rope length needed equals the mechanical advantage multiplied by the lift height. For every meter you want to lift with a 4:1 system, you need to pull 4 meters of rope.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pulley System Features and Benefits</CardTitle>
          <CardDescription>Why use block and tackle systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Mechanical Advantage**</h4>
              <p className="text-xs text-muted-foreground">
                Reduce the force needed to lift heavy objects. A 6-pulley system lets you lift 600 kg with just 100 kg of effort, making impossible tasks manageable.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Direction Change**</h4>
              <p className="text-xs text-muted-foreground">
                Fixed pulleys redirect force, allowing you to pull down instead of lifting up. This uses your body weight and stronger muscle groups for better leverage.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Load Distribution**</h4>
              <p className="text-xs text-muted-foreground">
                Multiple rope segments share the load, reducing stress on individual components. This extends equipment life and improves safety margins.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Versatile Applications**</h4>
              <p className="text-xs text-muted-foreground">
                From construction cranes to sailing rigging, theater stages to gym equipment, pulley systems are everywhere. Simple to set up, reliable in operation.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Common Pulley Configurations</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>System Type</TableHead>
                  <TableHead>Pulleys</TableHead>
                  <TableHead>Mechanical Advantage</TableHead>
                  <TableHead>Best For</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Fixed Pulley</TableCell>
                  <TableCell className="font-mono">1</TableCell>
                  <TableCell className="font-mono">1:1</TableCell>
                  <TableCell className="text-xs">Direction change only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Movable Pulley</TableCell>
                  <TableCell className="font-mono">1</TableCell>
                  <TableCell className="font-mono">2:1</TableCell>
                  <TableCell className="text-xs">Light loads, simple lifts</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Block and Tackle</TableCell>
                  <TableCell className="font-mono">2-6</TableCell>
                  <TableCell className="font-mono">2:1 to 6:1</TableCell>
                  <TableCell className="text-xs">Heavy loads, construction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Compound System</TableCell>
                  <TableCell className="font-mono">6+</TableCell>
                  <TableCell className="font-mono">8:1 to 16:1</TableCell>
                  <TableCell className="text-xs">Extreme loads, rescue operations</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you calculate pulley mechanical advantage?</h4>
            <p className="text-xs text-muted-foreground">
              Count the number of rope segments supporting the moving load. Each segment carries an equal portion of the weight. If 4 rope segments support the load, your mechanical advantage is 4:1, meaning you need only 1/4 of the force to lift it.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a block and tackle pulley system?</h4>
            <p className="text-xs text-muted-foreground">
              A block and tackle combines multiple fixed and movable pulleys. The "block" is the housing containing pulleys, and "tackle" refers to the rope. This arrangement multiplies force, allowing heavy loads to be lifted with minimal effort.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does a pulley system reduce the work needed?</h4>
            <p className="text-xs text-muted-foreground">
              No – pulleys don't reduce total work (force × distance). They trade force for distance. You pull less force but pull more rope. Energy is conserved; you're just spreading the effort over a longer distance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the efficiency of a pulley system?</h4>
            <p className="text-xs text-muted-foreground">
              Real pulley systems lose 5-15% efficiency per pulley due to friction. A 4-pulley system with 90% efficiency per pulley has about 66% overall efficiency. Use ball-bearing pulleys and proper lubrication to minimize losses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How much rope do I need for a pulley system?</h4>
            <p className="text-xs text-muted-foreground">
              Multiply the lift height by the mechanical advantage, then add extra for knots and anchoring. For a 3-meter lift with a 4:1 system, you need at least 12 meters of rope, plus 2-3 meters for safety and attachment points.
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
            <a href="/calculators/force-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Force Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate force, mass, and acceleration</p>
            </a>
            <a href="/calculators/belt-length-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Belt Length Calculator</p>
              <p className="text-xs text-muted-foreground">Find belt length for pulley systems</p>
            </a>
            <a href="/calculators/mechanical-advantage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Mechanical Advantage Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate advantage for simple machines</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
