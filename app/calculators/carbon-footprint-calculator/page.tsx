"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
      comparison = `Your footprint is ${((1 - annualTotal / globalAvg) * 100).toFixed(0)}% below the global average`;
    } else if (annualTotal < euAvg) {
      comparison = `Your footprint is ${((1 - annualTotal / euAvg) * 100).toFixed(0)}% below the EU average`;
    } else if (annualTotal < usAvg) {
      comparison = `Your footprint is ${((1 - annualTotal / usAvg) * 100).toFixed(0)}% below the US average`;
    } else {
      comparison = `Your footprint is ${((annualTotal / usAvg - 1) * 100).toFixed(0)}% above the US average`;
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

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Your Carbon Footprint</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Your Emissions</h3>
                  <p className="text-muted-foreground text-sm">Input your monthly CO₂ emissions from transport, home energy, diet, and shopping habits.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Calculate Your Impact</h3>
                  <p className="text-muted-foreground text-sm">Get your annual carbon footprint and see how it compares to global and national averages.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Reduction Tips</h3>
                  <p className="text-muted-foreground text-sm">Receive personalized recommendations to reduce your carbon emissions by 10% or more.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Track Your Carbon Footprint?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🌍 Environmental Awareness</h3>
                <p className="text-muted-foreground text-sm">Understand your personal contribution to climate change and identify the biggest areas of impact in your lifestyle.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Benchmark Comparison</h3>
                <p className="text-muted-foreground text-sm">See how your emissions compare to global, EU, and US averages to contextualize your environmental impact.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 Actionable Reduction Goals</h3>
                <p className="text-muted-foreground text-sm">Get specific, practical recommendations tailored to your lifestyle for meaningful emissions reductions.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📈 Track Progress Over Time</h3>
                <p className="text-muted-foreground text-sm">Use this calculator regularly to monitor improvements as you adopt more sustainable habits.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Global Carbon Footprint Benchmarks</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Region/Category</th>
                    <th className="text-left py-3 px-4">Annual CO₂ (kg)</th>
                    <th className="text-left py-3 px-4">Monthly (kg)</th>
                    <th className="text-left py-3 px-4">Target for 2030</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🌍 Global Average</td>
                    <td className="py-3 px-4">~4,000 kg</td>
                    <td className="py-3 px-4">~333 kg</td>
                    <td className="py-3 px-4">2,500 kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🇪🇺 European Union</td>
                    <td className="py-3 px-4">~8,000 kg</td>
                    <td className="py-3 px-4">~667 kg</td>
                    <td className="py-3 px-4">4,000 kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">🇺🇸 United States</td>
                    <td className="py-3 px-4">~16,000 kg</td>
                    <td className="py-3 px-4">~1,333 kg</td>
                    <td className="py-3 px-4">8,000 kg</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">🎯 Climate Goal</td>
                    <td className="py-3 px-4">2,500 kg</td>
                    <td className="py-3 px-4">~208 kg</td>
                    <td className="py-3 px-4">Sustainable level</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Carbon Footprint FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is a good carbon footprint per person?</h3>
                <p className="text-muted-foreground text-sm">To limit global warming to 1.5°C, the target is about 2,500 kg CO₂ per person annually by 2030. The current global average is around 4,000 kg.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What contributes most to personal carbon emissions?</h3>
                <p className="text-muted-foreground text-sm">For most people, the biggest sources are transportation (cars, flights), home energy (heating, electricity), diet (especially meat), and consumer goods.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How can I reduce my carbon footprint quickly?</h3>
                <p className="text-muted-foreground text-sm">Quick wins include: reducing air travel, switching to renewable energy, eating less meat, using public transport, and buying fewer new products.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Is carbon offsetting effective?</h3>
                <p className="text-muted-foreground text-sm">Offsets can help, but prioritize reducing emissions first. Choose verified offset programs that remove or prevent CO₂ permanently.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Why is the US footprint so high?</h3>
                <p className="text-muted-foreground text-sm">High US emissions come from car-dependent transportation, large homes requiring more energy, high meat consumption, and consumer culture.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
