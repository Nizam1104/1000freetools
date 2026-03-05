"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreditCardPayoffCalculatorPage() {
  const [balance, setBalance] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");
  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalInterest: number;
    totalPayment: number;
    payoffDate: string;
  } | null>(null);

  const calculatePayoff = () => {
    const B = parseFloat(balance);
    const R = parseFloat(interestRate) / 100 / 12;
    const P = parseFloat(monthlyPayment);

    if (isNaN(B) || isNaN(R) || isNaN(P) || B <= 0 || R < 0 || P <= 0) {
      return;
    }

    if (P <= B * R) {
      return;
    }

    const months = -Math.log(1 - (B * R) / P) / Math.log(1 + R);
    const monthsToPayoff = Math.ceil(months);
    const totalPayment = monthsToPayoff * P;
    const totalInterest = totalPayment - B;

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + monthsToPayoff);

    setResult({
      monthsToPayoff,
      totalInterest,
      totalPayment,
      payoffDate: payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    });
  };

  const reset = () => {
    setBalance("");
    setInterestRate("");
    setMonthlyPayment("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Credit Card Payoff Calculator</h1>
          <p className="text-muted-foreground">
            Find out when you'll be debt-free and how much interest you'll pay. Enter your balance, interest rate, and fixed monthly payment to plan your payoff.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  placeholder="Enter credit card balance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter APR"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  placeholder="Enter monthly payment amount"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePayoff} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Debt-Free Date</p>
                    <p className="text-2xl font-bold text-primary">{result.payoffDate}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Months to Payoff</p>
                    <p className="text-2xl font-bold">{result.monthsToPayoff} months</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold text-green-600">${result.totalInterest.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on balance of ${parseFloat(balance).toFixed(2)} at {interestRate}% APR</p>
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

        {/* SEO Content Section */}
        <div className="mt-8 space-y-8">
          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How the Credit Card Payoff Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Your Balance</h3>
                    <p className="text-sm text-muted-foreground">Input your current credit card balance, the annual interest rate (APR), and how much you can pay each month.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">We Calculate Your Timeline</h3>
                    <p className="text-sm text-muted-foreground">Our calculator uses the compound interest formula to determine exactly how many months until you are debt-free.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">See Total Interest Paid</h3>
                    <p className="text-sm text-muted-foreground">Get a clear breakdown of total interest you will pay and your exact payoff date to plan your financial freedom.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Why Use This Credit Card Payoff Calculator?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Accurate Payoff Timeline</h3>
                      <p className="text-sm text-muted-foreground">Know exactly when you will be debt-free based on your payment amount and interest rate.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Total Interest Visualization</h3>
                      <p className="text-sm text-muted-foreground">See how much interest you will pay over time, helping you understand the true cost of debt.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Payment Strategy Planning</h3>
                      <p className="text-sm text-muted-foreground">Test different monthly payment amounts to find the optimal payoff strategy for your budget.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free and Instant Results</h3>
                      <p className="text-sm text-muted-foreground">Get immediate calculations without any sign-up or hidden fees. Completely free to use.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Mobile-Friendly Design</h3>
                      <p className="text-sm text-muted-foreground">Calculate your payoff timeline on any device, anywhere, anytime.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Privacy Protected</h3>
                      <p className="text-sm text-muted-foreground">All calculations happen in your browser. Your financial data is never stored or shared.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How do I calculate when my credit card will be paid off?</h3>
                  <p className="text-sm text-muted-foreground">To calculate your credit card payoff date, divide your balance by your monthly payment, then account for compound interest. Our calculator does this automatically using the formula: Months = -log(1 - (Balance × Monthly Rate) / Payment) / log(1 + Monthly Rate). Simply enter your balance, APR, and monthly payment to get instant results.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What happens if I only make minimum payments on my credit card?</h3>
                  <p className="text-sm text-muted-foreground">Making only minimum payments significantly extends your payoff time and increases total interest paid. For example, a $5,000 balance at 18% APR with a $125 minimum payment could take over 20 years to pay off and cost more than $6,000 in interest alone. Increasing your monthly payment even slightly can save thousands and cut years off your payoff timeline.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is it better to pay off credit card all at once or make monthly payments?</h3>
                  <p className="text-sm text-muted-foreground">Paying off your credit card balance in full immediately is always the best option if you can afford it, as it stops interest from accruing. However, if you cannot pay in full, make the largest monthly payment possible above the minimum. Every extra dollar reduces principal faster, saving on interest and shortening your payoff timeline.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How does credit card interest affect payoff time?</h3>
                  <p className="text-sm text-muted-foreground">Credit card interest compounds daily, meaning you pay interest on your interest. Higher APRs dramatically increase payoff time and total cost. A $10,000 balance at 15% APR takes about 3 years longer to pay off than at 10% APR with the same monthly payment. This is why transferring balances to lower-rate cards can be beneficial.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is the snowball vs avalanche method for credit card payoff?</h3>
                  <p className="text-sm text-muted-foreground">The snowball method pays off smallest balances first for psychological wins, while the avalanche method targets highest interest rates first for maximum savings. The avalanche method saves more money mathematically, but snowball can provide motivation through quick wins. Both methods work - choose based on what keeps you motivated to stay debt-free.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Related Financial Tools</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calculators/debt-to-income-ratio-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Debt-to-Income Ratio Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate your DTI ratio to understand your overall debt burden and improve loan approval chances.</p>
                </a>
                <a href="/calculators/loan-payoff-time-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Loan Payoff Time Calculator</h3>
                  <p className="text-sm text-muted-foreground">Estimate how long it will take to pay off any loan with extra payments and see interest savings.</p>
                </a>
                <a href="/calculators/minimum-payment-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Minimum Payment Calculator</h3>
                  <p className="text-sm text-muted-foreground">See how long minimum payments take and why paying more saves thousands in interest.</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
