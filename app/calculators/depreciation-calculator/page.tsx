"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DepreciationCalculatorPage() {
  const [assetCost, setAssetCost] = useState<string>("");
  const [salvageValue, setSalvageValue] = useState<string>("");
  const [usefulLife, setUsefulLife] = useState<string>("");
  const [method, setMethod] = useState<string>("straight-line");
  const [result, setResult] = useState<{
    annualDepreciation: number;
    totalDepreciation: number;
    schedule: Array<{ year: number; depreciation: number; bookValue: number }>;
  } | null>(null);

  const calculateDepreciation = () => {
    const cost = parseFloat(assetCost);
    const salvage = parseFloat(salvageValue);
    const life = parseFloat(usefulLife);

    if (isNaN(cost) || isNaN(salvage) || isNaN(life) || cost <= 0 || life <= 0) {
      return;
    }

    const depreciableAmount = cost - salvage;
    const schedule = [];
    let bookValue = cost;
    let totalDep = 0;

    if (method === "straight-line") {
      const annualDep = depreciableAmount / life;
      for (let year = 1; year <= life; year++) {
        bookValue -= annualDep;
        totalDep += annualDep;
        schedule.push({
          year,
          depreciation: Math.round(annualDep * 100) / 100,
          bookValue: Math.round(Math.max(bookValue, salvage) * 100) / 100,
        });
      }
      setResult({ annualDepreciation: annualDep, totalDepreciation: totalDep, schedule });
    } else if (method === "declining-balance") {
      const rate = 2 / life;
      for (let year = 1; year <= life; year++) {
        const dep = bookValue * rate;
        bookValue -= dep;
        if (bookValue < salvage) {
          bookValue = salvage;
        }
        totalDep += dep;
        schedule.push({
          year,
          depreciation: Math.round(dep * 100) / 100,
          bookValue: Math.round(Math.max(bookValue, salvage) * 100) / 100,
        });
      }
      setResult({ annualDepreciation: schedule[0]?.depreciation || 0, totalDepreciation: totalDep, schedule });
    } else if (method === "sum-of-years") {
      const sumYears = (life * (life + 1)) / 2;
      for (let year = 1; year <= life; year++) {
        const dep = depreciableAmount * ((life - year + 1) / sumYears);
        bookValue -= dep;
        totalDep += dep;
        schedule.push({
          year,
          depreciation: Math.round(dep * 100) / 100,
          bookValue: Math.round(Math.max(bookValue, salvage) * 100) / 100,
        });
      }
      setResult({ annualDepreciation: schedule[0]?.depreciation || 0, totalDepreciation: totalDep, schedule });
    }
  };

  const reset = () => {
    setAssetCost("");
    setSalvageValue("");
    setUsefulLife("");
    setMethod("straight-line");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Depreciation Calculator</h1>
          <p className="text-muted-foreground">
            Calculate how your asset's value decreases over time. Supports straight-line, declining balance, and sum-of-years-digits depreciation methods.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetCost">Asset Cost</Label>
                <Input
                  id="assetCost"
                  type="number"
                  placeholder="Enter asset cost"
                  value={assetCost}
                  onChange={(e) => setAssetCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salvageValue">Salvage Value</Label>
                <Input
                  id="salvageValue"
                  type="number"
                  placeholder="Enter salvage value"
                  value={salvageValue}
                  onChange={(e) => setSalvageValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usefulLife">Useful Life (Years)</Label>
                <Input
                  id="usefulLife"
                  type="number"
                  placeholder="Enter useful life"
                  value={usefulLife}
                  onChange={(e) => setUsefulLife(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Depreciation Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="straight-line">Straight-Line</SelectItem>
                    <SelectItem value="declining-balance">Declining Balance</SelectItem>
                    <SelectItem value="sum-of-years">Sum-of-Years-Digits</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDepreciation} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">First Year Depreciation</p>
                    <p className="text-2xl font-bold text-primary">${result.annualDepreciation.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Depreciation</p>
                    <p className="text-lg font-bold">${result.totalDepreciation.toFixed(2)}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Depreciation Schedule</h4>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Year</th>
                            <th className="text-right py-1">Depreciation</th>
                            <th className="text-right py-1">Book Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.schedule.map((row) => (
                            <tr key={row.year} className="border-b last:border-0">
                              <td className="py-1">{row.year}</td>
                              <td className="text-right">${row.depreciation.toLocaleString()}</td>
                              <td className="text-right">${row.bookValue.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
