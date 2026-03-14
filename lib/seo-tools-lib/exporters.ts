/**
 * Exporters - CSV and PDF/HTML Report Generation
 *
 * Generates export files for SEO audit reports.
 */

import type { PageData, Issue } from './types';

// ─── CSV Export ───────────────────────────────────────────────────────────────

/**
 * Escape a value for CSV (handle commas, quotes, newlines)
 */
function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  const str = String(value);

  // If contains comma, quote, or newline, wrap in quotes and escape quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

/**
 * Export pages data as CSV
 */
export function exportCsv(pages: PageData[]): string {
  // CSV header
  const headers = [
    'URL',
    'Status Code',
    'SEO Score',
    'Issues Count',
    'Critical Issues',
    'Warning Issues',
    'Notice Issues',
    'Word Count',
    'Title',
    'Title Length',
    'Meta Description',
    'Meta Description Length',
    'H1 Count',
    'H1 Text',
    'Canonical URL',
    'Has Schema',
    'Schema Types',
    'Internal Links',
    'External Links',
    'Images',
    'Images Without Alt',
    'No Index',
    'No Follow',
    'HTTPS',
    'Response Time (ms)',
    'Crawled At',
  ];

  const rows = pages.map((page) => {
    // Count issues by severity
    const criticalIssues = page.issues.filter((i) => i.severity === 'critical').length;
    const warningIssues = page.issues.filter((i) => i.severity === 'warning').length;
    const noticeIssues = page.issues.filter((i) => i.severity === 'notice').length;

    return [
      escapeCsvValue(page.url),
      escapeCsvValue(page.statusCode),
      escapeCsvValue(page.seoScore),
      escapeCsvValue(page.issues.length),
      escapeCsvValue(criticalIssues),
      escapeCsvValue(warningIssues),
      escapeCsvValue(noticeIssues),
      escapeCsvValue(page.wordCount),
      escapeCsvValue(page.title),
      escapeCsvValue(page.titleLength),
      escapeCsvValue(page.metaDescription),
      escapeCsvValue(page.metaDescriptionLength),
      escapeCsvValue(page.h1Count),
      escapeCsvValue(page.h1s.join('; ')),
      escapeCsvValue(page.canonicalUrl),
      escapeCsvValue(page.hasStructuredData ? 'Yes' : 'No'),
      escapeCsvValue(page.schemaTypes.join(', ')),
      escapeCsvValue(page.internalLinkCount),
      escapeCsvValue(page.externalLinkCount),
      escapeCsvValue(page.imageCount),
      escapeCsvValue(page.imagesWithoutAlt),
      escapeCsvValue(page.noindex ? 'Yes' : 'No'),
      escapeCsvValue(page.nofollow ? 'Yes' : 'No'),
      escapeCsvValue(page.isHttps ? 'Yes' : 'No'),
      escapeCsvValue(page.responseTimeMs),
      escapeCsvValue(page.crawledAt),
    ];
  });

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

/**
 * Download CSV file
 */
export function downloadCsv(pages: PageData[], filename?: string): void {
  const csv = exportCsv(pages);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `seo-audit-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ─── PDF/HTML Export ──────────────────────────────────────────────────────────

/**
 * Calculate site-wide statistics
 */
function calculateSiteStats(pages: PageData[]) {
  const totalIssues = pages.reduce((sum, p) => sum + p.issues.length, 0);
  const criticalIssues = pages.reduce(
    (sum, p) => sum + p.issues.filter((i) => i.severity === 'critical').length,
    0
  );
  const warningIssues = pages.reduce(
    (sum, p) => sum + p.issues.filter((i) => i.severity === 'warning').length,
    0
  );
  const noticeIssues = pages.reduce(
    (sum, p) => sum + p.issues.filter((i) => i.severity === 'notice').length,
    0
  );

  const avgScore =
    pages.length > 0
      ? Math.round(pages.reduce((sum, p) => sum + p.seoScore, 0) / pages.length)
      : 0;

  const totalWords = pages.reduce((sum, p) => sum + p.wordCount, 0);
  const totalImages = pages.reduce((sum, p) => sum + p.imageCount, 0);
  const imagesWithoutAlt = pages.reduce((sum, p) => sum + p.imagesWithoutAlt, 0);

  const httpErrors = pages.filter(
    (p) => p.statusCode >= 400 || p.error
  ).length;

  const noindexPages = pages.filter((p) => p.noindex).length;
  const nonHttps = pages.filter((p) => !p.isHttps).length;

  return {
    totalIssues,
    criticalIssues,
    warningIssues,
    noticeIssues,
    avgScore,
    totalWords,
    totalImages,
    imagesWithoutAlt,
    httpErrors,
    noindexPages,
    nonHttps,
  };
}

/**
 * Get severity badge color
 */
function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return '#dc2626'; // red-600
    case 'warning':
      return '#d97706'; // amber-600
    case 'notice':
      return '#2563eb'; // blue-600
    default:
      return '#52525b'; // zinc-600
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Generate HTML report for PDF export
 */
export function exportPdfHtml(pages: PageData[], siteScore?: number): string {
  const stats = calculateSiteStats(pages);
  const overallScore = siteScore ?? stats.avgScore;

  // Determine score color
  const scoreColor =
    overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#f59e0b' : '#dc2626';

  // Group top issues by frequency
  const issueCounts: Record<string, { count: number; message: string; severity: string }> =
    {};
  for (const page of pages) {
    for (const issue of page.issues) {
      if (!issueCounts[issue.code]) {
        issueCounts[issue.code] = {
          count: 0,
          message: issue.message,
          severity: issue.severity,
        };
      }
      issueCounts[issue.code].count++;
    }
  }

  const topIssues = Object.entries(issueCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  // Pages with most issues
  const pagesByIssues = [...pages]
    .sort((a, b) => b.issues.length - a.issues.length)
    .slice(0, 10);

  // Pages with lowest scores
  const pagesByScore = [...pages]
    .sort((a, b) => a.seoScore - b.seoScore)
    .slice(0, 10);

  const generatedAt = new Date().toLocaleString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO Audit Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #18181b;
      background: #ffffff;
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #e4e4e7;
    }

    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .header p {
      color: #71717a;
      font-size: 14px;
    }

    .score-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .score-ring {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: conic-gradient(${scoreColor} ${overallScore * 3.6}deg, #e4e4e7 0deg);
      margin-bottom: 16px;
    }

    .score-inner {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: 700;
      color: ${scoreColor};
    }

    .score-label {
      font-size: 16px;
      color: #71717a;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: #f4f4f5;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 13px;
      color: #71717a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-card.critical .stat-value {
      color: #dc2626;
    }

    .stat-card.warning .stat-value {
      color: #f59e0b;
    }

    .stat-card.notice .stat-value {
      color: #2563eb;
    }

    .section {
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e4e4e7;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e4e4e7;
    }

    th {
      background: #f4f4f5;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #52525b;
    }

    td {
      font-size: 14px;
    }

    tr:hover {
      background: #fafafa;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 500;
    }

    .badge-critical {
      background: #fef2f2;
      color: #dc2626;
    }

    .badge-warning {
      background: #fffbeb;
      color: #d97706;
    }

    .badge-notice {
      background: #eff6ff;
      color: #2563eb;
    }

    .url-cell {
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .issue-list {
      list-style: none;
    }

    .issue-item {
      padding: 8px 0;
      border-bottom: 1px solid #f4f4f5;
    }

    .issue-item:last-child {
      border-bottom: none;
    }

    .pages-grid {
      display: grid;
      gap: 12px;
    }

    .page-item {
      background: #f4f4f5;
      padding: 12px 16px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .page-url {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 70%;
    }

    .page-score {
      font-weight: 600;
      font-size: 14px;
    }

    .page-score.good {
      color: #10b981;
    }

    .page-score.medium {
      color: #f59e0b;
    }

    .page-score.bad {
      color: #dc2626;
    }

    .footer {
      text-align: center;
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e4e4e7;
      color: #71717a;
      font-size: 13px;
    }

    @media print {
      body {
        padding: 0;
      }

      .container {
        max-width: 100%;
      }

      @page {
        margin: 20mm;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SEO Audit Report</h1>
      <p>Generated on ${generatedAt}</p>
      <p>${pages.length} pages analyzed</p>
    </div>

    <div class="score-section">
      <div class="score-ring">
        <div class="score-inner">${overallScore}</div>
      </div>
      <div class="score-label">Overall Site Health Score</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${pages.length}</div>
        <div class="stat-label">Pages Crawled</div>
      </div>

      <div class="stat-card critical">
        <div class="stat-value">${stats.criticalIssues}</div>
        <div class="stat-label">Critical Issues</div>
      </div>

      <div class="stat-card warning">
        <div class="stat-value">${stats.warningIssues}</div>
        <div class="stat-label">Warning Issues</div>
      </div>

      <div class="stat-card notice">
        <div class="stat-value">${stats.noticeIssues}</div>
        <div class="stat-label">Notices</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">${stats.totalWords.toLocaleString()}</div>
        <div class="stat-label">Total Words</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">${stats.totalImages}</div>
        <div class="stat-label">Total Images</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">${stats.imagesWithoutAlt}</div>
        <div class="stat-label">Missing Alt Text</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">${stats.httpErrors}</div>
        <div class="stat-label">HTTP Errors</div>
      </div>
    </div>

    ${topIssues.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Top Issues</h2>
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Severity</th>
            <th>Affected Pages</th>
          </tr>
        </thead>
        <tbody>
          ${topIssues
            .map(
              ([code, data]) => `
            <tr>
              <td>${escapeHtml(data.message)}</td>
              <td><span class="badge badge-${data.severity}">${data.severity}</span></td>
              <td>${data.count}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <div class="section">
      <h2 class="section-title">Pages with Most Issues</h2>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Score</th>
            <th>Issues</th>
            <th>Critical</th>
            <th>Warnings</th>
          </tr>
        </thead>
        <tbody>
          ${pagesByIssues
            .map(
              (page) => `
            <tr>
              <td class="url-cell" title="${escapeHtml(page.url)}">${escapeHtml(page.url)}</td>
              <td><strong>${page.seoScore}</strong></td>
              <td>${page.issues.length}</td>
              <td>${page.issues.filter((i) => i.severity === 'critical').length}</td>
              <td>${page.issues.filter((i) => i.severity === 'warning').length}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2 class="section-title">Pages with Lowest Scores</h2>
      <div class="pages-grid">
        ${pagesByScore
          .map(
            (page) => `
          <div class="page-item">
            <span class="page-url" title="${escapeHtml(page.url)}">${escapeHtml(page.url)}</span>
            <span class="page-score ${page.seoScore >= 80 ? 'good' : page.seoScore >= 60 ? 'medium' : 'bad'}">${page.seoScore}</span>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">All Pages Summary</h2>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Status</th>
            <th>Score</th>
            <th>Word Count</th>
            <th>Title</th>
            <th>Issues</th>
          </tr>
        </thead>
        <tbody>
          ${pages
            .map(
              (page) => `
            <tr>
              <td class="url-cell" title="${escapeHtml(page.url)}">${escapeHtml(page.url)}</td>
              <td>${page.statusCode}</td>
              <td><strong>${page.seoScore}</strong></td>
              <td>${page.wordCount}</td>
              <td class="url-cell" title="${escapeHtml(page.title)}">${escapeHtml(page.title)}</td>
              <td>${page.issues.length}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="footer">
      <p>SEO Analytics Report • Generated automatically</p>
    </div>
  </div>

  <script>
    // Auto-print on load for PDF generation
    window.addEventListener('load', () => {
      // Uncomment the next line for auto-print
      // window.print();
    });
  </script>
</body>
</html>`;
}

/**
 * Download HTML report for PDF export
 */
export function downloadPdfHtml(pages: PageData[], siteScore?: number, filename?: string): void {
  const html = exportPdfHtml(pages, siteScore);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `seo-report-${new Date().toISOString().split('T')[0]}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Open HTML report in new window for printing
 */
export function openReportForPrint(pages: PageData[], siteScore?: number): void {
  const html = exportPdfHtml(pages, siteScore);
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    win.focus();
    // Auto-trigger print dialog after a short delay
    setTimeout(() => {
      win.print();
    }, 500);
  }
}

// ─── Site Score Calculation ───────────────────────────────────────────────────

/**
 * Calculate overall site health score
 */
export function calculateSiteScore(pages: PageData[]): number {
  if (pages.length === 0) return 0;

  // Weight pages by importance (homepage gets higher weight)
  const totalScore = pages.reduce((sum, page) => {
    const isHomepage = page.url.endsWith('/') || page.url.match(/\/index\.html?$/i);
    const weight = isHomepage ? 2 : 1;
    return sum + page.seoScore * weight;
  }, 0);

  const totalWeight = pages.reduce((sum, page) => {
    const isHomepage = page.url.endsWith('/') || page.url.match(/\/index\.html?$/i);
    return sum + (isHomepage ? 2 : 1);
  }, 0);

  return Math.round(totalScore / totalWeight);
}
