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

export default function GravitationalForceCalculator() {
  const [mass1, setMass1] = useState<string>("");
  const [mass2, setMass2] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const G = 6.67430e-11; // Gravitational constant

  const calculate = () => {
    const m1 = parseFloat(mass1);
    const m2 = parseFloat(mass2);
    const r = parseFloat(distance);

    if (m1 > 0 && m2 > 0 && r > 0) {
      const F = (G * m1 * m2) / (r * r);
      const g1 = (G * m2) / (r * r); // Field strength at m1
      const g2 = (G * m1) / (r * r); // Field strength at m2
      setResults({ force: F, g1, g2 });
    }
  };

  const reset = () => {
    setMass1("");
    setMass2("");
    setDistance("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Mass 1 (kg)</Label>
                <Input type="number" value={mass1} onChange={(e) => setMass1(e.target.value)} placeholder="e.g., 5.97e24" />
              </div>
              <div>
                <Label>Mass 2 (kg)</Label>
                <Input type="number" value={mass2} onChange={(e) => setMass2(e.target.value)} placeholder="e.g., 1000" />
              </div>
              <div>
                <Label>Distance (m)</Label>
                <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 6371000" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Force</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Gravitational Force</p>
                  <p className="text-4xl font-bold">{results.force.toExponential(4)} N</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Field at Mass 1</p>
                    <p className="text-xl font-bold">{results.g1.toExponential(4)} m/s²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Field at Mass 2</p>
                    <p className="text-xl font-bold">{results.g2.toExponential(4)} m/s²</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formula: F = G × m₁ × m₂ / r² where G = 6.674×10⁻¹¹ N·m²/kg²
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Gravitational Force</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter the mass of the first object in kilograms.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter the mass of the second object and the distance between their centers.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see the gravitational attraction force in newtons.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Newton's Law of Gravitation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">The Universal Law</h4>
            <p className="text-sm text-muted-foreground">
              Every mass attracts every other mass. The force depends on two things: the masses involved and how far apart they are. Double either mass, double the force. Double the distance, and the force drops to 1/4. This law works for apples falling from trees and galaxies orbiting each other.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why Don't We Feel Everyday Gravitational Forces?</h4>
            <p className="text-sm text-muted-foreground">
              You're attracted to everything around you - your laptop, your car, other people. But gravity is incredibly weak compared to other forces. The gravitational pull between two 70 kg people standing 1 meter apart is about 0.0000003 newtons - less than the weight of a grain of sand. You need planet-sized masses to feel significant gravity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">The Gravitational Constant G</h4>
            <p className="text-sm text-muted-foreground">
              G = 6.674×10⁻¹¹ N·m²/kg² is one of the smallest constants in physics. This tiny number explains why gravity is so weak. Compare it to the electrostatic constant (9×10⁹) - electromagnetic forces are 10²⁰ times stronger than gravity. That's why a tiny magnet can lift a paperclip against Earth's entire gravitational pull.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gravitational Force Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Object 1</TableHead>
                <TableHead>Object 2</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Force</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Earth</TableCell>
                <TableCell>1 kg mass</TableCell>
                <TableCell className="font-mono">6,371 km</TableCell>
                <TableCell className="font-mono">9.81 N</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Earth</TableCell>
                <TableCell>Moon</TableCell>
                <TableCell className="font-mono">384,400 km</TableCell>
                <TableCell className="font-mono">2.0×10²⁰ N</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sun</TableCell>
                <TableCell>Earth</TableCell>
                <TableCell className="font-mono">150 million km</TableCell>
                <TableCell className="font-mono">3.5×10²² N</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Person (70 kg)</TableCell>
                <TableCell>Person (70 kg)</TableCell>
                <TableCell className="font-mono">1 m</TableCell>
                <TableCell className="font-mono">3.3×10⁻⁷ N</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Car (1,500 kg)</TableCell>
                <TableCell>Car (1,500 kg)</TableCell>
                <TableCell className="font-mono">1 m</TableCell>
                <TableCell className="font-mono">1.5×10⁻⁴ N</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Gravitational force is always attractive - it never repels. This is different from electromagnetic forces which can attract or repel.
          </p>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is Newton's law of gravitation?",
    answer: "F = G × m₁ × m₂ / r². Every mass attracts every other mass with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.",
  },
{
    question: "Is gravitational force always attractive?",
    answer: "Yes. Unlike electric charges which can attract or repel, mass only attracts other mass. There's no such thing as negative mass (as far as we know), so gravity only pulls, never pushes.",
  },
{
    question: "Why is gravity considered a weak force?",
    answer: "The gravitational constant G is extremely small (10⁻¹¹). A tiny magnet can overcome Earth's gravity to pick up a paperclip. Gravity dominates at large scales only because mass is always positive and adds up, while electric charges tend to cancel out.",
  },
{
    question: "Does the gravitational force between Earth and Sun change?",
    answer: "Yes. Earth's orbit is elliptical, not circular. At perihelion (closest approach in January), the force is about 7% stronger than at aphelion (farthest point in July). This doesn't cause seasons - that's from Earth's axial tilt.",
  },
{
    question: "What happens to gravitational force inside a planet?",
    answer: "Inside a uniform sphere, only the mass below you contributes to gravity. At Earth's center, you'd be weightless - all the mass pulls equally in all directions. The force decreases linearly as you go down (assuming uniform density).",
  }
  ]} />
</section>
    </div>
  );
}
