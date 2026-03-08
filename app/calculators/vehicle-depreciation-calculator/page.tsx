"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VehicleDepreciationCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [vehicleAge, setVehicleAge] = useState<string>("");
  const [annualMileage, setAnnualMileage] = useState<string>("");
  const [depreciationRate, setDepreciationRate] = useState<string>("15");
  const [condition, setCondition] = useState<"excellent" | "good" | "fair" | "poor">("good");
  const [result, setResult] = useState<{
    currentValue: number;
    totalDepreciation: number;
    depreciationPercentage: number;
    yearlyDepreciation: number[];
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(purchasePrice);
    const age = parseFloat(vehicleAge);
    const mileage = parseFloat(annualMileage);
    const rate = parseFloat(depreciationRate) / 100;

    if (isNaN(price) || isNaN(age) || isNaN(mileage) || isNaN(rate) || price <= 0 || age < 0 || mileage < 0) return;

    // Condition modifier
    const conditionModifiers = {
      excellent: 1.1,
      good: 1.0,
      fair: 0.85,
      poor: 0.7,
    };

    // Mileage modifier (average is 12,000 miles/year)
    const averageMileage = 12000;
    const mileageModifier = mileage > averageMileage ? 0.95 : 1.05;

    const conditionMod = conditionModifiers[condition];

    // Calculate depreciation using declining balance method
    let currentValue = price;
    const yearlyDepreciation: number[] = [];

    for (let i = 0; i < age; i++) {
      const yearDepreciation = currentValue * rate * conditionMod * mileageModifier;
      currentValue -= yearDepreciation;
      yearlyDepreciation.push(Math.round(yearDepreciation));
    }

    // Ensure value doesn't go below 10% of original (scrap value floor)
    const scrapValue = price * 0.1;
    if (currentValue < scrapValue) {
      currentValue = scrapValue;
    }

    const totalDepreciation = price - currentValue;
    const depreciationPercentage = (totalDepreciation / price) * 100;

    setResult({
      currentValue: Math.round(currentValue),
      totalDepreciation: Math.round(totalDepreciation),
      depreciationPercentage: Math.round(depreciationPercentage * 10) / 10,
      yearlyDepreciation,
    });
  };

  const reset = () => {
    setPurchasePrice("");
    setVehicleAge("");
    setAnnualMileage("");
    setDepreciationRate("15");
    setCondition("good");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value
          </h1>
          <p className="text-muted-foreground">
            Estimate your car's current market value and total depreciation with our Vehicle
            Depreciation Calculator. Enter the original purchase price, vehicle age, and annual
            mileage to see how much value your car has lost — ideal for resale planning and
            insurance purposes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Original Purchase Price ($)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="e.g., 35000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleAge">Vehicle Age (Years)</Label>
                <Input
                  id="vehicleAge"
                  type="number"
                  placeholder="e.g., 5"
                  value={vehicleAge}
                  onChange={(e) => setVehicleAge(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualMileage">Annual Mileage</Label>
                <Input
                  id="annualMileage"
                  type="number"
                  placeholder="e.g., 12000"
                  value={annualMileage}
                  onChange={(e) => setAnnualMileage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="depreciationRate">Annual Depreciation Rate (%)</Label>
                <Input
                  id="depreciationRate"
                  type="number"
                  placeholder="15"
                  value={depreciationRate}
                  onChange={(e) => setDepreciationRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typical cars: 15-20%, Luxury: 20-25%, Trucks: 10-15%
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Vehicle Condition</Label>
                <Select value={condition} onValueChange={(v) => setCondition(v as "excellent" | "good" | "fair" | "poor")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
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
              <h3 className="text-lg font-semibold mb-4">Depreciation Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Estimated Value</p>
                    <p className="text-3xl font-bold text-primary">${result.currentValue.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Depreciation</p>
                      <p className="text-lg font-bold">${result.totalDepreciation.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Depreciation %</p>
                      <p className="text-lg font-bold">{result.depreciationPercentage}%</p>
                    </div>
                  </div>

                  {result.yearlyDepreciation.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold mb-2">Yearly Depreciation Breakdown</p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {result.yearlyDepreciation.map((dep, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>Year {idx + 1}</span>
                            <span className="text-muted-foreground">-${dep.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Understanding Vehicle Depreciation</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Vehicles typically lose value over time due to age, mileage, and wear. The calculation
            uses a declining balance method with adjustments for condition and mileage.
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            Annual Depreciation = Current Value × Rate × Condition Factor × Mileage Factor
          </div>
          <ul className="text-muted-foreground text-sm mt-3 space-y-1 list-disc list-inside">
            <li><strong>Excellent condition:</strong> +10% value retention</li>
            <li><strong>High mileage (&gt;12k/yr):</strong> -5% value retention</li>
            <li><strong>Low mileage (&lt;12k/yr):</strong> +5% value retention</li>
          </ul>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Car Depreciation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Purchase Details</h3>
                <p className="text-sm text-muted-foreground">Input your vehicle's original purchase price and current age in years.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Add Mileage & Condition</h3>
                <p className="text-sm text-muted-foreground">Enter annual mileage and select vehicle condition for accurate value adjustment.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">View Depreciation Breakdown</h3>
                <p className="text-sm text-muted-foreground">See current value, total depreciation, and year-by-year value loss breakdown.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Vehicle Depreciation Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Declining Balance Method</h3>
              <p className="text-sm text-muted-foreground">Uses realistic depreciation that decreases each year as the vehicle's value drops.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Condition Adjustments</h3>
              <p className="text-sm text-muted-foreground">Accounts for excellent, good, fair, or poor condition impact on resale value.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Mileage Impact Analysis</h3>
              <p className="text-sm text-muted-foreground">Adjusts depreciation based on annual mileage compared to the 12,000 mile average.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Year-by-Year Breakdown</h3>
              <p className="text-sm text-muted-foreground">See exactly how much value your vehicle lost each year for detailed financial planning.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Vehicle Depreciation Rates by Type</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Vehicle Type</th>
                  <th className="text-left py-2">Annual Rate</th>
                  <th className="text-left py-2">5-Year Value</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Luxury Cars</td>
                  <td className="py-2">20-25%</td>
                  <td className="py-2">30-40%</td>
                  <td className="py-2">Highest depreciation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Sedans</td>
                  <td className="py-2">15-20%</td>
                  <td className="py-2">40-50%</td>
                  <td className="py-2">Average depreciation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">SUVs/Crossovers</td>
                  <td className="py-2">12-18%</td>
                  <td className="py-2">45-55%</td>
                  <td className="py-2">Popular, holds value well</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Trucks</td>
                  <td className="py-2">10-15%</td>
                  <td className="py-2">50-60%</td>
                  <td className="py-2">Best value retention</td>
                </tr>
                <tr>
                  <td className="py-2">Electric Vehicles</td>
                  <td className="py-2">15-25%</td>
                  <td className="py-2">35-45%</td>
                  <td className="py-2">Battery concerns affect value</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How much does a car depreciate per year?</h3>
              <p className="text-sm text-muted-foreground">Average cars depreciate 15-20% annually. New cars lose 20-30% in the first year alone. After 5 years, most vehicles retain only 40-50% of their original value, though trucks and some SUVs hold value better.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What vehicle depreciates the slowest?</h3>
              <p className="text-sm text-muted-foreground">Trucks (especially Toyota Tacoma, Ford F-150) and body-on-frame SUVs depreciate slowest at 10-15% annually. Sports cars like Porsche 911 also hold value well. Luxury sedans depreciate fastest at 20-25% per year.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Does mileage affect car value?</h3>
              <p className="text-sm text-muted-foreground">Yes, significantly. High mileage (over 12,000 miles/year) can reduce value by 5-10% compared to average. Low mileage vehicles command premium prices. Each 10,000 miles typically reduces value by $500-$1,000 depending on the vehicle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When is the best time to sell a car?</h3>
              <p className="text-sm text-muted-foreground">Sell before major milestones: before 100,000 miles, before 5-7 years old, and before expensive maintenance (timing belt, transmission service). Spring and summer typically yield better prices than fall and winter.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How can I minimize car depreciation?</h3>
              <p className="text-sm text-muted-foreground">Buy reliable brands (Toyota, Honda), keep mileage low, maintain excellent condition, keep service records, avoid modifications, and sell before major repairs are needed. Consider buying 2-3 year old to let someone else take the initial hit.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
