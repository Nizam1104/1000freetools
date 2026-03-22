"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2, ExternalLink } from "lucide-react";
import { db, type FavouriteTool } from "@/lib/indexed-db/db";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FavouriteToolsPage() {
  const [favourites, setFavourites] = useState<FavouriteTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const tools = await db.favouriteTools.toArray();
      setFavourites(tools);
    } catch (error) {
      console.error("Error loading favourites:", error);
      toast.error("Failed to load favourite tools");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavourite = async (id: number, url: string) => {
    try {
      await db.favouriteTools.delete(id);
      setFavourites((prev) => prev.filter((tool) => tool.id !== id));
      toast.success("Removed from favourites");
    } catch (error) {
      console.error("Error removing favourite:", error);
      toast.error("Failed to remove from favourites");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-6xl mx-auto w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-muted-foreground">
            Loading your favourite tools...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
              <Heart className="h-8 w-8 fill-red-500 text-red-500" />
              Favourite Tools
            </h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
            Quick access to your bookmarked tools. These are stored locally in
            your browser.
          </p>
        </div>

        {/* Favourites Grid */}
        {favourites.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-muted/30">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              No favourite tools yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Click the heart icon in the header to add tools to your
              favourites. They'll appear here for quick access.
            </p>
            <Link href="/explore-all-tools">
              <Button variant="default" size="lg">
                Browse All Tools
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {favourites.length} tool{favourites.length !== 1 && "s"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favourites.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card/80 dark:bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                >
                  {/* Remove button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFavourite(tool.id!, tool.url)}
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from favourites"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>

                  {/* Tool info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm md:text-base leading-snug mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {tool.url}
                    </p>
                  </div>

                  {/* Added date */}
                  <div className="text-xs text-muted-foreground">
                    Added{" "}
                    {new Date(tool.addedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href={tool.url} className="flex-1">
                      <Button variant="default" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open Tool
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFavourite(tool.id!, tool.url)}
                      title="Remove from favourites"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
