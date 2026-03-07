"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Wand2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  parseCSVIntelligently,
  copyToClipboard,
  normalizeDates,
  normalizePhoneNumbers,
  normalizeCurrencies,
  normalizeCasing,
  normalizeCountryCodes,
  normalizeBooleans,
  CSVRow,
} from "./csv-utils";

interface NormalizationConfig {
  // Date normalization
  normalizeDates: boolean;
  dateColumns: string[];
  dateFormat: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD" | "MMM DD, YYYY";

  // Phone normalization
  normalizePhones: boolean;
  phoneColumns: string[];
  phoneFormat: "international" | "national" | "digits-only" | "dashed" | "dotted";
  countryCode: string;

  // Currency normalization
  normalizeCurrencies: boolean;
  currencyColumns: string[];
  currencySymbol: string;
  decimalPlaces: number;
  thousandSeparator: boolean;

  // Casing normalization
  normalizeCasing: boolean;
  casingColumns: string[];
  casingType: "uppercase" | "lowercase" | "titlecase" | "sentencecase";

  // Country code normalization
  normalizeCountries: boolean;
  countryColumns: string[];
  countryFormat: "alpha2" | "alpha3" | "numeric" | "full";

  // Boolean normalization
  normalizeBooleans: boolean;
  booleanColumns: string[];
  booleanFormat: "true_false" | "yes_no" | "1_0" | "Y_N";
}

const DEFAULT_CONFIG: NormalizationConfig = {
  normalizeDates: false,
  dateColumns: [],
  dateFormat: "YYYY-MM-DD",

  normalizePhones: false,
  phoneColumns: [],
  phoneFormat: "international",
  countryCode: "+1",

  normalizeCurrencies: false,
  currencyColumns: [],
  currencySymbol: "$",
  decimalPlaces: 2,
  thousandSeparator: true,

  normalizeCasing: false,
  casingColumns: [],
  casingType: "titlecase",

  normalizeCountries: false,
  countryColumns: [],
  countryFormat: "alpha2",

  normalizeBooleans: false,
  booleanColumns: [],
  booleanFormat: "true_false",
};

