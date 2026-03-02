"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

interface ScaffoldResult {
  platformLength: number;
  platformWidth: number;
  boardLength: number;
  boardWidth: number;
  boardsNeeded: number;
  layers: number;
  totalBoards: number;
  recommendations: string[];
}

export default function ScaffoldBoardCalculatorPage() {
  const [platformLength, setPlatformLength] = useState<string>("");
  const [platformWidth, setPlatformWidth] = useState<string>("");
  const [boardLength, setBoardLength] = useState<string>("3900");
  const [boardWidth, setBoardWidth] = useState<string>("225");
  const [layers, setLayers] = useState<string>("1");
  const [unit, setUnit] = useState<string>("mm");
  const [result, setResult] = useState<ScaffoldResult | null>(null);

  const calculate = () => {
    const platLen = parseFloat(platformLength) || 0;
    const platWid = parseFloat(platformWidth) || 0;
    const boardLen = parseFloat(boardLength) || 3900;
    const boardWid = parseFloat(boardWidth) || 225;
    const layersNum = parseInt(layers) || 1;

    if (platLen === 0 || platWid === 0) return;

    // Convert platform dimensions to mm if needed
    let platLenMm = platLen;
    let platWidMm = platWid;

    if (unit === "meters") {
      platLenMm = platLen * 1000;
      platWidMm = platWid * 1000;
    } else if (unit === "feet") {
      platLenMm = platLen * 304.8;
      platWidMm = platWid * 304.8;
    }

    // Calculate boards needed across width
    const boardsAcross = Math.ceil(platWidMm / boardWid);

    // Calculate boards needed along length (boards may need to be joined)
    const boardsAlong = Math.ceil(platLenMm / boardLen);

    // Total boards per layer
    const boardsPerLayer = boardsAcross * boardsAlong;

    // Total boards for all layers
    const totalBoards = boardsPerLayer * layersNum;

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📐 Platform: ${(platLenMm/1000).toFixed(2)}m × ${(platWidMm/1000).toFixed(2)}m`);
    recommendations.push(`🪵 Board size: ${(boardLen/1000).toFixed(2)}m × ${(boardWid/1000).toFixed(3)}m`);
    recommendations.push(`📊 Boards per layer: ${boardsPerLayer}`);
    recommendations.push(`📚 Total boards (${layersNum} layer${layersNum > 1 ? 's' : ''}): ${totalBoards}`);

    if (boardsAlong > 1) {
      recommendations.push("⚠️ Boards need to be joined along length - ensure proper overlap");
      recommendations.push("🔒 Use board clips or ties to secure joints");
    }

    if (layersNum >= 2) {
      recommendations.push("✅ Multiple layers provide extra strength for heavy loads");
    }

    recommendations.push("⚠️ Always follow local scaffolding safety regulations");
    recommendations.push("🔒 Secure all boards to prevent movement");

    setResult({
      platformLength: platLenMm / 1000,
      platformWidth: platWidMm / 1000,
      boardLength: boardLen / 1000,
      boardWidth: boardWid / 1000,
      boardsNeeded: boardsPerLayer,
      layers: layersNum,
      totalBoards,
      recommendations,
    });
  };

  const reset = () => {
    setPlatformLength("");
    setPlatformWidth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Scaffold Board Calculator – Calculate Scaffold Boards Needed for Any Structure
          </h1>
          <p className="text-muted-foreground">
            Plan scaffolding safely and cost-effectively with our Scaffold Board Calculator.
            Enter platform dimensions and board size to calculate the exact number of boards
            required for your construction or maintenance project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="plat-len">Platform Length</Label>
                  <Input
                    id="plat-len"
                    type="number"
                    value={platformLength}
                    onChange={(e) => setPlatformLength(e.target.value)}
                    placeholder="6"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="plat-wid">Platform Width</Label>
                  <Input
                    id="plat-wid"
                    type="number"
                    value={platformWidth}
                    onChange={(e) => setPlatformWidth(e.target.value)}
                    placeholder="1.2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Platform Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="mm">Millimeters</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="board-len">Board Length (mm)</Label>
                  <Input
                    id="board-len"
                    type="number"
                    value={boardLength}
                    onChange={(e) => setBoardLength(e.target.value)}
                    placeholder="3900"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="board-wid">Board Width (mm)</Label>
                  <Input
                    id="board-wid"
                    type="number"
                    value={boardWidth}
                    onChange={(e) => setBoardWidth(e.target.value)}
                    placeholder="225"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="layers">Number of Layers</Label>
                <Input
                  id="layers"
                  type="number"
                  min="1"
                  value={layers}
                  onChange={(e) => setLayers(e.target.value)}
                  placeholder="1"
                />
                <p className="text-xs text-muted-foreground">
                  Multiple layers for heavy loads
                </p>
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
              <h3 className="text-lg font-semibold mb-4">Board Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Boards Needed</p>
                    <p className="text-4xl font-bold text-primary">{result.totalBoards}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.boardsNeeded} per layer × {result.layers} layer{result.layers > 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Platform Size:</span>
                      <span className="font-semibold">{result.platformLength}m × {result.platformWidth}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Board Size:</span>
                      <span className="font-semibold">{result.boardLength}m × {result.boardWidth}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Boards Across:</span>
                      <span className="font-semibold">{Math.ceil(result.platformWidth * 1000 / (result.boardWidth * 1000))}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>⚠️ Safety Notice:</strong> Always follow local scaffolding
                      regulations and have scaffolding inspected by a competent person
                      before use.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter platform dimensions and click Calculate to see requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Scaffold Board Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Standard board:</strong> 3900mm × 225mm × 38mm (L×W×T)
                  </li>
                  <li>
                    <strong>Minimum overlap:</strong> 50mm at supports
                  </li>
                  <li>
                    <strong>Maximum span:</strong> 1.2m for working platforms
                  </li>
                  <li>
                    <strong>Platform width:</strong> Minimum 600mm for working
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This calculator provides estimates only.
                  Always consult scaffolding regulations and a qualified person
                  for your specific application. Board quality and condition must
                  be inspected before each use.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
