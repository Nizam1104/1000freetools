"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Search, Trash2 } from "lucide-react";

const IconSearchEngineDuplicateFinder: React.FC = () => {
  const [iconList, setIconList] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const [similarIcons, setSimilarIcons] = useState<{ name: string; similar: string[] }[]>([]);
  const [searched, setSearched] = useState(false);

  const sampleIcons = `home-icon.svg
user-icon.svg
settings-icon.svg
home.svg
user-profile.svg
settings.svg
close-icon.png
close.svg
menu-icon.svg
menu.svg
search-icon.svg
search.svg
arrow-left.svg
arrow-right.svg
arrow-up.svg
arrow-down.svg
download-icon.svg
upload-icon.svg
edit-icon.svg
delete-icon.svg
add-icon.svg
remove-icon.svg`;

  const handleAnalyze = useCallback(() => {
    if (!iconList.trim()) return;

    const icons = iconList.split("\n").map(i => i.trim()).filter(i => i);
    
    // Find exact duplicates (by name without extension)
    const nameMap = new Map<string, string[]>();
    icons.forEach(icon => {
      const name = icon.replace(/\.(svg|png|ico|jpg)$/i, "").toLowerCase();
      if (!nameMap.has(name)) {
        nameMap.set(name, []);
      }
      nameMap.get(name)?.push(icon);
    });

    const foundDuplicates: string[] = [];
    const foundSimilar: { name: string; similar: string[] }[] = [];

    nameMap.forEach((files, name) => {
      if (files.length > 1) {
        foundDuplicates.push(...files);
        foundSimilar.push({ name, similar: files });
      }
    });

    // Find similar names
    const checked = new Set<string>();
    icons.forEach((icon1, i) => {
      const name1 = icon1.replace(/\.(svg|png|ico|jpg)$/i, "").toLowerCase();
      if (checked.has(name1)) return;

      const similar: string[] = [];
      icons.forEach((icon2, j) => {
        if (i === j) return;
        const name2 = icon2.replace(/\.(svg|png|ico|jpg)$/i, "").toLowerCase();
        
        // Simple similarity check
        if (name1.includes(name2) || name2.includes(name1) || 
            levenshteinDistance(name1, name2) <= 2) {
          similar.push(icon2);
        }
      });

      if (similar.length > 0 && !foundDuplicates.includes(icon1)) {
        foundSimilar.push({ name: icon1, similar });
      }
      checked.add(name1);
    });

    setDuplicates([...new Set(foundDuplicates)]);
    setSimilarIcons(foundSimilar);
    setSearched(true);
  }, [iconList]);

  const handleClear = useCallback(() => {
    setIconList("");
    setSearchTerm("");
    setDuplicates([]);
    setSimilarIcons([]);
    setSearched(false);
  }, []);

  const handleLoadSample = useCallback(() => {
    setIconList(sampleIcons);
    setSearched(false);
  }, []);

  const handleCopyReport = useCallback(() => {
    let report = "Icon Analysis Report\n==================\n\n";
    
    if (duplicates.length > 0) {
      report += "DUPLICATES FOUND:\n";
      report += duplicates.join("\n");
      report += "\n\n";
    }

    if (similarIcons.length > 0) {
      report += "SIMILAR ICONS:\n";
      similarIcons.forEach(item => {
        report += `${item.name}: ${item.similar.join(", ")}\n`;
      });
    }

    navigator.clipboard.writeText(report);
  }, [duplicates, similarIcons]);

  const handleDownload = useCallback(() => {
    let content = "Icon Analysis Report\n==================\n\n";
    
    if (duplicates.length > 0) {
      content += "DUPLICATES FOUND:\n";
      content += duplicates.join("\n");
      content += "\n\n";
    }

    if (similarIcons.length > 0) {
      content += "SIMILAR ICONS:\n";
      similarIcons.forEach(item => {
        content += `${item.name}: ${item.similar.join(", ")}\n`;
      });
    }

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "icon-analysis-report.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [duplicates, similarIcons]);

  // Simple Levenshtein distance for similarity check
  const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    return matrix[b.length][a.length];
  };

  const filteredIcons = searchTerm
    ? iconList.split("\n").filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Icon Search Engine & Duplicate Finder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="iconList">Icon List (one per line)</Label>
            <Textarea
              id="iconList"
              value={iconList}
              onChange={(e) => setIconList(e.target.value)}
              placeholder="Paste your icon file names here..."
              rows={10}
            />
            <div className="flex gap-2">
              <Button onClick={handleLoadSample} variant="outline" size="sm">
                Load Sample
              </Button>
              <span className="text-xs text-gray-500 self-center">
                {iconList.split("\n").filter(i => i.trim()).length} icons listed
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="searchTerm">Quick Search</Label>
            <Input
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter icons..."
            />
            {filteredIcons.length > 0 && (
              <div className="text-xs text-gray-500">
                Found: {filteredIcons.length} icons
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAnalyze} disabled={!iconList.trim()}>
              <Search className="w-4 h-4 mr-2" />
              Analyze for Duplicates
            </Button>
            <Button onClick={handleCopyReport} variant="outline" disabled={!searched}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Report
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!searched}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {searched && (
            <div className="space-y-4">
              {duplicates.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-red-600">
                      <Trash2 className="w-4 h-4" />
                      Duplicates Found ({duplicates.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {duplicates.map((icon, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                        >
                          {icon}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {similarIcons.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-orange-600">
                      <Search className="w-4 h-4" />
                      Similar Icons ({similarIcons.length} groups)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {similarIcons.map((item, i) => (
                        <div key={i} className="p-2 bg-orange-50 rounded">
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            Similar to: {item.similar.join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {duplicates.length === 0 && similarIcons.length === 0 && (
                <div className="p-4 border rounded-lg bg-green-50 text-center">
                  <p className="text-green-700">✓ No duplicates or similar icons found!</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IconSearchEngineDuplicateFinder;
