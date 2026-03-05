"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Home, DollarSign, Calculator } from "lucide-react";

interface ConstructionCostResult {
  totalCost: number;
  costPerSqFt: number;
  materialCost: number;
  laborCost: number;
  breakdown: { category: string; amount: number; percentage: number }[];
}

export default function HouseConstructionCostEstimatorPage() {
  const [area, setArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<"sqft" | "sqm" | "sqyd">("sqft");
  const [quality, setQuality] = useState<"economy" | "standard" | "premium" | "luxury">("standard");
  const [location, setLocation] = useState<"rural" | "suburban" | "urban" | "metro">("suburban");
  const [result, setResult] = useState<ConstructionCostResult | null>(null);

  const calculateCost = () => {
    const areaNum = parseFloat(area);

    if (isNaN(areaNum) || areaNum <= 0) {
      setResult(null);
      return;
    }

    let areaInSqFt = areaNum;
    if (areaUnit === "sqm") areaInSqFt = areaNum * 10.764;
    if (areaUnit === "sqyd") areaInSqFt = areaNum * 9;

    const baseRates = {
      economy: 80,
      standard: 120,
      premium: 180,
      luxury: 300,
    };

    const locationMultipliers = {
      rural: 0.85,
      suburban: 1.0,
      urban: 1.25,
      metro: 1.5,
    };

    let costPerSqFt = baseRates[quality] * locationMultipliers[location];
    const totalCost = areaInSqFt * costPerSqFt;

    const materialPercentage = quality === "luxury" ? 0.55 : quality === "premium" ? 0.58 : 0.60;
    const laborPercentage = 1 - materialPercentage;

    const materialCost = totalCost * materialPercentage;
    const laborCost = totalCost * laborPercentage;

    const breakdown = [
      { category: "Materials", amount: materialCost, percentage: materialPercentage * 100 },
      { category: "Labor", amount: laborCost, percentage: laborPercentage * 100 },
      { category: "Foundation", amount: totalCost * 0.12, percentage: 12 },
      { category: "Structure", amount: totalCost * 0.28, percentage: 28 },
      { category: "Finishing", amount: totalCost * 0.35, percentage: 35 },
      { category: "Electrical & Plumbing", amount: totalCost * 0.15, percentage: 15 },
      { category: "Contingency (10%)", amount: totalCost * 0.10, percentage: 10 },
    ];

    setResult({
      totalCost: Math.round(totalCost),
      costPerSqFt: Math.round(costPerSqFt),
      materialCost: Math.round(materialCost),
      laborCost: Math.round(laborCost),
      breakdown,
    });
  };

  const reset = () => {
    setArea("");
    setResult(null);
  };

  useEffect(() => {
    calculateCost();
  }, [area, areaUnit, quality, location]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">House Construction Cost Estimator – Calculate Building Costs</h1>
          <p className="text-muted-foreground">
            Estimate the total cost of building your dream home. This construction calculator factors in area, quality level, and location to provide realistic cost breakdowns for materials, labor, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Construction Area</Label>
                    <div className="flex gap-2">
                      <Input
                        id="area"
                        type="number"
                        placeholder="e.g., 2000"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={areaUnit}
                        onChange={(e) => setAreaUnit(e.target.value as any)}
                        className="w-24 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="sqft">sq ft</option>
                        <option value="sqm">sq m</option>
                        <option value="sqyd">sq yd</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality">Construction Quality</Label>
                    <select
                      id="quality"
                      value={quality}
                      onChange={(e) => setQuality(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="economy">Economy ($80/sq ft)</option>
                      <option value="standard">Standard ($120/sq ft)</option>
                      <option value="premium">Premium ($180/sq ft)</option>
                      <option value="luxury">Luxury ($300+/sq ft)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location Type</Label>
                    <select
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="rural">Rural (-15%)</option>
                      <option value="suburban">Suburban (Base)</option>
                      <option value="urban">Urban (+25%)</option>
                      <option value="metro">Metro City (+50%)</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Estimates include materials, labor, and standard finishes. Land cost, permits, and site work not included.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCost} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Estimated Cost</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Construction Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.totalCost.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">${result.costPerSqFt}/sq ft</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Materials</p>
                      <p className="text-lg font-semibold">${(result.materialCost / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Labor</p>
                      <p className="text-lg font-semibold">${(result.laborCost / 1000).toFixed(0)}K</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Note:</strong> Actual costs vary by region, market conditions, and specific requirements.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Home className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter area and preferences to estimate cost</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {result && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.breakdown.map((item, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-xl font-semibold">${(item.amount / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-muted-foreground">{item.percentage.toFixed(0)}% of total</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Estimate Construction Costs</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Measure Area</h3>
                <p className="text-sm text-muted-foreground">Calculate total floor area in square feet or square meters.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Choose Quality</h3>
                <p className="text-sm text-muted-foreground">Select finish quality from economy to luxury grade.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Set Location</h3>
                <p className="text-sm text-muted-foreground">Location affects labor rates and material delivery costs.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="font-semibold mb-2">Get Estimate</h3>
                <p className="text-sm text-muted-foreground">See total cost with detailed breakdown by category.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Quality-Based Pricing
                </h3>
                <p className="text-sm text-muted-foreground">Adjusts cost based on economy, standard, premium, or luxury finishes.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Location Adjustment
                </h3>
                <p className="text-sm text-muted-foreground">Accounts for regional cost variations in labor and materials.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Detailed Breakdown
                </h3>
                <p className="text-sm text-muted-foreground">Shows costs for materials, labor, foundation, structure, and more.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Area Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for square feet, square meters, and square yards.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the average cost to build a house?</h3>
                <p className="text-sm text-muted-foreground">Average construction costs range from $100-$200 per square foot for standard quality. A 2,000 sq ft home typically costs $200,000-$400,000 depending on location and finishes.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What factors affect construction costs?</h3>
                <p className="text-sm text-muted-foreground">Key factors include location, material quality, labor rates, design complexity, site conditions, and current market prices for materials like lumber and steel.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does this include land cost?</h3>
                <p className="text-sm text-muted-foreground">No, this estimator covers construction costs only. Land purchase, site preparation, permits, and utility connections are additional expenses.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How accurate is this estimate?</h3>
                <p className="text-sm text-muted-foreground">This provides a rough estimate within ±20% accuracy. Get detailed quotes from local contractors for precise pricing in your area.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What percentage should I budget for contingency?</h3>
                <p className="text-sm text-muted-foreground">Industry standard is 10-15% contingency for unexpected costs. Older homes or complex designs may need 20% or more buffer.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/mortgage-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Mortgage Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate monthly mortgage payments and interest.</p>
              </a>
              <a href="/calculators/loan-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Loan Calculator</h3>
                <p className="text-sm text-muted-foreground">Estimate loan payments and total interest costs.</p>
              </a>
              <a href="/calculators/budget-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Budget Calculator</h3>
                <p className="text-sm text-muted-foreground">Plan your home building budget and expenses.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
