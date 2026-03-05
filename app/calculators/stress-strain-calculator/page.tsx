"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";

export default function StressStrainCalculator() {
  const [mode, setMode] = useState<"stress" | "strain" | "young">("stress");
  const [force, setForce] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [originalLength, setOriginalLength] = useState<string>("");
  const [changeInLength, setChangeInLength] = useState<string>("");
  const [youngsModulus, setYoungsModulus] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [stressStrainData, setStressStrainData] = useState<any[]>([]);
  const [materialProperties, setMaterialProperties] = useState<any>(null);

  const calculate = () => {
    const F = parseFloat(force);
    const A = parseFloat(area);
    const L0 = parseFloat(originalLength);
    const ΔL = parseFloat(changeInLength);
    const E = parseFloat(youngsModulus);

    switch (mode) {
      case "stress":
        if (F > 0 && A > 0) {
          const stress = F / A;
          setResults({ value: stress, unit: "Pa", label: "Stress (σ)" });
          generateStressStrainCurve(stress, 0.002);
        }
        break;
      case "strain":
        if (L0 > 0 && ΔL > 0) {
          const strain = ΔL / L0;
          setResults({ value: strain, unit: "", label: "Strain (ε)" });
        }
        break;
      case "young":
        if (F > 0 && A > 0 && L0 > 0 && ΔL > 0) {
          const stress = F / A;
          const strain = ΔL / L0;
          const calculatedE = stress / strain;
          setResults({ value: calculatedE, unit: "Pa", label: "Young's Modulus (E)" });
          generateStressStrainCurve(stress, strain);
        }
        break;
    }
  };

  const generateStressStrainCurve = (maxStress: number, maxStrain: number) => {
    const data = [];
    const points = 20;
    for (let i = 0; i <= points; i++) {
      const strain = (maxStrain / points) * i;
      const stress = maxStress * (strain / maxStrain);
      data.push({
        strain: strain.toFixed(4),
        stress: Math.round(stress),
      });
    }
    setStressStrainData(data);
  };

  const reset = () => {
    setForce(""); setArea(""); setOriginalLength(""); setChangeInLength(""); setYoungsModulus("");
    setResults(null);
    setStressStrainData([]);
    setMaterialProperties(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Stress/Strain Calculator – Mechanical Properties Calculator</CardTitle>
          <CardDescription>
            Calculate stress, strain, and Young's modulus for materials. Our calculator helps analyze mechanical properties for engineering and physics applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="stress">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="stress" onClick={() => setMode("stress")}>Stress</TabsTrigger>
                <TabsTrigger value="strain" onClick={() => setMode("strain")}>Strain</TabsTrigger>
                <TabsTrigger value="young" onClick={() => setMode("young")}>Young's E</TabsTrigger>
              </TabsList>

              <TabsContent value="stress" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">σ = F / A</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Force (N)</Label><Input value={force} onChange={e => setForce(e.target.value)} /></div>
                  <div><Label>Cross-sectional Area (m²)</Label><Input value={area} onChange={e => setArea(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate Stress</Button>
              </TabsContent>

              <TabsContent value="strain" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">ε = ΔL / L₀</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Original Length (m)</Label><Input value={originalLength} onChange={e => setOriginalLength(e.target.value)} /></div>
                  <div><Label>Change in Length (m)</Label><Input value={changeInLength} onChange={e => setChangeInLength(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate Strain</Button>
              </TabsContent>

              <TabsContent value="young" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">E = σ / ε = (F × L₀) / (A × ΔL)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Force (N)</Label><Input value={force} onChange={e => setForce(e.target.value)} /></div>
                  <div><Label>Area (m²)</Label><Input value={area} onChange={e => setArea(e.target.value)} /></div>
                  <div><Label>Original Length (m)</Label><Input value={originalLength} onChange={e => setOriginalLength(e.target.value)} /></div>
                  <div><Label>Change in Length (m)</Label><Input value={changeInLength} onChange={e => setChangeInLength(e.target.value)} /></div>
                </div>
                <Button onClick={calculate}>Calculate Young's Modulus</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{results.label}</p>
                <p className="text-4xl font-bold">
                  {typeof results.value === 'number' ? (results.value >= 1e9 ? (results.value / 1e9).toFixed(2) + ' G' : results.value >= 1e6 ? (results.value / 1e6).toFixed(2) + ' M' : Math.round(results.value * 100) / 100) : results.value} {results.unit}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {stressStrainData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Stress-Strain Curve (Elastic Region)</CardTitle>
            <CardDescription>
              Linear relationship showing Hooke's Law behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stressStrainData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strain" label={{ value: "Strain", position: "insideBottomRight" }} />
                <YAxis label={{ value: "Stress (Pa)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="stress" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Understanding Stress and Strain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Stress is force per unit area—how much load a material carries internally. Strain is the deformation—how much it stretches or compresses relative to its original size. They're related but different: stress causes strain.</p>
          
          <p>Young's modulus (E) is the stiffness of a material. It's the ratio of stress to strain in the elastic region. Steel has E ≈ 200 GPa—very stiff. Rubber has E ≈ 0.01-0.1 GPa—very flexible. The higher the modulus, the more force needed to deform the material.</p>

          <h3 className="text-xl font-semibold mt-6">Key Formulas</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-md">
              <p className="font-mono text-sm">σ = F / A</p>
              <p className="text-xs text-muted-foreground mt-2">Stress = Force ÷ Area</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="font-mono text-sm">ε = ΔL / L₀</p>
              <p className="text-xs text-muted-foreground mt-2">Strain = Change in Length ÷ Original Length</p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="font-mono text-sm">E = σ / ε</p>
              <p className="text-xs text-muted-foreground mt-2">Young's Modulus = Stress ÷ Strain</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4">Note: Strain is dimensionless (no units) since it's a ratio of lengths. Stress and Young's modulus are measured in Pascals (Pa) or commonly GPa for engineering materials.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Young's Modulus of Common Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Material</th>
                  <th className="p-3 text-left">Young's Modulus (GPa)</th>
                  <th className="p-3 text-left">Young's Modulus (psi × 10⁶)</th>
                  <th className="p-3 text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Diamond</td>
                  <td className="p-3">1,220</td>
                  <td className="p-3">177</td>
                  <td className="p-3">Ceramic</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Tungsten</td>
                  <td className="p-3">400-410</td>
                  <td className="p-3">58-59</td>
                  <td className="p-3">Metal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Steel (structural)</td>
                  <td className="p-3">200-210</td>
                  <td className="p-3">29-30</td>
                  <td className="p-3">Metal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Copper</td>
                  <td className="p-3">110-130</td>
                  <td className="p-3">16-19</td>
                  <td className="p-3">Metal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Aluminum</td>
                  <td className="p-3">68-70</td>
                  <td className="p-3">9.9-10.2</td>
                  <td className="p-3">Metal</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Glass</td>
                  <td className="p-3">50-90</td>
                  <td className="p-3">7.3-13</td>
                  <td className="p-3">Ceramic</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Concrete</td>
                  <td className="p-3">20-30</td>
                  <td className="p-3">2.9-4.4</td>
                  <td className="p-3">Composite</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Wood (along grain)</td>
                  <td className="p-3">10-15</td>
                  <td className="p-3">1.5-2.2</td>
                  <td className="p-3">Natural</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Nylon</td>
                  <td className="p-3">2-4</td>
                  <td className="p-3">0.29-0.58</td>
                  <td className="p-3">Polymer</td>
                </tr>
                <tr>
                  <td className="p-3">Rubber</td>
                  <td className="p-3">0.01-0.1</td>
                  <td className="p-3">0.0015-0.015</td>
                  <td className="p-3">Polymer</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Values are approximate and vary with alloy composition, heat treatment, and manufacturing process.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stress-Strain Behavior Explained</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The stress-strain curve tells you how a material behaves under load. Different materials have different curves, but most metals follow a similar pattern.</p>

          <div className="space-y-3">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Elastic Region (Hooke's Law)</h4>
              <p className="text-sm text-muted-foreground mt-1">Stress is proportional to strain. The material returns to its original shape when unloaded. The slope of this linear region is Young's modulus. This is where most engineering designs operate.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Yield Point</h4>
              <p className="text-sm text-muted-foreground mt-1">The transition from elastic to plastic deformation. Beyond this point, the material won't fully return to its original shape. Yield strength is a critical design parameter—engineers stay well below it.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Plastic Region</h4>
              <p className="text-sm text-muted-foreground mt-1">Permanent deformation occurs. The material work-hardens (gets stronger) as it deforms. Strain increases faster than stress. This is where metal forming processes like bending and stretching operate.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Ultimate Tensile Strength</h4>
              <p className="text-sm text-muted-foreground mt-1">The maximum stress the material can withstand. After this point, necking begins—a localized reduction in cross-section. Failure is imminent.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold">Fracture Point</h4>
              <p className="text-sm text-muted-foreground mt-1">The material breaks. Ductile materials show significant plastic deformation before fracture. Brittle materials fracture with little warning in the elastic region.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engineering Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Stress and strain calculations aren't academic exercises—they're fundamental to every engineered structure and machine around you.</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Structural Engineering</h4>
              <p className="text-sm text-muted-foreground mt-1">Beams, columns, and foundations must support loads without excessive deformation. Engineers calculate stress from expected loads and select materials with adequate strength and stiffness.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Machine Design</h4>
              <p className="text-sm text-muted-foreground mt-1">Shafts, gears, and fasteners experience cyclic loading. Stress analysis prevents fatigue failure. Safety factors account for uncertainties in loading and material properties.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Materials Testing</h4>
              <p className="text-sm text-muted-foreground mt-1">Tensile tests generate stress-strain curves to characterize new materials. Quality control verifies that production materials meet specifications.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Biomedical Engineering</h4>
              <p className="text-sm text-muted-foreground mt-1">Bone, tissue, and implants all have mechanical properties. Matching implant stiffness to bone prevents stress shielding and promotes healing.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">What's the difference between stress and pressure?</h4>
            <p className="text-sm text-muted-foreground mt-1">Both are force per unit area, but pressure is external (applied to a surface) while stress is internal (within a material). Pressure is always compressive; stress can be tensile, compressive, or shear.</p>
          </div>
          <div>
            <h4 className="font-semibold">Why is strain dimensionless?</h4>
            <p className="text-sm text-muted-foreground mt-1">Strain is the ratio of two lengths (change in length divided by original length), so the units cancel. It's often expressed as a decimal, percentage, or microstrain (με = strain × 10⁶).</p>
          </div>
          <div>
            <h4 className="font-semibold">What is a good safety factor?</h4>
            <p className="text-sm text-muted-foreground mt-1">Depends on the application. Buildings use 1.5-2.0 for dead loads. Aircraft use 1.25-1.5 to minimize weight. Pressure vessels use 3.5-4.0 because failure is catastrophic. Higher safety factors mean more material and cost.</p>
          </div>
          <div>
            <h4 className="font-semibold">How do you convert between GPa and psi?</h4>
            <p className="text-sm text-muted-foreground mt-1">1 GPa = 145,038 psi. For quick estimates: 1 GPa ≈ 145,000 psi or 1 psi ≈ 0.00689 GPa. Steel at 200 GPa is about 29 million psi (29 × 10⁶ psi).</p>
          </div>
          <div>
            <h4 className="font-semibold">What causes materials to fail?</h4>
            <p className="text-sm text-muted-foreground mt-1">Exceeding ultimate strength causes immediate failure. But materials also fail from fatigue (repeated loading below yield), creep (slow deformation under constant load at high temperature), and brittle fracture (sudden crack propagation).</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a href="/calculators/concrete-volume-calculator" className="text-primary hover:underline">
                Concrete Volume Calculator
              </a>{" "}
              — Calculate concrete needed for slabs, beams, and columns
            </li>
            <li>
              <a href="/calculators/steel-weight-calculator" className="text-primary hover:underline">
                Steel Weight Calculator
              </a>{" "}
              — Calculate weight of steel beams, plates, and structural sections
            </li>
            <li>
              <a href="/calculators/ohms-law-calculator" className="text-primary hover:underline">
                Ohm's Law Calculator
              </a>{" "}
              — Calculate voltage, current, resistance, and power for electrical circuits
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
