"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function SubscriptionProfitCalculatorPage() {
  const [subscribers, setSubscribers] = useState<string>("");
  const [monthlyPrice, setMonthlyPrice] = useState<string>("");
  const [churnRate, setChurnRate] = useState<string>("");
  const [operatingCosts, setOperatingCosts] = useState<string>("");
  const [result, setResult] = useState<{
    mrr: number;
    arr: number;
    churnLoss: number;
    netMrr: number;
    annualProfit: number;
    profitMargin: number;
  } | null>(null);

  const calculateSubscription = () => {
    const subs = parseFloat(subscribers);
    const price = parseFloat(monthlyPrice);
    const churn = parseFloat(churnRate) / 100;
    const costs = parseFloat(operatingCosts);

    if (isNaN(subs) || isNaN(price) || isNaN(churn) || isNaN(costs) || subs <= 0 || price <= 0) {
      return;
    }

    const mrr = subs * price;
    const arr = mrr * 12;
    const churnLoss = mrr * churn;
    const netMrr = mrr - churnLoss;
    const annualRevenue = netMrr * 12;
    const annualProfit = annualRevenue - (costs * 12);
    const profitMargin = (annualProfit / annualRevenue) * 100;

    setResult({
      mrr,
      arr,
      churnLoss,
      netMrr,
      annualProfit,
      profitMargin,
    });
  };

  const reset = () => {
    setSubscribers("");
    setMonthlyPrice("");
    setChurnRate("");
    setOperatingCosts("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Subscription Business Profit Calculator</h1>
          <p className="text-muted-foreground">
            Analyze your subscription business's financials. Calculate MRR, ARR, churn impact, and profit given subscriber count, pricing, and operating costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subscribers">Number of Subscribers</Label>
                <Input
                  id="subscribers"
                  type="number"
                  placeholder="Enter subscriber count"
                  value={subscribers}
                  onChange={(e) => setSubscribers(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPrice">Monthly Subscription Price</Label>
                <Input
                  id="monthlyPrice"
                  type="number"
                  placeholder="Enter monthly price"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="churnRate">Monthly Churn Rate (%)</Label>
                <Input
                  id="churnRate"
                  type="number"
                  placeholder="Enter churn rate"
                  value={churnRate}
                  onChange={(e) => setChurnRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingCosts">Monthly Operating Costs</Label>
                <Input
                  id="operatingCosts"
                  type="number"
                  placeholder="Enter monthly costs"
                  value={operatingCosts}
                  onChange={(e) => setOperatingCosts(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSubscription} className="flex-1">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">MRR</p>
                      <p className="text-2xl font-bold text-primary">${result.mrr.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">ARR</p>
                      <p className="text-2xl font-bold text-primary">${result.arr.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Churn Loss/Month</p>
                      <p className="text-lg font-bold text-red-600">${result.churnLoss.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Net MRR</p>
                      <p className="text-lg font-bold">${result.netMrr.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${result.annualProfit >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Annual Profit</p>
                    <p className={`text-2xl font-bold ${result.annualProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${result.annualProfit.toFixed(2)} ({result.profitMargin.toFixed(1)}%)
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
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter Subscriber Count</h4>
                    <p className="text-xs text-muted-foreground">Input your total number of paying subscribers and the monthly price you charge per subscriber.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Add Churn & Costs</h4>
                    <p className="text-xs text-muted-foreground">Enter your monthly churn rate (percentage of subscribers who cancel) and total operating costs.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">View Profit Metrics</h4>
                    <p className="text-xs text-muted-foreground">Get instant calculations for MRR, ARR, churn loss, net revenue, and annual profit with margin percentage.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">MRR & ARR Tracking</h4>
                  <p className="text-xs text-muted-foreground">Monitor Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR) – the fundamental metrics for any subscription business.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Churn Impact Analysis</h4>
                  <p className="text-xs text-muted-foreground">See exactly how much revenue you lose each month to churn, helping you prioritize retention efforts.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Profit Margin Calculation</h4>
                  <p className="text-xs text-muted-foreground">Understand your true profitability with automatic profit margin percentage after all operating costs.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Net MRR Visibility</h4>
                  <p className="text-xs text-muted-foreground">Calculate net MRR after churn to understand your actual growth trajectory and revenue retention.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Subscription Business Metrics Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Metric</th>
                      <th className="text-left py-2 px-3 font-semibold">Formula</th>
                      <th className="text-left py-2 px-3 font-semibold">What It Tells You</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">MRR</td>
                      <td className="py-2 px-3 font-mono text-xs">Subscribers × Price</td>
                      <td className="py-2 px-3 text-xs">Predictable monthly revenue</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">ARR</td>
                      <td className="py-2 px-3 font-mono text-xs">MRR × 12</td>
                      <td className="py-2 px-3 text-xs">Annual recurring revenue projection</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Churn Loss</td>
                      <td className="py-2 px-3 font-mono text-xs">MRR × Churn Rate</td>
                      <td className="py-2 px-3 text-xs">Revenue lost to cancellations</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Net MRR</td>
                      <td className="py-2 px-3 font-mono text-xs">MRR - Churn Loss</td>
                      <td className="py-2 px-3 text-xs">Actual revenue after churn</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Profit Margin</td>
                      <td className="py-2 px-3 font-mono text-xs">(Profit / Revenue) × 100</td>
                      <td className="py-2 px-3 text-xs">Percentage of revenue that is profit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How do I calculate subscription business profit?",
    answer: "Start with MRR (subscribers × monthly price), multiply by 12 for ARR. Subtract churn loss (MRR × churn rate) to get net MRR. Annual profit = (Net MRR × 12) - (Operating Costs × 12). Profit margin = (Annual Profit / Annual Revenue) × 100.",
  },
{
    question: "What is a good profit margin for subscription businesses?",
    answer: "SaaS companies typically target 70-85% gross margins. Net profit margins vary: early-stage companies may operate at losses while scaling, mature companies aim for 20-30% net margins. Subscription box services often have lower margins (40-60%) due to physical product costs.",
  },
{
    question: "How much churn is acceptable?",
    answer: "B2B SaaS: under 3% monthly is excellent, 5-7% is average. B2C subscriptions: 5-10% is common. Streaming services often see 4-6%. The key is that new customer acquisition should exceed churn for growth. A 5% monthly churn means you lose 45% of customers annually.",
  },
{
    question: "What's the difference between MRR and ARR?",
    answer: "MRR (Monthly Recurring Revenue) is predictable revenue per month. ARR (Annual Recurring Revenue) is MRR × 12. MRR is better for tracking month-to-month changes; ARR is commonly used for investor reporting and company valuations. Both exclude one-time fees.",
  },
{
    question: "How can I reduce churn in my subscription business?",
    answer: "Focus on onboarding (help users get value fast), regular engagement (emails, feature updates), proactive support (reach out before they cancel), and annual plans (reduce payment friction). Exit surveys reveal why customers leave. Even 1% churn reduction significantly impacts lifetime value.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
