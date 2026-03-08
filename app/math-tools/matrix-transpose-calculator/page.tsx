"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixTransposeCalculator() {
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [transpose, setTranspose] = useState<number[][] | null>(null);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("");
  const [rowInputs, setRowInputs] = useState<string[]>(["", ""]);
  const [textareaError, setTextareaError] = useState<string>("");

  const initializeMatrix = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    setMatrix(Array(newRows).fill(0).map(() => Array(newCols).fill(0)));
    setTranspose(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(newRows).fill(""));
    setTextareaError("");
  };

  const updateCell = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c))
    );
    setMatrix(newMatrix);
  };

  const parseTextareaInput = (text: string): { matrix: number[][]; rows: number; cols: number; error: string } => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { matrix: [], rows: 0, cols: 0, error: "" };
    }

    const rowLines = trimmed.split("\n").filter(row => row.trim());
    if (rowLines.length === 0) {
      return { matrix: [], rows: 0, cols: 0, error: "Please enter matrix values" };
    }

    const parsedRows: number[][] = [];
    for (const row of rowLines) {
      const values = row.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));
      if (numbers.some(n => isNaN(n))) {
        return { matrix: [], rows: 0, cols: 0, error: "Invalid number detected. Please enter only numeric values." };
      }
      parsedRows.push(numbers);
    }

    const rowCount = parsedRows.length;
    const colCount = parsedRows[0].length;

    if (rowCount > 10) {
      return { matrix: [], rows: 0, cols: 0, error: "Maximum supported matrix size is 10×10" };
    }

    for (let i = 1; i < rowCount; i++) {
      if (parsedRows[i].length !== colCount) {
        return {
          matrix: [],
          rows: 0,
          cols: 0,
          error: `All rows must have the same number of elements. Row ${i + 1} has ${parsedRows[i].length} elements.`
        };
      }
    }

    return { matrix: parsedRows, rows: rowCount, cols: colCount, error: "" };
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
        const newRow = Array(cols).fill(0);
        for (let i = 0; i < Math.min(numbers.length, cols); i++) {
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
      setRows(result.rows);
      setCols(result.cols);
    }
  };

  const calculateTranspose = () => {
    if (inputMode === "textarea") {
      const result = parseTextareaInput(textareaValue);
      if (result.error) {
        setTextareaError(result.error);
        return;
      }
      if (result.matrix.length > 0) {
        setMatrix(result.matrix);
        setRows(result.rows);
        setCols(result.cols);
      }
    }

    if (matrix.length === 0 || matrix.some(row => row.length === 0)) {
      setError("Please enter a valid matrix");
      return;
    }

    const transposed = matrix[0].map((_, colIndex) =>
      matrix.map((row) => row[colIndex])
    );
    setTranspose(transposed);
    setError("");
    setTextareaError("");
  };

  const reset = () => {
    setMatrix(Array(rows).fill(0).map(() => Array(cols).fill(0)));
    setTranspose(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(rows).fill(""));
    setTextareaError("");
  };

  const fillExample = () => {
    let exampleMatrix: number[][];
    if (rows === 2 && cols === 2) {
      exampleMatrix = [[1, 2], [3, 4]];
    } else if (rows === 2 && cols === 3) {
      exampleMatrix = [[1, 2, 3], [4, 5, 6]];
    } else if (rows === 3 && cols === 2) {
      exampleMatrix = [[1, 2], [3, 4], [5, 6]];
    } else if (rows === 3 && cols === 3) {
      exampleMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    } else {
      exampleMatrix = Array(rows).fill(0).map((_, i) =>
        Array(cols).fill(0).map((_, j) => i * cols + j + 1)
      );
    }

    setMatrix(exampleMatrix);

    if (inputMode === "textarea") {
      setTextareaValue(exampleMatrix.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(exampleMatrix.map(row => row.join(", ")));
    }

    setTranspose(null);
    setError("");
    setTextareaError("");
  };

  const handleDimensionChange = (newRows: number, newCols: number) => {
    const newMatrix = Array(newRows).fill(0).map((_, ri) =>
      Array(newCols).fill(0).map((_, ci) =>
        ri < matrix.length && ci < matrix[ri]?.length ? matrix[ri][ci] : 0
      )
    );
    setMatrix(newMatrix);
    setRows(newRows);
    setCols(newCols);
    setTranspose(null);
    setError("");
    setTextareaError("");

    if (inputMode === "row") {
      setRowInputs(Array(newRows).fill("").map((_, i) =>
        i < rowInputs.length ? rowInputs[i] : ""
      ));
    }
  };

  const round = (n: number): string => {
    const rounded = Math.round(n * 10000) / 10000;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Transpose Calculator – Find Transpose of Any Matrix</h1>
        <p className="text-muted-foreground">
          Find the transpose of any matrix instantly with our free online matrix transpose calculator. Swap rows and columns of any size matrix with a single click.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Label>Rows:</Label>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <Button
                    key={n}
                    variant={rows === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDimensionChange(n, cols)}
                    className="w-10"
                  >
                    {n}
                  </Button>
                ))}
              </div>
              <Label className="ml-4">Columns:</Label>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <Button
                    key={n}
                    variant={cols === n ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDimensionChange(rows, n)}
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
                    placeholder={`Example for 2×3 matrix:\n1 2 3\n4 5 6\n\nor\n\n1, 2, 3\n4, 5, 6`}
                    className="min-h-[150px] font-mono"
                  />
                  {textareaError && (
                    <p className="text-xs text-destructive mt-2">{textareaError}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Current matrix: {rows}×{cols} | Detected from your input
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
                        placeholder={`Enter ${cols} values for row ${rowIndex + 1}`}
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
              <Button onClick={calculateTranspose} disabled={matrix.length === 0}>Calculate Transpose</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {transpose && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Original Matrix A ({rows}×{cols})</h3>
                <div className="overflow-x-auto">
                  <div className="inline-block">
                    <div className="flex items-center">
                      <span className="text-4xl font-light mr-2">[</span>
                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                        {matrix.map((row, ri) =>
                          row.map((cell, ci) => (
                            <div
                              key={`${ri}-${ci}`}
                              className="w-14 h-10 flex items-center justify-center bg-muted rounded font-mono"
                            >
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

              <div>
                <h3 className="font-semibold mb-3">Transpose Aᵀ ({cols}×{rows})</h3>
                <div className="overflow-x-auto">
                  <div className="inline-block">
                    <div className="flex items-center">
                      <span className="text-4xl font-light mr-2">[</span>
                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${rows}, 1fr)` }}>
                        {transpose.map((row, ri) =>
                          row.map((cell, ci) => (
                            <div
                              key={`${ri}-${ci}`}
                              className="w-14 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded font-mono"
                            >
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
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">How Transpose Works</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The transpose flips a matrix over its diagonal. Element at position [i,j] moves to position [j,i].
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                If A = [{rows}×{cols}], then Aᵀ = [{cols}×{rows}]<br />
                Aᵀ[i,j] = A[j,i]
              </code>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
