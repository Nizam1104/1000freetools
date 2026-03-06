"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignalToNoiseRatioCalculator() {
  const [signalPower, setSignalPower] = useState<string>("");
  const [noisePower, setNoisePower] = useState<string>("");
  const [signalVoltage, setSignalVoltage] = useState<string>("");
  const [noiseVoltage, setNoiseVoltage] = useState<string>("");
  const [mode, setMode] = useState<"power" | "voltage">("power");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    if (mode === "power") {
      const Ps = parseFloat(signalPower);
      const Pn = parseFloat(noisePower);
      if (Ps > 0 && Pn > 0) {
        const ratio = Ps / Pn;
        const snr_db = 10 * Math.log10(ratio);
        setResults({ snr: Math.round(snr_db * 100) / 100, ratio: Math.round(ratio * 100) / 100 });
      }
    } else {
      const Vs = parseFloat(signalVoltage);
      const Vn = parseFloat(noiseVoltage);
      if (Vs > 0 && Vn > 0) {
        const ratio = Vs / Vn;
        const snr_db = 20 * Math.log10(ratio);
        setResults({ snr: Math.round(snr_db * 100) / 100, ratio: Math.round(ratio * 100) / 100 });
      }
    }
  };

  const reset = () => {
    setSignalPower(""); setNoisePower(""); setSignalVoltage(""); setNoiseVoltage(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "power" ? "default" : "outline"} size="sm" onClick={() => setMode("power")}>Power</Button>
              <Button variant={mode === "voltage" ? "default" : "outline"} size="sm" onClick={() => setMode("voltage")}>Voltage</Button>
            </div>

            {mode === "power" ? (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Signal Power</Label><Input value={signalPower} onChange={e => setSignalPower(e.target.value)} /></div>
                <div><Label>Noise Power</Label><Input value={noisePower} onChange={e => setNoisePower(e.target.value)} /></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Signal Voltage</Label><Input value={signalVoltage} onChange={e => setSignalVoltage(e.target.value)} /></div>
                <div><Label>Noise Voltage</Label><Input value={noiseVoltage} onChange={e => setNoiseVoltage(e.target.value)} /></div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate SNR</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">SNR</p>
                    <p className="text-4xl font-bold">{results.snr} dB</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ratio</p>
                    <p className="text-2xl font-bold">{results.ratio}:1</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {results.snr > 90 ? "Excellent" : results.snr > 60 ? "Good" : results.snr > 30 ? "Fair" : "Poor"} signal quality
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
