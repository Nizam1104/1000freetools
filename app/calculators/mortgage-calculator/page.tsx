"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Faqs from "@/components/utils/Faqs";


export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalLoan: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculateMortgage = () => {
    const P = parseFloat(homePrice) - parseFloat(downPayment);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanTerm) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const monthlyPayment = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = monthlyPayment * N;
    const totalInterest = totalPayment - P;

    setResult({ monthlyPayment, totalLoan: P, totalInterest, totalPayment });
  };

  const reset = () => {
    setHomePrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanTerm("");
    setResult(null);
  };

  // Generate pie chart data
  const pieData = result ? [
    { name: "Principal", value: result.totalLoan, fill: "hsl(var(--chart-1))" },
    { name: "Interest", value: result.totalInterest, fill: "hsl(var(--chart-2))" },
  ] : [];

  // Generate comparison data for different down payments
  const downPaymentComparison = homePrice && interestRate && loanTerm ? [
    { down: "3%", amount: parseFloat(homePrice) * 0.03, monthly: calculateMonthly(parseFloat(homePrice) * 0.97, parseFloat(interestRate), parseFloat(loanTerm)) },
    { down: "5%", amount: parseFloat(homePrice) * 0.05, monthly: calculateMonthly(parseFloat(homePrice) * 0.95, parseFloat(interestRate), parseFloat(loanTerm)) },
    { down: "10%", amount: parseFloat(homePrice) * 0.10, monthly: calculateMonthly(parseFloat(homePrice) * 0.90, parseFloat(interestRate), parseFloat(loanTerm)) },
    { down: "20%", amount: parseFloat(homePrice) * 0.20, monthly: calculateMonthly(parseFloat(homePrice) * 0.80, parseFloat(interestRate), parseFloat(loanTerm)) },
    { down: "30%", amount: parseFloat(homePrice) * 0.30, monthly: calculateMonthly(parseFloat(homePrice) * 0.70, parseFloat(interestRate), parseFloat(loanTerm)) },
  ] : [];

  function calculateMonthly(principal: number, rate: number, years: number) {
    const R = rate / 12 / 100;
    const N = years * 12;
    return Math.round(principal * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1) * 100) / 100;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price</Label>
                <Input
                  id="homePrice"
                  type="number"
                  placeholder="Enter home price"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="Enter down payment amount"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.125"
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  placeholder="Enter loan term in years"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMortgage} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Mortgage Payment</p>
                    <p className="text-3xl font-bold text-primary">${result.monthlyPayment.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="text-lg font-bold">${result.totalLoan.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold">${result.totalInterest.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Payment (Principal + Interest)</p>
                    <p className="text-xl font-bold">${result.totalPayment.toFixed(2)}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {pieData.length > 0 && result && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Loan Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[200px]">
                  <ChartContainer
                    config={{
                      principal: { label: "Principal", color: "hsl(var(--chart-1))" },
                      interest: { label: "Interest", color: "hsl(var(--chart-2))" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex items-center justify-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-1))" }}></div>
                      <span className="text-sm">Principal: ${result.totalLoan.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-2))" }}></div>
                      <span className="text-sm">Interest: ${result.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm font-medium">Total: ${result.totalPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {downPaymentComparison.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Monthly Payment by Down Payment</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    monthly: { label: "Monthly Payment", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={downPaymentComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="down" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="monthly" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Higher down payment = lower monthly payment and less total interest
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Mortgage Payments</CardTitle>
          <CardDescription>What goes into your monthly payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your mortgage payment isn't just principal and interest. Most lenders require escrow for property taxes and homeowners insurance. This is called PITI – Principal, Interest, Taxes, Insurance. Some loans also include PMI (private mortgage insurance) if your down payment is under 20%.
          </p>
          <p className="text-sm text-muted-foreground">
            The calculator shows principal and interest only. Add 1-2% of home value annually for property taxes (varies by location), 0.3-0.5% for insurance, and 0.5-1% for PMI if applicable. A $300,000 home might add $400-700/month beyond the base payment.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">PITI Breakdown Example</p>
            <div className="space-y-1 text-sm">
              <p>Principal & Interest: $1,500</p>
              <p>Property Taxes: $350</p>
              <p>Homeowners Insurance: $100</p>
              <p>PMI (if &lt;20% down): $150</p>
              <p className="font-semibold pt-2 border-t mt-2">Total Monthly: $2,100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Down Payment Guidelines</CardTitle>
          <CardDescription>How much should you put down?</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Down Payment</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>PMI Required</TableHead>
                <TableHead>Best For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">3%</TableCell>
                <TableCell className="text-xs">Conventional 97</TableCell>
                <TableCell className="text-xs">Yes</TableCell>
                <TableCell className="text-xs">First-time buyers, low savings</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">3.5%</TableCell>
                <TableCell className="text-xs">FHA Loan</TableCell>
                <TableCell className="text-xs">Yes (MIP)</TableCell>
                <TableCell className="text-xs">Lower credit scores</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5%</TableCell>
                <TableCell className="text-xs">Conventional</TableCell>
                <TableCell className="text-xs">Yes</TableCell>
                <TableCell className="text-xs">Minimum conventional</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">10%</TableCell>
                <TableCell className="text-xs">Conventional</TableCell>
                <TableCell className="text-xs">Yes</TableCell>
                <TableCell className="text-xs">Better rates, lower PMI</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">20%</TableCell>
                <TableCell className="text-xs">Conventional</TableCell>
                <TableCell className="text-xs">No</TableCell>
                <TableCell className="text-xs">Avoid PMI, best rates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">25%+</TableCell>
                <TableCell className="text-xs">Conventional/Jumbo</TableCell>
                <TableCell className="text-xs">No</TableCell>
                <TableCell className="text-xs">Best rates, investment properties</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            PMI typically costs 0.5-1% of loan amount annually and can be removed once you reach 20% equity.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>15-Year vs 30-Year Mortgage</CardTitle>
          <CardDescription>Choosing the right loan term</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">15-Year Mortgage</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Lower interest rates (typically 0.5-1% less)</li>
                <li>• Build equity faster</li>
                <li>• Pay off home sooner</li>
                <li>• Much less total interest</li>
                <li>• Higher monthly payment</li>
                <li>• Less flexibility in budget</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">30-Year Mortgage</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Lower monthly payment</li>
                <li>• More budget flexibility</li>
                <li>• Qualify for more house</li>
                <li>• Tax deduction lasts longer</li>
                <li>• Higher interest rates</li>
                <li>• Much more total interest paid</li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <h4 className="font-semibold text-sm mb-2">Example: $300,000 Loan at 6.5% (15yr) vs 7% (30yr)</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Term</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Monthly P&I</TableHead>
                  <TableHead>Total Interest</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">15 years</TableCell>
                  <TableCell className="font-mono">6.5%</TableCell>
                  <TableCell className="font-mono">$2,618</TableCell>
                  <TableCell className="font-mono">$171,240</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">30 years</TableCell>
                  <TableCell className="font-mono">7%</TableCell>
                  <TableCell className="font-mono">$1,996</TableCell>
                  <TableCell className="font-mono">$418,560</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-2">
              The 15-year saves $247,000 in interest but costs $622 more per month.
            </p>
          </div>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How much house can I afford?",
    answer: "The 28/36 rule: housing costs shouldn't exceed 28% of gross monthly income, total debt (including housing) shouldn't exceed 36%. On $5,000/month income, that's $1,400 for housing, $1,800 total debt. Lenders may allow up to 43-50% but that's risky.",
  },
{
    question: "What's a good mortgage rate?",
    answer: "\"Good\" depends on market conditions. As of recent years, anything under 6% is excellent, 6-7% is average, above 7% is high. Your rate depends on credit score, down payment, debt-to-income ratio, and loan type. Shop multiple lenders – rates can vary by 0.5% or more.",
  },
{
    question: "Should I pay points to lower my rate?",
    answer: "Points are prepaid interest – 1 point costs 1% of loan amount and typically reduces rate by 0.25%. Break-even is usually 4-7 years. If you'll keep the loan longer, points save money. If you'll refinance or sell sooner, skip points.",
  },
{
    question: "What's the difference between APR and interest rate?",
    answer: "Interest rate is what you pay on the loan balance. APR includes interest plus fees (origination, points, etc.) spread over the loan term. APR is always higher and shows the true cost. Compare APRs when shopping lenders, not just interest rates.",
  },
{
    question: "When does PMI go away?",
    answer: "PMI automatically terminates at 78% loan-to-value (22% equity) based on original value. You can request removal at 80% LTV (20% equity) with an appraisal. FHA loans have MIP for the life of the loan if down payment was under 10%.",
  }
  ]} />
</section>
    </div>
  );
}
