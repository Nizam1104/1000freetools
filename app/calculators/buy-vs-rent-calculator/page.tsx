"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-medium">Enter your home buying costs</p>
                    <p className="text-sm text-muted-foreground">Input the home price, down payment, mortgage rate, and term to calculate total buying costs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-medium">Add your rental alternative</p>
                    <p className="text-sm text-muted-foreground">Enter the monthly rent for a comparable property to compare against buying costs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-medium">See which option builds more wealth</p>
                    <p className="text-sm text-muted-foreground">Compare net worth from home equity versus investing the down payment and monthly savings.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Factors in the Buy vs Rent Decision</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Home Appreciation</p>
                  <p className="text-sm text-muted-foreground">Historical average of 3-4% annually, but varies significantly by location and market conditions.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Opportunity Cost</p>
                  <p className="text-sm text-muted-foreground">Money tied up in down payment could earn returns if invested in stocks or bonds instead.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Maintenance Costs</p>
                  <p className="text-sm text-muted-foreground">Homeowners typically spend 1-2% of home value annually on repairs and maintenance.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Flexibility Value</p>
                  <p className="text-sm text-muted-foreground">Renting offers mobility; buying builds equity but reduces flexibility to relocate.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Buy vs Rent Break-Even Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Factor</th>
                      <th className="text-left p-2">Favors Buying</th>
                      <th className="text-left p-2">Favors Renting</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Time Horizon</td>
                      <td className="p-2">5+ years</td>
                      <td className="p-2">Less than 3 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Price-to-Rent Ratio</td>
                      <td className="p-2">Below 15</td>
                      <td className="p-2">Above 20</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Down Payment</td>
                      <td className="p-2">20% or more</td>
                      <td className="p-2">Less than 10%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Market Trend</td>
                      <td className="p-2">Rising home values</td>
                      <td className="p-2">Flat or declining</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Job Stability</td>
                      <td className="p-2">Stable, local job</td>
                      <td className="p-2">May relocate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">How long should I plan to stay to make buying worth it?</p>
                  <p className="text-sm text-muted-foreground mt-1">Generally, you need to stay 5-7 years to break even after accounting for closing costs, agent fees, and maintenance. Shorter timeframes usually favor renting.</p>
                </div>
                <div>
                  <p className="font-medium">What is the price-to-rent ratio and why does it matter?</p>
                  <p className="text-sm text-muted-foreground mt-1">Divide home price by annual rent. Ratios below 15 favor buying; above 20 favor renting. This metric helps identify overpriced housing markets.</p>
                </div>
                <div>
                  <p className="font-medium">Should I consider tax benefits when comparing buy vs rent?</p>
                  <p className="text-sm text-muted-foreground mt-1">Yes, mortgage interest and property tax deductions can reduce the effective cost of buying, especially in high-tax states. However, the standard deduction has reduced this benefit for many homeowners.</p>
                </div>
                <div>
                  <p className="font-medium">What hidden costs should I consider when buying?</p>
                  <p className="text-sm text-muted-foreground mt-1">Include closing costs (2-5% of purchase price), property taxes, homeowners insurance, HOA fees, maintenance (1-2% annually), and potential special assessments.</p>
                </div>
                <div>
                  <p className="font-medium">Is renting really throwing money away?</p>
                  <p className="text-sm text-muted-foreground mt-1">No. Renting buys flexibility and avoids maintenance costs. The difference between renting and buying costs can be invested, potentially outperforming home appreciation in some markets.</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
