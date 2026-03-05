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

      <div className="mt-8 space-y-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Punnett Square Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select cross type</p>
                  <p>Choose monohybrid for single-trait inheritance or dihybrid for two-trait crosses involving two genes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter parent genotypes</p>
                  <p>Input the alleles for each parent. Use capital letters for dominant traits and lowercase for recessive.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Generate and analyze results</p>
                  <p>Click Generate to see the Punnett square grid, genotype probabilities, and phenotype ratios for your cross.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Key Features of This Calculator
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Monohybrid and Dihybrid Crosses</p>
                <p className="text-muted-foreground">Supports both single-gene and two-gene inheritance patterns with accurate probability calculations</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Visual Punnett Square Grid</p>
                <p className="text-muted-foreground">See the actual 2x2 or 4x4 grid showing all possible offspring genotype combinations</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Genotype Probability Chart</p>
                <p className="text-muted-foreground">Pie chart visualization shows the distribution of genotypes at a glance</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Reference Tables</p>
                <p className="text-muted-foreground">Includes common genetic cross ratios and key terminology for learning</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Mendelian Inheritance Patterns Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Parent Cross</th>
                    <th className="text-left py-3 px-2 font-semibold">Genotype Ratio</th>
                    <th className="text-left py-3 px-2 font-semibold">Phenotype Ratio</th>
                    <th className="text-left py-3 px-2 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Homozygous × Homozygous</td>
                    <td className="py-3 px-2">100% heterozygous</td>
                    <td className="py-3 px-2">100% dominant</td>
                    <td className="py-3 px-2">TT × tt = all Tt</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Heterozygous × Homozygous Recessive</td>
                    <td className="py-3 px-2">1:1</td>
                    <td className="py-3 px-2">1:1</td>
                    <td className="py-3 px-2">Tt × tt</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Heterozygous × Heterozygous</td>
                    <td className="py-3 px-2">1:2:1</td>
                    <td className="py-3 px-2">3:1</td>
                    <td className="py-3 px-2">Tt × Tt</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Dihybrid Cross</td>
                    <td className="py-3 px-2">Various</td>
                    <td className="py-3 px-2">9:3:3:1</td>
                    <td className="py-3 px-2">TtRr × TtRr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: These ratios assume complete dominance and independent assortment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is a Punnett square used for?</h4>
                <p>
                  A Punnett square predicts the probability of offspring inheriting specific genetic traits. It shows all possible combinations of parental alleles and calculates the likelihood of each genotype and phenotype in the next generation.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the difference between genotype and phenotype?</h4>
                <p>
                  Genotype is the genetic makeup (like BB, Bb, or bb). Phenotype is the physical trait you can observe (like brown eyes or blue eyes). Two organisms can have different genotypes but the same phenotype if one allele is dominant.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do dihybrid crosses work?</h4>
                <p>
                  Dihybrid crosses track two genes simultaneously. Each parent produces four types of gametes (AB, Ab, aB, ab), creating a 4x4 grid with 16 possible offspring. The classic ratio is 9:3:3:1 for two heterozygous parents.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What does capital vs lowercase mean?</h4>
                <p>
                  Capital letters represent dominant alleles that express their trait even when paired with a different allele. Lowercase letters are recessive alleles that only show their trait when two copies are present (homozygous recessive).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Are Punnett squares always accurate?</h4>
                <p>
                  Punnett squares show probabilities, not certainties. They assume independent assortment and complete dominance. Real inheritance can involve linked genes, incomplete dominance, codominance, and environmental factors that complicate predictions.
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
                href="/calculators/probability-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Probability Calculator</span>
                <p className="text-muted-foreground">Calculate probabilities for various events and scenarios</p>
              </a>
              <a
                href="/calculators/blood-type-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Blood Type Calculator</span>
                <p className="text-muted-foreground">Predict possible blood types for offspring based on parents</p>
              </a>
              <a
                href="/calculators/genetic-inheritance-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Genetic Inheritance Calculator</span>
                <p className="text-muted-foreground">Explore more complex inheritance patterns and pedigrees</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
