"use client";

/**
 * UrlTree – URL visualiser with two modes:
 *   1. Graph View  – reagraph force-directed graph showing internal linking
 *   2. Tree View   – lightweight file/folder tree (original behaviour)
 *
 * Design goals:
 *  • Persistent: the component is CSS-hidden rather than unmounted when the
 *    tab is inactive.
 *  • The graph uses reagraph with internal linking edges derived from
 *    PageData.internalLinksTo.
 *  • The tree view is the original lightweight recursive renderer.
 */

import React, { memo, useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { UrlTreeNode, buildUrlTree } from "@/lib/seo-tools-lib/seoAnalyser";
import { PageData } from "@/lib/seo-tools-lib/seoAnalyser";

// ─── Reagraph is a client-only 3-D canvas lib – load it dynamically ───────────

const GraphCanvas = dynamic(
  () => import("reagraph").then((m) => m.GraphCanvas),
  { ssr: false, loading: () => <GraphLoading /> },
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface UrlTreeProps {
  /** All crawled page results. Pass an empty array before crawl starts. */
  results: PageData[];
  /** Whether a crawl is currently running (used for a progress indicator). */
  isCrawling: boolean;
  /** The root URL that was crawled, e.g. "https://example.com". */
  rootUrl: string;
}

type ViewMode = "graph" | "tree";
type GraphLayout = "forceDirected2d" | "circular2d" | "concentric2d";

const GRAPH_LAYOUTS: {
  id: GraphLayout;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "forceDirected2d",
    label: "Force",
    icon: "⚡",
    description: "Force-directed physics simulation",
  },
  {
    id: "circular2d",
    label: "Circular",
    icon: "⭕",
    description: "Nodes arranged in a circle",
  },
  {
    id: "concentric2d",
    label: "Concentric",
    icon: "🎯",
    description: "Nodes grouped in concentric rings by link depth",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Shorten a full URL to a displayable label */
function shortLabel(url: string, origin: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname === "/" ? "/" : u.pathname.replace(/\/$/, "");
    return path || "/";
  } catch {
    return url.replace(origin, "") || "/";
  }
}

/** Stable sanitised node id (reagraph needs string ids without slashes etc.) */
function nodeId(url: string): string {
  // Use btoa for a compact, stable id
  return url;
}

// ─── Graph loading placeholder ────────────────────────────────────────────────

function GraphLoading() {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
      <span className="animate-spin text-xl">⚙</span>
      <span>Loading graph engine…</span>
    </div>
  );
}

// ─── Internal-Link Graph View ─────────────────────────────────────────────────

interface GraphViewProps {
  results: PageData[];
  rootUrl: string;
  isCrawling: boolean;
}

const GraphView = memo(function GraphView({
  results,
  rootUrl,
  isCrawling,
}: GraphViewProps) {
  const origin = useMemo(() => {
    try {
      return new URL(rootUrl).origin;
    } catch {
      return rootUrl;
    }
  }, [rootUrl]);

  const [graphLayout, setGraphLayout] =
    useState<GraphLayout>("forceDirected2d");

  // Build nodes + edges from results & their internalLinksTo
  const { nodes, edges } = useMemo(() => {
    if (results.length === 0) return { nodes: [], edges: [] };

    const crawledSet = new Set(results.map((r) => r.url));

    const graphNodes = results.map((r) => ({
      id: nodeId(r.url),
      label: shortLabel(r.url, origin),
      // colour nodes by SEO score bucket
      fill:
        r.seoScore >= 80
          ? "var(--chart-1)" // green
          : r.seoScore >= 50
            ? "var(--chart-3)" // yellow
            : "var(--destructive)", // red
      data: r,
    }));

    const edgeSet = new Set<string>();
    const graphEdges: {
      id: string;
      source: string;
      target: string;
      label?: string;
    }[] = [];

    results.forEach((r) => {
      (r.internalLinksTo ?? []).forEach((target) => {
        if (!crawledSet.has(target)) return; // skip un-crawled targets
        const eid = `${r.url}-->${target}`;
        if (!edgeSet.has(eid)) {
          edgeSet.add(eid);
          graphEdges.push({
            id: eid,
            source: nodeId(r.url),
            target: nodeId(target),
          });
        }
      });
    });

    return { nodes: graphNodes, edges: graphEdges };
  }, [results, origin]);

  const [selectedNode, setSelectedNode] = useState<PageData | null>(null);

  if (nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
        {isCrawling ? (
          <>
            <span className="text-3xl animate-spin">🕷</span>
            <span className="text-sm animate-pulse">Building link graph…</span>
          </>
        ) : (
          <>
            <span className="text-3xl">🔗</span>
            <span className="text-sm">No pages crawled yet</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* Graph canvas */}
      <div style={{ flex: 1, height: "100%", background: "transparent" }}>
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          layoutType={graphLayout}
          labelType="nodes"
          edgeArrowPosition="end"
          theme={{
            canvas: { background: "var(--card)" },
            node: {
              fill: "var(--primary)",
              activeFill: "var(--primary)",
              opacity: 1,
              selectedOpacity: 1,
              inactiveOpacity: 0.2,
              label: {
                color: "var(--foreground)",
                stroke: "var(--card)",
                activeColor: "var(--foreground)",
              },
            },
            ring: {
              fill: "var(--primary)",
              activeFill: "var(--primary)",
            },
            lasso: {
              border: "1px solid var(--primary)",
              background: "var(--primary)/10",
            },
            edge: {
              fill: "var(--border)",
              activeFill: "var(--primary)",
              opacity: 0.5,
              selectedOpacity: 1,
              inactiveOpacity: 0.1,
              label: {
                color: "var(--muted-foreground)",
                activeColor: "var(--foreground)",
              },
            },
            arrow: {
              fill: "var(--muted-foreground)",
              activeFill: "var(--primary)",
            },
            cluster: {
              stroke: "var(--border)",
              opacity: 1,
              selectedOpacity: 1,
              inactiveOpacity: 0.2,
              label: {
                color: "var(--muted-foreground)",
              },
            },
          }}
          onNodeClick={(node) => {
            const data = node.data as PageData;
            setSelectedNode((prev) => (prev?.url === data.url ? null : data));
          }}
        />
      </div>

      {/* Legend */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 bg-card/80 backdrop-blur border border-border rounded-lg p-3 text-xs text-muted-foreground">
        <span className="text-foreground font-semibold mb-1">SEO Score</span>
        <LegendItem color="var(--chart-1)" label="≥ 80 (Good)" />
        <LegendItem color="var(--chart-3)" label="50–79 (Fair)" />
        <LegendItem color="var(--destructive)" label="< 50 (Poor)" />
        <div className="mt-2 border-t border-border pt-2 text-muted-foreground">
          <div>{nodes.length} nodes</div>
          <div>{edges.length} edges</div>
        </div>
      </div>

      {/* Graph Layout Picker */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-card/90 backdrop-blur border border-border rounded-xl p-1 shadow-xl">
        {GRAPH_LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            onClick={() => setGraphLayout(layout.id)}
            title={layout.description}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              graphLayout === layout.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            <span>{layout.icon}</span>
            <span>{layout.label}</span>
          </button>
        ))}
      </div>

      {/* Crawling indicator */}
      {isCrawling && (
        <div className="absolute top-3 right-3 bg-[var(--chart-3)]/10 border border-[var(--chart-3)]/30 text-[var(--chart-3)] text-xs rounded-full px-3 py-1 animate-pulse">
          ● Live crawl
        </div>
      )}

      {/* Node detail panel */}
      {selectedNode && (
        <NodeDetailPanel
          page={selectedNode}
          origin={origin}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
});

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      <span>{label}</span>
    </div>
  );
}

// ─── Node detail side panel ───────────────────────────────────────────────────

function NodeDetailPanel({
  page,
  origin,
  onClose,
}: {
  page: PageData;
  origin: string;
  onClose: () => void;
}) {
  const scoreColor =
    page.seoScore >= 80
      ? "var(--chart-1)"
      : page.seoScore >= 50
        ? "var(--chart-3)"
        : "var(--destructive)";

  return (
    <div className="absolute top-0 right-0 h-full w-72 bg-card/95 backdrop-blur border-l border-border flex flex-col shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-accent/60">
        <span className="text-xs font-semibold text-foreground truncate flex-1 mr-2">
          {shortLabel(page.url, origin)}
        </span>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground text-sm transition-colors flex-shrink-0"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Score ring */}
      <div className="flex flex-col items-center py-4 border-b border-border/50">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4"
          style={{ borderColor: scoreColor, color: scoreColor }}
        >
          {page.seoScore}
        </div>
        <span className="text-xs text-muted-foreground mt-1">SEO Score</span>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-xs">
        <DetailRow label="URL">
          <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline font-mono break-all"
          >
            {page.url}
          </a>
        </DetailRow>
        <DetailRow label="Title">
          <span className="text-foreground">{page.title || "—"}</span>
        </DetailRow>
        <DetailRow label="Status">
          <span
            className={
              page.statusCode < 400
                ? "text-[var(--chart-1)]"
                : "text-destructive"
            }
          >
            {page.statusCode}
          </span>
        </DetailRow>
        <DetailRow label="Words">
          <span className="text-foreground">{page.wordCount}</span>
        </DetailRow>
        <DetailRow label="Internal links">
          <span className="text-foreground">{page.internalLinkCount}</span>
        </DetailRow>
        <DetailRow label="External links">
          <span className="text-foreground">{page.externalLinkCount}</span>
        </DetailRow>

        {page.issues.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-1 font-semibold">
              Issues ({page.issues.length})
            </p>
            <ul className="space-y-1">
              {page.issues.map((iss, i) => (
                <li key={i} className="flex items-start gap-1 text-destructive">
                  <span>⚠</span>
                  <span>{iss.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-muted-foreground block mb-0.5">{label}</span>
      {children}
    </div>
  );
}

// ─── Tree View (original file/folder structure) ───────────────────────────────

interface NodeProps {
  node: UrlTreeNode;
  depth: number;
  expanded: Set<string>;
  toggle: (path: string) => void;
}

/** Rendered with memo so sibling collapses don't re-render the whole tree. */
const TreeNode = memo(function TreeNode({
  node,
  depth,
  expanded,
  toggle,
}: NodeProps) {
  const isExpanded = expanded.has(node.path);
  const hasChildren = node.children.length > 0;

  const badgeColour =
    node.urls.length === 0
      ? "text-muted-foreground"
      : node.urls.length < 3
        ? "text-muted-foreground"
        : "text-[var(--chart-1)]";

  return (
    <li>
      <div
        className="flex items-center gap-1 py-0.5 px-1 rounded group cursor-pointer hover:bg-accent select-none"
        style={{ paddingLeft: `${depth * 14 + 4}px` }}
        onClick={() => hasChildren && toggle(node.path)}
        role={hasChildren ? "button" : undefined}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <span
          className={`text-xs w-3 text-muted-foreground transition-transform duration-150 ${
            hasChildren ? "opacity-100" : "opacity-0"
          } ${isExpanded ? "rotate-90" : ""}`}
        >
          ▶
        </span>
        <span className="text-xs">
          {hasChildren ? (isExpanded ? "📂" : "📁") : "📄"}
        </span>
        <span className="text-xs text-foreground font-mono truncate max-w-xs">
          {node.name || "/"}
        </span>
        {node.urls.length > 0 && (
          <span className={`ml-1 text-xs ${badgeColour}`}>
            ({node.urls.length})
          </span>
        )}
        {hasChildren && !isExpanded && (
          <span className="ml-auto text-xs text-muted-foreground group-hover:text-foreground">
            {node.children.length} sub
          </span>
        )}
      </div>

      {isExpanded && node.urls.length > 0 && node.children.length === 0 && (
        <ul className="mt-0.5 mb-1">
          {node.urls.map((u) => (
            <li
              key={u}
              style={{ paddingLeft: `${(depth + 1) * 14 + 4}px` }}
              className="py-0.5"
            >
              <a
                href={u}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-sky-400 font-mono truncate block max-w-lg"
                title={u}
              >
                {u}
              </a>
            </li>
          ))}
        </ul>
      )}

      {isExpanded && hasChildren && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
});

// ─── Stats bar ────────────────────────────────────────────────────────────────

const StatsBar = memo(function StatsBar({
  totalUrls,
  totalSections,
  isCrawling,
}: {
  totalUrls: number;
  totalSections: number;
  isCrawling: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-border text-xs text-muted-foreground">
      <span>
        🌐 <span className="text-foreground font-mono">{totalUrls}</span> URLs
        indexed
      </span>
      <span>
        📁 <span className="text-foreground font-mono">{totalSections}</span>{" "}
        sections
      </span>
      {isCrawling && (
        <span className="ml-auto text-[var(--chart-3)] animate-pulse">
          ● Crawling…
        </span>
      )}
    </div>
  );
});

// ─── Tree root renderer ───────────────────────────────────────────────────────

interface TreeViewProps {
  tree: UrlTreeNode;
  rootUrl: string;
  isCrawling: boolean;
}

function TreeView({ tree, rootUrl, isCrawling }: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["/"]));

  const toggle = useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const paths = new Set<string>(["/"]);
    function collect(n: UrlTreeNode) {
      paths.add(n.path);
      n.children.forEach(collect);
    }
    tree.children.forEach(collect);
    setExpanded(paths);
  }, [tree]);

  const collapseAll = useCallback(() => setExpanded(new Set(["/"])), []);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <span className="text-xs text-muted-foreground font-mono truncate flex-1">
          {rootUrl}
        </span>
        <button
          onClick={expandAll}
          className="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-2 py-0.5 transition-colors"
        >
          Expand all
        </button>
        <button
          onClick={collapseAll}
          className="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-2 py-0.5 transition-colors"
        >
          Collapse all
        </button>
      </div>

      {/* Tree */}
      <div className="overflow-y-auto flex-1 py-2">
        <ul className="select-none">
          <li>
            <div
              className="flex items-center gap-1 py-0.5 px-1 rounded cursor-pointer hover:bg-accent"
              style={{ paddingLeft: "4px" }}
              onClick={() => toggle("/")}
            >
              <span
                className={`text-xs w-3 text-muted-foreground transition-transform duration-150 ${
                  expanded.has("/") ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
              <span className="text-xs">🌐</span>
              <span className="text-xs text-foreground font-mono font-semibold">
                {tree.name}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                ({tree.children.length} sections)
              </span>
            </div>

            {expanded.has("/") && (
              <ul>
                {tree.children.map((child) => (
                  <TreeNode
                    key={child.path}
                    node={child}
                    depth={1}
                    expanded={expanded}
                    toggle={toggle}
                  />
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UrlTree({
  results,
  isCrawling,
  rootUrl,
}: UrlTreeProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("graph");

  const tree = useMemo(() => {
    if (!rootUrl || results.length === 0) return null;
    const urls = results.map((r) => r.url);
    try {
      const origin = new URL(rootUrl).origin;
      return buildUrlTree(urls, origin);
    } catch {
      return null;
    }
  }, [results, rootUrl]);

  const { totalUrls, totalSections } = useMemo(() => {
    if (!tree) return { totalUrls: 0, totalSections: 0 };
    let urls = 0;
    let sections = 0;
    function walk(n: UrlTreeNode) {
      urls += n.urls.length;
      sections += n.children.length;
      n.children.forEach(walk);
    }
    walk(tree);
    return { totalUrls: urls, totalSections: sections };
  }, [tree]);

  // ─── Empty states ──────────────────────────────────────────────────────────

  if (!rootUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-3xl mb-3">🗺️</p>
        <p className="text-sm">Start a crawl to build the URL graph</p>
      </div>
    );
  }

  if (results.length === 0 && isCrawling) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-3xl mb-3 animate-spin">🕷</p>
        <p className="text-sm animate-pulse">Building URL map…</p>
      </div>
    );
  }

  if (!tree && !isCrawling) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-sm">No pages found yet</p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Stats bar */}
      <StatsBar
        totalUrls={totalUrls}
        totalSections={totalSections}
        isCrawling={isCrawling}
      />

      {/* View toggle tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-card">
        <ViewToggleBtn
          active={viewMode === "graph"}
          onClick={() => setViewMode("graph")}
          icon="⬡"
          label="Link Graph"
        />
        <ViewToggleBtn
          active={viewMode === "tree"}
          onClick={() => setViewMode("tree")}
          icon="📁"
          label="Folder Tree"
        />
      </div>

      {/* Graph view */}
      <div
        style={{
          display: viewMode === "graph" ? "block" : "none",
          position: "relative",
          flexGrow: 1,
          height: 0 /* forces flex item to respect flexGrow without overflow */,
        }}
      >
        <GraphView
          results={results}
          rootUrl={rootUrl}
          isCrawling={isCrawling}
        />
      </div>

      {/* Tree view */}
      <div
        style={{
          display: viewMode === "tree" ? "block" : "none",
          flexGrow: 1,
          height: 0,
          overflow: "auto",
        }}
      >
        {tree ? (
          <TreeView tree={tree} rootUrl={rootUrl} isCrawling={isCrawling} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-sm">No pages found yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── View toggle button ───────────────────────────────────────────────────────

function ViewToggleBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      }`}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
