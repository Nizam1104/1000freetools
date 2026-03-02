"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YeastConversion {
  inputAmount: number;
  inputUnit: string;
  activeDry: number;
  instant: number;
  fresh: number;
  rapidRise: number;
}

export default function YeastConversionCalculatorPage() {
  const [amount, setAmount] = useState<string>("");
  const [yeastType, setYeastType] = useState<string>("active-dry");
  const [result, setResult] = useState<YeastConversion | null>(null);

  // Conversion ratios (relative to active dry yeast = 1)
  const conversionRatios = {
    "active-dry": 1,
    "instant": 0.75,
    "rapid-rise": 0.75,
    "fresh": 2.5,
    "fresh-cake": 2.5,
  };

  const calculate = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const inputRatio = conversionRatios[yeastType as keyof typeof conversionRatios];

    // Convert everything to active dry equivalent first
    const activeDryEquivalent = amountNum / inputRatio;

    const conversions: YeastConversion = {
      inputAmount: amountNum,
      inputUnit: yeastType,
      activeDry: parseFloat((activeDryEquivalent * 1).toFixed(2)),
      instant: parseFloat((activeDryEquivalent * 0.75).toFixed(2)),
      fresh: parseFloat((activeDryEquivalent * 2.5).toFixed(2)),
      rapidRise: parseFloat((activeDryEquivalent * 0.75).toFixed(2)),
    };

    setResult(conversions);
  };

  const reset = () => {
    setAmount("");
    setYeastType("active-dry");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Yeast Conversion Calculator – Convert Between Dry, Instant & Fresh Yeast
          </h1>
          <p className="text-muted-foreground">
            Substitute yeast types without ruining your recipe using our Yeast Conversion Calculator.
            Convert between active dry yeast, instant yeast, and fresh yeast with accurate ratios —
            perfect for bakers who need to work with what&apos;s available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yeast-type">Your Yeast Type</Label>
                <Select value={yeastType} onValueChange={setYeastType}>
                  <SelectTrigger id="yeast-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active-dry">Active Dry Yeast</SelectItem>
                    <SelectItem value="instant">Instant Yeast</SelectItem>
                    <SelectItem value="rapid-rise">Rapid Rise Yeast</SelectItem>
                    <SelectItem value="fresh">Fresh Yeast (Cake)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex gap-2">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 7"
                    className="flex-1"
                  />
                  <select className="w-24 p-2 border rounded-md bg-background">
                    <option value="grams">grams</option>
                    <option value="tsp">tsp</option>
                    <option value="tbsp">tbsp</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Common measurements:
                </p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• 1 packet yeast = 7g = 2¼ tsp</li>
                  <li>• 1 oz yeast = 28g = 9 tsp</li>
                  <li>• 1 cake fresh yeast = 43g = 1.5 oz</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Conversions</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Your Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      {result.inputAmount}g {result.inputUnit.replace("-", " ")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Active Dry Yeast</span>
                      <span className="text-lg font-bold">{result.activeDry}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Instant Yeast</span>
                      <span className="text-lg font-bold">{result.instant}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Rapid Rise Yeast</span>
                      <span className="text-lg font-bold">{result.rapidRise}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Fresh Yeast (Cake)</span>
                      <span className="text-lg font-bold">{result.fresh}g</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Conversion Ratios:</strong>
                      <br />
                      1 part Instant = 1.33 parts Active Dry = 3.33 parts Fresh
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter amount and click Calculate to see conversions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Yeast Type Differences
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Active Dry Yeast:</strong> Granular, needs to be dissolved in
                    warm water before use. Most common type.
                  </li>
                  <li>
                    <strong>Instant Yeast:</strong> Finer granules, can be mixed directly
                    with flour. Works faster than active dry.
                  </li>
                  <li>
                    <strong>Rapid Rise Yeast:</strong> Similar to instant, formulated for
                    single-rise recipes.
                  </li>
                  <li>
                    <strong>Fresh Yeast (Cake):</strong> Moist, perishable blocks. Preferred
                    by professional bakers for flavor.
                  </li>
                </ul>
                <p className="pt-2">
                  <strong>Substitution Tips:</strong> When substituting, use less instant
                  yeast than active dry (about 25% less). Fresh yeast requires about 2.5x
                  the amount of dry yeast.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
