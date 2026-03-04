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
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<string>("");
  const [result, setResult] = useState<{
    discountedPrice: number;
    savingsAmount: number;
  } | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0 || discount > 100) {
      return;
    }

    const savingsAmount = price * (discount / 100);
    const discountedPrice = price - savingsAmount;

    setResult({ discountedPrice, savingsAmount });
  };

  const reset = () => {
    setOriginalPrice("");
    setDiscountPercent("");
    setResult(null);
  };

  // Generate pie chart data
  const pieData = result ? [
    { name: "You Pay", value: result.discountedPrice, fill: "hsl(var(--chart-1))" },
    { name: "You Save", value: result.savingsAmount, fill: "hsl(var(--chart-2))" },
  ] : [];

  // Generate common discount comparison
  const discountComparison = originalPrice ? [
    { discount: "10%", price: parseFloat(originalPrice) * 0.9, savings: parseFloat(originalPrice) * 0.1 },
    { discount: "15%", price: parseFloat(originalPrice) * 0.85, savings: parseFloat(originalPrice) * 0.15 },
    { discount: "20%", price: parseFloat(originalPrice) * 0.8, savings: parseFloat(originalPrice) * 0.2 },
    { discount: "25%", price: parseFloat(originalPrice) * 0.75, savings: parseFloat(originalPrice) * 0.25 },
    { discount: "30%", price: parseFloat(originalPrice) * 0.7, savings: parseFloat(originalPrice) * 0.3 },
    { discount: "50%", price: parseFloat(originalPrice) * 0.5, savings: parseFloat(originalPrice) * 0.5 },
  ] : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Discount Calculator – Calculate Sale Price & Savings</CardTitle>
          <CardDescription>
            Instantly find the sale price, amount saved, and percentage off for any discount. Perfect for shopping, pricing, and deal comparisons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  placeholder="Enter original price"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPercent">Discount Percentage (%)</Label>
                <Input
                  id="discountPercent"
                  type="number"
                  placeholder="Enter discount percentage"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDiscount} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Discounted Price</p>
                    <p className="text-3xl font-bold text-primary">${result.discountedPrice.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">You Save</p>
                    <p className="text-xl font-bold text-green-600">${result.savingsAmount.toFixed(2)} ({discountPercent}%)</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Original Price: ${parseFloat(originalPrice).toFixed(2)}</p>
                    <p>Discount: {discountPercent}%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {pieData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Price Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[200px]">
                  <ChartContainer
                    config={{
                      pay: { label: "You Pay", color: "hsl(var(--chart-1))" },
                      save: { label: "You Save", color: "hsl(var(--chart-2))" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">{discountPercent}% OFF</p>
                    <p className="text-sm text-muted-foreground mt-2">Total Savings</p>
                    <p className="text-2xl font-semibold">${result?.savingsAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {discountComparison.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Quick Reference: Common Discounts</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    price: { label: "Final Price", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={discountComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="discount" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="price" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Based on original price of ${parseFloat(originalPrice).toFixed(2)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Discount Calculator</CardTitle>
          <CardDescription>Calculate sale prices in three simple steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Enter the original price</p>
                <p>Type the regular price before any discount. For $49.99, enter "49.99". The calculator works with any currency.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Input the discount percentage</p>
                <p>Enter the discount as a whole number. For 25% off, enter "25". For half off, enter "50".</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">View your savings and final price</p>
                <p>Instantly see the sale price, amount saved, and a visual breakdown. Use the reference table to compare common discount percentages.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Discounts</CardTitle>
          <CardDescription>Simple formulas for any discount</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Calculating discounts is straightforward once you know the formula. To find the discount amount: multiply the original price by the discount percentage (as a decimal). To find the sale price: subtract the discount from the original price.
          </p>
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <p className="text-sm font-semibold">Discount Formulas</p>
            <div className="space-y-2 text-sm font-mono">
              <p>Discount Amount = Original Price × (Discount % / 100)</p>
              <p>Sale Price = Original Price - Discount Amount</p>
              <p>Or directly: Sale Price = Original Price × (1 - Discount % / 100)</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Example: $100 item with 25% off. Discount = $100 × 0.25 = $25. Sale price = $100 - $25 = $75. Or directly: $100 × 0.75 = $75.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Discount Reference Table</CardTitle>
          <CardDescription>Common discount calculations at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Discount</TableHead>
                <TableHead>You Pay</TableHead>
                <TableHead>You Save</TableHead>
                <TableHead>On $100</TableHead>
                <TableHead>On $50</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">5%</TableCell>
                <TableCell className="font-mono">95%</TableCell>
                <TableCell className="font-mono">5%</TableCell>
                <TableCell className="font-mono">$95 ($5 off)</TableCell>
                <TableCell className="font-mono">$47.50 ($2.50 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">10%</TableCell>
                <TableCell className="font-mono">90%</TableCell>
                <TableCell className="font-mono">10%</TableCell>
                <TableCell className="font-mono">$90 ($10 off)</TableCell>
                <TableCell className="font-mono">$45 ($5 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">15%</TableCell>
                <TableCell className="font-mono">85%</TableCell>
                <TableCell className="font-mono">15%</TableCell>
                <TableCell className="font-mono">$85 ($15 off)</TableCell>
                <TableCell className="font-mono">$42.50 ($7.50 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">20%</TableCell>
                <TableCell className="font-mono">80%</TableCell>
                <TableCell className="font-mono">20%</TableCell>
                <TableCell className="font-mono">$80 ($20 off)</TableCell>
                <TableCell className="font-mono">$40 ($10 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">25%</TableCell>
                <TableCell className="font-mono">75%</TableCell>
                <TableCell className="font-mono">25%</TableCell>
                <TableCell className="font-mono">$75 ($25 off)</TableCell>
                <TableCell className="font-mono">$37.50 ($12.50 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">30%</TableCell>
                <TableCell className="font-mono">70%</TableCell>
                <TableCell className="font-mono">30%</TableCell>
                <TableCell className="font-mono">$70 ($30 off)</TableCell>
                <TableCell className="font-mono">$35 ($15 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">40%</TableCell>
                <TableCell className="font-mono">60%</TableCell>
                <TableCell className="font-mono">40%</TableCell>
                <TableCell className="font-mono">$60 ($40 off)</TableCell>
                <TableCell className="font-mono">$30 ($20 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">50%</TableCell>
                <TableCell className="font-mono">50%</TableCell>
                <TableCell className="font-mono">50%</TableCell>
                <TableCell className="font-mono">$50 ($50 off)</TableCell>
                <TableCell className="font-mono">$25 ($25 off)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">75%</TableCell>
                <TableCell className="font-mono">25%</TableCell>
                <TableCell className="font-mono">75%</TableCell>
                <TableCell className="font-mono">$25 ($75 off)</TableCell>
                <TableCell className="font-mono">$12.50 ($37.50 off)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stacking Discounts</CardTitle>
          <CardDescription>How multiple discounts really work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Stores often advertise "extra 20% off sale items" or "take an additional 15% off." These stack multiplicatively, not additively. A 50% off item with an extra 20% off isn't 70% off – it's 60% off total.
          </p>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold text-sm mb-2">Example: Stacking 50% + 20%</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Original price: $100
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              After 50% off: $100 × 0.50 = $50
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Extra 20% off: $50 × 0.80 = $40
            </p>
            <p className="text-xs font-semibold">
              Total discount: 60% (not 70%)
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Formula for stacked discounts: Final Price = Original × (1 - Discount₁) × (1 - Discount₂) × ... For three discounts of 30%, 20%, and 10%: $100 × 0.70 × 0.80 × 0.90 = $50.40 (49.6% total discount, not 60%).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate the discount percentage if I know both prices?</h4>
            <p className="text-xs text-muted-foreground">
              Divide the discount amount by the original price, multiply by 100. Original $80, sale $60: discount = $20, percentage = (20/80) × 100 = 25%. Or use: ((Original - Sale) / Original) × 100.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is a bigger discount always better?</h4>
            <p className="text-xs text-muted-foreground">
              Not necessarily. 50% off a $20 item saves $10. 30% off a $100 item saves $30. Always calculate the actual dollar savings. Also consider: do you need it? A "bargain" you don't use is 100% wasted.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate tax on a discounted price?</h4>
            <p className="text-xs text-muted-foreground">
              Tax is calculated on the sale price, not the original. $100 item, 20% off, 8% tax: Sale price = $80. Tax = $80 × 0.08 = $6.40. Total = $86.40. Never calculate tax before applying the discount.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does "up to 70% off" mean?</h4>
            <p className="text-xs text-muted-foreground">
              It means some items are 70% off, but many are less. Retailers use this to attract you with the maximum discount while most items might only be 20-40% off. Check individual item discounts, not just the headline.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are "buy one get one free" deals actually 50% off?</h4>
            <p className="text-xs text-muted-foreground">
              Mathematically, yes – if you need two items. But if you only needed one, you spent 100% more than planned. BOGO is 50% off per item only if you use both. Otherwise, it's full price for something extra you may not need.
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
            <a href="/calculators/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Percentage Calculator</p>
              <p className="text-xs text-muted-foreground">General percentage calculations</p>
            </a>
            <a href="/calculators/sales-tax-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Sales Tax Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate tax on purchases</p>
            </a>
            <a href="/calculators/price-comparison-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Price Comparison</p>
              <p className="text-xs text-muted-foreground">Compare unit prices</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
