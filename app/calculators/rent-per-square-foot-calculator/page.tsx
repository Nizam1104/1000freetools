"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function RentPerSquareFootCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<"sqft" | "sqm">("sqft");
  const [result, setResult] = useState<any>(null);
  const [barData, setBarData] = useState<any[]>([]);

  const calculate = () => {
    const rent = parseFloat(monthlyRent);
    const areaValue = parseFloat(area);

    if (rent > 0 && areaValue > 0) {
      let rentPerSqFt: number;
      let rentPerSqM: number;

      if (areaUnit === "sqft") {
        rentPerSqFt = rent / areaValue;
        rentPerSqM = rentPerSqFt * 10.7639;
      } else {
        rentPerSqM = rent / areaValue;
        rentPerSqFt = rentPerSqM / 10.7639;
      }

      const annualRent = rent * 12;
      const annualPerSqFt = rentPerSqFt * 12;

      setResult({
        monthlyPerSqFt: Math.round(rentPerSqFt * 100) / 100,
        monthlyPerSqM: Math.round(rentPerSqM * 100) / 100,
        annualPerSqFt: Math.round(annualPerSqFt * 100) / 100,
        annualRent: annualRent
      });

      setBarData([
        { name: "Monthly Rent", value: rent },
        { name: "Annual Rent", value: annualRent },
        { name: "Rent/sqft (yr)", value: Math.round(annualPerSqFt * 100) / 100 }
      ]);
    }
  };

  const reset = () => {
    setMonthlyRent("");
    setArea("");
    setResult(null);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Rent per Square Foot Calculator – Compare Property Rental Rates</CardTitle>
          <CardDescription>
            Calculate rent per square foot for any property with our free calculator. Compare rental rates across different properties to make informed leasing decisions. Essential for tenants, landlords, commercial real estate professionals, and property managers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Monthly Rent ($)</Label>
              <Input type="number" placeholder="e.g., 2000" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} />
            </div>
            <div>
              <Label>Area</Label>
              <Input type="number" placeholder="e.g., 1000" value={area} onChange={(e) => setArea(e.target.value)} />
            </div>
            <div>
              <Label>Area Unit</Label>
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value as typeof areaUnit)}
                className="w-full p-2 border rounded"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqm">Square Meters</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rent/sqft</p>
                    <p className="text-3xl font-bold">${result.monthlyPerSqFt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rent/sqm</p>
                    <p className="text-3xl font-bold">${result.monthlyPerSqM}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Rent/sqft</p>
                    <p className="text-xl font-semibold">${result.annualPerSqFt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Annual Rent</p>
                    <p className="text-xl font-semibold">${result.annualRent.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Rent per Square Foot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Rent per square foot standardizes rental prices across properties of different sizes. You use it to compare properties and determine if a rental price is fair for the market.</p>

          <h3 className="text-xl font-semibold">Formulas</h3>
          <div className="p-4 bg-muted rounded-md font-mono space-y-2">
            <div>Rent/sqft = Monthly Rent ÷ Area (sqft)</div>
            <div>Rent/sqm = Monthly Rent ÷ Area (sqm)</div>
            <div>1 sqm = 10.7639 sqft</div>
          </div>

          <h3 className="text-xl font-semibold">Market Rate Guide</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Property Type</th>
                  <th className="p-2 text-left">Avg Rent/sqft (monthly)</th>
                  <th className="p-2 text-left">Typical Range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Studio Apartment</td>
                  <td className="p-2">$3-5</td>
                  <td className="p-2">$2-8</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1 Bedroom</td>
                  <td className="p-2">$2-4</td>
                  <td className="p-2">$1.5-6</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">2+ Bedroom</td>
                  <td className="p-2">$1.5-3</td>
                  <td className="p-2">$1-5</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Office Space</td>
                  <td className="p-2">$2-5</td>
                  <td className="p-2">$1-10</td>
                </tr>
                <tr>
                  <td className="p-2">Retail Space</td>
                  <td className="p-2">$3-8</td>
                  <td className="p-2">$2-20</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Example Calculation</h3>
          <p>A 1,000 sqft apartment rents for $2,000/month:</p>
          <p>Rent/sqft = $2,000 ÷ 1,000 = $2.00/sqft/month</p>
          <p>Annual rent/sqft = $2.00 × 12 = $24.00/sqft/year</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rent Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }} />
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
          <CardTitle>Tips for Renters</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Compare rent/sqft across similar properties in the same neighborhood</li>
            <li>Consider amenities and utilities included in the rent</li>
            <li>Factor in commute costs and time when evaluating location</li>
            <li>Check if rent/sqft decreases for larger units</li>
            <li>Negotiate based on comparable properties with lower rent/sqft</li>
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
              <h4 className="font-medium text-foreground mb-2">What is a good rent per square foot?</h4>
              <p>
                It depends on location and property type. In major cities, $2-4/sqft/month is common
                for apartments. Suburban areas may be $1-2/sqft. Commercial space varies widely by
                location and use.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Should I use monthly or annual rent/sqft?</h4>
              <p>
                Residential leases typically use monthly rent/sqft. Commercial leases often quote
                annual rent/sqft. Be sure to compare the same time period when evaluating properties.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Does rent/sqft decrease for larger units?</h4>
              <p>
                Often yes. Larger units typically have lower rent/sqft because fixed costs (kitchen,
                bathroom) are spread over more space. Studios usually have the highest rent/sqft.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What affects rent per square foot?</h4>
              <p>
                Location, building age, amenities, floor level, view, and neighborhood demand all
                affect rent/sqft. Newer buildings with amenities command premium rates.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How do I convert between sqft and sqm?</h4>
              <p>
                1 square meter = 10.7639 square feet. To convert rent/sqm to rent/sqft, divide by
                10.7639. To convert rent/sqft to rent/sqm, multiply by 10.7639.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Related Tools
          </h3>
          <div className="space-y-2 text-sm">
            <a
              href="/calculators/rental-yield-calculator"
              className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">Rental Yield Calculator</span>
              <p className="text-muted-foreground">Calculate gross and net rental yield for investment properties</p>
            </a>
            <a
              href="/calculators/rental-roi-calculator"
              className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">Rental ROI Calculator</span>
              <p className="text-muted-foreground">Calculate return on investment including appreciation</p>
            </a>
            <a
              href="/calculators/mortgage-calculator"
              className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">Mortgage Calculator</span>
              <p className="text-muted-foreground">Calculate monthly mortgage payments for home purchases</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
