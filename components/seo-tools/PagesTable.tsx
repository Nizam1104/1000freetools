'use client';

import { useState } from 'react';
import { PageData } from '../lib/seoAnalyser';

interface Props {
    results: PageData[];
    onSelect: (page: PageData) => void;
    selectedUrl: string | null;
}

type SortKey = 'seoScore' | 'statusCode' | 'wordCount' | 'responseTimeMs' | 'issueCount';
type SortDir = 'asc' | 'desc';

export default function PagesTable({ results, onSelect, selectedUrl }: Props) {
    const [sortKey, setSortKey] = useState<SortKey>('seoScore');
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [filter, setFilter] = useState('');

    function toggleSort(key: SortKey) {
        if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        else { setSortKey(key); setSortDir('asc'); }
    }

    const filtered = results.filter(
        (r) =>
            r.url.toLowerCase().includes(filter.toLowerCase()) ||
            r.title?.toLowerCase().includes(filter.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        const av = sortKey === 'issueCount' ? (a.issues?.length ?? 0) : (a[sortKey] as number) ?? 0;
        const bv = sortKey === 'issueCount' ? (b.issues?.length ?? 0) : (b[sortKey] as number) ?? 0;
        return sortDir === 'asc' ? av - bv : bv - av;
    });

    function scoreColor(s: number) {
        if (s >= 80) return 'text-[var(--chart-1)]';
        if (s >= 50) return 'text-[var(--chart-3)]';
        return 'text-destructive';
    }

    function statusColor(code: number) {
        if (code >= 200 && code < 300) return 'text-[var(--chart-1)]';
        if (code >= 300 && code < 400) return 'text-[var(--chart-2)]';
        if (code >= 400) return 'text-destructive';
        return 'text-muted-foreground';
    }

    function Th({ label, k }: { label: string; k: SortKey }) {
        const active = sortKey === k;
        return (
            <th
                className="px-3 py-2 text-left text-xs text-muted-foreground cursor-pointer select-none whitespace-nowrap hover:text-foreground"
                onClick={() => toggleSort(k)}
            >
                {label} {active ? (sortDir === 'asc' ? '▲' : '▼') : ''}
            </th>
        );
    }

    return (
        <div>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Filter by URL or title…"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full bg-card border border-border rounded px-3 py-1.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring"
                />
            </div>
            <div className="overflow-x-auto rounded border border-border">
                <table className="w-full text-sm">
                    <thead className="bg-card border-b border-border">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground">URL</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground">Title</th>
                            <Th label="Score" k="seoScore" />
                            <Th label="Status" k="statusCode" />
                            <Th label="Words" k="wordCount" />
                            <Th label="ms" k="responseTimeMs" />
                            <Th label="Issues" k="issueCount" />
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((r) => (
                            <tr
                                key={r.url}
                                onClick={() => onSelect(r)}
                                className={`border-b border-border cursor-pointer hover:bg-accent/50 transition-colors ${selectedUrl === r.url ? 'bg-accent/30' : ''
                                    }`}
                            >
                                <td className="px-3 py-2 max-w-[200px] truncate text-xs text-foreground font-mono">
                                    {new URL(r.url).pathname || '/'}
                                </td>
                                <td className="px-3 py-2 max-w-[180px] truncate text-xs text-muted-foreground">
                                    {r.title || <span className="text-destructive">No title</span>}
                                </td>
                                <td className={`px-3 py-2 text-xs font-bold font-mono ${scoreColor(r.seoScore ?? 0)}`}>
                                    {r.seoScore ?? '—'}
                                </td>
                                <td className={`px-3 py-2 text-xs font-mono ${statusColor(r.statusCode)}`}>
                                    {r.statusCode || 'ERR'}
                                </td>
                                <td className="px-3 py-2 text-xs text-muted-foreground">
                                    {r.wordCount?.toLocaleString() ?? '—'}
                                </td>
                                <td className="px-3 py-2 text-xs text-muted-foreground/70">
                                    {r.responseTimeMs}
                                </td>
                                <td className="px-3 py-2 text-xs">
                                    {r.issues?.length > 0 ? (
                                        <span className="text-[var(--chart-3)]">{r.issues.length}</span>
                                    ) : (
                                        <span className="text-[var(--chart-1)]">0</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {sorted.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-3 py-6 text-center text-muted-foreground text-sm">
                                    No pages yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-1">{sorted.length} of {results.length} pages</p>
        </div>
    );
}
