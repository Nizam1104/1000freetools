"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function DataStoragePage() {
  const config = converterMappings["Data Storage"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Data Storage"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Data Storage Converter</h1>
        <p className="text-muted-foreground">Convert digital storage units — bytes, kilobytes, megabytes, gigabytes, terabytes, and beyond. Free online data storage converter for computing, cloud storage, and IT professionals.</p>
      </div>
      <UnitConverterBase
        title="Data Storage Converter"
        description="Convert digital storage units — bytes, kilobytes, megabytes, gigabytes, terabytes, and beyond. Free online data storage converter for computing, cloud storage, and IT professionals."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
