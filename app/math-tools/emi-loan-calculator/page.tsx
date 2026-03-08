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

    setResult({
      emi: Math.round(emi * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
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

  const loadExample = () => {
    setPrincipal("500000");
    setRate("8.5");
    setTenure("20");
    setTenureUnit("years");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">EMI Calculator – Calculate Monthly Loan EMI Online</h1>
        <p className="text-muted-foreground">
          Calculate your monthly EMI for any loan with our free online EMI calculator. Enter principal, interest rate, and loan tenure to get the exact monthly payment and total interest paid.
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate EMI</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
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
                P = {principal} (Principal)<br />
                r = {(parseFloat(rate)/12/100).toFixed(6)} (Monthly interest rate)<br />
                n = {tenureUnit === "years" ? `${tenure} × 12 = ${parseFloat(tenure) * 12}` : tenure} (Months)
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Loan Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <span className="font-semibold ml-2">${parseFloat(principal).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-semibold ml-2">{rate}% per annum</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Loan Tenure:</span>
                  <span className="font-semibold ml-2">{tenure} {tenureUnit}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Interest/Principal:</span>
                  <span className="font-semibold ml-2">{((result.totalInterest / parseFloat(principal)) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
