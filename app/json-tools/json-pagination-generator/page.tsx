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
      </div>
    </div>
  );
}
