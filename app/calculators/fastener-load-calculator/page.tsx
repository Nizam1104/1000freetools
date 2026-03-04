"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FastenerLoadCalculator() {
  const [diameter, setDiameter] = useState<string>("");
  const [tensileStrength, setTensileStrength] = useState<string>("");
  const [safetyFactor, setSafetyFactor] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const d = parseFloat(diameter);
    const σ = parseFloat(tensileStrength);
    const SF = parseFloat(safetyFactor) || 2;

    if (d > 0 && σ > 0) {
      const area = Math.PI * Math.pow(d / 2, 2);
      const ultimateLoad = area * σ / 1000; // kN
      const allowableLoad = ultimateLoad / SF;

      // Shear strength (approx 60% of tensile)
      const shearLoad = allowableLoad * 0.6;

      setResults({
        ultimate: Math.round(ultimateLoad * 100) / 100,
        allowable: Math.round(allowableLoad * 100) / 100,
        shear: Math.round(shearLoad * 100) / 100,
      });
    }
  };

  const reset = () => {
    setDiameter(""); setTensileStrength(""); setSafetyFactor(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Fastener Load Calculator – Calculate Fastener Capacity</CardTitle>
          <CardDescription>
            Calculate the load capacity of fasteners including tensile and shear strength with safety factors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Diameter (mm)</Label><Input value={diameter} onChange={e => setDiameter(e.target.value)} /></div>
              <div><Label>Tensile Strength (MPa)</Label><Input value={tensileStrength} onChange={e => setTensileStrength(e.target.value)} /></div>
              <div><Label>Safety Factor</Label><Input value={safetyFactor} onChange={e => setSafetyFactor(e.target.value)} placeholder="2" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Load</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ultimate Load</p>
                    <p className="text-2xl font-bold">{results.ultimate} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allowable (Tensile)</p>
                    <p className="text-2xl font-bold">{results.allowable} kN</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allowable (Shear)</p>
                    <p className="text-2xl font-bold">{results.shear} kN</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Fastener Load Capacity</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="font-semibold mb-2">Enter Fastener Diameter</h3>
            <p className="text-sm text-muted-foreground">Input the diameter of your bolt or fastener in millimeters.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="font-semibold mb-2">Specify Material Strength</h3>
            <p className="text-sm text-muted-foreground">Enter the tensile strength of the fastener material in MPa.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="font-semibold mb-2">View Load Capacities</h3>
            <p className="text-sm text-muted-foreground">Get ultimate load, allowable tensile load, and shear load capacity with safety factors.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Key Features of Fastener Load Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Ultimate & Allowable Load
            </h3>
            <p className="text-sm text-muted-foreground">Calculate both the failure load and safe working load with configurable safety factors.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Shear Strength Calculation
            </h3>
            <p className="text-sm text-muted-foreground">Automatically computes shear capacity (typically 60% of tensile strength).</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Configurable Safety Factor
            </h3>
            <p className="text-sm text-muted-foreground">Adjust safety factor based on application requirements (default: 2.0).</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Metric Units Support
            </h3>
            <p className="text-sm text-muted-foreground">Uses standard metric units (mm, MPa, kN) for engineering calculations.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Quick Reference Values
            </h3>
            <p className="text-sm text-muted-foreground">Includes common fastener grades and their typical tensile strengths.</p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">Fastener Load Formulas</h3>
          <div className="bg-card p-4 rounded font-mono text-sm mb-4 space-y-1">
            <div>Area = π × (d/2)²</div>
            <div>Ultimate Load = Area × Tensile Strength</div>
            <div>Allowable Load = Ultimate Load / Safety Factor</div>
            <div>Shear Load ≈ Allowable Load × 0.6</div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Common Fastener Grades:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Grade 2 (Steel): 420 MPa</li>
                <li>• Grade 5 (Steel): 830 MPa</li>
                <li>• Grade 8 (Steel): 1040 MPa</li>
                <li>• A2 Stainless: 500 MPa</li>
                <li>• A4 Stainless: 600 MPa</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Example: M10 Grade 8.8 Bolt</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Diameter: 10 mm</li>
                <li>• Tensile Strength: 800 MPa</li>
                <li>• Ultimate Load: ~62.8 kN</li>
                <li>• Allowable (SF=2): ~31.4 kN</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Fastener Loads</h2>
        <div className="space-y-4">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the difference between ultimate and allowable load?</h3>
            <p className="text-sm text-muted-foreground">Ultimate load is the force at which the fastener fails. Allowable load is the safe working load after applying a safety factor (typically 2-4x reduction).</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What safety factor should I use?</h3>
            <p className="text-sm text-muted-foreground">Common safety factors are 2.0 for general applications, 3.0-4.0 for critical structural connections, and higher for dynamic or fatigue loading conditions.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why is shear strength lower than tensile strength?</h3>
            <p className="text-sm text-muted-foreground">Materials typically fail at lower stress in shear than in tension. For steel fasteners, shear strength is approximately 60% of tensile strength.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I choose the right fastener grade?</h3>
            <p className="text-sm text-muted-foreground">Consider the load requirements, environmental conditions (corrosion), and application type. Higher grades offer more strength but may be more brittle.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Does thread type affect load capacity?</h3>
            <p className="text-sm text-muted-foreground">Yes, threaded sections have reduced cross-sectional area (stress area). This calculator uses nominal diameter; for precise calculations, use the tensile stress area.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Related Engineering Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/bolt-torque-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Bolt Torque Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate proper tightening torque for bolts based on preload requirements.</p>
          </a>
          <a href="/calculators/safety-factor-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Safety Factor Calculator</h3>
            <p className="text-sm text-muted-foreground">Determine safety factors for structural and mechanical designs.</p>
          </a>
          <a href="/calculators/shear-strength-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Shear Strength Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate shear stress and capacity for various materials and configurations.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
