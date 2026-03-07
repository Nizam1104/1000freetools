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

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Bacterial Growth Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
            <div>
              <p className="font-medium text-foreground">Enter the initial bacterial count</p>
              <p className="text-sm text-muted-foreground">Input the starting population in CFU (colony-forming units) or cells. For example, enter 100 if you start with 100 bacterial cells.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
            <div>
              <p className="font-medium text-foreground">Set the doubling time and time unit</p>
              <p className="text-sm text-muted-foreground">Enter how long it takes for the population to double. Select minutes or hours based on your bacterium. E. coli doubles every 20 minutes under ideal conditions.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
            <div>
              <p className="font-medium text-foreground">Enter growth time and calculate</p>
              <p className="text-sm text-muted-foreground">Specify how long the bacteria will grow. Click Calculate to see the final population, number of generations, and view the exponential growth curve.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bacterial Growth Rates by Environment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Environment</th>
                  <th className="text-left py-3 px-2 font-semibold">Typical Doubling Time</th>
                  <th className="text-left py-3 px-2 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2">Lab culture (optimal)</td>
                  <td className="py-3 px-2">20-30 minutes</td>
                  <td className="py-3 px-2">Rich media, 37°C, aerobic</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Human body</td>
                  <td className="py-3 px-2">30-60 minutes</td>
                  <td className="py-3 px-2">Varies by location and immune response</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Soil</td>
                  <td className="py-3 px-2">2-12 hours</td>
                  <td className="py-3 px-2">Nutrient-limited, variable conditions</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Deep ocean</td>
                  <td className="py-3 px-2">Days to weeks</td>
                  <td className="py-3 px-2">Extreme pressure, low nutrients</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">Permafrost</td>
                  <td className="py-3 px-2">Years (dormant)</td>
                  <td className="py-3 px-2">Metabolically inactive until thawed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Doubling times vary significantly based on nutrient availability, temperature, pH, and oxygen levels.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Bacterial Growth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Binary Fission</h4>
            <p>
              Bacteria reproduce by splitting in half. One cell becomes two, two become four, four become eight. This is exponential growth. Under perfect conditions, a single E. coli cell can produce over 16 million cells in just 8 hours.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">The Growth Curve</h4>
            <p>
              Bacterial populations follow a predictable pattern. First comes the lag phase where cells adapt to their environment. Then the log (exponential) phase where rapid division happens. Eventually nutrients run out and the population plateaus (stationary phase). Finally, cells begin to die faster than they reproduce (death phase).
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Why Doubling Time Matters</h4>
            <p>
              Different bacteria grow at vastly different rates. E. coli doubles every 20 minutes in the lab. Mycobacterium tuberculosis takes 12-24 hours. This affects how quickly infections develop, how fast food spoils, and how long experiments take. Fast growers are easier to study but also cause rapid-onset illnesses.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Real-World Applications</h4>
            <p>
              Understanding bacterial growth helps in food safety (predicting spoilage), medicine (dosing antibiotics), wastewater treatment (optimizing bacterial digestion), and biotechnology (producing insulin and other proteins). The same math applies whether you are studying pathogens or beneficial bacteria.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Accurate Calculations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Use realistic doubling times</p>
              <p>Look up species-specific data. Don't assume all bacteria grow like E. coli. Environmental conditions matter more than you might think.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Remember this models ideal conditions</p>
              <p>The calculator assumes unlimited nutrients and no waste buildup. Real populations slow down as resources deplete. Use this for the exponential phase only.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Watch for overflow with long times</p>
              <p>Exponential growth gets huge fast. After 100 generations, even starting from 1 cell, you exceed the number of atoms in the observable universe. Keep timeframes realistic.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">What is bacterial doubling time?</h4>
            <p>
              Doubling time is how long it takes for a bacterial population to double in size. E. coli doubles every 20 minutes under ideal lab conditions. Other bacteria take hours or even days. Temperature, nutrients, and oxygen all affect the rate.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">How do you calculate bacterial population growth?</h4>
            <p>
              Use the formula N = N₀ × 2^(t/g), where N is the final population, N₀ is the starting population, t is time elapsed, and g is the generation time (doubling time). This calculator does the math for you and shows the growth curve.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Why doesn't bacterial growth stay exponential forever?</h4>
            <p>
              Resources run out. Bacteria need food, space, and the right conditions. As the population grows, waste products build up and nutrients deplete. Eventually the growth rate slows and the population stabilizes or crashes. This is called carrying capacity.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">What is CFU and why is it used?</h4>
            <p>
              CFU stands for colony-forming units. It counts viable bacteria that can form visible colonies on a plate. One CFU might be a single cell or a small clump. CFU is more useful than total cell count because it measures bacteria that are actually alive and capable of reproducing.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Can I use this for yeast or other microorganisms?</h4>
            <p>
              Yes, the exponential growth formula works for any organism that reproduces by binary fission or similar mechanisms. Yeast, some protozoa, and even cancer cells follow similar growth patterns. Just use the appropriate doubling time for your organism.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
