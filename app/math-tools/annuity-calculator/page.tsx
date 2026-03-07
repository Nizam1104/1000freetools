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
      // PV of ordinary annuity: PV = PMT * [(1 - (1+r)^-n) / r]
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
      // FV of ordinary annuity: FV = PMT * [((1+r)^n - 1) / r]
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
        // PMT from PV: PMT = PV / [(1 - (1+r)^-n) / r]
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
        // PMT from FV: PMT = FV / [((1+r)^n - 1) / r]
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
