"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar } from "recharts";

export default function PunnettSquareCalculator() {
  const [crossType, setCrossType] = useState<"monohybrid" | "dihybrid">("monohybrid");
  const [parent1Allele1, setParent1Allele1] = useState<string>("A");
  const [parent1Allele2, setParent1Allele2] = useState<string>("a");
  const [parent2Allele1, setParent2Allele1] = useState<string>("A");
  const [parent2Allele2, setParent2Allele2] = useState<string>("a");
  const [parent1Gene2, setParent1Gene2] = useState<string>("Bb");
  const [parent2Gene2, setParent2Gene2] = useState<string>("Bb");
  const [result, setResult] = useState<any>(null);
  const [pieData, setPieData] = useState<any[]>([]);

  const calculate = () => {
    if (crossType === "monohybrid") {
      const p1 = [parent1Allele1, parent1Allele2];
      const p2 = [parent2Allele1, parent2Allele2];
      
      const offspring = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          const genotype = [p1[i], p2[j]].sort().join("");
          offspring.push(genotype);
        }
      }

      const counts: Record<string, number> = {};
      offspring.forEach(g => { counts[g] = (counts[g] || 0) + 1 });
      
      const total = offspring.length;
      const probabilities = Object.entries(counts).map(([genotype, count]) => ({
        genotype,
        count,
        probability: Math.round((count as number / total) * 100)
      }));

      const dominant = offspring.filter(g => g.includes(parent1Allele1.toUpperCase())).length;
      const recessive = total - dominant;

      setResult({
        punnett: [[p1[0] + p2[0], p1[0] + p2[1]], [p1[1] + p2[0], p1[1] + p2[1]]],
        probabilities,
        phenotypeRatio: `${dominant}:${recessive}`,
        genotypeRatio: Object.entries(counts).map(([g, c]) => `${g}:${c}`).join(":")
      });

      setPieData(probabilities.map(p => ({ name: p.genotype, value: p.probability, color: `hsl(${Math.random() * 360}, 70%, 50%)` })));
    } else {
      const p1G1 = [parent1Allele1, parent1Allele2];
      const p1G2 = [parent1Gene2[0], parent1Gene2[1]];
      const p2G1 = [parent2Allele1, parent2Allele2];
      const p2G2 = [parent2Gene2[0], parent2Gene2[1]];

      const offspring = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            for (let l = 0; l < 2; l++) {
              const g1 = [p1G1[i], p2G1[k]].sort().join("");
              const g2 = [p1G2[j], p2G2[l]].sort().join("");
              offspring.push(g1 + g2);
            }
          }
        }
      }

      const counts: Record<string, number> = {};
      offspring.forEach(g => { counts[g] = (counts[g] || 0) + 1 });

      const total = offspring.length;
      const probabilities = Object.entries(counts).map(([genotype, count]) => ({
        genotype,
        count,
        probability: Math.round((count as number / total) * 100)
      }));

      setResult({
        probabilities,
        total: 16
      });

      setPieData(probabilities.slice(0, 6).map(p => ({ name: p.genotype, value: p.probability, color: `hsl(${Math.random() * 360}, 70%, 50%)` })));
    }
  };

  const reset = () => {
    setParent1Allele1("A");
    setParent1Allele2("a");
    setParent2Allele1("A");
    setParent2Allele2("a");
    setParent1Gene2("Bb");
    setParent2Gene2("Bb");
    setResult(null);
    setPieData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Punnett Square Calculator – Predict Genetic Cross Outcomes</CardTitle>
          <CardDescription>
            Generate Punnett squares for monohybrid and dihybrid genetic crosses with our free calculator. Calculate genotype and phenotype ratios and probabilities instantly. Perfect for biology students, genetics courses, and science teachers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Cross Type</Label>
              <Select value={crossType} onValueChange={(v) => setCrossType(v as typeof crossType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monohybrid">Monohybrid (1 trait)</SelectItem>
                  <SelectItem value="dihybrid">Dihybrid (2 traits)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Parent 1 Genotype</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Allele 1</Label>
                  <Input value={parent1Allele1} onChange={(e) => setParent1Allele1(e.target.value)} className="w-16" />
                </div>
                <div>
                  <Label>Allele 2</Label>
                  <Input value={parent1Allele2} onChange={(e) => setParent1Allele2(e.target.value)} className="w-16" />
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Parent 2 Genotype</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Allele 1</Label>
                  <Input value={parent2Allele1} onChange={(e) => setParent2Allele1(e.target.value)} className="w-16" />
                </div>
                <div>
                  <Label>Allele 2</Label>
                  <Input value={parent2Allele2} onChange={(e) => setParent2Allele2(e.target.value)} className="w-16" />
                </div>
              </div>
            </div>

            {crossType === "dihybrid" && (
              <>
                <div>
                  <Label>Parent 1 Second Gene (e.g., Bb)</Label>
                  <Input value={parent1Gene2} onChange={(e) => setParent1Gene2(e.target.value)} className="w-24" />
                </div>
                <div>
                  <Label>Parent 2 Second Gene (e.g., Bb)</Label>
                  <Input value={parent2Gene2} onChange={(e) => setParent2Gene2(e.target.value)} className="w-24" />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Generate Punnett Square</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && crossType === "monohybrid" && (
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-2">Punnett Square</h4>
                <div className="grid grid-cols-3 gap-2 w-fit">
                  <div></div>
                  <div className="p-2 bg-primary text-primary-foreground text-center font-bold">{parent2Allele1}</div>
                  <div className="p-2 bg-primary text-primary-foreground text-center font-bold">{parent2Allele2}</div>
                  <div className="p-2 bg-primary text-primary-foreground text-center font-bold">{parent1Allele1}</div>
                  <div className="p-2 bg-background border text-center">{result.punnett[0][0]}</div>
                  <div className="p-2 bg-background border text-center">{result.punnett[0][1]}</div>
                  <div className="p-2 bg-primary text-primary-foreground text-center font-bold">{parent1Allele2}</div>
                  <div className="p-2 bg-background border text-center">{result.punnett[1][0]}</div>
                  <div className="p-2 bg-background border text-center">{result.punnett[1][1]}</div>
                </div>
              </div>
            )}

            {result && result.probabilities && (
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-2">Genotype Probabilities</h4>
                <div className="space-y-2">
                  {result.probabilities.map((p: any, i: number) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="font-mono">{p.genotype}</span>
                      <span className="font-bold">{p.probability}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Punnett Squares</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>A Punnett square predicts the probability of offspring genotypes from a genetic cross. You place parent alleles on the top and side, then fill in the boxes with possible combinations.</p>

          <h3 className="text-xl font-semibold">Key Terms</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Allele:</strong> Different forms of a gene (e.g., A or a)</li>
            <li><strong>Genotype:</strong> Genetic makeup (e.g., AA, Aa, aa)</li>
            <li><strong>Phenotype:</strong> Physical trait expressed</li>
            <li><strong>Dominant:</strong> Allele that masks the recessive (capital letter)</li>
            <li><strong>Recessive:</strong> Allele only expressed when homozygous (lowercase)</li>
            <li><strong>Homozygous:</strong> Two identical alleles (AA or aa)</li>
            <li><strong>Heterozygous:</strong> Two different alleles (Aa)</li>
          </ul>

          <h3 className="text-xl font-semibold">Monohybrid Cross Example</h3>
          <p>Cross: Aa × Aa (both parents heterozygous)</p>
          <p>Expected ratio: 1 AA : 2 Aa : 1 aa (25% : 50% : 25%)</p>
          <p>Phenotype ratio (if A is dominant): 3 dominant : 1 recessive (75% : 25%)</p>

          <h3 className="text-xl font-semibold">Dihybrid Cross Example</h3>
          <p>Cross: AaBb × AaBb</p>
          <p>Classic phenotype ratio: 9:3:3:1</p>
          <ul className="list-disc list-inside space-y-1">
            <li>9/16 show both dominant traits</li>
            <li>3/16 show first dominant, second recessive</li>
            <li>3/16 show first recessive, second dominant</li>
            <li>1/16 show both recessive traits</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Genotype Distribution</CardTitle>
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
              <p className="text-muted-foreground">Enter values and calculate to see the chart</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Genetic Crosses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Cross</th>
                  <th className="p-2 text-left">Genotype Ratio</th>
                  <th className="p-2 text-left">Phenotype Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">AA × aa</td>
                  <td className="p-2">100% Aa</td>
                  <td className="p-2">100% dominant</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Aa × aa</td>
                  <td className="p-2">1 Aa : 1 aa</td>
                  <td className="p-2">1 dominant : 1 recessive</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Aa × Aa</td>
                  <td className="p-2">1 AA : 2 Aa : 1 aa</td>
                  <td className="p-2">3 dominant : 1 recessive</td>
                </tr>
                <tr>
                  <td className="p-2">AA × Aa</td>
                  <td className="p-2">1 AA : 1 Aa</td>
                  <td className="p-2">100% dominant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
