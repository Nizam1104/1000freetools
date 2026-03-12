"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PowerPage() {
  const config = converterMappings["Power"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Power"</p>
      </div>
    );
  }

  const commonConversions = [
    { watt: "1 W", kw: "0.001 kW", hp: "0.00134 hp", metricHp: "0.00136 metric hp" },
    { watt: "1,000 W", kw: "1 kW", hp: "1.341 hp", metricHp: "1.360 metric hp" },
    { watt: "745.7 W", kw: "0.746 kW", hp: "1 hp", metricHp: "1.014 metric hp" },
    { watt: "735.5 W", kw: "0.736 kW", hp: "0.986 hp", metricHp: "1 metric hp" },
    { watt: "1,000,000 W", kw: "1,000 kW", hp: "1,341 hp", metricHp: "1,360 metric hp" },
    { watt: "1 kW", kw: "1 kW", hp: "1.341 hp", metricHp: "1.360 metric hp" },
  ];

  const powerReference = [
    { device: "LED light bulb", watts: "5-15 W", hp: "0.007-0.02 hp", description: "Energy-efficient lighting" },
    { device: "Incandescent bulb", watts: "40-100 W", hp: "0.05-0.13 hp", description: "Traditional lighting" },
    { device: "Laptop computer", watts: "30-100 W", hp: "0.04-0.13 hp", description: "Typical consumption" },
    { device: "Microwave oven", watts: "600-1,200 W", hp: "0.8-1.6 hp", description: "Kitchen appliance" },
    { device: "Hair dryer", watts: "1,000-2,000 W", hp: "1.3-2.7 hp", description: "Personal care" },
    { device: "Electric kettle", watts: "1,500-3,000 W", hp: "2-4 hp", description: "Kitchen appliance" },
    { device: "Space heater", watts: "1,500 W", hp: "2 hp", description: "Home heating" },
    { device: "Car engine (compact)", watts: "75,000-100,000 W", hp: "100-134 hp", description: "Small vehicle" },
    { device: "Car engine (large)", watts: "200,000-400,000 W", hp: "268-536 hp", description: "Performance vehicle" },
  ];

  const motorPowerGuide = [
    { application: "Small fan", kw: "0.01-0.1 kW", hp: "0.01-0.13 hp" },
    { application: "Drill/driver", kw: "0.3-1 kW", hp: "0.4-1.3 hp" },
    { application: "Air compressor", kw: "1-5 kW", hp: "1.3-6.7 hp" },
    { application: "Water pump", kw: "0.5-15 kW", hp: "0.7-20 hp" },
    { application: "HVAC system", kw: "3-50 kW", hp: "4-67 hp" },
    { application: "Industrial motor", kw: "10-500 kW", hp: "13-670 hp" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Power Converter</h1>
        <p className="text-muted-foreground">Convert power units including watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for mechanical, electrical, and engineering calculations.</p>
      </div>
      <UnitConverterBase
        title="Power Converter"
        description="Convert power units including watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for mechanical, electrical, and engineering calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Power</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Power measures the rate of energy transfer or work done per unit time. You encounter power ratings constantly — light bulbs, motors, engines, appliances, and electrical devices all display power specifications. Higher power means faster energy consumption or greater work output.
            </p>
            <p>
              The watt (W) serves as the SI unit for power, named after James Watt. One watt equals one joule per second. Electrical devices use watts and kilowatts. Mechanical systems often use horsepower. Large-scale power generation uses megawatts and gigawatts.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Power Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Power Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Basic Power Definition</p>
                  <p className="text-lg font-semibold">P = E / t</p>
                  <p className="text-sm text-muted-foreground mt-2">Power equals energy divided by time</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 3,600 J / 1 s = 3,600 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Mechanical Power</p>
                  <p className="text-lg font-semibold">P = F × v</p>
                  <p className="text-sm text-muted-foreground mt-2">Force times velocity</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 100 N × 2 m/s = 200 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Electrical Power (DC)</p>
                  <p className="text-lg font-semibold">P = V × I</p>
                  <p className="text-sm text-muted-foreground mt-2">Voltage times current</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 120 V × 10 A = 1,200 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Electrical Power (Resistance)</p>
                  <p className="text-lg font-semibold">P = I² × R</p>
                  <p className="text-sm text-muted-foreground mt-2">Current squared times resistance</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 5² A × 10 Ω = 250 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Rotational Power</p>
                  <p className="text-lg font-semibold">P = τ × ω</p>
                  <p className="text-sm text-muted-foreground mt-2">Torque times angular velocity</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 50 N·m × 100 rad/s = 5,000 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Power from Work</p>
                  <p className="text-lg font-semibold">P = W / t</p>
                  <p className="text-sm text-muted-foreground mt-2">Work divided by time</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 1,000 J / 5 s = 200 W</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Power Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Watts to Kilowatts</p>
                  <p className="text-lg font-semibold">kW = W ÷ 1,000</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 2,500 W ÷ 1,000 = 2.5 kW</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kilowatts to Watts</p>
                  <p className="text-lg font-semibold">W = kW × 1,000</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 3 kW × 1,000 = 3,000 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Horsepower to Watts</p>
                  <p className="text-lg font-semibold">W = hp × 745.7</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 5 hp × 745.7 = 3,728.5 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Watts to Horsepower</p>
                  <p className="text-lg font-semibold">hp = W × 0.00134102</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 1,000 W × 0.00134102 = 1.34 hp</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Metric HP to Watts</p>
                  <p className="text-lg font-semibold">W = metric hp × 735.5</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10 metric hp × 735.5 = 7,355 W</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Megawatts to Kilowatts</p>
                  <p className="text-lg font-semibold">kW = MW × 1,000</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 5 MW × 1,000 = 5,000 kW</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Power Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Watts</TableHead>
                    <TableHead>Kilowatts</TableHead>
                    <TableHead>Horsepower</TableHead>
                    <TableHead>Metric HP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.watt}</TableCell>
                      <TableCell>{conv.kw}</TableCell>
                      <TableCell>{conv.hp}</TableCell>
                      <TableCell>{conv.metricHp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Power Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In Watts</TableHead>
                    <TableHead>Primary Use</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Watt</TableCell>
                    <TableCell>W</TableCell>
                    <TableCell>1 W</TableCell>
                    <TableCell>SI unit, electrical devices</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilowatt</TableCell>
                    <TableCell>kW</TableCell>
                    <TableCell>1,000 W</TableCell>
                    <TableCell>Appliances, motors, solar panels</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Megawatt</TableCell>
                    <TableCell>MW</TableCell>
                    <TableCell>1,000,000 W</TableCell>
                    <TableCell>Power plants, large industry</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gigawatt</TableCell>
                    <TableCell>GW</TableCell>
                    <TableCell>1,000,000,000 W</TableCell>
                    <TableCell>National power grids</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Horsepower (mechanical)</TableCell>
                    <TableCell>hp</TableCell>
                    <TableCell>745.7 W</TableCell>
                    <TableCell>Engines, motors (US/UK)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Horsepower (metric)</TableCell>
                    <TableCell>PS, metric hp</TableCell>
                    <TableCell>735.5 W</TableCell>
                    <TableCell>European vehicles, machinery</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">BTU/hour</TableCell>
                    <TableCell>BTU/h</TableCell>
                    <TableCell>0.293 W</TableCell>
                    <TableCell>HVAC systems (US)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Power Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device/Equipment</TableHead>
                    <TableHead>Watts</TableHead>
                    <TableHead>Horsepower</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {powerReference.map((ref, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{ref.device}</TableCell>
                      <TableCell>{ref.watts}</TableCell>
                      <TableCell>{ref.hp}</TableCell>
                      <TableCell>{ref.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Electric Motor Power Guide</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Kilowatts</TableHead>
                    <TableHead>Horsepower</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {motorPowerGuide.map((motor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{motor.application}</TableCell>
                      <TableCell>{motor.kw}</TableCell>
                      <TableCell>{motor.hp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Power vs Energy: Key Difference</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Power and energy relate but differ fundamentally. Power measures the rate of energy use (watts). Energy measures total consumption (watt-hours). Understanding this distinction helps you read electricity bills and size electrical systems.
            </p>
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Power (Watts)</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Rate of energy transfer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Instantaneous measurement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Like speed (km/h)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Device rating: &quot;This heater uses 1,500 W&quot;</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Energy (Watt-hours)</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Total work done or consumed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Accumulated over time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Like distance (km)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Utility billing: &quot;You used 500 kWh this month&quot;</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Power Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Watts (W) / Kilowatts (kW)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Electrical Devices</p>
                  <p className="text-muted-foreground">Appliances, electronics, light bulbs, chargers</p>
                </div>
                <div>
                  <p className="font-semibold">Solar Power</p>
                  <p className="text-muted-foreground">Panel ratings (kW), system capacity (kW or MW)</p>
                </div>
                <div>
                  <p className="font-semibold">Electricity Billing</p>
                  <p className="text-muted-foreground">Consumption measured in kWh</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Horsepower (hp)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Automotive</p>
                  <p className="text-muted-foreground">Engine power ratings (US/UK markets)</p>
                </div>
                <div>
                  <p className="font-semibold">Small Engines</p>
                  <p className="text-muted-foreground">Lawn mowers, generators, pumps</p>
                </div>
                <div>
                  <p className="font-semibold">Electric Motors</p>
                  <p className="text-muted-foreground">Industrial motor ratings (US)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metric Horsepower (PS)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">European Vehicles</p>
                  <p className="text-muted-foreground">Car engine specifications (Germany, etc.)</p>
                </div>
                <div>
                  <p className="font-semibold">Machinery</p>
                  <p className="text-muted-foreground">European industrial equipment</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Megawatts (MW) / Gigawatts (GW)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Power Generation</p>
                  <p className="text-muted-foreground">Power plant capacity, wind farms</p>
                </div>
                <div>
                  <p className="font-semibold">Grid Infrastructure</p>
                  <p className="text-muted-foreground">Transmission capacity, regional demand</p>
                </div>
                <div>
                  <p className="font-semibold">Large Industry</p>
                  <p className="text-muted-foreground">Factory power consumption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the difference between HP and PS?</h3>
                <p className="text-muted-foreground">HP (horsepower) equals 745.7 watts. PS (Pferdestärke, metric horsepower) equals 735.5 watts. PS is about 1.4% less than HP. European cars often use PS, while US/UK vehicles use HP. Convert: PS × 0.986 = HP.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I calculate electricity costs?</h3>
                <p className="text-muted-foreground">Multiply device power (kW) by hours used, then by your electricity rate. Example: 1.5 kW heater × 4 hours × $0.15/kWh = $0.90. Check your bill for the exact rate per kWh.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What size generator do I need?</h3>
                <p className="text-muted-foreground">Add up wattages of all devices you want to power simultaneously. Add 20-25% safety margin. Motors need extra startup power (2-3× running watts). A typical home needs 5,000-10,000 W for essential circuits.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why do some countries use kW for cars?</h3>
                <p className="text-muted-foreground">Australia and some European countries require kW ratings for vehicles. Kilowatts provide a standardized SI measurement. Convert: HP × 0.7457 = kW. A 200 HP engine equals 149 kW.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
