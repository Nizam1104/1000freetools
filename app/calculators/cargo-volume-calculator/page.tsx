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

interface PackageType {
  name: string;
  length: number;
  width: number;
  height: number;
  quantity: number;
  unit: "in" | "cm";
}

interface ContainerSize {
  name: string;
  length: number;
  width: number;
  height: number;
  volume: number;
  maxWeight: number;
}

const containerSizes: ContainerSize[] = [
  { name: "20ft Standard", length: 5898, width: 2352, height: 2393, volume: 33.2, maxWeight: 28200 },
  { name: "40ft Standard", length: 12032, width: 2352, height: 2393, volume: 67.7, maxWeight: 28600 },
  { name: "40ft High Cube", length: 12032, width: 2352, height: 2698, volume: 76.4, maxWeight: 28600 },
  { name: "45ft High Cube", length: 13716, width: 2352, height: 2698, volume: 86.1, maxWeight: 29500 },
];

interface CargoResult {
  totalVolume: number;
  totalWeight: number;
  chargeableWeight: number;
  volumetricWeight: number;
  packages: Array<{
    name: string;
    volume: number;
    totalVolume: number;
  }>;
  containerFit: Array<{
    container: string;
    fits: boolean;
    utilization: number;
  }>;
}

export default function CargoVolumeCalculatorPage() {
  const [packages, setPackages] = useState<PackageType[]>([
    { name: "Package 1", length: 0, width: 0, height: 0, quantity: 1, unit: "cm" },
  ]);
  const [freightType, setFreightType] = useState<string>("air");
  const [result, setResult] = useState<CargoResult | null>(null);

  const addPackage = () => {
    setPackages([...packages, {
      name: `Package ${packages.length + 1}`,
      length: 0,
      width: 0,
      height: 0,
      quantity: 1,
      unit: "cm",
    }]);
  };

  const removePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const updatePackage = (index: number, field: keyof PackageType, value: string | number) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setPackages(newPackages);
  };

  const calculate = () => {
    let totalVolume = 0;
    let totalWeight = 0;
    const packageResults = [];

    for (const pkg of packages) {
      if (pkg.length === 0 || pkg.width === 0 || pkg.height === 0) continue;

      // Convert to cm if in inches
      const length = pkg.unit === "in" ? pkg.length * 2.54 : pkg.length;
      const width = pkg.unit === "in" ? pkg.width * 2.54 : pkg.width;
      const height = pkg.unit === "in" ? pkg.height * 2.54 : pkg.height;

      const volume = (length * width * height) / 1000000; // Convert to cubic meters
      const totalPkgVolume = volume * pkg.quantity;

      totalVolume += totalPkgVolume;
      packageResults.push({
        name: pkg.name,
        volume: parseFloat(volume.toFixed(4)),
        totalVolume: parseFloat(totalPkgVolume.toFixed(4)),
      });
    }

    // Volumetric weight calculation (air freight: 1 CBM = 167 kg, sea freight: 1 CBM = 1000 kg)
    const volumetricWeight = freightType === "air" ? totalVolume * 167 : totalVolume * 1000;
    
    // Chargeable weight is the greater of actual or volumetric weight
    const chargeableWeight = Math.max(totalWeight, volumetricWeight);

    // Check container fit
    const containerFit = containerSizes.map((container) => ({
      container: container.name,
      fits: totalVolume <= container.volume,
      utilization: parseFloat(((totalVolume / container.volume) * 100).toFixed(1)),
    }));

    setResult({
      totalVolume: parseFloat(totalVolume.toFixed(4)),
      totalWeight,
      chargeableWeight: parseFloat(chargeableWeight.toFixed(2)),
      volumetricWeight: parseFloat(volumetricWeight.toFixed(2)),
      packages: packageResults,
      containerFit,
    });
  };

  const reset = () => {
    setPackages([{ name: "Package 1", length: 0, width: 0, height: 0, quantity: 1, unit: "cm" }]);
    setFreightType("air");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Cargo Volume Calculator – Calculate Total Shipment Volume & Chargeable Weight
          </h1>
          <p className="text-muted-foreground">
            Plan and price your freight accurately with our Cargo Volume Calculator.
            Enter dimensions and quantities for multiple package types to calculate total
            cargo volume in CBM and chargeable weight — supporting air, ocean, and road freight planning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="freight-type">Freight Type</Label>
                <Select value={freightType} onValueChange={setFreightType}>
                  <SelectTrigger id="freight-type">
                    <SelectValue placeholder="Select freight type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="air">Air Freight (1 CBM = 167 kg)</SelectItem>
                    <SelectItem value="sea">Sea Freight (1 CBM = 1000 kg)</SelectItem>
                    <SelectItem value="road">Road Freight (1 CBM = 333 kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Packages</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPackage}>
                    + Add Package
                  </Button>
                </div>

                {packages.map((pkg, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <Input
                        value={pkg.name}
                        onChange={(e) => updatePackage(index, "name", e.target.value)}
                        className="w-32"
                        placeholder="Package name"
                      />
                      {packages.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePackage(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Length</Label>
                        <Input
                          type="number"
                          value={pkg.length || ""}
                          onChange={(e) => updatePackage(index, "length", parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Width</Label>
                        <Input
                          type="number"
                          value={pkg.width || ""}
                          onChange={(e) => updatePackage(index, "width", parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Height</Label>
                        <Input
                          type="number"
                          value={pkg.height || ""}
                          onChange={(e) => updatePackage(index, "height", parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={pkg.quantity}
                          onChange={(e) => updatePackage(index, "quantity", parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Unit</Label>
                        <Select
                          value={pkg.unit}
                          onValueChange={(value: "in" | "cm") => updatePackage(index, "unit", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="in">inches</SelectItem>
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
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Volume</p>
                      <p className="text-2xl font-bold text-primary">{result.totalVolume} CBM</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Chargeable Weight</p>
                      <p className="text-2xl font-bold text-primary">{result.chargeableWeight} kg</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volumetric Weight:</span>
                      <span className="font-semibold">{result.volumetricWeight} kg</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Package Breakdown</h4>
                    <div className="space-y-1 text-sm">
                      {result.packages.map((pkg, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded">
                          <span>{pkg.name}</span>
                          <span>{pkg.totalVolume} CBM</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Container Fit Analysis</h4>
                    <div className="space-y-2">
                      {result.containerFit.map((fit, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg flex justify-between items-center ${
                            fit.fits ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                          }`}
                        >
                          <span className="text-sm font-medium">{fit.container}</span>
                          <span className={`text-sm ${fit.fits ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                            {fit.fits ? `✓ Fits (${fit.utilization}% full)` : `✗ Too large (${fit.utilization}%)`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add packages and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Cargo Volume & Chargeable Weight
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Freight carriers charge based on the greater of actual weight or volumetric
                  (dimensional) weight. This ensures fair pricing for both heavy dense items
                  and lightweight bulky items.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Air Freight:</strong> 1 CBM = 167 kg (1:6000 ratio)
                  </li>
                  <li>
                    <strong>Sea Freight (LCL):</strong> 1 CBM = 1000 kg (1:1000 ratio)
                  </li>
                  <li>
                    <strong>Road Freight:</strong> 1 CBM = 333 kg (1:3000 ratio)
                  </li>
                </ul>
                <p>
                  <strong>CBM (Cubic Meter):</strong> The standard unit for measuring cargo volume.
                  Calculate as: (Length × Width × Height) / 1,000,000 for dimensions in centimeters.
                </p>
                <p>
                  Always compare your cargo volume against standard container sizes to optimize
                  shipping costs and ensure proper container selection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
