"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Zap, Clock, CircleHelp } from "lucide-react";

interface PowerResult {
  power: number;
  unit: string;
  horsepower: number;
  energyPerHour: number;
  description: string;
}

export default function PowerCalculatorPage() {
  const [work, setWork] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [workUnit, setWorkUnit] = useState<"J" | "kJ" | "cal" | "kcal" | "Wh" | "kWh">("J");
  const [timeUnit, setTimeUnit] = useState<"s" | "min" | "h">("s");
  const [result, setResult] = useState<PowerResult | null>(null);

  const calculatePower = () => {
    const w = parseFloat(work);
    const t = parseFloat(time);

    if (isNaN(w) || isNaN(t) || w <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    let workInJoules = w;
    let timeInSeconds = t;

    const workConversions = { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3600000 };
    workInJoules = w * workConversions[workUnit];

    const timeConversions = { s: 1, min: 60, h: 3600 };
    timeInSeconds = t * timeConversions[timeUnit];

    const power = workInJoules / timeInSeconds;
    const horsepower = power / 745.7;
    const energyPerHour = power * 3600;

    let description = "";
    if (power < 1) description = "Very low power (LED indicator)";
    else if (power < 10) description = "Low power (phone standby)";
    else if (power < 100) description = "Moderate power (light bulb)";
    else if (power < 1000) description = "High power (microwave)";
    else if (power < 10000) description = "Very high power (heater)";
    else description = "Extreme power (car engine)";

    setResult({
      power: Math.round(power * 100) / 100,
      unit: "W",
      horsepower: Math.round(horsepower * 1000) / 1000,
      energyPerHour: Math.round(energyPerHour),
      description,
    });
  };

  const reset = () => {
    setWork("");
    setTime("");
    setResult(null);
  };

  useEffect(() => {
    calculatePower();
  }, [work, time, workUnit, timeUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Power Calculator – Calculate Power from Work and Time</h1>
          <p className="text-muted-foreground">
            Calculate power in watts from work done over time. This physics and engineering calculator converts between units and shows horsepower for mechanical applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Work and Time</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work">Work / Energy</Label>
                    <div className="flex gap-2">
                      <Input
                        id="work"
                        type="number"
                        placeholder="e.g., 1000"
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={workUnit}
                        onChange={(e) => setWorkUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="J">J</option>
                        <option value="kJ">kJ</option>
                        <option value="cal">cal</option>
                        <option value="kcal">kcal</option>
                        <option value="Wh">Wh</option>
                        <option value="kWh">kWh</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="flex gap-2">
                      <Input
                        id="time"
                        type="number"
                        placeholder="e.g., 10"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="s">s</option>
                        <option value="min">min</option>
                        <option value="h">h</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Power = Work ÷ Time. One watt equals one joule per second.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePower} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Power Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="text-3xl font-bold text-primary">{result.power} W</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Horsepower</p>
                      <p className="text-lg font-semibold">{result.horsepower} hp</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Energy/hour</p>
                      <p className="text-lg font-semibold">{(result.energyPerHour / 3600).toFixed(2)} Wh</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Context</p>
                    <p className="font-semibold">{result.description}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> P = W / t</p>
                    <p className="mt-1">P=power (W), W=work (J), t=time (s)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter work and time to calculate power</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Common Power Values</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CircleHelp className="h-4 w-4" />
                  Household Devices:
                </h4>
                <ul className="space-y-1">
                  <li>LED bulb: 5-15 W</li>
                  <li>Laptop: 30-60 W</li>
                  <li>Refrigerator: 100-200 W</li>
                  <li>Microwave: 800-1200 W</li>
                  <li>Electric heater: 1500-2000 W</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Mechanical Power:
                </h4>
                <ul className="space-y-1">
                  <li>Human cycling: 100-200 W</li>
                  <li>Electric motor (small): 500-2000 W</li>
                  <li>Car engine: 75,000-200,000 W</li>
                  <li>1 horsepower = 745.7 W</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Power</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Determine Work Done</h3>
                <p className="text-sm text-muted-foreground">Find the energy transferred or work completed in joules.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Measure Time</h3>
                <p className="text-sm text-muted-foreground">Record how long it took to do the work in seconds.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Divide Work by Time</h3>
                <p className="text-sm text-muted-foreground">Power equals work divided by time (P = W/t).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Energy Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for joules, calories, watt-hours, and kilowatt-hours.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Time Flexibility
                </h3>
                <p className="text-sm text-muted-foreground">Enter time in seconds, minutes, or hours.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Horsepower Conversion
                </h3>
                <p className="text-sm text-muted-foreground">Shows mechanical power in horsepower for engines and motors.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Real-World Context
                </h3>
                <p className="text-sm text-muted-foreground">Compares result to common devices and applications.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is power in physics?</h3>
                <p className="text-sm text-muted-foreground">Power is the rate of doing work or transferring energy. It measures how fast energy is used. One watt equals one joule per second.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How is power different from energy?</h3>
                <p className="text-sm text-muted-foreground">Energy is the capacity to do work. Power is how fast that energy is used. A battery stores energy; power is how quickly it drains.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is one horsepower?</h3>
                <p className="text-sm text-muted-foreground">One horsepower equals 745.7 watts. James Watt defined it as the power a horse could sustain. It's still used for engines and motors.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate electrical power?</h3>
                <p className="text-sm text-muted-foreground">For electricity: P = V × I (voltage times current). Also P = I²R (current squared times resistance) or P = V²/R.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why is power important?</h3>
                <p className="text-sm text-muted-foreground">Power determines how quickly devices can do work. Higher power means faster acceleration, quicker heating, or brighter lights.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
