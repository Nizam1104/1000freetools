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

export default function CarLoanCalculatorPage() {
  const [vehiclePrice, setVehiclePrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanDuration, setLoanDuration] = useState<string>("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalLoan: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  const calculateCarLoan = () => {
    const P = parseFloat(vehiclePrice) - parseFloat(downPayment);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanDuration) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const monthlyPayment = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalInterest = monthlyPayment * N - P;
    const totalCost = parseFloat(vehiclePrice) + totalInterest;

    setResult({ monthlyPayment, totalLoan: P, totalInterest, totalCost });
  };

  const reset = () => {
    setVehiclePrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanDuration("");
    setResult(null);
  };

  // Generate pie chart data
  const pieData = result ? [
    { name: "Vehicle Price", value: parseFloat(vehiclePrice), fill: "hsl(var(--chart-1))" },
    { name: "Interest", value: result.totalInterest, fill: "hsl(var(--chart-2))" },
  ] : [];

  // Generate comparison data for different loan terms
  const termComparison = vehiclePrice && downPayment && interestRate ? [
    { term: "36 mo", payment: calculatePayment(parseFloat(vehiclePrice) - parseFloat(downPayment), parseFloat(interestRate), 3) },
    { term: "48 mo", payment: calculatePayment(parseFloat(vehiclePrice) - parseFloat(downPayment), parseFloat(interestRate), 4) },
    { term: "60 mo", payment: calculatePayment(parseFloat(vehiclePrice) - parseFloat(downPayment), parseFloat(interestRate), 5) },
    { term: "72 mo", payment: calculatePayment(parseFloat(vehiclePrice) - parseFloat(downPayment), parseFloat(interestRate), 6) },
    { term: "84 mo", payment: calculatePayment(parseFloat(vehiclePrice) - parseFloat(downPayment), parseFloat(interestRate), 7) },
  ] : [];

  function calculatePayment(principal: number, rate: number, years: number) {
    const R = rate / 12 / 100;
    const N = years * 12;
    return Math.round(principal * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1) * 100) / 100;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Car Loan Calculator – Calculate Auto Loan Payments</CardTitle>
          <CardDescription>
            Plan your auto financing with confidence. Calculate your monthly car loan payment and total cost based on vehicle price, down payment, rate, and duration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                <Input
                  id="vehiclePrice"
                  type="number"
                  placeholder="Enter vehicle price"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(e.target.value)}
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
                  step="0.1"
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanDuration">Loan Duration (Years)</Label>
                <Input
                  id="loanDuration"
                  type="number"
                  placeholder="Enter loan duration in years"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCarLoan} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
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
                    <p className="text-sm text-muted-foreground">Total Cost of Vehicle</p>
                    <p className="text-xl font-bold">${result.totalCost.toFixed(2)}</p>
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
              <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[200px]">
                  <ChartContainer
                    config={{
                      price: { label: "Vehicle Price", color: "hsl(var(--chart-1))" },
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
                      <span className="text-sm">Vehicle: ${parseFloat(vehiclePrice).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-2))" }}></div>
                      <span className="text-sm">Interest: ${result.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm font-medium">Total: ${result.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {termComparison.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Payment by Loan Term</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    payment: { label: "Monthly Payment", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={termComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="term" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="payment" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Longer terms mean lower payments but much more total interest
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Car Loan Terms</CardTitle>
          <CardDescription>What affects your auto loan rate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Car loan rates depend on your credit score, loan term, down payment, and the vehicle itself. New cars typically get better rates than used. Shorter terms (36-48 months) have lower rates than 72-84 month loans.
          </p>
          <p className="text-sm text-muted-foreground">
            Dealer financing can be convenient but isn't always the best deal. Credit unions often offer lower rates. Manufacturer incentives (0%, 1.9%, 2.9%) are great if you qualify – but sometimes cash rebates with bank financing save more overall.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Credit Score Impact on Auto Loan Rates</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Credit Score</TableHead>
                  <TableHead>Typical Rate (New)</TableHead>
                  <TableHead>Typical Rate (Used)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">780+</TableCell>
                  <TableCell className="font-mono text-xs">4-5%</TableCell>
                  <TableCell className="font-mono text-xs">5-6%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">720-779</TableCell>
                  <TableCell className="font-mono text-xs">5-6%</TableCell>
                  <TableCell className="font-mono text-xs">6-7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">680-719</TableCell>
                  <TableCell className="font-mono text-xs">6-8%</TableCell>
                  <TableCell className="font-mono text-xs">7-9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">620-679</TableCell>
                  <TableCell className="font-mono text-xs">8-12%</TableCell>
                  <TableCell className="font-mono text-xs">10-14%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Below 620</TableCell>
                  <TableCell className="font-mono text-xs">12%+</TableCell>
                  <TableCell className="font-mono text-xs">15%+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Truth About Long Car Loans</CardTitle>
          <CardDescription>Why 72+ month loans cost more than you think</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            84-month (7-year) car loans are increasingly common. They make expensive cars "affordable" by spreading payments thin. But here's the catch: cars depreciate fast, and long loans often leave you upside down (owing more than the car's worth) for years.
          </p>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Example: $35,000 Car at 6%</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Term</TableHead>
                  <TableHead>Monthly Payment</TableHead>
                  <TableHead>Total Interest</TableHead>
                  <TableHead>Upside Down Until</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">36 months</TableCell>
                  <TableCell className="font-mono">$1,065</TableCell>
                  <TableCell className="font-mono">$3,340</TableCell>
                  <TableCell className="font-mono">~6 months</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">60 months</TableCell>
                  <TableCell className="font-mono">$677</TableCell>
                  <TableCell className="font-mono">$5,620</TableCell>
                  <TableCell className="font-mono">~18 months</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">72 months</TableCell>
                  <TableCell className="font-mono">$580</TableCell>
                  <TableCell className="font-mono">$6,760</TableCell>
                  <TableCell className="font-mono">~30 months</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">84 months</TableCell>
                  <TableCell className="font-mono">$511</TableCell>
                  <TableCell className="font-mono">$7,924</TableCell>
                  <TableCell className="font-mono">~42 months</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            The 84-month loan saves $69/month versus 60 months but costs $2,300 more in interest and keeps you upside down nearly 4 years. If you crash or the car dies, you still owe the full balance. Gap insurance helps but adds cost.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Car Buying Tips</CardTitle>
          <CardDescription>How to get the best deal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Get pre-approved first</p>
                <p className="text-xs text-muted-foreground">Know your rate from a credit union or bank before visiting the dealer. This gives you negotiating power and a baseline to compare dealer financing.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Negotiate price, not payment</p>
                <p className="text-xs text-muted-foreground">Dealers can manipulate loan terms to hit a target payment while hiding a higher price. Negotiate the out-the-door price first, then discuss financing.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Put at least 20% down</p>
                <p className="text-xs text-muted-foreground">Cars depreciate 20% in year one. A 20% down payment keeps you from going upside down. If you can't afford 20% down, you probably can't afford the car.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <p className="font-medium text-sm">Skip the add-ons</p>
                <p className="text-xs text-muted-foreground">Extended warranties, fabric protection, VIN etching – these are high-margin profit centers for dealers. Most aren't worth the cost. Buy warranty later if you really want it.</p>
              </div>
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
            <h4 className="font-semibold text-sm mb-2">What's a good interest rate for a car loan?</h4>
            <p className="text-xs text-muted-foreground">
              With excellent credit (720+), 4-6% is typical for new cars, 5-7% for used. Average credit (680-719) sees 7-10%. Poor credit can mean 15%+. Credit unions often beat dealer rates. Manufacturer 0-2.9% deals are great if you qualify.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I lease or buy?</h4>
            <p className="text-xs text-muted-foreground">
              Lease if you want lower payments, drive under 12k miles/year, and like new cars every 3 years. Buy if you keep cars long-term, drive a lot, or want to build equity. Leasing long-term costs more than buying and keeping for 6+ years.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How much car can I afford?</h4>
            <p className="text-xs text-muted-foreground">
              The 20/4/10 rule: 20% down, 4-year loan max, total car costs (payment + insurance + gas) under 10% of gross income. On $5,000/month income, that's $500/month total, or ~$350 payment. Most people buy too much car.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is it better to finance through the dealer or bank?</h4>
            <p className="text-xs text-muted-foreground">
              Compare both. Dealer financing can be convenient and sometimes has manufacturer subsidies (0-2.9%). Banks and credit unions often have better rates for average credit. Get pre-approved elsewhere, then let the dealer try to beat it.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I pay off my car loan early?</h4>
            <p className="text-xs text-muted-foreground">
              Most car loans have no prepayment penalty. Paying extra goes directly to principal, reducing total interest. Some lenders apply extra payments to future months by default – specify "apply to principal" in writing.
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
            <a href="/calculators/loan-emi-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Loan EMI Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate any loan payment</p>
            </a>
            <a href="/calculators/car-loan-affordability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Car Affordability</p>
              <p className="text-xs text-muted-foreground">How much car can you afford</p>
            </a>
            <a href="/calculators/lease-vs-buy-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Lease vs Buy</p>
              <p className="text-xs text-muted-foreground">Compare leasing vs buying</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
