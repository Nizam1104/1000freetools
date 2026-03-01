"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ForcePage() {
  const config = converterMappings["Force"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Force"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Force Converter</h1>
        <p className="text-muted-foreground">Convert force units including newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics, engineering, and scientific applications.</p>
      </div>
      <UnitConverterBase
        title="Force Converter"
        description="Convert force units including newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics, engineering, and scientific applications."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
