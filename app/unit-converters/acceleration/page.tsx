"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AccelerationPage() {
  const config = converterMappings["Acceleration"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Acceleration"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Acceleration Converter</h1>
        <p className="text-muted-foreground">Convert acceleration units including m/s², g-force, ft/s², Gal, and more. Accurate online acceleration converter for physics, aerospace, and mechanical engineering.</p>
      </div>
      <UnitConverterBase
        title="Acceleration Converter"
        description="Convert acceleration units including m/s², g-force, ft/s², Gal, and more. Accurate online acceleration converter for physics, aerospace, and mechanical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
