"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompoundingFrequencyComparisonPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    frequencies: Array<{
      name: string;
      n: number;
      finalAmount: number;
      interest: number;
    }>;
  } | null>(null);

  const calculateComparison = () => {
    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 100;
    const T = parseFloat(timePeriod);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      return;
    }

    const frequencies = [
      { name: "Annually", n: 1 },
      { name: "Semi-Annually", n: 2 },
      { name: "Quarterly", n: 4 },
      { name: "Monthly", n: 12 },
      { name: "Weekly", n: 52 },
      { name: "Daily", n: 365 },
    ];

    const calculatedFrequencies = frequencies.map((freq) => {
      const finalAmount = P * Math.pow(1 + R / freq.n, freq.n * T);
      const interest = finalAmount - P;
      return { ...freq, finalAmount, interest };
    });

    setResult({ frequencies: calculatedFrequencies });
  };

  const reset = () => {
    setPrincipal("");
    setInterestRate("");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Compounding Frequency Comparison Calculator</h1>
          <p className="text-muted-foreground">
            Visualize how compounding frequency affects your returns. Compare daily, monthly, quarterly, and annual compounding side by side for the same principal and rate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Principal Amount</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter principal amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timePeriod">Time Period (Years)</Label>
                <Input
                  id="timePeriod"
                  type="number"
                  placeholder="Enter time period in years"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">Results Comparison</h3>
              {result ? (
                <div className="space-y-3">
                  {result.frequencies.map((freq, index) => (
                    <div
                      key={freq.name}
                      className={`p-4 rounded-lg border-2 ${index === result.frequencies.length - 1
                          ? "border-primary bg-primary/5"
                          : "border-border"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{freq.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {freq.n} time{freq.n > 1 ? "s" : ""}/year
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${freq.finalAmount.toFixed(2)}</p>
                          <p className="text-sm text-green-600">+${freq.interest.toFixed(2)}</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${(freq.finalAmount / result.frequencies[result.frequencies.length - 1].finalAmount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>
                      Best option: <strong>Daily</strong> compounding gives you an extra{" "}
                      <strong>
                        ${(
                          result.frequencies[result.frequencies.length - 1].interest -
                          result.frequencies[0].interest
                        ).toFixed(2)}
                      </strong>{" "}
                      compared to annual compounding.
                    </p>
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

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Compare Compounding Frequencies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Investment Details</h3>
                  <p className="text-muted-foreground text-sm">Input your principal amount, annual interest rate, and investment time period.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Compare All Frequencies</h3>
                  <p className="text-muted-foreground text-sm">See results for annual, semi-annual, quarterly, monthly, weekly, and daily compounding.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Find Best Option</h3>
                  <p className="text-muted-foreground text-sm">Identify which compounding frequency maximizes your returns with visual comparison.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Compounding Frequency Matters</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📈 Maximize Investment Returns</h3>
                <p className="text-muted-foreground text-sm">More frequent compounding means interest earns interest sooner, resulting in higher final amounts over time.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💰 Side-by-Side Comparison</h3>
                <p className="text-muted-foreground text-sm">See all compounding options at once to understand the real impact of frequency on your returns.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🏦 Bank Account Selection</h3>
                <p className="text-muted-foreground text-sm">Compare savings accounts, CDs, and investment products with different compounding schedules.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Visual Progress Bars</h3>
                <p className="text-muted-foreground text-sm">Easy-to-read visual comparison shows at a glance which option gives the best return.</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Compounding Frequency Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Frequency</th>
                    <th className="text-left py-3 px-4">Times/Year (n)</th>
                    <th className="text-left py-3 px-4">Formula</th>
                    <th className="text-left py-3 px-4">Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Annually</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">A = P(1 + r)ᵗ</td>
                    <td className="py-3 px-4">Bonds, some savings accounts</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Semi-Annually</td>
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4">A = P(1 + r/2)²ᵗ</td>
                    <td className="py-3 px-4">Corporate bonds, CDs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Quarterly</td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">A = P(1 + r/4)⁴ᵗ</td>
                    <td className="py-3 px-4">Bank savings, dividends</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Monthly</td>
                    <td className="py-3 px-4">12</td>
                    <td className="py-3 px-4">A = P(1 + r/12)¹²ᵗ</td>
                    <td className="py-3 px-4">Most savings accounts, loans</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Daily</td>
                    <td className="py-3 px-4">365</td>
                    <td className="py-3 px-4">A = P(1 + r/365)³⁶⁵ᵗ</td>
                    <td className="py-3 px-4">High-yield savings, money market</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Continuous</td>
                    <td className="py-3 px-4">∞</td>
                    <td className="py-3 px-4">A = Peʳᵗ</td>
                    <td className="py-3 px-4">Theoretical maximum, some investments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Compound Interest FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is compound interest?</h3>
                <p className="text-muted-foreground text-sm">Compound interest is interest calculated on both the initial principal and accumulated interest from previous periods. It's "interest on interest" that grows your money faster.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Does compounding frequency really matter?</h3>
                <p className="text-muted-foreground text-sm">Yes! On $10,000 at 5% for 10 years: annual compounding gives $16,289, daily gives $16,487. That's an extra $198 just from more frequent compounding.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the compound interest formula?</h3>
                <p className="text-muted-foreground text-sm">A = P(1 + r/n)^(nt) where A = final amount, P = principal, r = annual rate, n = compounding frequency, t = time in years.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Is daily compounding better than monthly?</h3>
                <p className="text-muted-foreground text-sm">Yes, daily compounding earns slightly more than monthly. However, the difference diminishes as frequency increases. Daily vs monthly might only differ by 0.01-0.02% APY.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is APY and how does it relate to compounding?</h3>
                <p className="text-muted-foreground text-sm">APY (Annual Percentage Yield) shows the actual annual return including compounding effects. It's always higher than the nominal rate when compounding occurs more than annually.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Finance Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/cost-of-capital-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Cost of Capital Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate cost of equity and debt for business investment decisions.</p>
              </a>
              <a href="/calculators/car-loan-affordability-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">Car Loan Affordability Calculator</h3>
                <p className="text-muted-foreground text-sm">Calculate auto loan payments with compound interest over the loan term.</p>
              </a>
              <a href="/calculators/cpc-cpm-ctr-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-1">CPC CPM CTR Calculator</h3>
                <p className="text-muted-foreground text-sm">Analyze advertising ROI and campaign performance metrics.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
