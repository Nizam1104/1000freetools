#!/usr/bin/env node
/**
 * Script to update page files with SEO component imports
 * Run with: node scripts/update-seo-imports.js
 */

const fs = require('fs');
const path = require('path');

// Map of page paths to their SEO component names
const pagesToUpdate = [
  // date-time-tools
  { page: 'app/date-time-tools/date-difference-in-units/page.tsx', done: true },
  
  // qr-code-tools (24 pages)
  { page: 'app/qr-code-tools/qr-code-app-store/page.tsx', done: true },
  { page: 'app/qr-code-tools/bulk-qr-code-generator/page.tsx', seo: 'BulkQrCodeGeneratorSeo' },
  { page: 'app/qr-code-tools/qr-code-augmented-reality/page.tsx', seo: 'QrCodeAugmentedRealitySeo' },
  { page: 'app/qr-code-tools/qr-code-coupon-generator/page.tsx', seo: 'QrCodeCouponGeneratorSeo' },
  { page: 'app/qr-code-tools/qr-code-document-download/page.tsx', seo: 'QrCodeDocumentDownloadSeo' },
  { page: 'app/qr-code-tools/qr-code-for-pdf/page.tsx', seo: 'QrCodeForPdfSeo' },
  { page: 'app/qr-code-tools/qr-code-to-text-decoder/page.tsx', seo: 'QrCodeToTextDecoderSeo' },
  { page: 'app/qr-code-tools/qr-code-error-correction/page.tsx', seo: 'QrCodeErrorCorrectionSeo' },
  { page: 'app/qr-code-tools/qr-code-social-media/page.tsx', seo: 'QrCodeSocialMediaSeo' },
  { page: 'app/qr-code-tools/qr-code-event-ticket/page.tsx', seo: 'QrCodeEventTicketSeo' },
  { page: 'app/qr-code-tools/qr-code-paypal/page.tsx', seo: 'QrCodePaypalSeo' },
  { page: 'app/qr-code-tools/qr-code-feedback-form/page.tsx', seo: 'QrCodeFeedbackFormSeo' },
  { page: 'app/qr-code-tools/qr-code-crypto-address/page.tsx', seo: 'QrCodeCryptoAddressSeo' },
  { page: 'app/qr-code-tools/qr-code-color-picker/page.tsx', seo: 'QrCodeColorPickerSeo' },
  { page: 'app/qr-code-tools/qr-code-analytics-tracker/page.tsx', seo: 'QrCodeAnalyticsTrackerSeo' },
  { page: 'app/qr-code-tools/qr-code-with-logo-generator/page.tsx', seo: 'QrCodeWithLogoGeneratorSeo' },
  { page: 'app/qr-code-tools/qr-code-restaurant-menu/page.tsx', seo: 'QrCodeRestaurantMenuSeo' },
  { page: 'app/qr-code-tools/qr-code-frame-border-designer/page.tsx', seo: 'QrCodeFrameBorderDesignerSeo' },
  { page: 'app/qr-code-tools/qr-code-link-shortener/page.tsx', seo: 'QrCodeLinkShortenerSeo' },
  { page: 'app/qr-code-tools/qr-code-file-size-optimizer/page.tsx', seo: 'QrCodeFileSizeOptimizerSeo' },
  { page: 'app/qr-code-tools/dynamic-qr-code-generator/page.tsx', seo: 'DynamicQrCodeGeneratorSeo' },
  { page: 'app/qr-code-tools/qr-code-to-pdf/page.tsx', seo: 'QrCodeToPdfSeo' },
  { page: 'app/qr-code-tools/qr-code-for-crypto-payment/page.tsx', seo: 'QrCodeForCryptoPaymentSeo' },
  
  // svg-tools (9 pages)
  { page: 'app/svg-tools/svg-editor-online/page.tsx', seo: 'SvgEditorOnlineSeo' },
  { page: 'app/svg-tools/animated-svg-lottie-player-validator/page.tsx', seo: 'AnimatedSvgLottiePlayerValidatorSeo' },
  { page: 'app/svg-tools/svg-to-pdf-converter/page.tsx', seo: 'SvgToPdfConverterSeo' },
  { page: 'app/svg-tools/svg-font-to-path-converter/page.tsx', seo: 'SvgFontToPathConverterSeo' },
  { page: 'app/svg-tools/svg-gradient-generator-editor/page.tsx', seo: 'SvgGradientGeneratorEditorSeo' },
  { page: 'app/svg-tools/svg-metadata-viewer-remover/page.tsx', seo: 'SvgMetadataViewerRemoverSeo' },
  { page: 'app/svg-tools/svg-comparison-diff-tool/page.tsx', seo: 'SvgComparisonDiffToolSeo' },
  { page: 'app/svg-tools/svg-to-base64-encoder/page.tsx', seo: 'SvgToBase64EncoderSeo' },
  
  // html-tools (3 pages)
  { page: 'app/html-tools/html-diff-checker-comparator/page.tsx', seo: 'HtmlDiffCheckerComparatorSeo' },
  { page: 'app/html-tools/html-base64-image-encoder/page.tsx', seo: 'HtmlBase64ImageEncoderSeo' },
  { page: 'app/html-tools/html-special-characters-library/page.tsx', seo: 'HtmlSpecialCharactersLibrarySeo' },
  
  // timezone-tools (14 pages)
  { page: 'app/timezone-tools/timezone-widget-clock-embed-generator/page.tsx', seo: 'TimezoneWidgetClockEmbedGeneratorSeo' },
  { page: 'app/timezone-tools/historical-time-zone-converter/page.tsx', seo: 'HistoricalTimeZoneConverterSeo' },
  { page: 'app/timezone-tools/meeting-planner-across-time-zones/page.tsx', seo: 'MeetingPlannerAcrossTimeZonesSeo' },
  { page: 'app/timezone-tools/timezone-map-visual-finder/page.tsx', seo: 'TimezoneMapVisualFinderSeo' },
  { page: 'app/timezone-tools/time-zone-difference-calculator/page.tsx', seo: 'TimeZoneDifferenceCalculatorSeo' },
  { page: 'app/timezone-tools/timezone-database-iana-lookup/page.tsx', seo: 'TimezoneDatabaseIanaLookupSeo' },
  { page: 'app/timezone-tools/daylight-saving-time-calculator-schedule/page.tsx', seo: 'DaylightSavingTimeCalculatorScheduleSeo' },
  { page: 'app/timezone-tools/time-zone-abbreviation-lookup-decoder/page.tsx', seo: 'TimeZoneAbbreviationLookupDecoderSeo' },
  { page: 'app/timezone-tools/military-time-converter-24-hour-clock/page.tsx', seo: 'MilitaryTimeConverter24HourClockSeo' },
  { page: 'app/timezone-tools/country-time-zone-list-current-time-finder/page.tsx', seo: 'CountryTimeZoneListCurrentTimeFinderSeo' },
  { page: 'app/timezone-tools/world-clock-time-zone-converter/page.tsx', seo: 'WorldClockTimeZoneConverterSeo' },
  { page: 'app/timezone-tools/live-countdown-timer-across-time-zones/page.tsx', seo: 'LiveCountdownTimerAcrossTimeZonesSeo' },
  { page: 'app/timezone-tools/add-subtract-time-across-zones-calculator/page.tsx', seo: 'AddSubtractTimeAcrossZonesCalculatorSeo' },
  { page: 'app/timezone-tools/international-phone-call-time-finder/page.tsx', seo: 'InternationalPhoneCallTimeFinderSeo' },
  { page: 'app/timezone-tools/flight-time-time-zone-arrival-calculator/page.tsx', seo: 'FlightTimeTimeZoneArrivalCalculatorSeo' },
  
  // number-tools (11 pages)
  { page: 'app/number-tools/unit-converter/page.tsx', seo: 'UnitConverterSeo' },
  { page: 'app/number-tools/number-sorter/page.tsx', seo: 'NumberSorterSeo' },
  { page: 'app/number-tools/currency-formatter/page.tsx', seo: 'CurrencyFormatterSeo' },
  { page: 'app/number-tools/factorial-calculator/page.tsx', seo: 'FactorialCalculatorSeo' },
  { page: 'app/number-tools/palindrome-number-checker/page.tsx', seo: 'PalindromeNumberCheckerSeo' },
  { page: 'app/number-tools/rounding-calculator/page.tsx', seo: 'RoundingCalculatorSeo' },
  { page: 'app/number-tools/phone-number-formatter/page.tsx', seo: 'PhoneNumberFormatterSeo' },
  { page: 'app/number-tools/number-to-time-converter/page.tsx', seo: 'NumberToTimeConverterSeo' },
  { page: 'app/number-tools/gcf-calculator/page.tsx', seo: 'GcfCalculatorSeo' },
  { page: 'app/number-tools/divisibility-tester/page.tsx', seo: 'DivisibilityTesterSeo' },
  { page: 'app/number-tools/scientific-notation-converter/page.tsx', seo: 'ScientificNotationConverterSeo' },
  
  // uuid-tools (9 pages)
  { page: 'app/uuid-tools/uuid-version-converter/page.tsx', seo: 'UuidVersionConverterSeo' },
  { page: 'app/uuid-tools/uuid-timestamp-to-date/page.tsx', seo: 'UuidTimestampToDateSeo' },
  { page: 'app/uuid-tools/uuid-regex-tester/page.tsx', seo: 'UuidRegexTesterSeo' },
  { page: 'app/uuid-tools/uuid-v1-generator/page.tsx', seo: 'UuidV1GeneratorSeo' },
  { page: 'app/uuid-tools/offline-uuid-generator/page.tsx', seo: 'OfflineUuidGeneratorSeo' },
  { page: 'app/uuid-tools/uuid-entropy-checker/page.tsx', seo: 'UuidEntropyCheckerSeo' },
  { page: 'app/uuid-tools/bulk-uuid-generator/page.tsx', seo: 'BulkUuidGeneratorSeo' },
  { page: 'app/uuid-tools/uuid-to-qr-code/page.tsx', seo: 'UuidToQrCodeSeo' },
  
  // jwt-tools (13 pages)
  { page: 'app/jwt-tools/jwt-to-curl-command-generator/page.tsx', seo: 'JwtToCurlCommandGeneratorSeo' },
  { page: 'app/jwt-tools/jwt-token-size-calculator-optimizer/page.tsx', seo: 'JwtTokenSizeCalculatorOptimizerSeo' },
  { page: 'app/jwt-tools/jwt-expiry-checker-timestamp-converter/page.tsx', seo: 'JwtExpiryCheckerTimestampConverterSeo' },
  { page: 'app/jwt-tools/jwt-base64-url-encoder-decoder/page.tsx', seo: 'JwtBase64UrlEncoderDecoderSeo' },
  { page: 'app/jwt-tools/jwt-token-scrambler-obfuscator/page.tsx', seo: 'JwtTokenScramblerObfuscatorSeo' },
  { page: 'app/jwt-tools/jwt-token-storage-viewer/page.tsx', seo: 'JwtTokenStorageViewerSeo' },
  { page: 'app/jwt-tools/jwt-token-builder-templates/page.tsx', seo: 'JwtTokenBuilderTemplatesSeo' },
  { page: 'app/jwt-tools/jwt-token-diff-compare/page.tsx', seo: 'JwtTokenDiffCompareSeo' },
  { page: 'app/jwt-tools/jwt-public-key-extractor-jwk-generator/page.tsx', seo: 'JwtPublicKeyExtractorJwkGeneratorSeo' },
  { page: 'app/jwt-tools/jwt-algorithm-converter-switcher/page.tsx', seo: 'JwtAlgorithmConverterSwitcherSeo' },
  { page: 'app/jwt-tools/jwt-claim-extractor-formatter/page.tsx', seo: 'JwtClaimExtractorFormatterSeo' },
  { page: 'app/jwt-tools/jwt-token-lifespan-renewal-simulator/page.tsx', seo: 'JwtTokenLifespanRenewalSimulatorSeo' },
  { page: 'app/jwt-tools/jwt-debugger-tester/page.tsx', seo: 'JwtDebuggerTesterSeo' },
  
  // cron-expression-tools (10 pages)
  { page: 'app/cron-expression-tools/cron-expression-social-media-posting/page.tsx', seo: 'CronExpressionSocialMediaPostingSeo' },
  { page: 'app/cron-expression-tools/cron-expression-tester-next-run-times/page.tsx', seo: 'CronExpressionTesterNextRunTimesSeo' },
  { page: 'app/cron-expression-tools/cron-expression-wordpress-cron-jobs/page.tsx', seo: 'CronExpressionWordpressCronJobsSeo' },
  { page: 'app/cron-expression-tools/cron-expression-ssl-certificate-renewal/page.tsx', seo: 'CronExpressionSslCertificateRenewalSeo' },
  { page: 'app/cron-expression-tools/cron-expression-data-sync-etl/page.tsx', seo: 'CronExpressionDataSyncEtlSeo' },
  { page: 'app/cron-expression-tools/cron-expression-aws-cloudwatch-events/page.tsx', seo: 'CronExpressionAwsCloudwatchEventsSeo' },
  { page: 'app/cron-expression-tools/cron-expression-kubernetes-cronjobs/page.tsx', seo: 'CronExpressionKubernetesCronjobsSeo' },
  { page: 'app/cron-expression-tools/cron-expression-api-polling-webhooks/page.tsx', seo: 'CronExpressionApiPollingWebhooksSeo' },
  { page: 'app/cron-expression-tools/cron-expression-monitoring-alerts/page.tsx', seo: 'CronExpressionMonitoringAlertsSeo' },
  
  // minifier-tools (15 pages)
  { page: 'app/minifier-tools/real-time-minifier/page.tsx', seo: 'RealTimeMinifierSeo' },
  { page: 'app/minifier-tools/code-minifier/page.tsx', seo: 'CodeMinifierSeo' },
  { page: 'app/minifier-tools/xml-minifier/page.tsx', seo: 'XmlMinifierSeo' },
  { page: 'app/minifier-tools/html-inline-css-js-minifier/page.tsx', seo: 'HtmlInlineCssJsMinifierSeo' },
  { page: 'app/minifier-tools/svg-minifier/page.tsx', seo: 'SvgMinifierSeo' },
  { page: 'app/minifier-tools/cli-minifier-generator/page.tsx', seo: 'CliMinifierGeneratorSeo' },
  { page: 'app/minifier-tools/bulk-file-minifier/page.tsx', seo: 'BulkFileMinifierSeo' },
  { page: 'app/minifier-tools/code-beautifier/page.tsx', seo: 'CodeBeautifierSeo' },
  { page: 'app/minifier-tools/minification-analyzer/page.tsx', seo: 'MinificationAnalyzerSeo' },
  { page: 'app/minifier-tools/php-minifier/page.tsx', seo: 'PhpMinifierSeo' },
  { page: 'app/minifier-tools/css-js-combined-minifier/page.tsx', seo: 'CssJsCombinedMinifierSeo' },
  { page: 'app/minifier-tools/minified-diff-viewer/page.tsx', seo: 'MinifiedDiffViewerSeo' },
  { page: 'app/minifier-tools/sql-minifier/page.tsx', seo: 'SqlMinifierSeo' },
  { page: 'app/minifier-tools/text-minifier/page.tsx', seo: 'TextMinifierSeo' },
  { page: 'app/minifier-tools/wordpress-minifier/page.tsx', seo: 'WordpressMinifierSeo' },
  { page: 'app/minifier-tools/base64-minifier/page.tsx', seo: 'Base64MinifierSeo' },
  
  // font-tools (10 pages)
  { page: 'app/font-tools/font-statistics-analyzer/page.tsx', seo: 'FontStatisticsAnalyzerSeo' },
  { page: 'app/font-tools/font-contrast-checker/page.tsx', seo: 'FontContrastCheckerSeo' },
  { page: 'app/font-tools/font-stress-tester/page.tsx', seo: 'FontStressTesterSeo' },
  { page: 'app/font-tools/font-duplicate-finder/page.tsx', seo: 'FontDuplicateFinderSeo' },
  { page: 'app/font-tools/font-ocr-extractor/page.tsx', seo: 'FontOcrExtractorSeo' },
  { page: 'app/font-tools/font-metadata-editor/page.tsx', seo: 'FontMetadataEditorSeo' },
  { page: 'app/font-tools/font-license-checker/page.tsx', seo: 'FontLicenseCheckerSeo' },
  { page: 'app/font-tools/font-style-transfer/page.tsx', seo: 'FontStyleTransferSeo' },
  { page: 'app/font-tools/font-base64-encoder/page.tsx', seo: 'FontBase64EncoderSeo' },
  { page: 'app/font-tools/font-pairing/page.tsx', seo: 'FontPairingSeo' },
  
  // excel-tools (3 pages)
  { page: 'app/excel-tools/excel-sort-data-tool/page.tsx', seo: 'ExcelSortDataToolSeo' },
  { page: 'app/excel-tools/excel-remove-blank-rows/page.tsx', seo: 'ExcelRemoveBlankRowsSeo' },
  { page: 'app/excel-tools/excel-combine-multiple-sheets/page.tsx', seo: 'ExcelCombineMultipleSheetsSeo' },
  
  // javascript-tools (14 pages)
  { page: 'app/javascript-tools/json-validator-formatter/page.tsx', seo: 'JsonValidatorFormatterSeo' },
  { page: 'app/javascript-tools/javascript-unit-test-assertion-generator/page.tsx', seo: 'JavascriptUnitTestAssertionGeneratorSeo' },
  { page: 'app/javascript-tools/javascript-beautifier-formatter/page.tsx', seo: 'JavascriptBeautifierFormatterSeo' },
  { page: 'app/javascript-tools/javascript-encryption-decryption-tool/page.tsx', seo: 'JavascriptEncryptionDecryptionToolSeo' },
  { page: 'app/javascript-tools/javascript-regex-tester-debugger/page.tsx', seo: 'JavascriptRegexTesterDebuggerSeo' },
  { page: 'app/javascript-tools/javascript-color-converter-picker/page.tsx', seo: 'JavascriptColorConverterPickerSeo' },
  { page: 'app/javascript-tools/javascript-image-base64-data-url-converter/page.tsx', seo: 'JavascriptImageBase64DataUrlConverterSeo' },
  { page: 'app/javascript-tools/javascript-url-parser-query-string-builder/page.tsx', seo: 'JavascriptUrlParserQueryStringBuilderSeo' },
  { page: 'app/javascript-tools/javascript-diff-checker-comparator/page.tsx', seo: 'JavascriptDiffCheckerComparatorSeo' },
  { page: 'app/javascript-tools/javascript-object-json-converter/page.tsx', seo: 'JavascriptObjectJsonConverterSeo' },
  { page: 'app/javascript-tools/javascript-obfuscator-protector/page.tsx', seo: 'JavascriptObfuscatorProtectorSeo' },
  { page: 'app/javascript-tools/javascript-function-code-generator/page.tsx', seo: 'JavascriptFunctionCodeGeneratorSeo' },
  { page: 'app/javascript-tools/javascript-linter-code-quality-checker/page.tsx', seo: 'JavascriptLinterCodeQualityCheckerSeo' },
  { page: 'app/javascript-tools/base64-encoder-decoder-javascript/page.tsx', seo: 'Base64EncoderDecoderJavascriptSeo' },
];

