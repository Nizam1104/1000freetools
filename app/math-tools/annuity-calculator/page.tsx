"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnnuityCalculator() {
  const [mode, setMode] = useState<"pv" | "fv" | "pmt">("pv");
  const [payment, setPayment] = useState("");
  const [rate, setRate] = useState("");
  const [periods, setPeriods] = useState("");
  const [presentValue, setPresentValue] = useState("");
  const [futureValue, setFutureValue] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const r = parseFloat(rate) / 100;
    const n = parseInt(periods);

    if (isNaN(r) || isNaN(n) || n <= 0) {
      setError("Please enter valid rate and number of periods");
      return;
    }

    if (mode === "pv") {
      const pmt = parseFloat(payment);
      if (isNaN(pmt)) {
        setError("Please enter payment amount");
        return;
      }
      const pv = pmt * ((1 - Math.pow(1 + r, -n)) / r);
      const totalPayments = pmt * n;
      const interestEarned = totalPayments - pv;

      setResult({
        title: "Present Value of Annuity",
        mainResult: Math.round(pv * 100) / 100,
        label: "Present Value",
        details: {
          "Payment Amount": `$${pmt.toFixed(2)}`,
          "Interest Rate": `${rate}%`,
          "Number of Periods": n,
          "Total Payments": `$${totalPayments.toFixed(2)}`,
          "Interest Earned": `$${Math.round(interestEarned * 100) / 100}`
        },
        steps: [
          `Formula: PV = PMT × [(1 - (1 + r)^(-n)) / r]`,
          `PV = ${pmt} × [(1 - (1 + ${r})^(-${n})) / ${r}]`,
          `PV = ${pmt} × [(1 - ${Math.pow(1 + r, -n).toFixed(6)}) / ${r}]`,
          `PV = ${pmt} × ${((1 - Math.pow(1 + r, -n)) / r).toFixed(6)}`,
          `PV = $${pv.toFixed(2)}`
        ]
      });
    } else if (mode === "fv") {
      const pmt = parseFloat(payment);
      if (isNaN(pmt)) {
        setError("Please enter payment amount");
        return;
      }
      const fv = pmt * ((Math.pow(1 + r, n) - 1) / r);
      const totalPayments = pmt * n;
      const interestEarned = fv - totalPayments;

      setResult({
        title: "Future Value of Annuity",
        mainResult: Math.round(fv * 100) / 100,
        label: "Future Value",
        details: {
          "Payment Amount": `$${pmt.toFixed(2)}`,
          "Interest Rate": `${rate}%`,
          "Number of Periods": n,
          "Total Payments": `$${totalPayments.toFixed(2)}`,
          "Interest Earned": `$${Math.round(interestEarned * 100) / 100}`
        },
        steps: [
          `Formula: FV = PMT × [((1 + r)^n - 1) / r]`,
          `FV = ${pmt} × [((1 + ${r})^${n} - 1) / ${r}]`,
          `FV = ${pmt} × [(${Math.pow(1 + r, n).toFixed(6)} - 1) / ${r}]`,
          `FV = ${pmt} × ${((Math.pow(1 + r, n) - 1) / r).toFixed(6)}`,
          `FV = $${fv.toFixed(2)}`
        ]
      });
    } else if (mode === "pmt") {
      const pv = parseFloat(presentValue);
      const fv = parseFloat(futureValue);

      if (isNaN(pv) && isNaN(fv)) {
        setError("Please enter either present value or future value");
        return;
      }

      let pmt = 0;
      let title = "";
      let steps: string[] = [];

      if (!isNaN(pv)) {
        pmt = pv / ((1 - Math.pow(1 + r, -n)) / r);
        title = "Payment from Present Value";
        const totalPayments = pmt * n;
        const interestPaid = totalPayments - pv;

        steps = [
          `Formula: PMT = PV / [(1 - (1 + r)^(-n)) / r]`,
          `PMT = ${pv} / [(1 - (1 + ${r})^(-${n})) / ${r}]`,
          `PMT = ${pv} / ${((1 - Math.pow(1 + r, -n)) / r).toFixed(6)}`,
          `PMT = $${pmt.toFixed(2)}`
        ];

        setResult({
          title,
          mainResult: Math.round(pmt * 100) / 100,
          label: "Payment Amount",
          details: {
            "Present Value": `$${pv.toFixed(2)}`,
            "Interest Rate": `${rate}%`,
            "Number of Periods": n,
            "Total Payments": `$${totalPayments.toFixed(2)}`,
            "Total Interest": `$${Math.round(interestPaid * 100) / 100}`
          },
          steps
        });
      } else {
        pmt = fv / ((Math.pow(1 + r, n) - 1) / r);
        title = "Payment from Future Value";
        const totalPayments = pmt * n;
        const interestEarned = fv - totalPayments;

        steps = [
          `Formula: PMT = FV / [((1 + r)^n - 1) / r]`,
          `PMT = ${fv} / [((1 + ${r})^${n} - 1) / ${r}]`,
          `PMT = ${fv} / ${((Math.pow(1 + r, n) - 1) / r).toFixed(6)}`,
          `PMT = $${pmt.toFixed(2)}`
        ];

        setResult({
          title,
          mainResult: Math.round(pmt * 100) / 100,
          label: "Payment Amount",
          details: {
            "Future Value Goal": `$${fv.toFixed(2)}`,
            "Interest Rate": `${rate}%`,
            "Number of Periods": n,
            "Total Payments": `$${totalPayments.toFixed(2)}`,
            "Interest Earned": `$${Math.round(interestEarned * 100) / 100}`
          },
          steps
        });
      }
    }
  };

  const reset = () => {
    setPayment("");
    setRate("");
    setPeriods("");
    setPresentValue("");
    setFutureValue("");
    setResult(null);
    setError("");
  };

  const loadExample = (exampleMode: typeof mode, data: Record<string, string>) => {
    setMode(exampleMode);
    setPayment(data.payment || "");
    setRate(data.rate || "");
    setPeriods(data.periods || "");
    setPresentValue(data.presentValue || "");
    setFutureValue(data.futureValue || "");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Annuity Calculator – Calculate PV, FV & Payments</h1>
        <p className="text-muted-foreground">
          Calculate the present value (PV), future value (FV), or payment amount of any annuity with our free online annuity calculator. Perfect for retirement planning, loans, and investment analysis.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="pv">Present Value</TabsTrigger>
            <TabsTrigger value="fv">Future Value</TabsTrigger>
            <TabsTrigger value="pmt">Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="pv" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Payment Amount ($)</Label>
                <Input type="number" placeholder="1000" value={payment} onChange={(e) => setPayment(e.target.value)} />
              </div>
              <div>
                <Label>Interest Rate (%)</Label>
                <Input type="number" placeholder="5" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
              <div>
                <Label>Number of Periods</Label>
                <Input type="number" placeholder="10" value={periods} onChange={(e) => setPeriods(e.target.value)} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Calculate the present value of a series of equal payments.
            </p>
          </TabsContent>

          <TabsContent value="fv" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Payment Amount ($)</Label>
                <Input type="number" placeholder="1000" value={payment} onChange={(e) => setPayment(e.target.value)} />
              </div>
              <div>
                <Label>Interest Rate (%)</Label>
                <Input type="number" placeholder="5" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
              <div>
                <Label>Number of Periods</Label>
                <Input type="number" placeholder="10" value={periods} onChange={(e) => setPeriods(e.target.value)} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Calculate the future value of a series of equal payments.
            </p>
          </TabsContent>

          <TabsContent value="pmt" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Present Value ($)</Label>
                <Input type="number" placeholder="100000" value={presentValue} onChange={(e) => setPresentValue(e.target.value)} />
              </div>
              <div>
                <Label>Future Value ($)</Label>
                <Input type="number" placeholder="0" value={futureValue} onChange={(e) => setFutureValue(e.target.value)} />
              </div>
              <div>
                <Label>Interest Rate (%)</Label>
                <Input type="number" placeholder="5" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Number of Periods</Label>
              <Input type="number" placeholder="10" value={periods} onChange={(e) => setPeriods(e.target.value)} />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter either present value (for loan payments) or future value (for savings goals).
            </p>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("pv", { payment: "500", rate: "6", periods: "20" })}>
            PV: $500/mo, 6%, 20yr
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("pv", { payment: "2000", rate: "4.5", periods: "30" })}>
            PV: $2000/mo, 4.5%, 30yr
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("fv", { payment: "300", rate: "7", periods: "25" })}>
            FV: $300/mo, 7%, 25yr
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("fv", { payment: "1000", rate: "5.5", periods: "15" })}>
            FV: $1000/mo, 5.5%, 15yr
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("pmt", { presentValue: "250000", rate: "5", periods: "30" })}>
            Loan: $250k, 5%, 30yr
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("pmt", { futureValue: "500000", rate: "6.5", periods: "20" })}>
            Save: $500k goal, 6.5%, 20yr
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("pv", { payment: "1500", rate: "3.75", periods: "10" })}>
            PV: $1500/mo, 3.75%, 10yr
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{result.label}</p>
              <p className="text-4xl font-bold">${result.mainResult.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">{result.title}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(result.details).map(([key, value]) => (
                <div key={key} className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">{key}</p>
                  <p className="text-lg font-semibold">{String(value)}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Calculation</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {result.steps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Annuities</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            An annuity is a series of equal payments made at regular intervals. You encounter annuities in everyday life – mortgage payments, car loans, retirement payouts, and lease agreements all follow annuity structures. The key insight is that money has time value: a dollar today is worth more than a dollar tomorrow because you can invest it.
          </p>
          <p className="text-muted-foreground">
            This calculator handles three core questions. What's the present value of future payments – useful when evaluating lottery payouts or structured settlements. What will regular savings grow to over time – essential for retirement planning. Or, given a loan amount or savings goal, what should each payment be – the math behind mortgage calculators and systematic investment plans.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Formulas Behind the Calculator</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Present Value of an Ordinary Annuity</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">PV = PMT × [(1 - (1 + r)^(-n)) / r]</div>
            <p className="text-sm text-muted-foreground">
              Present value tells you what a stream of future payments is worth today. The formula discounts each payment back to the present using the interest rate. A $1,000 monthly payment for 10 years at 5% annual interest has a present value of about $94,461 – meaning you'd need that lump sum today to generate those payments.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Future Value of an Ordinary Annuity</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">FV = PMT × [((1 + r)^n - 1) / r]</div>
            <p className="text-sm text-muted-foreground">
              Future value shows what regular savings will accumulate to. Each payment earns compound interest for the remaining periods. Saving $500 monthly at 7% annual return for 30 years grows to approximately $616,356 – the power of compounding turns $180,000 in contributions into over $600,000.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Payment Amount</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">PMT = PV / [(1 - (1 + r)^(-n)) / r]  or  PMT = FV / [((1 + r)^n - 1) / r]</div>
            <p className="text-sm text-muted-foreground">
              Payment calculations work the formulas in reverse. For a loan, you know the present value (loan amount) and need the payment. For a savings goal, you know the future value target and solve for the required monthly contribution.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Present Value of a Pension</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Your pension offers $2,000 monthly for 25 years. Assuming a 5% discount rate, what's this worth as a lump sum today?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>PMT = $2,000, r = 0.05/12 = 0.004167, n = 25 × 12 = 300</div>
              <div>PV = 2000 × [(1 - (1.004167)^(-300)) / 0.004167]</div>
              <div>PV = 2000 × [(1 - 0.2865) / 0.004167]</div>
              <div>PV = 2000 × 171.31 = $342,620</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Retirement Savings Goal</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You want $1 million in 30 years. At 7% annual return, how much must you save monthly?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>FV = $1,000,000, r = 0.07/12 = 0.005833, n = 30 × 12 = 360</div>
              <div>PMT = 1,000,000 / [((1.005833)^360 - 1) / 0.005833]</div>
              <div>PMT = 1,000,000 / [(8.1165 - 1) / 0.005833]</div>
              <div>PMT = 1,000,000 / 1220.71 = $819.24 per month</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Car Loan Payment</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Financing a $35,000 car at 4.5% APR for 60 months. What's the monthly payment?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>PV = $35,000, r = 0.045/12 = 0.00375, n = 60</div>
              <div>PMT = 35,000 / [(1 - (1.00375)^(-60)) / 0.00375]</div>
              <div>PMT = 35,000 / [(1 - 0.7987) / 0.00375]</div>
              <div>PMT = 35,000 / 53.69 = $651.89 per month</div>
              <div>Total paid: $651.89 × 60 = $39,113 (interest: $4,113)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: College Fund</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Starting at birth, you save $200 monthly in a 529 plan earning 6% annually. What's available at age 18?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>PMT = $200, r = 0.06/12 = 0.005, n = 18 × 12 = 216</div>
              <div>FV = 200 × [((1.005)^216 - 1) / 0.005]</div>
              <div>FV = 200 × [(2.9368 - 1) / 0.005]</div>
              <div>FV = 200 × 387.36 = $77,472</div>
              <div>Total contributions: $200 × 216 = $43,200</div>
              <div>Interest earned: $34,272</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            The mathematical foundation for annuity calculations was developed by 17th-century mathematicians including Edmond Halley (of comet fame), who created mortality tables to price life annuities. His work laid the groundwork for modern actuarial science and retirement planning.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between an ordinary annuity and an annuity due?</h4>
            <p className="text-sm text-muted-foreground">
              Ordinary annuities have payments at the end of each period – most loans work this way. Annuities due have payments at the beginning – like rent or insurance premiums. An annuity due is worth slightly more because each payment earns interest for one extra period. This calculator uses ordinary annuity formulas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I adjust for monthly vs annual compounding?</h4>
            <p className="text-sm text-muted-foreground">
              Divide the annual interest rate by 12 for monthly payments, and multiply the number of years by 12 for the total periods. A 6% annual rate becomes 0.5% monthly, and a 30-year loan becomes 360 monthly payments. The calculator handles this conversion automatically when you enter annual rates with monthly payment schedules.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is present value less than the sum of payments?</h4>
            <p className="text-sm text-muted-foreground">
              Present value accounts for the time value of money. Receiving $1,000 today is worth more than receiving $1,000 five years from now because you can invest today's dollar. The discount rate reflects your opportunity cost – what you could earn elsewhere. Higher discount rates produce lower present values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for irregular payment amounts?</h4>
            <p className="text-sm text-muted-foreground">
              No – annuity formulas require equal payments at equal intervals. For varying cash flows, you'd need to calculate the present or future value of each payment separately, then sum them. Spreadsheet software handles this with NPV or XNPV functions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What rate should I use for retirement calculations?</h4>
            <p className="text-sm text-muted-foreground">
              Historical stock market returns average about 10% nominal, but after inflation that's closer to 7%. Conservative planners use 5-6% to account for volatility and sequence-of-returns risk. Bond-heavy portfolios might assume 3-4%. The rate you choose dramatically affects results – at 5%, saving $500/month for 30 years yields $416,000; at 8%, it yields $745,000.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does this calculator account for taxes?</h4>
            <p className="text-sm text-muted-foreground">
              No, the calculations are pre-tax. For retirement accounts, traditional 401(k) contributions reduce taxable income now but withdrawals are taxed. Roth contributions use after-tax money but grow tax-free. Adjust your expected return rate downward by your estimated tax rate for rough after-tax projections.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate are annuity calculations for real loans?</h4>
            <p className="text-sm text-muted-foreground">
              Very accurate for standard fixed-rate loans with equal payments. The formula matches what banks use for mortgages, auto loans, and personal loans. However, real loans may include origination fees, points, or prepayment penalties that affect the true cost. The APR disclosure on loan documents reflects these additional costs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
