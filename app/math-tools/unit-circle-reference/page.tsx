"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UnitCircleReference() {
  const [selectedAngle, setSelectedAngle] = useState<number | null>(null);

  const unitCircleData = [
    { deg: 0, rad: "0", x: 1, y: 0, cos: "1", sin: "0", tan: "0" },
    { deg: 30, rad: "π/6", x: 0.866, y: 0.5, cos: "√3/2", sin: "1/2", tan: "√3/3" },
    { deg: 45, rad: "π/4", x: 0.707, y: 0.707, cos: "√2/2", sin: "√2/2", tan: "1" },
    { deg: 60, rad: "π/3", x: 0.5, y: 0.866, cos: "1/2", sin: "√3/2", tan: "√3" },
    { deg: 90, rad: "π/2", x: 0, y: 1, cos: "0", sin: "1", tan: "undefined" },
    { deg: 120, rad: "2π/3", x: -0.5, y: 0.866, cos: "-1/2", sin: "√3/2", tan: "-√3" },
    { deg: 135, rad: "3π/4", x: -0.707, y: 0.707, cos: "-√2/2", sin: "√2/2", tan: "-1" },
    { deg: 150, rad: "5π/6", x: -0.866, y: 0.5, cos: "-√3/2", sin: "1/2", tan: "-√3/3" },
    { deg: 180, rad: "π", x: -1, y: 0, cos: "-1", sin: "0", tan: "0" },
    { deg: 210, rad: "7π/6", x: -0.866, y: -0.5, cos: "-√3/2", sin: "-1/2", tan: "√3/3" },
    { deg: 225, rad: "5π/4", x: -0.707, y: -0.707, cos: "-√2/2", sin: "-√2/2", tan: "1" },
    { deg: 240, rad: "4π/3", x: -0.5, y: -0.866, cos: "-1/2", sin: "-√3/2", tan: "√3" },
    { deg: 270, rad: "3π/2", x: 0, y: -1, cos: "0", sin: "-1", tan: "undefined" },
    { deg: 300, rad: "5π/3", x: 0.5, y: -0.866, cos: "1/2", sin: "-√3/2", tan: "-√3" },
    { deg: 315, rad: "7π/4", x: 0.707, y: -0.707, cos: "√2/2", sin: "-√2/2", tan: "-1" },
    { deg: 330, rad: "11π/6", x: 0.866, y: -0.5, cos: "√3/2", sin: "-1/2", tan: "-√3/3" },
    { deg: 360, rad: "2π", x: 1, y: 0, cos: "1", sin: "0", tan: "0" },
  ];

  const selectedData = selectedAngle !== null ? unitCircleData.find(d => d.deg === selectedAngle) : null;

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Unit Circle Reference Tool – Interactive Unit Circle Chart</h1>
        <p className="text-muted-foreground">
          Explore the complete unit circle with our free interactive unit circle reference tool. View all key angles in degrees and radians with their exact trig values and coordinates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Unit Circle</CardTitle>
          <CardDescription>
            Select an angle to view its coordinates and trigonometric values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Select Angle</Label>
              <Select value={selectedAngle?.toString() || ""} onValueChange={(v) => setSelectedAngle(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an angle..." />
                </SelectTrigger>
                <SelectContent>
                  {unitCircleData.map((item) => (
                    <SelectItem key={item.deg} value={item.deg.toString()}>
                      {item.deg}° ({item.rad})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedData && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Angle</p>
                    <p className="text-2xl font-bold">{selectedData.deg}°</p>
                    <p className="text-sm font-mono">{selectedData.rad}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Coordinates (x, y)</p>
                    <p className="text-2xl font-bold">({selectedData.x}, {selectedData.y})</p>
                    <p className="text-sm font-mono">({selectedData.cos}, {selectedData.sin})</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Quadrant</p>
                    <p className="text-2xl font-bold">
                      {selectedData.deg < 90 ? "I" : selectedData.deg < 180 ? "II" : selectedData.deg < 270 ? "III" : selectedData.deg < 360 ? "IV" : "Axis"}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">cos(θ)</p>
                    <p className="text-xl font-mono">{selectedData.cos}</p>
                    <p className="text-xs text-muted-foreground">= {selectedData.x}</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">sin(θ)</p>
                    <p className="text-xl font-mono">{selectedData.sin}</p>
                    <p className="text-xs text-muted-foreground">= {selectedData.y}</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">tan(θ)</p>
                    <p className="text-xl font-mono">{selectedData.tan}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complete Unit Circle Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Angle (°)</th>
                  <th className="text-left p-2">Angle (rad)</th>
                  <th className="text-center p-2">cos(θ)</th>
                  <th className="text-center p-2">sin(θ)</th>
                  <th className="text-center p-2">tan(θ)</th>
                  <th className="text-center p-2">Coordinates</th>
                </tr>
              </thead>
              <tbody>
                {unitCircleData.map((item) => (
                  <tr
                    key={item.deg}
                    className={`border-b cursor-pointer hover:bg-muted ${selectedAngle === item.deg ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedAngle(item.deg)}
                  >
                    <td className="p-2 font-semibold">{item.deg}°</td>
                    <td className="p-2 font-mono">{item.rad}</td>
                    <td className="text-center p-2 font-mono">{item.cos}</td>
                    <td className="text-center p-2 font-mono">{item.sin}</td>
                    <td className="text-center p-2 font-mono">{item.tan}</td>
                    <td className="text-center p-2 font-mono">({item.x}, {item.y})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding the Unit Circle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The unit circle is a circle with radius 1 centered at the origin. Every point on the circle has coordinates (cos θ, sin θ) where θ is the angle from the positive x-axis.
          </p>
          <p className="text-sm text-muted-foreground">
            The x-coordinate equals cosine of the angle. The y-coordinate equals sine of the angle. Tangent is y/x or sin/cos. This geometric representation makes trig functions intuitive.
          </p>
          <p className="text-sm text-muted-foreground">
            Notice the patterns. In quadrant I, all values are positive. In quadrant II, only sine is positive. In quadrant III, only tangent is positive. In quadrant IV, only cosine is positive. Remember "All Students Take Calculus" for the positive functions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
