"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CarLoanAffordabilityCalculatorPage() {
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [tradeInValue, setTradeInValue] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [loanTerm, setLoanTerm] = useState<string>("60");
  const [salesTax, setSalesTax] = useState<string>("7");
  const [result, setResult] = useState<{
    maxLoanAmount: number;
    maxCarPrice: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  const calculate = () => {
    const payment = parseFloat(monthlyPayment);
    const down = parseFloat(downPayment) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const term = parseFloat(loanTerm);
    const tax = parseFloat(salesTax) / 100;

    if (isNaN(payment) || isNaN(rate) || isNaN(term) || payment <= 0 || term <= 0) return;

    // Calculate maximum loan amount using present value of annuity formula
    // PV = PMT × [(1 - (1 + r)^-n) / r]
    const maxLoan = payment * ((1 - Math.pow(1 + rate, -term)) / rate);

    // Calculate maximum car price before tax and fees
    const maxPriceBeforeTax = maxLoan + down + tradeIn;

    // Calculate car price including sales tax
    // Price + Tax = MaxPriceBeforeTax, so Price = MaxPriceBeforeTax / (1 + tax)
    const maxCarPrice = maxPriceBeforeTax / (1 + tax);

    const totalPaid = payment * term;
    const totalInterest = totalPaid - maxLoan;
    const totalCost = totalPaid + down + tradeIn;

    setResult({
      maxLoanAmount: Math.round(maxLoan),
      maxCarPrice: Math.round(maxCarPrice),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
    });
  };

  const reset = () => {
    setMonthlyPayment("");
    setDownPayment("");
    setTradeInValue("");
    setInterestRate("6.5");
    setLoanTerm("60");
    setSalesTax("7");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Car Loan Affordability Calculator – Find Out What Car You Can Afford
          </h1>
          <p className="text-muted-foreground">
            Use our Car Loan Affordability Calculator to determine your monthly payment and total
            interest before buying a car. Enter the loan amount, annual interest rate, and repayment
            term to plan your auto financing with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyPayment">Monthly Payment Budget ($)</Label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  placeholder="e.g., 400"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="e.g., 5000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradeInValue">Trade-In Value ($)</Label>
                <Input
                  id="tradeInValue"
                  type="number"
                  placeholder="e.g., 3000"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="6.5"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Current average: 6-8% for new cars
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (Months)</Label>
                <Select value={loanTerm} onValueChange={setLoanTerm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="36">36 months (3 years)</SelectItem>
                    <SelectItem value="48">48 months (4 years)</SelectItem>
                    <SelectItem value="60">60 months (5 years)</SelectItem>
                    <SelectItem value="72">72 months (6 years)</SelectItem>
                    <SelectItem value="84">84 months (7 years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesTax">Sales Tax (%)</Label>
                <Input
                  id="salesTax"
                  type="number"
                  placeholder="7"
                  step="0.1"
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Affordability Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Maximum Car Price</p>
                    <p className="text-3xl font-bold text-primary">${result.maxCarPrice.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                      <p className="text-lg font-bold">${result.maxLoanAmount.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold">${result.totalInterest.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Cost (with interest)</p>
                    <p className="text-xl font-bold">${result.totalCost.toLocaleString()}</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Tip:</strong> A 20% down payment and 60-month term or less is
                      recommended to avoid being upside-down on your loan.
                    </p>
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

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">How Car Loan Affordability Is Calculated</h3>
          <p className="text-muted-foreground text-sm mb-3">
            The calculator uses the present value of annuity formula to determine how much you can
            borrow based on your monthly payment budget:
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Max Loan = Payment × [(1 - (1 + r)^-n) / r]</div>
            <div>Where: r = monthly interest rate, n = number of months</div>
            <div>Max Car Price = (Max Loan + Down Payment + Trade-In) / (1 + Tax Rate)</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Rule of thumb:</strong> Keep your total auto expenses (payment + insurance +
            fuel) under 15% of your monthly take-home pay.
          </p>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Car Loan Affordability</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Your Budget</h3>
                  <p className="text-muted-foreground text-sm">Input your comfortable monthly payment amount along with down payment and trade-in value.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Set Loan Terms</h3>
                  <p className="text-muted-foreground text-sm">Specify the interest rate and loan term (36-84 months) based on your credit and lender offers.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">See Your Buying Power</h3>
                  <p className="text-muted-foreground text-sm">Get your maximum car price, loan amount, and total interest to make an informed purchase decision.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Use This Car Affordability Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">💰 Real Budget Planning</h3>
                <p className="text-muted-foreground text-sm">Know exactly what car price fits your budget before visiting the dealership, preventing overspending and buyer's remorse.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Total Cost Transparency</h3>
                <p className="text-muted-foreground text-sm">See the full picture including total interest paid over the loan term, not just the monthly payment.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🚗 Trade-In & Down Payment</h3>
                <p className="text-muted-foreground text-sm">Account for your trade-in value and down payment to maximize your purchasing power accurately.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📈 Sales Tax Included</h3>
                <p className="text-muted-foreground text-sm">Factor in your local sales tax rate for a realistic maximum car price before taxes and fees.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Auto Loan Term Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Loan Term</th>
                    <th className="text-left py-3 px-4">Monthly Payment</th>
                    <th className="text-left py-3 px-4">Total Interest</th>
                    <th className="text-left py-3 px-4">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">36 months</td>
                    <td className="py-3 px-4">Highest</td>
                    <td className="py-3 px-4">Lowest</td>
                    <td className="py-3 px-4">Best value, quick payoff</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">48 months</td>
                    <td className="py-3 px-4">High</td>
                    <td className="py-3 px-4">Low</td>
                    <td className="py-3 px-4">Balanced option</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">60 months</td>
                    <td className="py-3 px-4">Moderate</td>
                    <td className="py-3 px-4">Moderate</td>
                    <td className="py-3 px-4">Most common term</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">72 months</td>
                    <td className="py-3 px-4">Lower</td>
                    <td className="py-3 px-4">Higher</td>
                    <td className="py-3 px-4">Lower monthly payment</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">84 months</td>
                    <td className="py-3 px-4">Lowest</td>
                    <td className="py-3 px-4">Highest</td>
                    <td className="py-3 px-4">Maximum affordability</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Car Loan Affordability FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the 20/4/10 rule for car buying?</h3>
                <p className="text-muted-foreground text-sm">The 20/4/10 rule suggests: 20% down payment, 4-year (48 month) loan term, and total auto expenses under 10% of gross income. This prevents being upside-down on your loan.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How much car can I afford on $500/month?</h3>
                <p className="text-muted-foreground text-sm">At 6% interest for 60 months with $5,000 down, a $500/month payment gets you approximately $28,000-$30,000 total car price including tax and fees.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Is a 72-month car loan a bad idea?</h3>
                <p className="text-muted-foreground text-sm">Longer loans mean lower payments but more interest and higher risk of being upside-down. If you need 72+ months, consider a less expensive vehicle.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Should I include trade-in value in my calculation?</h3>
                <p className="text-muted-foreground text-sm">Yes! Your trade-in acts like a down payment, reducing the loan amount needed. This calculator includes trade-in value to show your true buying power.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What credit score do I need for good car loan rates?</h3>
                <p className="text-muted-foreground text-sm">Scores above 720 typically qualify for the best rates (3-5%). Scores 660-719 get average rates (5-8%). Below 660 may face higher rates (10%+).</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
