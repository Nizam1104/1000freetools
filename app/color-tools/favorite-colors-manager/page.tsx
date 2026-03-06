"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Trash2, Heart, Plus, Edit2, Star } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb } from "@/app/color-tools/lib/color-utils";
import FavoriteColorsManagerSEO from "@/components/seo-content/color-tools/FavoriteColorsManager";

export const relatedTools = [
  { name: "Color History Tool", href: "/color-tools/color-history-tool", description: "Track recently used colors" },
  { name: "Palette Export Tool", href: "/color-tools/palette-export-tool", description: "Export colors in multiple formats" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors" },
  { name: "CSS Variables Generator", href: "/color-tools/css-variables-generator", description: "Generate CSS custom properties" },
];

interface FavoriteColor {
  id: string;
  name: string;
  color: string;
  isStarred: boolean;
  createdAt: number;
}

const STORAGE_KEY = "favoriteColors";

export default function FavoriteColorsManagerPage() {
  const [favorites, setFavorites] = useState<FavoriteColor[]>([]);
  const [newColor, setNewColor] = useState("#3B82F6");
  const [newName, setNewName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [filter, setFilter] = useState<"all" | "starred">("all");

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback(() => {
    const colorToAdd = newColor.startsWith("#") ? newColor : "#" + newColor;
    const rgb = hexToRgb(colorToAdd);
    if (!rgb) {
      toast.error("Invalid color value");
      return;
    }

    const name = newName.trim() || `Color ${favorites.length + 1}`;

    const newItem: FavoriteColor = {
      id: Date.now().toString(),
      name,
      color: colorToAdd.toUpperCase(),
      isStarred: false,
      createdAt: Date.now(),
    };

    setFavorites((prev) => [newItem, ...prev]);
    setNewColor("#3B82F6");
    setNewName("");
    toast.success("Color added to favorites!");
  }, [newColor, newName, favorites.length]);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    toast.success("Color removed from favorites");
  }, []);

  const toggleStar = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isStarred: !item.isStarred } : item
      )
    );
  }, []);

  const startEditing = useCallback((item: FavoriteColor) => {
    setEditingId(item.id);
    setEditName(item.name);
  }, []);

  const saveEdit = useCallback((id: string) => {
    const name = editName.trim() || "Unnamed";
    setFavorites((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
    setEditingId(null);
    setEditName("");
    toast.success("Name updated!");
  }, [editName]);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditName("");
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

  const filteredFavorites = filter === "starred"
    ? favorites.filter((f) => f.isStarred)
    : favorites;

  const starredCount = favorites.filter((f) => f.isStarred).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Favorite Colors Manager</h1>
          <p className="text-muted-foreground">
            Save, organize, and manage your favorite color swatches locally in the browser. Build a personal color library without signing up for anything.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add Color */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Favorite</CardTitle>
                <CardDescription>Save a new color to your favorites</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Name (optional)</Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., Ocean Blue"
                    onKeyDown={(e) => e.key === "Enter" && addFavorite()}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                    <Input
                      value={newColor.replace("#", "")}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="pl-7 font-mono"
                      maxLength={6}
                      placeholder="000000"
                      onKeyDown={(e) => e.key === "Enter" && addFavorite()}
                    />
                  </div>
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="h-10 w-14 rounded-md border cursor-pointer"
                  />
                  <Button onClick={addFavorite} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Colors are saved to your browser's local storage.</p>
                  <p className="mt-1">They persist even after closing the browser.</p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Collection Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Colors</span>
                  <span className="font-semibold">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Starred</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {starredCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="font-semibold">
                    {Math.round((JSON.stringify(favorites).length / 1024) * 100) / 100} KB
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Favorites Grid */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    <CardTitle>My Favorites</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("all")}
                    >
                      All ({favorites.length})
                    </Button>
                    <Button
                      variant={filter === "starred" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("starred")}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Starred ({starredCount})
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Your saved color swatches
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredFavorites.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>
                      {filter === "starred"
                        ? "No starred colors yet"
                        : "No favorite colors yet"}
                    </p>
                    <p className="text-sm">
                      {filter === "starred"
                        ? "Star some colors to see them here"
                        : "Add a color to get started"}
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFavorites.map((item) => (
                      <div
                        key={item.id}
                        className="group rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div
                          className="h-24 relative"
                          style={{ backgroundColor: item.color }}
                        >
                          <button
                            onClick={() => toggleStar(item.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-black/50 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`h-4 w-4 ${item.isStarred
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                                }`}
                            />
                          </button>
                        </div>
                        <div className="p-3 bg-card">
                          {editingId === item.id ? (
                            <div className="space-y-2">
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="h-8 text-sm"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveEdit(item.id);
                                  if (e.key === "Escape") cancelEdit();
                                }}
                              />
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  className="flex-1 h-7 text-xs"
                                  onClick={() => saveEdit(item.id)}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 h-7 text-xs"
                                  onClick={cancelEdit}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm truncate flex-1">
                                  {item.name}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => startEditing(item)}
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </Button>
                                  <CopyButton text={item.color} id={item.id} />
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-muted-foreground">
                                  {item.color}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                                  onClick={() => removeFavorite(item.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Export/Import */}
            {favorites.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Manage Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const data = JSON.stringify(favorites, null, 2);
                        navigator.clipboard.writeText(data);
                        toast.success("Collection copied to clipboard!");
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Collection
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const data = JSON.stringify(favorites, null, 2);
                        const blob = new Blob([data], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "favorite-colors.json";
                        a.click();
                        URL.revokeObjectURL(url);
                        toast.success("Collection exported!");
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Export JSON
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = ".json";
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              try {
                                const imported = JSON.parse(
                                  event.target?.result as string
                                );
                                if (Array.isArray(imported)) {
                                  setFavorites((prev) => [...imported, ...prev]);
                                  toast.success(
                                    `Imported ${imported.length} colors!`
                                  );
                                }
                              } catch {
                                toast.error("Invalid JSON file");
                              }
                            };
                            reader.readAsText(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Import JSON
                    </Button>
                  </div>
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

        {/* SEO Content */}
        <FavoriteColorsManagerSEO />
      </div>
    </div>
  );
}
