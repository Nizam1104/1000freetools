"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Activity, Shield } from "lucide-react";

interface WBCResult {
  wbcCount: number;
  unit: string;
  category: string;
  neutrophils: number;
  lymphocytes: number;
}

export default function WbcCountCalculatorPage() {
  const [cellsCounted, setCellsCounted] = useState<string>("");
  const [dilutionFactor, setDilutionFactor] = useState<string>("20");
  const [squaresCounted, setSquaresCounted] = useState<string>("4");
  const [result, setResult] = useState<WBCResult | null>(null);

  const calculateWBC = () => {
    const cells = parseFloat(cellsCounted);
    const dilution = parseFloat(dilutionFactor);
    const squares = parseFloat(squaresCounted);

    if (isNaN(cells) || isNaN(dilution) || isNaN(squares) || cells <= 0 || dilution <= 0 || squares <= 0) {
      setResult(null);
      return;
    }

    const wbcCount = (cells * dilution) / (squares * 0.1);
    const wbcInThousands = wbcCount / 1000;

    let category = "";
    if (wbcInThousands < 4.0) category = "Low (Leukopenia)";
    else if (wbcInThousands < 4.5) category = "Below Normal";
    else if (wbcInThousands <= 11.0) category = "Normal";
    else if (wbcInThousands <= 15.0) category = "Above Normal";
    else category = "High (Leukocytosis)";

    const neutrophils = wbcInThousands * 0.60;
    const lymphocytes = wbcInThousands * 0.30;

    setResult({
      wbcCount: Math.round(wbcCount * 100) / 100,
      unit: "cells/μL",
      category,
      neutrophils: Math.round(neutrophils * 100) / 100,
      lymphocytes: Math.round(lymphocytes * 100) / 100,
    });
  };

  const reset = () => {
    setCellsCounted("");
    setDilutionFactor("20");
    setSquaresCounted("4");
    setResult(null);
  };

  useEffect(() => {
    calculateWBC();
  }, [cellsCounted, dilutionFactor, squaresCounted]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">WBC Count Calculator – Calculate White Blood Cell Count from Hemocytometer</h1>
          <p className="text-muted-foreground">
            Calculate white blood cell concentration from hemocytometer counts. This laboratory calculator determines WBC count per microliter for immune system assessment and infection monitoring.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Hemocytometer Data</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cellsCounted">WBCs Counted</Label>
                    <Input
                      id="cellsCounted"
                      type="number"
                      placeholder="e.g., 150"
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
                      <option value="10">1:10 (10x)</option>
                      <option value="20">1:20 (20x)</option>
                      <option value="100">1:100 (100x)</option>
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
                      <option value="4">4 corner squares (standard)</option>
                      <option value="9">9 squares (full grid)</option>
                      <option value="1">1 large square</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Standard WBC count uses 1:20 dilution with Turk's solution and counts 4 corner squares of the Neubauer chamber.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWBC} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">WBC Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">WBC Count</p>
                    <p className="text-3xl font-bold text-primary">{result.wbcCount.toLocaleString()} cells/μL</p>
                    <p className="text-sm text-muted-foreground">{(result.wbcCount / 1000).toFixed(1)} × 10³/μL</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Neutrophils (est.)</p>
                      <p className="text-lg font-semibold">{result.neutrophils} × 10³/μL</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Lymphocytes (est.)</p>
                      <p className="text-lg font-semibold">{result.lymphocytes} × 10³/μL</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    result.category.includes("Normal") ? "bg-green-500/10 text-green-600" :
                    result.category.includes("Low") ? "bg-orange-500/10 text-orange-600" :
                    "bg-red-500/10 text-red-600"
                  }`}>
                    <p className="text-sm">Interpretation</p>
                    <p className="font-semibold">{result.category}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Normal range:</strong> 4,000-11,000 cells/μL</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter hemocytometer count to calculate WBC</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">WBC Reference Ranges</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Adult Reference Range:
                </h4>
                <ul className="space-y-1">
                  <li><strong>Total WBC:</strong> 4,000-11,000 cells/μL</li>
                  <li><strong>Neutrophils:</strong> 2,500-7,000 cells/μL (50-70%)</li>
                  <li><strong>Lymphocytes:</strong> 1,000-3,500 cells/μL (20-40%)</li>
                  <li><strong>Monocytes:</strong> 200-800 cells/μL (2-8%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Clinical Significance:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>High WBC: Infection, inflammation, stress</li>
                  <li>Low WBC: Viral infection, bone marrow issues</li>
                  <li>High neutrophils: Bacterial infection</li>
                  <li>High lymphocytes: Viral infection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is a normal WBC count?</h3>
                <p className="text-sm text-muted-foreground">Normal WBC count is 4,000-11,000 cells per microliter of blood. Values vary slightly by lab and individual factors like age and pregnancy.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What does high WBC count mean?</h3>
                <p className="text-sm text-muted-foreground">High WBC (leukocytosis) usually indicates infection, inflammation, or stress. It can also occur with certain medications, smoking, or blood disorders.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What does low WBC count mean?</h3>
                <p className="text-sm text-muted-foreground">Low WBC (leukopenia) can result from viral infections, autoimmune disorders, bone marrow problems, chemotherapy, or certain medications.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How is WBC count performed?</h3>
                <p className="text-sm text-muted-foreground">Blood is diluted with Turk's solution (which lyses RBCs), loaded into a hemocytometer, and WBCs are counted in the 4 corner squares under a microscope.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the WBC count formula?</h3>
                <p className="text-sm text-muted-foreground">WBC/μL = (Cells counted × Dilution factor) / (Number of squares × Volume per square). For standard count: (Cells × 20) / (4 × 0.1).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/rbc-count-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">RBC Count Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate red blood cell count.</p>
              </a>
              <a href="/calculators/platelet-count-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Platelet Count Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate platelet concentration.</p>
              </a>
              <a href="/calculators/cbc-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">CBC Calculator</h3>
                <p className="text-sm text-muted-foreground">Complete blood count calculations.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
