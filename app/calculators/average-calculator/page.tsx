"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";

export default function AverageCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{
    mean: number;
    count: number;
    sum: number;
    min: number;
    max: number;
    median: number;
    range: number;
  } | null>(null);

  const calculate = () => {
    const nums = numbers.split(/[,\s]+/).map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / nums.length;
      const sorted = [...nums].sort((a, b) => a - b);
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const range = max - min;
      
      // Calculate median
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];

      setResult({
        mean: Math.round(mean * 100) / 100,
        count: nums.length,
        sum: Math.round(sum * 100) / 100,
        min: Math.round(min * 100) / 100,
        max: Math.round(max * 100) / 100,
        median: Math.round(median * 100) / 100,
        range: Math.round(range * 100) / 100,
      });
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  // Generate chart data for visualization
  const chartData = result ? numbers.split(/[,\s]+/).map((n, i) => ({
    index: i + 1,
    value: parseFloat(n) || 0,
  })).filter(d => !isNaN(d.value)) : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="numbers">Enter Numbers</Label>
              <Input
                id="numbers"
                type="text"
                placeholder="e.g., 10, 20, 30, 40, 50"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate numbers with commas or spaces
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Mean (Average)</p>
                    <p className="text-2xl font-bold">{result.mean}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Median</p>
                    <p className="text-2xl font-bold">{result.median}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Count</p>
                    <p className="text-2xl font-bold">{result.count}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sum</p>
                    <p className="text-2xl font-bold">{result.sum}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Minimum</p>
                    <p className="text-2xl font-bold">{result.min}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Maximum</p>
                    <p className="text-2xl font-bold">{result.max}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Range</p>
                    <p className="text-2xl font-bold">{result.range}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {chartData.length > 0 && result && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Data Visualization</h3>
              <div className="h-[250px]">
                <ChartContainer
                  config={{
                    value: { label: "Value", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis label={{ value: "Position", position: "insideBottom", offset: -5 }} dataKey="index" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#8884d8" />
                      <ReferenceLine y={result.mean} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" label={{ value: `Mean: ${result.mean}`, position: "right", fill: "#ef4444", fontSize: 12 }} />
                      <ReferenceLine y={result.median} stroke="#22c55e" strokeWidth={2} strokeDasharray="3 3" label={{ value: `Median: ${result.median}`, position: "left", fill: "#22c55e", fontSize: 12 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Red line = Mean (average), Green line = Median (middle value)
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Averages</CardTitle>
          <CardDescription>Mean, median, and when to use each</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            "Average" usually means the mean – add up all values and divide by how many there are. But there are other averages too. The median is the middle value when sorted. The mode is the most common value. Each tells you something different about your data.
          </p>
          <p className="text-sm text-muted-foreground">
            The mean is sensitive to outliers. One extremely high or low value can skew it significantly. The median ignores outliers – it only cares about the middle. That's why median household income is more meaningful than mean income for understanding typical earnings.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Example: Salaries at a Small Company</p>
            <p className="text-xs text-muted-foreground mb-2">
              Employees earn: $40k, $42k, $45k, $48k, $50k, $52k, $200k (CEO)
            </p>
            <p className="text-xs text-muted-foreground">
              Mean: $68,143 | Median: $48,000
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              The mean suggests a typical salary of $68k, but 6 of 7 employees earn less than $55k. The median ($48k) better represents what a typical employee earns.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics Reference</CardTitle>
          <CardDescription>Key statistical measures explained</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Measure</TableHead>
                <TableHead>What It Is</TableHead>
                <TableHead>When to Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Mean</TableCell>
                <TableCell className="text-xs">Sum of all values ÷ count</TableCell>
                <TableCell className="text-xs">Normally distributed data, no extreme outliers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Median</TableCell>
                <TableCell className="text-xs">Middle value when sorted</TableCell>
                <TableCell className="text-xs">Skewed data, data with outliers (income, home prices)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mode</TableCell>
                <TableCell className="text-xs">Most frequently occurring value</TableCell>
                <TableCell className="text-xs">Categorical data, finding most common option</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Range</TableCell>
                <TableCell className="text-xs">Maximum - Minimum</TableCell>
                <TableCell className="text-xs">Quick sense of data spread</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sum</TableCell>
                <TableCell className="text-xs">Total of all values</TableCell>
                <TableCell className="text-xs">Aggregating quantities (total sales, total scores)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Count</TableCell>
                <TableCell className="text-xs">Number of values</TableCell>
                <TableCell className="text-xs">Sample size, data completeness checks</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate the Mean</CardTitle>
          <CardDescription>Step-by-step guide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Add up all the numbers</p>
                <p className="text-xs text-muted-foreground">This gives you the sum. For 5, 10, 15, 20, 25: sum = 75.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Count how many numbers there are</p>
                <p className="text-xs text-muted-foreground">In our example: 5 numbers.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Divide the sum by the count</p>
                <p className="text-xs text-muted-foreground">Mean = 75 ÷ 5 = 15. That's your average.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between mean and average?</h4>
            <p className="text-xs text-muted-foreground">
              They're the same thing in everyday usage. "Mean" is the technical term; "average" is colloquial. Technically, there are multiple types of averages (mean, median, mode), but when someone says "average" they almost always mean the arithmetic mean.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use median instead of mean?</h4>
            <p className="text-xs text-muted-foreground">
              Use median when your data has outliers or is skewed. Home prices, salaries, and wealth distributions are typically right-skewed – a few very high values pull the mean up. Median gives you the "typical" value better in these cases.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the average be a number that's not in my data?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, frequently. The average of 1, 2, and 6 is 3 – which isn't in the original set. The average of 1 and 2 is 1.5. The mean doesn't have to be an actual data point; it's a calculated center.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do outliers affect the average?</h4>
            <p className="text-xs text-muted-foreground">
              Outliers pull the mean toward them. One very high value increases the mean; one very low value decreases it. The effect depends on how extreme the outlier is and how many data points you have. With 100 values, one outlier has less impact than with 5 values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a weighted average?</h4>
            <p className="text-xs text-muted-foreground">
              A weighted average gives different importance to different values. Your GPA is a weighted average: an A in a 4-credit class counts more than an A in a 1-credit class. Formula: sum of (value × weight) ÷ sum of weights.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
