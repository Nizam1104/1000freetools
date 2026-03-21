"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Mail, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard } from "./csv-utils";

interface EmailResult {
  email: string;
  domain: string;
  valid: boolean;
  sourceColumn: string;
}

export default function CsvEmailExtractor() {
  const [inputText, setInputText] = useState<string>("");
  const [emails, setEmails] = useState<EmailResult[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [deduplicate, setDeduplicate] = useState<boolean>(true);
  const [validateEmails, setValidateEmails] = useState<boolean>(true);
  const [domainFilter, setDomainFilter] = useState<string>("");
  const [excludeDomains, setExcludeDomains] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<"list" | "csv">("list");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      } catch (error) {
        toast.error("Failed to read file");
      }
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      file.text().then((text) => {
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const extractEmails = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);
      const foundEmails: EmailResult[] = [];
      const excludeDomainList = excludeDomains
        .split(",")
        .map((d) => d.trim().toLowerCase())
        .filter((d) => d.length > 0);

      // Search all columns for email addresses
      headers.forEach((header) => {
        data.forEach((row) => {
          const value = String(row[header] || "");
          
          // Find all email addresses in the cell value
          const emailMatches = value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g);
          
          if (emailMatches) {
            emailMatches.forEach((email) => {
              const cleanEmail = email.toLowerCase().trim();
              const domain = cleanEmail.split("@")[1] || "";
              
              // Validate email format
              const isValid = !validateEmails || emailRegex.test(cleanEmail);
              
              // Check domain filter (include)
              if (domainFilter && !domain.endsWith(domainFilter.toLowerCase())) {
                return;
              }
              
              // Check excluded domains
              if (excludeDomainList.some((excluded) => domain.endsWith(excluded))) {
                return;
              }
              
              foundEmails.push({
                email: cleanEmail,
                domain,
                valid: isValid,
                sourceColumn: header,
              });
            });
          }
        });
      });

      // Deduplicate if requested
      let resultEmails = foundEmails;
      if (deduplicate) {
        const seen = new Set<string>();
        resultEmails = foundEmails.filter((item) => {
          if (seen.has(item.email)) {
            return false;
          }
          seen.add(item.email);
          return true;
        });
      }

      setEmails(resultEmails);
      toast.success(`Found ${resultEmails.length} email address(es)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Extraction failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, deduplicate, validateEmails, domainFilter, excludeDomains]);

  const copyToClipboardHandler = useCallback(async () => {
    if (emails.length === 0) return;
    
    const textToCopy = outputFormat === "list" 
      ? emails.map((e) => e.email).join("\n")
      : `email,domain,valid\n${emails.map((e) => `${e.email},${e.domain},${e.valid}`).join("\n")}`;
    
    try {
      await copyToClipboard(textToCopy);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [emails, outputFormat]);

  const downloadOutput = useCallback(() => {
    if (emails.length === 0) return;
    
    const content = outputFormat === "list" 
      ? emails.map((e) => e.email).join("\n")
      : `email,domain,valid\n${emails.map((e) => `${e.email},${e.domain},${e.valid}`).join("\n")}`;
    
    const blob = new Blob([content], { 
      type: outputFormat === "list" ? "text/plain" : "text/csv" 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputFormat === "list" ? "emails.txt" : "emails.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded file");
  }, [emails, outputFormat]);

  const clearAll = useCallback(() => {
    setInputText("");
    setEmails([]);
    setDomainFilter("");
    setExcludeDomains("");
  }, []);

  const getStats = useCallback(() => {
    if (emails.length === 0) return null;
    
    const validCount = emails.filter((e) => e.valid).length;
    const invalidCount = emails.length - validCount;
    const uniqueDomains = new Set(emails.map((e) => e.domain)).size;
    
    // Top domains
    const domainCounts: Record<string, number> = {};
    emails.forEach((e) => {
      domainCounts[e.domain] = (domainCounts[e.domain] || 0) + 1;
    });
    const topDomains = Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    return { validCount, invalidCount, uniqueDomains, topDomains };
  }, [emails]);

  const stats = getStats();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">CSV Input</Label>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear
            </Button>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-md p-6 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Mail className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop a CSV file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste CSV data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste CSV data here...&#10;name,email,company&#10;John,john@example.com,Acme&#10;Jane,jane@gmail.com,Tech"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Extraction Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="deduplicate"
                checked={deduplicate}
                onCheckedChange={(checked) => setDeduplicate(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="deduplicate" className="text-sm font-medium cursor-pointer">
                  Deduplicate Emails
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Remove duplicate email addresses
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="validateEmails"
                checked={validateEmails}
                onCheckedChange={(checked) => setValidateEmails(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="validateEmails" className="text-sm font-medium cursor-pointer">
                  Validate Email Format
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Check if emails match standard format
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="domainFilter" className="text-sm">Include Only Domain</Label>
              <Input
                id="domainFilter"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                placeholder="e.g., gmail.com, company.com"
                className="max-w-xs"
              />
              <p className="text-xs text-muted-foreground">
                Only extract emails from this domain
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excludeDomains" className="text-sm">Exclude Domains</Label>
              <Input
                id="excludeDomains"
                value={excludeDomains}
                onChange={(e) => setExcludeDomains(e.target.value)}
                placeholder="e.g., spam.com, fake.com"
                className="max-w-xs"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of domains to exclude
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Extract Button */}
        <section>
          <Button
            onClick={extractEmails}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Extracting..." : "Extract Emails"}
          </Button>
        </section>

        {/* Stats Section */}
        {stats && (
          <section>
            <Label className="text-base mb-3 block">Extraction Results</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{emails.length}</p>
                <p className="text-xs text-muted-foreground">Total Emails</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.validCount}</p>
                <p className="text-xs text-muted-foreground">Valid Format</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{stats.invalidCount}</p>
                <p className="text-xs text-muted-foreground">Invalid Format</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.uniqueDomains}</p>
                <p className="text-xs text-muted-foreground">Unique Domains</p>
              </div>
            </div>

            {stats.topDomains.length > 0 && (
              <div className="mt-4 p-4 border rounded-md">
                <Label className="text-sm mb-2 block">Top Domains</Label>
                <div className="flex flex-wrap gap-2">
                  {stats.topDomains.map(([domain, count]) => (
                    <span
                      key={domain}
                      className="px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      {domain} ({count})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Output Section */}
        {emails.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Extracted Emails</Label>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2 mr-4">
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="outputFormat"
                      value="list"
                      checked={outputFormat === "list"}
                      onChange={() => setOutputFormat("list")}
                      className="w-4 h-4"
                    />
                    <span>List</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="outputFormat"
                      value="csv"
                      checked={outputFormat === "csv"}
                      onChange={() => setOutputFormat("csv")}
                      className="w-4 h-4"
                    />
                    <span>CSV</span>
                  </label>
                </div>
                <Button variant="outline" size="sm" onClick={copyToClipboardHandler}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadOutput}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="max-h-[400px] overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-medium">Email</th>
                      <th className="text-left p-3 font-medium">Domain</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.slice(0, 100).map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3 font-mono">{item.email}</td>
                        <td className="p-3">{item.domain}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              item.valid
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {item.valid ? "Valid" : "Invalid"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {emails.length > 100 && (
                <div className="p-3 bg-muted/30 text-center text-sm text-muted-foreground">
                  Showing first 100 of {emails.length} emails. Download to see all.
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
