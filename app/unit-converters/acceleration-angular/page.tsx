"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function AccelerationAngularPage() {
  const config = converterMappings["Acceleration - Angular"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Acceleration - Angular"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Angular Acceleration Converter</h1>
        <p className="text-muted-foreground">Convert angular acceleration units including rad/s², deg/s², and rev/min². Free online angular acceleration converter for rotational dynamics and mechanical engineering.</p>
      </div>
      <UnitConverterBase
        title="Angular Acceleration Converter"
        description="Convert angular acceleration units including rad/s², deg/s², and rev/min². Free online angular acceleration converter for rotational dynamics and mechanical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
