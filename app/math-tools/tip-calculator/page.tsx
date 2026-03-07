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

    </div>
  );
}
