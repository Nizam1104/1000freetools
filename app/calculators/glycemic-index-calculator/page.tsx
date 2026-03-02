"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GI_DATABASE: Record<string, { gi: number; serving: string }> = {
  "White bread": { gi: 75, serving: "1 slice (30g)" },
  "Whole wheat bread": { gi: 69, serving: "1 slice (30g)" },
  "Bagel": { gi: 72, serving: "1 medium (100g)" },
  "White rice": { gi: 73, serving: "1 cup cooked (150g)" },
  "Brown rice": { gi: 68, serving: "1 cup cooked (150g)" },
  "Basmati rice": { gi: 59, serving: "1 cup cooked (150g)" },
  "Potato (boiled)": { gi: 78, serving: "1 medium (150g)" },
  "Sweet potato": { gi: 63, serving: "1 medium (150g)" },
  "Pasta (white)": { gi: 49, serving: "1 cup cooked (140g)" },
  "Pasta (whole wheat)": { gi: 48, serving: "1 cup cooked (140g)" },
  "Oatmeal": { gi: 55, serving: "1 cup cooked (250g)" },
  "Corn flakes": { gi: 81, serving: "1 cup (30g)" },
  "Banana (ripe)": { gi: 51, serving: "1 medium (120g)" },
  "Apple": { gi: 36, serving: "1 medium (120g)" },
  "Orange": { gi: 43, serving: "1 medium (130g)" },
  "Grapes": { gi: 53, serving: "1 cup (150g)" },
  "Watermelon": { gi: 76, serving: "1 cup diced (150g)" },
  "Carrots (cooked)": { gi: 39, serving: "1/2 cup (80g)" },
  "Chickpeas": { gi: 28, serving: "1/2 cup (80g)" },
  "Lentils": { gi: 32, serving: "1/2 cup (100g)" },
  "Black beans": { gi: 30, serving: "1/2 cup (85g)" },
  "Milk (whole)": { gi: 39, serving: "1 cup (250ml)" },
  "Yogurt (plain)": { gi: 14, serving: "1 cup (200g)" },
  "Ice cream": { gi: 51, serving: "1/2 cup (65g)" },
  "Chocolate": { gi: 49, serving: "1 bar (50g)" },
  "Honey": { gi: 61, serving: "1 tbsp (21g)" },
  "Sugar (table)": { gi: 65, serving: "1 tbsp (12g)" },
};

export default function GlycemicIndexCalculator() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [customGi, setCustomGi] = useState<string>("");
  const [result, setResult] = useState<{ gi: number; category: string; serving: string } | null>(null);

  const getCategory = (gi: number): string => {
    if (gi <= 55) return "Low GI";
    if (gi <= 69) return "Medium GI";
    return "High GI";
  };

  const handleFoodSelect = (food: string) => {
    setSelectedFood(food);
    const data = GI_DATABASE[food];
    setResult({
      gi: data.gi,
      category: getCategory(data.gi),
      serving: data.serving,
    });
    setCustomGi("");
  };

  const calculateCustom = () => {
    const giValue = parseFloat(customGi);
    if (isNaN(giValue) || giValue <= 0) return;

    setResult({
      gi: giValue,
      category: getCategory(giValue),
      serving: "Custom value",
    });
  };

  const filteredFoods = Object.keys(GI_DATABASE).filter((food) =>
    food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const reset = () => {
    setSearchTerm("");
    setSelectedFood("");
    setCustomGi("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Glycemic Index Calculator – Find the GI of Any Food</CardTitle>
          <CardDescription>
            Manage blood sugar and energy levels with our glycemic index tool. Look up GI values for common foods to make smarter dietary choices for diabetes management or performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="search">Search Food Database</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search for a food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm && (
              <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-1">
                {filteredFoods.map((food) => (
                  <Button
                    key={food}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleFoodSelect(food)}
                  >
                    {food} (GI: {GI_DATABASE[food].gi})
                  </Button>
                ))}
              </div>
            )}

            <div>
              <Label htmlFor="customGi">Or Enter Custom GI Value</Label>
              <div className="flex gap-2">
                <Input
                  id="customGi"
                  type="number"
                  placeholder="e.g., 55"
                  value={customGi}
                  onChange={(e) => setCustomGi(e.target.value)}
                />
                <Button onClick={calculateCustom}>Calculate</Button>
              </div>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  {selectedFood || "Custom Value"}
                </p>
                <p className="text-4xl font-bold mt-1">{result.gi}</p>
                <p className="text-lg font-medium mt-2">{result.category}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Typical serving: {result.serving}
                </p>
                <div className="mt-3 text-sm">
                  <p className="font-medium">GI Categories:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Low: 1-55</li>
                    <li>Medium: 56-69</li>
                    <li>High: 70+</li>
                  </ul>
                </div>
              </div>
            )}

            <Button variant="outline" onClick={reset} className="w-full">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
