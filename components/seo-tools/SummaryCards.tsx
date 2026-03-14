'use client';

import { PageData } from '@/lib/seo-tools-lib/seoAnalyser';

interface Props {
    results: PageData[];
    visitedCount: number;
    queueCount: number;
    isCrawling: boolean;
}

export default function SummaryCards({ results, visitedCount, queueCount, isCrawling }: Props) {
    const total = results.length;
    const avgScore = total
        ? Math.round(results.reduce((s, r) => s + (r.seoScore ?? 0), 0) / total)
        : 0;
    const brokenCount = results.filter((r) => r.statusCode >= 400 || r.statusCode === 0).length;
    const issueCount = results.reduce((s, r) => s + (r.issues?.length ?? 0), 0);

    const scoreColor =
        avgScore >= 80 ? 'text-[var(--chart-1)]' : avgScore >= 50 ? 'text-[var(--chart-3)]' : 'text-destructive';

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <StatCard
                label="Pages Crawled"
                value={isCrawling ? `${visitedCount} / ~${visitedCount + queueCount}` : String(total)}
                sub={isCrawling ? 'crawling…' : 'total pages'}
                color="text-[var(--chart-2)]"
            />
            <StatCard
                label="Avg SEO Score"
                value={total ? `${avgScore}/100` : '—'}
                sub="across all pages"
                color={total ? scoreColor : 'text-muted-foreground'}
            />
            <StatCard
                label="Broken Links"
                value={String(brokenCount)}
                sub="4xx / 5xx / errors"
                color={brokenCount > 0 ? 'text-destructive' : 'text-[var(--chart-1)]'}
            />
            <StatCard
                label="Issues Found"
                value={String(issueCount)}
                sub="across all pages"
                color={issueCount > 0 ? 'text-[var(--chart-3)]' : 'text-[var(--chart-1)]'}
            />
        </div>
    );
}

function StatCard({
    label,
    value,
    sub,
    color,
}: {
    label: string;
    value: string;
    sub: string;
    color: string;
}) {
    return (
        <div className="bg-card border border-border rounded p-3">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className={`text-2xl font-bold font-mono ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">{sub}</p>
        </div>
    );
}
