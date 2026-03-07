"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ABTestResult {
  variantA: {
    visitors: number;
    conversions: number;
    conversionRate: number;
  };
  variantB: {
    visitors: number;
    conversions: number;
    conversionRate: number;
  };
  relativeImprovement: number;
  zScore: number;
  pValue: number;
  confidenceLevel: number;
  isSignificant: boolean;
  significanceLevel: string;
  recommendation: string;
  sampleSizeAdequate: boolean;
  minimumSampleSize: number;
}

export default function ABTestSignificanceCalculatorPage() {
  const [visitorsA, setVisitorsA] = useState<string>("");
  const [conversionsA, setConversionsA] = useState<string>("");
  const [visitorsB, setVisitorsB] = useState<string>("");
  const [conversionsB, setConversionsB] = useState<string>("");
  const [confidenceThreshold, setConfidenceThreshold] = useState<string>("95");
  const [result, setResult] = useState<ABTestResult | null>(null);

  const calculate = () => {
    const n1 = parseInt(visitorsA) || 0;
    const c1 = parseInt(conversionsA) || 0;
    const n2 = parseInt(visitorsB) || 0;
    const c2 = parseInt(conversionsB) || 0;
    const confidenceThresholdNum = parseFloat(confidenceThreshold) || 95;

    if (n1 === 0 || n2 === 0) return;

    // Conversion rates
    const p1 = c1 / n1;
    const p2 = c2 / n2;

    // Pooled proportion
    const pPool = (c1 + c2) / (n1 + n2);

    // Standard error
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / n1 + 1 / n2));

    // Z-score
    const zScore = se > 0 ? (p2 - p1) / se : 0;

    // P-value (two-tailed test approximation)
    // Using standard normal distribution approximation
    const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

    // Confidence level
    const confidenceLevel = (1 - pValue) * 100;

    // Is it statistically significant?
    const alpha = 1 - (confidenceThresholdNum / 100);
    const isSignificant = pValue < alpha;

    // Relative improvement
    const relativeImprovement = p1 > 0 ? ((p2 - p1) / p1) * 100 : 0;

    // Significance level description
    let significanceLevel = "";
    let recommendation = "";

    if (confidenceLevel >= 99) {
      significanceLevel = "Very Highly Significant (99%+ confidence)";
      recommendation = isSignificant
        ? "🏆 Winner found! Variant B is significantly better. Implement with confidence."
        : "✅ No significant difference. Both variants perform similarly.";
    } else if (confidenceLevel >= 95) {
      significanceLevel = "Highly Significant (95%+ confidence)";
      recommendation = isSignificant
        ? "✅ Winner found! Variant B shows significant improvement. Safe to implement."
        : "✅ No significant difference detected. Consider running longer.";
    } else if (confidenceLevel >= 90) {
      significanceLevel = "Moderately Significant (90%+ confidence)";
      recommendation = isSignificant
        ? "⚠️ Promising result! Consider extending test for higher confidence."
        : "⚠️ Inconclusive. Extend test duration for clearer results.";
    } else if (confidenceLevel >= 80) {
      significanceLevel = "Slightly Significant (80%+ confidence)";
      recommendation = "📊 Low confidence. Continue testing for more reliable results.";
    } else {
      significanceLevel = "Not Significant (<80% confidence)";
      recommendation = "❌ Inconclusive results. Test needs more data or larger effect size.";
    }

    // Sample size adequacy check
    // Using rule of thumb: need at least 100 conversions per variant for reliable results
    const sampleSizeAdequate = c1 >= 100 && c2 >= 100;
    const minimumSampleSize = Math.max(100, Math.ceil(16 * (pPool * (1 - pPool)) / Math.pow(0.05, 2)));

    setResult({
      variantA: {
        visitors: n1,
        conversions: c1,
        conversionRate: parseFloat((p1 * 100).toFixed(2)),
      },
      variantB: {
        visitors: n2,
        conversions: c2,
        conversionRate: parseFloat((p2 * 100).toFixed(2)),
      },
      relativeImprovement: parseFloat(relativeImprovement.toFixed(2)),
      zScore: parseFloat(zScore.toFixed(3)),
      pValue: parseFloat(pValue.toFixed(4)),
      confidenceLevel: parseFloat(confidenceLevel.toFixed(2)),
      isSignificant,
      significanceLevel,
      recommendation,
      sampleSizeAdequate,
      minimumSampleSize,
    });
  };

  // Standard normal cumulative distribution function approximation
  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  };

  const reset = () => {
    setVisitorsA("");
    setConversionsA("");
    setVisitorsB("");
    setConversionsB("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            A/B Test Significance Calculator – Check If Your Test Results Are Statistically Valid
          </h1>
          <p className="text-muted-foreground">
            Make confident marketing decisions with our A/B Test Significance Calculator.
            Enter your control and variant conversion rates along with sample sizes to determine
            statistical significance and confidence level — stop guessing and start testing smarter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-center p-2 bg-muted rounded">Variant A (Control)</h4>
                  <div className="space-y-2">
                    <Label htmlFor="visitors-a">Visitors</Label>
                    <Input
                      id="visitors-a"
                      type="number"
                      value={visitorsA}
                      onChange={(e) => setVisitorsA(e.target.value)}
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conversions-a">Conversions</Label>
                    <Input
                      id="conversions-a"
                      type="number"
                      value={conversionsA}
                      onChange={(e) => setConversionsA(e.target.value)}
                      placeholder="e.g., 50"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-center p-2 bg-primary/10 rounded">Variant B (Test)</h4>
                  <div className="space-y-2">
                    <Label htmlFor="visitors-b">Visitors</Label>
                    <Input
                      id="visitors-b"
                      type="number"
                      value={visitorsB}
                      onChange={(e) => setVisitorsB(e.target.value)}
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conversions-b">Conversions</Label>
                    <Input
                      id="conversions-b"
                      type="number"
                      value={conversionsB}
                      onChange={(e) => setConversionsB(e.target.value)}
                      placeholder="e.g., 65"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence">Confidence Threshold (%)</Label>
                <select
                  id="confidence"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="90">90%</option>
                  <option value="95">95% (Standard)</option>
                  <option value="99">99% (Conservative)</option>
                </select>
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
                  <div className={`p-4 rounded-lg text-center ${result.isSignificant && result.relativeImprovement > 0
                      ? "bg-green-100 dark:bg-green-900/20"
                      : result.isSignificant && result.relativeImprovement < 0
                        ? "bg-red-100 dark:bg-red-900/20"
                        : "bg-amber-100 dark:bg-amber-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Confidence Level</p>
                    <p className="text-4xl font-bold">{result.confidenceLevel}%</p>
                    <p className="text-sm mt-1 font-medium">{result.significanceLevel}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Variant A Rate</p>
                      <p className="text-xl font-semibold">{result.variantA.conversionRate}%</p>
                      <p className="text-xs text-muted-foreground">
                        {result.variantA.conversions}/{result.variantA.visitors}
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Variant B Rate</p>
                      <p className="text-xl font-semibold">{result.variantB.conversionRate}%</p>
                      <p className="text-xs text-muted-foreground">
                        {result.variantB.conversions}/{result.variantB.visitors}
                      </p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${result.relativeImprovement > 0 ? "bg-green-50 dark:bg-green-950/20" :
                      result.relativeImprovement < 0 ? "bg-red-50 dark:bg-red-950/20" :
                        "bg-muted"
                    }`}>
                    <div className="flex justify-between">
                      <span className="text-sm">Relative Improvement</span>
                      <span className={`font-bold ${result.relativeImprovement > 0 ? "text-green-600" :
                          result.relativeImprovement < 0 ? "text-red-600" :
                            ""
                        }`}>
                        {result.relativeImprovement > 0 ? "+" : ""}{result.relativeImprovement}%
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Z-Score:</span>
                      <span className="font-mono text-sm">{result.zScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">P-Value:</span>
                      <span className="font-mono text-sm">{result.pValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sample Size:</span>
                      <span className={`text-sm ${result.sampleSizeAdequate ? "text-green-600" : "text-amber-600"}`}>
                        {result.sampleSizeAdequate ? "✓ Adequate" : `⚠️ Need ${result.minimumSampleSize} per variant`}
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${result.isSignificant ? "bg-blue-50 dark:bg-blue-950/20" : "bg-amber-50 dark:bg-amber-950/20"
                    }`}>
                    <p className="text-sm font-medium">{result.recommendation}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your A/B test data and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding A/B Test Significance
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Statistical significance tells you whether the difference between your
                  variants is likely real or just due to random chance.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Confidence Level:</strong> Probability that the result is not due to chance
                  </li>
                  <li>
                    <strong>P-Value:</strong> Probability of seeing this result if there&apos;s no real difference
                  </li>
                  <li>
                    <strong>Z-Score:</strong> How many standard deviations the result is from the mean
                  </li>
                  <li>
                    <strong>95% Confidence:</strong> Industry standard (p-value &lt; 0.05)
                  </li>
                </ul>
                <p>
                  <strong>Best Practices:</strong> Run tests until you have at least 100 conversions
                  per variant and reach 95%+ confidence before declaring a winner.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">How to Use This A/B Test Calculator</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Enter visitors and conversions for variant A</h4>
                    <p className="text-sm text-muted-foreground">Input the total number of visitors who saw your control version (A) and how many of them completed the desired action (conversions).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Enter visitors and conversions for variant B</h4>
                    <p className="text-sm text-muted-foreground">Input the same metrics for your test version (B). Make sure both variants ran during the same time period for accurate comparison.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Get statistical significance results instantly</h4>
                    <p className="text-sm text-muted-foreground">Click Calculate and see your confidence level, p-value, and whether the difference between variants is statistically significant.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Understanding Statistical Significance</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">What p-value means</h4>
                  <p className="text-muted-foreground">
                    The p-value tells you the probability that your results happened by pure chance. A p-value of 0.03 means there&apos;s only a 3% chance you&apos;d see these results if there was actually no difference between your variants. Lower p-values give you more confidence that the difference is real.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Confidence levels explained</h4>
                  <p className="text-muted-foreground">
                    Confidence level is simply 1 minus your p-value, expressed as a percentage. The three most common thresholds are:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                    <li><strong>90% confidence (p &lt; 0.10):</strong> Some evidence of a difference, but you&apos;d want more data before making big changes</li>
                    <li><strong>95% confidence (p &lt; 0.05):</strong> The standard threshold. Most teams are comfortable making decisions at this level</li>
                    <li><strong>99% confidence (p &lt; 0.01):</strong> Very strong evidence. Use this when the cost of being wrong is high</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What &quot;statistically significant&quot; actually means</h4>
                  <p className="text-muted-foreground">
                    When a result is statistically significant, it means the observed difference between your variants is unlikely to be due to random chance alone. It doesn&apos;t guarantee the result will hold forever, and it doesn&apos;t tell you whether the difference is large enough to matter for your business.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Why sample size matters</h4>
                  <p className="text-muted-foreground">
                    Small samples are noisy. With only 50 visitors per variant, random fluctuations can easily create the appearance of a difference that isn&apos;t real. Larger samples reduce this noise and give you more reliable results. That&apos;s why most experts recommend waiting until you have at least 100 conversions per variant before drawing conclusions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">A/B Test Result Categories</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Category</th>
                      <th className="text-left py-3 px-2 font-semibold">P-Value Range</th>
                      <th className="text-left py-3 px-2 font-semibold">What It Means</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Highly Significant</td>
                      <td className="py-3 px-2">p &lt; 0.01</td>
                      <td className="py-3 px-2 text-muted-foreground">Very confident in results. Less than 1% chance this is random noise.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Significant</td>
                      <td className="py-3 px-2">p &lt; 0.05</td>
                      <td className="py-3 px-2 text-muted-foreground">Confident in results. The standard threshold for declaring a winner.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Marginally Significant</td>
                      <td className="py-3 px-2">p &lt; 0.10</td>
                      <td className="py-3 px-2 text-muted-foreground">Some evidence of a difference, but needs more data before you can be sure.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">Not Significant</td>
                      <td className="py-3 px-2">p &gt;= 0.10</td>
                      <td className="py-3 px-2 text-muted-foreground">No clear winner. The observed difference could easily be random chance.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Common A/B Testing Mistakes</h2>
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Stopping tests too early (the peeking problem)</h4>
                  <p className="text-muted-foreground">
                    Checking results daily and stopping as soon as you hit significance dramatically increases false positives. Every time you peek, you inflate your error rate. Decide your sample size in advance and stick to it.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Testing too many variables at once</h4>
                  <p className="text-muted-foreground">
                    If you change the headline, button color, and image all at once, you won&apos;t know which change drove the result. Test one variable at a time, or use proper multivariate testing methods.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Ignoring practical significance vs statistical significance</h4>
                  <p className="text-muted-foreground">
                    With a large enough sample, even tiny differences become statistically significant. A 0.1% improvement might be &quot;real&quot; but not worth the engineering effort to implement. Always ask: does this difference matter for the business?
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Not accounting for novelty effects</h4>
                  <p className="text-muted-foreground">
                    Users often click on new things just because they&apos;re new. A variant might perform well in the first few days simply because it&apos;s different. Run tests long enough for the novelty to wear off.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-1">Running tests for insufficient time</h4>
                  <p className="text-muted-foreground">
                    User behavior varies by day of week. A test that runs only on weekdays might miss important weekend patterns. Run tests for at least one full week, preferably two or more, to capture the full cycle.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sample Size Guidelines</h2>
              <p className="text-sm text-muted-foreground mb-4">
                The table below shows approximate sample sizes needed per variant to detect different effect sizes at 95% confidence with 80% statistical power.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="text-left py-3 px-2 font-semibold">Baseline Conversion Rate</th>
                      <th className="text-left py-3 px-2 font-semibold">Minimum Detectable Effect</th>
                      <th className="text-left py-3 px-2 font-semibold">Required Sample Size (per variant)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">5%</td>
                      <td className="py-3 px-2">20% improvement (to 6%)</td>
                      <td className="py-3 px-2">~3,200 visitors</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">20% improvement (to 12%)</td>
                      <td className="py-3 px-2">~800 visitors</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">10% improvement (to 11%)</td>
                      <td className="py-3 px-2">~3,100 visitors</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">20%</td>
                      <td className="py-3 px-2">25% improvement (to 25%)</td>
                      <td className="py-3 px-2">~600 visitors</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">50%</td>
                      <td className="py-3 px-2">20% improvement (to 60%)</td>
                      <td className="py-3 px-2">~200 visitors</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">50%</td>
                      <td className="py-3 px-2">10% improvement (to 55%)</td>
                      <td className="py-3 px-2">~800 visitors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are approximate values. Actual required sample sizes depend on your specific context, desired power level, and statistical method used.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">What is a good p-value for A/B testing?</h4>
                  <p className="text-sm text-muted-foreground">
                    Most teams use p &lt; 0.05 (95% confidence) as the standard threshold. This means there&apos;s less than a 5% chance the observed difference is due to random chance. For high-stakes decisions, consider using p &lt; 0.01 (99% confidence). For lower-risk tests where you&apos;re okay with more uncertainty, p &lt; 0.10 (90% confidence) might be acceptable.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How long should I run an A/B test?</h4>
                  <p className="text-sm text-muted-foreground">
                    Run your test until you reach your predetermined sample size, which should be calculated before starting. In practical terms, this usually means running for at least 1-2 full weeks to capture day-of-week effects. Don&apos;t stop early just because you hit significance — that&apos;s the peeking problem and it leads to false positives.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What if my results aren&apos;t significant?</h4>
                  <p className="text-sm text-muted-foreground">
                    Inconclusive results are common and valuable. They tell you that the change you tested doesn&apos;t have a meaningful impact. You can either: (1) run the test longer to see if significance emerges, (2) accept that there&apos;s no meaningful difference and pick either variant based on other factors, or (3) test a more dramatic change that&apos;s more likely to show an effect.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can I check results while the test is running?</h4>
                  <p className="text-sm text-muted-foreground">
                    You can look, but don&apos;t act on what you see until you&apos;ve reached your predetermined sample size. If you stop the test as soon as you hit significance, you&apos;ll get a lot of false positives. Some teams use &quot;sequential testing&quot; methods that allow for early stopping, but these require more advanced statistical approaches.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What&apos;s the difference between statistical and practical significance?</h4>
                  <p className="text-sm text-muted-foreground">
                    Statistical significance tells you whether a difference is likely real (not due to chance). Practical significance asks whether the difference is large enough to matter. With a huge sample, even a 0.01% improvement can be statistically significant — but it might not justify the cost of implementing the change. Always consider both.
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
