"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixDeterminantCalculator() {
  const [size, setSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("");
  const [rowInputs, setRowInputs] = useState<string[]>(["", ""]);
  const [textareaError, setTextareaError] = useState<string>("");

  const initializeMatrix = (newSize: number) => {
    setSize(newSize);
    setMatrix(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setResult(null);
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

  const calculateDeterminantRecursive = (m: number[][]): { det: number; steps: string[] } => {
    const n = m.length;
    
    if (n === 1) {
      return { det: m[0][0], steps: [`det([${m[0][0]}]) = ${m[0][0]}`] };
    }

    if (n === 2) {
      const a = m[0][0], b = m[0][1], c = m[1][0], d = m[1][1];
      const det = a * d - b * c;
      return {
        det,
        steps: [
          `For a 2×2 matrix:`,
          `det = ad - bc`,
          `det = ${a}×${d} - ${b}×${c} = ${a*d} - ${b*c} = ${det}`
        ]
      };
    }

    const steps: string[] = [`Using cofactor expansion along the first row:`];
    let det = 0;

    for (let j = 0; j < n; j++) {
      const minor = getMinor(m, 0, j);
      const subResult = calculateDeterminantRecursive(minor);
      const cofactor = Math.pow(-1, j) * m[0][j] * subResult.det;
      det += cofactor;

      const sign = j % 2 === 0 ? "+" : "-";
      steps.push(`${sign} a₀,${j} × det(M₀,${j}) = ${sign} ${m[0][j]} × ${subResult.det.toFixed(4)} = ${cofactor.toFixed(4)}`);
    }

    steps.push(``, `Total determinant: ${det}`);
    return { det, steps };
  };

  const getMinor = (m: number[][], skipRow: number, skipCol: number): number[][] => {
    return m
      .filter((_, ri) => ri !== skipRow)
      .map(row => row.filter((_, ci) => ci !== skipCol));
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

    const calculation = calculateDeterminantRecursive(matrix);
    setResult(calculation.det);
    setSteps(calculation.steps);
    setError("");
    setTextareaError("");
  };

  const reset = () => {
    setMatrix(Array(size).fill(0).map(() => Array(size).fill(0)));
    setResult(null);
    setSteps([]);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(size).fill(""));
    setTextareaError("");
  };

  const fillExample = () => {
    const exampleMatrix = [
      [4, 3, 2, 1],
      [2, 5, 3, 2],
      [1, 2, 6, 3],
      [3, 1, 2, 7]
    ].slice(0, size).map(row => row.slice(0, size));

    setMatrix(exampleMatrix);

    if (inputMode === "textarea") {
      setTextareaValue(exampleMatrix.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(exampleMatrix.map(row => row.join(", ")));
    }

    setResult(null);
    setSteps([]);
    setError("");
    setTextareaError("");
  };

  const handleSizeChange = (newSize: number) => {
    const newMatrix = Array(newSize).fill(0).map((_, ri) =>
      Array(newSize).fill(0).map((_, ci) =>
        ri < matrix.length && ci < matrix[ri].length ? matrix[ri][ci] : 0
      )
    );
    setMatrix(newMatrix);
    setSize(newSize);
    setResult(null);
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
        <h1 className="text-3xl font-semibold mb-2">Matrix Determinant Calculator – Compute Det of Any Matrix</h1>
        <p className="text-muted-foreground">
          Calculate the determinant of any square matrix up to 10×10 with our free online determinant calculator. Enter values via textarea or row-by-row input with cofactor expansion steps shown.
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
                    placeholder={`Example for 3×3 matrix:\n1 2 3\n4 5 6\n7 8 9\n\nor\n\n1, 2, 3\n4, 5, 6\n7, 8, 9`}
                    className="min-h-[200px] font-mono"
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
              <Button onClick={calculate} disabled={matrix.length === 0}>Calculate Determinant</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Determinant</p>
              <p className="text-5xl font-bold">det(A) = {result}</p>
              {result === 0 && (
                <p className="text-sm text-destructive mt-2">
                  This matrix is singular (not invertible)
                </p>
              )}
              {result !== 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  This matrix is invertible
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                {steps.map((step, i) => (
                  <div key={i} className={step === "" ? "h-4" : ""}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
