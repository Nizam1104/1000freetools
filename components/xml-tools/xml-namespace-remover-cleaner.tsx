"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function XmlNamespaceRemoverCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState({
    removeAllNamespaces: true,
    removePrefixes: true,
    keepSpecific: "",
  });

  const removeNamespaces = (xml: string) => {
    let result = xml;

    if (options.removeAllNamespaces) {
      // Remove xmlns declarations
      result = result.replace(/\s*xmlns(?::[\w-]+)?\s*=\s*["'][^"']*["']/gi, "");
      
      // Remove namespace prefixes from elements
      if (options.removePrefixes) {
        result = result.replace(/<([\w-]+):/g, "<");
        result = result.replace(/<\/([\w-]+):/g, "</");
        result = result.replace(/([\w-]+):([\w-]+)=/g, "$2=");
      }
    }

    // Remove specific namespaces if provided
    if (options.keepSpecific) {
      const namespaces = options.keepSpecific.split(",").map((s) => s.trim());
      namespaces.forEach((ns) => {
        const regex = new RegExp(`\\s*xmlns(?::${ns})?\\s*=\\s*["'][^"']*["']`, "gi");
        result = result.replace(regex, "");
      });
    }

    // Clean up multiple spaces
    result = result.replace(/\s+/g, " ");
    
    return result.trim();
  };

  const handleProcess = () => {
    if (!input) return;
    setOutput(removeNamespaces(input));
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
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
        <h2 className="text-2xl font-bold">XML Namespace Remover and Cleaner</h2>
        <p className="text-sm text-muted-foreground">
          Remove XML namespace declarations and prefixes from elements and attributes
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="removeAll"
                checked={options.removeAllNamespaces}
                onChange={(e) => setOptions({ ...options, removeAllNamespaces: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="removeAll" className="text-sm">Remove all namespace declarations</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="removePrefixes"
                checked={options.removePrefixes}
                onChange={(e) => setOptions({ ...options, removePrefixes: e.target.checked })}
                disabled={!options.removeAllNamespaces}
                className="h-4 w-4"
              />
              <Label htmlFor="removePrefixes" className="text-sm">Remove namespace prefixes</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keepSpecific">Keep Specific Namespaces (comma-separated)</Label>
            <Input
              id="keepSpecific"
              value={options.keepSpecific}
              onChange={(e) => setOptions({ ...options, keepSpecific: e.target.value })}
              placeholder="xsi, xs"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to remove all namespaces
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">XML Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`<root xmlns="http://example.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <xsi:item>Content</xsi:item>
</root>`}
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleProcess} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Remove Namespaces
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleProcess} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Process
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Label className="text-sm text-muted-foreground">Cleaned XML</Label>
              <pre className="font-mono mt-2 whitespace-pre-wrap break-all bg-muted p-3 rounded text-sm">
                {output}
              </pre>
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
        <h3 className="font-semibold mb-2">Example</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Before</div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
{`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns:GetData xmlns:ns="http://example.com"/>
  </soap:Body>
</soap:Envelope>`}
            </pre>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">After</div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
{`<Envelope>
  <Body>
    <GetData/>
  </Body>
</Envelope>`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
