"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Settings, FileJson } from "lucide-react";

const IconMetadataEditorOptimizer: React.FC = () => {
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    author: "",
    license: "MIT",
    version: "1.0.0",
    tags: "",
    categories: "",
    keywords: "",
    created: new Date().toISOString().split("T")[0],
    modified: new Date().toISOString().split("T")[0],
  });
  const [optimized, setOptimized] = useState(false);
  const [jsonOutput, setJsonOutput] = useState("");

  const licenses = [
    "MIT",
    "Apache-2.0",
    "GPL-3.0",
    "BSD-3-Clause",
    "ISC",
    "Unlicense",
    "CC0-1.0",
    "CC-BY-4.0",
    "Proprietary",
  ];

  const handleOptimize = useCallback(() => {
    const output = {
      icon: {
        name: metadata.name.trim(),
        description: metadata.description.trim(),
        author: metadata.author.trim(),
        license: metadata.license,
        version: metadata.version,
        tags: metadata.tags.split(",").map(t => t.trim()).filter(t => t),
        categories: metadata.categories.split(",").map(c => c.trim()).filter(c => c),
        keywords: metadata.keywords.split(",").map(k => k.trim()).filter(k => k),
        dates: {
          created: metadata.created,
          modified: metadata.modified,
        },
      },
    };

    setJsonOutput(JSON.stringify(output, null, 2));
    setOptimized(true);
  }, [metadata]);

  const handleClear = useCallback(() => {
    setMetadata({
      name: "",
      description: "",
      author: "",
      license: "MIT",
      version: "1.0.0",
      tags: "",
      categories: "",
      keywords: "",
      created: new Date().toISOString().split("T")[0],
      modified: new Date().toISOString().split("T")[0],
    });
    setOptimized(false);
    setJsonOutput("");
  }, []);

  const handleCopy = useCallback(() => {
    if (jsonOutput) {
      navigator.clipboard.writeText(jsonOutput);
    }
  }, [jsonOutput]);

  const handleDownload = useCallback(() => {
    if (!jsonOutput) return;
    
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const link = document.createElement("a");
    link.download = `${metadata.name || "icon"}-metadata.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [jsonOutput, metadata.name]);

  const handleGenerateSvgMetadata = useCallback(() => {
    const svgMetadata = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>${metadata.name || "Icon"}</title>
  <desc>${metadata.description || "Icon description"}</desc>
  <metadata>
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description>
        <dc:title>${metadata.name || "Icon"}</dc:title>
        <dc:creator>${metadata.author || "Unknown"}</dc:creator>
        <dc:rights>${metadata.license}</dc:rights>
        <dc:date>${metadata.created}</dc:date>
      </rdf:Description>
    </rdf:RDF>
  </metadata>
  <!-- Icon paths here -->
</svg>`;

    setJsonOutput(svgMetadata);
    setOptimized(true);
  }, [metadata]);

  const handleGeneratePackageJson = useCallback(() => {
    const packageJson = {
      name: `@icons/${metadata.name.toLowerCase().replace(/\s+/g, "-") || "icon"}`,
      version: metadata.version,
      description: metadata.description,
      author: metadata.author,
      license: metadata.license,
      keywords: metadata.keywords.split(",").map(k => k.trim()).filter(k => k),
      icons: {
        tags: metadata.tags.split(",").map(t => t.trim()).filter(t => t),
        categories: metadata.categories.split(",").map(c => c.trim()).filter(c => c),
      },
    };

    setJsonOutput(JSON.stringify(packageJson, null, 2));
    setOptimized(true);
  }, [metadata]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Icon Metadata Editor & Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Icon Name</Label>
              <Input
                id="name"
                value={metadata.name}
                onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                placeholder="e.g., Home Icon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={metadata.author}
                onChange={(e) => setMetadata({ ...metadata, author: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={metadata.description}
                onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                placeholder="Brief description of the icon"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">License</Label>
              <select
                id="license"
                value={metadata.license}
                onChange={(e) => setMetadata({ ...metadata, license: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                {licenses.map((lic) => (
                  <option key={lic} value={lic}>{lic}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={metadata.version}
                onChange={(e) => setMetadata({ ...metadata, version: e.target.value })}
                placeholder="1.0.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={metadata.tags}
                onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
                placeholder="home, house, building"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Categories (comma-separated)</Label>
              <Input
                id="categories"
                value={metadata.categories}
                onChange={(e) => setMetadata({ ...metadata, categories: e.target.value })}
                placeholder="navigation, interface"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={metadata.keywords}
                onChange={(e) => setMetadata({ ...metadata, keywords: e.target.value })}
                placeholder="main, primary, ui, web"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="created">Created Date</Label>
              <Input
                id="created"
                type="date"
                value={metadata.created}
                onChange={(e) => setMetadata({ ...metadata, created: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modified">Modified Date</Label>
              <Input
                id="modified"
                type="date"
                value={metadata.modified}
                onChange={(e) => setMetadata({ ...metadata, modified: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleOptimize}>
              <FileJson className="w-4 h-4 mr-2" />
              Generate JSON
            </Button>
            <Button onClick={handleGenerateSvgMetadata} variant="outline">
              SVG Metadata
            </Button>
            <Button onClick={handleGeneratePackageJson} variant="outline">
              package.json
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!optimized}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!optimized}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {optimized && jsonOutput && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Generated Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
                    {jsonOutput}
                  </pre>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Metadata Summary:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Name: {metadata.name || "Not specified"}</li>
                  <li>• Author: {metadata.author || "Not specified"}</li>
                  <li>• License: {metadata.license}</li>
                  <li>• Version: {metadata.version}</li>
                  <li>• Tags: {metadata.tags.split(",").filter(t => t.trim()).length || 0}</li>
                  <li>• Categories: {metadata.categories.split(",").filter(c => c.trim()).length || 0}</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IconMetadataEditorOptimizer;
