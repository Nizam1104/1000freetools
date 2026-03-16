"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function UrlSocialMediaPreview() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url?: string;
    type?: string;
  } | null>(null);

  const fetchPreview = async () => {
    if (!url) return;
    
    setLoading(true);
    try {
      // Use a CORS proxy or direct fetch if the server allows it
      const response = await fetch(url, { mode: "cors" });
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      
      const getMeta = (property: string) => {
        const meta = doc.querySelector(`meta[property="${property}"]`) ||
                     doc.querySelector(`meta[name="${property}"]`);
        return meta?.getAttribute("content") || "";
      };
      
      setData({
        title: getMeta("og:title") || getMeta("twitter:title") || doc.title,
        description: getMeta("og:description") || getMeta("twitter:description") || getMeta("description"),
        image: getMeta("og:image") || getMeta("twitter:image"),
        siteName: getMeta("og:site_name"),
        url: getMeta("og:url") || url,
        type: getMeta("og:type"),
      });
    } catch (error) {
      console.error("Failed to fetch preview:", error);
      // Simulate preview for demo purposes
      setData({
        title: "Preview Unavailable",
        description: "Unable to fetch preview due to CORS restrictions. In production, use a server-side proxy.",
        image: "",
        siteName: new URL(url).hostname,
        url,
      });
    }
    setLoading(false);
  };

  const handleClear = () => {
    setUrl("");
    setData(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL Social Media Preview</h2>
        <p className="text-sm text-muted-foreground">
          See how a URL will appear when shared on social media platforms
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL to Preview</Label>
        <div className="flex gap-2">
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1"
          />
          <Button onClick={fetchPreview} disabled={loading || !url}>
            {loading ? "Fetching..." : "Preview"}
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!url}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {data && (
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Facebook / LinkedIn Preview</h3>
            <div className="max-w-[500px] border rounded-lg overflow-hidden">
              {data.image && (
                <div className="aspect-video bg-muted relative">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="p-3 bg-muted/50">
                <div className="text-xs text-muted-foreground uppercase">
                  {data.siteName || new URL(url).hostname}
                </div>
                <div className="font-semibold line-clamp-2">{data.title || "No title"}</div>
                <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {data.description || "No description available"}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Twitter Card Preview</h3>
            <div className="max-w-[500px] border rounded-lg overflow-hidden">
              {data.image ? (
                <>
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={data.image}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="font-semibold line-clamp-2">{data.title || "No title"}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {data.description || "No description available"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new URL(url).hostname}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-3">
                  <div className="font-semibold line-clamp-2">{data.title || "No title"}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {data.description || "No description available"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {new URL(url).hostname}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Extracted Meta Tags</h3>
            <div className="space-y-2 font-mono text-sm">
              {data.title && (
                <div>
                  <span className="text-muted-foreground">og:title:</span> {data.title}
                </div>
              )}
              {data.description && (
                <div>
                  <span className="text-muted-foreground">og:description:</span> {data.description}
                </div>
              )}
              {data.image && (
                <div>
                  <span className="text-muted-foreground">og:image:</span> {data.image}
                </div>
              )}
              {data.siteName && (
                <div>
                  <span className="text-muted-foreground">og:site_name:</span> {data.siteName}
                </div>
              )}
              {data.type && (
                <div>
                  <span className="text-muted-foreground">og:type:</span> {data.type}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Required Meta Tags</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Add these meta tags to your HTML to control how your page appears on social media:
        </p>
        <pre className="bg-muted p-4 rounded text-sm font-mono overflow-x-auto">
{`<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your page description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />`}
        </pre>
      </Card>
    </div>
  );
}
