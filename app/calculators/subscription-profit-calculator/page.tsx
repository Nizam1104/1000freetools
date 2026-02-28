"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      </div>
    </div>
  );
}
