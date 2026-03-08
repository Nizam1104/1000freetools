import Papa from 'papaparse'

export interface CSVRow {
  [key: string]: string | number
}

export interface CSVParseResult {
  data: CSVRow[]
  headers: string[]
  structure: 'consistent' | 'inconsistent'
}

export interface ColumnTypeStats {
  unique: number
  nulls: number
  type: string
}

export interface AnalysisResult {
  totalRows: number
  filteredRows: number
  columnStats: { [key: string]: ColumnTypeStats }
  numericColumns: string[]
}

/**
 * Validates if a file is a CSV file
 */
export function validateCSVFile(file: File): string | null {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    return 'Please upload a CSV file'
  }
  return null
}

/**
 * Smart CSV parser that handles inconsistent structures
 */
export function parseCSVIntelligently(text: string): CSVParseResult {
  // First, parse with header: false to get raw data
  const rawResult = Papa.parse(text, {
    header: false,
    skipEmptyLines: false,
    dynamicTyping: false
  })

  if (rawResult.errors.length > 0) {
    console.warn('Parse warnings:', rawResult.errors)
  }

  const rawData = rawResult.data as string[][]

  if (rawData.length === 0) {
    return { data: [], headers: [], structure: 'consistent' }
  }

  // Analyze the structure of each row
  const rowLengths = rawData.map(row => row.length)
  const uniqueLengths = [...new Set(rowLengths)]

  // If all rows have the same length, it's consistent
  if (uniqueLengths.length === 1) {
    // Use first row as headers
    const headers = rawData[0] || []
    const data = rawData.slice(1).map(row => {
      const obj: CSVRow = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || ''
      })
      return obj
    })

    return {
      data,
      headers,
      structure: 'consistent'
    }
  }

  // Handle inconsistent structure
  let headers: string[] = []
  let data: CSVRow[] = []

  // Find the row with the most columns (likely the actual headers)
  const maxColumnsRow = rawData.reduce((maxRow, currentRow) =>
    currentRow.length > maxRow.length ? currentRow : maxRow
  , rawData[0])

  headers = maxColumnsRow

  // Process all rows to match the header structure
  data = rawData.map((row) => {
    const obj: CSVRow = {}
    headers.forEach((header, colIndex) => {
      obj[header] = row[colIndex] || ''
    })
    return obj
  })

  return {
    data,
    headers,
    structure: 'inconsistent'
  }
}

/**
 * Parse CSV file using worker for large files
 */
export async function parseCSVWithWorker(text: string): Promise<CSVParseResult> {
  const { getCsvWorker, releaseCsvWorker } = await import('@/lib/workerManager')
  const worker = await getCsvWorker()

  try {
    const result = await new Promise<any>((resolve, reject) => {
      worker.onmessage = (event: MessageEvent<any>) => {
        if (event.data.type === 'success') {
          resolve(event.data.data)
        } else if (event.data.type === 'error') {
          reject(new Error(event.data.error))
        }
      }

      worker.onerror = (error: any) => {
        reject(error)
      }

      worker.postMessage({
        type: 'parse-csv',
        data: text,
        options: { delimiter: ',' }
      })
    })

    return {
      data: result.data,
      headers: result.headers,
      structure: 'consistent'
    }
  } finally {
    releaseCsvWorker()
  }
}

/**
 * Load CSV file with appropriate parsing method based on file size
 */
export async function loadCSVFile(file: File, options: {
  useWorker?: boolean
  maxRows?: number
  workerThreshold?: number
} = {}): Promise<{
  data: CSVRow[]
  headers: string[]
  structure: 'consistent' | 'inconsistent'
}> {
  const {
    useWorker = true,
    maxRows = 500,
    workerThreshold = 100000 // 100KB
  } = options

  const validationError = validateCSVFile(file)
  if (validationError) {
    throw new Error(validationError)
  }

  const text = await file.text()

  let result: CSVParseResult

  if (useWorker && text.length > workerThreshold) {
    // Use worker for large CSV files
    result = await parseCSVWithWorker(text)
  } else {
    // Use Papa Parse for smaller files
    const parseResult = await new Promise<Papa.ParseResult<any>>((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: resolve,
        error: reject
      })
    })

    if (parseResult.errors.length > 0) {
      console.warn('Parse warnings:', parseResult.errors)
    }

    const data = parseResult.data as CSVRow[]
    const limitedData = data.slice(0, maxRows)

    result = {
      data: limitedData,
      headers: parseResult.meta.fields || [],
      structure: 'consistent'
    }
  }

  // Apply row limit if specified
  if (maxRows && result.data.length > maxRows) {
    result.data = result.data.slice(0, maxRows)
  }

  return result
}

/**
 * Export CSV data to file
 */
