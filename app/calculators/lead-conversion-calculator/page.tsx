"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LeadConversionResult {
  totalLeads: number;
  conversions: number;
  conversionRate: number;
  marketingSpend: number;
  costPerLead: number;
  costPerAcquisition: number;
  rating: string;
  benchmarks: Array<{ name: string; rate: number }>;
  recommendations: string[];
}

export default function LeadConversionCalculatorPage() {
  const [totalLeads, setTotalLeads] = useState<string>("");
  const [conversions, setConversions] = useState<string>("");
  const [marketingSpend, setMarketingSpend] = useState<string>("");
  const [result, setResult] = useState<LeadConversionResult | null>(null);

  const calculate = () => {
    const leadsNum = parseInt(totalLeads) || 0;
    const conversionsNum = parseInt(conversions) || 0;
    const spendNum = parseFloat(marketingSpend) || 0;

    if (leadsNum === 0) return;

    // Conversion rate
    const conversionRate = (conversionsNum / leadsNum) * 100;

    // Cost per lead
    const costPerLead = leadsNum > 0 ? spendNum / leadsNum : 0;

    // Cost per acquisition
    const costPerAcquisition = conversionsNum > 0 ? spendNum / conversionsNum : 0;

    // Rating based on conversion rate
    let rating = "";
    if (conversionRate >= 10) {
      rating = "Excellent - Top 10% of businesses";
    } else if (conversionRate >= 5) {
      rating = "Good - Above average";
    } else if (conversionRate >= 2) {
      rating = "Average - Room for improvement";
    } else {
      rating = "Below Average - Needs optimization";
    }

    // Industry benchmarks
    const benchmarks = [
      { name: "E-commerce", rate: 2.5 },
      { name: "B2B SaaS", rate: 3.5 },
      { name: "Real Estate", rate: 2.0 },
      { name: "Finance", rate: 4.0 },
      { name: "Healthcare", rate: 3.0 },
      { name: "Education", rate: 4.5 },
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (conversionRate < 2) {
      recommendations.push("⚠️ Low conversion rate - review landing page optimization");
      recommendations.push("📝 A/B test your call-to-action buttons");
      recommendations.push("🎯 Improve lead qualification criteria");
    } else if (conversionRate < 5) {
      recommendations.push("✅ Decent conversion rate - focus on incremental improvements");
      recommendations.push("📊 Analyze drop-off points in your funnel");
    } else {
      recommendations.push("🏆 Great conversion rate! Focus on scaling traffic");
      recommendations.push("💰 Consider increasing ad spend to maximize conversions");
    }

    if (costPerAcquisition > 0) {
      recommendations.push(`💵 Your CPA is $${costPerAcquisition.toFixed(2)} - ensure LTV is 3x+ this amount`);
    }

    setResult({
      totalLeads: leadsNum,
      conversions: conversionsNum,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      marketingSpend: spendNum,
      costPerLead: parseFloat(costPerLead.toFixed(2)),
      costPerAcquisition: parseFloat(costPerAcquisition.toFixed(2)),
      rating,
      benchmarks,
      recommendations,
    });
  };

  const reset = () => {
    setTotalLeads("");
    setConversions("");
    setMarketingSpend("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Lead Conversion Calculator – Calculate Your Sales Conversion Rate & Cost Per Lead
          </h1>
          <p className="text-muted-foreground">
            Understand how well your marketing funnel is performing with our Lead Conversion Calculator.
            Enter total leads, conversions, and marketing spend to calculate your conversion rate
            and cost per lead — key metrics for optimizing sales and marketing performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leads">Total Leads</Label>
                <Input
                  id="leads"
                  type="number"
                  value={totalLeads}
                  onChange={(e) => setTotalLeads(e.target.value)}
                  placeholder="e.g., 1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conversions">Conversions (Sales/Signups)</Label>
                <Input
                  id="conversions"
                  type="number"
                  value={conversions}
                  onChange={(e) => setConversions(e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spend">Marketing Spend ($)</Label>
                <Input
                  id="spend"
                  type="number"
                  value={marketingSpend}
                  onChange={(e) => setMarketingSpend(e.target.value)}
                  placeholder="e.g., 5000"
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
              <h3 className="text-lg font-semibold mb-4">Conversion Metrics</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.conversionRate >= 5 ? "bg-green-100 dark:bg-green-900/20" :
                      result.conversionRate >= 2 ? "bg-amber-100 dark:bg-amber-900/20" :
                        "bg-red-100 dark:bg-red-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-5xl font-bold">{result.conversionRate}%</p>
                    <p className="text-sm mt-1">{result.rating}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Cost Per Lead</p>
                      <p className="text-xl font-bold">${result.costPerLead}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Cost Per Acquisition</p>
                      <p className="text-xl font-bold">${result.costPerAcquisition}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Industry Benchmarks</h4>
                    <div className="space-y-1">
                      {result.benchmarks.map((b, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{b.name}</span>
                          <span className={result.conversionRate >= b.rate ? "text-green-600 font-medium" : "text-muted-foreground"}>
                            {b.rate}% {result.conversionRate >= b.rate ? "✓" : ""}
                          </span>
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
                  <p>Enter your metrics and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Conversion Rate Optimization Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Landing pages:</strong> Clear value proposition, single CTA
                  </li>
                  <li>
                    <strong>Page speed:</strong> Every second of load time reduces conversions
                  </li>
                  <li>
                    <strong>Mobile optimization:</strong> 50%+ traffic is mobile
                  </li>
                  <li>
                    <strong>Social proof:</strong> Reviews, testimonials, trust badges
                  </li>
                  <li>
                    <strong>A/B testing:</strong> Continuously test headlines, CTAs, forms
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> Conversion Rate = (Conversions ÷ Total Leads) × 100
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
