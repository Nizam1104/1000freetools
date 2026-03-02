"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ChildHeightPredictor() {
  const [fatherHeight, setFatherHeight] = useState<string>("");
  const [motherHeight, setMotherHeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [predictedHeight, setPredictedHeight] = useState<number | null>(null);
  const [heightRange, setHeightRange] = useState<{ min: number; max: number } | null>(null);

  const calculate = () => {
    const father = parseFloat(fatherHeight);
    const mother = parseFloat(motherHeight);

    if (isNaN(father) || isNaN(mother) || father <= 0 || mother <= 0 || !gender) return;

    let predicted: number;

    // Mid-parental height method
    if (gender === "boy") {
      predicted = (father + mother + 13) / 2;
    } else {
      predicted = (father + mother - 13) / 2;
    }

    setPredictedHeight(Math.round(predicted * 10) / 10);
    setHeightRange({
      min: Math.round((predicted - 10) * 10) / 10,
      max: Math.round((predicted + 10) * 10) / 10,
    });
  };

  const reset = () => {
    setFatherHeight("");
    setMotherHeight("");
    setGender("");
    setPredictedHeight(null);
    setHeightRange(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Child Height Predictor – Free Adult Height Calculator</CardTitle>
          <CardDescription>
            Predict your child's adult height using the mid-parental height method. Enter both parents' heights and the child's gender to get an estimated adult height with a normal range.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fatherHeight">Father's Height (cm)</Label>
              <Input
                id="fatherHeight"
                type="number"
                placeholder="e.g., 180"
                value={fatherHeight}
                onChange={(e) => setFatherHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="motherHeight">Mother's Height (cm)</Label>
              <Input
                id="motherHeight"
                type="number"
                placeholder="e.g., 165"
                value={motherHeight}
                onChange={(e) => setMotherHeight(e.target.value)}
              />
            </div>

            <div>
              <Label>Child's Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boy">Boy</SelectItem>
                  <SelectItem value="girl">Girl</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Predict Height</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {predictedHeight !== null && heightRange && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Predicted Adult Height</p>
                  <p className="text-4xl font-bold mt-1">{predictedHeight} cm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Normal Range (±10 cm)</p>
                  <p className="text-lg font-medium mt-1">
                    {heightRange.min} cm – {heightRange.max} cm
                  </p>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  This prediction uses the mid-parental height method. Actual height may vary based on genetics, nutrition, and other factors.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
