"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OneRMCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [results, setResults] = useState<{formula: string, value: number}[]>([]);

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);

    if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0) return;

    // Epley: weight × (1 + reps/30)
    const epley = w * (1 + r / 30);
    
    // Brzycki: weight × 36/(37-reps)
    const brzycki = r < 37 ? w * (36 / (37 - r)) : epley;
    
    // Lander: weight × (100 / (101.3 - 2.67123 × reps))
    const lander = w * (100 / (101.3 - 2.67123 * r));
    
    // Lombardi: weight × reps^0.10
    const lombardi = w * Math.pow(r, 0.10);

    setResults([
      { formula: "Epley", value: Math.round(epley) },
      { formula: "Brzycki", value: Math.round(brzycki) },
      { formula: "Lander", value: Math.round(lander) },
      { formula: "Lombardi", value: Math.round(lombardi) },
      { formula: "Average", value: Math.round((epley + brzycki + lander + lombardi) / 4) },
    ]);
  };

  const reset = () => {
    setWeight("");
    setReps("");
    setResults([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>1RM Calculator – Calculate Your One Rep Max for Any Lift</CardTitle>
          <CardDescription>
            Find your one-rep max without maxing out. Enter the weight and reps you lifted to calculate your estimated 1RM and set smarter strength training goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight Lifted</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "kg" | "lbs")}>
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
              <Label htmlFor="reps">Repetitions Performed</Label>
              <Input
                id="reps"
                type="number"
                placeholder="e.g., 5"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                For best accuracy, use 3-10 reps
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate 1RM</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-3">Estimated One Rep Max</p>
                <div className="space-y-2">
                  {results.map((item) => (
                    <div key={item.formula} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium">{item.formula}</span>
                      <span className="text-lg font-semibold">{item.value} {unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
