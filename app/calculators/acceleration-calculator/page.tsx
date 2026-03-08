"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccelerationCalculator() {
  // Mode 1: a = (v_f - v_i) / t
  const [initialVelocity, setInitialVelocity] = useState<string>("");
  const [finalVelocity, setFinalVelocity] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [acceleration, setAcceleration] = useState<number | null>(null);

  // Mode 2: F = ma
  const [force, setForce] = useState<string>("");
  const [mass, setMass] = useState<string>("");
  const [accelerationFromForce, setAccelerationFromForce] = useState<number | null>(null);

  const calculateAcceleration = () => {
    const vi = parseFloat(initialVelocity);
    const vf = parseFloat(finalVelocity);
    const t = parseFloat(time);

    if (isNaN(vi) || isNaN(vf) || isNaN(t) || t <= 0) return;

    const a = (vf - vi) / t;
    setAcceleration(Math.round(a * 100) / 100);
  };

  const calculateFromForce = () => {
    const F = parseFloat(force);
    const m = parseFloat(mass);

    if (isNaN(F) || isNaN(m) || m <= 0) return;

    const a = F / m;
    setAccelerationFromForce(Math.round(a * 100) / 100);
  };

  const resetVelocityMode = () => {
    setInitialVelocity("");
    setFinalVelocity("");
    setTime("");
    setAcceleration(null);
  };

  const resetForceMode = () => {
    setForce("");
    setMass("");
    setAccelerationFromForce(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <Tabs defaultValue="velocity" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="velocity">Change in Velocity</TabsTrigger>
              <TabsTrigger value="force">F = ma Mode</TabsTrigger>
            </TabsList>

            <TabsContent value="velocity" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="initialVelocity">Initial Velocity (m/s)</Label>
                <Input
                  id="initialVelocity"
                  type="number"
                  placeholder="e.g., 0"
                  value={initialVelocity}
                  onChange={(e) => setInitialVelocity(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="finalVelocity">Final Velocity (m/s)</Label>
                <Input
                  id="finalVelocity"
                  type="number"
                  placeholder="e.g., 20"
                  value={finalVelocity}
                  onChange={(e) => setFinalVelocity(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="time">Time (s)</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="e.g., 5"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateAcceleration}>Calculate Acceleration</Button>
                <Button variant="outline" onClick={resetVelocityMode}>Reset</Button>
              </div>

              {acceleration !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Acceleration</p>
                    <p className="text-4xl font-bold mt-1">{acceleration} m/s²</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: a = (v_f - v_i) / t</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="force" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="force">Force (N)</Label>
                <Input
                  id="force"
                  type="number"
                  placeholder="e.g., 100"
                  value={force}
                  onChange={(e) => setForce(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="mass">Mass (kg)</Label>
                <Input
                  id="mass"
                  type="number"
                  placeholder="e.g., 10"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateFromForce}>Calculate Acceleration</Button>
                <Button variant="outline" onClick={resetForceMode}>Reset</Button>
              </div>

              {accelerationFromForce !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Acceleration</p>
                    <p className="text-4xl font-bold mt-1">{accelerationFromForce} m/s²</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: a = F / m</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* SEO Content Sections */}
      <div className="w-full max-w-2xl mx-auto mt-8 space-y-8">
        
        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Acceleration Calculator</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li className="pl-2">
              <strong>Choose your calculation mode:</strong> Select either "Change in Velocity" if you know initial and final velocities with time, or "F = ma Mode" if you know the force and mass.
            </li>
            <li className="pl-2">
              <strong>Enter your values:</strong> Fill in the required fields with your known values. Make sure to use consistent units (meters per second for velocity, seconds for time, Newtons for force, kilograms for mass).
            </li>
            <li className="pl-2">
              <strong>Get your result:</strong> Click "Calculate Acceleration" to see the result displayed in meters per second squared (m/s²). Use the Reset button to clear inputs and start a new calculation.
            </li>
          </ol>
        </section>

        {/* Understanding Acceleration Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding Acceleration</h2>
          <div className="space-y-4">
            <p>
              Acceleration is the rate at which an object's velocity changes over time. It's a vector quantity, meaning it has both magnitude and direction. When you press the gas pedal in a car, you're accelerating. When you hit the brakes, you're also accelerating, just in the opposite direction of motion.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Average vs Instantaneous Acceleration</h3>
            <p>
              <strong>Average acceleration</strong> is calculated over a finite time interval. It tells you the overall rate of velocity change during that period. For example, if a car goes from 0 to 60 mph in 10 seconds, its average acceleration is 6 mph per second.
            </p>
            <p>
              <strong>Instantaneous acceleration</strong> is the acceleration at a specific moment in time. This is what you'd read on an accelerometer at any given instant. A car's acceleration isn't constant, it's usually highest at the start and decreases as speed increases.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Positive and Negative Acceleration</h3>
            <p>
              <strong>Positive acceleration</strong> occurs when an object speeds up in the direction of motion. <strong>Negative acceleration</strong>, often called deceleration, happens when an object slows down. However, negative acceleration can also mean speeding up in the opposite direction, depending on your reference frame.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Acceleration Due to Gravity</h3>
            <p>
              Near Earth's surface, all objects fall with an acceleration of approximately <strong>9.8 m/s²</strong> (often rounded to 10 m/s² for quick calculations). This value, denoted as <em>g</em>, is remarkably consistent regardless of the object's mass. A feather and a hammer would fall at the same rate in a vacuum.
            </p>
          </div>
        </section>

        {/* Acceleration Formulas Reference Table */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Acceleration Formulas Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left">Formula</th>
                  <th className="border p-3 text-left">When to Use</th>
                  <th className="border p-3 text-left">Variables</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-mono">a = (v - u) / t</td>
                  <td className="border p-3">When you know velocity change and time</td>
                  <td className="border p-3">a = acceleration, v = final velocity, u = initial velocity, t = time</td>
                </tr>
                <tr>
                  <td className="border p-3 font-mono">a = F / m</td>
                  <td className="border p-3">When you know force and mass (Newton's 2nd Law)</td>
                  <td className="border p-3">a = acceleration, F = net force, m = mass</td>
                </tr>
                <tr>
                  <td className="border p-3 font-mono">v² = u² + 2as</td>
                  <td className="border p-3">When you know velocities and displacement (no time)</td>
                  <td className="border p-3">v = final velocity, u = initial velocity, a = acceleration, s = displacement</td>
                </tr>
                <tr>
                  <td className="border p-3 font-mono">s = ut + ½at²</td>
                  <td className="border p-3">When you know time, initial velocity, and acceleration</td>
                  <td className="border p-3">s = displacement, u = initial velocity, t = time, a = acceleration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Typical Acceleration Values */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Typical Acceleration Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left">Scenario</th>
                  <th className="border p-3 text-left">Acceleration (m/s²)</th>
                  <th className="border p-3 text-left">In g-force</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Free fall (Earth, no air resistance)</td>
                  <td className="border p-3">9.8</td>
                  <td className="border p-3">1g</td>
                </tr>
                <tr>
                  <td className="border p-3">Car 0-60 mph in 10 seconds</td>
                  <td className="border p-3">~2.7</td>
                  <td className="border p-3">~0.28g</td>
                </tr>
                <tr>
                  <td className="border p-3">Sports car 0-60 mph in 3 seconds</td>
                  <td className="border p-3">~8.9</td>
                  <td className="border p-3">~0.91g</td>
                </tr>
                <tr>
                  <td className="border p-3">Roller coaster (peak)</td>
                  <td className="border p-3">20-30</td>
                  <td className="border p-3">2-3g</td>
                </tr>
                <tr>
                  <td className="border p-3">Fighter jet (maximum)</td>
                  <td className="border p-3">up to 88</td>
                  <td className="border p-3">up to 9g</td>
                </tr>
                <tr>
                  <td className="border p-3">Formula 1 car (braking)</td>
                  <td className="border p-3">~50</td>
                  <td className="border p-3">~5g</td>
                </tr>
                <tr>
                  <td className="border p-3">Space shuttle (launch)</td>
                  <td className="border p-3">~30</td>
                  <td className="border p-3">~3g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* G-Force and Human Tolerance Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">G-Force and Human Tolerance</h2>
          <div className="space-y-4">
            <p>
              <strong>G-force</strong> is a measure of acceleration relative to Earth's gravity. One g (1g) equals 9.8 m/s², the acceleration we experience standing on Earth's surface. When pilots pull sharp turns or astronauts launch into space, they experience multiple g's of force.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Human Tolerance Limits</h3>
            <p>
              The human body can tolerate different g-forces depending on direction, duration, and individual conditioning:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Positive g (head to foot):</strong> Most people can withstand 4-6g for short periods. Beyond this, blood pools in the lower body, causing vision loss (greyout, then blackout) and eventually unconsciousness (g-LOC).
              </li>
              <li>
                <strong>Negative g (foot to head):</strong> Much harder to tolerate. Most people can only handle -2g to -3g before experiencing "redout" (blood vessels in eyes and face burst) and severe headaches.
              </li>
              <li>
                <strong>Sustained exposure:</strong> Even moderate g-forces become dangerous over time. 2g sustained for several minutes causes extreme fatigue and breathing difficulty.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Why Fighter Pilots Wear G-Suits</h3>
            <p>
              G-suits are specialized garments that inflate around the legs and abdomen during high-g maneuvers. They squeeze the lower body, preventing blood from pooling there and maintaining blood flow to the brain. Combined with the anti-g straining maneuver (a specific breathing and muscle-tensing technique), g-suits allow pilots to tolerate 8-9g for brief periods without losing consciousness.
            </p>
            <p>
              Without a g-suit, most people would black out at around 4-5g. With proper training and equipment, fighter pilots can function at 9g for the few seconds needed to complete a tight turn in combat.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is the formula for acceleration?</h3>
              <p>
                The basic formula for acceleration is <strong>a = (v - u) / t</strong>, where <em>a</em> is acceleration, <em>v</em> is final velocity, <em>u</em> is initial velocity, and <em>t</em> is time. This calculates average acceleration over a time period. Alternatively, Newton's second law gives us <strong>a = F / m</strong>, where force divided by mass equals acceleration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What causes acceleration?</h3>
              <p>
                Acceleration is caused by <strong>net force</strong> acting on an object. According to Newton's second law, any unbalanced force will cause an object to accelerate in the direction of that force. The greater the force or the smaller the mass, the greater the acceleration. Forces can come from engines, gravity, friction, tension, or any interaction between objects.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can acceleration be negative?</h3>
              <p>
                Yes, acceleration can be negative. Negative acceleration typically means the object is slowing down (decelerating) if it's moving in the positive direction. However, negative acceleration can also mean speeding up in the negative direction. The sign depends on your chosen coordinate system. What matters physically is whether acceleration is in the same direction as velocity (speeding up) or opposite (slowing down).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the acceleration due to gravity?</h3>
              <p>
                On Earth's surface, the acceleration due to gravity is approximately <strong>9.8 m/s²</strong> (or 32 ft/s²). This value varies slightly depending on altitude and latitude, ranging from about 9.78 m/s² at the equator to 9.83 m/s² at the poles. For most calculations, 9.8 m/s² or even 10 m/s² is sufficiently accurate.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How is g-force related to acceleration?</h3>
              <p>
                G-force is simply acceleration expressed as a multiple of Earth's gravitational acceleration. To convert acceleration to g-force, divide by 9.8 m/s². For example, 19.6 m/s² equals 2g. G-force is useful because it gives an intuitive sense of how acceleration compares to the gravity we experience every day.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}

      </div>
    </div>
  );
}
