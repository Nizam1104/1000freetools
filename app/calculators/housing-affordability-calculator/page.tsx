"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HousingAffordabilityCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [monthlyDebts, setMonthlyDebts] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [propertyTax, setPropertyTax] = useState<string>("1.2");
  const [homeInsurance, setHomeInsurance] = useState<string>("");
  const [result, setResult] = useState<{
    maxMonthlyPayment: number;
    maxHomePrice: number;
    maxLoanAmount: number;
    estimatedMonthlyPayment: number;
  } | null>(null);

  const calculateAffordability = () => {
    const income = parseFloat(annualIncome);
    const debts = parseFloat(monthlyDebts) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    const propTax = parseFloat(propertyTax) / 100;
    const insurance = parseFloat(homeInsurance) || 0;

    if (isNaN(income) || isNaN(rate) || isNaN(term) || income <= 0 || rate <= 0 || term <= 0) {
      return;
    }

    const monthlyIncome = income / 12;
    const maxMonthlyPayment = monthlyIncome * 0.28 - debts;
    const maxPITIPayment = monthlyIncome * 0.36 - debts;

    // Calculate max loan based on 28% front-end ratio
    const maxPrincipalAndInterest = maxMonthlyPayment - (monthlyIncome * propTax / 12) - (insurance / 12);
    const maxLoanAmount = maxPrincipalAndInterest * (Math.pow(1 + rate, term) - 1) / (rate * Math.pow(1 + rate, term));
    const maxHomePrice = maxLoanAmount + down;

    // Calculate actual monthly payment
    const loanAmount = maxHomePrice - down;
    const principalAndInterest = loanAmount * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
    const estimatedMonthlyPayment = principalAndInterest + (maxHomePrice * propTax / 12) + (insurance / 12);

    setResult({
      maxMonthlyPayment: Math.max(0, maxMonthlyPayment),
      maxHomePrice,
      maxLoanAmount,
      estimatedMonthlyPayment,
    });
  };

  const reset = () => {
    setAnnualIncome("");
    setMonthlyDebts("");
    setDownPayment("");
    setInterestRate("");
    setLoanTerm("30");
    setPropertyTax("1.2");
    setHomeInsurance("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Housing Affordability Calculator</h1>
          <p className="text-muted-foreground">
            Find out how much home you can afford. Based on your income, existing debts, down payment, and standard lending ratios to give you a realistic price range.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Gross Income</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  placeholder="Enter annual income"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyDebts">Monthly Debt Payments</Label>
                <Input
                  id="monthlyDebts"
                  type="number"
                  placeholder="Car loans, credit cards, etc."
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="Enter down payment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  placeholder="Default 30"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyTax">Property Tax Rate (%)</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  placeholder="Default 1.2%"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeInsurance">Annual Home Insurance</Label>
                <Input
                  id="homeInsurance"
                  type="number"
                  placeholder="Enter annual premium"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateAffordability} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Maximum Home Price</p>
                    <p className="text-3xl font-bold text-primary">${result.maxHomePrice.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                      <p className="text-lg font-bold">${result.maxLoanAmount.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Max Monthly Payment</p>
                      <p className="text-lg font-bold">${result.maxMonthlyPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
                    <p className="text-lg font-bold text-orange-600">${result.estimatedMonthlyPayment.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on 28% front-end and 36% back-end debt-to-income ratios</p>
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
      </div>
    </div>
  );
}
