"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  buildBrokenLinks,
  normaliseUrl,
  analysePage,
  PageData,
  BrokenLink,
} from "@/lib/seo-tools-lib/seoAnalyser";
import {
  runCrawl,
  createCrawlState,
  CrawlState,
} from "@/lib/seo-tools-lib/utils";
import SummaryCards from "@/components/seo-tools/SummaryCards";
import PagesTable from "@/components/seo-tools/PagesTable";
import IssuesTable from "@/components/seo-tools/IssuesTable";
import BrokenLinksTable from "@/components/seo-tools/BrokenLinksTable";
import PageDetail from "@/components/seo-tools/PageDetail";
import UrlTree from "@/components/seo-tools/UrlTree";
import {
  HealthScore,
  StatusCodeChart,
  PageDepthChart,
} from "@/components/seo-tools/dashboard";
import {
  AnchorTextCloud,
  RedirectChainList,
} from "@/components/seo-tools/links";
import {
  DuplicateContentPanel,
  CannibalizationTable,
  TfIdfTable,
} from "@/components/seo-tools/content";
import {
  SitemapAuditPanel,
  RobotsAuditPanel,
  PageRankSimulator,
} from "@/components/seo-tools/siteStructure";
import { ExportPanel, CrawlDiffPanel } from "@/components/seo-tools/reporting";
import { useRefreshWarning } from "@/hooks/confirm-refresh";
import SEOAuditorSEO from "@/components/seo-content/seo-tools/seo-auditor";

const WORKER_URL = process.env.NEXT_PUBLIC_CF_WORKER_BASE_URL;

// ─── Session token stored in memory only (not cookies) ────────────────────────
let inMemorySessionToken: string | null = null;
function getSessionToken() { return inMemorySessionToken; }
function setSessionToken(t: string | null) { inMemorySessionToken = t; }

type Tab =
  | "dashboard"
  | "pages"
  | "issues"
  | "broken"
  | "links"
  | "content"
  | "site-structure"
  | "URL Tree"
  | "reports";

type Mode = "site-audit" | "single-page";

