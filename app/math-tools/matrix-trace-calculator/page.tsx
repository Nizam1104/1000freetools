"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixTraceCalculator() {
  const [size, setSize] = useState<number>(3);
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("");
  const [rowInputs, setRowInputs] = useState<string[]>(["", "", ""]);
  const [textareaError, setTextareaError] = useState<string>("");

  const initializeMatrix = (newSize: number) => {
    setSize(newSize);
    setMatrix(Array(newSize).fill(0).map(() => Array(newSize).fill(0)));
    setResult(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(newSize).fill(""));
    setTextareaError("");
  };

  const updateMatrix = (row: number, col: number, value: string) => {
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

  const calculateTrace = () => {
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

    try {
      let trace = 0;
      for (let i = 0; i < size; i++) {
        trace += matrix[i][i];
      }
      setResult(trace);
      setError("");
      setTextareaError("");
    } catch (e) {
      setError("Error calculating trace. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setMatrix(Array(size).fill(0).map(() => Array(size).fill(0)));
    setResult(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(size).fill(""));
    setTextareaError("");
  };

  const loadExample = () => {
    const examples: Record<number, number[][]> = {
      2: [[1, 2], [3, 4]],
      3: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      4: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    };
    setMatrix(examples[size]);

    if (inputMode === "textarea") {
      setTextareaValue(examples[size].map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(examples[size].map(row => row.join(", ")));
    }

    setResult(null);
    setError("");
    setTextareaError("");
  };

  const loadIdentityMatrix = () => {
    const identity = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => (i === j ? 1 : 0))
    );
    setMatrix(identity);

    if (inputMode === "textarea") {
      setTextareaValue(identity.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(identity.map(row => row.join(", ")));
    }

    setResult(null);
    setError("");
    setTextareaError("");
  };

  const loadDiagonalMatrix = () => {
    const diagonal = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => (i === j ? (i + 1) * 2 : 0))
    );
    setMatrix(diagonal);

    if (inputMode === "textarea") {
      setTextareaValue(diagonal.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(diagonal.map(row => row.join(", ")));
    }

    setResult(null);
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
    setResult(null);
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
        <h1 className="text-3xl font-semibold mb-2">Matrix Trace Calculator – Find tr(A) Online</h1>
        <p className="text-muted-foreground">
          Calculate the trace of any square matrix with our free online matrix trace calculator. Find the sum of diagonal elements instantly with step-by-step display.
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
              <Button variant="outline" size="sm" onClick={loadExample}>Load Example</Button>
              <Button variant="outline" size="sm" onClick={loadIdentityMatrix}>Identity</Button>
              <Button variant="outline" size="sm" onClick={loadDiagonalMatrix}>Diagonal</Button>
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
              <Button onClick={calculateTrace} disabled={matrix.length === 0}>Calculate Trace</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                tr(A) = Sum of Diagonal Elements
              </p>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{result}</p>
              </div>
              <div className="mt-4 p-4 bg-background rounded-lg">
                <p className="text-sm font-mono">
                  tr(A) = {matrix.map((_, i) => `a[${i}][${i}]`).join(" + ")} = {matrix.map((_, i) => matrix[i][i]).join(" + ")} = {result}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Trace</h4>
              <p className="text-sm text-muted-foreground">
                The trace is the sum of elements on the main diagonal (top-left to bottom-right).
                Only square matrices have a trace.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
