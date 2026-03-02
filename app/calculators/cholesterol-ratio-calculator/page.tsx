"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CholesterolRatioCalculator() {
  const [totalCholesterol, setTotalCholesterol] = useState<string>("");
  const [hdl, setHdl] = useState<string>("");
  const [ldl, setLdl] = useState<string>("");
  const [triglycerides, setTriglycerides] = useState<string>("");
  const [results, setResults] = useState<{
    totalHdlRatio: number;
    ldlHdlRatio: number;
    totalHdlRisk: string;
    ldlHdlRisk: string;
  } | null>(null);

  const calculate = () => {
    const total = parseFloat(totalCholesterol);
    const hdlValue = parseFloat(hdl);
    const ldlValue = parseFloat(ldl);
    const trigs = parseFloat(triglycerides);

    if (isNaN(total) || isNaN(hdlValue) || isNaN(ldlValue) || isNaN(trigs) || 
        total <= 0 || hdlValue <= 0 || ldlValue <= 0 || trigs <= 0) return;

    // Calculate ratios
    const totalHdlRatio = total / hdlValue;
    const ldlHdlRatio = ldlValue / hdlValue;

    // Risk assessment for Total/HDL ratio
    let totalHdlRisk: string;
    if (totalHdlRatio < 3.5) {
      totalHdlRisk = "Optimal";
    } else if (totalHdlRatio < 5) {
      totalHdlRisk = "Good";
    } else if (totalHdlRatio < 7) {
      totalHdlRisk = "Average";
    } else {
      totalHdlRisk = "High Risk";
    }

    // Risk assessment for LDL/HDL ratio
    let ldlHdlRisk: string;
    if (ldlHdlRatio < 2) {
      ldlHdlRisk = "Optimal";
    } else if (ldlHdlRatio < 3) {
      ldlHdlRisk = "Good";
    } else if (ldlHdlRatio < 4) {
      ldlHdlRisk = "Average";
    } else {
      ldlHdlRisk = "High Risk";
    }

    setResults({
      totalHdlRatio: Math.round(totalHdlRatio * 10) / 10,
      ldlHdlRatio: Math.round(ldlHdlRatio * 10) / 10,
      totalHdlRisk,
      ldlHdlRisk,
    });
  };

  const reset = () => {
    setTotalCholesterol("");
    setHdl("");
    setLdl("");
    setTriglycerides("");
    setResults(null);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Optimal":
        return "text-green-600";
      case "Good":
        return "text-blue-600";
      case "Average":
        return "text-yellow-600";
      case "High Risk":
        return "text-red-600";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Cholesterol Ratio Calculator – Free Heart Health Risk Assessment</CardTitle>
          <CardDescription>
            Calculate your cholesterol ratios to assess heart disease risk. Enter your lipid panel results to get your Total/HDL and LDL/HDL ratios with risk assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="totalCholesterol">Total Cholesterol (mg/dL)</Label>
              <Input
                id="totalCholesterol"
                type="number"
                placeholder="e.g., 200"
                value={totalCholesterol}
                onChange={(e) => setTotalCholesterol(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="hdl">HDL (Good) Cholesterol (mg/dL)</Label>
              <Input
                id="hdl"
                type="number"
                placeholder="e.g., 50"
                value={hdl}
                onChange={(e) => setHdl(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="ldl">LDL (Bad) Cholesterol (mg/dL)</Label>
              <Input
                id="ldl"
                type="number"
                placeholder="e.g., 100"
                value={ldl}
                onChange={(e) => setLdl(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
              <Input
                id="triglycerides"
                type="number"
                placeholder="e.g., 150"
                value={triglycerides}
                onChange={(e) => setTriglycerides(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Ratios</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Total/HDL Ratio</p>
                    <p className="text-3xl font-bold mt-1">{results.totalHdlRatio}</p>
                    <p className={`text-sm font-medium mt-1 ${getRiskColor(results.totalHdlRisk)}`}>
                      {results.totalHdlRisk}
                    </p>
                  </div>

                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">LDL/HDL Ratio</p>
                    <p className="text-3xl font-bold mt-1">{results.ldlHdlRatio}</p>
                    <p className={`text-sm font-medium mt-1 ${getRiskColor(results.ldlHdlRisk)}`}>
                      {results.ldlHdlRisk}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Risk Assessment Guide</p>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p><span className="text-green-600 font-medium">Optimal:</span> Total/HDL &lt; 3.5, LDL/HDL &lt; 2</p>
                    <p><span className="text-blue-600 font-medium">Good:</span> Total/HDL 3.5-5, LDL/HDL 2-3</p>
                    <p><span className="text-yellow-600 font-medium">Average:</span> Total/HDL 5-7, LDL/HDL 3-4</p>
                    <p><span className="text-red-600 font-medium">High Risk:</span> Total/HDL &gt; 7, LDL/HDL &gt; 4</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  These ratios help assess cardiovascular disease risk. Lower ratios indicate better heart health. Consult your healthcare provider for personalized interpretation.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
