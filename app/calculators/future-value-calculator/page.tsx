"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function FutureValueCalculatorPage() {
  const [presentValue, setPresentValue] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    futureValue: number;
    interestEarned: number;
  } | null>(null);

  const calculateFutureValue = () => {
    const PV = parseFloat(presentValue);
    const R = parseFloat(interestRate) / 100;
    const T = parseFloat(timePeriod);

    if (isNaN(PV) || isNaN(R) || isNaN(T) || PV <= 0 || R < 0 || T <= 0) {
      return;
    }

    const futureValue = PV * Math.pow(1 + R, T);
    const interestEarned = futureValue - PV;

    setResult({ futureValue, interestEarned });
  };

  const reset = () => {
    setPresentValue("");
    setInterestRate("");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Future Value Calculator</h1>
          <p className="text-muted-foreground">
            Project how much your savings or investment will grow over time. Enter the current amount, expected return rate, and time horizon to see your future wealth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="presentValue">Current Amount (Present Value)</Label>
                <Input
                  id="presentValue"
                  type="number"
                  placeholder="Enter current amount"
                  value={presentValue}
                  onChange={(e) => setPresentValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Expected Annual Return (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter expected return rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timePeriod">Time Horizon (Years)</Label>
                <Input
                  id="timePeriod"
                  type="number"
                  placeholder="Enter time period in years"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateFutureValue} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Future Value</p>
                    <p className="text-3xl font-bold text-primary">${result.futureValue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Interest Earned</p>
                    <p className="text-xl font-bold">${result.interestEarned.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: FV = PV × (1 + r)^t</p>
                    <p className="mt-1">
                      Your ${parseFloat(presentValue).toFixed(2)} grows to ${result.futureValue.toFixed(2)} in {timePeriod} years at {interestRate}%
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Future Value Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your current savings or investment</p>
                    <p>Input the present value - the amount you have today or plan to invest. This is your starting principal before any growth.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your expected annual return</p>
                    <p>Enter the annual rate of return you expect. Conservative investments might yield 3-5%, while stock market averages around 7-10% historically.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose your time horizon</p>
                    <p>Enter the number of years until you need the money. Longer time horizons allow more compound growth but also carry more risk.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Historical Investment Returns Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Investment Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Average Annual Return</th>
                      <th className="text-left py-3 px-2 font-semibold">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Savings account</td>
                      <td className="py-3 px-2">0.5-2%</td>
                      <td className="py-3 px-2">Very Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Certificate of Deposit (CD)</td>
                      <td className="py-3 px-2">2-4%</td>
                      <td className="py-3 px-2">Very Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Government bonds</td>
                      <td className="py-3 px-2">3-5%</td>
                      <td className="py-3 px-2">Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Corporate bonds</td>
                      <td className="py-3 px-2">4-6%</td>
                      <td className="py-3 px-2">Low-Medium</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">S&P 500 Index</td>
                      <td className="py-3 px-2">7-10%</td>
                      <td className="py-3 px-2">Medium-High</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Real estate (REITs)</td>
                      <td className="py-3 px-2">6-9%</td>
                      <td className="py-3 px-2">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Past performance does not guarantee future results. Returns vary year to year. Higher returns typically come with higher risk.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Future Value and Compound Interest
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Future Value Formula</h4>
                  <p>
                    Future value is calculated as FV = PV x (1 + r)^t, where PV is present value, r is the
                    annual interest rate (as a decimal), and t is time in years. For example, $10,000 invested
                    at 7% for 10 years becomes $10,000 x (1.07)^10 = $19,672. Your money nearly doubles.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Compound Interest Works</h4>
                  <p>
                    Compound interest means you earn returns on your returns. Year one: $10,000 at 7% earns
                    $700. Year two: $10,700 earns $749. Year three: $11,449 earns $801. The dollar amount
                    of growth increases each year even though the rate stays the same. This is why starting
                    early matters so much for retirement savings.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Rule of 72</h4>
                  <p>
                    A quick way to estimate doubling time: divide 72 by your annual return rate. At 7%,
                    money doubles in about 72/7 = 10.3 years. At 10%, it doubles in 7.2 years. At 3%,
                    it takes 24 years. This rule helps you quickly compare investment options and time horizons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Maximizing Investment Growth
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start investing as early as possible</p>
                    <p>Time is the most powerful factor in compound growth. $5,000 invested at age 25 grows to $74,872 by 65 at 7%. The same $5,000 invested at 35 grows to only $38,061. A 10-year head start nearly doubles the result.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Keep fees low</p>
                    <p>Investment fees compound against you just like returns compound for you. A 1% annual fee reduces a 7% return to 6%. Over 30 years, this cuts your final balance by about 25%. Choose low-cost index funds when possible.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reinvest all dividends and distributions</p>
                    <p>Dividend reinvestment buys more shares, which generate more dividends. This accelerates compounding. Many brokerages offer automatic dividend reinvestment plans (DRIPs) at no cost.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use tax-advantaged accounts</p>
                    <p>401(k)s, IRAs, and Roth IRAs shield investment growth from taxes. Tax-deferred accounts let your full balance compound without annual tax drag. This can add 20-30% to long-term results compared to taxable accounts.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is a realistic rate of return for investments?",
    answer: "The S&P 500 has averaged about 10% annually before inflation (7% after inflation) over the long term. However, returns vary significantly year to year. Conservative portfolios with bonds might target 4-6%. High-growth stock portfolios might aim for 8-12% with higher volatility. Never assume guaranteed returns.",
  },
{
    question: "How does inflation affect future value?",
    answer: "Inflation reduces purchasing power over time. At 3% inflation, $100,000 today buys only $74,000 worth of goods in 10 years. To calculate real (inflation-adjusted) future value, subtract inflation from your nominal return. A 7% return with 3% inflation gives 4% real growth.",
  },
{
    question: "Should I use this calculator for retirement planning?",
    answer: "This calculator works for single lump-sum investments. For retirement planning with regular contributions, use a future value with contributions calculator. Most retirement planning involves both an existing balance and ongoing monthly or annual contributions.",
  },
{
    question: "What is the difference between simple and compound interest?",
    answer: "Simple interest pays only on the original principal. $10,000 at 5% simple interest earns $500 every year regardless of time. Compound interest pays on principal plus accumulated interest. The same $10,000 at 5% compound earns $500 year one, $525 year two, $551 year three, and so on. Compound growth accelerates over time.",
  },
{
    question: "How accurate are future value projections?",
    answer: "Future value calculations are mathematically precise but based on assumptions that may not hold. Markets do not return steady annual rates. Actual returns fluctuate widely. Use these projections as planning guides, not guarantees. Plan conservatively and adjust expectations as circumstances change.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
