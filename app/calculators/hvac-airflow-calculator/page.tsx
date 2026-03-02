"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HvacAirflowCalculator() {
  const [roomVolume, setRoomVolume] = useState<string>("");
  const [ach, setAch] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const V = parseFloat(roomVolume);
    const ACH = parseFloat(ach);

    if (V > 0 && ACH > 0) {
      const cfm = (V * 35.3147 * ACH) / 60;
      const m3h = V * ACH;

      setResults({ cfm: Math.round(cfm), m3h: Math.round(m3h) });
    }
  };

  const reset = () => {
    setRoomVolume(""); setAch(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>HVAC Airflow Calculator – Calculate Required CFM</CardTitle>
          <CardDescription>
            Calculate the required airflow for HVAC systems based on room volume and air changes per hour (ACH).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Room Volume (m³)</Label><Input value={roomVolume} onChange={e => setRoomVolume(e.target.value)} /></div>
              <div><Label>Air Changes/Hour (ACH)</Label><Input value={ach} onChange={e => setAch(e.target.value)} placeholder="6-12 typical" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Airflow</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Airflow (CFM)</p>
                    <p className="text-4xl font-bold">{results.cfm}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Airflow (m³/h)</p>
                    <p className="text-3xl font-bold">{results.m3h}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Typical ACH: Office 4-6, Kitchen 15-20, Bathroom 8-10, Hospital 12-20
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
