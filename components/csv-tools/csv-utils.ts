"use client";

import Papa from "papaparse";

export interface CSVRow {
  [key: string]: string | number;
}

export interface CSVParseResult {
  data: CSVRow[];
  headers: string[];
  structure: "consistent" | "inconsistent";
}

/**
 * Validates if a file is a CSV file
 */
export function validateCSVFile(file: File): string | null {
  if (!file.name.toLowerCase().endsWith(".csv")) {
    return "Please upload a CSV file";
  }
  return null;
}

/**
 * Smart CSV parser that handles inconsistent structures
 */
export function parseCSVIntelligently(text: string): CSVParseResult {
  const rawResult = Papa.parse(text, {
    header: false,
    skipEmptyLines: false,
    dynamicTyping: false,
  });

  if (rawResult.errors.length > 0) {
    console.warn("Parse warnings:", rawResult.errors);
  }

  const rawData = rawResult.data as string[][];

  if (rawData.length === 0) {
    return { data: [], headers: [], structure: "consistent" };
  }

  const rowLengths = rawData.map((row) => row.length);
  const uniqueLengths = [...new Set(rowLengths)];

  if (uniqueLengths.length === 1) {
    const headers = rawData[0] || [];
    const data = rawData.slice(1).map((row) => {
      const obj: CSVRow = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    return { data, headers, structure: "consistent" };
  }

  let headers: string[] = [];
  let data: CSVRow[] = [];

  const maxColumnsRow = rawData.reduce(
    (maxRow, currentRow) =>
      currentRow.length > maxRow.length ? currentRow : maxRow,
    rawData[0],
  );

  headers = maxColumnsRow;

  data = rawData.map((row) => {
    const obj: CSVRow = {};
    headers.forEach((header, colIndex) => {
      obj[header] = row[colIndex] || "";
    });
    return obj;
  });

  return { data, headers, structure: "inconsistent" };
}

/**
 * Parse CSV with worker for large files
 */
export async function parseCSVWithWorker(text: string): Promise<CSVParseResult> {
  const { getCsvWorker, releaseCsvWorker } = await import("@/lib/workerManager");
  const worker = await getCsvWorker();

  try {
    const result = await new Promise<any>((resolve, reject) => {
      worker.onmessage = (event: MessageEvent<any>) => {
        if (event.data.type === "success") {
          resolve(event.data.data);
        } else if (event.data.type === "error") {
          reject(new Error(event.data.error));
        }
      };

      worker.onerror = (error: any) => {
        reject(error);
      };

      worker.postMessage({
        type: "parse-csv",
        data: text,
        options: { headers: true },
      });
    });

    return {
      data: result.data,
      headers: result.headers,
      structure: "consistent",
    };
  } finally {
    releaseCsvWorker();
  }
}

/**
 * Load CSV file with appropriate parsing method based on file size
 */
export async function loadCSVFile(
  file: File,
  options: {
    useWorker?: boolean;
    maxRows?: number;
    workerThreshold?: number;
  } = {},
): Promise<{
  data: CSVRow[];
  headers: string[];
  structure: "consistent" | "inconsistent";
}> {
  const {
    useWorker = true,
    maxRows = 500,
    workerThreshold = 100000,
  } = options;

  const validationError = validateCSVFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const text = await file.text();

  let result: CSVParseResult;

  if (useWorker && text.length > workerThreshold) {
    result = await parseCSVWithWorker(text);
  } else {
    result = parseCSVIntelligently(text);
  }

  if (maxRows && result.data.length > maxRows) {
    result.data = result.data.slice(0, maxRows);
  }

  return result;
}

/**
 * Export CSV data to file
 */
export function exportCSVData(
  data: CSVRow[],
  fileName: string,
  options: {
    prefix?: string;
    includeHeaders?: boolean;
  } = {},
): void {
  const { prefix = "", includeHeaders = true } = options;

  if (data.length === 0) {
    throw new Error("No data to export");
  }

  const csv = Papa.unparse(data, {
    header: includeHeaders,
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${prefix}${fileName || "data.csv"}`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Export as text file
 */
export function exportTextFile(
  content: string,
  fileName: string,
  mimeType: string = "text/plain",
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Copy data to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    throw new Error("Failed to copy to clipboard");
  }
}

/**
 * Convert CSV to JSON
 */
export function csvToJSON(
  data: CSVRow[],
  options: {
    typeInference?: boolean;
    nested?: boolean;
    arrayMode?: boolean;
  } = {},
): string {
  const { typeInference = false, nested = false, arrayMode = false } = options;

  if (arrayMode) {
    const jsonData = data.map((row) => Object.values(row));
    return JSON.stringify(jsonData, null, 2);
  }

  let jsonData: any[] = data;

  if (typeInference) {
    jsonData = data.map((row) => {
      const typedRow: any = {};
      Object.entries(row).forEach(([key, value]) => {
        typedRow[key] = inferType(value as string);
      });
      return typedRow;
    });
  }

  if (nested) {
    jsonData = jsonData.map((row) => nestObject(row));
  }

  return JSON.stringify(jsonData, null, 2);
}

/**
 * Infer type from string value
 */
function inferType(value: string): any {
  if (value === "" || value === null || value === undefined) return null;
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  if (value.toLowerCase() === "null") return null;

  const num = Number(value);
  if (!isNaN(num)) return num;

  return value;
}

/**
 * Nest object by dot notation keys
 */
function nestObject(obj: any): any {
  const result: any = {};

  for (const key in obj) {
    if (key.includes(".")) {
      const parts = key.split(".");
      let current = result;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!(part in current)) {
          current[part] = {};
        }
        current = current[part];
      }

      current[parts[parts.length - 1]] = obj[key];
    } else {
      obj;
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Convert JSON to CSV
 */
export function jsonToCSV(
  jsonString: string,
  options: {
    flatten?: boolean;
    delimiter?: string;
  } = {},
): { data: CSVRow[]; headers: string[] } {
  const { flatten = true, delimiter = "," } = options;

  let jsonData: any[];
  try {
    jsonData = JSON.parse(jsonString);
    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData];
    }
  } catch (error) {
    throw new Error("Invalid JSON format");
  }

  let headers: string[] = [];
  const data: CSVRow[] = [];

  if (flatten) {
    jsonData.forEach((item) => {
      const flattened = flattenObject(item);
      data.push(flattened as CSVRow);
      Object.keys(flattened).forEach((key) => {
        if (!headers.includes(key)) {
          headers.push(key);
        }
      });
    });
  } else {
    jsonData.forEach((item) => {
      const row: CSVRow = {};
      Object.keys(item).forEach((key) => {
        const value = item[key];
        row[key] = typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
      });
      data.push(row);
      Object.keys(row).forEach((key) => {
        if (!headers.includes(key)) {
          headers.push(key);
        }
      });
    });
  }

  return { data, headers };
}

/**
 * Flatten nested object using dot notation
 */
function flattenObject(obj: any, prefix = ""): any {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value === null ? "" : String(value);
      }
    }
  }

  return result;
}

/**
 * Convert CSV to TSV
 */
export function csvToTsv(csvText: string): string {
  const result = Papa.parse(csvText);
  const rows = result.data as string[][];

  return rows
    .map((row) =>
      row
        .map((cell) => {
          if (cell.includes("\t") || cell.includes("\n") || cell.includes("\r")) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join("\t"),
    )
    .join("\n");
}

/**
 * Convert TSV to CSV
 */
export function tsvToCsv(tsvText: string): string {
  const result = Papa.parse(tsvText, { delimiter: "\t" });
  const rows = result.data as string[][];

  return rows
    .map((row) =>
      row
        .map((cell) => {
          if (cell.includes(",") || cell.includes("\n") || cell.includes("\r")) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(","),
    )
    .join("\n");
}

/**
 * Convert CSV to XML
 */
export function csvToXml(
  data: CSVRow[],
  headers: string[],
  options: {
    rootElement?: string;
    rowElement?: string;
    useAttributes?: boolean;
  } = {},
): string {
  const {
    rootElement = "data",
    rowElement = "row",
    useAttributes = false,
  } = options;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<${rootElement}>\n`;

  data.forEach((row) => {
    xml += `  <${rowElement}`;

    if (useAttributes) {
      headers.forEach((header) => {
        const value = String(row[header] || "").replace(/"/g, "&quot;");
        xml += ` ${header}="${value}"`;
      });
      xml += ` />\n`;
    } else {
      xml += `>\n`;
      headers.forEach((header) => {
        const value = String(row[header] || "");
        xml += `    <${header}>${escapeXml(value)}</${header}>\n`;
      });
      xml += `  </${rowElement}>\n`;
    }
  });

  xml += `</${rootElement}>`;
  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Convert CSV to SQL INSERT statements
 */
export function csvToSql(
  data: CSVRow[],
  headers: string[],
  options: {
    tableName?: string;
    dialect?: "mysql" | "postgresql" | "sqlite";
    batchSize?: number;
  } = {},
): string {
  const {
    tableName = "table_name",
    dialect = "mysql",
    batchSize = 100,
  } = options;

  let sql = "";

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const values = batch
      .map((row) => {
        const rowValues = headers.map((header) => {
          const value = row[header];
          if (value === null || value === "" || value === undefined) {
            return "NULL";
          }
          if (typeof value === "number") {
            return String(value);
          }
          const escaped = String(value)
            .replace(/\\/g, "\\\\")
            .replace(/'/g, "''");
          return `'${escaped}'`;
        });
        return `(${rowValues.join(", ")})`;
      })
      .join(",\n");

    sql += `INSERT INTO ${tableName} (${headers.join(", ")})\nVALUES\n${values};\n\n`;
  }

  return sql.trim();
}

/**
 * Convert CSV to Markdown table
 */
export function csvToMarkdown(
  data: CSVRow[],
  headers: string[],
  options: {
    alignment?: "left" | "center" | "right";
  } = {},
): string {
  const { alignment = "left" } = options;

  const alignSymbol = {
    left: ":---",
    center: ":---:",
    right: "---:",
  };

  let markdown = "";

  // Header row
  markdown += `| ${headers.join(" | ")} |\n`;

  // Separator row
  markdown += `| ${headers.map(() => alignSymbol[alignment]).join(" | ")} |\n`;

  // Data rows
  data.forEach((row) => {
    const values = headers.map((header) => {
      const value = String(row[header] || "").replace(/"/g, '\\"').replace(/\n/g, " ");
      return value.includes("|") ? ` ${value} ` : ` ${value} `;
    });
    markdown += `| ${values.join(" | ")} |\n`;
  });

  return markdown.trim();
}

/**
 * Convert CSV to HTML table
 */
export function csvToHtml(
  data: CSVRow[],
  headers: string[],
  options: {
    className?: string;
    striped?: boolean;
    bordered?: boolean;
    responsive?: boolean;
  } = {},
): string {
  const {
    className = "csv-table",
    striped = true,
    bordered = true,
    responsive = true,
  } = options;

  const classes = [className];
  if (striped) classes.push("table-striped");
  if (bordered) classes.push("table-bordered");
  if (responsive) classes.push("table-responsive");

  let html = `<table class="${classes.join(" ")}">\n`;

  // Header
  html += `  <thead>\n    <tr>\n`;
  headers.forEach((header) => {
    html += `      <th>${escapeHtml(header)}</th>\n`;
  });
  html += `    </tr>\n  </thead>\n`;

  // Body
  html += `  <tbody>\n`;
  data.forEach((row) => {
    html += `    <tr>\n`;
    headers.forEach((header) => {
      html += `      <td>${escapeHtml(String(row[header] || ""))}</td>\n`;
    });
    html += `    </tr>\n`;
  });
  html += `  </tbody>\n`;

  html += `</table>`;
  return html;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Convert CSV to YAML
 */
export function csvToYaml(
  data: CSVRow[],
  options: {
    indent?: number;
    typeInference?: boolean;
  } = {},
): string {
  const { indent = 2, typeInference = false } = options;

  let yaml = "";

  data.forEach((row, index) => {
    yaml += `${index === 0 ? "" : "\n"}-`;

    Object.entries(row).forEach(([key, value]) => {
      let typedValue: any = value;
      if (typeInference) {
        typedValue = inferType(String(value));
      }

      const yamlValue = formatYamlValue(typedValue, indent);
      yaml += `\n  ${key}: ${yamlValue}`;
    });
  });

  return yaml;
}

/**
 * Format value for YAML
 */
function formatYamlValue(value: any, indent: number): string {
  if (value === null || value === "") {
    return "null";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") {
    if (
      value.includes(":") ||
      value.includes("#") ||
      value.includes("-") ||
      value.includes("\n") ||
      value.startsWith(" ") ||
      value.endsWith(" ")
    ) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  return String(value);
}

/**
 * Parse SQL INSERT statements to CSV
 */
export function sqlToCsv(sqlText: string): { data: CSVRow[]; headers: string[] } {
  const insertRegex = /INSERT INTO\s+\w+\s*\(([^)]+)\)\s*VALUES\s*([\s\S]+?);/gi;
  const headers: string[] = [];
  const data: CSVRow[] = [];

  let match;
  while ((match = insertRegex.exec(sqlText)) !== null) {
    const headerStr = match[1];
    const valuesStr = match[2];

    const currentHeaders = headerStr.split(",").map((h) => h.trim().replace(/`/g, ""));

    if (headers.length === 0) {
      headers.push(...currentHeaders);
    }

    const valueGroups = extractSqlValueGroups(valuesStr);

    valueGroups.forEach((values: string[]) => {
      const row: CSVRow = {};
      currentHeaders.forEach((header, index) => {
        row[header] = values[index] !== undefined ? unescapeSqlValue(values[index]) : "";
      });
      data.push(row);
    });
  }

  return { data, headers };
}

/**
 * Extract value groups from SQL VALUES string
 */
function extractSqlValueGroups(valuesStr: string): string[][] {
  const groups: string[][] = [];
  let currentGroup: string[] = [];
  let current = "";
  let inQuotes = false;
  let parenDepth = 0;

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];

    if (char === "'" && valuesStr[i - 1] !== "\\") {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === "(" && !inQuotes) {
      parenDepth++;
      if (parenDepth === 1) {
        currentGroup = [];
        current = "";
      } else {
        current += char;
      }
    } else if (char === ")" && !inQuotes) {
      parenDepth--;
      if (parenDepth === 0) {
        if (current.trim()) {
          currentGroup.push(current.trim());
        }
        groups.push([...currentGroup]);
        current = "";
      } else {
        current += char;
      }
    } else if (char === "," && !inQuotes && parenDepth === 1) {
      currentGroup.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  return groups;
}

/**
 * Unescape SQL value
 */
function unescapeSqlValue(value: string): string {
  if (value === "NULL") return "";
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  return value;
}

/**
 * Format CSV (normalize quoting, delimiters, whitespace, line endings)
 */
export function formatCsv(
  csvText: string,
  options: {
    delimiter?: string;
    lineEnding?: "CRLF" | "LF";
    trimWhitespace?: boolean;
    encoding?: "UTF-8" | "UTF-8-BOM";
  } = {},
): string {
  const {
    delimiter = ",",
    lineEnding = "LF",
    trimWhitespace = true,
    encoding = "UTF-8",
  } = options;

  const result = Papa.parse(csvText);
  const rows = result.data as string[][];

  const eol = lineEnding === "CRLF" ? "\r\n" : "\n";

  let formatted = rows
    .map((row) =>
      row
        .map((cell) => {
          let value = trimWhitespace ? cell.trim() : cell;

          if (
            value.includes(delimiter) ||
            value.includes("\n") ||
            value.includes("\r") ||
            value.includes('"')
          ) {
            value = `"${value.replace(/"/g, '""')}"`;
          }

          return value;
        })
        .join(delimiter),
    )
    .join(eol);

  if (encoding === "UTF-8-BOM") {
    formatted = "\uFEFF" + formatted;
  }

  return formatted;
}

/**
 * Minify CSV (remove unnecessary whitespace, blank lines, redundant quotes)
 */
export function minifyCsv(
  csvText: string,
  options: {
    removeBom?: boolean;
  } = {},
): string {
  const { removeBom = true } = options;

  if (removeBom && csvText.startsWith("\uFEFF")) {
    csvText = csvText.slice(1);
  }

  const result = Papa.parse(csvText);
  const rows = result.data as string[][];

  const minified = rows
    .filter((row) => row.some((cell) => cell.trim() !== ""))
    .map((row) =>
      row
        .map((cell) => {
          const trimmed = cell.trim();

          const needsQuotes =
            trimmed.includes(",") ||
            trimmed.includes("\n") ||
            trimmed.includes("\r") ||
            trimmed.includes('"');

          if (needsQuotes) {
            return `"${trimmed.replace(/"/g, '""')}"`;
          }

          return trimmed;
        })
        .join(","),
    )
    .join("\n");

  return minified;
}

/**
 * Pretty print CSV as aligned text table
 */
export function prettyPrintCsv(csvText: string): string {
  const result = Papa.parse(csvText);
  const rows = result.data as string[][];

  if (rows.length === 0) return "";

  const columnWidths: number[] = [];

  rows.forEach((row) => {
    row.forEach((cell, index) => {
      const width = String(cell).length;
      if (!columnWidths[index] || width > columnWidths[index]) {
        columnWidths[index] = width;
      }
    });
  });

  let output = "";

  rows.forEach((row, rowIndex) => {
    const cells = row.map((cell, index) => {
      const value = String(cell);
      return value.padEnd(columnWidths[index]);
    });

    output += `| ${cells.join(" | ")} |\n`;

    if (rowIndex === 0) {
      output += `| ${columnWidths.map((w) => "-".repeat(w)).join(" | ")} |\n`;
    }
  });

  return output.trim();
}

/**
 * Validate CSV structure
 */
export function validateCsv(
  csvText: string,
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    rowCount: number;
    columnCount: number;
    emptyRows: number;
    inconsistentRows: number;
  };
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  const result = Papa.parse(csvText, {
    skipEmptyLines: false,
  });

  const rows = result.data as string[][];
  const rowCount = rows.length;

  if (rowCount === 0) {
    errors.push("CSV file is empty");
    return {
      isValid: false,
      errors,
      warnings,
      stats: { rowCount: 0, columnCount: 0, emptyRows: 0, inconsistentRows: 0 },
    };
  }

  const columnCount = rows[0].length;
  let emptyRows = 0;
  let inconsistentRows = 0;

  rows.forEach((row, index) => {
    const isEmpty = row.every((cell) => cell.trim() === "");

    if (isEmpty) {
      emptyRows++;
      warnings.push(`Row ${index + 1} is empty`);
    }

    if (row.length !== columnCount) {
      inconsistentRows++;
      errors.push(
        `Row ${index + 1} has ${row.length} columns, expected ${columnCount}`,
      );
    }
  });

  if (result.errors.length > 0) {
    result.errors.forEach((error) => {
      errors.push(`Parse error: ${error.message} at row ${error.row}`);
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: { rowCount, columnCount, emptyRows, inconsistentRows },
  };
}

/**
 * Remove duplicate rows from CSV
 */
export function removeDuplicates(
  data: CSVRow[],
  options: {
    columns?: string[];
    keepFirst?: boolean;
  } = {},
): { data: CSVRow[]; removedCount: number } {
  const { columns, keepFirst = true } = options;

  const seen = new Set<string>();
  const result: CSVRow[] = [];
  let removedCount = 0;

  const iterateData = keepFirst ? data : [...data].reverse();

  iterateData.forEach((row) => {
    const key = columns
      ? columns.map((col) => row[col]).join("|||")
      : Object.values(row).join("|||");

    if (!seen.has(key)) {
      seen.add(key);
      result.push(row);
    } else {
      removedCount++;
    }
  });

  if (!keepFirst) {
    result.reverse();
  }

  return { data: result, removedCount };
}

/**
 * Filter CSV rows by condition
 */
export function filterCsvRows(
  data: CSVRow[],
  conditions: Array<{
    column: string;
    operator: "equals" | "contains" | "regex" | "gt" | "lt" | "gte" | "lte";
    value: string;
  }>,
  logic: "AND" | "OR" = "AND",
): CSVRow[] {
  return data.filter((row) => {
    const results = conditions.map((condition) => {
      const cellValue = String(row[condition.column] || "");

      switch (condition.operator) {
        case "equals":
          return cellValue === condition.value;
        case "contains":
          return cellValue.includes(condition.value);
        case "regex":
          try {
            return new RegExp(condition.value).test(cellValue);
          } catch {
            return false;
        }
        case "gt":
          return Number(cellValue) > Number(condition.value);
        case "lt":
          return Number(cellValue) < Number(condition.value);
        case "gte":
          return Number(cellValue) >= Number(condition.value);
        case "lte":
          return Number(cellValue) <= Number(condition.value);
        default:
          return false;
      }
    });

    return logic === "AND" ? results.every(Boolean) : results.some(Boolean);
  });
}

/**
 * Sort CSV rows by columns
 */
export function sortCsvRows(
  data: CSVRow[],
  sortConfig: Array<{
    column: string;
    direction: "asc" | "desc";
    type?: "text" | "number" | "date";
  }>,
): CSVRow[] {
  return [...data].sort((a, b) => {
    for (const { column, direction, type = "text" } of sortConfig) {
      let aValue: any = a[column];
      let bValue: any = b[column];

      if (type === "number") {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      } else if (type === "date") {
        aValue = new Date(String(aValue)).getTime() || 0;
        bValue = new Date(String(bValue)).getTime() || 0;
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;

      if (comparison !== 0) {
        return direction === "asc" ? comparison : -comparison;
      }
    }

    return 0;
  });
}

/**
 * Extract columns from CSV
 */
export function extractColumns(
  data: CSVRow[],
  headers: string[],
  columnsToExtract: string[],
): { data: CSVRow[]; headers: string[] } {
  const extractedHeaders = columnsToExtract.filter((h) => headers.includes(h));

  const extractedData = data.map((row) => {
    const newRow: CSVRow = {};
    extractedHeaders.forEach((header) => {
      newRow[header] = row[header] || "";
    });
    return newRow;
  });

  return { data: extractedData, headers: extractedHeaders };
}

/**
 * Remove columns from CSV
 */
export function removeColumns(
  data: CSVRow[],
  headers: string[],
  columnsToRemove: string[],
): { data: CSVRow[]; headers: string[] } {
  const newHeaders = headers.filter((h) => !columnsToRemove.includes(h));

  const newData = data.map((row) => {
    const newRow: CSVRow = {};
    newHeaders.forEach((header) => {
      newRow[header] = row[header] || "";
    });
    return newRow;
  });

  return { data: newData, headers: newHeaders };
}

/**
 * Split column into multiple columns
 */
export function splitColumn(
  data: CSVRow[],
  headers: string[],
  columnToSplit: string,
  delimiter: string,
  newColumnNames: string[],
): { data: CSVRow[]; headers: string[] } {
  const columnIndex = headers.indexOf(columnToSplit);
  const newHeaders = [
    ...headers.slice(0, columnIndex),
    ...newColumnNames,
    ...headers.slice(columnIndex + 1),
  ];

  const newData = data.map((row) => {
    const values = String(row[columnToSplit] || "").split(delimiter);
    const newRow: CSVRow = {};

    let newColumnIndex = 0;
    headers.forEach((header, index) => {
      if (header === columnToSplit) {
        newColumnNames.forEach((newName, i) => {
          newRow[newName] = values[i] !== undefined ? values[i].trim() : "";
        });
        newColumnIndex = index + 1;
      } else {
        newRow[header] = row[header] || "";
      }
    });

    return newRow;
  });

  return { data: newData, headers: newHeaders };
}

/**
 * Merge columns into one
 */
export function mergeColumns(
  data: CSVRow[],
  headers: string[],
  columnsToMerge: string[],
  newColumnName: string,
  separator: string,
  removeOriginals: boolean = true,
): { data: CSVRow[]; headers: string[] } {
  const newHeaders = removeOriginals
    ? headers.filter((h) => !columnsToMerge.includes(h))
    : [...headers];

  if (!newHeaders.includes(newColumnName)) {
    newHeaders.push(newColumnName);
  }

  const newData = data.map((row) => {
    const newRow: CSVRow = {};

    if (removeOriginals) {
      headers.forEach((header) => {
        if (!columnsToMerge.includes(header)) {
          newRow[header] = row[header] || "";
        }
      });
    } else {
      Object.assign(newRow, row);
    }

    const mergedValue = columnsToMerge
      .map((col) => String(row[col] || ""))
      .join(separator);

    newRow[newColumnName] = mergedValue;

    return newRow;
  });

  return { data: newData, headers: newHeaders };
}

/**
 * Transpose CSV (swap rows and columns)
 */
export function transposeCsv(
  data: CSVRow[],
  headers: string[],
): { data: CSVRow[]; headers: string[] } {
  const newHeaders = ["Column", ...headers.map((_, i) => `Row ${i + 1}`)];

  const newData: CSVRow[] = [];

  headers.forEach((header) => {
    const newRow: CSVRow = { Column: header };
    data.forEach((row, index) => {
      newRow[`Row ${index + 1}`] = row[header] || "";
    });
    newData.push(newRow);
  });

  return { data: newData, headers: newHeaders };
}

/**
 * Calculate column statistics
 */
export function calculateColumnStats(
  data: CSVRow[],
  headers: string[],
): Array<{
  column: string;
  count: number;
  nullCount: number;
  nullRate: number;
  uniqueCount: number;
  min?: string;
  max?: string;
  mean?: number;
  median?: number;
  mode?: string;
  isNumeric: boolean;
}> {
  return headers.map((header) => {
    const values = data.map((row) => row[header]);
    const nonEmptyValues = values.filter((v) => v !== null && v !== "" && v !== undefined);
    const nullCount = values.length - nonEmptyValues.length;

    const uniqueValues = [...new Set(nonEmptyValues.map(String))];

    const numericValues = nonEmptyValues
      .map((v) => Number(v))
      .filter((n) => !isNaN(n));

    const isNumeric = numericValues.length > nonEmptyValues.length * 0.5;

    const stats: any = {
      column: header,
      count: values.length,
      nullCount,
      nullRate: nullCount / values.length,
      uniqueCount: uniqueValues.length,
      isNumeric,
    };

    if (isNumeric && numericValues.length > 0) {
      numericValues.sort((a, b) => a - b);
      stats.min = String(numericValues[0]);
      stats.max = String(numericValues[numericValues.length - 1]);
      stats.mean =
        numericValues.reduce((sum, n) => sum + n, 0) / numericValues.length;

      const mid = Math.floor(numericValues.length / 2);
      stats.median =
        numericValues.length % 2 === 0
          ? (numericValues[mid - 1] + numericValues[mid]) / 2
          : numericValues[mid];

      const frequency: Record<string, number> = {};
      numericValues.forEach((n) => {
        frequency[String(n)] = (frequency[String(n)] || 0) + 1;
      });
      stats.mode = Object.entries(frequency).sort((a, b) => b[1] - a[1])[0]?.[0];
    } else {
      const frequency: Record<string, number> = {};
      nonEmptyValues.forEach((v) => {
        frequency[String(v)] = (frequency[String(v)] || 0) + 1;
      });
      stats.mode = Object.entries(frequency).sort((a, b) => b[1] - a[1])[0]?.[0];

      if (nonEmptyValues.length > 0) {
        stats.min = String(nonEmptyValues[0]);
        stats.max = String(nonEmptyValues[nonEmptyValues.length - 1]);
      }
    }

    return stats;
  });
}

/**
 * Extract email addresses from CSV
 */
export function extractEmails(
  data: CSVRow[],
  headers: string[],
  options: {
    deduplicate?: boolean;
    validate?: boolean;
    domainFilter?: string;
  } = {},
): string[] {
  const { deduplicate = true, validate = true, domainFilter } = options;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emails: string[] = [];

  headers.forEach((header) => {
    data.forEach((row) => {
      const value = String(row[header] || "");
      const matches = value.match(emailRegex);

      if (matches) {
        const email = matches[0];

        if (validate && !emailRegex.test(email)) {
          return;
        }

        if (domainFilter && !email.endsWith(domainFilter)) {
          return;
        }

        emails.push(email);
      }
    });
  });

  return deduplicate ? [...new Set(emails)] : emails;
}

/**
 * Clean CSV (trim whitespace, remove blank rows, fix encoding, normalize line endings)
 */
export function cleanCsv(
  csvText: string,
  options: {
    trimWhitespace?: boolean;
    removeBlankRows?: boolean;
    removeBom?: boolean;
    normalizeLineEndings?: boolean;
  } = {},
): { cleaned: string; changes: string[] } {
  const {
    trimWhitespace = true,
    removeBlankRows = true,
    removeBom = true,
    normalizeLineEndings = true,
  } = options;

  const changes: string[] = [];
  let cleaned = csvText;

  if (removeBom && cleaned.startsWith("\uFEFF")) {
    cleaned = cleaned.slice(1);
    changes.push("Removed BOM marker");
  }

  if (normalizeLineEndings) {
    const crlfCount = (cleaned.match(/\r\n/g) || []).length;
    const lfCount = (cleaned.match(/\n/g) || []).length - crlfCount;

    if (crlfCount > 0 && lfCount > 0) {
      cleaned = cleaned.replace(/\r\n/g, "\n");
      changes.push("Normalized line endings to LF");
    }
  }

  const result = Papa.parse(cleaned);
  const rows = result.data as string[][];

  let processedRows: string[][] = rows;

  if (trimWhitespace) {
    processedRows = processedRows.map((row) =>
      row.map((cell) => cell.trim()),
    );
    changes.push("Trimmed whitespace from all cells");
  }

  if (removeBlankRows) {
    const blankRowCount = processedRows.filter(
      (row) => row.every((cell) => cell.trim() === ""),
    ).length;

    if (blankRowCount > 0) {
      processedRows = processedRows.filter(
        (row) => !row.every((cell) => cell.trim() === ""),
      );
      changes.push(`Removed ${blankRowCount} blank rows`);
    }
  }

  cleaned = processedRows.map((row) => row.join(",")).join("\n");

  return { cleaned, changes };
}

/**
 * Generate random CSV data
 */
export function generateRandomCsvData(
  columns: Array<{
    name: string;
    type: "name" | "email" | "date" | "number" | "boolean" | "uuid" | "text";
    options?: any;
  }>,
  rowCount: number,
): { data: CSVRow[]; headers: string[] } {
  const headers = columns.map((col) => col.name);
  const data: CSVRow[] = [];

  const firstNames = [
    "James",
    "Mary",
    "John",
    "Patricia",
    "Robert",
    "Jennifer",
    "Michael",
    "Linda",
    "William",
    "Elizabeth",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ];

  for (let i = 0; i < rowCount; i++) {
    const row: CSVRow = {};

    columns.forEach((col) => {
      switch (col.type) {
        case "name":
          row[col.name] = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
          break;
        case "email":
          row[col.name] = `user${i}@example.com`;
          break;
        case "date":
          const start = col.options?.start || new Date(2020, 0, 1);
          const end = col.options?.end || new Date();
          row[col.name] = new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime()),
          )
            .toISOString()
            .split("T")[0];
          break;
        case "number":
          const min = col.options?.min ?? 0;
          const max = col.options?.max ?? 100;
          row[col.name] = Math.floor(Math.random() * (max - min + 1)) + min;
          break;
        case "boolean":
          row[col.name] = Math.random() > 0.5 ? "true" : "false";
          break;
        case "uuid":
          row[col.name] = crypto.randomUUID();
          break;
        case "text":
          const texts = col.options?.values || ["Option A", "Option B", "Option C"];
          row[col.name] = texts[Math.floor(Math.random() * texts.length)];
          break;
        default:
          row[col.name] = "";
      }
    });

    data.push(row);
  }

  return { data, headers };
}

/**
 * Sample CSV rows
 */
export function sampleCsvRows(
  data: CSVRow[],
  options:
    | { type: "count"; count?: number; percentage?: never; seed?: number }
    | { type: "percentage"; percentage?: number; count?: never; seed?: number },
): CSVRow[] {
  const { seed } = options;

  let sampleSize: number;

  if (options.type === "count") {
    sampleSize = Math.min(options.count || 100, data.length);
  } else {
    sampleSize = Math.floor(((options.percentage || 10) / 100) * data.length);
  }

  const indices = Array.from({ length: data.length }, (_, i) => i);

  if (seed !== undefined) {
    seededShuffle(indices, seed);
  } else {
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
  }

  return indices.slice(0, sampleSize).map((i) => data[i]);
}

/**
 * Seeded random shuffle (for reproducibility)
 */
function seededShuffle(array: number[], seed: number) {
  let current = array.length;
  let temp;
  let index;

  let random = seed;

  while (current > 0) {
    random = (random * 9301 + 49297) % 233280;
    index = Math.floor((random / 233280) * current);

    current--;

    temp = array[current];
    array[current] = array[index];
    array[index] = temp;
  }
}

/**
 * Join two CSV datasets
 */
export function joinCsv(
  leftData: CSVRow[],
  leftKey: string,
  rightData: CSVRow[],
  rightKey: string,
  joinType: "inner" | "left" | "right" | "full",
  options: {
    leftPrefix?: string;
    rightPrefix?: string;
  } = {},
): { data: CSVRow[]; headers: string[] } {
  const { leftPrefix = "", rightPrefix = "right_" } = options;

  const leftHeaders = Object.keys(leftData[0] || {});
  const rightHeaders = Object.keys(rightData[0] || {});

  const headers = [
    leftKey,
    ...leftHeaders.filter((h) => h !== leftKey).map((h) => leftPrefix + h),
    ...rightHeaders.filter((h) => h !== rightKey).map((h) => rightPrefix + h),
  ];

  const rightMap = new Map<string, CSVRow[]>();
  rightData.forEach((row) => {
    const key = String(row[rightKey]);
    if (!rightMap.has(key)) {
      rightMap.set(key, []);
    }
    rightMap.get(key)!.push(row);
  });

  const result: CSVRow[] = [];
  const matchedRightKeys = new Set<string>();

  if (joinType === "inner" || joinType === "left" || joinType === "full") {
    leftData.forEach((leftRow) => {
      const key = String(leftRow[leftKey]);
      const matchingRightRows = rightMap.get(key) || [];

      if (matchingRightRows.length > 0) {
        matchingRightRows.forEach((rightRow) => {
          matchedRightKeys.add(String(rightRow[rightKey]));
          result.push(mergeJoinRow(leftRow, rightRow, leftKey, rightKey, leftPrefix, rightPrefix, leftHeaders, rightHeaders));
        });
      } else if (joinType === "left" || joinType === "full") {
        const newRow: CSVRow = { [leftKey]: key };
        leftHeaders
          .filter((h) => h !== leftKey)
          .forEach((h) => {
            newRow[leftPrefix + h] = leftRow[h] || "";
          });
        rightHeaders.forEach((h) => {
          newRow[rightPrefix + h] = "";
        });
        result.push(newRow);
      }
    });
  }

  if (joinType === "right" || joinType === "full") {
    rightData.forEach((rightRow) => {
      const key = String(rightRow[rightKey]);

      if (!matchedRightKeys.has(key)) {
        const newRow: CSVRow = { [leftKey]: "" };
        leftHeaders.forEach((h) => {
          newRow[leftPrefix + h] = "";
        });
        rightHeaders
          .filter((h) => h !== rightKey)
          .forEach((h) => {
            newRow[rightPrefix + h] = rightRow[h] || "";
          });
        result.push(newRow);
      }
    });
  }

  return { data: result, headers };
}

/**
 * Merge join row helper
 */
function mergeJoinRow(
  leftRow: CSVRow,
  rightRow: CSVRow,
  leftKey: string,
  rightKey: string,
  leftPrefix: string,
  rightPrefix: string,
  leftHeaders: string[],
  rightHeaders: string[],
): CSVRow {
  const newRow: CSVRow = { [leftKey]: leftRow[leftKey] };

  leftHeaders
    .filter((h) => h !== leftKey)
    .forEach((h) => {
      newRow[leftPrefix + h] = leftRow[h] || "";
    });

  rightHeaders
    .filter((h) => h !== rightKey)
    .forEach((h) => {
      newRow[rightPrefix + h] = rightRow[h] || "";
    });

  return newRow;
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((sum, n) => sum + n, 0) / values.length;
  const squareDiffs = values.map((n) => Math.pow(n - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((sum, sq) => sum + sq, 0) / values.length;
  return Math.sqrt(avgSquareDiff);
}

/**
 * Calculate value frequency distribution
 */
export function valueFrequencyDistribution(
  data: CSVRow[],
  column: string,
  options: {
    topN?: number;
    minCount?: number;
  } = {},
): Array<{ value: string; count: number; percentage: number }> {
  const { topN = 20, minCount = 1 } = options;

  const frequency: Record<string, number> = {};
  const totalRows = data.length;

  data.forEach((row) => {
    const value = String(row[column] ?? "");
    if (value.trim() !== "") {
      frequency[value] = (frequency[value] || 0) + 1;
    }
  });

  let result = Object.entries(frequency)
    .filter(([, count]) => count >= minCount)
    .map(([value, count]) => ({
      value,
      count,
      percentage: totalRows > 0 ? (count / totalRows) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return result;
}

/**
 * Normalize date formats
 */
export function normalizeDates(
  data: CSVRow[],
  headers: string[],
  columns: string[],
  outputFormat: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD" | "MMM DD, YYYY",
): CSVRow[] {
  const datePatterns = [
    { regex: /^(\d{4})-(\d{2})-(\d{2})$/, parse: (m: RegExpMatchArray) => new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3])) },
    { regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, parse: (m: RegExpMatchArray) => new Date(parseInt(m[3]), parseInt(m[1]) - 1, parseInt(m[2])) },
    { regex: /^(\d{2})-(\d{2})-(\d{4})$/, parse: (m: RegExpMatchArray) => new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1])) },
    { regex: /^(\d{4})\/(\d{2})\/(\d{2})$/, parse: (m: RegExpMatchArray) => new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3])) },
  ];

  const formatFunctions: Record<string, (date: Date) => string> = {
    "YYYY-MM-DD": (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    "MM/DD/YYYY": (d) => `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`,
    "DD/MM/YYYY": (d) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`,
    "YYYY/MM/DD": (d) => `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`,
    "MMM DD, YYYY": (d) => d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
  };

  return data.map((row) => {
    const newRow = { ...row };
    columns.forEach((col) => {
      if (headers.includes(col)) {
        const value = String(row[col] || "");
        for (const pattern of datePatterns) {
          const match = value.match(pattern.regex);
          if (match) {
            const date = pattern.parse(match);
            if (!isNaN(date.getTime())) {
              newRow[col] = formatFunctions[outputFormat](date);
              break;
            }
          }
        }
      }
    });
    return newRow;
  });
}

/**
 * Normalize phone numbers
 */
export function normalizePhoneNumbers(
  data: CSVRow[],
  headers: string[],
  columns: string[],
  format: "international" | "national" | "digits-only" | "dashed" | "dotted",
  defaultCountryCode: string = "+1",
): CSVRow[] {
  const phoneRegex = /[\d\s\-\(\)\.]+/g;

  return data.map((row) => {
    const newRow = { ...row };
    columns.forEach((col) => {
      if (headers.includes(col)) {
        const value = String(row[col] || "");
        const digits = value.replace(/\D/g, "");

        if (digits.length >= 10) {
          let phoneNumber = digits;
          if (digits.length === 10) {
            phoneNumber = defaultCountryCode.replace("+", "") + digits;
          }

          switch (format) {
            case "international":
              newRow[col] = `+${phoneNumber}`;
              break;
            case "national":
              newRow[col] = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
              break;
            case "digits-only":
              newRow[col] = phoneNumber;
              break;
            case "dashed":
              newRow[col] = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
              break;
            case "dotted":
              newRow[col] = `${phoneNumber.slice(0, 3)}.${phoneNumber.slice(3, 6)}.${phoneNumber.slice(6)}`;
              break;
          }
        }
      }
    });
    return newRow;
  });
}

/**
 * Normalize currency values
 */
export function normalizeCurrencies(
  data: CSVRow[],
  headers: string[],
  columns: string[],
  options: {
    symbol: string;
    decimalPlaces: number;
    thousandSeparator: boolean;
  } = { symbol: "$", decimalPlaces: 2, thousandSeparator: true },
): CSVRow[] {
  const currencyRegex = /[$€£¥₹]?\s*[\d,.\s]+/g;

  return data.map((row) => {
    const newRow = { ...row };
    columns.forEach((col) => {
      if (headers.includes(col)) {
        const value = String(row[col] || "");
        const digits = value.replace(/[^\d.-]/g, "");
        const numValue = parseFloat(digits);

        if (!isNaN(numValue)) {
          let formatted: string;
          if (options.thousandSeparator) {
            formatted = numValue.toLocaleString("en-US", {
              minimumFractionDigits: options.decimalPlaces,
              maximumFractionDigits: options.decimalPlaces,
            });
          } else {
            formatted = numValue.toFixed(options.decimalPlaces);
          }
          newRow[col] = `${options.symbol}${formatted}`;
        }
      }
    });
    return newRow;
  });
}

/**
 * Normalize text casing
 */
export function normalizeCasing(
  data: CSVRow[],
  headers: string[],
  columns: string[],
  casing: "uppercase" | "lowercase" | "titlecase" | "sentencecase",
): CSVRow[] {
  return data.map((row) => {
    const newRow = { ...row };
    columns.forEach((col) => {
      if (headers.includes(col)) {
        const value = String(row[col] || "");
        switch (casing) {
          case "uppercase":
            newRow[col] = value.toUpperCase();
            break;
          case "lowercase":
            newRow[col] = value.toLowerCase();
            break;
          case "titlecase":
            newRow[col] = value
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ");
            break;
          case "sentencecase":
            newRow[col] = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            break;
        }
      }
    });
    return newRow;
  });
}

/**
 * Normalize country codes
 */
export function normalizeCountryCodes(
  data: CSVRow[],
  headers: string[],
  columns: string[],
  format: "alpha2" | "alpha3" | "numeric" | "full",
): CSVRow[] {
  const countryMap: Record<string, { alpha2: string; alpha3: string; numeric: string; full: string }> = {
    "US": { alpha2: "US", alpha3: "USA", numeric: "840", full: "United States" },
    "USA": { alpha2: "US", alpha3: "USA", numeric: "840", full: "United States" },
    "UNITED STATES": { alpha2: "US", alpha3: "USA", numeric: "840", full: "United States" },
    "GB": { alpha2: "GB", alpha3: "GBR", numeric: "826", full: "United Kingdom" },
    "UK": { alpha2: "GB", alpha3: "GBR", numeric: "826", full: "United Kingdom" },
    "UNITED KINGDOM": { alpha2: "GB", alpha3: "GBR", numeric: "826", full: "United Kingdom" },
    "CA": { alpha2: "CA", alpha3: "CAN", numeric: "124", full: "Canada" },
    "CANADA": { alpha2: "CA", alpha3: "CAN", numeric: "124", full: "Canada" },
    "DE": { alpha2: "DE", alpha3: "DEU", numeric: "276", full: "Germany" },
    "GERMANY": { alpha2: "DE", alpha3: "DEU", numeric: "276", full: "Germany" },
    "FR": { alpha2: "FR", alpha3: "FRA", numeric: "250", full: "France" },
    "FRANCE": { alpha2: "FR", alpha3: "FRA", numeric: "250", full: "France" },
    "JP": { alpha2: "JP", alpha3: "JPN", numeric: "392", full: "Japan" },
    "JAPAN": { alpha2: "JP", alpha3: "JPN", numeric: "392", full: "Japan" },
    "CN": { alpha2: "CN", alpha3: "CHN", numeric: "156", full: "China" },
    "CHINA": { alpha2: "CN", alpha3: "CHN", numeric: "156", full: "China" },
    "IN": { alpha2: "IN", alpha3: "IND", numeric: "356", full: "India" },
    "INDIA": { alpha2: "IN", alpha3: "IND", numeric: "356", full: "India" },
    "AU": { alpha2: "AU", alpha3: "AUS", numeric: "036", full: "Australia" },
    "AUSTRALIA": { alpha2: "AU", alpha3: "AUS", numeric: "036", full: "Australia" },
    "BR": { alpha2: "BR", alpha3: "BRA", numeric: "076", full: "Brazil" },
    "BRAZIL": { alpha2: "BR", alpha3: "BRA", numeric: "076", full: "Brazil" },
    "MX": { alpha2: "MX", alpha3: "MEX", numeric: "484", full: "Mexico" },
    "MEXICO": { alpha2: "MX", alpha3: "MEX", numeric: "484", full: "Mexico" },
    "IT": { alpha2: "IT", alpha3: "ITA", numeric: "380", full: "Italy" },
    "ITALY": { alpha2: "IT", alpha3: "ITA", numeric: "380", full: "Italy" },
    "ES": { alpha2: "ES", alpha3: "ESP", numeric: "724", full: "Spain" },
    "SPAIN": { alpha2: "ES", alpha3: "ESP", numeric: "724", full: "Spain" },
    "RU": { alpha2: "RU", alpha3: "RUS", numeric: "643", full: "Russia" },
    "RUSSIA": { alpha2: "RU", alpha3: "RUS", numeric: "643", full: "Russia" },
    "KR": { alpha2: "KR", alpha3: "KOR", numeric: "410", full: "South Korea" },
    "SOUTH KOREA": { alpha2: "KR", alpha3: "KOR", numeric: "410", full: "South Korea" },
    "NL": { alpha2: "NL", alpha3: "NLD", numeric: "528", full: "Netherlands" },
    "NETHERLANDS": { alpha2: "NL", alpha3: "NLD", numeric: "528", full: "Netherlands" },
    "SE": { alpha2: "SE", alpha3: "SWE", numeric: "752", full: "Sweden" },
    "SWEDEN": { alpha2: "SE", alpha3: "SWE", numeric: "752", full: "Sweden" },
    "CH": { alpha2: "CH", alpha3: "CHE", numeric: "756", full: "Switzerland" },
    "SWITZERLAND": { alpha2: "CH", alpha3: "CHE", numeric: "756", full: "Switzerland" },
  };

  return data.map((row) => {
    const newRow = { ...row };
    columns.forEach((col) => {
      if (headers.includes(col)) {
        const value = String(row[col] || "").trim().toUpperCase();
        const country = countryMap[value];
        if (country) {
          newRow[col] = country[format];
        }
      }
    });
    return newRow;
  });
}

/**
 * Normalize boolean representations
 */
export function normalizeBooleans(
  data: CSVRow[],
  headers: string[],
  columns: string[],
  format: "true_false" | "yes_no" | "1_0" | "Y_N",
): CSVRow[] {
  const trueValues = ["true", "yes", "1", "y", "t", "enabled", "on"];
  const falseValues = ["false", "no", "0", "n", "f", "disabled", "off"];

  return data.map((row) => {
    const newRow = { ...row };
    columns.forEach((col) => {
      if (headers.includes(col)) {
        const value = String(row[col] || "").trim().toLowerCase();
        if (trueValues.includes(value)) {
          switch (format) {
            case "true_false":
              newRow[col] = "true";
              break;
            case "yes_no":
              newRow[col] = "Yes";
              break;
            case "1_0":
              newRow[col] = "1";
              break;
            case "Y_N":
              newRow[col] = "Y";
              break;
          }
        } else if (falseValues.includes(value)) {
          switch (format) {
            case "true_false":
              newRow[col] = "false";
              break;
            case "yes_no":
              newRow[col] = "No";
              break;
            case "1_0":
              newRow[col] = "0";
              break;
            case "Y_N":
              newRow[col] = "N";
              break;
          }
        }
      }
    });
    return newRow;
  });
}

/**
 * Generate UUID
 */
export function generateUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate random name
 */
export function generateRandomName(): string {
  const firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
    "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
    "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Lisa", "Daniel", "Nancy",
    "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
    "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
  ];
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
    "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
    "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
    "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  ];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

/**
 * Generate random email
 */
export function generateRandomEmail(domain: string = "example.com"): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";
  for (let i = 0; i < 8; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${username}@${domain}`;
}

/**
 * Generate random date
 */
export function generateRandomDate(
  startDate: Date = new Date(2020, 0, 1),
  endDate: Date = new Date(),
  format: string = "YYYY-MM-DD",
): string {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  const date = new Date(randomTime);

  switch (format) {
    case "YYYY-MM-DD":
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    case "MM/DD/YYYY":
      return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;
    case "DD/MM/YYYY":
      return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    default:
      return date.toISOString().split("T")[0];
  }
}

/**
 * Seeded random number generator
 */
export function seededRandom(seed: number): () => number {
  let current = seed;
  return () => {
    current = (current * 9301 + 49297) % 233280;
    return current / 233280;
  };
}
