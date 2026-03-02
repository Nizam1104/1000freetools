"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TelescopeMagnificationCalculatorPage() {
  const [telescopeFocalLength, setTelescopeFocalLength] = useState<string>("");
  const [eyepieceFocalLength, setEyepieceFocalLength] = useState<string>("");
  const [telescopeAperture, setTelescopeAperture] = useState<string>("");
  const [eyepieceFOV, setEyepieceFOV] = useState<string>("");
  const [result, setResult] = useState<{
    magnification: number;
    exitPupil: number;
    trueFOV: number;
    maxMagnification: number;
    minMagnification: number;
    surfaceBrightness: number;
    assessment: string[];
  } | null>(null);

  const calculate = () => {
    const scopeFL = parseFloat(telescopeFocalLength);
    const eyepieceFL = parseFloat(eyepieceFocalLength);
    const aperture = telescopeAperture ? parseFloat(telescopeAperture) : 0;
    const apparentFOV = eyepieceFOV ? parseFloat(eyepieceFOV) : 50; // Default 50° for Plössl

    if (isNaN(scopeFL) || isNaN(eyepieceFL) || eyepieceFL <= 0) return;

    // Magnification = Telescope FL / Eyepiece FL
    const magnification = scopeFL / eyepieceFL;

    // Exit Pupil = Eyepiece FL / Telescope f-ratio (or Aperture / Magnification)
    const exitPupil = aperture > 0 ? aperture / magnification : eyepieceFL / (scopeFL / 50);

    // True Field of View = Apparent FOV / Magnification
    const trueFOV = apparentFOV / magnification;

    // Maximum useful magnification (approximately 2x per mm of aperture)
    const maxMagnification = aperture > 0 ? aperture * 2 : scopeFL / 5;

    // Minimum useful magnification (exit pupil ≈ 7mm for dark-adapted eye)
    const minMagnification = aperture > 0 ? aperture / 7 : scopeFL / 50;

    // Surface brightness (relative to naked eye)
    const surfaceBrightness = Math.pow(exitPupil / 7, 2) * 100;

    // Assessment
    const assessment: string[] = [];

    if (magnification > maxMagnification && aperture > 0) {
      assessment.push(`⚠️ Magnification exceeds maximum useful (${Math.round(maxMagnification)}x) - image will be dim and blurry`);
    } else if (magnification > maxMagnification * 0.8 && aperture > 0) {
      assessment.push(`⚠️ Near maximum useful magnification - best for bright objects only`);
    } else {
      assessment.push(`✓ Magnification is within useful range`);
    }

    if (exitPupil > 7) {
      assessment.push(`⚠️ Exit pupil exceeds dark-adapted eye limit (7mm) - light is wasted`);
    } else if (exitPupil < 0.5) {
      assessment.push(`⚠️ Very small exit pupil - image will be very dim`);
    } else if (exitPupil >= 2 && exitPupil <= 5) {
      assessment.push(`✓ Optimal exit pupil for most viewing conditions`);
    }

    if (aperture > 0) {
      assessment.push(`Best magnification range: ${Math.round(minMagnification)}x - ${Math.round(maxMagnification)}x`);
    }

    setResult({
      magnification: Math.round(magnification * 10) / 10,
      exitPupil: Math.round(exitPupil * 100) / 100,
      trueFOV: Math.round(trueFOV * 100) / 100,
      maxMagnification: Math.round(maxMagnification),
      minMagnification: Math.round(minMagnification),
      surfaceBrightness: Math.round(surfaceBrightness),
      assessment
    });
  };

  const reset = () => {
    setTelescopeFocalLength("");
    setEyepieceFocalLength("");
    setTelescopeAperture("");
    setEyepieceFOV("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Telescope Magnification Calculator – Calculate Power, FOV & Exit Pupil</h1>
          <p className="text-muted-foreground">
            Get the most from your telescope with our Magnification Calculator. Enter your telescope's focal length and eyepiece focal length to calculate magnification power, true field of view, and exit pupil diameter — optimizing your stargazing experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scopeFL">Telescope Focal Length (mm)</Label>
                <Input 
                  id="scopeFL" 
                  type="number" 
                  placeholder="e.g., 1200" 
                  value={telescopeFocalLength} 
                  onChange={(e) => setTelescopeFocalLength(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Found in telescope specs (e.g., 700mm, 1200mm)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aperture">Telescope Aperture (mm) - Optional</Label>
                <Input 
                  id="aperture" 
                  type="number" 
                  placeholder="e.g., 150" 
                  value={telescopeAperture} 
                  onChange={(e) => setTelescopeAperture(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Diameter of main lens/mirror</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eyepieceFL">Eyepiece Focal Length (mm)</Label>
                <Input 
                  id="eyepieceFL" 
                  type="number" 
                  placeholder="e.g., 25" 
                  value={eyepieceFocalLength} 
                  onChange={(e) => setEyepieceFocalLength(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Marked on eyepiece (e.g., 10mm, 25mm)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eyepieceFOV">Eyepiece Apparent FOV (°) - Optional</Label>
                <Input 
                  id="eyepieceFOV" 
                  type="number" 
                  placeholder="Default: 50° (Plössl)" 
                  value={eyepieceFOV} 
                  onChange={(e) => setEyepieceFOV(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">Plössl: 50°, Wide: 68-82°, Ultra-wide: 100-120°</p>
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
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Magnification</p>
                    <p className="text-5xl font-bold text-primary">{result.magnification}x</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Exit Pupil</p>
                      <p className="text-lg font-semibold">{result.exitPupil} mm</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">True FOV</p>
                      <p className="text-lg font-semibold">{result.trueFOV}°</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Brightness</p>
                      <p className="text-lg font-semibold">{result.surfaceBrightness}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Min Useful</p>
                      <p className="text-xl font-bold text-primary">{result.minMagnification}x</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Max Useful</p>
                      <p className="text-xl font-bold text-primary">{result.maxMagnification}x</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {result.assessment.map((item, i) => (
                      <div key={i} className="p-2 bg-muted rounded-lg text-sm">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">Quick Reference:</p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Low power (20-50x): Deep sky objects, nebulae</li>
                      <li>• Medium power (50-100x): Star clusters, larger planets</li>
                      <li>• High power (100-200x): Moon, planets, double stars</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter telescope and eyepiece details to calculate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
