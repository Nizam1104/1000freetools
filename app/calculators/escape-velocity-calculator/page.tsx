"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EscapeVelocityCalculator() {
  const [mass, setMass] = useState<string>("");
  const [radius, setRadius] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const M = parseFloat(mass);
    const R = parseFloat(radius);
    const G = 6.67430e-11;

    if (M > 0 && R > 0) {
      const ve = Math.sqrt(2 * G * M / R);
      setResults({
        escapeVelocity: Math.round(ve * 100) / 100,
        kmPerSec: Math.round(ve / 1000 * 100) / 100,
      });
    }
  };

  const reset = () => {
    setMass(""); setRadius(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Mass (kg)</Label><Input value={mass} onChange={e => setMass(e.target.value)} placeholder="e.g., 5.97e24" /></div>
              <div><Label>Radius (m)</Label><Input value={radius} onChange={e => setRadius(e.target.value)} placeholder="e.g., 6371000" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Escape Velocity</p>
                  <p className="text-4xl font-bold">{results.escapeVelocity} m/s</p>
                  <p className="text-xl text-muted-foreground">{results.kmPerSec} km/s</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Escape Velocity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter the mass of the celestial body in kilograms.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter the radius from the center to the surface in meters.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see the escape velocity needed to break free from gravity.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Escape Velocity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is Escape Velocity</h4>
            <p className="text-sm text-muted-foreground">
              Escape velocity is the minimum speed needed to break free from a planet or moon's gravity without further propulsion. It's not about direction - you can go straight up or at an angle. Once you reach escape velocity, you'll keep going forever (unless another gravity well catches you). Earth's escape velocity is 11.2 km/s - about 25,000 mph.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">The Formula Explained</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Escape velocity comes from equating kinetic energy to gravitational potential energy:
            </p>
            <div className="p-4 bg-muted rounded-md">
              <p className="font-mono text-sm mb-2">v_e = √(2GM/R)</p>
              <p className="text-xs text-muted-foreground">
                G is the gravitational constant (6.674×10⁻¹¹), M is the body's mass, R is the radius. More mass means higher escape velocity. Larger radius (for the same mass) means lower escape velocity.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Escape Velocity vs Orbital Velocity</h4>
            <p className="text-sm text-muted-foreground">
              Orbital velocity is what keeps satellites circling Earth - about 7.8 km/s for low Earth orbit. Escape velocity is √2 times orbital velocity - about 11.2 km/s. Satellites stay in orbit. Escape velocity objects leave forever.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escape Velocities of Celestial Bodies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Body</TableHead>
                <TableHead>Escape Velocity</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Moon</TableCell>
                <TableCell className="font-mono">2.38 km/s</TableCell>
                <TableCell>Easy to launch from</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mars</TableCell>
                <TableCell className="font-mono">5.03 km/s</TableCell>
                <TableCell>Less than half of Earth's</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Venus</TableCell>
                <TableCell className="font-mono">10.36 km/s</TableCell>
                <TableCell>Similar to Earth</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Earth</TableCell>
                <TableCell className="font-mono">11.19 km/s</TableCell>
                <TableCell>25,020 mph</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Saturn</TableCell>
                <TableCell className="font-mono">36.09 km/s</TableCell>
                <TableCell>Gas giant</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jupiter</TableCell>
                <TableCell className="font-mono">60.20 km/s</TableCell>
                <TableCell>Highest in solar system</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sun</TableCell>
                <TableCell className="font-mono">617.5 km/s</TableCell>
                <TableCell>From surface (photosphere)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Black holes have escape velocities greater than the speed of light - which is why nothing escapes them.
          </p>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is Earth's escape velocity?",
    answer: "Earth's escape velocity is 11.2 km/s (25,020 mph or 40,270 km/h). This is the speed a rocket needs at Earth's surface to escape Earth's gravity without further propulsion.",
  },
{
    question: "Does escape velocity depend on the object's mass?",
    answer: "No. A feather and a rocket need the same escape velocity from the same planet. The planet's mass matters, not the escaping object's mass. Gravity pulls harder on heavier objects, but they also need more energy to accelerate - these effects cancel out.",
  },
{
    question: "Can you escape gravity at any speed?",
    answer: "With continuous propulsion, yes. Escape velocity is the speed needed for a ballistic (unpowered) trajectory. Rockets don't reach 11.2 km/s instantly - they accelerate continuously, burning fuel as they climb.",
  },
{
    question: "What happens if you go slower than escape velocity?",
    answer: "You'll either fall back down or go into orbit. Below escape velocity but above orbital velocity, you follow an elliptical path that eventually returns you to the starting point (unless you hit the planet first).",
  },
{
    question: "Why is escape velocity higher for gas giants?",
    answer: "Gas giants like Jupiter are much more massive than Earth. Jupiter is 318 times Earth's mass. Even though it's also larger (which reduces escape velocity), the mass effect dominates. Jupiter's escape velocity is 60 km/s - over 5 times Earth's.",
  }
  ]} />
</section>
    </div>
  );
}
