"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function PcbTraceWidthCalculator() {
  const [current, setCurrent] = useState<string>("");
  const [copperWeight, setCopperWeight] = useState<string>("1");
  const [tempRise, setTempRise] = useState<string>("10");
  const [layer, setLayer] = useState<"external" | "internal">("external");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const I = parseFloat(current);
    const oz = parseFloat(copperWeight);
    const ΔT = parseFloat(tempRise);
    
    if (I > 0 && oz > 0 && ΔT > 0) {
      // IPC-2221 formula approximation
      const thickness = oz * 0.0348; // mm
      const k = layer === "external" ? 0.048 : 0.024;
      
      // Area in mil²
      const area = Math.pow(I / (k * Math.pow(ΔT, 0.44)), 1 / 0.725);
      
      // Width in mm (assuming area = width × thickness)
      const widthMils = area / 1.378; // Convert to width in mils
      const widthMm = widthMils * 0.0254;

      setResults({
        width: Math.round(widthMm * 100) / 100,
        widthMils: Math.round(widthMils * 10) / 10,
        thickness: thickness,
      });
    }
  };

  const reset = () => {
    setCurrent(""); setCopperWeight("1"); setTempRise("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Current (A)</Label><Input value={current} onChange={e => setCurrent(e.target.value)} /></div>
              <div>
                <Label>Copper Weight (oz/ft²)</Label>
                <Select value={copperWeight} onValueChange={(v) => setCopperWeight(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5 oz</SelectItem>
                    <SelectItem value="1">1 oz</SelectItem>
                    <SelectItem value="2">2 oz</SelectItem>
                    <SelectItem value="3">3 oz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Temp Rise (°C)</Label><Input value={tempRise} onChange={e => setTempRise(e.target.value)} /></div>
              <div>
                <Label>Layer Type</Label>
                <Select value={layer} onValueChange={(v) => setLayer(v as typeof layer)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="external">External Layer</SelectItem>
                    <SelectItem value="internal">Internal Layer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Width</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Trace Width</p>
                    <p className="text-2xl font-bold">{results.width} mm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Mils</p>
                    <p className="text-2xl font-bold">{results.widthMils} mil</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Copper Thickness</p>
                    <p className="text-xl font-bold">{results.thickness} mm</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This PCB Trace Width Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter the current</p>
                <p>Input the maximum current in Amperes that will flow through the trace.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Select copper weight and layer type</p>
                <p>Choose the copper thickness (oz/ft²) and whether the trace is on an external or internal layer.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Set temperature rise and calculate</p>
                <p>Enter the maximum acceptable temperature rise above ambient. Click Calculate to see the minimum trace width.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Copper Weight Reference Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Copper Weight</th>
                    <th className="text-left py-3 px-2 font-semibold">Thickness (mm)</th>
                    <th className="text-left py-3 px-2 font-semibold">Thickness (mils)</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Use</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">0.5 oz/ft²</td>
                    <td className="py-3 px-2">0.0175</td>
                    <td className="py-3 px-2">0.7</td>
                    <td className="py-3 px-2">Low-power signal traces</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 oz/ft²</td>
                    <td className="py-3 px-2">0.035</td>
                    <td className="py-3 px-2">1.4</td>
                    <td className="py-3 px-2">Standard PCBs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2 oz/ft²</td>
                    <td className="py-3 px-2">0.070</td>
                    <td className="py-3 px-2">2.8</td>
                    <td className="py-3 px-2">High current, power supplies</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">3 oz/ft²</td>
                    <td className="py-3 px-2">0.105</td>
                    <td className="py-3 px-2">4.2</td>
                    <td className="py-3 px-2">Heavy current applications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding PCB Trace Width</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Why Trace Width Matters</h4>
              <p>PCB traces have resistance. When current flows, they heat up. Too narrow a trace means too much resistance, leading to excessive heat that can damage the board or cause failure. The IPC-2221 standard provides guidelines for minimum trace widths based on current, copper thickness, and acceptable temperature rise.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">External vs Internal Layers</h4>
              <p>External layers dissipate heat better because they're exposed to air. Internal layers are sandwiched between substrate material, trapping heat. For the same current, internal traces need to be wider than external traces. This calculator accounts for that difference.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Temperature Rise Guidelines</h4>
              <p>A 10°C temperature rise is conservative and suitable for most applications. 20°C is common for commercial products. Higher rises may be acceptable in well-ventilated or short-duration applications. Consider your operating environment and reliability requirements.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>PCB Trace Design Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Use Wider When Possible</p>
                <p>The calculated width is a minimum. Wider traces reduce resistance and improve reliability at no extra cost.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Consider Voltage Drop</p>
                <p>Long traces have resistance that causes voltage drop. Check that the drop is acceptable for your application.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Use Multiple Layers</p>
                <p>For very high currents, use traces on multiple layers connected with vias to share the load.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Add Solder Mask Openings</p>
                <p>For high-current traces, expose copper and add solder to increase current capacity.</p>
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
    question: "What is the IPC-2221 standard?",
    answer: "IPC-2221 is a generic standard for printed board design. It includes formulas for calculating trace width based on current, copper thickness, and temperature rise. The formulas in this calculator are derived from IPC-2221 guidelines.",
  },
{
    question: "How do I convert between oz and mm for copper?",
    answer: "1 oz/ft² copper equals 0.035 mm (1.4 mils) thickness. This refers to the weight of copper per square foot, which correlates to thickness. Common values: 0.5 oz = 0.0175mm, 1 oz = 0.035mm, 2 oz = 0.070mm.",
  },
{
    question: "What temperature rise should I use?",
    answer: "10°C is conservative and works for most applications. 20°C is common for consumer electronics. Higher rises reduce trace width but increase heat. Consider your enclosure, airflow, and reliability requirements.",
  },
{
    question: "Why are internal traces wider than external?",
    answer: "Internal layers are surrounded by substrate material that insulates and traps heat. External layers can dissipate heat to air. For the same current and temperature rise, internal traces need about 2x the cross-sectional area.",
  },
{
    question: "Can I use this for high-frequency signals?",
    answer: "This calculator is for DC and low-frequency current capacity. High-frequency signals need impedance-controlled traces, which depend on trace geometry and dielectric properties. Use an impedance calculator for RF designs.",
  }
  ]} />
</section>
      </div>
    </div>
  );
}
