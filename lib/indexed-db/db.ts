import Dexie, { type Table } from "dexie";
import { FavouriteTool } from "./types";

// Database class
export class AppDatabase extends Dexie {
  favouriteTools!: Table<FavouriteTool, number>;

  constructor() {
    super("TFTDB");

    this.version(1).stores({
      favouriteTools: "++id, url, name, addedAt",
    });
  }
}

// Singleton instance
export const db = new AppDatabase();

export type { FavouriteTool };
