"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ConcentrationSolutionPage() {
  const config = converterMappings["Concentration - Solution"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Concentration - Solution"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Solution Concentration Converter</h1>
        <p className="text-muted-foreground">Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online concentration converter for chemistry, water treatment, and environmental testing.</p>
      </div>
      <UnitConverterBase
        title="Solution Concentration Converter"
        description="Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online concentration converter for chemistry, water treatment, and environmental testing."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
