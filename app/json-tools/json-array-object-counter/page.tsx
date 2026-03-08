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
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";
import { JsonEditor } from "@/components/utils/json-editor";

interface JsonStats {
  objects: number;
  arrays: number;
  keys: number;
  values: number;
  strings: number;
  numbers: number;
  booleans: number;
  nulls: number;
}

export default function JsonArrayObjectCounterPage() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<JsonStats | null>(null);

  const countElements = useCallback(
    (
      obj: any,
      stats: JsonStats = {
        objects: 0,
        arrays: 0,
        keys: 0,
        values: 0,
        strings: 0,
        numbers: 0,
        booleans: 0,
        nulls: 0,
      },
    ): JsonStats => {
      if (obj === null) {
        stats.nulls++;
        stats.values++;
        return stats;
      }

      if (typeof obj === "string") {
        stats.strings++;
        stats.values++;
        return stats;
      }

      if (typeof obj === "number") {
        stats.numbers++;
        stats.values++;
        return stats;
      }

      if (typeof obj === "boolean") {
        stats.booleans++;
        stats.values++;
        return stats;
      }

      if (Array.isArray(obj)) {
        stats.arrays++;
        obj.forEach((item) => countElements(item, stats));
        return stats;
      }

      if (typeof obj === "object") {
        stats.objects++;
        Object.entries(obj).forEach(([key, value]) => {
          stats.keys++;
          countElements(value, stats);
        });
        return stats;
      }

      return stats;
    },
    [],
  );

  const analyzeJson = useCallback(() => {
    setStats(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const result = countElements(obj);
    setStats(result);
    toast.success("JSON analysis complete");
  }, [input, countElements]);

  const clearAll = () => {
    setInput("");
    setStats(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          users: [
            { id: 1, name: "John", active: true },
            { id: 2, name: "Jane", active: false },
          ],
          meta: { total: 2, page: null },
        },
        null,
        2,
      ),
    );
  };

  const copyResult = () => {
    if (stats) {
      navigator.clipboard.writeText(JSON.stringify(stats, null, 2));
      toast.success("Statistics copied to clipboard");
    }
  };

  const statItems = useMemo(() => {
    if (!stats) return [];
    return [
      { label: "Objects", value: stats.objects, color: "bg-blue-500" },
      { label: "Arrays", value: stats.arrays, color: "bg-green-500" },
      { label: "Keys", value: stats.keys, color: "bg-purple-500" },
      { label: "Values", value: stats.values, color: "bg-orange-500" },
      { label: "Strings", value: stats.strings, color: "bg-pink-500" },
      { label: "Numbers", value: stats.numbers, color: "bg-cyan-500" },
      { label: "Booleans", value: stats.booleans, color: "bg-yellow-500" },
      { label: "Nulls", value: stats.nulls, color: "bg-gray-500" },
    ];
  }, [stats]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Array & Object Counter Online
          </h1>
          <p className="text-muted-foreground">
            Count all arrays, objects, keys, and values inside any JSON
            structure. Our free JSON Counter gives you a quick statistical
            overview of your JSON data composition.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {stats && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={analyzeJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
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
              placeholder='{"users": [{"id": 1, "name": "John"}]}'
            />
          </CardContent>
        </Card>

        {/* Result */}
        {stats && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statItems.map((item) => (
                  <div key={item.label} className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-3xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Array & Object Counter
          </h2>
          <p className="text-muted-foreground mb-6">
            Large JSON files can be overwhelming to understand at a glance. This
            tool analyzes your JSON and counts every object, array, key, and
            value type, giving you a quick statistical overview of your data
            structure without manual counting.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the input area and click Analyze. The tool
            recursively traverses every level of your structure, counting
            objects, arrays, keys, and primitive values (strings, numbers,
            booleans, and nulls).
          </p>
          <p className="text-muted-foreground mb-8">
            Results appear as color-coded cards showing the count for each
            category. The statistics help you understand the composition of your
            JSON at a glance, useful for debugging and documentation.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You received a large API response and need to understand its
            structure quickly. Run it through the counter to see how many
            objects and arrays you're dealing with before writing parsing code.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool counts elements but doesn't show their locations or paths.
            For detailed structural analysis, you'd need a JSON explorer or tree
            viewer that shows the full hierarchy.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What does the counter track?</p>
              <p className="text-muted-foreground">
                It counts objects, arrays, keys, total values, strings, numbers,
                booleans, and null values. Each category appears as a separate
                card.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                How are nested structures counted?
              </p>
              <p className="text-muted-foreground">
                Every level is counted recursively. A nested object inside an
                array inside another object counts toward all three categories.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What counts as a value?</p>
              <p className="text-muted-foreground">
                Every primitive (string, number, boolean, null) counts as a
                value. Objects and arrays contain values but aren't counted as
                values themselves.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I use this with arrays as root?
              </p>
              <p className="text-muted-foreground">
                Yes, the tool works with any valid JSON including arrays at the
                root level. It will count all elements within the array.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is there a size limit?</p>
              <p className="text-muted-foreground">
                Very large JSON files may slow down your browser. For best
                performance, keep files under a few megabytes when analyzing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
