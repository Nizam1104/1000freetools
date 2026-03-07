"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HvacAirflowCalculator() {
  const [roomVolume, setRoomVolume] = useState<string>("");
  const [ach, setAch] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const V = parseFloat(roomVolume);
    const ACH = parseFloat(ach);

    if (V > 0 && ACH > 0) {
      const cfm = (V * 35.3147 * ACH) / 60;
      const m3h = V * ACH;

      setResults({ cfm: Math.round(cfm), m3h: Math.round(m3h) });
    }
  };

  const reset = () => {
    setRoomVolume(""); setAch(""); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Room Volume (m³)</Label><Input value={roomVolume} onChange={e => setRoomVolume(e.target.value)} /></div>
              <div><Label>Air Changes/Hour (ACH)</Label><Input value={ach} onChange={e => setAch(e.target.value)} placeholder="6-12 typical" /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Airflow</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Airflow (CFM)</p>
                    <p className="text-4xl font-bold">{results.cfm}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Airflow (m³/h)</p>
                    <p className="text-3xl font-bold">{results.m3h}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Typical ACH: Office 4-6, Kitchen 15-20, Bathroom 8-10, Hospital 12-20
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This HVAC Airflow Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter room volume in cubic meters</p>
                  <p>Calculate volume by multiplying length × width × height. For a 5m × 4m × 2.5m room, enter 50 m³.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select air changes per hour (ACH)</p>
                  <p>Choose ACH based on room type. Offices need 4-6, kitchens need 15-20, bathrooms need 8-10.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get required airflow in CFM and m³/h</p>
                  <p>Results show airflow in both cubic feet per minute and cubic meters per hour for HVAC sizing.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Recommended Air Changes Per Hour by Room Type
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Room Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Air Changes/Hour (ACH)</th>
                    <th className="text-left py-3 px-2 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Living room / Bedroom</td>
                    <td className="py-3 px-2">4-6</td>
                    <td className="py-3 px-2">General comfort and air quality</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Office / Study</td>
                    <td className="py-3 px-2">4-6</td>
                    <td className="py-3 px-2">Maintain CO2 levels for concentration</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Kitchen (residential)</td>
                    <td className="py-3 px-2">15-20</td>
                    <td className="py-3 px-2">Remove cooking odors, heat, and moisture</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Bathroom</td>
                    <td className="py-3 px-2">8-10</td>
                    <td className="py-3 px-2">Control humidity and prevent mold</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Hospital room</td>
                    <td className="py-3 px-2">12-20</td>
                    <td className="py-3 px-2">Infection control and air purity</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Laboratory</td>
                    <td className="py-3 px-2">10-15</td>
                    <td className="py-3 px-2">Remove fumes and contaminants</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Gym / Exercise room</td>
                    <td className="py-3 px-2">8-12</td>
                    <td className="py-3 px-2">Handle increased CO2 from exertion</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Source: ASHRAE Standard 62.1 and building code requirements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding HVAC Airflow Requirements
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Air Changes Per Hour?</h4>
                <p>
                  Air changes per hour (ACH) tells you how many times the air in a room gets replaced each hour. An ACH of 6 means the room's entire air volume is exchanged 6 times per hour, or once every 10 minutes. Higher ACH means better ventilation but also higher energy costs.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">CFM vs m³/h</h4>
                <p>
                  CFM (cubic feet per minute) is the standard airflow unit in the US. m³/h (cubic meters per hour) is used internationally. To convert: 1 CFM equals about 1.7 m³/h. HVAC equipment specs often list both units.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Airflow Matters</h4>
                <p>
                  Proper airflow removes stale air, excess moisture, cooking odors, and indoor pollutants. It brings in fresh oxygen and maintains comfortable temperatures. Too little airflow causes stuffiness and mold. Too much wastes energy and creates drafts.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Airflow Formula</h4>
                <p>
                  CFM = (Volume in ft³ × ACH) / 60. This calculator converts your metric volume to cubic feet, multiplies by air changes per hour, then divides by 60 to get flow per minute. The m³/h result is simply volume × ACH.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Proper Room Ventilation
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Size ducts correctly</p>
                  <p>Undersized ducts restrict airflow and create noise. Use a duct calculator to match duct size to required CFM.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Balance supply and return</p>
                  <p>Every room needs both supply and return vents. Closed doors can block return airflow and cause pressure problems.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Clean filters regularly</p>
                  <p>Clogged filters reduce airflow by 50% or more. Check monthly and replace every 1-3 months depending on use.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider energy recovery ventilators</p>
                  <p>ERVs bring in fresh air while recovering heat from exhaust air. They maintain ventilation without wasting energy.</p>
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
                <h4 className="font-medium text-foreground mb-2">How do I calculate room volume?</h4>
                <p>
                  Multiply length × width × height. For a room that is 5m long, 4m wide, and 2.5m high: 5 × 4 × 2.5 = 50 m³. For irregular rooms, break them into rectangular sections and add the volumes together.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What ACH should I use for my home?</h4>
                <p>
                  Most homes target 0.35 to 0.5 ACH for whole-house ventilation under modern energy codes. Individual rooms need higher rates: bathrooms 8-10 ACH, kitchens 15-20 ACH, living spaces 4-6 ACH.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is higher airflow always better?</h4>
                <p>
                  No. Excessive airflow wastes energy, creates drafts, and can make HVAC systems noisy. It may also prevent proper dehumidification because air moves too fast over cooling coils. Match airflow to the room's actual needs.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do I measure actual airflow?</h4>
                <p>
                  Use an anemometer to measure air velocity at vents, then multiply by vent area. Or use a flow hood that captures all air from a diffuser. Professional HVAC techs have specialized equipment for accurate measurements.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What affects required ventilation rates?</h4>
                <p>
                  Occupancy is the biggest factor — more people need more fresh air. Cooking, cleaning chemicals, pets, and smoking all increase ventilation needs. Local building codes set minimum rates that must be followed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
