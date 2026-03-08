"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

export default function InverterCapacityCalculator() {
  const [devices, setDevices] = useState<{ name: string; watts: string; hours: string }[]>([{ name: "", watts: "", hours: "" }]);
  const [surge, setSurge] = useState<string>("20");
  const [results, setResults] = useState<any>(null);

  const addDevice = () => setDevices([...devices, { name: "", watts: "", hours: "" }]);
  const removeDevice = (i: number) => setDevices(devices.filter((_, idx) => idx !== i));
  const updateDevice = (i: number, field: string, val: string) => {
    const newDevices = [...devices];
    (newDevices[i] as any)[field] = val;
    setDevices(newDevices);
  };

  const calculate = () => {
    let totalWatts = 0;
    let totalWh = 0;

    devices.forEach(d => {
      const w = parseFloat(d.watts);
      const h = parseFloat(d.hours);
      if (w > 0) {
        totalWatts += w;
        totalWh += w * (h || 0);
      }
    });

    if (totalWatts > 0) {
      const surgeFactor = 1 + parseFloat(surge) / 100;
      const inverterSize = totalWatts * surgeFactor;
      const batteryAh12V = (totalWh / 12) * 1.5;
      const batteryAh24V = (totalWh / 24) * 1.5;

      setResults({
        totalWatts,
        totalWh,
        inverterSize: Math.round(inverterSize),
        battery12V: Math.round(batteryAh12V),
        battery24V: Math.round(batteryAh24V),
      });
    }
  };

  const reset = () => {
    setDevices([{ name: "", watts: "", hours: "" }]);
    setSurge("20");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            {devices.map((device, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <Label>Device</Label>
                  <Input value={device.name} onChange={e => updateDevice(i, "name", e.target.value)} placeholder="Name" />
                </div>
                <div className="col-span-3">
                  <Label>Watts</Label>
                  <Input type="number" value={device.watts} onChange={e => updateDevice(i, "watts", e.target.value)} placeholder="W" />
                </div>
                <div className="col-span-4">
                  <Label>Hours/Day</Label>
                  <Input type="number" value={device.hours} onChange={e => updateDevice(i, "hours", e.target.value)} placeholder="hrs" />
                </div>
                <div className="col-span-1">
                  <Button variant="outline" size="sm" onClick={() => removeDevice(i)} disabled={devices.length === 1}>×</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addDevice}>+ Add Device</Button>

            <div>
              <Label>Surge Margin (%)</Label>
              <Input value={surge} onChange={e => setSurge(e.target.value)} />
              <p className="text-sm text-muted-foreground mt-1">Recommended: 20-25% for motor startup</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Load</p>
                    <p className="text-2xl font-bold">{results.totalWatts} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Energy</p>
                    <p className="text-2xl font-bold">{results.totalWh} Wh</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inverter Size</p>
                    <p className="text-3xl font-bold">{results.inverterSize} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Battery (12V/24V)</p>
                    <p className="text-xl font-bold">{results.battery12V}Ah / {results.battery24V}Ah</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Size an Inverter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> List all devices you want to power with their wattage ratings and daily usage hours.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Add up the total watts and calculate daily energy consumption in watt-hours.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Add surge margin for motor startup, then select inverter and battery based on results.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Inverter Capacity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is an Inverter</h4>
            <p className="text-sm text-muted-foreground">
              An inverter converts DC battery power to AC power for household devices. Sizing matters - too small and the inverter shuts down under load. Too large and you waste money on capacity you'll never use. The key is matching both continuous wattage and surge capacity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why Surge Margin Matters</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Motors and compressors need 2-3 times their running wattage to start:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Devices with Surge</p>
                <p className="text-xs text-muted-foreground">
                  Refrigerators, air conditioners, well pumps, power tools. These need 20-50% extra inverter capacity to handle startup without tripping.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Devices without Surge</p>
                <p className="text-xs text-muted-foreground">
                  LED lights, phone chargers, laptops, TVs. These draw steady power and don't need extra surge capacity.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Battery Sizing Explained</h4>
            <p className="text-sm text-muted-foreground">
              Battery capacity (Ah) depends on your daily energy use and system voltage. We multiply by 1.5 to avoid draining batteries below 50% - deep discharges kill lead-acid batteries fast. Lithium batteries can discharge deeper but cost more upfront.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Device Wattages Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Running Watts</TableHead>
                <TableHead>Surge Watts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>LED light bulb (10W)</TableCell>
                <TableCell className="font-mono">10 W</TableCell>
                <TableCell className="font-mono">10 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Laptop charger</TableCell>
                <TableCell className="font-mono">65 W</TableCell>
                <TableCell className="font-mono">65 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LED TV 55"</TableCell>
                <TableCell className="font-mono">120 W</TableCell>
                <TableCell className="font-mono">120 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Refrigerator</TableCell>
                <TableCell className="font-mono">200 W</TableCell>
                <TableCell className="font-mono">600 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Microwave</TableCell>
                <TableCell className="font-mono">1,000 W</TableCell>
                <TableCell className="font-mono">1,000 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Well pump (1/2 HP)</TableCell>
                <TableCell className="font-mono">1,000 W</TableCell>
                <TableCell className="font-mono">2,000 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Space heater</TableCell>
                <TableCell className="font-mono">1,500 W</TableCell>
                <TableCell className="font-mono">1,500 W</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Window AC (5,000 BTU)</TableCell>
                <TableCell className="font-mono">500 W</TableCell>
                <TableCell className="font-mono">1,500 W</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Surge watts apply only during startup (1-3 seconds). Running watts are continuous draw.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inverter Sizing Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { device: "Lights", running: 50, surge: 50 },
                  { device: "Fridge", running: 200, surge: 600 },
                  { device: "TV", running: 120, surge: 120 },
                  { device: "Laptop", running: 65, surge: 65 },
                  { device: "Well Pump", running: 1000, surge: 2000 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: "Watts", position: "insideBottom", offset: -5 }} />
                <YAxis type="category" dataKey="device" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="running" fill="#3b82f6" name="Running Watts" />
                <Bar dataKey="surge" fill="#f97316" name="Surge Watts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">
            Compare running vs surge watts. The highest surge determines minimum inverter surge capacity. Total running watts determines continuous inverter rating.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Battery Sizing Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Battery Capacity Formula</h4>
            <p className="font-mono text-sm mb-2">Ah = (Daily Wh / Battery Voltage) × 1.5</p>
            <p className="text-xs text-muted-foreground">
              The 1.5 multiplier keeps lead-acid batteries above 50% discharge. For lithium (LiFePO4), use 1.2 multiplier since they can discharge to 80%.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">12V vs 24V Systems</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Higher voltage means lower current for the same power:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>12V systems: Simple, common, good for under 2,000W</li>
              <li>24V systems: Lower current, thinner wires, better for 2,000-4,000W</li>
              <li>48V systems: Professional installations, over 4,000W</li>
            </ul>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Days of Autonomy</h4>
            <p className="text-xs text-muted-foreground">
              Want backup for cloudy days? Multiply battery capacity by days of autonomy. Three days autonomy means tripling battery capacity - expensive but useful for off-grid living.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What size inverter do I need?</h4>
            <p className="text-sm text-muted-foreground">
              Add up all device wattages, then add 20-25% surge margin. For example, a fridge (200W) + lights (50W) + TV (120W) = 370W. With 25% margin, you need a 463W inverter - round up to 500W or 600W.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How long will a battery last with an inverter?</h4>
            <p className="text-sm text-muted-foreground">
              Divide battery watt-hours by total load watts. A 100Ah 12V battery has 1,200Wh. Running a 100W load gives 12 hours, but limit to 6 hours to avoid deep discharge on lead-acid batteries.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can I run a refrigerator on an inverter?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but size for surge. A 200W fridge might need 600W startup. Use a 1,000W inverter minimum. Also consider a soft starter to reduce surge to 2-3x instead of 5-6x running watts.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What is the difference between pure sine wave and modified sine wave?</h4>
            <p className="text-sm text-muted-foreground">
              Pure sine wave inverters produce clean power like the grid - required for sensitive electronics, motors, and medical devices. Modified sine wave is cheaper but can cause humming in motors and won't work with some devices.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How many batteries do I need for a 3,000W inverter?</h4>
            <p className="text-sm text-muted-foreground">
              At 12V, a 3,000W inverter draws 250A. You'd need 250Ah of battery per hour of runtime. For 4 hours at 50% discharge, that's 2,000Ah - about four 200Ah batteries in parallel. Consider 24V or 48V to reduce current.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
