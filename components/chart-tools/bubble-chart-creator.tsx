"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Copy,
  Check,
  Download,
  Trash2,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
  Line,
  Cell,
} from "recharts";

interface BubbleData {
  x: number;
  y: number;
  z: number;
  label: string;
  color: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
  "#4CAF50",
  "#E91E63",
];

export default function BubbleChartCreator() {
  const [dataInput, setDataInput] = useState(
    "Product A, 10, 20, 500\nProduct B, 15, 25, 800\nProduct C, 20, 30, 1200\nProduct D, 25, 35, 600\nProduct E, 30, 40, 1500\nProduct F, 35, 45, 900\nProduct G, 40, 50, 2000\nProduct H, 45, 55, 1100",
  );
  const [chartTitle, setChartTitle] = useState("Bubble Chart Analysis");
  const [xAxisLabel, setXAxisLabel] = useState("X Value");
  const [yAxisLabel, setYAxisLabel] = useState("Y Value");
  const [sizeLabel, setSizeLabel] = useState("Size");
  const [minBubbleSize, setMinBubbleSize] = useState(10);
  const [maxBubbleSize, setMaxBubbleSize] = useState(100);
  const [showLabels, setShowLabels] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showTrendLine, setShowTrendLine] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);

  const chartData = useMemo((): BubbleData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim());
    return lines
      .map((line, idx) => {
        const parts = line.split(",").map((p) => p.trim());
        const label = parts[0] || `Point ${idx + 1}`;
        const x = parseFloat(parts[1]) || 0;
        const y = parseFloat(parts[2]) || 0;
        const z = parseFloat(parts[3]) || 10;
        return { x, y, z, label, color: COLORS[idx % COLORS.length] };
      })
      .filter((d) => !isNaN(d.x) && !isNaN(d.y));
  }, [dataInput]);

  const trendLineData = useMemo(() => {
    if (!showTrendLine || chartData.length < 2) return [];

    const n = chartData.length;
    const sumX = chartData.reduce((sum, d) => sum + d.x, 0);
    const sumY = chartData.reduce((sum, d) => sum + d.y, 0);
    const sumXY = chartData.reduce((sum, d) => sum + d.x * d.y, 0);
    const sumX2 = chartData.reduce((sum, d) => sum + d.x * d.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const minX = Math.min(...chartData.map((d) => d.x));
    const maxX = Math.max(...chartData.map((d) => d.x));

    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept },
    ];
  }, [chartData, showTrendLine]);

  const rSquared = useMemo(() => {
    if (!showTrendLine || chartData.length < 2) return null;

    const n = chartData.length;
    const sumX = chartData.reduce((sum, d) => sum + d.x, 0);
    const sumY = chartData.reduce((sum, d) => sum + d.y, 0);
    const sumXY = chartData.reduce((sum, d) => sum + d.x * d.y, 0);
    const sumX2 = chartData.reduce((sum, d) => sum + d.x * d.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const meanY = sumY / n;
    const ssTot = chartData.reduce(
      (sum, d) => sum + Math.pow(d.y - meanY, 2),
      0,
    );
    const ssRes = chartData.reduce(
      (sum, d) => sum + Math.pow(d.y - (slope * d.x + intercept), 2),
      0,
    );

    return 1 - ssRes / ssTot;
  }, [chartData, showTrendLine]);

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const downloadChart = useCallback(() => {
    alert("Download functionality would export the chart as PNG/SVG");
  }, []);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setDataInput(content);
      };
      reader.readAsText(file);
    },
    [],
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium">{data.label}</p>
          <p className="text-sm text-muted-foreground">
            {xAxisLabel}: {data.x?.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            {yAxisLabel}: {data.y?.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            {sizeLabel}: {data.z?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const statistics = useMemo(() => {
    if (chartData.length === 0) return null;

    const xValues = chartData.map((d) => d.x);
    const yValues = chartData.map((d) => d.y);
    const zValues = chartData.map((d) => d.z);

    const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const stdDev = (arr: number[]) => {
      const m = mean(arr);
      return Math.sqrt(
        arr.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / arr.length,
      );
    };

    return {
      count: chartData.length,
      xMean: mean(xValues).toFixed(2),
      xStdDev: stdDev(xValues).toFixed(2),
      yMean: mean(yValues).toFixed(2),
      yStdDev: stdDev(yValues).toFixed(2),
      zMean: mean(zValues).toFixed(2),
      zStdDev: stdDev(zValues).toFixed(2),
      zTotal: zValues.reduce((a, b) => a + b, 0).toLocaleString(),
    };
  }, [chartData]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data-input" className="text-base font-medium">
            Chart Data
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              accept=".csv,.json,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="h-7"
            >
              <Upload className="size-3.5 mr-1" />
              <span className="text-xs">Import</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => copyToClipboard(dataInput, "input")}
              className="h-7"
            >
              {copied === "input" ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span className="text-xs">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setDataInput("")}
              className="h-7"
            >
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="data-input"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="Label, X, Y, Size&#10;Product A, 10, 20, 500&#10;Product B, 15, 25, 800"
        />
        <p className="text-sm text-muted-foreground">
          Enter data as comma-separated values (label, x, y, size), one per line
        </p>
      </section>

      {/* Chart Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chart-title" className="text-sm">
              Chart Title
            </Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Enter chart title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="x-axis-label" className="text-sm">
              X-Axis Label
            </Label>
            <Input
              id="x-axis-label"
              value={xAxisLabel}
              onChange={(e) => setXAxisLabel(e.target.value)}
              placeholder="X-axis label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y-axis-label" className="text-sm">
              Y-Axis Label
            </Label>
            <Input
              id="y-axis-label"
              value={yAxisLabel}
              onChange={(e) => setYAxisLabel(e.target.value)}
              placeholder="Y-axis label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size-label" className="text-sm">
              Size Label
            </Label>
            <Input
              id="size-label"
              value={sizeLabel}
              onChange={(e) => setSizeLabel(e.target.value)}
              placeholder="Size label"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-size" className="text-sm">
              Min Bubble Size: {minBubbleSize}px
            </Label>
            <Slider
              id="min-size"
              value={[minBubbleSize]}
              onValueChange={(v) => setMinBubbleSize(v[0])}
              min={5}
              max={50}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-size" className="text-sm">
              Max Bubble Size: {maxBubbleSize}px
            </Label>
            <Slider
              id="max-size"
              value={[maxBubbleSize]}
              onValueChange={(v) => setMaxBubbleSize(v[0])}
              min={50}
              max={200}
              step={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zoom" className="text-sm">
              Zoom: {(zoom * 100).toFixed(0)}%
            </Label>
            <Slider
              id="zoom"
              value={[zoom]}
              onValueChange={(v) => setZoom(v[0])}
              min={0.5}
              max={2}
              step={0.1}
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap pt-6">
            <div className="flex items-center gap-2">
              <Switch
                id="show-labels"
                checked={showLabels}
                onCheckedChange={setShowLabels}
              />
              <Label htmlFor="show-labels" className="text-sm cursor-pointer">
                Show Labels
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="show-grid"
                checked={showGrid}
                onCheckedChange={setShowGrid}
              />
              <Label htmlFor="show-grid" className="text-sm cursor-pointer">
                Show Grid
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="show-trend"
                checked={showTrendLine}
                onCheckedChange={setShowTrendLine}
              />
              <Label htmlFor="show-trend" className="text-sm cursor-pointer">
                Trend Line
              </Label>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Chart Preview</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            >
              <ZoomOut className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
            >
              <ZoomIn className="size-3.5" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">
            {chartTitle}
          </h3>
          <div className="h-[450px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis
                    type="number"
                    dataKey="x"
                    name={xAxisLabel}
                    label={{
                      value: xAxisLabel,
                      position: "insideBottom",
                      offset: -5,
                    }}
                    domain={["auto", "auto"]}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name={yAxisLabel}
                    label={{
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                    }}
                    domain={["auto", "auto"]}
                  />
                  <ZAxis
                    type="number"
                    dataKey="z"
                    name={sizeLabel}
                    range={[minBubbleSize, maxBubbleSize]}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ strokeDasharray: "3 3" }}
                  />
                  <Legend />
                  <Scatter name="Data Points" data={chartData} fill="#8884d8">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                  {showTrendLine && trendLineData.length > 0 && (
                    <Line
                      type="monotone"
                      data={trendLineData}
                      dataKey="y"
                      stroke="#666"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  )}
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter data to see the chart
              </div>
            )}
          </div>
          {showTrendLine && rSquared !== null && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              R² = {rSquared.toFixed(4)}
            </p>
          )}
        </div>
      </section>

      {/* Statistics */}
      {statistics && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Statistics</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Data Points</p>
              <p className="text-2xl font-semibold">{statistics.count}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">{xAxisLabel} Mean</p>
              <p className="text-2xl font-semibold">{statistics.xMean}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">{yAxisLabel} Mean</p>
              <p className="text-2xl font-semibold">{statistics.yMean}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">{sizeLabel} Total</p>
              <p className="text-2xl font-semibold">{statistics.zTotal}</p>
            </div>
          </div>
        </section>
      )}

      {/* Data Summary */}
      {chartData.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Data Summary</h3>
          <div className="rounded-lg border bg-background overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Label</th>
                  <th className="p-3 text-right font-medium">{xAxisLabel}</th>
                  <th className="p-3 text-right font-medium">{yAxisLabel}</th>
                  <th className="p-3 text-right font-medium">{sizeLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {chartData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.label}</td>
                    <td className="p-3 text-right">{item.x.toFixed(2)}</td>
                    <td className="p-3 text-right">{item.y.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      {item.z.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
