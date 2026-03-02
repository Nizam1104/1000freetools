"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdROIResult {
  adSpend: number;
  revenue: number;
  profit: number;
  roi: number;
  roas: number;
  cpa: number;
  conversions: number;
  assessment: string;
  recommendations: string[];
}

export default function ROICalculatorAdPage() {
  const [adSpend, setAdSpend] = useState<string>("");
  const [revenue, setRevenue] = useState<string>("");
  const [conversions, setConversions] = useState<string>("");
  const [profitMargin, setProfitMargin] = useState<string>("30");
  const [result, setResult] = useState<AdROIResult | null>(null);

  const calculate = () => {
    const spendNum = parseFloat(adSpend) || 0;
    const revenueNum = parseFloat(revenue) || 0;
    const conversionsNum = parseInt(conversions) || 0;
    const marginNum = parseFloat(profitMargin) || 30;

    if (spendNum === 0) return;

    // Calculate profit
    const profit = revenueNum - spendNum;

    // ROI = (Profit / Cost) × 100
    const roi = (profit / spendNum) * 100;

    // ROAS = Revenue / Ad Spend
    const roas = revenueNum / spendNum;

    // CPA = Ad Spend / Conversions
    const cpa = conversionsNum > 0 ? spendNum / conversionsNum : 0;

    // Assessment
    let assessment = "";
    if (roi >= 100) {
      assessment = "🏆 Excellent ROI - Highly profitable campaign";
    } else if (roi >= 50) {
      assessment = "✅ Good ROI - Profitable campaign";
    } else if (roi >= 0) {
      assessment = "⚠️ Break-even to low profit - Room for optimization";
    } else {
      assessment = "❌ Negative ROI - Campaign losing money";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (roi < 0) {
      recommendations.push("🛑 Pause or significantly revise underperforming ads");
      recommendations.push("📊 Analyze which keywords/audiences are draining budget");
      recommendations.push("🎯 Improve landing page conversion rate");
    } else if (roi < 50) {
      recommendations.push("📈 Test new ad creatives and copy");
      recommendations.push("🎯 Refine targeting to higher-value audiences");
      recommendations.push("💰 Consider increasing budget on best performers");
    } else if (roi >= 50 && roi < 100) {
      recommendations.push("🚀 Scale winning campaigns");
      recommendations.push("📊 A/B test to find further optimizations");
    } else {
      recommendations.push("🏆 Maximize budget allocation to this campaign");
      recommendations.push("📈 Document success factors for other campaigns");
    }

    if (cpa > 0) {
      const targetCpa = spendNum / (conversionsNum * 1.2);
      recommendations.push(`💡 Target CPA for 20% improvement: $${targetCpa.toFixed(2)}`);
    }

    recommendations.push(`📊 ROAS of ${roas.toFixed(2)}x means $${roas.toFixed(2)} revenue per $1 spent`);

    setResult({
      adSpend: spendNum,
      revenue: revenueNum,
      profit: parseFloat(profit.toFixed(2)),
      roi: parseFloat(roi.toFixed(1)),
      roas: parseFloat(roas.toFixed(2)),
      cpa: parseFloat(cpa.toFixed(2)),
      conversions: conversionsNum,
      assessment,
      recommendations,
    });
  };

  const reset = () => {
    setAdSpend("");
    setRevenue("");
    setConversions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns
          </h1>
          <p className="text-muted-foreground">
            Measure the profitability of your advertising with our Ad ROI Calculator.
            Enter your total ad spend and revenue generated to calculate ROI percentage —
            helping marketers and business owners make smarter advertising budget decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad-spend">Total Ad Spend ($)</Label>
                <Input
                  id="ad-spend"
                  type="number"
                  value={adSpend}
                  onChange={(e) => setAdSpend(e.target.value)}
                  placeholder="e.g., 1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue Generated ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g., 3000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conversions">Number of Conversions</Label>
                <Input
                  id="conversions"
                  type="number"
                  value={conversions}
                  onChange={(e) => setConversions(e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="margin">Profit Margin (%)</Label>
                <Input
                  id="margin"
                  type="number"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(e.target.value)}
                  placeholder="30"
                />
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
              <h3 className="text-lg font-semibold mb-4">ROI Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.roi >= 100 ? "bg-green-100 dark:bg-green-900/20" :
                    result.roi >= 0 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="text-5xl font-bold">{result.roi > 0 ? "+" : ""}{result.roi}%</p>
                    <p className="text-sm mt-1">{result.assessment}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">ROAS</p>
                      <p className="text-2xl font-bold">{result.roas}x</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Profit</p>
                      <p className="text-2xl font-bold">${result.profit}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ad Spend:</span>
                      <span className="font-semibold">${result.adSpend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue:</span>
                      <span className="font-semibold">${result.revenue}</span>
                    </div>
                    {result.cpa > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Cost Per Acquisition:</span>
                        <span className="font-semibold">${result.cpa}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter campaign data and click Calculate to see ROI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Ad Metrics
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>ROI:</strong> (Revenue - Cost) / Cost × 100
                  </li>
                  <li>
                    <strong>ROAS:</strong> Revenue / Ad Spend (return per $1 spent)
                  </li>
                  <li>
                    <strong>CPA:</strong> Cost Per Acquisition = Spend / Conversions
                  </li>
                  <li>
                    <strong>Good ROAS:</strong> 4:1 or higher for most industries
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Track conversions properly with pixel tracking
                  or UTM parameters to get accurate ROI calculations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
