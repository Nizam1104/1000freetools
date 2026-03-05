"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReynoldsNumberCalculator() {
  const [velocity, setVelocity] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [density, setDensity] = useState<string>("");
  const [viscosity, setViscosity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const v = parseFloat(velocity);
    const D = parseFloat(diameter);
    const ρ = parseFloat(density);
    const μ = parseFloat(viscosity);

    if (v > 0 && D > 0 && ρ > 0 && μ > 0) {
      const Re = (ρ * v * D) / μ;
      let flowType = "";
      if (Re < 2000) flowType = "Laminar";
      else if (Re < 4000) flowType = "Transitional";
      else flowType = "Turbulent";

      setResults({ reynolds: Re, flowType });
    }
  };

  const reset = () => {
    setVelocity(""); setDiameter(""); setDensity(""); setViscosity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Reynolds Number Calculator – Pipe Flow Reynolds Number</CardTitle>
          <CardDescription>
            Calculate the Reynolds number for pipe flow to determine if flow is laminar, transitional, or turbulent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Density (kg/m³)</Label><Input value={density} onChange={e => setDensity(e.target.value)} /></div>
              <div><Label>Dynamic Viscosity (Pa·s)</Label><Input value={viscosity} onChange={e => setViscosity(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Re</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className={`p-4 rounded-md space-y-3 ${results.flowType === "Laminar" ? "bg-green-100 dark:bg-green-900/20" : results.flowType === "Transitional" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
                <div>
                  <p className="text-sm text-muted-foreground">Reynolds Number</p>
                  <p className="text-4xl font-bold">{Math.round(results.reynolds)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flow Regime</p>
                  <p className="text-2xl font-bold">{results.flowType}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Laminar: Re &lt; 2000 | Transitional: 2000-4000 | Turbulent: Re &gt; 4000
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Reynolds Number Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter flow velocity</p>
                <p>Input the fluid velocity in meters per second flowing through the pipe.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter pipe diameter</p>
                <p>Input the internal diameter of the pipe in meters.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Enter fluid properties and calculate</p>
                <p>Input density (kg/m³) and dynamic viscosity (Pa·s). Click Calculate to get Reynolds number and flow regime.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fluid Properties Reference Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Fluid</th>
                    <th className="text-left py-3 px-2 font-semibold">Density (kg/m³)</th>
                    <th className="text-left py-3 px-2 font-semibold">Viscosity (Pa·s)</th>
                    <th className="text-left py-3 px-2 font-semibold">Temperature</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Water</td>
                    <td className="py-3 px-2">998</td>
                    <td className="py-3 px-2">0.001</td>
                    <td className="py-3 px-2">20°C</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Water</td>
                    <td className="py-3 px-2">958</td>
                    <td className="py-3 px-2">0.00028</td>
                    <td className="py-3 px-2">100°C</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Air</td>
                    <td className="py-3 px-2">1.2</td>
                    <td className="py-3 px-2">0.000018</td>
                    <td className="py-3 px-2">20°C</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Engine Oil (SAE 30)</td>
                    <td className="py-3 px-2">891</td>
                    <td className="py-3 px-2">0.29</td>
                    <td className="py-3 px-2">20°C</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Glycerin</td>
                    <td className="py-3 px-2">1260</td>
                    <td className="py-3 px-2">1.5</td>
                    <td className="py-3 px-2">20°C</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Mercury</td>
                    <td className="py-3 px-2">13546</td>
                    <td className="py-3 px-2">0.00155</td>
                    <td className="py-3 px-2">20°C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Reynolds Number</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What Is Reynolds Number?</h4>
              <p>Reynolds number (Re) is a dimensionless quantity that predicts flow patterns in fluids. It represents the ratio of inertial forces to viscous forces. Low Re means viscous forces dominate (smooth, laminar flow). High Re means inertial forces dominate (chaotic, turbulent flow).</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">The Reynolds Number Formula</h4>
              <p>Re = ρvD / μ, where ρ is fluid density, v is velocity, D is pipe diameter, and μ is dynamic viscosity. Alternatively, Re = vD / ν, where ν is kinematic viscosity (ν = μ/ρ). Higher velocity, larger pipes, and lower viscosity all increase Re.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Flow Regime Classifications</h4>
              <p>Laminar flow (Re &lt; 2000) is smooth and orderly with parallel streamlines. Transitional flow (2000-4000) is unstable and may switch between laminar and turbulent. Turbulent flow (Re &gt; 4000) is chaotic with eddies and mixing. These thresholds apply to pipe flow; other geometries have different critical values.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flow Regime Characteristics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Laminar Flow (Re &lt; 2000)</p>
                <p>Smooth, predictable flow with parabolic velocity profile. Low energy loss. Dye injected stays in a straight line. Common in small pipes, viscous fluids, or slow flow.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Transitional Flow (2000-4000)</p>
                <p>Unstable flow that may fluctuate between laminar and turbulent. Unpredictable behavior. Avoid designing systems to operate in this range.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Turbulent Flow (Re &gt; 4000)</p>
                <p>Chaotic flow with eddies and mixing. Flat velocity profile. Higher energy loss but better mixing. Most common in industrial piping systems.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Why is Reynolds number important?</h4>
              <p>Reynolds number determines flow regime, which affects pressure drop, heat transfer, and mixing. Laminar and turbulent flows require different calculation methods. Engineers use Re to select appropriate formulas and predict system behavior.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What is the critical Reynolds number?</h4>
              <p>For pipe flow, the critical Reynolds number is approximately 2300. Below this, flow is typically laminar. Above 4000, flow is typically turbulent. The exact transition point depends on pipe roughness and inlet conditions.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How does temperature affect Reynolds number?</h4>
              <p>Temperature changes fluid viscosity. For liquids, higher temperature means lower viscosity, which increases Re. For gases, higher temperature increases viscosity, which decreases Re. Density also changes with temperature.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Can Reynolds number be used for non-circular pipes?</h4>
              <p>Yes, use hydraulic diameter instead of actual diameter. Hydraulic diameter = 4 × cross-sectional area / wetted perimeter. For a square duct, hydraulic diameter equals the side length.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What's the difference between dynamic and kinematic viscosity?</h4>
              <p>Dynamic viscosity (μ) measures internal resistance to flow. Kinematic viscosity (ν) equals dynamic viscosity divided by density (ν = μ/ρ). Reynolds number can use either: Re = ρvD/μ or Re = vD/ν.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/pipe-friction-loss-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Pipe Friction Loss Calculator</span>
                <p className="text-muted-foreground">Calculate head loss and pressure drop in pipes</p>
              </a>
              <a href="/calculators/flow-rate-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Flow Rate Calculator</span>
                <p className="text-muted-foreground">Calculate volumetric and mass flow rates</p>
              </a>
              <a href="/calculators/bernoulli-equation-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Bernoulli Equation Calculator</span>
                <p className="text-muted-foreground">Calculate pressure, velocity, and elevation relationships</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
