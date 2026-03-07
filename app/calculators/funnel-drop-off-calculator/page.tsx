"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunnelResult {
  stages: Array<{ name: string; visitors: number; conversionRate: number; dropOffRate: number }>;
  overallConversion: number;
  biggestDropOff: { stage: string; rate: number };
  recommendations: string[];
}

export default function FunnelDropOffCalculatorPage() {
  const [stages, setStages] = useState<Array<{ name: string; visitors: string }>>([
    { name: "Visitors", visitors: "" },
    { name: "Signups", visitors: "" },
    { name: "Activated", visitors: "" },
    { name: "Customers", visitors: "" },
  ]);
  const [result, setResult] = useState<FunnelResult | null>(null);

  const updateStage = (index: number, field: string, value: string) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setStages(newStages);
  };

  const calculate = () => {
    const visitorsNums = stages.map(s => parseInt(s.visitors) || 0);

    if (visitorsNums[0] === 0) return;

    const stageResults = [];
    let biggestDropOff = { stage: "", rate: 0 };

    for (let i = 0; i < visitorsNums.length; i++) {
      const current = visitorsNums[i];
      const prev = i === 0 ? current : visitorsNums[i - 1];

      const conversionRate = i === 0 ? 100 : (current / visitorsNums[0]) * 100;
      const dropOffRate = i === 0 ? 0 : ((prev - current) / prev) * 100;

      stageResults.push({
        name: stages[i].name,
        visitors: current,
        conversionRate: parseFloat(conversionRate.toFixed(1)),
        dropOffRate: parseFloat(dropOffRate.toFixed(1)),
      });

      if (dropOffRate > biggestDropOff.rate && i > 0) {
        biggestDropOff = { stage: stages[i].name, rate: parseFloat(dropOffRate.toFixed(1)) };
      }
    }

    // Overall conversion rate
    const overallConversion = (visitorsNums[visitorsNums.length - 1] / visitorsNums[0]) * 100;

    // Recommendations
    const recommendations: string[] = [];

    if (biggestDropOff.rate > 50) {
      recommendations.push(`🚨 Critical: ${biggestDropOff.rate}% drop-off at ${biggestDropOff.stage} stage`);
      recommendations.push("🔍 Investigate UX issues at this stage immediately");
    } else if (biggestDropOff.rate > 30) {
      recommendations.push(`⚠️ High drop-off (${biggestDropOff.rate}%) at ${biggestDropOff.stage}`);
      recommendations.push("📊 A/B test improvements at this stage");
    }

    if (overallConversion < 1) {
      recommendations.push("📉 Overall conversion below 1% - review entire funnel");
    } else if (overallConversion < 5) {
      recommendations.push("⚠️ Below average conversion - optimization needed");
    } else {
      recommendations.push("✅ Conversion rate is healthy");
    }

    recommendations.push(`📊 Track this funnel weekly to spot trends`);
    recommendations.push(`🎯 Set up alerts for significant drop-off changes`);

    setResult({
      stages: stageResults,
      overallConversion: parseFloat(overallConversion.toFixed(2)),
      biggestDropOff,
      recommendations,
    });
  };

  const reset = () => {
    setStages([
      { name: "Visitors", visitors: "" },
      { name: "Signups", visitors: "" },
      { name: "Activated", visitors: "" },
      { name: "Customers", visitors: "" },
    ]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel
          </h1>
          <p className="text-muted-foreground">
            Pinpoint leaks in your sales pipeline with our Funnel Drop-off Calculator.
            Enter the number of users at each funnel stage to calculate conversion and
            drop-off rates — enabling targeted optimization for maximum revenue.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <Label>Funnel Stages</Label>
                {stages.map((stage, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={stage.name}
                      onChange={(e) => updateStage(index, "name", e.target.value)}
                      className="w-32"
                      placeholder="Stage name"
                    />
                    <Input
                      type="number"
                      value={stage.visitors}
                      onChange={(e) => updateStage(index, "visitors", e.target.value)}
                      placeholder="Count"
                      className="w-24"
                    />
                  </div>
                ))}
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Add more stages or rename existing ones to match your funnel
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Funnel Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Overall Conversion</p>
                    <p className="text-4xl font-bold text-primary">{result.overallConversion}%</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Funnel Visualization</h4>
                    <div className="space-y-2">
                      {result.stages.map((stage, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{stage.name}</span>
                            <span>{stage.visitors} ({stage.conversionRate}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-4">
                            <div
                              className={`h-4 rounded-full ${stage.dropOffRate > 30 ? "bg-red-500" :
                                  stage.dropOffRate > 15 ? "bg-amber-500" :
                                    "bg-green-500"
                                }`}
                              style={{ width: `${stage.conversionRate}%` }}
                            />
                          </div>
                          {stage.dropOffRate > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ↓ {stage.dropOffRate}% drop-off from previous
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.biggestDropOff.stage && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        <strong>⚠️ Biggest Drop-off:</strong> {result.biggestDropOff.rate}% at {result.biggestDropOff.stage} stage
                      </p>
                    </div>
                  )}

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
                  <p>Enter funnel data and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Funnel Optimization Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Track consistently:</strong> Use same time periods for comparison
                  </li>
                  <li>
                    <strong>Segment users:</strong> Different sources may have different funnels
                  </li>
                  <li>
                    <strong>Set benchmarks:</strong> Know your industry averages
                  </li>
                  <li>
                    <strong>Test iteratively:</strong> One change at a time for clear results
                  </li>
                </ul>
                <p>
                  <strong>Typical SaaS funnel:</strong> Visitors to Signups (2-5%) to
                  Activated (40-60%) to Customers (10-20%)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Funnel Drop-off Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Define your funnel stages</p>
                    <p>Name each stage of your funnel (e.g., Visitors, Signups, Activated, Customers). Rename stages to match your specific user journey.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter user counts for each stage</p>
                    <p>Input the number of users at each stage during the same time period. Use data from analytics tools like Google Analytics, Mixpanel, or Amplitude.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Analyze drop-off points</p>
                    <p>Review conversion rates, identify the biggest drop-off stage, and follow recommendations to improve that specific part of your funnel.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Industry Funnel Conversion Benchmarks
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-left py-3 px-2 font-semibold">Visit to Signup</th>
                      <th className="text-left py-3 px-2 font-semibold">Signup to Customer</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">B2B SaaS</td>
                      <td className="py-3 px-2">2-5%</td>
                      <td className="py-3 px-2">10-20%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">B2C SaaS</td>
                      <td className="py-3 px-2">5-10%</td>
                      <td className="py-3 px-2">5-15%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">E-commerce</td>
                      <td className="py-3 px-2">N/A</td>
                      <td className="py-3 px-2">2-4% (cart to purchase)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Mobile Apps</td>
                      <td className="py-3 px-2">30-50% (install to signup)</td>
                      <td className="py-3 px-2">10-25%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Marketplace</td>
                      <td className="py-3 px-2">3-8%</td>
                      <td className="py-3 px-2">15-30%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Content/Media</td>
                      <td className="py-3 px-2">1-3% (visitor to subscriber)</td>
                      <td className="py-3 px-2">2-5% (subscriber to paid)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Benchmarks vary widely based on traffic source, product complexity, and pricing. Use these as rough guides, not absolute targets.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Funnel Metrics
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Conversion Rate vs Drop-off Rate</h4>
                  <p>
                    Conversion rate shows what percentage of users complete a stage. Drop-off rate shows what percentage leave. If 100 visitors become 10 signups,
                    conversion is 10% and drop-off is 90%. Both metrics are useful: conversion for overall performance, drop-off for identifying problem areas.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Overall vs Stage-by-Stage Conversion</h4>
                  <p>
                    Overall conversion measures visitors to final goal (e.g., 1000 visitors to 50 customers = 5%). Stage-by-stage shows conversion between each
                    step (e.g., 1000 to 100 signups = 10%, then 100 to 50 customers = 50%). Stage analysis reveals where improvements will have the biggest impact.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Drop-off Happens</h4>
                  <p>
                    Users leave funnels for many reasons: friction (too many form fields), confusion (unclear value proposition), distraction (competing priorities),
                    or timing (not ready to buy). High drop-off at a specific stage signals a problem with that step. Low drop-off throughout suggests healthy UX.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Improving Funnel Conversion
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reduce friction at high drop-off stages</p>
                    <p>If signups drop off heavily, simplify your form. Remove optional fields. Offer social login. Every extra field reduces conversion by 5-10%.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add progressive profiling</p>
                    <p>Don't ask for everything upfront. Collect minimal info at signup, then gather more data as users engage. This improves initial conversion significantly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use onboarding emails and in-app messages</p>
                    <p>Guide users through activation with triggered emails and contextual tooltips. Users who complete onboarding are 3-5x more likely to convert to paying customers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">A/B test your biggest drop-off points</p>
                    <p>Focus testing efforts where you lose the most users. Even a 10% improvement at a 50% drop-off stage doubles your final conversions. Test headlines, CTAs, layouts, and pricing displays.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is a good funnel conversion rate?</h4>
                  <p>
                    It depends on your industry and funnel complexity. B2B SaaS typically sees 2-5% visitor to customer conversion.
                    E-commerce averages 2-4% cart to purchase. Mobile apps may see 10-25% install to active user. Compare against
                    industry benchmarks, but focus on improving your own baseline over time.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I calculate drop-off rate?</h4>
                  <p>
                    Drop-off rate = (Previous Stage Users - Current Stage Users) / Previous Stage Users x 100.
                    If 100 users reach stage A and 60 reach stage B, drop-off is (100-60)/100 = 40%.
                    This means 40% of users left between those two stages.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What stage should I optimize first?</h4>
                  <p>
                    Start with the stage that has the highest absolute drop-off. If you lose 500 users between
                    visitors and signups but only 50 between signup and purchase, fix the visitor-to-signup
                    flow first. The biggest leaks give the biggest ROI on optimization effort.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How often should I track funnel metrics?</h4>
                  <p>
                    Review funnels weekly for active products, monthly for stable ones. Use consistent time
                    periods for comparison (week-over-week or month-over-month). Set up alerts for significant
                    changes. Seasonal businesses should compare year-over-year to account for normal fluctuations.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I segment my funnel data?</h4>
                  <p>
                    Yes. Segment by traffic source (organic, paid, referral), device (mobile, desktop),
                    geography, and user type (new, returning). Different segments often have dramatically
                    different conversion rates. Optimization that works for one segment may not work for another.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
