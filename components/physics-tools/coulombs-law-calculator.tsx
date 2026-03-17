"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Zap } from "lucide-react";

export default function CoulombsLawCalculator() {
  const [charge1, setCharge1] = useState("1e-6");
  const [charge2, setCharge2] = useState("1e-6");
  const [distance, setDistance] = useState("0.1");
  const [kConstant, setKConstant] = useState("8.987551787e9");
  const [result, setResult] = useState<{ force: number; type: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const q1 = parseFloat(charge1) || 0;
    const q2 = parseFloat(charge2) || 0;
    const r = parseFloat(distance) || 0.1;
    const k = parseFloat(kConstant) || 8.987551787e9;

    // F = k * |q1 * q2| / r^2
    const force = (k * Math.abs(q1 * q2)) / (r * r);
    const type = (q1 * q2) > 0 ? "Repulsive" : "Attractive";

    setResult({ force, type });
  }, [charge1, charge2, distance, kConstant]);

  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Coulomb's Law Result:\nq₁ = ${charge1} C, q₂ = ${charge2} C, r = ${distance} m\nForce = ${result.force.toExponential(4)} N (${result.type})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [result, charge1, charge2, distance]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Coulomb's Law Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">
              F = k × |q₁q₂| / r²
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Charge 1 (q₁) in Coulombs</Label>
              <Input
                type="text"
                value={charge1}
                onChange={(e) => setCharge1(e.target.value)}
                placeholder="e.g., 1e-6"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use scientific notation (e.g., 1e-6 for 1 μC)
              </p>
            </div>
            <div>
              <Label>Charge 2 (q₂) in Coulombs</Label>
              <Input
                type="text"
                value={charge2}
                onChange={(e) => setCharge2(e.target.value)}
                placeholder="e.g., 1e-6"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Distance (r) in meters</Label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Coulomb's Constant (k)</Label>
            <Input
              type="text"
              value={kConstant}
              onChange={(e) => setKConstant(e.target.value)}
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Default: 8.987551787×10⁹ N⋅m²/C²
            </p>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate Force
          </Button>

          {result && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg text-center ${
                result.type === "Repulsive" ? "bg-red-50 dark:bg-red-950" : "bg-green-50 dark:bg-green-950"
              }`}>
                <Label>Electrostatic Force</Label>
                <p className="text-3xl font-bold mt-2">
                  {result.force.toExponential(4)} N
                </p>
                <p className={`text-sm mt-1 ${
                  result.type === "Repulsive" ? "text-red-600" : "text-green-600"
                }`}>
                  {result.type} Force
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Quick Reference</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>Like charges: Repel</div>
                  <div>Opposite charges: Attract</div>
                </div>
              </div>

              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Results
              </Button>
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-semibold mb-2">About Coulomb's Law:</p>
            <p className="text-muted-foreground">
              Coulomb's Law describes the electrostatic force between two charged particles.
              The force is proportional to the product of the charges and inversely proportional
              to the square of the distance between them.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
