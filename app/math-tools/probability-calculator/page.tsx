"use client";

import { useState } from "react";
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

  const loadExample = (type: typeof calcType, values: { fav?: string; tot?: string; pA?: string; pAandB?: string }) => {
    setCalcType(type);
    setFavorable(values.fav || "");
    setTotal(values.tot || "");
    setProbA(values.pA || "");
    setProbAandB(values.pAandB || "");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Probability Calculator - Calculate Probability of Events Online</h1>
        <p className="text-muted-foreground">
          Calculate the probability of any event with our free online probability calculator. Find simple, complementary, and conditional probabilities with formula explanations.
        </p>
      </div>

      <div className="space-y-4">
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
            <div><Label>Favorable Outcomes</Label><Input type="number" value={favorable} onChange={(e) => setFavorable(e.target.value)} placeholder="e.g., 6" /></div>
            <div><Label>Total Outcomes</Label><Input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g., 52" /></div>
          </div>
        )}
        {calcType === "complement" && (
          <div><Label>P(A) - Probability of Event A</Label><Input type="number" step="0.01" min="0" max="1" value={probA} onChange={(e) => setProbA(e.target.value)} placeholder="e.g., 0.3" /></div>
        )}
        {calcType === "conditional" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>P(A)</Label><Input type="number" step="0.01" value={probA} onChange={(e) => setProbA(e.target.value)} placeholder="e.g., 0.5" /></div>
            <div><Label>P(A and B)</Label><Input type="number" step="0.01" value={probAandB} onChange={(e) => setProbAandB(e.target.value)} placeholder="e.g., 0.2" /></div>
          </div>
        )}

        {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}
        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("simple", { fav: "4", tot: "52" })}>Drawing an Ace</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("simple", { fav: "1", tot: "6" })}>Rolling a 6</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("simple", { fav: "18", tot: "38" })}>Roulette red</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("complement", { pA: "0.3" })}>P(A) = 0.3</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("conditional", { pA: "0.5", pAandB: "0.2" })}>Conditional</Button>
        </div>

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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Probability</h2>
        <p className="text-muted-foreground">
          Probability measures how likely an event is to occur, expressed as a number between 0 and 1. Zero means impossible, one means certain, and values in between represent varying degrees of likelihood. We use probability every day - from weather forecasts to game strategies to risk assessments.
        </p>
        <p className="text-muted-foreground">
          The beauty of probability is that it turns uncertainty into something we can calculate with. Whether you're playing cards, investing in stocks, or deciding whether to carry an umbrella, probability helps you make informed decisions.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Probability Formulas</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Simple Probability</h4>
            <p className="font-mono text-sm mb-2">P(E) = Favorable / Total</p>
            <p className="text-xs text-muted-foreground">The basic formula: count favorable outcomes, divide by total possible outcomes.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Complement</h4>
            <p className="font-mono text-sm mb-2">P(A') = 1 - P(A)</p>
            <p className="text-xs text-muted-foreground">The probability an event does NOT happen. Useful when "not happening" is easier to calculate.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Conditional</h4>
            <p className="font-mono text-sm mb-2">P(B|A) = P(A∩B) / P(A)</p>
            <p className="text-xs text-muted-foreground">Probability of B given that A already happened. The foundation of Bayesian reasoning.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Drawing a Card</h4>
            <p className="text-sm text-muted-foreground mb-2">
              What's the probability of drawing an Ace from a standard 52-card deck?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Favorable outcomes: 4 (four Aces)</div>
              <div>Total outcomes: 52 (cards in deck)</div>
              <div>P(Ace) = 4/52 = 1/13 ≈ 0.0769</div>
              <div className="text-green-600 font-semibold">About 7.69% chance of drawing an Ace</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Rolling Dice</h4>
            <p className="text-sm text-muted-foreground mb-2">
              What's the probability of rolling a 6 on a fair six-sided die?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Favorable outcomes: 1 (just the 6)</div>
              <div>Total outcomes: 6 (numbers 1-6)</div>
              <div>P(6) = 1/6 ≈ 0.1667</div>
              <div className="text-green-600 font-semibold">About 16.67% chance</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Complement - Not Rolling a 6</h4>
            <p className="text-sm text-muted-foreground mb-2">
              What's the probability of NOT rolling a 6?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>P(rolling 6) = 1/6</div>
              <div>P(not 6) = 1 - P(6)</div>
              <div>P(not 6) = 1 - 1/6 = 5/6 ≈ 0.8333</div>
              <div className="text-green-600 font-semibold">About 83.33% chance of not rolling a 6</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Conditional Probability</h4>
            <p className="text-sm text-muted-foreground mb-2">
              In a class, 50% study math (A), and 20% study both math and physics (A∩B). Given a student studies math, what's the probability they also study physics?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>P(A) = 0.50, P(A∩B) = 0.20</div>
              <div>P(B|A) = P(A∩B) / P(A)</div>
              <div>P(B|A) = 0.20 / 0.50 = 0.40</div>
              <div className="text-green-600 font-semibold">40% of math students also study physics</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Roulette</h4>
            <p className="text-sm text-muted-foreground mb-2">
              American roulette has 38 slots (18 red, 18 black, 2 green). What's the probability of landing on red?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Favorable: 18 red slots</div>
              <div>Total: 38 slots</div>
              <div>P(red) = 18/38 = 9/19 ≈ 0.4737</div>
              <div className="text-green-600 font-semibold">About 47.37% - less than 50% due to green slots</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Probability theory began with a gambling problem. In 1654, French nobleman Chevalier de Méré asked mathematician Blaise Pascal why he lost money betting he could roll at least one 6 in 4 dice rolls. Pascal's correspondence with Pierre de Fermat solving this problem founded probability theory. Their work showed the probability was 1 - (5/6)⁴ ≈ 51.77%, explaining his losses over time.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does probability 0.5 mean?</h4>
            <p className="text-sm text-muted-foreground">
              A probability of 0.5 (or 50%) means the event is equally likely to happen or not happen - like a fair coin flip. Over many trials, you'd expect the event to occur about half the time, though short-term results can vary significantly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between probability and odds?</h4>
            <p className="text-sm text-muted-foreground">
              Probability is favorable/total (ranges 0-1). Odds are favorable:unfavorable. If P = 1/4, odds are 1:3. To convert: odds = P/(1-P). Gamblers use odds; statisticians use probability. Both describe likelihood, just differently.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can probability be greater than 1?</h4>
            <p className="text-sm text-muted-foreground">
              No, probability is always between 0 and 1 (or 0% to 100%). If you calculate a probability outside this range, there's an error. This is a fundamental axiom of probability theory - it's mathematically impossible for a valid probability to exceed 1.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the probability of two independent events both happening?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply their individual probabilities: P(A and B) = P(A) × P(B). For example, probability of two heads in a row: 0.5 × 0.5 = 0.25 (25%). This only works for independent events where one doesn't affect the other.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the law of large numbers?</h4>
            <p className="text-sm text-muted-foreground">
              As you repeat a random experiment more times, the observed frequency approaches the theoretical probability. Flip a coin 10 times - might get 7 heads. Flip it 10,000 times - you'll get very close to 5,000 heads (50%).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where is probability used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Everywhere: weather forecasting (30% chance of rain), insurance (calculating premiums), medicine (test accuracy, treatment success), finance (risk assessment), sports (batting averages), quality control, machine learning, and game theory.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
