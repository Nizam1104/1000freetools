"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WoodType {
  name: string;
  pricePerBoardFoot: number;
  category: string;
}

const woodTypes: WoodType[] = [
  { name: "Pine (White)", pricePerBoardFoot: 3.5, category: "Softwood" },
  { name: "Pine (Yellow)", pricePerBoardFoot: 4.0, category: "Softwood" },
  { name: "Fir (Douglas)", pricePerBoardFoot: 4.5, category: "Softwood" },
  { name: "Cedar", pricePerBoardFoot: 5.5, category: "Softwood" },
  { name: "Redwood", pricePerBoardFoot: 8.0, category: "Softwood" },
  { name: "Oak (Red)", pricePerBoardFoot: 6.5, category: "Hardwood" },
  { name: "Oak (White)", pricePerBoardFoot: 7.5, category: "Hardwood" },
  { name: "Maple (Hard)", pricePerBoardFoot: 7.0, category: "Hardwood" },
  { name: "Maple (Soft)", pricePerBoardFoot: 5.5, category: "Hardwood" },
  { name: "Cherry", pricePerBoardFoot: 8.5, category: "Hardwood" },
  { name: "Walnut", pricePerBoardFoot: 12.0, category: "Hardwood" },
  { name: "Mahogany", pricePerBoardFoot: 14.0, category: "Hardwood" },
  { name: "Teak", pricePerBoardFoot: 18.0, category: "Hardwood" },
  { name: "Poplar", pricePerBoardFoot: 4.5, category: "Hardwood" },
  { name: "Ash", pricePerBoardFoot: 6.0, category: "Hardwood" },
  { name: "Birch", pricePerBoardFoot: 5.5, category: "Hardwood" },
  { name: "Custom", pricePerBoardFoot: 0, category: "Custom" },
];

interface BoardEntry {
  id: number;
  thickness: number;
  width: number;
  length: number;
  quantity: number;
  unit: "inches" | "feet";
}

interface BoardFeetResult {
  totalBoardFeet: number;
  totalCost: number;
  boards: Array<{
    thickness: number;
    width: number;
    length: number;
    quantity: number;
    boardFeet: number;
    cost: number;
  }>;
}

