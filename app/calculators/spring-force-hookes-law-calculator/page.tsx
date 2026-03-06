"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SpringForceCalculator() {
  const [mode, setMode] = useState<"force" | "constant" | "displacement">("force");
  const [k, setK] = useState<string>("");
  const [x, setX] = useState<string>("");
  const [F, setF] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    switch (mode) {
      case "force":
        const k1 = parseFloat(k);
        const x1 = parseFloat(x);
        if (k1 > 0 && x1 > 0) {
          const force = k1 * x1;
          const PE = 0.5 * k1 * x1 * x1;
          setResults({ value: force, unit: "N", PE });
        }
        break;
      case "constant":
        const F1 = parseFloat(F);
        const x2 = parseFloat(x);
        if (F1 > 0 && x2 > 0) {
          const k2 = F1 / x2;
          const PE = 0.5 * F1 * x2;
          setResults({ value: k2, unit: "N/m", PE });
        }
        break;
      case "displacement":
        const F2 = parseFloat(F);
        const k3 = parseFloat(k);
        if (F2 > 0 && k3 > 0) {
          const x3 = F2 / k3;
          const PE = 0.5 * k3 * x3 * x3;
          setResults({ value: x3, unit: "m", PE });
        }
        break;
    }
  };

  const reset = () => {
    setK("");
    setX("");
    setF("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="force">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="force" onClick={() => setMode("force")}>Find Force</TabsTrigger>
                <TabsTrigger value="constant" onClick={() => setMode("constant")}>Find k</TabsTrigger>
                <TabsTrigger value="displacement" onClick={() => setMode("displacement")}>Find x</TabsTrigger>
              </TabsList>

              <TabsContent value="force" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">F = kx</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Spring Constant k (N/m)</Label>
                    <Input type="number" value={k} onChange={(e) => setK(e.target.value)} />
                  </div>
                  <div>
                    <Label>Displacement x (m)</Label>
                    <Input type="number" value={x} onChange={(e) => setX(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculate}>Calculate Force</Button>
              </TabsContent>

              <TabsContent value="constant" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">k = F / x</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Force F (N)</Label>
                    <Input type="number" value={F} onChange={(e) => setF(e.target.value)} />
                  </div>
                  <div>
                    <Label>Displacement x (m)</Label>
                    <Input type="number" value={x} onChange={(e) => setX(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculate}>Calculate k</Button>
              </TabsContent>

              <TabsContent value="displacement" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">x = F / k</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Force F (N)</Label>
                    <Input type="number" value={F} onChange={(e) => setF(e.target.value)} />
                  </div>
                  <div>
                    <Label>Spring Constant k (N/m)</Label>
                    <Input type="number" value={k} onChange={(e) => setK(e.target.value)} />
                  </div>
                </div>
                <Button onClick={calculate}>Calculate Displacement</Button>
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={reset} className="w-full">Reset</Button>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {mode === "force" ? "Force" : mode === "constant" ? "Spring Constant" : "Displacement"}
                  </p>
                  <p className="text-4xl font-bold">{typeof results.value === 'number' ? Math.round(results.value * 1000) / 1000 : results.value} {results.unit}</p>
                </div>
                {results.PE !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Elastic Potential Energy</p>
                    <p className="text-2xl font-bold">{Math.round(results.PE * 1000) / 1000} J</p>
                    <p className="text-xs text-muted-foreground">PE = ½kx²</p>
                  </div>
                )}
              </div>
            )}

            {/* How It Works Section */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-4">How Hooke&apos;s Law Works</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">1</div>
                  <h5 className="font-medium text-sm mb-1">Choose Unknown</h5>
                  <p className="text-xs text-muted-foreground">Select what to calculate: force, spring constant, or displacement.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">2</div>
                  <h5 className="font-medium text-sm mb-1">Enter Known Values</h5>
                  <p className="text-xs text-muted-foreground">Input the two known variables from F, k, and x.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">3</div>
                  <h5 className="font-medium text-sm mb-1">Get Results</h5>
                  <p className="text-xs text-muted-foreground">See the calculated value plus elastic potential energy.</p>
                </div>
              </div>
            </div>

            {/* Formula Section */}
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Hooke&apos;s Law Formulas</h4>
              <p className="font-mono text-sm mb-1">F = kx (Force = Spring Constant × Displacement)</p>
              <p className="font-mono text-sm mb-1">k = F/x (Spring Constant)</p>
              <p className="font-mono text-sm mb-1">x = F/k (Displacement)</p>
              <p className="font-mono text-sm mt-2">PE = ½kx² (Elastic Potential Energy)</p>
            </div>

            {/* Applications Section */}
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Real-World Applications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted rounded">🚗 Vehicle suspension systems</div>
                <div className="p-2 bg-muted rounded">⏰ Mechanical watches</div>
                <div className="p-2 bg-muted rounded">🖊️ Retractable pens</div>
                <div className="p-2 bg-muted rounded">🏋️ Gym equipment</div>
                <div className="p-2 bg-muted rounded">🚪 Door closers</div>
                <div className="p-2 bg-muted rounded">📏 Force measurement devices</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
