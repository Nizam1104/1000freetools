"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function HeatFluxDensityPage() {
  const config = converterMappings["Heat Flux Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Heat Flux Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Heat Flux Density Converter</h1>
        <p className="text-muted-foreground">Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online heat flux converter for thermal engineering, solar energy, and building insulation.</p>
      </div>
      <UnitConverterBase
        title="Heat Flux Density Converter"
        description="Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online heat flux converter for thermal engineering, solar energy, and building insulation."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
