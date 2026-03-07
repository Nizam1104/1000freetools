"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Trash2, Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb } from "@/app/color-tools/lib/color-utils";

import ColorHistoryToolSEO from "@/components/seo-content/color-tools/ColorHistoryTool";

export const relatedTools = [
  { name: "Favorite Colors Manager", href: "/color-tools/favorite-colors-manager", description: "Save and organize color swatches" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors" },
  { name: "Extract Colors from Image", href: "/color-tools/extract-colors-from-image", description: "Get colors from images" },
  { name: "Palette Export Tool", href: "/color-tools/palette-export-tool", description: "Export colors in multiple formats" },
];

interface ColorHistoryItem {
  id: string;
  color: string;
  timestamp: number;
}

const STORAGE_KEY = "colorHistory";
const MAX_HISTORY = 50;

export default function ColorHistoryToolPage() {
  const [history, setHistory] = useState<ColorHistoryItem[]>([]);
  const [newColor, setNewColor] = useState("#3B82F6");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addColor = useCallback(() => {
    const colorToAdd = newColor.startsWith("#") ? newColor : "#" + newColor;
    const rgb = hexToRgb(colorToAdd);
    if (!rgb) {
      toast.error("Invalid color value");
      return;
    }

    const newItem: ColorHistoryItem = {
      id: Date.now().toString(),
      color: colorToAdd.toUpperCase(),
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Remove duplicate if exists
      const withoutDuplicate = prev.filter((item) => item.color !== newItem.color);
      // Add new item at the beginning
      const updated = [newItem, ...withoutDuplicate];
      // Limit to max history
      return updated.slice(0, MAX_HISTORY);
    });

    setNewColor("#3B82F6");
    toast.success("Color added to history!");
  }, [newColor]);

  const removeColor = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    toast.success("History cleared!");
  }, []);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Color copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={() => copyToClipboard(text, id)}
    >
      {copiedId === id ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Color History Tool</h1>
          <p className="text-muted-foreground">
            Automatically store and revisit your recently used colors in the browser. Never lose track of a color you've worked with — no account needed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add Color */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Color</CardTitle>
                <CardDescription>Manually add a color to history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                    <Input
                      value={newColor.replace("#", "")}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="pl-7 font-mono"
                      maxLength={6}
                      placeholder="000000"
                      onKeyDown={(e) => e.key === "Enter" && addColor()}
                    />
                  </div>
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="h-10 w-14 rounded-md border cursor-pointer"
                  />
                  <Button onClick={addColor} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Colors are automatically saved as you use them.</p>
                  <p className="mt-1">Maximum {MAX_HISTORY} colors stored.</p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Colors</span>
                  <span className="font-semibold">{history.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="font-semibold">
                    {Math.round((JSON.stringify(history).length / 1024) * 100) / 100} KB
                  </span>
                </div>
                {history.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Oldest</span>
                    <span className="font-semibold text-sm">
                      {formatTimeAgo(history[history.length - 1].timestamp)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* History List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <CardTitle>Color History</CardTitle>
                  </div>
                  {history.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearHistory}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>
                <CardDescription>
                  Your recently used colors are stored locally
                </CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No colors in history yet</p>
                    <p className="text-sm">Add a color to get started</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="group relative rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div
                          className="h-20"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="p-3 bg-card">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-sm font-medium">
                              {item.color}
                            </span>
                            <CopyButton text={item.color} id={item.id} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(item.timestamp)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeColor(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Export/Import */}
            {history.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">Manage History</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Tools - Internal Linking */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Related Color Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <ColorHistoryToolSEO />
      </div>
    </div>
  );
}
