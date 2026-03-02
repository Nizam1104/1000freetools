"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DbCalculator() {
  const [mode, setMode] = useState<"dB_to_power" | "dB_to_voltage" | "power_to_dB" | "voltage_to_dB" | "dBm">("dB_to_power");
  const [dB, setDB] = useState<string>("");
  const [powerRatio, setPowerRatio] = useState<string>("");
  const [voltageRatio, setVoltageRatio] = useState<string>("");
  const [powerMw, setPowerMw] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    switch (mode) {
      case "dB_to_power":
        const dB1 = parseFloat(dB);
        if (!isNaN(dB1)) {
          const ratio = Math.pow(10, dB1 / 10);
          setResults({ value: ratio, label: "Power Ratio", unit: "" });
        }
        break;
      case "dB_to_voltage":
        const dB2 = parseFloat(dB);
        if (!isNaN(dB2)) {
          const ratio = Math.pow(10, dB2 / 20);
          setResults({ value: ratio, label: "Voltage Ratio", unit: "" });
        }
        break;
      case "power_to_dB":
        const ratio1 = parseFloat(powerRatio);
        if (!isNaN(ratio1) && ratio1 > 0) {
          const dBVal = 10 * Math.log10(ratio1);
          setResults({ value: dBVal, label: "Decibels", unit: "dB" });
        }
        break;
      case "voltage_to_dB":
        const ratio2 = parseFloat(voltageRatio);
        if (!isNaN(ratio2) && ratio2 > 0) {
          const dBVal = 20 * Math.log10(ratio2);
          setResults({ value: dBVal, label: "Decibels", unit: "dB" });
        }
        break;
      case "dBm":
        const mW = parseFloat(powerMw);
        if (!isNaN(mW) && mW > 0) {
          const dBm = 10 * Math.log10(mW);
          setResults({ value: dBm, label: "Power in dBm", unit: "dBm" });
        }
        break;
    }
  };

  const reset = () => {
    setDB("");
    setPowerRatio("");
    setVoltageRatio("");
    setPowerMw("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>dB Calculator – Decibel to Ratio Converter for Audio and RF</CardTitle>
          <CardDescription>
            Convert between decibels and linear ratios for power, voltage, and amplitude. Our dB calculator is essential for audio engineering, RF systems, and signal processing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="dB_to_power">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="dB_to_power" onClick={() => setMode("dB_to_power")}>dB → Ratio</TabsTrigger>
                <TabsTrigger value="ratio_to_dB" onClick={() => setMode("power_to_dB")}>Ratio → dB</TabsTrigger>
                <TabsTrigger value="dBm" onClick={() => setMode("dBm")}>dBm</TabsTrigger>
              </TabsList>

              <TabsContent value="dB_to_power" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Decibels (dB)</Label>
                    <Input type="number" value={dB} onChange={(e) => setDB(e.target.value)} placeholder="e.g., 10" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setMode("dB_to_power"); calculate(); }}>Power Ratio</Button>
                  <Button onClick={() => { setMode("dB_to_voltage"); calculate(); }}>Voltage Ratio</Button>
                </div>
              </TabsContent>

              <TabsContent value="ratio_to_dB" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Power Ratio</Label>
                    <Input type="number" value={powerRatio} onChange={(e) => setPowerRatio(e.target.value)} placeholder="e.g., 10" />
                  </div>
                  <div>
                    <Label>Voltage Ratio</Label>
                    <Input type="number" value={voltageRatio} onChange={(e) => setVoltageRatio(e.target.value)} placeholder="e.g., 3.16" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => { setMode("power_to_dB"); calculate(); }}>to dB (Power)</Button>
                  <Button onClick={() => { setMode("voltage_to_dB"); calculate(); }}>to dB (Voltage)</Button>
                </div>
              </TabsContent>

              <TabsContent value="dBm" className="space-y-4 pt-4">
                <div>
                  <Label>Power (milliwatts)</Label>
                  <Input type="number" value={powerMw} onChange={(e) => setPowerMw(e.target.value)} placeholder="e.g., 100" />
                </div>
                <Button onClick={calculate}>Calculate dBm</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{results.label}</p>
                <p className="text-4xl font-bold">{typeof results.value === 'number' ? Math.round(results.value * 1000) / 1000 : results.value} {results.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
