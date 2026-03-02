"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BodySurfaceAreaCalculator() {
  const [height, setHeight] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "inches">("cm");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [formula, setFormula] = useState<string>("mosteller");
  const [bsa, setBsa] = useState<number | null>(null);

  const calculate = () => {
    let heightValue = parseFloat(height);
    let weightValue = parseFloat(weight);

    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) return;

    // Convert to cm and kg
    if (heightUnit === "inches") {
      heightValue = heightValue * 2.54;
    }
    if (weightUnit === "lbs") {
      weightValue = weightValue * 0.453592;
    }

    let result: number;

    switch (formula) {
      case "mosteller":
        // Mosteller: √(height(cm) × weight(kg) / 3600)
        result = Math.sqrt((heightValue * weightValue) / 3600);
        break;
      case "dubois":
        // DuBois: 0.007184 × h^0.725 × w^0.425
        result = 0.007184 * Math.pow(heightValue, 0.725) * Math.pow(weightValue, 0.425);
        break;
      case "haycock":
        // Haycock: 0.024265 × h^0.3964 × w^0.5378
        result = 0.024265 * Math.pow(heightValue, 0.3964) * Math.pow(weightValue, 0.5378);
        break;
      default:
        result = Math.sqrt((heightValue * weightValue) / 3600);
    }

    setBsa(Math.round(result * 100) / 100);
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBsa(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Body Surface Area Calculator – BSA Calculation for Medical Use</CardTitle>
          <CardDescription>
            Calculate your body surface area (BSA) quickly and accurately. Useful for medication dosing, chemotherapy, and clinical assessments using the Mosteller, DuBois, or Haycock formula.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={heightUnit} onValueChange={(v) => setHeightUnit(v as "cm" | "inches")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lbs")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="formula">Formula</Label>
              <Select value={formula} onValueChange={(v) => setFormula(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mosteller">Mosteller (Most Common)</SelectItem>
                  <SelectItem value="dubois">DuBois & DuBois</SelectItem>
                  <SelectItem value="haycock">Haycock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate BSA</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {bsa !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Body Surface Area ({formula.charAt(0).toUpperCase() + formula.slice(1)} formula)</p>
                <p className="text-4xl font-bold mt-1">{bsa} <span className="text-lg font-normal">m²</span></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
