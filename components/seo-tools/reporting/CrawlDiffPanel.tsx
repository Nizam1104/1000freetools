/**
 * Crawl Diff Panel - Compare Two Crawl Snapshots
 */

"use client";

import React, { useMemo, useState } from "react";
import {
  compareCrawls,
  saveSnapshot,
  loadSnapshot,
  listSnapshots,
  deleteSnapshot,
  getLatestTwoSnapshots,
  diffLatestSnapshots,
  formatDiffSummary,
  getTopImprovements,
  getTopDeclines,
  type CrawlDiffResult,
} from "@/lib/seo-tools-lib/siteAnalysis/crawlDiff";
import type { PageData, CrawlSnapshot } from "@/lib/seo-tools-lib/types";

interface CrawlDiffPanelProps {
  pages: PageData[];
  rootUrl: string;
}

export function CrawlDiffPanel({ pages, rootUrl }: CrawlDiffPanelProps) {
  const [selectedSnapshots, setSelectedSnapshots] = useState<{
    older: string | null;
    newer: string | null;
  }>({ older: null, newer: null });
  const [diffResult, setDiffResult] = useState<CrawlDiffResult | null>(null);
  const [expandedSection, setExpandedSection] = useState<
    "added" | "removed" | "changed" | null
  >(null);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  const snapshots = useMemo(() => listSnapshots(rootUrl), [rootUrl]);

  const currentSnapshot: CrawlSnapshot | null = useMemo(() => {
    if (pages.length === 0) return null;
    return {
      crawledAt: new Date().toISOString(),
      rootUrl,
      pages,
    };
  }, [pages, rootUrl]);

  const handleSaveCurrentSnapshot = () => {
    if (!currentSnapshot) return;
    saveSnapshot(currentSnapshot);
    // Refresh snapshot list
    window.location.reload();
  };

  const handleCompareSnapshots = () => {
    if (!selectedSnapshots.older || !selectedSnapshots.newer) return;

    const older = loadSnapshot(selectedSnapshots.older);
    const newer = loadSnapshot(selectedSnapshots.newer);

    if (!older || !newer) return;

    const diff = compareCrawls(older, newer);
    setDiffResult(diff);
  };

  const handleCompareLatest = () => {
    const diff = diffLatestSnapshots(rootUrl);
    if (diff) {
      setDiffResult(diff);
      // Set selected snapshots to the two latest
      if (snapshots.length >= 2) {
        setSelectedSnapshots({
          older: snapshots[1].key,
          newer: snapshots[0].key,
        });
      }
    }
  };

  const handleDeleteSnapshot = (key: string) => {
    if (confirm("Delete this snapshot?")) {
      deleteSnapshot(key);
      window.location.reload();
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Save Current Snapshot */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Save Current Crawl
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Save the current crawl snapshot to compare with future crawls.
        </p>
        <button
          onClick={handleSaveCurrentSnapshot}
          disabled={pages.length === 0}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Current Snapshot
        </button>
        {pages.length === 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Run a crawl first to save a snapshot
          </p>
        )}
      </div>

      {/* Stored Snapshots */}
      {snapshots.length > 0 && (
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Stored Snapshots
          </h3>
          <div className="space-y-2">
            {snapshots.map((snapshot) => (
              <div
                key={snapshot.key}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="snapshot-older"
                    value={snapshot.key}
                    checked={selectedSnapshots.older === snapshot.key}
                    onChange={(e) =>
                      setSelectedSnapshots((prev) => ({
                        ...prev,
                        older: e.target.value,
                      }))
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  <input
                    type="radio"
                    name="snapshot-newer"
                    value={snapshot.key}
                    checked={selectedSnapshots.newer === snapshot.key}
                    onChange={(e) =>
                      setSelectedSnapshots((prev) => ({
                        ...prev,
                        newer: e.target.value,
                      }))
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {formatDate(snapshot.timestamp)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {snapshot.pageCount} pages • {snapshot.rootUrl}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSnapshot(snapshot.key)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete snapshot"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Select two snapshots (older and newer) to compare
          </p>
        </div>
      )}

      {/* Compare Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleCompareSnapshots}
          disabled={!selectedSnapshots.older || !selectedSnapshots.newer}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Compare Selected
        </button>
        {snapshots.length >= 2 && (
          <button
            onClick={handleCompareLatest}
            className="px-4 py-2 bg-card border border-border text-foreground rounded-md hover:bg-secondary transition-colors"
          >
            Compare Latest Two
          </button>
        )}
      </div>

      {/* Diff Results */}
      {diffResult && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-secondary border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Comparison Summary
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {formatDiffSummary(diffResult)}
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[var(--chart-1)]/10 border border-[var(--chart-1)]/30 rounded-lg">
                <div className="text-2xl font-bold text-[var(--chart-1)]">
                  +{diffResult.summary.totalAdded}
                </div>
                <div className="text-xs text-[var(--chart-1)] uppercase tracking-wide mt-1">
                  Added
                </div>
              </div>

              <div className="text-center p-4 bg-[var(--chart-4)]/10 border border-[var(--chart-4)]/30 rounded-lg">
                <div className="text-2xl font-bold text-[var(--chart-4)]">
                  -{diffResult.summary.totalRemoved}
                </div>
                <div className="text-xs text-[var(--chart-4)] uppercase tracking-wide mt-1">
                  Removed
                </div>
              </div>

              <div className="text-center p-4 bg-[var(--chart-3)]/10 border border-[var(--chart-3)]/30 rounded-lg">
                <div className="text-2xl font-bold text-[var(--chart-3)]">
                  {diffResult.summary.totalChanged}
                </div>
                <div className="text-xs text-[var(--chart-3)] uppercase tracking-wide mt-1">
                  Changed
                </div>
              </div>
            </div>

            {diffResult.summary.avgScoreChange !== 0 && (
              <div className="mt-4 text-center">
                <span
                  className={`text-sm font-medium ${
                    diffResult.summary.avgScoreChange > 0
                      ? "text-[var(--chart-1)]"
                      : "text-[var(--chart-4)]"
                  }`}
                >
                  {diffResult.summary.avgScoreChange > 0 ? "+" : ""}
                  {diffResult.summary.avgScoreChange} average score change
                </span>
              </div>
            )}
          </div>

          {/* Top Improvements */}
          {getTopImprovements(diffResult).length > 0 && (
            <div className="bg-[var(--chart-1)]/10 border border-[var(--chart-1)]/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                📈 Top Score Improvements
              </h3>
              <div className="space-y-2">
                {getTopImprovements(diffResult, 5).map((pc) => (
                  <div
                    key={pc.url}
                    className="flex items-center justify-between p-3 bg-card border border-border rounded-md"
                  >
                    <span
                      className="text-sm text-foreground truncate flex-1"
                      title={pc.url}
                    >
                      {pc.url}
                    </span>
                    <span className="text-sm font-medium text-[var(--chart-1)]">
                      +{pc.scoreChange}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Declines */}
          {getTopDeclines(diffResult).length > 0 && (
            <div className="bg-[var(--chart-4)]/10 border border-[var(--chart-4)]/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                📉 Top Score Declines
              </h3>
              <div className="space-y-2">
                {getTopDeclines(diffResult, 5).map((pc) => (
                  <div
                    key={pc.url}
                    className="flex items-center justify-between p-3 bg-card border border-border rounded-md"
                  >
                    <span
                      className="text-sm text-foreground truncate flex-1"
                      title={pc.url}
                    >
                      {pc.url}
                    </span>
                    <span className="text-sm font-medium text-[var(--chart-4)]">
                      {pc.scoreChange}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Added Pages */}
          <div className="bg-secondary border border-border rounded-lg p-6">
            <button
              onClick={() =>
                setExpandedSection(expandedSection === "added" ? null : "added")
              }
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-foreground">
                Added Pages ({diffResult.added.length})
              </h3>
              <svg
                className={`w-5 h-5 transition-transform ${
                  expandedSection === "added" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedSection === "added" && (
              <div className="mt-4 space-y-2">
                {diffResult.added.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No pages added
                  </p>
                ) : (
                  diffResult.added.map((url) => (
                    <div
                      key={url}
                      className="p-3 bg-card border border-border rounded-md text-sm text-foreground"
                    >
                      {url}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Removed Pages */}
          <div className="bg-secondary border border-border rounded-lg p-6">
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === "removed" ? null : "removed",
                )
              }
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-foreground">
                Removed Pages ({diffResult.removed.length})
              </h3>
              <svg
                className={`w-5 h-5 transition-transform ${
                  expandedSection === "removed" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedSection === "removed" && (
              <div className="mt-4 space-y-2">
                {diffResult.removed.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No pages removed
                  </p>
                ) : (
                  diffResult.removed.map((url) => (
                    <div
                      key={url}
                      className="p-3 bg-card border border-border rounded-md text-sm text-foreground"
                    >
                      {url}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Changed Pages */}
          <div className="bg-secondary border border-border rounded-lg p-6">
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === "changed" ? null : "changed",
                )
              }
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-foreground">
                Changed Pages ({diffResult.changed.length})
              </h3>
              <svg
                className={`w-5 h-5 transition-transform ${
                  expandedSection === "changed" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedSection === "changed" && (
              <div className="mt-4 space-y-2">
                {diffResult.changed.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No pages changed
                  </p>
                ) : (
                  diffResult.changed.map((change) => {
                    const pageChange = diffResult.pageChanges.find(
                      (pc) => pc.url === change.url,
                    );
                    return (
                      <div
                        key={change.url}
                        className="p-3 bg-card border border-border rounded-md"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-sm font-medium truncate flex-1 text-foreground"
                            title={change.url}
                          >
                            {change.url}
                          </span>
                          {pageChange && (
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full border ${
                                pageChange.scoreChange > 0
                                  ? "bg-[var(--chart-1)]/10 text-[var(--chart-1)] border-[var(--chart-1)]/30"
                                  : pageChange.scoreChange < 0
                                    ? "bg-[var(--chart-4)]/10 text-[var(--chart-4)] border-[var(--chart-4)]/30"
                                    : "bg-muted text-muted-foreground border-border"
                              }`}
                            >
                              {pageChange.scoreChange > 0 ? "+" : ""}
                              {pageChange.scoreChange}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Changes: {change.fieldChanges.join(", ")}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Snapshots */}
      {snapshots.length === 0 && (
        <div className="bg-secondary border border-border rounded-lg p-8 text-center">
          <svg
            className="w-12 h-12 text-muted-foreground mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-muted-foreground">
            No snapshots saved yet. Save your first crawl to start tracking
            changes over time.
          </p>
        </div>
      )}
    </div>
  );
}
