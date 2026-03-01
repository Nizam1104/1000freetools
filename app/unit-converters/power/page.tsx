"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function PowerPage() {
  const config = converterMappings["Power"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Power"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Power Converter</h1>
        <p className="text-muted-foreground">Convert power units including watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for mechanical, electrical, and engineering calculations.</p>
      </div>
      <UnitConverterBase
        title="Power Converter"
        description="Convert power units including watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for mechanical, electrical, and engineering calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
