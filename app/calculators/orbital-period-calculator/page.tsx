"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrbitalPeriodCalculator() {
  const [semiMajorAxis, setSemimajorAxis] = useState<string>("");
  const [centralMass, setCentralMass] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const a = parseFloat(semiMajorAxis);
    const M = parseFloat(centralMass);
    const G = 6.67430e-11;

    if (a > 0 && M > 0) {
      const T = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / (G * M));
      const days = T / 86400;
      const years = days / 365.25;

      setResults({
        seconds: Math.round(T),
        days: Math.round(days * 100) / 100,
        years: years < 1 ? years.toFixed(4) : Math.round(years * 100) / 100,
      });
    }
  };

  const reset = () => {
    setSemimajorAxis(""); setCentralMass(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Orbital Period Calculator – Calculate Orbital Period</CardTitle>
          <CardDescription>
            Calculate the orbital period of a satellite or planet using Kepler's third law. Enter the semi-major axis and central body mass.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Semi-major Axis (m)</Label><Input value={semiMajorAxis} onChange={e => setSemimajorAxis(e.target.value)} /></div>
              <div><Label>Central Body Mass (kg)</Label><Input value={centralMass} onChange={e => setCentralMass(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Period</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-2xl font-bold">{results.seconds.toLocaleString()} s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Days</p>
                    <p className="text-2xl font-bold">{results.days}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Years</p>
                    <p className="text-2xl font-bold">{results.years}</p>
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
              How to Use This Orbital Period Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter semi-major axis</p>
                  <p>Input the average distance from the orbiting body to the central body in meters.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Input central body mass</p>
                  <p>Enter the mass of the body being orbited (Earth, Sun, etc.) in kilograms.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate orbital period</p>
                  <p>Click Calculate Period to see the time for one complete orbit in seconds, days, and years.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Orbital Periods in Our Solar System
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Body</th>
                    <th className="text-right py-3 px-2 font-semibold">Semi-major Axis</th>
                    <th className="text-right py-3 px-2 font-semibold">Orbital Period</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Mercury</td>
                    <td className="text-right py-3 px-2">57.9 million km</td>
                    <td className="text-right py-3 px-2">88 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Venus</td>
                    <td className="text-right py-3 px-2">108.2 million km</td>
                    <td className="text-right py-3 px-2">225 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Earth</td>
                    <td className="text-right py-3 px-2">149.6 million km</td>
                    <td className="text-right py-3 px-2">365.25 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Mars</td>
                    <td className="text-right py-3 px-2">227.9 million km</td>
                    <td className="text-right py-3 px-2">687 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Jupiter</td>
                    <td className="text-right py-3 px-2">778.5 million km</td>
                    <td className="text-right py-3 px-2">11.86 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Neptune</td>
                    <td className="text-right py-3 px-2">4.5 billion km</td>
                    <td className="text-right py-3 px-2">165 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Orbital Mechanics
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Kepler's Third Law</h4>
                <p>
                  The square of the orbital period is proportional to the cube of the semi-major axis.
                  This means planets farther from the Sun take much longer to orbit. Double the distance
                  and the period increases by about 2.8 times. This relationship holds for any orbiting
                  system — moons around planets, satellites around Earth, or exoplanets around stars.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Semi-major Axis?</h4>
                <p>
                  The semi-major axis is half the longest diameter of an elliptical orbit. For nearly
                  circular orbits like planets, it equals the average distance from the central body.
                  For highly elliptical orbits like comets, it is the average of closest and farthest
                  approach distances.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Mass Matters</h4>
                <p>
                  More massive central bodies create stronger gravity, requiring faster orbital speeds.
                  A satellite orbiting Jupiter at the same distance as one orbiting Earth would complete
                  its orbit much faster because Jupiter is 318 times more massive. The formula accounts
                  for this through the gravitational parameter GM.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Satellite Orbit Tips
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Low Earth Orbit (LEO)</p>
                  <p>200-2,000 km altitude. Period: 90-120 minutes. Used by ISS, Hubble, and many satellites.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Geostationary Orbit (GEO)</p>
                  <p>35,786 km altitude. Period: exactly 24 hours. Satellites appear stationary over one point on Earth.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Medium Earth Orbit (MEO)</p>
                  <p>2,000-35,786 km altitude. GPS satellites orbit at about 20,200 km with 12-hour periods.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Escape velocity</p>
                  <p>To leave Earth orbit entirely, spacecraft must reach 11.2 km/s — about 40,000 km/h.</p>
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
                <h4 className="font-medium text-foreground mb-2">What is the orbital period formula?</h4>
                <p>
                  T = 2π × √(a³/GM), where T is period, a is semi-major axis, G is the gravitational
                  constant (6.674×10⁻¹¹), and M is the central body mass. This comes from equating
                  gravitational force to centripetal force for circular motion.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does satellite mass affect orbital period?</h4>
                <p>
                  No — not when the satellite is much less massive than the central body. A 1 kg satellite
                  and a 1000 kg satellite at the same altitude have identical orbital periods. Only the
                  central body mass matters. This is why all objects fall at the same rate in a vacuum.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why do geostationary satellites orbit at 35,786 km?</h4>
                <p>
                  That specific altitude gives exactly 24-hour orbital period, matching Earth's rotation.
                  Lower orbits are faster; higher orbits are slower. At 35,786 km above the equator,
                  satellites stay fixed over one point — perfect for communications and weather monitoring.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How accurate is this calculator?</h4>
                <p>
                  Very accurate for ideal two-body systems. Real orbits have perturbations from other
                  bodies, atmospheric drag (for LEO), and non-spherical gravity fields. For most
                  educational and planning purposes, the two-body approximation is sufficient.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I use this for binary star systems?</h4>
                <p>
                  For binary systems, use the sum of both masses as M and the separation distance as a.
                  The formula still applies but both bodies orbit their common center of mass. For
                  equal-mass binaries, each star orbits at half the separation distance.
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
                href="/calculators/escape-velocity-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Escape Velocity Calculator</span>
                <p className="text-muted-foreground">Calculate velocity needed to escape a planet's gravity</p>
              </a>
              <a
                href="/calculators/gravitational-force-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Gravitational Force Calculator</span>
                <p className="text-muted-foreground">Calculate gravitational attraction between two masses</p>
              </a>
              <a
                href="/calculators/kepler-law-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Kepler's Law Calculator</span>
                <p className="text-muted-foreground">Explore relationships between orbital parameters</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
