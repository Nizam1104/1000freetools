"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function UrlUtmBuilder() {
  const [baseUrl, setBaseUrl] = useState("");
  const [utmParams, setUtmParams] = useState({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });
  const [output, setOutput] = useState("");

  const buildUrl = () => {
    if (!baseUrl) return;

    const url = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
    
    if (utmParams.source) url.searchParams.set("utm_source", utmParams.source);
    if (utmParams.medium) url.searchParams.set("utm_medium", utmParams.medium);
    if (utmParams.campaign) url.searchParams.set("utm_campaign", utmParams.campaign);
    if (utmParams.term) url.searchParams.set("utm_term", utmParams.term);
    if (utmParams.content) url.searchParams.set("utm_content", utmParams.content);

    setOutput(url.toString());
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setBaseUrl("");
    setUtmParams({ source: "", medium: "", campaign: "", term: "", content: "" });
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">URL UTM Builder</h2>
        <p className="text-sm text-muted-foreground">
          Create URLs with UTM parameters for campaign tracking
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="source">utm_source *</Label>
              <Input
                id="source"
                value={utmParams.source}
                onChange={(e) => setUtmParams({ ...utmParams, source: e.target.value })}
                placeholder="google, newsletter, facebook"
              />
              <p className="text-xs text-muted-foreground">The referrer (e.g., google, newsletter)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medium">utm_medium *</Label>
              <Input
                id="medium"
                value={utmParams.medium}
                onChange={(e) => setUtmParams({ ...utmParams, medium: e.target.value })}
                placeholder="cpc, email, social"
              />
              <p className="text-xs text-muted-foreground">Marketing medium (e.g., cpc, email)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign">utm_campaign *</Label>
              <Input
                id="campaign"
                value={utmParams.campaign}
                onChange={(e) => setUtmParams({ ...utmParams, campaign: e.target.value })}
                placeholder="spring_sale, product_launch"
              />
              <p className="text-xs text-muted-foreground">Product, promo code, or slogan</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">utm_term</Label>
              <Input
                id="term"
                value={utmParams.term}
                onChange={(e) => setUtmParams({ ...utmParams, term: e.target.value })}
                placeholder="running+shoes"
              />
              <p className="text-xs text-muted-foreground">Paid search keywords</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="content">utm_content</Label>
              <Input
                id="content"
                value={utmParams.content}
                onChange={(e) => setUtmParams({ ...utmParams, content: e.target.value })}
                placeholder="logolink, textlink, banner1"
              />
              <p className="text-xs text-muted-foreground">Differentiate similar content or links</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={buildUrl} disabled={!baseUrl} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Build URL
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={buildUrl} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Build
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">UTM URL</Label>
              <div className="font-mono mt-2 break-all">{output}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleCopy();
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">UTM Parameter Guide</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">utm_source</div>
            <div className="text-muted-foreground">Identify which site sent the traffic (required)</div>
            <div className="font-mono text-xs mt-1">Examples: google, newsletter, facebook, twitter</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">utm_medium</div>
            <div className="text-muted-foreground">Marketing medium (required)</div>
            <div className="font-mono text-xs mt-1">Examples: cpc, banner, email, social</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">utm_campaign</div>
            <div className="text-muted-foreground">Individual campaign name (required)</div>
            <div className="font-mono text-xs mt-1">Examples: spring_sale, product_launch</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
