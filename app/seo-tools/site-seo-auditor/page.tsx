"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  buildBrokenLinks,
  normaliseUrl,
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
  IssuesSeverityChart,
  StatusCodeChart,
  PageDepthChart,
  CrawlStats,
} from "@/components/seo-tools/dashboard";
import {
  InternalLinkGraph,
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

const WORKER_URL = process.env.NEXT_PUBLIC_CF_WORKER_BASE_URL;

// ─── Session token stored in memory only (not cookies) ────────────────────────
// Cookies are readable by JS anyway, so in-memory is equally safe and simpler.
// The token is IP-bound on the server side, so theft from another machine is blocked.
let inMemorySessionToken: string | null = null;

function getSessionToken() {
  return inMemorySessionToken;
}
function setSessionToken(t: string | null) {
  inMemorySessionToken = t;
}

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

export default function Home() {
  useRefreshWarning();
  const [inputUrl, setInputUrl] = useState("");
  const [isCrawling, setIsCrawling] = useState(false);
  const [results, setResults] = useState<PageData[]>([]);
  const [finalResults, setFinalResults] = useState<PageData[]>([]);
  const [finalRootUrl, setFinalRootUrl] = useState("");
  const [broken, setBroken] = useState<BrokenLink[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("pages");
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [log, setLog] = useState("");
  const [rootUrl, setRootUrl] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  // Track if we have a valid session so UI can reflect it
  const [hasSession, setHasSession] = useState(false);

  const crawlRef = useRef<CrawlState | null>(null);
  const [visitedCount, setVisitedCount] = useState(0);
  const [queueCount, setQueueCount] = useState(0);
  const [processingUrls, setProcessingUrls] = useState<string[]>([]);

  const onResult = useCallback((data: PageData) => {
    setResults((prev) => [...prev, data]);
  }, []);

  const onLog = useCallback((msg: string) => {
    setLog(msg);
    // Extract URL from log message if present
    const urlMatch = msg.match(/(?:Fetching|Processing):\s*(.+)/);
    if (urlMatch) {
      const url = urlMatch[1].trim();
      setProcessingUrls((prev) => {
        const updated = prev.filter((u) => u !== url);
        return [...updated, url].slice(-5); // Keep last 5 URLs
      });
    }
  }, []);

  const onCountsUpdate = useCallback((visited: number, queue: number) => {
    setVisitedCount(visited);
    setQueueCount(queue);
  }, []);

  useEffect(() => {
    if (isCrawling && startTime) {
      const timer = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCrawling, startTime]);

  // ─── Called when Turnstile gives us a token ──────────────────────────────────
  // We immediately exchange it for a session JWT so crawl start is faster.
  const handleTurnstileSuccess = useCallback(async (token: string) => {
    setTurnstileToken(token);
    setHasSession(false);
    setSessionToken(null);

    try {
      const resp = await fetch(`${WORKER_URL}/verify-turnstile-token`, {
        method: "POST",
        headers: { "x-turnstile-token": token },
      });
      const data = (await resp.json()) as {
        success: boolean;
        token?: string;
        error?: string;
      };

      if (!data.success || !data.token) {
        setLog(
          "Turnstile verification failed: " + (data.error ?? "Unknown error"),
        );
        return;
      }

      // ✅ Store JWT in memory — sent as Authorization: Bearer <token> on every request
      setSessionToken(data.token);
      setHasSession(true);
    } catch (err: any) {
      setLog("Error verifying Turnstile token: " + err.message);
    }
  }, []);

  const startCrawl = useCallback(async () => {
    let raw = inputUrl.trim();
    if (!raw) return;
    if (!raw.startsWith("http")) raw = "https://" + raw;

    let origin: string;
    try {
      origin = new URL(raw).origin;
    } catch {
      alert("Invalid URL");
      return;
    }

    // ✅ Check we have a session token before starting
    const sessionToken = getSessionToken();
    console.log("session token", sessionToken);
    if (!sessionToken) {
      alert("Please complete the Turnstile verification first.");
      return;
    }

    const startNorm = normaliseUrl(raw, raw);
    if (!startNorm) {
      alert("Invalid URL");
      return;
    }

    const state = createCrawlState(startNorm);
    crawlRef.current = state;

    setResults([]);
    setFinalResults([]);
    setFinalRootUrl("");
    setBroken([]);
    setVisitedCount(0);
    setQueueCount(1);
    setLog("");
    setProcessingUrls([]);
    setIsCrawling(true);
    setActiveTab("dashboard");
    setRootUrl(raw);
    setStartTime(Date.now());
    setElapsedMs(0);

    async function runCrawlWrapper() {
      const s = crawlRef.current!;
      await runCrawl(
        startNorm!,
        s,
        onResult,
        onLog,
        onCountsUpdate,
        sessionToken!,
        setIsCrawling,
        setFinalResults,
        setFinalRootUrl,
        setBroken,
        buildBrokenLinks,
      );
    }

    runCrawlWrapper();
  }, [inputUrl, onResult, onLog, onCountsUpdate, buildBrokenLinks]);

  function stopCrawl() {
    const s = crawlRef.current;
    if (!s) return;
    s.stopped = true;
    const bl = buildBrokenLinks(s.results, s.referrers);
    setBroken(bl);
    setIsCrawling(false);
    setProcessingUrls([]);
    setLog(`Stopped — ${s.visited.size} pages crawled.`);
    setFinalResults([...s.results]);
    setFinalRootUrl(
      inputUrl.trim().startsWith("http")
        ? inputUrl.trim()
        : "https://" + inputUrl.trim(),
    );
  }

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

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      <header className="border-b border-border flex items-center justify-between">
        {results.length > 0 && !isCrawling && (
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(results, null, 2)], {
                type: "application/json",
              });
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
        <div className="mb-3 flex items-center gap-3">
          <Turnstile
            siteKey="0x4AAAAAACqHhXb21GIIJb-g"
            onSuccess={handleTurnstileSuccess}
            onError={() => {
              setLog("Turnstile verification failed");
              setHasSession(false);
              setSessionToken(null);
            }}
            onExpire={() => {
              // Token expired — user will need to re-verify
              setHasSession(false);
              setSessionToken(null);
              setLog("Turnstile session expired, please re-verify");
            }}
          />
          {/* ✅ Visual feedback so user knows if they're verified */}
          {hasSession && (
            <span className="text-xs text-green-500 font-mono">✓ Verified</span>
          )}
        </div>
        <div className="flex gap-2 max-w-3xl">
          <input
            type="url"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isCrawling && startCrawl()}
            disabled={isCrawling}
            className="flex-1 bg-card border border-border rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring disabled:opacity-50 font-mono max-w-xs"
          />
          {!isCrawling ? (
            <button
              onClick={startCrawl}
              disabled={!hasSession}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Audit Site
            </button>
          ) : (
            <button
              onClick={stopCrawl}
              className="bg-destructive/60 hover:bg-destructive text-destructive-foreground text-sm px-4 py-2 rounded transition-colors"
            >
              Stop
            </button>
          )}
        </div>
        {log && (
          <p className="text-xs text-muted-foreground mt-2 font-mono truncate max-w-3xl">
            {log}
          </p>
        )}
        {isCrawling && processingUrls.length > 0 && (
          <div className="mt-2 p-2 bg-card border border-border rounded max-w-3xl">
            <p className="text-xs text-muted-foreground mb-1 font-mono">
              Processing URLs:
            </p>
            <div className="flex flex-wrap gap-1">
              {processingUrls.map((url, idx) => (
                <span
                  key={idx}
                  className="text-xs text-foreground font-mono bg-background px-2 py-1 rounded border border-border animate-pulse"
                >
                  {url.length > 60 ? url.substring(0, 60) + "..." : url}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <main className="px-4 py-4">
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
            <SummaryCards
              results={results}
              visitedCount={visitedCount}
              queueCount={queueCount}
              isCrawling={isCrawling}
            />

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
                    <span className="ml-1 text-muted-foreground">
                      ({results.length})
                    </span>
                  )}
                  {t.id === "broken" && broken.length > 0 && (
                    <span className="ml-1 text-destructive">
                      ({broken.length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div
              style={{
                display: activeTab === "dashboard" ? undefined : "none",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <HealthScore pages={results} />
                <StatusCodeChart pages={results} />
                <PageDepthChart pages={results} />
                <CrawlStats
                  visitedCount={visitedCount}
                  queueCount={queueCount}
                  isCrawling={isCrawling}
                  elapsedMs={elapsedMs}
                />
              </div>
            </div>

            <div
              style={{ display: activeTab === "pages" ? undefined : "none" }}
            >
              <PagesTable
                results={results}
                onSelect={setSelectedPage}
                selectedUrl={selectedPage?.url ?? null}
              />
            </div>

            <div
              style={{ display: activeTab === "issues" ? undefined : "none" }}
            >
              <IssuesTable results={results} />
            </div>

            <div
              style={{ display: activeTab === "broken" ? undefined : "none" }}
            >
              <BrokenLinksTable broken={broken} />
            </div>

            <div
              style={{ display: activeTab === "links" ? undefined : "none" }}
              className="space-y-6"
            >
              <InternalLinkGraph pages={results} rootUrl={rootUrl} />
              <AnchorTextCloud pages={results} />
              <RedirectChainList pages={results} />
            </div>

            <div
              style={{ display: activeTab === "content" ? undefined : "none" }}
              className="space-y-6"
            >
              <DuplicateContentPanel pages={results} />
              <CannibalizationTable pages={results} />
              <TfIdfTable pages={results} />
            </div>

            <div
              style={{
                display: activeTab === "site-structure" ? undefined : "none",
              }}
              className="space-y-6"
            >
              {/* ✅ Token passed as prop for use in Authorization header, not cookie */}
              <SitemapAuditPanel
                pages={results}
                rootUrl={rootUrl}
                sessionToken={getSessionToken() ?? ""}
              />
              <RobotsAuditPanel
                pages={results}
                rootUrl={rootUrl}
                sessionToken={getSessionToken() ?? ""}
              />
              <PageRankSimulator pages={results} />
            </div>

            <div
              style={{
                display: activeTab === "URL Tree" ? undefined : "none",
                height: "70vh",
              }}
            >
              {isCrawling ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                  <span
                    className="text-5xl animate-spin"
                    style={{ display: "inline-block" }}
                  >
                    🕷
                  </span>
                  <p className="text-sm animate-pulse">
                    Crawling in progress… URL Tree will appear when done.
                  </p>
                  <p className="text-xs text-muted-foreground/70 font-mono">
                    {visitedCount} pages visited so far
                  </p>
                </div>
              ) : (
                <UrlTree
                  results={finalResults}
                  isCrawling={false}
                  rootUrl={finalRootUrl || rootUrl}
                />
              )}
            </div>

            <div
              style={{ display: activeTab === "reports" ? undefined : "none" }}
              className="space-y-6"
            >
              <ExportPanel pages={results} />
              <CrawlDiffPanel pages={results} rootUrl={rootUrl} />
            </div>
          </>
        )}
      </main>

      {selectedPage && (
        <PageDetail page={selectedPage} onClose={() => setSelectedPage(null)} />
      )}
    </div>
  );
}