// ─── Single-Page SEO Report rendered inline ───────────────────────────────────
function SinglePageReport({
  page,
  onReset,
}: {
  page: PageData;
  onReset: () => void;
}) {
  const score = page.seoScore;
  const scoreColor =
    score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const scoreLabel = score >= 80 ? "Good" : score >= 50 ? "Needs Work" : "Poor";

  const criticalIssues = page.issues.filter((i) => i.severity === "critical");
  const warnings = page.issues.filter((i) => i.severity === "warning");
  const notices = page.issues.filter((i) => i.severity === "notice");

  return (
    <div className="space-y-6 mt-4">
      {/* ── Score banner ── */}
      <div
        className="flex flex-col md:flex-row items-center gap-6 rounded-2xl p-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {/* Score ring */}
        <div className="flex flex-col items-center flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle
              cx="48" cy="48" r="40" fill="none"
              stroke={scoreColor} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 251.2} 251.2`}
              transform="rotate(-90 48 48)"
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            />
            <text x="48" y="54" textAnchor="middle" fontSize="22" fontWeight="700"
              fill={scoreColor} fontFamily="monospace">{score}</text>
          </svg>
          <span className="text-sm font-bold mt-1" style={{ color: scoreColor }}>{scoreLabel}</span>
          <span className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>SEO Score</span>
        </div>

        {/* Page info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-lg truncate mb-1" style={{ color: "var(--foreground)" }}>
            {page.title || "No Title"}
          </p>
          <p className="text-xs font-mono truncate mb-3" style={{ color: "var(--muted-foreground)" }}>
            {page.url}
          </p>
          {/* Issue pills */}
          <div className="flex flex-wrap gap-2">
            {criticalIssues.length > 0 && (
              <IssuePill color="#ef4444" label={`${criticalIssues.length} Critical`} icon="🔴" />
            )}
            {warnings.length > 0 && (
              <IssuePill color="#f59e0b" label={`${warnings.length} Warning`} icon="⚠️" />
            )}
            {notices.length > 0 && (
              <IssuePill color="#3b82f6" label={`${notices.length} Notice`} icon="ℹ️" />
            )}
            {page.issues.length === 0 && (
              <IssuePill color="#22c55e" label="No Issues Found" icon="✅" />
            )}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-2 flex-shrink-0">
          <SPStatCard label="Status" value={String(page.statusCode || "ERR")}
            highlight={page.statusCode === 200 ? "green" : "red"} />
          <SPStatCard label="Response" value={`${page.responseTimeMs}ms`} />
          <SPStatCard label="Words" value={page.wordCount?.toLocaleString() ?? "—"} />
          <SPStatCard label="Page Size"
            value={page.pageSizeBytes ? `${(page.pageSizeBytes / 1024).toFixed(1)} KB` : "—"} />
        </div>

        <button
          onClick={onReset}
          className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80"
          style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
        >
          ← New Analysis
        </button>
      </div>

      {/* ── Issues list ── */}
      {page.issues.length > 0 && (
        <SPSection title="Issues" icon="🔍">
          <div className="space-y-1.5">
            {[...criticalIssues, ...warnings, ...notices].map((issue, idx) => {
              const styles = {
                critical: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)", color: "#ef4444", icon: "🔴" },
                warning:  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#f59e0b", icon: "⚠" },
                notice:   { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)", color: "#3b82f6", icon: "ℹ" },
              };
              const s = styles[issue.severity];
              return (
                <div key={idx}
                  className="flex items-start gap-2.5 text-xs px-3 py-2 rounded-lg"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                >
                  <span className="mt-px flex-shrink-0">{s.icon}</span>
                  <span style={{ color: "var(--foreground)" }}>{issue.message}</span>
                </div>
              );
            })}
          </div>
        </SPSection>
      )}

      {/* ── Meta & OG ── */}
      <div className="grid md:grid-cols-2 gap-6">
        <SPSection title="Meta Tags" icon="🏷">
          <dl className="space-y-2">
            <SPMetaRow label="Title" value={page.title} note={`${page.titleLength} chars`} />
            <SPMetaRow label="Description" value={page.metaDescription} note={`${page.metaDescriptionLength} chars`} />
            <SPMetaRow label="Keywords" value={page.metaKeywords} />
            <SPMetaRow label="Canonical" value={page.canonicalUrl} mono />
            <SPMetaRow label="Robots" value={page.robotsMeta} />
            <SPMetaRow label="Lang" value={page.langAttr} />
            <SPMetaRow label="Charset" value={page.charset} />
            <SPMetaRow label="Viewport" value={page.viewportMeta} />
          </dl>
        </SPSection>

        <SPSection title="Open Graph / Social" icon="📣">
          <dl className="space-y-2">
            <SPMetaRow label="og:title" value={page.ogTitle} />
            <SPMetaRow label="og:description" value={page.ogDescription} />
            <SPMetaRow label="og:image" value={page.ogImage} mono />
            <SPMetaRow label="og:type" value={page.ogType || "website"} />
            <SPMetaRow label="twitter:card" value={page.twitterCard} />
            <SPMetaRow label="twitter:title" value={page.twitterTitle} />
            <SPMetaRow label="twitter:image" value={page.twitterImage} mono />
          </dl>
        </SPSection>
      </div>

      {/* ── Headings ── */}
      <SPSection title="Heading Structure" icon="📐">
        <div className="space-y-2">
          {page.h1s.length > 0 && <SPHeadingGroup level="H1" items={page.h1s} accentColor="var(--chart-1)" />}
          {page.h2s.length > 0 && <SPHeadingGroup level="H2" items={page.h2s.slice(0, 8)} accentColor="var(--chart-2)" />}
          {page.h3s.length > 0 && <SPHeadingGroup level="H3" items={page.h3s.slice(0, 5)} accentColor="var(--muted-foreground)" />}
          {!page.h1s.length && !page.h2s.length && !page.h3s.length && (
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>No headings found</p>
          )}
          {page.headingHierarchyViolations.length > 0 && (
            <div className="text-xs p-2 rounded" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>
              ⚠ Hierarchy violations: {page.headingHierarchyViolations.join("; ")}
            </div>
          )}
        </div>
      </SPSection>

      {/* ── Content + Links ── */}
      <div className="grid md:grid-cols-2 gap-6">
        <SPSection title="Content Quality" icon="📄">
          <div className="grid grid-cols-2 gap-2">
            <SPMiniStat label="Paragraphs" value={String(page.paragraphCount ?? "—")} />
            <SPMiniStat label="Avg Sentence" value={page.avgSentenceLength ? `${page.avgSentenceLength}w` : "—"} />
            <SPMiniStat label="Text/HTML Ratio" value={page.textToHtmlRatio ? `${page.textToHtmlRatio}%` : "—"} />
            <SPMiniStat label="Readability" value={page.readabilityScore != null ? `${page.readabilityScore}/100` : "—"} />
            <SPMiniStat label="Char Count" value={page.charCount?.toLocaleString() ?? "—"} />
          </div>
        </SPSection>

        <SPSection title="Links" icon="🔗">
          <div className="grid grid-cols-3 gap-2">
            <SPMiniStat label="Total" value={String(page.totalLinks)} />
            <SPMiniStat label="Internal" value={String(page.internalLinkCount)} />
            <SPMiniStat label="External" value={String(page.externalLinkCount)} />
            <SPMiniStat label="Nofollow" value={String(page.nofollowLinkCount)} />
            <SPMiniStat label="Generic Anchor" value={String(page.genericAnchorCount)} />
            <SPMiniStat label="URL Depth" value={String(page.urlDepth)} />
          </div>
          {page.externalLinks.length > 0 && (
            <details className="mt-3">
              <summary className="text-xs cursor-pointer hover:underline" style={{ color: "var(--muted-foreground)" }}>
                External links ({page.externalLinks.length})
              </summary>
              <ul className="mt-1.5 space-y-0.5 max-h-32 overflow-y-auto pl-2">
                {page.externalLinks.slice(0, 20).map((l, i) => (
                  <li key={i} className="font-mono text-xs truncate" style={{ color: "var(--muted-foreground)" }}>
                    {l.normalised || l.href}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </SPSection>
      </div>

      {/* ── Keywords ── */}
      {page.keywordDensity.length > 0 && (
        <SPSection title="Top Keywords" icon="🔑">
          <div className="flex flex-wrap gap-2">
            {page.keywordDensity.map((kw) => (
              <span key={kw.word}
                className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-mono"
                style={{ background: "var(--accent)", color: "var(--foreground)", border: "1px solid var(--border)" }}
              >
                {kw.word}
                <span className="text-xs px-1 py-0.5 rounded" style={{ background: "var(--border)", color: "var(--muted-foreground)" }}>
                  {kw.density}%
                </span>
              </span>
            ))}
          </div>
        </SPSection>
      )}

      {/* ── Images ── */}
      {page.images.length > 0 && (
        <SPSection title="Images" icon="🖼">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <SPMiniStat label="Total" value={String(page.imageCount)} />
            <SPMiniStat label="Missing Alt" value={String(page.imagesWithoutAlt)} alert={page.imagesWithoutAlt > 0} />
            <SPMiniStat label="Lazy Load" value={String(page.images.filter((i) => i.hasLazyLoad).length)} />
            <SPMiniStat label="Decorative" value={String(page.images.filter((i) => i.isDecorative).length)} />
          </div>
          <details>
            <summary className="text-xs cursor-pointer hover:underline" style={{ color: "var(--muted-foreground)" }}>
              View all images ({page.images.length})
            </summary>
            <ul className="mt-1.5 space-y-1 max-h-48 overflow-y-auto pl-2">
              {page.images.slice(0, 20).map((img, i) => (
                <li key={i} className="flex items-center gap-2 text-xs">
                  <span className="font-mono truncate flex-1" style={{ color: "var(--muted-foreground)" }}>{img.src}</span>
                  {!img.hasAlt && <span style={{ color: "#ef4444" }}>⚠ No alt</span>}
                </li>
              ))}
            </ul>
          </details>
        </SPSection>
      )}

      {/* ── Structured Data ── */}
      <SPSection title="Structured Data" icon="🧩">
        {page.hasStructuredData ? (
          <div className="flex flex-wrap gap-1.5">
            {page.schemaTypes.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                {t}
              </span>
            ))}
            {page.hasBreadcrumbSchema && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)" }}>
                Breadcrumb
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs" style={{ color: "#ef4444" }}>✗ No JSON-LD structured data found</p>
        )}
      </SPSection>

      {/* ── Technical + URL + Mobile ── */}
      <div className="grid md:grid-cols-3 gap-6">
        <SPSection title="Technical" icon="⚙️">
          <div className="space-y-1.5">
            <SPBoolRow label="HTTPS" value={page.isHttps} />
            <SPBoolRow label="No Mixed Content" value={!page.mixedContent} />
            <SPBoolRow label="AMP Version" value={page.hasAmpVersion} neutral />
            <SPBoolRow label="Preload" value={page.hasPreload} neutral />
            <SPBoolRow label="Preconnect" value={page.hasPreconnect} neutral />
            <SPInfoRow label="Render-blocking" value={String(page.renderBlockingScripts)} />
            <SPInfoRow label="Inline Styles" value={String(page.inlineStyleCount)} />
            <SPInfoRow label="External Scripts" value={String(page.externalScriptCount)} />
          </div>
        </SPSection>

        <SPSection title="URL Analysis" icon="🌐">
          <div className="space-y-1.5">
            <SPInfoRow label="Length" value={`${page.urlLength} chars`} />
            <SPInfoRow label="Depth" value={String(page.urlDepth)} />
            <SPBoolRow label="No Params" value={!page.urlHasParams} />
            <SPBoolRow label="Lowercase" value={!page.urlHasUppercase} />
            <SPBoolRow label="No Underscores" value={!page.urlHasUnderscores} />
            <SPBoolRow label="Trailing Slash" value={page.urlHasTrailingSlash} neutral />
          </div>
        </SPSection>

        <SPSection title="Mobile" icon="📱">
          <div className="space-y-1.5">
            <SPBoolRow label="Mobile Viewport" value={page.hasMobileViewport} />
            <SPBoolRow label="No Interstitials" value={!page.hasInterstitials} />
          </div>
        </SPSection>
      </div>

      {/* ── Hreflang ── */}
      {page.hreflangTags.length > 0 && (
        <SPSection title="Hreflang Tags" icon="🌍">
          <div className="flex flex-wrap gap-2">
            {page.hreflangTags.map((h, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded font-mono"
                style={{ background: "var(--accent)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                {h.lang}: {h.href.length > 40 ? h.href.substring(0, 40) + "…" : h.href}
              </span>
            ))}
          </div>
        </SPSection>
      )}
    </div>
  );
}

/* ── Shared sub-components for SinglePageReport ── */
function IssuePill({ color, label, icon }: { color: string; label: string; icon: string }) {
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>
      <span>{icon}</span> {label}
    </span>
  );
}
function SPStatCard({ label, value, highlight }: { label: string; value: string; highlight?: "green" | "red" }) {
  const valColor = highlight === "green" ? "#22c55e" : highlight === "red" ? "#ef4444" : "var(--foreground)";
  return (
    <div className="rounded-xl px-3 py-2 text-center" style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
      <p className="text-lg font-bold font-mono" style={{ color: valColor }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</p>
    </div>
  );
}
function SPSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "var(--muted-foreground)" }}>
        <span>{icon}</span>{title}
      </h3>
      {children}
    </div>
  );
}
function SPMiniStat({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className="rounded-lg px-3 py-2" style={{ background: "var(--accent)", border: "1px solid var(--border)" }}>
      <p className="text-xs font-mono font-semibold" style={{ color: alert ? "#ef4444" : "var(--foreground)" }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</p>
    </div>
  );
}
function SPMetaRow({ label, value, note, mono }: { label: string; value?: string; note?: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <dt className="flex-shrink-0 w-24 pt-px" style={{ color: "var(--muted-foreground)" }}>{label}</dt>
      <dd className="flex-1 min-w-0">
        {value ? (
          <span className={`break-all ${mono ? "font-mono" : ""}`} style={{ color: "var(--foreground)" }}>{value}</span>
        ) : (
          <span style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>—</span>
        )}
        {note && <span className="ml-1.5 text-xs" style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>({note})</span>}
      </dd>
    </div>
  );
}
function SPHeadingGroup({ level, items, accentColor }: { level: string; items: string[]; accentColor: string }) {
  return (
    <div>
      <p className="text-xs font-bold mb-1" style={{ color: accentColor }}>{level}</p>
      <ul className="space-y-1 pl-2">
        {items.map((h, i) => (
          <li key={i} className="text-xs truncate" style={{ color: "var(--foreground)" }}>{h}</li>
        ))}
      </ul>
    </div>
  );
}
function SPBoolRow({ label, value, neutral }: { label: string; value: boolean; neutral?: boolean }) {
  const color = neutral ? "var(--muted-foreground)" : value ? "#22c55e" : "#ef4444";
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: "var(--muted-foreground)" }}>{label}</span>
      <span style={{ color }}>{value ? "✓" : "✗"}</span>
    </div>
  );
}
function SPInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: "var(--muted-foreground)" }}>{label}</span>
      <span className="font-mono" style={{ color: "var(--foreground)" }}>{value}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useRefreshWarning();

  // ── Mode ──────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<Mode>("site-audit");

  // ── Shared ────────────────────────────────────────────────────────────────
  const [inputUrl, setInputUrl] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [hasSession, setHasSession] = useState(false);
  const [log, setLog] = useState("");

  // ── Site-audit state ──────────────────────────────────────────────────────
  const [isCrawling, setIsCrawling] = useState(false);
  const [results, setResults] = useState<PageData[]>([]);
  const [finalResults, setFinalResults] = useState<PageData[]>([]);
  const [finalRootUrl, setFinalRootUrl] = useState("");
  const [broken, setBroken] = useState<BrokenLink[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("pages");
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [rootUrl, setRootUrl] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const crawlRef = useRef<CrawlState | null>(null);
  const [visitedCount, setVisitedCount] = useState(0);
  const [queueCount, setQueueCount] = useState(0);
  const [processingUrls, setProcessingUrls] = useState<string[]>([]);

  // ── Single-page state ─────────────────────────────────────────────────────
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [singlePageResult, setSinglePageResult] = useState<PageData | null>(null);

  // ── Crawl callbacks ───────────────────────────────────────────────────────
  const onResult = useCallback((data: PageData) => {
    setResults((prev) => [...prev, data]);
  }, []);

  const onLog = useCallback((msg: string) => {
    setLog(msg);
    const urlMatch = msg.match(/(?:Fetching|Processing):\s*(.+)/);
    if (urlMatch) {
      const url = urlMatch[1].trim();
      setProcessingUrls((prev) => {
        const updated = prev.filter((u) => u !== url);
        return [...updated, url].slice(-5);
      });
    }
  }, []);

  const onCountsUpdate = useCallback((visited: number, queue: number) => {
    setVisitedCount(visited);
    setQueueCount(queue);
  }, []);

  useEffect(() => {
    if (isCrawling && startTime) {
      const timer = setInterval(() => { setElapsedMs(Date.now() - startTime); }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCrawling, startTime]);

  // ── Turnstile ─────────────────────────────────────────────────────────────
  const handleTurnstileSuccess = useCallback(async (token: string) => {
    setTurnstileToken(token);
    setHasSession(false);
    setSessionToken(null);
    try {
      const resp = await fetch(`${WORKER_URL}/verify-turnstile-token`, {
        method: "POST",
        headers: { "x-turnstile-token": token },
      });
      const data = (await resp.json()) as { success: boolean; token?: string; error?: string };
      if (!data.success || !data.token) {
        setLog("Turnstile verification failed: " + (data.error ?? "Unknown error"));
        return;
      }
      setSessionToken(data.token);
      setHasSession(true);
    } catch (err: any) {
      setLog("Error verifying Turnstile token: " + err.message);
    }
  }, []);

  // ── Site crawl ────────────────────────────────────────────────────────────
  const startCrawl = useCallback(async () => {
    let raw = inputUrl.trim();
    if (!raw) return;
    if (!raw.startsWith("http")) raw = "https://" + raw;
    let origin: string;
    try { origin = new URL(raw).origin; }
    catch { alert("Invalid URL"); return; }
    const sessionToken = getSessionToken();
    if (!sessionToken) { alert("Please complete the Turnstile verification first."); return; }
    const startNorm = normaliseUrl(raw, raw);
    if (!startNorm) { alert("Invalid URL"); return; }
    const state = createCrawlState(startNorm);
    crawlRef.current = state;
    setResults([]); setFinalResults([]); setFinalRootUrl(""); setBroken([]);
    setVisitedCount(0); setQueueCount(1); setLog(""); setProcessingUrls([]);
    setIsCrawling(true); setActiveTab("dashboard"); setRootUrl(raw);
    setStartTime(Date.now()); setElapsedMs(0);
    async function runCrawlWrapper() {
      const s = crawlRef.current!;
      await runCrawl(startNorm!, s, onResult, onLog, onCountsUpdate, sessionToken!, setIsCrawling, setFinalResults, setFinalRootUrl, setBroken, buildBrokenLinks);
    }
    runCrawlWrapper();
  }, [inputUrl, onResult, onLog, onCountsUpdate, buildBrokenLinks]);

  function stopCrawl() {
    const s = crawlRef.current;
    if (!s) return;
    s.stopped = true;
    const bl = buildBrokenLinks(s.results, s.referrers);
    setBroken(bl); setIsCrawling(false); setProcessingUrls([]);
    setLog(`Stopped — ${s.visited.size} pages crawled.`);
    setFinalResults([...s.results]);
    setFinalRootUrl(inputUrl.trim().startsWith("http") ? inputUrl.trim() : "https://" + inputUrl.trim());
  }

  // ── Single-page analyze ───────────────────────────────────────────────────
  const analyzeSinglePage = useCallback(async () => {
    let raw = inputUrl.trim();
    if (!raw) return;
    if (!raw.startsWith("http")) raw = "https://" + raw;
    try { new URL(raw); } catch { alert("Invalid URL"); return; }
    const sessionToken = getSessionToken();
    if (!sessionToken) { alert("Please complete the Turnstile verification first."); return; }

    setSinglePageResult(null);
    setIsAnalyzing(true);
    setLog("Fetching page…");

    try {
      const resp = await fetch(`${WORKER_URL}/get-html-page`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionToken}` },
        body: JSON.stringify({ urls: [raw] }),
      });

      if (resp.status === 401) {
        const body = (await resp.json().catch(() => ({}))) as { errorCode?: string };
        const msg =
          body.errorCode === "AUTH_IP_MISMATCH"
            ? "Session rejected: IP mismatch. Please refresh and re-verify."
            : "Session expired. Please complete Turnstile again.";
        setLog(msg);
        setHasSession(false);
        setSessionToken(null);
        return;
      }

      if (!resp.ok) { setLog(`Worker error: HTTP ${resp.status}`); return; }

      const data = (await resp.json()) as {
        success: boolean;
        results?: Array<{ url: string; finalUrl: string; statusCode: number; contentType: string; html: string }>;
        error?: string;
      };

      if (!data.success || !data.results || data.results.length === 0) {
        setLog(`No result: ${data.error ?? "worker returned nothing"}`);
        return;
      }

      const r = data.results[0];
      const t0 = Date.now();
      const pageData = analysePage(r.url, r.html, r.statusCode, Date.now() - t0, r.contentType);
      setSinglePageResult(pageData);
      setLog(`Analysis complete — SEO score: ${pageData.seoScore}/100`);
    } catch (err: any) {
      setLog("Error: " + (err.message || "Network error"));
    } finally {
      setIsAnalyzing(false);
    }
  }, [inputUrl]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const TABS: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "pages", label: "Pages" },
    { id: "issues", label: "Issues" },
    { id: "broken", label: "Broken Links" },
    { id: "links", label: "Links" },
    { id: "content", label: "Content" },
    { id: "site-structure", label: "Site Structure" },
    { id: "URL Tree", label: "Url Tree" },
    { id: "reports", label: "Reports" },
  ];
  const hasData = results.length > 0 || isCrawling;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground w-screen">
      <header className="border-b border-border flex items-center justify-between">
        {results.length > 0 && !isCrawling && mode === "site-audit" && (
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "seo-audit.json";
              a.click();
            }}
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-2 py-1"
          >
            Export JSON
          </button>
        )}
      </header>

      <div className="border-b border-border px-4 py-3">
        {/* ── Mode toggle ── */}
        <div className="flex items-center gap-1 mb-3 p-1 rounded-lg w-fit"
          style={{ background: "var(--accent)", border: "1px solid var(--border)" }}>
          {(["site-audit", "single-page"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setLog("");
                setSinglePageResult(null);
              }}
              className="text-xs px-4 py-1.5 rounded-md font-medium transition-all"
              style={
                mode === m
                  ? { background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {m === "site-audit" ? "🕷 Site Audit" : "🔍 Single Page"}
            </button>
          ))}
        </div>

        {/* ── Turnstile + URL bar ── */}
        <div className="mb-3 flex items-center gap-3">
          <Turnstile
            siteKey="0x4AAAAAACqHhXb21GIIJb-g"
            onSuccess={handleTurnstileSuccess}
            onError={() => { setLog("Turnstile verification failed"); setHasSession(false); setSessionToken(null); }}
            onExpire={() => { setHasSession(false); setSessionToken(null); setLog("Turnstile session expired, please re-verify"); }}
          />
          {hasSession && (
            <span className="text-xs text-green-500 font-mono">✓ Verified</span>
          )}
        </div>

        <div className="flex gap-2 max-w-3xl">
          <input
            type="url"
            placeholder={mode === "site-audit" ? "https://example.com" : "https://example.com/page"}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (mode === "site-audit" && !isCrawling) startCrawl();
              if (mode === "single-page" && !isAnalyzing) analyzeSinglePage();
            }}
            disabled={isCrawling || isAnalyzing}
            className="flex-1 bg-card border border-border rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring disabled:opacity-50 font-mono max-w-xs"
          />

          {mode === "site-audit" ? (
            !isCrawling ? (
              <button onClick={startCrawl} disabled={!hasSession}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Audit Site
              </button>
            ) : (
              <button onClick={stopCrawl}
                className="bg-destructive/60 hover:bg-destructive text-destructive-foreground text-sm px-4 py-2 rounded transition-colors">
                Stop
              </button>
            )
          ) : (
            <button
              onClick={analyzeSinglePage}
              disabled={!hasSession || isAnalyzing}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? (
                <><span className="animate-spin inline-block">🔍</span> Analyzing…</>
              ) : (
                "Analyze Page"
              )}
            </button>
          )}
        </div>

        {log && (
          <p className="text-xs text-muted-foreground mt-2 font-mono truncate max-w-3xl">{log}</p>
        )}

        {isCrawling && processingUrls.length > 0 && (
          <div className="mt-2 p-2 bg-card border border-border rounded max-w-3xl">
            <p className="text-xs text-muted-foreground mb-1 font-mono">Processing URLs:</p>
            <div className="flex flex-wrap gap-1">
              {processingUrls.map((url, idx) => (
                <span key={idx}
                  className="text-xs text-foreground font-mono bg-background px-2 py-1 rounded border border-border animate-pulse">
                  {url.length > 60 ? url.substring(0, 60) + "..." : url}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <main className="px-4 py-4">
        {/* ════════ SINGLE PAGE MODE ════════ */}
        {mode === "single-page" && (
          <>
            {!singlePageResult && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-sm">Enter a page URL above to analyse its SEO</p>
                <p className="text-xs mt-1 text-muted-foreground/70">
                  Meta tags, headings, content quality, links, structured data, and more
                </p>
              </div>
            )}
            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-4">
                <span className="text-5xl animate-spin" style={{ display: "inline-block" }}>🔍</span>
                <p className="text-sm animate-pulse">Fetching and analysing page…</p>
              </div>
            )}
            {singlePageResult && (
              <SinglePageReport
                page={singlePageResult}
                onReset={() => { setSinglePageResult(null); setLog(""); }}
              />
            )}
          </>
        )}

        {/* ════════ SITE AUDIT MODE ════════ */}
        {mode === "site-audit" && (
          <>
            {!hasData ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <p className="text-4xl mb-3">🕷</p>
                <p className="text-sm">Enter a URL above to start the SEO audit</p>
                <p className="text-xs mt-1 text-muted-foreground/70">
                  The crawler will follow all internal links and analyse each page
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-1 border-b border-border mb-3">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`text-xs px-3 py-2 border-b-2 transition-colors ${
                        activeTab === t.id
                          ? "border-ring text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                      {t.id === "pages" && results.length > 0 && (
                        <span className="ml-1 text-muted-foreground">({results.length})</span>
                      )}
                      {t.id === "broken" && broken.length > 0 && (
                        <span className="ml-1 text-destructive">({broken.length})</span>
                      )}
                    </button>
                  ))}
                </div>

                <div style={{ display: activeTab === "dashboard" ? undefined : "none" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <HealthScore pages={results} />
                    <StatusCodeChart pages={results} />
                    <PageDepthChart pages={results} />
                    <SummaryCards results={results} visitedCount={visitedCount} queueCount={queueCount} isCrawling={isCrawling} />
                  </div>
                </div>

                <div style={{ display: activeTab === "pages" ? undefined : "none" }}>
                  <PagesTable results={results} onSelect={setSelectedPage} selectedUrl={selectedPage?.url ?? null} />
                </div>

                <div style={{ display: activeTab === "issues" ? undefined : "none" }}>
                  <IssuesTable results={results} />
                </div>

                <div style={{ display: activeTab === "broken" ? undefined : "none" }}>
                  <BrokenLinksTable broken={broken} />
                </div>

                <div style={{ display: activeTab === "links" ? undefined : "none" }} className="space-y-6">
                  <AnchorTextCloud pages={results} />
                  <RedirectChainList pages={results} />
                </div>

                <div style={{ display: activeTab === "content" ? undefined : "none" }} className="space-y-6">
                  <DuplicateContentPanel pages={results} />
                  <CannibalizationTable pages={results} />
                  <TfIdfTable pages={results} />
                </div>

                <div style={{ display: activeTab === "site-structure" ? undefined : "none" }} className="space-y-6">
                  <SitemapAuditPanel pages={results} rootUrl={rootUrl} sessionToken={getSessionToken() ?? ""} />
                  <RobotsAuditPanel pages={results} rootUrl={rootUrl} sessionToken={getSessionToken() ?? ""} />
                  <PageRankSimulator pages={results} />
                </div>

                <div style={{ display: activeTab === "URL Tree" ? undefined : "none", height: "70vh" }}>
                  {isCrawling ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                      <span className="text-5xl animate-spin" style={{ display: "inline-block" }}>🕷</span>
                      <p className="text-sm animate-pulse">Crawling in progress… URL Tree will appear when done.</p>
                      <p className="text-xs text-muted-foreground/70 font-mono">{visitedCount} pages visited so far</p>
                    </div>
                  ) : (
                    <UrlTree results={finalResults} isCrawling={false} rootUrl={finalRootUrl || rootUrl} />
                  )}
                </div>

                <div style={{ display: activeTab === "reports" ? undefined : "none" }} className="space-y-6">
                  <ExportPanel pages={results} />
                  <CrawlDiffPanel pages={results} rootUrl={rootUrl} />
                </div>
              </>
            )}
          </>
        )}
      </main>

      <SEOAuditorSEO />

      {selectedPage && (
        <PageDetail page={selectedPage} onClose={() => setSelectedPage(null)} />
      )}
    </div>
  );
}
