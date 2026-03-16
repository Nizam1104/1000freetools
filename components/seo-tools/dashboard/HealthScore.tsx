"use client";

import React, { useMemo } from "react";
import type { PageData } from "@/lib/seo-tools-lib/types";
import { BreakdownRing } from "../shared/ScoreRing";

interface HealthScoreProps {
  pages: PageData[];
}

/**
 * HealthScore component
 * Displays overall site health score with breakdown by severity
 */
export function HealthScore({ pages }: HealthScoreProps) {
  const { score, critical, warning, notice, pass } = useMemo(() => {
    let totalCritical = 0;
    let totalWarning = 0;
    let totalNotice = 0;

    pages.forEach((page) => {
      page.issues.forEach((issue) => {
        if (issue.severity === "critical") totalCritical++;
        else if (issue.severity === "warning") totalWarning++;
        else if (issue.severity === "notice") totalNotice++;
      });
    });

    const passCount = pages.filter(
      (page) => !page.issues.some((issue) => issue.severity === "critical"),
    ).length;

    // Calculate score per page, then average — prevents score collapsing with more pages
    const pageScores = pages.map((page) => {
      let pageCritical = 0;
      let pageWarning = 0;
      let pageNotice = 0;

      page.issues.forEach((issue) => {
        if (issue.severity === "critical") pageCritical++;
        else if (issue.severity === "warning") pageWarning++;
        else if (issue.severity === "notice") pageNotice++;
      });

      // Cap deductions so a single page can't go below 0
      // Critical: -20 pts each (max 5 = -100), Warning: -5 pts, Notice: -1 pt
      return Math.max(
        0,
        100 - pageCritical * 20 - pageWarning * 5 - pageNotice * 1,
      );
    });

    const avgScore =
      pages.length > 0
        ? pageScores.reduce((sum, s) => sum + s, 0) / pages.length
        : 100;

    return {
      score: Math.round(avgScore),
      critical: totalCritical,
      warning: totalWarning,
      notice: totalNotice,
      pass: passCount,
    };
  }, [pages.length]);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Site Health
      </h3>

      <div className="flex justify-start items-center gap-4">
        <BreakdownRing
          critical={critical}
          warning={warning}
          notice={notice}
          pass={pass}
          size={140}
          strokeWidth={14}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--chart-1)]" />
            <span className="text-xs text-muted-foreground">Pass</span>
            <span className="text-sm font-semibold text-foreground">
              {pass}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--chart-2)]" />
            <span className="text-xs text-muted-foreground">Notice</span>
            <span className="text-sm font-semibold text-foreground">
              {notice}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--chart-3)]" />
            <span className="text-xs text-muted-foreground">Warning</span>
            <span className="text-sm font-semibold text-foreground">
              {warning}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Critical</span>
            <span className="text-sm font-semibold text-foreground">
              {critical}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Overall Score</span>
          <span
            className={`text-2xl font-bold ${
              score >= 80
                ? "text-[var(--chart-1)]"
                : score >= 50
                  ? "text-[var(--chart-3)]"
                  : "text-destructive"
            }`}
          >
            {score}/100
          </span>
        </div>
      </div>
    </div>
  );
}
