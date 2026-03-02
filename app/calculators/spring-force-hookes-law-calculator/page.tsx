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
        <CardHeader>
          <CardTitle>Hooke's Law Calculator – Spring Force and Displacement</CardTitle>
          <CardDescription>
            Solve spring mechanics problems with our Hooke's Law calculator. Find force, spring constant, or displacement using F = kx for physics and mechanical engineering.
          </CardDescription>
        </CardHeader>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
