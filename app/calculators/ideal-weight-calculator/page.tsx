"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState<string>("");
  const [results, setResults] = useState<{
    devine: number;
    robinson: number;
    miller: number;
    hamwi: number;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (isNaN(h) || h <= 0) return;

    let heightCm: number;
    let heightInches: number;

    if (unit === "metric") {
      heightCm = h;
      heightInches = h / 2.54;
    } else {
      heightCm = h * 2.54;
      heightInches = h;
    }

    // Height over 5 feet (60 inches)
    const heightOver5Feet = heightInches - 60;

    // Devine formula (1974)
    // Men: 50 kg + 2.3 kg per inch over 5 feet
    // Women: 45.5 kg + 2.3 kg per inch over 5 feet
    const devine = gender === "male"
      ? 50 + 2.3 * heightOver5Feet
      : 45.5 + 2.3 * heightOver5Feet;

    // Robinson formula (1983)
    // Men: 52 kg + 1.9 kg per inch over 5 feet
    // Women: 49 kg + 1.7 kg per inch over 5 feet
    const robinson = gender === "male"
      ? 52 + 1.9 * heightOver5Feet
      : 49 + 1.7 * heightOver5Feet;

    // Miller formula (1983)
    // Men: 56.2 kg + 1.41 kg per inch over 5 feet
    // Women: 53.1 kg + 1.36 kg per inch over 5 feet
    const miller = gender === "male"
      ? 56.2 + 1.41 * heightOver5Feet
      : 53.1 + 1.36 * heightOver5Feet;

    // Hamwi formula (1964)
    // Men: 48 kg + 2.7 kg per inch over 5 feet
    // Women: 45.5 kg + 2.2 kg per inch over 5 feet
    const hamwi = gender === "male"
      ? 48 + 2.7 * heightOver5Feet
      : 45.5 + 2.2 * heightOver5Feet;

    setResults({
      devine: Math.round(devine * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      miller: Math.round(miller * 10) / 10,
      hamwi: Math.round(hamwi * 10) / 10,
    });
  };

  const reset = () => {
    setHeight("");
    setResults(null);
  };

  const convertToLbs = (kg: number) => Math.round(kg * 2.20462 * 10) / 10;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Ideal Weight Calculator – What Is Your Ideal Body Weight?</CardTitle>
          <CardDescription>
            Discover your ideal weight range with our free calculator. Based on your height and gender, we apply multiple scientific formulas to give you a healthy target weight.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as "male" | "female")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Unit System</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Ideal Weight</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Your Ideal Weight Range</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Devine Formula</p>
                    <p className="text-xl font-bold">
                      {results.devine} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.devine) : results.devine * 2.20462} lbs)
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Robinson Formula</p>
                    <p className="text-xl font-bold">
                      {results.robinson} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.robinson) : results.robinson * 2.20462} lbs)
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Miller Formula</p>
                    <p className="text-xl font-bold">
                      {results.miller} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.miller) : results.miller * 2.20462} lbs)
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Hamwi Formula</p>
                    <p className="text-xl font-bold">
                      {results.hamwi} kg
                      <span className="text-sm font-normal ml-1">
                        ({unit === "metric" ? convertToLbs(results.hamwi) : results.hamwi * 2.20462} lbs)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Average: <span className="font-semibold">
                      {Math.round((results.devine + results.robinson + results.miller + results.hamwi) / 4 * 10) / 10} kg
                      <span className="font-normal">
                        ({unit === "metric" 
                          ? Math.round((results.devine + results.robinson + results.miller + results.hamwi) / 4 * 2.20462 * 10) / 10 
                          : Math.round((results.devine + results.robinson + results.miller + results.hamwi) / 4 * 2.20462 * 10) / 10} lbs)
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
