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

export default function PressurePage() {
  const config = converterMappings["Pressure"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Pressure"</p>
      </div>
    );
  }

  const commonConversions = [
    { pa: "1,000 Pa", bar: "0.01 bar", psi: "0.145 psi", atm: "0.00987 atm" },
    { pa: "101,325 Pa", bar: "1.01325 bar", psi: "14.696 psi", atm: "1 atm" },
    { pa: "100,000 Pa", bar: "1 bar", psi: "14.504 psi", atm: "0.987 atm" },
    { pa: "6,895 Pa", bar: "0.0689 bar", psi: "1 psi", atm: "0.068 atm" },
    { pa: "133.3 Pa", bar: "0.00133 bar", psi: "0.0193 psi", atm: "0.00132 atm" },
    { pa: "1 MPa", bar: "10 bar", psi: "145.04 psi", atm: "9.87 atm" },
  ];

  const pressureReference = [
    { condition: "Perfect vacuum", pa: "0 Pa", bar: "0 bar", psi: "0 psi", description: "No pressure" },
    { condition: "Atmospheric pressure (sea level)", pa: "101,325 Pa", bar: "1.013 bar", psi: "14.696 psi", description: "Standard atmosphere" },
    { condition: "Car tire (typical)", pa: "206,843 Pa", bar: "2.07 bar", psi: "30 psi", description: "Recommended pressure" },
    { condition: "Scuba tank", pa: "20,684,271 Pa", bar: "206.8 bar", psi: "3,000 psi", description: "Full tank" },
    { condition: "Hydraulic system", pa: "20,684,271 Pa", bar: "206.8 bar", psi: "3,000 psi", description: "Typical operating pressure" },
    { condition: "Deep ocean (Mariana Trench)", pa: "108,600,000 Pa", bar: "1,086 bar", psi: "15,750 psi", description: "Maximum ocean depth" },
  ];

  const unitApplications = [
    { unit: "Pascal (Pa)", applications: "Scientific research, meteorology, engineering calculations" },
    { unit: "Bar", applications: "Weather reports (Europe), diving, industrial processes" },
    { unit: "PSI", applications: "Tire pressure, hydraulic systems, US industrial equipment" },
    { unit: "Atmosphere (atm)", applications: "Chemistry, physics, scuba diving, vacuum systems" },
    { unit: "Torr/mmHg", applications: "Blood pressure, vacuum measurements, laboratory work" },
    { unit: "kPa", applications: "Weather reports, tire pressure (metric countries), engineering" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Pressure Converter</h1>
        <p className="text-muted-foreground">Convert pressure units including pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering, science, and industrial applications.</p>
      </div>
      <UnitConverterBase
        title="Pressure Converter"
        description="Convert pressure units including pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering, science, and industrial applications."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Pressure</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Pressure measures force applied per unit area. You experience pressure constantly — atmospheric pressure pushes on your body, blood pressure circulates oxygen, tire pressure supports your vehicle. Pressure equals force divided by area.
            </p>
            <p>
              The pascal (Pa) serves as the SI unit for pressure, named after Blaise Pascal. One pascal equals one newton per square meter. Other common units include bar (meteorology), PSI (imperial systems), and atmospheres (scientific work).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pressure Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Pressure Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Basic Pressure Formula</p>
                  <p className="text-lg font-semibold">P = F / A</p>
                  <p className="text-sm text-muted-foreground mt-2">Pressure equals force divided by area</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 100 N / 2 m² = 50 Pa</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Hydrostatic Pressure</p>
                  <p className="text-lg font-semibold">P = ρ × g × h</p>
                  <p className="text-sm text-muted-foreground mt-2">Density × gravity × height of fluid</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: Water at 10m depth = 98,100 Pa</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Ideal Gas Law</p>
                  <p className="text-lg font-semibold">P × V = n × R × T</p>
                  <p className="text-sm text-muted-foreground mt-2">Pressure × volume = moles × constant × temperature</p>
                  <p className="text-sm text-muted-foreground mt-1">Used for gas calculations</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Atmospheric Pressure Variation</p>
                  <p className="text-lg font-semibold">P = P₀ × e^(-h/H)</p>
                  <p className="text-sm text-muted-foreground mt-2">Pressure decreases exponentially with altitude</p>
                  <p className="text-sm text-muted-foreground mt-1">P₀ = sea level pressure, H ≈ 8,000 m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pressure Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Bar to PSI</p>
                  <p className="text-lg font-semibold">psi = bar × 14.5038</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 2 bar × 14.5038 = 29.01 psi</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">PSI to Bar</p>
                  <p className="text-lg font-semibold">bar = psi × 0.0689476</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 32 psi × 0.0689476 = 2.21 bar</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Atmospheres to PSI</p>
                  <p className="text-lg font-semibold">psi = atm × 14.6959</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 1 atm × 14.6959 = 14.70 psi</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">PSI to Atmospheres</p>
                  <p className="text-lg font-semibold">atm = psi × 0.068046</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 14.7 psi × 0.068046 = 1 atm</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Torr to Pascal</p>
                  <p className="text-lg font-semibold">Pa = Torr × 133.322</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 760 Torr × 133.322 = 101,325 Pa</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">kPa to PSI</p>
                  <p className="text-lg font-semibold">psi = kPa × 0.145038</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 200 kPa × 0.145038 = 29.01 psi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Pressure Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pascals</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>PSI</TableHead>
                    <TableHead>Atmospheres</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.pa}</TableCell>
                      <TableCell>{conv.bar}</TableCell>
                      <TableCell>{conv.psi}</TableCell>
                      <TableCell>{conv.atm}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pressure Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In Pa</TableHead>
                    <TableHead>System/Field</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Pascal</TableCell>
                    <TableCell>Pa</TableCell>
                    <TableCell>1 Pa</TableCell>
                    <TableCell>SI (scientific)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilopascal</TableCell>
                    <TableCell>kPa</TableCell>
                    <TableCell>1,000 Pa</TableCell>
                    <TableCell>SI (engineering)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Megapascal</TableCell>
                    <TableCell>MPa</TableCell>
                    <TableCell>1,000,000 Pa</TableCell>
                    <TableCell>SI (materials)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bar</TableCell>
                    <TableCell>bar</TableCell>
                    <TableCell>100,000 Pa</TableCell>
                    <TableCell>Metric (meteorology)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PSI</TableCell>
                    <TableCell>psi</TableCell>
                    <TableCell>6,894.76 Pa</TableCell>
                    <TableCell>Imperial (industrial)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Atmosphere</TableCell>
                    <TableCell>atm</TableCell>
                    <TableCell>101,325 Pa</TableCell>
                    <TableCell>Scientific standard</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Torr</TableCell>
                    <TableCell>Torr</TableCell>
                    <TableCell>133.322 Pa</TableCell>
                    <TableCell>Vacuum, laboratory</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">mmHg</TableCell>
                    <TableCell>mmHg</TableCell>
                    <TableCell>133.322 Pa</TableCell>
                    <TableCell>Medical (blood pressure)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Pressure Reference</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Condition</TableHead>
                    <TableHead>Pascals</TableHead>
                    <TableHead>Bar</TableHead>
                    <TableHead>PSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pressureReference.map((ref, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{ref.condition}</TableCell>
                      <TableCell>{ref.pa}</TableCell>
                      <TableCell>{ref.bar}</TableCell>
                      <TableCell>{ref.psi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pressure Units by Application</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Primary Applications</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unitApplications.map((app, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{app.unit}</TableCell>
                      <TableCell>{app.applications}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Pressure Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pascal (Pa) / kPa / MPa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Scientific Research</p>
                  <p className="text-muted-foreground">Physics, chemistry, materials science calculations</p>
                </div>
                <div>
                  <p className="font-semibold">Engineering</p>
                  <p className="text-muted-foreground">Structural analysis, fluid dynamics (global)</p>
                </div>
                <div>
                  <p className="font-semibold">Meteorology</p>
                  <p className="text-muted-foreground">Weather reports (kPa in many countries)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bar / Millibar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Weather Reports</p>
                  <p className="text-muted-foreground">Atmospheric pressure (Europe, meteorology)</p>
                </div>
                <div>
                  <p className="font-semibold">Diving</p>
                  <p className="text-muted-foreground">Tank pressure, depth calculations</p>
                </div>
                <div>
                  <p className="font-semibold">Industrial</p>
                  <p className="text-muted-foreground">Process control, pneumatic systems</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PSI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Automotive</p>
                  <p className="text-muted-foreground">Tire pressure, oil pressure (US/UK)</p>
                </div>
                <div>
                  <p className="font-semibold">Hydraulics</p>
                  <p className="text-muted-foreground">System pressure, pump ratings</p>
                </div>
                <div>
                  <p className="font-semibold">Industrial Equipment</p>
                  <p className="text-muted-foreground">Compressors, pressure vessels (US)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">mmHg / Torr</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Medical</p>
                  <p className="text-muted-foreground">Blood pressure measurements worldwide</p>
                </div>
                <div>
                  <p className="font-semibold">Vacuum Systems</p>
                  <p className="text-muted-foreground">Laboratory vacuum measurements</p>
                </div>
                <div>
                  <p className="font-semibold">Meteorology</p>
                  <p className="text-muted-foreground">Barometric pressure (traditional)</p>
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
                <h3 className="font-semibold mb-2">What is standard atmospheric pressure?</h3>
                <p className="text-muted-foreground">Standard atmospheric pressure equals 101,325 Pa (101.325 kPa, 1.01325 bar, 14.696 psi, 760 mmHg). This represents average sea-level pressure. Actual pressure varies with weather and altitude.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What PSI should car tires be?</h3>
                <p className="text-muted-foreground">Most cars require 30-35 PSI (2.0-2.4 bar, 207-241 kPa). Check your vehicle&apos;s door jamb or owner&apos;s manual for the exact specification. Never use the maximum pressure listed on the tire sidewall.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is the difference between gauge and absolute pressure?</h3>
                <p className="text-muted-foreground">Gauge pressure measures relative to atmospheric pressure (reads 0 at atmosphere). Absolute pressure measures from perfect vacuum. Absolute = Gauge + Atmospheric. Tire gauges show gauge pressure.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why do doctors use mmHg for blood pressure?</h3>
                <p className="text-muted-foreground">Blood pressure was originally measured with mercury columns. One mmHg equals the pressure from 1 millimeter of mercury. Despite digital monitors, mmHg remains the medical standard worldwide.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
