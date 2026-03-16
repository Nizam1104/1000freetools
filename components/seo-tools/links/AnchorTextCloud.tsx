"use client";

import { useMemo, useState } from "react";
import { PageData } from "@/lib/seo-tools-lib/types";

interface AnchorTextCloudProps {
  pages: PageData[];
}

interface AnchorEntry {
  text: string;
  count: number;
  percentage: number;
  isGeneric: boolean;
}

const GENERIC_ANCHORS = new Set([
  "click here",
  "read more",
  "learn more",
  "more",
  "here",
  "link",
  "this",
  "page",
  "website",
  "site",
  "info",
  "click",
  "go",
  "next",
  "previous",
  "back",
  "home",
  "contact",
  "about",
  "services",
  "products",
  "privacy policy",
  "terms of service",
  "sitemap",
  "rss",
  "subscribe",
  "sign up",
  "login",
  "register",
  "download",
  "buy now",
  "shop now",
  "view all",
  "see more",
  "continue reading",
]);

export function AnchorTextCloud({ pages }: AnchorTextCloudProps) {
  const [viewMode, setViewMode] = useState<"cloud" | "table">("cloud");
  const [minCount, setMinCount] = useState(1);

  const anchorData = useMemo(() => {
    const anchorMap = new Map<string, { count: number; isGeneric: boolean }>();
    let totalLinks = 0;

    for (const page of pages) {
      for (const link of page.internalLinksTo) {
        totalLinks++;
        const anchorText =
          new URL(link, page.url).pathname.split("/").pop() || "link";
        const normalized = anchorText
          .toLowerCase()
          .replace(/[-_]/g, " ")
          .trim();
        const existing = anchorMap.get(anchorText) || {
          count: 0,
          isGeneric: GENERIC_ANCHORS.has(normalized),
        };
        existing.count++;
        anchorMap.set(anchorText, existing);
      }
    }

    const entries: AnchorEntry[] = Array.from(anchorMap.entries())
      .filter(([, data]) => data.count >= minCount)
      .map(([text, data]) => ({
        text,
        count: data.count,
        percentage: totalLinks > 0 ? (data.count / totalLinks) * 100 : 0,
        isGeneric: data.isGeneric,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      entries,
      totalLinks,
      genericCount: entries
        .filter((e) => e.isGeneric)
        .reduce((sum, e) => sum + e.count, 0),
    };
  }, [pages, minCount]);

  const maxCount = anchorData.entries[0]?.count || 1;

  const getCloudSize = (count: number): string => {
    const ratio = count / maxCount;
    if (ratio > 0.85) return "text-[22px] font-medium";
    if (ratio > 0.7) return "text-[18px] font-medium";
    if (ratio > 0.5) return "text-[15px]";
    if (ratio > 0.3) return "text-[13px]";
    return "text-[11.5px]";
  };

  return (
    <div className="font-sans text-foreground py-2">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[15px] font-medium leading-snug">
            Anchor text distribution
          </h2>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            Internal link anchor analysis
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Min count */}
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span>Min</span>
            <input
              type="number"
              value={minCount}
              onChange={(e) =>
                setMinCount(Math.max(1, Number(e.target.value) || 1))
              }
              min={1}
              className="w-12 bg-background border border-border rounded px-2 py-1 text-[12px] text-center text-foreground"
            />
          </div>

          {/* View toggle */}
          <div className="flex text-[12px]">
            <button
              onClick={() => setViewMode("cloud")}
              className={`px-3 py-1.5 border border-border rounded-l-md transition-colors ${
                viewMode === "cloud"
                  ? "bg-accent text-foreground font-medium border-border"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              Cloud
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 border border-l-0 border-border rounded-r-md transition-colors ${
                viewMode === "table"
                  ? "bg-accent text-foreground font-medium"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <StatCard
          label="Internal links"
          value={anchorData.totalLinks.toLocaleString()}
          accent="purple"
        />
        <StatCard
          label="Unique anchors"
          value={anchorData.entries.length.toString()}
          accent="green"
        />
        <StatCard
          label="Generic anchors"
          value={anchorData.genericCount.toString()}
          accent={anchorData.genericCount > 0 ? "coral" : "green"}
        />
      </div>

      {/* Main content */}
      {anchorData.entries.length === 0 ? (
        <div className="border border-border rounded-xl flex items-center justify-center h-48 text-muted-foreground text-sm">
          No anchor text data matches the filter
        </div>
      ) : viewMode === "cloud" ? (
        <CloudView
          entries={anchorData.entries}
          maxCount={maxCount}
          getCloudSize={getCloudSize}
        />
      ) : (
        <TableView entries={anchorData.entries} maxCount={maxCount} />
      )}

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        <LegendItem color="purple" label="Descriptive anchor" />
        <LegendItem color="coral" label='Generic anchor (e.g. "click here")' />
      </div>
    </div>
  );
}

/* ─── Stat Card ─────────────────────────────────────────────────────────── */

type AccentColor = "purple" | "green" | "coral";

const accentStyles: Record<AccentColor, { bar: string; value: string }> = {
  purple: { bar: "bg-[#7F77DD]", value: "text-[#534AB7] dark:text-[#AFA9EC]" },
  green: { bar: "bg-[#1D9E75]", value: "text-[#0F6E56] dark:text-[#5DCAA5]" },
  coral: { bar: "bg-[#D85A30]", value: "text-[#993C1D] dark:text-[#F0997B]" },
};

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: AccentColor;
}) {
  const styles = accentStyles[accent];
  return (
    <div className="relative bg-accent/50 rounded-lg px-3 py-2.5 overflow-hidden">
      <div
        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg ${styles.bar}`}
      />
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1 pl-1">
        {label}
      </div>
      <div
        className={`text-[22px] font-medium leading-none font-mono pl-1 ${styles.value}`}
      >
        {value}
      </div>
    </div>
  );
}

/* ─── Cloud View ────────────────────────────────────────────────────────── */

function CloudView({
  entries,
  maxCount,
  getCloudSize,
}: {
  entries: AnchorEntry[];
  maxCount: number;
  getCloudSize: (count: number) => string;
}) {
  return (
    <div className="border border-border rounded-xl bg-card p-6 min-h-[280px] flex flex-wrap gap-2 items-center justify-center content-center">
      {entries.map((entry) => (
        <span
          key={entry.text}
          title={`${entry.text}: ${entry.count} links (${entry.percentage.toFixed(1)}%)`}
          className={`
            inline-block px-2.5 py-1 rounded-full cursor-default
            transition-transform duration-150 hover:scale-105
            ${getCloudSize(entry.count)}
            ${
              entry.isGeneric
                ? "bg-[#D85A30]/10 text-[#993C1D] border border-[#D85A30]/30 dark:text-[#F0997B] dark:border-[#F0997B]/30 dark:bg-[#F0997B]/10"
                : "bg-accent text-foreground border border-border"
            }
          `}
        >
          {entry.text}
        </span>
      ))}
    </div>
  );
}

/* ─── Table View ────────────────────────────────────────────────────────── */

function TableView({
  entries,
  maxCount,
}: {
  entries: AnchorEntry[];
  maxCount: number;
}) {
  const total = entries.reduce((s, e) => s + e.count, 0);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <table className="w-full text-[13px]" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "18%" }} />
        </colgroup>
        <thead>
          <tr className="bg-accent border-b border-border">
            <th className="text-left px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Anchor text
            </th>
            <th className="text-right px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Count
            </th>
            <th className="text-right px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Share
            </th>
            <th className="text-center px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const pct = ((entry.count / total) * 100).toFixed(1);
            const barWidth = Math.round((entry.count / maxCount) * 100);
            return (
              <tr
                key={entry.text}
                className="border-b border-border last:border-0 hover:bg-accent/40 transition-colors"
              >
                <td className="px-3.5 py-2.5 font-mono text-[12px] text-foreground truncate">
                  {entry.text}
                </td>
                <td className="px-3.5 py-2.5 text-right tabular-nums text-muted-foreground">
                  {entry.count}
                </td>
                <td className="px-3.5 py-2.5">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-muted-foreground tabular-nums">
                      {pct}%
                    </span>
                    <div className="w-14 h-1 bg-accent rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${entry.isGeneric ? "bg-[#D85A30] dark:bg-[#F0997B]" : "bg-[#7F77DD] dark:bg-[#AFA9EC]"}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-3.5 py-2.5 text-center">
                  {entry.isGeneric ? (
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#D85A30]/10 text-[#993C1D] dark:bg-[#F0997B]/15 dark:text-[#F0997B]">
                      Generic
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#534AB7]/10 text-[#534AB7] dark:bg-[#AFA9EC]/15 dark:text-[#AFA9EC]">
                      Descriptive
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Legend Item ───────────────────────────────────────────────────────── */

function LegendItem({
  color,
  label,
}: {
  color: "purple" | "coral";
  label: string;
}) {
  const dot =
    color === "purple"
      ? "bg-[#7F77DD] dark:bg-[#AFA9EC]"
      : "bg-[#D85A30] dark:bg-[#F0997B]";
  return (
    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
      <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
      {label}
    </div>
  );
}

export default AnchorTextCloud;
