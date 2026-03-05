"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProbabilityCalculator() {
  const [calcType, setCalcType] = useState<"simple" | "complement" | "conditional">("simple");
  const [favorable, setFavorable] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [probA, setProbA] = useState<string>("");
  const [probB, setProbB] = useState<string>("");
  const [probAandB, setProbAandB] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setResult(null);
    setError("");

    if (calcType === "simple") {
      const fav = parseFloat(favorable);
      const tot = parseFloat(total);
      if (isNaN(fav) || isNaN(tot) || fav < 0 || tot <= 0 || fav > tot) { setError("Invalid values"); return; }
      const prob = fav / tot;
      const percent = prob * 100;
      const odds = fav > 0 ? `${fav}:${tot-fav}` : `0:${tot}`;
      setResult({
        probability: prob, percent, odds,
        steps: [`P(Event) = Favorable Outcomes / Total Outcomes`, `P = ${fav} / ${tot}`, `P = ${prob.toFixed(4)} (${percent.toFixed(2)}%)`, `Odds in favor: ${odds}`]
      });
    } else if (calcType === "complement") {
      const p = parseFloat(probA);
      if (isNaN(p) || p < 0 || p > 1) { setError("Enter probability between 0 and 1"); return; }
      const complement = 1 - p;
      setResult({
        complement, percent: complement * 100,
        steps: [`P(A') = 1 - P(A)`, `P(A') = 1 - ${p}`, `P(A') = ${complement.toFixed(4)}`]
      });
    } else {
      const pA = parseFloat(probA);
      const pAandB = parseFloat(probAandB);
      if (isNaN(pA) || isNaN(pAandB) || pA <= 0 || pAandB < 0 || pAandB > pA) { setError("Invalid values"); return; }
      const conditional = pAandB / pA;
      setResult({
        conditional, percent: conditional * 100,
        steps: [`P(B|A) = P(A and B) / P(A)`, `P(B|A) = ${pAandB} / ${pA}`, `P(B|A) = ${conditional.toFixed(4)}`]
      });
    }
  };

  const reset = () => { setFavorable(""); setTotal(""); setProbA(""); setProbB(""); setProbAandB(""); setResult(null); setError(""); };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Probability Calculator – Calculate Probability of Events Online</h1>
        <p className="text-muted-foreground">
          Calculate the probability of any event with our free online probability calculator. Find simple, complementary, and conditional probabilities with formula explanations.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Probability Calculator</CardTitle><CardDescription>Calculate different types of probabilities</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Calculation Type</Label>
              <Select value={calcType} onValueChange={(v) => setCalcType(v as typeof calcType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple Probability</SelectItem>
                  <SelectItem value="complement">Complementary Probability</SelectItem>
                  <SelectItem value="conditional">Conditional Probability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {calcType === "simple" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Favorable Outcomes</Label><Input type="number" value={favorable} onChange={(e) => setFavorable(e.target.value)} /></div>
                <div><Label>Total Outcomes</Label><Input type="number" value={total} onChange={(e) => setTotal(e.target.value)} /></div>
              </div>
            )}
            {calcType === "complement" && (
              <div><Label>P(A)</Label><Input type="number" step="0.01" value={probA} onChange={(e) => setProbA(e.target.value)} /></div>
            )}
            {calcType === "conditional" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>P(A)</Label><Input type="number" step="0.01" value={probA} onChange={(e) => setProbA(e.target.value)} /></div>
                <div><Label>P(A and B)</Label><Input type="number" step="0.01" value={probAandB} onChange={(e) => setProbAandB(e.target.value)} /></div>
              </div>
            )}

            {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}
            <div className="flex gap-2"><Button onClick={calculate}>Calculate</Button><Button variant="outline" onClick={reset}>Reset</Button></div>

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  {result.probability !== undefined && <><p className="text-sm text-muted-foreground">Probability</p><p className="text-4xl font-bold">{result.probability.toFixed(4)}</p><p className="text-sm text-muted-foreground mt-2">{result.percent.toFixed(2)}%</p></>}
                  {result.complement !== undefined && <><p className="text-sm text-muted-foreground">P(A')</p><p className="text-4xl font-bold">{result.complement.toFixed(4)}</p><p className="text-sm text-muted-foreground mt-2">{result.percent.toFixed(2)}%</p></>}
                  {result.conditional !== undefined && <><p className="text-sm text-muted-foreground">P(B|A)</p><p className="text-4xl font-bold">{result.conditional.toFixed(4)}</p><p className="text-sm text-muted-foreground mt-2">{result.percent.toFixed(2)}%</p></>}
                  {result.odds && <p className="text-sm text-muted-foreground mt-2">Odds: {result.odds}</p>}
                </div>
                <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-3">Solution</h4><div className="space-y-2 text-sm font-mono">{result.steps.map((s:string,i:number)=><div key={i}>{s}</div>)}</div></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Probability Formulas</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Simple</h4><p className="font-mono text-sm">P(E) = Favorable / Total</p></div>
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Complement</h4><p className="font-mono text-sm">P(A') = 1 - P(A)</p></div>
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Conditional</h4><p className="font-mono text-sm">P(B|A) = P(A∩B) / P(A)</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Related Math Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/permutation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Permutation Calculator</p><p className="text-xs text-muted-foreground">nPr</p></a>
            <a href="/math-tools/combination-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Combination Calculator</p><p className="text-xs text-muted-foreground">nCr</p></a>
            <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Statistics Calculator</p><p className="text-xs text-muted-foreground">Mean, median, mode</p></a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
