"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function XmlToRssFeedConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [channelInfo, setChannelInfo] = useState({
    title: "My RSS Feed",
    link: "https://example.com",
    description: "A sample RSS feed",
  });

  const parseXml = (xml: string): Array<{ title: string; link: string; description: string; pubDate?: string }> => {
    const items: Array<{ title: string; link: string; description: string; pubDate?: string }> = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    
    // Try to find items in various formats
    const itemElements = doc.querySelectorAll("item, entry, article, post, news");
    
    itemElements.forEach((item) => {
      const title = item.querySelector("title")?.textContent || "Untitled";
      const link = item.querySelector("link")?.textContent || 
                   item.querySelector("id")?.textContent || 
                   item.getAttribute("href") || "#";
      const description = item.querySelector("description")?.textContent || 
                         item.querySelector("summary")?.textContent || 
                         item.querySelector("content")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || 
                     item.querySelector("published")?.textContent || 
                     item.querySelector("updated")?.textContent || 
                     new Date().toUTCString();
      
      items.push({ title, link, description, pubDate });
    });
    
    return items;
  };

  const generateRss = (items: Array<{ title: string; link: string; description: string; pubDate?: string }>) => {
    const itemsXml = items.map((item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate || new Date().toUTCString()}</pubDate>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`).join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${channelInfo.title}]]></title>
    <link>${channelInfo.link}</link>
    <description><![CDATA[${channelInfo.description}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${channelInfo.link}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;
  };

  const handleConvert = () => {
    if (!input) return;

    try {
      const items = parseXml(input);
      if (items.length === 0) {
        setOutput("Error: No items found in the XML. Make sure your XML contains item, entry, article, post, or news elements.");
      } else {
        setOutput(generateRss(items));
      }
    } catch (e) {
      setOutput("Error: Invalid XML format");
    }
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Error")) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    if (output && !output.startsWith("Error")) {
      const blob = new Blob([output], { type: "application/rss+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "feed.xml";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">XML to RSS Feed Converter</h2>
        <p className="text-sm text-muted-foreground">
          Transform generic XML data into a valid RSS 2.0 feed
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="channelTitle">Channel Title</Label>
              <Input
                id="channelTitle"
                value={channelInfo.title}
                onChange={(e) => setChannelInfo({ ...channelInfo, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="channelLink">Channel Link</Label>
              <Input
                id="channelLink"
                value={channelInfo.link}
                onChange={(e) => setChannelInfo({ ...channelInfo, link: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="channelDesc">Description</Label>
              <Input
                id="channelDesc"
                value={channelInfo.description}
                onChange={(e) => setChannelInfo({ ...channelInfo, description: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">XML Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`<root>
  <item>
    <title>Article Title</title>
    <link>https://example.com/article</link>
    <description>Article description...</description>
  </item>
</root>`}
              className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert to RSS
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Convert
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">RSS Feed Output</h3>
            <div className="flex gap-2">
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
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <pre className={`bg-muted p-3 rounded text-sm font-mono overflow-x-auto whitespace-pre-wrap ${output.startsWith("Error") ? "text-destructive" : ""}`}>
            {output}
          </pre>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Supported XML Formats</h3>
        <p className="text-sm text-muted-foreground mb-3">
          This tool can convert XML containing items with the following element names:
        </p>
        <div className="flex flex-wrap gap-2">
          {["item", "entry", "article", "post", "news"].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-muted rounded-full font-mono text-sm">
              &lt;{tag}&gt;
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Each item should have: title, link, and description elements for best results.
        </p>
      </Card>
    </div>
  );
}
