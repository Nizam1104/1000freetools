"use client";

import { PageData } from "@/lib/seo-tools-lib/seoAnalyser";
import type { Issue } from "@/lib/seo-tools-lib/types";

interface Props {
  page: PageData;
  onClose: () => void;
}

export default function PageDetail({ page, onClose }: Props) {
  const score = page.seoScore;
  const scoreColor =
    score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const scoreLabel = score >= 80 ? "Good" : score >= 50 ? "Needs Work" : "Poor";

  const criticalIssues = page.issues.filter((i) => i.severity === "critical");
  const warnings = page.issues.filter((i) => i.severity === "warning");
  const notices = page.issues.filter((i) => i.severity === "notice");

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-4xl my-4 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--background)",
          border: "1px solid var(--border)",
        }}
      >
        {/* ── Top bar ── */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            borderBottom: "1px solid var(--border)",
            background: "var(--card)",
          }}
        >
          <div className="flex-1 min-w-0 pr-4">
            <p
              className="text-xs font-mono truncate mb-0.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              {page.url}
            </p>
            <p
              className="text-base font-semibold truncate"
              style={{ color: "var(--foreground)" }}
            >
              {page.title || "No Title"}
            </p>
          </div>

          {/* Score ring */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="6"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 163.4} 163.4`}
                  transform="rotate(-90 32 32)"
                  style={{ transition: "stroke-dasharray 0.6s ease" }}
                />
                <text
                  x="32"
                  y="36"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={scoreColor}
                  fontFamily="monospace"
                >
                  {score}
                </text>
              </svg>
              <span
                className="text-xs font-semibold mt-0.5"
                style={{ color: scoreColor }}
              >
                {scoreLabel}
              </span>
            </div>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
              style={{
                background: "var(--accent)",
                color: "var(--muted-foreground)",
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Issue summary bar ── */}
        {page.issues.length > 0 && (
          <div
            className="flex items-center gap-3 px-6 py-2.5 text-xs"
            style={{
              background: "var(--accent)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              className="font-semibold"
              style={{ color: "var(--muted-foreground)" }}
            >
              Issues:
            </span>
            {criticalIssues.length > 0 && (
              <Pill
                color="#ef4444"
                label={`${criticalIssues.length} critical`}
                icon="🔴"
              />
            )}
            {warnings.length > 0 && (
              <Pill
                color="#f59e0b"
                label={`${warnings.length} warning`}
                icon="⚠"
              />
            )}
            {notices.length > 0 && (
              <Pill
                color="#3b82f6"
                label={`${notices.length} notice`}
                icon="ℹ"
              />
            )}
          </div>
        )}

        {/* ── Body ── */}
        <div
          className="p-6 space-y-8 overflow-y-auto"
          style={{ maxHeight: "75vh" }}
        >
          {/* Issues */}
          {page.issues.length > 0 && (
            <Section title="Issues" icon="🔍">
              <div className="space-y-1.5">
                {criticalIssues.map((issue, idx) => (
                  <IssueRow key={idx} issue={issue} />
                ))}
                {warnings.map((issue, idx) => (
                  <IssueRow key={idx} issue={issue} />
                ))}
                {notices.map((issue, idx) => (
                  <IssueRow key={idx} issue={issue} />
                ))}
              </div>
            </Section>
          )}

          {/* Quick stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Word Count"
              value={page.wordCount?.toLocaleString() ?? "—"}
            />
            <StatCard
              label="Page Size"
              value={
                page.pageSizeBytes
                  ? `${(page.pageSizeBytes / 1024).toFixed(1)} KB`
                  : "—"
              }
            />
            <StatCard label="Response" value={`${page.responseTimeMs}ms`} />
            <StatCard
              label="Status"
              value={String(page.statusCode || "ERR")}
              highlight={page.statusCode === 200 ? "green" : "red"}
            />
          </div>

          {/* Two-column layout for meta + OG */}
          <div className="grid md:grid-cols-2 gap-6">
            <Section title="Meta Tags" icon="🏷">
              <dl className="space-y-2">
                <MetaRow
                  label="Title"
                  value={page.title}
                  note={`${page.titleLength} chars`}
                />
                <MetaRow
                  label="Description"
                  value={page.metaDescription}
                  note={`${page.metaDescriptionLength} chars`}
                />
                <MetaRow label="Keywords" value={page.metaKeywords} />
                <MetaRow label="Canonical" value={page.canonicalUrl} mono />
                <MetaRow label="Robots" value={page.robotsMeta} />
                <MetaRow label="Lang" value={page.langAttr} />
                <MetaRow label="Charset" value={page.charset} />
                <MetaRow label="Viewport" value={page.viewportMeta} />
              </dl>
            </Section>

            <Section title="Open Graph / Social" icon="📣">
              <dl className="space-y-2">
                <MetaRow label="og:title" value={page.ogTitle} />
                <MetaRow label="og:description" value={page.ogDescription} />
                <MetaRow label="og:image" value={page.ogImage} mono />
                <MetaRow label="og:type" value={page.ogType || "website"} />
                <MetaRow label="twitter:card" value={page.twitterCard} />
                <MetaRow label="twitter:title" value={page.twitterTitle} />
                <MetaRow label="twitter:image" value={page.twitterImage} mono />
              </dl>
            </Section>
          </div>

          {/* Headings */}
          <Section title="Heading Structure" icon="📐">
            <div className="space-y-3">
              {page.h1s.length > 0 && (
                <HeadingGroup
                  level="H1"
                  items={page.h1s}
                  count={page.h1Count}
                  accentColor="var(--chart-1)"
                />
              )}
              {page.h2s.length > 0 && (
                <HeadingGroup
                  level="H2"
                  items={page.h2s}
                  count={page.h2Count}
                  limit={8}
                  accentColor="var(--chart-2)"
                />
              )}
              {page.h3s.length > 0 && (
                <HeadingGroup
                  level="H3"
                  items={page.h3s}
                  count={page.h3Count}
                  limit={5}
                  accentColor="var(--muted-foreground)"
                />
              )}
              {!page.h1s.length && !page.h2s.length && !page.h3s.length && (
                <EmptyState>No headings found</EmptyState>
              )}
              {page.headingHierarchyViolations.length > 0 && (
                <AlertBox color="amber" title="Hierarchy Violations">
                  {page.headingHierarchyViolations.map((v, i) => (
                    <p key={i}>{v}</p>
                  ))}
                </AlertBox>
              )}
              {page.emptyHeadings.length > 0 && (
                <AlertBox
                  color="amber"
                  title={`Empty Headings: ${page.emptyHeadings.join(", ")}`}
                />
              )}
            </div>
          </Section>

          {/* Content + Links */}
          <div className="grid md:grid-cols-2 gap-6">
            <Section title="Content Quality" icon="📄">
              <div className="grid grid-cols-2 gap-2">
                <MiniStat
                  label="Paragraphs"
                  value={String(page.paragraphCount ?? "—")}
                />
                <MiniStat
                  label="Avg Sentence"
                  value={
                    page.avgSentenceLength ? `${page.avgSentenceLength}w` : "—"
                  }
                />
                <MiniStat
                  label="Text/HTML Ratio"
                  value={
                    page.textToHtmlRatio ? `${page.textToHtmlRatio}%` : "—"
                  }
                />
                <MiniStat
                  label="Readability"
                  value={
                    page.readabilityScore != null
                      ? `${page.readabilityScore}/100`
                      : "—"
                  }
                />
                <MiniStat
                  label="Char Count"
                  value={page.charCount?.toLocaleString() ?? "—"}
                />
              </div>
            </Section>

            <Section title="Links" icon="🔗">
              <div className="grid grid-cols-3 gap-2">
                <MiniStat label="Total" value={String(page.totalLinks)} />
                <MiniStat
                  label="Internal"
                  value={String(page.internalLinkCount)}
                />
                <MiniStat
                  label="External"
                  value={String(page.externalLinkCount)}
                />
                <MiniStat
                  label="Nofollow"
                  value={String(page.nofollowLinkCount)}
                />
                <MiniStat
                  label="Generic Anchor"
                  value={String(page.genericAnchorCount)}
                />
                <MiniStat
                  label="Depth"
                  value={String(page.linkDepthFromRoot)}
                />
              </div>
              {page.externalLinks.length > 0 && (
                <details className="mt-3">
                  <summary
                    className="text-xs cursor-pointer hover:underline"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    External links ({page.externalLinks.length})
                  </summary>
                  <ul className="mt-1.5 space-y-0.5 max-h-32 overflow-y-auto pl-2">
                    {page.externalLinks.slice(0, 20).map((l, i) => (
                      <li
                        key={i}
                        className="font-mono text-xs truncate"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {l.normalised || l.href}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </Section>
          </div>

          {/* Keywords */}
          {page.keywordDensity.length > 0 && (
            <Section title="Top Keywords" icon="🔑">
              <div className="flex flex-wrap gap-2">
                {page.keywordDensity.map((kw) => (
                  <span
                    key={kw.word}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-mono"
                    style={{
                      background: "var(--accent)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {kw.word}
                    <span
                      className="text-xs px-1 py-0.5 rounded"
                      style={{
                        background: "var(--border)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {kw.density}%
                    </span>
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Images */}
          {page.images.length > 0 && (
            <Section title="Images" icon="🖼">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <MiniStat label="Total" value={String(page.imageCount)} />
                <MiniStat
                  label="Missing Alt"
                  value={String(page.imagesWithoutAlt)}
                  alert={page.imagesWithoutAlt > 0}
                />
                <MiniStat
                  label="Lazy Load"
                  value={String(
                    page.images.filter((i) => i.hasLazyLoad).length,
                  )}
                />
                <MiniStat
                  label="Decorative"
                  value={String(
                    page.images.filter((i) => i.isDecorative).length,
                  )}
                />
              </div>
              <details>
                <summary
                  className="text-xs cursor-pointer hover:underline"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  View all images ({page.images.length})
                </summary>
                <ul className="mt-1.5 space-y-1 max-h-48 overflow-y-auto pl-2">
                  {page.images.slice(0, 20).map((img, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      <span
                        className="font-mono truncate flex-1"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {img.src}
                      </span>
                      {!img.hasAlt && (
                        <span style={{ color: "#ef4444" }}>⚠ No alt</span>
                      )}
                      {img.isDecorative && (
                        <span style={{ color: "var(--chart-2)" }}>
                          (decorative)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </Section>
          )}

          {/* Structured Data */}
          <Section title="Structured Data" icon="🧩">
            {page.hasStructuredData ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {page.schemaTypes.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        color: "#22c55e",
                        border: "1px solid rgba(34,197,94,0.3)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  {page.hasBreadcrumbSchema && (
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(59,130,246,0.1)",
                        color: "#3b82f6",
                        border: "1px solid rgba(59,130,246,0.3)",
                      }}
                    >
                      Breadcrumb
                    </span>
                  )}
                </div>
                {page.schemaRaw.length > 0 && (
                  <details>
                    <summary
                      className="text-xs cursor-pointer hover:underline"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      View raw JSON-LD
                    </summary>
                    <pre
                      className="mt-1.5 p-3 rounded-lg text-xs overflow-auto max-h-48"
                      style={{
                        background: "var(--accent)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {JSON.stringify(page.schemaRaw, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ) : (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "#ef4444" }}
              >
                <span>✗</span> No JSON-LD structured data found
              </div>
            )}
          </Section>

          {/* Technical + URL + Mobile in a row */}
          <div className="grid md:grid-cols-3 gap-6">
            <Section title="Technical" icon="⚙️">
              <div className="space-y-1.5">
                <BoolRow label="HTTPS" value={page.isHttps} />
                <BoolRow
                  label="Mixed Content"
                  value={!page.mixedContent}
                  invertLogic
                />
                <BoolRow
                  label="AMP Version"
                  value={page.hasAmpVersion}
                  neutral
                />
                <BoolRow label="Preload" value={page.hasPreload} neutral />
                <BoolRow
                  label="Preconnect"
                  value={page.hasPreconnect}
                  neutral
                />
                <InfoRow
                  label="Render-blocking"
                  value={String(page.renderBlockingScripts)}
                />
                <InfoRow
                  label="Inline Styles"
                  value={String(page.inlineStyleCount)}
                />
                <InfoRow
                  label="External Scripts"
                  value={String(page.externalScriptCount)}
                />
              </div>
            </Section>

            <Section title="URL Analysis" icon="🔗">
              <div className="space-y-1.5">
                <InfoRow label="Length" value={`${page.urlLength} chars`} />
                <InfoRow label="Depth" value={String(page.urlDepth)} />
                <BoolRow
                  label="Has Params"
                  value={!page.urlHasParams}
                  invertLogic
                />
                <BoolRow
                  label="Uppercase"
                  value={!page.urlHasUppercase}
                  invertLogic
                />
                <BoolRow
                  label="Underscores"
                  value={!page.urlHasUnderscores}
                  invertLogic
                />
                <BoolRow
                  label="Trailing Slash"
                  value={page.urlHasTrailingSlash}
                  neutral
                />
              </div>
            </Section>

            <Section title="Mobile" icon="📱">
              <div className="space-y-1.5">
                <BoolRow
                  label="Mobile Viewport"
                  value={page.hasMobileViewport}
                />
                <BoolRow
                  label="No Interstitials"
                  value={!page.hasInterstitials}
                  invertLogic
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function IssueRow({ issue }: { issue: Issue }) {
  const styles = {
    critical: {
      bg: "rgba(239,68,68,0.08)",
      border: "rgba(239,68,68,0.25)",
      color: "#ef4444",
      icon: "🔴",
    },
    warning: {
      bg: "rgba(245,158,11,0.08)",
      border: "rgba(245,158,11,0.25)",
      color: "#f59e0b",
      icon: "⚠",
    },
    notice: {
      bg: "rgba(59,130,246,0.08)",
      border: "rgba(59,130,246,0.25)",
      color: "#3b82f6",
      icon: "ℹ",
    },
  };
  const s = styles[issue.severity];
  return (
    <div
      className="flex items-start gap-2.5 text-xs px-3 py-2 rounded-lg"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
      }}
    >
      <span className="mt-px flex-shrink-0">{s.icon}</span>
      <span style={{ color: "var(--foreground)" }}>{issue.message}</span>
    </div>
  );
}

function Pill({
  color,
  label,
  icon,
}: {
  color: string;
  label: string;
  icon: string;
}) {
  return (
    <span
      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      <span>{icon}</span> {label}
    </span>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "var(--muted-foreground)" }}
      >
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "green" | "red";
}) {
  const valColor =
    highlight === "green"
      ? "#22c55e"
      : highlight === "red"
        ? "#ef4444"
        : "var(--foreground)";
  return (
    <div
      className="rounded-xl px-4 py-3 text-center"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <p className="text-xl font-bold font-mono" style={{ color: valColor }}>
        {value}
      </p>
      <p
        className="text-xs mt-0.5"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  alert,
}: {
  label: string;
  value: string;
  alert?: boolean;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{ background: "var(--accent)", border: "1px solid var(--border)" }}
    >
      <p
        className="text-xs font-mono font-semibold"
        style={{ color: alert ? "#ef4444" : "var(--foreground)" }}
      >
        {value}
      </p>
      <p
        className="text-xs mt-0.5"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </p>
    </div>
  );
}

function MetaRow({
  label,
  value,
  note,
  mono,
}: {
  label: string;
  value?: string;
  note?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <dt
        className="flex-shrink-0 w-24 pt-px"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </dt>
      <dd className="flex-1 min-w-0">
        {value ? (
          <span
            className={`break-all ${mono ? "font-mono" : ""}`}
            style={{ color: "var(--foreground)" }}
          >
            {value}
          </span>
        ) : (
          <span style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>
            —
          </span>
        )}
        {note && (
          <span
            className="ml-1.5 text-xs"
            style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
          >
            ({note})
          </span>
        )}
      </dd>
    </div>
  );
}

function HeadingGroup({
  level,
  items,
  count,
  limit,
  accentColor,
}: {
  level: string;
  items: string[];
  count: number;
  limit?: number;
  accentColor: string;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  return (
    <div className="flex gap-3">
      <div
        className="flex-shrink-0 w-8 h-6 flex items-center justify-center rounded text-xs font-bold font-mono"
        style={{ background: `${accentColor}20`, color: accentColor }}
      >
        {level}
      </div>
      <div className="flex-1 min-w-0">
        {shown.map((t, i) => (
          <p
            key={i}
            className="text-xs truncate py-0.5"
            style={{
              color: "var(--foreground)",
              borderLeft: `2px solid ${accentColor}`,
              paddingLeft: 8,
            }}
          >
            {t || (
              <span style={{ opacity: 0.4, fontStyle: "italic" }}>empty</span>
            )}
          </p>
        ))}
        {limit && count > limit && (
          <p
            className="text-xs pl-3 mt-0.5"
            style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
          >
            +{count - limit} more
          </p>
        )}
      </div>
    </div>
  );
}

function BoolRow({
  label,
  value,
  invertLogic,
  neutral,
}: {
  label: string;
  value: boolean;
  invertLogic?: boolean;
  neutral?: boolean;
}) {
  const isGood = invertLogic ? !value : value;
  const color = neutral
    ? "var(--muted-foreground)"
    : isGood
      ? "#22c55e"
      : "#ef4444";
  const icon = neutral ? "•" : isGood ? "✓" : "✗";
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: "var(--muted-foreground)" }}>{label}</span>
      <span className="font-semibold" style={{ color }}>
        {icon}
      </span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: "var(--muted-foreground)" }}>{label}</span>
      <span
        className="font-mono font-semibold"
        style={{ color: "var(--foreground)" }}
      >
        {value}
      </span>
    </div>
  );
}

function AlertBox({
  color,
  title,
  children,
}: {
  color: "amber" | "red";
  title: string;
  children?: React.ReactNode;
}) {
  const c = color === "amber" ? "#f59e0b" : "#ef4444";
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{ background: `${c}10`, border: `1px solid ${c}30` }}
    >
      <p className="font-semibold mb-1" style={{ color: c }}>
        {title}
      </p>
      {children && <div style={{ color: c }}>{children}</div>}
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs"
      style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
    >
      {children}
    </p>
  );
}
