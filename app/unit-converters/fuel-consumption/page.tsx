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
    </div>
  );
}