export function exportCSVData(data: CSVRow[], fileName: string, options: {
  prefix?: string
  includeHeaders?: boolean
} = {}): void {
  const { prefix = '', includeHeaders = true } = options

  if (data.length === 0) {
    throw new Error('No data to export')
  }

  const csv = Papa.unparse(data, {
    header: includeHeaders
  })

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${prefix}${fileName || 'data.csv'}`
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Detect column data type (number, date, or text)
 */
export function detectValueType(value: string): 'number' | 'date' | 'text' {
  if (!value || value.trim() === '') return 'text'

  // Check if it's a number (integer or decimal)
  const numberRegex = /^-?\d+\.?\d*$/
  if (numberRegex.test(value.trim())) {
    return 'number'
  }

  // Check if it's a date (common date formats)
  const dateFormats = [
    /^\d{4}-\d{2}-\d{2}$/,           // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}$/,        // MM/DD/YYYY
    /^\d{2}-\d{2}-\d{4}$/,          // MM-DD-YYYY
    /^\d{4}\/\d{2}\/\d{2}$/,        // YYYY/MM/DD
    /^\d{1,2}\/\d{1,2}\/\d{2,4}$/, // M/D/YY or MM/DD/YYYY
    /^\d{1,2}-\d{1,2}-\d{2,4}$/,    // M-D-YY or MM-DD-YYYY
  ]

  if (dateFormats.some(format => format.test(value.trim()))) {
    const date = new Date(value.trim())
    if (!isNaN(date.getTime())) {
      return 'date'
    }
  }

  return 'text'
}

/**
 * Parse value based on detected type for sorting
 */
export function parseValue(value: string, type: 'number' | 'date' | 'text'): number | Date | string {
  if (!value || value.trim() === '') {
    if (type === 'number') return -Infinity
    if (type === 'date') return new Date(0)
    return ''
  }

  const trimmedValue = value.trim()

  switch (type) {
    case 'number':
      const num = parseFloat(trimmedValue)
      return isNaN(num) ? -Infinity : num
    case 'date':
      const date = new Date(trimmedValue)
      return isNaN(date.getTime()) ? new Date(0) : date
    default:
      return trimmedValue.toLowerCase() // Case insensitive text comparison
  }
}

/**
 * Detect if a column is numeric based on sample data
 */
export function getColumnType(column: string, data: CSVRow[], sampleSize: number = 10): 'text' | 'number' {
  if (data.length === 0) return 'text'

  const sample = data.slice(0, sampleSize)
  const numericValues = sample.filter(row => {
    const value = String(row[column])
    return !isNaN(Number(value)) && value !== ''
  })

  return numericValues.length > sample.length / 2 ? 'number' : 'text'
}

/**
 * Analyze CSV data and return statistics
 */
export function analyzeCSVData(data: CSVRow[], headers: string[]): AnalysisResult {
  const columnStats: { [key: string]: ColumnTypeStats } = {}
  const numericColumns: string[] = []

  headers.forEach(header => {
    const values = data.map(row => String(row[header])).filter(val => val !== null && val !== undefined && val !== '')
    const uniqueValues = new Set(values)
    const nullCount = data.length - values.length

    // Determine if column is numeric
    const numericValues = values.filter(val => !isNaN(Number(val)))
    const isNumeric = numericValues.length > values.length / 2

    if (isNumeric) {
      numericColumns.push(header)
    }

    columnStats[header] = {
      unique: uniqueValues.size,
      nulls: nullCount,
      type: isNumeric ? 'number' : 'text'
    }
  })

  return {
    totalRows: data.length,
    filteredRows: data.length,
    columnStats,
    numericColumns
  }
}

/**
 * Format CSV data for copying to clipboard
 */
export function formatCSVForCopy(data: CSVRow[], headers: string[], format: 'csv' | 'json'): string {
  if (format === 'csv') {
    // Create CSV format including headers
    const csvRows = []
    csvRows.push(headers.join(',')) // Add headers

    data.forEach(row => {
      const values = headers.map(header => {
        const value = String(row[header] || '')
        // Quote values that contain commas, quotes, or newlines
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      csvRows.push(values.join(','))
    })

    return csvRows.join('\n')
  } else {
    // Create JSON format
    const jsonData = data.map(row => {
      const jsonRow: { [key: string]: string } = {}
      headers.forEach(header => {
        jsonRow[header] = String(row[header] || '')
      })
      return jsonRow
    })
    return JSON.stringify(jsonData, null, 2)
  }
}

/**
 * Copy data to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    throw new Error('Failed to copy to clipboard')
  }
}

/**
 * Sort CSV data by column with smart type detection
 */
export function sortCSVData(
  data: CSVRow[],
  column: string,
  direction: 'asc' | 'desc'
): CSVRow[] {
  if (data.length === 0) return data

  // Detect the data type of the column
  const columnValues = data.map(row => String(row[column] || ''))
  const sampleValues = columnValues.slice(0, 10) // Sample first 10 values
  const typeCounts = { number: 0, date: 0, text: 0 }

  sampleValues.forEach(value => {
    const type = detectValueType(value)
    typeCounts[type]++
  })

  // Determine the dominant type (if at least 30% of samples match a type, use it)
  const threshold = sampleValues.length * 0.3
  let detectedType: 'number' | 'date' | 'text' = 'text'
  if (typeCounts.number >= threshold) detectedType = 'number'
  else if (typeCounts.date >= threshold) detectedType = 'date'

  // Create a sorted copy of the data
  return [...data].sort((a, b) => {
    const aValue = parseValue(String(a[column] || ''), detectedType)
    const bValue = parseValue(String(b[column] || ''), detectedType)

    let comparison = 0

    if (detectedType === 'number') {
      comparison = (aValue as number) - (bValue as number)
    } else if (detectedType === 'date') {
      comparison = (aValue as Date).getTime() - (bValue as Date).getTime()
    } else {
      comparison = String(aValue).localeCompare(String(bValue))
    }

    return direction === 'asc' ? comparison : -comparison
  })
}