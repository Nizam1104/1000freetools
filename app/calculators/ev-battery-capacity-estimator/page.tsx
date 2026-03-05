"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EVResult {
  originalCapacity: number;
  age: number;
  cycles: number;
  degradationRate: number;
  currentCapacity: number;
  range: number;
  health: string;
  recommendations: string[];
}

export default function EVBatteryCapacityEstimatorPage() {
  const [originalCapacity, setOriginalCapacity] = useState<string>("");
  const [vehicleAge, setVehicleAge] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [chargingHabits, setChargingHabits] = useState<string>("normal");
  const [climate, setClimate] = useState<string>("moderate");
  const [result, setResult] = useState<EVResult | null>(null);

  const calculate = () => {
    const capacityNum = parseFloat(originalCapacity) || 0;
    const ageNum = parseFloat(vehicleAge) || 0;
    const mileageNum = parseFloat(mileage) || 0;

    if (capacityNum === 0) return;

    // Base degradation: ~2% per year
    let degradationRate = 2;

    // Adjust for charging habits
    const chargingFactors: Record<string, number> = {
      gentle: -0.5,  // Mostly Level 2, rarely above 80%
      normal: 0,     // Mix of charging
      aggressive: 1, // Frequent DC fast charging, often to 100%
    };
    degradationRate += chargingFactors[chargingHabits] || 0;

    // Adjust for climate
    const climateFactors: Record<string, number> = {
      cold: 0.5,     // Cold climates accelerate degradation
      moderate: 0,   // Ideal conditions
      hot: 0.5,      // Hot climates also accelerate degradation
    };
    degradationRate += climateFactors[climate] || 0;

    // Mileage factor (high mileage = more cycles)
    const cyclesPerYear = mileageNum / (ageNum * 300) || 1; // Assume 300km per full cycle
    if (cyclesPerYear > 1.5) {
      degradationRate += 0.5;
    }

    // Calculate total degradation
    const totalDegradation = Math.min(30, degradationRate * ageNum); // Cap at 30%
    const currentCapacity = capacityNum * (1 - totalDegradation / 100);

    // Estimate range (rough estimate: 5-6 km per kWh)
    const rangePerKwh = 5.5;
    const range = currentCapacity * rangePerKwh;

    // Health assessment
    let health = "";
    if (totalDegradation < 10) {
      health = "Excellent - Minimal degradation";
    } else if (totalDegradation < 20) {
      health = "Good - Normal degradation for age";
    } else if (totalDegradation < 30) {
      health = "Fair - Above average degradation";
    } else {
      health = "Poor - Consider battery service/replacement";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🔋 Current capacity: ${currentCapacity.toFixed(1)} kWh (${(100 - totalDegradation).toFixed(1)}% of original)`);
    recommendations.push(`📏 Estimated range: ${range.toFixed(0)} km`);

    if (chargingHabits === "aggressive") {
      recommendations.push("⚡ Consider reducing DC fast charging frequency");
      recommendations.push("🔌 Try to keep charge between 20-80% for daily use");
    }

    if (climate === "hot" || climate === "cold") {
      recommendations.push("🌡️ Park in garage/shade when possible");
      recommendations.push("❄️🔥 Pre-condition battery while plugged in");
    }

    if (totalDegradation > 20) {
      recommendations.push("🔍 Consider battery health check at service center");
    }

    recommendations.push("📊 Degradation rate: ~" + degradationRate.toFixed(1) + "% per year");

    setResult({
      originalCapacity: capacityNum,
      age: ageNum,
      cycles: Math.round(mileageNum / 300),
      degradationRate: parseFloat(degradationRate.toFixed(1)),
      currentCapacity: parseFloat(currentCapacity.toFixed(1)),
      range: parseFloat(range.toFixed(0)),
      health,
      recommendations,
    });
  };

  const reset = () => {
    setOriginalCapacity("");
    setVehicleAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life
          </h1>
          <p className="text-muted-foreground">
            Estimate your EV&apos;s effective battery capacity after degradation with our
            EV Battery Capacity Estimator. Understand how aging and usage patterns affect
            your range and plan accordingly for long trips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Original Battery Capacity (kWh)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={originalCapacity}
                  onChange={(e) => setOriginalCapacity(e.target.value)}
                  placeholder="e.g., 75"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="age">Vehicle Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={vehicleAge}
                    onChange={(e) => setVehicleAge(e.target.value)}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mileage">Total Mileage (km)</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="charging">Charging Habits</Label>
                <Select value={chargingHabits} onValueChange={setChargingHabits}>
                  <SelectTrigger id="charging">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gentle">Gentle (Mostly Level 2, 20-80%)</SelectItem>
                    <SelectItem value="normal">Normal (Mixed charging)</SelectItem>
                    <SelectItem value="aggressive">Aggressive (Frequent DC fast, 100%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climate">Climate</Label>
                <Select value={climate} onValueChange={setClimate}>
                  <SelectTrigger id="climate">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold (Regular sub-zero temps)</SelectItem>
                    <SelectItem value="moderate">Moderate (10-25°C average)</SelectItem>
                    <SelectItem value="hot">Hot (Regular above 30°C)</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Battery Health</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.currentCapacity / result.originalCapacity > 0.9 ? "bg-green-100 dark:bg-green-900/20" :
                      result.currentCapacity / result.originalCapacity > 0.8 ? "bg-amber-100 dark:bg-amber-900/20" :
                        "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Current Capacity</p>
                    <p className="text-4xl font-bold">{result.currentCapacity} kWh</p>
                    <p className="text-sm mt-1">{result.health}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Est. Range</p>
                      <p className="text-lg font-bold">{result.range} km</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Degradation</p>
                      <p className="text-lg font-bold">{result.degradationRate}%/yr</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Original Capacity:</span>
                      <span className="font-semibold">{result.originalCapacity} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Capacity:</span>
                      <span className="font-semibold">{((result.currentCapacity / result.originalCapacity) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Full Cycles:</span>
                      <span className="font-semibold">{result.cycles}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter vehicle details and click Calculate to see battery health</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                EV Battery Degradation Facts
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Typical degradation:</strong> 2-3% per year
                  </li>
                  <li>
                    <strong>Warranty threshold:</strong> Most warranties cover below 70%
                  </li>
                  <li>
                    <strong>DC fast charging:</strong> Can accelerate degradation if used frequently
                  </li>
                  <li>
                    <strong>Temperature:</strong> Extreme heat and cold both accelerate degradation
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> For daily use, keep charge between 20-80% and use
                  Level 2 charging when possible. Save DC fast charging for road trips.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">How EV Battery Capacity Estimation Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Vehicle Details</h3>
              <p className="text-sm text-muted-foreground">Input your EV's original battery capacity, age, and total mileage for analysis.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Specify Usage Patterns</h3>
              <p className="text-sm text-muted-foreground">Select your charging habits and climate to factor in degradation accelerators.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Get Battery Health Report</h3>
              <p className="text-sm text-muted-foreground">View current capacity, estimated range, degradation rate, and personalized recommendations.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Key Features of EV Battery Estimator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Multi-Factor Degradation Model
              </h3>
              <p className="text-sm text-muted-foreground">Accounts for age, mileage, charging habits, and climate to estimate realistic battery health.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Range Estimation
              </h3>
              <p className="text-sm text-muted-foreground">Calculates current driving range based on degraded battery capacity and efficiency.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Health Assessment
              </h3>
              <p className="text-sm text-muted-foreground">Provides clear health rating from Excellent to Poor with actionable insights.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Personalized Recommendations
              </h3>
              <p className="text-sm text-muted-foreground">Get specific tips to slow degradation based on your charging habits and climate.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Pre-Purchase Evaluation
              </h3>
              <p className="text-sm text-muted-foreground">Use when buying a used EV to estimate remaining battery life and value.</p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">EV Battery Degradation Factors</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-2">Base Degradation Rate:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Typical: 2-3% per year</li>
                  <li>• Gentle charging: -0.5%</li>
                  <li>• Aggressive charging: +1%</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Climate Impact:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Cold climates: +0.5%</li>
                  <li>• Moderate: baseline</li>
                  <li>• Hot climates: +0.5%</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-card rounded">
              <p className="font-semibold mb-2">Example: 5-Year-Old EV with 75 kWh Battery</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Original Capacity: 75 kWh (100%)</li>
                <li>• Estimated Degradation: 10-15%</li>
                <li>• Current Capacity: ~64-68 kWh</li>
                <li>• Estimated Range: 350-375 km</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About EV Battery Degradation</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How fast do EV batteries degrade?</h3>
              <p className="text-sm text-muted-foreground">Most EV batteries degrade 2-3% per year under normal use. After 10 years, expect 70-85% of original capacity. Many manufacturers warranty batteries for 8 years or 100,000 miles at 70% capacity.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Does fast charging damage EV batteries?</h3>
              <p className="text-sm text-muted-foreground">Frequent DC fast charging can accelerate degradation. Level 2 charging is gentler on batteries. Occasional fast charging for road trips has minimal impact, but daily use may reduce battery life.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is the ideal charge level for EV batteries?</h3>
              <p className="text-sm text-muted-foreground">For daily use, keep charge between 20-80%. Avoid regularly charging to 100% or draining below 10%. For long trips, charging to 100% is fine occasionally.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How does temperature affect EV battery life?</h3>
              <p className="text-sm text-muted-foreground">Extreme heat and cold both accelerate degradation. Park in shade or garage when possible. Pre-condition the battery while plugged in during extreme weather.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">When should I replace my EV battery?</h3>
              <p className="text-sm text-muted-foreground">Most EVs remain usable with 70-80% capacity. Consider replacement when capacity drops below 60% or range no longer meets your needs. Many degraded batteries have second-life applications in energy storage.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Related EV & Energy Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/charging-cost-ev-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
              <h3 className="font-semibold mb-2">EV Charging Cost Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the cost to charge your electric vehicle at home or public stations.</p>
            </a>
            <a href="/calculators/range-estimator-ev" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
              <h3 className="font-semibold mb-2">EV Range Estimator</h3>
              <p className="text-sm text-muted-foreground">Estimate your electric vehicle's driving range based on speed, temperature, and terrain.</p>
            </a>
            <a href="/calculators/battery-life-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
              <h3 className="font-semibold mb-2">Battery Life Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate battery runtime and lifespan for various devices and applications.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
