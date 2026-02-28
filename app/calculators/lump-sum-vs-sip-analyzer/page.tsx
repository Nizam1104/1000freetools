"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LumpSumVsSIPAnalyzerPage() {
  const [lumpSumAmount, setLumpSumAmount] = useState<string>("");
  const [monthlySIP, setMonthlySIP] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<{
    lumpSumValue: number;
    sipValue: number;
    totalSIPInvested: number;
    betterOption: string;
    difference: number;
  } | null>(null);

  const calculateComparison = () => {
    const lumpSum = parseFloat(lumpSumAmount);
    const sip = parseFloat(monthlySIP);
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const totalYears = parseFloat(years);
    const months = totalYears * 12;

    if (isNaN(lumpSum) || isNaN(sip) || isNaN(rate) || isNaN(totalYears) || lumpSum <= 0 || sip <= 0 || totalYears <= 0) {
      return;
    }

    const lumpSumValue = lumpSum * Math.pow(1 + rate, months);
    const sipValue = sip * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
    const totalSIPInvested = sip * months;
    const difference = lumpSumValue - sipValue;
    const betterOption = difference >= 0 ? "Lump Sum" : "SIP";

    setResult({
      lumpSumValue,
      sipValue,
      totalSIPInvested,
      betterOption,
      difference: Math.abs(difference),
    });
  };

  const reset = () => {
    setLumpSumAmount("");
    setMonthlySIP("");
    setExpectedReturn("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Lump Sum vs SIP Analyzer</h1>
          <p className="text-muted-foreground">
            Compare investing all at once versus spreading it out monthly. Analyze the final corpus from a lump sum investment versus an equivalent total via monthly SIP.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lumpSumAmount">Lump Sum Amount</Label>
                <Input
                  id="lumpSumAmount"
                  type="number"
                  placeholder="Enter lump sum"
                  value={lumpSumAmount}
                  onChange={(e) => setLumpSumAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlySIP">Monthly SIP Amount</Label>
                <Input
                  id="monthlySIP"
                  type="number"
                  placeholder="Enter monthly SIP"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Investment Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  placeholder="Enter years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateComparison} className="flex-1">
                  Compare
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
                  <div className={`p-4 rounded-lg ${result.betterOption === 'Lump Sum' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Better Option</p>
                    <p className={`text-2xl font-bold ${result.betterOption === 'Lump Sum' ? 'text-green-600' : 'text-blue-600'}`}>
                      {result.betterOption} by ${result.difference.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Lump Sum Value</p>
                      <p className="text-xl font-bold text-green-600">${result.lumpSumValue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">SIP Value</p>
                      <p className="text-xl font-bold text-blue-600">${result.sipValue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total SIP Investment</p>
                    <p className="text-lg font-bold">${result.totalSIPInvested.toLocaleString()}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Lump sum typically outperforms in rising markets; SIP reduces timing risk</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Compare to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
