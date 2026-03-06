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

      {/* SEO Content Section */}
      <div className="space-y-8">
        {/* How It Works */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">How the DNA Base Count Calculator Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter DNA Sequence</h3>
                  <p className="text-sm text-muted-foreground">Input your DNA sequence using A, T, G, C nucleotide letters in any format.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Analyze Composition</h3>
                  <p className="text-sm text-muted-foreground">The calculator counts each base type and calculates GC content percentage automatically.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">View Results and Charts</h3>
                  <p className="text-sm text-muted-foreground">Get base counts, GC content, visual charts, and interpretation of your sequence composition.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features and Benefits */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Features of This DNA Analysis Tool</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Complete Base Counting</h3>
                    <p className="text-sm text-muted-foreground">Counts adenine, thymine, guanine, and cytosine bases individually for detailed sequence analysis.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">GC Content Calculation</h3>
                    <p className="text-sm text-muted-foreground">Automatically calculates GC percentage to assess DNA stability and organism characteristics.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Visual Data Charts</h3>
                    <p className="text-sm text-muted-foreground">Interactive bar and pie charts display base distribution for easy visualization and presentation.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Purine and Pyrimidine Counts</h3>
                    <p className="text-sm text-muted-foreground">Calculates total purines (A+G) and pyrimidines (T+C) to verify Chargaff&apos;s rules.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">GC Interpretation Guide</h3>
                    <p className="text-sm text-muted-foreground">Provides organism type classification based on GC content with real-world examples.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Free Bioinformatics Tool</h3>
                    <p className="text-sm text-muted-foreground">Completely free DNA analysis calculator for students, researchers, and biology professionals.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How do you count DNA bases in a sequence?</h3>
                <p className="text-sm text-muted-foreground">Count each occurrence of A (adenine), T (thymine), G (guanine), and C (cytosine) in the sequence. Add up the totals for each base. Our calculator does this automatically - just paste your sequence and click analyze.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is GC content and why does it matter?</h3>
                <p className="text-sm text-muted-foreground">GC content is the percentage of guanine and cytosine bases in DNA. It matters because G-C pairs have three hydrogen bonds (vs two for A-T), making DNA more stable. High GC content affects melting temperature, gene expression, and indicates organism type.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is Chargaff&apos;s rule?</h3>
                <p className="text-sm text-muted-foreground">Chargaff&apos;s rules state that in double-stranded DNA, adenine equals thymine (A=T) and guanine equals cytosine (G=C). This means purines (A+G) equal pyrimidines (T+C). These rules reflect the complementary base pairing in DNA&apos;s double helix structure.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is a normal GC content percentage?</h3>
                <p className="text-sm text-muted-foreground">Human DNA has about 41% GC content. Bacteria range from 25-75%. AT-rich organisms (&lt;40%) include Plasmodium (malaria parasite). GC-rich organisms (&gt;60%) include Streptomyces bacteria. Most organisms fall in the 40-60% balanced range.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What are purines and pyrimidines in DNA?</h3>
                <p className="text-sm text-muted-foreground">Purines (adenine and guanine) have a double-ring structure. Pyrimidines (thymine and cytosine) have a single-ring structure. In DNA, purines always pair with pyrimidines: A with T, and G with C, maintaining consistent helix width.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Related Biology Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/rna-transcription-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-2">RNA Transcription Calculator</h3>
                <p className="text-sm text-muted-foreground">Convert DNA sequences to RNA by replacing thymine with uracil for transcription studies.</p>
              </a>
              <a href="/calculators/codon-table-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-2">Codon Table Calculator</h3>
                <p className="text-sm text-muted-foreground">Translate DNA or RNA sequences into amino acid sequences using the genetic code.</p>
              </a>
              <a href="/calculators/melting-temperature-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h3 className="font-semibold mb-2">DNA Melting Temperature Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate DNA primer melting temperature based on sequence and GC content.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
