"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SurfaceCurrentDensityPage() {
  const config = converterMappings["Surface Current Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Surface Current Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Surface Current Density Converter</h1>
        <p className="text-muted-foreground">Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online surface current density converter for electromagnetic field analysis and power systems.</p>
      </div>
      <UnitConverterBase
        title="Surface Current Density Converter"
        description="Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online surface current density converter for electromagnetic field analysis and power systems."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
