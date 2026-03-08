"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PricingTier {
  name: string;
  price: number;
  margin: number;
  customers: number;
}

interface SubscriptionResult {
  monthlyRevenue: number;
  annualRevenue: number;
  totalCustomers: number;
  averageRevenuePerUser: number;
  customerLifetimeValue: number;
  breakEvenCustomers: number;
  tiers: PricingTier[];
  recommendations: string[];
}

export default function SubscriptionPricingCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState<string>("5000");
  const [variableCostPerCustomer, setVariableCostPerCustomer] = useState<string>("10");
  const [desiredMargin, setDesiredMargin] = useState<string>("70");
  const [targetCustomers, setTargetCustomers] = useState<string>("1000");

  const [tier1Name, setTier1Name] = useState<string>("Basic");
  const [tier1Price, setTier1Price] = useState<string>("9.99");
  const [tier1Customers, setTier1Customers] = useState<string>("500");

  const [tier2Name, setTier2Name] = useState<string>("Pro");
  const [tier2Price, setTier2Price] = useState<string>("19.99");
  const [tier2Customers, setTier2Customers] = useState<string>("300");

  const [tier3Name, setTier3Name] = useState<string>("Enterprise");
  const [tier3Price, setTier3Price] = useState<string>("49.99");
  const [tier3Customers, setTier3Customers] = useState<string>("200");

  const [churnRate, setChurnRate] = useState<string>("5");
  const [result, setResult] = useState<SubscriptionResult | null>(null);

  const calculate = () => {
    const fixedCostsNum = parseFloat(fixedCosts) || 0;
    const variableCostNum = parseFloat(variableCostPerCustomer) || 0;
    const desiredMarginNum = parseFloat(desiredMargin) || 70;
    const targetCustomersNum = parseInt(targetCustomers) || 1000;
    const churnRateNum = parseFloat(churnRate) || 5;

    // Parse tier data
    const tiers: PricingTier[] = [
      { name: tier1Name, price: parseFloat(tier1Price) || 0, margin: 0, customers: parseInt(tier1Customers) || 0 },
      { name: tier2Name, price: parseFloat(tier2Price) || 0, margin: 0, customers: parseInt(tier2Customers) || 0 },
      { name: tier3Name, price: parseFloat(tier3Price) || 0, margin: 0, customers: parseInt(tier3Customers) || 0 },
    ];

    // Calculate metrics
    let totalRevenue = 0;
    let totalCustomers = 0;

    tiers.forEach((tier) => {
      totalRevenue += tier.price * tier.customers;
      totalCustomers += tier.customers;
      tier.margin = tier.price - variableCostNum;
    });

    const monthlyRevenue = totalRevenue;
    const annualRevenue = monthlyRevenue * 12;
    const averageRevenuePerUser = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

    // Calculate monthly profit
    const totalVariableCosts = variableCostNum * totalCustomers;
    const monthlyProfit = monthlyRevenue - fixedCostsNum - totalVariableCosts;

    // Customer Lifetime Value (CLV)
    // CLV = (ARPU × Gross Margin) / Churn Rate
    const grossMargin = monthlyRevenue > 0 ? (monthlyRevenue - totalVariableCosts) / monthlyRevenue : 0;
    const customerLifetimeValue = churnRateNum > 0 ? (averageRevenuePerUser * grossMargin) / (churnRateNum / 100) : 0;

    // Break-even analysis
    const contributionMargin = averageRevenuePerUser - variableCostNum;
    const breakEvenCustomers = contributionMargin > 0 ? Math.ceil(fixedCostsNum / contributionMargin) : 0;

    // Generate recommendations
    const recommendations: string[] = [];

    if (monthlyProfit < 0) {
      recommendations.push("⚠️ You're operating at a loss. Consider raising prices or reducing costs.");
    } else {
      recommendations.push("✅ Your pricing model is profitable.");
    }

    if (desiredMarginNum > grossMargin * 100) {
      recommendations.push(`💡 To achieve ${desiredMarginNum}% margin, consider raising prices by ${((desiredMarginNum / 100 - grossMargin) * 100).toFixed(0)}%.`);
    }

    if (churnRateNum > 7) {
      recommendations.push("⚠️ High churn rate detected. Focus on customer retention strategies.");
    } else if (churnRateNum < 3) {
      recommendations.push("✅ Excellent churn rate! Consider expansion pricing tiers.");
    }

    if (breakEvenCustomers > targetCustomersNum * 0.5) {
      recommendations.push("💡 High break-even point. Consider reducing fixed costs.");
    }

    // Tier optimization
    const tierDistribution = tiers.map(t => t.customers / totalCustomers * 100);
    if (tierDistribution[0] > 70) {
      recommendations.push("💡 Most customers on basic tier. Consider upselling strategies.");
    }
    if (tierDistribution[2] < 10) {
      recommendations.push("💡 Low enterprise adoption. Review enterprise features and pricing.");
    }

    setResult({
      monthlyRevenue: parseFloat(monthlyRevenue.toFixed(2)),
      annualRevenue: parseFloat(annualRevenue.toFixed(2)),
      totalCustomers,
      averageRevenuePerUser: parseFloat(averageRevenuePerUser.toFixed(2)),
      customerLifetimeValue: parseFloat(customerLifetimeValue.toFixed(2)),
      breakEvenCustomers,
      tiers,
      recommendations,
    });
  };

  const reset = () => {
    setFixedCosts("5000");
    setVariableCostPerCustomer("10");
    setDesiredMargin("70");
    setTargetCustomers("1000");
    setTier1Name("Basic");
    setTier1Price("9.99");
    setTier1Customers("500");
    setTier2Name("Pro");
    setTier2Price("19.99");
    setTier2Customers("300");
    setTier3Name("Enterprise");
    setTier3Price("49.99");
    setTier3Customers("200");
    setChurnRate("5");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Subscription Pricing Calculator – Find the Right Price for Your Subscription Plans
          </h1>
          <p className="text-muted-foreground">
            Set the right subscription price with our Subscription Pricing Calculator.
            Factor in your costs, desired profit margin, and customer distribution to determine
            optimal monthly and annual pricing tiers for your SaaS or membership business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="fixed-costs">Monthly Fixed Costs ($)</Label>
                  <Input
                    id="fixed-costs"
                    type="number"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="variable-cost">Variable Cost/Customer ($)</Label>
                  <Input
                    id="variable-cost"
                    type="number"
                    value={variableCostPerCustomer}
                    onChange={(e) => setVariableCostPerCustomer(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="desired-margin">Desired Margin (%)</Label>
                  <Input
                    id="desired-margin"
                    type="number"
                    value={desiredMargin}
                    onChange={(e) => setDesiredMargin(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="churn-rate">Monthly Churn Rate (%)</Label>
                  <Input
                    id="churn-rate"
                    type="number"
                    value={churnRate}
                    onChange={(e) => setChurnRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Pricing Tiers</h4>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-xs">Tier Name</Label>
                      <Input value={tier1Name} onChange={(e) => setTier1Name(e.target.value)} className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Price ($)</Label>
                      <Input value={tier1Price} onChange={(e) => setTier1Price(e.target.value)} className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Customers</Label>
                      <Input value={tier1Customers} onChange={(e) => setTier1Customers(e.target.value)} className="text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-xs">Tier Name</Label>
                      <Input value={tier2Name} onChange={(e) => setTier2Name(e.target.value)} className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Price ($)</Label>
                      <Input value={tier2Price} onChange={(e) => setTier2Price(e.target.value)} className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Customers</Label>
                      <Input value={tier2Customers} onChange={(e) => setTier2Customers(e.target.value)} className="text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-xs">Tier Name</Label>
                      <Input value={tier3Name} onChange={(e) => setTier3Name(e.target.value)} className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Price ($)</Label>
                      <Input value={tier3Price} onChange={(e) => setTier3Price(e.target.value)} className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Customers</Label>
                      <Input value={tier3Customers} onChange={(e) => setTier3Customers(e.target.value)} className="text-sm" />
                    </div>
                  </div>
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
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-primary">${result.monthlyRevenue}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Annual Revenue</p>
                      <p className="text-2xl font-bold text-primary">${result.annualRevenue}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total Customers</p>
                      <p className="text-lg font-semibold">{result.totalCustomers}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">ARPU</p>
                      <p className="text-lg font-semibold">${result.averageRevenuePerUser}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">CLV</p>
                      <p className="text-lg font-semibold">${result.customerLifetimeValue}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Break-even Point</span>
                      <span className="font-semibold">{result.breakEvenCustomers} customers</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You need {result.breakEvenCustomers} customers to cover your fixed costs
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tier Distribution</h4>
                    <div className="space-y-2">
                      {result.tiers.map((tier, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span className="text-sm">{tier.name}</span>
                          <div className="flex gap-4 text-sm">
                            <span>${tier.price}/mo</span>
                            <span className="text-muted-foreground">{tier.customers} customers</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">Recommendations</h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your pricing details and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter Your Costs</h4>
                    <p className="text-xs text-muted-foreground">Input your monthly fixed costs (hosting, salaries, tools) and variable cost per customer (support, processing fees).</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Define Pricing Tiers</h4>
                    <p className="text-xs text-muted-foreground">Set up to 3 pricing tiers with names, monthly prices, and expected customer distribution across each tier.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Get Key Metrics</h4>
                    <p className="text-xs text-muted-foreground">Instantly see MRR, ARR, ARPU, CLV, break-even point, and actionable recommendations for your pricing strategy.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Multi-Tier Pricing Analysis</h4>
                  <p className="text-xs text-muted-foreground">Model up to 3 pricing tiers simultaneously to understand how different price points and customer distribution affect your overall revenue and profitability.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Customer Lifetime Value (CLV)</h4>
                  <p className="text-xs text-muted-foreground">Calculate the predicted lifetime value of each customer based on your churn rate, helping you determine how much you can spend on acquisition.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Break-Even Analysis</h4>
                  <p className="text-xs text-muted-foreground">Know exactly how many customers you need to cover your fixed costs, essential for financial planning and investor presentations.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Smart Recommendations</h4>
                  <p className="text-xs text-muted-foreground">Get AI-powered suggestions based on your inputs, including warnings about high churn, low margins, or unbalanced tier distribution.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                SaaS Pricing Benchmarks
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Metric</th>
                      <th className="text-left py-2 px-3 font-semibold">Good</th>
                      <th className="text-left py-2 px-3 font-semibold">Industry Average</th>
                      <th className="text-left py-2 px-3 font-semibold">Concerning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3">Gross Margin</td>
                      <td className="py-2 px-3 text-green-600">80%+</td>
                      <td className="py-2 px-3">70-80%</td>
                      <td className="py-2 px-3 text-red-600">&lt;70%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Monthly Churn</td>
                      <td className="py-2 px-3 text-green-600">&lt;3%</td>
                      <td className="py-2 px-3">5-7%</td>
                      <td className="py-2 px-3 text-red-600">&gt;7%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">CLV:CAC Ratio</td>
                      <td className="py-2 px-3 text-green-600">3:1+</td>
                      <td className="py-2 px-3">2:1</td>
                      <td className="py-2 px-3 text-red-600">&lt;1:1</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">LTV Payback</td>
                      <td className="py-2 px-3 text-green-600">&lt;12 months</td>
                      <td className="py-2 px-3">12-18 months</td>
                      <td className="py-2 px-3 text-red-600">&gt;18 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Source: SaaS industry benchmarks from OpenView, ProfitWell, and ChartMogul reports.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">How do I calculate subscription pricing for my SaaS?</h4>
                <p className="text-xs text-muted-foreground">
                  Start with your costs: add fixed costs (hosting, salaries) and variable costs per customer. Decide your target margin (70-80% is typical for SaaS). Then factor in your expected customer distribution across tiers. Our calculator does this automatically and shows your break-even point.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What is a good profit margin for subscription businesses?</h4>
                <p className="text-xs text-muted-foreground">
                  Successful SaaS companies typically achieve 70-85% gross margins. Net profit margins vary widely: early-stage companies may operate at a loss while growing, while mature companies target 20-30% net margins. Focus on unit economics first – each customer should be profitable on their own.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How many pricing tiers should I offer?</h4>
                <p className="text-xs text-muted-foreground">
                  Most successful SaaS products use 3 tiers: Basic/Starter, Professional/Pro, and Enterprise. This follows the "Goldilocks effect" where most customers choose the middle option. Some products succeed with 2 tiers, while complex enterprise products may have 4+ tiers with custom pricing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What churn rate is acceptable for subscription businesses?</h4>
                <p className="text-xs text-muted-foreground">
                  For B2B SaaS, under 3% monthly churn is excellent, 5-7% is average, and above 7% is concerning. B2C subscription services typically see higher churn (7-10%). Annual churn should ideally be under 10% for healthy SaaS businesses. Remember: reducing churn by even 1% significantly impacts lifetime value.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How do I calculate customer lifetime value (CLV)?</h4>
                <p className="text-xs text-muted-foreground">
                  CLV = (Average Revenue Per User × Gross Margin) ÷ Churn Rate. For example, if ARPU is $50, gross margin is 80%, and monthly churn is 5%, CLV = ($50 × 0.80) ÷ 0.05 = $800. This tells you the maximum you should spend to acquire a customer while remaining profitable.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
