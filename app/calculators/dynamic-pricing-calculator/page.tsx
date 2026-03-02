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

interface PricingScenario {
  name: string;
  basePrice: number;
  demandMultiplier: number;
  competitorPrice: number;
  optimalPrice: number;
  expectedRevenue: number;
  margin: number;
}

interface DynamicPricingResult {
  basePrice: number;
  demandAdjustedPrice: number;
  competitorAdjustedPrice: number;
  optimalPrice: number;
  priceChange: number;
  priceChangePercent: number;
  scenarios: PricingScenario[];
  recommendations: string[];
  elasticityCoefficient: number;
}

export default function DynamicPricingCalculatorPage() {
  const [basePrice, setBasePrice] = useState<string>("100");
  const [baseCost, setBaseCost] = useState<string>("60");
  const [demandLevel, setDemandLevel] = useState<string>("normal");
  const [competitorPrice, setCompetitorPrice] = useState<string>("95");
  const [inventoryLevel, setInventoryLevel] = useState<string>("normal");
  const [priceElasticity, setPriceElasticity] = useState<string>("1.5");
  const [timeSensitivity, setTimeSensitivity] = useState<string>("normal");
  const [result, setResult] = useState<DynamicPricingResult | null>(null);

  const calculate = () => {
    const basePriceNum = parseFloat(basePrice) || 100;
    const baseCostNum = parseFloat(baseCost) || 60;
    const competitorPriceNum = parseFloat(competitorPrice) || 95;
    const elasticityNum = parseFloat(priceElasticity) || 1.5;

    // Demand multipliers
    const demandMultipliers: Record<string, number> = {
      veryLow: 0.7,
      low: 0.85,
      normal: 1.0,
      high: 1.15,
      veryHigh: 1.3,
      peak: 1.5,
    };
    const demandMultiplier = demandMultipliers[demandLevel] || 1.0;

    // Inventory multipliers
    const inventoryMultipliers: Record<string, number> = {
     过剩: 0.85,
      high: 0.9,
      normal: 1.0,
      low: 1.1,
      veryLow: 1.2,
      scarce: 1.35,
    };
    const inventoryMultiplier = inventoryMultipliers[inventoryLevel] || 1.0;

    // Time sensitivity multipliers
    const timeMultipliers: Record<string, number> = {
      low: 1.0,
      normal: 1.05,
      high: 1.15,
      urgent: 1.25,
    };
    const timeMultiplier = timeMultipliers[timeSensitivity] || 1.0;

    // Calculate demand-adjusted price
    const demandAdjustedPrice = basePriceNum * demandMultiplier * inventoryMultiplier;

    // Calculate competitor-adjusted price
    // If competitor is cheaper, we may need to match or differentiate
    const competitorRatio = competitorPriceNum / basePriceNum;
    let competitorAdjustedPrice = basePriceNum;
    
    if (competitorRatio < 0.9) {
      // Competitor is significantly cheaper
      competitorAdjustedPrice = basePriceNum * 0.95; // Match closer to competitor
    } else if (competitorRatio > 1.1) {
      // Competitor is more expensive
      competitorAdjustedPrice = basePriceNum * 1.05; // Can charge more
    } else {
      competitorAdjustedPrice = basePriceNum;
    }

    // Calculate optimal price combining all factors
    const combinedMultiplier = demandMultiplier * inventoryMultiplier * timeMultiplier;
    
    // Apply price elasticity (higher elasticity = more sensitive to price changes)
    const elasticityFactor = 1 / elasticityNum;
    
    const optimalPrice = basePriceNum * combinedMultiplier * elasticityFactor;

    // Calculate price change
    const priceChange = optimalPrice - basePriceNum;
    const priceChangePercent = (priceChange / basePriceNum) * 100;

    // Generate scenarios
    const scenarios: PricingScenario[] = [
      {
        name: "Conservative",
        basePrice: basePriceNum,
        demandMultiplier: 1.0,
        competitorPrice: competitorPriceNum,
        optimalPrice: basePriceNum,
        expectedRevenue: basePriceNum * 100,
        margin: ((basePriceNum - baseCostNum) / basePriceNum) * 100,
      },
      {
        name: "Demand-Based",
        basePrice: basePriceNum,
        demandMultiplier: demandMultiplier,
        competitorPrice: competitorPriceNum,
        optimalPrice: demandAdjustedPrice,
        expectedRevenue: demandAdjustedPrice * (100 * (2 - demandMultiplier)),
        margin: ((demandAdjustedPrice - baseCostNum) / demandAdjustedPrice) * 100,
      },
      {
        name: "Competitive",
        basePrice: basePriceNum,
        demandMultiplier: 1.0,
        competitorPrice: competitorPriceNum,
        optimalPrice: competitorAdjustedPrice,
        expectedRevenue: competitorAdjustedPrice * 110,
        margin: ((competitorAdjustedPrice - baseCostNum) / competitorAdjustedPrice) * 100,
      },
      {
        name: "Optimal (Combined)",
        basePrice: basePriceNum,
        demandMultiplier: combinedMultiplier,
        competitorPrice: competitorPriceNum,
        optimalPrice: optimalPrice,
        expectedRevenue: optimalPrice * (100 * (2 - combinedMultiplier * 0.5)),
        margin: ((optimalPrice - baseCostNum) / optimalPrice) * 100,
      },
    ];

    // Generate recommendations
    const recommendations: string[] = [];

    if (priceChangePercent > 15) {
      recommendations.push("⬆️ Significant price increase recommended due to high demand/low inventory.");
    } else if (priceChangePercent > 5) {
      recommendations.push("⬆️ Moderate price increase recommended.");
    } else if (priceChangePercent < -15) {
      recommendations.push("⬇️ Significant price decrease recommended to stay competitive.");
    } else if (priceChangePercent < -5) {
      recommendations.push("⬇️ Consider price reduction to match market conditions.");
    } else {
      recommendations.push("➡️ Current pricing is well-aligned with market conditions.");
    }

    if (competitorRatio < 0.9) {
      recommendations.push("💡 Competitor pricing is significantly lower. Consider value differentiation or matching.");
    } else if (competitorRatio > 1.1) {
      recommendations.push("💡 Competitor pricing is higher. Opportunity to increase margins.");
    }

    if (demandLevel === "peak" || demandLevel === "veryHigh") {
      recommendations.push("📈 High demand detected. Maximize revenue with premium pricing.");
    }

    if (inventoryLevel === "scarce" || inventoryLevel === "veryLow") {
      recommendations.push("⚠️ Low inventory. Higher prices can help manage demand.");
    }

    if (elasticityNum > 2) {
      recommendations.push("💡 High price elasticity. Small price changes significantly impact demand.");
    } else if (elasticityNum < 1) {
      recommendations.push("💡 Low price elasticity. Customers less sensitive to price changes.");
    }

    setResult({
      basePrice: basePriceNum,
      demandAdjustedPrice: parseFloat(demandAdjustedPrice.toFixed(2)),
      competitorAdjustedPrice: parseFloat(competitorAdjustedPrice.toFixed(2)),
      optimalPrice: parseFloat(optimalPrice.toFixed(2)),
      priceChange: parseFloat(priceChange.toFixed(2)),
      priceChangePercent: parseFloat(priceChangePercent.toFixed(1)),
      scenarios,
      recommendations,
      elasticityCoefficient: elasticityNum,
    });
  };

  const reset = () => {
    setBasePrice("100");
    setBaseCost("60");
    setDemandLevel("normal");
    setCompetitorPrice("95");
    setInventoryLevel("normal");
    setPriceElasticity("1.5");
    setTimeSensitivity("normal");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Dynamic Pricing Calculator – Optimize Your Prices Based on Demand & Market Conditions
          </h1>
          <p className="text-muted-foreground">
            Maximize revenue with smart pricing using our Dynamic Pricing Calculator.
            Input demand levels, inventory, and competitor prices to calculate optimal
            price points in real time — perfect for e-commerce, hospitality, and ticketing businesses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="base-price">Base Price ($)</Label>
                  <Input
                    id="base-price"
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="base-cost">Cost per Unit ($)</Label>
                  <Input
                    id="base-cost"
                    type="number"
                    value={baseCost}
                    onChange={(e) => setBaseCost(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demand-level">Demand Level</Label>
                <Select value={demandLevel} onValueChange={setDemandLevel}>
                  <SelectTrigger id="demand-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veryLow">Very Low</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="veryHigh">Very High</SelectItem>
                    <SelectItem value="peak">Peak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inventory-level">Inventory Level</Label>
                <Select value={inventoryLevel} onValueChange={setInventoryLevel}>
                  <SelectTrigger id="inventory-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scarce">Scarce</SelectItem>
                    <SelectItem value="veryLow">Very Low</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="过剩">Excess</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitor-price">Competitor Price ($)</Label>
                <Input
                  id="competitor-price"
                  type="number"
                  value={competitorPrice}
                  onChange={(e) => setCompetitorPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-sensitivity">Time Sensitivity</Label>
                <Select value={timeSensitivity} onValueChange={setTimeSensitivity}>
                  <SelectTrigger id="time-sensitivity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (No urgency)</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High (Seasonal)</SelectItem>
                    <SelectItem value="urgent">Urgent (Flash sale)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elasticity">Price Elasticity Coefficient</Label>
                <Input
                  id="elasticity"
                  type="number"
                  step="0.1"
                  value={priceElasticity}
                  onChange={(e) => setPriceElasticity(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  1.5 = normal, &gt;2 = elastic, &lt;1 = inelastic
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.priceChange > 0 ? "bg-green-100 dark:bg-green-900/20" :
                    result.priceChange < 0 ? "bg-red-100 dark:bg-red-900/20" :
                    "bg-muted"
                  }`}>
                    <p className="text-sm text-muted-foreground">Optimal Price</p>
                    <p className="text-4xl font-bold">${result.optimalPrice}</p>
                    <p className={`text-sm mt-1 ${
                      result.priceChange > 0 ? "text-green-700 dark:text-green-300" :
                      result.priceChange < 0 ? "text-red-700 dark:text-red-300" :
                      "text-muted-foreground"
                    }`}>
                      {result.priceChange > 0 ? "+" : ""}{result.priceChange} ({result.priceChangePercent}%)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Demand-Based</p>
                      <p className="text-lg font-semibold">${result.demandAdjustedPrice}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Competitor-Based</p>
                      <p className="text-lg font-semibold">${result.competitorAdjustedPrice}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Pricing Scenarios</h4>
                    <div className="space-y-2">
                      {result.scenarios.map((scenario, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg flex justify-between items-center ${
                            scenario.name.includes("Optimal") ? "bg-primary/10 border border-primary" : "bg-muted/50"
                          }`}
                        >
                          <div>
                            <p className="font-medium text-sm">{scenario.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Margin: {scenario.margin.toFixed(1)}%
                            </p>
                          </div>
                          <p className="text-lg font-bold">${scenario.optimalPrice}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">Recommendations</h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your pricing parameters and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dynamic Pricing
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Dynamic pricing adjusts prices in real-time based on market conditions,
                  demand, competition, and inventory levels. Used by airlines, hotels,
                  e-commerce, and ride-sharing services.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Demand Level:</strong> Higher demand allows premium pricing
                  </li>
                  <li>
                    <strong>Inventory:</strong> Low supply justifies higher prices
                  </li>
                  <li>
                    <strong>Competition:</strong> Prices relative to competitors affect positioning
                  </li>
                  <li>
                    <strong>Price Elasticity:</strong> Measures how demand changes with price
                  </li>
                  <li>
                    <strong>Time Sensitivity:</strong> Urgent purchases tolerate higher prices
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Test different price points and monitor conversion rates
                  to find your optimal pricing strategy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
