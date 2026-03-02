"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CarbonFootprintCalculatorPage() {
  const [transportEmissions, setTransportEmissions] = useState<string>("");
  const [homeEmissions, setHomeEmissions] = useState<string>("");
  const [dietEmissions, setDietEmissions] = useState<string>("");
  const [shoppingEmissions, setShoppingEmissions] = useState<string>("");
  const [result, setResult] = useState<{
    totalCO2: number;
    monthlyCO2: number;
    comparison: string;
    reduction: { target: number; actions: string[] };
  } | null>(null);

  const calculate = () => {
    const transport = parseFloat(transportEmissions) || 0;
    const home = parseFloat(homeEmissions) || 0;
    const diet = parseFloat(dietEmissions) || 0;
    const shopping = parseFloat(shoppingEmissions) || 0;

    // Monthly total in kg CO2
    const monthlyTotal = transport + home + diet + shopping;
    
    // Annual total
    const annualTotal = monthlyTotal * 12;

    // Comparison to average (global avg ~4000 kg/year, US avg ~16000 kg/year)
    let comparison: string;
    const globalAvg = 4000;
    const usAvg = 16000;
    const euAvg = 8000;

    if (annualTotal < globalAvg) {
      comparison = `Your footprint is ${((1 - annualTotal/globalAvg) * 100).toFixed(0)}% below the global average`;
    } else if (annualTotal < euAvg) {
      comparison = `Your footprint is ${((1 - annualTotal/euAvg) * 100).toFixed(0)}% below the EU average`;
    } else if (annualTotal < usAvg) {
      comparison = `Your footprint is ${((1 - annualTotal/usAvg) * 100).toFixed(0)}% below the US average`;
    } else {
      comparison = `Your footprint is ${((annualTotal/usAvg - 1) * 100).toFixed(0)}% above the US average`;
    }

    // Reduction target (10% reduction recommended)
    const target = monthlyTotal * 0.9;
    const actions: string[] = [];
    
    if (transport > 0) actions.push("Use public transport or carpool 2x/week");
    if (home > 0) actions.push("Switch to LED bulbs and reduce heating by 1°C");
    if (diet > 0) actions.push("Try 2-3 meatless meals per week");
    if (shopping > 0) actions.push("Buy second-hand or reduce non-essential purchases");
    actions.push("Offset remaining emissions through verified carbon credits");

    setResult({
      totalCO2: Math.round(annualTotal),
      monthlyCO2: Math.round(monthlyTotal),
      comparison,
      reduction: { target: Math.round(target), actions }
    });
  };

  const reset = () => {
    setTransportEmissions("");
    setHomeEmissions("");
    setDietEmissions("");
    setShoppingEmissions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Carbon Footprint Calculator – Calculate Your Personal Annual CO₂ Footprint</h1>
          <p className="text-muted-foreground">
            Understand your environmental impact with our Carbon Footprint Calculator. Answer questions about your travel habits, home energy use, diet, and purchases to calculate your total annual CO₂ footprint in tonnes — and discover the biggest areas for reduction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transport">Monthly Transport Emissions (kg CO₂)</Label>
                <Input 
                  id="transport" 
                  type="number" 
                  placeholder="e.g., 100" 
                  value={transportEmissions} 
                  onChange={(e) => setTransportEmissions(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Car, flights, public transport</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="home">Monthly Home Energy (kg CO₂)</Label>
                <Input 
                  id="home" 
                  type="number" 
                  placeholder="e.g., 150" 
                  value={homeEmissions} 
                  onChange={(e) => setHomeEmissions(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Electricity, heating, cooling</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diet">Monthly Diet Emissions (kg CO₂)</Label>
                <Input 
                  id="diet" 
                  type="number" 
                  placeholder="e.g., 200" 
                  value={dietEmissions} 
                  onChange={(e) => setDietEmissions(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Food production and transport</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopping">Monthly Shopping Emissions (kg CO₂)</Label>
                <Input 
                  id="shopping" 
                  type="number" 
                  placeholder="e.g., 100" 
                  value={shoppingEmissions} 
                  onChange={(e) => setShoppingEmissions(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Clothing, electronics, goods</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Footprint
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Annual Carbon Footprint</p>
                    <p className="text-4xl font-bold text-primary">{result.totalCO2} kg</p>
                    <p className="text-xs text-muted-foreground mt-1">Monthly: {result.monthlyCO2} kg CO₂</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{result.comparison}</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-2">10% Reduction Target:</p>
                    <p className="text-2xl font-bold text-primary mb-2">{result.reduction.target} kg/month</p>
                    <ul className="text-sm space-y-1">
                      {result.reduction.actions.map((action, i) => (
                        <li key={i}>• {action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your monthly emissions and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
