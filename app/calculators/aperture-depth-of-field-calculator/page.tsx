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

interface DOFResult {
  aperture: number;
  focalLength: number;
  subjectDistance: number;
  sensorSize: string;
  nearLimit: number;
  farLimit: number;
  totalDOF: number;
  hyperfocal: number;
  backgroundBlur: string;
  recommendations: string[];
}

export default function ApertureDepthOfFieldCalculatorPage() {
  const [aperture, setAperture] = useState<string>("2.8");
  const [focalLength, setFocalLength] = useState<string>("");
  const [subjectDistance, setSubjectDistance] = useState<string>("");
  const [sensorSize, setSensorSize] = useState<string>("fullframe");
  const [result, setResult] = useState<DOFResult | null>(null);

  const calculate = () => {
    const fNum = parseFloat(aperture) || 2.8;
    const flNum = parseFloat(focalLength) || 50;
    const distNum = parseFloat(subjectDistance) || 5;

    // Circle of confusion based on sensor size
    const cocValues: Record<string, number> = {
      fullframe: 0.030,
      apsc: 0.020,
      m43: 0.015,
      oneInch: 0.011,
    };
    const coc = cocValues[sensorSize] || 0.030;

    // Hyperfocal distance: H = (f²) / (N × c) + f
    // where f = focal length, N = f-number, c = CoC
    const hyperfocal = ((flNum * flNum) / (fNum * coc * 1000)) + (flNum / 1000);

    // Near limit of DOF: Dn = (H × s) / (H + (s - f))
    const nearLimit = (hyperfocal * distNum) / (hyperfocal + (distNum - flNum / 1000));

    // Far limit of DOF: Df = (H × s) / (H - (s - f))
    let farLimit = 0;
    if (hyperfocal > distNum) {
      farLimit = (hyperfocal * distNum) / (hyperfocal - (distNum - flNum / 1000));
    } else {
      farLimit = Infinity;
    }

    // Total DOF
    const totalDOF = farLimit === Infinity ? Infinity : farLimit - nearLimit;

    // Background blur assessment
    let backgroundBlur = "";
    if (fNum <= 2 && flNum >= 85) {
      backgroundBlur = "Very strong - Creamy bokeh";
    } else if (fNum <= 2.8) {
      backgroundBlur = "Strong - Nice background separation";
    } else if (fNum <= 5.6) {
      backgroundBlur = "Moderate - Some background detail visible";
    } else {
      backgroundBlur = "Weak - Most of scene in focus";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📷 Near limit: ${nearLimit.toFixed(2)}m`);
    recommendations.push(`📷 Far limit: ${farLimit === Infinity ? '∞ (infinity)' : farLimit.toFixed(2) + 'm'}`);
    recommendations.push(`📏 Total DOF: ${totalDOF === Infinity ? '∞' : totalDOF.toFixed(2) + 'm'}`);

    if (distNum >= hyperfocal) {
      recommendations.push("✅ Subject at or beyond hyperfocal - maximum DOF");
    }

    if (fNum <= 2.8 && flNum >= 50) {
      recommendations.push("👤 Great for portraits - subject isolation");
    }

    if (fNum >= 8) {
      recommendations.push("🏞️ Good for landscapes - more in focus");
    }

    if (flNum >= 200) {
      recommendations.push("🔭 Telephoto compresses background");
    }

    setResult({
      aperture: fNum,
      focalLength: flNum,
      subjectDistance: distNum,
      sensorSize,
      nearLimit: parseFloat(nearLimit.toFixed(2)),
      farLimit: parseFloat(farLimit.toFixed(2)),
      totalDOF: parseFloat(totalDOF.toFixed(2)),
      hyperfocal: parseFloat(hyperfocal.toFixed(2)),
      backgroundBlur,
      recommendations,
    });
  };

  const reset = () => {
    setFocalLength("");
    setSubjectDistance("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Depth of Field Calculator – Calculate DOF from Aperture, Focal Length & Distance
          </h1>
          <p className="text-muted-foreground">
            Control your background blur with precision using our Depth-of-Field Calculator.
            Enter aperture, focal length, and subject distance to calculate depth of field,
            hyperfocal distance, and sharp zone limits — essential for portrait, landscape,
            and macro photography.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="aperture">Aperture (f/)</Label>
                  <Input
                    id="aperture"
                    type="number"
                    step="0.1"
                    value={aperture}
                    onChange={(e) => setAperture(e.target.value)}
                    placeholder="2.8"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="sensor">Sensor Size</Label>
                  <Select value={sensorSize} onValueChange={setSensorSize}>
                    <SelectTrigger id="sensor">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullframe">Full Frame</SelectItem>
                      <SelectItem value="apsc">APS-C</SelectItem>
                      <SelectItem value="m43">Micro 4/3</SelectItem>
                      <SelectItem value="oneInch">1&quot; Sensor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="focal-length">Focal Length (mm)</Label>
                <Input
                  id="focal-length"
                  type="number"
                  value={focalLength}
                  onChange={(e) => setFocalLength(e.target.value)}
                  placeholder="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject-distance">Subject Distance (meters)</Label>
                <Input
                  id="subject-distance"
                  type="number"
                  step="0.1"
                  value={subjectDistance}
                  onChange={(e) => setSubjectDistance(e.target.value)}
                  placeholder="5"
                />
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
              <h3 className="text-lg font-semibold mb-4">DOF Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Depth of Field</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.totalDOF === Infinity ? '∞' : `${result.totalDOF}m`}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.nearLimit}m to {result.farLimit === Infinity ? '∞' : result.farLimit + 'm'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Hyperfocal</p>
                      <p className="text-lg font-bold">{result.hyperfocal}m</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Background</p>
                      <p className="text-sm font-bold">{result.backgroundBlur.split(" - ")[0]}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Aperture:</span>
                      <span className="font-semibold">f/{result.aperture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Focal Length:</span>
                      <span className="font-semibold">{result.focalLength}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subject Distance:</span>
                      <span className="font-semibold">{result.subjectDistance}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Background Blur:</span>
                      <span className="font-semibold">{result.backgroundBlur}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Photography Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter camera settings and click Calculate to see DOF</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Depth of Field
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Wider aperture (lower f/):</strong> Shallower DOF, more blur
                  </li>
                  <li>
                    <strong>Longer focal length:</strong> Shallower DOF, more compression
                  </li>
                  <li>
                    <strong>Closer subject:</strong> Shallower DOF
                  </li>
                  <li>
                    <strong>Larger sensor:</strong> Shallower DOF for same framing
                  </li>
                </ul>
                <p>
                  <strong>Hyperfocal distance:</strong> Focus distance that gives maximum
                  DOF from half that distance to infinity. Essential for landscape photography.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
