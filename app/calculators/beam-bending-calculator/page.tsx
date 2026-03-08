"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BeamBendingCalculator() {
  const [supportType, setSupportType] = useState<"simply" | "cantilever">("simply");
  const [loadType, setLoadType] = useState<"point" | "distributed">("point");
  const [length, setLength] = useState<string>("");
  const [load, setLoad] = useState<string>("");
  const [loadPosition, setLoadPosition] = useState<string>("");
  const [E, setE] = useState<string>("");
  const [I, setI] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const P = parseFloat(load);
    const a = parseFloat(loadPosition) || L / 2;
    const EVal = parseFloat(E);
    const IVal = parseFloat(I);

    if (L > 0 && P > 0 && EVal > 0 && IVal > 0) {
      let maxMoment = 0;
      let maxDeflection = 0;

      if (supportType === "simply" && loadType === "point") {
        maxMoment = (P * a * (L - a)) / L;
        maxDeflection = (P * a * (L - a) * Math.sqrt(L * L - a * a)) / (9 * Math.sqrt(3) * EVal * IVal * L);
      } else if (supportType === "simply" && loadType === "distributed") {
        const w = P / L; // P is total load
        maxMoment = (w * L * L) / 8;
        maxDeflection = (5 * w * Math.pow(L, 4)) / (384 * EVal * IVal);
      } else if (supportType === "cantilever" && loadType === "point") {
        maxMoment = P * a;
        maxDeflection = (P * Math.pow(a, 3)) / (3 * EVal * IVal);
      } else {
        const w = P / L;
        maxMoment = (w * L * L) / 2;
        maxDeflection = (w * Math.pow(L, 4)) / (8 * EVal * IVal);
      }

      setResults({
        moment: maxMoment,
        deflection: maxDeflection,
      });
    }
  };

  const reset = () => {
    setLength(""); setLoad(""); setLoadPosition(""); setE(""); setI("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Support Type</Label>
                <Select value={supportType} onValueChange={(v) => setSupportType(v as typeof supportType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simply">Simply Supported</SelectItem>
                    <SelectItem value="cantilever">Cantilever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Load Type</Label>
                <Select value={loadType} onValueChange={(v) => setLoadType(v as typeof loadType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="point">Point Load</SelectItem>
                    <SelectItem value="distributed">Distributed Load</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Beam Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Total Load (N)</Label><Input value={load} onChange={e => setLoad(e.target.value)} /></div>
              <div><Label>Young's Modulus E (Pa)</Label><Input value={E} onChange={e => setE(e.target.value)} /></div>
              <div><Label>Moment of Inertia I (m⁴)</Label><Input value={I} onChange={e => setI(e.target.value)} /></div>
              {loadType === "point" && (
                <div><Label>Load Position from Left (m)</Label><Input value={loadPosition} onChange={e => setLoadPosition(e.target.value)} placeholder={length ? (parseFloat(length)/2).toString() : ""} /></div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Maximum Bending Moment</p>
                  <p className="text-3xl font-bold">{Math.round(results.moment * 100) / 100} N·m</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Maximum Deflection</p>
                  <p className="text-3xl font-bold">{results.deflection.toExponential(4)} m</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Beam Bending Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
            <div>
              <p className="font-medium text-foreground">Select support and load type</p>
              <p className="text-sm text-muted-foreground">Choose simply supported or cantilever beam. Select point load (single force) or distributed load (force spread across the beam).</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
            <div>
              <p className="font-medium text-foreground">Enter beam dimensions and load</p>
              <p className="text-sm text-muted-foreground">Input beam length in meters and total load in newtons. For point loads, specify the position from the left support.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
            <div>
              <p className="font-medium text-foreground">Enter material properties and calculate</p>
              <p className="text-sm text-muted-foreground">Input Young's modulus (E) and moment of inertia (I). Click Calculate to see maximum bending moment and deflection.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Young's Modulus for Common Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Material</th>
                  <th className="text-left py-3 px-2 font-semibold">Young's Modulus (GPa)</th>
                  <th className="text-left py-3 px-2 font-semibold">Young's Modulus (Pa)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2">Structural Steel (A36)</td>
                  <td className="py-3 px-2">200 GPa</td>
                  <td className="py-3 px-2 font-mono">200 × 10⁹ Pa</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Stainless Steel (304)</td>
                  <td className="py-3 px-2">193 GPa</td>
                  <td className="py-3 px-2 font-mono">193 × 10⁹ Pa</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Aluminum (6061-T6)</td>
                  <td className="py-3 px-2">69 GPa</td>
                  <td className="py-3 px-2 font-mono">69 × 10⁹ Pa</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Copper</td>
                  <td className="py-3 px-2">117 GPa</td>
                  <td className="py-3 px-2 font-mono">117 × 10⁹ Pa</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Titanium (Grade 5)</td>
                  <td className="py-3 px-2">114 GPa</td>
                  <td className="py-3 px-2 font-mono">114 × 10⁹ Pa</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Concrete</td>
                  <td className="py-3 px-2">25-30 GPa</td>
                  <td className="py-3 px-2 font-mono">25-30 × 10⁹ Pa</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">Wood (Douglas Fir)</td>
                  <td className="py-3 px-2">11-13 GPa</td>
                  <td className="py-3 px-2 font-mono">11-13 × 10⁹ Pa</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Values are approximate and vary with alloy, grade, and manufacturing process. Always use manufacturer specifications for critical applications.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Beam Bending</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">What Is Beam Bending?</h4>
            <p>
              When a beam carries a load, it bends. The top fibers compress while the bottom fibers stretch (for a simply supported beam). This creates internal stresses. Engineers calculate bending moment and deflection to ensure beams can safely support their loads without excessive deformation.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Bending Moment Explained</h4>
            <p>
              Bending moment measures the internal force that causes bending. It is calculated in newton-meters (N·m). The maximum moment occurs where the beam experiences the greatest bending stress. For a simply supported beam with a center point load, maximum moment equals (P × L) / 4.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Beam Deflection</h4>
            <p>
              Deflection is how much the beam bends under load, measured in meters or millimeters. Excessive deflection causes cracks in ceilings, sagging floors, and structural concerns. Building codes typically limit deflection to L/360 for floors and L/240 for roofs, where L is the span length.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Moment of Inertia (I)</h4>
            <p>
              The moment of inertia describes a beam's resistance to bending based on its cross-sectional shape. A tall, narrow beam resists bending better than a short, wide beam of the same area. For a rectangle, I = (b × h³) / 12, where b is width and h is height.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Beam Formulas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-2">Simply Supported Beam, Center Point Load</p>
            <p className="font-mono text-xs">Max Moment: M = (P × L) / 4</p>
            <p className="font-mono text-xs">Max Deflection: δ = (P × L³) / (48 × E × I)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-2">Simply Supported Beam, Distributed Load</p>
            <p className="font-mono text-xs">Max Moment: M = (w × L²) / 8</p>
            <p className="font-mono text-xs">Max Deflection: δ = (5 × w × L⁴) / (384 × E × I)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-2">Cantilever Beam, End Point Load</p>
            <p className="font-mono text-xs">Max Moment: M = P × L</p>
            <p className="font-mono text-xs">Max Deflection: δ = (P × L³) / (3 × E × I)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-2">Cantilever Beam, Distributed Load</p>
            <p className="font-mono text-xs">Max Moment: M = (w × L²) / 2</p>
            <p className="font-mono text-xs">Max Deflection: δ = (w × L⁴) / (8 × E × I)</p>
          </div>
          <p className="text-xs mt-2">Where: P = point load, w = distributed load per unit length, L = beam length, E = Young's modulus, I = moment of inertia</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Beam Design</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Check both stress and deflection</p>
              <p>A beam might be strong enough but still deflect too much. Always verify both bending stress is within limits and deflection meets code requirements.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Apply safety factors</p>
              <p>Real-world loads have uncertainties. Building codes specify load combinations and safety factors. Never design to the theoretical limit — always include a margin of safety.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Consider beam orientation</p>
              <p>A 2×10 joist is much stronger on edge than flat. The moment of inertia changes dramatically with orientation. Always install beams with the strong axis resisting the load.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">What is Young's modulus?</h4>
            <p>
              Young's modulus (E) measures material stiffness. It describes how much a material stretches under tension. Steel has E ≈ 200 GPa, aluminum ≈ 70 GPa. Higher E means less deflection for the same load.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">How do I calculate moment of inertia for a rectangular beam?</h4>
            <p>
              For a rectangle: I = (b × h³) / 12, where b is the width (base) and h is the height. The height is cubed, so increasing beam depth has a much bigger effect than increasing width.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">What is an acceptable deflection limit?</h4>
            <p>
              Building codes specify limits based on application. Floors: L/360 (span divided by 360). Roofs: L/240. For a 10-foot (120 inch) floor span, maximum deflection is 120/360 = 0.33 inches.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">What's the difference between simply supported and cantilever beams?</h4>
            <p>
              Simply supported beams rest on supports at both ends (like a bridge). Cantilever beams are fixed at one end and free at the other (like a diving board). Cantilevers experience higher moments and deflections.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Can I use this calculator for wood beams?</h4>
            <p>
              Yes, but wood is anisotropic — properties vary with grain direction. Use appropriate E values for the wood species and grade. Also check shear stress, which can govern for short, deep wood beams.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
