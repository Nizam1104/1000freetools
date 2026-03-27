"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Faqs from "@/components/utils/Faqs";


export default function SolubilityProductCalculator() {
  const [mode, setMode] = useState<"find-ksp" | "find-solubility">("find-ksp");
  const [cationConc, setCationConc] = useState<string>("");
  const [anionConc, setAnionConc] = useState<string>("");
  const [ksp, setKsp] = useState<string>("");
  const [cationCoeff, setCationCoeff] = useState<string>("1");
  const [anionCoeff, setAnionCoeff] = useState<string>("1");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);

  const calculate = () => {
    const A = parseFloat(cationConc) || 0;
    const B = parseFloat(anionConc) || 0;
    const Ksp = parseFloat(ksp) || 0;
    const m = parseFloat(cationCoeff) || 1;
    const n = parseFloat(anionCoeff) || 1;

    if (mode === "find-ksp" && A > 0 && B > 0) {
      const kspValue = Math.pow(A, m) * Math.pow(B, n);
      setResult({ ksp: kspValue.toExponential(4), label: "Ksp" });
      setBarData([
        { name: "Cation", conc: A },
        { name: "Anion", conc: B },
        { name: "Ksp", conc: kspValue }
      ]);
    } else if (mode === "find-solubility" && Ksp > 0) {
      const s = Math.pow(Ksp / (Math.pow(m, m) * Math.pow(n, n)), 1 / (m + n));
      const cationSol = m * s;
      const anionSol = n * s;
      setResult({
        solubility: s.toExponential(4),
        cationConc: cationSol.toExponential(4),
        anionConc: anionSol.toExponential(4)
      });
      setBarData([
        { name: "Solubility (s)", conc: s },
        { name: "Cation", conc: cationSol },
        { name: "Anion", conc: anionSol }
      ]);
    }
  };

  const reset = () => {
    setCationConc("");
    setAnionConc("");
    setKsp("");
    setResult(null);
    setBarData([]);
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
                  <SelectItem value="find-ksp">Find Ksp from Concentrations</SelectItem>
                  <SelectItem value="find-solubility">Find Solubility from Ksp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "find-ksp" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cation Concentration [Mⁿ⁺] (mol/L)</Label>
                    <Input type="number" placeholder="e.g., 1e-5" value={cationConc} onChange={(e) => setCationConc(e.target.value)} />
                  </div>
                  <div>
                    <Label>Anion Concentration [Xᵐ⁻] (mol/L)</Label>
                    <Input type="number" placeholder="e.g., 1e-5" value={anionConc} onChange={(e) => setAnionConc(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cation Coefficient (m)</Label>
                    <Input type="number" value={cationCoeff} onChange={(e) => setCationCoeff(e.target.value)} />
                  </div>
                  <div>
                    <Label>Anion Coefficient (n)</Label>
                    <Input type="number" value={anionCoeff} onChange={(e) => setAnionCoeff(e.target.value)} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Ksp Value</Label>
                  <Input type="number" placeholder="e.g., 1.8e-10" value={ksp} onChange={(e) => setKsp(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cation Coefficient (m)</Label>
                    <Input type="number" value={cationCoeff} onChange={(e) => setCationCoeff(e.target.value)} />
                  </div>
                  <div>
                    <Label>Anion Coefficient (n)</Label>
                    <Input type="number" value={anionCoeff} onChange={(e) => setAnionCoeff(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                {result.ksp && (
                  <div>
                    <p className="text-sm text-muted-foreground">Ksp</p>
                    <p className="text-3xl font-bold">{result.ksp}</p>
                  </div>
                )}
                {result.solubility && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Molar Solubility (s)</p>
                      <p className="text-3xl font-bold">{result.solubility} mol/L</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">[Cation]</p>
                        <p className="text-xl font-semibold">{result.cationConc} mol/L</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">[Anion]</p>
                        <p className="text-xl font-semibold">{result.anionConc} mol/L</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Solubility Product (Ksp)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Ksp is the equilibrium constant for a solid dissolving in water. It represents the product of ion concentrations at equilibrium, each raised to the power of its coefficient. Lower Ksp values indicate less soluble compounds.</p>

          <h3 className="text-xl font-semibold">Ksp Expression</h3>
          <p>For a salt MₘXₙ dissociating: MₘXₙ(s) ⇌ m Mⁿ⁺(aq) + n Xᵐ⁻(aq)</p>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            Ksp = [Mⁿ⁺]ᵐ × [Xᵐ⁻]ⁿ
          </div>

          <h3 className="text-xl font-semibold">Molar Solubility</h3>
          <p>Molar solubility (s) is the number of moles of salt that dissolve per liter. For MₘXₙ:</p>
          <div className="p-4 bg-muted rounded-md font-mono space-y-2">
            <div>[Mⁿ⁺] = m × s</div>
            <div>[Xᵐ⁻] = n × s</div>
            <div>Ksp = (m×s)ᵐ × (n×s)ⁿ = mᵐ × nⁿ × sᵐ⁺ⁿ</div>
            <div>s = (Ksp / (mᵐ × nⁿ))^(1/(m+n))</div>
          </div>

          <h3 className="text-xl font-semibold">Common Ksp Values (25°C)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Compound</th>
                  <th className="p-2 text-left">Formula</th>
                  <th className="p-2 text-left">Ksp</th>
                  <th className="p-2 text-left">Solubility</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Silver chloride</td>
                  <td className="p-2">AgCl</td>
                  <td className="p-2">1.8 × 10⁻¹⁰</td>
                  <td className="p-2">1.3 × 10⁻⁵ M</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Barium sulfate</td>
                  <td className="p-2">BaSO₄</td>
                  <td className="p-2">1.1 × 10⁻¹⁰</td>
                  <td className="p-2">1.0 × 10⁻⁵ M</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Calcium carbonate</td>
                  <td className="p-2">CaCO₃</td>
                  <td className="p-2">3.4 × 10⁻⁹</td>
                  <td className="p-2">5.8 × 10⁻⁵ M</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Lead(II) iodide</td>
                  <td className="p-2">PbI₂</td>
                  <td className="p-2">7.1 × 10⁻⁹</td>
                  <td className="p-2">1.2 × 10⁻³ M</td>
                </tr>
                <tr>
                  <td className="p-2">Calcium fluoride</td>
                  <td className="p-2">CaF₂</td>
                  <td className="p-2">3.5 × 10⁻¹¹</td>
                  <td className="p-2">2.1 × 10⁻⁴ M</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example: AgCl</h3>
          <p>AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)</p>
          <p>Ksp = [Ag⁺][Cl⁻] = 1.8 × 10⁻¹⁰</p>
          <p>If [Ag⁺] = [Cl⁻] = s, then s² = 1.8 × 10⁻¹⁰, s = 1.3 × 10⁻⁵ M</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ion Concentration Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Concentration (mol/L)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="conc" fill="#8884d8" />
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
          <CardTitle>Ksp Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Predicting precipitation in chemical reactions</li>
            <li>Water treatment and hardness removal</li>
            <li>Qualitative analysis of metal ions</li>
            <li>Understanding kidney stone formation</li>
            <li>Pharmaceutical formulation stability</li>
            <li>Geochemical mineral dissolution</li>
          </ul>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">How the Ksp Calculator Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
              <h4 className="font-semibold mb-2">Choose Calculation Mode</h4>
              <p className="text-sm text-muted-foreground">Select whether to find Ksp from concentrations or solubility from Ksp.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
              <h4 className="font-semibold mb-2">Enter Values</h4>
              <p className="text-sm text-muted-foreground">Input ion concentrations or Ksp value along with stoichiometric coefficients.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
              <h4 className="font-semibold mb-2">Get Results</h4>
              <p className="text-sm text-muted-foreground">View Ksp, molar solubility, and ion concentrations with visual comparison.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What does Ksp tell us about solubility?",
    answer: "Ksp indicates how much of a compound can dissolve in water. Lower Ksp values mean less soluble compounds. However, Ksp values can only be directly compared for compounds with the same ion ratio.",
  },
{
    question: "How do you calculate molar solubility from Ksp?",
    answer: "For a salt MₘXₙ, molar solubility s = (Ksp / (m^m × n^n))^(1/(m+n)). For simple 1:1 salts like AgCl, s = √Ksp.",
  },
{
    question: "What factors affect Ksp?",
    answer: "Ksp is temperature-dependent but independent of concentration. Increasing temperature generally increases Ksp for endothermic dissolution processes.",
  },
{
    question: "When does precipitation occur?",
    answer: "Precipitation occurs when the ion product (Q) exceeds Ksp. If Q &lt; Ksp, the solution is unsaturated. If Q = Ksp, the solution is at equilibrium.",
  },
{
    question: "What is the common ion effect?",
    answer: "Adding a common ion (an ion already present in the equilibrium) decreases solubility by shifting equilibrium toward the solid, according to Le Chatelier&apos;s principle.",
  }
  ]} />
</section>

      {/* Related Tools Section */}
    </div>
  );
}
