"use client";
import Link from "next/link";
import { Twitter, Wrench, ArrowUpRight } from "lucide-react";
// import footerLinks from "@/json-assets/footer-tool-links.json";
// import { getFooterLinks } from "@/json-assets/get-footer-links"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms" },
];

export default function Footer() {
  const footerLinks = [
    {
      categoryName: "Ascii Tools",
      tools: [
        { name: "Ascii Tools", href: "/ascii-tools" },
        {
          name: "Ascii To Hex Converter",
          href: "/ascii-tools/ascii-to-hex-converter",
        },
        {
          name: "Ascii To Decimal Converter",
          href: "/ascii-tools/ascii-to-decimal-converter",
        },
        {
          name: "Ascii To Octal Converter",
          href: "/ascii-tools/ascii-to-octal-converter",
        },
        {
          name: "Ascii To Braille Converter",
          href: "/ascii-tools/ascii-to-braille-converter",
        },
        {
          name: "Utf8 To Utf16 Converter",
          href: "/ascii-tools/utf8-to-utf16-converter",
        },
        { name: "Utf8 Validator", href: "/ascii-tools/utf8-validator" },
        {
          name: "Ascii Art Generator",
          href: "/ascii-tools/ascii-art-generator",
        },
        {
          name: "Leet Speak Converter",
          href: "/ascii-tools/leet-speak-converter",
        },
        {
          name: "Lorem Ipsum Generator",
          href: "/ascii-tools/lorem-ipsum-generator",
        },
        {
          name: "Upside Down Text Generator",
          href: "/ascii-tools/upside-down-text-generator",
        },
      ],
    },
    {
      categoryName: "Audio Tools",
      tools: [
        { name: "Audio Tools", href: "/audio-tools" },
        {
          name: "Audio Format Converter",
          href: "/audio-tools/audio-format-converter",
        },
        {
          name: "Audio Sample Rate Converter",
          href: "/audio-tools/audio-sample-rate-converter",
        },
        { name: "Audio Compressor", href: "/audio-tools/audio-compressor" },
        {
          name: "Audio Mono Stereo Converter",
          href: "/audio-tools/audio-mono-stereo-converter",
        },
        {
          name: "Audio Gain Analyzer",
          href: "/audio-tools/audio-gain-analyzer",
        },
        {
          name: "Audio Thumbnail Generator",
          href: "/audio-tools/audio-thumbnail-generator",
        },
        {
          name: "Audio Cover Art Extractor",
          href: "/audio-tools/audio-cover-art-extractor",
        },
        {
          name: "Audio Sample Extractor",
          href: "/audio-tools/audio-sample-extractor",
        },
        {
          name: "Audio Track Extractor",
          href: "/audio-tools/audio-track-extractor",
        },
        {
          name: "Audio Frequency Analyzer",
          href: "/audio-tools/audio-frequency-analyzer",
        },
      ],
    },
    {
      categoryName: "Barcode Tools",
      tools: [
        { name: "Barcode Tools", href: "/barcode-tools" },
        { name: "Barcode To Base64", href: "/barcode-tools/barcode-to-base64" },
        {
          name: "Qr Code Analytics Generator",
          href: "/barcode-tools/qr-code-analytics-generator",
        },
        {
          name: "Barcode To Text Converter",
          href: "/barcode-tools/barcode-to-text-converter",
        },
        {
          name: "Barcode Data Encoder",
          href: "/barcode-tools/barcode-data-encoder",
        },
        { name: "Barcode Generator", href: "/barcode-tools/barcode-generator" },
        {
          name: "Barcode Font Encoder",
          href: "/barcode-tools/barcode-font-encoder",
        },
        { name: "Barcode Validator", href: "/barcode-tools/barcode-validator" },
        {
          name: "Isbn Barcode Generator",
          href: "/barcode-tools/isbn-barcode-generator",
        },
        {
          name: "Barcode Image Resizer",
          href: "/barcode-tools/barcode-image-resizer",
        },
        {
          name: "Barcode Sequence Generator",
          href: "/barcode-tools/barcode-sequence-generator",
        },
      ],
    },
    {
      categoryName: "Binary Tools",
      tools: [
        { name: "Binary Tools", href: "/binary-tools" },
        {
          name: "Binary Checksum Hash Generator",
          href: "/binary-tools/binary-checksum-hash-generator",
        },
        {
          name: "Binary Gray Code Converter",
          href: "/binary-tools/binary-gray-code-converter",
        },
        {
          name: "Binary To Text Converter",
          href: "/binary-tools/binary-to-text-converter",
        },
        {
          name: "Binary Uuid Guid Generator",
          href: "/binary-tools/binary-uuid-guid-generator",
        },
        {
          name: "Binary To Octal Converter",
          href: "/binary-tools/binary-to-octal-converter",
        },
        {
          name: "Binary To Decimal Converter",
          href: "/binary-tools/binary-to-decimal-converter",
        },
        {
          name: "Binary Pattern Generator Finder",
          href: "/binary-tools/binary-pattern-generator-finder",
        },
        {
          name: "Decimal To Binary Converter",
          href: "/binary-tools/decimal-to-binary-converter",
        },
        {
          name: "Octal To Binary Converter",
          href: "/binary-tools/octal-to-binary-converter",
        },
        {
          name: "Text To Binary Converter",
          href: "/binary-tools/text-to-binary-converter",
        },
      ],
    },
    {
      categoryName: "Calculators",
      tools: [
        { name: "Calculators", href: "/calculators" },
        {
          name: "0–100 Acceleration Estimator",
          href: "/calculators/0-100-acceleration-estimator",
        },
        { name: "1RM Calculator", href: "/calculators/1rm-calculator" },
        {
          name: "4 Percent Rule Retirement Calculator",
          href: "/calculators/4-percent-rule-retirement-calculator",
        },
        {
          name: "50/30/20 Budget Rule Calculator",
          href: "/calculators/50-30-20-budget-rule-calculator",
        },
        {
          name: "A/B Test Significance Calculator",
          href: "/calculators/a-b-test-significance-calculator",
        },
        {
          name: "AC Impedance Calculator",
          href: "/calculators/ac-impedance-calculator",
        },
        {
          name: "ADC Resolution Calculator",
          href: "/calculators/adc-resolution-calculator",
        },
        {
          name: "AES Key Size Estimator",
          href: "/calculators/aes-key-size-estimator",
        },
        {
          name: "Acceleration Calculator",
          href: "/calculators/acceleration-calculator",
        },
        {
          name: "Acoustic Impedance Calculator",
          href: "/calculators/acoustic-impedance-calculator",
        },
      ],
    },
    {
      categoryName: "Calendar Tools",
      tools: [
        { name: "Calendar Tools", href: "/calendar-tools" },
        {
          name: "Hijri Calendar Converter",
          href: "/calendar-tools/hijri-calendar-converter",
        },
        {
          name: "Business Hours Calculator",
          href: "/calendar-tools/business-hours-calculator",
        },
        {
          name: "Date Picker Generator",
          href: "/calendar-tools/date-picker-generator",
        },
        {
          name: "Payday Calculator",
          href: "/calendar-tools/payday-calculator",
        },
        {
          name: "Calendar Matrix Generator",
          href: "/calendar-tools/calendar-matrix-generator",
        },
        {
          name: "Calendar Rss Generator",
          href: "/calendar-tools/calendar-rss-generator",
        },
        {
          name: "Pregnancy Due Date Calendar",
          href: "/calendar-tools/pregnancy-due-date-calendar",
        },
        {
          name: "Calendar Sync Overlay",
          href: "/calendar-tools/calendar-sync-overlay",
        },
        {
          name: "Perpetual Calendar",
          href: "/calendar-tools/perpetual-calendar",
        },
        {
          name: "Seasonal Calendar",
          href: "/calendar-tools/seasonal-calendar",
        },
      ],
    },
    {
      categoryName: "Chart Tools",
      tools: [
        { name: "Chart Tools", href: "/chart-tools" },
        {
          name: "Radar Chart Generator",
          href: "/chart-tools/radar-chart-generator",
        },
        {
          name: "Bar Graph Generator",
          href: "/chart-tools/bar-graph-generator",
        },
        {
          name: "Gauge Chart Generator",
          href: "/chart-tools/gauge-chart-generator",
        },
        { name: "Heat Map Generator", href: "/chart-tools/heat-map-generator" },
        {
          name: "Sankey Diagram Generator",
          href: "/chart-tools/sankey-diagram-generator",
        },
        {
          name: "Stock Chart Generator",
          href: "/chart-tools/stock-chart-generator",
        },
        {
          name: "Word Cloud Generator",
          href: "/chart-tools/word-cloud-generator",
        },
        { name: "Scatter Plot Tool", href: "/chart-tools/scatter-plot-tool" },
        { name: "Line Chart Creator", href: "/chart-tools/line-chart-creator" },
        { name: "Pareto Chart Maker", href: "/chart-tools/pareto-chart-maker" },
      ],
    },
    {
      categoryName: "Color Tools",
      tools: [
        { name: "Color Tools", href: "/color-tools" },
        {
          name: "HSL to HEX Converter",
          href: "/color-tools/hsl-to-hex-converter",
        },
        {
          name: "RGB to HEX Converter",
          href: "/color-tools/rgb-to-hex-converter",
        },
        {
          name: "HSL to HSV Converter",
          href: "/color-tools/hsl-to-hsv-converter",
        },
        {
          name: "RGB to HSL Converter",
          href: "/color-tools/rgb-to-hsl-converter",
        },
        {
          name: "HEX to RGB Converter",
          href: "/color-tools/hex-to-rgb-converter",
        },
        {
          name: "HEX to CMYK Converter",
          href: "/color-tools/hex-to-cmyk-converter",
        },
        {
          name: "CSS Color Name Converter",
          href: "/color-tools/css-color-name-converter",
        },
        {
          name: "RGB to CMYK Converter",
          href: "/color-tools/rgb-to-cmyk-converter",
        },
        {
          name: "HEX to HSL Converter",
          href: "/color-tools/hex-to-hsl-converter",
        },
        {
          name: "Gradient Step Generator",
          href: "/color-tools/gradient-step-generator",
        },
      ],
    },
    {
      categoryName: "Cron Expression Tools",
      tools: [
        { name: "Cron Expression Tools", href: "/cron-expression-tools" },
        {
          name: "Cron Expression Difference Checker",
          href: "/cron-expression-tools/cron-expression-difference-checker",
        },
        {
          name: "English To Cron Converter",
          href: "/cron-expression-tools/english-to-cron-converter",
        },
        {
          name: "Cron Expression Validator Explainer",
          href: "/cron-expression-tools/cron-expression-validator-explainer",
        },
        {
          name: "Cron Expression Generator",
          href: "/cron-expression-tools/cron-expression-generator",
        },
        {
          name: "Cron Expression Kubernetes Cronjobs",
          href: "/cron-expression-tools/cron-expression-kubernetes-cronjobs",
        },
        {
          name: "Cron Expression Wordpress Cron Jobs",
          href: "/cron-expression-tools/cron-expression-wordpress-cron-jobs",
        },
        {
          name: "Cron Expression Aws Cloudwatch Events",
          href: "/cron-expression-tools/cron-expression-aws-cloudwatch-events",
        },
        {
          name: "Cron Expression Data Sync Etl",
          href: "/cron-expression-tools/cron-expression-data-sync-etl",
        },
        {
          name: "Cron Expression From Datetime Picker",
          href: "/cron-expression-tools/cron-expression-from-datetime-picker",
        },
        {
          name: "Cron Expression Monitoring Alerts",
          href: "/cron-expression-tools/cron-expression-monitoring-alerts",
        },
      ],
    },
    {
      categoryName: "Css Tools",
      tools: [
        { name: "Css Tools", href: "/css-tools" },
        { name: "Playground", href: "/css-tools/playground" },
        { name: "Gradient Generator", href: "/css-tools/gradient-generator" },
        {
          name: "Color Palette Generator",
          href: "/css-tools/color-palette-generator",
        },
        {
          name: "Color Contrast Checker",
          href: "/css-tools/color-contrast-checker",
        },
        {
          name: "Tint & Shade Generator",
          href: "/css-tools/tint-shade-generator",
        },
        { name: "CSS Color Converter", href: "/css-tools/color-converter" },
        {
          name: "Mesh Gradient Generator",
          href: "/css-tools/css-mesh-gradient-generator",
        },
        {
          name: "Box Shadow Generator",
          href: "/css-tools/box-shadow-generator",
        },
        {
          name: "Border Radius Generator",
          href: "/css-tools/border-radius-generator",
        },
        { name: "CSS Grid Generator", href: "/css-tools/css-grid-generator" },
      ],
    },
    {
      categoryName: "Csv Tools",
      tools: [
        { name: "Csv Tools", href: "/csv-tools" },
        {
          name: "Csv Delimiter Converter",
          href: "/csv-tools/csv-delimiter-converter",
        },
        { name: "Csv Email Extractor", href: "/csv-tools/csv-email-extractor" },
        { name: "Csv Validator", href: "/csv-tools/csv-validator" },
        {
          name: "Csv Column Extractor",
          href: "/csv-tools/csv-column-extractor",
        },
        { name: "Csv Minifier", href: "/csv-tools/csv-minifier" },
        {
          name: "Csv Random Row Generator",
          href: "/csv-tools/csv-random-row-generator",
        },
        { name: "Csv Formatter", href: "/csv-tools/csv-formatter" },
        {
          name: "Csv Sample Generator",
          href: "/csv-tools/csv-sample-generator",
        },
        { name: "Csv Quote Escaper", href: "/csv-tools/csv-quote-escaper" },
        { name: "Csv To Array", href: "/csv-tools/csv-to-array" },
      ],
    },
    {
      categoryName: "Date Time Tools",
      tools: [
        { name: "Date Time Tools", href: "/date-time-tools" },
        {
          name: "Military Time Converter",
          href: "/date-time-tools/military-time-converter",
        },
        {
          name: "Seconds Converter",
          href: "/date-time-tools/seconds-converter",
        },
        { name: "Date Calculator", href: "/date-time-tools/date-calculator" },
        {
          name: "Time Duration Calculator",
          href: "/date-time-tools/time-duration-calculator",
        },
        { name: "Age Calculator", href: "/date-time-tools/age-calculator" },
        {
          name: "Date Range Calculator",
          href: "/date-time-tools/date-range-calculator",
        },
        {
          name: "Week Number Calculator",
          href: "/date-time-tools/week-number-calculator",
        },
        {
          name: "Business Days Calculator",
          href: "/date-time-tools/business-days-calculator",
        },
        {
          name: "Sunrise Sunset Calculator",
          href: "/date-time-tools/sunrise-sunset-calculator",
        },
        {
          name: "Time Until Calculator",
          href: "/date-time-tools/time-until-calculator",
        },
      ],
    },
    {
      categoryName: "Developer Tools",
      tools: [
        { name: "Developer Tools", href: "/developer-tools" },
        {
          name: "Mock Data Generator",
          href: "/developer-tools/mock-data-generator",
        },
      ],
    },
    {
      categoryName: "Emoji Tools",
      tools: [
        { name: "Emoji Tools", href: "/emoji-tools" },
        {
          name: "Emoji Password Generator",
          href: "/emoji-tools/emoji-password-generator",
        },
        {
          name: "Emoji Style Converter",
          href: "/emoji-tools/emoji-style-converter",
        },
        {
          name: "Emoji To Text Converter",
          href: "/emoji-tools/emoji-to-text-converter",
        },
        {
          name: "Random Emoji Generator",
          href: "/emoji-tools/random-emoji-generator",
        },
        {
          name: "Emoji Art Generator",
          href: "/emoji-tools/emoji-art-generator",
        },
        {
          name: "Emoji Font Generator",
          href: "/emoji-tools/emoji-font-generator",
        },
        { name: "Emoji Size Changer", href: "/emoji-tools/emoji-size-changer" },
        {
          name: "Emoji Picker Copy Paste",
          href: "/emoji-tools/emoji-picker-copy-paste",
        },
        {
          name: "Bulk Emoji Downloader",
          href: "/emoji-tools/bulk-emoji-downloader",
        },
        { name: "Emoji Counter", href: "/emoji-tools/emoji-counter" },
      ],
    },
    {
      categoryName: "Encoding Tools",
      tools: [
        { name: "Encoding Tools", href: "/encoding-tools" },
        {
          name: "Base64 Encoder Decoder",
          href: "/encoding-tools/base64-encoder-decoder",
        },
        {
          name: "Punycode Encoder Decoder",
          href: "/encoding-tools/punycode-encoder-decoder",
        },
        {
          name: "Base85 Ascii85 Encoder Decoder",
          href: "/encoding-tools/base85-ascii85-encoder-decoder",
        },
        {
          name: "Base32 Encoder Decoder",
          href: "/encoding-tools/base32-encoder-decoder",
        },
        {
          name: "Base58 Encoder Decoder",
          href: "/encoding-tools/base58-encoder-decoder",
        },
        {
          name: "Unicode Character Encoder Decoder",
          href: "/encoding-tools/unicode-character-encoder-decoder",
        },
        {
          name: "Gray Code Encoder Decoder",
          href: "/encoding-tools/gray-code-encoder-decoder",
        },
        {
          name: "Escape Unescape String",
          href: "/encoding-tools/escape-unescape-string",
        },
        {
          name: "Z85 Base85 Encoder Decoder",
          href: "/encoding-tools/z85-base85-encoder-decoder",
        },
        {
          name: "Binhex Encoder Decoder",
          href: "/encoding-tools/binhex-encoder-decoder",
        },
      ],
    },
    {
      categoryName: "Encryption Tools",
      tools: [
        { name: "Encryption Tools", href: "/encryption-tools" },
        { name: "Aes Encryption", href: "/encryption-tools/aes-encryption" },
        { name: "Pgp Encryption", href: "/encryption-tools/pgp-encryption" },
        {
          name: "Text Binary Encryptor",
          href: "/encryption-tools/text-binary-encryptor",
        },
        {
          name: "Crypto Address Validator",
          href: "/encryption-tools/crypto-address-validator",
        },
        {
          name: "File Checksum Verifier",
          href: "/encryption-tools/file-checksum-verifier",
        },
        {
          name: "Ssl Certificate Decoder",
          href: "/encryption-tools/ssl-certificate-decoder",
        },
        {
          name: "Rsa Key Generator",
          href: "/encryption-tools/rsa-key-generator",
        },
        { name: "One Time Pad", href: "/encryption-tools/one-time-pad" },
        { name: "Gpg Simulator", href: "/encryption-tools/gpg-simulator" },
        { name: "Caesar Cipher", href: "/encryption-tools/caesar-cipher" },
      ],
    },
    {
      categoryName: "Excel Tools",
      tools: [
        { name: "Excel Tools", href: "/excel-tools" },
        {
          name: "Excel To Pdf Converter",
          href: "/excel-tools/excel-to-pdf-converter",
        },
        {
          name: "Excel Password Remover",
          href: "/excel-tools/excel-password-remover",
        },
        {
          name: "Csv To Excel Converter",
          href: "/excel-tools/csv-to-excel-converter",
        },
        {
          name: "Excel Json To Csv Converter",
          href: "/excel-tools/excel-json-to-csv-converter",
        },
        {
          name: "Excel Xml To Csv Converter",
          href: "/excel-tools/excel-xml-to-csv-converter",
        },
        {
          name: "Excel Formula Extractor",
          href: "/excel-tools/excel-formula-extractor",
        },
        {
          name: "Excel Age Calculator",
          href: "/excel-tools/excel-age-calculator",
        },
        {
          name: "Excel Random Data Generator",
          href: "/excel-tools/excel-random-data-generator",
        },
        {
          name: "Excel Formula Generator",
          href: "/excel-tools/excel-formula-generator",
        },
        {
          name: "Excel Compare Two Sheets",
          href: "/excel-tools/excel-compare-two-sheets",
        },
      ],
    },
    {
      categoryName: "Font Tools",
      tools: [
        { name: "Font Tools", href: "/font-tools" },
        {
          name: "Font Base64 Encoder",
          href: "/font-tools/font-base64-encoder",
        },
        { name: "Font Converter", href: "/font-tools/font-converter" },
        {
          name: "Font Size Calculator",
          href: "/font-tools/font-size-calculator",
        },
        {
          name: "Font Metadata Editor",
          href: "/font-tools/font-metadata-editor",
        },
        { name: "Font Ocr Extractor", href: "/font-tools/font-ocr-extractor" },
        {
          name: "Font Statistics Analyzer",
          href: "/font-tools/font-statistics-analyzer",
        },
        {
          name: "Font License Checker",
          href: "/font-tools/font-license-checker",
        },
        { name: "Font Generator", href: "/font-tools/font-generator" },
        {
          name: "Animated Font Generator",
          href: "/font-tools/animated-font-generator",
        },
        {
          name: "Font Contrast Checker",
          href: "/font-tools/font-contrast-checker",
        },
      ],
    },
    {
      categoryName: "Fun Tools",
      tools: [
        { name: "Fun Tools", href: "/fun-tools" },
        {
          name: "Whatsapp Screen Shot Maker",
          href: "/fun-tools/whatsapp-screen-shot-maker",
        },
      ],
    },
    {
      categoryName: "Hash Tools",
      tools: [
        { name: "Hash Tools", href: "/hash-tools" },
        {
          name: "Base64 Encoder Decoder Hash",
          href: "/hash-tools/base64-encoder-decoder-hash",
        },
        {
          name: "Hash To Hex Base64 Converter",
          href: "/hash-tools/hash-to-hex-base64-converter",
        },
        {
          name: "Mysql Password Hash Generator",
          href: "/hash-tools/mysql-password-hash-generator",
        },
        {
          name: "Password Hash Strength Analyzer",
          href: "/hash-tools/password-hash-strength-analyzer",
        },
        {
          name: "Md5 Hash Generator Checker",
          href: "/hash-tools/md5-hash-generator-checker",
        },
        {
          name: "Sha1 Hash Generator Decrypter",
          href: "/hash-tools/sha1-hash-generator-decrypter",
        },
        {
          name: "Bcrypt Hash Generator Verifier",
          href: "/hash-tools/bcrypt-hash-generator-verifier",
        },
        {
          name: "Argon2 Hash Generator",
          href: "/hash-tools/argon2-hash-generator",
        },
        {
          name: "Crc32 Hash Calculator",
          href: "/hash-tools/crc32-hash-calculator",
        },
        {
          name: "File Hash Calculator Multi Algorithm",
          href: "/hash-tools/file-hash-calculator-multi-algorithm",
        },
      ],
    },
    {
      categoryName: "Hex Tools",
      tools: [
        { name: "Hex Tools", href: "/hex-tools" },
        {
          name: "Hex To Base64 Encoder Decoder",
          href: "/hex-tools/hex-to-base64-encoder-decoder",
        },
        {
          name: "Hex File Checksum Calculator",
          href: "/hex-tools/hex-file-checksum-calculator",
        },
        {
          name: "Hex String Validator Formatter",
          href: "/hex-tools/hex-string-validator-formatter",
        },
        {
          name: "Hex To Text Converter",
          href: "/hex-tools/hex-to-text-converter",
        },
        {
          name: "Hex To Ipv4 Ipv6 Address Converter",
          href: "/hex-tools/hex-to-ipv4-ipv6-address-converter",
        },
        {
          name: "Binary To Hex Converter",
          href: "/hex-tools/binary-to-hex-converter",
        },
        {
          name: "Text To Hex Converter",
          href: "/hex-tools/text-to-hex-converter",
        },
        {
          name: "Hex To Ascii Table Generator",
          href: "/hex-tools/hex-to-ascii-table-generator",
        },
        {
          name: "Hex To Float Double Converter",
          href: "/hex-tools/hex-to-float-double-converter",
        },
        {
          name: "Octal To Hex Converter",
          href: "/hex-tools/octal-to-hex-converter",
        },
      ],
    },
    {
      categoryName: "Html Tools",
      tools: [
        { name: "Html Tools", href: "/html-tools" },
        {
          name: "Html Base64 Image Encoder",
          href: "/html-tools/html-base64-image-encoder",
        },
        {
          name: "Html Escape Unescape",
          href: "/html-tools/html-escape-unescape",
        },
        {
          name: "Html Entity Encoder Decoder",
          href: "/html-tools/html-entity-encoder-decoder",
        },
        {
          name: "Html Meta Tag Generator",
          href: "/html-tools/html-meta-tag-generator",
        },
        {
          name: "Html Validator Linter",
          href: "/html-tools/html-validator-linter",
        },
        {
          name: "Html Link Extractor Checker",
          href: "/html-tools/html-link-extractor-checker",
        },
        {
          name: "Html Sitemap Generator",
          href: "/html-tools/html-sitemap-generator",
        },
        {
          name: "Html To Pdf Converter",
          href: "/html-tools/html-to-pdf-converter",
        },
        {
          name: "Html Diff Checker Comparator",
          href: "/html-tools/html-diff-checker-comparator",
        },
        {
          name: "Html Formatter Beautifier",
          href: "/html-tools/html-formatter-beautifier",
        },
      ],
    },
    {
      categoryName: "Icon Tools",
      tools: [
        { name: "Icon Tools", href: "/icon-tools" },
        {
          name: "Icon Metadata Editor Optimizer",
          href: "/icon-tools/icon-metadata-editor-optimizer",
        },
        {
          name: "Icon File Format Converter All Types",
          href: "/icon-tools/icon-file-format-converter-all-types",
        },
        {
          name: "Png To Ico Converter Online",
          href: "/icon-tools/png-to-ico-converter-online",
        },
        {
          name: "Svg To Png Icon Converter",
          href: "/icon-tools/svg-to-png-icon-converter",
        },
        {
          name: "Animated Gif To Icon Converter",
          href: "/icon-tools/animated-gif-to-icon-converter",
        },
        {
          name: "Favicon Generator From Image",
          href: "/icon-tools/favicon-generator-from-image",
        },
        {
          name: "Icon Resizer For Android Ios",
          href: "/icon-tools/icon-resizer-for-android-ios",
        },
        {
          name: "3d Icon Generator From Text",
          href: "/icon-tools/3d-icon-generator-from-text",
        },
        {
          name: "Icon Search Engine Duplicate Finder",
          href: "/icon-tools/icon-search-engine-duplicate-finder",
        },
        {
          name: "Accessibility Icon Checker Color Contrast",
          href: "/icon-tools/accessibility-icon-checker-color-contrast",
        },
      ],
    },
    {
      categoryName: "Image Tool",
      tools: [
        { name: "Image Tool", href: "/image-tool" },
        { name: "Image Compressor", href: "/image-tools/image-compressor" },
        { name: "Image Editor", href: "/image-tools/image-editor" },
        {
          name: "Pick Color Code from Image",
          href: "/image-tools/pick-color-code-from-image",
        },
        {
          name: "Image Format Conversions",
          href: "/image-tools/image-format-conversions",
        },
        { name: "Background Remover", href: "/image-tools/background-remover" },
        { name: "Image to GIF", href: "/image-tools/image-to-gif" },
        { name: "Image Filters", href: "/image-tools/image-filters" },
        { name: "Crop Image", href: "/image-tools/crop-image" },
        { name: "Sharpen Image", href: "/image-tools/sharpen-image" },
        {
          name: "Resize Image Dimensions",
          href: "/image-tools/resize-image-dimensions",
        },
      ],
    },
    {
      categoryName: "Javascript Tools",
      tools: [
        { name: "Javascript Tools", href: "/javascript-tools" },
        {
          name: "Javascript Encryption Decryption Tool",
          href: "/javascript-tools/javascript-encryption-decryption-tool",
        },
        {
          name: "Base64 Encoder Decoder Javascript",
          href: "/javascript-tools/base64-encoder-decoder-javascript",
        },
        {
          name: "Javascript Image Base64 Data Url Converter",
          href: "/javascript-tools/javascript-image-base64-data-url-converter",
        },
        {
          name: "Javascript String Escape Unescape",
          href: "/javascript-tools/javascript-string-escape-unescape",
        },
        {
          name: "Javascript Linter Code Quality Checker",
          href: "/javascript-tools/javascript-linter-code-quality-checker",
        },
        {
          name: "Json Validator Formatter",
          href: "/javascript-tools/json-validator-formatter",
        },
        {
          name: "Javascript Csv Json Converter",
          href: "/javascript-tools/javascript-csv-json-converter",
        },
        {
          name: "Javascript Object Json Converter",
          href: "/javascript-tools/javascript-object-json-converter",
        },
        {
          name: "Javascript Beautifier Formatter",
          href: "/javascript-tools/javascript-beautifier-formatter",
        },
        {
          name: "Javascript Color Converter Picker",
          href: "/javascript-tools/javascript-color-converter-picker",
        },
      ],
    },
    {
      categoryName: "Json Tools",
      tools: [
        { name: "Json Tools", href: "/json-tools" },
        { name: "JSON Base64 Encode Decode", href: "/json-tools/json-base64" },
        { name: "JSON JWT Decoder", href: "/json-tools/json-jwt-decoder" },
        {
          name: "JSON Escape Unescape Tool",
          href: "/json-tools/json-escape-unescape",
        },
        { name: "JSON Env Converter", href: "/json-tools/json-env-converter" },
        {
          name: "JSON Formatter / Beautifier",
          href: "/json-tools/json-formatter-beautifier",
        },
        {
          name: "JSON Encode Decode Tool",
          href: "/json-tools/json-encode-decode",
        },
        { name: "JSON Linter", href: "/json-tools/json-linter" },
        {
          name: "JSON Size Calculator",
          href: "/json-tools/json-size-calculator",
        },
        {
          name: "JSON Config File Validator",
          href: "/json-tools/json-config-validator",
        },
        { name: "JSON Validator", href: "/json-tools/json-validator" },
      ],
    },
    {
      categoryName: "Jwt Tools",
      tools: [
        { name: "Jwt Tools", href: "/jwt-tools" },
        {
          name: "Jwt Base64 Url Encoder Decoder",
          href: "/jwt-tools/jwt-base64-url-encoder-decoder",
        },
        {
          name: "Jwt Decoder Validator",
          href: "/jwt-tools/jwt-decoder-validator",
        },
        {
          name: "Jwt Token Size Calculator Optimizer",
          href: "/jwt-tools/jwt-token-size-calculator-optimizer",
        },
        {
          name: "Jwt Claim Extractor Formatter",
          href: "/jwt-tools/jwt-claim-extractor-formatter",
        },
        {
          name: "Jwt Expiry Checker Timestamp Converter",
          href: "/jwt-tools/jwt-expiry-checker-timestamp-converter",
        },
        {
          name: "Jwt Public Key Extractor Jwk Generator",
          href: "/jwt-tools/jwt-public-key-extractor-jwk-generator",
        },
        {
          name: "Jwt Algorithm Converter Switcher",
          href: "/jwt-tools/jwt-algorithm-converter-switcher",
        },
        {
          name: "Jwt To Curl Command Generator",
          href: "/jwt-tools/jwt-to-curl-command-generator",
        },
        {
          name: "Jwt Secret Key Generator",
          href: "/jwt-tools/jwt-secret-key-generator",
        },
        {
          name: "Jwt Token Diff Compare",
          href: "/jwt-tools/jwt-token-diff-compare",
        },
      ],
    },
    {
      categoryName: "Markdown Tools",
      tools: [
        { name: "Markdown Tools", href: "/markdown-tools" },
        {
          name: "Markdown Linter Formatter",
          href: "/markdown-tools/markdown-linter-formatter",
        },
        {
          name: "Markdown Escape Tool",
          href: "/markdown-tools/markdown-escape-tool",
        },
        {
          name: "Html To Markdown Converter",
          href: "/markdown-tools/html-to-markdown-converter",
        },
        {
          name: "Markdown To Html Converter",
          href: "/markdown-tools/markdown-to-html-converter",
        },
        {
          name: "Markdown To Notion Converter",
          href: "/markdown-tools/markdown-to-notion-converter",
        },
        {
          name: "Markdown To Pdf Converter",
          href: "/markdown-tools/markdown-to-pdf-converter",
        },
        {
          name: "Markdown To Wordpress Html Converter",
          href: "/markdown-tools/markdown-to-wordpress-html-converter",
        },
        {
          name: "Markdown To Slack Converter",
          href: "/markdown-tools/markdown-to-slack-converter",
        },
        {
          name: "Markdown Diff Checker",
          href: "/markdown-tools/markdown-diff-checker",
        },
        {
          name: "Markdown To Jira Converter",
          href: "/markdown-tools/markdown-to-jira-converter",
        },
      ],
    },
    {
      categoryName: "Math Tools",
      tools: [{ name: "Math Tools", href: "/math-tools" }, {
        "name": "Area Converter",
        "href": "/math-tools/area-converter",
        "category": "unit-converters",
        "description": "Converts between area units including square meters, square feet, acres, hectares, and more"
      },
      {
        "name": "Data Storage Converter (KB, MB, GB, TB)",
        "href": "/math-tools/data-storage-converter",
        "category": "unit-converters",
        "description": "Converts between digital storage units including bytes, KB, MB, GB, TB, and PB"
      },
      {
        "name": "Decimal to Fraction Converter",
        "href": "/math-tools/decimal-to-fraction-converter",
        "category": "fractions-percentages",
        "description": "Converts any decimal number to its equivalent fraction in simplified form"
      },
      {
        "name": "Fraction to Decimal Converter",
        "href": "/math-tools/fraction-to-decimal-converter",
        "category": "fractions-percentages",
        "description": "Converts any fraction or mixed number to its decimal equivalent"
      },
      {
        "name": "Length Converter",
        "href": "/math-tools/length-converter",
        "category": "unit-converters",
        "description": "Converts between length units including meters, feet, inches, kilometers, miles, and more"
      },
      {
        "name": "Number Base Converter (Binary, Octal, Hex, Decimal)",
        "href": "/math-tools/number-base-converter",
        "category": "unit-converters",
        "description": "Converts numbers between binary, octal, decimal, and hexadecimal number systems"
      },
      {
        "name": "Number Word Converter (e.g. 1234 → one thousand...)",
        "href": "/math-tools/number-word-converter",
        "category": "unit-converters",
        "description": "Converts any number into its full English word form"
      },
      {
        "name": "Pressure Converter",
        "href": "/math-tools/pressure-converter",
        "category": "unit-converters",
        "description": "Converts between pressure units including pascals, bar, psi, atm, mmHg, and more"
      },
      {
        "name": "Roman Numeral Converter",
        "href": "/math-tools/roman-numeral-converter",
        "category": "number-theory",
        "description": "Converts integers to Roman numerals and Roman numerals back to integers"
      },
      {
        "name": "2D Function Plotter (y = f(x))",
        "href": "/math-tools/2d-function-plotter",
        "category": "statistics-data-visualization",
        "description": "Plots any 2D mathematical function y = f(x) on an interactive coordinate plane"
      }],
    },
    {
      categoryName: "Minifier Tools",
      tools: [
        { name: "Minifier Tools", href: "/minifier-tools" },
        { name: "Base64 Minifier", href: "/minifier-tools/base64-minifier" },
        {
          name: "Cli Minifier Generator",
          href: "/minifier-tools/cli-minifier-generator",
        },
        {
          name: "Bulk File Minifier",
          href: "/minifier-tools/bulk-file-minifier",
        },
        {
          name: "Html Inline Css Js Minifier",
          href: "/minifier-tools/html-inline-css-js-minifier",
        },
        {
          name: "Real Time Minifier",
          href: "/minifier-tools/real-time-minifier",
        },
        {
          name: "Javascript Minifier",
          href: "/minifier-tools/javascript-minifier",
        },
        { name: "Code Minifier", href: "/minifier-tools/code-minifier" },
        { name: "Css Minifier", href: "/minifier-tools/css-minifier" },
        { name: "Text Minifier", href: "/minifier-tools/text-minifier" },
        { name: "Php Minifier", href: "/minifier-tools/php-minifier" },
      ],
    },
    {
      categoryName: "Number Tools",
      tools: [
        { name: "Number Tools", href: "/number-tools" },
        {
          name: "Roman Numeral Converter",
          href: "/number-tools/roman-numeral-converter",
        },
        {
          name: "Number To Words Converter",
          href: "/number-tools/number-to-words-converter",
        },
        {
          name: "Binary Decimal Hex Converter",
          href: "/number-tools/binary-decimal-hex-converter",
        },
        {
          name: "Number To Time Converter",
          href: "/number-tools/number-to-time-converter",
        },
        {
          name: "Scientific Notation Converter",
          href: "/number-tools/scientific-notation-converter",
        },
        { name: "Unit Converter", href: "/number-tools/unit-converter" },
        {
          name: "Phone Number Formatter",
          href: "/number-tools/phone-number-formatter",
        },
        {
          name: "Factorial Calculator",
          href: "/number-tools/factorial-calculator",
        },
        {
          name: "Currency Formatter",
          href: "/number-tools/currency-formatter",
        },
        {
          name: "Number Base Calculator",
          href: "/number-tools/number-base-calculator",
        },
      ],
    },
    {
      categoryName: "Password Tools",
      tools: [
        { name: "Password Tools", href: "/password-tools" },
        {
          name: "Password Csv To Json Converter",
          href: "/password-tools/password-csv-to-json-converter",
        },
        {
          name: "Password Hash Generator",
          href: "/password-tools/password-hash-generator",
        },
        {
          name: "Password Ascii Art Generator",
          href: "/password-tools/password-ascii-art-generator",
        },
        { name: "Password Manager", href: "/password-tools/password-manager" },
        {
          name: "Password Entropy Calculator",
          href: "/password-tools/password-entropy-calculator",
        },
        {
          name: "Password Strength Checker",
          href: "/password-tools/password-strength-checker",
        },
        {
          name: "Password Leak Checker",
          href: "/password-tools/password-leak-checker",
        },
        {
          name: "Password Generator",
          href: "/password-tools/password-generator",
        },
        {
          name: "Password History Generator",
          href: "/password-tools/password-history-generator",
        },
        {
          name: "Password Pattern Generator",
          href: "/password-tools/password-pattern-generator",
        },
      ],
    },
    {
      categoryName: "Physics Tools",
      tools: [
        { name: "Physics Tools", href: "/physics-tools" },
        {
          name: "Photoelectric Effect Calculator",
          href: "/physics-tools/photoelectric-effect-calculator",
        },
        {
          name: "Bernoulli Equation Calculator",
          href: "/physics-tools/bernoulli-equation-calculator",
        },
        {
          name: "Capacitance Calculator",
          href: "/physics-tools/capacitance-calculator",
        },
        {
          name: "Doppler Effect Calculator",
          href: "/physics-tools/doppler-effect-calculator",
        },
        {
          name: "Magnetic Force On Wire Calculator",
          href: "/physics-tools/magnetic-force-on-wire-calculator",
        },
        {
          name: "Ohms Law Calculator",
          href: "/physics-tools/ohms-law-calculator",
        },
        {
          name: "Simple Harmonic Motion Calculator",
          href: "/physics-tools/simple-harmonic-motion-calculator",
        },
        {
          name: "Mach Number Calculator",
          href: "/physics-tools/mach-number-calculator",
        },
        {
          name: "Reynolds Number Calculator",
          href: "/physics-tools/reynolds-number-calculator",
        },
        {
          name: "Center Of Mass Calculator",
          href: "/physics-tools/center-of-mass-calculator",
        },
      ],
    },
    {
      categoryName: "Qr Code Tools",
      tools: [
        { name: "Qr Code Tools", href: "/qr-code-tools" },
        {
          name: "Qr Code To Text Decoder",
          href: "/qr-code-tools/qr-code-to-text-decoder",
        },
        {
          name: "Qr Code File Size Optimizer",
          href: "/qr-code-tools/qr-code-file-size-optimizer",
        },
        {
          name: "Dynamic Qr Code Generator",
          href: "/qr-code-tools/dynamic-qr-code-generator",
        },
        {
          name: "Bulk Qr Code Generator",
          href: "/qr-code-tools/bulk-qr-code-generator",
        },
        {
          name: "Qr Code Coupon Generator",
          href: "/qr-code-tools/qr-code-coupon-generator",
        },
        {
          name: "Qr Code Email Generator",
          href: "/qr-code-tools/qr-code-email-generator",
        },
        { name: "Qr Code Generator", href: "/qr-code-tools/qr-code-generator" },
        {
          name: "Qr Code With Logo Generator",
          href: "/qr-code-tools/qr-code-with-logo-generator",
        },
        {
          name: "Qr Code Event Ticket",
          href: "/qr-code-tools/qr-code-event-ticket",
        },
        { name: "Qr Code Scanner", href: "/qr-code-tools/qr-code-scanner" },
      ],
    },
    {
      categoryName: "Simulators",
      tools: [
        { name: "Simulators", href: "/simulators" },
        {
          name: "Bacteria Growth Simulator",
          href: "/simulators/bacteria-growth-simulator",
        },
      ],
    },
    {
      categoryName: "Sql Tools",
      tools: [
        { name: "Sql Tools", href: "/sql-tools" },
        {
          name: "Sql Password Hash Generator Md5 Sha",
          href: "/sql-tools/sql-password-hash-generator-md5-sha",
        },
        {
          name: "Sql Escape Unescape Tool",
          href: "/sql-tools/sql-escape-unescape-tool",
        },
        {
          name: "Sql Query Validator Syntax Checker",
          href: "/sql-tools/sql-query-validator-syntax-checker",
        },
        {
          name: "Csv To Sql Converter Inserts",
          href: "/sql-tools/csv-to-sql-converter-inserts",
        },
        {
          name: "Sql Formatter Beautifier",
          href: "/sql-tools/sql-formatter-beautifier",
        },
        {
          name: "Json To Sql Converter",
          href: "/sql-tools/json-to-sql-converter",
        },
        {
          name: "Sql Case Converter Upper Lower Proper",
          href: "/sql-tools/sql-case-converter-upper-lower-proper",
        },
        {
          name: "Sql To Json Converter",
          href: "/sql-tools/sql-to-json-converter",
        },
        {
          name: "Sql Diff Compare Schemas Queries",
          href: "/sql-tools/sql-diff-compare-schemas-queries",
        },
        {
          name: "Sql Random Data Generator",
          href: "/sql-tools/sql-random-data-generator",
        },
      ],
    },
    {
      categoryName: "Statistics Tools",
      tools: [
        { name: "Statistics Tools", href: "/statistics-tools" },
        {
          name: "Binomial Distribution Calculator",
          href: "/statistics-tools/binomial-distribution-calculator",
        },
        {
          name: "Permutation Combination Calculator",
          href: "/statistics-tools/permutation-combination-calculator",
        },
        {
          name: "Standard Deviation Calculator",
          href: "/statistics-tools/standard-deviation-calculator",
        },
        {
          name: "Z Score Calculator",
          href: "/statistics-tools/z-score-calculator",
        },
        {
          name: "Descriptive Statistics Calculator",
          href: "/statistics-tools/descriptive-statistics-calculator",
        },
        {
          name: "Ab Test Significance Calculator",
          href: "/statistics-tools/ab-test-significance-calculator",
        },
        {
          name: "Anova Calculator",
          href: "/statistics-tools/anova-calculator",
        },
        {
          name: "Linear Regression Calculator",
          href: "/statistics-tools/linear-regression-calculator",
        },
        {
          name: "P Value Calculator",
          href: "/statistics-tools/p-value-calculator",
        },
        {
          name: "Sample Size Calculator Surveys",
          href: "/statistics-tools/sample-size-calculator-surveys",
        },
      ],
    },
    {
      categoryName: "String Tools",
      tools: [
        { name: "String Tools", href: "/string-tools" },
        {
          name: "Text Compare Diff Checker",
          href: "/string-tools/text-compare-diff-checker",
        },
        {
          name: "Text Case Converter",
          href: "/string-tools/text-case-converter",
        },
        { name: "String Reverse", href: "/string-tools/string-reverse" },
        {
          name: "Word Counter Character Counter",
          href: "/string-tools/word-counter-character-counter",
        },
      ],
    },
    {
      categoryName: "Svg Tools",
      tools: [
        { name: "Svg Tools", href: "/svg-tools" },
        {
          name: "Base64 To Svg Decoder",
          href: "/svg-tools/base64-to-svg-decoder",
        },
        {
          name: "Svg To Base64 Encoder",
          href: "/svg-tools/svg-to-base64-encoder",
        },
        {
          name: "Svg To Ico Converter",
          href: "/svg-tools/svg-to-ico-converter",
        },
        {
          name: "Svg Font To Path Converter",
          href: "/svg-tools/svg-font-to-path-converter",
        },
        {
          name: "Svg To Jpg Converter",
          href: "/svg-tools/svg-to-jpg-converter",
        },
        {
          name: "Svg To Png Converter",
          href: "/svg-tools/svg-to-png-converter",
        },
        {
          name: "Svg To Webp Converter",
          href: "/svg-tools/svg-to-webp-converter",
        },
        {
          name: "Svg To Pdf Converter",
          href: "/svg-tools/svg-to-pdf-converter",
        },
        {
          name: "Svg Metadata Viewer Remover",
          href: "/svg-tools/svg-metadata-viewer-remover",
        },
        {
          name: "Svg Splitter Extractor",
          href: "/svg-tools/svg-splitter-extractor",
        },
      ],
    },
    {
      categoryName: "Text Tools",
      tools: [
        { name: "Text Tools", href: "/text-tools" },
        {
          name: "Text To Slug Converter",
          href: "/text-tools/text-to-slug-converter",
        },
        {
          name: "Text To Hashtags Generator",
          href: "/text-tools/text-to-hashtags-generator",
        },
        {
          name: "Text To Binary Converter",
          href: "/text-tools/text-to-binary-converter",
        },
        { name: "Case Converter", href: "/text-tools/case-converter" },
        {
          name: "Text To List Converter",
          href: "/text-tools/text-to-list-converter",
        },
        {
          name: "Text Size Calculator",
          href: "/text-tools/text-size-calculator",
        },
        {
          name: "Lorem Ipsum Generator",
          href: "/text-tools/lorem-ipsum-generator",
        },
        {
          name: "String Length Calculator",
          href: "/text-tools/string-length-calculator",
        },
        { name: "Character Counter", href: "/text-tools/character-counter" },
        {
          name: "Find And Replace Text",
          href: "/text-tools/find-and-replace-text",
        },
      ],
    },
    {
      categoryName: "Timestamp Tools",
      tools: [
        { name: "Timestamp Tools", href: "/timestamp-tools" },
        {
          name: "Timestamp Validator Formatter",
          href: "/timestamp-tools/timestamp-validator-formatter",
        },
        {
          name: "Iso 8601 Timestamp Converter",
          href: "/timestamp-tools/iso-8601-timestamp-converter",
        },
        {
          name: "Rfc Timestamp Converter",
          href: "/timestamp-tools/rfc-timestamp-converter",
        },
        {
          name: "Milliseconds Timestamp Converter",
          href: "/timestamp-tools/milliseconds-timestamp-converter",
        },
        {
          name: "Unix Timestamp Converter",
          href: "/timestamp-tools/unix-timestamp-converter",
        },
        {
          name: "Batch Timestamp Converter",
          href: "/timestamp-tools/batch-timestamp-converter",
        },
        {
          name: "Gps Timestamp Converter",
          href: "/timestamp-tools/gps-timestamp-converter",
        },
        {
          name: "Timezone Timestamp Converter",
          href: "/timestamp-tools/timezone-timestamp-converter",
        },
        {
          name: "File Timestamp Converter",
          href: "/timestamp-tools/file-timestamp-converter",
        },
        {
          name: "Social Media Timestamp Converter",
          href: "/timestamp-tools/social-media-timestamp-converter",
        },
      ],
    },
    {
      categoryName: "Timezone Tools",
      tools: [
        { name: "Timezone Tools", href: "/timezone-tools" },
        {
          name: "Time Zone Difference Calculator",
          href: "/timezone-tools/time-zone-difference-calculator",
        },
        {
          name: "Historical Time Zone Converter",
          href: "/timezone-tools/historical-time-zone-converter",
        },
        {
          name: "Military Time Converter 24 Hour Clock",
          href: "/timezone-tools/military-time-converter-24-hour-clock",
        },
        {
          name: "World Clock Time Zone Converter",
          href: "/timezone-tools/world-clock-time-zone-converter",
        },
        {
          name: "Time Zone Abbreviation Lookup Decoder",
          href: "/timezone-tools/time-zone-abbreviation-lookup-decoder",
        },
        {
          name: "Add Subtract Time Across Zones Calculator",
          href: "/timezone-tools/add-subtract-time-across-zones-calculator",
        },
        {
          name: "Flight Time Time Zone Arrival Calculator",
          href: "/timezone-tools/flight-time-time-zone-arrival-calculator",
        },
        {
          name: "Daylight Saving Time Calculator Schedule",
          href: "/timezone-tools/daylight-saving-time-calculator-schedule",
        },
        {
          name: "International Phone Call Time Finder",
          href: "/timezone-tools/international-phone-call-time-finder",
        },
        {
          name: "Timezone Widget Clock Embed Generator",
          href: "/timezone-tools/timezone-widget-clock-embed-generator",
        },
      ],
    },
    {
      categoryName: "Toml Tools",
      tools: [
        { name: "Toml Tools", href: "/toml-tools" },
        {
          name: "Toml To Ruby Hash Converter",
          href: "/toml-tools/toml-to-ruby-hash-converter",
        },
        {
          name: "Toml Validator Linter",
          href: "/toml-tools/toml-validator-linter",
        },
        {
          name: "Toml Schema Generator Validator",
          href: "/toml-tools/toml-schema-generator-validator",
        },
        {
          name: "Toml To Javascript Object Converter",
          href: "/toml-tools/toml-to-javascript-object-converter",
        },
        {
          name: "Toml Minifier Compressor",
          href: "/toml-tools/toml-minifier-compressor",
        },
        {
          name: "Json To Toml Converter",
          href: "/toml-tools/json-to-toml-converter",
        },
        {
          name: "Csv To Toml Converter",
          href: "/toml-tools/csv-to-toml-converter",
        },
        {
          name: "Env To Toml Converter",
          href: "/toml-tools/env-to-toml-converter",
        },
        {
          name: "Properties To Toml Converter",
          href: "/toml-tools/properties-to-toml-converter",
        },
        {
          name: "Toml Beautifier Formatter",
          href: "/toml-tools/toml-beautifier-formatter",
        },
      ],
    },
    {
      categoryName: "Typography Tools",
      tools: [
        { name: "Typography Tools", href: "/typography-tools" },
        {
          name: "Font Size Converter",
          href: "/typography-tools/font-size-converter",
        },
        {
          name: "Text To Ascii Art Generator",
          href: "/typography-tools/text-to-ascii-art-generator",
        },
        {
          name: "Text Readability Analyzer",
          href: "/typography-tools/text-readability-analyzer",
        },
        {
          name: "Font Subset Generator",
          href: "/typography-tools/font-subset-generator",
        },
        {
          name: "Type Scale Calculator",
          href: "/typography-tools/type-scale-calculator",
        },
        {
          name: "Line Height Generator",
          href: "/typography-tools/line-height-generator",
        },
        {
          name: "Gradient Text Generator",
          href: "/typography-tools/gradient-text-generator",
        },
        {
          name: "Ligature Generator",
          href: "/typography-tools/ligature-generator",
        },
        {
          name: "Text Shadow Generator",
          href: "/typography-tools/text-shadow-generator",
        },
        {
          name: "Vertical Text Generator",
          href: "/typography-tools/vertical-text-generator",
        },
      ],
    },
    {
      categoryName: "Unicode Tools",
      tools: [
        { name: "Unicode Tools", href: "/unicode-tools" },
        {
          name: "Unicode Escape Encoder",
          href: "/unicode-tools/unicode-escape-encoder",
        },
        {
          name: "Unicode Url Encoder",
          href: "/unicode-tools/unicode-url-encoder",
        },
        {
          name: "Unicode Text Converter",
          href: "/unicode-tools/unicode-text-converter",
        },
        {
          name: "Unicode Superscript Generator",
          href: "/unicode-tools/unicode-superscript-generator",
        },
        {
          name: "Unicode Csv Escaper",
          href: "/unicode-tools/unicode-csv-escaper",
        },
        {
          name: "Unicode Regex Tester",
          href: "/unicode-tools/unicode-regex-tester",
        },
        {
          name: "Unicode Font Generator",
          href: "/unicode-tools/unicode-font-generator",
        },
        {
          name: "Unicode Zero Width Tool",
          href: "/unicode-tools/unicode-zero-width-tool",
        },
        {
          name: "Unicode Sorting Tool",
          href: "/unicode-tools/unicode-sorting-tool",
        },
        {
          name: "Unicode Character Lookup",
          href: "/unicode-tools/unicode-character-lookup",
        },
      ],
    },
    {
      categoryName: "Unit Converters",
      tools: [
        { name: "Unit Converters", href: "/unit-converters" },
        { name: "Length Converter", href: "/unit-converters/length" },
        {
          name: "Weight and Mass Converter",
          href: "/unit-converters/weight-and-mass",
        },
        { name: "Volume Converter", href: "/unit-converters/volume" },
        { name: "Temperature Converter", href: "/unit-converters/temperature" },
        { name: "Area Converter", href: "/unit-converters/area" },
        { name: "Pressure Converter", href: "/unit-converters/pressure" },
        { name: "Energy Converter", href: "/unit-converters/energy" },
        { name: "Power Converter", href: "/unit-converters/power" },
        { name: "Force Converter", href: "/unit-converters/force" },
        { name: "Time Converter", href: "/unit-converters/time" },
      ],
    },
    {
      categoryName: "Url Tools",
      tools: [
        { name: "Url Tools", href: "/url-tools" },
        {
          name: "Url Qr Code Generator",
          href: "/url-tools/url-qr-code-generator",
        },
        { name: "Url Case Converter", href: "/url-tools/url-case-converter" },
        { name: "Url Slug Generator", href: "/url-tools/url-slug-generator" },
        { name: "Url Decoder", href: "/url-tools/url-decoder" },
        {
          name: "Url Screenshot Generator",
          href: "/url-tools/url-screenshot-generator",
        },
        { name: "Url Encoder", href: "/url-tools/url-encoder" },
        {
          name: "Url Query String Extractor",
          href: "/url-tools/url-query-string-extractor",
        },
        {
          name: "Url Duplicate Finder",
          href: "/url-tools/url-duplicate-finder",
        },
        {
          name: "Url Email Link Extractor",
          href: "/url-tools/url-email-link-extractor",
        },
        {
          name: "Url Ip Address Lookup",
          href: "/url-tools/url-ip-address-lookup",
        },
      ],
    },
    {
      categoryName: "Uuid Tools",
      tools: [
        { name: "Uuid Tools", href: "/uuid-tools" },
        { name: "Uuid Decoder", href: "/uuid-tools/uuid-decoder" },
        {
          name: "Uuid To Guid Converter",
          href: "/uuid-tools/uuid-to-guid-converter",
        },
        {
          name: "Uuid Version Converter",
          href: "/uuid-tools/uuid-version-converter",
        },
        { name: "Uuid To Qr Code", href: "/uuid-tools/uuid-to-qr-code" },
        { name: "Uuid Validator", href: "/uuid-tools/uuid-validator" },
        { name: "Nil Uuid Generator", href: "/uuid-tools/nil-uuid-generator" },
        {
          name: "Uuid Case Formatter",
          href: "/uuid-tools/uuid-case-formatter",
        },
        {
          name: "Bulk Uuid Generator",
          href: "/uuid-tools/bulk-uuid-generator",
        },
        {
          name: "Offline Uuid Generator",
          href: "/uuid-tools/offline-uuid-generator",
        },
        { name: "Uuid Generator", href: "/uuid-tools/uuid-generator" },
      ],
    },
    {
      categoryName: "Video Tool",
      tools: [
        { name: "Video Tools", href: "/video-tools" },
        { name: "Video Compressor", href: "/video-tools/video-compressor" },
        {
          name: "Video MetaData Viewer",
          href: "/video-tools/video-metadata-viewer",
        },
        { name: "Video Player", href: "/video-tools/video-player" },
        {
          name: "Video Format Converter",
          href: "/video-tools/video-format-converter",
        },
        { name: "Change Video FPS", href: "/video-tools/change-video-fps" },
        { name: "Crop Video", href: "/video-tools/crop-video" },
        {
          name: "Enhance Video Quality",
          href: "/video-tools/enhance-video-quality",
        },
        {
          name: "Extract Audio from Video",
          href: "/video-tools/extract-audio-from-video",
        },
        {
          name: "Resize Video Dimensions",
          href: "/video-tools/resize-video-dimensions",
        },
        { name: "Rotate Video", href: "/video-tools/rotate-video" },
      ],
    },
    {
      categoryName: "Xml Tools",
      tools: [
        { name: "Xml Tools", href: "/xml-tools" },
        {
          name: "Xml Entity Encoder Decoder",
          href: "/xml-tools/xml-entity-encoder-decoder",
        },
        {
          name: "Xml Formatter Validator",
          href: "/xml-tools/xml-formatter-validator",
        },
        {
          name: "Xml Sitemap Generator",
          href: "/xml-tools/xml-sitemap-generator",
        },
        {
          name: "Xml To Csv Converter",
          href: "/xml-tools/xml-to-csv-converter",
        },
        {
          name: "Xml To Pdf Converter",
          href: "/xml-tools/xml-to-pdf-converter",
        },
        {
          name: "Xml To Rss Feed Converter",
          href: "/xml-tools/xml-to-rss-feed-converter",
        },
        {
          name: "Xml To Sql Converter",
          href: "/xml-tools/xml-to-sql-converter",
        },
        {
          name: "Xml To Json Converter",
          href: "/xml-tools/xml-to-json-converter",
        },
        {
          name: "Xml To Html Table Converter",
          href: "/xml-tools/xml-to-html-table-converter",
        },
        {
          name: "Xml Schema Xsd Generator",
          href: "/xml-tools/xml-schema-xsd-generator",
        },
      ],
    },
    {
      categoryName: "Yaml Tools",
      tools: [
        { name: "Yaml Tools", href: "/yaml-tools" },
        {
          name: "Yaml Escape Unescape",
          href: "/yaml-tools/yaml-escape-unescape",
        },
        {
          name: "Ini To Yaml Converter",
          href: "/yaml-tools/ini-to-yaml-converter",
        },
        {
          name: "Xml To Yaml Converter",
          href: "/yaml-tools/xml-to-yaml-converter",
        },
        {
          name: "Yaml To Ini Converter",
          href: "/yaml-tools/yaml-to-ini-converter",
        },
        {
          name: "Yaml To Json Converter",
          href: "/yaml-tools/yaml-to-json-converter",
        },
        {
          name: "Yaml To Toml Converter",
          href: "/yaml-tools/yaml-to-toml-converter",
        },
        {
          name: "Yaml Version Converter",
          href: "/yaml-tools/yaml-version-converter",
        },
        {
          name: "Csv To Yaml Converter",
          href: "/yaml-tools/csv-to-yaml-converter",
        },
        {
          name: "Properties To Yaml Converter",
          href: "/yaml-tools/properties-to-yaml-converter",
        },
        {
          name: "Yaml Formatter Beautifier",
          href: "/yaml-tools/yaml-formatter-beautifier",
        },
      ],
    },
  ];
  return (
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors duration-300">
      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="relative container mx-auto px-6 pt-16 pb-8">
        {/* Hero row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span
                className="font-black text-xl tracking-tight text-zinc-900 dark:text-white"
                style={{ fontFamily: "'DM Serif Display', 'Georgia', serif" }}
              >
                1000 Free Tools
              </span>
            </div>
            <p
              className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              A carefully curated collection of tools for everyday tasks. Free,
              fast, and always available.
            </p>
            <Link
              href="https://x.com/1000freetools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200 group"
            >
              <Twitter className="h-3.5 w-3.5" />
              <span>Follow us</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          </div>

          {/* Large decorative number */}
          <div
            className="hidden lg:block text-[10rem] font-black leading-none text-zinc-200 dark:text-zinc-900 select-none tracking-tighter"
            style={{ fontFamily: "'DM Serif Display', 'Georgia', serif" }}
            aria-hidden="true"
          >
            1000
          </div>
        </div>

        {/* Nav + Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Quick Links */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-5">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-150"
                  >
                    <span className="block w-3 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-5 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tool categories */}
          {footerLinks.map((category, index) => (
            <div key={index}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-5">
                {category.categoryName}
              </p>
              <ul className="space-y-2.5">
                {category.tools.map((tool, toolIndex) => (
                  <li key={toolIndex}>
                    <Link
                      href={tool.href}
                      className="group flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-150"
                    >
                      <span className="block w-3 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-5 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-all duration-200" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} 1000 Free Tools. All rights reserved.
          </p>
          <p className="text-xs text-zinc-300 dark:text-zinc-700">
            Built with care · Everything Free · No tracking
          </p>
        </div>
      </div>
    </footer>
  );
}
