"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AirConditionerTonnageCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("8");
  const [insulation, setInsulation] = useState<"poor" | "average" | "good" | "excellent">("average");
  const [climate, setClimate] = useState<"cool" | "moderate" | "hot" | "very-hot">("moderate");
  const [sunExposure, setSunExposure] = useState<"shaded" | "normal" | "full-sun">("normal");
  const [roomType, setRoomType] = useState<"bedroom" | "living-room" | "kitchen" | "office" | "server-room">("bedroom");
  const [numOccupants, setNumOccupants] = useState<string>("2");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [result, setResult] = useState<{
    baseBtu: number;
    adjustedBtu: number;
    tonnage: number;
    recommendedSize: number;
    kw: number;
  } | null>(null);

  const calculate = () => {
    let length = parseFloat(roomLength);
    let width = parseFloat(roomWidth);
    let height = parseFloat(ceilingHeight) || 8;
    let occupants = parseInt(numOccupants) || 2;

    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) return;

    // Convert to feet if in meters
    if (unit === "meters") {
      length *= 3.28084;
      width *= 3.28084;
      height *= 3.28084;
    }

    // Calculate area in square feet
    const area = length * width;

    // Calculate volume
    const volume = area * height;

    // Base BTU calculation (20 BTU per sq ft is standard baseline)
    let baseBtu = area * 20;

    // Ceiling height adjustment (standard is 8ft)
    if (height > 8) {
      baseBtu *= (height / 8);
    }

    // Insulation factor
    const insulationFactors = {
      poor: 1.3,
      average: 1.0,
      good: 0.85,
      excellent: 0.75,
    };

    // Climate factor
    const climateFactors = {
      cool: 0.8,
      moderate: 1.0,
      hot: 1.2,
      "very-hot": 1.4,
    };

    // Sun exposure factor
    const sunFactors = {
      shaded: 0.9,
      normal: 1.0,
      "full-sun": 1.2,
    };

    // Room type factor (heat-generating appliances, equipment)
    const roomTypeFactors = {
      bedroom: 1.0,
      "living-room": 1.1,
      kitchen: 1.3,
      office: 1.1,
      "server-room": 2.0,
    };

    let adjustedBtu = baseBtu;
    adjustedBtu *= insulationFactors[insulation];
    adjustedBtu *= climateFactors[climate];
    adjustedBtu *= sunFactors[sunExposure];
    adjustedBtu *= roomTypeFactors[roomType];

    // Add heat from occupants (600 BTU per person)
    adjustedBtu += (occupants - 2) * 600;

    // Convert to tonnage (1 ton = 12,000 BTU/hr)
    const tonnage = adjustedBtu / 12000;

    // Convert to kW (1 ton ≈ 3.517 kW)
    const kw = tonnage * 3.517;

    // Round to standard AC sizes
    const standardSizes = [0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0];
    let recommendedSize = standardSizes.find(size => size >= tonnage) || Math.ceil(tonnage * 2) / 2;

    setResult({
      baseBtu: Math.round(baseBtu),
      adjustedBtu: Math.round(adjustedBtu),
      tonnage: Math.round(tonnage * 100) / 100,
      recommendedSize,
      kw: Math.round(kw * 100) / 100,
    });
  };

  const reset = () => {
    setRoomLength("");
    setRoomWidth("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room
          </h1>
          <p className="text-muted-foreground">
            Choose the right air conditioner for your space with our AC Tonnage Calculator. Enter
            your room size, ceiling height, insulation quality, and climate zone to get the
            recommended BTU or tonnage — ensuring comfort and energy efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Unit System</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "feet" | "meters")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="length">Room Length</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder={unit === "feet" ? "15" : "4.5"}
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Room Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder={unit === "feet" ? "12" : "3.5"}
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Ceiling Height (ft)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="8"
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={roomType} onValueChange={(v) => setRoomType(v as "bedroom" | "living-room" | "kitchen" | "office" | "server-room")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="office">Home Office</SelectItem>
                    <SelectItem value="server-room">Server Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insulation">Insulation Quality</Label>
                <Select value={insulation} onValueChange={(v) => setInsulation(v as "poor" | "average" | "good" | "excellent")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor (Old/Uninsulated)</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="excellent">Excellent (Well Insulated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climate">Climate Zone</Label>
                <Select value={climate} onValueChange={(v) => setClimate(v as "cool" | "moderate" | "hot" | "very-hot")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cool">Cool</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="very-hot">Very Hot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sunExposure">Sun Exposure</Label>
                <Select value={sunExposure} onValueChange={(v) => setSunExposure(v as "shaded" | "normal" | "full-sun")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shaded">Mostly Shaded</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="full-sun">Full Sun</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupants">Regular Occupants</Label>
                <Input
                  id="occupants"
                  type="number"
                  placeholder="2"
                  value={numOccupants}
                  onChange={(e) => setNumOccupants(e.target.value)}
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
              <h3 className="text-lg font-semibold mb-4">AC Size Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommended AC Size</p>
                    <p className="text-3xl font-bold text-primary">{result.recommendedSize} Ton</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cooling Capacity</p>
                      <p className="text-lg font-bold">{result.adjustedBtu.toLocaleString()} BTU/hr</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Power</p>
                      <p className="text-lg font-bold">{result.kw} kW</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Base BTU (Area Only)</p>
                    <p className="text-xl font-bold">{result.baseBtu.toLocaleString()} BTU/hr</p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Important:</strong> This is an estimate. A professional HVAC load
                      calculation (Manual J) is recommended for precise sizing.
                    </p>
                    <p>
                      <strong>Tip:</strong> An oversized AC will short-cycle and waste energy.
                      An undersized AC will run continuously and struggle to cool.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">AC Sizing Reference</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Base BTU = Area (sq ft) × 20 BTU/sq ft</div>
            <div>Adjusted BTU = Base BTU × Insulation × Climate × Sun × Room Type</div>
            <div>Tonnage = Adjusted BTU ÷ 12,000</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">AC Size</th>
                <th className="text-left py-2">BTU/hr</th>
                <th className="text-left py-2">Room Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">0.5 Ton</td>
                <td className="py-2">6,000</td>
                <td className="py-2">150-250 sq ft</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">1.0 Ton</td>
                <td className="py-2">12,000</td>
                <td className="py-2">400-500 sq ft</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">1.5 Ton</td>
                <td className="py-2">18,000</td>
                <td className="py-2">700-850 sq ft</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2.0 Ton</td>
                <td className="py-2">24,000</td>
                <td className="py-2">950-1,100 sq ft</td>
              </tr>
              <tr>
                <td className="py-2">2.5 Ton</td>
                <td className="py-2">30,000</td>
                <td className="py-2">1,200-1,400 sq ft</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How to Use Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use This AC Tonnage Calculator</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Enter Your Room Dimensions</h3>
                  <p className="text-muted-foreground">Input the length and width of your room. You can use either feet or meters – the calculator handles the conversion automatically. Also enter your ceiling height (standard is 8 feet).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Select Your Conditions</h3>
                  <p className="text-muted-foreground">Choose your room type, insulation quality, climate zone, and sun exposure. These factors significantly impact how much cooling power you actually need.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Get Your Recommended Size</h3>
                  <p className="text-muted-foreground">Click Calculate to see your recommended AC tonnage, BTU requirements, and power consumption. Use this information when shopping for air conditioners.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding AC Tonnage Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Understanding AC Tonnage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                When you see an air conditioner labeled as "1 ton" or "2 ton," it has nothing to do with actual weight. In HVAC terms, a ton refers to cooling capacity – specifically, the amount of heat an AC unit can remove from a space in one hour.
              </p>
              <h3 className="text-lg font-semibold text-foreground">What Does "One Ton" Mean?</h3>
              <p>
                One ton of cooling equals 12,000 BTU per hour. BTU stands for British Thermal Unit, which is the amount of energy needed to raise one pound of water by one degree Fahrenheit. So a 1-ton AC removes 12,000 BTUs of heat every hour.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Where Did This Come From?</h3>
              <p>
                The term dates back to the early days of refrigeration in the late 1800s. Back then, cooling was measured by comparing it to how much ice was needed to achieve the same effect. One ton of cooling represented the amount of heat absorbed when one ton (2,000 pounds) of ice melts over a 24-hour period. The ice industry was the standard before mechanical refrigeration took over, and the terminology stuck.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Why Proper Sizing Matters</h3>
              <p>
                Getting the right tonnage isn't just about comfort – it affects your energy bills, equipment lifespan, and how well your AC actually works. An improperly sized unit creates real problems.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Problems with Oversized Units</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Short cycling – the AC turns on and off frequently instead of running in longer, efficient cycles</li>
                <li>Poor humidity control – the unit cools quickly but doesn't run long enough to remove moisture, leaving the air cold and clammy</li>
                <li>Higher energy bills – frequent startups use more power</li>
                <li>More wear and tear – constant on/off cycles stress the compressor and components</li>
                <li>Uneven cooling – some areas get cold while others stay warm</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground">Problems with Undersized Units</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Never reaches target temperature – especially on hot days</li>
                <li>Runs continuously – driving up electricity costs</li>
                <li>Excessive wear – the compressor runs non-stop, shortening the unit's life</li>
                <li>Poor comfort – you'll always feel slightly warm and uncomfortable</li>
                <li>Higher maintenance costs – constant operation leads to more frequent repairs</li>
              </ul>
            </div>
          </section>

          {/* AC Tonnage to BTU Conversion Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">AC Tonnage to BTU Conversion Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-semibold">AC Tonnage</th>
                    <th className="text-left py-3 px-4 font-semibold">BTU/hr</th>
                    <th className="text-left py-3 px-4 font-semibold">Typical Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">1 ton</td>
                    <td className="py-3 px-4">12,000 BTU</td>
                    <td className="py-3 px-4">Small bedroom, home office</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">1.5 ton</td>
                    <td className="py-3 px-4">18,000 BTU</td>
                    <td className="py-3 px-4">Master bedroom, small living room</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">2 ton</td>
                    <td className="py-3 px-4">24,000 BTU</td>
                    <td className="py-3 px-4">Large living room, small apartment</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">2.5 ton</td>
                    <td className="py-3 px-4">30,000 BTU</td>
                    <td className="py-3 px-4">Open floor plan, medium home</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">3 ton</td>
                    <td className="py-3 px-4">36,000 BTU</td>
                    <td className="py-3 px-4">Large living area, small house</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">5 ton</td>
                    <td className="py-3 px-4">60,000 BTU</td>
                    <td className="py-3 px-4">Whole house, commercial space</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Factors Affecting AC Sizing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Factors Affecting AC Sizing</h2>
            <p className="text-muted-foreground mb-6">
              Square footage is just the starting point. Several other factors determine how much cooling capacity you actually need. Here's what matters:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Room Square Footage</h3>
                <p className="text-sm text-muted-foreground">The floor area is the baseline for BTU calculations. Larger rooms need more cooling power. Standard calculation uses 20 BTU per square foot as a starting point.</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Ceiling Height</h3>
                <p className="text-sm text-muted-foreground">Standard calculations assume 8-foot ceilings. Higher ceilings mean more air volume to cool. For every foot above 8 feet, you'll need additional capacity.</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Insulation Quality</h3>
                <p className="text-sm text-muted-foreground">Good insulation keeps cool air in and hot air out. Poor or old insulation can increase your cooling needs by 30% or more. Well-insulated rooms need less capacity.</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Window Area and Orientation</h3>
                <p className="text-sm text-muted-foreground">South and west-facing windows let in more heat. Large windows, single-pane glass, and unshaded windows all increase cooling load. Window coverings help reduce this effect.</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Climate Zone</h3>
                <p className="text-sm text-muted-foreground">Hot climates need more cooling capacity than moderate ones. If you're in a region with summer temperatures regularly above 95°F, you'll need to size up compared to cooler areas.</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Number of Occupants</h3>
                <p className="text-sm text-muted-foreground">People generate heat – about 600 BTU per person. A room that regularly has 4-5 people needs more cooling than one used by just one or two.</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Heat-Generating Appliances</h3>
                <p className="text-sm text-muted-foreground">Computers, TVs, ovens, and other appliances add heat to a room. Kitchens and server rooms need significantly more cooling than bedrooms with the same square footage.</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Sun Exposure</h3>
                <p className="text-sm text-muted-foreground">Rooms in full sun need about 20% more cooling than shaded rooms. Consider how much direct sunlight the room gets during the hottest part of the day.</p>
              </div>
            </div>
          </section>

          {/* AC Sizing Guidelines by Room Size */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">AC Sizing Guidelines by Room Size</h2>
            <p className="text-muted-foreground mb-6">
              Use this table as a general reference for matching AC tonnage to room size. These are estimates – actual needs vary based on the factors listed above.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-semibold">Room Size (sq ft)</th>
                    <th className="text-left py-3 px-4 font-semibold">Recommended AC Tonnage</th>
                    <th className="text-left py-3 px-4 font-semibold">BTU Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">100-400 sq ft</td>
                    <td className="py-3 px-4">1 ton</td>
                    <td className="py-3 px-4">12,000 BTU</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">400-600 sq ft</td>
                    <td className="py-3 px-4">1.5 ton</td>
                    <td className="py-3 px-4">18,000 BTU</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">600-900 sq ft</td>
                    <td className="py-3 px-4">2 ton</td>
                    <td className="py-3 px-4">24,000 BTU</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">900-1200 sq ft</td>
                    <td className="py-3 px-4">2.5-3 ton</td>
                    <td className="py-3 px-4">30,000-36,000 BTU</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">1200-1600 sq ft</td>
                    <td className="py-3 px-4">3-4 ton</td>
                    <td className="py-3 px-4">36,000-48,000 BTU</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-semibold mb-2">What does AC tonnage mean?</h3>
                <p className="text-muted-foreground">
                  AC tonnage refers to the cooling capacity of an air conditioner, not its weight. One ton equals 12,000 BTU (British Thermal Units) per hour – the amount of heat the unit can remove from a space in one hour. Common residential sizes range from 1.5 tons to 5 tons.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-semibold mb-2">How do I calculate what size AC I need?</h3>
                <p className="text-muted-foreground">
                  Start with your room's square footage and multiply by 20 BTU per square foot. Then adjust for ceiling height, insulation quality, climate, sun exposure, number of occupants, and heat-generating appliances. Divide your final BTU number by 12,000 to get the tonnage. Our calculator above does all of this automatically.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-semibold mb-2">Is it better to oversize or undersize an AC?</h3>
                <p className="text-muted-foreground">
                  Neither is ideal, but if you have to choose, slightly undersizing is generally better than oversizing. An oversized AC short-cycles, wastes energy, and fails to remove humidity properly. A slightly undersized unit will run longer but will still cool the space and manage humidity better. The best approach is getting the size as close to correct as possible.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-semibold mb-2">How many square feet does 1 ton cool?</h3>
                <p className="text-muted-foreground">
                  One ton of AC cooling typically handles 400-500 square feet under normal conditions. However, this varies significantly based on ceiling height, insulation, climate, and other factors. In hot climates or rooms with poor insulation, 1 ton might only cover 300-400 square feet.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-semibold mb-2">What happens if my AC is too big or too small?</h3>
                <p className="text-muted-foreground">
                  An AC that's too big will turn on and off frequently (short cycling), leading to poor humidity control, higher energy bills, uneven cooling, and increased wear on the compressor. An AC that's too small will run constantly, struggle to reach your desired temperature on hot days, wear out faster, and leave you uncomfortable. Both scenarios cost more money in the long run.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <p className="text-muted-foreground mb-6">
              Explore these calculators to help with your home cooling and energy planning:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/room-heater-wattage-calculator" className="p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold mb-1">Room Heater Wattage Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate the right heater wattage for your room size and heating needs.</p>
              </a>
              <a href="/calculators/hvac-btu-calculator" className="p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold mb-1">HVAC BTU Calculator</h3>
                <p className="text-sm text-muted-foreground">Determine BTU requirements for heating and cooling your entire home.</p>
              </a>
              <a href="/calculators/electricity-appliance-wattage-calculator" className="p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold mb-1">Electricity Appliance Wattage Calculator</h3>
                <p className="text-sm text-muted-foreground">Estimate power consumption and costs for your home appliances.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
