"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InverseTrigCalculator() {
  const [value, setValue] = useState<string>("");
  const [selectedFunction, setSelectedFunction] = useState<"arcsin" | "arccos" | "arctan">("arcsin");
  const [outputUnit, setOutputUnit] = useState<"degrees" | "radians">("degrees");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    const val = parseFloat(value);

    if (isNaN(val)) {
      setError("Please enter a valid number");
      return;
    }

    setError("");

    let angleRad: number;
    let angleDeg: number;
    let domainInfo = "";

    if (selectedFunction === "arcsin") {
      if (val < -1 || val > 1) {
        setError("arcsin is only defined for values between -1 and 1");
        return;
      }
      angleRad = Math.asin(val);
      angleDeg = toDeg(angleRad);
      domainInfo = "Domain: [-1, 1], Range: [-90°, 90°] or [-π/2, π/2]";
    } else if (selectedFunction === "arccos") {
      if (val < -1 || val > 1) {
        setError("arccos is only defined for values between -1 and 1");
        return;
      }
      angleRad = Math.acos(val);
      angleDeg = toDeg(angleRad);
      domainInfo = "Domain: [-1, 1], Range: [0°, 180°] or [0, π]";
    } else {
      angleRad = Math.atan(val);
      angleDeg = toDeg(angleRad);
      domainInfo = "Domain: all real numbers, Range: (-90°, 90°) or (-π/2, π/2)";
    }

    const outputValue = outputUnit === "degrees" ? angleDeg : angleRad;
    const outputSymbol = outputUnit === "degrees" ? "°" : " rad";

    const getExactValue = (): string => {
      const commonValues: Record<string, Record<string, string>> = {
        "arcsin": {
          "-1": "-90° (-π/2)",
          "-0.866": "-60° (-π/3)",
          "-0.707": "-45° (-π/4)",
          "-0.5": "-30° (-π/6)",
          "0": "0° (0)",
          "0.5": "30° (π/6)",
          "0.707": "45° (π/4)",
          "0.866": "60° (π/3)",
          "1": "90° (π/2)"
        },
        "arccos": {
          "-1": "180° (π)",
          "-0.866": "150° (5π/6)",
          "-0.707": "135° (3π/4)",
          "-0.5": "120° (2π/3)",
          "0": "90° (π/2)",
          "0.5": "60° (π/3)",
          "0.707": "45° (π/4)",
          "0.866": "30° (π/6)",
          "1": "0° (0)"
        },
        "arctan": {
          "-1.732": "-60° (-π/3)",
          "-1": "-45° (-π/4)",
          "-0.577": "-30° (-π/6)",
          "0": "0° (0)",
          "0.577": "30° (π/6)",
          "1": "45° (π/4)",
          "1.732": "60° (π/3)"
        }
      };

      const funcValues = commonValues[selectedFunction];
      const roundedVal = val.toFixed(3);

      for (const [key, exact] of Object.entries(funcValues)) {
        if (Math.abs(val - parseFloat(key)) < 0.001) {
          return exact;
        }
      }
      return "No simple exact form";
    };

    setResult({
      input: val,
      function: selectedFunction,
      angleRad,
      angleDeg,
      outputValue: outputValue.toFixed(4),
      outputUnit,
      outputSymbol,
      domainInfo,
      exactValue: getExactValue(),
      steps: [
        `Given: ${selectedFunction}(${val})`,
        ``,
        `Find the angle whose ${selectedFunction.replace("arc", "")} equals ${val}:`,
        `  ${selectedFunction.replace("arc", "")}(θ) = ${val}`,
        `  θ = ${selectedFunction}(${val})`,
        ``,
        `Calculate:`,
        `  θ = ${angleRad.toFixed(6)} radians`,
        `  θ = ${angleDeg.toFixed(4)}°`,
        ``,
        `In ${outputUnit}:`,
        `  θ = ${outputValue.toFixed(4)}${outputSymbol}`,
        ``,
        `Domain and Range:`,
        `  ${domainInfo}`
      ]
    });
  };

  const reset = () => {
    setValue("");
    setResult(null);
    setError("");
  };

  const loadExample = (fn: "arcsin" | "arccos" | "arctan", val: string, unit: "degrees" | "radians") => {
    setSelectedFunction(fn);
    setValue(val);
    setOutputUnit(unit);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Inverse Trig Calculator – Find arcsin arccos arctan Online</h1>
        <p className="text-muted-foreground">
          Calculate inverse trigonometric functions including arcsin, arccos, and arctan with our free online inverse trig calculator. Get angle results in both degrees and radians.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Value (x)</Label>
            <Input
              type="number"
              step="0.001"
              placeholder="e.g., 0.5"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <Label>Function</Label>
            <Select value={selectedFunction} onValueChange={(v) => setSelectedFunction(v as typeof selectedFunction)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arcsin">arcsin (sin⁻¹)</SelectItem>
                <SelectItem value="arccos">arccos (cos⁻¹)</SelectItem>
                <SelectItem value="arctan">arctan (tan⁻¹)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Output Unit</Label>
            <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as typeof outputUnit)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="degrees">Degrees (°)</SelectItem>
                <SelectItem value="radians">Radians (rad)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("arcsin", "0.5", "degrees")}>arcsin(0.5)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("arccos", "0.707", "degrees")}>arccos(√2/2)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("arctan", "1", "degrees")}>arctan(1)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("arcsin", "-1", "radians")}>arcsin(-1)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("arctan", "1.732", "degrees")}>arctan(√3)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("arccos", "0", "degrees")}>arccos(0)</Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Result ({outputUnit})</p>
                <p className="text-4xl font-bold">{result.outputValue}{result.outputSymbol}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Alternative Unit</p>
                <p className="text-2xl font-mono">
                  {outputUnit === "degrees" ? result.angleRad.toFixed(4) + " rad" : result.angleDeg.toFixed(2) + "°"}
                </p>
                <p className="text-xs text-muted-foreground mt-2">{result.domainInfo}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Exact Value</p>
              <p className="text-lg font-mono">{result.exactValue}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 text-sm font-mono">
                {result.steps.map((step: string, i: number) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                {selectedFunction === "arcsin" && `arcsin(${value}) = ${result.outputValue}${result.outputSymbol} means that sin(${result.outputValue}${result.outputSymbol}) = ${value}. The angle ${result.outputValue}${result.outputSymbol} is in the range [-90°, 90°].`}
                {selectedFunction === "arccos" && `arccos(${value}) = ${result.outputValue}${result.outputSymbol} means that cos(${result.outputValue}${result.outputSymbol}) = ${value}. The angle ${result.outputValue}${result.outputSymbol} is in the range [0°, 180°].`}
                {selectedFunction === "arctan" && `arctan(${value}) = ${result.outputValue}${result.outputSymbol} means that tan(${result.outputValue}${result.outputSymbol}) = ${value}. The angle ${result.outputValue}${result.outputSymbol} is in the range (-90°, 90°).`}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Inverse Trigonometric Functions</h2>
        <p className="text-muted-foreground">
          Inverse trig functions answer the question: "What angle gives me this trig value?" If sin(30°) = 0.5, then arcsin(0.5) = 30°. They undo what the regular trig functions do.
        </p>
        <p className="text-muted-foreground">
          There's a catch though. Sine, cosine, and tangent repeat their values, so there are infinitely many angles with the same trig value. To make the inverses proper functions, we restrict their ranges. Arcsin only returns angles between -90° and 90°. Arccos only returns angles between 0° and 180°. Arctan only returns angles between -90° and 90°.
        </p>
        <p className="text-muted-foreground">
          You'll see inverse trig functions written two ways: arcsin(x) or sin⁻¹(x). Both mean the same thing. The ⁻¹ doesn't mean reciprocal – it means inverse function.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Domain and Range</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">arcsin(x)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="font-mono text-xs">[-1, 1]</span>
              </div>
              <div className="flex justify-between">
                <span>Range:</span>
                <span className="font-mono text-xs">[-π/2, π/2]</span>
              </div>
              <div className="flex justify-between">
                <span>Range (deg):</span>
                <span className="font-mono text-xs">[-90°, 90°]</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Only accepts values from -1 to 1. Returns angles in quadrants I and IV.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">arccos(x)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="font-mono text-xs">[-1, 1]</span>
              </div>
              <div className="flex justify-between">
                <span>Range:</span>
                <span className="font-mono text-xs">[0, π]</span>
              </div>
              <div className="flex justify-between">
                <span>Range (deg):</span>
                <span className="font-mono text-xs">[0°, 180°]</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Only accepts values from -1 to 1. Returns angles in quadrants I and II.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">arctan(x)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="font-mono text-xs">(-∞, ∞)</span>
              </div>
              <div className="flex justify-between">
                <span>Range:</span>
                <span className="font-mono text-xs">(-π/2, π/2)</span>
              </div>
              <div className="flex justify-between">
                <span>Range (deg):</span>
                <span className="font-mono text-xs">(-90°, 90°)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Accepts any real number. Returns angles in quadrants I and IV.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Inverse Trig Values</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">x</th>
                <th className="text-center p-2">arcsin(x)</th>
                <th className="text-center p-2">arccos(x)</th>
                <th className="text-center p-2">arctan(x)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { x: "-1", arcsin: "-90° (-π/2)", arccos: "180° (π)", arctan: "-45° (-π/4)" },
                { x: "-√3/2", arcsin: "-60° (-π/3)", arccos: "150° (5π/6)", arctan: "—" },
                { x: "-√2/2", arcsin: "-45° (-π/4)", arccos: "135° (3π/4)", arctan: "—" },
                { x: "-1/2", arcsin: "-30° (-π/6)", arccos: "120° (2π/3)", arctan: "—" },
                { x: "0", arcsin: "0° (0)", arccos: "90° (π/2)", arctan: "0° (0)" },
                { x: "1/2", arcsin: "30° (π/6)", arccos: "60° (π/3)", arctan: "—" },
                { x: "√2/2", arcsin: "45° (π/4)", arccos: "45° (π/4)", arctan: "—" },
                { x: "√3/2", arcsin: "60° (π/3)", arccos: "30° (π/6)", arctan: "—" },
                { x: "1", arcsin: "90° (π/2)", arccos: "0° (0)", arctan: "45° (π/4)" },
                { x: "√3", arcsin: "—", arccos: "—", arctan: "60° (π/3)" },
              ].map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2 font-mono">{row.x}</td>
                  <td className="text-center p-2 font-mono">{row.arcsin}</td>
                  <td className="text-center p-2 font-mono">{row.arccos}</td>
                  <td className="text-center p-2 font-mono">{row.arctan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-1">arcsin(0.5)</div>
            <div className="font-mono text-xs text-muted-foreground">
              What angle has sine = 0.5?<br />
              sin(30°) = 0.5<br />
              arcsin(0.5) = 30° = π/6 rad
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-1">arccos(-1)</div>
            <div className="font-mono text-xs text-muted-foreground">
              What angle has cosine = -1?<br />
              cos(180°) = -1<br />
              arccos(-1) = 180° = π rad
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-1">arctan(1)</div>
            <div className="font-mono text-xs text-muted-foreground">
              What angle has tangent = 1?<br />
              tan(45°) = 1<br />
              arctan(1) = 45° = π/4 rad
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-1">arcsin(-√3/2)</div>
            <div className="font-mono text-xs text-muted-foreground">
              What angle has sine = -√3/2?<br />
              sin(-60°) = -√3/2<br />
              arcsin(-√3/2) = -60° = -π/3 rad
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-1">arctan(√3)</div>
            <div className="font-mono text-xs text-muted-foreground">
              What angle has tangent = √3?<br />
              tan(60°) = √3<br />
              arctan(√3) = 60° = π/3 rad
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The notation sin⁻¹ for arcsin was introduced by John Herschel in 1813. He wanted a consistent notation for inverse functions. However, this causes confusion because sin²x means (sin x)², but sin⁻¹x doesn't mean 1/(sin x). Many mathematicians prefer "arcsin" to avoid this confusion.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between arcsin and 1/sin?</h4>
            <p className="text-xs text-muted-foreground">
              Completely different. arcsin(x) or sin⁻¹(x) is the inverse function – it gives you the angle. 1/sin(x) is the reciprocal, which is csc(x). The ⁻¹ in sin⁻¹ means "inverse function," not "reciprocal."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why can't I calculate arcsin(2)?</h4>
            <p className="text-xs text-muted-foreground">
              Sine only outputs values between -1 and 1. No angle has a sine of 2. So arcsin(2) doesn't exist. Same for arccos of anything outside [-1, 1]. Arctan, though, accepts any real number.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does arccos give different answers than arcsin for the same input?</h4>
            <p className="text-xs text-muted-foreground">
              They have different restricted ranges. arcsin(0.5) = 30° but arccos(0.5) = 60°. Both sin(30°) and cos(60°) equal 0.5, but each inverse function returns angles from its own specific range.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When would I use inverse trig functions?</h4>
            <p className="text-xs text-muted-foreground">
              Anytime you know a trig ratio and need the angle. Finding the angle of a ramp given its slope. Calculating the launch angle of a projectile. Determining the angle in a triangle when you know side ratios.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does sin⁻¹(x) mean?</h4>
            <p className="text-xs text-muted-foreground">
              sin⁻¹(x) means arcsin(x) – the inverse sine function. It's the angle whose sine is x. The notation is confusing because sin²(x) means (sin(x))², but sin⁻¹(x) doesn't mean 1/sin(x). It's just established notation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can inverse trig functions give negative angles?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. arcsin and arctan both return negative angles for negative inputs. arcsin(-0.5) = -30°. arctan(-1) = -45°. Arccos never returns negative angles – its range is [0°, 180°].
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
