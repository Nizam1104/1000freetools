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

export default function EnergyPage() {
  const config = converterMappings["Energy"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Energy"</p>
      </div>
    );
  }

  const commonConversions = [
    { joule: "1 J", kj: "0.001 kJ", cal: "0.239 cal", wh: "0.000278 Wh", btu: "0.000948 BTU" },
    { joule: "1,000 J", kj: "1 kJ", cal: "239 cal", wh: "0.278 Wh", btu: "0.948 BTU" },
    { joule: "4,184 J", kj: "4.184 kJ", cal: "1,000 cal", wh: "1.162 Wh", btu: "3.966 BTU" },
    { joule: "3,600 J", kj: "3.6 kJ", cal: "860 cal", wh: "1 Wh", btu: "3.412 BTU" },
    { joule: "1,055 J", kj: "1.055 kJ", cal: "252 cal", wh: "0.293 Wh", btu: "1 BTU" },
    { joule: "1 kWh", kj: "3,600 kJ", cal: "860,421 cal", wh: "1,000 Wh", btu: "3,412 BTU" },
  ];

  const energyReference = [
    { activity: "Lifting an apple 1 meter", joules: "1 J", calories: "0.24 cal", description: "Small mechanical work" },
    { activity: "Food calorie (1 Cal)", joules: "4,184 J", calories: "1,000 cal", description: "Nutritional energy" },
    { activity: "AA battery", joules: "10,000 J", calories: "2,390 cal", description: "Typical capacity" },
    { activity: "Smartphone battery", joules: "54,000 J", calories: "12,900 cal", description: "15 Wh battery" },
    { activity: "Daily food intake", joules: "8,400,000 J", calories: "2,000 Cal", description: "Average adult" },
    { activity: "Gasoline (1 liter)", joules: "34,000,000 J", calories: "8,126,000 cal", description: "Chemical energy" },
    { activity: "Household electricity (1 kWh)", joules: "3,600,000 J", calories: "860,421 cal", description: "Energy unit billing" },
  ];

  const foodEnergy = [
    { food: "Apple (medium)", calories: "95 Cal", kilojoules: "397 kJ" },
    { food: "Banana (medium)", calories: "105 Cal", kilojoules: "439 kJ" },
    { food: "Bread (1 slice)", calories: "79 Cal", kilojoules: "330 kJ" },
    { food: "Egg (large)", calories: "78 Cal", kilojoules: "326 kJ" },
    { food: "Rice (1 cup cooked)", calories: "205 Cal", kilojoules: "858 kJ" },
    { food: "Chicken breast (100g)", calories: "165 Cal", kilojoules: "690 kJ" },
    { food: "Chocolate bar (50g)", calories: "270 Cal", kilojoules: "1,130 kJ" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Energy Converter</h1>
        <p className="text-muted-foreground">Convert energy units instantly — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Use our free energy converter for physics, nutrition, and engineering needs.</p>
      </div>
      <UnitConverterBase
        title="Energy Converter"
        description="Convert energy units instantly — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Use our free energy converter for physics, nutrition, and engineering needs."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Energy</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Energy represents the capacity to do work or produce heat. Energy exists in many forms — kinetic (motion), potential (stored), thermal (heat), chemical (bonds), electrical, and nuclear. You use energy constantly — moving your body, powering devices, heating your home.
            </p>
            <p>
              The joule (J) serves as the SI unit for energy, named after James Prescott Joule. One joule equals the work done by a one-newton force moving an object one meter. Calories measure food energy, kilowatt-hours measure electricity, and BTUs measure heating/cooling capacity.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Energy Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Energy Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kinetic Energy</p>
                  <p className="text-lg font-semibold">KE = ½ × m × v²</p>
                  <p className="text-sm text-muted-foreground mt-2">Mass times velocity squared, divided by 2</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 10 kg at 5 m/s = 125 J</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Potential Energy (Gravity)</p>
                  <p className="text-lg font-semibold">PE = m × g × h</p>
                  <p className="text-sm text-muted-foreground mt-2">Mass × gravity × height</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 10 kg × 9.81 × 2m = 196.2 J</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Thermal Energy</p>
                  <p className="text-lg font-semibold">Q = m × c × ΔT</p>
                  <p className="text-sm text-muted-foreground mt-2">Mass × specific heat × temperature change</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 1 kg water, 10°C rise = 41,840 J</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Electrical Energy</p>
                  <p className="text-lg font-semibold">E = P × t</p>
                  <p className="text-sm text-muted-foreground mt-2">Power × time</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 100W × 3600s = 360,000 J = 0.1 kWh</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Mass-Energy Equivalence</p>
                  <p className="text-lg font-semibold">E = m × c²</p>
                  <p className="text-sm text-muted-foreground mt-2">Einstein&apos;s equation: mass × speed of light squared</p>
                  <p className="text-sm text-muted-foreground mt-1">1 kg = 90,000,000,000,000,000 J</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Work-Energy Theorem</p>
                  <p className="text-lg font-semibold">W = F × d</p>
                  <p className="text-sm text-muted-foreground mt-2">Work equals force times distance</p>
                  <p className="text-sm text-muted-foreground mt-1">Example: 10 N × 5 m = 50 J</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Energy Conversion Formulas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Core Conversion Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Joules to Calories</p>
                  <p className="text-lg font-semibold">cal = J × 0.239006</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 J × 0.239006 = 23.9 cal</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Calories to Joules</p>
                  <p className="text-lg font-semibold">J = cal × 4.184</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 100 cal × 4.184 = 418.4 J</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Kilowatt-hours to Joules</p>
                  <p className="text-lg font-semibold">J = kWh × 3,600,000</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 1 kWh × 3,600,000 = 3.6 MJ</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Joules to Kilowatt-hours</p>
                  <p className="text-lg font-semibold">kWh = J ÷ 3,600,000</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 1,000,000 J ÷ 3,600,000 = 0.278 kWh</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">BTU to Joules</p>
                  <p className="text-lg font-semibold">J = BTU × 1,055.06</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10 BTU × 1,055.06 = 10,551 J</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-sm mb-2">Joules to BTU</p>
                  <p className="text-lg font-semibold">BTU = J × 0.000947817</p>
                  <p className="text-sm text-muted-foreground mt-2">Example: 10,000 J × 0.000947817 = 9.48 BTU</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Energy Conversions</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Joules</TableHead>
                    <TableHead>Kilojoules</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Watt-hours</TableHead>
                    <TableHead>BTU</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonConversions.map((conv, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{conv.joule}</TableCell>
                      <TableCell>{conv.kj}</TableCell>
                      <TableCell>{conv.cal}</TableCell>
                      <TableCell>{conv.wh}</TableCell>
                      <TableCell>{conv.btu}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Energy Unit Reference Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Equals 1 Unit In Joules</TableHead>
                    <TableHead>Primary Use</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Joule</TableCell>
                    <TableCell>J</TableCell>
                    <TableCell>1 J</TableCell>
                    <TableCell>SI unit, physics, engineering</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilojoule</TableCell>
                    <TableCell>kJ</TableCell>
                    <TableCell>1,000 J</TableCell>
                    <TableCell>Food labels (some countries), science</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Calorie</TableCell>
                    <TableCell>cal</TableCell>
                    <TableCell>4.184 J</TableCell>
                    <TableCell>Chemistry, small energy amounts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilocalorie (Food Calorie)</TableCell>
                    <TableCell>Cal, kcal</TableCell>
                    <TableCell>4,184 J</TableCell>
                    <TableCell>Nutrition, food energy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Watt-hour</TableCell>
                    <TableCell>Wh</TableCell>
                    <TableCell>3,600 J</TableCell>
                    <TableCell>Electrical energy, batteries</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kilowatt-hour</TableCell>
                    <TableCell>kWh</TableCell>
                    <TableCell>3,600,000 J</TableCell>
                    <TableCell>Electricity billing, home energy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">BTU</TableCell>
                    <TableCell>BTU</TableCell>
                    <TableCell>1,055.06 J</TableCell>
                    <TableCell>HVAC, heating, natural gas (US)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Electronvolt</TableCell>
                    <TableCell>eV</TableCell>
                    <TableCell>1.602×10⁻¹⁹ J</TableCell>
                    <TableCell>Atomic physics, particle physics</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-World Energy Examples</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object/Activity</TableHead>
                    <TableHead>Joules</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {energyReference.map((ref, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{ref.activity}</TableCell>
                      <TableCell>{ref.joules}</TableCell>
                      <TableCell>{ref.calories}</TableCell>
                      <TableCell>{ref.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Food Energy Content</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Food Item</TableHead>
                    <TableHead>Calories (Cal)</TableHead>
                    <TableHead>Kilojoules (kJ)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foodEnergy.map((food, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{food.food}</TableCell>
                      <TableCell>{food.calories}</TableCell>
                      <TableCell>{food.kilojoules}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Energy Unit</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Joules (J) / Kilojoules (kJ)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Physics & Science</p>
                  <p className="text-muted-foreground">All scientific calculations, research, education</p>
                </div>
                <div>
                  <p className="font-semibold">Engineering</p>
                  <p className="text-muted-foreground">Mechanical, electrical, thermal calculations</p>
                </div>
                <div>
                  <p className="font-semibold">Nutrition</p>
                  <p className="text-muted-foreground">Food labels (Australia, Europe use kJ)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calories (Cal/kcal)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Nutrition</p>
                  <p className="text-muted-foreground">Food labels, diet tracking (US, many countries)</p>
                </div>
                <div>
                  <p className="font-semibold">Exercise</p>
                  <p className="text-muted-foreground">Calories burned, fitness tracking</p>
                </div>
                <div>
                  <p className="font-semibold">Chemistry</p>
                  <p className="text-muted-foreground">Reaction energies (small calories)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kilowatt-hours (kWh)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Electricity</p>
                  <p className="text-muted-foreground">Utility billing, home energy consumption</p>
                </div>
                <div>
                  <p className="font-semibold">Batteries</p>
                  <p className="text-muted-foreground">EV battery capacity, home storage</p>
                </div>
                <div>
                  <p className="font-semibold">Appliances</p>
                  <p className="text-muted-foreground">Energy ratings, consumption estimates</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">BTU</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">HVAC</p>
                  <p className="text-muted-foreground">Air conditioner, heater capacity ratings (US)</p>
                </div>
                <div>
                  <p className="font-semibold">Natural Gas</p>
                  <p className="text-muted-foreground">Gas energy content, billing (US)</p>
                </div>
                <div>
                  <p className="font-semibold">Industrial</p>
                  <p className="text-muted-foreground">Boilers, furnaces, process heating</p>
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
                <h3 className="font-semibold mb-2">What is the difference between calories and Calories?</h3>
                <p className="text-muted-foreground">One Calorie (capital C, also written kcal) equals 1,000 calories (lowercase c). Food labels use Calories (kcal). One food Calorie equals 4,184 joules. When people say &quot;calories&quot; in nutrition, they mean kilocalories.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How many joules are in a kilowatt-hour?</h3>
                <p className="text-muted-foreground">One kilowatt-hour equals exactly 3,600,000 joules (3.6 megajoules). This represents one kilowatt of power used for one hour. Electricity bills charge per kWh consumed.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What is a BTU?</h3>
                <p className="text-muted-foreground">BTU stands for British Thermal Unit. One BTU raises one pound of water by one degree Fahrenheit. Air conditioners and heaters use BTU/h ratings. A typical window AC unit produces 5,000-12,000 BTU/h.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I convert food calories to joules?</h3>
                <p className="text-muted-foreground">Multiply food Calories (kcal) by 4,184. Example: 250 Cal × 4,184 = 1,046,000 J = 1,046 kJ. For small calories, multiply by 4.184 instead.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
