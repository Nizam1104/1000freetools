"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BuyVsRentCalculatorPage() {
  const [homePrice, setHomePrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [mortgageRate, setMortgageRate] = useState<string>("");
  const [mortgageTerm, setMortgageTerm] = useState<string>("30");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [appreciationRate, setAppreciationRate] = useState<string>("3");
  const [investmentReturn, setInvestmentReturn] = useState<string>("7");
  const [result, setResult] = useState<{
    buyTotalCost: number;
    buyNetWorth: number;
    rentTotalCost: number;
    rentInvestmentValue: number;
    buyBetter: boolean;
    difference: number;
  } | null>(null);

  const calculateBuyVsRent = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(mortgageRate) / 100 / 12;
    const term = parseFloat(mortgageTerm) * 12;
    const rent = parseFloat(monthlyRent);
    const appreciation = parseFloat(appreciationRate) / 100;
    const investReturn = parseFloat(investmentReturn) / 100 / 12;

    if (isNaN(price) || isNaN(down) || isNaN(rate) || isNaN(term) || isNaN(rent) || isNaN(appreciation) || isNaN(investReturn)) {
      return;
    }

    const loanAmount = price - down;
    const monthlyMortgage = loanAmount * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
    const propertyTax = price * 0.012 / 12;
    const insurance = price * 0.005 / 12;
    const maintenance = price * 0.01 / 12;
    const monthlyBuyCost = monthlyMortgage + propertyTax + insurance + maintenance;

    let buyTotalCost = down;
    let rentTotalCost = 0;
    let investmentValue = down;

    for (let month = 1; month <= term; month++) {
      buyTotalCost += monthlyBuyCost;
      rentTotalCost += rent;
      const rentDifference = monthlyBuyCost - rent;
      if (rentDifference > 0) {
        investmentValue = investmentValue * (1 + investReturn) + rentDifference;
      }
    }

    const homeValue = price * Math.pow(1 + appreciation, parseFloat(mortgageTerm));
    const remainingLoan = loanAmount * (Math.pow(1 + rate, term) - Math.pow(1 + rate, term / 2)) / (Math.pow(1 + rate, term) - 1);
    const buyNetWorth = homeValue - (remainingLoan > 0 ? remainingLoan : 0);

    const buyBetter = buyNetWorth > investmentValue;
    const difference = Math.abs(buyNetWorth - investmentValue);

    setResult({
      buyTotalCost,
      buyNetWorth,
      rentTotalCost,
      rentInvestmentValue: investmentValue,
      buyBetter,
      difference,
    });
  };

  const reset = () => {
    setHomePrice("");
    setDownPayment("");
    setMortgageRate("");
    setMortgageTerm("30");
    setMonthlyRent("");
    setAppreciationRate("3");
    setInvestmentReturn("7");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Buy vs Rent Calculator</h1>
          <p className="text-muted-foreground">
            Make a smarter housing decision. Compare the long-term financial outcome of buying versus renting a home, factoring in appreciation, opportunity cost, and expenses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price</Label>
                <Input
                  id="homePrice"
                  type="number"
                  placeholder="Enter home price"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
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
                <Label htmlFor="mortgageRate">Mortgage Rate (%)</Label>
                <Input
                  id="mortgageRate"
                  type="number"
                  placeholder="Enter interest rate"
                  value={mortgageRate}
                  onChange={(e) => setMortgageRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mortgageTerm">Mortgage Term (Years)</Label>
                <Input
                  id="mortgageTerm"
                  type="number"
                  placeholder="Default 30"
                  value={mortgageTerm}
                  onChange={(e) => setMortgageTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  placeholder="Enter monthly rent"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appreciationRate">Home Appreciation (%)</Label>
                <Input
                  id="appreciationRate"
                  type="number"
                  placeholder="Default 3%"
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentReturn">Investment Return (%)</Label>
                <Input
                  id="investmentReturn"
                  type="number"
                  placeholder="Default 7%"
                  value={investmentReturn}
                  onChange={(e) => setInvestmentReturn(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateBuyVsRent} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.buyBetter ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Better Option</p>
                    <p className={`text-2xl font-bold ${result.buyBetter ? 'text-green-600' : 'text-blue-600'}`}>
                      {result.buyBetter ? 'Buying' : 'Renting'} is better by ${result.difference.toFixed(2)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Buy Net Worth</p>
                      <p className="text-lg font-bold">${result.buyNetWorth.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Rent Investment Value</p>
                      <p className="text-lg font-bold">${result.rentInvestmentValue.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Includes mortgage, taxes, insurance, maintenance, and opportunity cost</p>
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
