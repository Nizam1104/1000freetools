"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RoomHeaterWattageCalculatorPage() {
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("8");
  const [insulation, setInsulation] = useState<"poor" | "average" | "good" | "excellent">("average");
  const [climate, setClimate] = useState<"mild" | "moderate" | "cold" | "very-cold">("moderate");
  const [roomType, setRoomType] = useState<"bedroom" | "living-room" | "bathroom" | "kitchen" | "basement">("bedroom");
  const [windowType, setWindowType] = useState<"single" | "double" | "triple">("double");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [result, setResult] = useState<{
    requiredWatts: number;
    requiredBTU: number;
    recommendedHeater: string;
    estimatedCostPerHour: number;
    estimatedCostPerDay: number;
  } | null>(null);

  const calculate = () => {
    let length = parseFloat(roomLength);
    let width = parseFloat(roomWidth);
    let height = parseFloat(ceilingHeight) || 8;

    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) return;

    // Convert to feet if in meters
    if (unit === "meters") {
      length *= 3.28084;
      width *= 3.28084;
      height *= 3.28084;
    }

    // Calculate area and volume
    const area = length * width;
    const volume = area * height;

    // Base wattage calculation (10 watts per sq ft is standard baseline)
    let baseWatts = area * 10;

    // Ceiling height adjustment (standard is 8ft)
    if (height > 8) {
      baseWatts *= (height / 8);
    }

    // Insulation factor
    const insulationFactors = {
      poor: 1.5,
      average: 1.0,
      good: 0.8,
      excellent: 0.6,
    };

    // Climate factor (based on temperature difference needed)
    const climateFactors = {
      mild: 0.7,
      moderate: 1.0,
      cold: 1.3,
      "very-cold": 1.6,
    };

    // Room type factor
    const roomTypeFactors = {
      bedroom: 1.0,
      "living-room": 1.1,
      bathroom: 1.3,
      kitchen: 0.8, // Already has heat from appliances
      basement: 1.4, // Typically colder
    };

    // Window type factor
    const windowFactors = {
      single: 1.3,
      double: 1.0,
      triple: 0.85,
    };

    let requiredWatts = baseWatts;
    requiredWatts *= insulationFactors[insulation];
    requiredWatts *= climateFactors[climate];
    requiredWatts *= roomTypeFactors[roomType];
    requiredWatts *= windowFactors[windowType];

    // Round up to nearest 100W
    requiredWatts = Math.ceil(requiredWatts / 100) * 100;

    // Convert to BTU (1 watt = 3.412 BTU/hr)
    const requiredBTU = requiredWatts * 3.412;

    // Recommend heater type
    let recommendedHeater = "";
    if (requiredWatts <= 500) {
      recommendedHeater = "Personal/Desktop Heater (500W)";
    } else if (requiredWatts <= 1000) {
      recommendedHeater = "Small Space Heater (750-1000W)";
    } else if (requiredWatts <= 1500) {
      recommendedHeater = "Standard Space Heater (1500W)";
    } else if (requiredWatts <= 2000) {
      recommendedHeater = "Large Space Heater (2000W)";
    } else if (requiredWatts <= 3000) {
      recommendedHeater = "Heavy-Duty Heater (2500-3000W)";
    } else {
      recommendedHeater = "Multiple Heaters or Central Heating Required";
    }

    // Estimate running cost (assuming $0.13/kWh)
    const electricityRate = 0.13;
    const costPerHour = (requiredWatts / 1000) * electricityRate;
    const costPerDay = costPerHour * 8; // Assuming 8 hours/day

    setResult({
      requiredWatts,
      requiredBTU: Math.round(requiredBTU),
      recommendedHeater,
      estimatedCostPerHour: Math.round(costPerHour * 100) / 100,
      estimatedCostPerDay: Math.round(costPerDay * 100) / 100,
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
            Room Heater Wattage Calculator – Find the Right Heater Size for Your Room
          </h1>
          <p className="text-muted-foreground">
            Choose the right room heater with our Wattage Calculator. Enter your room dimensions,
            insulation level, and local climate to find the recommended heater wattage for
            efficient and comfortable heating.
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
                    placeholder={unit === "feet" ? "12" : "4"}
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Room Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder={unit === "feet" ? "10" : "3"}
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
                <Select value={roomType} onValueChange={(v) => setRoomType(v as "bedroom" | "living-room" | "bathroom" | "kitchen" | "basement")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="basement">Basement</SelectItem>
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
                    <SelectItem value="poor">Poor (Old/Drafty)</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="excellent">Excellent (Well Insulated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climate">Climate Zone</Label>
                <Select value={climate} onValueChange={(v) => setClimate(v as "mild" | "moderate" | "cold" | "very-cold")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild (50-60°F winter)</SelectItem>
                    <SelectItem value="moderate">Moderate (30-50°F winter)</SelectItem>
                    <SelectItem value="cold">Cold (10-30°F winter)</SelectItem>
                    <SelectItem value="very-cold">Very Cold (Below 10°F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="windowType">Window Type</Label>
                <Select value={windowType} onValueChange={(v) => setWindowType(v as "single" | "double" | "triple")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Pane</SelectItem>
                    <SelectItem value="double">Double Pane</SelectItem>
                    <SelectItem value="triple">Triple Pane</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Heater Recommendations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Recommended Heater</p>
                    <p className="text-xl font-bold text-primary">{result.recommendedHeater}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Power Required</p>
                      <p className="text-2xl font-bold">{result.requiredWatts} W</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">BTU/hr</p>
                      <p className="text-xl font-bold">{result.requiredBTU.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Running Cost</p>
                    <p className="text-lg font-bold">${result.estimatedCostPerHour.toFixed(2)}/hour</p>
                    <p className="text-sm text-muted-foreground">
                      ~${result.estimatedCostPerDay.toFixed(2)}/day (8 hours)
                    </p>
                  </div>

                  <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Safety tip:</strong> Never leave space heaters unattended. Keep
                      flammable materials at least 3 feet away.
                    </p>
                    <p>
                      <strong>Efficiency tip:</strong> Use a programmable thermostat and zone
                      heating to reduce energy costs.
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
          <h3 className="text-lg font-semibold mb-3">Heater Sizing Guide</h3>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Base Watts = Area (sq ft) × 10 W/sq ft</div>
            <div>Required Watts = Base × Insulation × Climate × Room Type × Windows</div>
            <div>BTU/hr = Watts × 3.412</div>
          </div>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Factor</th>
                <th className="text-left py-2">Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Poor insulation</td>
                <td className="py-2">+50% wattage needed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Very cold climate</td>
                <td className="py-2">+60% wattage needed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Single pane windows</td>
                <td className="py-2">+30% heat loss</td>
              </tr>
              <tr>
                <td className="py-2">High ceilings</td>
                <td className="py-2">Proportional increase</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">How This Heater Wattage Calculator Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
              <div>
                <p className="font-medium mb-1">Enter Your Room Details</p>
                <p className="text-muted-foreground">Input your room dimensions, ceiling height, and select the room type. The calculator also considers your insulation quality, local climate zone, and window type to account for heat loss factors.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
              <div>
                <p className="font-medium mb-1">We Calculate Heat Requirements</p>
                <p className="text-muted-foreground">Using the standard baseline of 10 watts per square foot, we apply adjustment factors for insulation, climate, room type, and windows. Higher ceilings increase the volume that needs heating, so we adjust accordingly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</div>
              <div>
                <p className="font-medium mb-1">Get Your Heater Recommendation</p>
                <p className="text-muted-foreground">The calculator returns the exact wattage and BTU output you need, recommends a specific heater size category, and estimates your running costs based on average electricity rates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features and Benefits Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Why Use This Calculator</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-1">Accurate Sizing</p>
              <p className="text-muted-foreground">Avoid the common mistake of buying a heater that is too small or wastefully oversized. Proper sizing ensures efficient heating and lower energy bills.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Climate-Aware Calculations</p>
              <p className="text-muted-foreground">Unlike basic calculators, we factor in your local climate zone. A room in Minnesota needs more heating power than the same room in Georgia.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Cost Estimates Included</p>
              <p className="text-muted-foreground">See estimated hourly and daily running costs based on your recommended heater size. This helps you budget for winter heating expenses before you buy.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Room-Specific Adjustments</p>
              <p className="text-muted-foreground">Different rooms have different heating needs. Bathrooms and basements require more power, while kitchens benefit from appliance heat.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">BTU and Watt Output</p>
              <p className="text-muted-foreground">Get both wattage and BTU measurements so you can shop confidently across different heater specifications and brands.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">How many watts do I need to heat a 12x12 room?</p>
              <p className="text-muted-foreground">A 12x12 room (144 sq ft) with average insulation and moderate climate needs approximately 1,440 watts. This calculator adjusts that baseline based on your specific conditions like ceiling height, insulation quality, and climate zone.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Is it better to have a higher wattage heater?</p>
              <p className="text-muted-foreground">Not necessarily. An oversized heater will cycle on and off frequently, wasting energy and creating uncomfortable temperature swings. An undersized heater will run constantly without reaching your desired temperature. The right size is the most efficient choice.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What is the difference between watts and BTU for heaters?</p>
              <p className="text-muted-foreground">Watts measure electrical power consumption, while BTU (British Thermal Units) measure heat output. One watt equals approximately 3.412 BTU per hour. Both numbers help you compare heaters, but BTU is more common for gas heaters while watts are used for electric models.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How much does it cost to run a 1500 watt heater?</p>
              <p className="text-muted-foreground">At the US average electricity rate of $0.13 per kWh, a 1500 watt heater costs about $0.20 per hour to run. Running it for 8 hours daily would cost roughly $1.56 per day or $47 per month.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Does poor insulation really affect heater size that much?</p>
              <p className="text-muted-foreground">Yes, significantly. Poor insulation can increase your heating needs by 50 percent or more. Drafty windows, uninsulated walls, and air leaks force your heater to work harder to maintain temperature. Improving insulation is often more cost-effective than buying a larger heater.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}

        {/* Reference Table: Heater Size by Room */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Quick Reference: Heater Size by Room</h2>
          <p className="text-muted-foreground mb-4">This table provides general guidelines for heater sizing under average conditions (8 ft ceilings, moderate climate, average insulation).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="text-left py-3 px-3">Room Size</th>
                  <th className="text-left py-3 px-3">Square Feet</th>
                  <th className="text-left py-3 px-3">Recommended Watts</th>
                  <th className="text-left py-3 px-3">BTU Output</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-3">Small bathroom</td>
                  <td className="py-3 px-3">40-60 sq ft</td>
                  <td className="py-3 px-3">500-750 W</td>
                  <td className="py-3 px-3">1,700-2,550 BTU</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Home office / Bedroom</td>
                  <td className="py-3 px-3">100-150 sq ft</td>
                  <td className="py-3 px-3">1,000-1,500 W</td>
                  <td className="py-3 px-3">3,400-5,100 BTU</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Living room</td>
                  <td className="py-3 px-3">200-300 sq ft</td>
                  <td className="py-3 px-3">2,000-3,000 W</td>
                  <td className="py-3 px-3">6,800-10,200 BTU</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Large basement</td>
                  <td className="py-3 px-3">400-500 sq ft</td>
                  <td className="py-3 px-3">4,000-5,000 W</td>
                  <td className="py-3 px-3">13,600-17,000 BTU</td>
                </tr>
                <tr>
                  <td className="py-3 px-3">Open floor plan</td>
                  <td className="py-3 px-3">600+ sq ft</td>
                  <td className="py-3 px-3">Multiple heaters or central heat</td>
                  <td className="py-3 px-3">20,000+ BTU</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Note: These are baseline estimates. Use the calculator above for precise recommendations based on your specific room conditions.</p>
        </div>
      </div>
    </div>
  );
}
