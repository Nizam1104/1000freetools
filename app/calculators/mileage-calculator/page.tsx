"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MileageCalculatorPage() {
  const [distance, setDistance] = useState<string>("");
  const [fuelUsed, setFuelUsed] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "km">("miles");
  const [fuelUnit, setFuelUnit] = useState<"gallons" | "liters">("gallons");
  const [result, setResult] = useState<{
    mpg: number | null;
    kmpl: number | null;
    l100km: number | null;
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);

    if (isNaN(dist) || isNaN(fuel) || dist <= 0 || fuel <= 0) return;

    let distanceInMiles = dist;
    let distanceInKm = dist;
    let fuelInGallons = fuel;
    let fuelInLiters = fuel;

    // Convert to base units
    if (distanceUnit === "km") {
      distanceInMiles = dist * 0.621371;
      distanceInKm = dist;
    } else {
      distanceInMiles = dist;
      distanceInKm = dist * 1.60934;
    }

    if (fuelUnit === "liters") {
      fuelInGallons = fuel * 0.264172;
      fuelInLiters = fuel;
    } else {
      fuelInGallons = fuel;
      fuelInLiters = fuel * 3.78541;
    }

    // Calculate all efficiency metrics
    const mpg = distanceInMiles / fuelInGallons;
    const kmpl = distanceInKm / fuelInLiters;
    const l100km = (fuelInLiters / distanceInKm) * 100;

    setResult({
      mpg: Math.round(mpg * 100) / 100,
      kmpl: Math.round(kmpl * 100) / 100,
      l100km: Math.round(l100km * 100) / 100,
    });
  };

  const reset = () => {
    setDistance("");
    setFuelUsed("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)
          </h1>
          <p className="text-muted-foreground">
            Find out your car's real-world mileage with our free Mileage Calculator. Simply enter
            the distance traveled and the amount of fuel used to instantly calculate MPG, km/L, or
            L/100km. Great for tracking fuel efficiency and planning fuel budgets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="distance">Distance Traveled</Label>
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
                <Label htmlFor="fuelUsed">Fuel Used</Label>
                <div className="flex gap-2">
                  <Input
                    id="fuelUsed"
                    type="number"
                    placeholder="Enter fuel used"
                    value={fuelUsed}
                    onChange={(e) => setFuelUsed(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={fuelUnit} onValueChange={(v) => setFuelUnit(v as "gallons" | "liters")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gallons">Gallons</SelectItem>
                      <SelectItem value="liters">Liters</SelectItem>
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
                    <p className="text-sm text-muted-foreground">Fuel Efficiency (MPG)</p>
                    <p className="text-3xl font-bold text-primary">{result.mpg}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">km/L</p>
                      <p className="text-xl font-bold">{result.kmpl}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">L/100km</p>
                      <p className="text-xl font-bold">{result.l100km}</p>
                    </div>
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Mileage Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fill your tank and reset trip odometer</p>
                    <p>Start with a full tank. Reset your trip odometer to zero, or note the current odometer reading.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Drive normally, then refill</p>
                    <p>Drive until you need fuel again. Fill the tank completely and note how many gallons or liters it took.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter values and calculate</p>
                    <p>Input the distance traveled and fuel used. Select your units. The calculator shows MPG, km/L, and L/100km.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Fuel Efficiency Comparison by Vehicle Type
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Vehicle Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Avg MPG</th>
                      <th className="text-left py-3 px-2 font-semibold">Avg L/100km</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Compact Car</td>
                      <td className="py-3 px-2">30-40</td>
                      <td className="py-3 px-2">5.9-7.8</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Midsize Sedan</td>
                      <td className="py-3 px-2">25-35</td>
                      <td className="py-3 px-2">6.7-9.4</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">SUV (Compact)</td>
                      <td className="py-3 px-2">22-30</td>
                      <td className="py-3 px-2">7.8-10.7</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">SUV (Full-size)</td>
                      <td className="py-3 px-2">15-22</td>
                      <td className="py-3 px-2">10.7-15.7</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Pickup Truck</td>
                      <td className="py-3 px-2">15-25</td>
                      <td className="py-3 px-2">9.4-15.7</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Hybrid</td>
                      <td className="py-3 px-2">45-55</td>
                      <td className="py-3 px-2">4.3-5.2</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Electric (MPGe)</td>
                      <td className="py-3 px-2">100-130</td>
                      <td className="py-3 px-2">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Actual mileage varies based on driving habits, conditions, and vehicle maintenance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Fuel Efficiency Metrics
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">MPG (Miles Per Gallon)</h4>
                  <p>
                    Used primarily in the US and UK. Higher numbers mean better efficiency. A car getting 30 MPG travels 30 miles on one gallon of fuel. The formula is: MPG = Distance (miles) ÷ Fuel Used (gallons).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">km/L (Kilometers Per Liter)</h4>
                  <p>
                    Common in many countries. Works like MPG but uses metric units. A car getting 15 km/L travels 15 kilometers on one liter of fuel. Formula: km/L = Distance (km) ÷ Fuel Used (liters).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">L/100km (Liters Per 100 Kilometers)</h4>
                  <p>
                    Standard in Europe, Canada, and Australia. Lower numbers mean better efficiency—the opposite of MPG. A car using 8 L/100km consumes 8 liters to travel 100 km. Formula: L/100km = (Fuel Used ÷ Distance) × 100.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Better Fuel Economy
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Drive smoothly</p>
                    <p>Avoid rapid acceleration and hard braking. Gentle inputs can improve highway mileage by 15-30%.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Maintain steady speeds</p>
                    <p>Use cruise control on highways. Fuel economy typically drops sharply above 50 mph (80 km/h).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Keep tires properly inflated</p>
                    <p>Underinflated tires increase rolling resistance. Check pressure monthly when tires are cold.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reduce weight and drag</p>
                    <p>Remove unnecessary items from your trunk. Roof racks and cargo boxes increase drag and reduce MPG.</p>
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
                  <h4 className="font-medium text-foreground mb-2">Why is my actual MPG lower than the EPA rating?</h4>
                  <p>
                    EPA tests are conducted in controlled conditions. Real-world driving includes traffic, hills, AC use, and varying speeds—all of which reduce mileage. Cold weather can reduce MPG by 10-20%. Aggressive driving has an even bigger impact.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How accurate is my car's displayed MPG?</h4>
                  <p>
                    Most cars overestimate by 2-5 MPG. The display calculates from fuel injector data, not actual consumption. For accurate numbers, use the fill-up method: track miles driven between full tanks and divide by gallons pumped.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does premium fuel improve mileage?</h4>
                  <p>
                    Only if your car requires it. High-compression engines designed for premium will run poorly on regular. For cars that recommend regular, premium provides no benefit—the engine can't take advantage of the higher octane.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much does idling affect fuel economy?</h4>
                  <p>
                    Idling gets 0 MPG. Modern engines use less fuel restarting than idling for more than 10 seconds. If you'll be stopped longer than a minute (train crossings, long waits), turn off the engine.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What's the most fuel-efficient speed?</h4>
                  <p>
                    Most cars achieve peak MPG between 45-55 mph (72-88 km/h). Fuel economy drops about 1% for every mph over 55. At 75 mph, you might use 25% more fuel than at 55 mph.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
