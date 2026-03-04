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

interface GearResult {
  gearRatios: number[];
  finalDrive: number;
  tireDiameter: number;
  speeds: Array<{ gear: number; rpm: number; speed: number }>;
  optimalShiftPoints: Array<{ gear: number; rpm: number; speed: number }>;
  recommendations: string[];
}

export default function GearShiftingRPMsCalculatorPage() {
  const [gearRatios, setGearRatios] = useState<string>("3.5,2.0,1.4,1.0,0.8");
  const [finalDrive, setFinalDrive] = useState<string>("4.0");
  const [tireDiameter, setTireDiameter] = useState<string>("25");
  const [redline, setRedline] = useState<string>("6500");
  const [unit, setUnit] = useState<string>("inches");
  const [result, setResult] = useState<GearResult | null>(null);

  const calculate = () => {
    const ratios = gearRatios.split(",").map(r => parseFloat(r.trim())).filter(r => !isNaN(r));
    const finalDriveNum = parseFloat(finalDrive) || 4.0;
    const tireDiameterNum = parseFloat(tireDiameter) || 25;
    const redlineNum = parseFloat(redline) || 6500;

    if (ratios.length === 0) return;

    // Convert tire diameter to meters if needed
    let tireDiameterM = tireDiameterNum;
    if (unit === "inches") {
      tireDiameterM = tireDiameterNum * 0.0254;
    }

    // Calculate tire circumference
    const tireCircumference = Math.PI * tireDiameterM;

    // Calculate speed for each gear at various RPMs
    const speeds: Array<{ gear: number; rpm: number; speed: number }> = [];
    const optimalShiftPoints: Array<{ gear: number; rpm: number; speed: number }> = [];

    for (let i = 0; i < ratios.length; i++) {
      const gearRatio = ratios[i];
      const totalRatio = gearRatio * finalDriveNum;

      // Speed at redline (km/h)
      // Speed = (RPM × tire circumference) / (total ratio × 1000) × 60
      const speedAtRedline = (redlineNum * tireCircumference) / (totalRatio * 1000) * 60;

      speeds.push({
        gear: i + 1,
        rpm: redlineNum,
        speed: parseFloat(speedAtRedline.toFixed(1)),
      });

      // Optimal shift point (typically 85-90% of redline for efficiency)
      const optimalRpm = redlineNum * 0.85;
      const speedAtOptimal = (optimalRpm * tireCircumference) / (totalRatio * 1000) * 60;

      optimalShiftPoints.push({
        gear: i + 1,
        rpm: Math.round(optimalRpm),
        speed: parseFloat(speedAtOptimal.toFixed(1)),
      });
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🚗 Tire diameter: ${tireDiameterM.toFixed(3)}m (${tireDiameterNum} ${unit})`);
    recommendations.push(`⚙️ Final drive ratio: ${finalDriveNum}:1`);
    recommendations.push(`🔴 Redline: ${redlineNum} RPM`);

    if (ratios.length >= 5) {
      recommendations.push("✅ Good gear spread for efficiency and performance");
    }

    recommendations.push("💡 Shift at 85-90% redline for fuel efficiency");
    recommendations.push("🏎️ Shift at 95-100% redline for maximum acceleration");

    setResult({
      gearRatios: ratios,
      finalDrive: finalDriveNum,
      tireDiameter: tireDiameterM,
      speeds,
      optimalShiftPoints,
      recommendations,
    });
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Gear Shifting RPMs Calculator – Find the Perfect RPM to Shift Gears
          </h1>
          <p className="text-muted-foreground">
            Optimize your driving performance with our Gear Shifting RPMs Calculator.
            Enter your vehicle&apos;s gear ratios, tire size, and redline to find the
            ideal RPM for each gear change and improve fuel efficiency or performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gear-ratios">Gear Ratios (comma-separated)</Label>
                <Input
                  id="gear-ratios"
                  value={gearRatios}
                  onChange={(e) => setGearRatios(e.target.value)}
                  placeholder="3.5,2.0,1.4,1.0,0.8"
                />
                <p className="text-xs text-muted-foreground">
                  Example: 3.5, 2.0, 1.4, 1.0, 0.8 (5-speed)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="final-drive">Final Drive Ratio</Label>
                  <Input
                    id="final-drive"
                    type="number"
                    step="0.1"
                    value={finalDrive}
                    onChange={(e) => setFinalDrive(e.target.value)}
                    placeholder="4.0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="redline">Redline (RPM)</Label>
                  <Input
                    id="redline"
                    type="number"
                    value={redline}
                    onChange={(e) => setRedline(e.target.value)}
                    placeholder="6500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="tire-diameter">Tire Diameter</Label>
                  <Input
                    id="tire-diameter"
                    type="number"
                    value={tireDiameter}
                    onChange={(e) => setTireDiameter(e.target.value)}
                    placeholder="25"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tire-unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="tire-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="mm">Millimeters</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Gear Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Speed at Redline</h4>
                    <div className="space-y-1">
                      {result.speeds.map((s, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>Gear {s.gear}</span>
                          <span>{s.speed} km/h @ {s.rpm} RPM</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Optimal Shift Points (Efficiency)</h4>
                    <div className="space-y-1">
                      {result.optimalShiftPoints.map((s, i) => (
                        <div key={i} className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded text-sm">
                          <span>Gear {s.gear} → {i + 2 <= result.speeds.length ? i + 2 : 'N/A'}</span>
                          <span>{s.speed} km/h @ {s.rpm} RPM</span>
                        </div>
                      ))}
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
                  <p>Enter vehicle specs and click Calculate to see shift points</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Shifting Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Fuel efficiency:</strong> Shift at 2000-3000 RPM
                  </li>
                  <li>
                    <strong>Balanced:</strong> Shift at 3000-4500 RPM
                  </li>
                  <li>
                    <strong>Performance:</strong> Shift near redline
                  </li>
                  <li>
                    <strong>Formula:</strong> Speed = (RPM × Tire Circumference) / (Ratio × 1000) × 60
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Optimal shift points vary by driving conditions.
                  These calculations assume ideal conditions. Always shift according to
                  road conditions and traffic.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Gear Shifting RPMs</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Your Gear Ratios</h3>
                <p className="text-sm text-muted-foreground">Input your transmission gear ratios as comma-separated values (e.g., 3.5, 2.0, 1.4, 1.0, 0.8).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Add Vehicle Specifications</h3>
                <p className="text-sm text-muted-foreground">Enter final drive ratio, tire diameter, and engine redline RPM for accurate calculations.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">View Shift Points</h3>
                <p className="text-sm text-muted-foreground">Get optimal RPM and speed for each gear change based on efficiency or performance goals.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Key Features of This Gear Shifting Calculator</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multi-Gear Support
                </h3>
                <p className="text-sm text-muted-foreground">Calculate shift points for any number of gears from 3-speed to 10-speed transmissions.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Efficiency vs Performance Modes
                </h3>
                <p className="text-sm text-muted-foreground">See optimal shift RPMs for fuel economy (85% redline) or maximum acceleration (near redline).</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Speed at Redline Display
                </h3>
                <p className="text-sm text-muted-foreground">Know the maximum speed achievable in each gear before hitting the rev limiter.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Metric and Imperial Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for both inches and millimeters for tire diameter measurements.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Actionable Recommendations
                </h3>
                <p className="text-sm text-muted-foreground">Get personalized driving tips based on your vehicle specifications and gear spread.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions About Gear Shifting</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What RPM should I shift at for best fuel economy?</h3>
                <p className="text-sm text-muted-foreground">For maximum fuel efficiency, shift between 2000-3000 RPM in most vehicles. This keeps the engine in its peak efficiency range while minimizing fuel consumption.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Is it bad to shift at high RPM?</h3>
                <p className="text-sm text-muted-foreground">Occasional high-RPM shifting is fine in modern engines. However, frequent redline shifting increases wear. Performance driving is best reserved for track use or occasional spirited driving.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How does tire size affect gear ratios?</h3>
                <p className="text-sm text-muted-foreground">Larger tires effectively raise all gear ratios, reducing engine RPM at a given speed. Smaller tires lower the effective gearing, increasing RPM. This calculator accounts for tire diameter in all calculations.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the purpose of overdrive gears?</h3>
                <p className="text-sm text-muted-foreground">Overdrive gears (ratio less than 1:1) reduce engine RPM at highway speeds, improving fuel economy and reducing engine wear. They are not meant for acceleration but for efficient cruising.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate my final drive ratio?</h3>
                <p className="text-sm text-muted-foreground">Final drive ratio is the number of driveshaft rotations per wheel rotation. Check your vehicle specifications or count ring gear and pinion teeth: Final Drive = Ring Gear Teeth / Pinion Teeth.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Automotive Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/gear-ratio-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Gear Ratio Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate gear ratios and output speeds for any gear combination.</p>
              </a>
              <a href="/calculators/rpm-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">RPM Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate RPM for pulleys, gears, and rotating machinery.</p>
              </a>
              <a href="/calculators/fuel-cost-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Fuel Cost Calculator</h3>
                <p className="text-sm text-muted-foreground">Estimate fuel expenses for trips based on distance and vehicle efficiency.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
