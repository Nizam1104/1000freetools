"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        if (type === "NOT") break; // NOT only has one input
      }
    }
    
    return rows;
  };

  const reset = () => {
    setInputA(false);
    setInputB(false);
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

        <div className="flex gap-2">
          <Button onClick={evaluateGate}>Evaluate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center">{gateType} Gate Output</h4>
              <div className="flex justify-center items-center gap-4">
                {/* Gate Symbol */}
                <div className="relative w-32 h-24 border-2 border-foreground rounded flex items-center justify-center">
                  <span className="text-2xl font-bold">{getGateSymbol(gateType)}</span>
                  {gateType.includes("N") && gateType !== "NOT" && (
                    <circle cx="100%" cy="50%" r="8" fill="white" stroke="currentColor" strokeWidth="2" className="absolute -right-4" />
                  )}
                </div>
                
                {/* Output */}
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Logic Gates</h2>
        <p className="text-muted-foreground">
          Logic gates are the building blocks of digital circuits. They perform basic logical operations on binary inputs (0 or 1, LOW or HIGH) and produce a single binary output. All digital devices use combinations of logic gates.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Basic Gates</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>AND:</strong> Output is 1 only if all inputs are 1</li>
              <li><strong>OR:</strong> Output is 1 if any input is 1</li>
              <li><strong>NOT:</strong> Output is the inverse of input</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Universal Gates</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>NAND:</strong> NOT-AND (inverted AND)</li>
              <li><strong>NOR:</strong> NOT-OR (inverted OR)</li>
              <li className="text-muted-foreground">Any circuit can be built using only NAND or only NOR gates</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">All Logic Gates</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Gate</th>
                <th className="p-2">Symbol</th>
                <th className="p-2">Boolean</th>
                <th className="p-2">Truth Table</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold">AND</td>
                <td className="p-2">&</td>
                <td className="p-2 font-mono">A · B</td>
                <td className="p-2 font-mono">00→0, 01→0, 10→0, 11→1</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">OR</td>
                <td className="p-2">≥1</td>
                <td className="p-2 font-mono">A + B</td>
                <td className="p-2 font-mono">00→0, 01→1, 10→1, 11→1</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">NOT</td>
                <td className="p-2">1○</td>
                <td className="p-2 font-mono">A̅</td>
                <td className="p-2 font-mono">0→1, 1→0</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">XOR</td>
                <td className="p-2">=1</td>
                <td className="p-2 font-mono">A ⊕ B</td>
                <td className="p-2 font-mono">00→0, 01→1, 10→1, 11→0</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">NAND</td>
                <td className="p-2">&○</td>
                <td className="p-2 font-mono">(A · B)̅</td>
                <td className="p-2 font-mono">00→1, 01→1, 10→1, 11→0</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">NOR</td>
                <td className="p-2">≥1○</td>
                <td className="p-2 font-mono">(A + B)̅</td>
                <td className="p-2 font-mono">00→1, 01→0, 10→0, 11→0</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">XNOR</td>
                <td className="p-2">=1○</td>
                <td className="p-2 font-mono">A ⊙ B</td>
                <td className="p-2 font-mono">00→1, 01→0, 10→0, 11→1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What are logic gates?</h3>
          <p className="text-sm text-muted-foreground">
            Logic gates are electronic circuits that perform logical operations on binary inputs. They're the fundamental building blocks of all digital systems, from calculators to computers.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is a truth table?</h3>
          <p className="text-sm text-muted-foreground">
            A truth table shows all possible input combinations and their corresponding outputs. It completely defines the behavior of a logic gate or circuit.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why are NAND and NOR called universal gates?</h3>
          <p className="text-sm text-muted-foreground">
            Any logic circuit can be built using only NAND gates or only NOR gates. This makes them "universal" - you can create AND, OR, NOT, and any other gate from just NANDs or NORs.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What is XOR used for?</h3>
          <p className="text-sm text-muted-foreground">
            XOR (exclusive OR) outputs 1 when inputs differ. It's used in adders, comparators, error detection, encryption, and parity checking.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do logic gates relate to Boolean algebra?</h3>
          <p className="text-sm text-muted-foreground">
            Each gate implements a Boolean operation. AND is multiplication, OR is addition, NOT is complementation. Boolean algebra provides the mathematical foundation for digital logic.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/truth-table-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Truth Table Generator</p>
            <p className="text-xs text-muted-foreground">Boolean expressions</p>
          </a>
          <a href="/math-tools/boolean-expression-evaluator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Boolean Evaluator</p>
            <p className="text-xs text-muted-foreground">Evaluate expressions</p>
          </a>
          <a href="/math-tools/binary-arithmetic-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Binary Arithmetic</p>
            <p className="text-xs text-muted-foreground">Binary calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
