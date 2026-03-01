"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ViscosityDynamicPage() {
  const config = converterMappings["Viscosity - Dynamic"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Viscosity - Dynamic"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Dynamic Viscosity Converter</h1>
        <p className="text-muted-foreground">Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online dynamic viscosity converter for fluid mechanics, lubrication, and chemical engineering.</p>
      </div>
      <UnitConverterBase
        title="Dynamic Viscosity Converter"
        description="Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online dynamic viscosity converter for fluid mechanics, lubrication, and chemical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
