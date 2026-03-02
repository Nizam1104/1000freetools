"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RadiationDoseCalculator() {
  const [activity, setActivity] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [energy, setEnergy] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const A = parseFloat(activity); // Bq
    const d = parseFloat(distance); // m
    const t = parseFloat(time); // hours
    const E = parseFloat(energy); // MeV

    if (A > 0 && d > 0 && t > 0 && E > 0) {
      // Simplified dose calculation (gamma constant approximation)
      // Dose rate ≈ Γ × A / d² where Γ ≈ 0.5 µSv·m²/(MBq·h) for typical gamma emitters
      const gammaConst = 0.5e-6; // µSv·m²/(MBq·h)
      const A_MBq = A / 1e6;
      const doseRate = gammaConst * A_MBq / (d * d);
      const totalDose = doseRate * t;

      setResults({
        doseRate: doseRate * 1000, // mSv/h
        totalDose: totalDose * 1000, // mSv
      });
    }
  };

  const reset = () => {
    setActivity(""); setDistance(""); setTime(""); setEnergy(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Radiation Dose Calculator – Estimate Radiation Exposure</CardTitle>
          <CardDescription>
            Estimate radiation dose from a gamma source. Enter activity, distance, and exposure time for approximate dose calculation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Activity (Bq)</Label><Input value={activity} onChange={e => setActivity(e.target.value)} /></div>
              <div><Label>Distance (m)</Label><Input value={distance} onChange={e => setDistance(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Exposure Time (hours)</Label><Input value={time} onChange={e => setTime(e.target.value)} /></div>
              <div><Label>Photon Energy (MeV)</Label><Input value={energy} onChange={e => setEnergy(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Dose</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Dose Rate</p>
                    <p className="text-2xl font-bold">{results.doseRate.toExponential(4)} mSv/h</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Dose</p>
                    <p className="text-2xl font-bold">{results.totalDose.toExponential(4)} mSv</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Note: This is an approximation. Actual dose depends on shielding, geometry, and radiation type.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
