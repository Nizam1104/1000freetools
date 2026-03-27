"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FixedDepositInterestCalculatorPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [tenureType, setTenureType] = useState<string>("years");
  const [compounding, setCompounding] = useState<string>("4");
  const [result, setResult] = useState<{
    maturityAmount: number;
    totalInterest: number;
    effectiveRate: number;
  } | null>(null);

  const calculateFD = () => {
    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 100;
    const T = tenureType === "years" ? parseFloat(tenure) : parseFloat(tenure) / 12;
    const n = parseInt(compounding);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      return;
    }

    const maturityAmount = P * Math.pow(1 + R / n, n * T);
    const totalInterest = maturityAmount - P;
    const effectiveRate = (Math.pow(1 + R / n, n) - 1) * 100;

    setResult({
      maturityAmount,
      totalInterest,
      effectiveRate,
    });
  };

  const reset = () => {
    setPrincipal("");
    setInterestRate("");
    setTenure("");
    setTenureType("years");
    setCompounding("4");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Fixed Deposit (FD) Interest Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the maturity amount and total interest earned on your fixed deposit. Enter principal, interest rate, tenure, and compounding frequency for precise results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Principal Amount</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter deposit amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="tenure">Tenure</Label>
                  <Input
                    id="tenure"
                    type="number"
                    placeholder="Enter tenure"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenureType">Type</Label>
                  <Select value={tenureType} onValueChange={setTenureType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="years">Years</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="compounding">Compounding Frequency</Label>
                <Select value={compounding} onValueChange={setCompounding}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-Annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateFD} className="flex-1">
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Maturity Amount</p>
                    <p className="text-3xl font-bold text-primary">${result.maturityAmount.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="text-lg font-bold">${parseFloat(principal).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Interest Earned</p>
                      <p className="text-lg font-bold text-green-600">${result.totalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Effective Annual Rate</p>
                    <p className="text-lg font-bold">{result.effectiveRate.toFixed(2)}%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Calculate Fixed Deposit Interest</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                <strong>Step 1:</strong> Enter your principal deposit amount and the annual interest rate offered by your bank.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Step 2:</strong> Select your tenure (in years or months) and compounding frequency (monthly, quarterly, semi-annually, or annually).
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Step 3:</strong> Click Calculate to see your maturity amount, total interest earned, and effective annual rate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understanding Fixed Deposits and Compound Interest</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What Is a Fixed Deposit</h4>
                <p className="text-sm text-muted-foreground">
                  A fixed deposit (FD) is a savings instrument where you deposit money for a fixed period at a guaranteed interest rate. Banks pay higher rates than regular savings accounts because you agree not to withdraw the money until maturity. FDs are low-risk and ideal for conservative investors or short-term goals.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">How Compound Interest Works in FDs</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Compound interest means you earn interest on your interest. The frequency matters:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-semibold text-sm mb-2">Monthly Compounding</p>
                    <p className="text-xs text-muted-foreground">
                      Interest is calculated and added every month. Best for maximizing returns. A 6% FD compounded monthly gives 6.17% effective rate.
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-semibold text-sm mb-2">Quarterly Compounding</p>
                    <p className="text-xs text-muted-foreground">
                      Most common for FDs. Interest is added every 3 months. A 6% FD compounded quarterly gives 6.14% effective rate.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">The FD Maturity Formula</h4>
                <p className="text-sm text-muted-foreground">
                  A = P × (1 + r/n)^(n×t). P is principal, r is annual rate (as decimal), n is compounding frequency per year, t is time in years. For $10,000 at 6% for 5 years compounded quarterly: A = 10000 × (1 + 0.06/4)^(4×5) = $13,468.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fixed Deposit Interest Rates Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institution Type</TableHead>
                    <TableHead>Typical Rate Range</TableHead>
                    <TableHead>Best For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Large national banks</TableCell>
                    <TableCell className="font-mono">3-5%</TableCell>
                    <TableCell>Safety, convenience</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Regional banks</TableCell>
                    <TableCell className="font-mono">4-6%</TableCell>
                    <TableCell>Better rates, local service</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Credit unions</TableCell>
                    <TableCell className="font-mono">4-6%</TableCell>
                    <TableCell>Member benefits, competitive rates</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Online banks</TableCell>
                    <TableCell className="font-mono">5-7%</TableCell>
                    <TableCell>Highest rates, no branches</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Post office FDs</TableCell>
                    <TableCell className="font-mono">5-7%</TableCell>
                    <TableCell>Government backing, tax benefits</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Corporate FDs</TableCell>
                    <TableCell className="font-mono">7-9%</TableCell>
                    <TableCell>Higher returns, higher risk</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-3">
                Rates vary by country, tenure, and deposit amount. Longer tenures typically offer higher rates. Senior citizens often get 0.25-0.50% extra.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compounding Frequency Comparison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold text-sm mb-3">Example: $10,000 at 6% for 5 Years</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Compounding</TableHead>
                      <TableHead>Effective Rate</TableHead>
                      <TableHead>Maturity Amount</TableHead>
                      <TableHead>Interest Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Annually</TableCell>
                      <TableCell className="font-mono">6.00%</TableCell>
                      <TableCell className="font-mono">$13,382</TableCell>
                      <TableCell className="font-mono">$3,382</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Semi-Annually</TableCell>
                      <TableCell className="font-mono">6.09%</TableCell>
                      <TableCell className="font-mono">$13,439</TableCell>
                      <TableCell className="font-mono">$3,439</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quarterly</TableCell>
                      <TableCell className="font-mono">6.14%</TableCell>
                      <TableCell className="font-mono">$13,468</TableCell>
                      <TableCell className="font-mono">$3,468</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Monthly</TableCell>
                      <TableCell className="font-mono">6.17%</TableCell>
                      <TableCell className="font-mono">$13,488</TableCell>
                      <TableCell className="font-mono">$3,488</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground">
                More frequent compounding gives slightly higher returns. Monthly vs annually makes a $106 difference on $10,000 over 5 years.
              </p>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How is FD interest calculated?",
    answer: "FD interest uses compound interest formula: A = P(1 + r/n)^(nt). Most banks compound quarterly. For simple interest FDs (rare), use I = P × r × t. Compound interest always gives higher returns over time.",
  },
{
    question: "Is FD interest taxable?",
    answer: "Yes, FD interest is taxable as income. Banks deduct TDS (tax deducted at source) if interest exceeds threshold limits. Tax-saving FDs (5-year lock-in) offer deduction under Section 80C in India up to $1,500.",
  },
{
    question: "Can I withdraw FD before maturity?",
    answer: "Yes, but with penalties. Banks typically charge 0.5-1% lower interest on premature withdrawals. Some banks allow partial withdrawals. Tax-saving FDs cannot be broken before 5 years.",
  },
{
    question: "What happens to FD on maturity?",
    answer: "Banks either credit the amount to your linked account or auto-renew the FD at prevailing rates. Auto-renewal is convenient but you might miss better rates elsewhere. Set maturity instructions when opening the FD.",
  },
{
    question: "Are fixed deposits safe?",
    answer: "Bank FDs are very safe. In the US, FDIC insures up to $250,000. In India, DICGC insures up to ₹5 lakh per bank. Corporate FDs carry higher risk but offer better rates. Diversify across banks for large amounts.",
  }
  ]} />
</section>
        </div>
      </div>
    </div>
  );
}
