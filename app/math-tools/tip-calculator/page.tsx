"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState<{
    tipAmount: number;
    totalAmount: number;
    perPerson: number;
    perPersonWithTip: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people);

    if (isNaN(bill) || isNaN(tip) || isNaN(numPeople)) {
      setError("Please enter valid numbers for all fields");
      setResult(null);
      return;
    }

    if (bill < 0 || tip < 0 || numPeople < 1) {
      setError("Values must be positive");
      setResult(null);
      return;
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = bill / numPeople;
    const perPersonWithTip = totalAmount / numPeople;

    setResult({
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
      perPersonWithTip: Math.round(perPersonWithTip * 100) / 100,
    });
    setError("");
  };

  const reset = () => {
    setBillAmount("");
    setTipPercent("15");
    setPeople("1");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setBillAmount("85.50");
    setTipPercent("18");
    setPeople("4");
    setResult(null);
  };

  const quickTips = [10, 15, 18, 20, 25];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Tip Calculator – Calculate Tip & Split Bill Online</h1>
        <p className="text-muted-foreground">
          Calculate the perfect tip and split your restaurant bill with our free online tip calculator. Enter bill amount, tip percentage, and number of people to split for instant results.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Bill Amount ($)</Label>
            <Input
              type="number"
              placeholder="e.g., 85.50"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
            />
          </div>
          <div>
            <Label>Tip Percentage (%)</Label>
            <Input
              type="number"
              placeholder="e.g., 15"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
            />
          </div>
          <div>
            <Label>Number of People</Label>
            <Input
              type="number"
              placeholder="e.g., 4"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Quick Tip Percentages</Label>
          <div className="flex flex-wrap gap-2">
            {quickTips.map((percent) => (
              <Button
                key={percent}
                variant={tipPercent === percent.toString() ? "default" : "outline"}
                size="sm"
                onClick={() => setTipPercent(percent.toString())}
              >
                {percent}%
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-muted rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Bill Amount:</span>
                    <span className="text-xl font-semibold">${parseFloat(billAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tip ({tipPercent}%):</span>
                    <span className="text-xl font-semibold text-primary">+${result.tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold">${result.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">People:</span>
                    <span className="text-xl font-semibold">{people}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Per Person (bill):</span>
                    <span className="text-xl font-semibold">${result.perPerson.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">Each Pays:</span>
                    <span className="text-2xl font-bold">${result.perPersonWithTip.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Breakdown</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                Tip Amount = Bill × Tip% = ${billAmount} × {tipPercent}% = ${result.tipAmount.toFixed(2)}<br />
                Total = Bill + Tip = ${billAmount} + ${result.tipAmount.toFixed(2)} = ${result.totalAmount.toFixed(2)}<br />
                Per Person = Total ÷ People = ${result.totalAmount.toFixed(2)} ÷ {people} = ${result.perPersonWithTip.toFixed(2)}
              </code>
            </div>

            {parseInt(people) > 1 && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Payment Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Each person's share of bill:</span>
                    <p className="font-semibold">${result.perPerson.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Each person's share of tip:</span>
                    <p className="font-semibold">${(result.tipAmount / parseInt(people)).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Tipping Guidelines</h2>
        <p className="text-muted-foreground">
          Tipping customs vary by country and service type. In the United States, tipping is expected at restaurants, bars, and for many personal services. These guidelines can help you determine appropriate tip amounts for different situations.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Standard Tip Percentages</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Restaurant Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>10%</strong> – Below average service</li>
              <li>• <strong>15%</strong> – Standard/average service</li>
              <li>• <strong>18%</strong> – Good service</li>
              <li>• <strong>20%</strong> – Excellent service</li>
              <li>• <strong>25%+</strong> – Exceptional service</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Other Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Bartenders:</strong> $1-2 per drink or 15-20%</li>
              <li>• <strong>Food delivery:</strong> 10-15% or $3-5 minimum</li>
              <li>• <strong>Taxi/rideshare:</strong> 15-20%</li>
              <li>• <strong>Hairdresser:</strong> 15-20%</li>
              <li>• <strong>Hotel housekeeping:</strong> $2-5 per night</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Tip Calculation Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Date Night Dinner</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Bill: $75, Tip: 18%, 2 people
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Tip = $75 × 18% = $13.50<br />
              Total = $75 + $13.50 = $88.50<br />
              Each pays = $88.50 ÷ 2 = $44.25
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Group Celebration</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Bill: $320, Tip: 20%, 8 people
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Tip = $320 × 20% = $64<br />
              Total = $320 + $64 = $384<br />
              Each pays = $384 ÷ 8 = $48
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Quick Lunch</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Bill: $24.50, Tip: 15%, 1 person
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Tip = $24.50 × 15% = $3.68<br />
              Total = $24.50 + $3.68 = $28.18
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Should I tip before or after tax?</h3>
            <p className="text-sm text-muted-foreground">
              Etiquette experts recommend tipping on the pre-tax amount, but many people tip on the total including tax. The difference is usually small. This calculator uses the bill amount you enter.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is 15% still the standard tip?</h3>
            <p className="text-sm text-muted-foreground">
              While 15% was traditional, 18-20% has become more common in recent years, especially in urban areas. Many servers rely on tips as a significant portion of their income.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Do I tip for takeout orders?</h3>
            <p className="text-sm text-muted-foreground">
              Tipping for takeout is optional but appreciated. 10% or a few dollars is reasonable if staff prepared and packaged your order. No tip is needed if you just pick up pre-paid orders.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I split a tip evenly?</h3>
            <p className="text-sm text-muted-foreground">
              Divide the total tip amount by the number of people. For example, a $30 tip split 4 ways = $7.50 per person. Our calculator shows this breakdown automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Percent calculations</p>
          </a>
          <a href="/math-tools/discount-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Discount Calculator</p>
            <p className="text-xs text-muted-foreground">Sale prices</p>
          </a>
          <a href="/math-tools/sales-tax-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Sales Tax Calculator</p>
            <p className="text-xs text-muted-foreground">Tax calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
