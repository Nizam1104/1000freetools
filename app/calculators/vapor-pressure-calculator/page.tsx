"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function VaporPressureCalculator() {
  const [mode, setMode] = useState<"clausius" | "antoine">("clausius");
  const [temperature, setTemperature] = useState<string>("");
  const [enthalpy, setEnthalpy] = useState<string>("");
  const [refTemp, setRefTemp] = useState<string>("");
  const [refPressure, setRefPressure] = useState<string>("");
  const [antoineA, setAntoineA] = useState<string>("");
  const [antoineB, setAntoineB] = useState<string>("");
  const [antoineC, setAntoineC] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const T = parseFloat(temperature) + 273.15;
    const R = 8.314;

    if (mode === "clausius") {
      const dH = parseFloat(enthalpy) * 1000;
      const T0 = parseFloat(refTemp) + 273.15;
      const P0 = parseFloat(refPressure);

      if (dH > 0 && T0 > 0 && P0 > 0 && T > 0) {
        const lnP = Math.log(P0) - (dH / R) * (1/T - 1/T0);
        const P = Math.exp(lnP);
        setResult({ pressure: Math.round(P * 100) / 100, unit: "Same as reference" });
        generateClausiusGraph(dH, T0, P0);
      }
    } else {
      const A = parseFloat(antoineA);
      const B = parseFloat(antoineB);
      const C = parseFloat(antoineC);
      const Tc = parseFloat(temperature);

      if (!isNaN(A) && !isNaN(B) && !isNaN(C) && Tc > -273.15) {
        const logP = A - (B / (Tc + C));
        const P = Math.pow(10, logP);
        setResult({ pressure: Math.round(P * 100) / 100, unit: "mmHg" });
        generateAntoineGraph(A, B, C);
      }
    }
  };

  const generateClausiusGraph = (dH: number, T0: number, P0: number) => {
    const R = 8.314;
    const data = [];
    for (let t = T0 - 50; t <= T0 + 100; t += 10) {
      if (t > 0) {
        const T = t;
        const lnP = Math.log(P0) - (dH / R) * (1/T - 1/T0);
        const P = Math.exp(lnP);
        if (P > 0) {
          data.push({ temp: Math.round((T - 273.15) * 10) / 10, pressure: Math.round(P * 100) / 100 });
        }
      }
    }
    setGraphData(data);
  };

  const generateAntoineGraph = (A: number, B: number, C: number) => {
    const data = [];
    for (let t = 0; t <= 200; t += 10) {
      if (t + C !== 0) {
        const logP = A - (B / (t + C));
        const P = Math.pow(10, logP);
        if (P > 0 && P < 10000) {
          data.push({ temp: t, pressure: Math.round(P * 100) / 100 });
        }
      }
    }
    setGraphData(data);
  };

  const reset = () => {
    setTemperature("");
    setEnthalpy("");
    setRefTemp("");
    setRefPressure("");
    setAntoineA("");
    setAntoineB("");
    setAntoineC("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Method</Label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as typeof mode)}
                className="w-full p-2 border rounded"
              >
                <option value="clausius">Clausius-Clapeyron Equation</option>
                <option value="antoine">Antoine Equation</option>
              </select>
            </div>

            <div>
              <Label>Temperature (°C)</Label>
              <Input type="number" placeholder="e.g., 25" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
            </div>

            {mode === "clausius" ? (
              <>
                <div>
                  <Label>Enthalpy of Vaporization (kJ/mol)</Label>
                  <Input type="number" step="0.1" placeholder="e.g., 40.7 for water" value={enthalpy} onChange={(e) => setEnthalpy(e.target.value)} />
                </div>
                <div>
                  <Label>Reference Temperature (°C)</Label>
                  <Input type="number" placeholder="e.g., 100" value={refTemp} onChange={(e) => setRefTemp(e.target.value)} />
                </div>
                <div>
                  <Label>Reference Pressure (any unit)</Label>
                  <Input type="number" placeholder="e.g., 760 for mmHg at boiling" value={refPressure} onChange={(e) => setRefPressure(e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label>Antoine A</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 8.07" value={antoineA} onChange={(e) => setAntoineA(e.target.value)} />
                  </div>
                  <div>
                    <Label>Antoine B</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 1730" value={antoineB} onChange={(e) => setAntoineB(e.target.value)} />
                  </div>
                  <div>
                    <Label>Antoine C</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 233" value={antoineC} onChange={(e) => setAntoineC(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Vapor Pressure</p>
                <p className="text-4xl font-bold mt-1">{result.value} {result.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Vapor Pressure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Vapor pressure is the pressure exerted by a vapor in equilibrium with its liquid or solid phase. It increases exponentially with temperature. Higher vapor pressure means a substance evaporates more easily.</p>

          <h3 className="text-xl font-semibold">Clausius-Clapeyron Equation</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            ln(P/P₀) = -(ΔH_vap/R) × (1/T - 1/T₀)
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>P = Vapor pressure at temperature T</li>
            <li>P₀ = Reference vapor pressure at T₀</li>
            <li>ΔH_vap = Enthalpy of vaporization (J/mol)</li>
            <li>R = Gas constant (8.314 J/(mol·K))</li>
            <li>T = Temperature (K)</li>
          </ul>

          <h3 className="text-xl font-semibold">Antoine Equation</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            log₁₀(P) = A - (B / (T + C))
          </div>
          <p>Where A, B, C are substance-specific constants and T is in °C.</p>

          <h3 className="text-xl font-semibold">Water Antoine Constants (P in mmHg)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Substance</th>
                  <th className="p-2 text-left">A</th>
                  <th className="p-2 text-left">B</th>
                  <th className="p-2 text-left">C</th>
                  <th className="p-2 text-left">Temp Range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Water</td>
                  <td className="p-2">8.07131</td>
                  <td className="p-2">1730.63</td>
                  <td className="p-2">233.426</td>
                  <td className="p-2">1-100°C</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Ethanol</td>
                  <td className="p-2">8.20417</td>
                  <td className="p-2">1642.89</td>
                  <td className="p-2">230.300</td>
                  <td className="p-2">-57-80°C</td>
                </tr>
                <tr>
                  <td className="p-2">Benzene</td>
                  <td className="p-2">6.90565</td>
                  <td className="p-2">1211.033</td>
                  <td className="p-2">220.790</td>
                  <td className="p-2">8-103°C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vapor Pressure vs Temperature</CardTitle>
          <CardDescription>Exponential relationship showing how vapor pressure increases with temperature</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }} dataKey="temp" />
                <YAxis label={{ value: "Vapor Pressure", angle: -90, position: "insideLeft" }} dataKey="pressure" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pressure" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the graph</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications of Vapor Pressure</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Predicting boiling points at different pressures</li>
            <li>Design of distillation and evaporation processes</li>
            <li>Understanding volatility of solvents</li>
            <li>Food processing and freeze drying</li>
            <li>Pharmaceutical formulation stability</li>
            <li>Environmental fate of chemicals</li>
          </ul>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Vapor Pressure</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Choose Calculation Method</h3>
              <p className="text-sm text-muted-foreground">Select Clausius-Clapeyron for theoretical calculations or Antoine equation for empirical accuracy.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Substance Parameters</h3>
              <p className="text-sm text-muted-foreground">Input enthalpy of vaporization and reference data, or Antoine constants for your substance.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Vapor Pressure Results</h3>
              <p className="text-sm text-muted-foreground">View calculated vapor pressure at your temperature with a complete pressure-temperature graph.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Why Use This Vapor Pressure Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Dual Calculation Methods</h3>
            <p className="text-sm text-muted-foreground">Choose between Clausius-Clapeyron for theoretical work or Antoine equation for industry-standard accuracy.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Interactive P-T Graph</h3>
            <p className="text-sm text-muted-foreground">Visualize the exponential relationship between vapor pressure and temperature with dynamic plotting.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Common Substance Constants</h3>
            <p className="text-sm text-muted-foreground">Built-in Antoine constants for water, ethanol, benzene, and other common solvents.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Boiling Point Prediction</h3>
            <p className="text-sm text-muted-foreground">Determine boiling points at various pressures for vacuum distillation and altitude cooking.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Vapor Pressure Equations Reference</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Equation</th>
                <th className="text-left py-2">Formula</th>
                <th className="text-left py-2">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Clausius-Clapeyron</td>
                <td className="py-2 font-mono">ln(P/P₀) = -(ΔH/R)(1/T - 1/T₀)</td>
                <td className="py-2">Theoretical, educational</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Antoine</td>
                <td className="py-2 font-mono">log₁₀(P) = A - B/(T+C)</td>
                <td className="py-2">Industrial, accurate</td>
              </tr>
              <tr>
                <td className="py-2">August-Roche-Magnus</td>
                <td className="py-2 font-mono">P = 0.61094 × exp(17.625T/(T+243.04))</td>
                <td className="py-2">Water vapor, meteorology</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is vapor pressure?</h3>
            <p className="text-sm text-muted-foreground">Vapor pressure is the pressure exerted by a vapor in equilibrium with its liquid or solid phase. It indicates how readily a substance evaporates—higher vapor pressure means faster evaporation and greater volatility.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How does temperature affect vapor pressure?</h3>
            <p className="text-sm text-muted-foreground">Vapor pressure increases exponentially with temperature. As molecules gain kinetic energy, more escape the liquid surface. This is why water boils at lower temperatures at high altitudes where atmospheric pressure is lower.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What is the Antoine equation used for?</h3>
            <p className="text-sm text-muted-foreground">The Antoine equation is an empirical formula that accurately predicts vapor pressure over a specific temperature range. It's widely used in chemical engineering for distillation design and process calculations.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How do I find the boiling point from vapor pressure?</h3>
            <p className="text-sm text-muted-foreground">A liquid boils when its vapor pressure equals atmospheric pressure. At sea level (760 mmHg), water boils at 100°C. At higher elevations with lower atmospheric pressure, boiling occurs at lower temperatures.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What are Antoine constants for water?</h3>
            <p className="text-sm text-muted-foreground">For water (P in mmHg, T in °C): A=8.07131, B=1730.63, C=233.426, valid from 1-100°C. These constants give accurate vapor pressure predictions for water in the liquid range.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
