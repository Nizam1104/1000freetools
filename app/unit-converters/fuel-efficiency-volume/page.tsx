"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FuelEfficiencyVolumePage() {
  const config = converterMappings["Fuel Efficiency - Volume"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Fuel Efficiency - Volume"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Fuel Efficiency by Volume Converter</h1>
        <p className="text-muted-foreground">Convert volumetric fuel efficiency units — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles, fleet management, and emissions calculations.</p>
      </div>
      <UnitConverterBase
        title="Fuel Efficiency by Volume Converter"
        description="Convert volumetric fuel efficiency units — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles, fleet management, and emissions calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
