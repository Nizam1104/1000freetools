/**
 * csv.worker.ts
 * Comprehensive CSV Web Worker — drop into your /lib folder.
 *
 * Handles: parse, create, sort, filter/search, paginate, aggregate,
 *          column stats, find-replace, transpose, deduplicate, merge,
 *          type-cast, column reorder/rename/drop, and validation.
 *
 * Depends on PapaParse (loaded via importScripts from CDN, or bundled).
 * If you bundle with webpack/vite, replace importScripts with:
 *   import Papa from 'papaparse'
 */

// ─── PapaParse bootstrap ─────────────────────────────────────────────────────
// Comment this line out if PapaParse is bundled via your build tool instead.
// importScripts(
//   "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js",
// );
import Papa from "papaparse";
// declare const Papa: any;

// ─── Types ───────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc";
export type CastType = "string" | "number" | "boolean" | "date" | "auto";
export type AggregateOp =
  | "sum"
  | "avg"
  | "min"
  | "max"
  | "count"
  | "countUnique"
  | "first"
  | "last";

export interface ParseOptions {
  delimiter?: string; // default: auto-detect
  headers?: boolean; // default: true (first row = headers)
  skipEmptyLines?: boolean; // default: true
  dynamicTyping?: boolean; // default: false — set true to auto-cast numbers/bools
  encoding?: string; // default: 'UTF-8'
  preview?: number; // only parse first N rows (0 = all)
  transformHeader?: (h: string) => string;
}

export interface CreateOptions {
  delimiter?: string; // default: ','
  newline?: string; // default: '\n'
  quoteAll?: boolean; // default: false — quote all fields
}

export interface SortOptions {
  column: string;
  direction?: SortDirection; // default: 'asc'
  type?: "string" | "number" | "date"; // default: 'string'
}

export interface FilterOptions {
  /** Simple exact/contains filters applied with AND logic */
  filters?: Array<{
    column: string;
    operator:
      | "eq"
      | "neq"
      | "contains"
      | "notContains"
      | "startsWith"
      | "endsWith"
      | "gt"
      | "gte"
      | "lt"
      | "lte"
      | "empty"
      | "notEmpty";
    value?: string | number | boolean;
    caseSensitive?: boolean;
  }>;
  /** Free-text search across all columns */
  globalSearch?: string;
  globalSearchCaseSensitive?: boolean;
}

export interface PaginateOptions {
  page: number; // 1-indexed
  pageSize: number;
}

export interface AggregateOptions {
  groupBy?: string[]; // columns to group by (omit for grand total)
  aggregations: Array<{
    column: string;
    op: AggregateOp;
    as?: string; // output column name (default: "op_column")
  }>;
}

export interface FindReplaceOptions {
  column?: string; // omit to search all columns
  find: string;
  replace: string;
  caseSensitive?: boolean;
  wholeCell?: boolean; // default: false (substring replace)
}

export interface ValidationRule {
  column: string;
  rule:
    | "required"
    | "numeric"
    | "integer"
    | "email"
    | "url"
    | "minLength"
    | "maxLength"
    | "min"
    | "max"
    | "regex"
    | "unique";
  value?: number | string; // parameter for minLength/maxLength/min/max/regex
  message?: string;
}

export interface MergeOptions {
  data2: Record<string, any>[];
  on: string; // key column present in both datasets
  type?: "inner" | "left" | "right" | "full"; // default: 'left'
  suffixes?: [string, string]; // default: ['_1', '_2'] for clashing column names
}

