"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FuelCostCalculatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [fuelEfficiency, setFuelEfficiency] = useState<string>("");
  const [fuelPrice, setFuelPrice] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  const [efficiencyUnit, setEfficiencyUnit] = useState<"mpg" | "l100km" | "kmpl">("mpg");
  const [priceUnit, setPriceUnit] = useState<"gallon" | "liter">("gallon");
  const [result, setResult] = useState<{
    totalFuel: number;
    totalCost: number;
    costPerDistance: number;
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const eff = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (isNaN(dist) || isNaN(eff) || isNaN(price) || dist <= 0 || eff <= 0 || price <= 0) return;

    let fuelNeeded: number;
    let cost: number;

    // Convert everything to a common base for calculation
    if (efficiencyUnit === "mpg") {
      // Miles per gallon
      fuelNeeded = dist / eff; // gallons
    } else if (efficiencyUnit === "l100km") {
      // Liters per 100km
      fuelNeeded = (dist * eff) / 100; // liters
    } else {
      // km per liter
      fuelNeeded = dist / eff; // liters
    }

    cost = fuelNeeded * price;

    const costPerDist = cost / dist;

    setResult({
      totalFuel: fuelNeeded,
      totalCost: cost,
      costPerDistance: costPerDist,
    });
  };

  const reset = () => {
    setDistance("");
    setFuelEfficiency("");
    setFuelPrice("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Fuel Cost Calculator – Estimate Your Trip Fuel Expenses Instantly
          </h1>
          <p className="text-muted-foreground">
            Use our free Fuel Cost Calculator to estimate how much you'll spend on fuel for any
            trip. Enter your distance, vehicle fuel efficiency, and local fuel price to get an
            instant cost breakdown. Perfect for road trips, daily commutes, and travel budgeting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
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
                    <SelectTrigger className="w-[120px]">
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
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gallon">/gal</SelectItem>
                      <SelectItem value="liter">/L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Fuel Cost</p>
                    <p className="text-3xl font-bold text-primary">${result.totalCost.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Fuel Needed</p>
                    <p className="text-lg font-bold">
                      {result.totalFuel.toFixed(2)} {priceUnit === "gallon" ? "gallons" : "liters"}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Cost per {distanceUnit}</p>
                    <p className="text-lg font-bold">${result.costPerDistance.toFixed(2)}/{distanceUnit === "miles" ? "mi" : "km"}</p>
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
          <h3 className="text-lg font-semibold mb-3">How to Calculate Fuel Cost</h3>
          <p className="text-muted-foreground text-sm mb-3">
            The formula for calculating fuel cost is:
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            Fuel Needed = Distance ÷ Fuel Efficiency<br />
            Total Cost = Fuel Needed × Price per Unit
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            For example: If you're driving 300 miles in a car that gets 25 MPG, and gas costs $3.50/gallon:
            <br />
            Fuel Needed = 300 ÷ 25 = 12 gallons
            <br />
            Total Cost = 12 × $3.50 = $42.00
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Fuel Cost Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your trip distance</p>
                    <p>Type the total distance you will travel. Select miles or kilometers based on your location. For round trips, enter the total round-trip distance.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input your vehicle's fuel efficiency</p>
                    <p>Enter your car's fuel economy in MPG, L/100km, or km/L. Check your owner's manual, fuel economy sticker, or use an average like 25 MPG for a typical sedan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set the fuel price and calculate</p>
                    <p>Enter the current fuel price per gallon or liter in your area. Click Calculate to see total fuel cost, fuel needed, and cost per mile or kilometer.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Average Fuel Economy by Vehicle Type
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Vehicle Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Average MPG</th>
                      <th className="text-left py-3 px-2 font-semibold">L/100km</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Compact car</td>
                      <td className="py-3 px-2">30-35 MPG</td>
                      <td className="py-3 px-2">6.7-7.8 L/100km</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Midsize sedan</td>
                      <td className="py-3 px-2">25-30 MPG</td>
                      <td className="py-3 px-2">7.8-9.4 L/100km</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">SUV (compact)</td>
                      <td className="py-3 px-2">22-28 MPG</td>
                      <td className="py-3 px-2">8.4-10.7 L/100km</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">SUV (full-size)</td>
                      <td className="py-3 px-2">15-20 MPG</td>
                      <td className="py-3 px-2">11.8-15.7 L/100km</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Pickup truck</td>
                      <td className="py-3 px-2">15-22 MPG</td>
                      <td className="py-3 px-2">10.7-15.7 L/100km</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Hybrid sedan</td>
                      <td className="py-3 px-2">45-55 MPG</td>
                      <td className="py-3 px-2">4.3-5.2 L/100km</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Actual fuel economy varies based on driving conditions, vehicle age, and driving style. Highway driving typically achieves 20-30% better economy than city driving.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Fuel Cost Calculations
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">MPG vs L/100km: Two Ways to Measure Efficiency</h4>
                  <p>
                    The United States uses miles per gallon (MPG), where higher numbers mean better efficiency.
                    Most other countries use liters per 100 kilometers (L/100km), where lower numbers are better.
                    To convert MPG to L/100km, divide 235.2 by the MPG value. A 25 MPG car equals 235.2 / 25 = 9.4 L/100km.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Real-World Fuel Economy Differs from EPA Ratings</h4>
                  <p>
                    EPA fuel economy tests use controlled conditions that rarely match real driving. Aggressive
                    acceleration, high speeds, cold weather, and heavy loads all reduce fuel economy. Most drivers
                    achieve 10-20% lower MPG than the EPA combined rating. Highway driving at 75 mph uses about
                    25% more fuel than at 55 mph due to increased aerodynamic drag.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The True Cost of Driving</h4>
                  <p>
                    Fuel is only part of driving costs. The IRS standard mileage rate for 2024 is 67 cents per mile,
                    which includes fuel, depreciation, maintenance, and insurance. For a car getting 25 MPG with
                    gas at $3.50/gallon, fuel alone costs 14 cents per mile. The remaining 53 cents covers everything else.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Reducing Fuel Costs
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Drive smoothly</p>
                    <p>Avoid rapid acceleration and hard braking. Aggressive driving can lower highway gas mileage by 15-30% and city mileage by 10-40%. Use cruise control on highways.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Maintain proper tire pressure</p>
                    <p>Underinflated tires increase rolling resistance. For every 1 PSI below recommended pressure, fuel economy drops about 0.2%. Check tires monthly when cold.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reduce idling</p>
                    <p>Idling gets 0 MPG. Modern engines use less fuel restarting than idling for more than 10 seconds. Turn off the engine during extended stops.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use fuel price apps</p>
                    <p>Apps like GasBuddy show real-time fuel prices along your route. Prices can vary by 20-50 cents per gallon within a few miles. Plan fills accordingly.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How do I calculate fuel cost for a trip?</h4>
                  <p>
                    Divide your trip distance by your vehicle's fuel economy to get fuel needed, then multiply
                    by fuel price. For a 500-mile trip in a 25 MPG car with gas at $3.50/gallon: 500 / 25 = 20
                    gallons, then 20 x $3.50 = $70. This is the estimated fuel cost for the trip.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is a good MPG for a car?</h4>
                  <p>
                    For new cars, 25-30 MPG combined is average for non-hybrid sedans. Compact cars achieve
                    30-35 MPG. Hybrids reach 45-55 MPG. SUVs typically get 20-28 MPG. Trucks range from
                    15-22 MPG. Electric vehicles are rated in MPGe (miles per gallon equivalent).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much should I budget for gas per month?</h4>
                  <p>
                    Multiply your monthly miles by cost per mile. For 1,000 miles/month in a 25 MPG car with
                    $3.50/gallon gas: 1,000 / 25 = 40 gallons, 40 x $3.50 = $140/month. Commuters driving
                    1,500 miles monthly might budget $200-250 depending on their vehicle.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does using premium gas improve fuel economy?</h4>
                  <p>
                    Only if your car requires it. Most cars run fine on regular 87-octane gas. Premium in a
                    regular car provides no benefit. If your car requires premium, using regular can reduce
                    fuel economy and potentially damage the engine. Check your owner's manual.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How accurate is this fuel cost estimate?</h4>
                  <p>
                    The calculation is mathematically exact for the inputs provided. However, real-world fuel
                    economy varies from EPA ratings by 10-20%. Traffic, weather, driving style, and vehicle
                    condition all affect actual consumption. Use this as a planning estimate, not a guarantee.
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
                  href="/calculators/fuel-efficiency-comparison-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Fuel Efficiency Comparison Calculator</span>
                  <p className="text-muted-foreground">Compare two vehicles side-by-side to see which costs less to operate</p>
                </a>
                <a
                  href="/calculators/mpg-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">MPG Calculator</span>
                  <p className="text-muted-foreground">Calculate your vehicle's actual miles per gallon from fill-up data</p>
                </a>
                <a
                  href="/calculators/trip-cost-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Trip Cost Calculator</span>
                  <p className="text-muted-foreground">Estimate total trip costs including fuel, tolls, and accommodations</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
