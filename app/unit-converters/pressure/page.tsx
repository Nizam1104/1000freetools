"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function PressurePage() {
  const config = converterMappings["Pressure"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Pressure"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Pressure Converter</h1>
        <p className="text-muted-foreground">Convert pressure units including pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering, science, and industrial applications.</p>
      </div>
      <UnitConverterBase
        title="Pressure Converter"
        description="Convert pressure units including pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering, science, and industrial applications."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
