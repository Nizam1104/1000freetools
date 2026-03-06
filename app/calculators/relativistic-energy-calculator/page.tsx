"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RelativisticEnergyCalculator() {
  const [mass, setMass] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);
    const c = 299792458;

    if (m > 0 && v >= 0 && v < c) {
      const beta = v / c;
      const gamma = 1 / Math.sqrt(1 - beta * beta);
      
      // Rest energy: E₀ = mc²
      const E0 = m * c * c;
      
      // Total energy: E = γmc²
      const E = gamma * m * c * c;
      
      // Kinetic energy: KE = (γ - 1)mc²
      const KE = (gamma - 1) * m * c * c;
      
      // Relativistic mass
      const mRel = gamma * m;

      setResults({
        gamma: Math.round(gamma * 1000) / 1000,
        restEnergy: E0,
        totalEnergy: E,
        kineticEnergy: KE,
        relativisticMass: mRel,
      });
    }
  };

  const reset = () => {
    setMass(""); setVelocity(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Rest Mass (kg)</Label><Input value={mass} onChange={e => setMass(e.target.value)} /></div>
              <div><Label>Velocity (m/s)</Label><Input value={velocity} onChange={e => setVelocity(e.target.value)} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Speed of light: 299,792,458 m/s</p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Lorentz Factor (γ)</p>
                    <p className="text-2xl font-bold">{results.gamma}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Relativistic Mass</p>
                    <p className="text-xl font-bold">{results.relativisticMass.toExponential(4)} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rest Energy (E₀)</p>
                    <p className="text-lg font-bold">{results.restEnergy.toExponential(4)} J</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Energy (E)</p>
                    <p className="text-lg font-bold">{results.totalEnergy.toExponential(4)} J</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Kinetic Energy (KE)</p>
                    <p className="text-lg font-bold">{results.kineticEnergy.toExponential(4)} J</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Relativistic Energy Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the rest mass</p>
                  <p>Input the mass of the object in kilograms when at rest.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the velocity</p>
                  <p>Input the speed in meters per second. Must be less than the speed of light.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">View relativistic results</p>
                  <p>The calculator shows the Lorentz factor, rest energy, total energy, and kinetic energy.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Special Relativity
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Einstein's special relativity shows that energy and mass are equivalent. As an object
                approaches the speed of light, its energy increases dramatically.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center space-y-2">
                <div>E₀ = mc² (Rest Energy)</div>
                <div>E = γmc² (Total Energy)</div>
                <div>KE = (γ - 1)mc² (Kinetic Energy)</div>
              </div>
              <p>
                The Lorentz factor γ (gamma) = 1/√(1 - v²/c²) determines how much relativistic effects
                matter. At everyday speeds, γ ≈ 1 and classical physics works fine.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Lorentz Factor at Different Speeds
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Speed</th>
                    <th className="text-left py-3 px-2 font-semibold">% of Light Speed</th>
                    <th className="text-left py-3 px-2 font-semibold">Lorentz Factor (γ)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Commercial jet</td>
                    <td className="py-3 px-2">0.00008%</td>
                    <td className="py-3 px-2">1.00000000003</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Earth orbit</td>
                    <td className="py-3 px-2">0.0026%</td>
                    <td className="py-3 px-2">1.000000003</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10% light speed</td>
                    <td className="py-3 px-2">10%</td>
                    <td className="py-3 px-2">1.005</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">50% light speed</td>
                    <td className="py-3 px-2">50%</td>
                    <td className="py-3 px-2">1.155</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">90% light speed</td>
                    <td className="py-3 px-2">90%</td>
                    <td className="py-3 px-2">2.294</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">99% light speed</td>
                    <td className="py-3 px-2">99%</td>
                    <td className="py-3 px-2">7.089</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Relativistic effects become noticeable above 10% of light speed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Mass-Energy Equivalence Examples
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">1 kg of matter</p>
                <p className="text-muted-foreground">E = mc² = 9 × 10¹⁶ J (equivalent to 21 megatons of TNT)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">1 gram of matter</p>
                <p className="text-muted-foreground">E = 9 × 10¹³ J (equivalent to 21 kilotons — Hiroshima bomb size)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Electron rest mass</p>
                <p className="text-muted-foreground">E₀ = 511 keV (used in PET scans and particle physics)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why can't objects reach light speed?</h4>
                <p>
                  As velocity approaches c, the Lorentz factor approaches infinity. This means infinite
                  energy would be needed to reach light speed. Only massless particles like photons
                  can travel at c.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is rest energy?</h4>
                <p>
                  Rest energy (E₀ = mc²) is the energy an object has just from having mass, even when
                  not moving. This is the famous mass-energy equivalence from Einstein.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When do relativistic effects matter?</h4>
                <p>
                  For everyday speeds (cars, planes, even rockets), relativistic effects are negligible.
                  They become important above about 10% of light speed, relevant for particle
                  accelerators and cosmic rays.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is relativistic mass?</h4>
                <p>
                  Relativistic mass is γ × rest mass. Modern physicists prefer to use invariant mass
                  and treat the γ factor as part of momentum and energy equations instead.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How does this relate to nuclear energy?</h4>
                <p>
                  Nuclear reactions convert small amounts of mass into large amounts of energy via
                  E = mc². In fission, about 0.1% of mass becomes energy. In fusion, about 0.7% converts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/lorentz-transformation-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Lorentz Transformation Calculator</span>
                <p className="text-muted-foreground">Transform coordinates between reference frames</p>
              </a>
              <a
                href="/calculators/time-dilation-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Time Dilation Calculator</span>
                <p className="text-muted-foreground">Calculate how time slows at high velocities</p>
              </a>
              <a
                href="/calculators/mass-energy-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Mass-Energy Converter</span>
                <p className="text-muted-foreground">Convert between mass and energy using E=mc²</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
