"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function DutyCycleCalculator() {
  const [onTime, setOnTime] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [dutyCycle, setDutyCycle] = useState<number>(50);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Ton = parseFloat(onTime);
    const T = parseFloat(period);
    const f = parseFloat(frequency);

    if (Ton > 0 && T > 0) {
      const duty = (Ton / T) * 100;
      const freq = 1 / T;
      setResults({ duty: Math.round(duty * 100) / 100, frequency: freq, period: T });
    } else if (f > 0 && dutyCycle > 0) {
      const T = 1 / f;
      const Ton = (dutyCycle / 100) * T;
      const Toff = T - Ton;
      setResults({ duty: dutyCycle, frequency: f, period: T, onTime: Ton, offTime: Toff });
    }
  };

  const reset = () => {
    setOnTime(""); setPeriod(""); setFrequency(""); setDutyCycle(50); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Duty Cycle Calculator – Calculate PWM Duty Cycle</CardTitle>
          <CardDescription>
            Calculate duty cycle, on-time, and off-time for PWM signals. Essential for motor control and power regulation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><Label>On-Time (s)</Label><Input value={onTime} onChange={e => setOnTime(e.target.value)} /></div>
              <div><Label>Period (s)</Label><Input value={period} onChange={e => setPeriod(e.target.value)} /></div>
              <div><Label>Frequency (Hz)</Label><Input value={frequency} onChange={e => setFrequency(e.target.value)} /></div>
            </div>

            <div>
              <Label>Duty Cycle: {dutyCycle}%</Label>
              <Slider
                value={[dutyCycle]}
                onValueChange={(v) => setDutyCycle(v[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Duty Cycle</p>
                    <p className="text-3xl font-bold">{results.duty}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="text-xl font-bold">{results.frequency >= 1000 ? (results.frequency / 1000).toFixed(2) + " kHz" : Math.round(results.frequency) + " Hz"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="text-xl font-bold">{(results.period * 1e6).toFixed(2)} µs</p>
                  </div>
                </div>
                {results.onTime !== undefined && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">On-Time</p>
                      <p className="text-xl font-bold">{(results.onTime * 1e6).toFixed(2)} µs</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Off-Time</p>
                      <p className="text-xl font-bold">{(results.offTime * 1e6).toFixed(2)} µs</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
