"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
