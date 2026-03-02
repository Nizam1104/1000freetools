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

interface TorqueResult {
  loadMass: number;
  armLength: number;
  requiredTorque: number;
  motorTorque: number;
  gearRatio: number;
  motorSpeed: number;
  power: number;
  safetyFactor: number;
  recommendations: string[];
}

export default function RobotMotorTorqueCalculatorPage() {
  const [loadMass, setLoadMass] = useState<string>("");
  const [armLength, setArmLength] = useState<string>("");
  const [desiredSpeed, setDesiredSpeed] = useState<string>("");
  const [frictionCoeff, setFrictionCoeff] = useState<string>("0.1");
  const [safetyFactor, setSafetyFactor] = useState<string>("1.5");
  const [unit, setUnit] = useState<string>("metric");
  const [result, setResult] = useState<TorqueResult | null>(null);

  const calculate = () => {
    const massNum = parseFloat(loadMass) || 0;
    const armNum = parseFloat(armLength) || 0;
    const speedNum = parseFloat(desiredSpeed) || 0;
    const frictionNum = parseFloat(frictionCoeff) || 0.1;
    const safetyNum = parseFloat(safetyFactor) || 1.5;

    if (massNum === 0 || armNum === 0) return;

    // Calculate required torque
    // Torque = Force × Distance
    // Force = mass × gravity × (1 + friction)
    const gravity = 9.81;
    const force = massNum * gravity * (1 + frictionNum);
    
    // Required torque at the joint
    const requiredTorque = force * armNum * safetyNum;

    // Motor torque (assuming direct drive, adjust for gear ratio)
    // For typical robot applications, gear ratio of 10-100:1 is common
    const gearRatio = 50;
    const motorTorque = requiredTorque / gearRatio;

    // Motor speed (RPM) based on desired angular velocity
    // ω = v/r, RPM = ω × 60 / (2π)
    const angularVel = speedNum / armNum; // rad/s
    const motorSpeed = (angularVel * gearRatio * 60) / (2 * Math.PI);

    // Power calculation (Watts)
    // P = Torque × Angular Velocity
    const power = requiredTorque * angularVel;

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🔧 Required torque at joint: ${requiredTorque.toFixed(2)} Nm`);
    recommendations.push(`⚙️ With ${gearRatio}:1 gear ratio, motor needs ${motorTorque.toFixed(3)} Nm`);
    recommendations.push(`🔄 Motor speed: ${motorSpeed.toFixed(0)} RPM`);
    recommendations.push(`⚡ Power requirement: ${power.toFixed(1)} W`);

    if (requiredTorque > 10) {
      recommendations.push("⚠️ High torque application - consider brushless motor");
    }

    if (power > 100) {
      recommendations.push("🔋 Ensure adequate power supply capacity");
    }

    recommendations.push("🛡️ Safety factor of " + safetyNum + "× applied");
    recommendations.push("📐 Consider adding encoder for position control");

    setResult({
      loadMass: massNum,
      armLength: armNum,
      requiredTorque: parseFloat(requiredTorque.toFixed(2)),
      motorTorque: parseFloat(motorTorque.toFixed(3)),
      gearRatio,
      motorSpeed: parseFloat(motorSpeed.toFixed(0)),
      power: parseFloat(power.toFixed(1)),
      safetyFactor: safetyNum,
      recommendations,
    });
  };

  const reset = () => {
    setLoadMass("");
    setArmLength("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators
          </h1>
          <p className="text-muted-foreground">
            Select the right motor for your robot with our Torque Calculator.
            Input the load weight, moment arm, speed requirements, and friction
            coefficients to calculate minimum required torque — essential for
            robotics engineers and makers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="load-mass">Load Mass (kg)</Label>
                <Input
                  id="load-mass"
                  type="number"
                  value={loadMass}
                  onChange={(e) => setLoadMass(e.target.value)}
                  placeholder="e.g., 2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="arm-length">Arm Length / Radius (m)</Label>
                <Input
                  id="arm-length"
                  type="number"
                  step="0.01"
                  value={armLength}
                  onChange={(e) => setArmLength(e.target.value)}
                  placeholder="e.g., 0.15"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desired-speed">Desired Linear Speed (m/s)</Label>
                <Input
                  id="desired-speed"
                  type="number"
                  step="0.1"
                  value={desiredSpeed}
                  onChange={(e) => setDesiredSpeed(e.target.value)}
                  placeholder="e.g., 0.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="friction">Friction Coefficient</Label>
                  <Input
                    id="friction"
                    type="number"
                    step="0.01"
                    value={frictionCoeff}
                    onChange={(e) => setFrictionCoeff(e.target.value)}
                    placeholder="0.1"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="safety">Safety Factor</Label>
                  <Input
                    id="safety"
                    type="number"
                    step="0.1"
                    value={safetyFactor}
                    onChange={(e) => setSafetyFactor(e.target.value)}
                    placeholder="1.5"
                  />
                </div>
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
              <h3 className="text-lg font-semibold mb-4">Torque Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Required Torque</p>
                    <p className="text-4xl font-bold text-primary">{result.requiredTorque} Nm</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      at joint (with {result.safetyFactor}× safety)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Motor Torque</p>
                      <p className="text-lg font-bold">{result.motorTorque} Nm</p>
                      <p className="text-xs text-muted-foreground">@ {result.gearRatio}:1</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Motor Speed</p>
                      <p className="text-lg font-bold">{result.motorSpeed} RPM</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Load Mass:</span>
                      <span className="font-semibold">{result.loadMass} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Arm Length:</span>
                      <span className="font-semibold">{result.armLength} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Power Required:</span>
                      <span className="font-semibold">{result.power} W</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter robot parameters and click Calculate to see requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Motor Selection Tips
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Safety factor:</strong> 1.5-2× for dynamic loads
                  </li>
                  <li>
                    <strong>Gear ratio:</strong> Higher ratio = more torque, less speed
                  </li>
                  <li>
                    <strong>Brushless motors:</strong> Better efficiency and control
                  </li>
                  <li>
                    <strong>Stepper motors:</strong> Good for precise positioning
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> Torque = Mass × Gravity × Arm Length × Safety Factor
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
