"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NoiseLevelCalculator() {
  const [sources, setSources] = useState<{ name: string; db: string }[]>([{ name: "", db: "" }]);
  const [distance, setDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const addSource = () => setSources([...sources, { name: "", db: "" }]);
  const removeSource = (i: number) => setSources(sources.filter((_, idx) => idx !== i));
  const updateSource = (i: number, field: string, val: string) => {
    const newSources = [...sources];
    (newSources[i] as any)[field] = val;
    setSources(newSources);
  };

  const calculate = () => {
    let totalIntensity = 0;
    sources.forEach(s => {
      const db = parseFloat(s.db);
      if (db > 0) totalIntensity += Math.pow(10, db / 10);
    });

    if (totalIntensity > 0) {
      let combinedDb = 10 * Math.log10(totalIntensity);
      
      // Distance attenuation
      if (distance && parseFloat(distance) > 0) {
        const d = parseFloat(distance);
        combinedDb -= 20 * Math.log10(d);
      }

      setResults({
        combined: Math.round(combinedDb * 10) / 10,
        intensity: totalIntensity,
      });
    }
  };

  const reset = () => {
    setSources([{ name: "", db: "" }]);
    setDistance("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Noise Level Calculator – Combine Multiple Sound Sources</CardTitle>
          <CardDescription>
            Calculate the combined noise level from multiple sound sources. Our calculator adds decibels correctly and accounts for distance attenuation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sources.map((source, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <Label>Source</Label>
                  <Input value={source.name} onChange={e => updateSource(i, "name", e.target.value)} placeholder="Name" />
                </div>
                <div className="col-span-5">
                  <Label>Level (dB)</Label>
                  <Input type="number" value={source.db} onChange={e => updateSource(i, "db", e.target.value)} placeholder="dB" />
                </div>
                <div className="col-span-1">
                  <Button variant="outline" size="sm" onClick={() => removeSource(i)} disabled={sources.length === 1}>×</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addSource}>+ Add Source</Button>

            <div>
              <Label>Distance from Source (m) - optional</Label>
              <Input value={distance} onChange={e => setDistance(e.target.value)} placeholder="For attenuation calculation" />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Total dB</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Combined Noise Level</p>
                <p className="text-4xl font-bold">{results.combined} dB</p>
                {distance && <p className="text-xs text-muted-foreground mt-2">at {distance}m distance</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
