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

interface DroneResult {
  batteryCapacity: number;
  droneWeight: number;
  powerDraw: number;
  flightTime: number;
  flightTimeFormatted: string;
  hoverTime: number;
  forwardFlightTime: number;
  batteryLife: string;
  recommendations: string[];
}

export default function DroneFlightTimeEstimatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState<string>("");
  const [droneWeight, setDroneWeight] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("11.1");
  const [flightStyle, setFlightStyle] = useState<string>("mixed");
  const [result, setResult] = useState<DroneResult | null>(null);

  const calculate = () => {
    const capacityNum = parseFloat(batteryCapacity) || 0;
    const weightNum = parseFloat(droneWeight) || 0;
    const voltageNum = parseFloat(voltage) || 11.1;

    if (capacityNum === 0) return;

    // Calculate battery energy in Wh
    const batteryEnergy = (capacityNum * voltageNum) / 1000;

    // Estimate power draw based on weight (rough estimate)
    // Typical multirotor: 150-250 W/kg for hover
    const basePowerPerKg = 200;
    const estimatedPowerDraw = weightNum * basePowerPerKg;

    // Flight style multipliers
    const styleMultipliers: Record<string, number> = {
      hover: 1.0,
      mixed: 1.2,
      forward: 1.4,
      aggressive: 2.0,
    };
    const styleMult = styleMultipliers[flightStyle] || 1.2;

    // Calculate flight time in minutes
    // Time = (Battery Energy × 60) / Power Draw
    const hoverTime = (batteryEnergy * 60) / estimatedPowerDraw;
    const flightTime = hoverTime / styleMult;

    // Format flight time
    const minutes = Math.floor(flightTime);
    const seconds = Math.round((flightTime - minutes) * 60);
    const flightTimeFormatted = `${minutes}m ${seconds}s`;

    // Battery life assessment
    let batteryLife = "";
    if (flightTime >= 30) {
      batteryLife = "🏆 Excellent - Long flight time";
    } else if (flightTime >= 20) {
      batteryLife = "✅ Good - Standard flight time";
    } else if (flightTime >= 15) {
      batteryLife = "⚖️ Average - Acceptable flight time";
    } else {
      batteryLife = "⚠️ Short - Consider larger battery";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🔋 Battery: ${capacityNum}mAh ${voltageNum}V (${batteryEnergy.toFixed(1)} Wh)`);
    recommendations.push(`⚖️ Drone weight: ${weightNum}g`);
    recommendations.push(`⚡ Estimated power draw: ~${estimatedPowerDraw.toFixed(0)}W`);
    recommendations.push(`⏱️ Hover time: ${hoverTime.toFixed(0)} minutes`);
    recommendations.push(`🚁 ${flightStyle.charAt(0).toUpperCase() + flightStyle.slice(1)} flight: ${flightTimeFormatted}`);

    if (flightTime < 15) {
      recommendations.push("⚠️ Short flight time - consider lighter battery or larger capacity");
      recommendations.push("🔋 Upgrade to higher capacity battery if possible");
    } else if (flightTime >= 25) {
      recommendations.push("✅ Excellent flight time for this class");
    }

    recommendations.push("🔋 Always land with 20% battery reserve");
    recommendations.push("🌡️ Cold weather reduces flight time by 20-30%");
    recommendations.push("💨 Wind increases power consumption significantly");

    setResult({
      batteryCapacity: capacityNum,
      droneWeight: weightNum,
      powerDraw: estimatedPowerDraw,
      flightTime: parseFloat(flightTime.toFixed(1)),
      flightTimeFormatted,
      hoverTime: parseFloat(hoverTime.toFixed(1)),
      forwardFlightTime: parseFloat((hoverTime / 1.4).toFixed(1)),
      batteryLife,
      recommendations,
    });
  };

  const reset = () => {
    setBatteryCapacity("");
    setDroneWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Drone Flight Time Estimator – Calculate How Long Your Drone Can Fly
          </h1>
          <p className="text-muted-foreground">
            Plan your aerial shoots with our Drone Flight Time Estimator. Enter battery
            capacity, drone weight, and flight style to estimate maximum flight time —
            helping drone pilots manage battery usage for longer and safer flights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Battery Capacity (mAh)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                  placeholder="e.g., 3000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voltage">Battery Voltage (S count)</Label>
                <Select value={voltage} onValueChange={setVoltage}>
                  <SelectTrigger id="voltage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7.4">2S (7.4V)</SelectItem>
                    <SelectItem value="11.1">3S (11.1V)</SelectItem>
                    <SelectItem value="14.8">4S (14.8V)</SelectItem>
                    <SelectItem value="22.2">6S (22.2V)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Drone Weight (grams)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={droneWeight}
                  onChange={(e) => setDroneWeight(e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Flight Style</Label>
                <Select value={flightStyle} onValueChange={setFlightStyle}>
                  <SelectTrigger id="style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hover">Hover/Gentle</SelectItem>
                    <SelectItem value="mixed">Mixed Flight</SelectItem>
                    <SelectItem value="forward">Fast Forward</SelectItem>
                    <SelectItem value="aggressive">Aggressive/3D</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Flight Time Estimate</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg text-center ${result.flightTime >= 25 ? "bg-green-100 dark:bg-green-900/20" :
                      result.flightTime >= 15 ? "bg-blue-100 dark:bg-blue-900/20" :
                        "bg-amber-100 dark:bg-amber-900/20"
                    }`}>
                    <p className="text-sm text-muted-foreground">Estimated Flight Time</p>
                    <p className="text-5xl font-bold">{result.flightTimeFormatted}</p>
                    <p className="text-sm mt-1">{result.batteryLife}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Hover Time</p>
                      <p className="text-lg font-bold">{result.hoverTime} min</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Forward Flight</p>
                      <p className="text-lg font-bold">{result.forwardFlightTime} min</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Battery Energy:</span>
                      <span className="font-semibold">{((result.batteryCapacity * parseFloat(voltage)) / 1000).toFixed(1)} Wh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Power Draw:</span>
                      <span className="font-semibold">~{result.powerDraw.toFixed(0)}W</span>
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
                  <p>Enter battery and drone specs to estimate flight time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Drone Flight Time Estimator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your battery capacity and voltage</p>
                    <p>Input your battery capacity in mAh and select the cell count (S rating). Common drone batteries range from 2S (7.4V) for small drones to 6S (22.2V) for racing and professional drones.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input your drone weight</p>
                    <p>Enter the total flying weight including battery, camera, and any accessories. Heavier drones consume more power and have shorter flight times.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your flight style and calculate</p>
                    <p>Choose between hover, mixed flight, fast forward, or aggressive flying. Click Calculate to see estimated flight time, hover time, and battery recommendations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Typical Flight Times by Drone Type
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Drone Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Weight Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Battery Capacity</th>
                      <th className="text-left py-3 px-2 font-semibold">Flight Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Mini/Toy Drone</td>
                      <td className="py-3 px-2">Under 100g</td>
                      <td className="py-3 px-2">500-1000 mAh</td>
                      <td className="py-3 px-2">5-10 minutes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Camera Drone (Mini)</td>
                      <td className="py-3 px-2">200-500g</td>
                      <td className="py-3 px-2">2000-3000 mAh</td>
                      <td className="py-3 px-2">20-30 minutes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Camera Drone (Pro)</td>
                      <td className="py-3 px-2">500-1000g</td>
                      <td className="py-3 px-2">3000-5000 mAh</td>
                      <td className="py-3 px-2">25-35 minutes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Racing Drone (5&quot;)</td>
                      <td className="py-3 px-2">600-800g</td>
                      <td className="py-3 px-2">1300-1800 mAh 4-6S</td>
                      <td className="py-3 px-2">4-8 minutes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Cinematic Long-Range</td>
                      <td className="py-3 px-2">1000-2000g</td>
                      <td className="py-3 px-2">6000-10000 mAh</td>
                      <td className="py-3 px-2">30-45 minutes</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Professional/Industrial</td>
                      <td className="py-3 px-2">2000g+</td>
                      <td className="py-3 px-2">10000+ mAh</td>
                      <td className="py-3 px-2">20-40 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Flight times vary based on wind conditions, temperature, payload, and flying style. Aggressive flying can reduce flight time by 50% or more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Drone Flight Time
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Determines Flight Time?</h4>
                  <p>
                    Flight time depends primarily on battery capacity, drone weight, and motor efficiency. The key metric is watt-hours per gram. A well-designed drone achieves about 0.5 to 1 watt-hour per gram of weight. Higher values mean longer flight times. Propeller size and pitch also affect efficiency.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Battery Capacity Explained</h4>
                  <p>
                    Battery capacity is measured in milliamp-hours (mAh). A 3000 mAh battery can theoretically deliver 3 amps for one hour. However, actual capacity depends on discharge rate and temperature. Energy in watt-hours equals capacity times voltage divided by 1000. Higher voltage batteries deliver more power efficiently.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Flight Style Affects Battery</h4>
                  <p>
                    Hovering is the most efficient flight mode. Forward flight requires more power due to drag. Aggressive flying with rapid acceleration and high speeds can drain batteries 2 to 3 times faster than gentle hovering. Wind significantly increases power consumption as motors work harder to maintain position.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Temperature Effects on Batteries</h4>
                  <p>
                    LiPo batteries lose capacity in cold weather. At 32°F (0°C), expect 20-30% less flight time. Warm batteries before flying in cold conditions by keeping them in an inside pocket. Hot weather above 100°F can also reduce performance and increase the risk of battery damage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Maximizing Drone Flight Time
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reduce Weight Where Possible</p>
                    <p>Every gram matters. Remove unnecessary accessories, use lighter propellers, and consider carbon fiber upgrades. A 10% weight reduction can add 5-10% to flight time. Just ensure the drone remains stable and within legal weight limits.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fly Smoothly and Efficiently</p>
                    <p>Avoid rapid acceleration and hard braking. Use gentle stick inputs. Plan your flight path to minimize unnecessary maneuvers. Smooth flying not only extends battery life but also produces better video footage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Avoid Wind When Possible</p>
                    <p>Flying into wind dramatically increases power consumption. Check weather forecasts and plan flights for calm conditions. If you must fly in wind, position yourself so you fly with the wind outbound and against it on return.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Maintain Your Batteries</p>
                    <p>Store batteries at 50-60% charge when not in use. Never leave them fully charged or fully depleted for extended periods. Use a quality balance charger. Replace batteries that show significant capacity loss or physical damage.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How can I increase my drone flight time?</h4>
                  <p>
                    The most effective ways are: reduce weight by removing unnecessary accessories, use higher capacity batteries (if your drone can handle them), fly smoothly without aggressive maneuvers, avoid wind, and maintain proper battery care. Upgrading to more efficient propellers can also help.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why does my drone battery drain so fast?</h4>
                  <p>
                    Fast battery drain is usually caused by aggressive flying, heavy payload, old or damaged batteries, cold weather, or flying in wind. Check your battery health with a capacity tester. If the battery is more than 2-3 years old or has many charge cycles, it may need replacement.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How long should a drone battery last?</h4>
                  <p>
                    Consumer camera drones typically achieve 20-35 minutes per battery. Racing drones get 4-8 minutes due to high power demands. Mini drones may get 10-15 minutes. Professional long-range drones can achieve 30-45 minutes. Always land with 20% reserve for safety.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does cold weather affect drone batteries?</h4>
                  <p>
                    Yes, significantly. LiPo batteries lose 20-30% capacity at freezing temperatures. Pre-warm batteries before flying in cold weather by keeping them in an inside pocket or using a battery warmer. Fly gently until batteries warm up from use. Expect shorter flight times in winter.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How many batteries should I buy for my drone?</h4>
                  <p>
                    For casual flying, 2-3 batteries give you about an hour of total flight time. For serious photography or all-day events, 4-6 batteries plus a charging hub is recommended. Consider that batteries take 60-90 minutes to charge, so having multiple batteries lets you keep flying while others charge.
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
