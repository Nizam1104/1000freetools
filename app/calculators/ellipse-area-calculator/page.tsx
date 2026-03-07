"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EllipseAreaCalculator() {
  const [semiMajor, setSemiMajor] = useState<string>("");
  const [semiMinor, setSemiMinor] = useState<string>("");
  const [result, setResult] = useState<{ area: number; circumference: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(semiMajor);
    const b = parseFloat(semiMinor);
    if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
      const area = Math.PI * a * b;
      // Ramanujan's approximation for ellipse circumference
      const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
      const circumference = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
      setResult({ area, circumference });
    }
  };

  const reset = () => {
    setSemiMajor("");
    setSemiMinor("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Semi-major axis (a)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                step="any"
                min="0"
                value={semiMajor}
                onChange={(e) => setSemiMajor(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Semi-minor axis (b)</label>
              <Input
                type="number"
                placeholder="e.g., 3"
                step="any"
                min="0"
                value={semiMinor}
                onChange={(e) => setSemiMinor(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Area (πab)</p>
                  <p className="text-2xl font-semibold">{result.area.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Circumference (approx.)</p>
                  <p className="text-lg">{result.circumference.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="mt-8 space-y-8">
        {/* How It Works */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">How the Ellipse Area Calculator Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Semi-Major Axis</h3>
                  <p className="text-sm text-muted-foreground">Input the longer radius (a) - half the length of the ellipse&apos;s longest diameter.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Semi-Minor Axis</h3>
                  <p className="text-sm text-muted-foreground">Input the shorter radius (b) - half the length of the ellipse&apos;s shortest diameter.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Area and Circumference</h3>
                  <p className="text-sm text-muted-foreground">Receive instant calculations for both the area and approximate circumference of the ellipse.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features and Benefits */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Features of This Ellipse Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Area and Circumference</h3>
                    <p className="text-sm text-muted-foreground">Calculate both the area (using πab) and circumference using Ramanujan&apos;s approximation formula.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">High Precision Results</h3>
                    <p className="text-sm text-muted-foreground">Get results accurate to 4 decimal places for precise mathematical and engineering calculations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Ramanujan&apos;s Formula</h3>
                    <p className="text-sm text-muted-foreground">Uses the renowned mathematician&apos;s highly accurate approximation for ellipse circumference.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Formula Display</h3>
                    <p className="text-sm text-muted-foreground">Shows the mathematical formulas used so you can understand and verify the calculations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Free Math Tool</h3>
                    <p className="text-sm text-muted-foreground">Completely free ellipse calculator for students, teachers, engineers, and designers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Mobile-Friendly Design</h3>
                    <p className="text-sm text-muted-foreground">Calculate ellipse measurements on any device - perfect for homework and field work.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference Table */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Ellipse Formulas Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Measurement</th>
                      <th className="text-left py-2">Formula</th>
                      <th className="text-left py-2">Variables</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Area</td>
                      <td className="py-2 font-mono">A = πab</td>
                      <td className="py-2">a = semi-major, b = semi-minor</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Circumference</td>
                      <td className="py-2 font-mono">C ≈ π(a+b)(1 + 3h/(10+√(4-3h)))</td>
                      <td className="py-2">h = (a-b)²/(a+b)²</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Eccentricity</td>
                      <td className="py-2 font-mono">e = √(1 - b²/a²)</td>
                      <td className="py-2">0 &lt; e &lt; 1 for ellipses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How do you calculate the area of an ellipse?</h3>
                <p className="text-sm text-muted-foreground">The area of an ellipse is calculated using the formula A = πab, where &apos;a&apos; is the semi-major axis (longer radius) and &apos;b&apos; is the semi-minor axis (shorter radius). For example, an ellipse with a=5 and b=3 has an area of π × 5 × 3 = 47.12 square units.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is the difference between major and semi-major axis?</h3>
                <p className="text-sm text-muted-foreground">The major axis is the full length of the ellipse&apos;s longest diameter. The semi-major axis is half of this length - essentially the &quot;radius&quot; along the longest direction. The calculator uses semi-major axis (a) in its formulas.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Why is ellipse circumference approximate?</h3>
                <p className="text-sm text-muted-foreground">Unlike area, there is no simple exact formula for ellipse circumference. The calculation requires an elliptic integral. Ramanujan&apos;s approximation used here is accurate to within 0.01% for most ellipses, making it practical for real-world use.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is eccentricity in an ellipse?</h3>
                <p className="text-sm text-muted-foreground">Eccentricity (e) measures how stretched an ellipse is. A circle has e=0. As e approaches 1, the ellipse becomes more elongated. Earth&apos;s orbit has e≈0.0167 (nearly circular), while Halley&apos;s Comet has e≈0.967 (highly elliptical).</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Where are ellipses used in real life?</h3>
                <p className="text-sm text-muted-foreground">Ellipses appear in planetary orbits, whispering galleries, elliptical exercise machines, architectural arches, optics (lens shapes), and engineering designs. Kepler&apos;s First Law states that planets orbit the sun in elliptical paths.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
      </div>
    </div>
  );
}