// Message shapes
export type CSVWorkerMessage =
  | { type: "parse-csv"; data: string; options?: ParseOptions }
  | { type: "create-csv"; data: Record<string, any>[]; options?: CreateOptions }
  | { type: "sort"; data: Record<string, any>[]; options: SortOptions }
  | { type: "multi-sort"; data: Record<string, any>[]; options: SortOptions[] }
  | { type: "filter"; data: Record<string, any>[]; options: FilterOptions }
  | { type: "paginate"; data: Record<string, any>[]; options: PaginateOptions }
  | {
      type: "aggregate";
      data: Record<string, any>[];
      options: AggregateOptions;
    }
  | {
      type: "column-stats";
      data: Record<string, any>[];
      options: { column: string };
    }
  | {
      type: "find-replace";
      data: Record<string, any>[];
      options: FindReplaceOptions;
    }
  | { type: "transpose"; data: Record<string, any>[] }
  | {
      type: "deduplicate";
      data: Record<string, any>[];
      options?: { columns?: string[] };
    }
  | { type: "merge"; data: Record<string, any>[]; options: MergeOptions }
  | {
      type: "cast-column";
      data: Record<string, any>[];
      options: { column: string; to: CastType };
    }
  | {
      type: "rename-columns";
      data: Record<string, any>[];
      options: { map: Record<string, string> };
    }
  | {
      type: "reorder-columns";
      data: Record<string, any>[];
      options: { order: string[] };
    }
  | {
      type: "drop-columns";
      data: Record<string, any>[];
      options: { columns: string[] };
    }
  | {
      type: "add-column";
      data: Record<string, any>[];
      options: { name: string; formula: string };
    }
  | {
      type: "validate";
      data: Record<string, any>[];
      options: { rules: ValidationRule[] };
    }
  | { type: "infer-schema"; data: Record<string, any>[] };

export interface CSVWorkerResponse {
  type: "success" | "error";
  data?: any;
  error?: string;
  /** echoed back for correlation */
  requestType?: string;
}

// ─── Router ──────────────────────────────────────────────────────────────────

self.onmessage = async (event: MessageEvent<CSVWorkerMessage>) => {
  const msg = event.data;
  try {
    let result: any;

    switch (msg.type) {
      case "parse-csv":
        result = handleParseCSV(msg.data, msg.options);
        break;
      case "create-csv":
        result = handleCreateCSV(msg.data, msg.options);
        break;
      case "sort":
        result = handleSort(msg.data, [msg.options]);
        break;
      case "multi-sort":
        result = handleSort(msg.data, msg.options);
        break;
      case "filter":
        result = handleFilter(msg.data, msg.options);
        break;
      case "paginate":
        result = handlePaginate(msg.data, msg.options);
        break;
      case "aggregate":
        result = handleAggregate(msg.data, msg.options);
        break;
      case "column-stats":
        result = handleColumnStats(msg.data, msg.options.column);
        break;
      case "find-replace":
        result = handleFindReplace(msg.data, msg.options);
        break;
      case "transpose":
        result = handleTranspose(msg.data);
        break;
      case "deduplicate":
        result = handleDeduplicate(msg.data, msg.options);
        break;
      case "merge":
        result = handleMerge(msg.data, msg.options);
        break;
      case "cast-column":
        result = handleCastColumn(msg.data, msg.options);
        break;
      case "rename-columns":
        result = handleRenameColumns(msg.data, msg.options.map);
        break;
      case "reorder-columns":
        result = handleReorderColumns(msg.data, msg.options.order);
        break;
      case "drop-columns":
        result = handleDropColumns(msg.data, msg.options.columns);
        break;
      case "add-column":
        result = handleAddColumn(msg.data, msg.options);
        break;
      case "validate":
        result = handleValidate(msg.data, msg.options.rules);
        break;
      case "infer-schema":
        result = handleInferSchema(msg.data);
        break;
      default:
        throw new Error(`Unknown message type: ${(msg as any).type}`);
    }

    const response: CSVWorkerResponse = {
      type: "success",
      data: result,
      requestType: msg.type,
    };
    self.postMessage(response);
  } catch (err) {
    const response: CSVWorkerResponse = {
      type: "error",
      error: err instanceof Error ? err.message : String(err),
      requestType: msg.type,
    };
    self.postMessage(response);
  }
};

// ─── 1. PARSE ────────────────────────────────────────────────────────────────

