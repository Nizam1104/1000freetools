"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonPaginationGeneratorPage() {
  const [totalItems, setTotalItems] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const generatePagination = useCallback(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    const response = {
      data: data.trim() ? JSON.parse(data) : [],
      pagination: {
        page: currentPage,
        limit: itemsPerPage,
        total: totalItems,
        totalPages,
        hasPrev,
        hasNext,
        prevPage: hasPrev ? currentPage - 1 : null,
        nextPage: hasNext ? currentPage + 1 : null
      }
    };

    setResult(JSON.stringify(response, null, 2));
    toast.success("Pagination wrapper generated");
  }, [totalItems, currentPage, itemsPerPage, data]);

  const clearAll = () => {
    setResult(null);
    setData("");
  };

  const loadSampleData = () => {
    setData(JSON.stringify(
      Array.from({ length: itemsPerPage }, (_, i) => ({
        id: (currentPage - 1) * itemsPerPage + i + 1,
        name: `Item ${(currentPage - 1) * itemsPerPage + i + 1}`
      }))
    , null, 2));
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Pagination result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "paginated.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Pagination result downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Pagination Generator – Add Pagination to JSON</h1>
          <p className="text-muted-foreground">
            Wrap JSON data with standard pagination metadata including page, limit, and total count. Our free JSON Pagination Generator helps you quickly prototype paginated API responses.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="total" className="text-sm whitespace-nowrap">Total Items:</Label>
                  <Input
                    id="total"
                    type="number"
                    value={totalItems}
                    onChange={(e) => setTotalItems(parseInt(e.target.value) || 0)}
                    min={1}
                    className="w-24 h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="page" className="text-sm whitespace-nowrap">Page:</Label>
                  <Input
                    id="page"
                    type="number"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(parseInt(e.target.value) || 1)}
                    min={1}
                    className="w-20 h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="limit" className="text-sm whitespace-nowrap">Per Page:</Label>
                  <Input
                    id="limit"
                    type="number"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value) || 10)}
                    min={1}
                    className="w-20 h-9"
                  />
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSampleData}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample Data
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={generatePagination}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="data" className="text-sm font-medium text-muted-foreground mb-2 block">
              Data Array (optional)
            </Label>
            <Textarea
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder='[{"id": 1, "name": "Item 1"}]'
              className="min-h-[150px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Paginated Response
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Pagination Generator</h2>
          <p className="text-muted-foreground mb-6">
            Building paginated API responses requires consistent metadata structure. Manually calculating total pages, next page links, and previous page numbers gets repetitive during development. This JSON Pagination Generator wraps your data with standard pagination fields so you can prototype responses quickly.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Enter your total item count, current page number, and items per page in the control inputs at the top. Optionally paste your actual data array into the Data Array field, or click Sample Data to generate placeholder items.
          </p>
          <p className="text-muted-foreground mb-8">
            Click Generate and the tool creates a response object with your data plus pagination metadata including page, limit, total, totalPages, hasPrev, hasNext, prevPage, and nextPage fields. Copy or download the result for use in your API mockups.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Frontend developers building pagination UI components need realistic API responses to test their implementations. Backend developers can use this to standardize response formats across different endpoints before writing the actual pagination logic.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool generates client-side mock data only. For production APIs, implement proper database-level pagination with LIMIT and OFFSET queries. This generator is meant for prototyping, testing, and documentation purposes.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div><p className="font-medium mb-1">What pagination format does this use?</p><p className="text-muted-foreground">It uses a common offset-based format with page numbers, item limits, and boolean flags for navigation.</p></div>
            <div><p className="font-medium mb-1">Can I use this for cursor-based pagination?</p><p className="text-muted-foreground">No. This tool generates page-number-based pagination. Cursor-based pagination requires different metadata like cursor tokens.</p></div>
            <div><p className="font-medium mb-1">Do I need to provide actual data?</p><p className="text-muted-foreground">No. The data array is optional. Leave it empty and the generator creates a response with just the pagination metadata.</p></div>
            <div><p className="font-medium mb-1">How are prevPage and nextPage calculated?</p><p className="text-muted-foreground">prevPage shows the previous page number or null if on page 1. nextPage shows the next page number or null if on the last page.</p></div>
            <div><p className="font-medium mb-1">Can I customize the field names?</p><p className="text-muted-foreground">Not currently. The output uses standard field names. You can manually edit the result or use the JSON Transformer to rename fields.</p></div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/json-tools/json-generator" className="text-primary hover:underline">JSON Generator</a> – Create mock JSON data with custom schemas</li>
            <li><a href="/json-tools/json-transformer" className="text-primary hover:underline">JSON Transformer</a> – Reshape and restructure JSON data</li>
            <li><a href="/json-tools/json-to-typescript" className="text-primary hover:underline">JSON to TypeScript</a> – Generate TypeScript interfaces from JSON</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
