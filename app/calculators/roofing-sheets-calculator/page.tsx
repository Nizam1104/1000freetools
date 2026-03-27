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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Faqs from "@/components/utils/Faqs";


export default function RoofingSheetsCalculator() {
  const [roofLength, setRoofLength] = useState<string>("");
  const [roofWidth, setRoofWidth] = useState<string>("");
  const [sheetLength, setSheetLength] = useState<string>("");
  const [sheetWidth, setSheetWidth] = useState<string>("");
  const [overlap, setOverlap] = useState<string>("10");
  const [waste, setWaste] = useState<string>("5");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const RL = parseFloat(roofLength);
    const RW = parseFloat(roofWidth);
    const SL = parseFloat(sheetLength);
    const SW = parseFloat(sheetWidth) / 100;
    const overlapFactor = 1 - parseFloat(overlap) / 100;
    const wasteFactor = 1 + parseFloat(waste) / 100;

    if (RL > 0 && RW > 0 && SL > 0 && SW > 0) {
      const roofArea = RL * RW;
      const effectiveSheetWidth = SW * overlapFactor;
      const effectiveSheetArea = SL * effectiveSheetWidth;
      const sheetsNeeded = Math.ceil((roofArea / effectiveSheetArea) * wasteFactor);

      setResults({
        roofArea,
        sheets: sheetsNeeded,
        coverage: sheetsNeeded * SL * effectiveSheetWidth,
        effectiveWidth: effectiveSheetWidth,
      });
    }
  };

  const reset = () => {
    setRoofLength(""); setRoofWidth(""); setSheetLength(""); setSheetWidth("");
    setOverlap("10"); setWaste("5"); setResults(null);
  };

  // Generate comparison data for different overlap percentages
  const overlapComparison = results ? [
    { overlap: "5%", sheets: Math.ceil((results.roofArea / (parseFloat(sheetLength) * (parseFloat(sheetWidth)/100 * 0.95))) * (1 + parseFloat(waste)/100)) },
    { overlap: "10%", sheets: results.sheets },
    { overlap: "15%", sheets: Math.ceil((results.roofArea / (parseFloat(sheetLength) * (parseFloat(sheetWidth)/100 * 0.85))) * (1 + parseFloat(waste)/100)) },
    { overlap: "20%", sheets: Math.ceil((results.roofArea / (parseFloat(sheetLength) * (parseFloat(sheetWidth)/100 * 0.80))) * (1 + parseFloat(waste)/100)) },
  ] : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Roof Length (m)</Label><Input value={roofLength} onChange={e => setRoofLength(e.target.value)} /></div>
              <div><Label>Roof Width (m)</Label><Input value={roofWidth} onChange={e => setRoofWidth(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Sheet Length (m)</Label><Input value={sheetLength} onChange={e => setSheetLength(e.target.value)} /></div>
              <div><Label>Sheet Width (cm)</Label><Input value={sheetWidth} onChange={e => setSheetWidth(e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Side Overlap (%)</Label><Input value={overlap} onChange={e => setOverlap(e.target.value)} /></div>
              <div><Label>Waste Factor (%)</Label><Input value={waste} onChange={e => setWaste(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Sheets</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Roof Area</p>
                  <p className="text-2xl font-bold">{Math.round(results.roofArea * 100) / 100} m²</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sheets Needed</p>
                  <p className="text-4xl font-bold">{results.sheets}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Effective Sheet Width</p>
                    <p className="text-lg font-semibold">{Math.round(results.effectiveWidth * 100)} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Coverage</p>
                    <p className="text-lg font-semibold">{Math.round(results.coverage * 100) / 100} m²</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on {overlap}% side overlap and {waste}% waste factor
                </p>
              </div>
            )}
          </div>

          {results && overlapComparison.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Sheets Needed by Overlap Percentage</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    sheets: { label: "Sheets", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={overlapComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="overlap" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sheets" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Higher overlap = better waterproofing but more sheets needed
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Roofing Sheet Overlap</CardTitle>
          <CardDescription>Why overlap matters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Roofing sheets overlap to prevent water infiltration. Wind-driven rain can travel uphill under sheets, so the overlap creates a labyrinth path that water can't penetrate. Too little overlap = leaks. Too much overlap = wasted material.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Recommended Overlap by Roof Pitch</p>
            <div className="space-y-2 text-xs">
              <p><strong>Low pitch (3:12 or less):</strong> 15-20% overlap minimum</p>
              <p><strong>Medium pitch (4:12 to 6:12):</strong> 10-15% overlap</p>
              <p><strong>Steep pitch (7:12 or more):</strong> 5-10% overlap acceptable</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            End laps (where sheets meet along their length) need 150-300mm overlap depending on pitch. Side laps (where sheets meet along their width) typically overlap by one corrugation or rib – about 5-10% of sheet width.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Roofing Sheet Sizes</CardTitle>
          <CardDescription>Standard dimensions by material</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Standard Width</TableHead>
                <TableHead>Length Range</TableHead>
                <TableHead>Typical Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Corrugated GI</TableCell>
                <TableCell className="font-mono text-xs">76-83 cm</TableCell>
                <TableCell className="font-mono text-xs">1.8-3.6 m</TableCell>
                <TableCell className="text-xs">Sheds, agricultural buildings</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">IBR Profile</TableCell>
                <TableCell className="font-mono text-xs">68-73 cm</TableCell>
                <TableCell className="font-mono text-xs">1.5-6 m</TableCell>
                <TableCell className="text-xs">Industrial roofing</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Box Profile</TableCell>
                <TableCell className="font-mono text-xs">91-100 cm</TableCell>
                <TableCell className="font-mono text-xs">1.5-6 m</TableCell>
                <TableCell className="text-xs">Residential, commercial</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tile Profile</TableCell>
                <TableCell className="font-mono text-xs">90-100 cm</TableCell>
                <TableCell className="font-mono text-xs">1.5-4 m</TableCell>
                <TableCell className="text-xs">Residential (tile look)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Standing Seam</TableCell>
                <TableCell className="font-mono text-xs">40-50 cm</TableCell>
                <TableCell className="font-mono text-xs">Custom lengths</TableCell>
                <TableCell className="text-xs">Premium residential</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Widths shown are cover widths (after overlap). Actual sheet widths are 5-10% wider.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roofing Waste Factors</CardTitle>
          <CardDescription>How much extra to order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roof Type</TableHead>
                <TableHead>Waste Factor</TableHead>
                <TableHead>Reasons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Simple gable roof</TableCell>
                <TableCell className="font-mono text-xs">3-5%</TableCell>
                <TableCell className="text-xs">Minimal cutting, straight runs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Hip roof</TableCell>
                <TableCell className="font-mono text-xs">8-12%</TableCell>
                <TableCell className="text-xs">Angled cuts at hips and valleys</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Complex roof</TableCell>
                <TableCell className="font-mono text-xs">12-15%</TableCell>
                <TableCell className="text-xs">Multiple valleys, dormers, penetrations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Metal tile profile</TableCell>
                <TableCell className="font-mono text-xs">+3-5%</TableCell>
                <TableCell className="text-xs">Pattern matching increases waste</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roofing Accessories Checklist</CardTitle>
          <CardDescription>Don't forget these items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Water Management</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Ridge caps (roof length ÷ sheet length)</li>
                <li>• Valley flashing (valley length + 10%)</li>
                <li>• Gutter apron / eave flashing</li>
                <li>• Drip edge</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Fasteners & Sealing</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Self-tapping screws (6-8 per m²)</li>
                <li>• Ridge screws (4-6 per meter)</li>
                <li>• Sealant tubes (1 per 20m of flashing)</li>
                <li>• Butyl tape for end laps</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Penetrations</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Pipe boots / vent flashings</li>
                <li>• Skylight curbs and flashings</li>
                <li>• Chimney cricket and counterflashing</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Safety & Structure</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Roof underlayment</li>
                <li>• Closure strips (for corrugated)</li>
                <li>• Snow guards (if applicable)</li>
                <li>• Fall protection anchors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How do I measure my roof for sheets?",
    answer: "Measure the roof surface, not the building footprint. For a gable roof, multiply the rafter length by the building length, then double it for both sides. Add 10% for waste on simple roofs, 15% for complex roofs with valleys and dormers.",
  },
{
    question: "What's the minimum roof pitch for metal roofing?",
    answer: "Corrugated and ribbed profiles: 3:12 minimum (14°). Standing seam: can go as low as 1:4:12 (3°) with special sealing. Below minimum pitch, you need a built-up roof or membrane underneath. Local building codes may have stricter requirements.",
  },
{
    question: "How many screws do I need per roofing sheet?",
    answer: "Standard placement: screws every 300mm along laps, every 500mm in the field. A typical 3m sheet needs 18-24 screws. Order 10% extra for mistakes. Use color-matched screws with EPDM washers for weatherproofing.",
  },
{
    question: "Should I use long or short roofing sheets?",
    answer: "Longer sheets mean fewer end laps (potential leak points) but are harder to handle. Sheets over 6m require special equipment. For DIY, 3-4m lengths are manageable. Custom-length sheets cost more but reduce waste and installation time.",
  },
{
    question: "What's the difference between galvanized and Galvalume?",
    answer: "Galvanized steel has a zinc coating. Galvalume has aluminum-zinc alloy coating (55% Al, 45% Zn). Galvalume lasts 2-4× longer in coastal areas, resists heat better, but costs 10-20% more. Both need paint systems for color and additional protection.",
  }
  ]} />
</section>
    </div>
  );
}
