"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const PLATFORM_LIMITS = [
  { name: "SMS", limit: 160 },
  { name: "Twitter/X", limit: 280 },
  { name: "Meta title", limit: 60 },
  { name: "Meta description", limit: 160 },
  { name: "Instagram bio", limit: 150 },
  { name: "YouTube title", limit: 100 },
];

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    return { withSpaces, withoutSpaces };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const getProgressColor = (count: number, limit: number) => {
    const percentage = (count / limit) * 100;
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 80) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="text-input" className="text-base font-medium">
            Enter your text
          </Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!text}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!text}
            >
              Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[150px] max-h-[500px] overflow-y-auto font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.withSpaces}</div>
          <div className="text-sm text-muted-foreground">Characters (with spaces)</div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="text-3xl font-bold text-foreground">{stats.withoutSpaces}</div>
          <div className="text-sm text-muted-foreground">Characters (without spaces)</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Platform Limits</h3>
        <div className="space-y-4">
          {PLATFORM_LIMITS.map((platform) => {
            const percentage = Math.min((stats.withSpaces / platform.limit) * 100, 100);
            const remaining = platform.limit - stats.withSpaces;
            const isOver = stats.withSpaces > platform.limit;

            return (
              <div key={platform.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{platform.name}</span>
                  <span className={`text-sm ${isOver ? "text-destructive" : "text-muted-foreground"}`}>
                    {stats.withSpaces}/{platform.limit}
                    {!isOver && remaining > 0 && ` (${remaining} left)`}
                    {isOver && ` (${Math.abs(remaining)} over)`}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className={`h-2 ${getProgressColor(stats.withSpaces, platform.limit)}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
