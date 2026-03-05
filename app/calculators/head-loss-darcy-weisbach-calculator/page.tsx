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

export default function HeadLossDarcyWeisbachCalculator() {
  const [length, setLength] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [frictionFactor, setFrictionFactor] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const D = parseFloat(diameter);
    const v = parseFloat(velocity);
    const f = parseFloat(frictionFactor);
    const g = 9.81;

    if (L > 0 && D > 0 && v > 0 && f > 0) {
      const hf = (f * L * v * v) / (2 * g * D);
      const dP = 1000 * g * hf; // Pressure drop in Pa

      setResults({ headLoss: hf, pressureDrop: dP });
    }
  };

  const reset = () => {
    setLength(""); setDiameter(""); setVelocity(""); setFrictionFactor(""); setResults(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Head Loss (Darcy-Weisbach) Calculator – Pipe Friction Loss</CardTitle>
          <CardDescription>
            Calculate head loss due to friction in pipes using the Darcy-Weisbach equation. Essential for pipe system design and pump sizing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pipe Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
              <div><Label>Friction Factor f</Label><Input value={frictionFactor} onChange={e => setFrictionFactor(e.target.value)} step="0.001" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Head Loss</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Head Loss</p>
                    <p className="text-3xl font-bold">{Math.round(results.headLoss * 100) / 100} m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure Drop</p>
                    <p className="text-2xl font-bold">{(results.pressureDrop / 1000).toFixed(2)} kPa</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How the Darcy-Weisbach Equation Works</CardTitle>
          <CardDescription>Understanding pipe friction head loss calculation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Gather Pipe and Flow Parameters</h4>
                <p className="text-sm text-muted-foreground">
                  You need pipe length, internal diameter, fluid velocity, and the Darcy friction factor. The friction factor depends on pipe roughness and flow regime (Reynolds number).
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Apply the Darcy-Weisbach Formula</h4>
                <p className="text-sm text-muted-foreground">
                  Head loss h_f = (f × L × v²) / (2 × g × D). This calculates energy loss in meters of fluid column. Longer pipes, higher velocity, and smaller diameters increase head loss.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Convert to Pressure Drop</h4>
                <p className="text-sm text-muted-foreground">
                  Multiply head loss by fluid density and gravity: ΔP = ρ × g × h_f. For water (ρ = 1000 kg/m³), each meter of head equals about 9.81 kPa of pressure drop.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Darcy-Weisbach Features and Applications</CardTitle>
          <CardDescription>Why this equation is essential for fluid systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Universal Application**</h4>
              <p className="text-xs text-muted-foreground">
                Works for any fluid (water, oil, gas) and any pipe material. Unlike empirical formulas, Darcy-Weisbach is dimensionally consistent and theoretically sound across all flow conditions.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Accurate Friction Modeling**</h4>
              <p className="text-xs text-muted-foreground">
                Accounts for both laminar and turbulent flow through the friction factor. Use f = 64/Re for laminar flow, or the Colebrook equation for turbulent flow in rough pipes.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Pump Sizing**</h4>
              <p className="text-xs text-muted-foreground">
                Total dynamic head equals static head plus friction losses. Accurate head loss calculation ensures you select a pump with sufficient pressure to overcome pipe friction.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Energy Efficiency**</h4>
              <p className="text-xs text-muted-foreground">
                Friction losses represent wasted pumping energy. Optimizing pipe diameter and minimizing unnecessary length reduces operating costs over the system lifetime.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Typical Friction Factors by Pipe Type</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pipe Material</TableHead>
                  <TableHead>Roughness (mm)</TableHead>
                  <TableHead>Typical f Value</TableHead>
                  <TableHead>Applications</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Smooth (glass, copper)</TableCell>
                  <TableCell className="font-mono">0.0015</TableCell>
                  <TableCell className="font-mono">0.010-0.015</TableCell>
                  <TableCell className="text-xs">Laboratory, HVAC</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Steel (new)</TableCell>
                  <TableCell className="font-mono">0.045</TableCell>
                  <TableCell className="font-mono">0.015-0.020</TableCell>
                  <TableCell className="text-xs">Industrial piping</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cast Iron</TableCell>
                  <TableCell className="font-mono">0.26</TableCell>
                  <TableCell className="font-mono">0.020-0.025</TableCell>
                  <TableCell className="text-xs">Water mains, old systems</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Concrete</TableCell>
                  <TableCell className="font-mono">0.3-3.0</TableCell>
                  <TableCell className="font-mono">0.025-0.035</TableCell>
                  <TableCell className="text-xs">Large conduits, tunnels</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">PVC/Plastic</TableCell>
                  <TableCell className="font-mono">0.0015-0.007</TableCell>
                  <TableCell className="font-mono">0.010-0.015</TableCell>
                  <TableCell className="text-xs">Residential plumbing</TableCell>
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
            <h4 className="font-semibold text-sm mb-2">How do I find the Darcy friction factor?</h4>
            <p className="text-xs text-muted-foreground">
              For laminar flow (Re &lt; 2000), use f = 64/Re. For turbulent flow, use the Colebrook equation or Moody chart. Alternatively, the Swamee-Jain equation gives a direct calculation: f = 0.25 / [log10(ε/3.7D + 5.74/Re^0.9)]².
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the difference between Darcy and Fanning friction factors?</h4>
            <p className="text-xs text-muted-foreground">
              The Darcy friction factor is 4 times the Fanning friction factor. Darcy is used in civil/mechanical engineering (this calculator), while Fanning is common in chemical engineering. Always verify which factor your source uses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is head loss proportional to velocity squared?</h4>
            <p className="text-xs text-muted-foreground">
              Turbulent flow creates eddies and vortices that dissipate energy. The kinetic energy of fluid is proportional to v², so friction losses scale with velocity squared. Doubling flow rate quadruples head loss.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does pipe diameter affect head loss?</h4>
            <p className="text-xs text-muted-foreground">
              Head loss is inversely proportional to diameter. Doubling pipe diameter reduces head loss by half (for same velocity). But for constant flow rate, doubling diameter reduces velocity by 4×, cutting head loss by 16×.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for non-circular pipes?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, use the hydraulic diameter: D_h = 4A/P where A is cross-sectional area and P is wetted perimeter. For rectangular ducts, D_h = 2ab/(a+b). The Darcy-Weisbach equation works with this equivalent diameter.
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
            <a href="/calculators/reynolds-number-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Reynolds Number Calculator</p>
              <p className="text-xs text-muted-foreground">Determine flow regime for friction factor</p>
            </a>
            <a href="/calculators/pipe-flow-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Pipe Flow Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate flow rate and velocity</p>
            </a>
            <a href="/calculators/pump-power-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Pump Power Calculator</p>
              <p className="text-xs text-muted-foreground">Size pumps based on head requirements</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
