"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TemperaturePage() {
  const config = converterMappings["Temperature"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Temperature"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
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
    </div>
  );
}
