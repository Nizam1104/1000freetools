"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SudokuValidator() {
  const [grid, setGrid] = useState<string[][]>(
    Array(9).fill(null).map(() => Array(9).fill(""))
  );
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const updateCell = (row: number, col: number, value: string) => {
    const newGrid = grid.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? value : c)));
    setGrid(newGrid);
    setResult(null);
  };

  const validate = () => {
    setError("");
    setResult(null);

    // Parse grid
    const parsedGrid = grid.map(row => row.map(cell => cell.trim() === "" ? 0 : parseInt(cell)));

    // Check for invalid values
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const val = parsedGrid[i][j];
        if (val !== 0 && (isNaN(val) || val < 1 || val > 9)) {
          setError(`Invalid value at row ${i + 1}, column ${j + 1}. Please enter numbers 1-9 or leave empty.`);
          return;
        }
      }
    }

    const errors: string[] = [];
    const warnings: string[] = [];
    let isValid = true;

    // Check rows
    for (let row = 0; row < 9; row++) {
      const seen = new Set<number>();
      const duplicates: number[] = [];
      for (let col = 0; col < 9; col++) {
        const val = parsedGrid[row][col];
        if (val !== 0) {
          if (seen.has(val)) {
            duplicates.push(val);
          }
          seen.add(val);
        }
      }
      if (duplicates.length > 0) {
        isValid = false;
        errors.push(`Row ${row + 1}: Duplicate values ${[...new Set(duplicates)].join(", ")}`);
      }
      if (seen.size < 9 && seen.size > 0) {
        warnings.push(`Row ${row + 1}: Incomplete (${seen.size}/9 filled)`);
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const seen = new Set<number>();
      const duplicates: number[] = [];
      for (let row = 0; row < 9; row++) {
        const val = parsedGrid[row][col];
        if (val !== 0) {
          if (seen.has(val)) {
            duplicates.push(val);
          }
          seen.add(val);
        }
      }
      if (duplicates.length > 0) {
        isValid = false;
        errors.push(`Column ${col + 1}: Duplicate values ${[...new Set(duplicates)].join(", ")}`);
      }
      if (seen.size < 9 && seen.size > 0) {
        warnings.push(`Column ${col + 1}: Incomplete (${seen.size}/9 filled)`);
      }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const seen = new Set<number>();
        const duplicates: number[] = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const row = boxRow * 3 + i;
            const col = boxCol * 3 + j;
            const val = parsedGrid[row][col];
            if (val !== 0) {
              if (seen.has(val)) {
                duplicates.push(val);
              }
              seen.add(val);
            }
          }
        }
        const boxNum = boxRow * 3 + boxCol + 1;
        if (duplicates.length > 0) {
          isValid = false;
          errors.push(`Box ${boxNum}: Duplicate values ${[...new Set(duplicates)].join(", ")}`);
        }
        if (seen.size < 9 && seen.size > 0) {
          warnings.push(`Box ${boxNum}: Incomplete (${seen.size}/9 filled)`);
        }
      }
    }

    // Count filled cells
    let filledCells = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (parsedGrid[i][j] !== 0) filledCells++;
      }
    }

    // Check if complete and valid
    const isComplete = filledCells === 81;
    const isCorrect = isValid && isComplete;

    setResult({
      isValid,
      isComplete,
      isCorrect,
      errors,
      warnings,
      filledCells,
      emptyCells: 81 - filledCells,
      progress: Math.round((filledCells / 81) * 100)
    });
  };

  const reset = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill("")));
    setResult(null);
    setError("");
  };

  const clear = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill("")));
    setResult(null);
    setError("");
  };

  const loadExample = (difficulty: "easy" | "medium" | "hard") => {
    let example: string[][];

    if (difficulty === "easy") {
      example = [
        ["5", "3", "", "", "7", "", "", "", ""],
        ["6", "", "", "1", "9", "5", "", "", ""],
        ["", "9", "8", "", "", "", "", "6", ""],
        ["8", "", "", "", "6", "", "", "", "3"],
        ["4", "", "", "8", "", "3", "", "", "1"],
        ["7", "", "", "", "2", "", "", "", "6"],
        ["", "6", "", "", "", "", "2", "8", ""],
        ["", "", "", "4", "1", "9", "", "", "5"],
        ["", "", "", "", "8", "", "", "7", "9"]
      ];
    } else if (difficulty === "medium") {
      example = [
        ["", "", "", "6", "", "", "4", "", ""],
        ["7", "", "", "", "", "3", "6", "", ""],
        ["", "", "", "", "9", "1", "", "8", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "5", "", "1", "8", "", "", "7", ""],
        ["", "", "3", "", "", "6", "", "", ""],
        ["", "8", "", "4", "", "", "", "", ""],
        ["", "2", "", "7", "", "", "", "", "9"],
        ["", "", "6", "", "", "8", "", "", ""]
      ];
    } else {
      example = [
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "3", "", "8", "5"],
        ["", "", "1", "", "2", "", "", "", ""],
        ["", "", "", "5", "", "7", "", "", ""],
        ["", "", "4", "", "", "", "1", "", ""],
        ["", "9", "", "", "", "", "", "", ""],
        ["5", "", "", "", "", "", "", "7", "3"],
        ["", "", "2", "", "1", "", "", "", ""],
        ["", "", "", "", "4", "", "", "", "9"]
      ];
    }

    setGrid(example);
    setResult(null);
    setError("");
  };

  const getCellStatus = (row: number, col: number) => {
    if (!result) return "";
    const val = grid[row][col];
    if (val.trim() === "") return "";

    const numVal = parseInt(val);

    // Check row
    for (let j = 0; j < 9; j++) {
      if (j !== col && grid[row][j] === val) return "error";
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && grid[i][col] === val) return "error";
    }

    // Check box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if ((i !== row || j !== col) && grid[i][j] === val) return "error";
      }
    }

    return "valid";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Sudoku Validator – Check Sudoku Grid Validity</h1>
        <p className="text-muted-foreground">
          Validate your Sudoku puzzle with our free online Sudoku validator. Check for duplicate numbers in rows, columns, and 3×3 boxes instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="inline-grid grid-cols-9 gap-0 border-2 border-foreground p-0.5 bg-foreground">
            {grid.map((row, ri) => (
              row.map((cell, ci) => {
                const status = getCellStatus(ri, ci);
                const boxBorderRight = (ci + 1) % 3 === 0 && ci < 8 ? "border-r-2 border-r-foreground" : "";
                const boxBorderBottom = (ri + 1) % 3 === 0 && ri < 8 ? "border-b-2 border-b-foreground" : "";

                return (
                  <input
                    key={`${ri}-${ci}`}
                    type="text"
                    maxLength={1}
                    value={cell}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^[1-9]$/.test(val)) {
                        updateCell(ri, ci, val);
                      }
                    }}
                    className={`w-10 h-10 text-center text-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary ${status === "error" ? "bg-red-100 dark:bg-red-900/30 text-red-600" :
                        status === "valid" ? "bg-green-100 dark:bg-green-900/30" :
                          "bg-background"
                      } ${boxBorderRight} ${boxBorderBottom}`}
                  />
                );
              })
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <Button onClick={validate}>Validate Sudoku</Button>
          <Button variant="outline" onClick={reset}>Reset All</Button>
          <Button variant="outline" onClick={clear}>Clear Grid</Button>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <span className="text-sm text-muted-foreground self-center">Load Example:</span>
          <Button variant="outline" size="sm" onClick={() => loadExample("easy")}>Easy</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("medium")}>Medium</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("hard")}>Hard</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isCorrect ? "bg-green-100 dark:bg-green-900/30" :
                result.isValid ? "bg-amber-100 dark:bg-amber-900/30" :
                  "bg-red-100 dark:bg-red-900/30"
              }`}>
              <p className="text-2xl font-bold mb-2">
                {result.isCorrect ? "✓ Valid & Complete Sudoku!" :
                  result.isValid ? "⚠ Valid but Incomplete" :
                    "✗ Invalid Sudoku"}
              </p>
              <p className="text-sm">
                Progress: {result.filledCells}/81 cells filled ({result.progress}%)
              </p>
              <div className="mt-4 bg-muted rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${result.isCorrect ? "bg-green-500" : "bg-primary"
                    }`}
                  style={{ width: `${result.progress}%` }}
                />
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-red-700 dark:text-red-300">Errors Found</h4>
                <ul className="space-y-1 text-sm text-red-600 dark:text-red-400">
                  {result.errors.map((err: string, i: number) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.warnings.length > 0 && (
              <div className="p-4 border border-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-amber-700 dark:text-amber-300">Status</h4>
                <ul className="space-y-1 text-sm text-amber-600 dark:text-amber-400">
                  {result.warnings.slice(0, 10).map((warn: string, i: number) => (
                    <li key={i}>• {warn}</li>
                  ))}
                  {result.warnings.length > 10 && (
                    <li>• ... and {result.warnings.length - 10} more</li>
                  )}
                </ul>
              </div>
            )}

            {result.isCorrect && (
              <div className="p-4 border border-green-300 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-green-700 dark:text-green-300">Congratulations!</h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your Sudoku puzzle is correctly solved! All rows, columns, and 3×3 boxes contain the numbers 1-9 exactly once.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Sudoku Validator Works</h2>
          <p className="text-muted-foreground mb-4">
            Sudoku is a logic-based number puzzle played on a 9×9 grid. The goal is to fill the grid so that each row, each column, and each of the nine 3×3 boxes contains the digits 1 through 9 exactly once. This validator checks your puzzle against these three fundamental rules.
          </p>
          <p className="text-muted-foreground mb-4">
            When you click "Validate," the tool performs three separate checks:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Row Check:</strong> Verifies no number repeats in any horizontal row</li>
            <li><strong>Column Check:</strong> Verifies no number repeats in any vertical column</li>
            <li><strong>Box Check:</strong> Verifies no number repeats in any 3×3 subgrid</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            The validator distinguishes between puzzles that are <em>valid but incomplete</em> (no errors but empty cells remain) and puzzles that are <em>correct and complete</em> (all 81 cells filled with no violations).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Sudoku Puzzles</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Easy Puzzle (50+ filled cells)</h3>
          <p className="text-muted-foreground mb-2">
            Good for beginners, with many given numbers:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <p>5 3 _ | _ 7 _ | _ _ _</p>
            <p>6 _ _ | 1 9 5 | _ _ _</p>
            <p>_ 9 8 | _ _ _ | _ 6 _</p>
            <p>------+-------+------</p>
            <p>8 _ _ | _ 6 _ | _ _ 3</p>
            <p>4 _ _ | 8 _ 3 | _ _ 1</p>
            <p>7 _ _ | _ 2 _ | _ _ 6</p>
            <p>_ 6 _ | _ _ _ | 2 8 _</p>
            <p>_ _ _ | 4 1 9 | _ _ 5</p>
            <p>_ _ _ | _ 8 _ | _ 7 9</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Medium Puzzle (35-45 filled cells)</h3>
          <p className="text-muted-foreground mb-2">
            Moderate challenge requiring more strategy:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <p>_ _ _ | 6 _ _ | 4 _ _</p>
            <p>7 _ _ | _ _ 3 | 6 _ _</p>
            <p>_ _ _ | _ 9 1 | _ 8 _</p>
            <p>------+-------+------</p>
            <p>_ _ _ | _ _ _ | _ _ _</p>
            <p>_ 5 _ | 1 8 _ _ 7 _</p>
            <p>_ _ 3 | _ _ 6 | _ _ _</p>
            <p>_ 8 _ | 4 _ _ _ _ _</p>
            <p>_ 2 _ | 7 _ _ _ _ 9</p>
            <p>_ _ 6 | _ _ 8 | _ _ _</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Common Error Patterns</h3>
          <p className="text-muted-foreground mb-2">
            Watch out for these frequent mistakes:
          </p>
          <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
            <p><strong>Row duplicate:</strong> Two 7s in row 3</p>
            <p><strong>Column duplicate:</strong> Two 4s in column 5</p>
            <p><strong>Box duplicate:</strong> Two 9s in the center 3×3 box</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: Sudoku's Surprising History</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              Despite its Japanese name, Sudoku wasn't invented in Japan. The puzzle was created by American architect <strong>Howard Garns</strong> in 1979 and first published as "Number Place" in Dell Magazines. It was introduced to Japan in 1984 by the puzzle company Nikoli, which gave it the name "Sūji wa dokushin ni kagiru" (numbers must be single), later shortened to "Sudoku." The puzzle became a worldwide phenomenon in 2004 when New Zealand judge <strong>Wayne Gould</strong> convinced The Times of London to publish it, sparking "Sudoku fever" across Europe and eventually the globe.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What are the basic rules of Sudoku?</h3>
              <p className="text-muted-foreground">
                Fill the 9×9 grid so that each row contains the numbers 1-9 exactly once, each column contains 1-9 exactly once, and each of the nine 3×3 boxes contains 1-9 exactly once. A proper Sudoku has only one unique solution.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can a Sudoku have multiple solutions?</h3>
              <p className="text-muted-foreground">
                A well-constructed Sudoku puzzle should have exactly one unique solution. If a puzzle has multiple valid solutions, it's considered poorly designed. Most newspaper and app puzzles are verified to have a single solution before publication.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the minimum number of clues needed?</h3>
              <p className="text-muted-foreground">
                Mathematicians proved in 2012 that a valid Sudoku needs at least <strong>17 clues</strong> (pre-filled cells) to guarantee a unique solution. Puzzles with 16 or fewer clues will always have multiple solutions. Most published puzzles have 22-35 clues depending on difficulty.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I know if my puzzle is solvable?</h3>
              <p className="text-muted-foreground">
                A valid Sudoku should be solvable using logic alone, without guessing. If you reach a point where you must guess, either you made an error earlier or the puzzle is poorly constructed. This validator helps catch errors before they cascade through your solution.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the best solving strategy for beginners?</h3>
              <p className="text-muted-foreground">
                Start with "scanning"—look for rows, columns, or boxes that are nearly complete. Use "cross-hatching" to eliminate possibilities. For each empty cell, ask: "What numbers can go here?" If only one number fits, place it. Repeat until stuck, then look for "naked pairs" or "hidden singles."
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why does my puzzle show as "valid but incomplete"?</h3>
              <p className="text-muted-foreground">
                This means you haven't made any rule violations, but you still have empty cells. This is actually good news—it means your work so far is correct! Keep filling in numbers using logic. The validator will show "Valid &amp; Complete" only when all 81 cells are filled correctly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use this validator for variant Sudoku types?</h3>
              <p className="text-muted-foreground">
                This validator checks standard 9×9 Sudoku rules. It won't validate variant puzzles like Killer Sudoku, X-Sudoku (with diagonal rules), or Jigsaw Sudoku (with irregular regions). For those variants, you'd need specialized validators that check their additional constraints.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
