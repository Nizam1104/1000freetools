"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TimePage() {
  const config = converterMappings["Time"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Time"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Time Converter</h1>
        <p className="text-muted-foreground">Convert time units instantly — seconds, minutes, hours, days, weeks, months, and years. Simple and accurate online time unit converter for everyday and scientific use.</p>
      </div>
      <UnitConverterBase
        title="Time Converter"
        description="Convert time units instantly — seconds, minutes, hours, days, weeks, months, and years. Simple and accurate online time unit converter for everyday and scientific use."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
