/**
 * Export Panel - CSV and PDF Export UI
 */

"use client";

import React, { useMemo, useState } from "react";
import {
  downloadCsv,
  downloadPdfHtml,
  openReportForPrint,
  calculateSiteScore,
} from "@/lib/seo-tools-lib/exporters";
import type { PageData } from "@/lib/seo-tools-lib/types";

interface ExportPanelProps {
  pages: PageData[];
}

export function ExportPanel({ pages }: ExportPanelProps) {
  const [exporting, setExporting] = useState<"csv" | "pdf" | null>(null);

  const siteScore = useMemo(() => calculateSiteScore(pages), [pages]);

  const stats = useMemo(() => {
    const totalIssues = pages.reduce((sum, p) => sum + p.issues.length, 0);
    const criticalIssues = pages.reduce(
      (sum, p) =>
        sum + p.issues.filter((i) => i.severity === "critical").length,
      0,
    );
    const warningIssues = pages.reduce(
      (sum, p) => sum + p.issues.filter((i) => i.severity === "warning").length,
      0,
    );
    const totalWords = pages.reduce((sum, p) => sum + p.wordCount, 0);

    return {
      totalPages: pages.length,
      totalIssues,
      criticalIssues,
      warningIssues,
      totalWords,
    };
  }, [pages]);

  const handleExportCsv = () => {
    setExporting("csv");
    try {
      downloadCsv(pages);
    } catch (error) {
      console.error("Failed to export CSV:", error);
    } finally {
      setExporting(null);
    }
  };

  const handleExportPdf = () => {
    setExporting("pdf");
    try {
      downloadPdfHtml(pages, siteScore);
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setExporting(null);
    }
  };

  const handlePrintReport = () => {
    setExporting("pdf");
    try {
      openReportForPrint(pages, siteScore);
    } catch (error) {
      console.error("Failed to open report:", error);
    } finally {
      setExporting(null);
    }
  };

  if (pages.length === 0) {
    return (
      <div className="bg-secondary border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">
          No pages to export. Run a crawl first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Export Options
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* CSV Export */}
          <button
            onClick={handleExportCsv}
            disabled={exporting === "csv"}
            className="flex flex-col items-start p-4 bg-card border border-border rounded-lg hover:border-muted-foreground hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-6 h-6 text-[var(--chart-1)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="font-medium text-foreground">Export CSV</span>
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Download all page data as a spreadsheet-compatible CSV file
            </p>
            {exporting === "csv" && (
              <span className="text-xs text-muted-foreground mt-2">
                Exporting...
              </span>
            )}
          </button>

          {/* PDF Export */}
          <button
            onClick={handleExportPdf}
            disabled={exporting === "pdf"}
            className="flex flex-col items-start p-4 bg-card border border-border rounded-lg hover:border-muted-foreground hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-6 h-6 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium text-foreground">
                Download PDF Report
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Download a formatted HTML report (open in browser, then print to
              PDF)
            </p>
            {exporting === "pdf" && (
              <span className="text-xs text-muted-foreground mt-2">
                Generating...
              </span>
            )}
          </button>

          {/* Print Report */}
          <button
            onClick={handlePrintReport}
            disabled={exporting === "pdf"}
            className="flex flex-col items-start p-4 bg-card border border-border rounded-lg hover:border-muted-foreground hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-6 h-6 text-[var(--chart-2)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span className="font-medium text-foreground">Print Report</span>
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Open report in new window and print immediately
            </p>
          </button>
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Report Summary
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {stats.totalPages}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Pages
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--chart-1)]">
              {siteScore}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Avg Score
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {stats.totalIssues}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Total Issues
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {stats.criticalIssues}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Critical
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--chart-3)]">
              {stats.warningIssues}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Warnings
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {stats.totalWords.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Total Words
            </div>
          </div>
        </div>
      </div>

      {/* CSV Columns Preview */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          CSV Columns
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "URL",
            "Status Code",
            "SEO Score",
            "Issues Count",
            "Critical Issues",
            "Warning Issues",
            "Notice Issues",
            "Word Count",
            "Title",
            "Title Length",
            "Meta Description",
            "Meta Description Length",
            "H1 Count",
            "H1 Text",
            "Canonical URL",
            "Has Schema",
            "Schema Types",
            "Internal Links",
            "External Links",
            "Images",
            "Images Without Alt",
            "No Index",
            "No Follow",
            "HTTPS",
            "Response Time",
            "Crawled At",
          ].map((col) => (
            <span
              key={col}
              className="px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground"
            >
              {col}
            </span>
          ))}
        </div>
      </div>

      {/* PDF Report Preview */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          PDF Report Includes
        </h3>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--chart-1)] mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-foreground">
              Overall site health score with visual ring
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--chart-1)] mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-foreground">
              Summary statistics cards
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--chart-1)] mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-foreground">
              Top 10 most frequent issues
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--chart-1)] mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-foreground">
              Pages with most issues table
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--chart-1)] mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-foreground">
              Pages with lowest scores
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[var(--chart-1)] mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-foreground">
              Complete pages summary table
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
