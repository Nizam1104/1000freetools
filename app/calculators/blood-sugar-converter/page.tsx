"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BloodSugarConverter() {
  const [mgdl, setMgdl] = useState<string>("");
  const [mmol, setMmol] = useState<string>("");

  // Convert mg/dL to mmol/L when mg/dL changes
  const handleMgdlChange = (value: string) => {
    setMgdl(value);
    const mgValue = parseFloat(value);
    if (!isNaN(mgValue) && mgValue > 0) {
      const mmolValue = mgValue / 18;
      setMmol(mmolValue.toFixed(2));
    } else {
      setMmol("");
    }
  };

  // Convert mmol/L to mg/dL when mmol/L changes
  const handleMmolChange = (value: string) => {
    setMmol(value);
    const mmolValue = parseFloat(value);
    if (!isNaN(mmolValue) && mmolValue > 0) {
      const mgValue = mmolValue * 18;
      setMgdl(Math.round(mgValue).toString());
    } else {
      setMgdl("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Blood Sugar Converter – Free Glucose Unit Converter mg/dL to mmol/L</CardTitle>
          <CardDescription>
            Convert blood glucose levels between mg/dL and mmol/L instantly. Enter a value in either unit to see the conversion in real-time. Essential tool for diabetes management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="mgdl">Blood Glucose (mg/dL)</Label>
              <Input
                id="mgdl"
                type="number"
                placeholder="e.g., 100"
                value={mgdl}
                onChange={(e) => handleMgdlChange(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-[200px] h-px bg-border" />
              <span className="px-4 text-muted-foreground text-sm">↔</span>
              <div className="w-full max-w-[200px] h-px bg-border" />
            </div>

            <div>
              <Label htmlFor="mmol">Blood Glucose (mmol/L)</Label>
              <Input
                id="mmol"
                type="number"
                placeholder="e.g., 5.6"
                value={mmol}
                onChange={(e) => handleMmolChange(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Conversion Formula</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>mmol/L = mg/dL ÷ 18</p>
                <p>mg/dL = mmol/L × 18</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Blood Sugar Reference Ranges</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <div className="flex justify-between py-1 border-b">
                  <span>Fasting (normal):</span>
                  <span>70-100 mg/dL (3.9-5.6 mmol/L)</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span>Prediabetes:</span>
                  <span>100-125 mg/dL (5.6-6.9 mmol/L)</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span>Diabetes:</span>
                  <span>≥126 mg/dL (≥7.0 mmol/L)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>2hr after meal (normal):</span>
                  <span>&lt;140 mg/dL (&lt;7.8 mmol/L)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
