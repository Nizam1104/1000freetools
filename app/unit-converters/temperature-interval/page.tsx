"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TemperatureIntervalPage() {
  const config = converterMappings["Temperature Interval"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Temperature Interval"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Temperature Interval Converter</h1>
        <p className="text-muted-foreground">Convert temperature interval and difference units between Celsius, Fahrenheit, Kelvin, and Rankine scales. Free online temperature difference converter for thermodynamics and HVAC.</p>
      </div>
      <UnitConverterBase
        title="Temperature Interval Converter"
        description="Convert temperature interval and difference units between Celsius, Fahrenheit, Kelvin, and Rankine scales. Free online temperature difference converter for thermodynamics and HVAC."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
