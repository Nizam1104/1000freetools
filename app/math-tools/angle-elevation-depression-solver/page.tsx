"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AngleElevationDepressionSolver() {
  const [calcType, setCalcType] = useState<"find-angle" | "find-height" | "find-distance">("find-angle");
  const [height, setHeight] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const loadExample = (exampleNum?: number) => {
    const examples = [
      { type: "find-angle", height: "50", distance: "100", angle: "" },
      { type: "find-angle", height: "30", distance: "40", angle: "" },
      { type: "find-height", height: "", distance: "25", angle: "35" },
      { type: "find-height", height: "", distance: "100", angle: "60" },
      { type: "find-distance", height: "45", distance: "", angle: "30" },
      { type: "find-distance", height: "80", distance: "", angle: "50" },
    ];
    const example = examples[exampleNum !== undefined ? exampleNum % examples.length : 0];
    setCalcType(example.type as typeof calcType);
    setHeight(example.height);
    setDistance(example.distance);
    setAngle(example.angle);
    setResult(null);
    setError("");
  };

  const calculate = () => {
    setResult(null);
    setError("");

    if (calcType === "find-angle") {
      const h = parseFloat(height);
      const d = parseFloat(distance);
      if (isNaN(h) || isNaN(d) || h <= 0 || d <= 0) { setError("Enter positive values"); return; }
      const angleVal = toDeg(Math.atan(h/d));
      setResult({ angle: angleVal, steps: [`tan(θ) = height/distance = ${h}/${d}`, `θ = arctan(${(h/d).toFixed(4)})`, `θ = ${angleVal.toFixed(2)}°`] });
    } else if (calcType === "find-height") {
      const d = parseFloat(distance);
      const a = parseFloat(angle);
      if (isNaN(d) || isNaN(a) || d <= 0 || a <= 0 || a >= 90) { setError("Invalid values"); return; }
      const h = d * Math.tan(toRad(a));
      setResult({ height: h, steps: [`height = distance × tan(angle)`, `height = ${d} × tan(${a}°)`, `height = ${h.toFixed(4)}`] });
    } else {
      const h = parseFloat(height);
      const a = parseFloat(angle);
      if (isNaN(h) || isNaN(a) || h <= 0 || a <= 0 || a >= 90) { setError("Invalid values"); return; }
      const d = h / Math.tan(toRad(a));
      setResult({ distance: d, steps: [`distance = height / tan(angle)`, `distance = ${h} / tan(${a}°)`, `distance = ${d.toFixed(4)}`] });
    }
  };

  const reset = () => { setHeight(""); setDistance(""); setAngle(""); setResult(null); setError(""); };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Angle of Elevation & Depression Calculator – Solve Word Problems</h1>
        <p className="text-muted-foreground">
          Calculate the angle of elevation or depression with our free online solver. Enter height and distance to find the angle, or the angle to find missing dimensions – perfect for trig word problems.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Calculate</Label>
          <Select value={calcType} onValueChange={(v) => setCalcType(v as typeof calcType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="find-angle">Find Angle</SelectItem>
              <SelectItem value="find-height">Find Height</SelectItem>
              <SelectItem value="find-distance">Find Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {calcType === "find-angle" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Height (opposite)</Label><Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <div><Label>Distance (adjacent)</Label><Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
          </div>
        )}
        {calcType === "find-height" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Distance (adjacent)</Label><Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
            <div><Label>Angle (°)</Label><Input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} /></div>
          </div>
        )}
        {calcType === "find-distance" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Height (opposite)</Label><Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <div><Label>Angle (°)</Label><Input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} /></div>
          </div>
        )}

        {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}
        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Select onValueChange={(v) => loadExample(parseInt(v))}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Load Example" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Example 1: Find angle (50, 100)</SelectItem>
              <SelectItem value="1">Example 2: Find angle (30, 40)</SelectItem>
              <SelectItem value="2">Example 3: Find height (25m, 35°)</SelectItem>
              <SelectItem value="3">Example 4: Find height (100m, 60°)</SelectItem>
              <SelectItem value="4">Example 5: Find distance (45m, 30°)</SelectItem>
              <SelectItem value="5">Example 6: Find distance (80m, 50°)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              {result.angle && <><p className="text-sm text-muted-foreground">Angle</p><p className="text-4xl font-bold">{result.angle.toFixed(2)}°</p></>}
              {result.height && <><p className="text-sm text-muted-foreground">Height</p><p className="text-4xl font-bold">{result.height.toFixed(4)}</p></>}
              {result.distance && <><p className="text-sm text-muted-foreground">Distance</p><p className="text-4xl font-bold">{result.distance.toFixed(4)}</p></>}
            </div>
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-3">Solution</h4><div className="space-y-2 text-sm font-mono">{result.steps.map((s:string,i:number)=><div key={i}>{s}</div>)}</div></div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Elevation and Depression</h2>
        <p className="text-muted-foreground">
          Angle of elevation is the angle you look up from horizontal. Angle of depression is the angle you look down. Both use the same math – they're alternate interior angles formed by parallel horizontal lines.
        </p>
        <p className="text-muted-foreground">
          Picture this: you're standing on the ground looking at the top of a building. Your line of sight forms a right triangle with the ground. The angle between your line of sight and the flat ground is the angle of elevation. If you were on top of the building looking down, that would be the angle of depression – and it would equal the elevation angle from below.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Core Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-lg mb-2">tan(θ) = opposite/adjacent = height/distance</p>
          <p className="text-sm text-muted-foreground text-center">
            Rearrange based on what you need: θ = arctan(height/distance), height = distance × tan(θ), or distance = height/tan(θ)
          </p>
        </div>
        <p className="text-muted-foreground">
          This comes from SOH-CAH-TOA, the mnemonic for right triangle trigonometry. Tangent equals Opposite over Adjacent. In elevation/depression problems, the "opposite" side is the vertical height, and the "adjacent" side is the horizontal distance.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        
        <div className="space-y-6">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 1: Finding the angle of elevation</h4>
            <p className="text-sm text-muted-foreground mb-3">
              A flagpole is 50 feet tall. You're standing 100 feet away from its base. What's the angle of elevation to the top?
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>tan(θ) = height/distance = 50/100 = 0.5</p>
              <p>θ = arctan(0.5)</p>
              <p>θ ≈ 26.57°</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              You need to look up at about 27 degrees to see the top of the flagpole.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 2: Finding the height of a building</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You're 25 meters from a building. The angle of elevation to the top is 35°. How tall is the building?
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>height = distance × tan(angle)</p>
              <p>height = 25 × tan(35°)</p>
              <p>height = 25 × 0.7002</p>
              <p>height ≈ 17.51 meters</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              The building is approximately 17.5 meters tall (about 57 feet).
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 3: Finding distance using angle of depression</h4>
            <p className="text-sm text-muted-foreground mb-3">
              From a 45-meter cliff, you spot a boat at an angle of depression of 30°. How far is the boat from the base of the cliff?
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>distance = height / tan(angle)</p>
              <p>distance = 45 / tan(30°)</p>
              <p>distance = 45 / 0.5774</p>
              <p>distance ≈ 77.94 meters</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              The boat is about 78 meters from the base of the cliff.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Example 4: Steep angle calculation</h4>
            <p className="text-sm text-muted-foreground mb-3">
              A ladder reaches 80 feet up a wall. The ladder makes a 50° angle with the ground. How far is the base from the wall?
            </p>
            <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
              <p>distance = height / tan(angle)</p>
              <p>distance = 80 / tan(50°)</p>
              <p>distance = 80 / 1.1918</p>
              <p>distance ≈ 67.13 feet</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              The ladder's base is about 67 feet from the wall. That's a fairly shallow angle for a ladder – OSHA recommends about 75°!
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-5 bg-accent/10 rounded-lg">
          <p className="text-muted-foreground">
            The ancient Greek mathematician Thales of Miletus (around 600 BCE) reportedly calculated the height of the Great Pyramid by measuring its shadow and comparing it to the shadow of a stick of known height. He was using similar triangles – the same principle behind angle of elevation calculations. This is one of the earliest recorded applications of trigonometry.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">When to Use Each Trigonometric Function</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Use Tangent (tan)</h4>
            <p className="text-sm text-muted-foreground mb-3">When you have height and distance, or need to find one of them.</p>
            <div className="text-xs font-mono bg-muted p-2 rounded">tan(θ) = height/distance</div>
          </div>
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Use Sine (sin)</h4>
            <p className="text-sm text-muted-foreground mb-3">When you have height and the direct line of sight (hypotenuse).</p>
            <div className="text-xs font-mono bg-muted p-2 rounded">sin(θ) = height/hypotenuse</div>
          </div>
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Use Cosine (cos)</h4>
            <p className="text-sm text-muted-foreground mb-3">When you have distance and the direct line of sight (hypotenuse).</p>
            <div className="text-xs font-mono bg-muted p-2 rounded">cos(θ) = distance/hypotenuse</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between elevation and depression angles?</h4>
            <p className="text-sm text-muted-foreground">
              Elevation is looking up from horizontal; depression is looking down. Mathematically, they work the same way. If you're at point A looking up at point B, the elevation angle from A equals the depression angle from B – they're alternate interior angles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do we use tangent instead of sine or cosine?</h4>
            <p className="text-sm text-muted-foreground">
              Tangent relates the two legs of a right triangle (height and distance) without needing the hypotenuse. In most real-world elevation problems, you can measure or estimate height and horizontal distance, but not the direct line of sight.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the angle be 90 degrees or more?</h4>
            <p className="text-sm text-muted-foreground">
              No. At 90°, you'd be looking straight up, which means distance is zero – the tangent is undefined. Angles greater than 90° don't make sense for elevation/depression. In practice, angles above 80° are rare in real scenarios.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I know the hypotenuse (line of sight)?</h4>
            <p className="text-sm text-muted-foreground">
              Use sine or cosine instead. If you know the hypotenuse and angle, height = hypotenuse × sin(angle) and distance = hypotenuse × cos(angle). This comes up when you know the length of a ladder or cable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate do my measurements need to be?</h4>
            <p className="text-sm text-muted-foreground">
              Small errors in angle measurement cause larger errors at steep angles. At 30°, a 1° error changes the result by about 2%. At 75°, the same 1° error changes it by about 7%. For critical measurements, use a quality clinometer or theodolite.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does my eye height matter?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, for precise measurements. If you're 1.7 meters tall and measuring a building's height, add your eye height to the calculated result. For distant objects or tall structures, this correction is often negligible, but include it for accuracy.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/right-triangle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Right Triangle Calculator</p><p className="text-xs text-muted-foreground">Solve right triangles</p></a>
          <a href="/math-tools/trig-function-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Trig Function Calculator</p><p className="text-xs text-muted-foreground">Calculate sin, cos, tan</p></a>
          <a href="/math-tools/triangle-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Triangle Solver</p><p className="text-xs text-muted-foreground">Solve any triangle</p></a>
        </div>
      </section>
    </div>
  );
}
