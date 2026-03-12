"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FuelEfficiencyMassPage() {
  const config = converterMappings["Fuel Efficiency - Mass"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Fuel Efficiency - Mass"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Fuel Efficiency by Mass Converter</h1>
        <p className="text-muted-foreground">Convert fuel efficiency by mass units — km/kg, miles/lb, and more. Free online mass-based fuel efficiency converter for rocket propulsion and alternative fuel vehicles.</p>
      </div>
      <UnitConverterBase
        title="Fuel Efficiency by Mass Converter"
        description="Convert fuel efficiency by mass units — km/kg, miles/lb, and more. Free online mass-based fuel efficiency converter for rocket propulsion and alternative fuel vehicles."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Mass-Based Fuel Efficiency</h2>
          <p className="text-muted-foreground mb-4">
            Mass-based fuel efficiency measures distance traveled per unit mass of fuel consumed. This metric matters for applications where fuel mass, not volume, determines performance. Rocket propulsion, hydrogen fuel cell vehicles, and compressed natural gas (CNG) vehicles use mass-based efficiency because fuel density varies with pressure and temperature.
          </p>
          <p className="text-muted-foreground">
            Common units include kilometers per kilogram (km/kg) and miles per pound (mi/lb). Electric vehicles use an analogous measure: kilometers per kilowatt-hour (km/kWh), which relates energy consumption to distance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fuel Efficiency Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate mass-based fuel efficiency from distance and fuel mass:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Efficiency = Distance / Fuel Mass</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">FE = d / m</p>
            <p className="text-sm text-muted-foreground mt-2">where FE = fuel efficiency (km/kg), d = distance traveled (km), m = fuel mass consumed (kg)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A hydrogen fuel cell vehicle travels 100 km while consuming 1.2 kg of hydrogen:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">FE = 100 km / 1.2 kg = 83.3 km/kg</p>
          </div>
          <p className="text-muted-foreground">
            Convert to miles per pound using 1 km/kg = 0.4536 mi/lb:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">83.3 km/kg × 0.4536 = 37.8 mi/lb</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Specific Impulse for Rocket Propulsion</h2>
          <p className="text-muted-foreground mb-4">
            Rocket engineers use specific impulse (Isp) to measure propulsion efficiency. Specific impulse equals thrust produced per unit weight flow rate of propellant:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Isp = F / (ṁ × g₀)</p>
            <p className="text-sm text-muted-foreground mt-2">where Isp = specific impulse (seconds), F = thrust (N), ṁ = mass flow rate (kg/s), g₀ = standard gravity (9.80665 m/s²)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Higher specific impulse means more efficient propellant use. Specific impulse in seconds converts to effective exhaust velocity:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ve = Isp × g₀</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A rocket engine with Isp = 300 s has exhaust velocity:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ve = 300 × 9.80665 = 2,942 m/s</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fuel Efficiency by Mass for Various Propulsion Systems</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Propulsion System</th>
                  <th className="border border-border p-3 text-left">Fuel Type</th>
                  <th className="border border-border p-3 text-left">Efficiency (km/kg)</th>
                  <th className="border border-border p-3 text-left">Efficiency (mi/lb)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Hydrogen fuel cell car</td>
                  <td className="border border-border p-3">H2 compressed</td>
                  <td className="border border-border p-3">80 to 100</td>
                  <td className="border border-border p-3">36 to 45</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">CNG vehicle</td>
                  <td className="border border-border p-3">Natural gas</td>
                  <td className="border border-border p-3">25 to 35</td>
                  <td className="border border-border p-3">11 to 16</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">LPG vehicle</td>
                  <td className="border border-border p-3">Propane/butane</td>
                  <td className="border border-border p-3">20 to 30</td>
                  <td className="border border-border p-3">9 to 14</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Gasoline car</td>
                  <td className="border border-border p-3">Gasoline</td>
                  <td className="border border-border p-3">15 to 25</td>
                  <td className="border border-border p-3">7 to 11</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Diesel car</td>
                  <td className="border border-border p-3">Diesel</td>
                  <td className="border border-border p-3">18 to 30</td>
                  <td className="border border-border p-3">8 to 14</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Solid rocket motor</td>
                  <td className="border border-border p-3">Solid propellant</td>
                  <td className="border border-border p-3">200 to 250 (Isp)</td>
                  <td className="border border-border p-3">Effective exhaust ~2,500 m/s</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Liquid rocket (kerosene)</td>
                  <td className="border border-border p-3">RP-1/LOX</td>
                  <td className="border border-border p-3">300 to 350 (Isp)</td>
                  <td className="border border-border p-3">Effective exhaust ~3,200 m/s</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Liquid rocket (hydrogen)</td>
                  <td className="border border-border p-3">LH2/LOX</td>
                  <td className="border border-border p-3">400 to 450 (Isp)</td>
                  <td className="border border-border p-3">Effective exhaust ~4,200 m/s</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Ion thruster</td>
                  <td className="border border-border p-3">Xenon</td>
                  <td className="border border-border p-3">3,000 to 5,000 (Isp)</td>
                  <td className="border border-border p-3">Effective exhaust ~40,000 m/s</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4">
            Note: Rocket specific impulse values shown in seconds. Higher Isp indicates more efficient propellant use but typically lower thrust.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Hydrogen Vehicle Range Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Calculate driving range from fuel tank capacity and efficiency:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Range = Tank Capacity × Efficiency</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A hydrogen vehicle with 5 kg tank capacity and 90 km/kg efficiency:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Range = 5 kg × 90 km/kg = 450 km</p>
          </div>
          <p className="text-muted-foreground">
            The Toyota Mirai and Hyundai Nexo achieve approximately 80 to 100 km/kg under real-world driving conditions, giving 500 to 650 km range from their 5 to 6 kg hydrogen tanks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between mass-based fuel efficiency units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 km/kg = 0.4536 mi/lb</li>
            <li>1 mi/lb = 2.2046 km/kg</li>
            <li>1 km/kg = 2.825 mi/US gal (assuming gasoline density 0.75 kg/L)</li>
            <li>1 mi/lb = 0.354 km/L (assuming gasoline density 0.75 kg/L)</li>
          </ul>
          <p className="text-muted-foreground">
            Converting between mass-based and volume-based efficiency requires fuel density. Gasoline density ranges from 0.71 to 0.77 kg/L depending on formulation and temperature.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Mass-Based Fuel Efficiency</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Hydrogen fuel cell vehicle range estimation</li>
            <li>Compressed natural gas (CNG) fleet management</li>
            <li>Rocket propulsion system design and comparison</li>
            <li>Aircraft fuel planning where mass affects performance</li>
            <li>Alternative fuel vehicle certification and labeling</li>
            <li>Spacecraft mission delta-v calculations</li>
            <li>Fuel cell system optimization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why use mass-based efficiency for hydrogen vehicles?</h3>
            <p className="text-muted-foreground">
              Hydrogen has very low density, so it is stored under high pressure (350 to 700 bar) or as a cryogenic liquid. The mass of hydrogen remains constant regardless of pressure or temperature, making km/kg a more consistent metric than km/L. One kg of hydrogen contains about 33 kWh of energy, equivalent to one gallon of gasoline.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is a good fuel efficiency for a hydrogen car?</h3>
            <p className="text-muted-foreground">
              Modern hydrogen fuel cell vehicles achieve 80 to 100 km/kg (36 to 45 mi/lb) under real-world driving. The EPA rates the Toyota Mirai at 76 MPGe combined, equivalent to about 90 km/kg. Highway driving typically yields higher efficiency than city driving due to fewer acceleration events.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How does rocket specific impulse relate to fuel efficiency?</h3>
            <p className="text-muted-foreground">
              Specific impulse measures how effectively a rocket uses propellant. Higher Isp means less propellant needed for a given velocity change. Chemical rockets achieve 250 to 450 seconds Isp, while ion thrusters reach 3,000 to 5,000 seconds. However, ion thrusters produce very low thrust, making them suitable only for spacecraft in vacuum.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do I convert km/kg to MPGe?</h3>
            <p className="text-muted-foreground">
              MPGe (miles per gallon equivalent) compares alternative fuels to gasoline. One gallon of gasoline equivalent contains 33.7 kWh of energy. Hydrogen contains 33.3 kWh/kg. For a hydrogen vehicle achieving 90 km/kg: convert to miles (55.9 mi/kg), then MPGe = 55.9 × 33.3 / 33.7 = 55.3 MPGe. Actual EPA ratings include well-to-wheel efficiency factors.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
