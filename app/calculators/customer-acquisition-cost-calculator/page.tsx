"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CACResult {
  cac: number;
  totalMarketingSpend: number;
  newCustomers: number;
  cacToLtvRatio: string;
  cacAssessment: string;
  recommendations: string[];
  paybackPeriod: string;
}

export default function CustomerAcquisitionCostCalculatorPage() {
  const [marketingSpend, setMarketingSpend] = useState<string>("");
  const [salesSpend, setSalesSpend] = useState<string>("");
  const [otherCosts, setOtherCosts] = useState<string>("");
  const [newCustomers, setNewCustomers] = useState<string>("");
  const [ltv, setLtv] = useState<string>("");
  const [avgPurchaseValue, setAvgPurchaseValue] = useState<string>("");
  const [result, setResult] = useState<CACResult | null>(null);

  const calculate = () => {
    const marketingSpendNum = parseFloat(marketingSpend) || 0;
    const salesSpendNum = parseFloat(salesSpend) || 0;
    const otherCostsNum = parseFloat(otherCosts) || 0;
    const newCustomersNum = parseInt(newCustomers) || 0;
    const ltvNum = parseFloat(ltv) || 0;
    const avgPurchaseValueNum = parseFloat(avgPurchaseValue) || 0;

    if (newCustomersNum === 0) return;

    // Total acquisition cost
    const totalCost = marketingSpendNum + salesSpendNum + otherCostsNum;

    // CAC = Total Acquisition Cost / New Customers Acquired
    const cac = totalCost / newCustomersNum;

    // CAC to LTV ratio
    let cacToLtvRatio = "N/A";
    let cacAssessment = "";
    const recommendations: string[] = [];

    if (ltvNum > 0) {
      const ratio = ltvNum / cac;
      cacToLtvRatio = `1:${ratio.toFixed(1)}`;

      if (ratio >= 3) {
        cacAssessment = "Healthy - Your CAC is sustainable";
        recommendations.push("✅ Your CAC:LTV ratio is healthy. Consider scaling acquisition.");
      } else if (ratio >= 2) {
        cacAssessment = "Acceptable - Room for improvement";
        recommendations.push("⚠️ Consider optimizing conversion rates to improve ratio.");
      } else if (ratio >= 1) {
        cacAssessment = "Concerning - CAC too high relative to LTV";
        recommendations.push("❌ Reduce CAC or increase customer lifetime value.");
        recommendations.push("Review marketing channels for better ROI.");
      } else {
        cacAssessment = "Critical - Losing money on each customer";
        recommendations.push("🚨 Urgent: You're spending more than customers are worth.");
        recommendations.push("Immediately review and reduce acquisition costs.");
      }
    } else {
      cacAssessment = "Enter LTV to see assessment";
    }

    // Payback period estimation
    let paybackPeriod = "N/A";
    if (avgPurchaseValueNum > 0 && cac > 0) {
      const purchasesToBreakEven = cac / avgPurchaseValueNum;
      if (purchasesToBreakEven <= 1) {
        paybackPeriod = "First purchase";
      } else if (purchasesToBreakEven <= 3) {
        paybackPeriod = `${purchasesToBreakEven.toFixed(1)} purchases`;
      } else {
        paybackPeriod = `${purchasesToBreakEven.toFixed(0)}+ purchases (consider reducing CAC)`;
      }
    }

    setResult({
      cac: parseFloat(cac.toFixed(2)),
      totalMarketingSpend: totalCost,
      newCustomers: newCustomersNum,
      cacToLtvRatio,
      cacAssessment,
      recommendations,
      paybackPeriod,
    });
  };

  const reset = () => {
    setMarketingSpend("");
    setSalesSpend("");
    setOtherCosts("");
    setNewCustomers("");
    setLtv("");
    setAvgPurchaseValue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Customer Acquisition Cost (CAC) Calculator – Find Out How Much Each New Customer Costs
          </h1>
          <p className="text-muted-foreground">
            Keep your growth profitable by tracking your Customer Acquisition Cost.
            Our CAC Calculator divides total sales and marketing spend by the number of
            new customers acquired to give you a clear cost-per-customer metric.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marketing-spend">Marketing Spend ($)</Label>
                <Input
                  id="marketing-spend"
                  type="number"
                  value={marketingSpend}
                  onChange={(e) => setMarketingSpend(e.target.value)}
                  placeholder="e.g., 5000"
                />
                <p className="text-xs text-muted-foreground">
                  Ads, content, social media, events, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sales-spend">Sales Spend ($)</Label>
                <Input
                  id="sales-spend"
                  type="number"
                  value={salesSpend}
                  onChange={(e) => setSalesSpend(e.target.value)}
                  placeholder="e.g., 3000"
                />
                <p className="text-xs text-muted-foreground">
                  Sales team salaries, commissions, tools
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="other-costs">Other Costs ($)</Label>
                <Input
                  id="other-costs"
                  type="number"
                  value={otherCosts}
                  onChange={(e) => setOtherCosts(e.target.value)}
                  placeholder="e.g., 2000"
                />
                <p className="text-xs text-muted-foreground">
                  Software, overhead, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-customers">New Customers Acquired</Label>
                <Input
                  id="new-customers"
                  type="number"
                  value={newCustomers}
                  onChange={(e) => setNewCustomers(e.target.value)}
                  placeholder="e.g., 100"
                />
              </div>

              <div className="border-t pt-4 space-y-3">
                <Label className="text-sm font-medium">Optional (for deeper insights)</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="ltv">Customer Lifetime Value (LTV)</Label>
                  <Input
                    id="ltv"
                    type="number"
                    value={ltv}
                    onChange={(e) => setLtv(e.target.value)}
                    placeholder="e.g., 500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avg-purchase">Average Purchase Value ($)</Label>
                  <Input
                    id="avg-purchase"
                    type="number"
                    value={avgPurchaseValue}
                    onChange={(e) => setAvgPurchaseValue(e.target.value)}
                    placeholder="e.g., 50"
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Customer Acquisition Cost</p>
                    <p className="text-4xl font-bold text-primary">${result.cac}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Spend:</span>
                      <span className="font-semibold">${result.totalMarketingSpend.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">New Customers:</span>
                      <span className="font-semibold">{result.newCustomers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">CAC:LTV Ratio:</span>
                      <span className="font-semibold">{result.cacToLtvRatio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payback Period:</span>
                      <span className="font-semibold">{result.paybackPeriod}</span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${
                    result.cacAssessment.includes("Healthy") ? "bg-green-50 dark:bg-green-950/20" :
                    result.cacAssessment.includes("Acceptable") ? "bg-amber-50 dark:bg-amber-950/20" :
                    result.cacAssessment.includes("Critical") ? "bg-red-50 dark:bg-red-950/20" :
                    "bg-muted"
                  }`}>
                    <p className={`text-sm font-medium ${
                      result.cacAssessment.includes("Healthy") ? "text-green-800 dark:text-green-200" :
                      result.cacAssessment.includes("Acceptable") ? "text-amber-800 dark:text-amber-200" :
                      result.cacAssessment.includes("Critical") ? "text-red-800 dark:text-red-200" :
                      ""
                    }`}>
                      {result.cacAssessment}
                    </p>
                  </div>

                  {result.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your costs and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Customer Acquisition Cost
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  CAC is one of the most important metrics for any business. It tells you
                  how much you&apos;re spending to acquire each new customer.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> CAC = Total Acquisition Costs / New Customers
                  </li>
                  <li>
                    <strong>Healthy CAC:LTV Ratio:</strong> 1:3 or higher (LTV should be 3x CAC)
                  </li>
                  <li>
                    <strong>Break-even:</strong> CAC equals first purchase value
                  </li>
                  <li>
                    <strong>Include in costs:</strong> Marketing, sales salaries, commissions,
                    tools, and overhead
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Track CAC by channel to identify your most efficient
                  acquisition sources. Aim to reduce CAC over time through optimization.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
