"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FuelComparisonResult {
  car1: { name: string; mpg: number; annualCost: number };
  car2: { name: string; mpg: number; annualCost: number };
  annualMiles: number;
  fuelPrice: number;
  savings: number;
  paybackPeriod: string;
  recommendation: string;
  fiveYearCost: { car1: number; car2: number; difference: number };
}

export default function FuelEfficiencyComparisonCalculatorPage() {
  const [car1Name, setCar1Name] = useState<string>("Car 1");
  const [car1Mpg, setCar1Mpg] = useState<string>("");
  const [car2Name, setCar2Name] = useState<string>("Car 2");
  const [car2Mpg, setCar2Mpg] = useState<string>("");
  const [annualMiles, setAnnualMiles] = useState<string>("12000");
  const [fuelPrice, setFuelPrice] = useState<string>("3.50");
  const [result, setResult] = useState<FuelComparisonResult | null>(null);

  const calculate = () => {
    const car1MpgNum = parseFloat(car1Mpg) || 0;
    const car2MpgNum = parseFloat(car2Mpg) || 0;
    const annualMilesNum = parseFloat(annualMiles) || 12000;
    const fuelPriceNum = parseFloat(fuelPrice) || 3.50;

    if (car1MpgNum === 0 || car2MpgNum === 0) return;

    // Calculate annual fuel cost for each car
    const car1AnnualCost = (annualMilesNum / car1MpgNum) * fuelPriceNum;
    const car2AnnualCost = (annualMilesNum / car2MpgNum) * fuelPriceNum;

    // Determine which is more efficient
    const savings = Math.abs(car1AnnualCost - car2AnnualCost);
    const betterCar = car1AnnualCost < car2AnnualCost ? car1Name : car2Name;

    // 5-year cost projection
    const car1FiveYear = car1AnnualCost * 5;
    const car2FiveYear = car2AnnualCost * 5;
    const fiveYearDifference = Math.abs(car1FiveYear - car2FiveYear);

    // Payback period (if one car costs more upfront)
    const paybackPeriod = savings > 0 ? `${(1000 / savings).toFixed(1)} years to recover $1000 price difference` : "N/A";

    // Recommendation
    let recommendation = "";
    const percentDifference = ((Math.abs(car1MpgNum - car2MpgNum)) / Math.min(car1MpgNum, car2MpgNum)) * 100;
    
    if (percentDifference < 10) {
      recommendation = "Fuel efficiency is similar - consider other factors like price, features, reliability";
    } else if (percentDifference < 30) {
      recommendation = `Moderate efficiency difference. ${betterCar} saves $${savings.toFixed(0)}/year on fuel`;
    } else {
      recommendation = `Significant efficiency difference! ${betterCar} saves $${savings.toFixed(0)}/year on fuel`;
    }

    setResult({
      car1: { name: car1Name, mpg: car1MpgNum, annualCost: parseFloat(car1AnnualCost.toFixed(0)) },
      car2: { name: car2Name, mpg: car2MpgNum, annualCost: parseFloat(car2AnnualCost.toFixed(0)) },
      annualMiles: annualMilesNum,
      fuelPrice: fuelPriceNum,
      savings: parseFloat(savings.toFixed(0)),
      paybackPeriod,
      recommendation,
      fiveYearCost: {
        car1: parseFloat(car1FiveYear.toFixed(0)),
        car2: parseFloat(car2FiveYear.toFixed(0)),
        difference: parseFloat(fiveYearDifference.toFixed(0)),
      },
    });
  };

  const reset = () => {
    setCar1Mpg("");
    setCar2Mpg("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Fuel Efficiency Comparison Calculator – Compare Cars by MPG & Running Cost
          </h1>
          <p className="text-muted-foreground">
            Can&apos;t decide between two cars? Our Fuel Efficiency Comparison Calculator
            lets you compare vehicles side-by-side based on fuel economy, annual mileage,
            and fuel price. See which car truly costs less to run over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="border p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">{car1Name}</h4>
                <div className="space-y-2">
                  <Input
                    value={car1Name}
                    onChange={(e) => setCar1Name(e.target.value)}
                    placeholder="Car 1 name"
                  />
                  <Input
                    type="number"
                    value={car1Mpg}
                    onChange={(e) => setCar1Mpg(e.target.value)}
                    placeholder="MPG"
                  />
                </div>
              </div>

              <div className="border p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">{car2Name}</h4>
                <div className="space-y-2">
                  <Input
                    value={car2Name}
                    onChange={(e) => setCar2Name(e.target.value)}
                    placeholder="Car 2 name"
                  />
                  <Input
                    type="number"
                    value={car2Mpg}
                    onChange={(e) => setCar2Mpg(e.target.value)}
                    placeholder="MPG"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="annual-miles">Annual Miles</Label>
                  <Input
                    id="annual-miles"
                    type="number"
                    value={annualMiles}
                    onChange={(e) => setAnnualMiles(e.target.value)}
                    placeholder="12000"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="fuel-price">Fuel Price ($/gal)</Label>
                  <Input
                    id="fuel-price"
                    type="number"
                    step="0.01"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    placeholder="3.50"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Compare
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Comparison Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{result.car1.name}</p>
                      <p className="text-2xl font-bold">{result.car1.mpg} MPG</p>
                      <p className="text-sm text-muted-foreground">${result.car1.annualCost}/year</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{result.car2.name}</p>
                      <p className="text-2xl font-bold">{result.car2.mpg} MPG</p>
                      <p className="text-sm text-muted-foreground">${result.car2.annualCost}/year</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg text-center ${
                    result.savings > 500 ? "bg-green-100 dark:bg-green-900/20" :
                    result.savings > 200 ? "bg-blue-100 dark:bg-blue-900/20" :
                    "bg-muted"
                  }`}>
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                    <p className="text-4xl font-bold">${result.savings}</p>
                    <p className="text-sm mt-1">with more efficient vehicle</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">5-Year Fuel Cost</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{result.car1.name}:</span>
                        <span className="font-semibold">${result.fiveYearCost.car1.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{result.car2.name}:</span>
                        <span className="font-semibold">${result.fiveYearCost.car2.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-medium">Difference:</span>
                        <span className="font-bold text-green-600">${result.fiveYearCost.difference.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {result.recommendation}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {result.paybackPeriod}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter both vehicles&apos; MPG and click Compare to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Fuel Cost Considerations
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Annual miles:</strong> US average is 12,000-15,000 miles
                  </li>
                  <li>
                    <strong>Real-world MPG:</strong> Often 10-20% lower than EPA estimates
                  </li>
                  <li>
                    <strong>Hybrid premium:</strong> Calculate payback period for hybrid cost
                  </li>
                  <li>
                    <strong>EV comparison:</strong> Electric vehicles cost ~$0.04/mile vs $0.15/mile for gas
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> Annual Cost = (Annual Miles ÷ MPG) × Fuel Price
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
