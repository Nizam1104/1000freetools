"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SpecificVolumePage() {
  const config = converterMappings["Specific Volume"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Specific Volume"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Specific Volume Converter</h1>
        <p className="text-muted-foreground">Convert specific volume units including m³/kg, L/kg, ft³/lb, and more. Accurate online specific volume converter for thermodynamics and fluid mechanics.</p>
      </div>
      <UnitConverterBase
        title="Specific Volume Converter"
        description="Convert specific volume units including m³/kg, L/kg, ft³/lb, and more. Accurate online specific volume converter for thermodynamics and fluid mechanics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Specific Volume</h2>
          <p className="text-muted-foreground mb-4">
            Specific volume measures the volume occupied by a unit mass of substance. Engineers and scientists use specific volume to describe the state of gases, liquids, and solids in thermodynamic systems. The property equals the reciprocal of density, making it essential for calculations involving compressible fluids and phase changes.
          </p>
          <p className="text-muted-foreground">
            You will find specific volume expressed in cubic meters per kilogram (m³/kg) in SI units, or cubic feet per pound (ft³/lb) in imperial systems. The value changes with temperature and pressure, especially for gases following the ideal gas law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Specific Volume Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate specific volume using mass and total volume, or derive it from density:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">v = V / m</p>
            <p className="text-sm text-muted-foreground mt-2">where v = specific volume, V = total volume, m = mass</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">v = 1 / ρ</p>
            <p className="text-sm text-muted-foreground mt-2">where ρ = density</p>
          </div>
          <p className="text-muted-foreground mb-4">
            For ideal gases, apply the ideal gas law to find specific volume:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">v = RT / P</p>
            <p className="text-sm text-muted-foreground mt-2">where R = specific gas constant, T = absolute temperature, P = pressure</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Find the specific volume of 2 kg of gas occupying 1.6 m³:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">v = V / m = 1.6 m³ / 2 kg = 0.8 m³/kg</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Convert to ft³/lb using the conversion factor 1 m³/kg = 16.018 ft³/lb:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">0.8 m³/kg × 16.018 = 12.81 ft³/lb</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Specific Volume Values for Common Substances</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Substance</th>
                  <th className="border border-border p-3 text-left">Condition</th>
                  <th className="border border-border p-3 text-left">Specific Volume (m³/kg)</th>
                  <th className="border border-border p-3 text-left">Specific Volume (ft³/lb)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Water (liquid)</td>
                  <td className="border border-border p-3">20°C, 1 atm</td>
                  <td className="border border-border p-3">0.001002</td>
                  <td className="border border-border p-3">0.01605</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Water (steam)</td>
                  <td className="border border-border p-3">100°C, 1 atm</td>
                  <td className="border border-border p-3">1.673</td>
                  <td className="border border-border p-3">26.80</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Air</td>
                  <td className="border border-border p-3">20°C, 1 atm</td>
                  <td className="border border-border p-3">0.846</td>
                  <td className="border border-border p-3">13.55</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Air</td>
                  <td className="border border-border p-3">100°C, 1 atm</td>
                  <td className="border border-border p-3">1.091</td>
                  <td className="border border-border p-3">17.48</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Ice</td>
                  <td className="border border-border p-3">0°C</td>
                  <td className="border border-border p-3">0.001091</td>
                  <td className="border border-border p-3">0.01748</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Gasoline</td>
                  <td className="border border-border p-3">20°C</td>
                  <td className="border border-border p-3">0.00135</td>
                  <td className="border border-border p-3">0.0216</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mercury</td>
                  <td className="border border-border p-3">20°C</td>
                  <td className="border border-border p-3">0.0000737</td>
                  <td className="border border-border p-3">0.00118</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Oxygen</td>
                  <td className="border border-border p-3">0°C, 1 atm</td>
                  <td className="border border-border p-3">0.699</td>
                  <td className="border border-border p-3">11.20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Specific Volume</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Thermodynamic cycle analysis for power plants and refrigeration systems</li>
            <li>HVAC system design and psychrometric calculations</li>
            <li>Compressible flow analysis in nozzles and turbines</li>
            <li>Phase change calculations in boiling and condensation</li>
            <li>Gas storage and pipeline transport engineering</li>
            <li>Meteorology and atmospheric science</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between specific volume and density?</h3>
            <p className="text-muted-foreground">
              Specific volume and density are reciprocals of each other. Density measures mass per unit volume (kg/m³), while specific volume measures volume per unit mass (m³/kg). When density increases, specific volume decreases proportionally.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why does specific volume increase with temperature for gases?</h3>
            <p className="text-muted-foreground">
              According to the ideal gas law, volume increases proportionally with absolute temperature at constant pressure. As gas molecules gain kinetic energy with higher temperature, they occupy more space, increasing the specific volume.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do you convert specific volume from m³/kg to ft³/lb?</h3>
            <p className="text-muted-foreground">
              Multiply the value in m³/kg by 16.018 to get ft³/lb. For example, 0.5 m³/kg equals 0.5 × 16.018 = 8.009 ft³/lb. To convert from ft³/lb to m³/kg, divide by 16.018 or multiply by 0.06243.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What affects the specific volume of steam?</h3>
            <p className="text-muted-foreground">
              Steam specific volume depends on both temperature and pressure. At atmospheric pressure (101.325 kPa), saturated steam at 100°C has a specific volume of 1.673 m³/kg. At higher pressures, steam becomes more compressed with lower specific volume. Superheated steam at the same pressure but higher temperature has greater specific volume.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
