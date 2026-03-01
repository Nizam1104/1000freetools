"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FuelConsumptionPage() {
  const config = converterMappings["Fuel Consumption"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Fuel Consumption"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Fuel Consumption Converter</h1>
        <p className="text-muted-foreground">Convert fuel consumption and efficiency units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management.</p>
      </div>
      <UnitConverterBase
        title="Fuel Consumption Converter"
        description="Convert fuel consumption and efficiency units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Fuel Consumption</h2>
          <p className="text-muted-foreground mb-4">
            Fuel consumption measures how much fuel a vehicle uses to travel a given distance. Lower consumption means better efficiency and lower operating costs. Different regions express fuel consumption differently: North America uses miles per gallon (MPG), Europe uses liters per 100 kilometers (L/100km), and some countries use kilometers per liter (km/L).
          </p>
          <p className="text-muted-foreground">
            MPG and km/L are distance-per-fuel metrics where higher numbers indicate better efficiency. L/100km is a fuel-per-distance metric where lower numbers indicate better efficiency. Understanding these conventions helps when comparing vehicles from different markets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fuel Consumption Formulas</h2>
          <p className="text-muted-foreground mb-4">
            Calculate fuel consumption from distance and fuel used:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">MPG = Distance (miles) / Fuel Used (gallons)</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">L/100km = (Fuel Used (L) / Distance (km)) × 100</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">km/L = Distance (km) / Fuel Used (L)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A car travels 600 km using 48 liters of fuel:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">L/100km = (48 / 600) × 100 = 8.0 L/100km</p>
            <p className="font-mono text-sm">km/L = 600 / 48 = 12.5 km/L</p>
            <p className="font-mono text-sm">MPG (US) = 235.215 / 8.0 = 29.4 MPG</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">MPG to L/100km Conversion</h2>
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
            Quick reference conversions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">MPG (US)</th>
                  <th className="border border-border p-3 text-left">L/100km</th>
                  <th className="border border-border p-3 text-left">km/L</th>
                  <th className="border border-border p-3 text-left">MPG (UK)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">10</td>
                  <td className="border border-border p-3">23.52</td>
                  <td className="border border-border p-3">4.25</td>
                  <td className="border border-border p-3">12.01</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">15</td>
                  <td className="border border-border p-3">15.68</td>
                  <td className="border border-border p-3">6.38</td>
                  <td className="border border-border p-3">18.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">20</td>
                  <td className="border border-border p-3">11.76</td>
                  <td className="border border-border p-3">8.50</td>
                  <td className="border border-border p-3">24.02</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">25</td>
                  <td className="border border-border p-3">9.41</td>
                  <td className="border border-border p-3">10.63</td>
                  <td className="border border-border p-3">30.02</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">30</td>
                  <td className="border border-border p-3">7.84</td>
                  <td className="border border-border p-3">12.75</td>
                  <td className="border border-border p-3">36.03</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">35</td>
                  <td className="border border-border p-3">6.72</td>
                  <td className="border border-border p-3">14.88</td>
                  <td className="border border-border p-3">42.03</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">40</td>
                  <td className="border border-border p-3">5.88</td>
                  <td className="border border-border p-3">17.00</td>
                  <td className="border border-border p-3">48.04</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">50</td>
                  <td className="border border-border p-3">4.70</td>
                  <td className="border border-border p-3">21.25</td>
                  <td className="border border-border p-3">60.05</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">60</td>
                  <td className="border border-border p-3">3.92</td>
                  <td className="border border-border p-3">25.50</td>
                  <td className="border border-border p-3">72.06</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">80</td>
                  <td className="border border-border p-3">2.94</td>
                  <td className="border border-border p-3">34.00</td>
                  <td className="border border-border p-3">96.08</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fuel Cost Calculator</h2>
          <p className="text-muted-foreground mb-4">
            Calculate fuel costs from consumption and fuel price:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Cost per km = (Price per L) / (km/L)</p>
            <p className="font-mono text-sm">Cost per 100km = (L/100km) × (Price per L)</p>
            <p className="font-mono text-sm">Annual Cost = Annual Distance × Cost per km</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Fuel costs $1.45/L, vehicle uses 7.5 L/100km, annual driving is 18,000 km:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Cost per 100km = 7.5 × $1.45 = $10.88</p>
            <p className="font-mono text-sm">Cost per km = $10.88 / 100 = $0.109</p>
            <p className="font-mono text-sm">Annual Cost = 18,000 × $0.109 = $1,962</p>
          </div>
          <p className="text-muted-foreground">
            Comparing to a more efficient vehicle using 5.5 L/100km:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">Annual savings = 18,000 × (7.5 - 5.5) / 100 × $1.45 = $522</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">EPA Fuel Economy Ratings</h2>
          <p className="text-muted-foreground mb-4">
            The US Environmental Protection Agency tests vehicles and publishes fuel economy ratings:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Vehicle Class</th>
                  <th className="border border-border p-3 text-left">City MPG</th>
                  <th className="border border-border p-3 text-left">Highway MPG</th>
                  <th className="border border-border p-3 text-left">Combined MPG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Subcompact (2024 avg)</td>
                  <td className="border border-border p-3">28 to 33</td>
                  <td className="border border-border p-3">36 to 43</td>
                  <td className="border border-border p-3">31 to 37</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Compact (2024 avg)</td>
                  <td className="border border-border p-3">26 to 31</td>
                  <td className="border border-border p-3">34 to 40</td>
                  <td className="border border-border p-3">29 to 35</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mid-size (2024 avg)</td>
                  <td className="border border-border p-3">23 to 28</td>
                  <td className="border border-border p-3">31 to 37</td>
                  <td className="border border-border p-3">26 to 32</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Compact SUV (2024 avg)</td>
                  <td className="border border-border p-3">24 to 29</td>
                  <td className="border border-border p-3">30 to 35</td>
                  <td className="border border-border p-3">26 to 32</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Mid-size SUV (2024 avg)</td>
                  <td className="border border-border p-3">20 to 24</td>
                  <td className="border border-border p-3">26 to 30</td>
                  <td className="border border-border p-3">22 to 27</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Full-size SUV (2024 avg)</td>
                  <td className="border border-border p-3">15 to 19</td>
                  <td className="border border-border p-3">20 to 25</td>
                  <td className="border border-border p-3">17 to 21</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Pickup Truck (2024 avg)</td>
                  <td className="border border-border p-3">16 to 21</td>
                  <td className="border border-border p-3">20 to 26</td>
                  <td className="border border-border p-3">18 to 23</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Hybrid Compact (2024 avg)</td>
                  <td className="border border-border p-3">45 to 55</td>
                  <td className="border border-border p-3">45 to 53</td>
                  <td className="border border-border p-3">45 to 54</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Electric (MPGe, 2024 avg)</td>
                  <td className="border border-border p-3">110 to 140</td>
                  <td className="border border-border p-3">95 to 120</td>
                  <td className="border border-border p-3">100 to 130</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">CO2 Emissions from Fuel</h2>
          <p className="text-muted-foreground mb-4">
            Estimate carbon dioxide emissions from fuel consumption:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">CO2 (g/km) = (L/100km) × 23.1</p>
            <p className="text-sm text-muted-foreground mt-2">Gasoline produces approximately 2,310 g CO2 per liter</p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">CO2 (g/km) = (L/100km) × 26.8</p>
            <p className="text-sm text-muted-foreground mt-2">Diesel produces approximately 2,680 g CO2 per liter</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A gasoline vehicle using 8 L/100km:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">CO2 = 8 × 23.1 = 184.8 g/km</p>
          </div>
          <p className="text-muted-foreground mt-4">
            Annual CO2 emissions for 15,000 km driving:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">Annual CO2 = 15,000 × 184.8 / 1000 = 2,772 kg = 2.77 tonnes</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Factors Affecting Fuel Consumption</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li><strong>Driving behavior:</strong> Aggressive acceleration and braking can increase consumption by 15 to 30 percent</li>
            <li><strong>Speed:</strong> Fuel economy typically peaks at 50 to 60 mph and drops above 70 mph</li>
            <li><strong>Vehicle weight:</strong> Every 100 kg reduces fuel economy by about 1 to 2 percent</li>
            <li><strong>Tire pressure:</strong> Under-inflated tires increase consumption by 0.2 percent per psi below recommended</li>
            <li><strong>Aerodynamics:</strong> Roof racks and open windows increase drag and consumption</li>
            <li><strong>Engine maintenance:</strong> Dirty filters and old spark plugs reduce efficiency</li>
            <li><strong>Air conditioning:</strong> AC use can increase consumption by 5 to 25 percent in city driving</li>
            <li><strong>Traffic conditions:</strong> Stop-and-go traffic consumes more fuel than steady highway driving</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips for Better Fuel Economy</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Drive smoothly with gradual acceleration and braking</li>
            <li>Maintain steady speeds using cruise control on highways</li>
            <li>Keep tires properly inflated to recommended pressure</li>
            <li>Remove unnecessary weight from the vehicle</li>
            <li>Use air conditioning sparingly in city driving</li>
            <li>Combine errands to reduce total distance traveled</li>
            <li>Follow recommended maintenance schedules</li>
            <li>Use the recommended grade of motor oil</li>
            <li>Plan routes to avoid traffic congestion</li>
            <li>Consider a fuel-efficient or hybrid vehicle for your next purchase</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why is highway MPG higher than city MPG?</h3>
            <p className="text-muted-foreground">
              Highway driving involves steady speeds with minimal braking, allowing the engine to operate at optimal efficiency. City driving requires frequent stops and accelerations, which consume extra fuel. Idling at traffic lights also wastes fuel. Most vehicles achieve 20 to 30 percent better fuel economy on highways than in cities.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Does premium fuel improve MPG?</h3>
            <p className="text-muted-foreground">
              Premium fuel only benefits engines designed for it. Using premium in a regular-fuel vehicle provides no measurable improvement in fuel economy or performance. Using regular in a premium-required vehicle can cause engine knock and reduced performance. Follow the manufacturer recommendation in your owner manual.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How accurate is the trip computer MPG display?</h3>
            <p className="text-muted-foreground">
              Vehicle trip computers typically show optimistic readings, overestimating MPG by 5 to 15 percent. For accurate measurements, fill the tank completely, reset the trip odometer, drive normally, then divide miles driven by gallons needed to refill. Track several tanks for a reliable average.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is a good MPG for a car?</h3>
            <p className="text-muted-foreground">
              Good MPG depends on vehicle type. Subcompact cars should achieve 30 to 40 MPG combined. Mid-size sedans typically get 25 to 35 MPG. Compact SUVs achieve 25 to 32 MPG. Hybrid vehicles can exceed 45 to 55 MPG. Electric vehicles are rated in MPGe (miles per gallon equivalent), typically 100 to 130 MPGe.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
