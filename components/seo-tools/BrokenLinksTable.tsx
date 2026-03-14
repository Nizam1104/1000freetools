'use client';

import { BrokenLink } from '../lib/seoAnalyser';

interface Props {
    broken: BrokenLink[];
}

export default function BrokenLinksTable({ broken }: Props) {
    return (
        <div className="overflow-x-auto rounded border border-border">
            <table className="w-full text-sm">
                <thead className="bg-card border-b border-border">
                    <tr>
                        <th className="px-3 py-2 text-left text-xs text-muted-foreground">Broken URL</th>
                        <th className="px-3 py-2 text-left text-xs text-muted-foreground">Status</th>
                        <th className="px-3 py-2 text-left text-xs text-muted-foreground">Error</th>
                        <th className="px-3 py-2 text-left text-xs text-muted-foreground">Linked From</th>
                    </tr>
                </thead>
                <tbody>
                    {broken.map((b) => (
                        <tr key={b.brokenUrl} className="border-b border-border hover:bg-accent/50">
                            <td className="px-3 py-2 max-w-xs truncate text-xs font-mono text-destructive">
                                {b.brokenUrl}
                            </td>
                            <td className="px-3 py-2 text-xs font-mono text-destructive-foreground">
                                {b.statusCode || 'ERR'}
                            </td>
                            <td className="px-3 py-2 text-xs text-muted-foreground/70 max-w-[160px] truncate">
                                {b.error ?? '—'}
                            </td>
                            <td className="px-3 py-2 text-xs text-muted-foreground">
                                {b.referrerCount} page(s)
                                {b.referrers.length > 0 && (
                                    <details className="inline ml-2">
                                        <summary className="cursor-pointer hover:text-foreground">view</summary>
                                        <ul className="mt-1 space-y-0.5">
                                            {b.referrers.slice(0, 5).map((r) => (
                                                <li key={r} className="text-muted-foreground/70 font-mono text-xs truncate max-w-xs">
                                                    {r}
                                                </li>
                                            ))}
                                            {b.referrers.length > 5 && (
                                                <li className="text-muted-foreground/50">…and {b.referrers.length - 5} more</li>
                                            )}
                                        </ul>
                                    </details>
                                )}
                            </td>
                        </tr>
                    ))}
                    {broken.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-3 py-6 text-center text-[var(--chart-1)] text-sm">
                                ✓ No broken links found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
