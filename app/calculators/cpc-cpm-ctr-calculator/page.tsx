"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdMetricsResult {
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  cpm: number;
  assessment: string;
  benchmarks: Array<{ metric: string; good: string; industry: string }>;
  recommendations: string[];
}

export default function CPCCPMCTRCalculatorPage() {
  const [impressions, setImpressions] = useState<string>("");
  const [clicks, setClicks] = useState<string>("");
  const [spend, setSpend] = useState<string>("");
  const [result, setResult] = useState<AdMetricsResult | null>(null);

  const calculate = () => {
    const impressionsNum = parseInt(impressions) || 0;
    const clicksNum = parseInt(clicks) || 0;
    const spendNum = parseFloat(spend) || 0;

    if (impressionsNum === 0) return;

    // CTR (Click-Through Rate)
    const ctr = (clicksNum / impressionsNum) * 100;

    // CPC (Cost Per Click)
    const cpc = clicksNum > 0 ? spendNum / clicksNum : 0;

    // CPM (Cost Per Mille/Thousand Impressions)
    const cpm = (spendNum / impressionsNum) * 1000;

    // Assessment
    let assessment = "";
    if (ctr >= 2 && cpc < 2) {
      assessment = "🏆 Excellent - High CTR, low CPC";
    } else if (ctr >= 1 && cpc < 3) {
      assessment = "✅ Good - Above average performance";
    } else if (ctr >= 0.5) {
      assessment = "⚖️ Average - Room for optimization";
    } else {
      assessment = "⚠️ Below Average - Needs improvement";
    }

    // Benchmarks
    const benchmarks = [
      { metric: "CTR", good: ">2%", industry: "0.5-1%" },
      { metric: "CPC (Search)", good: "<$2", industry: "$1-3" },
      { metric: "CPC (Display)", good: "<$0.50", industry: "$0.30-1" },
      { metric: "CPM (Display)", good: "<$5", industry: "$2-10" },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📊 CTR: ${ctr.toFixed(2)}%`);
    recommendations.push(`💰 CPC: $${cpc.toFixed(2)}`);
    recommendations.push(`📈 CPM: $${cpm.toFixed(2)}`);

    if (ctr < 0.5) {
      recommendations.push("⚠️ Low CTR - Improve ad copy and targeting");
      recommendations.push("🎯 Test different headlines and CTAs");
    } else if (ctr > 2) {
      recommendations.push("✅ Great CTR - Consider increasing budget");
    }

    if (cpc > 3) {
      recommendations.push("💸 High CPC - Review keyword quality scores");
      recommendations.push("🎯 Refine targeting to reduce costs");
    }

    recommendations.push("📊 Track metrics over time for trends");
    recommendations.push("🧪 A/B test ads continuously");

    setResult({
      impressions: impressionsNum,
      clicks: clicksNum,
      spend: spendNum,
      ctr: parseFloat(ctr.toFixed(2)),
      cpc: parseFloat(cpc.toFixed(2)),
      cpm: parseFloat(cpm.toFixed(2)),
      assessment,
      benchmarks,
      recommendations,
    });
  };

  const reset = () => {
    setImpressions("");
    setClicks("");
    setSpend("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            CPC, CPM & CTR Calculator – Measure Your Digital Ad Campaign Performance
          </h1>
          <p className="text-muted-foreground">
            Analyze the effectiveness of your online ads with our CPC/CPM/CTR Calculator.
            Enter impressions, clicks, and spend to instantly calculate cost per click,
            cost per thousand impressions, and click-through rate — essential metrics for
            Google Ads, Facebook Ads, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="impressions">Impressions</Label>
                <Input
                  id="impressions"
                  type="number"
                  value={impressions}
                  onChange={(e) => setImpressions(e.target.value)}
                  placeholder="e.g., 10000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clicks">Clicks</Label>
                <Input
                  id="clicks"
                  type="number"
                  value={clicks}
                  onChange={(e) => setClicks(e.target.value)}
                  placeholder="e.g., 150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spend">Total Spend ($)</Label>
                <Input
                  id="spend"
                  type="number"
                  step="0.01"
                  value={spend}
                  onChange={(e) => setSpend(e.target.value)}
                  placeholder="e.g., 250"
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
              <h3 className="text-lg font-semibold mb-4">Ad Metrics</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${
                    result.ctr >= 2 && result.cpc < 2 ? "bg-green-100 dark:bg-green-900/20" :
                    result.ctr >= 1 && result.cpc < 3 ? "bg-blue-100 dark:bg-blue-900/20" :
                    "bg-amber-100 dark:bg-amber-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="text-lg font-bold">{result.assessment}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">CTR</p>
                      <p className="text-xl font-bold">{result.ctr}%</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">CPC</p>
                      <p className="text-xl font-bold">${result.cpc}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">CPM</p>
                      <p className="text-xl font-bold">${result.cpm}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Industry Benchmarks</h4>
                    <div className="space-y-1">
                      {result.benchmarks.map((bench, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{bench.metric}</span>
                          <span>Good: {bench.good} | Avg: {bench.industry}</span>
                        </div>
                      ))}
                    </div>
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
                  <p>Enter campaign data and click Calculate to see metrics</p>
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
                    <strong>CTR:</strong> Click-Through Rate = (Clicks ÷ Impressions) × 100
                  </li>
                  <li>
                    <strong>CPC:</strong> Cost Per Click = Spend ÷ Clicks
                  </li>
                  <li>
                    <strong>CPM:</strong> Cost Per Mille = (Spend ÷ Impressions) × 1000
                  </li>
                  <li>
                    <strong>Good CTR:</strong> Varies by platform (Search: 2%+, Display: 0.5%+)
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> These metrics should be analyzed together with
                  conversion rate and ROAS for complete campaign assessment. A high CTR
                  with low conversions may indicate misleading ad copy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
