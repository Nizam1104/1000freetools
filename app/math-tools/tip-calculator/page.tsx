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

  const loadExample = (example: { bill: string; tip: string; people: string }) => {
    setBillAmount(example.bill);
    setTipPercent(example.tip);
    setPeople(example.people);
    setResult(null);
    setError("");
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Load Example:</span>
          <Button variant="outline" size="sm" onClick={() => loadExample({ bill: "45.00", tip: "15", people: "2" })}>
            Date Night $45
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample({ bill: "127.50", tip: "18", people: "4" })}>
            Dinner for 4
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample({ bill: "89.99", tip: "20", people: "3" })}>
            20% Tip Example
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample({ bill: "250.00", tip: "22", people: "6" })}>
            Large Group
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample({ bill: "32.75", tip: "10", people: "1" })}>
            Solo Lunch
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample({ bill: "178.40", tip: "25", people: "5" })}>
            Excellent Service
          </Button>
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
                    <span className="text-muted-foreground">Each person&apos;s share of bill:</span>
                    <p className="font-semibold">${result.perPerson.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Each person&apos;s share of tip:</span>
                    <p className="font-semibold">${(result.tipAmount / parseInt(people)).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Tip Calculations</h2>
        <p className="text-muted-foreground">
          Tipping is a social custom where you voluntarily give extra money to service workers, typically in restaurants, bars, and personal service settings. In the United States, tips often make up a significant portion of a server&apos;s income, as base wages can be below minimum wage.
        </p>
        <p className="text-muted-foreground">
          The standard tip range for restaurant service is 15% to 20% of the pre-tax bill amount. For exceptional service, people often tip 25% or more. For quick service or counter service, 10% or a few dollars is common. The tip calculator helps you quickly determine the appropriate amount without mental math.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Calculate a Tip</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">The Basic Formula</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Tip Amount = Bill Amount × (Tip Percentage ÷ 100)
            </p>
            <p className="text-sm text-muted-foreground">
              For example, on a $50 bill with 18% tip: $50 × 0.18 = $9 tip. Total becomes $59.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Splitting the Bill</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Per Person = (Bill + Tip) ÷ Number of People
            </p>
            <p className="text-sm text-muted-foreground">
              If the total with tip is $118 and you&apos;re splitting among 4 people: $118 ÷ 4 = $29.50 per person.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Quick Mental Math Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• For 10%: Move the decimal point one place left ($47.50 → $4.75)</li>
              <li>• For 20%: Calculate 10%, then double it</li>
              <li>• For 15%: Calculate 10%, then add half of that amount</li>
              <li>• For 18%: Calculate 20%, then subtract 2%</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Example 1: Romantic Dinner for Two</div>
            <div className="text-sm text-muted-foreground">
              Bill: $85.50, Tip: 18%, Split: 2 people<br />
              Tip Amount: $85.50 × 0.18 = $15.39<br />
              Total: $85.50 + $15.39 = $100.89<br />
              Each Person: $100.89 ÷ 2 = $50.45
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Example 2: Family Dinner with Kids</div>
            <div className="text-sm text-muted-foreground">
              Bill: $127.00, Tip: 20%, Split: 4 people<br />
              Tip Amount: $127.00 × 0.20 = $25.40<br />
              Total: $127.00 + $25.40 = $152.40<br />
              Each Person: $152.40 ÷ 4 = $38.10
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Example 3: Large Group Celebration</div>
            <div className="text-sm text-muted-foreground">
              Bill: $342.75, Tip: 22%, Split: 8 people<br />
              Tip Amount: $342.75 × 0.22 = $75.41<br />
              Total: $342.75 + $75.41 = $418.16<br />
              Each Person: $418.16 ÷ 8 = $52.27
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Example 4: Quick Lunch Solo</div>
            <div className="text-sm text-muted-foreground">
              Bill: $18.50, Tip: 15%, Split: 1 person<br />
              Tip Amount: $18.50 × 0.15 = $2.78<br />
              Total: $18.50 + $2.78 = $21.28<br />
              Each Person: $21.28 ÷ 1 = $21.28
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Example 5: Business Lunch Expense</div>
            <div className="text-sm text-muted-foreground">
              Bill: $94.25, Tip: 25%, Split: 3 colleagues<br />
              Tip Amount: $94.25 × 0.25 = $23.56<br />
              Total: $94.25 + $23.56 = $117.81<br />
              Each Person: $117.81 ÷ 3 = $39.27
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact: The History of Tipping</h3>
        <p className="text-muted-foreground">
          Tipping originated in 16th century England, where wealthy hosts would give &quot;vails&quot; to servants of their guests. The practice spread to America in the late 1800s, initially as a way for the wealthy to display sophistication. By the 1920s, tipping had become standard in American restaurants. Today, the U.S. federal tipped minimum wage is $2.13 per hour, making tips essential income for millions of service workers.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the standard tip percentage for restaurants?</h4>
            <p className="text-sm text-muted-foreground">
              The standard range is 15% to 20% of the pre-tax bill. For average service, 15% is acceptable. For good service, 18-20% is customary. For exceptional service, 22-25% shows appreciation. Many people now tip 20% as the new baseline.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I tip on the pre-tax or post-tax amount?</h4>
            <p className="text-sm text-muted-foreground">
              Etiquette experts recommend tipping on the pre-tax amount, since tax isn&apos;t a service provided by your server. However, many people simply tip on the total for convenience. On a $100 bill with $8 tax, the difference between tipping on $100 vs $108 at 18% is only $1.44.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I split a tip evenly among friends?</h4>
            <p className="text-sm text-muted-foreground">
              Add the bill and tip together, then divide by the number of people. For a $150 bill with 20% tip ($30), the total is $180. Split among 6 people: $180 ÷ 6 = $30 each. This ensures everyone pays their fair share including tip.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is it rude to ask for separate checks?</h4>
            <p className="text-sm text-muted-foreground">
              It depends on the restaurant and timing. Asking before ordering is generally fine. Some restaurants automatically split checks for large groups. For groups over 6-8 people, many restaurants add an automatic gratuity (usually 18-20%), so check your bill before adding extra tip.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do I need to tip more for large groups?</h4>
            <p className="text-sm text-muted-foreground">
              Many restaurants automatically add 18-20% gratuity for parties of 6 or more. Check your bill before adding extra. If no automatic tip is added, consider tipping 20% or slightly more since serving large groups requires more work.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What about tipping for takeout or delivery?</h4>
            <p className="text-sm text-muted-foreground">
              For takeout, 10% or $2-5 is appreciated since staff still pack your order. For delivery, tip 15-20% like restaurant dining, with a $3-5 minimum. During bad weather or for large orders, consider tipping more.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate tip if I only have cash?</h4>
            <p className="text-sm text-muted-foreground">
              Round your bill to a convenient number, then calculate. For a $47 bill at 18%, round to $50. Ten percent is $5, so 20% would be $10. Eighteen percent is roughly $8.50. Leave $8-9 cash on the table or hand it to your server.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate any percentage</p>
          </a>
          <a href="/math-tools/split-bill-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Split Bill Calculator</p>
            <p className="text-xs text-muted-foreground">Divide bills evenly</p>
          </a>
          <a href="/math-tools/discount-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Discount Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate sale prices</p>
          </a>
        </div>
      </section>
    </div>
  );
}
