"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SaaSChurnRateCalculatorPage() {
  const [startCustomers, setStartCustomers] = useState<string>("");
  const [lostCustomers, setLostCustomers] = useState<string>("");
  const [period, setPeriod] = useState<string>("monthly");
  const [result, setResult] = useState<{
    churnRate: number;
    retentionRate: number;
    annualizedChurn: number;
    interpretation: string;
    recommendations: string[];
  } | null>(null);

  const calculate = () => {
    const start = parseFloat(startCustomers) || 0;
    const lost = parseFloat(lostCustomers) || 0;

    if (start <= 0 || lost < 0) return;
    if (lost > start) return;

    const churnRate = (lost / start) * 100;
    const retentionRate = 100 - churnRate;

    // Annualize the churn rate
    let annualizedChurn: number;
    if (period === "monthly") {
      annualizedChurn = (1 - Math.pow(1 - churnRate / 100, 12)) * 100;
    } else if (period === "quarterly") {
      annualizedChurn = (1 - Math.pow(1 - churnRate / 100, 4)) * 100;
    } else {
      annualizedChurn = churnRate;
    }

    // Interpretation and recommendations
    let interpretation: string;
    const recommendations: string[] = [];

    if (churnRate < 2) {
      interpretation = "Excellent - World-class retention";
      recommendations.push("Continue focusing on customer success");
      recommendations.push("Document and replicate success patterns");
      recommendations.push("Consider expansion revenue opportunities");
    } else if (churnRate < 5) {
      interpretation = "Good - Healthy retention for most SaaS businesses";
      recommendations.push("Monitor trends month-over-month");
      recommendations.push("Investigate reasons for lost customers");
      recommendations.push("Strengthen onboarding process");
    } else if (churnRate < 10) {
      interpretation = "Average - Room for improvement";
      recommendations.push("Conduct exit interviews with churned customers");
      recommendations.push("Improve customer onboarding and training");
      recommendations.push("Implement proactive customer success outreach");
    } else {
      interpretation = "High - Needs immediate attention";
      recommendations.push("Urgently investigate churn reasons");
      recommendations.push("Review product-market fit");
      recommendations.push("Implement customer win-back campaigns");
      recommendations.push("Consider pricing or packaging changes");
    }

    setResult({
      churnRate: Math.round(churnRate * 100) / 100,
      retentionRate: Math.round(retentionRate * 100) / 100,
      annualizedChurn: Math.round(annualizedChurn * 100) / 100,
      interpretation,
      recommendations
    });
  };

  const reset = () => {
    setStartCustomers("");
    setLostCustomers("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">SaaS Churn Rate Calculator – Calculate Monthly & Annual Customer Churn</h1>
          <p className="text-muted-foreground">
            Track subscriber retention with our SaaS Churn Rate Calculator. Enter customers at the start of the period and customers lost to calculate monthly or annual churn rate — a critical metric for subscription business health and growth forecasting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startCustomers">Customers at Start of Period</Label>
                <Input 
                  id="startCustomers" 
                  type="number" 
                  placeholder="e.g., 1000" 
                  value={startCustomers} 
                  onChange={(e) => setStartCustomers(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lostCustomers">Customers Lost During Period</Label>
                <Input 
                  id="lostCustomers" 
                  type="number" 
                  placeholder="e.g., 50" 
                  value={lostCustomers} 
                  onChange={(e) => setLostCustomers(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Period Type</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Churn
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
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Churn Rate</p>
                      <p className={`text-3xl font-bold ${
                        result.churnRate < 5 ? "text-green-500" :
                        result.churnRate < 10 ? "text-yellow-500" : "text-red-500"
                      }`}>{result.churnRate}%</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Retention Rate</p>
                      <p className="text-3xl font-bold text-primary">{result.retentionRate}%</p>
                    </div>
                  </div>

                  {period !== "annual" && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annualized Churn Rate</p>
                      <p className="text-2xl font-semibold">{result.annualizedChurn}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Projected yearly churn if monthly rate continues</p>
                    </div>
                  )}

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary">Assessment: {result.interpretation}</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-2">Recommendations:</p>
                    <ul className="text-sm space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>• {rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> Churn Rate = (Lost Customers ÷ Start Customers) × 100
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter customer data and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
