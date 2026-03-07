"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RentalYieldCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [annualExpenses, setAnnualExpenses] = useState<string>("");
  const [result, setResult] = useState<{
    grossYield: number;
    netYield: number;
    annualRent: number;
    netAnnualIncome: number;
  } | null>(null);

  const calculateRentalYield = () => {
    const price = parseFloat(purchasePrice);
    const rent = parseFloat(monthlyRent);
    const expenses = parseFloat(annualExpenses) || 0;

    if (isNaN(price) || isNaN(rent) || price <= 0 || rent <= 0) {
      return;
    }

    const annualRent = rent * 12;
    const grossYield = (annualRent / price) * 100;
    const netAnnualIncome = annualRent - expenses;
    const netYield = (netAnnualIncome / price) * 100;

    setResult({ grossYield, netYield, annualRent, netAnnualIncome });
  };

  const reset = () => {
    setPurchasePrice("");
    setMonthlyRent("");
    setAnnualExpenses("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Rental Yield Calculator</h1>
          <p className="text-muted-foreground">
            Evaluate a rental property&apos;s performance. Calculate gross and net rental yield based on purchase price, annual rental income, and operating expenses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="Enter property purchase price"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  placeholder="Enter monthly rental income"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualExpenses">Annual Expenses (optional)</Label>
                <Input
                  id="annualExpenses"
                  type="number"
                  placeholder="Enter annual expenses"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Include: property tax, insurance, maintenance, HOA fees, etc.</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRentalYield} className="flex-1">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Rental Yield</p>
                      <p className="text-2xl font-bold text-primary">{result.grossYield.toFixed(2)}%</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Rental Yield</p>
                      <p className="text-2xl font-bold text-primary">{result.netYield.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annual Rental Income</p>
                      <p className="text-lg font-bold">${result.annualRent.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Annual Income</p>
                      <p className="text-lg font-bold">${result.netAnnualIncome.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Purchase Price: ${parseFloat(purchasePrice).toFixed(2)} | Monthly Rent: ${parseFloat(monthlyRent).toFixed(2)}</p>
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

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Rental Yield
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Rental yield measures the annual return on a property investment from rent alone.
                It helps compare properties and evaluate whether a purchase makes financial sense.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm space-y-2">
                <div>Gross Yield = (Annual Rent / Purchase Price) × 100%</div>
                <div>Net Yield = ((Annual Rent - Expenses) / Purchase Price) × 100%</div>
              </div>
              <p>
                Gross yield gives a quick comparison. Net yield is more accurate since it accounts
                for property taxes, insurance, maintenance, and other costs.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Rental Yield Benchmarks
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Yield Range</th>
                    <th className="text-left py-3 px-2 font-semibold">Assessment</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Market</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">&gt; 8%</td>
                    <td className="py-3 px-2">Excellent</td>
                    <td className="py-3 px-2">Secondary cities, emerging areas</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">6-8%</td>
                    <td className="py-3 px-2">Good</td>
                    <td className="py-3 px-2">Growing suburbs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4-6%</td>
                    <td className="py-3 px-2">Average</td>
                    <td className="py-3 px-2">Established urban areas</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">3-4%</td>
                    <td className="py-3 px-2">Low</td>
                    <td className="py-3 px-2">Prime city centers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">&lt; 3%</td>
                    <td className="py-3 px-2">Very Low</td>
                    <td className="py-3 px-2">Luxury markets, high-appreciation areas</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Higher yields often come with higher risk or lower appreciation potential.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Rental Expenses
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Property Tax</p>
                <p className="text-muted-foreground">Typically 1-2% of property value annually</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Insurance</p>
                <p className="text-muted-foreground">Landlord insurance: $500-2000/year depending on property</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Maintenance</p>
                <p className="text-muted-foreground">Budget 1% of property value per year for repairs</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Property Management</p>
                <p className="text-muted-foreground">8-12% of monthly rent if using a management company</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Vacancy Allowance</p>
                <p className="text-muted-foreground">Plan for 5-10% vacancy (1-2 months per year)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is a good rental yield?</h4>
                <p>
                  A good gross rental yield is 6% or higher. Net yields of 4-5% are solid after
                  expenses. Prime locations often have lower yields (3-4%) but better appreciation.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Should I focus on yield or appreciation?</h4>
                <p>
                  It depends on your strategy. High yield provides cash flow now. High appreciation
                  builds wealth long-term. Many investors seek a balance — decent yield with moderate
                  appreciation potential.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I calculate net yield accurately?</h4>
                <p>
                  Include all annual expenses: property tax, insurance, maintenance, management fees,
                  HOA fees, and vacancy allowance. Subtract from annual rent, then divide by purchase price.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does rental yield include mortgage payments?</h4>
                <p>
                  No. Rental yield is based on the property price, not your financing. Mortgage
                  payments affect cash flow but not yield. This allows comparing properties regardless
                  of how they are financed.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What affects rental yield?</h4>
                <p>
                  Location, property type, local rental demand, purchase price, and operating costs
                  all affect yield. Properties in high-demand rental areas with reasonable prices
                  typically offer better yields.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
