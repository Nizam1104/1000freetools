"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FlooringCalculator() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [material, setMaterial] = useState<"planks" | "tiles" | "rolls">("planks");
  const [plankLength, setPlankLength] = useState<string>("");
  const [plankWidth, setPlankWidth] = useState<string>("");
  const [tileSize, setTileSize] = useState<string>("");
  const [rollWidth, setRollWidth] = useState<string>("");
  const [waste, setWaste] = useState<string>("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const wasteFactor = 1 + parseFloat(waste) / 100;
    const roomArea = L * W;

    if (L > 0 && W > 0) {
      let result: any = { roomArea };

      if (material === "planks") {
        const pL = parseFloat(plankLength) / 100;
        const pW = parseFloat(plankWidth) / 100;
        if (pL > 0 && pW > 0) {
          const plankArea = pL * pW;
          result.planks = Math.ceil((roomArea / plankArea) * wasteFactor);
          result.boxes = Math.ceil(result.planks / 8);
        }
      } else if (material === "tiles") {
        const tS = parseFloat(tileSize) / 100;
        if (tS > 0) {
          const tileArea = tS * tS;
          result.tiles = Math.ceil((roomArea / tileArea) * wasteFactor);
          result.boxes = Math.ceil(result.tiles / 10);
        }
      } else {
        const rW = parseFloat(rollWidth);
        if (rW > 0) {
          result.rollLength = Math.ceil((roomArea * wasteFactor) / rW * 10) / 10;
          result.rolls = Math.ceil(result.rollLength / 10);
        }
      }

      setResults(result);
    }
  };

  const reset = () => {
    setLength(""); setWidth(""); setPlankLength(""); setPlankWidth("");
    setTileSize(""); setRollWidth(""); setWaste("10"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Room Length (m)</Label><Input value={length} onChange={e => setLength(e.target.value)} /></div>
              <div><Label>Room Width (m)</Label><Input value={width} onChange={e => setWidth(e.target.value)} /></div>
            </div>

            <div>
              <Label>Material Type</Label>
              <Select value={material} onValueChange={(v) => setMaterial(v as typeof material)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planks">Planks/Laminate</SelectItem>
                  <SelectItem value="tiles">Tiles</SelectItem>
                  <SelectItem value="rolls">Rolls/Vinyl</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {material === "planks" && (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Plank Length (cm)</Label><Input value={plankLength} onChange={e => setPlankLength(e.target.value)} /></div>
                <div><Label>Plank Width (cm)</Label><Input value={plankWidth} onChange={e => setPlankWidth(e.target.value)} /></div>
              </div>
            )}

            {material === "tiles" && (
              <div>
                <Label>Tile Size (cm)</Label>
                <Input value={tileSize} onChange={e => setTileSize(e.target.value)} placeholder="e.g., 60" />
              </div>
            )}

            {material === "rolls" && (
              <div>
                <Label>Roll Width (m)</Label>
                <Input value={rollWidth} onChange={e => setRollWidth(e.target.value)} placeholder="e.g., 2" />
              </div>
            )}

            <div>
              <Label>Waste Factor (%)</Label>
              <Input value={waste} onChange={e => setWaste(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Room Area</p>
                  <p className="text-2xl font-bold">{Math.round(results.roomArea * 100) / 100} m²</p>
                </div>
                {material === "planks" && (
                  <>
                    <p className="text-lg font-bold">{results.planks} planks</p>
                    <p className="text-sm text-muted-foreground">≈ {results.boxes} boxes (8 planks/box)</p>
                  </>
                )}
                {material === "tiles" && (
                  <>
                    <p className="text-lg font-bold">{results.tiles} tiles</p>
                    <p className="text-sm text-muted-foreground">≈ {results.boxes} boxes (10 tiles/box)</p>
                  </>
                )}
                {material === "rolls" && (
                  <>
                    <p className="text-lg font-bold">{results.rollLength} linear meters</p>
                    <p className="text-sm text-muted-foreground">≈ {results.rolls} rolls (10m each)</p>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Flooring Materials Needed</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Measure Your Room</h3>
              <p className="text-sm text-muted-foreground">Measure the length and width of your room in meters. For irregular rooms, measure each section separately.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Select Material Type</h3>
              <p className="text-sm text-muted-foreground">Choose planks, tiles, or rolls and enter the individual piece dimensions for accurate calculations.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Material Quantities</h3>
              <p className="text-sm text-muted-foreground">Receive exact piece counts and box quantities including waste factor for cuts and mistakes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Why Use This Flooring Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Multiple Material Types</h3>
            <p className="text-sm text-muted-foreground">Supports laminate planks, ceramic tiles, and vinyl rolls with material-specific calculations.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Waste Factor Included</h3>
            <p className="text-sm text-muted-foreground">Automatically adds 10-15% extra material for cuts, mistakes, and future repairs.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Box Quantity Estimates</h3>
            <p className="text-sm text-muted-foreground">Converts piece counts to box quantities (8 planks/box, 10 tiles/box) for easy shopping.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Accurate Area Calculation</h3>
            <p className="text-sm text-muted-foreground">Calculates total square meters to help compare material costs across different products.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Recommended Waste Factors by Material</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Material Type</th>
                <th className="text-left py-2">Waste Factor</th>
                <th className="text-left py-2">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Laminate Planks</td>
                <td className="py-2">10%</td>
                <td className="py-2">Simple rectangular rooms</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Ceramic Tiles</td>
                <td className="py-2">15%</td>
                <td className="py-2">Rooms with obstacles/corners</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Vinyl Rolls</td>
                <td className="py-2">10%</td>
                <td className="py-2">Large open areas</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Hardwood Planks</td>
                <td className="py-2">15-20%</td>
                <td className="py-2">Diagonal patterns</td>
              </tr>
              <tr>
                <td className="py-2">Patterned Tiles</td>
                <td className="py-2">20%+</td>
                <td className="py-2">Complex layouts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How do I measure my room for flooring?</h3>
            <p className="text-sm text-muted-foreground">Measure the longest length and widest width of the room. For L-shaped rooms, split into rectangles and add the areas. Don&apos;t subtract for closets or built-ins - you&apos;ll need flooring there too.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How many boxes of flooring do I need?</h3>
            <p className="text-sm text-muted-foreground">Divide your total square footage by the coverage per box, then add 10-15% for waste. For example, a 20 sqm room with 2 sqm/box needs 10 boxes plus 1-2 extra for waste.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Should I buy extra flooring?</h3>
            <p className="text-sm text-muted-foreground">Yes, always buy 10-15% extra for waste from cuts and future repairs. Flooring from different batches may have color variations, making replacements difficult later.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How many tiles do I need for a 10x10 room?</h3>
            <p className="text-sm text-muted-foreground">A 10x10 ft room is 100 sq ft. For 12x12 inch tiles (1 sq ft each), you need 100 tiles plus 15% waste = 115 tiles. For 60x60 cm tiles, calculate in square meters.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What&apos;s the difference between laminate and vinyl flooring?</h3>
            <p className="text-sm text-muted-foreground">Laminate has a wood fiber core with a photographic layer, while vinyl is 100% synthetic. Vinyl is more water-resistant; laminate feels more like real wood. Both come in planks and tiles.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
