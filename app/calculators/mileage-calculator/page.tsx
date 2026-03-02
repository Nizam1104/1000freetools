"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How to Calculate Mileage</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Fuel efficiency formulas:
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>MPG = Distance (miles) ÷ Fuel Used (gallons)</div>
            <div>km/L = Distance (km) ÷ Fuel Used (liters)</div>
            <div>L/100km = (Fuel Used (liters) ÷ Distance (km)) × 100</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Tip:</strong> For accurate results, fill your tank completely, reset your trip
            odometer, drive normally, then refill and note how much fuel was needed.
          </p>
        </div>
      </div>
    </div>
  );
}
