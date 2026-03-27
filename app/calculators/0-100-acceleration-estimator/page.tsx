"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        <Card>
          
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Car enthusiasts love debating acceleration times, but not everyone has access to a drag strip. This estimator uses physics-based formulas to predict your 0-60 mph and 0-100 km/h times right in your browser. Whether you're comparing cars, tuning your ride, or just curious about performance, you'll get results instantly. The calculator factors in power-to-weight ratio, drivetrain traction differences, and transmission type to give realistic estimates.
            </p>
          </CardContent>
        </Card>

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

        <Card>
          <CardHeader>
            <CardTitle>How to Use This 0-100 Acceleration Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-2xl font-bold text-primary mb-2">1</div>
                <p className="text-sm text-muted-foreground">Enter your vehicle's horsepower or kilowatts</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-2xl font-bold text-primary mb-2">2</div>
                <p className="text-sm text-muted-foreground">Add the vehicle weight in pounds or kilograms</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-2xl font-bold text-primary mb-2">3</div>
                <p className="text-sm text-muted-foreground">Select drivetrain and transmission, then calculate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Power-to-Weight Ratio Matters</CardTitle>
            <CardDescription>The single biggest factor in acceleration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A 500 HP Corvette weighing 3,500 lbs will out-accelerate a 500 HP Cadillac Escalade weighing 6,000 lbs. Same engine, different results. That's power-to-weight ratio at work.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>Typical Power-to-Weight</TableHead>
                  <TableHead>Expected 0-60 mph</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Hypercars</TableCell>
                  <TableCell className="font-mono text-xs">&lt;4 lbs/HP</TableCell>
                  <TableCell className="text-xs">&lt;3.0 seconds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Supercars</TableCell>
                  <TableCell className="font-mono text-xs">4-6 lbs/HP</TableCell>
                  <TableCell className="text-xs">3.0-4.0 seconds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sports Cars</TableCell>
                  <TableCell className="font-mono text-xs">6-10 lbs/HP</TableCell>
                  <TableCell className="text-xs">4.0-6.0 seconds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sporty Sedans</TableCell>
                  <TableCell className="font-mono text-xs">10-15 lbs/HP</TableCell>
                  <TableCell className="text-xs">6.0-8.0 seconds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Average Cars</TableCell>
                  <TableCell className="font-mono text-xs">15-25 lbs/HP</TableCell>
                  <TableCell className="text-xs">8.0-12 seconds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Economy/Heavy SUVs</TableCell>
                  <TableCell className="font-mono text-xs">&gt;25 lbs/HP</TableCell>
                  <TableCell className="text-xs">&gt;12 seconds</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              Note: These are general estimates. Actual performance depends on traction, transmission, and launch technique.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How Drivetrain Affects Acceleration</CardTitle>
            <CardDescription>Traction makes a real difference off the line</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-sm mb-2">AWD (All-Wheel Drive) – Fastest Launch</h4>
                <p className="text-xs text-muted-foreground">
                  Power goes to all four wheels, maximizing grip during hard acceleration. AWD cars typically see 10-15% better 0-60 times compared to RWD with the same power. Examples: Tesla Model S Plaid, Nissan GT-R, Audi RS models.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-sm mb-2">RWD (Rear-Wheel Drive) – Balanced Performance</h4>
                <p className="text-xs text-muted-foreground">
                  Weight transfers to the rear under acceleration, improving traction. RWD is the baseline for performance cars. Can struggle in low-traction conditions. Examples: BMW M3, Chevrolet Corvette, Porsche 911.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-sm mb-2">FWD (Front-Wheel Drive) – Traction Limited</h4>
                <p className="text-xs text-muted-foreground">
                  Weight transfers away from the driven wheels during hard acceleration, causing wheelspin. FWD cars often can't use all their power off the line. Expect 10-20% slower times than equivalent RWD. Examples: Honda Civic Type R, Volkswagen Golf GTI.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transmission Type Impact on 0-60 Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transmission</TableHead>
                  <TableHead>Shift Speed</TableHead>
                  <TableHead>Typical Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Dual-Clutch (DCT)</TableCell>
                  <TableCell className="text-xs">Near-instant shifts</TableCell>
                  <TableCell className="text-xs">3-5% faster than manual</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Modern Automatic (8+ speeds)</TableCell>
                  <TableCell className="text-xs">Fast shifts with torque converter</TableCell>
                  <TableCell className="text-xs">Baseline performance</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Manual (6-speed)</TableCell>
                  <TableCell className="text-xs">Driver-dependent shift time</TableCell>
                  <TableCell className="text-xs">Similar to automatic with skilled driver</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CVT</TableCell>
                  <TableCell className="text-xs">No shifts, but rubber-band effect</TableCell>
                  <TableCell className="text-xs">5-10% slower due to power delivery</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              Modern dual-clutch transmissions can shift in under 100 milliseconds – faster than any human can blink. That's why supercars increasingly use DCTs instead of manuals.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-World 0-60 Times by Vehicle Category</CardTitle>
            <CardDescription>Reference data from manufacturer claims and independent testing</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>HP</TableHead>
                  <TableHead>Weight (lbs)</TableHead>
                  <TableHead>0-60 mph (Actual)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Tesla Model S Plaid</TableCell>
                  <TableCell className="font-mono text-xs">1,020</TableCell>
                  <TableCell className="font-mono text-xs">4,766</TableCell>
                  <TableCell className="font-mono text-xs">1.99s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Porsche 911 Turbo S</TableCell>
                  <TableCell className="font-mono text-xs">640</TableCell>
                  <TableCell className="font-mono text-xs">3,640</TableCell>
                  <TableCell className="font-mono text-xs">2.6s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Honda Civic Type R</TableCell>
                  <TableCell className="font-mono text-xs">315</TableCell>
                  <TableCell className="font-mono text-xs">3,186</TableCell>
                  <TableCell className="font-mono text-xs">4.9s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">BMW M3 Competition</TableCell>
                  <TableCell className="font-mono text-xs">503</TableCell>
                  <TableCell className="font-mono text-xs">3,890</TableCell>
                  <TableCell className="font-mono text-xs">3.4s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ford F-150 Raptor</TableCell>
                  <TableCell className="font-mono text-xs">450</TableCell>
                  <TableCell className="font-mono text-xs">5,500</TableCell>
                  <TableCell className="font-mono text-xs">5.1s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Toyota Camry 4-cyl</TableCell>
                  <TableCell className="font-mono text-xs">203</TableCell>
                  <TableCell className="font-mono text-xs">3,310</TableCell>
                  <TableCell className="font-mono text-xs">7.8s</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              Sources: Manufacturer data, Car and Driver, MotorTrend independent testing. Times vary by conditions and testing methodology.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Factors That Change Real-World Results</CardTitle>
            <CardDescription>Why your times might differ from estimates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-sm mb-2">Tire grip and temperature</h4>
                <p className="text-xs text-muted-foreground">
                  Cold tires have less grip. Summer performance tires work best above 60°F. All-seasons compromise grip for longevity. Drag radials can shave 0.5-1.0 seconds off 0-60 times.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-sm mb-2">Launch technique</h4>
                <p className="text-xs text-muted-foreground">
                  Revving too high causes wheelspin. Too low and you're not in the powerband. Launch control systems optimize this automatically. A good manual launch takes practice.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-sm mb-2">Weather and altitude</h4>
                <p className="text-xs text-muted-foreground">
                  Hot, humid air reduces engine power. High altitude means less oxygen – naturally aspirated engines lose about 3% power per 1,000 feet. Turbocharged engines handle altitude better.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-sm mb-2">Road surface</h4>
                <p className="text-xs text-muted-foreground">
                  Fresh asphalt grips better than old, polished surfaces. Prepped drag strips offer the best traction. Street surfaces vary wildly – some are grippier than others.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">Is 0-60 mph the same as 0-100 km/h?</h4>
              <p className="text-xs text-muted-foreground">
                No. 60 mph equals 96.56 km/h, so 0-100 km/h is slightly longer – about 8% more distance. A car that does 0-60 in 5.0 seconds might take 5.4 seconds to reach 100 km/h. European manufacturers typically quote 0-100 km/h times.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Why do manufacturer 0-60 times differ from magazine tests?</h4>
              <p className="text-xs text-muted-foreground">
                Manufacturers often use "rollout correction" – they start timing after the car has already moved about a foot. This subtracts 0.2-0.3 seconds from the result. Magazines like Car and Driver measure from a true standstill.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Do electric cars have an advantage in 0-60 tests?</h4>
              <p className="text-xs text-muted-foreground">
                Yes. Electric motors deliver maximum torque instantly from zero RPM. No need to build boost or rev up. Combined with AWD and launch control, EVs like the Tesla Model S Plaid can hit 0-60 in under 2 seconds – supercar territory.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What's a good 0-60 time for a regular car?</h4>
              <p className="text-xs text-muted-foreground">
                Most economy sedans and compact SUVs run 7-9 seconds. Sporty compacts like the GTI or WRX do it in 5-6 seconds. Anything under 5 seconds feels genuinely fast. Under 3 seconds is hypercar-level quick.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Can modifications improve 0-60 times?</h4>
              <p className="text-xs text-muted-foreground">
                Yes. Weight reduction (lighter wheels, removing seats) helps most. Stickier tires make a huge difference. Engine tunes can add 10-20% more power. But traction is usually the limiting factor – AWD conversions or limited-slip differentials help put power down.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
