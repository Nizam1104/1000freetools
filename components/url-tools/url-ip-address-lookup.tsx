"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, ExternalLink } from "lucide-react";

export default function UrlIpAddressLookup() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{
    domain: string;
    ipAddresses: string[];
    location?: {
      country: string;
      region: string;
      city: string;
      isp: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookupIp = async () => {
    if (!url) return;
    
    setLoading(true);
    setError("");
    
    try {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      const domain = new URL(fullUrl).hostname;
      
      // Use a DNS lookup API
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();
      
      const ipAddresses = data.Answer?.map((a: { data: string }) => a.data) || [];
      
      // Get location info for first IP
      let location;
      if (ipAddresses.length > 0) {
        const geoResponse = await fetch(`https://ipapi.co/${ipAddresses[0]}/json/`);
        const geoData = await geoResponse.json();
        location = {
          country: geoData.country_name || "Unknown",
          region: geoData.region || "Unknown",
          city: geoData.city || "Unknown",
          isp: geoData.org || "Unknown",
        };
      }
      
      setResult({
        domain,
        ipAddresses,
        location,
      });
    } catch (e) {
      setError("Failed to lookup IP address. The domain may not exist or the API may be unavailable.");
    }
    
    setLoading(false);
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL IP Address Lookup</h2>
        <p className="text-sm text-muted-foreground">
          Find the IP address and location information for any domain
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Domain or URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com or https://example.com"
              className="font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={lookupIp} disabled={!url || loading} className="flex-1">
              <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Looking up..." : "Lookup IP"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!url && !result}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={lookupIp} disabled={!url || loading} className="flex-1">
          <ArrowRightLeft className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Looking up..." : "Lookup"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!url && !result}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {result && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Domain</Label>
                <div className="font-mono text-lg mt-1">{result.domain}</div>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">IP Addresses</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.ipAddresses.map((ip, i) => (
                    <span key={i} className="px-3 py-1 bg-muted rounded font-mono">
                      {ip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {result.location && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Location Information</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground">Country</div>
                  <div className="font-medium">{result.location.country}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Region</div>
                  <div className="font-medium">{result.location.region}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">City</div>
                  <div className="font-medium">{result.location.city}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">ISP/Organization</div>
                  <div className="font-medium">{result.location.isp}</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">About IP Lookup</h3>
        <p className="text-sm text-muted-foreground">
          This tool performs a DNS lookup to find the IP addresses associated with a domain,
          then uses geolocation databases to determine the approximate physical location of the server.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Note: IP geolocation is approximate and may not reflect the actual server location,
          especially for sites using CDNs or cloud hosting.
        </p>
      </Card>
    </div>
  );
}
