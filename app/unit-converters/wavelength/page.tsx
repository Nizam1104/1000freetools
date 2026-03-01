"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function WavelengthPage() {
  const config = converterMappings["Wavelength"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Wavelength"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Wavelength Converter</h1>
        <p className="text-muted-foreground">Convert wavelength units and calculate frequency across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online wavelength converter for optics and physics.</p>
      </div>
      <UnitConverterBase
        title="Wavelength Converter"
        description="Convert wavelength units and calculate frequency across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online wavelength converter for optics and physics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
