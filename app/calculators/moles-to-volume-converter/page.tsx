"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function MolesToVolumeConverter() {
  const [mode, setMode] = useState<"moles-to-volume" | "volume-to-moles">("moles-to-volume");
  const [moles, setMoles] = useState<string>("");
  const [volume, setVolume] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("25");
  const [pressure, setPressure] = useState<string>("1");
  const [tempUnit, setTempUnit] = useState<"celsius" | "kelvin">("celsius");
  const [pressureUnit, setPressureUnit] = useState<"atm" | "bar" | "kpa">("atm");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);

  const R = 0.08206; // L·atm/(mol·K)

  const calculate = () => {
    let T = parseFloat(temperature);
    if (tempUnit === "celsius") T += 273.15;

    let P = parseFloat(pressure);
    if (pressureUnit === "bar") P *= 0.986923;
    if (pressureUnit === "kpa") P *= 0.00986923;

    if (mode === "moles-to-volume") {
      const n = parseFloat(moles);
      if (n > 0 && T > 0 && P > 0) {
        const V = (n * R * T) / P;
        setResult({ value: Math.round(V * 100) / 100, unit: "L", label: "Volume" });
        setBarData([
          { name: "Moles", value: n },
          { name: "Volume (L)", value: Math.round(V * 100) / 100 }
        ]);
      }
    } else {
      const V = parseFloat(volume);
      if (V > 0 && T > 0 && P > 0) {
        const n = (P * V) / (R * T);
        setResult({ value: Math.round(n * 1000) / 1000, unit: "mol", label: "Moles" });
        setBarData([
          { name: "Volume (L)", value: V },
          { name: "Moles", value: Math.round(n * 1000) / 1000 }
        ]);
      }
    }
  };

  const reset = () => {
    setMoles("");
    setVolume("");
    setResult(null);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Moles to Volume Calculator for Gas – STP and Custom Conditions</CardTitle>
          <CardDescription>
            Convert moles of gas to liters at STP or any temperature and pressure with our moles-to-volume gas calculator. Uses the ideal gas law for accurate results. Great for chemistry students and lab professionals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Convert</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moles-to-volume">Moles to Volume</SelectItem>
                  <SelectItem value="volume-to-moles">Volume to Moles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "moles-to-volume" ? (
              <div>
                <Label>Moles of Gas (mol)</Label>
                <Input type="number" placeholder="e.g., 1" value={moles} onChange={(e) => setMoles(e.target.value)} />
              </div>
            ) : (
              <div>
                <Label>Volume of Gas (L)</Label>
                <Input type="number" placeholder="e.g., 22.4" value={volume} onChange={(e) => setVolume(e.target.value)} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Temperature</Label>
                <Input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={tempUnit} onValueChange={(v) => setTempUnit(v as typeof tempUnit)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius</SelectItem>
                    <SelectItem value="kelvin">Kelvin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Pressure</Label>
                <Input type="number" value={pressure} onChange={(e) => setPressure(e.target.value)} />
              </div>
              <div>
                <Label>Unit</Label>
                <Select value={pressureUnit} onValueChange={(v) => setPressureUnit(v as typeof pressureUnit)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atm">atm</SelectItem>
                    <SelectItem value="bar">bar</SelectItem>
                    <SelectItem value="kpa">kPa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{result.label}</p>
                <p className="text-4xl font-bold mt-1">{result.value} {result.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Gas Volume Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The ideal gas law relates moles, volume, temperature, and pressure of a gas. At STP (Standard Temperature and Pressure), 1 mole of any ideal gas occupies 22.4 liters.</p>

          <h3 className="text-xl font-semibold">Ideal Gas Law</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            PV = nRT
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>P = Pressure (atm)</li>
            <li>V = Volume (L)</li>
            <li>n = Number of moles (mol)</li>
            <li>R = Gas constant (0.08206 L·atm/(mol·K))</li>
            <li>T = Temperature (K)</li>
          </ul>

          <h3 className="text-xl font-semibold">STP Conditions</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Standard</th>
                  <th className="p-2 text-left">Temperature</th>
                  <th className="p-2 text-left">Pressure</th>
                  <th className="p-2 text-left">Molar Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">STP (old)</td>
                  <td className="p-2">0°C (273.15 K)</td>
                  <td className="p-2">1 atm</td>
                  <td className="p-2">22.4 L/mol</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">STP (IUPAC)</td>
                  <td className="p-2">0°C (273.15 K)</td>
                  <td className="p-2">1 bar</td>
                  <td className="p-2">22.7 L/mol</td>
                </tr>
                <tr>
                  <td className="p-2">SATP</td>
                  <td className="p-2">25°C (298.15 K)</td>
                  <td className="p-2">1 bar</td>
                  <td className="p-2">24.8 L/mol</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>Calculate the volume of 2 moles of gas at 25°C and 1 atm:</p>
          <p>V = nRT/P = (2 mol × 0.08206 × 298.15 K) / 1 atm = 48.9 L</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moles-Volume Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Reference: Molar Volumes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Moles</th>
                  <th className="p-2 text-left">Volume at STP</th>
                  <th className="p-2 text-left">Volume at 25°C</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">0.1 mol</td>
                  <td className="p-2">2.24 L</td>
                  <td className="p-2">2.45 L</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">0.5 mol</td>
                  <td className="p-2">11.2 L</td>
                  <td className="p-2">12.2 L</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1 mol</td>
                  <td className="p-2">22.4 L</td>
                  <td className="p-2">24.5 L</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">2 mol</td>
                  <td className="p-2">44.8 L</td>
                  <td className="p-2">48.9 L</td>
                </tr>
                <tr>
                  <td className="p-2">5 mol</td>
                  <td className="p-2">112 L</td>
                  <td className="p-2">122 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Choose conversion direction</p>
                <p>Select "Moles to Volume" or "Volume to Moles" from the dropdown.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Enter values and conditions</p>
                <p>Input moles or volume, plus temperature and pressure. Select your units.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">Calculate</p>
                <p>The calculator uses the ideal gas law to find the unknown value.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Why is 1 mole of gas 22.4 L at STP?</h4>
            <p className="text-xs text-muted-foreground">
              Plug STP values into PV = nRT: V = nRT/P = (1 mol)(0.08206)(273.15 K)/(1 atm) = 22.4 L. This is why the number appears so often in gas calculations.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">When does the ideal gas law fail?</h4>
            <p className="text-xs text-muted-foreground">
              At high pressures (molecules are close together) and low temperatures (molecules move slowly), real gases deviate from ideal behavior. Use van der Waals equation for more accuracy.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">How do I convert Celsius to Kelvin?</h4>
            <p className="text-xs text-muted-foreground">
              Add 273.15. 0°C = 273.15 K, 25°C = 298.15 K, 100°C = 373.15 K. The gas law requires absolute temperature (Kelvin) because 0 K is true zero energy.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Does the type of gas matter?</h4>
            <p className="text-xs text-muted-foreground">
              For ideal gases, no. One mole of any ideal gas occupies the same volume at the same T and P. Real gases differ slightly, but the ideal gas law treats all gases identically.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What's the difference between STP and SATP?</h4>
            <p className="text-xs text-muted-foreground">
              STP (Standard Temperature and Pressure) is 0°C and 1 atm or 1 bar. SATP (Standard Ambient Temperature and Pressure) is 25°C and 1 bar—closer to lab conditions.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-3">
            <a href="/calculators/molarity-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Molarity Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate solution concentration</p>
            </a>
            <a href="/calculators/ideal-gas-law-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Ideal Gas Law</p>
              <p className="text-xs text-muted-foreground">Solve PV = nRT for any variable</p>
            </a>
            <a href="/calculators/gas-density-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Gas Density</p>
              <p className="text-xs text-muted-foreground">Calculate gas density from molar mass</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
