"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ManningEquationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [s, setS] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const nVal = parseFloat(n);
    const R = parseFloat(r);
    const S = parseFloat(s);
    const A = parseFloat(area);

    if (nVal > 0 && R > 0 && S > 0 && A > 0) {
      // Manning equation: V = (1/n) × R^(2/3) × S^(1/2)
      const V = (1 / nVal) * Math.pow(R, 2/3) * Math.sqrt(S);
      const Q = V * A;

      setResults({ velocity: V, flowRate: Q });
    }
  };

  const reset = () => {
    setN(""); setR(""); setS(""); setArea(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Manning's n</Label><Input value={n} onChange={e => setN(e.target.value)} placeholder="0.013 for concrete" /></div>
              <div><Label>Hydraulic Radius R (m)</Label><Input value={r} onChange={e => setR(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Slope S (m/m)</Label><Input value={s} onChange={e => setS(e.target.value)} step="0.001" /></div>
              <div><Label>Cross-sectional Area (m²)</Label><Input value={area} onChange={e => setArea(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Flow</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Velocity</p>
                    <p className="text-3xl font-bold">{Math.round(results.velocity * 100) / 100} m/s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Flow Rate (Q)</p>
                    <p className="text-3xl font-bold">{Math.round(results.flowRate * 100) / 100} m³/s</p>
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
              How to Use This Manning Equation Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter channel properties</p>
                  <p>Input Manning's roughness coefficient (n) for your channel material. Concrete is about 0.013, natural streams range from 0.025-0.060 depending on vegetation and obstacles.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Input hydraulic parameters</p>
                  <p>Enter the hydraulic radius (R) in meters, channel slope (S) as a decimal (e.g., 0.001 for 0.1% slope), and cross-sectional area (A) in square meters.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate flow characteristics</p>
                  <p>The calculator computes flow velocity using the Manning equation and discharge (flow rate) by multiplying velocity by cross-sectional area.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Manning's Roughness Coefficient (n) Values
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Channel Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Material/Condition</th>
                    <th className="text-left py-3 px-2 font-semibold">n Value</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2" rowSpan={3}>Pipes</td>
                    <td className="py-3 px-2">Smooth brass, copper, plastic</td>
                    <td className="py-3 px-2">0.009-0.010</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Concrete, cast iron</td>
                    <td className="py-3 px-2">0.011-0.013</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Corrugated metal</td>
                    <td className="py-3 px-2">0.022-0.025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2" rowSpan={3}>Open Channels</td>
                    <td className="py-3 px-2">Concrete lined</td>
                    <td className="py-3 px-2">0.012-0.017</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Earth, clean and straight</td>
                    <td className="py-3 px-2">0.017-0.025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Natural streams, clean</td>
                    <td className="py-3 px-2">0.025-0.033</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2" rowSpan={2}>Natural Streams</td>
                    <td className="py-3 px-2">With weeds and stones</td>
                    <td className="py-3 px-2">0.030-0.040</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Floodplain with trees</td>
                    <td className="py-3 px-2">0.050-0.100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Higher n values indicate rougher surfaces that create more friction and slow water flow. Select n based on the predominant material and condition of your channel.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding the Manning Equation
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The Manning equation is an empirical formula that estimates the velocity of water flowing in an open channel. Developed by Irish engineer Robert Manning in 1889, it remains the most widely used equation for open channel flow calculations in civil engineering and hydrology.
              </p>
              <p>
                The equation is: V = (1/n) × R^(2/3) × S^(1/2), where V is velocity (m/s), n is Manning's roughness coefficient, R is hydraulic radius (cross-sectional area divided by wetted perimeter), and S is the channel slope. The discharge Q equals V × A, where A is the cross-sectional area.
              </p>
              <p>
                The Manning equation works best for uniform, steady flow in prismatic channels — meaning the flow rate, depth, and velocity don't change along the channel length. It's commonly used for designing storm drains, culverts, irrigation canals, and analyzing natural stream capacity. The equation assumes turbulent flow, which covers most practical open channel situations.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Engineering Applications
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Stormwater Drainage Design</p>
                  <p>Size storm drains and detention basins to handle design storms (e.g., 10-year or 100-year events). The Manning equation helps ensure channels can convey peak flows without flooding adjacent properties.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Culvert and Bridge Design</p>
                  <p>Determine the capacity of culverts under roads and bridges. Engineers must ensure these structures don't create bottlenecks that cause upstream flooding during high-flow events.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Irrigation Canal Design</p>
                  <p>Design canals to deliver specific flow rates to agricultural areas. The Manning equation helps size canals and predict water surface profiles for efficient water distribution.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Flood Plain Analysis</p>
                  <p>Model flood extents and depths for flood insurance maps and development planning. The Manning equation is a key component of HEC-RAS and other hydraulic modeling software.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is hydraulic radius and how do I calculate it?</h4>
                <p>
                  Hydraulic radius (R) equals cross-sectional area (A) divided by wetted perimeter (P). For a rectangular channel: R = (width × depth) / (width + 2 × depth). For a full circular pipe: R = diameter / 4. The wetted perimeter is the length of channel boundary in contact with water.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When should I use Manning's equation vs. other formulas?</h4>
                <p>
                  Use Manning for open channel flow and partially full pipes. For pressurized pipe flow, use the Darcy-Weisbach or Hazen-Williams equations. Manning works well for turbulent flow (Reynolds number &gt; 2000), which covers most civil engineering applications.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What units does the Manning equation use?</h4>
                <p>
                  The form used here is for SI units: velocity in m/s, radius in meters, slope as m/m. For US customary units, the equation includes a conversion factor: V = (1.486/n) × R^(2/3) × S^(1/2), giving velocity in ft/s with radius in feet.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How accurate is the Manning equation?</h4>
                <p>
                  Accuracy depends mainly on selecting the correct n value. With a well-chosen n, Manning typically predicts velocity within 10-20% for natural channels and 5-10% for constructed channels. The biggest source of error is usually estimating roughness for natural streams with variable conditions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use Manning's equation for sloped pipes?</h4>
                <p>
                  Yes, for partially full pipes flowing by gravity. The pipe acts as an open channel with a free water surface. For full pipes under pressure, use pipe flow equations instead. The hydraulic radius changes with fill level, so capacity isn't linear with depth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
