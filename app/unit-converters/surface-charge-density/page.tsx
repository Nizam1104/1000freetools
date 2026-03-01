"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SurfaceChargeDensityPage() {
  const config = converterMappings["Surface Charge Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Surface Charge Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Surface Charge Density Converter</h1>
        <p className="text-muted-foreground">Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online surface charge density converter for capacitor design and electrostatics.</p>
      </div>
      <UnitConverterBase
        title="Surface Charge Density Converter"
        description="Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online surface charge density converter for capacitor design and electrostatics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
