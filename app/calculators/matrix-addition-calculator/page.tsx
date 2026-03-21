"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatrixAdditionCalculator() {
  const [sizeA, setSizeA] = useState<{ rows: number; cols: number }>({ rows: 2, cols: 2 });
  const [sizeB, setSizeB] = useState<{ rows: number; cols: number }>({ rows: 2, cols: 2 });
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"textarea" | "row">("textarea");
  
  // Matrix A input states
  const [textareaAValue, setTextareaAValue] = useState("1, 2\n3, 4");
  const [rowInputsA, setRowInputsA] = useState<string[]>(["1, 2", "3, 4"]);
  const [textareaAError, setTextareaAError] = useState("");
  
  // Matrix B input states
  const [textareaBValue, setTextareaBValue] = useState("5, 6\n7, 8");
  const [rowInputsB, setRowInputsB] = useState<string[]>(["5, 6", "7, 8"]);
  const [textareaBError, setTextareaBError] = useState("");

  const parseMatrixInput = (text: string): { matrix: number[][]; rows: number; cols: number; error: string } => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { matrix: [], rows: 0, cols: 0, error: "" };
    }

    const rows = trimmed.split("\n").filter(row => row.trim());
    if (rows.length === 0) {
      return { matrix: [], rows: 0, cols: 0, error: "Please enter matrix values" };
    }

    const parsedRows: number[][] = [];
    let expectedCols: number | null = null;

    for (const row of rows) {
      const values = row.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));
      
      if (numbers.some(n => isNaN(n))) {
        return { matrix: [], rows: 0, cols: 0, error: "Invalid number detected. Please enter only numeric values." };
      }
      
      if (expectedCols === null) {
        expectedCols = numbers.length;
      } else if (numbers.length !== expectedCols) {
        return {
          matrix: [],
          rows: 0,
          cols: 0,
          error: `All rows must have the same number of elements. Expected ${expectedCols} columns.`
        };
      }
      
      if (numbers.length > 10) {
        return { matrix: [], rows: 0, cols: 0, error: "Maximum supported matrix size is 10×10" };
      }
      
      parsedRows.push(numbers);
    }

    if (parsedRows.length > 10) {
      return { matrix: [], rows: 0, cols: 0, error: "Maximum supported matrix size is 10×10" };
    }

    return { matrix: parsedRows, rows: parsedRows.length, cols: parsedRows[0]?.length || 0, error: "" };
  };

  const handleTextareaChange = (value: string, matrix: "A" | "B") => {
    if (matrix === "A") {
      setTextareaAValue(value);
      const result = parseMatrixInput(value);
      setTextareaAError("");
      if (result.matrix.length > 0 && !result.error) {
        setMatrixA(result.matrix);
        setSizeA({ rows: result.rows, cols: result.cols });
        setResult(null);
      }
    } else {
      setTextareaBValue(value);
      const result = parseMatrixInput(value);
      setTextareaBError("");
      if (result.matrix.length > 0 && !result.error) {
        setMatrixB(result.matrix);
        setSizeB({ rows: result.rows, cols: result.cols });
        setResult(null);
      }
    }
  };

  const parseRowInput = (rowIndex: number, value: string, matrix: "A" | "B"): { matrix: number[][]; error: string } => {
    if (matrix === "A") {
      const newRowInputs = [...rowInputsA];
      newRowInputs[rowIndex] = value;
      setRowInputsA(newRowInputs);

      const values = value.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));

      if (values.length > 0 && numbers.some(n => isNaN(n))) {
        return { matrix: [], error: `Row ${rowIndex + 1} contains invalid numbers` };
      }

      const newMatrix = matrixA.map((r, ri) => {
        if (ri === rowIndex) {
          const newRow = Array(sizeA.cols).fill(0);
          for (let i = 0; i < Math.min(numbers.length, sizeA.cols); i++) {
            newRow[i] = numbers[i];
          }
          return newRow;
        }
        return r;
      });

      return { matrix: newMatrix, error: "" };
    } else {
      const newRowInputs = [...rowInputsB];
      newRowInputs[rowIndex] = value;
      setRowInputsB(newRowInputs);

      const values = value.split(/[\s,]+/).filter(v => v.trim());
      const numbers = values.map(v => parseFloat(v));

      if (values.length > 0 && numbers.some(n => isNaN(n))) {
        return { matrix: [], error: `Row ${rowIndex + 1} contains invalid numbers` };
      }

      const newMatrix = matrixB.map((r, ri) => {
        if (ri === rowIndex) {
          const newRow = Array(sizeB.cols).fill(0);
          for (let i = 0; i < Math.min(numbers.length, sizeB.cols); i++) {
            newRow[i] = numbers[i];
          }
          return newRow;
        }
        return r;
      });

      return { matrix: newMatrix, error: "" };
    }
  };

  const handleSizeChange = (newRows: number, newCols: number, matrix: "A" | "B") => {
    const newMatrix = Array(newRows).fill(0).map((_, ri) =>
      Array(newCols).fill(0).map((_, ci) => {
        const sourceMatrix = matrix === "A" ? matrixA : matrixB;
        const sourceSize = matrix === "A" ? sizeA : sizeB;
        return ri < sourceSize.rows && ci < sourceSize.cols ? sourceMatrix[ri][ci] : 0;
      })
    );

    if (matrix === "A") {
      setMatrixA(newMatrix);
      setSizeA({ rows: newRows, cols: newCols });
      setRowInputsA(Array(newRows).fill("").map((_, i) =>
        i < rowInputsA.length ? rowInputsA[i] : ""
      ));
    } else {
      setMatrixB(newMatrix);
      setSizeB({ rows: newRows, cols: newCols });
      setRowInputsB(Array(newRows).fill("").map((_, i) =>
        i < rowInputsB.length ? rowInputsB[i] : ""
      ));
    }
    setResult(null);
  };

  const calculate = () => {
    if (inputMode === "textarea") {
      const resultA = parseMatrixInput(textareaAValue);
      const resultB = parseMatrixInput(textareaBValue);
      
      if (resultA.error) {
        setTextareaAError(resultA.error);
        return;
      }
      if (resultB.error) {
        setTextareaBError(resultB.error);
        return;
      }
      
      if (resultA.matrix.length > 0) {
        setMatrixA(resultA.matrix);
        setSizeA({ rows: resultA.rows, cols: resultA.cols });
      }
      if (resultB.matrix.length > 0) {
        setMatrixB(resultB.matrix);
        setSizeB({ rows: resultB.rows, cols: resultB.cols });
      }
    }

    if (matrixA.length === 0 || matrixB.length === 0) {
      setError("Please enter both matrices");
      return;
    }

    if (sizeA.rows !== sizeB.rows || sizeA.cols !== sizeB.cols) {
      setError(`Matrices must have the same dimensions. Matrix A is ${sizeA.rows}×${sizeA.cols}, Matrix B is ${sizeB.rows}×${sizeB.cols}`);
      return;
    }

    const sum: number[][] = matrixA.map((row, i) =>
      row.map((val, j) => val + matrixB[i][j])
    );

    setResult(sum);
    setError("");
    setTextareaAError("");
    setTextareaBError("");
  };

  const reset = () => {
    setMatrixA([[0, 0], [0, 0]]);
    setMatrixB([[0, 0], [0, 0]]);
    setSizeA({ rows: 2, cols: 2 });
    setSizeB({ rows: 2, cols: 2 });
    setResult(null);
    setError("");
    setTextareaAValue("1, 2\n3, 4");
    setTextareaBValue("5, 6\n7, 8");
    setRowInputsA(["1, 2", "3, 4"]);
    setRowInputsB(["5, 6", "7, 8"]);
    setTextareaAError("");
    setTextareaBError("");
  };

  const fillExample = () => {
    const exampleA = [[1, 2], [3, 4]];
    const exampleB = [[5, 6], [7, 8]];
    
    setMatrixA(exampleA);
    setMatrixB(exampleB);
    setSizeA({ rows: 2, cols: 2 });
    setSizeB({ rows: 2, cols: 2 });

    if (inputMode === "textarea") {
      setTextareaAValue(exampleA.map(row => row.join(", ")).join("\n"));
      setTextareaBValue(exampleB.map(row => row.join(", ")).join("\n"));
    } else {
      setRowInputsA(exampleA.map(row => row.join(", ")));
      setRowInputsB(exampleB.map(row => row.join(", ")));
    }

    setResult(null);
    setError("");
    setTextareaAError("");
    setTextareaBError("");
  };

  const renderSizeButtons = (matrix: "A" | "B") => {
    const currentSize = matrix === "A" ? sizeA : sizeB;
    return (
      <div className="flex gap-2 flex-wrap">
        {[2, 3, 4].map((n) => (
          <Button
            key={n}
            variant={currentSize.rows === n && currentSize.cols === n ? "default" : "outline"}
            size="sm"
            onClick={() => handleSizeChange(n, n, matrix)}
            className="w-10"
          >
            {n}×{n}
          </Button>
        ))}
        <span className="text-xs text-muted-foreground self-center">or custom</span>
        <Input
          type="number"
          min="1"
          max="10"
          className="w-16 h-8"
          value={currentSize.rows}
          onChange={(e) => handleSizeChange(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)), currentSize.cols, matrix)}
          placeholder="rows"
        />
        <span className="self-center text-sm">×</span>
        <Input
          type="number"
          min="1"
          max="10"
          className="w-16 h-8"
          value={currentSize.cols}
          onChange={(e) => handleSizeChange(currentSize.rows, Math.max(1, Math.min(10, parseInt(e.target.value) || 1)), matrix)}
          placeholder="cols"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Matrix A Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Label className="font-semibold">Matrix A Size:</Label>
                {renderSizeButtons("A")}
              </div>

              <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "textarea" | "row")}>
                <TabsList>
                  <TabsTrigger value="textarea">Text Area Input</TabsTrigger>
                  <TabsTrigger value="row">Row-by-Row Input</TabsTrigger>
                </TabsList>

                <TabsContent value="textarea" className="space-y-4">
                  <div>
                    <Label>Enter Matrix A values (each row on a new line, values separated by spaces or commas)</Label>
                    <Textarea
                      value={textareaAValue}
                      onChange={(e) => handleTextareaChange(e.target.value, "A")}
                      placeholder={`Example for 2×2 matrix:\n1 2\n3 4\n\nor\n\n1, 2\n3, 4`}
                      className="min-h-[120px] font-mono"
                    />
                    {textareaAError && (
                      <p className="text-xs text-destructive mt-2">{textareaAError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Current Matrix A: {sizeA.rows}×{sizeA.cols}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="row" className="space-y-4">
                  <div className="space-y-3">
                    <Label>Enter each row for Matrix A (comma or space separated values)</Label>
                    {rowInputsA.map((rowValue, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-2">
                        <Label className="w-16 text-right">Row {rowIndex + 1}:</Label>
                        <Input
                          value={rowValue}
                          onChange={(e) => {
                            const result = parseRowInput(rowIndex, e.target.value, "A");
                            if (result.matrix.length > 0) {
                              setMatrixA(result.matrix);
                            }
                          }}
                          placeholder={`Enter ${sizeA.cols} values for row ${rowIndex + 1}`}
                          className="flex-1 font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Matrix B Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Label className="font-semibold">Matrix B Size:</Label>
                {renderSizeButtons("B")}
              </div>

              <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "textarea" | "row")}>
                <TabsList>
                  <TabsTrigger value="textarea">Text Area Input</TabsTrigger>
                  <TabsTrigger value="row">Row-by-Row Input</TabsTrigger>
                </TabsList>

                <TabsContent value="textarea" className="space-y-4">
                  <div>
                    <Label>Enter Matrix B values (each row on a new line, values separated by spaces or commas)</Label>
                    <Textarea
                      value={textareaBValue}
                      onChange={(e) => handleTextareaChange(e.target.value, "B")}
                      placeholder={`Example for 2×2 matrix:\n5 6\n7 8\n\nor\n\n5, 6\n7, 8`}
                      className="min-h-[120px] font-mono"
                    />
                    {textareaBError && (
                      <p className="text-xs text-destructive mt-2">{textareaBError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Current Matrix B: {sizeB.rows}×{sizeB.cols}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="row" className="space-y-4">
                  <div className="space-y-3">
                    <Label>Enter each row for Matrix B (comma or space separated values)</Label>
                    {rowInputsB.map((rowValue, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-2">
                        <Label className="w-16 text-right">Row {rowIndex + 1}:</Label>
                        <Input
                          value={rowValue}
                          onChange={(e) => {
                            const result = parseRowInput(rowIndex, e.target.value, "B");
                            if (result.matrix.length > 0) {
                              setMatrixB(result.matrix);
                            }
                          }}
                          placeholder={`Enter ${sizeB.cols} values for row ${rowIndex + 1}`}
                          className="flex-1 font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate} disabled={matrixA.length === 0 || matrixB.length === 0}>Add Matrices</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
              <Button variant="outline" onClick={fillExample}>Load Example</Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">Result (A + B)</p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Matrix A</p>
                  <div className="font-mono text-sm">
                    {matrixA.map((row, i) => (
                      <div key={i}>{row.join("  ")}</div>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-bold">+</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Matrix B</p>
                  <div className="font-mono text-sm">
                    {matrixB.map((row, i) => (
                      <div key={i}>{row.join("  ")}</div>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-bold">=</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Result</p>
                  <div className="font-mono text-lg font-bold">
                    {result.map((row, i) => (
                      <div key={i}>{row.join("  ")}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                <div>Adding corresponding elements from each matrix:</div>
                {result.map((row, i) => (
                  <div key={i}>
                    Row {i + 1}: [{matrixA[i].map((_, j) => `${matrixA[i][j]} + ${matrixB[i][j]} = ${result[i][j]}`).join(", ")}]
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Matrix Addition?</h2>
        <p className="text-muted-foreground">
          Matrix addition is the operation of adding two matrices of the same dimensions by adding their corresponding elements. If matrix A and matrix B both have dimensions m×n, their sum C = A + B also has dimensions m×n, where each element cᵢⱼ = aᵢⱼ + bᵢⱼ.
        </p>
        <p className="text-muted-foreground">
          Matrix addition is only defined for matrices of the same size. You cannot add matrices with different dimensions.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Matrix Addition Formula</h2>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">General Formula</h3>
          <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
            If A = [aᵢⱼ] and B = [bᵢⱼ], then C = A + B = [aᵢⱼ + bᵢⱼ]
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            Each element in the result is the sum of corresponding elements from the input matrices
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2×2 Example</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              [a b]   [e f]   [a+e  b+f]<br />
              [c d] + [g h] = [c+g  d+h]
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">3×3 Example</h3>
            <code className="text-xs font-mono bg-muted px-3 py-2 rounded block">
              [a b c]   [j k l]   [a+j  b+k  c+l]<br />
              [d e f] + [m n o] = [d+m  e+n  f+o]<br />
              [g h i]   [p q r]   [g+p  h+q  i+r]
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Matrix Addition</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Commutative:</strong> A + B = B + A</li>
              <li>• <strong>Associative:</strong> (A + B) + C = A + (B + C)</li>
              <li>• <strong>Identity:</strong> A + 0 = A (zero matrix)</li>
              <li>• <strong>Inverse:</strong> A + (-A) = 0</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Both matrices must have same dimensions</li>
              <li>• Same number of rows</li>
              <li>• Same number of columns</li>
              <li>• Result has the same dimensions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What happens if matrices have different sizes?</h3>
            <p className="text-sm text-muted-foreground">
              Matrix addition is only defined for matrices of the same dimensions. If A is 2×3 and B is 3×2, they cannot be added. The calculator will show an error message indicating the dimension mismatch.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I add more than two matrices?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Matrix addition is associative, so you can add multiple matrices: A + B + C = (A + B) + C. All matrices must have the same dimensions.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the zero matrix?</h3>
            <p className="text-sm text-muted-foreground">
              A zero matrix has all elements equal to zero. Adding a zero matrix to any matrix A gives A unchanged. It's the additive identity for matrices.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is matrix addition commutative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. A + B = B + A for any matrices of the same size. The order doesn't matter because you're just adding numbers at each position.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
