"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Gauge, Droplets } from "lucide-react";

interface PressureResult {
  pressure: number;
  unit: string;
  pascal: number;
  bar: number;
  psi: number;
  atm: number;
}

export default function PressureCalculatorPage() {
  const [value, setValue] = useState<string>("");
  const [unit, setUnit] = useState<"Pa" | "kPa" | "bar" | "psi" | "atm" | "mmHg" | "inHg">("Pa");
  const [result, setResult] = useState<PressureResult | null>(null);

  const calculatePressure = () => {
    const v = parseFloat(value);

    if (isNaN(v)) {
      setResult(null);
      return;
    }

    let pascal = v;
    const conversions = {
      Pa: 1,
      kPa: 1000,
      bar: 100000,
      psi: 6894.76,
      atm: 101325,
      mmHg: 133.322,
      inHg: 3386.39,
    };

    pascal = v * conversions[unit];

    setResult({
      pressure: Math.round(pascal * 100) / 100,
      unit: "Pa",
      pascal: Math.round(pascal),
      bar: Math.round(pascal / 100000 * 1000) / 1000,
      psi: Math.round(pascal / 6894.76 * 100) / 100,
      atm: Math.round(pascal / 101325 * 1000) / 1000,
    });
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  useEffect(() => {
    calculatePressure();
  }, [value, unit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Pressure Calculator – Convert Between Pressure Units</h1>
          <p className="text-muted-foreground">
            Convert pressure between pascals, bar, PSI, atmospheres, and more. This free pressure converter handles scientific, engineering, and everyday pressure unit conversions instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Pressure Value</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Pressure</Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="e.g., 101325"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="Pa">Pascal (Pa)</option>
                      <option value="kPa">Kilopascal (kPa)</option>
                      <option value="bar">Bar</option>
                      <option value="psi">PSI (lb/in²)</option>
                      <option value="atm">Atmosphere (atm)</option>
                      <option value="mmHg">mmHg (Torr)</option>
                      <option value="inHg">inHg</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Standard atmospheric pressure at sea level is 101,325 Pa = 1 atm = 14.7 PSI = 760 mmHg.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePressure} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Converted Values</h3>
              {result ? (
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs text-muted-foreground">Pascal</p>
                    <p className="text-xl font-bold text-primary">{result.pascal.toLocaleString()} Pa</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Bar</p>
                    <p className="text-lg font-semibold">{result.bar} bar</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">PSI</p>
                    <p className="text-lg font-semibold">{result.psi} psi</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Atmospheres</p>
                    <p className="text-lg font-semibold">{result.atm} atm</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Gauge className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter pressure to convert</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Common Pressure Conversions</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  At Sea Level:
                </h4>
                <ul className="space-y-1">
                  <li>1 atm = 101,325 Pa = 101.3 kPa</li>
                  <li>1 atm = 14.696 psi</li>
                  <li>1 atm = 760 mmHg = 760 Torr</li>
                  <li>1 atm = 29.92 inHg</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Common Uses:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Tire pressure: 30-35 psi</li>
                  <li>Blood pressure: 120/80 mmHg</li>
                  <li>Scuba tank: 200-300 bar</li>
                  <li>Vacuum: &lt;1 Pa</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is pressure?</h3>
                <p className="text-sm text-muted-foreground">Pressure is force applied per unit area. It measures how concentrated a force is. Higher pressure means more force on a smaller area.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the SI unit for pressure?</h3>
                <p className="text-sm text-muted-foreground">The pascal (Pa) is the SI unit, defined as one newton per square meter. Kilopascals (kPa) and bar are more practical for everyday use.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why is PSI still used?</h3>
                <p className="text-sm text-muted-foreground">PSI (pounds per square inch) remains common in the US for tire pressure, scuba tanks, and industrial applications due to tradition and tool calibration.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is atmospheric pressure?</h3>
                <p className="text-sm text-muted-foreground">Atmospheric pressure is the weight of air above us. At sea level it's about 14.7 psi or 101 kPa. It decreases with altitude.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How is blood pressure measured?</h3>
                <p className="text-sm text-muted-foreground">Blood pressure uses mmHg (millimeters of mercury). Normal is around 120/80 mmHg. This unit comes from mercury barometers used in early measurements.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
