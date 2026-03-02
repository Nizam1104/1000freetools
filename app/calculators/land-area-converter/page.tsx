"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar } from "recharts";

export default function LandAreaConverter() {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("sqft");
  const [result, setResult] = useState<any>(null);
  const [pieData, setPieData] = useState<any[]>([]);

  const units: Record<string, number> = {
    sqm: 1,
    sqft: 0.092903,
    acre: 4046.86,
    hectare: 10000,
    sqyard: 0.836127,
    bigha: 2529.29,
    guntha: 101.171,
    cent: 40.4686,
    ground: 222.967,
    kanal: 505.857,
    marla: 25.2929,
    sqmile: 2589988.11
  };

  const calculate = () => {
    const val = parseFloat(value);
    if (val > 0 && units[fromUnit]) {
      const sqm = val * units[fromUnit];
      const conversions = {
        sqm: Math.round(sqm * 100) / 100,
        sqft: Math.round((sqm / units.sqft) * 100) / 100,
        acre: Math.round((sqm / units.acre) * 10000) / 10000,
        hectare: Math.round((sqm / units.hectare) * 10000) / 10000,
        sqyard: Math.round((sqm / units.sqyard) * 100) / 100,
        bigha: Math.round((sqm / units.bigha) * 1000) / 1000,
        guntha: Math.round((sqm / units.guntha) * 100) / 100,
        cent: Math.round((sqm / units.cent) * 100) / 100,
        ground: Math.round((sqm / units.ground) * 1000) / 1000,
        kanal: Math.round((sqm / units.kanal) * 1000) / 1000,
        marla: Math.round((sqm / units.marla) * 100) / 100,
        sqmile: (sqm / units.sqmile).toExponential(4)
      };
      setResult(conversions);

      setPieData([
        { name: "sqm", value: conversions.sqm },
        { name: "sqft", value: conversions.sqft / 100 },
        { name: "acre", value: conversions.acre * 10000 },
        { name: "hectare", value: conversions.hectare * 10000 }
      ].filter(d => d.value > 0 && d.value < 10000));
    }
  };

  const reset = () => {
    setValue("");
    setResult(null);
    setPieData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Land Area Converter – Convert Acres, Hectares, Sq Ft, and Bigha</CardTitle>
          <CardDescription>
            Convert land area between acres, hectares, square meters, square feet, bigha, and other units with our free land area converter. Perfect for real estate buyers, sellers, farmers, and property developers needing accurate area conversions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Area Value</Label>
              <Input type="number" placeholder="e.g., 1000" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div>
              <Label>From Unit</Label>
              <Select value={fromUnit} onValueChange={(v) => setFromUnit(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sqft">Square Feet (sqft)</SelectItem>
                  <SelectItem value="sqm">Square Meters (sqm)</SelectItem>
                  <SelectItem value="acre">Acres</SelectItem>
                  <SelectItem value="hectare">Hectares</SelectItem>
                  <SelectItem value="sqyard">Square Yards</SelectItem>
                  <SelectItem value="bigha">Bigha</SelectItem>
                  <SelectItem value="guntha">Guntha</SelectItem>
                  <SelectItem value="cent">Cent</SelectItem>
                  <SelectItem value="ground">Ground</SelectItem>
                  <SelectItem value="kanal">Kanal</SelectItem>
                  <SelectItem value="marla">Marla</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-3">Conversions</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-2 bg-background rounded">
                    <p className="text-xs text-muted-foreground">Square Meters</p>
                    <p className="text-lg font-bold">{result.sqm}</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <p className="text-xs text-muted-foreground">Square Feet</p>
                    <p className="text-lg font-bold">{result.sqft.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <p className="text-xs text-muted-foreground">Acres</p>
                    <p className="text-lg font-bold">{result.acre}</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <p className="text-xs text-muted-foreground">Hectares</p>
                    <p className="text-lg font-bold">{result.hectare}</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <p className="text-xs text-muted-foreground">Bigha</p>
                    <p className="text-lg font-bold">{result.bigha}</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <p className="text-xs text-muted-foreground">Guntha</p>
                    <p className="text-lg font-bold">{result.guntha}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Land Area Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Different regions use different units to measure land area. Understanding conversions helps you compare property sizes across regions and countries.</p>

          <h3 className="text-xl font-semibold">Common Land Area Units</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Unit</th>
                  <th className="p-2 text-left">Square Meters</th>
                  <th className="p-2 text-left">Square Feet</th>
                  <th className="p-2 text-left">Region</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">1 Acre</td>
                  <td className="p-2">4,046.86</td>
                  <td className="p-2">43,560</td>
                  <td className="p-2">US, UK, India</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1 Hectare</td>
                  <td className="p-2">10,000</td>
                  <td className="p-2">107,639</td>
                  <td className="p-2">Metric countries</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1 Bigha</td>
                  <td className="p-2">2,529.29</td>
                  <td className="p-2">27,225</td>
                  <td className="p-2">India, Nepal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1 Guntha</td>
                  <td className="p-2">101.17</td>
                  <td className="p-2">1,089</td>
                  <td className="p-2">Maharashtra, India</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1 Cent</td>
                  <td className="p-2">40.47</td>
                  <td className="p-2">435.6</td>
                  <td className="p-2">South India</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">1 Kanal</td>
                  <td className="p-2">505.86</td>
                  <td className="p-2">5,445</td>
                  <td className="p-2">Punjab, Pakistan</td>
                </tr>
                <tr>
                  <td className="p-2">1 Marla</td>
                  <td className="p-2">25.29</td>
                  <td className="p-2">272.25</td>
                  <td className="p-2">Punjab, India</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Conversion Formulas</h3>
          <div className="p-4 bg-muted rounded-md font-mono space-y-1">
            <div>1 acre = 43,560 sqft = 4,046.86 sqm</div>
            <div>1 hectare = 10,000 sqm = 2.471 acres</div>
            <div>1 bigha = 27,225 sqft = 2,529.29 sqm</div>
            <div>1 sqm = 10.7639 sqft</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Area Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter values and convert to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Reference: 1 Acre Equals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Sq Ft</p>
              <p className="font-bold">43,560</p>
            </div>
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Sq Meters</p>
              <p className="font-bold">4,046.86</p>
            </div>
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Hectares</p>
              <p className="font-bold">0.4047</p>
            </div>
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Bigha</p>
              <p className="font-bold">1.6</p>
            </div>
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Guntha</p>
              <p className="font-bold">40</p>
            </div>
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Cent</p>
              <p className="font-bold">100</p>
            </div>
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Kanal</p>
              <p className="font-bold">8</p>
            </div>
            <div className="p-2 bg-muted rounded text-center">
              <p className="text-xs text-muted-foreground">Marla</p>
              <p className="font-bold">160</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
