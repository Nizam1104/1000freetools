"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TorquePage() {
  const config = converterMappings["Torque"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Torque"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Torque Converter</h1>
        <p className="text-muted-foreground">Convert torque units instantly — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online torque converter for automotive, mechanical, and industrial engineering.</p>
      </div>
      <UnitConverterBase
        title="Torque Converter"
        description="Convert torque units instantly — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online torque converter for automotive, mechanical, and industrial engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
