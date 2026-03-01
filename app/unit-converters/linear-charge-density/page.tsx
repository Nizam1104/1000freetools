"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LinearChargeDensityPage() {
  const config = converterMappings["Linear Charge Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Linear Charge Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Linear Charge Density Converter</h1>
        <p className="text-muted-foreground">Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online linear charge density converter for electrostatics and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Linear Charge Density Converter"
        description="Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online linear charge density converter for electrostatics and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
