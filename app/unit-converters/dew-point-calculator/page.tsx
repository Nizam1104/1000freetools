"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function DewPointCalculatorPage() {
  const config = converterMappings["Dew Point Calculator"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Dew Point Calculator"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Dew Point Calculator</h1>
        <p className="text-muted-foreground">Calculate dew point temperature from relative humidity and air temperature instantly. Free online dew point calculator for weather forecasting, HVAC design, and condensation analysis.</p>
      </div>
      <UnitConverterBase
        title="Dew Point Calculator"
        description="Calculate dew point temperature from relative humidity and air temperature instantly. Free online dew point calculator for weather forecasting, HVAC design, and condensation analysis."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Dew Point</h2>
          <p className="text-muted-foreground mb-4">
            Dew point is the temperature at which air becomes saturated with water vapor and condensation forms. Higher dew points indicate more moisture in the air. This measurement is crucial for weather prediction, HVAC systems, and comfort assessment.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Magnus Formula for Dew Point</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Td = (b × α) / (a - α)</p>
            <p>Where α = ln(RH/100) + (a × T) / (b + T)</p>
            <p>a = 17.27, b = 237.7°C</p>
            <p>T = air temperature, RH = relative humidity</p>
          </div>

          <p className="text-muted-foreground">
            The Magnus formula provides accurate dew point calculations for typical atmospheric conditions. Constants vary slightly between different formulations but produce similar results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Comfort Level Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Dew Point (°F)</th>
                  <th className="border border-border p-3 text-left">Dew Point (°C)</th>
                  <th className="border border-border p-3 text-left">Human Comfort</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Below 55°F</td>
                  <td className="border border-border p-3">Below 13°C</td>
                  <td className="border border-border p-3">Dry, comfortable</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">55-59°F</td>
                  <td className="border border-border p-3">13-15°C</td>
                  <td className="border border-border p-3">Comfortable for most</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">60-64°F</td>
                  <td className="border border-border p-3">16-18°C</td>
                  <td className="border border-border p-3">Slightly humid</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">65-69°F</td>
                  <td className="border border-border p-3">18-21°C</td>
                  <td className="border border-border p-3">Humid, noticeable</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">70-74°F</td>
                  <td className="border border-border p-3">21-23°C</td>
                  <td className="border border-border p-3">Very humid, uncomfortable</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">75°F and above</td>
                  <td className="border border-border p-3">24°C and above</td>
                  <td className="border border-border p-3">Oppressive, dangerous</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Condensation Prediction</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">When Condensation Forms</p>
              <p className="text-muted-foreground">
                Condensation occurs when surface temperature falls below the dew point. Water vapor in the air changes to liquid on cold surfaces. This causes fog, dew on grass, and water droplets on cold drinks.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Building Moisture Control</p>
              <p className="text-muted-foreground">
                Keep interior surfaces above dew point to prevent condensation in walls and attics. Proper insulation and ventilation reduce moisture problems. Vapor barriers prevent warm moist air from reaching cold surfaces.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">HVAC System Design</p>
              <p className="text-muted-foreground">
                Air conditioning coils must be below dew point to remove moisture. Supply air temperature affects indoor humidity levels. Proper sizing prevents short cycling and inadequate dehumidification.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Weather Forecasting</p>
              <p className="text-muted-foreground">
                Dew point near air temperature indicates high humidity and possible fog or precipitation. Large temperature-dew point spread means dry air. Rising dew points often precede storms.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dew Point Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Moderate Conditions</p>
              <p className="text-muted-foreground">
                Temperature: 25°C (77°F)<br />
                Relative Humidity: 60%<br />
                Dew Point: approximately 17°C (63°F)<br />
                Comfort: Slightly humid but acceptable
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: High Humidity</p>
              <p className="text-muted-foreground">
                Temperature: 30°C (86°F)<br />
                Relative Humidity: 80%<br />
                Dew Point: approximately 26°C (79°F)<br />
                Comfort: Very uncomfortable, oppressive
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Dry Conditions</p>
              <p className="text-muted-foreground">
                Temperature: 35°C (95°F)<br />
                Relative Humidity: 20%<br />
                Dew Point: approximately 8°C (46°F)<br />
                Comfort: Dry heat, comfortable despite high temperature
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is a comfortable dew point?</h3>
              <p className="text-muted-foreground">
                Dew points between 55°F and 59°F (13-15°C) feel comfortable to most people. Below 55°F feels dry and pleasant. Above 65°F (18°C) feels humid and uncomfortable for many individuals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does dew point differ from humidity?</h3>
              <p className="text-muted-foreground">
                Relative humidity changes with temperature while dew point remains constant for a given moisture content. Dew point directly indicates moisture amount. High relative humidity at low temperature may have lower dew point than moderate humidity at high temperature.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why does dew form on grass in the morning?</h3>
              <p className="text-muted-foreground">
                Grass cools overnight through radiation. When grass temperature drops below the dew point, water vapor condenses into droplets. Clear nights promote more cooling and heavier dew formation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What dew point causes fog?</h3>
              <p className="text-muted-foreground">
                Fog forms when air temperature equals dew point, creating 100% relative humidity. Temperature-dew point spread below 2.5°F (1.5°C) often indicates fog formation. Radiation fog commonly occurs on clear, calm nights.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
