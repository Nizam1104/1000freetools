"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixInverseCalculator() {
  const [size, setSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [inverse, setInverse] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("");
  const [rowInputs, setRowInputs] = useState<string[]>(["", ""]);
  const [textareaError, setTextareaError] = useState<string>("");

  const initializeMatrix = (newSize: number) => {
    setSize(newSize);
    setMatrix(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setInverse(null);
    setSteps([]);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(newSize).fill(""));
    setTextareaError("");
  };

  const updateCell = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const parseTextareaInput = (text: string): { matrix: number[][]; size: number; error: string } => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { matrix: [], size: 0, error: "" };
    }

    const rows = trimmed.split("\n").filter(row => row.trim());
    if (rows.length === 0) {
      return { matrix: [], size: 0, error: "Please enter matrix values" };
    }

    const parsedRows: number[][] = [];
    for (const row of rows) {
      const values = row.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));
      if (numbers.some(n => isNaN(n))) {
        return { matrix: [], size: 0, error: "Invalid number detected. Please enter only numeric values." };
      }
      parsedRows.push(numbers);
    }

    const rowCount = parsedRows.length;
    const colCount = parsedRows[0].length;

    if (rowCount > 10) {
      return { matrix: [], size: 0, error: "Maximum supported matrix size is 10×10" };
    }

    if (rowCount !== colCount) {
      return {
        matrix: [],
        size: 0,
        error: `Matrix must be square. Got ${rowCount} rows and ${colCount} columns.`
      };
    }

    for (let i = 1; i < rowCount; i++) {
      if (parsedRows[i].length !== colCount) {
        return {
          matrix: [],
          size: 0,
          error: `All rows must have the same number of elements. Row ${i + 1} has ${parsedRows[i].length} elements.`
        };
      }
    }

    return { matrix: parsedRows, size: rowCount, error: "" };
  };

  const parseRowInput = (rowIndex: number, value: string): { matrix: number[][]; error: string } => {
    const newRowInputs = [...rowInputs];
    newRowInputs[rowIndex] = value;
    setRowInputs(newRowInputs);

    const values = value.split(/[\s,]+/).filter(v => v.trim());
    const numbers = values.map(v => parseFloat(v));

    if (values.length > 0 && numbers.some(n => isNaN(n))) {
      return { matrix: [], error: `Row ${rowIndex + 1} contains invalid numbers` };
    }

    const newMatrix = matrix.map((r, ri) => {
      if (ri === rowIndex) {
        const newRow = Array(size).fill(0);
        for (let i = 0; i < Math.min(numbers.length, size); i++) {
          newRow[i] = numbers[i];
        }
        return newRow;
      }
      return r;
    });

    return { matrix: newMatrix, error: "" };
  };

  const handleTextareaChange = (value: string) => {
    setTextareaValue(value);
    const result = parseTextareaInput(value);
    setTextareaError("");
    if (result.matrix.length > 0) {
      setMatrix(result.matrix);
      setSize(result.size);
    }
  };

  const calculateDeterminant2x2 = (m: number[][]): number => {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  };

  const calculateDeterminant3x3 = (m: number[][]): number => {
    const a = m[0][0], b = m[0][1], c = m[0][2];
    const d = m[1][0], e = m[1][1], f = m[1][2];
    const g = m[2][0], h = m[2][1], i = m[2][2];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  };

  const getMinor = (m: number[][], skipRow: number, skipCol: number): number[][] => {
    return m
      .filter((_, ri) => ri !== skipRow)
      .map(row => row.filter((_, ci) => ci !== skipCol));
  };

  const calculateInverse2x2 = () => {
    const a = matrix[0][0], b = matrix[0][1], c = matrix[1][0], d = matrix[1][1];
    const det = calculateDeterminant2x2(matrix);

    if (det === 0) {
      setError("This matrix is singular (determinant = 0) and has no inverse");
      setInverse(null);
      setSteps([]);
      return;
    }

    const invDet = 1 / det;
    const inv = [
      [d * invDet, -b * invDet],
      [-c * invDet, a * invDet]
    ];

    const steps = [
      `For a 2×2 matrix [[a,b],[c,d]], the inverse is (1/det) × [[d,-b],[-c,a]]`,
      ``,
      `Step 1: Calculate determinant`,
      `det = ad - bc = ${a}×${d} - ${b}×${c} = ${a*d} - ${b*c} = ${det}`,
      ``,
      `Step 2: Find the adjugate matrix`,
      `Swap diagonal elements: a↔d`,
      `Negate off-diagonal elements: b→-${b}, c→-${c}`,
      `Adjugate = [[${d}, ${-b}], [${-c}, ${a}]]`,
      ``,
      `Step 3: Multiply by 1/det`,
      `A⁻¹ = (1/${det}) × [[${d}, ${-b}], [${-c}, ${a}]]`,
      `A⁻¹ = [[${round(inv[0][0])}, ${round(inv[0][1])}], [${round(inv[1][0])}, ${round(inv[1][1])}]]`
    ];

    setInverse(inv);
    setSteps(steps);
    setError("");
    setTextareaError("");
  };

  const calculateInverse3x3 = () => {
    const det = calculateDeterminant3x3(matrix);

    if (det === 0) {
      setError("This matrix is singular (determinant = 0) and has no inverse");
      setInverse(null);
      setSteps([]);
      return;
    }

    const cofactors: number[][] = [];
    for (let i = 0; i < 3; i++) {
      cofactors[i] = [];
      for (let j = 0; j < 3; j++) {
        const minor = getMinor(matrix, i, j);
        const minorDet = calculateDeterminant2x2(minor);
        const sign = Math.pow(-1, i + j);
        cofactors[i][j] = sign * minorDet;
      }
    }

    const adjugate = [
      [cofactors[0][0], cofactors[1][0], cofactors[2][0]],
      [cofactors[0][1], cofactors[1][1], cofactors[2][1]],
      [cofactors[0][2], cofactors[1][2], cofactors[2][2]]
    ];

    const invDet = 1 / det;
    const inv = adjugate.map(row => row.map(val => val * invDet));

    const steps = [
      `For a 3×3 matrix, A⁻¹ = (1/det(A)) × adj(A)`,
      ``,
      `Step 1: Calculate determinant`,
      `det = ${det}`,
      ``,
      `Step 2: Find the matrix of cofactors`,
      `C₀₀ = +(${cofactors[0][0]}), C₀₁ = ${cofactors[0][1] < 0 ? "" : "+"}${cofactors[0][1]}, C₀₂ = ${cofactors[0][2] < 0 ? "" : "+"}${cofactors[0][2]}`,
      `C₁₀ = ${cofactors[1][0] < 0 ? "" : "+"}${cofactors[1][0]}, C₁₁ = +(${cofactors[1][1]}), C₁₂ = ${cofactors[1][2] < 0 ? "" : "+"}${cofactors[1][2]}`,
      `C₂₀ = ${cofactors[2][0] < 0 ? "" : "+"}${cofactors[2][0]}, C₂₁ = ${cofactors[2][1] < 0 ? "" : "+"}${cofactors[2][1]}, C₂₂ = +(${cofactors[2][2]})`,
      ``,
      `Step 3: Transpose to get adjugate`,
      `adj(A) = [[${adjugate[0][0]}, ${adjugate[0][1]}, ${adjugate[0][2]}],`,
      `          [${adjugate[1][0]}, ${adjugate[1][1]}, ${adjugate[1][2]}],`,
      `          [${adjugate[2][0]}, ${adjugate[2][1]}, ${adjugate[2][2]}]]`,
      ``,
      `Step 4: Multiply by 1/det = 1/${det}`,
      `A⁻¹ computed successfully`
    ];

    setInverse(inv);
    setSteps(steps);
    setError("");
    setTextareaError("");
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  const calculate = () => {
    if (inputMode === "textarea") {
      const result = parseTextareaInput(textareaValue);
      if (result.error) {
        setTextareaError(result.error);
        return;
      }
      if (result.matrix.length > 0) {
        setMatrix(result.matrix);
        setSize(result.size);
      }
    }

    if (matrix.length === 0 || matrix.some(row => row.length === 0)) {
      setError("Please enter a valid matrix");
      return;
    }

    if (size === 2) {
      calculateInverse2x2();
    } else if (size === 3) {
      calculateInverse3x3();
    } else {
      setError("Inverse calculation is only supported for 2×2 and 3×3 matrices");
    }
  };

  const reset = () => {
    setMatrix(Array(size).fill(0).map(() => Array(size).fill(0)));
    setInverse(null);
    setSteps([]);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(size).fill(""));
    setTextareaError("");
  };

  const fillExample = () => {
    let exampleMatrix: number[][];
    if (size === 2) {
      exampleMatrix = [[4, 7], [2, 6]];
    } else {
      exampleMatrix = [[1, 2, 3], [0, 1, 4], [5, 6, 0]];
    }
    setMatrix(exampleMatrix);

    if (inputMode === "textarea") {
      setTextareaValue(exampleMatrix.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(exampleMatrix.map(row => row.join(", ")));
    }

    setInverse(null);
    setSteps([]);
    setError("");
    setTextareaError("");
  };

  const handleSizeChange = (newSize: number) => {
    const newMatrix = Array(newSize).fill(0).map((_, ri) =>
      Array(newSize).fill(0).map((_, ci) =>
        ri < matrix.length && ci < matrix[ri]?.length ? matrix[ri][ci] : 0
      )
    );
    setMatrix(newMatrix);
    setSize(newSize);
    setInverse(null);
    setSteps([]);
    setError("");
    setTextareaError("");

    if (inputMode === "row") {
      setRowInputs(Array(newSize).fill("").map((_, i) =>
        i < rowInputs.length ? rowInputs[i] : ""
      ));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Inverse Calculator – Find Inverse of Any Matrix</h1>
        <p className="text-muted-foreground">
          Find the inverse of any invertible square matrix with our free online matrix inverse calculator. Uses the adjugate method with step-by-step solution for 2×2 and 3×3 matrices.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Label>Matrix Size:</Label>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <Button
                    key={n}
                    variant={size === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSizeChange(n)}
                    className="w-10"
                  >
                    {n}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={fillExample}>Load Example</Button>
            </div>

            <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "textarea" | "row")}>
              <TabsList>
                <TabsTrigger value="textarea">Text Area Input</TabsTrigger>
                <TabsTrigger value="row">Row-by-Row Input</TabsTrigger>
              </TabsList>

              <TabsContent value="textarea" className="space-y-4">
                <div>
                  <Label>Enter matrix values (each row on a new line, values separated by spaces or commas)</Label>
                  <Textarea
                    value={textareaValue}
                    onChange={(e) => handleTextareaChange(e.target.value)}
                    placeholder={`Example for 2×2 matrix:\n4 7\n2 6\n\nor\n\n4, 7\n2, 6`}
                    className="min-h-[150px] font-mono"
                  />
                  {textareaError && (
                    <p className="text-xs text-destructive mt-2">{textareaError}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Current matrix: {size}×{size} | Detected from your input
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="row" className="space-y-4">
                <div className="space-y-3">
                  <Label>Enter each row (comma or space separated values)</Label>
                  {rowInputs.map((rowValue, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      <Label className="w-16 text-right">Row {rowIndex + 1}:</Label>
                      <Input
                        value={rowValue}
                        onChange={(e) => parseRowInput(rowIndex, e.target.value)}
                        placeholder={`Enter ${size} values for row ${rowIndex + 1}`}
                        className="flex-1 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate} disabled={matrix.length === 0}>Calculate Inverse</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {inverse && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">Inverse Matrix A⁻¹</p>
              <div className="overflow-x-auto">
                <div className="inline-block">
                  <div className="flex items-center">
                    <span className="text-4xl font-light mr-2">[</span>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                      {inverse.map((row, ri) =>
                        row.map((cell, ci) => (
                          <div key={`${ri}-${ci}`} className="w-20 text-center font-mono">
                            {round(cell)}
                          </div>
                        ))
                      )}
                    </div>
                    <span className="text-4xl font-light ml-2">]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded overflow-x-auto">
                {steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : "whitespace-pre"}>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold text-sm mb-2">Verification: A × A⁻¹ = I</h4>
              <p className="text-xs text-muted-foreground">
                Multiply the original matrix by its inverse to verify you get the identity matrix.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
