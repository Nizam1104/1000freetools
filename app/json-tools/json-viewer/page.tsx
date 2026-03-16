"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronRight,
  ChevronDown,
  Copy,
  Download,
  FileJson,
  RotateCcw,
  Trash2,
  Search,
  Eye,
  Code,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {}

interface TreeNode {
  key: string;
  value: JsonValue;
  path: string;
  level: number;
  type: "object" | "array" | "string" | "number" | "boolean" | "null";
}

export default function JsonViewerPage() {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<JsonValue | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"tree" | "raw">("tree");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit");
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
        toast.success(`Loaded ${file.name}`);
      };
      reader.onerror = () => {
        toast.error("Failed to read file");
      };
      reader.readAsText(file);
      event.target.value = "";
    },
    [],
  );

  const parseJson = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON to view");
      setParsedData(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setError(null);

      // Auto-expand first level
      const newExpanded = new Set<string>();
      if (typeof parsed === "object" && parsed !== null) {
        if (Array.isArray(parsed)) {
          newExpanded.add("root");
        } else {
          newExpanded.add("root");
        }
      }
      setExpandedPaths(newExpanded);
      toast.success("JSON loaded successfully!");
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setParsedData(null);
    }
  }, [input]);

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  const expandAll = () => {
    if (!parsedData) return;
    const allPaths = new Set<string>();

    const collectPaths = (value: JsonValue, path: string) => {
      if (typeof value === "object" && value !== null) {
        allPaths.add(path);
        if (Array.isArray(value)) {
          value.forEach((item, index) =>
            collectPaths(item, `${path}[${index}]`),
          );
        } else {
          Object.entries(value).forEach(([key, val]) =>
            collectPaths(val, `${path}.${key}`),
          );
        }
      }
    };

    collectPaths(parsedData, "root");
    setExpandedPaths(allPaths);
  };

  const collapseAll = () => {
    setExpandedPaths(new Set());
  };

  const copyToClipboard = async () => {
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const downloadJson = () => {
    if (!input) return;
    const blob = new Blob([input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as data.json");
  };

  const clearAll = () => {
    setInput("");
    setParsedData(null);
    setError(null);
    setExpandedPaths(new Set());
    setSearchQuery("");
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      {
        name: "Example Project",
        version: "1.0.0",
        features: ["fast", "simple", "reliable"],
        config: {
          debug: true,
          maxItems: 100,
          settings: {
            theme: "dark",
            language: "en",
          },
        },
        metadata: null,
      },
      null,
      2,
    );
    setInput(sample);
  };

  const getValueType = (value: JsonValue): TreeNode["type"] => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value as TreeNode["type"];
  };

  const matchesSearch = useCallback(
    (key: string, value: JsonValue): boolean => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      if (key.toLowerCase().includes(query)) return true;
      if (String(value).toLowerCase().includes(query)) return true;
      return false;
    },
    [searchQuery],
  );

  const hasMatchingDescendant = useCallback(
    (value: JsonValue, search: string): boolean => {
      if (!search) return false;
      if (typeof value !== "object" || value === null) return false;

      const query = search.toLowerCase();
      if (Array.isArray(value)) {
        return value.some((item) => {
          if (String(item).toLowerCase().includes(query)) return true;
          if (typeof item === "object" && item !== null) {
            return hasMatchingDescendant(item, search);
          }
          return false;
        });
      } else {
        return Object.entries(value).some(([key, val]) => {
          if (key.toLowerCase().includes(query)) return true;
          if (String(val).toLowerCase().includes(query)) return true;
          if (typeof val === "object" && val !== null) {
            return hasMatchingDescendant(val, search);
          }
          return false;
        });
      }
    },
    [],
  );

  const shouldShowNode = useCallback(
    (node: TreeNode): boolean => {
      if (!searchQuery) return true;
      const selfMatch = matchesSearch(node.key, node.value);
      const descendantMatch = hasMatchingDescendant(node.value, searchQuery);
      return selfMatch || descendantMatch;
    },
    [searchQuery, matchesSearch, hasMatchingDescendant],
  );

  const TreeNodeComponent: React.FC<{
    node: TreeNode;
    isLast: boolean;
  }> = ({ node, isLast }) => {
    const isExpandable = node.type === "object" || node.type === "array";
    const isExpanded = expandedPaths.has(node.path);
    const hasMatch = matchesSearch(node.key, node.value);
    const hasDescendantMatch = hasMatchingDescendant(node.value, searchQuery);
    const shouldShow = shouldShowNode(node);

    if (!shouldShow) {
      return null;
    }

    // Auto-expand if descendant matches
    useEffect(() => {
      if (hasDescendantMatch && !isExpanded && isExpandable) {
        toggleExpand(node.path);
      }
    }, [searchQuery, hasDescendantMatch, isExpanded, isExpandable, node.path]);

    const renderValue = (value: JsonValue) => {
      if (value === null)
        return <span className="text-muted-foreground">null</span>;
      if (typeof value === "string")
        return (
          <span className="text-green-600 dark:text-green-400">"{value}"</span>
        );
      if (typeof value === "number")
        return (
          <span className="text-blue-600 dark:text-blue-400">{value}</span>
        );
      if (typeof value === "boolean")
        return (
          <span className="text-purple-600 dark:text-purple-400">
            {value.toString()}
          </span>
        );
      return null;
    };

    return (
      <div className="font-mono text-sm">
        <div
          className={`flex items-center gap-1 py-1 hover:bg-muted/50 rounded px-2 cursor-pointer`}
          onClick={() => isExpandable && toggleExpand(node.path)}
        >
          {isExpandable && (
            <span className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </span>
          )}
          {!isExpandable && <span className="w-4" />}

          {node.key !== "" && (
            <span>
              <span className="text-amber-600 dark:text-amber-400">
                "{node.key}"
              </span>
              <span className="text-muted-foreground">: </span>
            </span>
          )}

          {isExpandable ? (
            <span className="text-muted-foreground">
              {node.type === "array"
                ? `Array[${(node.value as JsonArray).length}]`
                : `Object{${Object.keys(node.value as JsonObject).length}}`}
            </span>
          ) : (
            renderValue(node.value)
          )}

          {!isLast && <span className="text-muted-foreground">,</span>}
        </div>

        {isExpandable && isExpanded && (
          <div className="ml-6 border-l border-border pl-2">
            {node.type === "array"
              ? (node.value as JsonArray).map((item, index) => (
                  <TreeNodeComponent
                    key={`${node.path}[${index}]`}
                    node={{
                      key: String(index),
                      value: item,
                      path: `${node.path}[${index}]`,
                      level: node.level + 1,
                      type: getValueType(item),
                    }}
                    isLast={index === (node.value as JsonArray).length - 1}
                  />
                ))
              : Object.entries(node.value as JsonObject).map(
                  ([key, value], index, arr) => (
                    <TreeNodeComponent
                      key={`${node.path}.${key}`}
                      node={{
                        key,
                        value,
                        path: `${node.path}.${key}`,
                        level: node.level + 1,
                        type: getValueType(value),
                      }}
                      isLast={index === arr.length - 1}
                    />
                  ),
                )}
          </div>
        )}
      </div>
    );
  };

  const treeContent = useMemo(() => {
    if (!parsedData) return null;
    return (
      <TreeNodeComponent
        node={{
          key: "",
          value: parsedData,
          path: "root",
          level: 0,
          type: getValueType(parsedData),
        }}
        isLast={true}
      />
    );
  }, [parsedData, expandedPaths, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Viewer – Interactive Tree View Online
          </h1>
          <p className="text-muted-foreground">
            View JSON data in a clean interactive tree with expand/collapse,
            search, and raw toggle. Our free JSON Viewer makes exploring complex
            JSON structures effortless.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search keys or values..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                    disabled={!parsedData}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef?.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here..."
              />
              <div className="flex items-center gap-2 mt-4">
                <Button onClick={parseJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Load JSON
                </Button>
                {error && (
                  <span className="text-destructive text-sm">{error}</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Viewer */}
          {parsedData && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "tree" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("tree")}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Tree View
                    </Button>
                    <Button
                      variant={viewMode === "raw" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("raw")}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Raw View
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    {viewMode === "tree" && (
                      <>
                        <Button variant="outline" size="sm" onClick={expandAll}>
                          Expand All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={collapseAll}
                        >
                          Collapse All
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadJson}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-md p-4 max-h-[500px] overflow-auto">
                  {viewMode === "tree" ? (
                    treeContent
                  ) : (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                      {JSON.stringify(parsedData, null, 2)}
                    </pre>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Viewer</h2>
          <p className="text-muted-foreground mb-6">
            Raw JSON in text form is hard to navigate, especially with deep
            nesting and large arrays. A visual tree view with expand and
            collapse controls makes understanding structure much easier. This
            JSON Viewer displays your data as an interactive tree with syntax
            highlighting and search.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste JSON into the Input area and click Load JSON. The tree view
            shows objects and arrays with expand arrows. Click any parent node
            to expand or collapse its children. Use the search box to find keys
            or values instantly.
          </p>
          <p className="text-muted-foreground mb-8">
            Switch between Tree View and Raw View using the toggle buttons.
            Expand All and Collapse All buttons help navigate large structures.
            Copy and Download buttons let you save the original JSON.
            Color-coded types make strings, numbers, and booleans easy to
            distinguish.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Developers exploring unfamiliar API responses benefit from visual
            structure overview. Debugging nested configuration files becomes
            easier when you can collapse sections you are not currently
            examining.
          </p>
          <p className="text-muted-foreground mb-8">
            Very large JSON files with thousands of nodes may cause browser
            slowdowns when fully expanded. Use the search feature to find
            specific values without expanding everything. For massive files,
            consider a desktop JSON editor.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">How do I expand all nodes?</p>
              <p className="text-muted-foreground">
                Click the Expand All button above the tree to open every nested
                level at once.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I search within the tree?</p>
              <p className="text-muted-foreground">
                Yes. Type in the search box to filter and highlight matching
                keys and values.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What colors represent what types?
              </p>
              <p className="text-muted-foreground">
                Strings are green, numbers are blue, booleans are purple, and
                null is gray.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I edit values in the tree?</p>
              <p className="text-muted-foreground">
                No. The tree view is read-only. Edit the raw JSON in the Input
                area and reload.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it preserve key order?</p>
              <p className="text-muted-foreground">
                Yes. Keys are displayed in the order they appear in the original
                JSON.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
