"use client";

import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";

// Dynamically import the emoji picker to reduce initial load time
const EmojiPickerComponent = lazy(() => import("emoji-picker-react"));

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  children?: React.ReactNode;
}

export const EmojiPicker = ({ onEmojiSelect, children }: EmojiPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            <SmileIcon className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="start">
        <Suspense fallback={<div className="p-4">Loading emojis...</div>}>
          <EmojiPickerComponent
            onEmojiClick={(e) => handleEmojiClick(e.emoji)}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
};
