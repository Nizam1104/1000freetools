"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DividendPayoutCalculatorPage() {
  const [sharesHeld, setSharesHeld] = useState<string>("");
  const [dividendPerShare, setDividendPerShare] = useState<string>("");
  const [payoutFrequency, setPayoutFrequency] = useState<string>("quarterly");
  const [result, setResult] = useState<{
    annualDividend: number;
    perPayment: number;
  } | null>(null);

  const calculateDividend = () => {
    const shares = parseFloat(sharesHeld);
    const dps = parseFloat(dividendPerShare);

    if (isNaN(shares) || isNaN(dps) || shares <= 0 || dps <= 0) {
      return;
    }

    let paymentsPerYear = 4;
    switch (payoutFrequency) {
      case "monthly":
        paymentsPerYear = 12;
        break;
      case "quarterly":
        paymentsPerYear = 4;
        break;
      case "semi-annual":
        paymentsPerYear = 2;
        break;
      case "annual":
        paymentsPerYear = 1;
        break;
    }

    const perPayment = shares * dps;
    const annualDividend = perPayment * paymentsPerYear;

    setResult({ annualDividend, perPayment });
  };

  const reset = () => {
    setSharesHeld("");
    setDividendPerShare("");
    setPayoutFrequency("quarterly");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dividend Payout Calculator</h1>
          <p className="text-muted-foreground">
            Estimate your total dividend income from a stock holding. Enter shares held, dividend per share, and payout frequency to calculate your earnings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sharesHeld">Number of Shares Held</Label>
                <Input
                  id="sharesHeld"
                  type="number"
                  placeholder="Enter number of shares"
                  value={sharesHeld}
                  onChange={(e) => setSharesHeld(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dividendPerShare">Dividend Per Share ($)</Label>
                <Input
                  id="dividendPerShare"
                  type="number"
                  step="0.01"
                  placeholder="Enter dividend per share"
                  value={dividendPerShare}
                  onChange={(e) => setDividendPerShare(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                <Select value={payoutFrequency} onValueChange={setPayoutFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDividend} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Annual Dividend Income</p>
                    <p className="text-3xl font-bold text-primary">${result.annualDividend.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Per Payout</p>
                    <p className="text-xl font-bold">${result.perPayment.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Shares: {parseFloat(sharesHeld).toFixed(0)} | Dividend/Share: ${parseFloat(dividendPerShare).toFixed(2)}</p>
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
