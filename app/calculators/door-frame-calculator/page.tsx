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

interface DoorFrameResult {
  doorWidth: number;
  doorHeight: number;
  wallThickness: number;
  frameWidth: number;
  frameHeight: number;
  roughOpeningWidth: number;
  roughOpeningHeight: number;
  jambLength: number;
  headerLength: number;
  materialNeeded: string;
  recommendations: string[];
}

export default function DoorFrameCalculatorPage() {
  const [doorWidth, setDoorWidth] = useState<string>("");
  const [doorHeight, setDoorHeight] = useState<string>("");
  const [wallThickness, setWallThickness] = useState<string>("");
  const [doorType, setDoorType] = useState<string>("interior");
  const [unit, setUnit] = useState<string>("inches");
  const [result, setResult] = useState<DoorFrameResult | null>(null);

  const calculate = () => {
    let widthNum = parseFloat(doorWidth) || 0;
    let heightNum = parseFloat(doorHeight) || 0;
    let thicknessNum = parseFloat(wallThickness) || 0;

    if (widthNum === 0 || heightNum === 0) return;

    // Convert to inches if needed
    if (unit === "cm") {
      widthNum = widthNum / 2.54;
      heightNum = heightNum / 2.54;
      thicknessNum = thicknessNum / 2.54;
    } else if (unit === "mm") {
      widthNum = widthNum / 25.4;
      heightNum = heightNum / 25.4;
      thicknessNum = thicknessNum / 25.4;
    }

    // Standard clearances
    const sideClearance = 0.125; // 1/8 inch each side
    const topClearance = 0.125; // 1/8 inch top
    const bottomClearance = 0.5; // 1/2 inch bottom (carpet clearance)

    // Frame dimensions (inside measurements)
    const frameWidth = widthNum + (sideClearance * 2);
    const frameHeight = heightNum + topClearance;

    // Rough opening (typically 2 inches wider and 1 inch taller than door)
    const roughOpeningWidth = widthNum + 2;
    const roughOpeningHeight = heightNum + 1;

    // Material calculations
    // Jamb length = frame height × 2 (both sides)
    const jambLength = frameHeight * 2;

    // Header length = frame width + jamb width on each side
    const headerLength = frameWidth + (thicknessNum * 2);

    // Total material needed
    const totalLinearFeet = (jambLength + headerLength) / 12;

    // Material needed description
    let materialNeeded = "";
    if (doorType === "interior") {
      materialNeeded = `${totalLinearFeet.toFixed(1)} linear feet of 1×4 lumber`;
    } else {
      materialNeeded = `${totalLinearFeet.toFixed(1)} linear feet of 2×6 lumber`;
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🚪 Door size: ${widthNum}" × ${heightNum}"`);
    recommendations.push(`📐 Frame opening: ${frameWidth.toFixed(2)}" × ${frameHeight.toFixed(2)}"`);
    recommendations.push(`🔨 Rough opening: ${roughOpeningWidth}" × ${roughOpeningHeight}"`);
    recommendations.push(`🪵 Wall thickness: ${thicknessNum}"`);

    if (doorType === "exterior") {
      recommendations.push("🏠 Exterior door - use weather-resistant materials");
      recommendations.push("🌧️ Include weatherstripping and threshold");
    }

    recommendations.push("📏 Always measure twice before cutting");
    recommendations.push("🔩 Use 3 hinges for doors over 60 inches");
    recommendations.push("📐 Allow 1/8 inch clearance on sides and top");

    setResult({
      doorWidth: widthNum,
      doorHeight: heightNum,
      wallThickness: thicknessNum,
      frameWidth: parseFloat(frameWidth.toFixed(2)),
      frameHeight: parseFloat(frameHeight.toFixed(2)),
      roughOpeningWidth,
      roughOpeningHeight,
      jambLength: parseFloat(jambLength.toFixed(2)),
      headerLength: parseFloat(headerLength.toFixed(2)),
      materialNeeded,
      recommendations,
    });
  };

  const reset = () => {
    setDoorWidth("");
    setDoorHeight("");
    setWallThickness("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Door Frame Calculator – Calculate Door Frame Dimensions & Material Quantities
          </h1>
          <p className="text-muted-foreground">
            Ensure a perfect door fit with our Door Frame Calculator. Enter your door size
            and wall thickness to calculate the exact frame dimensions and material
            quantities needed for a professional installation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="door-width">Door Width</Label>
                  <Input
                    id="door-width"
                    type="number"
                    value={doorWidth}
                    onChange={(e) => setDoorWidth(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="door-height">Door Height</Label>
                  <Input
                    id="door-height"
                    type="number"
                    value={doorHeight}
                    onChange={(e) => setDoorHeight(e.target.value)}
                    placeholder="80"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wall-thickness">Wall Thickness</Label>
                <Input
                  id="wall-thickness"
                  type="number"
                  value={wallThickness}
                  onChange={(e) => setWallThickness(e.target.value)}
                  placeholder="4.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="door-type">Door Type</Label>
                  <Select value={doorType} onValueChange={setDoorType}>
                    <SelectTrigger id="door-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interior">Interior</SelectItem>
                      <SelectItem value="exterior">Exterior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                      <SelectItem value="mm">Millimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Standard Door Sizes:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Interior: 30&quot;×80&quot;, 32&quot;×80&quot;</li>
                  <li>• Exterior: 36&quot;×80&quot;</li>
                  <li>• Closet: 24&quot;×80&quot;, 28&quot;×80&quot;</li>
                </ul>
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
              <h3 className="text-lg font-semibold mb-4">Frame Dimensions</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Frame Width</p>
                      <p className="text-xl font-bold text-primary">{result.frameWidth}&quot;</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Frame Height</p>
                      <p className="text-xl font-bold text-primary">{result.frameHeight}&quot;</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rough Opening:</span>
                      <span className="font-semibold">{result.roughOpeningWidth}&quot; × {result.roughOpeningHeight}&quot;</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Jamb Length:</span>
                      <span className="font-semibold">{result.jambLength}&quot;</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Header Length:</span>
                      <span className="font-semibold">{result.headerLength}&quot;</span>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Material Needed:</strong> {result.materialNeeded}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Installation Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter door dimensions and click Calculate to see frame specs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Door Frame Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the door width and height</p>
                    <p>Input the actual door slab dimensions. Standard interior doors are 30 or 32 inches wide by 80 inches tall. Exterior doors are typically 36 inches wide.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Measure wall thickness and select door type</p>
                    <p>Interior walls are usually 4.5 inches thick with drywall. Exterior walls are thicker. Select interior or exterior to get appropriate material recommendations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see frame dimensions</p>
                    <p>You will get the frame opening size, rough opening dimensions, jamb and header lengths, and material requirements for your door installation.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Standard Door Sizes Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Door Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Common Sizes (W × H)</th>
                      <th className="text-left py-3 px-2 font-semibold">Rough Opening</th>
                      <th className="text-left py-3 px-2 font-semibold">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Bedroom</td>
                      <td className="py-3 px-2">30" × 80"</td>
                      <td className="py-3 px-2">32" × 81"</td>
                      <td className="py-3 px-2">Standard interior rooms</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Bathroom</td>
                      <td className="py-3 px-2">28" × 80"</td>
                      <td className="py-3 px-2">30" × 81"</td>
                      <td className="py-3 px-2">Powder rooms, half baths</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Closet</td>
                      <td className="py-3 px-2">24" or 28" × 80"</td>
                      <td className="py-3 px-2">26" or 30" × 81"</td>
                      <td className="py-3 px-2">Reach-in closets</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Entry</td>
                      <td className="py-3 px-2">36" × 80"</td>
                      <td className="py-3 px-2">38" × 81"</td>
                      <td className="py-3 px-2">Front doors, main entry</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Patio</td>
                      <td className="py-3 px-2">36" × 80" or 60" × 80"</td>
                      <td className="py-3 px-2">38" × 81" or 62" × 81"</td>
                      <td className="py-3 px-2">Back doors, deck access</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Wheelchair</td>
                      <td className="py-3 px-2">36" minimum × 80"</td>
                      <td className="py-3 px-2">38" × 81"</td>
                      <td className="py-3 px-2">ADA compliance, accessibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Rough opening is typically 2 inches wider and 1 inch taller than the door size to allow for frame and shimming.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Door Frame Measurements
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Door Slab vs Frame Size</h4>
                  <p>
                    The door slab is the actual swinging door panel. The frame (or jamb) is the stationary structure that holds the door. The frame opening must be slightly larger than the door to allow for clearance. Standard clearance is 1/8 inch on each side and top, with 1/2 inch at the bottom for carpet clearance.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is a Rough Opening?</h4>
                  <p>
                    The rough opening is the framed opening in your wall before the door frame is installed. It needs to be larger than the frame to allow for leveling and shimming. The standard rule is to add 2 inches to the door width and 1 inch to the door height. This gives room for the frame plus adjustment space.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Wall Thickness Matters</h4>
                  <p>
                    Interior walls with 2x4 studs and 1/2 inch drywall on each side are typically 4.5 inches thick. Exterior walls with 2x6 studs are 6.5 inches or more. The door jamb must match your wall thickness exactly for proper trim installation. Custom jamb widths are available for non-standard walls.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Interior vs Exterior Frames</h4>
                  <p>
                    Exterior door frames are built differently than interior ones. They use thicker lumber (2x6 instead of 2x4), include a weather-resistant threshold, and have provisions for weatherstripping. Exterior frames also often include a brickmold or exterior trim that integrates with siding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Door Installation Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check the Rough Opening First</p>
                    <p>Before ordering a door, measure your rough opening. It should be plumb, level, and square. If the opening is out of square by more than 1/4 inch, plan to shim extensively or reframe the opening.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Shims for Adjustment</p>
                    <p>Wood shims go between the frame and rough opening at hinge locations and latch side. Drive shims from opposite sides to avoid bowing the frame. Check for plumb after each shim pair is installed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Install Hinges Properly</p>
                    <p>Standard doors need 2 hinges. Doors over 60 inches tall need 3 hinges. The top hinge goes 5-7 inches from the top of the door, the bottom hinge 10-11 inches from the bottom, and the middle hinge centered between them.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Leave Proper Clearances</p>
                    <p>The door should have 1/8 inch gap on each side and top. The bottom clearance depends on flooring: 1/2 inch for carpet, 3/8 inch for hardwood or tile. Too tight and the door sticks; too loose and it looks sloppy.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What size rough opening do I need for a 36 inch door?</h4>
                  <p>
                    For a 36 inch door, the rough opening should be 38 inches wide and 81 inches tall. This allows 2 inches of width for the frame (3/4 inch on each side) plus shimming space (1/4 inch on each side), and 1 inch of height for the frame and leveling.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I measure for a replacement door frame?</h4>
                  <p>
                    Measure the existing door slab width and height in three places each. Use the smallest measurement. For the rough opening, measure the distance between studs. Also measure wall thickness at multiple points since walls are not always uniform.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I put a 32 inch door in a 30 inch opening?</h4>
                  <p>
                    No, not without reframing. A 32 inch door needs a rough opening of at least 34 inches. Trying to fit a larger door into a smaller opening will not work. You would need to remove drywall and reframe the opening with a wider header and king studs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What lumber do I need for a door frame?</h4>
                  <p>
                    Interior door frames typically use 1x4 or 1x6 lumber for jambs. Exterior frames use 2x6 lumber. For the rough opening, use 2x4 or 2x6 studs matching your wall construction. The header should be sized based on whether the wall is load-bearing.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much clearance does a door need at the bottom?</h4>
                  <p>
                    Standard bottom clearance is 1/2 inch for carpeted floors and 3/8 inch for hard surface flooring. Bathroom doors may need 3/4 to 1 inch clearance for proper ventilation. Exterior doors sit on a threshold, so clearance depends on the threshold height.
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
