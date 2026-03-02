"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TurningRadiusResult {
  turningRadius: number;
  turningDiameter: number;
  curbToCurb: number;
  wallToWall: number;
  ackermanAngle: number;
  innerWheelAngle: number;
}

export default function VehicleTurningRadiusCalculatorPage() {
  const [wheelbase, setWheelbase] = useState<string>("");
  const [frontTrack, setFrontTrack] = useState<string>("");
  const [steeringAngle, setSteeringAngle] = useState<string>("");
  const [unit, setUnit] = useState<string>("inches");
  const [result, setResult] = useState<TurningRadiusResult | null>(null);

  const calculate = () => {
    const wb = parseFloat(wheelbase);
    const ft = parseFloat(frontTrack);
    const sa = parseFloat(steeringAngle);

    if (isNaN(wb) || isNaN(ft) || isNaN(sa)) return;

    // Convert to inches if needed
    let wheelbaseIn = wb;
    let frontTrackIn = ft;

    if (unit === "mm") {
      wheelbaseIn = wb / 25.4;
      frontTrackIn = ft / 25.4;
    } else if (unit === "cm") {
      wheelbaseIn = wb / 2.54;
      frontTrackIn = ft / 2.54;
    } else if (unit === "meters") {
      wheelbaseIn = wb / 0.0254;
      frontTrackIn = ft / 0.0254;
    }

    // Convert steering angle to radians
    const steeringAngleRad = (sa * Math.PI) / 180;

    // Calculate turning radius (curb-to-curb)
    // Formula: R = wheelbase / sin(steering angle)
    const turningRadius = wheelbaseIn / Math.sin(steeringAngleRad);

    // Turning diameter (curb-to-curb)
    const turningDiameter = turningRadius * 2;

    // Wall-to-wall turning diameter (includes vehicle overhang)
    // Add front track as approximation for additional clearance needed
    const wallToWall = turningDiameter + (frontTrackIn * 0.5);

    // Curb-to-curb (just the path of the outer front wheel)
    const curbToCurb = turningDiameter;

    // Ackerman angle (inner wheel turns at a sharper angle)
    // Simplified calculation
    const ackermanAngle = sa * 1.15; // Inner wheel typically turns 15% more

    // Inner wheel angle
    const innerWheelAngle = Math.min(ackermanAngle, 45);

    setResult({
      turningRadius: parseFloat(turningRadius.toFixed(1)),
      turningDiameter: parseFloat(turningDiameter.toFixed(1)),
      curbToCurb: parseFloat(curbToCurb.toFixed(1)),
      wallToWall: parseFloat(wallToWall.toFixed(1)),
      ackermanAngle: parseFloat(ackermanAngle.toFixed(1)),
      innerWheelAngle: parseFloat(innerWheelAngle.toFixed(1)),
    });
  };

  const reset = () => {
    setWheelbase("");
    setFrontTrack("");
    setSteeringAngle("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Vehicle Turning Radius Calculator – Calculate Minimum Turning Circle for Any Car
          </h1>
          <p className="text-muted-foreground">
            Plan parking and maneuvering with precision using our Vehicle Turning Radius Calculator.
            Enter wheelbase, front track width, and maximum steering angle to calculate the minimum
            turning circle — useful for driving schools, fleet managers, and automotive engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wheelbase">Wheelbase</Label>
                <Input
                  id="wheelbase"
                  type="number"
                  value={wheelbase}
                  onChange={(e) => setWheelbase(e.target.value)}
                  placeholder="e.g., 106"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="front-track">Front Track Width</Label>
                <Input
                  id="front-track"
                  type="number"
                  value={frontTrack}
                  onChange={(e) => setFrontTrack(e.target.value)}
                  placeholder="e.g., 62"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steering-angle">Maximum Steering Angle (degrees)</Label>
                <Input
                  id="steering-angle"
                  type="number"
                  value={steeringAngle}
                  onChange={(e) => setSteeringAngle(e.target.value)}
                  placeholder="e.g., 30"
                />
                <p className="text-xs text-muted-foreground">
                  Typical values: 25-35° for passenger cars
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <select
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="inches">Inches</option>
                  <option value="mm">Millimeters</option>
                  <option value="cm">Centimeters</option>
                  <option value="meters">Meters</option>
                </select>
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
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Turning Radius</p>
                      <p className="text-2xl font-bold text-primary">
                        {result.turningRadius}&quot;
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(result.turningRadius / 12).toFixed(2)} ft
                      </p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Turning Diameter</p>
                      <p className="text-2xl font-bold text-primary">
                        {result.turningDiameter}&quot;
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(result.turningDiameter / 12).toFixed(2)} ft
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Curb-to-Curb:</span>
                      <span className="font-semibold">
                        {result.curbToCurb}&quot; ({(result.curbToCurb / 12).toFixed(1)} ft)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Wall-to-Wall:</span>
                      <span className="font-semibold">
                        {result.wallToWall}&quot; ({(result.wallToWall / 12).toFixed(1)} ft)
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Inner Wheel Angle:</span>
                      <span className="font-semibold">{result.innerWheelAngle}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ackerman Angle:</span>
                      <span className="font-semibold">{result.ackermanAngle}°</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Interpretation:</strong> Your vehicle needs a minimum space of{" "}
                      <strong>{(result.wallToWall / 12).toFixed(1)} feet</strong> to complete a full turn.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter vehicle specifications and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Turning Radius
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The turning radius is the minimum radius of a circular path that a vehicle
                  can make. A smaller turning radius means better maneuverability in tight spaces.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Wheelbase:</strong> Distance between front and rear axles.
                    Shorter wheelbase = tighter turning.
                  </li>
                  <li>
                    <strong>Steering Angle:</strong> Maximum angle the front wheels can turn.
                    Greater angle = tighter turning.
                  </li>
                  <li>
                    <strong>Curb-to-Curb:</strong> Minimum road width needed (outer wheel path).
                  </li>
                  <li>
                    <strong>Wall-to-Wall:</strong> Total space including vehicle overhang.
                  </li>
                </ul>
                <p>
                  <strong>Typical Values:</strong> Compact cars: 17-18 ft | Sedans: 18-20 ft |
                  SUVs/Trucks: 20-24 ft
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
