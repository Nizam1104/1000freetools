"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TrigFunctionCalculator() {
  const [angle, setAngle] = useState<string>("");
  const [unit, setUnit] = useState<"degrees" | "radians">("degrees");
  const [selectedFunction, setSelectedFunction] = useState<
    "all" | "sin" | "cos" | "tan" | "csc" | "sec" | "cot"
  >("all");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const calculate = () => {
    const angleNum = parseFloat(angle);

    if (isNaN(angleNum)) {
      setError("Please enter a valid angle");
      return;
    }

    setError("");

    const angleInRad = unit === "degrees" ? toRad(angleNum) : angleNum;
    const angleInDeg =
      unit === "degrees" ? angleNum : (angleNum * 180) / Math.PI;

    const sin = Math.sin(angleInRad);
    const cos = Math.cos(angleInRad);
    const tan = Math.tan(angleInRad);
    const csc = 1 / sin;
    const sec = 1 / cos;
    const cot = 1 / tan;

    const normalizeAngle = (ang: number) => {
      if (unit === "degrees") {
        let normalized = ang % 360;
        if (normalized < 0) normalized += 360;
        return normalized;
      } else {
        let normalized = ang % (2 * Math.PI);
        if (normalized < 0) normalized += 2 * Math.PI;
        return normalized;
      }
    };

    const getExactValue = (func: string, ang: number): string => {
      const normalizedDeg =
        unit === "degrees" ? ang % 360 : ((ang * 180) / Math.PI) % 360;
      const commonAngles: Record<number, Record<string, string>> = {
        0: {
          sin: "0",
          cos: "1",
          tan: "0",
          csc: "undefined",
          sec: "1",
          cot: "undefined",
        },
        30: {
          sin: "1/2",
          cos: "√3/2",
          tan: "√3/3",
          csc: "2",
          sec: "2√3/3",
          cot: "√3",
        },
        45: {
          sin: "√2/2",
          cos: "√2/2",
          tan: "1",
          csc: "√2",
          sec: "√2",
          cot: "1",
        },
        60: {
          sin: "√3/2",
          cos: "1/2",
          tan: "√3",
          csc: "2√3/3",
          sec: "2",
          cot: "√3/3",
        },
        90: {
          sin: "1",
          cos: "0",
          tan: "undefined",
          csc: "1",
          sec: "undefined",
          cot: "0",
        },
        120: {
          sin: "√3/2",
          cos: "-1/2",
          tan: "-√3",
          csc: "2√3/3",
          sec: "-2",
          cot: "-√3/3",
        },
        135: {
          sin: "√2/2",
          cos: "-√2/2",
          tan: "-1",
          csc: "√2",
          sec: "-√2",
          cot: "-1",
        },
        150: {
          sin: "1/2",
          cos: "-√3/2",
          tan: "-√3/3",
          csc: "2",
          sec: "-2√3/3",
          cot: "-√3",
        },
        180: {
          sin: "0",
          cos: "-1",
          tan: "0",
          csc: "undefined",
          sec: "-1",
          cot: "undefined",
        },
        210: {
          sin: "-1/2",
          cos: "-√3/2",
          tan: "√3/3",
          csc: "-2",
          sec: "-2√3/3",
          cot: "√3",
        },
        225: {
          sin: "-√2/2",
          cos: "-√2/2",
          tan: "1",
          csc: "-√2",
          sec: "-√2",
          cot: "1",
        },
        240: {
          sin: "-√3/2",
          cos: "-1/2",
          tan: "√3",
          csc: "-2√3/3",
          sec: "-2",
          cot: "√3/3",
        },
        270: {
          sin: "-1",
          cos: "0",
          tan: "undefined",
          csc: "-1",
          sec: "undefined",
          cot: "0",
        },
        300: {
          sin: "-√3/2",
          cos: "1/2",
          tan: "-√3",
          csc: "-2√3/3",
          sec: "2",
          cot: "-√3/3",
        },
        315: {
          sin: "-√2/2",
          cos: "√2/2",
          tan: "-1",
          csc: "-√2",
          sec: "√2",
          cot: "-1",
        },
        330: {
          sin: "-1/2",
          cos: "√3/2",
          tan: "-√3/3",
          csc: "-2",
          sec: "2√3/3",
          cot: "-√3",
        },
      };

      if (commonAngles[normalizedDeg] && commonAngles[normalizedDeg][func]) {
        return commonAngles[normalizedDeg][func];
      }
      return "";
    };

    const isUndefined = (val: number) => Math.abs(val) > 1e10;

    const results: Record<string, any> = {
      sin: { name: "Sine", value: sin, symbol: "sin" },
      cos: { name: "Cosine", value: cos, symbol: "cos" },
      tan: { name: "Tangent", value: tan, symbol: "tan" },
      csc: {
        name: "Cosecant",
        value: isUndefined(csc) ? undefined : csc,
        symbol: "csc",
      },
      sec: {
        name: "Secant",
        value: isUndefined(sec) ? undefined : sec,
        symbol: "sec",
      },
      cot: {
        name: "Cotangent",
        value: isUndefined(cot) ? undefined : cot,
        symbol: "cot",
      },
    };

    const normalizedAngle = normalizeAngle(angleNum);

    const quadrant =
      unit === "degrees"
        ? Math.floor((normalizedAngle % 360) / 90) + 1
        : Math.floor((((angleNum * 180) / Math.PI) % 360) / 90) + 1;

    const quadrantInfo = [
      "I (0° to 90°): All functions positive",
      "II (90° to 180°): Sine positive",
      "III (180° to 270°): Tangent positive",
      "IV (270° to 360°): Cosine positive",
    ];

    setResult({
      angle: angleNum,
      angleInDeg: angleInDeg.toFixed(2),
      angleInRad: angleInRad.toFixed(4),
      normalizedAngle: normalizedAngle.toFixed(2),
      quadrant,
      quadrantInfo: quadrantInfo[quadrant - 1],
      results,
      selectedFunction,
      getExactValue,
      steps: [
        `Given angle: ${angleNum}${unit === "degrees" ? "°" : " rad"}`,
        ``,
        `Convert to ${unit === "degrees" ? "radians" : "degrees"}:`,
        `  ${angleNum}${unit === "degrees" ? "°" : " rad"} = ${unit === "degrees" ? angleInRad.toFixed(4) + " rad" : angleInDeg.toFixed(2) + "°"}`,
        ``,
        `Normalize angle to [0°, 360°):`,
        `  ${normalizedAngle.toFixed(2)}°`,
        ``,
        `Determine quadrant:`,
        `  Quadrant ${quadrant}: ${quadrantInfo[quadrant - 1]}`,
        ``,
        `Calculate trigonometric functions:`,
        `  sin(${angleNum}°) = ${sin.toFixed(6)}`,
        `  cos(${angleNum}°) = ${cos.toFixed(6)}`,
        `  tan(${angleNum}°) = ${tan.toFixed(6)}`,
        ``,
        `Reciprocal functions:`,
        `  csc(${angleNum}°) = 1/sin(${angleNum}°) = ${isUndefined(csc) ? "undefined" : csc.toFixed(6)}`,
        `  sec(${angleNum}°) = 1/cos(${angleNum}°) = ${isUndefined(sec) ? "undefined" : sec.toFixed(6)}`,
        `  cot(${angleNum}°) = 1/tan(${angleNum}°) = ${isUndefined(cot) ? "undefined" : cot.toFixed(6)}`,
      ],
    });
  };

  const reset = () => {
    setAngle("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Trig Function Calculator – Calculate Sin Cos Tan Online
        </h1>
        <p className="text-muted-foreground">
          Calculate any trigonometric function value including sin, cos, tan,
          csc, sec, and cot for any angle in degrees or radians with our free
          online trig calculator.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trigonometric Function Calculator</CardTitle>
          <CardDescription>
            Enter an angle and calculate sine, cosine, tangent, and their
            reciprocals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Angle</Label>
                <Input
                  type="number"
                  placeholder="e.g., 45"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Select
                  value={unit}
                  onValueChange={(v) => setUnit(v as typeof unit)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="degrees">Degrees (°)</SelectItem>
                    <SelectItem value="radians">Radians (rad)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Function</Label>
                <Select
                  value={selectedFunction}
                  onValueChange={(v) =>
                    setSelectedFunction(v as typeof selectedFunction)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Functions</SelectItem>
                    <SelectItem value="sin">Sine (sin)</SelectItem>
                    <SelectItem value="cos">Cosine (cos)</SelectItem>
                    <SelectItem value="tan">Tangent (tan)</SelectItem>
                    <SelectItem value="csc">Cosecant (csc)</SelectItem>
                    <SelectItem value="sec">Secant (sec)</SelectItem>
                    <SelectItem value="cot">Cotangent (cot)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm">Show step-by-step solution</Label>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(result.results).map(
                    ([key, data]: [string, any]) => {
                      if (
                        selectedFunction !== "all" &&
                        key !== selectedFunction
                      )
                        return null;
                      const isUndefined = data.value === undefined;
                      return (
                        <div key={key} className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">
                            {data.name}
                          </p>
                          <p className="text-lg font-mono mb-1">
                            {data.symbol}({result.angle}°) ={" "}
                            {isUndefined ? "undefined" : data.value.toFixed(6)}
                          </p>
                          {!isUndefined && (
                            <p className="text-xs text-muted-foreground">
                              Exact:{" "}
                              {result.getExactValue(key, result.angle) || "N/A"}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Angle (degrees)
                    </p>
                    <p className="text-2xl font-bold">{result.angleInDeg}°</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Angle (radians)
                    </p>
                    <p className="text-2xl font-bold">
                      {result.angleInRad} rad
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Quadrant
                    </p>
                    <p className="text-2xl font-bold">Q{result.quadrant}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {result.quadrantInfo}
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">
                    Step-by-Step Solution
                  </h4>
                  <div className="space-y-2 text-sm font-mono">
                    {result.steps.map((step: string, i: number) => (
                      <div key={i} className={step === "" ? "h-4" : ""}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">
                    Unit Circle Reference
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold mb-2">
                        Common Angles (Degrees)
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>0°, 30°, 45°, 60°, 90°</div>
                        <div>120°, 135°, 150°, 180°</div>
                        <div>210°, 225°, 240°, 270°</div>
                        <div>300°, 315°, 330°, 360°</div>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">
                        Common Angles (Radians)
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>0, π/6, π/4, π/3, π/2</div>
                        <div>2π/3, 3π/4, 5π/6, π</div>
                        <div>7π/6, 5π/4, 4π/3, 3π/2</div>
                        <div>5π/3, 7π/4, 11π/6, 2π</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Trigonometric Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Trigonometric functions relate angles to ratios of sides in a right
            triangle. Sine is opposite over hypotenuse. Cosine is adjacent over
            hypotenuse. Tangent is opposite over adjacent.
          </p>
          <p className="text-sm text-muted-foreground">
            The reciprocal functions flip these ratios. Cosecant is 1/sine.
            Secant is 1/cosine. Cotangent is 1/tangent. They're useful in
            calculus and physics when the primary functions appear in
            denominators.
          </p>
          <p className="text-sm text-muted-foreground">
            Angles repeat every 360° (or 2π radians). An angle of 390° behaves
            exactly like 30°. This periodic nature is why trig functions model
            waves, oscillations, and anything that repeats.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Six Trigonometric Functions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Primary Functions</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono">sin(θ)</span>
                  <span className="text-xs text-muted-foreground">
                    opposite / hypotenuse
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono">cos(θ)</span>
                  <span className="text-xs text-muted-foreground">
                    adjacent / hypotenuse
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono">tan(θ)</span>
                  <span className="text-xs text-muted-foreground">
                    opposite / adjacent
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">
                Reciprocal Functions
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono">csc(θ)</span>
                  <span className="text-xs text-muted-foreground">
                    1 / sin(θ)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono">sec(θ)</span>
                  <span className="text-xs text-muted-foreground">
                    1 / cos(θ)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono">cot(θ)</span>
                  <span className="text-xs text-muted-foreground">
                    1 / tan(θ)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Domain and Range</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-mono">sin, cos</span>
                  <span className="text-muted-foreground">
                    Domain: all reals, Range: [-1, 1]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">tan</span>
                  <span className="text-muted-foreground">
                    Domain: θ ≠ 90° + 180°n, Range: all reals
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">csc</span>
                  <span className="text-muted-foreground">
                    Domain: θ ≠ 180°n, Range: (-∞,-1] ∪ [1,∞)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">sec</span>
                  <span className="text-muted-foreground">
                    Domain: θ ≠ 90° + 180°n, Range: (-∞,-1] ∪ [1,∞)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">cot</span>
                  <span className="text-muted-foreground">
                    Domain: θ ≠ 180°n, Range: all reals
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Sign by Quadrant</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Quadrant I</span>
                  <span className="text-muted-foreground">All positive</span>
                </div>
                <div className="flex justify-between">
                  <span>Quadrant II</span>
                  <span className="text-muted-foreground">sin positive</span>
                </div>
                <div className="flex justify-between">
                  <span>Quadrant III</span>
                  <span className="text-muted-foreground">tan positive</span>
                </div>
                <div className="flex justify-between">
                  <span>Quadrant IV</span>
                  <span className="text-muted-foreground">cos positive</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Mnemonic: "All Students Take Calculus"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exact Values for Common Angles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Angle</th>
                  <th className="text-center p-2">sin</th>
                  <th className="text-center p-2">cos</th>
                  <th className="text-center p-2">tan</th>
                  <th className="text-center p-2">csc</th>
                  <th className="text-center p-2">sec</th>
                  <th className="text-center p-2">cot</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    deg: 0,
                    rad: "0",
                    sin: "0",
                    cos: "1",
                    tan: "0",
                    csc: "—",
                    sec: "1",
                    cot: "—",
                  },
                  {
                    deg: 30,
                    rad: "π/6",
                    sin: "1/2",
                    cos: "√3/2",
                    tan: "√3/3",
                    csc: "2",
                    sec: "2√3/3",
                    cot: "√3",
                  },
                  {
                    deg: 45,
                    rad: "π/4",
                    sin: "√2/2",
                    cos: "√2/2",
                    tan: "1",
                    csc: "√2",
                    sec: "√2",
                    cot: "1",
                  },
                  {
                    deg: 60,
                    rad: "π/3",
                    sin: "√3/2",
                    cos: "1/2",
                    tan: "√3",
                    csc: "2√3/3",
                    sec: "2",
                    cot: "√3/3",
                  },
                  {
                    deg: 90,
                    rad: "π/2",
                    sin: "1",
                    cos: "0",
                    tan: "—",
                    csc: "1",
                    sec: "—",
                    cot: "0",
                  },
                  {
                    deg: 180,
                    rad: "π",
                    sin: "0",
                    cos: "-1",
                    tan: "0",
                    csc: "—",
                    sec: "-1",
                    cot: "—",
                  },
                  {
                    deg: 270,
                    rad: "3π/2",
                    sin: "-1",
                    cos: "0",
                    tan: "—",
                    csc: "-1",
                    sec: "—",
                    cot: "0",
                  },
                  {
                    deg: 360,
                    rad: "2π",
                    sin: "0",
                    cos: "1",
                    tan: "0",
                    csc: "—",
                    sec: "1",
                    cot: "—",
                  },
                ].map((row) => (
                  <tr key={row.deg} className="border-b">
                    <td className="p-2 font-mono">
                      {row.deg}° ({row.rad})
                    </td>
                    <td className="text-center p-2 font-mono">{row.sin}</td>
                    <td className="text-center p-2 font-mono">{row.cos}</td>
                    <td className="text-center p-2 font-mono">{row.tan}</td>
                    <td className="text-center p-2 font-mono">{row.csc}</td>
                    <td className="text-center p-2 font-mono">{row.sec}</td>
                    <td className="text-center p-2 font-mono">{row.cot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">
              When is tangent undefined?
            </h4>
            <p className="text-xs text-muted-foreground">
              Tangent equals sin/cos, so it's undefined whenever cosine equals
              zero. That happens at 90°, 270°, and every 180° after that. The
              graph of tangent has vertical asymptotes at these points.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">
              Why are some cosecant and secant values undefined?
            </h4>
            <p className="text-xs text-muted-foreground">
              Cosecant is 1/sine and secant is 1/cosine. When sine or cosine
              equals zero, you'd be dividing by zero – which is undefined.
              Cosecant is undefined at 0°, 180°, 360°. Secant is undefined at
              90°, 270°.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">
              How do I convert between degrees and radians?
            </h4>
            <p className="text-xs text-muted-foreground">
              Multiply degrees by π/180 to get radians. Multiply radians by
              180/π to get degrees. A full circle is 360° or 2π radians. So 180°
              = π rad, 90° = π/2 rad, 60° = π/3 rad.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">
              What does it mean that trig functions are periodic?
            </h4>
            <p className="text-xs text-muted-foreground">
              Periodic means they repeat their values in regular intervals. Sine
              and cosine repeat every 360° (2π rad). Tangent and cotangent
              repeat every 180° (π rad). This is why sin(30°) = sin(390°) =
              sin(750°).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">
              How do I know which quadrant an angle is in?
            </h4>
            <p className="text-xs text-muted-foreground">
              First normalize the angle to 0°–360°. Quadrant I is 0°–90°,
              Quadrant II is 90°–180°, Quadrant III is 180°–270°, Quadrant IV is
              270°–360°. The quadrant tells you which functions are positive.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">
              What are exact values vs decimal approximations?
            </h4>
            <p className="text-xs text-muted-foreground">
              Exact values use fractions and radicals like 1/2 or √3/2. Decimal
              approximations are rounded numbers like 0.5 or 0.866025. Exact
              values are precise; decimals are easier to compare but lose
              precision.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
