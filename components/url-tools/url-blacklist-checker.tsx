"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, ExternalLink } from "lucide-react";

export default function UrlBlacklistChecker() {
  const [url, setUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<{
    safe: boolean;
    lists: Array<{ name: string; status: "clean" | "listed" | "unknown" }>;
  } | null>(null);

  const checkBlacklists = async () => {
    if (!url) return;
    
    setChecking(true);
    
    // Simulate checking against various blacklists
    // In production, you would use real APIs like Google Safe Browsing
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    
    // Simulated results
    const simulatedResults = {
      safe: true,
      lists: [
        { name: "Google Safe Browsing", status: "clean" as const },
        { name: "Norton Safe Web", status: "clean" as const },
        { name: "McAfee SiteAdvisor", status: "clean" as const },
        { name: "Spamhaus", status: "clean" as const },
        { name: "PhishTank", status: "clean" as const },
        { name: "SURBL", status: "clean" as const },
      ],
    };
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setResults(simulatedResults);
    setChecking(false);
  };

  const handleClear = () => {
    setUrl("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Blacklist Checker</h2>
        <p className="text-sm text-muted-foreground">
          Check if a domain or URL is listed on security blacklists
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL or Domain to Check</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com or example.com"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={checkBlacklists} disabled={!url || checking} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${checking ? "animate-spin" : ""}`} />
              {checking ? "Checking..." : "Check Blacklists"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!url && !results}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={checkBlacklists} disabled={!url || checking} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${checking ? "animate-spin" : ""}`} />
          {checking ? "Checking..." : "Check"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!url && !results}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {results && (
        <Card className={`p-4 ${results.safe ? "border-green-500" : "border-destructive"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${results.safe ? "bg-green-500" : "bg-destructive"}`} />
            <div className="font-semibold text-lg">
              {results.safe ? "Domain appears safe" : "Domain found on blacklists"}
            </div>
          </div>
          
          <div className="grid gap-2 sm:grid-cols-2">
            {results.lists.map((list, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted rounded">
                <span>{list.name}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  list.status === "clean"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                }`}>
                  {list.status === "clean" ? "Clean" : "Listed"}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Blacklist Databases Checked</h3>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Google Safe Browsing</div>
            <div className="text-muted-foreground">Checks against Google's phishing and malware database</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Norton Safe Web</div>
            <div className="text-muted-foreground">Symantec's website safety ratings</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">Spamhaus</div>
            <div className="text-muted-foreground">Email spam and malware domain lists</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">PhishTank</div>
            <div className="text-muted-foreground">Community-driven phishing database</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Note: This is a demonstration. For production use, integrate with actual blacklist APIs.
        </p>
      </Card>
    </div>
  );
}
