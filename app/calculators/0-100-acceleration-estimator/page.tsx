"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ZeroToHundredAccelerationEstimatorPage() {
  const [horsepower, setHorsepower] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [drivetrain, setDrivetrain] = useState<"fwd" | "rwd" | "awd">("rwd");
  const [transmission, setTransmission] = useState<"manual" | "automatic" | "dct" | "cvt">("automatic");
  const [powerUnit, setPowerUnit] = useState<"hp" | "kw">("hp");
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [result, setResult] = useState<{
    time0to60: number;
    time0to100: number;
    quarterMile: number;
    quarterMileSpeed: number;
  } | null>(null);

  const calculate = () => {
    let hp = parseFloat(horsepower);
    let weightLbs = parseFloat(weight);

    if (isNaN(hp) || isNaN(weightLbs) || hp <= 0 || weightLbs <= 0) return;

    // Convert to base units (HP and lbs)
    if (powerUnit === "kw") {
      hp = hp * 1.34102;
    }
    if (weightUnit === "kg") {
      weightLbs = weightLbs * 2.20462;
    }

    // Power-to-weight ratio (lbs/HP)
    const powerToWeight = weightLbs / hp;

    // Drivetrain efficiency factors (traction losses)
    const drivetrainFactors = {
      fwd: 1.15, // FWD has more traction limitations
      rwd: 1.0,  // RWD baseline
      awd: 0.9,  // AWD has best traction
    };

    // Transmission factors
    const transmissionFactors = {
      manual: 1.05,
      automatic: 1.0,
      dct: 0.95, // Dual-clutch is fastest
      cvt: 1.1,  // CVT is typically slower
    };

    // Simplified physics-based estimation
    // 0-60 mph time ≈ (Power-to-weight ratio × factor) / correction
    // Using a refined empirical formula based on real-world data
    
    const baseTime = Math.sqrt(powerToWeight * 0.085);
    
    const drivetrainFactor = drivetrainFactors[drivetrain];
    const transmissionFactor = transmissionFactors[transmission];
    
    let time0to60 = baseTime * drivetrainFactor * transmissionFactor;
    
    // Apply realistic bounds
    time0to60 = Math.max(1.5, Math.min(20, time0to60));
    
    // 0-100 km/h is slightly different (62.14 mph vs 60 mph)
    const time0to100 = time0to60 * 1.08;
    
    // Quarter mile estimation (using simplified physics)
    // ET ≈ 5.825 × (weight/power)^(1/3)
    const quarterMile = 5.825 * Math.pow(powerToWeight, 1/3) * drivetrainFactor * transmissionFactor;
    
    // Quarter mile trap speed ≈ HP/weight ratio factor
    const quarterMileSpeed = 220 * Math.sqrt(hp / weightLbs);

    setResult({
      time0to60: Math.round(time0to60 * 100) / 100,
      time0to100: Math.round(time0to100 * 100) / 100,
      quarterMile: Math.round(quarterMile * 100) / 100,
      quarterMileSpeed: Math.round(quarterMileSpeed * 10) / 10,
    });
  };

  const reset = () => {
    setHorsepower("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            0-100 Acceleration Estimator – Calculate Your Car's 0 to 100 km/h Time
          </h1>
          <p className="text-muted-foreground">
            Find out how fast your car can go from 0 to 100 km/h with our 0–100 Acceleration
            Estimator. Input horsepower, vehicle weight, and drivetrain type to get a predicted
            acceleration time. Great for car comparisons and performance tuning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="horsepower">Power</Label>
                <div className="flex gap-2">
                  <Input
                    id="horsepower"
                    type="number"
                    placeholder={powerUnit === "hp" ? "e.g., 300" : "e.g., 220"}
                    value={horsepower}
                    onChange={(e) => setHorsepower(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={powerUnit} onValueChange={(v) => setPowerUnit(v as "hp" | "kw")}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hp">HP</SelectItem>
                      <SelectItem value="kw">kW</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Vehicle Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder={weightUnit === "lbs" ? "e.g., 3500" : "e.g., 1588"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "lbs" | "kg")}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="drivetrain">Drivetrain</Label>
                <Select value={drivetrain} onValueChange={(v) => setDrivetrain(v as "fwd" | "rwd" | "awd")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awd">AWD (All-Wheel Drive)</SelectItem>
                    <SelectItem value="rwd">RWD (Rear-Wheel Drive)</SelectItem>
                    <SelectItem value="fwd">FWD (Front-Wheel Drive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select value={transmission} onValueChange={(v) => setTransmission(v as "manual" | "automatic" | "dct" | "cvt")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dct">Dual-Clutch (DCT)</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Acceleration Estimates</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">0-60 mph</p>
                      <p className="text-3xl font-bold text-primary">{result.time0to60}s</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">0-100 km/h</p>
                      <p className="text-3xl font-bold text-primary">{result.time0to100}s</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">1/4 Mile Time</p>
                      <p className="text-xl font-bold">{result.quarterMile}s</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">1/4 Mile Speed</p>
                      <p className="text-xl font-bold">{result.quarterMileSpeed} mph</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Power-to-Weight Ratio</p>
                    <p className="text-lg font-bold">
                      {(parseFloat(weight) / parseFloat(horsepower)).toFixed(1)} lbs/HP
                    </p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Performance category:</strong>{" "}
                      {result.time0to60 < 3 ? "Supercar/Hypercar" :
                       result.time0to60 < 5 ? "Sports Car/Performance" :
                       result.time0to60 < 7 ? "Sporty Sedan/Hot Hatch" :
                       result.time0to60 < 9 ? "Average Car" :
                       "Economy/Heavy Vehicle"}
                    </p>
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
          <h3 className="text-lg font-semibold mb-3">How 0-60 Times Are Estimated</h3>
          <p className="text-muted-foreground text-sm mb-3">
            The estimation uses a physics-based formula considering power-to-weight ratio,
            drivetrain traction, and transmission efficiency:
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Power-to-Weight = Weight (lbs) ÷ Horsepower</div>
            <div>Base Time = √(Power-to-Weight × 0.085)</div>
            <div>Final Time = Base Time × Drivetrain Factor × Transmission Factor</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Note:</strong> These are theoretical estimates. Actual times vary based on
            tire grip, launch technique, weather conditions, and driver skill.
          </p>
        </div>
      </div>
    </div>
  );
}
