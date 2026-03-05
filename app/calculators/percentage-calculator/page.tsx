"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<"percentage-of" | "what-percent" | "percent-change">("percentage-of");
  const [percentage, setPercentage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const calculate = () => {
    if (mode === "percentage-of") {
      const pct = parseFloat(percentage);
      const val = parseFloat(value);
      if (!isNaN(pct) && !isNaN(val)) {
        const res = (pct / 100) * val;
        setResult({ value: Math.round(res * 100) / 100, label: `${percentage}% of ${value}` });
        generatePercentageGraph(pct, val);
      }
    } else if (mode === "what-percent") {
      const part = parseFloat(percentage);
      const whole = parseFloat(value);
      if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
        const res = (part / whole) * 100;
        setResult({ value: Math.round(res * 100) / 100, label: `${part} is what % of ${whole}` });
      }
    } else if (mode === "percent-change") {
      const from = parseFloat(fromValue);
      const to = parseFloat(toValue);
      if (!isNaN(from) && !isNaN(to) && from !== 0) {
        const res = ((to - from) / from) * 100;
        setResult({ 
          value: Math.round(res * 100) / 100, 
          label: from > to ? "Decrease" : "Increase",
          absoluteChange: to - from
        });
      }
    }
  };

  const generatePercentageGraph = (pct: number, val: number) => {
    const data = [
      { name: `${pct}%`, value: (pct / 100) * val, fill: "hsl(var(--chart-1))" },
      { name: "Remaining", value: ((100 - pct) / 100) * val, fill: "hsl(var(--muted))" },
    ];
    setGraphData(data);
  };

  const reset = () => {
    setPercentage("");
    setValue("");
    setFromValue("");
    setToValue("");
    setResult(null);
    setGraphData([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator – Calculate Percentages Instantly</CardTitle>
          <CardDescription>
            Calculate percentages, find what percent one number is of another, or compute percentage change. Our free percentage calculator handles all common percentage calculations with clear results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Type</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage-of">What is X% of Y?</SelectItem>
                  <SelectItem value="what-percent">X is what % of Y?</SelectItem>
                  <SelectItem value="percent-change">Percentage change</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "percentage-of" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Percentage (%)</Label>
                  <Input type="number" placeholder="e.g., 20" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                </div>
                <div>
                  <Label>Value</Label>
                  <Input type="number" placeholder="e.g., 150" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
              </div>
            )}

            {mode === "what-percent" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Part</Label>
                  <Input type="number" placeholder="e.g., 25" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                </div>
                <div>
                  <Label>Whole</Label>
                  <Input type="number" placeholder="e.g., 100" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
              </div>
            )}

            {mode === "percent-change" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>From (Original)</Label>
                  <Input type="number" placeholder="e.g., 50" value={fromValue} onChange={(e) => setFromValue(e.target.value)} />
                </div>
                <div>
                  <Label>To (New)</Label>
                  <Input type="number" placeholder="e.g., 75" value={toValue} onChange={(e) => setToValue(e.target.value)} />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{result.label}</p>
                <p className="text-4xl font-bold mt-1">
                  {result.value > 0 && mode === "percent-change" ? "+" : ""}{result.value}
                  {mode !== "percent-change" || result.value === 0 ? "" : "%"}
                  {mode === "percentage-of" ? "" : mode === "what-percent" ? "%" : "%"}
                </p>
                {mode === "percent-change" && result.absoluteChange !== undefined && (
                  <p className="text-sm text-muted-foreground mt-2">Absolute change: {result.absoluteChange > 0 ? "+" : ""}{result.absoluteChange}</p>
                )}
              </div>
            )}
          </div>

          {graphData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Visual Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[200px]">
                  <ChartContainer
                    config={{
                      percentage: { label: "Percentage", color: "hsl(var(--chart-1))" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={graphData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${Math.round(value)}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {graphData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-1))" }}></div>
                      <span className="text-sm">{percentage}% = {Math.round((parseFloat(percentage) / 100) * parseFloat(value))}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-muted"></div>
                      <span className="text-sm">{100 - parseFloat(percentage)}% = {Math.round(((100 - parseFloat(percentage)) / 100) * parseFloat(value))}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm font-medium">Total: {value}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Percentages</CardTitle>
          <CardDescription>What percentages mean and how to use them</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Percent means "per hundred." When you say 25%, you mean 25 out of every 100, or 25/100, or 0.25. Percentages let you compare parts to wholes on a standard scale, regardless of the actual numbers involved.
          </p>
          <p className="text-sm text-muted-foreground">
            The basic percentage formula is: Percentage = (Part / Whole) × 100. Rearrange it for different needs: Part = (Percentage / 100) × Whole, or Whole = Part / (Percentage / 100).
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Three Common Percentage Calculations</p>
            <div className="space-y-2 text-sm">
              <p><strong>Find X% of Y:</strong> (X / 100) × Y</p>
              <p><strong>X is what % of Y:</strong> (X / Y) × 100</p>
              <p><strong>Percentage change:</strong> ((New - Old) / Old) × 100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Percentage Examples</CardTitle>
          <CardDescription>Real-world percentage calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scenario</TableHead>
                <TableHead>Calculation</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">20% tip on $50</TableCell>
                <TableCell className="font-mono text-xs">0.20 × 50</TableCell>
                <TableCell className="font-mono">$10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">15 out of 60 correct</TableCell>
                <TableCell className="font-mono text-xs">(15 / 60) × 100</TableCell>
                <TableCell className="font-mono">25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Price: $80 → $100</TableCell>
                <TableCell className="font-mono text-xs">((100 - 80) / 80) × 100</TableCell>
                <TableCell className="font-mono">+25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">30% off $200</TableCell>
                <TableCell className="font-mono text-xs">200 - (0.30 × 200)</TableCell>
                <TableCell className="font-mono">$140</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">7% sales tax on $45</TableCell>
                <TableCell className="font-mono text-xs">45 + (0.07 × 45)</TableCell>
                <TableCell className="font-mono">$48.15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Population: 1000 → 1200</TableCell>
                <TableCell className="font-mono text-xs">((1200 - 1000) / 1000) × 100</TableCell>
                <TableCell className="font-mono">+20%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Percentage Conversions</CardTitle>
          <CardDescription>Fractions, decimals, and percentages</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fraction</TableHead>
                <TableHead>Decimal</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">1/100</TableCell>
                <TableCell className="font-mono">0.01</TableCell>
                <TableCell className="font-mono">1%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1/10</TableCell>
                <TableCell className="font-mono">0.1</TableCell>
                <TableCell className="font-mono">10%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1/5</TableCell>
                <TableCell className="font-mono">0.2</TableCell>
                <TableCell className="font-mono">20%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1/4</TableCell>
                <TableCell className="font-mono">0.25</TableCell>
                <TableCell className="font-mono">25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1/3</TableCell>
                <TableCell className="font-mono">0.333...</TableCell>
                <TableCell className="font-mono">33.33%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1/2</TableCell>
                <TableCell className="font-mono">0.5</TableCell>
                <TableCell className="font-mono">50%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">3/4</TableCell>
                <TableCell className="font-mono">0.75</TableCell>
                <TableCell className="font-mono">75%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">4/5</TableCell>
                <TableCell className="font-mono">0.8</TableCell>
                <TableCell className="font-mono">80%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">9/10</TableCell>
                <TableCell className="font-mono">0.9</TableCell>
                <TableCell className="font-mono">90%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1/1</TableCell>
                <TableCell className="font-mono">1.0</TableCell>
                <TableCell className="font-mono">100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate a percentage?</h4>
            <p className="text-xs text-muted-foreground">
              Divide the part by the whole, then multiply by 100. For example, 25 out of 50: (25 / 50) × 100 = 50%. To find a percentage of a number, convert the percentage to a decimal and multiply: 20% of 80 = 0.20 × 80 = 16.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate percentage change?</h4>
            <p className="text-xs text-muted-foreground">
              Subtract the original from the new value, divide by the original, multiply by 100. Price went from $50 to $60: ((60 - 50) / 50) × 100 = 20% increase. If it went from $60 to $50: ((50 - 60) / 60) × 100 = -16.67% (decrease).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between percentage points and percent?</h4>
            <p className="text-xs text-muted-foreground">
              Percentage points measure absolute differences. If interest rates go from 5% to 7%, that's a 2 percentage point increase, but a 40% increase ((7-5)/5 × 100). Confusing these leads to errors – always specify which you mean.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a percentage be more than 100%?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. 100% means "the whole thing." 200% means twice as much. If you had 50 sales last month and 150 this month, that's 300% of last month's sales (or a 200% increase). Percentages over 100% are common in growth comparisons.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I add a percentage to a number?</h4>
            <p className="text-xs text-muted-foreground">
              Multiply by (1 + percentage as decimal). Adding 15% to 200: 200 × 1.15 = 230. For tax: $100 + 8% tax = $100 × 1.08 = $108. To subtract: multiply by (1 - percentage). 20% off $100: $100 × 0.80 = $80.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/percentage-change-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Percentage Change Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate percent increase/decrease</p>
            </a>
            <a href="/calculators/discount-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Discount Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate sale prices</p>
            </a>
            <a href="/calculators/grade-percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Grade Percentage Calculator</p>
              <p className="text-xs text-muted-foreground">Convert marks to percentage</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
