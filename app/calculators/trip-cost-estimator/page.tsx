"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TripCostEstimatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [fuelEfficiency, setFuelEfficiency] = useState<string>("");
  const [fuelPrice, setFuelPrice] = useState<string>("");
  const [tolls, setTolls] = useState<string>("");
  const [foodBudget, setFoodBudget] = useState<string>("");
  const [accommodation, setAccommodation] = useState<string>("");
  const [otherExpenses, setOtherExpenses] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  const [efficiencyUnit, setEfficiencyUnit] = useState<"mpg" | "l100km" | "kmpl">("mpg");
  const [priceUnit, setPriceUnit] = useState<"gallon" | "liter">("gallon");
  const [result, setResult] = useState<{
    fuelCost: number;
    totalCost: number;
    costPerPerson: number;
    breakdown: Record<string, number>;
  } | null>(null);
  const [numPeople, setNumPeople] = useState<string>("1");

  const calculate = () => {
    const dist = parseFloat(distance);
    const eff = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);
    const tollsNum = parseFloat(tolls) || 0;
    const foodNum = parseFloat(foodBudget) || 0;
    const accommodationNum = parseFloat(accommodation) || 0;
    const otherNum = parseFloat(otherExpenses) || 0;
    const people = parseFloat(numPeople) || 1;

    if (isNaN(dist) || isNaN(eff) || isNaN(price) || dist <= 0 || eff <= 0 || price <= 0) return;

    let fuelNeeded: number;

    if (efficiencyUnit === "mpg") {
      fuelNeeded = dist / eff;
    } else if (efficiencyUnit === "l100km") {
      fuelNeeded = (dist * eff) / 100;
    } else {
      fuelNeeded = dist / eff;
    }

    const fuelCost = fuelNeeded * price;
    const totalCost = fuelCost + tollsNum + foodNum + accommodationNum + otherNum;
    const costPerPerson = totalCost / people;

    setResult({
      fuelCost,
      totalCost,
      costPerPerson,
      breakdown: {
        Fuel: fuelCost,
        Tolls: tollsNum,
        Food: foodNum,
        Accommodation: accommodationNum,
        Other: otherNum,
      },
    });
  };

  const reset = () => {
    setDistance("");
    setFuelEfficiency("");
    setFuelPrice("");
    setTolls("");
    setFoodBudget("");
    setAccommodation("");
    setOtherExpenses("");
    setNumPeople("1");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Trip Cost Estimator – Plan Your Road Trip Budget with Ease
          </h1>
          <p className="text-muted-foreground">
            Plan your next road trip with confidence using our Trip Cost Estimator. Calculate total
            travel expenses including fuel, tolls, meals, and lodging all in one place. Get a full
            cost breakdown before you hit the road.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Trip Details</h3>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance</Label>
                <div className="flex gap-2">
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Enter distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={distanceUnit} onValueChange={(v) => setDistanceUnit(v as "miles" | "km")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="miles">Miles</SelectItem>
                      <SelectItem value="km">Kilometers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelEfficiency">Fuel Efficiency</Label>
                <div className="flex gap-2">
                  <Input
                    id="fuelEfficiency"
                    type="number"
                    placeholder="Enter efficiency"
                    value={fuelEfficiency}
                    onChange={(e) => setFuelEfficiency(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={efficiencyUnit} onValueChange={(v) => setEfficiencyUnit(v as "mpg" | "l100km" | "kmpl")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpg">MPG</SelectItem>
                      <SelectItem value="l100km">L/100km</SelectItem>
                      <SelectItem value="kmpl">km/L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelPrice">Fuel Price</Label>
                <div className="flex gap-2">
                  <Input
                    id="fuelPrice"
                    type="number"
                    placeholder="Enter fuel price"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={priceUnit} onValueChange={(v) => setPriceUnit(v as "gallon" | "liter")}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gallon">/gal</SelectItem>
                      <SelectItem value="liter">/L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h3 className="font-semibold pt-2">Additional Expenses</h3>

              <div className="space-y-2">
                <Label htmlFor="tolls">Tolls ($)</Label>
                <Input
                  id="tolls"
                  type="number"
                  placeholder="0"
                  value={tolls}
                  onChange={(e) => setTolls(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="food">Food Budget ($)</Label>
                <Input
                  id="food"
                  type="number"
                  placeholder="0"
                  value={foodBudget}
                  onChange={(e) => setFoodBudget(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodation">Accommodation ($)</Label>
                <Input
                  id="accommodation"
                  type="number"
                  placeholder="0"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="other">Other Expenses ($)</Label>
                <Input
                  id="other"
                  type="number"
                  placeholder="0"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="people">Number of People</Label>
                <Input
                  id="people"
                  type="number"
                  placeholder="1"
                  value={numPeople}
                  onChange={(e) => setNumPeople(e.target.value)}
                />
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
              <h3 className="text-lg font-semibold mb-4">Trip Cost Breakdown</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Trip Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.totalCost.toFixed(2)}</p>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(result.breakdown).map(([category, amount]) => (
                      <div key={category} className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm">{category}</span>
                        <span className="font-semibold">${amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cost Per Person</p>
                    <p className="text-2xl font-bold">${result.costPerPerson.toFixed(2)}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Fuel Cost</p>
                    <p className="text-xl font-bold">${result.fuelCost.toFixed(2)}</p>
                  </div>
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
          <h3 className="text-lg font-semibold mb-3">How to Estimate Trip Cost</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Total Trip Cost = Fuel Cost + Tolls + Food + Accommodation + Other Expenses
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            Fuel Cost = (Distance ÷ Fuel Efficiency) × Price per Unit
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Tip:</strong> Always add a 10-15% buffer for unexpected expenses like detours,
            emergency stops, or price variations.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Your Road Trip Budget</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Trip Distance</h3>
                <p className="text-sm text-muted-foreground">Input your total travel distance in miles or kilometers using Google Maps or your GPS.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Add Vehicle & Fuel Details</h3>
                <p className="text-sm text-muted-foreground">Enter your car's fuel efficiency (MPG or L/100km) and current gas prices along your route.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Include Additional Expenses</h3>
                <p className="text-sm text-muted-foreground">Add tolls, food budget, accommodation costs, and other expenses for a complete trip budget.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Trip Cost Estimator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Multi-Unit Support</h3>
              <p className="text-sm text-muted-foreground">Works with miles/kilometers, MPG/L/100km/km/L, and gallon/liter fuel pricing for international travelers.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Complete Expense Tracking</h3>
              <p className="text-sm text-muted-foreground">Accounts for fuel, tolls, meals, lodging, and miscellaneous expenses in one comprehensive calculation.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Cost Per Person Split</h3>
              <p className="text-sm text-muted-foreground">Automatically divides total trip cost among travelers for easy expense sharing among friends.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Detailed Cost Breakdown</h3>
              <p className="text-sm text-muted-foreground">See exactly where your money goes with itemized expense categories for better budget planning.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Trip Cost Calculation Formulas</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Component</th>
                  <th className="text-left py-2">Formula</th>
                  <th className="text-left py-2">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Fuel Needed (MPG)</td>
                  <td className="py-2 font-mono">Distance ÷ MPG</td>
                  <td className="py-2">500 mi ÷ 25 MPG = 20 gal</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Fuel Needed (L/100km)</td>
                  <td className="py-2 font-mono">(Distance × L/100km) ÷ 100</td>
                  <td className="py-2">(800 km × 8) ÷ 100 = 64 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Fuel Cost</td>
                  <td className="py-2 font-mono">Fuel Needed × Price/Unit</td>
                  <td className="py-2">20 gal × $3.50 = $70</td>
                </tr>
                <tr>
                  <td className="py-2">Total Trip Cost</td>
                  <td className="py-2 font-mono">Fuel + Tolls + Food + Hotel + Other</td>
                  <td className="py-2">$70 + $25 + $100 + $200 + $50 = $445</td>
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
              <h3 className="font-semibold mb-2">How do I calculate fuel cost for a road trip?</h3>
              <p className="text-sm text-muted-foreground">Divide your total distance by your vehicle's fuel efficiency to get fuel needed, then multiply by the price per gallon or liter. For example: 600 miles ÷ 30 MPG = 20 gallons × $3.50/gallon = $70 in fuel costs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much should I budget for food on a road trip?</h3>
              <p className="text-sm text-muted-foreground">Plan $15-25 per person per meal for restaurants, or $10-15 per day if packing meals. A family of four typically spends $100-200 per day on food during road trips depending on dining choices.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's a good rule of thumb for road trip budgeting?</h3>
              <p className="text-sm text-muted-foreground">Budget 50% for fuel and tolls, 30% for accommodation, 15% for food, and 5% for miscellaneous expenses. Always add a 10-15% contingency fund for unexpected costs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I split road trip costs fairly?</h3>
              <p className="text-sm text-muted-foreground">Divide total trip costs by the number of travelers for equal splitting. Alternatively, the driver can be exempt from fuel costs, or costs can be split by household rather than individuals.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Are toll costs significant for road trips?</h3>
              <p className="text-sm text-muted-foreground">Tolls can add $20-100+ depending on your route. Major toll roads like the Pennsylvania Turnpike or Florida's Turnpike can cost $50-100 for a one-way crossing. Use toll-free routes to save money if time permits.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
