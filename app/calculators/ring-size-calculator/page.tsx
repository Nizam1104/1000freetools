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

interface RingSizeData {
  circumference: number;
  diameter: number;
  usSize: string;
  ukSize: string;
  euSize: string;
  japanSize: string;
  indiaSize: string;
}

const ringSizeChart: RingSizeData[] = [
  { circumference: 44.2, diameter: 14.1, usSize: "3", ukSize: "F", euSize: "44", japanSize: "4", indiaSize: "3" },
  { circumference: 45.5, diameter: 14.5, usSize: "3.5", ukSize: "G", euSize: "45", japanSize: "5", indiaSize: "3.5" },
  { circumference: 46.8, diameter: 14.9, usSize: "4", ukSize: "H", euSize: "47", japanSize: "6", indiaSize: "4" },
  { circumference: 48.0, diameter: 15.3, usSize: "4.5", ukSize: "I", euSize: "48", japanSize: "7", indiaSize: "4.5" },
  { circumference: 49.3, diameter: 15.7, usSize: "5", ukSize: "J", euSize: "49", japanSize: "8", indiaSize: "5" },
  { circumference: 50.6, diameter: 16.1, usSize: "5.5", ukSize: "K", euSize: "50", japanSize: "9", indiaSize: "5.5" },
  { circumference: 51.9, diameter: 16.5, usSize: "6", ukSize: "L", euSize: "52", japanSize: "10", indiaSize: "6" },
  { circumference: 53.1, diameter: 16.9, usSize: "6.5", ukSize: "M", euSize: "53", japanSize: "11", indiaSize: "6.5" },
  { circumference: 54.4, diameter: 17.3, usSize: "7", ukSize: "N", euSize: "54", japanSize: "12", indiaSize: "7" },
  { circumference: 55.7, diameter: 17.7, usSize: "7.5", ukSize: "O", euSize: "56", japanSize: "13", indiaSize: "7.5" },
  { circumference: 57.0, diameter: 18.1, usSize: "8", ukSize: "P", euSize: "57", japanSize: "14", indiaSize: "8" },
  { circumference: 58.3, diameter: 18.5, usSize: "8.5", ukSize: "Q", euSize: "58", japanSize: "15", indiaSize: "8.5" },
  { circumference: 59.5, diameter: 19.0, usSize: "9", ukSize: "R", euSize: "59", japanSize: "16", indiaSize: "9" },
  { circumference: 60.8, diameter: 19.4, usSize: "9.5", ukSize: "S", euSize: "61", japanSize: "17", indiaSize: "9.5" },
  { circumference: 62.1, diameter: 19.8, usSize: "10", ukSize: "T", euSize: "62", japanSize: "18", indiaSize: "10" },
  { circumference: 63.4, diameter: 20.2, usSize: "10.5", ukSize: "U", euSize: "63", japanSize: "19", indiaSize: "10.5" },
  { circumference: 64.6, diameter: 20.6, usSize: "11", ukSize: "V", euSize: "65", japanSize: "20", indiaSize: "11" },
  { circumference: 65.9, diameter: 21.0, usSize: "11.5", ukSize: "W", euSize: "66", japanSize: "21", indiaSize: "11.5" },
  { circumference: 67.2, diameter: 21.4, usSize: "12", ukSize: "X", euSize: "67", japanSize: "22", indiaSize: "12" },
  { circumference: 68.5, diameter: 21.8, usSize: "12.5", ukSize: "Y", euSize: "68", japanSize: "23", indiaSize: "12.5" },
  { circumference: 69.7, diameter: 22.2, usSize: "13", ukSize: "Z", euSize: "70", japanSize: "24", indiaSize: "13" },
];

export default function RingSizeCalculatorPage() {
  const [measurementType, setMeasurementType] = useState<string>("circumference");
  const [measurement, setMeasurement] = useState<string>("");
  const [unit, setUnit] = useState<string>("mm");
  const [result, setResult] = useState<RingSizeData | null>(null);

  const calculate = () => {
    const measurementNum = parseFloat(measurement);
    if (isNaN(measurementNum) || measurementNum <= 0) return;

    // Convert to mm if needed
    let circumference = measurementNum;
    let diameter = measurementNum;

    if (measurementType === "circumference") {
      if (unit === "inches") {
        circumference = measurementNum * 25.4;
      }
      diameter = circumference / Math.PI;
    } else {
      // diameter input
      if (unit === "inches") {
        diameter = measurementNum * 25.4;
      }
      circumference = diameter * Math.PI;
    }

    // Find closest ring size
    let closestSize = ringSizeChart[0];
    let minDiff = Infinity;

    for (const size of ringSizeChart) {
      const diff = Math.abs(size.circumference - circumference);
      if (diff < minDiff) {
        minDiff = diff;
        closestSize = size;
      }
    }

    setResult(closestSize);
  };

  const reset = () => {
    setMeasurement("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Ring Size Calculator – Find Your Ring Size in US, UK & EU Sizes
          </h1>
          <p className="text-muted-foreground">
            Find the perfect ring fit with our Ring Size Calculator.
            Measure your finger circumference or diameter to get your ring size
            in US, UK, EU, Japan, and India standards — essential before buying
            rings online or as a gift.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="measurement-type">Measurement Type</Label>
                <Select value={measurementType} onValueChange={setMeasurementType}>
                  <SelectTrigger id="measurement-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="circumference">Finger Circumference</SelectItem>
                    <SelectItem value="diameter">Ring Diameter (inside)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="measurement">Measurement</Label>
                  <Input
                    id="measurement"
                    type="number"
                    step="0.1"
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}
                    placeholder={measurementType === "circumference" ? "e.g., 52" : "e.g., 16.5"}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="inches">inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  How to Measure:
                </p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Wrap string/paper around finger base</li>
                  <li>Mark where it overlaps</li>
                  <li>Measure length in mm</li>
                  <li>Measure at end of day (fingers swell)</li>
                </ol>
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
              <h3 className="text-lg font-semibold mb-4">Ring Size Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Your Ring Size</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <div>
                        <p className="text-3xl font-bold text-primary">US {result.usSize}</p>
                        <p className="text-xs text-muted-foreground">US/Canada</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-primary">{result.ukSize}</p>
                        <p className="text-xs text-muted-foreground">UK/Australia</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-primary">{result.euSize}</p>
                        <p className="text-xs text-muted-foreground">EU</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Circumference</p>
                      <p className="text-lg font-semibold">{result.circumference} mm</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Diameter</p>
                      <p className="text-lg font-semibold">{result.diameter} mm</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Other Sizes</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Japan:</span>
                        <span className="font-medium">{result.japanSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">India:</span>
                        <span className="font-medium">{result.indiaSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Tip:</strong> Ring sizes can vary between jewelers.
                      When in doubt, size up - it&apos;s easier to resize down.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your measurement and click Calculate to see ring sizes</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Ring Size Chart
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">US</th>
                      <th className="text-right">UK</th>
                      <th className="text-right">EU</th>
                      <th className="text-right">Diameter</th>
                      <th className="text-right">Circumference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ringSizeChart.map((size, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2 font-medium">{size.usSize}</td>
                        <td className="text-right">{size.ukSize}</td>
                        <td className="text-right">{size.euSize}</td>
                        <td className="text-right">{size.diameter} mm</td>
                        <td className="text-right">{size.circumference} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
