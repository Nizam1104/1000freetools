"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EMILoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
    amortization: { month: number; payment: number; principal: number; interest: number; balance: number }[];
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(tenure);

    if (isNaN(P) || isNaN(R) || isNaN(T)) {
      setError("Please enter valid numbers for all fields");
      setResult(null);
      return;
    }

    if (P <= 0 || R <= 0 || T <= 0) {
      setError("All values must be greater than 0");
      setResult(null);
      return;
    }

    const tenureInMonths = tenureUnit === "years" ? T * 12 : T;
    const monthlyRate = R / 12 / 100;

    const emi = P * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths) / (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
    const totalPayment = emi * tenureInMonths;
    const totalInterest = totalPayment - P;

    // Generate amortization schedule
    const amortization: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    let balance = P;

    for (let month = 1; month <= Math.min(tenureInMonths, 60); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      amortization.push({
        month,
        payment: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setResult({
      emi: Math.round(emi * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      amortization
    });
    setError("");
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setTenureUnit("years");
    setResult(null);
    setError("");
  };

  const loadExample = (p: string, r: string, t: string, unit: "years" | "months" = "years") => {
    setPrincipal(p);
    setRate(r);
    setTenure(t);
    setTenureUnit(unit);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">EMI Calculator – Calculate Monthly Loan EMI Online</h1>
        <p className="text-muted-foreground">
          Calculate your monthly EMI for any loan with our free online EMI calculator. Enter principal, interest rate, and loan tenure to get the exact monthly payment, total interest, and amortization schedule.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Loan Amount (Principal)</Label>
            <Input
              type="number"
              placeholder="e.g., 500000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              placeholder="e.g., 8.5"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <Label>Loan Tenure</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="e.g., 20"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="flex-1"
              />
              <Select value={tenureUnit} onValueChange={(v) => setTenureUnit(v as "years" | "months")}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate EMI</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("500000", "8.5", "20")}>Home Loan</Button>
          <Button variant="outline" onClick={() => loadExample("25000", "12", "3")}>Personal Loan</Button>
          <Button variant="outline" onClick={() => loadExample("1500000", "7.2", "30")}>Mortgage</Button>
          <Button variant="outline" onClick={() => loadExample("50000", "10", "5")}>Car Loan</Button>
          <Button variant="outline" onClick={() => loadExample("100000", "9.5", "10")}>Business Loan</Button>
          <Button variant="outline" onClick={() => loadExample("20000", "18", "24", "months")}>Short-term</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-primary text-primary-foreground rounded-lg text-center">
                <p className="text-sm opacity-80 mb-2">Monthly EMI</p>
                <p className="text-4xl font-bold">${result.emi.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Payment</p>
                <p className="text-3xl font-bold">${result.totalPayment.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Interest</p>
                <p className="text-3xl font-bold">${result.totalInterest.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">EMI Formula</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                EMI = P × r × (1+r)^n / ((1+r)^n - 1)<br />
                <br />
                Where:<br />
                P = {parseFloat(principal).toLocaleString()} (Principal)<br />
                r = {(parseFloat(rate) / 12 / 100).toFixed(6)} (Monthly interest rate)<br />
                n = {tenureUnit === "years" ? `${tenure} × 12 = ${parseFloat(tenure) * 12}` : tenure} (Months)
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Loan Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <p className="font-semibold">${parseFloat(principal).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <p className="font-semibold">{rate}% per annum</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Loan Tenure:</span>
                  <p className="font-semibold">{tenure} {tenureUnit}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Interest/Principal:</span>
                  <p className="font-semibold">{((result.totalInterest / parseFloat(principal)) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Amortization Schedule (First 60 Months)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Month</th>
                      <th className="text-right p-2">Payment</th>
                      <th className="text-right p-2">Principal</th>
                      <th className="text-right p-2">Interest</th>
                      <th className="text-right p-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortization.slice(0, 12).map((row) => (
                      <tr key={row.month} className="border-b">
                        <td className="p-2">{row.month}</td>
                        <td className="text-right">${row.payment.toFixed(2)}</td>
                        <td className="text-right text-green-600">${row.principal.toFixed(2)}</td>
                        <td className="text-right text-red-600">${row.interest.toFixed(2)}</td>
                        <td className="text-right">${row.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                    {result.amortization.length > 12 && (
                      <tr>
                        <td colSpan={5} className="p-2 text-center text-muted-foreground">
                          ... and {result.amortization.length - 12} more months
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-400">Payment Breakdown</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Principal portion:</span>
                  <p className="font-semibold">{((parseFloat(principal) / result.totalPayment) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Interest portion:</span>
                  <p className="font-semibold">{((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding EMI Calculations</h2>
        <p className="text-muted-foreground">
          EMI stands for Equated Monthly Installment – a fixed payment amount made by a borrower to a lender at a specified date each month. EMIs are used to pay off both interest and principal each month, so that over a specified number of years, the loan is paid off in full.
        </p>
        <p className="text-muted-foreground">
          The EMI formula might look intimidating, but it's designed to ensure that each payment covers the interest due plus some principal. Early payments are mostly interest; later payments are mostly principal. This is why paying extra early in a loan saves so much interest over time.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The EMI Formula Explained</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="text-center mb-4">
            <p className="text-lg font-mono">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Variables</h4>
              <ul className="space-y-1">
                <li><strong>P</strong> = Principal loan amount</li>
                <li><strong>r</strong> = Monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
                <li><strong>n</strong> = Loan tenure in months</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">How It Works</h4>
              <p className="text-muted-foreground">
                The formula ensures each payment is identical. The (1+r)^n term accounts for compound interest over the loan term. The denominator normalizes the payment so the loan reaches exactly zero at the end.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Home Loan of $500,000</h4>
            <div className="text-sm space-y-2">
              <p>Principal: $500,000</p>
              <p>Interest Rate: 8.5% per annum</p>
              <p>Tenure: 20 years (240 months)</p>
              <p>Monthly EMI: ~$4,339</p>
              <p>Total Payment: ~$1,041,360</p>
              <p>Total Interest: ~$541,360</p>
              <p className="text-muted-foreground">Over 20 years, you pay more in interest than the original loan amount. This is typical for long-term mortgages.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Personal Loan of $25,000</h4>
            <div className="text-sm space-y-2">
              <p>Principal: $25,000</p>
              <p>Interest Rate: 12% per annum</p>
              <p>Tenure: 3 years (36 months)</p>
              <p>Monthly EMI: ~$830</p>
              <p>Total Payment: ~$29,880</p>
              <p>Total Interest: ~$4,880</p>
              <p className="text-muted-foreground">Personal loans have higher rates but shorter terms, so total interest is lower than mortgages.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 30-Year Mortgage of $1,500,000</h4>
            <div className="text-sm space-y-2">
              <p>Principal: $1,500,000</p>
              <p>Interest Rate: 7.2% per annum</p>
              <p>Tenure: 30 years (360 months)</p>
              <p>Monthly EMI: ~$10,180</p>
              <p>Total Payment: ~$3,664,800</p>
              <p>Total Interest: ~$2,164,800</p>
              <p className="text-muted-foreground">A 30-year mortgage spreads payments thin but accumulates massive interest. Consider extra payments to reduce total cost.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Car Loan of $50,000</h4>
            <div className="text-sm space-y-2">
              <p>Principal: $50,000</p>
              <p>Interest Rate: 10% per annum</p>
              <p>Tenure: 5 years (60 months)</p>
              <p>Monthly EMI: ~$1,062</p>
              <p>Total Payment: ~$63,720</p>
              <p>Total Interest: ~$13,720</p>
              <p className="text-muted-foreground">Auto loans typically have moderate rates and 3-7 year terms. The car depreciates while you're still paying.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Short-term Loan of $20,000</h4>
            <div className="text-sm space-y-2">
              <p>Principal: $20,000</p>
              <p>Interest Rate: 18% per annum</p>
              <p>Tenure: 24 months</p>
              <p>Monthly EMI: ~$998</p>
              <p>Total Payment: ~$23,952</p>
              <p>Total Interest: ~$3,952</p>
              <p className="text-muted-foreground">Short-term loans have higher monthly payments but much lower total interest. Great if you can afford the payments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>Making one extra EMI payment per year can cut years off your loan.</strong> For a 30-year mortgage at 7%, one extra payment annually can reduce the term by 8-10 years and save hundreds of thousands in interest. Even small extra payments toward principal make a significant difference over time.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How is EMI different from simple interest?</h4>
            <p className="text-sm text-muted-foreground">
              EMI uses reducing balance interest – you pay interest only on the remaining principal. Simple interest loans calculate interest on the original principal throughout. EMI is fairer because you're not paying interest on money you've already repaid.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is most of my early payment going to interest?</h4>
            <p className="text-sm text-muted-foreground">
              Interest is calculated on the outstanding balance. At the start, the balance is highest, so interest is highest. As you pay down principal, the interest portion decreases and more goes to principal. This is called amortization.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I make extra payments toward principal?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, if your loan allows it without prepayment penalties. Extra principal payments reduce the balance faster, which reduces future interest. Even an extra $100/month can save thousands over a mortgage's life.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good interest rate for loans?</h4>
            <p className="text-sm text-muted-foreground">
              It depends on the loan type and your credit. Mortgages: 3-7%, Car loans: 4-10%, Personal loans: 6-36%, Credit cards: 15-25%. Shop around and improve your credit score for better rates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does loan tenure affect EMI?</h4>
            <p className="text-sm text-muted-foreground">
              Longer tenure = lower EMI but more total interest. Shorter tenure = higher EMI but less total interest. Choose based on what you can afford monthly versus total cost over the loan's life.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can EMI change during the loan term?</h4>
            <p className="text-sm text-muted-foreground">
              For fixed-rate loans, EMI stays constant. For adjustable-rate loans (ARMs), EMI can change when the interest rate adjusts. Some loans allow prepayment which can reduce EMI or tenure.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
