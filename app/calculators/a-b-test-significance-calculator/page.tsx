"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    const se = Math.sqrt(pPool * (1 - pPool) * (1/n1 + 1/n2));

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
    const minimumSampleSize = Math.max(100, Math.ceil(16 * (pPool * (1-pPool)) / Math.pow(0.05, 2)));

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
                  <div className={`p-4 rounded-lg text-center ${
                    result.isSignificant && result.relativeImprovement > 0 
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

                  <div className={`p-3 rounded-lg ${
                    result.relativeImprovement > 0 ? "bg-green-50 dark:bg-green-950/20" :
                    result.relativeImprovement < 0 ? "bg-red-50 dark:bg-red-950/20" :
                    "bg-muted"
                  }`}>
                    <div className="flex justify-between">
                      <span className="text-sm">Relative Improvement</span>
                      <span className={`font-bold ${
                        result.relativeImprovement > 0 ? "text-green-600" :
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

                  <div className={`p-3 rounded-lg ${
                    result.isSignificant ? "bg-blue-50 dark:bg-blue-950/20" : "bg-amber-50 dark:bg-amber-950/20"
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
        </div>
      </div>
    </div>
  );
}
