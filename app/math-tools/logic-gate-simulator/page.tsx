"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const examples = [
  { gate: "AND", a: true, b: true, label: "AND: 1 AND 1 = 1" },
  { gate: "OR", a: false, b: true, label: "OR: 0 OR 1 = 1" },
  { gate: "XOR", a: true, b: false, label: "XOR: 1 XOR 0 = 1" },
  { gate: "NAND", a: true, b: true, label: "NAND: 1 NAND 1 = 0" },
  { gate: "NOR", a: false, b: false, label: "NOR: 0 NOR 0 = 1" },
  { gate: "NOT", a: true, b: false, label: "NOT: NOT 1 = 0" },
  { gate: "XNOR", a: true, b: true, label: "XNOR: 1 XNOR 1 = 1" },
];

export default function LogicGateSimulator() {
  const [gateType, setGateType] = useState<"AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR" | "XNOR">("AND");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [result, setResult] = useState<any>(null);

  const evaluateGate = () => {
    let output = false;
    let explanation = "";

    switch (gateType) {
      case "AND":
        output = inputA && inputB;
        explanation = `Output is HIGH (1) only when BOTH inputs are HIGH. ${inputA ? 'A=1' : 'A=0'} AND ${inputB ? 'B=1' : 'B=0'} = ${output ? '1' : '0'}`;
        break;
      case "OR":
        output = inputA || inputB;
        explanation = `Output is HIGH (1) when AT LEAST ONE input is HIGH. ${inputA ? 'A=1' : 'A=0'} OR ${inputB ? 'B=1' : 'B=0'} = ${output ? '1' : '0'}`;
        break;
      case "NOT":
        output = !inputA;
        explanation = `Output is the INVERSE of the input. NOT ${inputA ? '1' : '0'} = ${output ? '1' : '0'}`;
        break;
      case "XOR":
        output = inputA !== inputB;
        explanation = `Output is HIGH (1) when inputs are DIFFERENT. ${inputA ? 'A=1' : 'A=0'} XOR ${inputB ? 'B=1' : 'B=0'} = ${output ? '1' : '0'}`;
        break;
      case "NAND":
        output = !(inputA && inputB);
        explanation = `Output is LOW (0) only when BOTH inputs are HIGH. ${inputA ? 'A=1' : 'A=0'} NAND ${inputB ? 'B=1' : 'B=0'} = ${output ? '1' : '0'}`;
        break;
      case "NOR":
        output = !(inputA || inputB);
        explanation = `Output is HIGH (1) only when BOTH inputs are LOW. ${inputA ? 'A=1' : 'A=0'} NOR ${inputB ? 'B=1' : 'B=0'} = ${output ? '1' : '0'}`;
        break;
      case "XNOR":
        output = inputA === inputB;
        explanation = `Output is HIGH (1) when inputs are THE SAME. ${inputA ? 'A=1' : 'A=0'} XNOR ${inputB ? 'B=1' : 'B=0'} = ${output ? '1' : '0'}`;
        break;
    }

    setResult({
      inputA,
      inputB,
      output,
      gateType,
      explanation,
      truthTable: getTruthTable(gateType)
    });
  };

  const getTruthTable = (type: string) => {
    const rows: { a: number; b: number | null; out: number }[] = [];

    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        let out = 0;
        switch (type) {
          case "AND": out = a && b ? 1 : 0; break;
          case "OR": out = a || b ? 1 : 0; break;
          case "NOT": out = a ? 0 : 1; break;
          case "XOR": out = a !== b ? 1 : 0; break;
          case "NAND": out = !(a && b) ? 1 : 0; break;
          case "NOR": out = !(a || b) ? 1 : 0; break;
          case "XNOR": out = a === b ? 1 : 0; break;
        }
        rows.push({ a, b: type === "NOT" ? null : b, out });
        if (type === "NOT") break;
      }
    }

    return rows;
  };

  const reset = () => {
    setInputA(false);
    setInputB(false);
    setResult(null);
  };

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setGateType(ex.gate as typeof gateType);
    setInputA(ex.a);
    setInputB(ex.b);
    setResult(null);
  };

  const getGateSymbol = (type: string) => {
    const symbols: Record<string, string> = {
      AND: "&",
      OR: "≥1",
      NOT: "1",
      XOR: "=1",
      NAND: "&",
      NOR: "≥1",
      XNOR: "=1"
    };
    return symbols[type] || type;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Logic Gate Simulator – Simulate Digital Logic Gates</h1>
        <p className="text-muted-foreground">
          Simulate AND, OR, NOT, XOR, NAND, NOR, and XNOR logic gates with our free online logic gate simulator. Interactive truth tables and visual output for digital logic learning.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Select Gate Type</Label>
          <Tabs value={gateType} onValueChange={(v) => { setGateType(v as typeof gateType); setResult(null); }}>
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="AND">AND</TabsTrigger>
              <TabsTrigger value="OR">OR</TabsTrigger>
              <TabsTrigger value="NOT">NOT</TabsTrigger>
              <TabsTrigger value="XOR">XOR</TabsTrigger>
              <TabsTrigger value="NAND">NAND</TabsTrigger>
              <TabsTrigger value="NOR">NOR</TabsTrigger>
              <TabsTrigger value="XNOR">XNOR</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6 bg-muted rounded-lg">
          <h4 className="font-semibold text-sm mb-4 text-center">Gate Inputs</h4>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <Label className="mb-2 block">Input A</Label>
              <button
                onClick={() => { setInputA(!inputA); setResult(null); }}
                className={`w-20 h-20 rounded-full text-2xl font-bold transition-all ${
                  inputA
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                {inputA ? '1' : '0'}
              </button>
              <p className="text-xs text-muted-foreground mt-2">Click to toggle</p>
            </div>

            {gateType !== "NOT" && (
              <div className="text-center">
                <Label className="mb-2 block">Input B</Label>
                <button
                  onClick={() => { setInputB(!inputB); setResult(null); }}
                  className={`w-20 h-20 rounded-full text-2xl font-bold transition-all ${
                    inputB
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {inputB ? '1' : '0'}
                </button>
                <p className="text-xs text-muted-foreground mt-2">Click to toggle</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={evaluateGate}>Evaluate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.label}
            </Button>
          ))}
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center">{gateType} Gate Output</h4>
              <div className="flex justify-center items-center gap-4">
                <div className="relative w-32 h-24 border-2 border-foreground rounded flex items-center justify-center">
                  <span className="text-2xl font-bold">{getGateSymbol(gateType)}</span>
                </div>

                <div className={`w-20 h-20 rounded-full text-2xl font-bold flex items-center justify-center transition-all ${
                  result.output
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {result.output ? '1' : '0'}
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">{result.explanation}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Truth Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-center">A</th>
                      {gateType !== "NOT" && <th className="p-2 text-center">B</th>}
                      <th className="p-2 text-center">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.truthTable.map((row: any, i: number) => (
                      <tr
                        key={i}
                        className={`border-b ${
                          row.a === (result.inputA ? 1 : 0) && (gateType === "NOT" || row.b === (result.inputB ? 1 : 0))
                            ? 'bg-primary/10 font-semibold'
                            : ''
                        }`}
                      >
                        <td className="p-2 text-center">{row.a}</td>
                        {gateType !== "NOT" && <td className="p-2 text-center">{row.b}</td>}
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded ${row.out ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            {row.out}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Logic Gates</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Logic gates are the fundamental building blocks of digital circuits. Each gate takes one or more binary inputs (0 or 1, false or true, low or high) and produces a single binary output based on a specific logical rule. Computers, smartphones, and all digital devices are built from billions of these gates working together.
          </p>
          <p className="text-muted-foreground">
            There are seven basic logic gates: AND, OR, NOT, XOR, NAND, NOR, and XNOR. Each has a unique truth table that defines its behavior for every possible input combination. By combining gates, you can build circuits that perform arithmetic, store memory, and execute complex operations.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Seven Logic Gates</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">AND Gate</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">Output = A · B</div>
            <p className="text-xs text-muted-foreground">Output is 1 only when BOTH inputs are 1. Like multiplication: 1×1=1, otherwise 0.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">OR Gate</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">Output = A + B</div>
            <p className="text-xs text-muted-foreground">Output is 1 when AT LEAST ONE input is 1. Like addition (but 1+1=1 in Boolean algebra).</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">NOT Gate</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">Output = Ā</div>
            <p className="text-xs text-muted-foreground">Output is the INVERSE of input. Also called an inverter. The only gate with one input.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">XOR Gate</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">Output = A ⊕ B</div>
            <p className="text-xs text-muted-foreground">Output is 1 when inputs are DIFFERENT. "Exclusive OR" – one or the other, but not both.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">NAND Gate</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">Output = (A · B)'</div>
            <p className="text-xs text-muted-foreground">AND followed by NOT. Output is 0 only when both inputs are 1. A "universal gate" – can build any circuit from NANDs alone.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">NOR Gate</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded mb-2">Output = (A + B)'</div>
            <p className="text-xs text-muted-foreground">OR followed by NOT. Output is 1 only when both inputs are 0. Also a universal gate.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: AND Gate</h4>
            <p className="text-sm text-muted-foreground mb-3">A = 1, B = 1</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>AND truth table:</div>
              <div>0 AND 0 = 0</div>
              <div>0 AND 1 = 0</div>
              <div>1 AND 0 = 0</div>
              <div>1 AND 1 = 1 ✓</div>
              <div className="pt-2 font-semibold">Output: 1</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: XOR Gate</h4>
            <p className="text-sm text-muted-foreground mb-3">A = 1, B = 0</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>XOR truth table:</div>
              <div>0 XOR 0 = 0 (same)</div>
              <div>0 XOR 1 = 1 (different) ✓</div>
              <div>1 XOR 0 = 1 (different) ✓</div>
              <div>1 XOR 1 = 0 (same)</div>
              <div className="pt-2 font-semibold">Output: 1</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: NAND Gate</h4>
            <p className="text-sm text-muted-foreground mb-3">A = 1, B = 1</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>First compute AND: 1 AND 1 = 1</div>
              <div>Then invert: NOT 1 = 0</div>
              <div className="pt-2 font-semibold">Output: 0</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: NOR Gate</h4>
            <p className="text-sm text-muted-foreground mb-3">A = 0, B = 0</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>First compute OR: 0 OR 0 = 0</div>
              <div>Then invert: NOT 0 = 1</div>
              <div className="pt-2 font-semibold">Output: 1</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            Claude Shannon's 1937 master's thesis showed that Boolean algebra (logic gates) could be implemented using electrical switches. This insight launched the digital age. Modern CPUs contain billions of transistors acting as microscopic logic gates, switching billions of times per second.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between XOR and OR?</h4>
            <p className="text-sm text-muted-foreground">
              OR outputs 1 if either or both inputs are 1. XOR (exclusive OR) outputs 1 only if exactly one input is 1 – not both. XOR is like "one or the other, but not both."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are NAND and NOR called universal gates?</h4>
            <p className="text-sm text-muted-foreground">
              You can build ANY logic circuit using only NAND gates (or only NOR gates). You can create AND, OR, and NOT functions from combinations of NANDs. This makes them fundamental for chip design.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a NOT gate do?</h4>
            <p className="text-sm text-muted-foreground">
              NOT inverts the input: 0 becomes 1, and 1 becomes 0. It's also called an inverter. NOT is the only gate with a single input. The symbol is a triangle with a small circle at the output.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How are logic gates physically implemented?</h4>
            <p className="text-sm text-muted-foreground">
              Modern gates use transistors – tiny electronic switches. A CMOS gate might use 2-6 transistors. When voltage is applied to the gate terminal, it controls current flow, implementing the logical operation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a truth table?</h4>
            <p className="text-sm text-muted-foreground">
              A truth table lists every possible input combination and the corresponding output. For a 2-input gate, there are 4 rows (00, 01, 10, 11). It completely defines the gate's behavior.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can logic gates have more than 2 inputs?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! AND, OR, NAND, and NOR gates commonly have 3, 4, 8, or more inputs. A 3-input AND outputs 1 only when all three inputs are 1. XOR with multiple inputs outputs 1 when an odd number of inputs are 1.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
