"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

                  <div className={`p-4 rounded-lg text-center ${result.savings > 500 ? "bg-green-100 dark:bg-green-900/20" :
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
                  <strong>Formula:</strong> Annual Cost = (Annual Miles / MPG) x Fuel Price
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Fuel Efficiency Comparison Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter both vehicles information</p>
                    <p>Name each vehicle and input their fuel economy in MPG. You can compare any two vehicles: sedans, SUVs, trucks, or hybrids.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your driving parameters</p>
                    <p>Enter your annual mileage (US average is 12,000-15,000 miles) and current fuel price in your area.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compare and decide</p>
                    <p>Review annual fuel costs, 5-year projections, and total savings. The calculator recommends which vehicle costs less to operate.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Vehicle Fuel Economy Comparison Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Vehicle Class</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical MPG Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Annual Fuel Cost*</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Compact hybrid</td>
                      <td className="py-3 px-2">45-55 MPG</td>
                      <td className="py-3 px-2">$800-970</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Midsize sedan</td>
                      <td className="py-3 px-2">25-32 MPG</td>
                      <td className="py-3 px-2">$1,310-1,680</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Compact SUV</td>
                      <td className="py-3 px-2">24-30 MPG</td>
                      <td className="py-3 px-2">$1,400-1,750</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Midsize SUV</td>
                      <td className="py-3 px-2">20-26 MPG</td>
                      <td className="py-3 px-2">$1,615-2,100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Full-size pickup</td>
                      <td className="py-3 px-2">15-20 MPG</td>
                      <td className="py-3 px-2">$2,100-2,800</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Electric vehicle</td>
                      <td className="py-3 px-2">3-4 mi/kWh</td>
                      <td className="py-3 px-2">$480-640</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                *Based on 12,000 miles/year at $3.50/gallon. EV costs based on $0.16/kWh electricity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Vehicle Operating Costs
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Hybrid Payback Calculation</h4>
                  <p>
                    Hybrids cost more upfront but save on fuel. To find the payback period, divide the price
                    premium by annual fuel savings. If a hybrid costs $3,000 more but saves $600/year on gas,
                    payback is $3,000 / $600 = 5 years. If you keep the car longer than 5 years, the hybrid
                    saves money. If you sell sooner, the conventional model may be cheaper overall.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Electric vs Gas: Total Cost Comparison</h4>
                  <p>
                    EVs have lower fuel costs (about $0.04/mile vs $0.15/mile for gas) but higher purchase
                    prices. A $40,000 EV vs $30,000 gas car has a $10,000 premium. At 12,000 miles/year,
                    fuel savings are about $1,320/year ($1,800 gas - $480 electric). Payback is roughly
                    7-8 years, not counting potential tax credits or lower maintenance costs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Depreciation Matters More Than Fuel</h4>
                  <p>
                    For most vehicles, depreciation exceeds fuel costs over 5 years. A $35,000 car losing
                    50% value costs $17,500 in depreciation. Even a gas guzzler at $2,500/year fuel is
                    $12,500 over 5 years. When comparing vehicles, consider total cost of ownership:
                    purchase price, depreciation, fuel, insurance, and maintenance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Choosing a Fuel-Efficient Vehicle
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate your actual needs</p>
                    <p>Most SUV buyers never tow or haul large loads. A sedan or crossover often meets real-world needs with 30-50% better fuel economy than a truck-based SUV.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider certified pre-owned</p>
                    <p>A 2-3 year old car has already taken the biggest depreciation hit. CPO vehicles come with warranties and cost 20-30% less than new. Your fuel savings go further.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check EPA ratings carefully</p>
                    <p>The EPA website provides official fuel economy data for all vehicles. Look at combined, city, and highway ratings. Real-world results typically run 10-15% below EPA numbers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Factor in your driving pattern</p>
                    <p>Mostly highway? Prioritize highway MPG. Mostly city? Hybrids shine in stop-and-go traffic. EVs make sense if you can charge at home and drive under 200 miles daily.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much can I save with a more fuel-efficient car?</h4>
                  <p>
                    Savings depend on your driving and fuel prices. Upgrading from 20 MPG to 30 MPG saves
                    about $700/year at 12,000 miles and $3.50/gallon. Going from 15 MPG to 25 MPG saves
                    about $930/year. Over 5 years, these savings add up to $3,500-4,650.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is a hybrid worth the extra cost?</h4>
                  <p>
                    Hybrids typically cost $2,000-4,000 more than equivalent gas models. With fuel savings
                    of $400-800/year, payback takes 4-7 years. If you keep the car longer, the hybrid wins.
                    Hybrids also have better city MPG and lower emissions. Consider your expected ownership period.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I buy an electric vehicle?</h4>
                  <p>
                    EVs make sense if you can charge at home, drive under 200 miles daily, and live where
                    electricity is cheap. Fuel costs drop 70-80% compared to gas. However, purchase prices
                    remain higher, and public charging can be slow and expensive. Calculate total cost of
                    ownership including any tax credits in your area.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does premium gas improve fuel economy?</h4>
                  <p>
                    Only if your car requires it. Most vehicles run fine on regular 87-octane. Using premium
                    in a regular car provides zero benefit. If your car requires premium, the higher cost
                    per gallon may offset any small efficiency gains. Check your owner's manual.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How accurate are EPA fuel economy ratings?</h4>
                  <p>
                    EPA ratings are standardized but real-world results vary. Most drivers achieve 10-20%
                    lower MPG than EPA combined ratings. Aggressive driving, cold weather, and heavy loads
                    reduce economy further. Use EPA numbers for comparison, but expect slightly worse results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/fuel-cost-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Fuel Cost Calculator</span>
                  <p className="text-muted-foreground">Calculate fuel cost for a specific trip distance</p>
                </a>
                <a
                  href="/calculators/mpg-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">MPG Calculator</span>
                  <p className="text-muted-foreground">Calculate your vehicle's actual fuel economy from fill-up data</p>
                </a>
                <a
                  href="/calculators/lease-vs-buy-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Lease vs Buy Calculator</span>
                  <p className="text-muted-foreground">Compare the total cost of leasing versus buying a vehicle</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
