"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

export default function EMIForHomeLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [result, setResult] = useState<any>(null);
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    let N = parseFloat(tenure);
    if (tenureUnit === "years") N *= 12;

    if (P > 0 && R > 0 && N > 0) {
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalPayment = emi * N;
      const totalInterest = totalPayment - P;

      setResult({
        emi: Math.round(emi * 100) / 100,
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        principal: P,
        tenure: N
      });

      setPieData([
        { name: "Principal", value: P, color: "#4CAF50" },
        { name: "Interest", value: totalInterest, color: "#F44336" }
      ]);

      const yearlyData = [];
      let balance = P;
      for (let year = 1; year <= Math.min(N / 12, 30); year++) {
        const yearInterest = balance * (parseFloat(interestRate) / 100);
        const yearPrincipal = emi * 12 - yearInterest;
        balance -= yearPrincipal;
        if (balance < 0) balance = 0;
        yearlyData.push({
          year: `Year ${year}`,
          interest: Math.round(yearInterest),
          principal: Math.round(yearPrincipal),
          balance: Math.round(balance)
        });
      }
      setBarData(yearlyData);
    }
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setResult(null);
    setPieData([]);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Home Loan EMI Calculator – Calculate Monthly EMI and Interest</CardTitle>
          <CardDescription>
            Calculate your monthly home loan EMI, total interest, and repayment schedule with our free home loan EMI calculator. Enter loan amount, interest rate, and tenure for instant results. Essential for home buyers comparing mortgage options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Loan Amount ($)</Label>
              <Input type="number" placeholder="e.g., 200000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            </div>
            <div>
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" step="0.1" placeholder="e.g., 8.5" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Loan Tenure</Label>
                <Input type="number" placeholder="e.g., 20" value={tenure} onChange={(e) => setTenure(e.target.value)} />
              </div>
              <div>
                <Label>Unit</Label>
                <select
                  value={tenureUnit}
                  onChange={(e) => setTenureUnit(e.target.value as typeof tenureUnit)}
                  className="w-full p-2 border rounded"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate EMI</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <p className="text-5xl font-bold">${result.emi.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Interest</p>
                    <p className="text-xl font-semibold">${result.totalInterest.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Payment</p>
                    <p className="text-xl font-semibold">${result.totalPayment.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Home Loan EMI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>EMI (Equated Monthly Installment) is the fixed amount you pay monthly to repay your home loan. Each EMI consists of both principal and interest components.</p>

          <h3 className="text-xl font-semibold">EMI Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            EMI = P × R × (1+R)^N / [(1+R)^N - 1]
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>P = Principal loan amount</li>
            <li>R = Monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
            <li>N = Loan tenure in months</li>
          </ul>

          <h3 className="text-xl font-semibold">How EMI Works</h3>
          <p>In early years, most of your EMI goes toward interest. As the principal reduces, more of your EMI goes toward principal repayment. This is called the reducing balance method.</p>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>Loan: $200,000 at 8.5% for 20 years</p>
          <p>Monthly EMI: $1,735</p>
          <p>Total Interest: $216,400</p>
          <p>Total Payment: $416,400</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Principal vs Interest Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yearly Amortization</CardTitle>
          <CardDescription>Principal and interest breakdown over time</CardDescription>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="principal" fill="#4CAF50" name="Principal" />
                <Bar dataKey="interest" fill="#F44336" name="Interest" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Home Loan Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Compare interest rates from multiple lenders</li>
            <li>Shorter tenure means higher EMI but less total interest</li>
            <li>Make prepayments to reduce interest burden</li>
            <li>Check for prepayment penalties</li>
            <li>Consider floating vs fixed rate options</li>
            <li>Improve credit score for better rates</li>
          </ul>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Home Loan EMI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Loan Amount</h3>
              <p className="text-sm text-muted-foreground">Input the total home loan amount you plan to borrow from the lender.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Set Interest Rate & Tenure</h3>
              <p className="text-sm text-muted-foreground">Provide the annual interest rate and loan tenure in years or months.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Get Instant EMI Result</h3>
              <p className="text-sm text-muted-foreground">View your monthly EMI, total interest payable, and complete amortization charts.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits of Using This Home Loan EMI Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Accurate EMI Calculation
              </h3>
              <p className="text-sm text-muted-foreground">Get precise monthly payment calculations using the standard reducing balance formula used by banks.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Visual Interest Breakdown
              </h3>
              <p className="text-sm text-muted-foreground">Pie chart shows the proportion of principal vs total interest over the entire loan term.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Yearly Amortization Chart
              </h3>
              <p className="text-sm text-muted-foreground">Bar graph displays how principal and interest components change year by year.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Flexible Tenure Options
              </h3>
              <p className="text-sm text-muted-foreground">Calculate EMI for loans in years or months to match your lender's terms.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Compare Loan Scenarios
              </h3>
              <p className="text-sm text-muted-foreground">Test different loan amounts, rates, and tenures to find affordable payment options.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions About Home Loan EMI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is a good EMI to income ratio for home loans?</h3>
              <p className="text-sm text-muted-foreground">Lenders typically prefer EMI to be 40-50% of your monthly income. Keeping it below 40% ensures comfortable repayment without financial stress.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How can I reduce my home loan EMI?</h3>
              <p className="text-sm text-muted-foreground">Opt for a longer tenure, make a larger down payment, improve your credit score for better rates, or choose a floating rate loan when interest rates are falling.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What happens if I make a prepayment on my home loan?</h3>
              <p className="text-sm text-muted-foreground">Prepayments reduce the principal outstanding, which either reduces your EMI or shortens the loan tenure, saving significant interest over time.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Is it better to choose a shorter or longer loan tenure?</h3>
              <p className="text-sm text-muted-foreground">Shorter tenures have higher EMIs but much lower total interest. Choose shorter if affordable; otherwise, prepay when possible on longer tenures.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How does interest rate affect my home loan EMI?</h3>
              <p className="text-sm text-muted-foreground">Even a 0.5% rate change significantly impacts EMI. On a $200,000, 20-year loan, 8% vs 8.5% changes EMI by about $60/month and total interest by $14,000.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools Section */}
      <Card>
        <CardHeader>
          <CardTitle>Related Mortgage & Loan Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/emi-breakup-visualizer" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">EMI Breakup Visualizer</h3>
              <p className="text-sm text-muted-foreground">See month-by-month principal and interest breakdown with interactive amortization charts.</p>
            </a>
            <a href="/calculators/mortgage-amortization-schedule" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Mortgage Amortization Schedule</h3>
              <p className="text-sm text-muted-foreground">Generate a complete payment schedule showing every monthly payment throughout your mortgage.</p>
            </a>
            <a href="/calculators/buy-vs-rent-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Buy vs Rent Calculator</h3>
              <p className="text-sm text-muted-foreground">Compare the financial benefits of buying a home versus renting over time.</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
