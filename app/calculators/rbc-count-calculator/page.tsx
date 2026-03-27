"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Activity, Droplets } from "lucide-react";
import Faqs from "@/components/utils/Faqs";


interface RBCResult {
  rbcCount: number;
  unit: string;
  category: string;
  hbEstimate: number;
  hctEstimate: number;
}

export default function RbcCountCalculatorPage() {
  const [cellsCounted, setCellsCounted] = useState<string>("");
  const [dilutionFactor, setDilutionFactor] = useState<string>("200");
  const [squaresCounted, setSquaresCounted] = useState<string>("5");
  const [result, setResult] = useState<RBCResult | null>(null);

  const calculateRBC = () => {
    const cells = parseFloat(cellsCounted);
    const dilution = parseFloat(dilutionFactor);
    const squares = parseFloat(squaresCounted);

    if (isNaN(cells) || isNaN(dilution) || isNaN(squares) || cells <= 0 || dilution <= 0 || squares <= 0) {
      setResult(null);
      return;
    }

    const rbcCount = (cells * dilution) / (squares * 0.004);
    const rbcInMillions = rbcCount / 1000000;

    let category = "";
    if (rbcInMillions < 4.0) category = "Low (Anemia)";
    else if (rbcInMillions < 4.5) category = "Below Normal";
    else if (rbcInMillions <= 5.5) category = "Normal";
    else if (rbcInMillions <= 6.0) category = "Above Normal";
    else category = "High (Polycythemia)";

    const hbEstimate = rbcInMillions * 3.3;
    const hctEstimate = rbcInMillions * 9;

    setResult({
      rbcCount: Math.round(rbcCount * 100) / 100,
      unit: "cells/μL",
      category,
      hbEstimate: Math.round(hbEstimate * 10) / 10,
      hctEstimate: Math.round(hctEstimate * 10) / 10,
    });
  };

  const reset = () => {
    setCellsCounted("");
    setDilutionFactor("200");
    setSquaresCounted("5");
    setResult(null);
  };

  useEffect(() => {
    calculateRBC();
  }, [cellsCounted, dilutionFactor, squaresCounted]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">RBC Count Calculator – Calculate Red Blood Cell Count from Hemocytometer</h1>
          <p className="text-muted-foreground">
            Calculate red blood cell concentration from hemocytometer counts. This laboratory calculator uses standard Neubauer chamber calculations to determine RBC count per microliter of blood.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Hemocytometer Data</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cellsCounted">Cells Counted</Label>
                    <Input
                      id="cellsCounted"
                      type="number"
                      placeholder="e.g., 500"
                      value={cellsCounted}
                      onChange={(e) => setCellsCounted(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dilutionFactor">Dilution Factor</Label>
                    <select
                      id="dilutionFactor"
                      value={dilutionFactor}
                      onChange={(e) => setDilutionFactor(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="100">1:100 (100x)</option>
                      <option value="200">1:200 (200x)</option>
                      <option value="50">1:50 (50x)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squaresCounted">Squares Counted</Label>
                    <select
                      id="squaresCounted"
                      value={squaresCounted}
                      onChange={(e) => setSquaresCounted(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="5">5 squares (RBC standard)</option>
                      <option value="4">4 squares (corners)</option>
                      <option value="9">9 squares (full grid)</option>
                      <option value="1">1 square (center)</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Standard RBC count uses 1:200 dilution and counts 5 squares (4 corners + center) of the Neubauer chamber.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRBC} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">RBC Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">RBC Count</p>
                    <p className="text-3xl font-bold text-primary">{(result.rbcCount / 1000000).toFixed(2)} million/μL</p>
                    <p className="text-sm text-muted-foreground">{result.rbcCount.toLocaleString()} cells/μL</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Est. Hemoglobin</p>
                      <p className="text-lg font-semibold">{result.hbEstimate} g/dL</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Est. Hematocrit</p>
                      <p className="text-lg font-semibold">{result.hctEstimate}%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Interpretation</p>
                    <p className="font-semibold">{result.category}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Normal ranges:</strong></p>
                    <p>Men: 4.5-5.5 million/μL</p>
                    <p>Women: 4.0-5.0 million/μL</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Droplets className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter hemocytometer count to calculate RBC</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">RBC Count Reference Ranges</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Adult Reference Ranges:
                </h4>
                <ul className="space-y-1">
                  <li><strong>Men:</strong> 4.5-5.5 million/μL</li>
                  <li><strong>Women:</strong> 4.0-5.0 million/μL</li>
                  <li><strong>Pregnant women:</strong> 3.5-5.0 million/μL</li>
                  <li><strong>Children:</strong> 4.0-5.2 million/μL</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Related Values:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Hemoglobin: Men 13.5-17.5, Women 12-16 g/dL</li>
                  <li>Hematocrit: Men 41-50%, Women 36-46%</li>
                  <li>MCV: 80-100 fL</li>
                  <li>MCH: 27-31 pg</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is a normal RBC count?",
    answer: "Normal RBC count is 4.5-5.5 million cells/μL for men and 4.0-5.0 million cells/μL for women. Values vary by age, altitude, and health status.",
  },
{
    question: "What does low RBC count mean?",
    answer: "Low RBC count indicates anemia, which can be caused by iron deficiency, vitamin B12/folate deficiency, blood loss, or bone marrow problems.",
  },
{
    question: "What does high RBC count mean?",
    answer: "High RBC count (polycythemia) can result from dehydration, living at high altitude, lung disease, or bone marrow disorders. It increases blood viscosity.",
  },
{
    question: "How is RBC count performed?",
    answer: "Blood is diluted (typically 1:200), loaded into a hemocytometer, and cells are counted under a microscope in designated squares. The count is then calculated using the dilution factor.",
  },
{
    question: "What is the formula for RBC count?",
    answer: "RBC/μL = (Cells counted × Dilution factor) / (Number of squares × Volume per square). For standard RBC count: (Cells × 200) / (5 × 0.004).",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
