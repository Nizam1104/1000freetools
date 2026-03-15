'use client';

import { useMemo, useState, useCallback } from 'react';
import { PageData } from '@/lib/seo-tools-lib/types';
import { GraphCanvas } from 'reagraph';
import type { GraphNode, GraphEdge } from 'reagraph';

interface InternalLinkGraphProps {
  pages: PageData[];
  rootUrl: string;
}

/**
 * InternalLinkGraph - Force-directed graph showing internal link topology
 * Uses reagraph library for interactive visualization
 */
export function InternalLinkGraph({ pages, rootUrl }: InternalLinkGraphProps) {
  const [showEdgeLabels, setShowEdgeLabels] = useState(false);

  // Build nodes and edges for reagraph
  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map<string, GraphNode>();
    const edgeList: GraphEdge[] = [];

    // Create nodes for all pages
    for (const page of pages) {
      // Use inboundCount from PageData (populated after crawl)
      const inbound = page.inboundCount ?? 0;
      // Size based on inbound links (more inbound = larger node)
      const size = Math.max(1, Math.min(10, 1 + inbound * 0.5));

      // Color by SEO score
      let fill = 'var(--chart-1)'; // green for score >= 80
      if (page.seoScore < 60) {
        fill = 'var(--destructive)'; // red
      } else if (page.seoScore < 80) {
        fill = 'var(--chart-3)'; // amber/yellow
      }

      nodeMap.set(page.url, {
        id: page.url,
        label: page.title?.slice(0, 25) || new URL(page.url).pathname,
        size,
        fill,
        data: {
          url: page.url,
          seoScore: page.seoScore,
          inboundCount: inbound,
        },
      });
    }

    // Create edges from internal links
    for (const page of pages) {
      for (const targetUrl of page.internalLinksTo) {
        // Only create edge if target exists in our crawled pages
        if (nodeMap.has(targetUrl)) {
          edgeList.push({
            id: `${page.url}->${targetUrl}`,
            source: page.url,
            target: targetUrl,
            fill: 'var(--muted-foreground)', // edge color
          });
        }
      }
    }

    return { nodes: Array.from(nodeMap.values()), edges: edgeList };
  }, [pages]);

  // Handle node click to open page detail
  const handleNodeClick = useCallback((node: unknown) => {
    const nodeObj = node as { id: string; data?: { url?: string } };
    const url = nodeObj.data?.url || nodeObj.id;
    // Dispatch custom event for parent to handle
    window.dispatchEvent(new CustomEvent('page-select', { detail: { url } }));
  }, []);

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        <p>No pages to display</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      {/* Controls */}
      <div className="flex gap-4 mb-4 text-xs">
        <label className="flex items-center gap-2 text-muted-foreground">
          <input
            type="checkbox"
            checked={showEdgeLabels}
            onChange={(e) => setShowEdgeLabels(e.target.checked)}
            className="rounded border-border bg-accent"
          />
          Show edge labels
        </label>
        <div className="ml-auto text-muted-foreground">
          {nodes.length} pages • {edges.length} internal links
        </div>
      </div>

      {/* Graph */}
      <div className="h-[600px] border border-border rounded overflow-hidden bg-card">
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          layoutType="forceatlas2"
          sizingType="default"
          defaultNodeSize={5}
          minNodeSize={2}
          maxNodeSize={15}
          labelType="auto"
          onNodeClick={handleNodeClick}
          animated
          draggable
        />
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
        <span>Node size = inbound links</span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[var(--chart-1)] inline-block"></span>
          Score ≥80
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[var(--chart-3)] inline-block"></span>
          Score 60-79
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-destructive inline-block"></span>
          Score &lt;60
        </span>
      </div>
    </div>
  );
}

export default InternalLinkGraph;