function getSeoComponentName(pagePath) {
  const entry = pagesToUpdate.find(p => p.page === pagePath);
  if (entry && entry.seo) {
    return entry.seo;
  }
  // Generate from path
  const parts = pagePath.split('/');
  const toolName = parts[parts.length - 2]; // e.g., 'qr-code-app-store'
  // Convert to PascalCase + 'Seo'
  const pascalCase = toolName.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
  return pascalCase + 'Seo';
}

function getSeoImportPath(pagePath) {
  const parts = pagePath.split('/');
  const category = parts[parts.length - 3]; // e.g., 'qr-code-tools'
  const toolName = parts[parts.length - 2]; // e.g., 'qr-code-app-store'
  return `@/components/seo-content/${category}/${toolName}`;
}

function updatePageFile(pagePath) {
  const fullPath = path.join(__dirname, '..', pagePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping (not found): ${pagePath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if already has SEO import
  if (content.includes('Seo from')) {
    console.log(`Skipping (already updated): ${pagePath}`);
    return false;
  }
  
  // Check if has TODO comment
  if (!content.includes('TODO: add seo component')) {
    console.log(`Skipping (no TODO): ${pagePath}`);
    return false;
  }
  
  const seoComponentName = getSeoComponentName(pagePath);
  const seoImportPath = getSeoImportPath(pagePath);
  
  // Add import
  const importStatement = `import ${seoComponentName} from "${seoImportPath}";\n`;
  content = content.replace(
    /^(import type \{ Metadata \} from "next";)/m,
    `$1\n${importStatement}`
  );
  
  // Replace TODO with component
  const toolName = pagePath.split('/').slice(-2)[0];
  content = content.replace(
    new RegExp(`\\{\\* TODO: add seo component for ${toolName} \\*\\}`, 'g'),
    `<div className="mt-16">\n        <${seoComponentName} />\n      </div>`
  );
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated: ${pagePath}`);
  return true;
}

// Main execution
console.log('Updating page files with SEO components...\n');

let updated = 0;
let skipped = 0;

pagesToUpdate.forEach(({ page, done }) => {
  if (done) {
    console.log(`Already done: ${page}`);
    skipped++;
    return;
  }
  if (updatePageFile(page)) {
    updated++;
  } else {
    skipped++;
  }
});

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
