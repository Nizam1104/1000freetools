"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Settings, ChevronDown } from "lucide-react";
import FieldTypesDialog from "./FieldTypesDialog";
import { getMockDataWorker, releaseMockDataWorker } from "@/lib/workerManager";
import { toast } from "sonner";
import {
  fieldTypeMapping,
  DEFAULT_FIELD_TYPE,
} from "@/components/developer-tools/mockdata-generator/fieldTypeMapping";

interface MockField {
  id: string;
  name: string;
  type: string;
  blankPercentage: number;
  options?: string[];
  optionsInput?: string; // Store raw input for "Random Element from Array" fields
}

export default function MockDataGenerator() {
  const [fields, setFields] = useState<MockField[]>([]);
  const [showFieldTypesDialog, setShowFieldTypesDialog] = useState(false);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rowCount, setRowCount] = useState(100);
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "excel" | "xml" | "sql" | "html">(
    "csv"
  );
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load fields from localStorage on mount
  useEffect(() => {
    const savedFields = localStorage.getItem("mockDataFields");
    if (savedFields) {
      try {
        const parsedFields = JSON.parse(savedFields);
        // Normalize fields to ensure any legacy fields without optionsInput get proper defaults
        const normalizedFields = parsedFields.map((field: any) => ({
          ...field,
          optionsInput: field.optionsInput ?? (field.options ? field.options.join(", ") : undefined),
        }));
        setFields(normalizedFields);
      } catch (error) {
        console.error("Error loading saved fields:", error);
      }
    }
    // Mark as initialized after loading from localStorage
    setIsInitialized(true);
  }, []);

  // Initialize shared web worker
  useEffect(() => {
    const initializeWorker = async () => {
      try {
        const workerInstance = await getMockDataWorker();
        setWorker(workerInstance);
      } catch (error) {
        console.error("Failed to initialize worker:", error);
      }
    };

    initializeWorker();

    // Clean up worker reference on unmount
    return () => {
      releaseMockDataWorker();
    };
  }, []);

  // Save fields to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    // Only save to localStorage after we've loaded the initial data
    // This prevents overwriting saved fields with empty array on mount
    if (isInitialized) {
      localStorage.setItem("mockDataFields", JSON.stringify(fields));
    }
  }, [fields, isInitialized]);

  const addField = () => {
    const field: MockField = {
      id: Date.now().toString(),
      name: "",
      type: "string",
      blankPercentage: 0,
    };

    setFields([...fields, field]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const openFieldTypesDialog = (fieldId: string) => {
    setCurrentFieldId(fieldId);
    setShowFieldTypesDialog(true);
  };

  const handleFieldTypeSelect = (fieldType: string) => {
    if (currentFieldId) {
      const updatedFields = fields.map((field) =>
        field.id === currentFieldId
          ? {
            ...field,
            type: fieldType,
            // Clear optionsInput when changing away from "Random Element from Array"
            ...(field.type === "Random Element from Array" && fieldType !== "Random Element from Array"
              ? { optionsInput: undefined }
              : {})
          }
          : field
      );
      setFields(updatedFields);
    }
  };

  const downloadFile = useCallback(
    (content: string | Blob, filename: string, isBlob?: boolean) => {
      let blob: Blob;

      if (isBlob) {
        blob = content as Blob;
      } else {
        const mimeTypes: Record<string, string> = {
          csv: "text/csv",
          json: "application/json",
          xml: "application/xml",
          sql: "text/plain",
          html: "text/html",
          excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        };
        blob = new Blob([content as string], {
          type: mimeTypes[exportFormat] || "text/plain",
        });
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Delay revoking the URL to give Chrome time to start the download
      setTimeout(() => URL.revokeObjectURL(url), 100);
    },
    [exportFormat]
  );

  const generateMockData = useCallback(async () => {
    let currentWorker = worker;

    // Get worker if not available
    if (!currentWorker) {
      try {
        currentWorker = await getMockDataWorker();
        setWorker(currentWorker);
      } catch (error) {
        console.error("Failed to get worker:", error);
        toast.error("Failed to initialize worker. Please try again.");
        return;
      }
    }

    if (fields.length === 0) return;

    setIsGenerating(true);

    const workerFields = fields.map((field) => {
      // Map the field type from dialog selection to internal worker type
      const mappedType = fieldTypeMapping[field.type] || DEFAULT_FIELD_TYPE;
      return {
        name: field.name,
        type: mappedType,
        blankPercentage: field.blankPercentage,
        options: field.options,
      };
    });

    // Set up message handler
    const handleMessage = (event: MessageEvent) => {
      const { success, data, filename, error, isBlob } = event.data;

      if (success) {
        downloadFile(data, filename, isBlob);
        toast.success("Mock data generated successfully!");
      } else {
        toast.error(`Error generating mock data: ${error}`);
      }

      setIsGenerating(false);
      // Remove event listener to avoid memory leaks
      currentWorker.removeEventListener("message", handleMessage);
    };

    // Handle worker errors
    const handleError = (error: ErrorEvent) => {
      console.error("Worker error:", error);
      toast.error("Error generating mock data. Please try again.");
      setIsGenerating(false);
      // Remove event listener to avoid memory leaks
      currentWorker.removeEventListener("error", handleError);
    };

    currentWorker.addEventListener("message", handleMessage);
    currentWorker.addEventListener("error", handleError);

    // Send data to worker
    try {
      currentWorker.postMessage({
        fields: workerFields,
        rowCount,
        format: exportFormat,
      });
    } catch (error) {
      console.error("Failed to send message to worker:", error);
      toast.error("Failed to start data generation. Please try again.");
      setIsGenerating(false);
      // Clean up event listeners
      currentWorker.removeEventListener("message", handleMessage);
      currentWorker.removeEventListener("error", handleError);
    }
  }, [worker, fields, rowCount, exportFormat, downloadFile]);

  return (
    <section className="space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="space-y-6 px-0">
          {/* Fields Section */}
          <div className="space-y-4">
            {fields.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">
                  No fields added yet
                </p>
                <Button onClick={addField}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Field
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => {
                  const isFirst = index === 0;

                  return (
                    <div
                      key={field.id}
                      className="rounded-lg border border-border/60 bg-card/40 p-4"
                    >
                      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1.2fr)_auto]">
                        {/* Field Name */}
                        <div className="space-y-2">
                          {isFirst && (
                            <Label
                              htmlFor={`field-name-${field.id}`}
                              className="text-foreground"
                            >
                              Field Name
                            </Label>
                          )}
                          <Input
                            id={`field-name-${field.id}`}
                            placeholder="Field Name"
                            value={field.name}
                            onChange={(e) => {
                              const updatedFields = fields.map((f) =>
                                f.id === field.id
                                  ? { ...f, name: e.target.value }
                                  : f
                              );
                              setFields(updatedFields);
                            }}
                            className="bg-background"
                          />
                        </div>

                        {/* Data Type */}
                        <div className="space-y-2">
                          {isFirst && (
                            <Label
                              htmlFor={`field-type-${field.id}`}
                              className="text-foreground"
                            >
                              Data Type
                            </Label>
                          )}
                          <div className="flex gap-2">
                            <Input
                              id={`field-type-${field.id}`}
                              placeholder="Data Type"
                              value={field.type}
                              readOnly
                              className="flex-1 bg-background"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openFieldTypesDialog(field.id)}
                              aria-label="Choose data type"
                              className="flex-shrink-0"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Blank % */}
                        <div className="space-y-2">
                          {isFirst && (
                            <Label
                              htmlFor={`field-blank-${field.id}`}
                              className="text-foreground"
                            >
                              Blank %
                            </Label>
                          )}
                          <Input
                            id={`field-blank-${field.id}`}
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Blank %"
                            value={field.blankPercentage}
                            onChange={(e) => {
                              const updatedFields = fields.map((f) =>
                                f.id === field.id
                                  ? {
                                    ...f,
                                    blankPercentage:
                                      parseInt(e.target.value) || 0,
                                  }
                                  : f
                              );
                              setFields(updatedFields);
                            }}
                            className="bg-background"
                          />
                        </div>

                        {/* Delete button */}
                        <div className="flex items-end justify-end">
                          {/* Visually hidden label for accessibility; no visible label on any row */}
                          {isFirst && <span className="sr-only">Actions</span>}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeField(field.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {field.type === "Random Element from Array" && (
                        <div className="mt-4 pt-4 border-t border-border">
                          {isFirst && (
                            <Label
                              htmlFor={`field-options-${field.id}`}
                              className="text-foreground block mb-2"
                            >
                              Options (comma-separated)
                            </Label>
                          )}
                          <Input
                            id={`field-options-${field.id}`}
                            placeholder="Options (comma-separated)"
                            value={field.optionsInput ?? (field.options?.join(", ") || "")}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              // Store the raw input in optionsInput
                              const updatedFields = fields.map(f =>
                                f.id === field.id
                                  ? {
                                    ...f,
                                    optionsInput: inputValue,
                                    // Also update options for worker consumption
                                    options: inputValue
                                      .split(",")
                                      .map(opt => opt.trim())
                                      .filter(opt => opt !== "")
                                  }
                                  : f
                              );
                              setFields(updatedFields);
                            }}
                            className="bg-background"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Generation Options */}
          {fields.length > 0 && (
            <div className="space-y-4 mt-[120px]">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Fields</h2>
                <Button onClick={addField} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Field
                </Button>
              </div>
              <h2 className="text-lg font-semibold">Generation Options</h2>
              <div className="border p-4 bg-card rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="row-count" className="text-foreground">
                      Number of Rows
                    </Label>
                    <Input
                      id="row-count"
                      type="number"
                      min="1"
                      max="10000"
                      value={rowCount}
                      onChange={(e) =>
                        setRowCount(parseInt(e.target.value) || 100)
                      }
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="export-format" className="text-foreground">
                      Export Format
                    </Label>
                    <Select
                      value={exportFormat}
                      onValueChange={(value) =>
                        setExportFormat(value as "csv" | "json" | "excel" | "xml" | "sql" | "html")
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                        <SelectItem value="html">HTML Table (.html)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={generateMockData}
                  className="w-full py-6 text-lg"
                  size="lg"
                  disabled={isGenerating || fields.some((f) => !f.name.trim())}
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2 h-4 w-4 border border-current border-t-transparent rounded-full"></span>
                      Generating...
                    </span>
                  ) : (
                    "Generate Mock Data"
                  )}
                </Button>

                {fields.some((f) => !f.name.trim()) && (
                  <p className="text-sm text-destructive pt-2">
                    Please fill in all field names before generating data.
                  </p>
                )}
              </div>
            </div>
          )}

          <FieldTypesDialog
            open={showFieldTypesDialog}
            onOpenChange={setShowFieldTypesDialog}
            onSelectFieldType={handleFieldTypeSelect}
          />
        </div>
      </div>
    </section>
  );
}
