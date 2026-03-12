"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

    if (rowCount > 50) {
      return { matrix: [], rows: 0, cols: 0, error: "Maximum supported matrix size is 50x50" };
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

  const examples = [
    { name: "2x2 Simple", matrix: [[1, 2], [3, 4]] },
    { name: "2x3 Rectangular", matrix: [[1, 2, 3], [4, 5, 6]] },
    { name: "3x2 Rectangular", matrix: [[1, 2], [3, 4], [5, 6]] },
    { name: "3x3 Standard", matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
    { name: "Symmetric Matrix", matrix: [[1, 2, 3], [2, 4, 5], [3, 5, 6]] },
    { name: "With Negatives", matrix: [[-1, 2], [3, -4], [-5, 6]] },
    { name: "4x4 Pattern", matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]] }
  ];

  const fillExample = (index: number) => {
    const example = examples[index];
    const exampleMatrix = example.matrix;
    const newRows = exampleMatrix.length;
    const newCols = exampleMatrix[0].length;

    setRows(newRows);
    setCols(newCols);
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
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Matrix Transpose Calculator – Find Transpose of Any Matrix</h1>
        <p className="text-muted-foreground">
          Find the transpose of any matrix instantly with our free online matrix transpose calculator. Swap rows and columns of any size matrix with a single click.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Label>Rows:</Label>
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
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
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
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

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => fillExample(idx)}>{ex.name}</Button>
            ))}
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
                  placeholder={`Example for 2x3 matrix:\n1 2 3\n4 5 6\n\nor\n\n1, 2, 3\n4, 5, 6`}
                  className="min-h-[150px] font-mono"
                />
                {textareaError && (
                  <p className="text-xs text-destructive mt-2">{textareaError}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Current matrix: {rows}x{cols} | Detected from your input
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
        </div>

        {transpose && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Original Matrix A ({rows}x{cols})</h3>
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
                <h3 className="font-semibold mb-3">Transpose A^T ({cols}x{rows})</h3>
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
                If A = [{rows}x{cols}], then A^T = [{cols}x{rows}]<br />
                A^T[i,j] = A[j,i]
              </code>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Matrix Transpose</h2>
        <p className="text-muted-foreground">
          The transpose of a matrix is created by flipping the matrix over its main diagonal – essentially swapping rows with columns. The first row becomes the first column, the second row becomes the second column, and so on. This simple operation has profound implications in linear algebra.
        </p>
        <p className="text-muted-foreground">
          Transpose is denoted by a superscript T (A^T) or sometimes a prime (A'). For square matrices, the diagonal elements stay in place while everything else reflects across the diagonal. For rectangular matrices, the dimensions flip – an m x n matrix becomes n x m.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Transpose Properties</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Basic Properties</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>(A^T)^T = A (double transpose returns original)</li>
              <li>(A + B)^T = A^T + B^T</li>
              <li>(cA)^T = c(A^T)</li>
              <li>(AB)^T = B^T A^T (order reverses!)</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Special Matrices</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Symmetric: A^T = A</li>
              <li>Skew-symmetric: A^T = -A</li>
              <li>Orthogonal: A^T = A^-1</li>
              <li>Diagonal matrices are symmetric</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 2x2 Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2], [3, 4]]</div>
              <div>A^T = [[1, 3], [2, 4]]</div>
              <div>Row 1 [1,2] becomes Column 1</div>
              <div>Row 2 [3,4] becomes Column 2</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Rectangular 2x3</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2, 3], [4, 5, 6]] (2x3)</div>
              <div>A^T = [[1, 4], [2, 5], [3, 6]] (3x2)</div>
              <div>Dimensions flip: 2x3 becomes 3x2</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Symmetric Matrix</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = [[1, 2, 3], [2, 4, 5], [3, 5, 6]]</div>
              <div>A^T = [[1, 2, 3], [2, 4, 5], [3, 5, 6]] = A</div>
              <div className="text-muted-foreground">Symmetric matrices equal their transpose!</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Product Transpose</h4>
            <div className="font-mono text-sm space-y-2">
              <div>(AB)^T = B^T A^T (not A^T B^T!)</div>
              <div>The order reverses when transposing a product</div>
              <div className="text-muted-foreground">Like removing shoes before socks</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            Symmetric matrices (where A = A^T) are incredibly important in physics and engineering. They always have real eigenvalues and orthogonal eigenvectors. The stress tensor in mechanics, the covariance matrix in statistics, and the Hamiltonian in quantum mechanics are all symmetric.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens to the diagonal during transpose?</h4>
            <p className="text-sm text-muted-foreground">
              Diagonal elements stay exactly where they are! Since they're at positions [i,i], swapping row and column indices doesn't move them. Only off-diagonal elements change positions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can any matrix be transposed?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Every matrix has a transpose, regardless of size or shape. Square or rectangular, real or complex – transpose is always defined.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a symmetric matrix?</h4>
            <p className="text-sm text-muted-foreground">
              A symmetric matrix equals its own transpose: A = A^T. This means the matrix is mirror-symmetric across its main diagonal. Distance matrices and correlation matrices are typically symmetric.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does (AB)^T = B^T A^T?</h4>
            <p className="text-sm text-muted-foreground">
              Think of it like getting dressed: you put on socks then shoes, but remove shoes then socks. Matrix operations reverse order when "undoing" – and transpose is a kind of reflection that reverses the operation order.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is transpose used in practice?</h4>
            <p className="text-sm text-muted-foreground">
              Transpose appears everywhere: solving least squares problems (A^T A), computing dot products (x^T y), converting row vectors to column vectors, and in machine learning for weight updates and gradient calculations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the transpose of a row vector?</h4>
            <p className="text-sm text-muted-foreground">
              A row vector (1 x n) transposes to a column vector (n x 1). This conversion is essential for matrix multiplication, since you can only multiply when inner dimensions match.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
