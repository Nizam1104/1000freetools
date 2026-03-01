"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function VolumePage() {
  const config = converterMappings["Volume"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Volume"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Volume Converter</h1>
        <p className="text-muted-foreground">Convert volume units effortlessly — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Perfect for cooking, engineering, and everyday volume conversions.</p>
      </div>
      <UnitConverterBase
        title="Volume Converter"
        description="Convert volume units effortlessly — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Perfect for cooking, engineering, and everyday volume conversions."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