function handleParseCSV(csvText: string, options: ParseOptions = {}) {
  const result = Papa.parse<Record<string, any>>(csvText, {
    delimiter: options.delimiter ?? "", // '' = auto-detect
    header: options.headers ?? true,
    skipEmptyLines: options.skipEmptyLines ?? true,
    dynamicTyping: options.dynamicTyping ?? false,
    encoding: options.encoding ?? "UTF-8",
    preview: options.preview ?? 0,
    transformHeader: options.transformHeader,
    comments: false,
  } as Papa.ParseConfig);

  if (result.errors.length) {
    // non-fatal parse warnings — surface them but still return data
    console.warn("[csv.worker] parse warnings:", result.errors);
  }

  return {
    headers: result.meta.fields ?? [],
    data: result.data,
    totalRows: result.data.length,
    detectedDelimiter: result.meta.delimiter,
    errors: result.errors,
  };
}

// ─── 2. CREATE / SERIALIZE ───────────────────────────────────────────────────

function handleCreateCSV(
  data: Record<string, any>[],
  options: CreateOptions = {},
) {
  if (!Array.isArray(data) || data.length === 0)
    throw new Error("No data to serialize");

  const csv = Papa.unparse(data, {
    delimiter: options.delimiter ?? ",",
    newline: options.newline ?? "\n",
    quotes: options.quoteAll ?? false,
  });
  return csv as string;
}

// ─── 3. SORT (multi-column) ──────────────────────────────────────────────────

