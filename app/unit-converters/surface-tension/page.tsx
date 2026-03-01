"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SurfaceTensionPage() {
  const config = converterMappings["Surface Tension"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Surface Tension"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Surface Tension Converter</h1>
        <p className="text-muted-foreground">Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online surface tension converter for chemistry, materials science, and fluid interface studies.</p>
      </div>
      <UnitConverterBase
        title="Surface Tension Converter"
        description="Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online surface tension converter for chemistry, materials science, and fluid interface studies."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
