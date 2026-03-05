"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FileJson,
  RotateCcw,
  Trash2,
  Search,
  Copy,
  Check,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchMatch {
  path: string;
  key: string;
  value: unknown;
  matchType: "key" | "value" | "both";
}

export default function JsonValueSearchPage() {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIn, setSearchIn] = useState<"both" | "keys" | "values">("both");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [copied, setCopied] = useState(false);
  const [outputFormat, setOutputFormat] = useState<"json" | "table">("table");

  const searchJson = useCallback(
    (obj: unknown, query: string, path = ""): SearchMatch[] => {
      if (obj === null || typeof obj !== "object") {
        const valueStr = String(obj);
        const keyMatch = path.split(".").pop() || "";
        const compareQuery = caseSensitive ? query : query.toLowerCase();
        const compareKey = caseSensitive ? keyMatch : keyMatch.toLowerCase();
        const compareValue = caseSensitive ? valueStr : valueStr.toLowerCase();

        const keyMatches =
          searchIn !== "values" && compareKey.includes(compareQuery);
        const valueMatches =
          searchIn !== "keys" && compareValue.includes(compareQuery);

        if (keyMatches || valueMatches) {
          return [
            {
              path: path || "(root)",
              key: keyMatch,
              value: obj,
              matchType:
                keyMatches && valueMatches
                  ? "both"
                  : keyMatches
                    ? "key"
                    : "value",
            },
          ];
        }
        return [];
      }

      if (Array.isArray(obj)) {
        const results: SearchMatch[] = [];
        obj.forEach((item, index) => {
          results.push(...searchJson(item, query, `${path}[${index}]`));
        });
        return results;
      }

      const results: SearchMatch[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const newPath = path ? `${path}.${key}` : key;
        const compareQuery = caseSensitive ? query : query.toLowerCase();
        const compareKey = caseSensitive ? key : key.toLowerCase();

        const keyMatches =
          searchIn !== "values" && compareKey.includes(compareQuery);

        if (typeof value === "object" && value !== null) {
          const nestedResults = searchJson(value, query, newPath);
          if (keyMatches || nestedResults.length > 0) {
            if (keyMatches && nestedResults.length === 0) {
              results.push({
                path: newPath,
                key,
                value,
                matchType: "key",
              });
            }
            results.push(...nestedResults);
          }
        } else {
          const valueStr = String(value);
          const compareValue = caseSensitive
            ? valueStr
            : valueStr.toLowerCase();
          const valueMatches =
            searchIn !== "keys" && compareValue.includes(compareQuery);

          if (keyMatches || valueMatches) {
            results.push({
              path: newPath,
              key,
              value,
              matchType:
                keyMatches && valueMatches
                  ? "both"
                  : keyMatches
                    ? "key"
                    : "value",
            });
          }
        }
      }

      return results;
    },
    [caseSensitive, searchIn],
  );

  const performSearch = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to search");
      return;
    }

    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const results = searchJson(parsed, searchQuery);
      setMatches(results);
      toast.success(`Found ${results.length} match(es)`);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, searchQuery, searchJson]);

  const clearAll = () => {
    setInput("");
    setSearchQuery("");
    setMatches([]);
  };

  const loadSample = () => {
    const sample = {
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
      ],
      settings: {
        theme: "dark",
        language: "en",
        notifications: true,
      },
      metadata: {
        version: "1.0.0",
        author: "Team",
      },
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  const copyMatches = async () => {
    if (matches.length === 0) return;
    const output = JSON.stringify(matches, null, 2);
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query) return text;
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      caseSensitive ? "g" : "gi",
    );
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-yellow-300 dark:bg-yellow-600 text-foreground rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const formatValue = (value: unknown): string => {
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const filteredMatches = useMemo(() => matches, [matches]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Search & Filter Tool Online
          </h1>
          <p className="text-muted-foreground">
            Search and filter JSON data by key or value with real-time highlight
            support. Quickly locate matching nodes inside large, complex JSON
            structures without manual scanning.
          </p>
        </div>

        {/* Search Controls */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label
                  htmlFor="search"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Search Query
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by key or value..."
                    className="pl-10"
                    onKeyDown={(e) => e.key === "Enter" && performSearch()}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="searchIn"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Search In:
                </Label>
                <Select
                  value={searchIn}
                  onValueChange={(v) =>
                    setSearchIn(v as "both" | "keys" | "values")
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="keys">Keys Only</SelectItem>
                    <SelectItem value="values">Values Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="caseSensitive"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <Label
                    htmlFor="caseSensitive"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Case sensitive
                  </Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={performSearch}>
                  <Filter className="h-4 w-4 mr-2" />
                  Search
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
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[300px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>

          {/* Results */}
          {matches.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      {matches.length} Match{matches.length !== 1 ? "es" : ""}{" "}
                      Found
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={outputFormat}
                      onValueChange={(v) =>
                        setOutputFormat(v as "json" | "table")
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" onClick={copyMatches}>
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>

                <Tabs
                  value={outputFormat}
                  onValueChange={(v) => setOutputFormat(v as "json" | "table")}
                >
                  <TabsContent value="table" className="mt-0">
                    <div className="border rounded-md overflow-hidden">
                      <div className="grid grid-cols-4 bg-muted/50 border-b">
                        <div className="p-3 text-sm font-medium">Path</div>
                        <div className="p-3 text-sm font-medium">Key</div>
                        <div className="p-3 text-sm font-medium">Value</div>
                        <div className="p-3 text-sm font-medium">Match</div>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {filteredMatches.map((match, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-4 border-b last:border-0 hover:bg-muted/30"
                          >
                            <div className="p-3 text-sm font-mono text-muted-foreground truncate">
                              {highlightText(match.path, searchQuery)}
                            </div>
                            <div className="p-3 text-sm">
                              {highlightText(match.key, searchQuery)}
                            </div>
                            <div className="p-3 text-sm font-mono truncate">
                              {highlightText(
                                formatValue(match.value),
                                searchQuery,
                              )}
                            </div>
                            <div className="p-3">
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                  match.matchType === "both"
                                    ? "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                                    : match.matchType === "key"
                                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                      : "bg-green-500/20 text-green-600 dark:text-green-400"
                                }`}
                              >
                                {match.matchType}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="json" className="mt-0">
                    <Textarea
                      value={JSON.stringify(filteredMatches, null, 2)}
                      readOnly
                      className="min-h-[400px] font-mono text-sm resize-none bg-muted/50"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Search and Filter Tool
          </h2>
          <p className="text-muted-foreground mb-6">
            Finding specific values in large JSON files means scrolling through
            hundreds of lines manually. Whether debugging API responses or
            exploring unfamiliar data structures, locating keys or values
            quickly saves time. This JSON Search tool scans your entire JSON and
            highlights all matches with their paths.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the Input area. Enter a search term in the
            Search Query field. Choose to search in Keys Only, Values Only, or
            Both. Click Search and see matching results in a table showing path,
            key, value, and match type.
          </p>
          <p className="text-muted-foreground mb-8">
            Results highlight the matched text for easy identification. Toggle
            between Table and JSON output formats. Use the Case sensitive
            checkbox for exact matching. Copy results to clipboard for further
            analysis.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Developers debugging API issues need to find specific error codes or
            IDs buried in large responses. QA engineers verifying test data can
            quickly locate expected values across complex nested structures.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool performs text-based substring matching, not pattern
            matching. For regex searches or complex queries, use dedicated JSON
            query languages like JSONPath. The search works best for finding
            known strings or numbers.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">Does it search nested objects?</p>
              <p className="text-muted-foreground">
                Yes. The search recursively scans all nested objects and arrays,
                showing full paths to matches.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I search only keys?</p>
              <p className="text-muted-foreground">
                Yes. Use the Search In dropdown to select Keys Only, Values
                Only, or Both.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is the search case-sensitive?</p>
              <p className="text-muted-foreground">
                By default no. Check the Case sensitive box for exact case
                matching.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What does match type mean?</p>
              <p className="text-muted-foreground">
                Match type shows whether the term was found in the key, value,
                or both for that entry.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I export search results?</p>
              <p className="text-muted-foreground">
                Yes. Click Copy to export all matches as JSON for further
                processing.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-path-finder"
                className="text-primary hover:underline"
              >
                JSON Path Finder
              </a>{" "}
              – Extract values using JSONPath expressions
            </li>
            <li>
              <a
                href="/json-tools/json-viewer"
                className="text-primary hover:underline"
              >
                JSON Viewer
              </a>{" "}
              – Interactive tree view for exploring JSON
            </li>
            <li>
              <a
                href="/json-tools/json-filter"
                className="text-primary hover:underline"
              >
                JSON Filter
              </a>{" "}
              – Filter arrays based on conditions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
