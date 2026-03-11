"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function SvgPathEditorSimplifier() {
  const [pathData, setPathData] = useState("");
  const [tolerance, setTolerance] = useState(0.5);
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{ original: number; simplified: number } | null>(null);

  // Simplify path using Ramer-Douglas-Peucker algorithm
  const simplifyPath = (points: [number, number][], tolerance: number): [number, number][] => {
    if (points.length <= 2) return points;

    let maxDist = 0;
    let maxIndex = 0;
    const end = points.length - 1;

    for (let i = 1; i < end; i++) {
      const dist = perpendicularDistance(points[i], points[0], points[end]);
      if (dist > maxDist) {
        maxDist = dist;
        maxIndex = i;
      }
    }

    if (maxDist > tolerance) {
      const left = simplifyPath(points.slice(0, maxIndex + 1), tolerance);
      const right = simplifyPath(points.slice(maxIndex), tolerance);
      return [...left.slice(0, -1), ...right];
    } else {
      return [points[0], points[end]];
    }
  };

  const perpendicularDistance = (point: [number, number], lineStart: [number, number], lineEnd: [number, number]) => {
    const dx = lineEnd[0] - lineStart[0];
    const dy = lineEnd[1] - lineStart[1];
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return Math.sqrt((point[0] - lineStart[0]) ** 2 + (point[1] - lineStart[1]) ** 2);
    const u = ((point[0] - lineStart[0]) * dx + (point[1] - lineStart[1]) * dy) / (mag * mag);
    const x = lineStart[0] + u * dx;
    const y = lineStart[1] + u * dy;
    return Math.sqrt((point[0] - x) ** 2 + (point[1] - y) ** 2);
  };

  const parsePathData = (data: string): [number, number][] => {
    const points: [number, number][] = [];
    const regex = /[MLCQS]/gi;
    const commands = data.split(regex);
    
    for (const cmd of commands) {
      const nums = cmd.match(/-?\d*\.?\d+/g);
      if (nums && nums.length >= 2) {
        for (let i = 0; i < nums.length; i += 2) {
          if (nums[i + 1] !== undefined) {
            points.push([parseFloat(nums[i]), parseFloat(nums[i + 1])]);
          }
        }
      }
    }
    
    return points;
  };

  const generatePathData = (points: [number, number][], originalData: string): string => {
    const cmd = originalData.match(/^[MLCQS]/i)?.[0] || "L";
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
  };

  const handleSimplify = () => {
    if (!pathData) return;

    const points = parsePathData(pathData);
    const originalCount = points.length;
    
    const simplified = simplifyPath(points, tolerance);
    const simplifiedCount = simplified.length;
    
    const outputData = generatePathData(simplified, pathData);
    setOutput(outputData);
    setStats({ original: originalCount, simplified: simplifiedCount });
  };

  const handleReverse = () => {
    if (!pathData) return;
    setOutput(pathData.split("").reverse().join(""));
  };

  const handleRelativeToAbsolute = () => {
    if (!pathData) return;
    // Convert lowercase (relative) commands to uppercase (absolute)
    setOutput(pathData.replace(/([mlcqshv])([^a-z]*)/gi, (match, cmd, rest) => {
      return cmd.toUpperCase() + rest;
    }));
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setPathData("");
    setOutput("");
    setStats(null);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SVG Path Editor & Simplifier</h2>
        <p className="text-sm text-muted-foreground">
          Edit and simplify SVG path data
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="path">Path Data (d attribute)</Label>
            <textarea
              id="path"
              value={pathData}
              onChange={(e) => setPathData(e.target.value)}
              placeholder="M10 10 L50 50 L90 10 Z"
              className="w-full min-h-[100px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tolerance">Simplification Tolerance: {tolerance}</Label>
            <Input
              id="tolerance"
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={tolerance}
              onChange={(e) => setTolerance(parseFloat(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Higher values = more simplification (fewer points)
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSimplify} disabled={!pathData}>
              Simplify Path
            </Button>
            <Button onClick={handleRelativeToAbsolute} disabled={!pathData} variant="outline">
              Relative → Absolute
            </Button>
            <Button onClick={handleReverse} disabled={!pathData} variant="outline">
              Reverse
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleSimplify} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Process
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!pathData}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {stats && (
        <Card className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Original Points</div>
              <div className="text-2xl font-bold">{stats.original}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Simplified</div>
              <div className="text-2xl font-bold text-green-600">{stats.simplified}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Reduction</div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((1 - stats.simplified / stats.original) * 100)}%
              </div>
            </div>
          </div>
        </Card>
      )}

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Output Path Data</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleCopy();
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto break-all">
            {output}
          </pre>
        </Card>
      )}
    </div>
  );
}
