"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GI_FOODS: Record<string, number> = {
  "White bread": 75,
  "Whole wheat bread": 69,
  "White rice": 73,
  "Brown rice": 68,
  "Potato": 78,
  "Sweet potato": 63,
  "Pasta": 49,
  "Oatmeal": 55,
  "Banana": 51,
  "Apple": 36,
  "Orange": 43,
  "Carrots": 39,
  "Watermelon": 76,
  "Chickpeas": 28,
  "Lentils": 32,
};

export default function GlycemicLoadCalculator() {
  const [gi, setGi] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [glycemicLoad, setGlycemicLoad] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculate = () => {
    const giValue = parseFloat(gi);
    const carbsValue = parseFloat(carbs);

    if (isNaN(giValue) || isNaN(carbsValue) || giValue <= 0 || carbsValue <= 0) return;

    const gl = (giValue * carbsValue) / 100;
    setGlycemicLoad(Math.round(gl * 10) / 10);

    if (gl <= 10) {
      setCategory("Low GL");
    } else if (gl <= 20) {
      setCategory("Medium GL");
    } else {
      setCategory("High GL");
    }
  };

  const handleFoodSelect = (food: string) => {
    setSelectedFood(food);
    setGi(GI_FOODS[food].toString());
  };

  const reset = () => {
    setGi("");
    setCarbs("");
    setSelectedFood("");
    setGlycemicLoad(null);
    setCategory("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Quick Select Food (optional)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.keys(GI_FOODS).map((food) => (
                  <Button
                    key={food}
                    variant={selectedFood === food ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFoodSelect(food)}
                  >
                    {food}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="gi">Glycemic Index (GI)</Label>
              <Input
                id="gi"
                type="number"
                placeholder="e.g., 50"
                value={gi}
                onChange={(e) => setGi(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">GI ranges: Low (1-55), Medium (56-69), High (70+)</p>
            </div>

            <div>
              <Label htmlFor="carbs">Total Carbohydrates (grams)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="e.g., 30"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Glycemic Load</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {glycemicLoad !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Glycemic Load</p>
                <p className="text-4xl font-bold mt-1">{glycemicLoad}</p>
                <p className="text-lg font-medium mt-2">{category}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Formula: GL = (GI × Carbs) / 100
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
