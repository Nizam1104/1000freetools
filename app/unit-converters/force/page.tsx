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

export default function ForcePage() {
  const config = converterMappings["Force"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Force"</p>
      </div>
    );
  }

  const commonConversions = [
    { newton: "1 N", kgf: "0.102 kgf", lbf: "0.225 lbf", dyn: "100,000 dyn" },
    { newton: "10 N", kgf: "1.02 kgf", lbf: "2.25 lbf", dyn: "1,000,000 dyn" },
    { newton: "100 N", kgf: "10.2 kgf", lbf: "22.48 lbf", dyn: "10,000,000 dyn" },
    { newton: "1 kN", kgf: "101.97 kgf", lbf: "224.81 lbf", dyn: "100,000,000 dyn" },
    { newton: "1 lbf", N: "4.448 N", kgf: "0.454 kgf", dyn: "444,822 dyn" },
    { newton: "1 kgf", N: "9.807 N", lbf: "2.205 lbf", dyn: "980,665 dyn" },
  ];

  const forceExamples = [
    { object: "Apple (100g) resting on hand", newtons: "0.98 N", pounds: "0.22 lbf" },
    { object: "Smartphone (200g)", newtons: "1.96 N", pounds: "0.44 lbf" },
    { object: "Laptop (2 kg)", newtons: "19.6 N", pounds: "4.4 lbf" },
    { object: "Adult human (70 kg)", newtons: "686 N", pounds: "154 lbf" },
    { object: "Small car (1,000 kg)", newtons: "9,807 N", pounds: "2,205 lbf" },
    { object: "Elephant (5,000 kg)", newtons: "49,033 N", pounds: "11,023 lbf" },
  ];

  const newtonApplications = [
    { range: "0.01-1 N", application: "Small sensors, delicate mechanisms, micro-robotics" },
    { range: "1-100 N", application: "Consumer electronics, small actuators, door closers" },
    { range: "100-10,000 N", application: "Automotive components, industrial machinery, elevators" },
    { range: "10,000-1,000,000 N", application: "Construction equipment, aircraft, heavy industry" },
    { range: "1,000,000+ N", application: "Rocket engines, bridges, skyscrapers, ships" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Force Converter</h1>
        <p className="text-muted-foreground">Convert force units including newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics, engineering, and scientific applications.</p>
      </div>
      <UnitConverterBase
        title="Force Converter"
        description="Convert force units including newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics, engineering, and scientific applications."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Force</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Force represents a push or pull acting on an object. Forces cause objects to accelerate, change direction, or deform. You experience force constantly — gravity pulls you down, chairs push you up, muscles exert force to move your body.
            </p>
            <p>
              The newton (N) serves as the SI unit for force, named after Isaac Newton. One newton equals the force needed to accelerate one kilogram of mass at one meter per second squared. Pound-force and kilogram-force remain common in engineering applications.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Force Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Newton&apos;s Laws and Force Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Newton&apos;s Second Law</p>
                  <p className="text-lg font-semibold">F = m × a</p>
                  <p className="text-sm text-muted-foreground mt-2">Force equals mass times acceleration</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 10 kg × 2 m/s² = 20 N</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Weight (Gravitational Force)</p>
                  <p className="text-lg font-semibold">W = m × g</p>
                  <p className="text-sm text-muted-foreground mt-2">Weight equals mass times gravity (9.807 m/s²)</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 70 kg × 9.807 = 686.5 N</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Spring Force (Hooke&apos;s Law)</p>
                  <p className="text-lg font-semibold">F = -k × x</p>
                  <p className="text-sm text-muted-foreground mt-2">Force equals spring constant times displacement</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: k=100 N/m, x=0.1m = 10 N</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Pressure to Force</p>
                  <p className="text-lg font-semibold">F = P × A</p>
                  <p className="text-sm text-muted-foreground mt-2">Force equals pressure times area</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 100 Pa × 2 m² = 200 N</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Force Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Newtons to Pound-force</p>
                  <p className="text-lg font-semibold">lbf = N × 0.224809</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 N × 0.224809 = 22.48 lbf</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Pound-force to Newtons</p>
                  <p className="text-lg font-semibold">N = lbf × 4.44822</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 50 lbf × 4.44822 = 222.41 N</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Newtons to Kilogram-force</p>
                  <p className="text-lg font-semibold">kgf = N × 0.101972</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 N × 0.101972 = 10.20 kgf</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kilogram-force to Newtons</p>
                  <p className="text-lg font-semibold">N = kgf × 9.80665</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10 kgf × 9.80665 = 98.07 N</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Newtons to Dynes</p>
                  <p className="text-lg font-semibold">dyn = N × 100,000</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 1 N × 100,000 = 100,000 dyn</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kilonewtons to Newtons</p>
                  <p className="text-lg font-semibold">N = kN × 1,000</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 5 kN × 1,000 = 5,000 N</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Force Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Newtons</TableHead>
                    <TableHead>Kilogram-force</TableHead>
                    <TableHead>Pound-force</TableHead>
                    <TableHead>Dynes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.newton}</TableCell>
                      <TableCell>{conv.kgf}</TableCell>
                      <TableCell>{conv.lbf || conv.N}</TableCell>
                      <TableCell>{conv.dyn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Force Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In Newtons</TableHead>
                    <TableHead>System</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Dyne</TableCell>
                    <TableCell>dyn</TableCell>
                    <TableCell>0.00001 N</TableCell>
                    <TableCell>CGS</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Newton</TableCell>
                    <TableCell>N</TableCell>
                    <TableCell>1 N</TableCell>
                    <TableCell>SI</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilonewton</TableCell>
                    <TableCell>kN</TableCell>
                    <TableCell>1,000 N</TableCell>
                    <TableCell>SI</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilogram-force</TableCell>
                    <TableCell>kgf</TableCell>
                    <TableCell>9.80665 N</TableCell>
                    <TableCell>Metric (gravitational)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pound-force</TableCell>
                    <TableCell>lbf</TableCell>
                    <TableCell>4.44822 N</TableCell>
                    <TableCell>Imperial</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kip</TableCell>
                    <TableCell>kip</TableCell>
                    <TableCell>4,448.22 N</TableCell>
                    <TableCell>Imperial (US engineering)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Force Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object/Situation</TableHead>
                    <TableHead>Force (Newtons)</TableHead>
                    <TableHead>Force (Pounds)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forceExamples.map((example, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{example.object}</TableCell>
                      <TableCell>{example.newtons}</TableCell>
                      <TableCell>{example.pounds}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Force Magnitudes by Application</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Force Range</TableHead>
                    <TableHead>Typical Applications</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newtonApplications.map((app, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium font-mono text-sm">{app.range}</TableCell>
                      <TableCell>{app.application}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Force Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newtons (N)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Physics</p>
                  <p className="text-muted-foreground">All scientific calculations, research, education</p>
                </div>
                <div>
                  <p className="font-semibold">Engineering</p>
                  <p className="text-muted-foreground">Structural analysis, mechanical design (global)</p>
                </div>
                <div>
                  <p className="font-semibold">Kilonewtons (kN)</p>
                  <p className="text-muted-foreground">Large forces: bridges, buildings, heavy machinery</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pound-force (lbf)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">US Engineering</p>
                  <p className="text-muted-foreground">Mechanical systems, automotive, aerospace (US)</p>
                </div>
                <div>
                  <p className="font-semibold">Materials Testing</p>
                  <p className="text-muted-foreground">Tensile strength, compression tests (US)</p>
                </div>
                <div>
                  <p className="font-semibold">Consumer Products</p>
                  <p className="text-muted-foreground">Tool ratings, equipment specifications (US)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kilogram-force (kgf)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Industrial Equipment</p>
                  <p className="text-muted-foreground">Press ratings, crane capacity (Asia, Europe)</p>
                </div>
                <div>
                  <p className="font-semibold">Torque Wrenches</p>
                  <p className="text-muted-foreground">Bolt tightening specifications</p>
                </div>
                <div>
                  <p className="font-semibold">Legacy Systems</p>
                  <p className="text-muted-foreground">Older equipment, certain industries</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dynes (dyn)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">CGS System</p>
                  <p className="text-muted-foreground">Older scientific literature, specific fields</p>
                </div>
                <div>
                  <p className="font-semibold">Surface Tension</p>
                  <p className="text-muted-foreground">Often expressed in dynes per centimeter</p>
                </div>
                <div>
                  <p className="font-semibold">Micro-scale Forces</p>
                  <p className="text-muted-foreground">Very small force measurements</p>
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
                <h3 className="font-semibold mb-2">What is the difference between mass and force?</h3>
                <p className="text-muted-foreground">Mass measures the amount of matter (kilograms, pounds). Force measures a push or pull (newtons, pound-force). Weight is the gravitational force on a mass. A 1 kg mass weighs 9.807 N on Earth but only 1.62 N on the Moon.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why is kilogram-force still used?</h3>
                <p className="text-muted-foreground">Kilogram-force provides intuitive understanding — 1 kgf feels like holding 1 kg. Engineers in some countries prefer it for equipment ratings. However, newtons remain the official SI unit for scientific work.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How much force can a human exert?</h3>
                <p className="text-muted-foreground">Grip strength averages 300-500 N (67-112 lbf) for adults. Leg press can exceed 2,000 N (450 lbf). Bite force reaches 700-900 N (156-202 lbf). Trained athletes generate much higher forces.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is a kilonewton?</h3>
                <p className="text-muted-foreground">One kilonewton equals 1,000 newtons. Engineers use kN for large forces — building loads, bridge capacity, crane ratings. One kN equals approximately 102 kgf or 225 lbf.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
