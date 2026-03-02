"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
