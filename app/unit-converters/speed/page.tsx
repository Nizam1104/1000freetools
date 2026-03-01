"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SpeedPage() {
  const config = converterMappings["Speed"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Speed"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Speed Converter</h1>
        <p className="text-muted-foreground">Convert speed and velocity units instantly — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.</p>
      </div>
      <UnitConverterBase
        title="Speed Converter"
        description="Convert speed and velocity units instantly — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
