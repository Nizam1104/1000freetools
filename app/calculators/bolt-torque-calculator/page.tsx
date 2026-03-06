"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BoltTorqueCalculator() {
  const [boltSize, setBoltSize] = useState<string>("");
  const [grade, setGrade] = useState<string>("8.8");
  const [lubrication, setLubrication] = useState<"dry" | "lubricated">("dry");
  const [results, setResults] = useState<any>(null);

  const gradeProof: Record<string, number> = {
    "4.6": 240,
    "8.8": 640,
    "10.9": 940,
    "12.9": 1100,
  };

  const calculate = () => {
    const d = parseFloat(boltSize);
    const σ_proof = gradeProof[grade] || 640;
    const K = lubrication === "dry" ? 0.2 : 0.15;

    if (d > 0) {
      // T = K × F × d where F = 0.75 × σ_proof × As
      const As = 0.7854 * Math.pow(d - 0.9382 * 1.5, 2); // Approximate stress area
      const F = 0.75 * σ_proof * As / 1000; // kN
      const T = K * F * (d / 1000); // N·m

      setResults({ torque: Math.round(T * 10) / 10, preload: Math.round(F * 10) / 10 });
    }
  };

  const reset = () => {
    setBoltSize(""); setGrade("8.8"); setLubrication("dry"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Bolt Diameter (mm)</Label><Input value={boltSize} onChange={e => setBoltSize(e.target.value)} placeholder="e.g., 10" /></div>
              <div>
                <Label>Grade</Label>
                <Select value={grade} onValueChange={(v) => setGrade(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.6">4.6</SelectItem>
                    <SelectItem value="8.8">8.8</SelectItem>
                    <SelectItem value="10.9">10.9</SelectItem>
                    <SelectItem value="12.9">12.9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Lubrication</Label>
              <Select value={lubrication} onValueChange={(v) => setLubrication(v as typeof lubrication)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="lubricated">Lubricated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Torque</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tightening Torque</p>
                    <p className="text-4xl font-bold">{results.torque} N·m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Preload</p>
                    <p className="text-2xl font-bold">{results.preload} kN</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Bolt Torque Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter bolt diameter</p>
                  <p>Input the nominal bolt diameter in millimeters (e.g., 10 for M10 bolt).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select bolt grade and lubrication</p>
                  <p>Choose the bolt strength grade (4.6, 8.8, 10.9, or 12.9) and specify dry or lubricated condition.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate torque values</p>
                  <p>Get the recommended tightening torque and bolt preload for secure fastening.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Bolt Grade Properties
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Grade</th>
                    <th className="text-left py-3 px-2 font-semibold">Proof Strength</th>
                    <th className="text-left py-3 px-2 font-semibold">Tensile Strength</th>
                    <th className="text-left py-3 px-2 font-semibold">Common Uses</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">4.6</td>
                    <td className="py-3 px-2">240 MPa</td>
                    <td className="py-3 px-2">400 MPa</td>
                    <td className="py-3 px-2">General purpose, low stress</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">8.8</td>
                    <td className="py-3 px-2">640 MPa</td>
                    <td className="py-3 px-2">800 MPa</td>
                    <td className="py-3 px-2">Structural, automotive, machinery</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10.9</td>
                    <td className="py-3 px-2">940 MPa</td>
                    <td className="py-3 px-2">1000 MPa</td>
                    <td className="py-3 px-2">High-stress applications, engines</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">12.9</td>
                    <td className="py-3 px-2">1100 MPa</td>
                    <td className="py-3 px-2">1200 MPa</td>
                    <td className="py-3 px-2">Critical high-stress connections</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Grade markings appear on bolt heads. Metric grades show two numbers separated by a dot.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Bolt Torque
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Torque Matters</h4>
                <p>
                  Proper bolt torque creates the correct clamping force (preload) to hold joints together.
                  Under-torqued bolts can loosen from vibration, causing joint failure. Over-torqued bolts
                  may stretch beyond their elastic limit or strip threads, leading to catastrophic failure.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Torque-Preload Relationship</h4>
                <p>
                  Torque creates preload through the equation T = K × F × d, where T is torque, K is the
                  friction coefficient (nut factor), F is preload force, and d is bolt diameter. Only about
                  10-15% of applied torque actually creates preload — the rest overcomes friction.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Effect of Lubrication</h4>
                <p>
                  Lubrication reduces friction, lowering the K factor from about 0.20 (dry) to 0.15
                  (lubricated). This means less torque is needed to achieve the same preload. Always
                  apply the torque value appropriate for the actual lubrication condition.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Proper Bolt Tightening
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use a calibrated torque wrench</p>
                  <p>Click-type or digital torque wrenches provide accurate results. Calibrate annually for critical applications.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Tighten in a star pattern</p>
                  <p>For flanged joints, tighten bolts in a crisscross pattern to ensure even clamping and prevent warping.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use the three-pass method</p>
                  <p>Tighten to 30%, then 60%, then 100% of final torque. This ensures even load distribution across all bolts.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Replace stretched or damaged bolts</p>
                  <p>High-strength bolts (10.9, 12.9) should not be reused after being tightened to yield. Inspect threads before reuse.</p>
                </div>
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
                <h4 className="font-medium text-foreground mb-2">What happens if I overtighten a bolt?</h4>
                <p>
                  Overtightening can stretch the bolt beyond its yield point, causing permanent deformation.
                  This reduces clamping force and may lead to bolt failure. Extreme overtightening can strip
                  threads in the bolt or the tapped hole, requiring expensive repairs.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I use thread locker with torque specs?</h4>
                <p>
                  Thread locker affects friction and changes the torque-preload relationship. If using thread
                  locker, apply the torque value specified for lubricated conditions or follow the thread
                  locker manufacturer's recommendations.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How accurate are torque wrenches?</h4>
                <p>
                  Quality torque wrenches are accurate to ±4% when properly calibrated. Accuracy decreases
                  at the low end of the range — use a wrench where your target torque is in the middle 80%
                  of its range. Recalibrate after dropping or heavy use.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Do I need to retorque bolts after initial tightening?</h4>
                <p>
                  Some applications require retorquing after initial use, especially with gasketed joints
                  that compress over time. Check manufacturer specifications. Critical connections like
                  wheel lug nuts should be retorqued after 50-100 km of driving.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the difference between torque and tension?</h4>
                <p>
                  Torque is the rotational force applied to tighten the bolt. Tension (preload) is the
                  stretching force created in the bolt that clamps the joint. Torque is the input; tension
                  is the desired result. Friction determines how much of the torque becomes tension.
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
                href="/calculators/belt-tension-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Belt Tension Calculator</span>
                <p className="text-muted-foreground">Calculate belt drive tension and torque for power transmission systems</p>
              </a>
              <a
                href="/calculators/torque-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Torque Calculator</span>
                <p className="text-muted-foreground">Calculate torque from force and distance for mechanical applications</p>
              </a>
              <a
                href="/calculators/thread-pitch-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Thread Pitch Calculator</span>
                <p className="text-muted-foreground">Determine metric and imperial thread specifications</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
