"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, ExternalLink } from "lucide-react";

export default function UrlWaybackMachineChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [snapshots, setSnapshots] = useState<Array<{
    timestamp: string;
    date: string;
    url: string;
  }>>([]);
  const [error, setError] = useState("");

  const checkWayback = async () => {
    if (!url) return;
    
    setLoading(true);
    setError("");
    setSnapshots([]);
    
    try {
      // Use Wayback Machine CDX API
      const cleanUrl = url.replace(/^https?:\/\//, "");
      const response = await fetch(
        `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(cleanUrl)}&output=json&limit=20&filter=statuscode:200`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch snapshots");
      }
      
      const data = await response.json();
      
      if (data.length <= 1) {
        setError("No snapshots found for this URL");
        setLoading(false);
        return;
      }
      
      // Parse results (skip header row)
      const results = data.slice(1).map((row: string[]) => ({
        timestamp: row[1],
        date: new Date(row[1]).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        url: `https://web.archive.org/web/${row[1]}/${row[2]}`,
      }));
      
      setSnapshots(results);
    } catch (err) {
      setError("Failed to fetch snapshots. The URL may not be archived.");
    }
    
    setLoading(false);
  };

  const handleClear = () => {
    setUrl("");
    setSnapshots([]);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Wayback Machine Checker</h2>
        <p className="text-sm text-muted-foreground">
          Check the Internet Archive's Wayback Machine for historical snapshots of a URL
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL to Check</Label>
        <div className="flex gap-2">
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1"
          />
          <Button onClick={checkWayback} disabled={loading || !url}>
            {loading ? "Checking..." : "Check"}
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!url}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {snapshots.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Found {snapshots.length} snapshot{snapshots.length !== 1 ? "s" : ""}
          </div>
          
          <Card className="p-4">
            <div className="space-y-2">
              {snapshots.map((snapshot, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded border hover:bg-muted"
                >
                  <div>
                    <div className="font-medium">{snapshot.date}</div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {snapshot.timestamp}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={snapshot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      View Snapshot
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">About the Wayback Machine</h3>
        <p className="text-sm text-muted-foreground mb-3">
          The Internet Archive's Wayback Machine is a digital archive of the World Wide Web.
          It allows users to see what websites looked like in the past.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a
              href="https://archive.org/web/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Visit Wayback Machine
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </Card>
    </div>
  );
}
