"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function POHCalculator() {
  const [mode, setMode] = useState<"oh-to-poh" | "poh-to-oh" | "ph-to-poh" | "poh-to-ph">("oh-to-poh");
  const [ohConcentration, setOhConcentration] = useState<string>("");
  const [poh, setPoh] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    if (mode === "oh-to-poh") {
      const oh = parseFloat(ohConcentration);
      if (oh > 0) {
        const pohValue = -Math.log10(oh);
        setResult({ value: Math.round(pohValue * 100) / 100, unit: "", label: "pOH" });
        generatePOHGraph();
      }
    } else if (mode === "poh-to-oh") {
      const pohValue = parseFloat(poh);
      if (pohValue >= 0 && pohValue <= 14) {
        const ohConc = Math.pow(10, -pohValue);
        setResult({ value: ohConc.toExponential(4), unit: "mol/L", label: "[OH⁻]" });
        generateOHGraph();
      }
    } else if (mode === "ph-to-poh") {
      const phValue = parseFloat(ph);
      if (phValue >= 0 && phValue <= 14) {
        const pohValue = 14 - phValue;
        setResult({ value: Math.round(pohValue * 100) / 100, unit: "", label: "pOH" });
        generatePHPOHGraph();
      }
    } else {
      const pohValue = parseFloat(poh);
      if (pohValue >= 0 && pohValue <= 14) {
        const phValue = 14 - pohValue;
        setResult({ value: Math.round(phValue * 100) / 100, unit: "", label: "pH" });
        generatePOHPHGraph();
      }
    }
  };

  const generatePOHGraph = () => {
    const data = [];
    for (let oh = 1e-14; oh <= 1; oh *= 10) {
      data.push({ ohConc: oh.toExponential(2), poh: Math.round(-Math.log10(oh) * 100) / 100 });
    }
    setGraphData(data);
  };

  const generateOHGraph = () => {
    const data = [];
    for (let p = 0; p <= 14; p += 1) {
      data.push({ poh: p, ohConc: Math.pow(10, -p).toExponential(2) });
    }
    setGraphData(data);
  };

  const generatePHPOHGraph = () => {
    const data = [];
    for (let p = 0; p <= 14; p += 1) {
      data.push({ ph: p, poh: 14 - p });
    }
    setGraphData(data);
  };

  const generatePOHPHGraph = () => {
    const data = [];
    for (let p = 0; p <= 14; p += 1) {
      data.push({ poh: p, ph: 14 - p });
    }
    setGraphData(data);
  };

  const reset = () => {
    setOhConcentration("");
    setPoh("");
    setPh("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculate</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oh-to-poh">[OH⁻] to pOH</SelectItem>
                  <SelectItem value="poh-to-oh">pOH to [OH⁻]</SelectItem>
                  <SelectItem value="ph-to-poh">pH to pOH</SelectItem>
                  <SelectItem value="poh-to-ph">pOH to pH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "oh-to-poh" && (
              <div>
                <Label>Hydroxide Ion Concentration [OH⁻] (mol/L)</Label>
                <Input type="number" placeholder="e.g., 1e-7" value={ohConcentration} onChange={(e) => setOhConcentration(e.target.value)} />
              </div>
            )}

            {mode === "poh-to-oh" && (
              <div>
                <Label>pOH Value</Label>
                <Input type="number" placeholder="e.g., 7" value={poh} onChange={(e) => setPoh(e.target.value)} />
              </div>
            )}

            {mode === "ph-to-poh" && (
              <div>
                <Label>pH Value</Label>
                <Input type="number" placeholder="e.g., 5" value={ph} onChange={(e) => setPh(e.target.value)} />
              </div>
            )}

            {mode === "poh-to-ph" && (
              <div>
                <Label>pOH Value</Label>
                <Input type="number" placeholder="e.g., 9" value={poh} onChange={(e) => setPoh(e.target.value)} />
              </div>
            )}

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
          <CardTitle>What is pOH?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>pOH measures the hydroxide ion concentration of a solution. The pOH scale ranges from 0 to 14, just like pH. Low pOH values indicate high [OH⁻] concentration (basic solutions). High pOH values indicate low [OH⁻] concentration (acidic solutions).</p>

          <h3 className="text-xl font-semibold">pOH Formulas</h3>
          <div className="p-4 bg-muted rounded-md font-mono space-y-2">
            <div>pOH = -log₁₀[OH⁻]</div>
            <div>pH + pOH = 14 (at 25°C)</div>
            <div>[OH⁻] = 10⁻ᵖᴼᴴ</div>
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>pOH = Measure of hydroxide ion concentration</li>
            <li>[OH⁻] = Hydroxide ion concentration (mol/L)</li>
            <li>pH = Measure of hydrogen ion concentration</li>
          </ul>

          <h3 className="text-xl font-semibold">pH and pOH Relationship</h3>
          <p>The sum of pH and pOH always equals 14 at 25°C. This relationship comes from the ion product of water: Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C. Taking the negative logarithm gives pH + pOH = 14.</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Solution Type</th>
                  <th className="p-2 text-left">pH</th>
                  <th className="p-2 text-left">pOH</th>
                  <th className="p-2 text-left">[H⁺] vs [OH⁻]</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Acidic</td>
                  <td className="p-2">&lt; 7</td>
                  <td className="p-2">&gt; 7</td>
                  <td className="p-2">[H⁺] &gt; [OH⁻]</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Neutral</td>
                  <td className="p-2">7</td>
                  <td className="p-2">7</td>
                  <td className="p-2">[H⁺] = [OH⁻]</td>
                </tr>
                <tr>
                  <td className="p-2">Basic</td>
                  <td className="p-2">&gt; 7</td>
                  <td className="p-2">&lt; 7</td>
                  <td className="p-2">[H⁺] &lt; [OH⁻]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>A solution has [OH⁻] = 1 × 10⁻⁴ mol/L. Calculate pOH: pOH = -log₁₀(1 × 10⁻⁴) = 4. Then find pH: pH = 14 - 4 = 10. The solution is basic with pH 10.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>pH and pOH Relationship Graph</CardTitle>
          <CardDescription>Linear relationship showing pH + pOH = 14</CardDescription>
        </CardHeader>
        <CardContent>
          {graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: mode === "poh-to-ph" ? "pOH" : "pH", position: "insideBottom", offset: -5 }} dataKey={mode === "poh-to-ph" ? "poh" : "ph"} />
                <YAxis label={{ value: mode === "poh-to-ph" ? "pH" : "pOH", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={mode === "poh-to-ph" ? "ph" : "poh"} stroke="#8884d8" strokeWidth={2} />
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
          <CardTitle>pOH Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">[OH⁻] (mol/L)</th>
                  <th className="p-2 text-left">pOH</th>
                  <th className="p-2 text-left">pH</th>
                  <th className="p-2 text-left">Solution Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">1.0 × 10⁰</td>
                  <td className="p-2">0</td>
                  <td className="p-2">14</td>
                  <td className="p-2">Strongly Basic</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1.0 × 10⁻⁴</td>
                  <td className="p-2">4</td>
                  <td className="p-2">10</td>
                  <td className="p-2">Basic</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1.0 × 10⁻⁷</td>
                  <td className="p-2">7</td>
                  <td className="p-2">7</td>
                  <td className="p-2">Neutral</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1.0 × 10⁻¹⁰</td>
                  <td className="p-2">10</td>
                  <td className="p-2">4</td>
                  <td className="p-2">Acidic</td>
                </tr>
                <tr>
                  <td className="p-2">1.0 × 10⁻¹⁴</td>
                  <td className="p-2">14</td>
                  <td className="p-2">0</td>
                  <td className="p-2">Strongly Acidic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>pOH Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Calculating hydroxide concentration in basic solutions</li>
            <li>Determining solution alkalinity directly</li>
            <li>Buffer solution preparation and analysis</li>
            <li>Water treatment and quality testing</li>
            <li>Industrial process control for alkaline solutions</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate pOH</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <p className="font-semibold mb-1">Choose conversion type</p>
              <p className="text-sm text-muted-foreground">Select from OH to pOH, pOH to OH, pH to pOH, or pOH to pH conversions.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <p className="font-semibold mb-1">Enter your value</p>
              <p className="text-sm text-muted-foreground">Input hydroxide concentration or pH/pOH value. Use scientific notation for concentrations.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <p className="font-semibold mb-1">View results and graph</p>
              <p className="text-sm text-muted-foreground">Get instant pOH or pH results with a visual graph showing the relationship.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Use This pOH Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Four conversion modes</p>
              <p className="text-sm text-muted-foreground">Handle any pOH, pH, or OH concentration conversion in one tool.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Visual relationship graph</p>
              <p className="text-sm text-muted-foreground">See the linear pH + pOH = 14 relationship plotted clearly.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Reference table included</p>
              <p className="text-sm text-muted-foreground">Quick lookup for common OH concentrations and their pOH values.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Scientific notation support</p>
              <p className="text-sm text-muted-foreground">Enter values like 1e-7 directly for hydroxide concentrations.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Solution classification</p>
              <p className="text-sm text-muted-foreground">Automatically identifies acidic, neutral, or basic solutions.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">How do you calculate pOH?</p>
              <p className="text-sm text-muted-foreground">pOH = -log10[OH]. For [OH] = 1 × 10^-4 M, pOH = -log10(1 × 10^-4) = 4.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What is the relationship between pH and pOH?</p>
              <p className="text-sm text-muted-foreground">pH + pOH = 14 at 25°C. If pH is 5, then pOH = 14 - 5 = 9.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What does pOH measure?</p>
              <p className="text-sm text-muted-foreground">pOH measures hydroxide ion concentration. Low pOH means high OH (basic). High pOH means low OH (acidic).</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How do you convert pOH to OH concentration?</p>
              <p className="text-sm text-muted-foreground">Use [OH] = 10^-pOH. For pOH = 4, [OH] = 10^-4 = 0.0001 mol/L.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What is a neutral pOH value?</p>
              <p className="text-sm text-muted-foreground">Neutral solutions have pOH = 7 at 25°C, same as pH. This means [OH] = [H+] = 10^-7 M.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Chemistry Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Try our other chemistry calculators: the <a href="/calculators/ph-calculator" className="text-primary hover:underline">pH calculator</a> for hydrogen ion calculations, the <a href="/calculators/pka-pkb-calculator" className="text-primary hover:underline">pKa pKb calculator</a> for acid-base constants, and the <a href="/calculators/henderson-hasselbalch-calculator" className="text-primary hover:underline">Henderson-Hasselbalch calculator</a> for buffer solutions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
