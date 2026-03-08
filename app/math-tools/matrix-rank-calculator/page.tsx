"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixRankCalculator() {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [matrix, setMatrix] = useState<number[][]>([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  const [textareaValue, setTextareaValue] = useState("");
  const [rowInputs, setRowInputs] = useState<string[]>(["", "", ""]);
  const [textareaError, setTextareaError] = useState<string>("");

  const getDimensions = () => {
    return { rows, cols };
  };

  const updateMatrix = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? parseFloat(value) || 0 : c)));
    setMatrix(newMatrix);
    setResult(null);
  };

  const initializeMatrix = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    const newMatrix = Array(newRows).fill(null).map((_, i) =>
      Array(newCols).fill(null).map((_, j) =>
        i === j ? 1 : 0
      )
    );
    setMatrix(newMatrix);
    setResult(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(newRows).fill(""));
    setTextareaError("");
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

  const calculateRank = () => {
    setError("");
    setResult(null);

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

    const { rows, cols } = getDimensions();

    // Matrix is already number[][]
    const parsedMatrix = matrix;
    if (parsedMatrix.flat().some(n => isNaN(n))) {
      setError("Please enter all matrix values as numbers");
      return;
    }

    // Create a copy for row reduction
    const augmented = parsedMatrix.map(row => [...row]);

    let rank = 0;
    const steps: string[] = [];
    const rowOperations: string[] = [];

    steps.push(`Starting matrix (${rows}×${cols}):`);
    steps.push(formatMatrix(augmented));
    steps.push("");
    steps.push("Performing Gaussian elimination (row echelon form):");
    steps.push("");

    let pivotRow = 0;

    for (let col = 0; col < cols && pivotRow < rows; col++) {
      // Find pivot
      let maxRow = pivotRow;
      for (let row = pivotRow + 1; row < rows; row++) {
        if (Math.abs(augmented[row][col]) > Math.abs(augmented[maxRow][col])) {
          maxRow = row;
        }
      }

      if (Math.abs(augmented[maxRow][col]) < 1e-10) {
        continue; // No pivot in this column
      }

      // Swap rows if needed
      if (maxRow !== pivotRow) {
        [augmented[pivotRow], augmented[maxRow]] = [augmented[maxRow], augmented[pivotRow]];
        rowOperations.push(`Swap R${pivotRow + 1} ↔ R${maxRow + 1}`);
      }

      // Scale pivot row
      const pivot = augmented[pivotRow][col];
      if (Math.abs(pivot) > 1e-10 && Math.abs(pivot - 1) > 1e-10) {
        for (let j = col; j < cols; j++) {
          augmented[pivotRow][j] /= pivot;
        }
        rowOperations.push(`R${pivotRow + 1} = R${pivotRow + 1} / ${pivot.toFixed(4)}`);
      }

      // Eliminate below
      for (let row = pivotRow + 1; row < rows; row++) {
        const factor = augmented[row][col];
        if (Math.abs(factor) > 1e-10) {
          for (let j = col; j < cols; j++) {
            augmented[row][j] -= factor * augmented[pivotRow][j];
          }
          rowOperations.push(`R${row + 1} = R${row + 1} - ${factor.toFixed(4)} × R${pivotRow + 1}`);
        }
      }

      rank++;
      pivotRow++;
    }

    steps.push(rowOperations.join("\n"));
    steps.push("");
    steps.push("Row echelon form:");
    steps.push(formatMatrix(augmented));
    steps.push("");
    steps.push(`Number of non-zero rows = ${rank}`);
    steps.push(`Therefore, Rank = ${rank}`);

    // Determine properties
    const isFullRank = rank === Math.min(rows, cols);
    let propertyText = "";
    if (rows === cols) {
      propertyText = rank === rows
        ? "Matrix is full rank (invertible/non-singular)"
        : "Matrix is rank deficient (singular/non-invertible)";
    } else {
      propertyText = isFullRank
        ? `Matrix has full rank (${rank} = min(${rows}, ${cols}))`
        : `Matrix is rank deficient (rank ${rank} < min(${rows}, ${cols}) = ${Math.min(rows, cols)})`;
    }

    setResult({
      rank,
      steps,
      rows,
      cols,
      isFullRank,
      propertyText,
      nullity: cols - rank
    });
    setError("");
    setTextareaError("");
  };

  const formatMatrix = (m: number[][]): string => {
    return m.map(row =>
      "[ " + row.map(x => x.toFixed(2).padStart(8)).join(" ") + " ]"
    ).join("\n");
  };

  const reset = () => {
    const newMatrix = Array(rows).fill(null).map((_, i) =>
      Array(cols).fill(null).map((_, j) =>
        i === j ? 1 : 0
      )
    );
    setMatrix(newMatrix);
    setResult(null);
    setError("");
    setTextareaValue("");
    setRowInputs(Array(rows).fill(""));
    setTextareaError("");
  };

  const loadExample = (type: "identity" | "zeros" | "random" | "singular") => {
    let newMatrix: number[][];

    if (type === "identity") {
      newMatrix = Array(rows).fill(null).map((_, i) =>
        Array(cols).fill(null).map((_, j) => (i === j ? 1 : 0))
      );
    } else if (type === "zeros") {
      newMatrix = Array(rows).fill(null).map(() =>
        Array(cols).fill(0)
      );
    } else if (type === "singular") {
      // Create a singular matrix (row3 = row1 + row2)
      newMatrix = [
        [1, 2, 3, cols > 3 ? 4 : 0].slice(0, cols),
        [2, 4, 6, cols > 3 ? 8 : 0].slice(0, cols),
        [3, 6, 9, cols > 3 ? 12 : 0].slice(0, cols),
        rows > 3 ? [4, 8, 12, cols > 3 ? 16 : 0].slice(0, cols) : null
      ].filter(Boolean) as number[][];
    } else {
      // Random
      newMatrix = Array(rows).fill(null).map(() =>
        Array(cols).fill(null).map(() => Math.floor(Math.random() * 10))
      );
    }

    setMatrix(newMatrix);
    setResult(null);
    setError("");
    setTextareaError("");

    if (inputMode === "textarea") {
      setTextareaValue(newMatrix.map(row => row.join(" ")).join("\n"));
    } else {
      setRowInputs(newMatrix.map(row => row.join(", ")));
    }
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
    setResult(null);
    setError("");
    setTextareaError("");

    if (inputMode === "row") {
      setRowInputs(Array(newRows).fill("").map((_, i) =>
        i < rowInputs.length ? rowInputs[i] : ""
      ));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Rank Calculator – Find Rank of a Matrix</h1>
        <p className="text-muted-foreground">
          Calculate the rank of any matrix with our free online matrix rank calculator. Get step-by-step row reduction to echelon form with detailed explanations.
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

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => loadExample("identity")}>Identity</Button>
              <Button variant="outline" size="sm" onClick={() => loadExample("singular")}>Singular</Button>
              <Button variant="outline" size="sm" onClick={() => loadExample("random")}>Random</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculateRank} disabled={matrix.length === 0}>Calculate Rank</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Matrix Rank</p>
              <p className="text-5xl font-bold">{result.rank}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.rows}×{result.cols} matrix with rank {result.rank}
              </p>
              <p className={`text-sm mt-2 font-semibold ${result.isFullRank ? 'text-green-600' : 'text-amber-600'}`}>
                {result.propertyText}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Rows</p>
                <p className="text-2xl font-bold">{result.rows}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Columns</p>
                <p className="text-2xl font-bold">{result.cols}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Nullity</p>
                <p className="text-2xl font-bold">{result.nullity}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-xs bg-muted p-3 rounded overflow-x-auto whitespace-pre">
                {result.steps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Rank-Nullity Theorem</h4>
              <p className="text-sm text-muted-foreground mb-2">
                For any matrix: Rank + Nullity = Number of columns
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.rank} + {result.nullity} = {result.cols}
              </code>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
