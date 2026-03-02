"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

export default function DNABaseCountCalculator() {
  const [sequence, setSequence] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);

  const calculate = () => {
    const seq = sequence.toUpperCase().replace(/[^ATGC]/g, "");
    if (seq.length === 0) return;

    const counts = { A: 0, T: 0, G: 0, C: 0 };
    for (const base of seq) {
      if (counts.hasOwnProperty(base)) counts[base as keyof typeof counts]++;
    }

    const total = seq.length;
    const gcContent = ((counts.G + counts.C) / total) * 100;
    const atContent = ((counts.A + counts.T) / total) * 100;

    setResult({
      counts,
      total,
      gcContent: Math.round(gcContent * 100) / 100,
      atContent: Math.round(atContent * 100) / 100,
      purines: counts.A + counts.G,
      pyrimidines: counts.T + counts.C
    });

    setPieData([
      { name: "A (Adenine)", value: counts.A, color: "#4CAF50" },
      { name: "T (Thymine)", value: counts.T, color: "#F44336" },
      { name: "G (Guanine)", value: counts.G, color: "#2196F3" },
      { name: "C (Cytosine)", value: counts.C, color: "#FF9800" }
    ]);

    setBarData([
      { name: "A", count: counts.A },
      { name: "T", count: counts.T },
      { name: "G", count: counts.G },
      { name: "C", count: counts.C }
    ]);
  };

  const reset = () => {
    setSequence("");
    setResult(null);
    setPieData([]);
    setBarData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>DNA Base Count Calculator – Count Nucleotides and GC Content</CardTitle>
          <CardDescription>
            Analyze any DNA sequence with our DNA base count calculator. Count adenine, thymine, guanine, and cytosine bases and calculate GC content percentage instantly. Useful for molecular biology, genetics, and bioinformatics students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>DNA Sequence</Label>
              <Input
                placeholder="e.g., ATGCGATCGATCGATCG"
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Analyze Sequence</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bases</p>
                    <p className="text-2xl font-bold">{result.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GC Content</p>
                    <p className="text-2xl font-bold">{result.gcContent}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 bg-green-100 rounded text-center">
                    <p className="text-xs text-muted-foreground">A</p>
                    <p className="text-xl font-bold">{result.counts.A}</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded text-center">
                    <p className="text-xs text-muted-foreground">T</p>
                    <p className="text-xl font-bold">{result.counts.T}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded text-center">
                    <p className="text-xs text-muted-foreground">G</p>
                    <p className="text-xl font-bold">{result.counts.G}</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded text-center">
                    <p className="text-xs text-muted-foreground">C</p>
                    <p className="text-xl font-bold">{result.counts.C}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding DNA Base Composition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>DNA consists of four nucleotide bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). A pairs with T, and G pairs with C through hydrogen bonds.</p>

          <h3 className="text-xl font-semibold">GC Content</h3>
          <p>GC content is the percentage of guanine and cytosine bases in DNA. Higher GC content increases DNA stability because G-C pairs have three hydrogen bonds compared to two in A-T pairs.</p>

          <div className="p-4 bg-muted rounded-md font-mono text-center">
            GC Content = ((G + C) / Total) × 100%
          </div>

          <h3 className="text-xl font-semibold">GC Content Interpretation</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">GC Content</th>
                  <th className="p-2 text-left">Organism Type</th>
                  <th className="p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">&lt; 40%</td>
                  <td className="p-2">AT-rich</td>
                  <td className="p-2">Plasmodium falciparum (20%)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">40-60%</td>
                  <td className="p-2">Balanced</td>
                  <td className="p-2">Humans (~41%)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">&gt; 60%</td>
                  <td className="p-2">GC-rich</td>
                  <td className="p-2">Streptomyces (72%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold">Chargaff's Rules</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>A = T (adenine equals thymine)</li>
            <li>G = C (guanine equals cytosine)</li>
            <li>Purines (A+G) = Pyrimidines (T+C)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Base Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter a sequence and analyze to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Base Composition Pie Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Enter a sequence and analyze to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DNA Base Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Base</th>
                  <th className="p-2 text-left">Full Name</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Pairs With</th>
                  <th className="p-2 text-left">H-Bonds</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-bold">A</td>
                  <td className="p-2">Adenine</td>
                  <td className="p-2">Purine</td>
                  <td className="p-2">T</td>
                  <td className="p-2">2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-bold">T</td>
                  <td className="p-2">Thymine</td>
                  <td className="p-2">Pyrimidine</td>
                  <td className="p-2">A</td>
                  <td className="p-2">2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-bold">G</td>
                  <td className="p-2">Guanine</td>
                  <td className="p-2">Purine</td>
                  <td className="p-2">C</td>
                  <td className="p-2">3</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">C</td>
                  <td className="p-2">Cytosine</td>
                  <td className="p-2">Pyrimidine</td>
                  <td className="p-2">G</td>
                  <td className="p-2">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
