"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function VolumeChargeDensityPage() {
  const config = converterMappings["Volume Charge Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Volume Charge Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Volume Charge Density Converter</h1>
        <p className="text-muted-foreground">Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online volume charge density converter for electrostatics, plasma physics, and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Volume Charge Density Converter"
        description="Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online volume charge density converter for electrostatics, plasma physics, and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
