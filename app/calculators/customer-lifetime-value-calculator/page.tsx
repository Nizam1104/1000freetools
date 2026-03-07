"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, TrendingUp, Users, DollarSign } from "lucide-react";

interface CLVResult {
  clv: number;
  grossMargin: number;
  monthsToProfit: number;
  recommendedCAC: number;
}

export default function CustomerLifetimeValueCalculatorPage() {
  const [avgPurchaseValue, setAvgPurchaseValue] = useState<string>("");
  const [purchaseFrequency, setPurchaseFrequency] = useState<string>("");
  const [customerLifespan, setCustomerLifespan] = useState<string>("");
  const [grossMargin, setGrossMargin] = useState<string>("50");
  const [frequencyUnit, setFrequencyUnit] = useState<"monthly" | "quarterly" | "annually">("monthly");
  const [lifespanUnit, setLifespanUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<CLVResult | null>(null);

  const calculateCLV = () => {
    const avgValue = parseFloat(avgPurchaseValue);
    const frequency = parseFloat(purchaseFrequency);
    const lifespan = parseFloat(customerLifespan);
    const margin = parseFloat(grossMargin) || 50;

    if (isNaN(avgValue) || isNaN(frequency) || isNaN(lifespan) || avgValue === 0) {
      return;
    }

    let annualFrequency: number;
    switch (frequencyUnit) {
      case "monthly":
        annualFrequency = frequency * 12;
        break;
      case "quarterly":
        annualFrequency = frequency * 4;
        break;
      default:
        annualFrequency = frequency;
    }

    const annualRevenue = avgValue * annualFrequency;

    let lifespanInYears: number;
    if (lifespanUnit === "months") {
      lifespanInYears = lifespan / 12;
    } else {
      lifespanInYears = lifespan;
    }

    const clv = annualRevenue * lifespanInYears * (margin / 100);
    const grossCLV = annualRevenue * lifespanInYears;
    const monthsToProfit = Math.ceil((avgValue * (margin / 100)) > 0 ? 1 : 12);
    const recommendedCAC = clv * 0.33;

    setResult({
      clv: Math.round(clv * 100) / 100,
      grossMargin: Math.round(grossCLV * 100) / 100,
      monthsToProfit,
      recommendedCAC: Math.round(recommendedCAC * 100) / 100,
    });
  };

  const reset = () => {
    setAvgPurchaseValue("");
    setPurchaseFrequency("");
    setCustomerLifespan("");
    setGrossMargin("50");
    setResult(null);
  };

  useEffect(() => {
    calculateCLV();
  }, [avgPurchaseValue, purchaseFrequency, customerLifespan, grossMargin, frequencyUnit, lifespanUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Customer Lifetime Value (CLV) Calculator – Measure Customer Worth</h1>
          <p className="text-muted-foreground">
            Calculate the total value a customer brings to your business with our Customer Lifetime Value Calculator. Essential for determining marketing budgets, customer acquisition costs, and business growth strategies.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Metrics</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="avgValue">Avg Purchase Value ($)</Label>
                    <Input
                      id="avgValue"
                      type="number"
                      placeholder="e.g., 50"
                      value={avgPurchaseValue}
                      onChange={(e) => setAvgPurchaseValue(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Purchase Frequency</Label>
                    <div className="flex gap-2">
                      <Input
                        id="frequency"
                        type="number"
                        placeholder="e.g., 2"
                        value={purchaseFrequency}
                        onChange={(e) => setPurchaseFrequency(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={frequencyUnit}
                        onChange={(e) => setFrequencyUnit(e.target.value as "monthly" | "quarterly" | "annually")}
                        className="h-10 px-2 border rounded-md bg-background text-sm"
                      >
                        <option value="monthly">/month</option>
                        <option value="quarterly">/quarter</option>
                        <option value="annually">/year</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lifespan">Customer Lifespan</Label>
                    <div className="flex gap-2">
                      <Input
                        id="lifespan"
                        type="number"
                        placeholder="e.g., 3"
                        value={customerLifespan}
                        onChange={(e) => setCustomerLifespan(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={lifespanUnit}
                        onChange={(e) => setLifespanUnit(e.target.value as "months" | "years")}
                        className="h-10 px-2 border rounded-md bg-background text-sm"
                      >
                        <option value="years">years</option>
                        <option value="months">months</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="margin">Gross Margin (%)</Label>
                <Input
                  id="margin"
                  type="number"
                  placeholder="e.g., 50"
                  value={grossMargin}
                  onChange={(e) => setGrossMargin(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Typical margins: Retail 30-50%, SaaS 70-90%, Services 50-80%
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  CLV helps determine how much you can spend on customer acquisition while remaining profitable.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCLV} className="flex-1">
                  Calculate CLV
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
                    <p className="text-sm text-muted-foreground">Customer Lifetime Value</p>
                    <p className="text-4xl font-bold text-primary">${result.clv}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Gross Revenue
                      </p>
                      <p className="text-lg font-bold">${result.grossMargin}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Max CAC (33%)
                      </p>
                      <p className="text-lg font-bold">${result.recommendedCAC}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <p className="text-xs text-muted-foreground">Break-even Timeline</p>
                    <p className="text-lg font-bold text-green-500">~{result.monthsToProfit} month(s)</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong></p>
                    <p className="font-mono text-xs mt-1">CLV = Avg Value × Frequency × Lifespan × Margin%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter customer metrics to calculate CLV</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Understanding CLV</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2">Why CLV Matters</h4>
                <ul className="space-y-2">
                  <li>• Determines sustainable CAC</li>
                  <li>• Guides marketing budget decisions</li>
                  <li>• Identifies valuable customer segments</li>
                  <li>• Measures retention effectiveness</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">CAC Guidelines</h4>
                <ul className="space-y-2">
                  <li>• <strong>Ideal:</strong> CAC &lt; 33% of CLV</li>
                  <li>• <strong>Acceptable:</strong> CAC &lt; 50% of CLV</li>
                  <li>• <strong>Warning:</strong> CAC &gt; 50% of CLV</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Improving CLV</h4>
                <ul className="space-y-2">
                  <li>• Increase purchase frequency</li>
                  <li>• Raise average order value</li>
                  <li>• Extend customer lifespan</li>
                  <li>• Improve retention rates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content Section */}
        <div className="mt-8 space-y-8">
          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How the CLV Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Customer Metrics</h3>
                    <p className="text-sm text-muted-foreground">Input average purchase value, purchase frequency, and customer lifespan for your business.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Add Gross Margin</h3>
                    <p className="text-sm text-muted-foreground">Enter your gross margin percentage to calculate profit-based customer lifetime value.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Get CLV Analysis</h3>
                    <p className="text-sm text-muted-foreground">Receive customer lifetime value, maximum recommended CAC, and break-even timeline.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Features of This CLV Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Flexible Time Units</h3>
                      <p className="text-sm text-muted-foreground">Calculate with monthly, quarterly, or annual purchase frequency and months or years for lifespan.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Gross & Net CLV</h3>
                      <p className="text-sm text-muted-foreground">See both gross revenue CLV and profit-based CLV after applying your margin percentage.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">CAC Guidelines</h3>
                      <p className="text-sm text-muted-foreground">Get maximum recommended customer acquisition cost (33% of CLV) for sustainable growth.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Break-even Timeline</h3>
                      <p className="text-sm text-muted-foreground">Estimate how quickly you recover acquisition costs from each customer.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Industry Benchmarks</h3>
                      <p className="text-sm text-muted-foreground">Reference typical margins for retail, SaaS, and services to validate your inputs.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Business Tool</h3>
                      <p className="text-sm text-muted-foreground">Completely free CLV calculator for startups, marketers, and business analysts.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Table */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Typical Gross Margins by Industry</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Industry</th>
                        <th className="text-left py-2">Typical Margin</th>
                        <th className="text-left py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Retail</td>
                        <td className="py-2">30-50%</td>
                        <td className="py-2">Varies by product category</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">SaaS</td>
                        <td className="py-2">70-90%</td>
                        <td className="py-2">High margins after development</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Services</td>
                        <td className="py-2">50-80%</td>
                        <td className="py-2">Labor-intensive businesses</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">E-commerce</td>
                        <td className="py-2">25-45%</td>
                        <td className="py-2">After COGS and shipping</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How do I calculate customer lifetime value?</h3>
                  <p className="text-sm text-muted-foreground">CLV is calculated as: Average Purchase Value × Purchase Frequency × Customer Lifespan × Gross Margin %. For example, $50 average order × 12 purchases/year × 3 years × 50% margin = $900 CLV.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is a good customer lifetime value?</h3>
                  <p className="text-sm text-muted-foreground">Good CLV varies by industry. The key metric is CLV:CAC ratio - aim for at least 3:1. A $500 CLV is excellent if CAC is $150, but poor if CAC is $400. Focus on the ratio, not absolute value.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How can I improve customer lifetime value?</h3>
                  <p className="text-sm text-muted-foreground">Increase CLV by raising average order value (upselling, bundling), increasing purchase frequency (email marketing, loyalty programs), extending customer lifespan (better service, subscriptions), and improving margins.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is the difference between CLV and LTV?</h3>
                  <p className="text-sm text-muted-foreground">CLV (Customer Lifetime Value) and LTV (Lifetime Value) are the same metric - different terms for the same calculation. Both measure the total profit a customer generates over their relationship with your business.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How does CLV relate to CAC?</h3>
                  <p className="text-sm text-muted-foreground">CLV determines how much you can profitably spend on customer acquisition (CAC). Healthy businesses maintain CLV at least 3x their CAC. If CLV is $300, aim for CAC under $100 for sustainable growth.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
