"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Zone {
  name: string;
  min: number;
  max: number;
  description: string;
}

export default function HeartRateZonesCalculator() {
  const [age, setAge] = useState<string>("");
  const [zones, setZones] = useState<Zone[] | null>(null);

  const calculate = () => {
    const ageValue = parseFloat(age);
    if (isNaN(ageValue) || ageValue <= 0 || ageValue > 120) return;

    const maxHR = 220 - ageValue;

    const calculatedZones: Zone[] = [
      {
        name: "Zone 1 - Very Light",
        min: Math.round(maxHR * 0.50),
        max: Math.round(maxHR * 0.60),
        description: "Warm-up, recovery, and cool-down exercises"
      },
      {
        name: "Zone 2 - Light",
        min: Math.round(maxHR * 0.60),
        max: Math.round(maxHR * 0.70),
        description: "Fat burning and base fitness building"
      },
      {
        name: "Zone 3 - Moderate",
        min: Math.round(maxHR * 0.70),
        max: Math.round(maxHR * 0.80),
        description: "Aerobic endurance and cardiovascular fitness"
      },
      {
        name: "Zone 4 - Hard",
        min: Math.round(maxHR * 0.80),
        max: Math.round(maxHR * 0.90),
        description: "Anaerobic capacity and lactate threshold"
      },
      {
        name: "Zone 5 - Maximum",
        min: Math.round(maxHR * 0.90),
        max: Math.round(maxHR * 1.00),
        description: "Peak performance and maximum effort"
      }
    ];

    setZones(calculatedZones);
  };

  const reset = () => {
    setAge("");
    setZones(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate Zones Calculator – Find Your Target Heart Rate Zones</CardTitle>
          <CardDescription>
            Train smarter with our heart rate zones calculator. Discover your five heart rate training zones to optimize fat burn, aerobic fitness, and peak performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Zones</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {zones && (
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Estimated Maximum Heart Rate</p>
                  <p className="text-3xl font-bold mt-1">{220 - parseFloat(age)} <span className="text-lg font-normal">bpm</span></p>
                </div>

                <div className="space-y-2">
                  {zones.map((zone, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <p className="font-semibold">{zone.name}</p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {zone.min} - {zone.max} <span className="text-sm font-normal text-muted-foreground">bpm</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{zone.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Calculate Heart Rate Training Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Your Age</h3>
              <p className="text-sm text-muted-foreground">Input your current age to calculate your estimated maximum heart rate.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Get Your Max Heart Rate</h3>
              <p className="text-sm text-muted-foreground">The calculator uses the standard formula (220 - age) to estimate your maximum heart rate.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">View Your Training Zones</h3>
              <p className="text-sm text-muted-foreground">See all five heart rate zones with target BPM ranges and training benefits for each.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Why Use This Heart Rate Zones Calculator?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Five Complete Training Zones
              </h3>
              <p className="text-sm text-muted-foreground">From Zone 1 recovery to Zone 5 maximum effort, get target ranges for all training intensities.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Zone Descriptions Included
              </h3>
              <p className="text-sm text-muted-foreground">Each zone includes explanation of training benefits so you know when to use each intensity.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Standard 220-Age Formula
              </h3>
              <p className="text-sm text-muted-foreground">Uses the widely accepted maximum heart rate formula for consistent, comparable results.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Instant Calculation
              </h3>
              <p className="text-sm text-muted-foreground">Get all your training zones immediately without manual math or reference charts.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Clear BPM Display
              </h3>
              <p className="text-sm text-muted-foreground">Large, easy-to-read numbers show exact beats per minute for each zone boundary.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions About Heart Rate Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What are the 5 heart rate training zones?</h3>
              <p className="text-sm text-muted-foreground">Zone 1 (50-60% max HR) is very light recovery. Zone 2 (60-70%) burns fat and builds base fitness. Zone 3 (70-80%) improves aerobic capacity. Zone 4 (80-90%) builds anaerobic threshold. Zone 5 (90-100%) is maximum effort for peak performance.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Which zone is best for fat burning?</h3>
              <p className="text-sm text-muted-foreground">Zone 2 (60-70% of max heart rate) is often called the fat-burning zone. At this intensity, your body uses a higher percentage of fat for fuel. However, total calorie burn matters more for weight loss than the fuel source.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How accurate is the 220 minus age formula?</h3>
              <p className="text-sm text-muted-foreground">The 220-age formula gives a reasonable estimate but can vary by ±10-12 bpm for individuals. It is less accurate for very fit athletes and older adults. For precise zones, consider a lab test or field test to find your actual maximum heart rate.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do I measure my heart rate during exercise?</h3>
              <p className="text-sm text-muted-foreground">Use a chest strap monitor for most accuracy, or a wrist-based optical sensor for convenience. You can also manually check your pulse at your wrist or neck for 15 seconds and multiply by 4.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Should I train in Zone 5?</h3>
              <p className="text-sm text-muted-foreground">Zone 5 training is very demanding and should be used sparingly. Most athletes benefit from spending 80% of training time in Zones 1-3 and only 20% in Zones 4-5. Zone 5 intervals are effective but require adequate recovery.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Related Fitness Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/vo2-max-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">VO2 Max Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate your maximum oxygen uptake and cardiovascular fitness level.</p>
            </a>
            <a href="/calculators/tdee-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">TDEE Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate your total daily energy expenditure for weight management.</p>
            </a>
            <a href="/calculators/bmi-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">BMI Calculator</h3>
              <p className="text-sm text-muted-foreground">Determine your body mass index and weight category.</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
