"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MirrorEquationCalculator() {
  const [solveFor, setSolveFor] = useState<"f" | "u" | "v">("f");
  const [focalLength, setFocalLength] = useState<string>("");
  const [objectDistance, setObjectDistance] = useState<string>("");
  const [imageDistance, setImageDistance] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    // Same as lens: 1/f = 1/u + 1/v
    if (solveFor === "f") {
      const u = parseFloat(objectDistance);
      const v = parseFloat(imageDistance);
      if (u !== 0 && v !== 0) {
        const f = 1 / (1/u + 1/v);
        const m = -v / u;
        setResults({ value: f, magnification: m, label: "Focal Length" });
      }
    } else if (solveFor === "u") {
      const f = parseFloat(focalLength);
      const v = parseFloat(imageDistance);
      if (f !== 0 && v !== 0 && v !== f) {
        const u = 1 / (1/f - 1/v);
        const m = -v / u;
        setResults({ value: u, magnification: m, label: "Object Distance" });
      }
    } else {
      const f = parseFloat(focalLength);
      const u = parseFloat(objectDistance);
      if (f !== 0 && u !== 0 && u !== f) {
        const v = 1 / (1/f - 1/u);
        const m = -v / u;
        setResults({ value: v, magnification: m, label: "Image Distance" });
      }
    }
  };

  const reset = () => {
    setFocalLength(""); setObjectDistance(""); setImageDistance(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">1/f = 1/u + 1/v (f = R/2 for spherical mirrors)</p>

            <div>
              <Label>Solve For</Label>
              <Select value={solveFor} onValueChange={(v) => setSolveFor(v as typeof solveFor)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="f">Focal Length (f)</SelectItem>
                  <SelectItem value="u">Object Distance (u)</SelectItem>
                  <SelectItem value="v">Image Distance (v)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {solveFor !== "f" && <div><Label>Focal Length</Label><Input value={focalLength} onChange={e => setFocalLength(e.target.value)} /></div>}
              {solveFor !== "u" && <div><Label>Object Distance</Label><Input value={objectDistance} onChange={e => setObjectDistance(e.target.value)} /></div>}
              {solveFor !== "v" && <div><Label>Image Distance</Label><Input value={imageDistance} onChange={e => setImageDistance(e.target.value)} /></div>}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{results.label}</p>
                  <p className="text-4xl font-bold">{Math.round(results.value * 1000) / 1000}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Magnification (m)</p>
                  <p className="text-2xl font-bold">{Math.round(results.magnification * 100) / 100}</p>
                  <p className="text-xs text-muted-foreground">
                    {results.value < 0 ? "Virtual image" : "Real image"}
                    {results.magnification < 0 ? ", Inverted" : ", Upright"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-sm mb-3">Mirror Equation</h4>
            <div className="p-3 bg-muted/50 rounded font-mono text-sm text-center">1/f = 1/u + 1/v</div>
            <p className="text-xs text-muted-foreground mt-2 text-center">f = focal length, u = object distance, v = image distance</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Mirror Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Choose what to solve for</p>
                <p>Select focal length (f), object distance (u), or image distance (v) from the dropdown.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Enter the known values</p>
                <p>Fill in the two known quantities. Use positive values for real objects and negative for virtual.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">Calculate and interpret results</p>
                <p>The calculator shows the unknown value and magnification. Negative image distance means virtual image.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sign Convention for Spherical Mirrors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-semibold">Quantity</th>
                  <th className="text-left py-2 px-2 font-semibold">Concave Mirror</th>
                  <th className="text-left py-2 px-2 font-semibold">Convex Mirror</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-2">Focal length (f)</td>
                  <td className="py-2 px-2">Positive (+)</td>
                  <td className="py-2 px-2">Negative (−)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Object distance (u)</td>
                  <td className="py-2 px-2">Always positive (+)</td>
                  <td className="py-2 px-2">Always positive (+)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Image distance (v)</td>
                  <td className="py-2 px-2">+ for real, − for virtual</td>
                  <td className="py-2 px-2">Always negative (−)</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Magnification (m)</td>
                  <td className="py-2 px-2">− for inverted, + for upright</td>
                  <td className="py-2 px-2">Always positive (+)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: All distances are measured from the pole (center) of the mirror along the principal axis.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Image Characteristics by Mirror Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Concave Mirror (Converging)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 font-semibold">Object Position</th>
                    <th className="text-left py-2 px-2 font-semibold">Image Type</th>
                    <th className="text-left py-2 px-2 font-semibold">Orientation</th>
                    <th className="text-left py-2 px-2 font-semibold">Size</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-2">Beyond C (2f)</td>
                    <td className="py-2 px-2">Real</td>
                    <td className="py-2 px-2">Inverted</td>
                    <td className="py-2 px-2">Diminished</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2">At C (2f)</td>
                    <td className="py-2 px-2">Real</td>
                    <td className="py-2 px-2">Inverted</td>
                    <td className="py-2 px-2">Same size</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2">Between C and F</td>
                    <td className="py-2 px-2">Real</td>
                    <td className="py-2 px-2">Inverted</td>
                    <td className="py-2 px-2">Magnified</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2">At F</td>
                    <td className="py-2 px-2">At infinity</td>
                    <td className="py-2 px-2">—</td>
                    <td className="py-2 px-2">—</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Between F and pole</td>
                    <td className="py-2 px-2">Virtual</td>
                    <td className="py-2 px-2">Upright</td>
                    <td className="py-2 px-2">Magnified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Convex Mirror (Diverging)</h4>
            <p className="text-xs text-muted-foreground">
              Convex mirrors always produce virtual, upright, diminished images regardless of object position. This is why they're used in rearview mirrors and security applications—they provide a wide field of view.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">What's the difference between concave and convex mirrors?</h4>
            <p className="text-xs text-muted-foreground">
              Concave mirrors curve inward (like a cave) and converge light rays. They can form real or virtual images. Convex mirrors curve outward and diverge light rays. They always form virtual, upright, diminished images.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">When is an image real vs virtual?</h4>
            <p className="text-xs text-muted-foreground">
              Real images form where light rays actually converge—they can be projected on a screen. Virtual images appear where rays seem to come from—they can't be projected. For mirrors: positive v = real, negative v = virtual.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What does magnification tell me?</h4>
            <p className="text-xs text-muted-foreground">
              Magnification (m) = image height / object height = -v/u. If |m| &gt; 1, the image is magnified. If |m| &lt; 1, it's diminished. Negative m means inverted image; positive means upright.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">How is focal length related to radius of curvature?</h4>
            <p className="text-xs text-muted-foreground">
              For spherical mirrors: f = R/2. The focal length is half the radius of curvature. This relationship holds for both concave and convex mirrors (with appropriate sign conventions).
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Why do convex mirrors make things look smaller?</h4>
            <p className="text-xs text-muted-foreground">
              Convex mirrors diverge light rays, making objects appear smaller and farther away than they actually are. This trade-off gives a wider field of view—useful for seeing more area in rearview and security mirrors.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-3">
            <a href="/calculators/lens-equation-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Lens Equation Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate lens focal length and image position</p>
            </a>
            <a href="/calculators/magnification-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Magnification Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate image magnification</p>
            </a>
            <a href="/calculators/snell-law-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Snell's Law Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate refraction angles</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
