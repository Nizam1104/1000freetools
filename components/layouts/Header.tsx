"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DarkLightModeToggler } from "../utils/DarkLightModesToggler";
import { FavouriteToggle } from "../utils/FavouriteToggle";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 shrink-0 items-center">
      <div className="flex items-center justify-between w-full px-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold hidden sm:inline">
              1000FreeTools
            </span>
            <span className="text-xl font-semibold sm:hidden">TFT</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <FavouriteToggle />
          <DarkLightModeToggler />
        </div>
      </div>
    </header>
  );
}
