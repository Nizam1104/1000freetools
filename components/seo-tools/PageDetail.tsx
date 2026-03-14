'use client';

import { PageData } from '../lib/seoAnalyser';
import type { Issue } from '../lib/types';

interface Props {
  page: PageData;
  onClose: () => void;
}

export default function PageDetail({ page, onClose }: Props) {
  const scoreColor =
    page.seoScore >= 80 ? 'text-[var(--chart-1)]' : page.seoScore >= 50 ? 'text-[var(--chart-3)]' : 'text-destructive';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/70 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-3xl my-8 text-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-muted-foreground truncate">{page.url}</p>
            <p className="text-foreground font-semibold truncate mt-0.5">{page.title || 'No Title'}</p>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <span className={`text-2xl font-bold font-mono ${scoreColor}`}>{page.seoScore}/100</span>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-lg leading-none"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Issues */}
          {page.issues.length > 0 && (
            <Section title="Issues">
              <div className="space-y-1">
                {page.issues.map((issue, idx) => (
                  <IssueRow key={idx} issue={issue} />
                ))}
              </div>
            </Section>
          )}

          {/* Meta */}
          <Section title="Meta Tags">
            <Grid>
              <Field label="Title" value={page.title} sub={`${page.titleLength} chars`} />
              <Field label="Meta Description" value={page.metaDescription} sub={`${page.metaDescriptionLength} chars`} />
              <Field label="Meta Keywords" value={page.metaKeywords} />
              <Field label="Canonical URL" value={page.canonicalUrl} mono />
              <Field label="Robots" value={page.robotsMeta} />
              <Field label="Lang" value={page.langAttr} />
              <Field label="Charset" value={page.charset} />
              <Field label="Viewport" value={page.viewportMeta} />
            </Grid>
          </Section>

          {/* Open Graph */}
          <Section title="Open Graph / Social">
            <Grid>
              <Field label="og:title" value={page.ogTitle} />
              <Field label="og:description" value={page.ogDescription} />
              <Field label="og:image" value={page.ogImage} mono />
              <Field label="og:type" value={page.ogType || 'website'} />
              <Field label="twitter:card" value={page.twitterCard} />
              <Field label="twitter:title" value={page.twitterTitle} />
              <Field label="twitter:image" value={page.twitterImage} mono />
            </Grid>
          </Section>

          {/* Headings */}
          <Section title="Heading Structure">
            <div className="space-y-2">
              {page.h1s.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H1 ({page.h1Count})</p>
                  {page.h1s.map((t, i) => (
                    <p key={i} className="text-foreground text-xs pl-2 border-l-2 border-[var(--chart-2)]">{t}</p>
                  ))}
                </div>
              )}
              {page.h2s.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H2 ({page.h2Count})</p>
                  {page.h2s.slice(0, 8).map((t, i) => (
                    <p key={i} className="text-foreground text-xs pl-2 border-l-2 border-border">{t}</p>
                  ))}
                  {page.h2s.length > 8 && <p className="text-xs text-muted-foreground/70 pl-2">…{page.h2s.length - 8} more</p>}
                </div>
              )}
              {page.h3s.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H3 ({page.h3Count})</p>
                  {page.h3s.slice(0, 5).map((t, i) => (
                    <p key={i} className="text-muted-foreground text-xs pl-2 border-l-2 border-border/70">{t}</p>
                  ))}
                  {page.h3s.length > 5 && <p className="text-xs text-muted-foreground/70 pl-2">…{page.h3s.length - 5} more</p>}
                </div>
              )}
              {!page.h1s.length && !page.h2s.length && !page.h3s.length && (
                <p className="text-muted-foreground/70 text-xs">No headings found</p>
              )}
              {page.headingHierarchyViolations.length > 0 && (
                <div className="mt-2 p-2 bg-[var(--chart-3)]/10 border border-[var(--chart-3)]/30 rounded">
                  <p className="text-xs text-[var(--chart-3)] font-semibold">Hierarchy Violations:</p>
                  {page.headingHierarchyViolations.map((v, i) => (
                    <p key={i} className="text-xs text-[var(--chart-3)] mt-1">{v}</p>
                  ))}
                </div>
              )}
              {page.emptyHeadings.length > 0 && (
                <div className="mt-2 p-2 bg-[var(--chart-3)]/10 border border-[var(--chart-3)]/30 rounded">
                  <p className="text-xs text-[var(--chart-3)] font-semibold">Empty Headings: {page.emptyHeadings.join(', ')}</p>
                </div>
              )}
            </div>
          </Section>

          {/* Content */}
          <Section title="Content">
            <Grid cols={3}>
              <Field label="Word Count" value={page.wordCount?.toLocaleString()} />
              <Field label="Char Count" value={page.charCount?.toLocaleString()} />
              <Field label="Paragraphs" value={page.paragraphCount?.toLocaleString()} />
              <Field label="Avg Sentence" value={page.avgSentenceLength ? `${page.avgSentenceLength} words` : '—'} />
              <Field label="Text/HTML Ratio" value={page.textToHtmlRatio ? `${page.textToHtmlRatio}%` : '—'} />
              <Field label="Readability" value={page.readabilityScore != null ? `${page.readabilityScore}/100` : '—'} />
              <Field label="Page Size" value={page.pageSizeBytes ? `${(page.pageSizeBytes / 1024).toFixed(1)} KB` : '—'} />
              <Field label="Response Time" value={`${page.responseTimeMs}ms`} />
              <Field label="Status Code" value={String(page.statusCode || 'ERR')} />
            </Grid>
          </Section>

          {/* Keyword Density */}
          {page.keywordDensity.length > 0 && (
            <Section title="Top Keywords">
              <div className="flex flex-wrap gap-1.5">
                {page.keywordDensity.map((kw) => (
                  <span key={kw.word} className="bg-accent/50 text-foreground text-xs px-2 py-0.5 rounded font-mono">
                    {kw.word} <span className="text-muted-foreground/70">{kw.density}%</span>
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Links */}
          <Section title="Links">
            <Grid cols={3}>
              <Field label="Total Links" value={String(page.totalLinks)} />
              <Field label="Internal" value={String(page.internalLinkCount)} />
              <Field label="External" value={String(page.externalLinkCount)} />
              <Field label="Nofollow" value={String(page.nofollowLinkCount)} />
              <Field label="Nofollow Internal" value={String(page.nofollowInternalCount)} />
              <Field label="Generic Anchor" value={String(page.genericAnchorCount)} />
              <Field label="Images" value={String(page.imageCount)} />
              <Field label="Images w/o Alt" value={String(page.imagesWithoutAlt)} />
              <Field label="Link Depth" value={String(page.linkDepthFromRoot)} />
            </Grid>
            {page.externalLinks.length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                  External links ({page.externalLinks.length})
                </summary>
                <ul className="mt-1 space-y-0.5 ml-2 max-h-36 overflow-y-auto">
                  {page.externalLinks.slice(0, 20).map((l, i) => (
                    <li key={i} className="font-mono text-xs text-muted-foreground/70 truncate">{l.normalised || l.href}</li>
                  ))}
                </ul>
              </details>
            )}
          </Section>

          {/* Images */}
          {page.images.length > 0 && (
            <Section title="Images">
              <Grid cols={2}>
                <Field label="Total Images" value={String(page.imageCount)} />
                <Field label="Missing Alt" value={String(page.imagesWithoutAlt)} />
                <Field label="With Lazy Load" value={String(page.images.filter((i) => i.hasLazyLoad).length)} />
                <Field label="Decorative" value={String(page.images.filter((i) => i.isDecorative).length)} />
              </Grid>
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                  View all images ({page.images.length})
                </summary>
                <ul className="mt-1 space-y-1 ml-2 max-h-48 overflow-y-auto">
                  {page.images.slice(0, 20).map((img, i) => (
                    <li key={i} className="text-xs text-muted-foreground">
                      <span className="font-mono truncate max-w-md inline-block">{img.src}</span>
                      {!img.hasAlt && <span className="text-destructive ml-2">⚠ No alt</span>}
                      {img.isDecorative && <span className="text-[var(--chart-2)] ml-2">(decorative)</span>}
                    </li>
                  ))}
                </ul>
              </details>
            </Section>
          )}

          {/* Structured Data */}
          <Section title="Structured Data">
            {page.hasStructuredData ? (
              <div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {page.schemaTypes.map((t) => (
                    <span key={t} className="bg-[var(--chart-1)]/20 text-[var(--chart-1)] text-xs px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
                {page.hasBreadcrumbSchema && (
                  <span className="bg-[var(--chart-2)]/20 text-[var(--chart-2)] text-xs px-2 py-0.5 rounded mr-2">Breadcrumb Schema</span>
                )}
                {page.schemaRaw.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                      View raw JSON-LD
                    </summary>
                    <pre className="mt-1 p-2 bg-card rounded text-xs text-foreground overflow-auto max-h-48">
                      {JSON.stringify(page.schemaRaw, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ) : (
              <p className="text-destructive text-xs">No JSON-LD structured data found</p>
            )}
          </Section>

          {/* Technical */}
          <Section title="Technical">
            <Grid cols={3}>
              <Field label="HTTPS" value={page.isHttps ? 'Yes' : 'No'} />
              <Field label="Mixed Content" value={page.mixedContent ? 'Yes' : 'No'} />
              <Field label="AMP Version" value={page.hasAmpVersion ? 'Yes' : 'No'} />
              <Field label="Render Blocking" value={String(page.renderBlockingScripts)} />
              <Field label="Inline Styles" value={String(page.inlineStyleCount)} />
              <Field label="External Scripts" value={String(page.externalScriptCount)} />
              <Field label="Preload" value={page.hasPreload ? 'Yes' : 'No'} />
              <Field label="Preconnect" value={page.hasPreconnect ? 'Yes' : 'No'} />
            </Grid>
          </Section>

          {/* URL */}
          <Section title="URL Analysis">
            <Grid cols={3}>
              <Field label="Length" value={`${page.urlLength} chars`} />
              <Field label="Depth" value={String(page.urlDepth)} />
              <Field label="Has Params" value={page.urlHasParams ? 'Yes' : 'No'} />
              <Field label="Uppercase" value={page.urlHasUppercase ? 'Yes' : 'No'} />
              <Field label="Underscores" value={page.urlHasUnderscores ? 'Yes' : 'No'} />
              <Field label="Trailing Slash" value={page.urlHasTrailingSlash ? 'Yes' : 'No'} />
            </Grid>
          </Section>

          {/* Mobile */}
          <Section title="Mobile">
            <Grid cols={2}>
              <Field label="Mobile Viewport" value={page.hasMobileViewport ? 'Yes' : 'No'} />
              <Field label="Interstitials Detected" value={page.hasInterstitials ? 'Yes' : 'No'} />
            </Grid>
          </Section>
        </div>
      </div>
    </div>
  );
}

function IssueRow({ issue }: { issue: Issue }) {
  const severityClasses = {
    critical: 'text-destructive bg-destructive/10 border-destructive/30',
    warning: 'text-[var(--chart-3)] bg-[var(--chart-3)]/10 border-[var(--chart-3)]/30',
    notice: 'text-[var(--chart-2)] bg-[var(--chart-2)]/10 border-[var(--chart-2)]/30',
  };

  return (
    <div className={`flex items-start gap-2 text-xs px-2 py-1 rounded border ${severityClasses[issue.severity]}`}>
      <span className="mt-0.5">{issue.severity === 'critical' ? '🔴' : issue.severity === 'warning' ? '⚠' : 'ℹ'}</span>
      <span>{issue.message}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={`grid gap-2 ${cols === 3 ? 'grid-cols-2 md:grid-cols-3' : cols === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  sub,
  mono,
}: {
  label: string;
  value: string | undefined;
  sub?: string;
  mono?: boolean;
}) {
  const display = value || <span className="text-muted-foreground/50">—</span>;
  return (
    <div className="bg-card rounded p-2">
      <p className="text-xs text-muted-foreground/70 mb-0.5">{label}</p>
      <p className={`text-xs text-foreground break-all ${mono ? 'font-mono' : ''}`}>{display}</p>
      {sub && <p className="text-xs text-muted-foreground/70 mt-0.5">{sub}</p>}
    </div>
  );
}
