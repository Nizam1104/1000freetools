"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PipeFrictionLossCalculator() {
  const [flowRate, setFlowRate] = useState<string>("");
  const [pipeDiameter, setPipeDiameter] = useState<string>("");
  const [pipeLength, setPipeLength] = useState<string>("");
  const [roughness, setRoughness] = useState<string>("0.0015");
  const [kinematicViscosity, setKinematicViscosity] = useState<string>("1e-6");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Q = parseFloat(flowRate); // m³/s
    const D = parseFloat(pipeDiameter); // m
    const L = parseFloat(pipeLength); // m
    const ε = parseFloat(roughness); // m
    const ν = parseFloat(kinematicViscosity); // m²/s

    if (Q > 0 && D > 0 && L > 0) {
      const A = Math.PI * Math.pow(D / 2, 2);
      const v = Q / A; // velocity
      const Re = (v * D) / ν; // Reynolds number
      
      // Swamee-Jain approximation for friction factor
      const f = 0.25 / Math.pow(Math.log10(ε / (3.7 * D) + 5.74 / Math.pow(Re, 0.9)), 2);
      
      // Darcy-Weisbach equation
      const g = 9.81;
      const hf = (f * L * v * v) / (2 * g * D);
      
      // Pressure drop
      const rho = 1000; // kg/m³ for water
      const dP = rho * g * hf;

      setResults({
        velocity: v,
        reynolds: Re,
        frictionFactor: f,
        headLoss: hf,
        pressureDrop: dP,
        flow: Re < 2000 ? "Laminar" : Re < 4000 ? "Transitional" : "Turbulent",
      });
    }
  };

  const reset = () => {
    setFlowRate(""); setPipeDiameter(""); setPipeLength("");
    setRoughness("0.0015"); setKinematicViscosity("1e-6"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Flow Rate (m³/s)</Label><Input value={flowRate} onChange={e => setFlowRate(e.target.value)} /></div>
              <div><Label>Pipe Diameter (m)</Label><Input value={pipeDiameter} onChange={e => setPipeDiameter(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pipe Length (m)</Label><Input value={pipeLength} onChange={e => setPipeLength(e.target.value)} /></div>
              <div><Label>Roughness ε (mm)</Label><Input value={roughness} onChange={e => setRoughness(e.target.value)} /></div>
            </div>
            <div>
              <Label>Kinematic Viscosity (m²/s)</Label>
              <Input value={kinematicViscosity} onChange={e => setKinematicViscosity(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Water at 20°C: 1×10⁻⁶ m²/s</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Flow Velocity</p>
                    <p className="text-2xl font-bold">{Math.round(results.velocity * 100) / 100} m/s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reynolds Number</p>
                    <p className="text-xl font-bold">{results.reynolds.toExponential(2)}</p>
                    <p className="text-xs text-muted-foreground">{results.flow}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Head Loss</p>
                    <p className="text-2xl font-bold">{Math.round(results.headLoss * 100) / 100} m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure Drop</p>
                    <p className="text-xl font-bold">{(results.pressureDrop / 1000).toFixed(2)} kPa</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Pipe Friction Loss Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter flow rate and pipe diameter</p>
                <p>Input the volumetric flow rate in m³/s and the internal pipe diameter in meters.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter pipe length and roughness</p>
                <p>Input the total pipe length in meters and the surface roughness in millimeters.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Set viscosity and calculate</p>
                <p>Enter kinematic viscosity (1×10⁻⁶ m²/s for water at 20°C). Click Calculate to see head loss and pressure drop.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pipe Roughness Reference Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Pipe Material</th>
                    <th className="text-left py-3 px-2 font-semibold">Roughness ε (mm)</th>
                    <th className="text-left py-3 px-2 font-semibold">Roughness ε (ft)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Drawn tubing (glass, brass)</td>
                    <td className="py-3 px-2">0.0015</td>
                    <td className="py-3 px-2">0.000005</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Commercial steel pipe</td>
                    <td className="py-3 px-2">0.045</td>
                    <td className="py-3 px-2">0.00015</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Galvanized iron</td>
                    <td className="py-3 px-2">0.15</td>
                    <td className="py-3 px-2">0.0005</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Cast iron</td>
                    <td className="py-3 px-2">0.26</td>
                    <td className="py-3 px-2">0.00085</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Concrete</td>
                    <td className="py-3 px-2">0.3 - 3.0</td>
                    <td className="py-3 px-2">0.001 - 0.01</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Riveted steel</td>
                    <td className="py-3 px-2">0.9 - 9.0</td>
                    <td className="py-3 px-2">0.003 - 0.03</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Pipe Friction Loss</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What Causes Friction Loss?</h4>
              <p>As fluid flows through a pipe, it experiences resistance from the pipe walls. This resistance converts some of the fluid's energy into heat, causing a pressure drop along the pipe length. The amount of loss depends on flow velocity, pipe roughness, fluid viscosity, and pipe dimensions.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">The Darcy-Weisbach Equation</h4>
              <p>Head loss is calculated using: hf = (f × L × v²) / (2 × g × D), where f is the friction factor, L is pipe length, v is velocity, g is gravity, and D is diameter. The friction factor depends on Reynolds number and relative roughness.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Friction Factor Calculation</h4>
              <p>For turbulent flow, this calculator uses the Swamee-Jain approximation: f = 0.25 / [log₁₀(ε/(3.7D) + 5.74/Re⁰.⁹)]². This provides accurate results without iterative calculation. For laminar flow (Re &lt; 2000), f = 64/Re.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Factors Affecting Friction Loss</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Flow Velocity</p>
                <p>Head loss increases with the square of velocity. Doubling flow rate quadruples friction loss. This is the most significant factor in most systems.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Pipe Diameter</p>
                <p>Larger diameter dramatically reduces loss. For the same flow rate, doubling diameter reduces velocity by 4x and head loss by about 30x.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Pipe Length</p>
                <p>Head loss is directly proportional to length. A 200m pipe has twice the friction loss of a 100m pipe with identical conditions.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Pipe Roughness</p>
                <p>Rougher pipes create more turbulence and higher friction. Effect is more pronounced at higher Reynolds numbers.</p>
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
              <h4 className="font-medium text-foreground mb-2">What's the difference between head loss and pressure drop?</h4>
              <p>Head loss is expressed in meters (or feet) of fluid column. Pressure drop is in Pascals (or psi). They're related by: ΔP = ρghf, where ρ is density, g is gravity, and hf is head loss.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Does this calculator include fittings and valves?</h4>
              <p>No, this calculates straight pipe friction only. Fittings, valves, and bends add additional losses. Use equivalent length method or K-factor method to account for fittings separately.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How accurate is the Swamee-Jain equation?</h4>
              <p>The Swamee-Jain approximation is accurate to within 1% of the Colebrook equation for typical pipe flow conditions. It's widely used in engineering because it doesn't require iteration.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why is my pressure drop so high?</h4>
              <p>Common causes: pipe too small for flow rate, excessive flow velocity, very long pipe runs, or rough pipe material. Consider increasing pipe diameter or reducing flow rate.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What viscosity should I use for water?</h4>
              <p>At 20°C (68°F), water's kinematic viscosity is 1.004×10⁻⁶ m²/s. At 40°C it's 0.658×10⁻⁶ m²/s. Warmer water has lower viscosity and slightly lower friction loss.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/pipe-flow-reynolds-number-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Reynolds Number Calculator</span>
                <p className="text-muted-foreground">Determine flow regime (laminar or turbulent)</p>
              </a>
              <a href="/calculators/flow-rate-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Flow Rate Calculator</span>
                <p className="text-muted-foreground">Calculate volumetric and mass flow rates</p>
              </a>
              <a href="/calculators/pump-head-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Pump Head Calculator</span>
                <p className="text-muted-foreground">Calculate required pump head for piping systems</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
