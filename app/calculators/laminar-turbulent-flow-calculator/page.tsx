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

export default function LaminarTurbulentFlowCalculator() {
  const [velocity, setVelocity] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [kinematicViscosity, setKinematicViscosity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const v = parseFloat(velocity);
    const D = parseFloat(diameter);
    const ν = parseFloat(kinematicViscosity);

    if (v > 0 && D > 0 && ν > 0) {
      const Re = (v * D) / ν;
      const criticalVel = (2000 * ν) / D; // Velocity at Re=2000

      let flowType = "";
      if (Re < 2000) flowType = "Laminar";
      else if (Re < 4000) flowType = "Transitional";
      else flowType = "Turbulent";

      setResults({ reynolds: Re, flowType, criticalVel });
    }
  };

  const reset = () => {
    setVelocity(""); setDiameter(""); setKinematicViscosity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
              <div><Label>Kinematic Viscosity (m²/s)</Label><Input value={kinematicViscosity} onChange={e => setKinematicViscosity(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Analyze Flow</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className={`p-4 rounded-md space-y-3 ${results.flowType === "Laminar" ? "bg-green-100 dark:bg-green-900/20" : results.flowType === "Transitional" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reynolds Number</p>
                    <p className="text-3xl font-bold">{Math.round(results.reynolds)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Flow Regime</p>
                    <p className="text-2xl font-bold">{results.flowType}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical Velocity (Re=2000)</p>
                  <p className="text-xl font-bold">{Math.round(results.criticalVel * 1000) / 1000} m/s</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Flow Regime Analysis Works</CardTitle>
          <CardDescription>Understanding Reynolds number and flow types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Calculate Reynolds Number</h4>
                <p className="text-sm text-muted-foreground">
                  Reynolds number Re = (velocity × diameter) / kinematic viscosity. This dimensionless number compares inertial forces to viscous forces in the fluid flow.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Compare to Critical Values</h4>
                <p className="text-sm text-muted-foreground">
                  Re &lt; 2000 indicates laminar flow (smooth, layered). Re &gt; 4000 indicates turbulent flow (chaotic, mixed). Between 2000-4000 is transitional – unstable and unpredictable.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Determine Critical Velocity</h4>
                <p className="text-sm text-muted-foreground">
                  Critical velocity is the speed at which flow transitions from laminar to turbulent. Calculate as v_critical = (2000 × viscosity) / diameter for the laminar threshold.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flow Regime Features and Characteristics</CardTitle>
          <CardDescription>Understanding laminar vs turbulent flow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Laminar Flow (Re &lt; 2000)**</h4>
              <p className="text-xs text-muted-foreground">
                Smooth, orderly flow with parallel layers. Fluid moves in straight lines with no mixing between layers. Low energy loss, predictable behavior. Common in small pipes, high viscosity fluids.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Turbulent Flow (Re &gt; 4000)**</h4>
              <p className="text-xs text-muted-foreground">
                Chaotic flow with eddies, vortices, and mixing. High energy loss but excellent heat and mass transfer. Most industrial pipe flows are turbulent due to practical velocities and pipe sizes.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Transitional Flow (2000-4000)**</h4>
              <p className="text-xs text-muted-foreground">
                Unstable regime alternating between laminar and turbulent. Unpredictable behavior makes design difficult. Engineers typically design to avoid this range for reliable system performance.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Reynolds Number Significance**</h4>
              <p className="text-xs text-muted-foreground">
                Named after Osborne Reynolds (1883). This dimensionless number allows scaling – flow behavior is similar at the same Re regardless of actual size. Essential for model testing and prototyping.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Flow Regime Comparison Table</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Characteristic</TableHead>
                  <TableHead>Laminar Flow</TableHead>
                  <TableHead>Turbulent Flow</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Reynolds Number</TableCell>
                  <TableCell className="font-mono">&lt; 2000</TableCell>
                  <TableCell className="font-mono">&gt; 4000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Velocity Profile</TableCell>
                  <TableCell className="text-xs">Parabolic (smooth)</TableCell>
                  <TableCell className="text-xs">Flat (mixed)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Friction Factor</TableCell>
                  <TableCell className="font-mono text-xs">f = 64/Re</TableCell>
                  <TableCell className="text-xs">Colebrook equation</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Energy Loss</TableCell>
                  <TableCell className="text-xs">Low (proportional to v)</TableCell>
                  <TableCell className="text-xs">High (proportional to v²)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mixing</TableCell>
                  <TableCell className="text-xs">None (layered)</TableCell>
                  <TableCell className="text-xs">Excellent (chaotic)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Heat Transfer</TableCell>
                  <TableCell className="text-xs">Poor (conduction only)</TableCell>
                  <TableCell className="text-xs">Excellent (convection)</TableCell>
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
            <h4 className="font-semibold text-sm mb-2">What is Reynolds number and why does it matter?</h4>
            <p className="text-xs text-muted-foreground">
              Reynolds number is the ratio of inertial forces to viscous forces. It predicts flow patterns – low Re means viscosity dominates (laminar), high Re means inertia dominates (turbulent). Critical for pipe design and fluid analysis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What causes flow to become turbulent?</h4>
            <p className="text-xs text-muted-foreground">
              Higher velocity, larger pipe diameter, or lower viscosity increase Reynolds number. When inertial forces overcome viscous damping, small disturbances grow into chaotic eddies. Surface roughness also triggers earlier transition.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is laminar or turbulent flow better?</h4>
            <p className="text-xs text-muted-foreground">
              Depends on the application. Laminar flow has lower friction losses (better for pumping). Turbulent flow has better mixing and heat transfer (better for reactors, heat exchangers). Each has advantages for different purposes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the critical Reynolds number for pipes?</h4>
            <p className="text-xs text-muted-foreground">
              For circular pipes, flow is typically laminar below Re = 2000 and turbulent above Re = 4000. The exact transition depends on surface roughness, inlet conditions, and flow disturbances. The 2000-4000 range is transitional.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does viscosity affect flow regime?</h4>
            <p className="text-xs text-muted-foreground">
              Higher viscosity promotes laminar flow by damping disturbances. Honey flows laminarly at much higher velocities than water. Lower viscosity fluids like water or air transition to turbulence more easily at lower velocities.
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
              <p className="text-xs text-muted-foreground">Calculate Reynolds number directly</p>
            </a>
            <a href="/calculators/head-loss-darcy-weisbach-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Head Loss Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate pipe friction losses</p>
            </a>
            <a href="/calculators/pipe-flow-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Pipe Flow Calculator</p>
              <p className="text-xs text-muted-foreground">Analyze flow rate and velocity</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
