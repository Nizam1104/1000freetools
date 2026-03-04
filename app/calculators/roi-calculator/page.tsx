"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, DollarSign, Percent, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface ROIResult {
  roi: number;
  netProfit: number;
  totalReturn: number;
  annualizedROI: number;
}

export default function ROICalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [finalValue, setFinalValue] = useState<string>("");
  const [investmentPeriod, setInvestmentPeriod] = useState<string>("1");
  const [periodUnit, setPeriodUnit] = useState<"years" | "months" | "days">("years");
  const [result, setResult] = useState<ROIResult | null>(null);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const period = parseFloat(investmentPeriod) || 1;

    if (isNaN(initial) || isNaN(final) || initial === 0) {
      return;
    }

    const netProfit = final - initial;
    const roi = (netProfit / initial) * 100;

    let periodInYears: number;
    switch (periodUnit) {
      case "months":
        periodInYears = period / 12;
        break;
      case "days":
        periodInYears = period / 365;
        break;
      default:
        periodInYears = period;
    }

    const annualizedROI = periodInYears > 0
      ? (Math.pow(1 + (roi / 100), 1 / periodInYears) - 1) * 100
      : 0;

    setResult({
      roi: Math.round(roi * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      totalReturn: Math.round(final * 100) / 100,
      annualizedROI: Math.round(annualizedROI * 100) / 100,
    });
  };

  const reset = () => {
    setInitialInvestment("");
    setFinalValue("");
    setInvestmentPeriod("1");
    setResult(null);
  };

  useEffect(() => {
    calculateROI();
  }, [initialInvestment, finalValue, investmentPeriod, periodUnit]);

  // Generate chart data for investment growth
  const generateChartData = () => {
    if (!result || !initialInvestment) return [];
    
    const initial = parseFloat(initialInvestment);
    const periods = parseFloat(investmentPeriod) || 1;
    const final = parseFloat(finalValue);
    
    const data = [];
    const growthPerPeriod = (final - initial) / periods;
    
    for (let i = 0; i <= periods; i++) {
      const value = initial + (growthPerPeriod * i);
      data.push({
        period: i,
        value: Math.round(value),
        profit: Math.round(value - initial),
      });
    }
    
    return data;
  };

  const chartData = generateChartData();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>ROI Calculator – Calculate Return on Investment Percentage</CardTitle>
          <CardDescription>
            Calculate your Return on Investment (ROI) instantly with our free ROI Calculator. Enter your initial investment and final value to determine your profit or loss percentage — essential for evaluating investments, business projects, and financial decisions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial">Initial Investment ($)</Label>
                    <Input
                      id="initial"
                      type="number"
                      placeholder="e.g., 10000"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="final">Final Value ($)</Label>
                    <Input
                      id="final"
                      type="number"
                      placeholder="e.g., 15000"
                      value={finalValue}
                      onChange={(e) => setFinalValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period">Investment Period</Label>
                    <div className="flex gap-2">
                      <Input
                        id="period"
                        type="number"
                        placeholder="e.g., 1"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={periodUnit}
                        onChange={(e) => setPeriodUnit(e.target.value as "years" | "months" | "days")}
                        className="h-10 px-3 border rounded-md bg-background text-sm"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  ROI measures the efficiency of an investment. Positive ROI indicates profit, negative ROI indicates loss.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateROI} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Results</h3>
                {result ? (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${result.roi >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      <p className="text-sm text-muted-foreground">Return on Investment</p>
                      <p className={`text-4xl font-bold ${result.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {result.roi >= 0 ? '+' : ''}{result.roi}%
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Net Profit
                        </p>
                        <p className={`text-lg font-bold ${result.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {result.netProfit >= 0 ? '+' : ''}${result.netProfit}
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Total Return
                        </p>
                        <p className="text-lg font-bold">${result.totalReturn}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Percent className="h-3 w-3" />
                        Annualized ROI
                      </p>
                      <p className={`text-xl font-bold ${result.annualizedROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {result.annualizedROI >= 0 ? '+' : ''}{result.annualizedROI}%
                      </p>
                    </div>

                    <div className="text-xs text-muted-foreground pt-4 border-t">
                      <p><strong>Formula:</strong></p>
                      <p className="font-mono text-xs mt-1">ROI = ((Final - Initial) / Initial) × 100%</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter investment details to calculate ROI</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {chartData.length > 1 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Investment Growth Over Time</h3>
              <div className="h-[200px] w-full">
                <ChartContainer
                  config={{
                    value: {
                      label: "Value",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" tickFormatter={(v) => `${v}${periodUnit === 'years' ? 'y' : periodUnit === 'months' ? 'm' : 'd'}`} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        fill="var(--color-value)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is ROI?</CardTitle>
          <CardDescription>Understanding Return on Investment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            ROI (Return on Investment) is the simplest way to measure whether an investment made money or lost money. It tells you the percentage gain or loss relative to what you originally put in. A 20% ROI means you made 20 cents for every dollar invested. A -15% ROI means you lost 15 cents per dollar.
          </p>
          <p className="text-sm text-muted-foreground">
            The formula is dead simple: ROI = ((Final Value - Initial Investment) / Initial Investment) × 100. That's it. No complex financial models, no Wall Street jargon. Just basic math that works for stocks, real estate, business ventures, or that side hustle you started last year.
          </p>
          <p className="text-sm text-muted-foreground">
            Here's what most ROI calculators won't tell you: ROI doesn't account for time. A 50% return over 10 years sounds impressive until you realize it's only about 4% annually. That's why we also show annualized ROI – it lets you compare investments with different time horizons on equal footing.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate ROI</CardTitle>
          <CardDescription>Step-by-step guide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Determine your initial investment</p>
                <p className="text-xs text-muted-foreground">This is what you paid – the purchase price of stocks, the down payment on a property, or the startup costs for a business. Include all costs: fees, commissions, closing costs. People forget these and overstate their returns.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Find the final value</p>
                <p className="text-xs text-muted-foreground">What's the investment worth now? For stocks, that's current market value. For real estate, it's the sale price or current appraisal. For a business, it's what you could sell it for today – not what you hope it's worth.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Apply the ROI formula</p>
                <p className="text-xs text-muted-foreground">Subtract initial from final to get your profit (or loss). Divide by the initial investment. Multiply by 100 to get a percentage. Done. Our calculator does this instantly and also shows annualized returns.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ROI Benchmarks by Investment Type</CardTitle>
          <CardDescription>What counts as a "good" return</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment Type</TableHead>
                <TableHead>Average Annual ROI</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">S&P 500 Index</TableCell>
                <TableCell className="font-mono text-xs">~10%</TableCell>
                <TableCell>Medium-High</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Real Estate (rental)</TableCell>
                <TableCell className="font-mono text-xs">8-12%</TableCell>
                <TableCell>Medium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Government Bonds</TableCell>
                <TableCell className="font-mono text-xs">3-5%</TableCell>
                <TableCell>Low</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Corporate Bonds</TableCell>
                <TableCell className="font-mono text-xs">4-7%</TableCell>
                <TableCell>Low-Medium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">High-Yield Savings</TableCell>
                <TableCell className="font-mono text-xs">4-5%</TableCell>
                <TableCell>Very Low</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Small Business</TableCell>
                <TableCell className="font-mono text-xs">15-30%</TableCell>
                <TableCell>High</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Historical averages shown. Past performance doesn't guarantee future results. Higher returns typically come with higher risk.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ROI vs Annualized ROI</CardTitle>
          <CardDescription>Why time matters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Simple ROI</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Shows total return as a percentage, ignoring time completely.
              </p>
              <p className="text-xs text-muted-foreground">
                Example: You invest $10,000 and sell for $15,000 five years later. Simple ROI = 50%. Sounds great – until you realize that's only about 8.5% per year.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Annualized ROI</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Compounds the return over the investment period to show yearly rate.
              </p>
              <p className="text-xs text-muted-foreground">
                Formula: ((1 + ROI)^ (1/years)) - 1. This lets you compare a 50% return over 5 years with a 20% return over 2 years. The 20% over 2 years actually wins (9.5% annualized vs 8.5%).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a good ROI percentage?</h4>
            <p className="text-xs text-muted-foreground">
              Depends on the investment and risk level. For stocks, 7-10% annually is solid (matching market averages). For real estate, 8-12% is typical. For a business you're running yourself, you should demand 15%+ to justify the work and risk. Anything under 5% annually barely beats inflation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can ROI be negative?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Negative ROI means you lost money. A -25% ROI means you lost a quarter of your investment. This happens. Even good investors have losing positions. The key is cutting losses early and not letting a -50% become a -90%.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does ROI include dividends or interest?</h4>
            <p className="text-xs text-muted-foreground">
              It should. Total ROI includes all returns: price appreciation plus dividends, interest, or distributions. If you bought a stock at $100, it's now worth $110, and you collected $5 in dividends, your total return is $15 on $100 – a 15% ROI, not 10%.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between ROI and ROE?</h4>
            <p className="text-xs text-muted-foreground">
              ROI measures return on total investment. ROE (Return on Equity) measures return specifically on shareholders' equity. ROE is more relevant for analyzing company performance. ROI is better for personal investment decisions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I compare investments with different time periods?</h4>
            <p className="text-xs text-muted-foreground">
              Use annualized ROI. A 40% return over 4 years (8.8% annualized) is worse than a 15% return over 1 year (15% annualized). Our calculator shows both metrics so you can make apples-to-apples comparisons.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Compound Interest Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate investment growth over time</p>
            </a>
            <a href="/calculators/4-percent-rule-retirement-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">4% Rule Retirement Calculator</p>
              <p className="text-xs text-muted-foreground">Plan retirement withdrawals</p>
            </a>
            <a href="/calculators/rental-roi-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Rental ROI Calculator</p>
              <p className="text-xs text-muted-foreground">Analyze rental property returns</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
