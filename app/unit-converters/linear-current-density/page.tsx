"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LinearCurrentDensityPage() {
  const config = converterMappings["Linear Current Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Linear Current Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Linear Current Density Converter</h1>
        <p className="text-muted-foreground">Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online linear current density converter for electromagnetics and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Linear Current Density Converter"
        description="Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online linear current density converter for electromagnetics and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
