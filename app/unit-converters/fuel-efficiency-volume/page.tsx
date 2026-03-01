"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FuelEfficiencyVolumePage() {
  const config = converterMappings["Fuel Efficiency - Volume"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Fuel Efficiency - Volume"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Fuel Efficiency by Volume Converter</h1>
        <p className="text-muted-foreground">Convert volumetric fuel efficiency units — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles, fleet management, and emissions calculations.</p>
      </div>
      <UnitConverterBase
        title="Fuel Efficiency by Volume Converter"
        description="Convert volumetric fuel efficiency units — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles, fleet management, and emissions calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Volumetric Fuel Efficiency</h2>
          <p className="text-muted-foreground mb-4">
            Volumetric fuel efficiency measures how far a vehicle travels per unit volume of fuel, or how much fuel it consumes per distance. This metric directly affects operating costs and environmental impact. Different regions use different conventions: North America uses miles per gallon (MPG), Europe uses liters per 100 kilometers (L/100km), and some countries use kilometers per liter (km/L).
          </p>
          <p className="text-muted-foreground">
            Higher MPG or km/L values indicate better efficiency, while lower L/100km values indicate better efficiency. Understanding these inverse relationships helps when comparing vehicles from different markets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fuel Efficiency Formulas</h2>
          <p className="text-muted-foreground mb-4">
            Calculate fuel efficiency from distance and fuel volume:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">MPG = Distance (miles) / Fuel (gallons)</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">km/L = Distance (km) / Fuel (L)</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">L/100km = (Fuel (L) / Distance (km)) × 100</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A car travels 450 km using 35 liters of fuel:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">km/L = 450 / 35 = 12.86 km/L</p>
            <p className="font-mono text-sm">L/100km = (35 / 450) × 100 = 7.78 L/100km</p>
          </div>
          <p className="text-muted-foreground">
            Convert to MPG (US) using 1 km/L = 2.352 MPG:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">MPG = 12.86 × 2.352 = 30.2 MPG (US)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conversion Between MPG and L/100km</h2>
          <p className="text-muted-foreground mb-4">
            Convert between MPG (US) and L/100km using these formulas:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">L/100km = 235.215 / MPG (US)</p>
            <p className="font-mono text-sm">MPG (US) = 235.215 / L/100km</p>
          </div>
          <p className="text-muted-foreground mb-4">
            For UK (imperial) gallons:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">L/100km = 282.481 / MPG (UK)</p>
            <p className="font-mono text-sm">MPG (UK) = 282.481 / L/100km</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example conversions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">MPG (US)</th>
                  <th className="border border-border p-3 text-left">L/100km</th>
                  <th className="border border-border p-3 text-left">km/L</th>
                  <th className="border border-border p-3 text-left">Vehicle Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">15</td>
                  <td className="border border-border p-3">15.68</td>
                  <td className="border border-border p-3">6.38</td>
                  <td className="border border-border p-3">Large truck/SUV</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">20</td>
                  <td className="border border-border p-3">11.76</td>
                  <td className="border border-border p-3">8.50</td>
                  <td className="border border-border p-3">Mid-size SUV</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">25</td>
                  <td className="border border-border p-3">9.41</td>
                  <td className="border border-border p-3">10.63</td>
                  <td className="border border-border p-3">Compact car</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">30</td>
                  <td className="border border-border p-3">7.84</td>
                  <td className="border border-border p-3">12.75</td>
                  <td className="border border-border p-3">Efficient sedan</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">35</td>
                  <td className="border border-border p-3">6.72</td>
                  <td className="border border-border p-3">14.88</td>
                  <td className="border border-border p-3">Hybrid sedan</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">40</td>
                  <td className="border border-border p-3">5.88</td>
                  <td className="border border-border p-3">17.00</td>
                  <td className="border border-border p-3">Compact hybrid</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">4.70</td>
                  <td className="border border-border p-3">21.25</td>
                  <td className="border border-border p-3">High-efficiency hybrid</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">60</td>
                  <td className="border border-border p-3">3.92</td>
                  <td className="border border-border p-3">25.50</td>
                  <td className="border border-border p-3">Plug-in hybrid (HV mode)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fuel Cost Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Calculate fuel cost per distance from efficiency and fuel price:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Cost per km = (Price per L) / (km/L)</p>
            <p className="font-mono text-sm">Cost per 100km = (L/100km) × (Price per L)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Fuel costs $1.50/L and vehicle efficiency is 12 km/L:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Cost per km = $1.50 / 12 = $0.125/km</p>
            <p className="font-mono text-sm">Cost per 100km = 8.33 L/100km × $1.50 = $12.50/100km</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Annual fuel cost for 20,000 km driving:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">Annual cost = 20,000 × $0.125 = $2,500</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Typical Fuel Efficiency by Vehicle Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Vehicle Type</th>
                  <th className="border border-border p-3 text-left">MPG (US)</th>
                  <th className="border border-border p-3 text-left">L/100km</th>
                  <th className="border border-border p-3 text-left">km/L</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Subcompact car</td>
                  <td className="border border-border p-3">32 to 40</td>
                  <td className="border border-border p-3">5.9 to 7.4</td>
                  <td className="border border-border p-3">13.6 to 17.0</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Compact car</td>
                  <td className="border border-border p-3">28 to 35</td>
                  <td className="border border-border p-3">6.7 to 8.4</td>
                  <td className="border border-border p-3">11.9 to 14.9</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mid-size sedan</td>
                  <td className="border border-border p-3">25 to 32</td>
                  <td className="border border-border p-3">7.4 to 9.4</td>
                  <td className="border border-border p-3">10.6 to 13.6</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Full-size sedan</td>
                  <td className="border border-border p-3">20 to 28</td>
                  <td className="border border-border p-3">8.4 to 11.8</td>
                  <td className="border border-border p-3">8.5 to 11.9</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Compact SUV</td>
                  <td className="border border-border p-3">24 to 30</td>
                  <td className="border border-border p-3">7.8 to 9.8</td>
                  <td className="border border-border p-3">10.2 to 12.8</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Mid-size SUV</td>
                  <td className="border border-border p-3">20 to 26</td>
                  <td className="border border-border p-3">9.0 to 11.8</td>
                  <td className="border border-border p-3">8.5 to 11.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Full-size SUV</td>
                  <td className="border border-border p-3">15 to 22</td>
                  <td className="border border-border p-3">10.7 to 15.7</td>
                  <td className="border border-border p-3">6.4 to 9.4</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Pickup truck</td>
                  <td className="border border-border p-3">15 to 23</td>
                  <td className="border border-border p-3">10.2 to 15.7</td>
                  <td className="border border-border p-3">6.4 to 9.8</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Hybrid compact</td>
                  <td className="border border-border p-3">45 to 55</td>
                  <td className="border border-border p-3">4.3 to 5.2</td>
                  <td className="border border-border p-3">19.1 to 23.4</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Hybrid mid-size</td>
                  <td className="border border-border p-3">40 to 50</td>
                  <td className="border border-border p-3">4.7 to 5.9</td>
                  <td className="border border-border p-3">17.0 to 21.3</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Electric (MPGe)</td>
                  <td className="border border-border p-3">100 to 140</td>
                  <td className="border border-border p-3">N/A</td>
                  <td className="border border-border p-3">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">CO2 Emissions from Fuel Consumption</h2>
          <p className="text-muted-foreground mb-4">
            Estimate CO2 emissions from fuel consumption:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">CO2 (g/km) = (L/100km) × 2,310 / 100</p>
            <p className="text-sm text-muted-foreground mt-2">Gasoline produces approximately 2,310 g CO2 per liter burned</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A vehicle consuming 8 L/100km:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">CO2 = 8 × 23.1 = 184.8 g/km</p>
          </div>
          <p className="text-muted-foreground">
            For diesel fuel, use 2,680 g CO2 per liter. Diesel vehicles typically have better fuel efficiency but higher CO2 per liter, resulting in similar or slightly lower CO2 per km compared to equivalent gasoline vehicles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between volumetric fuel efficiency units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>MPG (US) to L/100km: L/100km = 235.215 / MPG</li>
            <li>MPG (UK) to L/100km: L/100km = 282.481 / MPG</li>
            <li>km/L to MPG (US): MPG = km/L × 2.352</li>
            <li>km/L to L/100km: L/100km = 100 / km/L</li>
            <li>L/100km to km/L: km/L = 100 / L/100km</li>
            <li>1 US gallon = 3.78541 liters</li>
            <li>1 UK gallon = 4.54609 liters</li>
            <li>1 mile = 1.60934 kilometers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Fuel Efficiency</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Vehicle purchase comparison and total cost of ownership</li>
            <li>Fleet management and fuel budget planning</li>
            <li>Corporate carbon footprint calculations</li>
            <li>Government fuel economy standards compliance</li>
            <li>Driver behavior monitoring and eco-driving programs</li>
            <li>Route optimization for delivery and logistics</li>
            <li>Vehicle maintenance scheduling based on fuel consumption changes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why does Europe use L/100km instead of MPG?</h3>
            <p className="text-muted-foreground">
              L/100km provides a linear relationship with fuel consumption. A vehicle using 10 L/100km consumes exactly twice as much fuel as one using 5 L/100km over the same distance. MPG is inversely proportional to consumption, making comparisons less intuitive. L/100km also simplifies fuel cost calculations: multiply by price per liter for cost per 100 km.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between US and UK MPG?</h3>
            <p className="text-muted-foreground">
              US and UK gallons differ in size. One US gallon equals 3.785 liters, while one UK (imperial) gallon equals 4.546 liters. A vehicle rated at 30 MPG UK achieves only 25 MPG US because the UK gallon is 20 percent larger. Always check which gallon standard applies when comparing fuel efficiency ratings.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How accurate are EPA fuel economy ratings?</h3>
            <p className="text-muted-foreground">
              EPA ratings provide standardized comparisons but may not match real-world driving. The EPA uses laboratory tests on chassis dynamometers with specific driving cycles. Real-world efficiency varies with driving style, traffic, weather, terrain, and vehicle load. Most drivers achieve 10 to 20 percent lower MPG than EPA combined ratings, especially with aggressive driving or highway speeds above 70 mph.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What factors affect fuel efficiency most?</h3>
            <p className="text-muted-foreground">
              Major factors include vehicle weight, aerodynamic drag, engine efficiency, and driving behavior. Aggressive acceleration and braking can reduce highway MPG by 15 to 30 percent. Speed matters: fuel economy typically peaks at 50 to 60 mph and drops significantly above 70 mph. Proper tire inflation, regular maintenance, and removing excess weight also improve efficiency.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
