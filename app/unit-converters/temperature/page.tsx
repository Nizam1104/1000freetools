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

export default function TemperaturePage() {
  const config = converterMappings["Temperature"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Temperature"</p>
      </div>
    );
  }

  const commonConversions = [
    { celsius: "0°C", fahrenheit: "32°F", kelvin: "273.15 K", description: "Water freezes" },
    { celsius: "10°C", fahrenheit: "50°F", kelvin: "283.15 K", description: "Cool day" },
    { celsius: "20°C", fahrenheit: "68°F", kelvin: "293.15 K", description: "Room temperature" },
    { celsius: "25°C", fahrenheit: "77°F", kelvin: "298.15 K", description: "Warm day" },
    { celsius: "37°C", fahrenheit: "98.6°F", kelvin: "310.15 K", description: "Body temperature" },
    { celsius: "100°C", fahrenheit: "212°F", kelvin: "373.15 K", description: "Water boils" },
  ];

  const cookingTemperatures = [
    { setting: "Cool", celsius: "120-140°C", fahrenheit: "250-285°F", use: "Slow cooking, dehydrating" },
    { setting: "Very Low", celsius: "140-150°C", fahrenheit: "285-300°F", use: "Slow roasting" },
    { setting: "Low", celsius: "150-160°C", fahrenheit: "300-325°F", use: "Cakes, delicate baking" },
    { setting: "Moderate", celsius: "160-180°C", fahrenheit: "325-350°F", use: "Most baking, roasting" },
    { setting: "Moderately Hot", celsius: "180-190°C", fahrenheit: "350-375°F", use: "Cookies, breads" },
    { setting: "Hot", celsius: "190-220°C", fahrenheit: "375-425°F", use: "Pizza, high-heat roasting" },
    { setting: "Very Hot", celsius: "220-260°C", fahrenheit: "425-500°F", use: "Searing, broiling" },
  ];

  const weatherReference = [
    { celsius: "-20°C", fahrenheit: "-4°F", description: "Extremely cold, dangerous exposure" },
    { celsius: "-10°C", fahrenheit: "14°F", description: "Very cold, heavy winter clothing needed" },
    { celsius: "0°C", fahrenheit: "32°F", description: "Freezing, ice forms" },
    { celsius: "10°C", fahrenheit: "50°F", description: "Cool, light jacket needed" },
    { celsius: "20°C", fahrenheit: "68°F", description: "Comfortable, light clothing" },
    { celsius: "30°C", fahrenheit: "86°F", description: "Warm, summer weather" },
    { celsius: "40°C", fahrenheit: "104°F", description: "Hot, heat advisory possible" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Temperature Converter</h1>
        <p className="text-muted-foreground">Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine instantly. Use our free online temperature converter for weather, cooking, and scientific calculations.</p>
      </div>
      <UnitConverterBase
        title="Temperature Converter"
        description="Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine instantly. Use our free online temperature converter for weather, cooking, and scientific calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Temperature Scales</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Temperature measures the average kinetic energy of particles in a substance. Different regions and fields use different temperature scales. Celsius dominates global everyday use, Fahrenheit remains common in the US, and Kelvin serves scientific applications.
            </p>
            <p>
              Anders Celsius created his scale in 1742, setting water&apos;s freezing point at 0° and boiling point at 100°. Daniel Fahrenheit developed his scale in 1724, using a brine mixture for 0° and human body temperature for 96° (later adjusted to 98.6°). William Thomson (Lord Kelvin) introduced the absolute Kelvin scale in 1848, starting at absolute zero.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Celsius to Fahrenheit</p>
                  <p className="text-lg font-semibold">°F = (°C × 9/5) + 32</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 25°C × 9/5 + 32 = 77°F</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Fahrenheit to Celsius</p>
                  <p className="text-lg font-semibold">°C = (°F - 32) × 5/9</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: (77°F - 32) × 5/9 = 25°C</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Celsius to Kelvin</p>
                  <p className="text-lg font-semibold">K = °C + 273.15</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 25°C + 273.15 = 298.15 K</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kelvin to Celsius</p>
                  <p className="text-lg font-semibold">°C = K - 273.15</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 300 K - 273.15 = 26.85°C</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Fahrenheit to Rankine</p>
                  <p className="text-lg font-semibold">°R = °F + 459.67</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 77°F + 459.67 = 536.67°R</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kelvin to Rankine</p>
                  <p className="text-lg font-semibold">°R = K × 9/5</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 300 K × 9/5 = 540°R</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Temperature Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Celsius</TableHead>
                    <TableHead>Fahrenheit</TableHead>
                    <TableHead>Kelvin</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.celsius}</TableCell>
                      <TableCell>{conv.fahrenheit}</TableCell>
                      <TableCell>{conv.kelvin}</TableCell>
                      <TableCell>{conv.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Oven Temperature Guide</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Setting</TableHead>
                    <TableHead>Celsius</TableHead>
                    <TableHead>Fahrenheit</TableHead>
                    <TableHead>Best For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cookingTemperatures.map((temp, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{temp.setting}</TableCell>
                      <TableCell>{temp.celsius}</TableCell>
                      <TableCell>{temp.fahrenheit}</TableCell>
                      <TableCell>{temp.use}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Weather Temperature Reference</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Celsius</TableHead>
                    <TableHead>Fahrenheit</TableHead>
                    <TableHead>Conditions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weatherReference.map((temp, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{temp.celsius}</TableCell>
                      <TableCell>{temp.fahrenheit}</TableCell>
                      <TableCell>{temp.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Scale Comparison</h2>
          <Card>
            <CardHeader>
              <CardTitle>Key Reference Points</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference Point</TableHead>
                    <TableHead>Celsius</TableHead>
                    <TableHead>Fahrenheit</TableHead>
                    <TableHead>Kelvin</TableHead>
                    <TableHead>Rankine</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Absolute Zero</TableCell>
                    <TableCell>-273.15°C</TableCell>
                    <TableCell>-459.67°F</TableCell>
                    <TableCell>0 K</TableCell>
                    <TableCell>0°R</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Water Freezes</TableCell>
                    <TableCell>0°C</TableCell>
                    <TableCell>32°F</TableCell>
                    <TableCell>273.15 K</TableCell>
                    <TableCell>491.67°R</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Human Body</TableCell>
                    <TableCell>37°C</TableCell>
                    <TableCell>98.6°F</TableCell>
                    <TableCell>310.15 K</TableCell>
                    <TableCell>558.27°R</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Water Boils</TableCell>
                    <TableCell>100°C</TableCell>
                    <TableCell>212°F</TableCell>
                    <TableCell>373.15 K</TableCell>
                    <TableCell>671.67°R</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Temperature Scale</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Celsius (°C)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Everyday Use</p>
                  <p className="text-muted-foreground">Weather forecasts, cooking, body temperature (most countries)</p>
                </div>
                <div>
                  <p className="font-semibold">Science</p>
                  <p className="text-muted-foreground">General laboratory work, chemistry, biology</p>
                </div>
                <div>
                  <p className="font-semibold">Industry</p>
                  <p className="text-muted-foreground">Manufacturing, HVAC, food processing (global)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fahrenheit (°F)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Everyday Use</p>
                  <p className="text-muted-foreground">Weather, cooking, body temperature (US only)</p>
                </div>
                <div>
                  <p className="font-semibold">HVAC</p>
                  <p className="text-muted-foreground">Home thermostats, air conditioning (US)</p>
                </div>
                <div>
                  <p className="font-semibold">Cooking</p>
                  <p className="text-muted-foreground">Oven temperatures, meat thermometers (US)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kelvin (K)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Physics</p>
                  <p className="text-muted-foreground">Thermodynamics, quantum mechanics, astrophysics</p>
                </div>
                <div>
                  <p className="font-semibold">Chemistry</p>
                  <p className="text-muted-foreground">Gas laws, reaction rates, absolute measurements</p>
                </div>
                <div>
                  <p className="font-semibold">Engineering</p>
                  <p className="text-muted-foreground">Cryogenics, high-temperature processes</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rankine (°R)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Engineering</p>
                  <p className="text-muted-foreground">Thermodynamics (US engineering fields)</p>
                </div>
                <div>
                  <p className="font-semibold">Aerospace</p>
                  <p className="text-muted-foreground">Some US aerospace applications</p>
                </div>
                <div>
                  <p className="font-semibold">HVAC</p>
                  <p className="text-muted-foreground">Specialized US heating/cooling calculations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Mental Conversion Tips</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Celsius to Fahrenheit (Approximate)</h3>
                <p className="text-muted-foreground">Double the Celsius temperature and add 30. Example: 20°C × 2 = 40 + 30 = 70°F (actual: 68°F). This works well for typical weather temperatures.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Fahrenheit to Celsius (Approximate)</h3>
                <p className="text-muted-foreground">Subtract 30 from Fahrenheit and divide by 2. Example: 70°F - 30 = 40 ÷ 2 = 20°C (actual: 21.1°C). Good enough for weather estimates.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Key Reference Points</h3>
                <p className="text-muted-foreground">Memorize these: 0°C = 32°F (freezing), 10°C = 50°F (cool), 20°C = 68°F (comfortable), 30°C = 86°F (warm), 40°C = 104°F (hot). Use these to estimate other temperatures.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">At what temperature are Celsius and Fahrenheit equal?</h3>
                <p className="text-muted-foreground">Celsius and Fahrenheit scales intersect at -40 degrees. -40°C equals -40°F. This occurs because the scales have different zero points and different degree sizes.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why does the US still use Fahrenheit?</h3>
                <p className="text-muted-foreground">The US adopted Fahrenheit before the metric system gained global acceptance. Changing would require updating countless thermostats, weather services, cookbooks, and public understanding. The cost and effort outweigh perceived benefits.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is absolute zero?</h3>
                <p className="text-muted-foreground">Absolute zero (0 K, -273.15°C, -459.67°F) represents the lowest possible temperature. At this point, particles have minimal kinetic energy. Scientists have cooled matter to within billionths of a degree above absolute zero.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Is Kelvin written with a degree symbol?</h3>
                <p className="text-muted-foreground">No. Kelvin uses just &quot;K&quot; without a degree symbol. This distinguishes it as an absolute scale starting at zero. Celsius and Fahrenheit use degree symbols (°C, °F) because their zero points are arbitrary.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
