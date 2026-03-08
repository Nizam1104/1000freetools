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

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                How to Use This Depth of Field Calculator
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Enter Your Camera Settings</h3>
                    <p className="text-muted-foreground">
                      Input your aperture (f-number), focal length in millimeters, and the distance to your subject in meters. Select your camera's sensor size from the dropdown.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Click Calculate</h3>
                    <p className="text-muted-foreground">
                      The calculator will compute your depth of field range, showing the near and far limits of acceptable sharpness, plus the hyperfocal distance.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Review Your Results</h3>
                    <p className="text-muted-foreground">
                      Check the total depth of field, where sharpness begins and ends, and use the photography tips to adjust your settings for the desired effect.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Understanding Depth of Field
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Depth of field (DOF) is the zone of acceptable sharpness in your photograph - the distance between the nearest and farthest points that appear acceptably sharp in an image. Everything within this zone looks sharp to the human eye, while areas outside it gradually become softer and more blurred.
                </p>
                <h3 className="font-semibold text-foreground">Near Limit and Far Limit</h3>
                <p>
                  The near limit marks the closest point to your camera that remains acceptably sharp. The far limit marks the farthest point before things go soft. The space between these two boundaries is your depth of field. When the far limit reaches infinity, everything from the near limit to the horizon stays sharp.
                </p>
                <h3 className="font-semibold text-foreground">Hyperfocal Distance</h3>
                <p>
                  Hyperfocal distance is a specific focus distance that maximizes your depth of field. When you focus at the hyperfocal distance, everything from half that distance to infinity appears acceptably sharp. Landscape photographers use this constantly - focus at the hyperfocal point and you get maximum sharpness throughout the scene without stopping down to extreme apertures.
                </p>
                <h3 className="font-semibold text-foreground">Circle of Confusion</h3>
                <p>
                  The circle of confusion (CoC) is the largest blur spot that still looks like a sharp point to the human eye at standard viewing conditions. It's the technical threshold between "sharp" and "not sharp." Different sensor sizes use different CoC values because the same image looks different when enlarged from various sensor formats. This calculator adjusts the CoC automatically based on your selected sensor size.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Factors Affecting Depth of Field
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Aperture (f-stop)</h3>
                  <p className="text-muted-foreground">
                    Aperture has the most direct impact on depth of field. A lower f-number like f/1.4 or f/2.8 means a wider opening, which creates shallower depth of field - more background blur. A higher f-number like f/8 or f/11 means a smaller opening, giving you deeper depth of field with more of the scene in focus. This is why portrait shooters love f/1.8 lenses and landscape photographers stop down to f/8 or beyond.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Focal Length</h3>
                  <p className="text-muted-foreground">
                    Longer focal lengths compress the scene and produce shallower depth of field at the same aperture and subject distance. A 200mm lens at f/4 gives you much less depth of field than a 35mm lens at f/4. This is why telephoto lenses are popular for wildlife and sports - they isolate subjects from busy backgrounds even at moderate apertures.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Distance to Subject</h3>
                  <p className="text-muted-foreground">
                    The closer you are to your subject, the shallower your depth of field becomes. Get right up close with a wide aperture and you'll have razor-thin focus - critical for macro work. Step back and your depth of field increases even with the same lens and aperture settings. This is why macro photography demands careful focus and often smaller apertures.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Sensor Size</h3>
                  <p className="text-muted-foreground">
                    Larger sensors produce shallower depth of field when you maintain the same framing. A full-frame camera at f/2.8 gives you less depth of field than an APS-C or Micro Four Thirds camera at f/2.8 shooting the same composition. To match the depth of field of full-frame, smaller sensors need wider apertures. This is one reason medium format cameras are prized for their creamy background separation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Depth of Field Comparison Table
              </h2>
              <p className="text-muted-foreground mb-4">
                These examples show how different lens and aperture combinations affect depth of field when focused at 3 meters:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Focal Length</th>
                      <th className="text-left py-3 px-2 font-semibold">Aperture</th>
                      <th className="text-left py-3 px-2 font-semibold">Near Limit</th>
                      <th className="text-left py-3 px-2 font-semibold">Far Limit</th>
                      <th className="text-left py-3 px-2 font-semibold">Total DOF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">24mm</td>
                      <td className="py-3 px-2">f/2.8</td>
                      <td className="py-3 px-2">1.5m</td>
                      <td className="py-3 px-2">∞</td>
                      <td className="py-3 px-2">∞</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">50mm</td>
                      <td className="py-3 px-2">f/1.8</td>
                      <td className="py-3 px-2">2.7m</td>
                      <td className="py-3 px-2">3.4m</td>
                      <td className="py-3 px-2">0.7m</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">50mm</td>
                      <td className="py-3 px-2">f/8</td>
                      <td className="py-3 px-2">2.1m</td>
                      <td className="py-3 px-2">5.7m</td>
                      <td className="py-3 px-2">3.6m</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">85mm</td>
                      <td className="py-3 px-2">f/1.4</td>
                      <td className="py-3 px-2">2.9m</td>
                      <td className="py-3 px-2">3.1m</td>
                      <td className="py-3 px-2">0.2m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Notice how the 85mm at f/1.4 gives you only 20 centimeters of depth of field - critical focus is essential. Meanwhile, the 24mm at f/2.8 keeps everything from 1.5 meters to infinity sharp, making it forgiving for street and environmental work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                When to Use Shallow vs Deep Depth of Field
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Shallow Depth of Field</h3>
                  <p className="text-muted-foreground mb-3">
                    Use shallow depth of field when you want to isolate your subject from the background or create artistic blur. It directs the viewer's attention exactly where you want it.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>Portraits:</strong> Separate your subject from distracting backgrounds</li>
                    <li><strong>Product photography:</strong> Make the product pop against a soft backdrop</li>
                    <li><strong>Wildlife:</strong> Isolate animals from busy environments</li>
                    <li><strong>Macro:</strong> Control which part of a tiny subject stays sharp</li>
                    <li><strong>Artistic work:</strong> Create dreamy, painterly images with selective focus</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Deep Depth of Field</h3>
                  <p className="text-muted-foreground mb-3">
                    Use deep depth of field when you need sharpness throughout the entire scene. This is essential when foreground and background elements both matter to the composition.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>Landscapes:</strong> Keep foreground rocks and distant mountains both sharp</li>
                    <li><strong>Architecture:</strong> Ensure the entire building stays in focus</li>
                    <li><strong>Group photos:</strong> Get everyone sharp from front row to back</li>
                    <li><strong>Street photography:</strong> Capture scenes with multiple planes of interest</li>
                    <li><strong>Real estate:</strong> Show entire rooms with edge-to-edge sharpness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What is depth of field?</h3>
                  <p className="text-muted-foreground">
                    Depth of field is the distance between the nearest and farthest points in a photograph that appear acceptably sharp. It's the zone of sharpness from front to back in your image. A shallow depth of field means only a small slice is sharp (great for portraits), while a deep depth of field means most or all of the scene is sharp (ideal for landscapes).
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How does aperture affect depth of field?</h3>
                  <p className="text-muted-foreground">
                    Aperture directly controls depth of field. Lower f-numbers (wider apertures like f/1.4, f/2.8) create shallower depth of field with more background blur. Higher f-numbers (smaller apertures like f/8, f/11) create deeper depth of field with more of the scene in focus. It's one of the primary creative tools photographers use to control how their images look.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What lens is best for shallow depth of field?</h3>
                  <p className="text-muted-foreground">
                    Fast prime lenses with wide maximum apertures are best for shallow depth of field. An 85mm f/1.4 or 50mm f/1.8 will give you much shallower depth of field than a kit zoom at f/3.5-5.6. Longer focal lengths also help - a 135mm f/2 creates more background separation than a 35mm f/2 at the same subject distance. For maximum blur, combine long focal length with wide aperture.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What is hyperfocal distance?</h3>
                  <p className="text-muted-foreground">
                    Hyperfocal distance is the focus distance that gives you the maximum possible depth of field. When you focus at the hyperfocal distance, everything from half that distance to infinity appears acceptably sharp. Landscape photographers use this technique to get foreground interest and distant horizons both sharp without using extremely small apertures that might introduce diffraction.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why is my background blurry or sharp?</h3>
                  <p className="text-muted-foreground">
                    Your background blur depends on four factors: aperture, focal length, subject distance, and sensor size. Wide apertures (low f-numbers), long focal lengths, close subject distances, and larger sensors all contribute to blurrier backgrounds. If you want sharper backgrounds, stop down to a higher f-number, use a wider lens, step back from your subject, or use a camera with a smaller sensor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
