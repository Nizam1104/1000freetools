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

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">How This Robot Motor Torque Calculator Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
              <div>
                <p className="font-medium mb-1">Input Your Robot Parameters</p>
                <p className="text-muted-foreground">Enter the load mass your motor needs to move, the arm length or wheel radius, and your desired speed. Add friction coefficient and safety factor for more accurate results.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
              <div>
                <p className="font-medium mb-1">We Calculate Torque Requirements</p>
                <p className="text-muted-foreground">Using physics formulas, we compute the force needed to move your load against gravity and friction. Then we multiply by the arm length to get torque, applying your safety factor for real-world conditions.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</div>
              <div>
                <p className="font-medium mb-1">Get Motor Specifications</p>
                <p className="text-muted-foreground">The calculator returns required torque at the joint, motor torque with gear reduction, expected motor speed in RPM, and power requirements. Recommendations help you choose the right motor type.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features and Benefits Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Why Engineers Use This Calculator</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-1">Physics-Based Calculations</p>
              <p className="text-muted-foreground">Built on fundamental mechanics formulas, this calculator accounts for gravity, friction, and leverage. The results reflect real-world forces your motor must overcome.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Safety Factor Built In</p>
              <p className="text-muted-foreground">Dynamic loads, wear, and unexpected conditions require margin. The default 1.5× safety factor ensures your motor can handle more than just ideal conditions.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Gear Ratio Considerations</p>
              <p className="text-muted-foreground">Most robot applications use gear reduction to multiply torque. We show both joint torque and motor torque with a typical 50:1 ratio so you can select appropriate motors and gearboxes.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Speed and Power Output</p>
              <p className="text-muted-foreground">Torque alone is not enough. The calculator also provides motor speed in RPM and power in watts, helping you match motors to your performance requirements.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Motor Type Guidance</p>
              <p className="text-muted-foreground">High torque applications get flagged for brushless motors. Power requirements help you size your battery and electronics. Position control needs are noted for encoder selection.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">How do I calculate torque needed for a robot arm?</p>
              <p className="text-muted-foreground">Multiply the load mass by gravity (9.81 m/s²), then by the arm length from the joint to the load center. Add friction effects and apply a safety factor of 1.5 to 2. For example, a 2 kg load at 0.15 meters needs about 4.4 Nm with standard safety margins.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What is a good safety factor for robot motors?</p>
              <p className="text-muted-foreground">For most hobby and educational robots, a safety factor of 1.5 to 2 works well. Industrial applications may use 2 to 3 or higher. Dynamic loads, sudden stops, and external forces all justify additional margin beyond calculated minimums.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Should I use a geared motor or direct drive?</p>
              <p className="text-muted-foreground">Geared motors provide much higher torque at lower speeds, which suits most robot applications. Direct drive works for high-speed, low-torque needs. A 50:1 gear ratio multiplies motor torque fifty times while reducing output speed proportionally.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What type of motor is best for robotics?</p>
              <p className="text-muted-foreground">Brushless DC motors offer the best efficiency and power-to-weight ratio for most applications. Stepper motors work well for precise positioning without encoders. Servo motors provide closed-loop control. Choose based on your torque, speed, and control requirements.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How does friction affect motor torque calculations?</p>
              <p className="text-muted-foreground">Friction increases the force your motor must produce. A friction coefficient of 0.1 adds 10 percent to the required force. Wheel robots on rough terrain or arms with stiff bearings need higher friction coefficients in calculations.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Related Engineering Calculators</h2>
          <div className="space-y-3">
            <div>
              <a href="/calculators/gear-ratio-calculator" className="text-primary hover:underline font-medium">Gear Ratio Calculator</a>
              <p className="text-muted-foreground text-sm">Calculate gear ratios, output speed, and torque multiplication for your robot drivetrain or actuator system.</p>
            </div>
            <div>
              <a href="/calculators/power-consumption-calculator" className="text-primary hover:underline font-medium">Battery Power Consumption Calculator</a>
              <p className="text-muted-foreground text-sm">Estimate runtime and power requirements for your robot based on motor specifications and battery capacity.</p>
            </div>
            <div>
              <a href="/calculators/speed-distance-time-calculator" className="text-primary hover:underline font-medium">Speed Distance Time Calculator</a>
              <p className="text-muted-foreground text-sm">Plan robot movement profiles and calculate travel times based on speed and distance requirements.</p>
            </div>
          </div>
        </div>

        {/* Reference Table: Motor Types */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Motor Types for Robotics</h2>
          <p className="text-muted-foreground mb-4">This comparison helps you select the right motor technology based on your torque, speed, and control requirements.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="text-left py-3 px-3">Motor Type</th>
                  <th className="text-left py-3 px-3">Torque Range</th>
                  <th className="text-left py-3 px-3">Best For</th>
                  <th className="text-left py-3 px-3">Control Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-3">Brushed DC</td>
                  <td className="py-3 px-3">Low to Medium</td>
                  <td className="py-3 px-3">Simple robots, low cost builds</td>
                  <td className="py-3 px-3">Easy (H-bridge)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Brushless DC (BLDC)</td>
                  <td className="py-3 px-3">Medium to High</td>
                  <td className="py-3 px-3">Drones, high-performance robots</td>
                  <td className="py-3 px-3">Moderate (ESC required)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Stepper Motor</td>
                  <td className="py-3 px-3">Low to Medium</td>
                  <td className="py-3 px-3">3D printers, CNC, precise positioning</td>
                  <td className="py-3 px-3">Moderate (driver board)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Servo Motor</td>
                  <td className="py-3 px-3">Low to High</td>
                  <td className="py-3 px-3">Robot arms, legged robots, RC</td>
                  <td className="py-3 px-3">Easy (PWM control)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Coreless Motor</td>
                  <td className="py-3 px-3">Very Low</td>
                  <td className="py-3 px-3">Micro robots, vibration motors</td>
                  <td className="py-3 px-3">Easy (H-bridge)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3">Linear Actuator</td>
                  <td className="py-3 px-3">High</td>
                  <td className="py-3 px-3">Push-pull applications, lifts</td>
                  <td className="py-3 px-3">Easy (relay or H-bridge)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Note: Torque ranges are general guidelines. Actual performance depends on motor size, quality, and gearing.</p>
        </div>

        {/* Torque Formula Reference */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Torque Calculation Formulas</h2>
          <p className="text-muted-foreground mb-4">Understanding the math behind the calculator helps you verify results and adapt calculations for special cases.</p>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">Basic Torque Formula</p>
              <p className="font-mono text-sm">Torque = Force × Distance</p>
              <p className="text-sm text-muted-foreground mt-2">Where Force = Mass × Gravity and Distance is the perpendicular arm length from joint to load.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">With Friction</p>
              <p className="font-mono text-sm">Force = Mass × Gravity × (1 + Friction Coefficient)</p>
              <p className="text-sm text-muted-foreground mt-2">Friction coefficient ranges from 0.05 (well-lubricated bearings) to 0.5+ (rough surfaces).</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">With Safety Factor</p>
              <p className="font-mono text-sm">Required Torque = Calculated Torque × Safety Factor</p>
              <p className="text-sm text-muted-foreground mt-2">Safety factors of 1.5 to 2 account for dynamic loads, wear, and unexpected conditions.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">Power Calculation</p>
              <p className="font-mono text-sm">Power (Watts) = Torque (Nm) × Angular Velocity (rad/s)</p>
              <p className="text-sm text-muted-foreground mt-2">This determines minimum motor power rating and helps size your battery and electronics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
