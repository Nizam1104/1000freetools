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

interface WarehouseResult {
  footprint: number;
  clearHeight: number;
  totalVolume: number;
  usableVolume: number;
  utilizationRate: number;
  palletPositions: number;
  storageDensity: string;
  recommendations: string[];
}

export default function WarehouseStorageVolumeCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [clearHeight, setClearHeight] = useState<string>("");
  const [aisleType, setAisleType] = useState<string>("standard");
  const [rackingType, setRackingType] = useState<string>("selective");
  const [unit, setUnit] = useState<string>("meters");
  const [result, setResult] = useState<WarehouseResult | null>(null);

  const calculate = () => {
    const lengthNum = parseFloat(length) || 0;
    const widthNum = parseFloat(width) || 0;
    const heightNum = parseFloat(clearHeight) || 0;

    if (lengthNum === 0 || widthNum === 0 || heightNum === 0) return;

    // Convert to meters if needed
    let lengthM = lengthNum;
    let widthM = widthNum;
    let heightM = heightNum;

    if (unit === "feet") {
      lengthM = lengthNum * 0.3048;
      widthM = widthNum * 0.3048;
      heightM = heightNum * 0.3048;
    }

    // Total building volume
    const totalVolume = lengthM * widthM * heightM;

    // Aisle space factor (percentage of floor space used for aisles)
    const aisleFactors: Record<string, number> = {
      narrow: 0.25,
      standard: 0.40,
      wide: 0.50,
      vna: 0.20, // Very Narrow Aisle
    };
    const aisleFactor = aisleFactors[aisleType] || 0.40;

    // Racking utilization factor
    const rackingFactors: Record<string, number> = {
      selective: 0.45,
      driveIn: 0.65,
      pushBack: 0.55,
      palletFlow: 0.60,
      asrs: 0.75, // Automated Storage
    };
    const rackingFactor = rackingFactors[rackingType] || 0.45;

    // Usable storage volume
    const utilizationRate = (1 - aisleFactor) * rackingFactor;
    const usableVolume = totalVolume * utilizationRate;

    // Estimated pallet positions (assuming standard pallet 1.2m x 1.0m x 1.5m high per level)
    const palletVolume = 1.2 * 1.0 * 1.5;
    const levelsPossible = Math.floor(heightM / 1.8); // 1.8m per level including beam
    const palletPositions = Math.floor((usableVolume / palletVolume) * levelsPossible);

    // Storage density assessment
    let storageDensity = "";
    if (utilizationRate >= 0.50) {
      storageDensity = "High Density - Excellent space utilization";
    } else if (utilizationRate >= 0.35) {
      storageDensity = "Medium Density - Standard warehouse";
    } else {
      storageDensity = "Low Density - Consider high-density racking";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (aisleType === "wide") {
      recommendations.push("🔄 Consider narrowing aisles to increase storage capacity");
    }
    if (rackingType === "selective") {
      recommendations.push("📦 Selective racking offers best accessibility but lower density");
      recommendations.push("💡 Consider drive-in or push-back for higher density");
    }
    if (heightM > 10) {
      recommendations.push("🏗️ High ceiling - consider mezzanine or multi-level picking");
    }
    if (utilizationRate < 0.35) {
      recommendations.push("⚠️ Low utilization - audit layout for optimization");
    }

    recommendations.push(`📊 Current utilization: ${(utilizationRate * 100).toFixed(0)}%`);
    recommendations.push(`🎯 Target utilization: 40-50% for selective, 60-70% for high-density`);

    setResult({
      footprint: parseFloat((lengthM * widthM).toFixed(1)),
      clearHeight: parseFloat(heightM.toFixed(1)),
      totalVolume: parseFloat(totalVolume.toFixed(1)),
      usableVolume: parseFloat(usableVolume.toFixed(1)),
      utilizationRate: parseFloat((utilizationRate * 100).toFixed(0)),
      palletPositions,
      storageDensity,
      recommendations,
    });
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setClearHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Warehouse Storage Volume Calculator – Calculate Usable Warehouse Capacity
          </h1>
          <p className="text-muted-foreground">
            Maximize your warehouse efficiency with our Storage Volume Calculator.
            Enter building dimensions and racking configuration to calculate total
            usable storage volume and estimated pallet positions — critical for
            logistics planning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="height">Clear Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={clearHeight}
                    onChange={(e) => setClearHeight(e.target.value)}
                    placeholder="8"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aisle-type">Aisle Configuration</Label>
                <Select value={aisleType} onValueChange={setAisleType}>
                  <SelectTrigger id="aisle-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vna">VNA (Very Narrow - 1.6m)</SelectItem>
                    <SelectItem value="narrow">Narrow Aisle (2.0m)</SelectItem>
                    <SelectItem value="standard">Standard (3.0m)</SelectItem>
                    <SelectItem value="wide">Wide Aisle (3.5m+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="racking-type">Racking Type</Label>
                <Select value={rackingType} onValueChange={setRackingType}>
                  <SelectTrigger id="racking-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selective">Selective Pallet Racking</SelectItem>
                    <SelectItem value="driveIn">Drive-In Racking</SelectItem>
                    <SelectItem value="pushBack">Push-Back Racking</SelectItem>
                    <SelectItem value="palletFlow">Pallet Flow Racking</SelectItem>
                    <SelectItem value="asrs">AS/RS (Automated)</SelectItem>
                  </SelectContent>
                </Select>
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
              <h3 className="text-lg font-semibold mb-4">Warehouse Capacity</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Total Volume</p>
                      <p className="text-2xl font-bold text-primary">{result.totalVolume} m³</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Usable Volume</p>
                      <p className="text-2xl font-bold text-primary">{result.usableVolume} m³</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg text-center ${
                    result.utilizationRate >= 50 ? "bg-green-100 dark:bg-green-900/20" :
                    result.utilizationRate >= 35 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Storage Density</p>
                    <p className="text-lg font-bold">{result.storageDensity}</p>
                    <p className="text-3xl font-bold mt-2">{result.utilizationRate}% Utilization</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Footprint:</span>
                      <span className="font-semibold">{result.footprint} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Clear Height:</span>
                      <span className="font-semibold">{result.clearHeight} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Est. Pallet Positions:</span>
                      <span className="font-semibold">{result.palletPositions.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Optimization Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter warehouse dimensions to calculate capacity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Warehouse Utilization Benchmarks
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Selective racking:</strong> 35-45% utilization (best accessibility)
                  </li>
                  <li>
                    <strong>Drive-in racking:</strong> 60-70% utilization (high density)
                  </li>
                  <li>
                    <strong>Push-back:</strong> 50-60% utilization (good balance)
                  </li>
                  <li>
                    <strong>AS/RS:</strong> 70-85% utilization (maximum density)
                  </li>
                </ul>
                <p>
                  <strong>Tip:</strong> Aim for 80-85% operational capacity to allow for
                  growth and efficient picking. 100% capacity leads to congestion and
                  reduced productivity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
