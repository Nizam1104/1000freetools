"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function BacterialGrowthCalculator() {
  const [initialCount, setInitialCount] = useState<string>("");
  const [growthRate, setGrowthRate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    const N0 = parseFloat(initialCount);
    const r = parseFloat(growthRate);
    const t = parseFloat(time);

    if (N0 > 0 && r > 0 && t > 0) {
      const N = N0 * Math.pow(2, t / r);
      const generations = t / r;
      setResult({
        finalCount: Math.round(N),
        generations: Math.round(generations * 100) / 100,
        doublingTime: r
      });

      const data = [];
      for (let i = 0; i <= t; i += t / 20) {
        const count = N0 * Math.pow(2, i / r);
        data.push({ time: Math.round(i * 10) / 10, count: Math.round(count) });
      }
      setGraphData(data);
    }
  };

  const reset = () => {
    setInitialCount("");
    setGrowthRate("");
    setTime("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Bacterial Growth Calculator – Model Microbial Population Growth</CardTitle>
          <CardDescription>
            Model bacterial population growth using exponential growth equations with our bacterial growth calculator. Input initial population, growth rate, and time to predict colony size. Perfect for microbiology, food science, and infectious disease studies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Initial Bacterial Count (CFU or cells)</Label>
              <Input type="number" placeholder="e.g., 100" value={initialCount} onChange={(e) => setInitialCount(e.target.value)} />
            </div>
            <div>
              <Label>Doubling Time ({timeUnit})</Label>
              <Input type="number" placeholder="e.g., 20" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Growth Time</Label>
                <Input type="number" placeholder="e.g., 120" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div>
                <Label>Unit</Label>
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as typeof timeUnit)}
                  className="w-full p-2 border rounded"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Growth</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Final Population</p>
                  <p className="text-4xl font-bold">{result.finalCount.toLocaleString()} cells</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Generations</p>
                    <p className="text-xl font-semibold">{result.generations}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Doubling Time</p>
                    <p className="text-xl font-semibold">{result.doublingTime} {timeUnit}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Bacterial Growth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Bacteria reproduce by binary fission, doubling their population at regular intervals. During exponential (log) phase, the population grows according to the exponential growth equation.</p>

          <h3 className="text-xl font-semibold">Bacterial Growth Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono space-y-2">
            <div>N = N₀ × 2ⁿ</div>
            <div>where n = t / g</div>
            <div>N = N₀ × 2^(t/g)</div>
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>N = Final population size</li>
            <li>N₀ = Initial population size</li>
            <li>n = Number of generations</li>
            <li>t = Time elapsed</li>
            <li>g = Generation time (doubling time)</li>
          </ul>

          <h3 className="text-xl font-semibold">Bacterial Growth Phases</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Phase</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Lag</td>
                  <td className="p-2">Cells adapt to environment</td>
                  <td className="p-2">None</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Log (Exponential)</td>
                  <td className="p-2">Rapid cell division</td>
                  <td className="p-2">Maximum</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Stationary</td>
                  <td className="p-2">Growth = Death rate</td>
                  <td className="p-2">Zero</td>
                </tr>
                <tr>
                  <td className="p-2">Death</td>
                  <td className="p-2">Cells die off</td>
                  <td className="p-2">Negative</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>Starting with 100 E. coli cells (doubling time = 20 min), after 2 hours (120 min):</p>
          <p>Generations = 120 / 20 = 6</p>
          <p>N = 100 × 2⁶ = 100 × 64 = 6,400 cells</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Growth Curve</CardTitle>
          <CardDescription>Exponential bacterial growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: `Time (${timeUnit})`, position: "insideBottom", offset: -5 }} dataKey="time" />
                <YAxis label={{ value: "Population (cells)", angle: -90, position: "insideLeft" }} dataKey="count" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
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
          <CardTitle>Common Doubling Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Bacterium</th>
                  <th className="p-2 text-left">Doubling Time</th>
                  <th className="p-2 text-left">Optimal Temp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">E. coli</td>
                  <td className="p-2">20 minutes</td>
                  <td className="p-2">37°C</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Staphylococcus aureus</td>
                  <td className="p-2">30 minutes</td>
                  <td className="p-2">37°C</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Mycobacterium tuberculosis</td>
                  <td className="p-2">12-24 hours</td>
                  <td className="p-2">37°C</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Bacillus subtilis</td>
                  <td className="p-2">30 minutes</td>
                  <td className="p-2">37°C</td>
                </tr>
                <tr>
                  <td className="p-2">Pseudomonas aeruginosa</td>
                  <td className="p-2">40 minutes</td>
                  <td className="p-2">37°C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