export default function CsvDataNormalizer() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [config, setConfig] = useState<NormalizationConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<string>("dates");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        const { headers } = parseCSVIntelligently(text);
        setHeaders(headers);
        toast.success(`Loaded file: ${file.name}`);
      } catch (error) {
        toast.error("Failed to read file");
      }
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      file.text().then((text) => {
        setInputText(text);
        const { headers } = parseCSVIntelligently(text);
        setHeaders(headers);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const toggleColumn = useCallback((columnType: keyof NormalizationConfig, column: string) => {
    setConfig((prev) => {
      const columnKey = `${columnType.replace("normalize", "").toLowerCase()}Columns` as keyof NormalizationConfig;
      const currentColumns = (prev[columnKey] as string[]) || [];
      const newColumns = currentColumns.includes(column)
        ? currentColumns.filter((c) => c !== column)
        : [...currentColumns, column];
      return { ...prev, [columnKey]: newColumns };
    });
  }, []);

  const selectAllColumns = useCallback((columnType: keyof NormalizationConfig) => {
    setConfig((prev) => {
      const columnKey = `${columnType.replace("normalize", "").toLowerCase()}Columns` as keyof NormalizationConfig;
      return { ...prev, [columnKey]: [...headers] };
    });
  }, [headers]);

  const clearAllColumns = useCallback((columnType: keyof NormalizationConfig) => {
    setConfig((prev) => {
      const columnKey = `${columnType.replace("normalize", "").toLowerCase()}Columns` as keyof NormalizationConfig;
      return { ...prev, [columnKey]: [] };
    });
  }, []);

  const normalizeData = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers: csvHeaders } = parseCSVIntelligently(inputText);

      if (data.length === 0) {
        toast.error("No data found in CSV");
        setIsProcessing(false);
        return;
      }

      let normalizedData = [...data];
      const changes: string[] = [];

      // Apply date normalization
      if (config.normalizeDates && config.dateColumns.length > 0) {
        normalizedData = normalizeDates(normalizedData, csvHeaders, config.dateColumns, config.dateFormat);
        changes.push(`Normalized ${config.dateColumns.length} column(s) to ${config.dateFormat} format`);
      }

      // Apply phone normalization
      if (config.normalizePhones && config.phoneColumns.length > 0) {
        normalizedData = normalizePhoneNumbers(
          normalizedData,
          csvHeaders,
          config.phoneColumns,
          config.phoneFormat,
          config.countryCode
        );
        changes.push(`Normalized ${config.phoneColumns.length} column(s) to ${config.phoneFormat} format`);
      }

      // Apply currency normalization
      if (config.normalizeCurrencies && config.currencyColumns.length > 0) {
        normalizedData = normalizeCurrencies(normalizedData, csvHeaders, config.currencyColumns, {
          symbol: config.currencySymbol,
          decimalPlaces: config.decimalPlaces,
          thousandSeparator: config.thousandSeparator,
        });
        changes.push(`Normalized ${config.currencyColumns.length} column(s) with ${config.currencySymbol} symbol`);
      }

      // Apply casing normalization
      if (config.normalizeCasing && config.casingColumns.length > 0) {
        normalizedData = normalizeCasing(normalizedData, csvHeaders, config.casingColumns, config.casingType);
        changes.push(`Normalized ${config.casingColumns.length} column(s) to ${config.casingType}`);
      }

      // Apply country code normalization
      if (config.normalizeCountries && config.countryColumns.length > 0) {
        normalizedData = normalizeCountryCodes(normalizedData, csvHeaders, config.countryColumns, config.countryFormat);
        changes.push(`Normalized ${config.countryColumns.length} column(s) to ${config.countryFormat} format`);
      }

      // Apply boolean normalization
      if (config.normalizeBooleans && config.booleanColumns.length > 0) {
        normalizedData = normalizeBooleans(normalizedData, csvHeaders, config.booleanColumns, config.booleanFormat);
        changes.push(`Normalized ${config.booleanColumns.length} column(s) to ${config.booleanFormat} format`);
      }

      // Generate CSV output
      const csvContent = [
        csvHeaders.join(","),
        ...normalizedData.map((row) =>
          csvHeaders.map((h) => {
            const value = String(row[h] || "");
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(",")
        ),
      ].join("\n");

      setOutput(csvContent);
      toast.success(`Applied ${changes.length} normalization(s)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Normalization failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, config]);

  const copyToClipboardHandler = useCallback(async () => {
    if (!output) return;
    try {
      await copyToClipboard(output);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [output]);

  const downloadOutput = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "normalized-data.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setConfig(DEFAULT_CONFIG);
  }, []);

  const getColumnTypeColumns = (type: string): string[] => {
    switch (type) {
      case "dates":
        return config.dateColumns;
      case "phones":
        return config.phoneColumns;
      case "currencies":
        return config.currencyColumns;
      case "casing":
        return config.casingColumns;
      case "countries":
        return config.countryColumns;
      case "booleans":
        return config.booleanColumns;
      default:
        return [];
    }
  };

  const tabs = [
    { id: "dates", label: "Dates", icon: "📅" },
    { id: "phones", label: "Phones", icon: "📞" },
    { id: "currencies", label: "Currencies", icon: "💰" },
    { id: "casing", label: "Casing", icon: "Aa" },
    { id: "countries", label: "Countries", icon: "🌍" },
    { id: "booleans", label: "Booleans", icon: "⚡" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">CSV Data Normalizer</h2>
        <p className="text-muted-foreground">
          Normalize data values including date formats, phone numbers, currencies, casing, country codes, and boolean representations
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">CSV Input</Label>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear
            </Button>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-md p-6 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <FileSpreadsheet className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop a CSV file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste CSV data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste CSV data here...&#10;name,birth_date,phone,price,city,active&#10;John,1990-05-15,5551234567,19.99,US,true"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />

          {headers.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-sm text-muted-foreground">Columns:</span>
              {headers.map((header) => (
                <span key={header} className="px-2 py-1 bg-muted rounded text-xs font-mono">
                  {header}
                </span>
              ))}
            </div>
          )}
        </section>

        <Separator />

        {/* Normalization Tabs */}
        {headers.length > 0 && (
          <section>
            <Label className="text-base mb-3 block">Normalization Options</Label>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="border rounded-md p-4 space-y-4">
              {/* Dates Tab */}
              {activeTab === "dates" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="normalizeDates"
                        checked={config.normalizeDates}
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({ ...prev, normalizeDates: checked as boolean }))
                        }
                      />
                      <Label htmlFor="normalizeDates" className="text-sm font-medium cursor-pointer">
                        Normalize Date Formats
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => selectAllColumns("normalizeDates")}>
                        Select All
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => clearAllColumns("normalizeDates")}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  {config.normalizeDates && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">Select Columns</Label>
                        <div className="flex flex-wrap gap-2">
                          {headers.map((header) => (
                            <Button
                              key={header}
                              variant={config.dateColumns.includes(header) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleColumn("normalizeDates", header)}
                            >
                              {header}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateFormat" className="text-sm">Output Format</Label>
                        <Select
                          value={config.dateFormat}
                          onValueChange={(value: any) =>
                            setConfig((prev) => ({ ...prev, dateFormat: value }))
                          }
                        >
                          <SelectTrigger id="dateFormat" className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US)</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (EU)</SelectItem>
                            <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                            <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Phones Tab */}
              {activeTab === "phones" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="normalizePhones"
                        checked={config.normalizePhones}
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({ ...prev, normalizePhones: checked as boolean }))
                        }
                      />
                      <Label htmlFor="normalizePhones" className="text-sm font-medium cursor-pointer">
                        Normalize Phone Numbers
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => selectAllColumns("normalizePhones")}>
                        Select All
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => clearAllColumns("normalizePhones")}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  {config.normalizePhones && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">Select Columns</Label>
                        <div className="flex flex-wrap gap-2">
                          {headers.map((header) => (
                            <Button
                              key={header}
                              variant={config.phoneColumns.includes(header) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleColumn("normalizePhones", header)}
                            >
                              {header}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phoneFormat" className="text-sm">Output Format</Label>
                          <Select
                            value={config.phoneFormat}
                            onValueChange={(value: any) =>
                              setConfig((prev) => ({ ...prev, phoneFormat: value }))
                            }
                          >
                            <SelectTrigger id="phoneFormat">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="international">International (+1234567890)</SelectItem>
                              <SelectItem value="national">National ((123) 456-7890)</SelectItem>
                              <SelectItem value="digits-only">Digits Only (1234567890)</SelectItem>
                              <SelectItem value="dashed">Dashed (123-456-7890)</SelectItem>
                              <SelectItem value="dotted">Dotted (123.456.7890)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="countryCode" className="text-sm">Default Country Code</Label>
                          <Input
                            id="countryCode"
                            value={config.countryCode}
                            onChange={(e) =>
                              setConfig((prev) => ({ ...prev, countryCode: e.target.value }))
                            }
                            placeholder="+1"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Currencies Tab */}
              {activeTab === "currencies" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="normalizeCurrencies"
                        checked={config.normalizeCurrencies}
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({ ...prev, normalizeCurrencies: checked as boolean }))
                        }
                      />
                      <Label htmlFor="normalizeCurrencies" className="text-sm font-medium cursor-pointer">
                        Normalize Currency Values
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => selectAllColumns("normalizeCurrencies")}>
                        Select All
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => clearAllColumns("normalizeCurrencies")}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  {config.normalizeCurrencies && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">Select Columns</Label>
                        <div className="flex flex-wrap gap-2">
                          {headers.map((header) => (
                            <Button
                              key={header}
                              variant={config.currencyColumns.includes(header) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleColumn("normalizeCurrencies", header)}
                            >
                              {header}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currencySymbol" className="text-sm">Currency Symbol</Label>
                          <Input
                            id="currencySymbol"
                            value={config.currencySymbol}
                            onChange={(e) =>
                              setConfig((prev) => ({ ...prev, currencySymbol: e.target.value }))
                            }
                            placeholder="$"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="decimalPlaces" className="text-sm">Decimal Places</Label>
                          <Input
                            id="decimalPlaces"
                            type="number"
                            min="0"
                            max="4"
                            value={config.decimalPlaces}
                            onChange={(e) =>
                              setConfig((prev) => ({ ...prev, decimalPlaces: parseInt(e.target.value) || 0 }))
                            }
                          />
                        </div>

                        <div className="flex items-end space-x-3">
                          <Checkbox
                            id="thousandSeparator"
                            checked={config.thousandSeparator}
                            onCheckedChange={(checked) =>
                              setConfig((prev) => ({ ...prev, thousandSeparator: checked as boolean }))
                            }
                          />
                          <Label htmlFor="thousandSeparator" className="text-sm cursor-pointer">
                            Use Thousand Separator
                          </Label>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Casing Tab */}
              {activeTab === "casing" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="normalizeCasing"
                        checked={config.normalizeCasing}
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({ ...prev, normalizeCasing: checked as boolean }))
                        }
                      />
                      <Label htmlFor="normalizeCasing" className="text-sm font-medium cursor-pointer">
                        Normalize Text Casing
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => selectAllColumns("normalizeCasing")}>
                        Select All
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => clearAllColumns("normalizeCasing")}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  {config.normalizeCasing && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">Select Columns</Label>
                        <div className="flex flex-wrap gap-2">
                          {headers.map((header) => (
                            <Button
                              key={header}
                              variant={config.casingColumns.includes(header) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleColumn("normalizeCasing", header)}
                            >
                              {header}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="casingType" className="text-sm">Casing Type</Label>
                        <Select
                          value={config.casingType}
                          onValueChange={(value: any) =>
                            setConfig((prev) => ({ ...prev, casingType: value }))
                          }
                        >
                          <SelectTrigger id="casingType" className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="uppercase">UPPERCASE</SelectItem>
                            <SelectItem value="lowercase">lowercase</SelectItem>
                            <SelectItem value="titlecase">Title Case</SelectItem>
                            <SelectItem value="sentencecase">Sentence case</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Countries Tab */}
              {activeTab === "countries" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="normalizeCountries"
                        checked={config.normalizeCountries}
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({ ...prev, normalizeCountries: checked as boolean }))
                        }
                      />
                      <Label htmlFor="normalizeCountries" className="text-sm font-medium cursor-pointer">
                        Normalize Country Codes
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => selectAllColumns("normalizeCountries")}>
                        Select All
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => clearAllColumns("normalizeCountries")}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  {config.normalizeCountries && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">Select Columns</Label>
                        <div className="flex flex-wrap gap-2">
                          {headers.map((header) => (
                            <Button
                              key={header}
                              variant={config.countryColumns.includes(header) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleColumn("normalizeCountries", header)}
                            >
                              {header}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="countryFormat" className="text-sm">Output Format</Label>
                        <Select
                          value={config.countryFormat}
                          onValueChange={(value: any) =>
                            setConfig((prev) => ({ ...prev, countryFormat: value }))
                          }
                        >
                          <SelectTrigger id="countryFormat" className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alpha2">Alpha-2 (US, GB, DE)</SelectItem>
                            <SelectItem value="alpha3">Alpha-3 (USA, GBR, DEU)</SelectItem>
                            <SelectItem value="numeric">Numeric (840, 826, 276)</SelectItem>
                            <SelectItem value="full">Full Name (United States, United Kingdom)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Booleans Tab */}
              {activeTab === "booleans" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="normalizeBooleans"
                        checked={config.normalizeBooleans}
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({ ...prev, normalizeBooleans: checked as boolean }))
                        }
                      />
                      <Label htmlFor="normalizeBooleans" className="text-sm font-medium cursor-pointer">
                        Normalize Boolean Values
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => selectAllColumns("normalizeBooleans")}>
                        Select All
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => clearAllColumns("normalizeBooleans")}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  {config.normalizeBooleans && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm">Select Columns</Label>
                        <div className="flex flex-wrap gap-2">
                          {headers.map((header) => (
                            <Button
                              key={header}
                              variant={config.booleanColumns.includes(header) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleColumn("normalizeBooleans", header)}
                            >
                              {header}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="booleanFormat" className="text-sm">Output Format</Label>
                        <Select
                          value={config.booleanFormat}
                          onValueChange={(value: any) =>
                            setConfig((prev) => ({ ...prev, booleanFormat: value }))
                          }
                        >
                          <SelectTrigger id="booleanFormat" className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true_false">true / false</SelectItem>
                            <SelectItem value="yes_no">Yes / No</SelectItem>
                            <SelectItem value="1_0">1 / 0</SelectItem>
                            <SelectItem value="Y_N">Y / N</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        <Separator />

        {/* Normalize Button */}
        <section>
          <Button
            onClick={normalizeData}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Normalizing..." : "Normalize Data"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Normalized Output</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboardHandler}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadOutput}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>

            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-muted/30"
            />
          </section>
        )}

        {/* Info Section */}
        {!output && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Normalization types:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Dates:</strong> Standardize various date formats to a consistent format</li>
                  <li><strong>Phones:</strong> Format phone numbers with consistent separators and country codes</li>
                  <li><strong>Currencies:</strong> Format monetary values with symbols, decimals, and separators</li>
                  <li><strong>Casing:</strong> Normalize text to uppercase, lowercase, title case, or sentence case</li>
                  <li><strong>Countries:</strong> Convert country names/codes to standard formats (alpha-2, alpha-3, numeric, full)</li>
                  <li><strong>Booleans:</strong> Standardize boolean representations (true/false, yes/no, 1/0, Y/N)</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
