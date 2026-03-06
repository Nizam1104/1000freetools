"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalesTaxVatCalculator() {
  const [price, setPrice] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [result, setResult] = useState<{
    taxAmount: number;
    totalPrice: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const rate = parseFloat(taxRate);

    if (!p || !rate) {
      setResult(null);
      return;
    }

    const taxAmount = (p * rate) / 100;
    const totalPrice = p + taxAmount;

    setResult({ taxAmount, totalPrice });
  };

  const reset = () => {
    setPrice("");
    setTaxRate("");
    setResult(null);
  };

  const loadExample = () => {
    setPrice("99.99");
    setTaxRate("8.5");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Sales Tax & VAT Calculator – Compute Tax Amount Online</h1>
        <p className="text-muted-foreground">
          Calculate sales tax or VAT on any purchase with our free online tax calculator. Enter price and tax rate to find the tax amount and total price including tax.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculate Sales Tax / VAT</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price Before Tax ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 99.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1">
              Calculate Tax
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
            <Button onClick={loadExample} variant="outline">
              Example
            </Button>
          </div>

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Price Before Tax</div>
                  <div className="text-2xl font-bold">${price}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Tax Amount</div>
                  <div className="text-2xl font-bold">${result.taxAmount.toFixed(2)}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                  <div className="text-3xl font-bold">${result.totalPrice.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Sales Tax and VAT</h2>
        <p className="text-muted-foreground">
          Sales tax and VAT (Value Added Tax) are consumption taxes added to the price of goods and services. The tax rate varies by location and product type.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Sales Tax</div>
            <p className="text-xs text-muted-foreground">
              Applied at the point of sale in the US. Rates vary by state, county, and city. Some items like groceries may be exempt.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">VAT (Value Added Tax)</div>
            <p className="text-xs text-muted-foreground">
              Common in Europe and many other countries. Applied at each stage of production, but ultimately paid by the consumer.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The Formula</h2>
        <div className="p-4 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-2">Tax Amount = Price × (Tax Rate ÷ 100)</div>
          <div className="font-mono text-sm">Total Price = Price + Tax Amount</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="font-semibold text-sm mb-2">Example Calculation</div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>Item price: $99.99</div>
            <div>Tax rate: 8.5%</div>
            <div>Tax amount: $99.99 × 0.085 = $8.50</div>
            <div>Total: $99.99 + $8.50 = $108.49</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Common Tax Rates by Location</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">United States</div>
            <p className="text-xs text-muted-foreground">
              0% to 10% depending on state. California ~9.5%, Texas ~8.25%, New York City ~8.875%.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">United Kingdom</div>
            <p className="text-xs text-muted-foreground">
              Standard VAT rate is 20%. Reduced rate of 5% for some items like home energy.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">European Union</div>
            <p className="text-xs text-muted-foreground">
              VAT ranges from 17% (Luxembourg) to 27% (Hungary). Most countries between 19-23%.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate the pre-tax price from the total?</h4>
            <p className="text-xs text-muted-foreground">
              Divide the total by (1 + tax rate as decimal). For $108.49 with 8.5% tax: $108.49 ÷ 1.085 = $99.99.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is sales tax included in the displayed price?</h4>
            <p className="text-xs text-muted-foreground">
              In the US, prices usually exclude tax – it's added at checkout. In Europe and many other regions, VAT is included in displayed prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are all items taxed at the same rate?</h4>
            <p className="text-xs text-muted-foreground">
              No. Many jurisdictions have reduced rates or exemptions for groceries, prescription drugs, and clothing. Check your local tax rules.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
