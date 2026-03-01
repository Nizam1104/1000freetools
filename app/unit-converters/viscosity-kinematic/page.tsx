"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ViscosityKinematicPage() {
  const config = converterMappings["Viscosity - Kinematic"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Viscosity - Kinematic"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Kinematic Viscosity Converter</h1>
        <p className="text-muted-foreground">Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online kinematic viscosity converter for fluid dynamics, oil analysis, and hydraulic systems.</p>
      </div>
      <UnitConverterBase
        title="Kinematic Viscosity Converter"
        description="Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online kinematic viscosity converter for fluid dynamics, oil analysis, and hydraulic systems."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Kinematic Viscosity</h2>
          <p className="text-muted-foreground mb-4">
            Kinematic viscosity describes how fast a fluid flows under the influence of gravity alone. Unlike dynamic viscosity which measures resistance to flow, kinematic viscosity accounts for fluid density, making it ideal for comparing flow behavior of different fluids.
          </p>
          <p className="text-muted-foreground">
            The SI unit for kinematic viscosity is square meters per second (m²/s). Engineers commonly use centistokes (cSt) because it provides convenient numbers for lubricating oils and hydraulic fluids. One centistokes equals one millimeter squared per second (mm²/s).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Kinematic Viscosity Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate kinematic viscosity from dynamic viscosity and density:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ν = μ / ρ</p>
            <p className="text-sm text-muted-foreground mt-2">where ν = kinematic viscosity (m²/s), μ = dynamic viscosity (Pa·s), ρ = density (kg/m³)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            This relationship shows that kinematic viscosity increases when dynamic viscosity increases or when density decreases. Two fluids with the same dynamic viscosity but different densities will have different kinematic viscosities and flow at different rates under gravity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Reynolds Number Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Kinematic viscosity simplifies Reynolds number calculations for pipe flow:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Re = (v × D) / ν</p>
            <p className="text-sm text-muted-foreground mt-2">where v = fluid velocity (m/s), D = pipe diameter (m), ν = kinematic viscosity (m²/s)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Water at 20°C flows through a 0.1 m diameter pipe at 2 m/s. Water kinematic viscosity equals 1.004 × 10⁻⁶ m²/s (1.004 cSt).
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Re = (2 × 0.1) / (1.004 × 10⁻⁶) = 199,203</p>
          </div>
          <p className="text-muted-foreground">
            This Reynolds number indicates fully turbulent flow, which affects pressure drop calculations and pump selection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Kinematic Viscosity of Common Fluids at 20°C</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Fluid</th>
                  <th className="border border-border p-3 text-left">Kinematic Viscosity (m²/s)</th>
                  <th className="border border-border p-3 text-left">Kinematic Viscosity (cSt)</th>
                  <th className="border border-border p-3 text-left">Kinematic Viscosity (ft²/s)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Air</td>
                  <td className="border border-border p-3">1.51 × 10⁻⁵</td>
                  <td className="border border-border p-3">15.1</td>
                  <td className="border border-border p-3">1.63 × 10⁻⁴</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Water</td>
                  <td className="border border-border p-3">1.004 × 10⁻⁶</td>
                  <td className="border border-border p-3">1.004</td>
                  <td className="border border-border p-3">1.08 × 10⁻⁵</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Seawater</td>
                  <td className="border border-border p-3">1.05 × 10⁻⁶</td>
                  <td className="border border-border p-3">1.05</td>
                  <td className="border border-border p-3">1.13 × 10⁻⁵</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Ethanol</td>
                  <td className="border border-border p-3">1.52 × 10⁻⁶</td>
                  <td className="border border-border p-3">1.52</td>
                  <td className="border border-border p-3">1.64 × 10⁻⁵</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Gasoline</td>
                  <td className="border border-border p-3">8.6 × 10⁻⁷</td>
                  <td className="border border-border p-3">0.86</td>
                  <td className="border border-border p-3">9.3 × 10⁻⁶</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Kerosene</td>
                  <td className="border border-border p-3">2.0 × 10⁻⁶</td>
                  <td className="border border-border p-3">2.0</td>
                  <td className="border border-border p-3">2.2 × 10⁻⁵</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Diesel fuel</td>
                  <td className="border border-border p-3">3.5 × 10⁻⁶</td>
                  <td className="border border-border p-3">3.5</td>
                  <td className="border border-border p-3">3.8 × 10⁻⁵</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Hydraulic oil ISO 32</td>
                  <td className="border border-border p-3">3.2 × 10⁻⁵</td>
                  <td className="border border-border p-3">32</td>
                  <td className="border border-border p-3">3.4 × 10⁻⁴</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Hydraulic oil ISO 68</td>
                  <td className="border border-border p-3">6.8 × 10⁻⁵</td>
                  <td className="border border-border p-3">68</td>
                  <td className="border border-border p-3">7.3 × 10⁻⁴</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">SAE 10 motor oil</td>
                  <td className="border border-border p-3">1.0 × 10⁻⁴</td>
                  <td className="border border-border p-3">100</td>
                  <td className="border border-border p-3">1.1 × 10⁻³</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">SAE 30 motor oil</td>
                  <td className="border border-border p-3">3.3 × 10⁻⁴</td>
                  <td className="border border-border p-3">330</td>
                  <td className="border border-border p-3">3.6 × 10⁻³</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">SAE 50 motor oil</td>
                  <td className="border border-border p-3">1.7 × 10⁻³</td>
                  <td className="border border-border p-3">1700</td>
                  <td className="border border-border p-3">0.0183</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Olive oil</td>
                  <td className="border border-border p-3">8.4 × 10⁻⁵</td>
                  <td className="border border-border p-3">84</td>
                  <td className="border border-border p-3">9.0 × 10⁻⁴</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Glycerin</td>
                  <td className="border border-border p-3">1.18 × 10⁻³</td>
                  <td className="border border-border p-3">1180</td>
                  <td className="border border-border p-3">0.0127</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Honey</td>
                  <td className="border border-border p-3">7.1 × 10⁻³</td>
                  <td className="border border-border p-3">7100</td>
                  <td className="border border-border p-3">0.0764</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Mercury</td>
                  <td className="border border-border p-3">1.14 × 10⁻⁷</td>
                  <td className="border border-border p-3">0.114</td>
                  <td className="border border-border p-3">1.23 × 10⁻⁶</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">ISO Viscosity Grades for Industrial Lubricants</h2>
          <p className="text-muted-foreground mb-4">
            The International Organization for Standardization (ISO) established viscosity grades for industrial lubricants based on kinematic viscosity at 40°C:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">ISO VG</th>
                  <th className="border border-border p-3 text-left">Kinematic Viscosity at 40°C (cSt)</th>
                  <th className="border border-border p-3 text-left">Typical Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">ISO VG 2</td>
                  <td className="border border-border p-3">2.2</td>
                  <td className="border border-border p-3">High-speed spindles, air compressors</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">ISO VG 10</td>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">High-speed bearings, hydraulic systems</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">ISO VG 32</td>
                  <td className="border border-border p-3">32</td>
                  <td className="border border-border p-3">Hydraulic systems, circulation oils</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">ISO VG 46</td>
                  <td className="border border-border p-3">46</td>
                  <td className="border border-border p-3">Industrial gearboxes, hydraulic systems</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">ISO VG 68</td>
                  <td className="border border-border p-3">68</td>
                  <td className="border border-border p-3">Medium-duty gearboxes, compressors</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">ISO VG 100</td>
                  <td className="border border-border p-3">100</td>
                  <td className="border border-border p-3">Heavy-duty gearboxes, bearings</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">ISO VG 220</td>
                  <td className="border border-border p-3">220</td>
                  <td className="border border-border p-3">Large industrial gears, slow-speed bearings</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">ISO VG 460</td>
                  <td className="border border-border p-3">460</td>
                  <td className="border border-border p-3">Very heavy-duty gears, open gears</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">ISO VG 680</td>
                  <td className="border border-border p-3">680</td>
                  <td className="border border-border p-3">Mining equipment, extreme pressure applications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between kinematic viscosity units using these factors:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 m²/s = 1,000,000 cSt (centistokes)</li>
            <li>1 m²/s = 10,000 St (stokes)</li>
            <li>1 cSt = 1 mm²/s</li>
            <li>1 St = 1 cm²/s</li>
            <li>1 m²/s = 10.7639 ft²/s</li>
            <li>1 ft²/s = 0.092903 m²/s</li>
            <li>1 cSt = 0.000001 m²/s</li>
          </ul>
          <p className="text-muted-foreground">
            The stokes unit honors Sir George Stokes, who made fundamental contributions to fluid dynamics. One stokes equals 1 cm²/s, and one centistokes equals 1 mm²/s.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Kinematic Viscosity</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Lubricating oil selection and condition monitoring</li>
            <li>Hydraulic fluid specification for machinery</li>
            <li>Fuel quality testing and specification</li>
            <li>Pipeline flow calculations for oil and gas</li>
            <li>Spray nozzle design for agricultural and industrial applications</li>
            <li>Ink formulation for printing processes</li>
            <li>Blood flow studies in biomedical engineering</li>
            <li>Quality control in food and beverage production</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">When should I use kinematic viscosity instead of dynamic viscosity?</h3>
            <p className="text-muted-foreground">
              Use kinematic viscosity when analyzing flow under gravity, such as in capillary viscometers, oil drainage, or fuel injection systems. Use dynamic viscosity when calculating forces, pressure drops, or power requirements in pumped systems. Kinematic viscosity simplifies calculations involving the Reynolds number.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What does the cSt unit mean for motor oil?</h3>
            <p className="text-muted-foreground">
              The cSt (centistokes) value indicates how quickly the oil flows at a specific temperature. Motor oil specifications include viscosity at both 40°C and 100°C. A 10W-30 oil might have a kinematic viscosity of 65 cSt at 40°C and 11 cSt at 100°C. The viscosity index describes how much viscosity changes with temperature.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do I measure kinematic viscosity?</h3>
            <p className="text-muted-foreground">
              Capillary viscometers like the Ubbelohde or Cannon-Fenske measure kinematic viscosity directly. You time how long a fixed volume of fluid takes to flow through a calibrated capillary tube under gravity. The efflux time multiplied by the viscometer constant gives kinematic viscosity in cSt.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why does hydraulic oil viscosity matter?</h3>
            <p className="text-muted-foreground">
              Hydraulic oil viscosity affects pump efficiency, system response, and component wear. Oil that is too thin causes internal leakage and reduced efficiency. Oil that is too thick increases pressure drop, causes cavitation, and reduces pump life. ISO VG 32 and ISO VG 46 are common choices for industrial hydraulic systems operating at moderate temperatures.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
