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

export default function GravitationalFieldCalculator() {
  const [mass, setMass] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const M = parseFloat(mass);
    const r = parseFloat(distance);
    const G = 6.67430e-11;

    if (M > 0 && r > 0) {
      const g = (G * M) / (r * r);
      setResults({
        fieldStrength: g,
        formatted: g.toExponential(4),
      });
    }
  };

  const reset = () => {
    setMass(""); setDistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Mass (kg)</Label><Input value={mass} onChange={e => setMass(e.target.value)} /></div>
              <div><Label>Distance from Center (m)</Label><Input value={distance} onChange={e => setDistance(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Gravitational Field Strength</p>
                <p className="text-4xl font-bold">{results.formatted} N/kg</p>
                <p className="text-sm text-muted-foreground mt-2">= {results.formatted} m/s²</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Gravitational Field Strength</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter the mass of the celestial body in kilograms.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter the distance from the center of the mass in meters.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see the gravitational field strength in N/kg or m/s².
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Gravitational Fields</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is Gravitational Field Strength</h4>
            <p className="text-sm text-muted-foreground">
              Gravitational field strength (g) tells you how strong gravity is at a specific point. It's measured in N/kg or m/s² - they're the same thing. On Earth's surface, g = 9.81 N/kg. That means every kilogram of mass experiences 9.81 newtons of gravitational force.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">The Inverse Square Law</h4>
            <p className="text-sm text-muted-foreground">
              Gravity gets weaker with distance squared. Double your distance from a planet's center, and gravity drops to 1/4. Triple the distance, it drops to 1/9. This is why astronauts in the ISS (400 km up) still experience about 90% of Earth's surface gravity - they're only slightly farther from Earth's center.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Field Strength vs Force</h4>
            <p className="text-sm text-muted-foreground">
              Field strength is property of the location. Force depends on what you put there. A 1 kg mass at Earth's surface feels 9.81 N. A 10 kg mass at the same spot feels 98.1 N. The field strength (9.81 N/kg) is the same for both.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gravitational Field Strength Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Field Strength (N/kg)</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Earth surface</TableCell>
                <TableCell className="font-mono">9.81</TableCell>
                <TableCell>Standard gravity</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Moon surface</TableCell>
                <TableCell className="font-mono">1.62</TableCell>
                <TableCell>1/6 of Earth's</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mars surface</TableCell>
                <TableCell className="font-mono">3.71</TableCell>
                <TableCell>38% of Earth's</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jupiter surface</TableCell>
                <TableCell className="font-mono">24.79</TableCell>
                <TableCell>2.5x Earth's</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sun surface</TableCell>
                <TableCell className="font-mono">274</TableCell>
                <TableCell>28x Earth's</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ISS orbit (400 km)</TableCell>
                <TableCell className="font-mono">~8.7</TableCell>
                <TableCell>Still 90% of surface</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Gas giants don't have solid surfaces - values are at the 1 bar pressure level (sea level equivalent).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the formula for gravitational field strength?</h4>
            <p className="text-sm text-muted-foreground">
              g = GM/r². G is the gravitational constant, M is the mass creating the field, r is distance from the center. For Earth, this gives 9.81 N/kg at the surface.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why is gravitational field strength the same as acceleration?</h4>
            <p className="text-sm text-muted-foreground">
              Because F = ma and F = mg both describe gravitational force. Set them equal: ma = mg, so a = g. A falling object accelerates at exactly the field strength. That's why g is measured in both N/kg and m/s².
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Does gravitational field strength change with altitude?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. At 10 km altitude (cruising altitude for jets), g drops to about 9.77 N/kg - a 0.4% decrease. At the ISS altitude of 400 km, it's about 8.7 N/kg. You'd need to go much higher to see dramatic changes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why is gravity weaker on the Moon?</h4>
            <p className="text-sm text-muted-foreground">
              The Moon is much less massive than Earth - about 1.2% of Earth's mass. Even though it's also smaller (which would increase surface gravity), the mass effect dominates. Result: 1.62 N/kg vs Earth's 9.81 N/kg.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can gravitational field strength be negative?</h4>
            <p className="text-sm text-muted-foreground">
              No. Field strength is always positive - it's the magnitude of the field. The direction is always toward the mass creating the field. We sometimes use negative signs in calculations to indicate direction, but the strength itself is positive.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
