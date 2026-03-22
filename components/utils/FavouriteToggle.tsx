"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { db } from "@/lib/indexed-db/db";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function FavouriteToggle() {
  const pathname = usePathname();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkFavouriteStatus() {
      try {
        const tool = await db.favouriteTools
          .where("url")
          .equals(pathname)
          .first();
        setIsFavourite(!!tool);
      } catch (error) {
        console.error("Error checking favourite status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkFavouriteStatus();
  }, [pathname]);

  const toggleFavourite = async () => {
    setIsLoading(true);
    try {
      if (isFavourite) {
        await db.favouriteTools.where("url").equals(pathname).delete();
        setIsFavourite(false);
        toast.success("Removed from favourites");
      } else {
        await db.favouriteTools.add({
          url: pathname,
          name:
            document.title.replace(" - 1000FreeTools", "") || "Unknown Tool",
          addedAt: new Date(),
        });
        setIsFavourite(true);
        toast.success("Added to favourites");
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
      toast.error("Failed to update favourites");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFavourite}
      disabled={isLoading}
      className="relative"
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          isFavourite ? "fill-red-500 text-red-500" : "text-muted-foreground"
        }`}
      />
      <span className="sr-only">
        {isFavourite ? "Remove from favourites" : "Add to favourites"}
      </span>
    </Button>
  );
}
