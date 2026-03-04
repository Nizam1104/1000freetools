"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GrossVsNetIncomeCalculatorPage() {
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [federalTax, setFederalTax] = useState<string>("");
  const [stateTax, setStateTax] = useState<string>("");
  const [socialSecurity, setSocialSecurity] = useState<string>("");
  const [medicare, setMedicare] = useState<string>("");
  const [retirement401k, setRetirement401k] = useState<string>("");
  const [healthInsurance, setHealthInsurance] = useState<string>("");
  const [otherDeductions, setOtherDeductions] = useState<string>("");
  const [result, setResult] = useState<{
    totalDeductions: number;
    netIncome: number;
    effectiveTaxRate: number;
    takeHomePercent: number;
  } | null>(null);

  const calculateNetIncome = () => {
    const gross = parseFloat(grossIncome);
    const fedTax = parseFloat(federalTax) || 0;
    const state = parseFloat(stateTax) || 0;
    const ss = parseFloat(socialSecurity) || 0;
    const med = parseFloat(medicare) || 0;
    const retirement = parseFloat(retirement401k) || 0;
    const health = parseFloat(healthInsurance) || 0;
    const other = parseFloat(otherDeductions) || 0;

    if (isNaN(gross) || gross <= 0) {
      return;
    }

    const totalDeductions = fedTax + state + ss + med + retirement + health + other;
    const netIncome = gross - totalDeductions;
    const effectiveTaxRate = ((fedTax + state + ss + med) / gross) * 100;
    const takeHomePercent = (netIncome / gross) * 100;

    setResult({
      totalDeductions,
      netIncome,
      effectiveTaxRate,
      takeHomePercent,
    });
  };

  const reset = () => {
    setGrossIncome("");
    setFederalTax("");
    setStateTax("");
    setSocialSecurity("");
    setMedicare("");
    setRetirement401k("");
    setHealthInsurance("");
    setOtherDeductions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Gross vs Net Income Calculator</h1>
          <p className="text-muted-foreground">
            Convert your gross income to take-home pay. Subtract taxes, deductions, and contributions with an itemized breakdown to see your actual net income.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="grossIncome" className="text-primary">Gross Income (Monthly/Annual)</Label>
                <Input
                  id="grossIncome"
                  type="number"
                  placeholder="Enter gross income"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Label className="text-sm font-semibold">Taxes</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input id="federalTax" type="number" placeholder="Federal Tax" value={federalTax} onChange={(e) => setFederalTax(e.target.value)} />
                <Input id="stateTax" type="number" placeholder="State Tax" value={stateTax} onChange={(e) => setStateTax(e.target.value)} />
                <Input id="socialSecurity" type="number" placeholder="Social Security" value={socialSecurity} onChange={(e) => setSocialSecurity(e.target.value)} />
                <Input id="medicare" type="number" placeholder="Medicare" value={medicare} onChange={(e) => setMedicare(e.target.value)} />
              </div>

              <div className="pt-2">
                <Label className="text-sm font-semibold">Other Deductions</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input id="retirement401k" type="number" placeholder="401(k)/Retirement" value={retirement401k} onChange={(e) => setRetirement401k(e.target.value)} />
                <Input id="healthInsurance" type="number" placeholder="Health Insurance" value={healthInsurance} onChange={(e) => setHealthInsurance(e.target.value)} />
              </div>
              <Input id="otherDeductions" type="number" placeholder="Other Deductions" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)} />

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateNetIncome} className="flex-1">
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
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Net Income (Take-Home)</p>
                    <p className="text-3xl font-bold text-green-600">${result.netIncome.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Deductions</p>
                      <p className="text-lg font-bold">${result.totalDeductions.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                      <p className="text-lg font-bold">{result.effectiveTaxRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Take-Home Percentage</p>
                    <p className="text-lg font-bold text-primary">{result.takeHomePercent.toFixed(1)}% of gross</p>
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
      </div>
    </div>
  );
}