function handleSort(data: Record<string, any>[], sorts: SortOptions[]) {
  if (!sorts || sorts.length === 0) return data;

  const sorted = [...data].sort((a, b) => {
    for (const { column, direction = "asc", type = "string" } of sorts) {
      let av = a[column];
      let bv = b[column];

      // Nulls always last
      if (av == null && bv == null) continue;
      if (av == null) return 1;
      if (bv == null) return -1;

      let cmp = 0;
      if (type === "number") {
        cmp = Number(av) - Number(bv);
      } else if (type === "date") {
        cmp = new Date(av).getTime() - new Date(bv).getTime();
      } else {
        cmp = String(av).localeCompare(String(bv), undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }

      if (cmp !== 0) return direction === "asc" ? cmp : -cmp;
    }
    return 0;
  });

  return sorted;
}

// ─── 4. FILTER / SEARCH ──────────────────────────────────────────────────────

function handleFilter(data: Record<string, any>[], options: FilterOptions) {
  let result = data;

  // Column-level filters
  if (options.filters?.length) {
    result = result.filter((row) =>
      options.filters!.every((f) => applyFilter(row, f)),
    );
  }

  // Global free-text search
  if (options.globalSearch) {
    const needle = options.globalSearchCaseSensitive
      ? options.globalSearch
      : options.globalSearch.toLowerCase();

    result = result.filter((row) =>
      Object.values(row).some((v) => {
        const hay = options.globalSearchCaseSensitive
          ? String(v ?? "")
          : String(v ?? "").toLowerCase();
        return hay.includes(needle);
      }),
    );
  }

  return { data: result, totalRows: result.length };
}

function applyFilter(
  row: Record<string, any>,
  f: NonNullable<FilterOptions["filters"]>[number],
): boolean {
  const raw = row[f.column];
  const cell = f.caseSensitive
    ? String(raw ?? "")
    : String(raw ?? "").toLowerCase();
  const val = f.caseSensitive
    ? String(f.value ?? "")
    : String(f.value ?? "").toLowerCase();

  switch (f.operator) {
    case "eq":
      return cell === val;
    case "neq":
      return cell !== val;
    case "contains":
      return cell.includes(val);
    case "notContains":
      return !cell.includes(val);
    case "startsWith":
      return cell.startsWith(val);
    case "endsWith":
      return cell.endsWith(val);
    case "gt":
      return Number(raw) > Number(f.value);
    case "gte":
      return Number(raw) >= Number(f.value);
    case "lt":
      return Number(raw) < Number(f.value);
    case "lte":
      return Number(raw) <= Number(f.value);
    case "empty":
      return raw == null || String(raw).trim() === "";
    case "notEmpty":
      return raw != null && String(raw).trim() !== "";
    default:
      return true;
  }
}

// ─── 5. PAGINATE ─────────────────────────────────────────────────────────────

function handlePaginate(data: Record<string, any>[], options: PaginateOptions) {
  const { page, pageSize } = options;
  if (pageSize <= 0) throw new Error("pageSize must be > 0");

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: data.slice(start, end),
    page,
    pageSize,
    totalRows,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// ─── 6. AGGREGATE / GROUP-BY ─────────────────────────────────────────────────

function handleAggregate(
  data: Record<string, any>[],
  options: AggregateOptions,
) {
  const { groupBy = [], aggregations } = options;

  // Build groups
  const groups = new Map<string, Record<string, any>[]>();

  for (const row of data) {
    const key = groupBy.length
      ? groupBy.map((c) => String(row[c] ?? "")).join("\x00")
      : "__all__";

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(row);
  }

  const results: Record<string, any>[] = [];

  for (const [key, rows] of groups) {
    const out: Record<string, any> = {};

    // Re-attach group-by values
    if (groupBy.length) {
      const parts = key.split("\x00");
      groupBy.forEach((col, i) => {
        out[col] = parts[i];
      });
    }

    for (const agg of aggregations) {
      const colName = agg.as ?? `${agg.op}_${agg.column}`;
      const values = rows.map((r) => r[agg.column]);
      const nums = values.map(Number).filter((n) => !isNaN(n));

      switch (agg.op) {
        case "sum":
          out[colName] = nums.reduce((a, b) => a + b, 0);
          break;
        case "avg":
          out[colName] = nums.length
            ? nums.reduce((a, b) => a + b, 0) / nums.length
            : null;
          break;
        case "min":
          out[colName] = nums.length ? Math.min(...nums) : null;
          break;
        case "max":
          out[colName] = nums.length ? Math.max(...nums) : null;
          break;
        case "count":
          out[colName] = rows.length;
          break;
        case "countUnique":
          out[colName] = new Set(values.map((v) => String(v ?? ""))).size;
          break;
        case "first":
          out[colName] = values[0] ?? null;
          break;
        case "last":
          out[colName] = values[values.length - 1] ?? null;
          break;
      }
    }

    results.push(out);
  }

  return results;
}

// ─── 7. COLUMN STATISTICS ────────────────────────────────────────────────────

function handleColumnStats(data: Record<string, any>[], column: string) {
  const values = data.map((r) => r[column]);
  const strings = values.map((v) => String(v ?? ""));
  const nums = values.map(Number).filter((n) => !isNaN(n));

  // Frequency map
  const freq = new Map<string, number>();
  for (const s of strings) freq.set(s, (freq.get(s) ?? 0) + 1);

  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const topValues = sorted
    .slice(0, 10)
    .map(([value, count]) => ({ value, count }));

  // Numeric stats
  let numericStats: Record<string, number | null> = {
    min: null,
    max: null,
    mean: null,
    median: null,
    stdDev: null,
    sum: null,
    variance: null,
  };

  if (nums.length) {
    const sorted2 = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const variance =
      nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
    const mid = Math.floor(sorted2.length / 2);

    numericStats = {
      min: sorted2[0],
      max: sorted2[sorted2.length - 1],
      sum,
      mean,
      median:
        sorted2.length % 2 === 0
          ? (sorted2[mid - 1] + sorted2[mid]) / 2
          : sorted2[mid],
      variance,
      stdDev: Math.sqrt(variance),
    };
  }

  return {
    column,
    totalValues: values.length,
    nonEmpty: strings.filter((s) => s.trim() !== "").length,
    emptyCount: strings.filter((s) => s.trim() === "").length,
    uniqueCount: freq.size,
    numericCount: nums.length,
    topValues,
    ...numericStats,
  };
}

// ─── 8. FIND & REPLACE ───────────────────────────────────────────────────────

function handleFindReplace(
  data: Record<string, any>[],
  options: FindReplaceOptions,
) {
  const {
    find,
    replace,
    column,
    caseSensitive = false,
    wholeCell = false,
  } = options;
  let replacedCount = 0;

  const result = data.map((row) => {
    const newRow = { ...row };
    const cols = column ? [column] : Object.keys(row);

    for (const col of cols) {
      const cell = String(newRow[col] ?? "");
      const hay = caseSensitive ? cell : cell.toLowerCase();
      const ndl = caseSensitive ? find : find.toLowerCase();

      if (wholeCell) {
        if (hay === ndl) {
          newRow[col] = replace;
          replacedCount++;
        }
      } else if (hay.includes(ndl)) {
        const flags = caseSensitive ? "g" : "gi";
        newRow[col] = cell.replace(
          new RegExp(escapeRegex(find), flags),
          replace,
        );
        replacedCount++;
      }
    }
    return newRow;
  });

  return { data: result, replacedCount };
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ─── 9. TRANSPOSE ────────────────────────────────────────────────────────────

function handleTranspose(data: Record<string, any>[]) {
  if (!data.length) return [];
  const headers = Object.keys(data[0]);

  return headers.map((header) => {
    const row: Record<string, any> = { field: header };
    data.forEach((r, i) => {
      row[`row_${i + 1}`] = r[header];
    });
    return row;
  });
}

// ─── 10. DEDUPLICATE ─────────────────────────────────────────────────────────

function handleDeduplicate(
  data: Record<string, any>[],
  options: { columns?: string[] } = {},
) {
  const cols = options.columns ?? Object.keys(data[0] ?? {});
  const seen = new Set<string>();
  const result: Record<string, any>[] = [];
  let removed = 0;

  for (const row of data) {
    const key = cols.map((c) => String(row[c] ?? "")).join("\x00");
    if (seen.has(key)) {
      removed++;
      continue;
    }
    seen.add(key);
    result.push(row);
  }

  return {
    data: result,
    originalRows: data.length,
    removedRows: removed,
    remainingRows: result.length,
  };
}

// ─── 11. MERGE (JOIN) ────────────────────────────────────────────────────────

function handleMerge(data1: Record<string, any>[], options: MergeOptions) {
  const { data2, on, type = "left", suffixes = ["_1", "_2"] } = options;

  // Detect clashing columns (excluding the join key)
  const cols1 = new Set(Object.keys(data1[0] ?? {}));
  const cols2 = new Set(Object.keys(data2[0] ?? {}));
  const clash = new Set([...cols1].filter((c) => c !== on && cols2.has(c)));

  const idx2 = new Map<string, Record<string, any>[]>();
  for (const row of data2) {
    const k = String(row[on] ?? "");
    if (!idx2.has(k)) idx2.set(k, []);
    idx2.get(k)!.push(row);
  }

  const result: Record<string, any>[] = [];
  const matched2 = new Set<Record<string, any>>();

  for (const r1 of data1) {
    const k = String(r1[on] ?? "");
    const matches = idx2.get(k);

    if (matches?.length) {
      for (const r2 of matches) {
        matched2.add(r2);
        result.push(mergeRows(r1, r2, on, clash, suffixes));
      }
    } else if (type === "left" || type === "full") {
      result.push(mergeRows(r1, {}, on, clash, suffixes));
    }
  }

  if (type === "right" || type === "full") {
    for (const r2 of data2) {
      if (!matched2.has(r2)) {
        result.push(mergeRows({}, r2, on, clash, suffixes));
      }
    }
  }

  return result;
}

function mergeRows(
  r1: Record<string, any>,
  r2: Record<string, any>,
  on: string,
  clash: Set<string>,
  suffixes: [string, string],
): Record<string, any> {
  const out: Record<string, any> = {};

  for (const [k, v] of Object.entries(r1)) {
    out[clash.has(k) ? k + suffixes[0] : k] = v;
  }
  for (const [k, v] of Object.entries(r2)) {
    if (k === on) {
      if (!(on in out)) out[on] = v;
      continue;
    }
    out[clash.has(k) ? k + suffixes[1] : k] = v;
  }
  return out;
}

// ─── 12. CAST COLUMN ─────────────────────────────────────────────────────────

function handleCastColumn(
  data: Record<string, any>[],
  options: { column: string; to: CastType },
) {
  const { column, to } = options;

  return data.map((row) => {
    const v = row[column];
    let cast: any = v;

    switch (to) {
      case "number":
        cast = Number(v);
        break;
      case "boolean":
        cast = ["true", "1", "yes"].includes(String(v).toLowerCase());
        break;
      case "date":
        cast = new Date(v).toISOString();
        break;
      case "string":
        cast = String(v ?? "");
        break;
      case "auto": {
        const n = Number(v);
        if (!isNaN(n) && String(v).trim() !== "") {
          cast = n;
          break;
        }
        if (["true", "false"].includes(String(v).toLowerCase())) {
          cast = String(v).toLowerCase() === "true";
          break;
        }
        const d = new Date(v);
        if (!isNaN(d.getTime()) && /\d{4}/.test(String(v))) {
          cast = d.toISOString();
          break;
        }
        cast = String(v ?? "");
        break;
      }
    }
    return { ...row, [column]: cast };
  });
}

// ─── 13. RENAME COLUMNS ──────────────────────────────────────────────────────

function handleRenameColumns(
  data: Record<string, any>[],
  map: Record<string, string>,
) {
  return data.map((row) => {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(row)) {
      out[map[k] ?? k] = v;
    }
    return out;
  });
}

// ─── 14. REORDER COLUMNS ─────────────────────────────────────────────────────

function handleReorderColumns(data: Record<string, any>[], order: string[]) {
  const allKeys = Object.keys(data[0] ?? {});
  const remaining = allKeys.filter((k) => !order.includes(k));
  const finalOrder = [...order, ...remaining];

  return data.map((row) => {
    const out: Record<string, any> = {};
    for (const k of finalOrder) {
      if (k in row) out[k] = row[k];
    }
    return out;
  });
}

// ─── 15. DROP COLUMNS ────────────────────────────────────────────────────────

function handleDropColumns(data: Record<string, any>[], columns: string[]) {
  const drop = new Set(columns);
  return data.map((row) => {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(row)) {
      if (!drop.has(k)) out[k] = v;
    }
    return out;
  });
}

// ─── 16. ADD COMPUTED COLUMN ─────────────────────────────────────────────────
/**
 * formula is a JS expression string.
 * Available variables: all column names (use `row` for the full row object).
 * Example formula: "Number(price) * Number(quantity)"
 * Example formula: "firstName + ' ' + lastName"
 */
function handleAddColumn(
  data: Record<string, any>[],
  options: { name: string; formula: string },
) {
  const { name, formula } = options;
  const headers = Object.keys(data[0] ?? {});

  return data.map((row) => {
    try {
      // Safely expose column values as local variables
      // eslint-disable-next-line no-new-func
      const fn = new Function("row", ...headers, `return (${formula})`);
      const args = headers.map((h) => row[h]);
      return { ...row, [name]: fn(row, ...args) };
    } catch {
      return { ...row, [name]: null };
    }
  });
}

// ─── 17. VALIDATE ────────────────────────────────────────────────────────────

function handleValidate(data: Record<string, any>[], rules: ValidationRule[]) {
  const errors: Array<{
    row: number;
    column: string;
    rule: string;
    message: string;
  }> = [];
  const uniqueTracker: Record<string, Set<string>> = {};

  data.forEach((row, idx) => {
    for (const rule of rules) {
      const v = row[rule.column];
      const str = String(v ?? "").trim();
      let failed = false;
      let defaultMsg = "";

      switch (rule.rule) {
        case "required":
          failed = str === "" || v == null;
          defaultMsg = `${rule.column} is required`;
          break;
        case "numeric":
          failed = str !== "" && isNaN(Number(v));
          defaultMsg = `${rule.column} must be numeric`;
          break;
        case "integer":
          failed = str !== "" && !Number.isInteger(Number(v));
          defaultMsg = `${rule.column} must be an integer`;
          break;
        case "email":
          failed = str !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
          defaultMsg = `${rule.column} must be a valid email`;
          break;
        case "url":
          try {
            if (str) new URL(str);
          } catch {
            failed = true;
          }
          defaultMsg = `${rule.column} must be a valid URL`;
          break;
        case "minLength":
          failed = str.length < Number(rule.value);
          defaultMsg = `${rule.column} must be at least ${rule.value} characters`;
          break;
        case "maxLength":
          failed = str.length > Number(rule.value);
          defaultMsg = `${rule.column} must not exceed ${rule.value} characters`;
          break;
        case "min":
          failed = Number(v) < Number(rule.value);
          defaultMsg = `${rule.column} must be ≥ ${rule.value}`;
          break;
        case "max":
          failed = Number(v) > Number(rule.value);
          defaultMsg = `${rule.column} must be ≤ ${rule.value}`;
          break;
        case "regex":
          failed = str !== "" && !new RegExp(String(rule.value)).test(str);
          defaultMsg = `${rule.column} does not match pattern ${rule.value}`;
          break;
        case "unique": {
          if (!uniqueTracker[rule.column])
            uniqueTracker[rule.column] = new Set();
          if (uniqueTracker[rule.column].has(str)) {
            failed = true;
            defaultMsg = `${rule.column} must be unique (duplicate: "${str}")`;
          } else {
            uniqueTracker[rule.column].add(str);
          }
          break;
        }
      }

      if (failed)
        errors.push({
          row: idx + 1,
          column: rule.column,
          rule: rule.rule,
          message: rule.message ?? defaultMsg,
        });
    }
  });

  return { valid: errors.length === 0, errors, errorCount: errors.length };
}

// ─── 18. INFER SCHEMA ────────────────────────────────────────────────────────

function handleInferSchema(data: Record<string, any>[]) {
  if (!data.length) return [];
  const headers = Object.keys(data[0]);
  const sample = data.slice(0, 200); // inspect first 200 rows

  return headers.map((col) => {
    const values = sample
      .map((r) => r[col])
      .filter((v) => v != null && String(v).trim() !== "");
    const total = values.length;

    if (total === 0)
      return { column: col, type: "unknown", nullable: true, uniqueness: 0 };

    const numericCount = values.filter((v) => !isNaN(Number(v))).length;
    const intCount = values.filter((v) => Number.isInteger(Number(v))).length;
    const boolCount = values.filter((v) =>
      ["true", "false", "0", "1", "yes", "no"].includes(
        String(v).toLowerCase(),
      ),
    ).length;
    const dateCount = values.filter(
      (v) => !isNaN(new Date(String(v)).getTime()) && /\d{4}/.test(String(v)),
    ).length;
    const unique = new Set(values.map((v) => String(v))).size;

    let type: string;
    if (boolCount === total && total > 0) type = "boolean";
    else if (intCount >= total * 0.95) type = "integer";
    else if (numericCount >= total * 0.95) type = "number";
    else if (dateCount >= total * 0.8) type = "date";
    else type = "string";

    const nullable = values.length < sample.length;
    const uniqueness = unique / total; // 1.0 = all unique (candidate key)

    const lengthsOfStr = values.map((v) => String(v).length);
    const maxLen = Math.max(...lengthsOfStr);
    const minLen = Math.min(...lengthsOfStr);

    return {
      column: col,
      type,
      nullable,
      uniqueness: +uniqueness.toFixed(3),
      minLength: minLen,
      maxLength: maxLen,
      sampleValues: values.slice(0, 5),
    };
  });
}