export default function WoodBoardFeetCalculatorPage() {
  const [boards, setBoards] = useState<BoardEntry[]>([
    { id: 1, thickness: 1, width: 6, length: 48, quantity: 1, unit: "inches" },
  ]);
  const [selectedWood, setSelectedWood] = useState<string>("Pine (White)");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [result, setResult] = useState<BoardFeetResult | null>(null);

  const addBoard = () => {
    setBoards([...boards, {
      id: Date.now(),
      thickness: 1,
      width: 6,
      length: 48,
      quantity: 1,
      unit: "inches",
    }]);
  };

  const removeBoard = (id: number) => {
    setBoards(boards.filter((b) => b.id !== id));
  };

  const updateBoard = (id: number, field: keyof BoardEntry, value: string | number) => {
    setBoards(boards.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  const calculate = () => {
    let totalBoardFeet = 0;
    const boardResults = [];

    for (const board of boards) {
      if (board.thickness === 0 || board.width === 0 || board.length === 0) continue;

      let lengthInInches = board.length;
      if (board.unit === "feet") {
        lengthInInches = board.length * 12;
      }

      // Board feet formula: (Thickness × Width × Length) / 144
      // All dimensions in inches
      const boardFeet = (board.thickness * board.width * lengthInInches) / 144;
      const totalForBoard = boardFeet * board.quantity;
      totalBoardFeet += totalForBoard;

      boardResults.push({
        thickness: board.thickness,
        width: board.width,
        length: board.length,
        quantity: board.quantity,
        boardFeet: parseFloat(totalForBoard.toFixed(3)),
        cost: 0,
      });
    }

    // Calculate cost
    const woodType = woodTypes.find((w) => w.name === selectedWood);
    let pricePerBF = woodType?.pricePerBoardFoot || 0;

    if (selectedWood === "Custom" && customPrice) {
      pricePerBF = parseFloat(customPrice);
    }

    const totalCost = totalBoardFeet * pricePerBF;

    // Update costs in board results
    const boardResultsWithCost = boardResults.map((b) => ({
      ...b,
      cost: parseFloat((b.boardFeet * pricePerBF).toFixed(2)),
    }));

    setResult({
      totalBoardFeet: parseFloat(totalBoardFeet.toFixed(3)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      boards: boardResultsWithCost,
    });
  };

  const reset = () => {
    setBoards([{ id: 1, thickness: 1, width: 6, length: 48, quantity: 1, unit: "inches" }]);
    setSelectedWood("Pine (White)");
    setCustomPrice("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Wood Board Feet Calculator – Calculate Lumber Board Footage Instantly
          </h1>
          <p className="text-muted-foreground">
            Price and plan your woodworking projects accurately with our Wood Board Feet Calculator.
            Enter the thickness, width, and length of each board to calculate total board feet —
            the standard unit for buying and selling lumber.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wood-type">Wood Type</Label>
                <Select value={selectedWood} onValueChange={setSelectedWood}>
                  <SelectTrigger id="wood-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {woodTypes.map((wood) => (
                      <SelectItem key={wood.name} value={wood.name}>
                        {wood.name} - ${wood.pricePerBoardFoot}/BF ({wood.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedWood === "Custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-price">Price per Board Foot ($)</Label>
                  <Input
                    id="custom-price"
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              )}

              <div className="flex justify-between items-center">
                <Label>Boards</Label>
                <Button type="button" variant="outline" size="sm" onClick={addBoard}>
                  + Add Board
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {boards.map((board) => (
                  <div key={board.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Board</span>
                      {boards.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBoard(board.id)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Thickness (in)</Label>
                        <Input
                          type="number"
                          step="0.25"
                          value={board.thickness}
                          onChange={(e) => updateBoard(board.id, "thickness", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Width (in)</Label>
                        <Input
                          type="number"
                          value={board.width}
                          onChange={(e) => updateBoard(board.id, "width", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Length</Label>
                        <Input
                          type="number"
                          value={board.length}
                          onChange={(e) => updateBoard(board.id, "length", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={board.quantity}
                          onChange={(e) => updateBoard(board.id, "quantity", parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Unit</Label>
                        <Select
                          value={board.unit}
                          onValueChange={(value: "inches" | "feet") => updateBoard(board.id, "unit", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inches">inches</SelectItem>
                            <SelectItem value="feet">feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Total Board Feet</p>
                      <p className="text-3xl font-bold text-primary">{result.totalBoardFeet}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="text-3xl font-bold text-primary">${result.totalCost}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Board Breakdown</h4>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {result.boards.map((board, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>
                            {board.thickness}&quot; × {board.width}&quot; × {board.length}&quot; × {board.quantity}
                          </span>
                          <span>{board.boardFeet} BF (${board.cost})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Formula:</strong> Board Feet = (Thickness × Width × Length) / 144
                      <br />
                      <span className="text-xs">All dimensions in inches</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add boards and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Board Feet
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  A <strong>board foot</strong> is a unit of volume used in the lumber industry,
                  equal to a board 1 inch thick, 12 inches wide, and 12 inches long (144 cubic inches).
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> (Thickness&quot; × Width&quot; × Length&apos;) / 144 = Board Feet
                  </li>
                  <li>
                    <strong>Note:</strong> Nominal dimensions (e.g., 2×4) differ from actual
                    dimensions (e.g., 1.5&quot; × 3.5&quot;). Use actual dimensions for accurate calculations.
                  </li>
                  <li>
                    <strong>Common thicknesses:</strong> 4/4 (1&quot;), 5/4 (1.25&quot;), 8/4 (2&quot;), 12/4 (3&quot;)
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Always add 10-20% extra for waste, cuts, and defects
                  when ordering lumber.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Board Feet</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Add Board Dimensions</h3>
                <p className="text-sm text-muted-foreground">Enter thickness, width, and length for each board. Add multiple boards as needed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Select Wood Type</h3>
                <p className="text-sm text-muted-foreground">Choose from common lumber species to get cost estimates per board foot.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Total & Cost</h3>
                <p className="text-sm text-muted-foreground">See total board feet and estimated cost for your lumber order.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This Board Feet Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Multiple Board Support**</h3>
              <p className="text-sm text-muted-foreground">Add and calculate board feet for multiple pieces of different sizes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Wood Type Database**</h3>
              <p className="text-sm text-muted-foreground">15+ common wood species with current pricing for cost estimates.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Flexible Units**</h3>
              <p className="text-sm text-muted-foreground">Enter dimensions in inches or feet with automatic conversion.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Detailed Breakdown**</h3>
              <p className="text-sm text-muted-foreground">See board feet and cost for each piece plus totals.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is a board foot?</h3>
              <p className="text-sm text-muted-foreground">A board foot is a volume measurement for lumber equal to 144 cubic inches (12&quot; × 12&quot; × 1&quot;). It&apos;s the standard unit for buying and selling hardwood lumber.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How do you calculate board feet?</h3>
              <p className="text-sm text-muted-foreground">Board Feet = (Thickness&quot; × Width&quot; × Length&apos;) / 12. For example, a 2&quot; × 6&quot; × 8&apos; board = (2 × 6 × 8) / 12 = 8 board feet.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Why is lumber sold by board foot?</h3>
              <p className="text-sm text-muted-foreground">Board feet measures volume, not just length. This accounts for thickness and width variations, ensuring fair pricing for different lumber dimensions.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What&apos;s the difference between hardwood and softwood?</h3>
              <p className="text-sm text-muted-foreground">Hardwoods (oak, maple, walnut) come from deciduous trees and are typically harder. Softwoods (pine, fir, cedar) come from conifers. Hardwoods are usually sold by board foot; softwoods by linear foot.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How much waste should I add?</h3>
              <p className="text-sm text-muted-foreground">Add 10-15% for simple projects, 20%+ for complex cuts or figured wood. This accounts for cutting waste, defects, and grain matching.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/volume-of-cylinder-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Volume of Cylinder Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate volume for round stock and logs.</p>
            </a>
            <a href="/calculators/volume-of-cuboid-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Volume of Cuboid Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate volume for rectangular objects.</p>
            </a>
            <a href="/calculators/flooring-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Flooring Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate flooring materials for home projects.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
