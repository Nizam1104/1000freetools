"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmergencyFundCalculatorPage() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [monthsOfCoverage, setMonthsOfCoverage] = useState<string>("");
  const [result, setResult] = useState<{
    emergencyFundSize: number;
  } | null>(null);

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    const months = parseFloat(monthsOfCoverage);

    if (isNaN(expenses) || isNaN(months) || expenses <= 0 || months <= 0) {
      return;
    }

    const emergencyFundSize = expenses * months;

    setResult({ emergencyFundSize });
  };

  const reset = () => {
    setMonthlyExpenses("");
    setMonthsOfCoverage("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Emergency Fund Calculator</h1>
          <p className="text-muted-foreground">
            Find out how large your emergency fund should be. Enter your monthly expenses and desired months of coverage to get your recommended safety net target.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  placeholder="Enter monthly expenses"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthsOfCoverage">Months of Coverage</Label>
                <Input
                  id="monthsOfCoverage"
                  type="number"
                  placeholder="Enter desired months (3-12 recommended)"
                  value={monthsOfCoverage}
                  onChange={(e) => setMonthsOfCoverage(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEmergencyFund} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommended Emergency Fund</p>
                    <p className="text-3xl font-bold text-primary">${result.emergencyFundSize.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                    <p className="text-xl font-bold">${parseFloat(monthlyExpenses).toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {monthsOfCoverage} months of coverage</p>
                    <p className="mt-1">Financial experts recommend 3-6 months of expenses as emergency fund</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Your Emergency Fund</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Calculate Monthly Expenses</h3>
              <p className="text-sm text-muted-foreground">Add up all essential monthly costs including rent, utilities, groceries, insurance, and minimum debt payments.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Choose Coverage Period</h3>
              <p className="text-sm text-muted-foreground">Select 3-6 months for most people, or up to 12 months if you have irregular income or dependents.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Get Your Target Amount</h3>
              <p className="text-sm text-muted-foreground">Multiply your monthly expenses by the number of months to find your emergency fund goal.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Emergency Fund Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Personalized Recommendations
              </h3>
              <p className="text-sm text-muted-foreground">Get a tailored emergency fund target based on your actual spending, not generic advice.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Flexible Coverage Options
              </h3>
              <p className="text-sm text-muted-foreground">Adjust the months of coverage to match your job security, income stability, and risk tolerance.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Instant Results
              </h3>
              <p className="text-sm text-muted-foreground">See your emergency fund target immediately with no sign-up or personal information required.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Expert Guidelines Included
              </h3>
              <p className="text-sm text-muted-foreground">Built-in recommendations based on financial advisor standards for emergency savings.</p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Recommended Emergency Fund by Situation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Financial Situation</th>
                    <th className="text-left py-2">Recommended Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Dual income, stable jobs</td>
                    <td className="py-2">3-4 months</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Single income household</td>
                    <td className="py-2">6 months</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Self-employed/contractor</td>
                    <td className="py-2">6-12 months</td>
                  </tr>
                  <tr>
                    <td className="py-2">One income with dependents</td>
                    <td className="py-2">6-12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How much emergency fund do I really need?</h3>
              <p className="text-sm text-muted-foreground">Most financial experts recommend 3-6 months of essential expenses. If you have a stable job and dual income, 3-4 months may suffice. Self-employed individuals or single-income households should aim for 6-12 months.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Should I include discretionary spending in my emergency fund calculation?</h3>
              <p className="text-sm text-muted-foreground">No, focus on essential expenses only: housing, utilities, groceries, insurance, minimum debt payments, and necessary transportation. Emergency funds are for necessities during income disruption.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Where should I keep my emergency fund?</h3>
              <p className="text-sm text-muted-foreground">Keep emergency savings in a high-yield savings account or money market fund where it's easily accessible but earns some interest. Avoid investing in stocks or locking it in CDs with early withdrawal penalties.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Can I use my emergency fund for non-emergencies?</h3>
              <p className="text-sm text-muted-foreground">Emergency funds should only be used for true emergencies: job loss, medical emergencies, major car repairs, or urgent home repairs. Planned expenses like vacations or holiday gifts should come from separate savings.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How long does it take to build an emergency fund?</h3>
              <p className="text-sm text-muted-foreground">Timeline varies based on income and expenses. Start with a $1,000 mini emergency fund, then aim to save 10-20% of income until you reach your target. Many people build a full emergency fund in 6-24 months.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
