"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function BeltLengthCalculator() {
  const [d1, setD1] = useState<string>("");
  const [d2, setD2] = useState<string>("");
  const [centerDistance, setCenterDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const D1 = parseFloat(d1);
    const D2 = parseFloat(d2);
    const C = parseFloat(centerDistance);

    if (D1 > 0 && D2 > 0 && C > 0) {
      // Approximate belt length formula
      const L = 2 * C + 1.57 * (D1 + D2) + Math.pow(D2 - D1, 2) / (4 * C);
      
      // Contact angle on smaller pulley
      const contactAngle = 180 - ((D2 - D1) / C) * 57.3;

      setResults({
        length: Math.round(L * 100) / 100,
        contactAngle: Math.round(contactAngle * 10) / 10,
      });
    }
  };

  const reset = () => {
    setD1(""); setD2(""); setCenterDistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Small Pulley Diameter</Label><Input value={d1} onChange={e => setD1(e.target.value)} /></div>
              <div><Label>Large Pulley Diameter</Label><Input value={d2} onChange={e => setD2(e.target.value)} /></div>
              <div><Label>Center Distance</Label><Input value={centerDistance} onChange={e => setCenterDistance(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Belt Length</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Belt Length</p>
                  <p className="text-4xl font-bold">{results.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Angle (small pulley)</p>
                  <p className="text-2xl font-bold">{results.contactAngle}°</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Belt Length Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
            <div>
              <p className="font-medium text-foreground">Measure the small pulley diameter</p>
              <p className="text-sm text-muted-foreground">Measure across the center of the smaller pulley. For V-belts, measure at the pitch diameter (approximately the belt's neutral axis), not the outer edge.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
            <div>
              <p className="font-medium text-foreground">Measure the large pulley diameter and center distance</p>
              <p className="text-sm text-muted-foreground">Measure the larger pulley the same way. Then measure the distance between pulley centers — the space between the shafts, not the belt edges.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
            <div>
              <p className="font-medium text-foreground">Click Calculate to find belt length</p>
              <p className="text-sm text-muted-foreground">Get the required belt length and the contact angle on the small pulley. Use this to select the correct standard belt size.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common V-Belt Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Belt Designation</th>
                  <th className="text-left py-3 px-2 font-semibold">Top Width</th>
                  <th className="text-left py-3 px-2 font-semibold">Height</th>
                  <th className="text-left py-3 px-2 font-semibold">Common Applications</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">A (4L)</td>
                  <td className="py-3 px-2">1/2 inch (13mm)</td>
                  <td className="py-3 px-2">5/16 inch (8mm)</td>
                  <td className="py-3 px-2">Light duty: lawn mowers, small compressors</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">B (5L)</td>
                  <td className="py-3 px-2">21/32 inch (17mm)</td>
                  <td className="py-3 px-2">13/32 inch (10mm)</td>
                  <td className="py-3 px-2">Medium duty: industrial motors, pumps</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">C</td>
                  <td className="py-3 px-2">7/8 inch (22mm)</td>
                  <td className="py-3 px-2">17/32 inch (14mm)</td>
                  <td className="py-3 px-2">Heavy duty: large compressors, conveyors</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">3V</td>
                  <td className="py-3 px-2">3/8 inch (9.5mm)</td>
                  <td className="py-3 px-2">5/16 inch (8mm)</td>
                  <td className="py-3 px-2">Narrow wedge: HVAC, appliances</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">5V</td>
                  <td className="py-3 px-2">5/8 inch (16mm)</td>
                  <td className="py-3 px-2">17/32 inch (14mm)</td>
                  <td className="py-3 px-2">Narrow wedge: industrial drives</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-mono">8V</td>
                  <td className="py-3 px-2">1 inch (25mm)</td>
                  <td className="py-3 px-2">29/32 inch (23mm)</td>
                  <td className="py-3 px-2">Heavy narrow: high-power industrial</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Belt numbers indicate size. A45 means A-section belt with 45 inch outside circumference. 4L460 means 4L section with 46.0 inch outside length.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Belt Drive Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">The Belt Length Formula</h4>
            <p>
              The approximate belt length formula is: L = 2C + 1.57(D + d) + (D - d)² / 4C, where C is center distance, D is large pulley diameter, and d is small pulley diameter. This accounts for the straight sections and the arc around each pulley.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Why Contact Angle Matters</h4>
            <p>
              Contact angle is how much of the small pulley the belt wraps around. More wrap means more grip and less slip. Aim for at least 120° contact on the small pulley. If contact is too low, consider an idler pulley or adjusting center distance.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Center Distance Guidelines</h4>
            <p>
              Center distance should be 1.5 to 3 times the large pulley diameter for optimal performance. Too close reduces contact angle and belt life. Too far increases belt whip and vibration. Adjustable motor bases help fine-tune tension.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Belt Tension</h4>
            <p>
              Proper tension is critical. Too loose causes slip, heat, and wear. Too tight loads bearings and shortens belt life. A properly tensioned belt should deflect about 1/64 inch per inch of span when pressed with moderate thumb pressure.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Belt Drive Design Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Use the next size up if between sizes</p>
              <p>Belts stretch slightly during break-in. If your calculated length falls between standard sizes, choose the longer one. You can always take up slack with an adjustable base.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Match pulley groove to belt profile</p>
              <p>A-section belts need A-section pulleys. Using mismatched profiles causes poor contact, rapid wear, and power loss. Check both belt and pulley specifications.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Check pulley alignment</p>
              <p>Misaligned pulleys cause uneven wear and belt tracking issues. Use a straightedge across both pulley faces. Angular misalignment should be under 1 degree.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Replace belts in matched sets</p>
              <p>On multi-belt drives, always replace all belts together. Mixing old and new belts causes uneven load distribution. The new belt carries more load and fails prematurely.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How do I measure a worn belt for replacement?",
    answer: "Use a flexible tape measure around the outside of the old belt. For V-belts, this gives the outside circumference. Subtract the belt's nominal top width to estimate pitch length. Or measure pulleys and center distance, then use this calculator.",
  },
{
    question: "What's the difference between inside length and outside length?",
    answer: "Inside length is measured along the belt's inner surface. Outside length includes the belt thickness. V-belt part numbers typically use outside length. Classical belts (A, B, C) use outside length; narrow wedge (3V, 5V, 8V) also use outside length.",
  },
{
    question: "How much tension should a V-belt have?",
    answer: "Press the belt midpoint with moderate thumb pressure. Deflection should be about 1/64 inch per inch of span length. For a 32-inch span, expect about 1/2 inch deflection. Belt tension gauges provide more accurate measurement.",
  },
{
    question: "Can I use this calculator for timing belts?",
    answer: "The basic length formula works for any two-pulley system, but timing belts have different considerations. Timing belt pitch must match pulley tooth pitch. This calculator does not account for tooth engagement requirements.",
  },
{
    question: "Why is my belt squealing?",
    answer: "Squealing usually means the belt is loose and slipping. Check tension first. If tension is correct, check for worn pulleys, contaminated belts (oil or grease), or misalignment. Glazed belt surfaces also cause noise and need replacement.",
  }
  ]} />
</section>
    </div>
  );
}
