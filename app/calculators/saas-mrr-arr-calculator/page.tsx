"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SaaSResult {
  customers: number;
  arpu: number;
  mrr: number;
  arr: number;
  projectedGrowth: Array<{ month: string; mrr: number; customers: number }>;
  metrics: {
    mrrGrowthRate: number;
    customerGrowthRate: number;
    churnImpact: number;
  };
}

export default function SaaSMRRARRCalculatorPage() {
  const [customers, setCustomers] = useState<string>("");
  const [arpu, setArpu] = useState<string>("");
  const [growthRate, setGrowthRate] = useState<string>("5");
  const [churnRate, setChurnRate] = useState<string>("3");
  const [result, setResult] = useState<SaaSResult | null>(null);

  const calculate = () => {
    const customersNum = parseInt(customers) || 0;
    const arpuNum = parseFloat(arpu) || 0;
    const growthRateNum = parseFloat(growthRate) || 5;
    const churnRateNum = parseFloat(churnRate) || 3;

    if (customersNum === 0 || arpuNum === 0) return;

    // Calculate MRR and ARR
    const mrr = customersNum * arpuNum;
    const arr = mrr * 12;

    // Net growth rate
    const netGrowthRate = growthRateNum - churnRateNum;

    // Project growth for 12 months
    const projectedGrowth = [];
    let currentMRR = mrr;
    let currentCustomers = customersNum;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 12; i++) {
      const growthMultiplier = 1 + (netGrowthRate / 100);
      currentCustomers = Math.round(currentCustomers * growthMultiplier);
      currentMRR = currentCustomers * arpuNum;

      projectedGrowth.push({
        month: months[i],
        mrr: Math.round(currentMRR),
        customers: currentCustomers,
      });
    }

    // Calculate metrics
    const mrrGrowthRate = netGrowthRate;
    const customerGrowthRate = netGrowthRate;
    const churnImpact = mrr * (churnRateNum / 100);

    setResult({
      customers: customersNum,
      arpu: arpuNum,
      mrr: Math.round(mrr),
      arr: Math.round(arr),
      projectedGrowth,
      metrics: {
        mrrGrowthRate: parseFloat(mrrGrowthRate.toFixed(1)),
        customerGrowthRate: parseFloat(customerGrowthRate.toFixed(1)),
        churnImpact: Math.round(churnImpact),
      },
    });
  };

  const reset = () => {
    setCustomers("");
    setArpu("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            MRR & ARR Calculator – Calculate Monthly and Annual Recurring Revenue for SaaS
          </h1>
          <p className="text-muted-foreground">
            Measure your subscription business&apos;s revenue with our MRR/ARR Calculator.
            Enter the number of paying customers and average plan price to calculate
            Monthly Recurring Revenue and Annual Recurring Revenue — the core financial
            metrics for any SaaS company.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="customers">Paying Customers</Label>
                  <Input
                    id="customers"
                    type="number"
                    value={customers}
                    onChange={(e) => setCustomers(e.target.value)}
                    placeholder="e.g., 500"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="arpu">ARPU ($/month)</Label>
                  <Input
                    id="arpu"
                    type="number"
                    step="0.01"
                    value={arpu}
                    onChange={(e) => setArpu(e.target.value)}
                    placeholder="e.g., 49"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="growth">Monthly Growth Rate (%)</Label>
                  <Input
                    id="growth"
                    type="number"
                    step="0.1"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="churn">Monthly Churn Rate (%)</Label>
                  <Input
                    id="churn"
                    type="number"
                    step="0.1"
                    value={churnRate}
                    onChange={(e) => setChurnRate(e.target.value)}
                    placeholder="3"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  SaaS Benchmarks:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Good growth: 5-10% monthly</li>
                  <li>• Good churn: &lt;3% monthly</li>
                  <li>• Rule of 40: Growth% + Profit% ≥ 40</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Revenue Metrics</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">MRR</p>
                      <p className="text-3xl font-bold text-primary">${result.mrr.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">ARR</p>
                      <p className="text-3xl font-bold text-primary">${result.arr.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Customers:</span>
                      <span className="font-semibold">{result.customers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ARPU:</span>
                      <span className="font-semibold">${result.arpu}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Net Growth:</span>
                      <span className={`font-semibold ${result.metrics.mrrGrowthRate > 0 ? "text-green-600" : "text-red-600"}`}>
                        {result.metrics.mrrGrowthRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Churn Impact:</span>
                      <span className="font-semibold text-red-600">-${result.metrics.churnImpact}/mo</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">12-Month Projection</h4>
                    <div className="space-y-1">
                      {result.projectedGrowth.map((month, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                          <span className="font-medium w-12">{month.month}</span>
                          <div className="flex-1 mx-4">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${(month.mrr / result.projectedGrowth[11].mrr) * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className="font-mono w-24 text-right">${month.mrr.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formulas:</strong>
                      <br />
                      MRR = Customers × ARPU
                      <br />
                      ARR = MRR × 12
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your metrics and click Calculate to see projections</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                SaaS Metrics Explained
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>MRR (Monthly Recurring Revenue):</strong> Predictable revenue
                    generated each month from subscriptions
                  </li>
                  <li>
                    <strong>ARR (Annual Recurring Revenue):</strong> MRR × 12, used for
                    annual planning and valuations
                  </li>
                  <li>
                    <strong>ARPU:</strong> Average Revenue Per User = MRR / Customers
                  </li>
                  <li>
                    <strong>Churn Rate:</strong> % of customers who cancel each month
                  </li>
                  <li>
                    <strong>Rule of 40:</strong> Growth Rate + Profit Margin should ≥ 40%
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Focus on reducing churn as much as acquiring new
                  customers. A 1% reduction in churn has compounding effects on MRR.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
