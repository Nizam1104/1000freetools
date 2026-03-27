"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function LumpSumVsSIPAnalyzerPage() {
  const [lumpSumAmount, setLumpSumAmount] = useState<string>("");
  const [monthlySIP, setMonthlySIP] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<{
    lumpSumValue: number;
    sipValue: number;
    totalSIPInvested: number;
    betterOption: string;
    difference: number;
  } | null>(null);

  const calculateComparison = () => {
    const lumpSum = parseFloat(lumpSumAmount);
    const sip = parseFloat(monthlySIP);
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const totalYears = parseFloat(years);
    const months = totalYears * 12;

    if (isNaN(lumpSum) || isNaN(sip) || isNaN(rate) || isNaN(totalYears) || lumpSum <= 0 || sip <= 0 || totalYears <= 0) {
      return;
    }

    const lumpSumValue = lumpSum * Math.pow(1 + rate, months);
    const sipValue = sip * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
    const totalSIPInvested = sip * months;
    const difference = lumpSumValue - sipValue;
    const betterOption = difference >= 0 ? "Lump Sum" : "SIP";

    setResult({
      lumpSumValue,
      sipValue,
      totalSIPInvested,
      betterOption,
      difference: Math.abs(difference),
    });
  };

  const reset = () => {
    setLumpSumAmount("");
    setMonthlySIP("");
    setExpectedReturn("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Lump Sum vs SIP Analyzer</h1>
          <p className="text-muted-foreground">
            Compare investing all at once versus spreading it out monthly. Analyze the final corpus from a lump sum investment versus an equivalent total via monthly SIP.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lumpSumAmount">Lump Sum Amount</Label>
                <Input
                  id="lumpSumAmount"
                  type="number"
                  placeholder="Enter lump sum"
                  value={lumpSumAmount}
                  onChange={(e) => setLumpSumAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlySIP">Monthly SIP Amount</Label>
                <Input
                  id="monthlySIP"
                  type="number"
                  placeholder="Enter monthly SIP"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Investment Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  placeholder="Enter years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateComparison} className="flex-1">
                  Compare
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
                  <div className={`p-4 rounded-lg ${result.betterOption === 'Lump Sum' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Better Option</p>
                    <p className={`text-2xl font-bold ${result.betterOption === 'Lump Sum' ? 'text-green-600' : 'text-blue-600'}`}>
                      {result.betterOption} by ${result.difference.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Lump Sum Value</p>
                      <p className="text-xl font-bold text-green-600">${result.lumpSumValue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">SIP Value</p>
                      <p className="text-xl font-bold text-blue-600">${result.sipValue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total SIP Investment</p>
                    <p className="text-lg font-bold">${result.totalSIPInvested.toLocaleString()}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Lump sum typically outperforms in rising markets; SIP reduces timing risk</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Compare to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Lump Sum vs SIP Analyzer
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your investment amounts</p>
                    <p>Input the lump sum amount you could invest today and the monthly SIP amount you could afford. These can be independent values based on your situation.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set expected return and period</p>
                    <p>Enter your expected annual return rate (historically 10-12% for equity mutual funds) and the investment period in years.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compare the results</p>
                    <p>See which option gives a higher corpus, the final values for both approaches, and the total amount invested through SIP.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Lump Sum vs SIP Comparison Examples
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Lump Sum</th>
                      <th className="text-left py-3 px-2 font-semibold">Monthly SIP</th>
                      <th className="text-left py-3 px-2 font-semibold">Period</th>
                      <th className="text-left py-3 px-2 font-semibold">Return</th>
                      <th className="text-left py-3 px-2 font-semibold">Lump Sum Value</th>
                      <th className="text-left py-3 px-2 font-semibold">SIP Value</th>
                      <th className="text-left py-3 px-2 font-semibold">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">$10,000</td>
                      <td className="py-3 px-2">$500</td>
                      <td className="py-3 px-2">10 years</td>
                      <td className="py-3 px-2">12%</td>
                      <td className="py-3 px-2">$31,058</td>
                      <td className="py-3 px-2">$116,170</td>
                      <td className="py-3 px-2">SIP</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$50,000</td>
                      <td className="py-3 px-2">$2,000</td>
                      <td className="py-3 px-2">15 years</td>
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">$208,862</td>
                      <td className="py-3 px-2">$836,071</td>
                      <td className="py-3 px-2">SIP</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$100,000</td>
                      <td className="py-3 px-2">$0</td>
                      <td className="py-3 px-2">20 years</td>
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">$672,750</td>
                      <td className="py-3 px-2">$0</td>
                      <td className="py-3 px-2">Lump Sum</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">$25,000</td>
                      <td className="py-3 px-2">$1,000</td>
                      <td className="py-3 px-2">5 years</td>
                      <td className="py-3 px-2">8%</td>
                      <td className="py-3 px-2">$36,733</td>
                      <td className="py-3 px-2">$73,484</td>
                      <td className="py-3 px-2">SIP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: SIP values shown are for equivalent total investment periods. Lump sum benefits from longer compounding; SIP benefits from rupee cost averaging and disciplined investing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Lump Sum and SIP Investing
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Lump sum investing means putting all your money to work at once. This approach maximizes time in the market — every dollar starts compounding immediately. Historical data shows lump sum investing outperforms dollar-cost averaging about two-thirds of the time, simply because markets tend to rise over time.
                </p>
                <p>
                  SIP (Systematic Investment Plan) spreads your investment across regular intervals. You buy more units when prices are low and fewer when prices are high. This rupee cost averaging reduces the impact of market volatility and removes the stress of timing the market.
                </p>
                <p>
                  The choice depends on your situation. If you received a bonus, inheritance, or maturity amount all at once, lump sum investing could be optimal. If you're investing from regular income, SIP is more practical and builds discipline. Many investors use both approaches — lump sum for windfalls and SIP for ongoing savings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Investment Strategy Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Time in Market Beats Timing Market</p>
                    <p>Waiting for the "perfect" entry point often means missing gains. Studies show that being invested consistently outperforms trying to time market dips. Start early and stay invested.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Increase SIP with Income Growth</p>
                    <p>Step up your SIP by 10% every year when you get a raise. This small habit dramatically increases your corpus. A $500 monthly SIP that grows 10% annually at 12% return becomes 3x larger in 20 years compared to a flat SIP.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Don't Stop SIP During Market Falls</p>
                    <p>Market downturns are when SIPs earn their keep. You accumulate more units at lower prices. Investors who paused SIPs during the 2008 crash or 2020 pandemic missed the recovery gains. Stay disciplined through volatility.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Match Investment to Goals</p>
                    <p>Use lump sum for long-term goals (10+ years) where volatility smooths out. Prefer SIP for medium-term goals (3-7 years) to reduce timing risk. For goals under 3 years, consider debt instruments instead of equity.</p>
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
    question: "Which is better: lump sum or SIP?",
    answer: "Lump sum typically generates higher returns because money stays invested longer. However, SIP reduces the risk of investing everything at a market peak. If you have a large amount available and a long time horizon, lump sum wins statistically. If you're investing from salary or worried about timing, SIP provides peace of mind.",
  },
{
    question: "Can I do both lump sum and SIP?",
    answer: "Absolutely. Many investors use a hybrid approach: invest a windfall as lump sum while continuing SIP from regular income. You could also split a large amount — invest 50% as lump sum and spread the rest over 6-12 months through STP (Systematic Transfer Plan) from a liquid fund.",
  },
{
    question: "What return rate should I assume?",
    answer: "For equity mutual funds, 10-12% annually is reasonable over 10+ year periods. Large-cap funds may return 9-11%, while mid-cap and small-cap funds could return 12-15% with higher volatility. Debt funds typically return 6-8%. Always use conservative estimates for planning.",
  },
{
    question: "How long should I continue my SIP?",
    answer: "Minimum 5 years for equity SIPs to ride out market cycles. Ideally 10+ years for significant wealth creation. There's no maximum — many investors continue SIPs throughout their earning years and only start withdrawals in retirement. The key is consistency, not timing.",
  },
{
    question: "What happens if I miss an SIP payment?",
    answer: "Missing one payment isn't catastrophic, but it breaks discipline. Most funds allow a 30-day grace period. If you miss consistently, the fund may cancel the SIP mandate. Set up auto-debit and maintain buffer in your bank account. If cash flow is tight, reduce the SIP amount rather than skipping payments.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
