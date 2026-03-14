"use client";

import { useMemo, useState } from "react";
import { PageData } from "@/lib/seo-tools-lib/types";
import { computeTfIdf } from "@/lib/seo-tools-lib/siteAnalysis/tfidf";

interface TfIdfTableProps {
  pages: PageData[];
}

interface TfIdfEntry {
  term: string;
  tf: number;
  idf: number;
  tfidf: number;
}

interface PageTfIdf {
  url: string;
  terms: TfIdfEntry[];
  topTerms: string[];
}

/**
 * TfIdfTable - Displays TF-IDF analysis for pages
 * Shows top terms per page and site-wide important terms
 */
export function TfIdfTable({ pages }: TfIdfTableProps) {
  const [viewMode, setViewMode] = useState<"page" | "sitewide">("sitewide");
  const [selectedPageUrl, setSelectedPageUrl] = useState<string>("");
  const [topN, setTopN] = useState(20);

  // Compute TF-IDF for all pages
  const tfIdfData = useMemo(() => {
    if (pages.length === 0) return { pageResults: [], siteWideTerms: [] };
    const pageResults = computeTfIdf(pages);

    // Aggregate site-wide terms with additional stats
    const termStats = new Map<
      string,
      { total: number; count: number; totalTf: number }
    >();
    for (const pageTfIdf of pageResults) {
      for (const entry of pageTfIdf.terms) {
        const existing = termStats.get(entry.term) || {
          total: 0,
          count: 0,
          totalTf: 0,
        };
        existing.total += entry.tfidf;
        existing.count += 1;
        existing.totalTf += entry.tf;
        termStats.set(entry.term, existing);
      }
    }

    const siteWideTerms = Array.from(termStats.entries())
      .map(([term, stats]) => ({
        term,
        tf: 0,
        idf: 0,
        tfidf: stats.total / stats.count,
        pageCount: stats.count,
        avgTf: stats.totalTf / stats.count,
      }))
      .sort((a, b) => b.tfidf - a.tfidf)
      .slice(0, topN);

    return { pageResults, siteWideTerms };
  }, [pages, topN]);

  // Get site-wide top terms
  const siteWideTerms = useMemo(() => {
    return tfIdfData.siteWideTerms;
  }, [tfIdfData]);

  // Get page-specific TF-IDF
  const pageTfIdf = useMemo(() => {
    if (!selectedPageUrl && pages.length > 0) {
      setSelectedPageUrl(pages[0].url);
    }
    const result = tfIdfData.pageResults.find(
      (p: PageTfIdf) => p.url === selectedPageUrl,
    );
    return result;
  }, [tfIdfData.pageResults, selectedPageUrl, pages]);

  // Page selector options
  const pageOptions = useMemo(() => {
    return pages.map((p) => ({
      url: p.url,
      title: p.title || new URL(p.url).pathname,
    }));
  }, [pages]);

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-300">
          TF-IDF Analysis
          <span className="ml-2 text-xs text-zinc-500">
            {viewMode === "sitewide" ? "Site-wide terms" : "Per-page terms"}
          </span>
        </h3>
        <div className="flex gap-3 text-xs">
          <div className="flex border border-zinc-700 rounded overflow-hidden">
            <button
              onClick={() => setViewMode("sitewide")}
              className={`px-3 py-1 transition-colors ${
                viewMode === "sitewide"
                  ? "bg-zinc-700 text-zinc-100"
                  : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Site-wide
            </button>
            <button
              onClick={() => setViewMode("page")}
              className={`px-3 py-1 transition-colors ${
                viewMode === "page"
                  ? "bg-zinc-700 text-zinc-100"
                  : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Per Page
            </button>
          </div>
          <label className="flex items-center gap-2 text-zinc-400">
            <span>Top N:</span>
            <input
              type="number"
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
              min={5}
              max={50}
              step={5}
              className="w-16 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-zinc-300"
            />
          </label>
        </div>
      </div>

      {/* Content */}
      {pages.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-zinc-600">
          <p>No pages to analyze</p>
        </div>
      ) : viewMode === "sitewide" ? (
        /* Site-wide View */
        <div>
          <div className="mb-4 text-xs text-zinc-500">
            <p>
              Most important terms across all {pages.length} pages, ranked by
              average TF-IDF score. These terms represent the core topics of
              your site.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-zinc-800 text-zinc-400">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Rank</th>
                  <th className="text-left px-4 py-2 font-medium">Term</th>
                  <th className="text-right px-4 py-2 font-medium">
                    Avg TF-IDF
                  </th>
                  <th className="text-right px-4 py-2 font-medium">Pages</th>
                  <th className="text-right px-4 py-2 font-medium">Avg TF</th>
                  <th className="text-right px-4 py-2 font-medium">IDF</th>
                </tr>
              </thead>
              <tbody>
                {siteWideTerms.map(
                  (
                    entry: TfIdfEntry & { pageCount: number; avgTf: number },
                    idx: number,
                  ) => (
                    <tr
                      key={entry.term}
                      className="border-t border-zinc-800 hover:bg-zinc-800/30"
                    >
                      <td className="px-4 py-2 text-zinc-400">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-700 text-zinc-300">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-zinc-300 font-medium">
                          {entry.term}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span className="text-emerald-400 font-mono">
                          {entry.tfidf.toFixed(4)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span className="text-zinc-400">{entry.pageCount}</span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span className="text-zinc-500 font-mono">
                          {entry.avgTf.toFixed(4)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span className="text-zinc-500 font-mono">
                          {entry.idf.toFixed(4)}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Per-Page View */
        <div>
          {/* Page Selector */}
          <div className="mb-4">
            <label className="text-xs text-zinc-400 block mb-2">
              Select Page:
            </label>
            <select
              value={selectedPageUrl}
              onChange={(e) => setSelectedPageUrl(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500"
            >
              {pageOptions.map((opt) => (
                <option key={opt.url} value={opt.url}>
                  {opt.title}
                </option>
              ))}
            </select>
          </div>

          {pageTfIdf ? (
            <div>
              <div className="mb-4 text-xs text-zinc-500">
                <p>
                  Top terms for this page ranked by TF-IDF score. Higher scores
                  indicate terms that are important to this page relative to the
                  rest of the site.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-zinc-800 text-zinc-400">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium">Rank</th>
                      <th className="text-left px-4 py-2 font-medium">Term</th>
                      <th className="text-right px-4 py-2 font-medium">
                        TF-IDF
                      </th>
                      <th className="text-right px-4 py-2 font-medium">TF</th>
                      <th className="text-right px-4 py-2 font-medium">IDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageTfIdf.terms
                      .slice(0, topN)
                      .map((entry: TfIdfEntry, idx: number) => (
                        <tr
                          key={entry.term}
                          className="border-t border-zinc-800 hover:bg-zinc-800/30"
                        >
                          <td className="px-4 py-2 text-zinc-400">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-700 text-zinc-300">
                              {idx + 1}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <span className="text-zinc-300 font-medium">
                              {entry.term}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <span className="text-emerald-400 font-mono">
                              {entry.tfidf.toFixed(4)}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <span className="text-zinc-500 font-mono">
                              {entry.tf.toFixed(4)}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <span className="text-zinc-500 font-mono">
                              {entry.idf.toFixed(4)}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {pageTfIdf.topTerms.length > 0 && (
                <div className="mt-4 p-3 bg-zinc-800/30 rounded text-xs">
                  <div className="text-zinc-500 mb-2">Top 5 Terms Summary:</div>
                  <div className="flex flex-wrap gap-2">
                    {pageTfIdf.topTerms
                      .slice(0, 5)
                      .map((term: string, idx: number) => (
                        <span
                          key={term}
                          className="px-2 py-1 rounded bg-zinc-700 text-zinc-300"
                        >
                          <span className="text-zinc-500 mr-1">#{idx + 1}</span>
                          {term}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-zinc-600">
              <p>Select a page to view TF-IDF analysis</p>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 bg-zinc-800/30 rounded text-xs text-zinc-500">
        <p>
          <strong>TF-IDF (Term Frequency-Inverse Document Frequency):</strong> A
          statistical measure that evaluates how important a word is to a
          document relative to a collection. High TF-IDF scores indicate terms
          that are distinctive and important to specific pages.
        </p>
      </div>
    </div>
  );
}

export default TfIdfTable;
