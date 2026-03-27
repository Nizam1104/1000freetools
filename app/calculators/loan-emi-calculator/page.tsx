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


export default function LoanEMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanTenure) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    setResult({ emi, totalPayment, totalInterest });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setResult(null);
  };

  // Generate pie chart data
  const pieData = result ? [
    { name: "Principal", value: parseFloat(loanAmount), fill: "hsl(var(--chart-1))" },
    { name: "Interest", value: result.totalInterest, fill: "hsl(var(--chart-2))" },
  ] : [];

  // Generate comparison data for different tenures
  const tenureComparison = loanAmount && interestRate ? [
    { tenure: "5 years", emi: calculateEMIForTenure(5, parseFloat(loanAmount), parseFloat(interestRate)), total: calculateEMIForTenure(5, parseFloat(loanAmount), parseFloat(interestRate)) * 60 },
    { tenure: "10 years", emi: calculateEMIForTenure(10, parseFloat(loanAmount), parseFloat(interestRate)), total: calculateEMIForTenure(10, parseFloat(loanAmount), parseFloat(interestRate)) * 120 },
    { tenure: "15 years", emi: calculateEMIForTenure(15, parseFloat(loanAmount), parseFloat(interestRate)), total: calculateEMIForTenure(15, parseFloat(loanAmount), parseFloat(interestRate)) * 180 },
    { tenure: "20 years", emi: calculateEMIForTenure(20, parseFloat(loanAmount), parseFloat(interestRate)), total: calculateEMIForTenure(20, parseFloat(loanAmount), parseFloat(interestRate)) * 240 },
    { tenure: "30 years", emi: calculateEMIForTenure(30, parseFloat(loanAmount), parseFloat(interestRate)), total: calculateEMIForTenure(30, parseFloat(loanAmount), parseFloat(interestRate)) * 360 },
  ] : [];

  function calculateEMIForTenure(years: number, P: number, rate: number) {
    const R = rate / 12 / 100;
    const N = years * 12;
    return Math.round(P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1) * 100) / 100;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="Enter loan amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                <Input
                  id="loanTenure"
                  type="number"
                  placeholder="Enter loan tenure in years"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEMI} className="flex-1">
                  Calculate EMI
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
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-3xl font-bold text-primary">${result.emi.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold">${result.totalInterest.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: EMI = P × R × (1+R)^N / [(1+R)^N - 1]</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {pieData.length > 0 && (
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
                      <span className="text-sm">Principal: ${parseFloat(loanAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-2))" }}></div>
                      <span className="text-sm">Interest: ${result?.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm font-medium">Total: ${result?.totalPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tenureComparison.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">EMI by Loan Tenure</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    emi: { label: "Monthly EMI", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tenureComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tenure" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="emi" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Longer tenure = lower EMI but higher total interest paid
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is EMI?</CardTitle>
          <CardDescription>Understanding Equated Monthly Installments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay a loan. It includes both principal and interest. The beauty of EMI is predictability – you know exactly what to budget for each month.
          </p>
          <p className="text-sm text-muted-foreground">
            Early in your loan, most of your EMI goes toward interest. Later, more goes toward principal. This is called amortization. A 30-year mortgage might have you paying 80% interest in year one, but only 20% interest in year 30.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">EMI Formula</p>
            <p className="font-mono text-center text-sm">EMI = P × R × (1+R)^N / [(1+R)^N - 1]</p>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              P = Principal, R = Monthly interest rate, N = Number of months
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typical Loan Interest Rates</CardTitle>
          <CardDescription>Current average rates by loan type</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Type</TableHead>
                <TableHead>Typical Rate Range</TableHead>
                <TableHead>Common Tenure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Home Loan</TableCell>
                <TableCell className="font-mono text-xs">6.5% - 8.5%</TableCell>
                <TableCell className="text-xs">15-30 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Car Loan</TableCell>
                <TableCell className="font-mono text-xs">5% - 10%</TableCell>
                <TableCell className="text-xs">3-7 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Personal Loan</TableCell>
                <TableCell className="font-mono text-xs">10% - 24%</TableCell>
                <TableCell className="text-xs">1-5 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Business Loan</TableCell>
                <TableCell className="font-mono text-xs">8% - 18%</TableCell>
                <TableCell className="text-xs">1-10 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Education Loan</TableCell>
                <TableCell className="font-mono text-xs">8% - 12%</TableCell>
                <TableCell className="text-xs">5-15 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Loan Against Property</TableCell>
                <TableCell className="font-mono text-xs">8% - 11%</TableCell>
                <TableCell className="text-xs">10-20 years</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Rates vary by credit score, income, lender, and market conditions. Check with multiple lenders for best rates.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Tenure Affects Your EMI</CardTitle>
          <CardDescription>Trade-offs between loan duration and total cost</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Longer tenure means lower EMI but higher total interest. Shorter tenure means higher EMI but less interest overall. The difference can be massive – a 30-year loan can cost 2-3× the original amount in total interest.
          </p>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Example: $100,000 Loan at 7%</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenure</TableHead>
                  <TableHead>Monthly EMI</TableHead>
                  <TableHead>Total Interest</TableHead>
                  <TableHead>Total Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">10 years</TableCell>
                  <TableCell className="font-mono">$1,161</TableCell>
                  <TableCell className="font-mono">$39,320</TableCell>
                  <TableCell className="font-mono">$139,320</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">20 years</TableCell>
                  <TableCell className="font-mono">$775</TableCell>
                  <TableCell className="font-mono">$86,050</TableCell>
                  <TableCell className="font-mono">$186,050</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">30 years</TableCell>
                  <TableCell className="font-mono">$665</TableCell>
                  <TableCell className="font-mono">$139,460</TableCell>
                  <TableCell className="font-mono">$239,460</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            The 30-year loan has a $500 lower EMI than the 10-year, but costs $100,000 more in total. Choose based on what you can afford monthly versus what you can afford overall.
          </p>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How is EMI calculated?",
    answer: "EMI uses the reducing balance method: EMI = P × R × (1+R)^N / [(1+R)^N - 1]. P is loan amount, R is monthly interest rate (annual rate ÷ 12 ÷ 100), N is tenure in months. The formula ensures equal payments throughout the loan term.",
  },
{
    question: "Can I reduce my EMI?",
    answer: "Yes, by extending tenure, making partial prepayments, or refinancing at a lower rate. Prepayments directly reduce principal, which reduces future interest. Even small extra payments can shave years off your loan.",
  },
{
    question: "What happens if I miss an EMI?",
    answer: "Late fees apply (typically 2-3% per month). Your credit score takes a hit after 30 days. After 90 days, the loan becomes NPA (non-performing asset). Consistent defaults can lead to asset seizure for secured loans.",
  },
{
    question: "Is it better to reduce EMI or tenure?",
    answer: "If you can afford it, reducing tenure saves more interest. But if cash flow is tight, reducing EMI gives breathing room. Some lenders let you prepay without changing EMI – this automatically shortens tenure and maximizes interest savings.",
  },
{
    question: "What's the difference between flat and reducing rate?",
    answer: "Flat rate calculates interest on original principal throughout. Reducing rate calculates on outstanding balance. A 10% flat rate equals ~18% reducing rate. Always compare reducing rates – they're the true cost of borrowing.",
  }
  ]} />
</section>
    </div>
  );
}
