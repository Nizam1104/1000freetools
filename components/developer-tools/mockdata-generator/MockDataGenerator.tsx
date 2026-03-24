"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Settings, Copy, Check } from "lucide-react";
import FieldTypesDialog from "./FieldTypesDialog";
import { getMockDataWorker, releaseMockDataWorker } from "@/lib/workerManager";
import { toast } from "sonner";
import {
  fieldTypeMapping,
  DEFAULT_FIELD_TYPE,
} from "@/components/developer-tools/mockdata-generator/fieldTypeMapping";
import fieldSpecs from "./fields_specs.json";

interface MockField {
  id: string;
  name: string;
  type: string;
  blankPercentage: number;
  options?: string[];
  optionsInput?: string; // Store raw input for "Random Element from Array" fields
}

interface ParsedSchemaField {
  name?: string;
  fieldName?: string;
  type: string;
  blankPercentage?: number;
  options?: string[];
}

const AIPrompt = `You are a JSON schema generator for a mock data generator tool. I will describe the dataset I need, and you will generate a JSON schema array following these specifications:

AVAILABLE FIELD TYPES:
${JSON.stringify(fieldSpecs, null, 2)}

JSON SCHEMA FORMAT:
Generate a JSON array where each field object follows this structure:
[
  {
    "fieldName": "field_name_here",
    "type": "field_type_from_above_list",
    "blankPercentage": 0,  // Optional: 0-100, percentage of empty values (default: 0)
    "options": ["option1", "option2"]  // Only for "Random Element from Array" type
  }
]

RULES:
1. Each field must have "fieldName" (string) and "type" (one of the types listed above)
2. "blankPercentage" is optional - include only if you want some values to be empty (0-100)
3. "options" is only required for "Random Element from Array" type - provide an array of string values
4. Field names should be descriptive and use camelCase or snake_case
5. Choose appropriate field types based on the data context

EXAMPLE SCHEMAS:

Example 1 - User Data:
[
  {
    "fieldName": "userId",
    "type": "uuid"
  },
  {
    "fieldName": "firstName",
    "type": "firstName"
  },
  {
    "fieldName": "lastName",
    "type": "lastName"
  },
  {
    "fieldName": "email",
    "type": "email",
    "blankPercentage": 5
  },
  {
    "fieldName": "age",
    "type": "integer"
  },
  {
    "fieldName": "phone",
    "type": "phone",
    "blankPercentage": 10
  },
  {
    "fieldName": "city",
    "type": "city"
  },
  {
    "fieldName": "country",
    "type": "country"
  }
]

Example 2 - E-commerce Product Data:
[
  {
    "fieldName": "productId",
    "type": "nanoid"
  },
  {
    "fieldName": "productName",
    "type": "product"
  },
  {
    "fieldName": "description",
    "type": "productDescription"
  },
  {
    "fieldName": "price",
    "type": "price"
  },
  {
    "fieldName": "category",
    "type": "department"
  },
  {
    "fieldName": "inStock",
    "type": "boolean"
  },
  {
    "fieldName": "rating",
    "type": "rating"
  },
  {
    "fieldName": "imageUrl",
    "type": "image"
  }
]


NOW, GENERATE A JSON SCHEMA FOR THE FOLLOWING DATASET REQUIREMENT:
[Describe your dataset requirements here - e.g., "I need a dataset for a library management system with books, members, and borrowing records"]`

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

  // JSON Schema tab state
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSchemaText, setJsonSchemaText] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const jsonSchemaSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load fields from localStorage on mount
  useEffect(() => {
    const savedFields = localStorage.getItem("mockDataFields");
    if (savedFields) {
      try {
        const parsedFields = JSON.parse(savedFields) as MockField[];
        // Normalize fields to ensure any legacy fields without optionsInput get proper defaults
        const normalizedFields = parsedFields.map((field) => ({
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

  // Initialize JSON schema text with default empty string
  useEffect(() => {
    const savedJsonSchemaText = localStorage.getItem("mockDataJsonSchemaText");
    if (savedJsonSchemaText) {
      setJsonSchemaText(savedJsonSchemaText);
    }
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (jsonSchemaSaveTimeoutRef.current) {
        clearTimeout(jsonSchemaSaveTimeoutRef.current);
      }
    };
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

  // When switching to JSON Schema tab, populate it with fields from Manual Entry if available
  useEffect(() => {
    if (activeTab === "json" && fields.length > 0) {
      // Convert existing fields to JSON schema format
      const existingFieldNames = new Set<string>();
      const schemaFields: ParsedSchemaField[] = [];

      fields.forEach((field) => {
        const fieldName = field.name.trim();

        // Skip empty field names and duplicates
        if (!fieldName || existingFieldNames.has(fieldName.toLowerCase())) {
          return;
        }

        existingFieldNames.add(fieldName.toLowerCase());

        const schemaField: ParsedSchemaField = {
          fieldName: fieldName,
          type: field.type,
        };

        // Add optional properties only if they have values
        if (field.blankPercentage && field.blankPercentage > 0) {
          schemaField.blankPercentage = field.blankPercentage;
        }

        if (field.options && field.options.length > 0) {
          schemaField.options = field.options;
        }

        schemaFields.push(schemaField);
      });

      // Only update if we have valid fields
      if (schemaFields.length > 0) {
        const jsonSchemaString = JSON.stringify(schemaFields, null, 2);
        setJsonSchemaText(jsonSchemaString);

        // Save to localStorage
        localStorage.setItem("mockDataJsonSchemaText", jsonSchemaString);
      }
    }
  }, [activeTab, fields]);

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

  // JSON Schema helper functions
  const getJsonSchemaString = useCallback(() => {
    return jsonSchemaText || "[]";
  }, [jsonSchemaText]);

  const handleJsonChange = (value: string) => {
    // Just store the raw text without parsing or validating
    // Validation will happen only when converting to fields
    setJsonSchemaText(value);
    setJsonError(null);

    // Save to localStorage with 500ms debounce
    if (jsonSchemaSaveTimeoutRef.current) {
      clearTimeout(jsonSchemaSaveTimeoutRef.current);
    }
    jsonSchemaSaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem("mockDataJsonSchemaText", value);
    }, 500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getJsonSchemaString());
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
      toast.success("JSON schema copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const convertJsonToFields = () => {
    if (!jsonSchemaText || jsonSchemaText.trim() === "") {
      toast.error("Please enter a JSON schema");
      return;
    }

    let parsed: ParsedSchemaField[];
    try {
      parsed = JSON.parse(jsonSchemaText) as ParsedSchemaField[];
    } catch {
      setJsonError("Invalid JSON format");
      return;
    }

    if (!Array.isArray(parsed)) {
      setJsonError("JSON must be an array of field objects");
      return;
    }

    // Validate structure - each object must have 'type' and 'name' (or 'fieldName')
    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (typeof item !== "object" || !item.type || (!item.name && !item.fieldName)) {
        setJsonError(`Field at index ${i} must have 'type' and 'name' (or 'fieldName') properties`);
        return;
      }
    }

    // Get existing field names to avoid duplicates
    const existingFieldNames = new Set(fields.map(f => f.name.toLowerCase()));

    const newFields: MockField[] = [];
    let skippedCount = 0;

    const fieldRevMap: Record<string, string> = {};

    Object.entries(fieldTypeMapping).forEach(([dialogType, workerType]) => {
      fieldRevMap[workerType] = dialogType;
    });

    parsed.forEach((schemaField, index) => {
      const fieldName = schemaField.name || schemaField.fieldName;
      if (!fieldName) {
        skippedCount++;
        return;
      }

      // Skip if field with same name already exists
      if (existingFieldNames.has(fieldName.toLowerCase())) {
        skippedCount++;
        return;
      }

      newFields.push({
        id: Date.now().toString() + index,
        name: fieldName,
        type: fieldRevMap[schemaField.type] ?? DEFAULT_FIELD_TYPE,
        blankPercentage: schemaField.blankPercentage ?? 0,
        options: schemaField.options,
        optionsInput: schemaField.options ? schemaField.options.join(", ") : undefined,
      });
    });

    // Add new fields to existing fields
    setFields([...fields, ...newFields]);
    setActiveTab("manual");

    if (newFields.length > 0 && skippedCount > 0) {
      toast.success(`Added ${newFields.length} fields from JSON schema (${skippedCount} duplicates skipped)`);
    } else if (newFields.length > 0) {
      toast.success(`Added ${newFields.length} fields from JSON schema`);
    } else {
      toast.info(`All fields already exist, nothing added`);
    }
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

  const addNewFieldToJsonSchema = function () {
    let parsed: ParsedSchemaField[];
    try {
      parsed = JSON.parse(jsonSchemaText) as ParsedSchemaField[];
    } catch {
      setJsonError("Invalid JSON format");
      return;
    }

    if (!Array.isArray(parsed)) {
      setJsonError("JSON must be an array of field objects");
      return;
    }
    parsed.push({
      fieldName: '',
      type: 'string',
      blankPercentage: 0
    })
    setJsonSchemaText(JSON.stringify(parsed, null, 2));
  }

  return (
    <section className="space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="space-y-6 px-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="json">JSON Schema</TabsTrigger>
              <TabsTrigger value="ai">AI Prompt</TabsTrigger>
            </TabsList>

            {/* Manual Entry Tab */}
            <TabsContent value="manual" className="space-y-4">
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
                                  className="shrink-0"
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
            </TabsContent>

            {/* JSON Schema Tab */}
            <TabsContent value="json" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - JSON Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">JSON Schema Editor</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addNewFieldToJsonSchema}
                    >
                      + Add
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      disabled={!jsonSchemaText || jsonSchemaText.trim() === ""}
                    >
                      {copiedToClipboard ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copiedToClipboard ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className="relative">
                    <Textarea
                      ref={textareaRef}
                      value={getJsonSchemaString()}
                      onChange={(e) => handleJsonChange(e.target.value)}
                      placeholder='[
  {
    "fieldName": "name",
    "type": "string"
  }
]'
                      className={`min-h-[500px] max-h-[550px] overflow-y-auto font-mono text-sm ${jsonError ? 'border-destructive' : ''}`}
                    />
                    {jsonError && (
                      <p className="text-sm text-destructive mt-2">{jsonError}</p>
                    )}
                  </div>
                  <Button
                    onClick={convertJsonToFields}
                    className="w-full"
                    disabled={!jsonSchemaText || jsonSchemaText.trim() === ""}
                  >
                    Convert to Fields
                  </Button>
                </div>

                {/* Right Column - Rules and Field Specs */}
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-card">
                    <h3 className="text-lg font-semibold mb-3">JSON Schema Rules</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Each field must be an object with <code className="bg-muted px-1 rounded">name</code> (or <code className="bg-muted px-1 rounded">fieldName</code>) and <code className="bg-muted px-1 rounded">type</code> properties</li>
                      <li>• <code className="bg-muted px-1 rounded">blankPercentage</code> is optional (defaults to 0 if not provided)</li>
                      <li>• <code className="bg-muted px-1 rounded">options</code> is optional (array of strings for "Random Element from Array" type)</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 bg-card">
                    <h3 className="text-lg font-semibold mb-3">Available Field Types</h3>
                    <div className="max-h-[400px] overflow-y-auto space-y-1 text-sm">
                      {fieldSpecs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-1 border-b last:border-0"
                        >
                          <code className="text-primary font-mono text-xs">{spec.type}</code>
                          <div className="text-muted-foreground text-xs ml-2">
                            <span>
                              {spec.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI Prompt Tab */}
            <TabsContent value="ai" className="space-y-4">
              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-4">Generate JSON Schema with AI</h3>
                  <p className="text-muted-foreground mb-4">
                    Use the following prompt with your preferred AI chatbot (ChatGPT, Claude, etc.) to generate a JSON schema for your mock data requirements.
                  </p>

                  <div className="relative">
                    <Textarea
                      readOnly
                      value={AIPrompt}
                      className="min-h-[600px] max-h-[700px] overflow-y-auto font-mono text-sm bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={async () => {

                        try {
                          await navigator.clipboard.writeText(AIPrompt);
                          toast.success("Prompt copied to clipboard!");
                        } catch {
                          toast.error("Failed to copy prompt");
                        }
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Prompt
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-card space-y-4">
                  <h3 className="text-lg font-semibold">How to Use This Prompt</h3>
                  <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                    <li>
                      <strong>Copy the prompt</strong> by clicking the "Copy Prompt" button above
                    </li>
                    <li>
                      <strong>Paste into your preferred AI chatbot</strong> (ChatGPT, Claude, Gemini, etc.)
                    </li>
                    <li>
                      <strong>Replace the last line</strong> with your specific dataset requirements. For example:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>"Generate a schema for a blog with authors, posts, and comments"</li>
                        <li>"I need a dataset for a hospital management system with patients, doctors, and appointments"</li>
                        <li>"Create a schema for a real estate listing with properties, agents, and transactions"</li>
                        <li>"Generate a schema for a social media platform with users, posts, likes, and followers"</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Review the AI's response</strong> - it will generate a JSON schema array with all the field specifications
                    </li>
                    <li>
                      <strong>Copy the generated JSON schema</strong> from the AI response
                    </li>
                    <li>
                      <strong>Paste it in the "JSON Schema" tab</strong> of this tool and click "Convert to Fields"
                    </li>
                  </ol>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-semibold mb-2">💡 Pro Tips:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Be specific about your requirements - mention the entities and their relationships</li>
                      <li>Specify if you need certain fields to have blank values (e.g., "10% of phone numbers should be empty")</li>
                      <li>For custom dropdown values, ask the AI to use "Random Element from Array" type with specific options</li>
                      <li>You can request multiple related schemas (e.g., separate schemas for users, orders, and products)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
