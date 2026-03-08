"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

export default function RentalROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [loanInterest, setLoanInterest] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [annualExpenses, setAnnualExpenses] = useState<string>("");
  const [propertyAppreciation, setPropertyAppreciation] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);
  const [growthData, setGrowthData] = useState<any[]>([]);

  const calculate = () => {
    const price = parseFloat(purchasePrice);
    const rent = parseFloat(monthlyRent);
    const downPay = parseFloat(downPayment) || price * 0.2;
    const loanAmount = price - downPay;
    const interestRate = parseFloat(loanInterest) || 0;
    const tenure = parseFloat(loanTenure) || 20;
    const expenses = parseFloat(annualExpenses) || 0;
    const appreciation = parseFloat(propertyAppreciation) || 0;

    if (price > 0 && rent > 0) {
      const annualRent = rent * 12;
      const grossYield = (annualRent / price) * 100;
      
      // Calculate annual EMI
      let annualEMI = 0;
      if (interestRate > 0 && loanAmount > 0) {
        const monthlyRate = interestRate / 12 / 100;
        const months = tenure * 12;
        const monthlyEMI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        annualEMI = monthlyEMI * 12;
      }

      const netIncome = annualRent - annualEMI - expenses;
      const cashROI = (netIncome / downPay) * 100;
      const totalROI = cashROI + appreciation;

      // 5-year projection
      const projection = [];
      let cumulativeCashFlow = -downPay;
      let propertyValue = price;
      for (let year = 1; year <= 5; year++) {
        propertyValue = price * Math.pow(1 + appreciation / 100, year);
        cumulativeCashFlow += netIncome;
        projection.push({
          year: `Year ${year}`,
          cashFlow: Math.round(cumulativeCashFlow),
          propertyValue: Math.round(propertyValue),
          equity: Math.round(propertyValue - loanAmount * (1 - year / tenure))
        });
      }

      setResult({
        grossYield: Math.round(grossYield * 100) / 100,
        netIncome: Math.round(netIncome),
        cashROI: Math.round(cashROI * 100) / 100,
        totalROI: Math.round(totalROI * 100) / 100,
        annualEMI: Math.round(annualEMI),
        downPayment: downPay
      });

      setBarData([
        { name: "Gross Yield", value: Math.round(grossYield * 100) / 100 },
        { name: "Cash ROI", value: Math.round(cashROI * 100) / 100 },
        { name: "Total ROI", value: Math.round(totalROI * 100) / 100 }
      ]);

      setGrowthData(projection);
    }
  };

  const reset = () => {
    setPurchasePrice("");
    setMonthlyRent("");
    setDownPayment("");
    setLoanInterest("");
    setLoanTenure("");
    setAnnualExpenses("");
    setPropertyAppreciation("");
    setResult(null);
    setBarData([]);
    setGrowthData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Purchase Price ($)</Label>
                <Input type="number" placeholder="e.g., 300000" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
              </div>
              <div>
                <Label>Monthly Rent ($)</Label>
                <Input type="number" placeholder="e.g., 2500" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Down Payment ($)</Label>
                <Input type="number" placeholder="e.g., 60000" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
              </div>
              <div>
                <Label>Loan Interest Rate (%)</Label>
                <Input type="number" step="0.1" placeholder="e.g., 6.5" value={loanInterest} onChange={(e) => setLoanInterest(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Loan Tenure (years)</Label>
                <Input type="number" placeholder="e.g., 20" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} />
              </div>
              <div>
                <Label>Annual Expenses ($)</Label>
                <Input type="number" placeholder="e.g., 5000" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Expected Property Appreciation (%/year)</Label>
              <Input type="number" step="0.1" placeholder="e.g., 3" value={propertyAppreciation} onChange={(e) => setPropertyAppreciation(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate ROI</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Gross Rental Yield</p>
                    <p className="text-3xl font-bold">{result.grossYield}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cash-on-Cash ROI</p>
                    <p className="text-3xl font-bold">{result.cashROI}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total ROI (with appreciation)</p>
                    <p className="text-2xl font-semibold">{result.totalROI}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Net Income</p>
                    <p className="text-2xl font-semibold">${result.netIncome.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Rental ROI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Rental ROI measures the return you earn from a rental property investment. It helps you compare different investment opportunities and determine if a property is worth buying.</p>

          <h3 className="text-xl font-semibold">Key Formulas</h3>
          <div className="p-4 bg-muted rounded-md font-mono space-y-2">
            <div>Gross Yield = (Annual Rent / Purchase Price) × 100%</div>
            <div>Net Income = Annual Rent - Annual EMI - Annual Expenses</div>
            <div>Cash-on-Cash ROI = (Net Income / Down Payment) × 100%</div>
            <div>Total ROI = Cash ROI + Property Appreciation</div>
          </div>

          <h3 className="text-xl font-semibold">ROI Benchmarks</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Cash ROI</th>
                  <th className="p-2 text-left">Assessment</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">&gt; 10%</td>
                  <td className="p-2">Excellent</td>
                  <td className="p-2">Strong buy</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">7-10%</td>
                  <td className="p-2">Good</td>
                  <td className="p-2">Consider buying</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">4-7%</td>
                  <td className="p-2">Average</td>
                  <td className="p-2">Negotiate price</td>
                </tr>
                <tr>
                  <td className="p-2">&lt; 4%</td>
                  <td className="p-2">Poor</td>
                  <td className="p-2">Look elsewhere</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>Purchase: $300,000 | Down: $60,000 | Rent: $2,500/month</p>
          <p>Annual Rent: $30,000 | Gross Yield: 10%</p>
          <p>After EMI and expenses: Net $12,000/year</p>
          <p>Cash ROI: $12,000 / $60,000 = 20%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ROI Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Return (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5-Year Wealth Projection</CardTitle>
          <CardDescription>Cash flow and property value growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          {growthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cashFlow" stroke="#4CAF50" name="Cumulative Cash Flow" />
                <Line type="monotone" dataKey="propertyValue" stroke="#2196F3" name="Property Value" />
                <Line type="monotone" dataKey="equity" stroke="#FF9800" name="Equity" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Location matters more than property features for rental demand</li>
            <li>Calculate all expenses: taxes, insurance, maintenance, vacancy</li>
            <li>Aim for positive cash flow from day one</li>
            <li>Consider appreciation potential in growing areas</li>
            <li>Screen tenants carefully to avoid payment issues</li>
            <li>Keep 3-6 months of expenses as emergency fund</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What is a good ROI for rental property?</h4>
              <p>
                A good cash-on-cash ROI is 8-12% or higher. Total ROI including appreciation of
                10-15% is excellent. Below 5% may not justify the investment risk and effort.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How is rental ROI different from cap rate?</h4>
              <p>
                Cap rate uses the full property price. ROI uses your actual cash invested (down
                payment). ROI is higher when using leverage because you control a large asset with
                less cash.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Should I include appreciation in ROI?</h4>
              <p>
                It depends on your analysis. Cash ROI shows current income. Total ROI includes
                appreciation for long-term wealth building. Both metrics are useful for different
                decisions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What expenses should I include?</h4>
              <p>
                Include property tax, insurance, maintenance (1% of value/year), property management
                (8-12% of rent), HOA fees, and vacancy allowance (5-10% of rent).
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How much should I put down on a rental?</h4>
              <p>
                Investment properties typically require 20-25% down. More down payment reduces
                monthly costs but lowers cash-on-cash ROI. Balance leverage benefits against risk.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
