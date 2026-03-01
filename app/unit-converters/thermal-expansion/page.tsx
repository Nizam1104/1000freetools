"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ThermalExpansionPage() {
  const config = converterMappings["Thermal Expansion"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Thermal Expansion"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Thermal Expansion Converter</h1>
        <p className="text-muted-foreground">Convert thermal expansion coefficient units — per Kelvin, per Celsius, per Fahrenheit, and more. Free online thermal expansion converter for materials science and engineering.</p>
      </div>
      <UnitConverterBase
        title="Thermal Expansion Converter"
        description="Convert thermal expansion coefficient units — per Kelvin, per Celsius, per Fahrenheit, and more. Free online thermal expansion converter for materials science and engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
