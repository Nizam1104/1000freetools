"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OnlineSellerProfitCalculatorPage() {
  const [salePrice, setSalePrice] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<string>("");
  const [platformFeePercent, setPlatformFeePercent] = useState<string>("15");
  const [paymentProcessingPercent, setPaymentProcessingPercent] = useState<string>("2.9");
  const [fixedFee, setFixedFee] = useState<string>("0.30");
  const [taxRate, setTaxRate] = useState<string>("0");
  const [platform, setPlatform] = useState<"amazon" | "ebay" | "etsy" | "shopify" | "custom">("amazon");
  const [result, setResult] = useState<{
    revenue: number;
    platformFee: number;
    paymentFee: number;
    productCost: number;
    shippingCost: number;
    tax: number;
    netProfit: number;
    profitMargin: number;
    roi: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(salePrice);
    const cost = parseFloat(productCost) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const platformFeeRate = parseFloat(platformFeePercent) / 100;
    const paymentRate = parseFloat(paymentProcessingPercent) / 100;
    const fixed = parseFloat(fixedFee) || 0;
    const tax = parseFloat(taxRate) / 100;

    if (isNaN(price) || price <= 0) return;

    // Platform fee (percentage of sale price)
    const platformFee = price * platformFeeRate;

    // Payment processing fee (percentage + fixed)
    const paymentFee = (price * paymentRate) + fixed;

    // Tax (on sale price, if applicable)
    const taxAmount = price * tax;

    // Total costs
    const totalFees = platformFee + paymentFee + shipping + cost + taxAmount;

    // Net profit
    const netProfit = price - totalFees;

    // Profit margin
    const profitMargin = (netProfit / price) * 100;

    // ROI (Return on Investment based on product cost)
    const roi = cost > 0 ? ((netProfit / cost) * 100) : 0;

    setResult({
      revenue: price,
      platformFee: Math.round(platformFee * 100) / 100,
      paymentFee: Math.round(paymentFee * 100) / 100,
      productCost: cost,
      shippingCost: shipping,
      tax: Math.round(taxAmount * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      profitMargin: Math.round(profitMargin * 100) / 100,
      roi: Math.round(roi * 100) / 100,
    });
  };

  const reset = () => {
    setSalePrice("");
    setProductCost("");
    setShippingCost("");
    setResult(null);
  };

  const setPresetPlatform = (preset: "amazon" | "ebay" | "etsy" | "shopify") => {
    setPlatform(preset);
    const presets = {
      amazon: { platformFee: "15", payment: "0", fixed: "0" },
      ebay: { platformFee: "12.9", payment: "2.9", fixed: "0.30" },
      etsy: { platformFee: "6.5", payment: "3", fixed: "0.25" },
      shopify: { platformFee: "0", payment: "2.9", fixed: "0.30" },
    };
    setPlatformFeePercent(presets[preset].platformFee);
    setPaymentProcessingPercent(presets[preset].payment);
    setFixedFee(presets[preset].fixed);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Online Seller Profit Calculator – Calculate Net Profit on Amazon, eBay & More
          </h1>
          <p className="text-muted-foreground">
            Know exactly how much you're making from each sale with our Online Seller Profit
            Calculator. Deduct platform fees, shipping, COGS, and taxes from your sale price to see
            your real net profit. Built for Amazon, eBay, Etsy, and Shopify sellers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Platform Preset</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={platform === "amazon" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPresetPlatform("amazon")}
                  >
                    Amazon
                  </Button>
                  <Button
                    variant={platform === "ebay" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPresetPlatform("ebay")}
                  >
                    eBay
                  </Button>
                  <Button
                    variant={platform === "etsy" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPresetPlatform("etsy")}
                  >
                    Etsy
                  </Button>
                  <Button
                    variant={platform === "shopify" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPresetPlatform("shopify")}
                  >
                    Shopify
                  </Button>
                  <Button
                    variant={platform === "custom" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlatform("custom")}
                  >
                    Custom
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price ($)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  placeholder="e.g., 50"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productCost">Product Cost (COGS) ($)</Label>
                <Input
                  id="productCost"
                  type="number"
                  placeholder="e.g., 15"
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingCost">Shipping Cost ($)</Label>
                <Input
                  id="shippingCost"
                  type="number"
                  placeholder="e.g., 5"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platformFee">Platform Fee (%)</Label>
                <Input
                  id="platformFee"
                  type="number"
                  placeholder="15"
                  value={platformFeePercent}
                  onChange={(e) => setPlatformFeePercent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentFee">Payment Processing (%)</Label>
                <Input
                  id="paymentFee"
                  type="number"
                  placeholder="2.9"
                  step="0.1"
                  value={paymentProcessingPercent}
                  onChange={(e) => setPaymentProcessingPercent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fixedFee">Fixed Transaction Fee ($)</Label>
                <Input
                  id="fixedFee"
                  type="number"
                  placeholder="0.30"
                  step="0.01"
                  value={fixedFee}
                  onChange={(e) => setFixedFee(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Sales Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="0"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Profit Breakdown</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <p className="text-3xl font-bold text-primary">${result.netProfit.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Profit Margin</p>
                      <p className="text-xl font-bold">{result.profitMargin}%</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="text-xl font-bold">{result.roi}%</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm font-semibold">Cost Breakdown</p>
                    <div className="flex justify-between text-sm">
                      <span>Sale Price</span>
                      <span>${result.revenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-destructive">
                      <span>Platform Fee</span>
                      <span>-${result.platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-destructive">
                      <span>Payment Processing</span>
                      <span>-${result.paymentFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-destructive">
                      <span>Product Cost</span>
                      <span>-${result.productCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-destructive">
                      <span>Shipping</span>
                      <span>-${result.shippingCost.toFixed(2)}</span>
                    </div>
                    {result.tax > 0 && (
                      <div className="flex justify-between text-sm text-destructive">
                        <span>Tax</span>
                        <span>-${result.tax.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-semibold border-t pt-2">
                      <span>Net Profit</span>
                      <span className="text-primary">+${result.netProfit.toFixed(2)}</span>
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

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Platform Fee Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Platform</th>
                  <th className="text-left py-2">Referral Fee</th>
                  <th className="text-left py-2">Payment Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Amazon</td>
                  <td className="py-2">8-15% (category dependent)</td>
                  <td className="py-2">Included in referral</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">eBay</td>
                  <td className="py-2">12.9% (most categories)</td>
                  <td className="py-2">2.9% + $0.30</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Etsy</td>
                  <td className="py-2">6.5%</td>
                  <td className="py-2">3% + $0.25</td>
                </tr>
                <tr>
                  <td className="py-2">Shopify</td>
                  <td className="py-2">$0 (monthly subscription)</td>
                  <td className="py-2">2.9% + $0.30</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Note:</strong> Fees vary by category, seller tier, and region. Always check
            current rates on the platform's official fee schedule.
          </p>
        </div>
      </div>
    </div>
  );
}
