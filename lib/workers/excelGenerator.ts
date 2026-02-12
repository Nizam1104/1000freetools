// Modular Excel file generation script
// This script can be imported and used by any worker script

import * as XLSX from 'xlsx'

interface ExcelGeneratorOptions {
    data: any[]
    sheetName?: string
    filename?: string
    includeHeaders?: boolean
    autoWidth?: boolean
    styling?: boolean
}

/**
 * Generate an Excel file from data array
 * @param options Configuration options for Excel generation
 * @returns Blob containing the Excel file
 */
export const generateExcel = (options: ExcelGeneratorOptions): Blob => {
    const {
        data,
        sheetName = 'Sheet1',
        filename = 'data.xlsx',
        includeHeaders = true,
        autoWidth = true,
        styling = true
    } = options

    if (!data || data.length === 0) {
        throw new Error('No data provided for Excel generation')
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert data to worksheet
    let worksheet: XLSX.WorkSheet

    if (includeHeaders) {
        // Get headers from the first object's keys
        const headers = Object.keys(data[0])

        // Create worksheet with headers
        const worksheetData = [headers]

        // Add data rows
        data.forEach(row => {
            const rowData = headers.map(header => row[header] ?? '')
            worksheetData.push(rowData)
        })

        worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
    } else {
        // Create worksheet without headers
        worksheet = XLSX.utils.json_to_sheet(data)
    }

    // Apply auto-width to columns
    if (autoWidth) {
        const colWidths: { wch?: number }[] = []

        if (includeHeaders && data.length > 0) {
            const headers = Object.keys(data[0])

            headers.forEach((header, colIndex) => {
                // Calculate max width for this column
                let maxWidth = header.toString().length

                data.forEach(row => {
                    const cellValue = row[header]?.toString() || ''
                    maxWidth = Math.max(maxWidth, cellValue.length)
                })

                // Add some padding
                colWidths[colIndex] = { wch: Math.min(maxWidth + 2, 50) }
            })

            worksheet['!cols'] = colWidths
        }
    }

    // Apply basic styling
    if (styling && includeHeaders) {
        // Style the header row
        const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1')

        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const headerCell = XLSX.utils.encode_cell({ r: 0, c: col })
            if (!worksheet[headerCell]) continue

            worksheet[headerCell].s = {
                font: { bold: true },
                fill: { fgColor: { rgb: "E3F2FD" } },
                alignment: { horizontal: "center" }
            }
        }
    }

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
    })

    // Create blob
    return new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
}

/**
 * Generate Excel file from structured data with field definitions
 * @param fields Array of field definitions
 * @param data Array of data objects
 * @param options Additional options
 * @returns Blob containing the Excel file
 */
export const generateExcelFromFields = (
    fields: Array<{ name: string; type: string; blankPercentage?: number }>,
    data: any[],
    options: Partial<ExcelGeneratorOptions> = {}
): Blob => {
    // Transform data to match field names
    const transformedData = data.map(row => {
        const transformedRow: any = {}

        fields.forEach(field => {
            transformedRow[field.name] = row[field.name] || ''
        })

        return transformedRow
    })

    return generateExcel({
        ...options,
        data: transformedData,
        sheetName: options.sheetName || 'Mock Data',
        filename: options.filename || 'mock_data.xlsx'
    })
}

/**
 * Convert CSV data to Excel format
 * @param csvString CSV formatted string
 * @param options Excel generation options
 * @returns Blob containing the Excel file
 */
export const convertCsvToExcel = (
    csvString: string,
    options: Partial<ExcelGeneratorOptions> = {}
): Blob => {
    // Parse CSV to array of objects
    const lines = csvString.trim().split('\n')
    if (lines.length === 0) {
        throw new Error('Empty CSV data')
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
    const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
        const row: any = {}

        headers.forEach((header, index) => {
            row[header] = values[index] || ''
        })

        return row
    })

    return generateExcel({
        ...options,
        data,
        sheetName: options.sheetName || 'Data',
        filename: options.filename || 'converted_data.xlsx'
    })
}

/**
 * Generate multiple Excel sheets from data
 * @param sheets Object containing sheet names and their data
 * @param filename Output filename
 * @returns Blob containing the Excel file
 */
export const generateMultiSheetExcel = (
    sheets: Record<string, any[]>,
    filename: string = 'multi_sheet_data.xlsx'
): Blob => {
    const workbook = XLSX.utils.book_new()

    Object.entries(sheets).forEach(([sheetName, data]) => {
        if (data.length === 0) return

        // Create worksheet for this sheet
        const headers = Object.keys(data[0])
        const worksheetData = [headers]

        data.forEach(row => {
            const rowData = headers.map(header => row[header] ?? '')
            worksheetData.push(rowData)
        })

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

        // Add to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    })

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
    })

    return new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
}

// Utility functions for Excel generation
export const ExcelUtils = {
    /**
     * Create a cell reference from row and column
     */
    getCellRef: (row: number, col: number): string => {
        return XLSX.utils.encode_cell({ r: row, c: col })
    },

    /**
     * Get column letter from column index (0 = A, 1 = B, etc.)
     */
    getColumnLetter: (col: number): string => {
        let letter = ''
        let c = col

        while (c >= 0) {
            letter = String.fromCharCode(65 + (c % 26)) + letter
            c = Math.floor(c / 26) - 1
        }

        return letter
    },

    /**
     * Format a date for Excel
     */
    formatDateForExcel: (date: Date | string): string => {
        const d = new Date(date)
        return d.toISOString().split('T')[0]
    },

    /**
     * Apply number formatting to a cell
     */
    formatNumber: (value: number, format: string): string => {
        return value.toString()
    }
}

// Default export for easy importing
export default {
    generateExcel,
    generateExcelFromFields,
    convertCsvToExcel,
    generateMultiSheetExcel,
    ExcelUtils
}
