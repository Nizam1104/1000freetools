"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PwmFrequencyCalculator() {
  const [clock, setClock] = useState<string>("");
  const [prescaler, setPrescaler] = useState<string>("");
  const [resolution, setResolution] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const fclk = parseFloat(clock);
    const presc = parseInt(prescaler);
    const n = parseInt(resolution);

    if (fclk > 0 && presc > 0 && n > 0) {
      const fpwm = fclk / (presc * Math.pow(2, n));
      const period = 1 / fpwm;

      setResults({
        frequency: fpwm,
        period: period,
        periodMs: period * 1000,
        periodUs: period * 1e6,
      });
    }
  };

  const reset = () => {
    setClock(""); setPrescaler(""); setResolution(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>PWM Frequency Calculator – Calculate PWM Output Frequency</CardTitle>
          <CardDescription>
            Calculate PWM frequency based on clock speed, prescaler, and resolution. Essential for motor control and power electronics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Clock Freq (Hz)</Label><Input value={clock} onChange={e => setClock(e.target.value)} placeholder="e.g., 16000000" /></div>
              <div><Label>Prescaler</Label><Input type="number" value={prescaler} onChange={e => setPrescaler(e.target.value)} placeholder="e.g., 1, 8, 64" /></div>
              <div><Label>Resolution (bits)</Label><Input type="number" value={resolution} onChange={e => setResolution(e.target.value)} placeholder="e.g., 8, 10, 16" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate PWM</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">PWM Frequency</p>
                    <p className="text-2xl font-bold">{results.frequency >= 1e6 ? (results.frequency / 1e6).toFixed(2) + " MHz" : results.frequency >= 1000 ? (results.frequency / 1000).toFixed(2) + " kHz" : Math.round(results.frequency) + " Hz"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-xl font-bold">{results.periodUs >= 1000 ? (results.periodMs).toFixed(2) + " ms" : results.periodUs.toFixed(2) + " µs"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
