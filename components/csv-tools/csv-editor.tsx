"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Upload,
  Download,
  Trash2,
  Plus,
  RotateCcw,
  FileSpreadsheet,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Copy,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";

import { useRefreshWarning } from "@/hooks/confirm-refresh";
import {
  CSVRow,
  loadCSVFile,
  exportCSVData,
  sortCSVData,
  formatCSVForCopy,
  copyToClipboard,
} from "./common-utils";

interface EditState {
  rowIndex: number;
  column: string;
  value: string;
}

interface SortState {
  column: string | null;
  direction: "asc" | "desc" | null;
}

const CSVEditor: React.FC = () => {
  useRefreshWarning();

  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingCell, setEditingCell] = useState<EditState | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(
    new Set(),
  );
  const [showHeaders] = useState<boolean>(true);
  const HEADER_ROW_INDEX = -1;
  const [editHistory, setEditHistory] = useState<
    { data: CSVRow[]; description: string }[]
  >([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  // Inline input states
  const [showRowInput, setShowRowInput] = useState<"above" | "below" | null>(
    null,
  );
  const [rowCount, setRowCount] = useState<string>("1");
  const [showColumnInput, setShowColumnInput] = useState<
    "left" | "right" | "new" | null
  >(null);
  const [columnName, setColumnName] = useState<string>("");
  const [columnCount, setColumnCount] = useState<string>("1");

  // Copy rows state
  const [copyStartRow, setCopyStartRow] = useState<string>("");
  const [copyEndRow, setCopyEndRow] = useState<string>("");
  const [showCopyControls, setShowCopyControls] = useState<boolean>(false);
  const [copyFormat, setCopyFormat] = useState<"csv" | "json">("csv");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [rowMenuOpen, setRowMenuOpen] = useState<number | null>(null);
  const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [columnMenuOpen, setColumnMenuOpen] = useState<string | null>(null);
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [editingColumnValue, setEditingColumnValue] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const columnMenuRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const columnInputRef = useRef<HTMLInputElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle row menu
      if (rowMenuOpen !== null) {
        const menuElement = menuRefs.current.get(rowMenuOpen);
        const triggerElement = document.querySelector(
          `[data-row-menu-trigger="${rowMenuOpen}"]`,
        );

        const clickedOnMenu = menuElement?.contains(event.target as Node);
        const clickedOnTrigger = triggerElement?.contains(event.target as Node);

        if (!clickedOnMenu && !clickedOnTrigger) {
          setRowMenuOpen(null);
        }
      }

      // Handle sort menu
      if (sortMenuOpen) {
        const clickedOnSortMenu = sortMenuRef.current?.contains(
          event.target as Node,
        );
        const clickedOnSortTrigger = document
          .querySelector("[data-sort-menu-trigger]")
          ?.contains(event.target as Node);

        if (!clickedOnSortMenu && !clickedOnSortTrigger) {
          setSortMenuOpen(false);
        }
      }

      // Handle column menu
      if (columnMenuOpen !== null) {
        const menuElement = columnMenuRefs.current.get(columnMenuOpen);
        const triggerElement = document.querySelector(
          `[data-column-menu-trigger="${columnMenuOpen}"]`,
        );

        const clickedOnMenu = menuElement?.contains(event.target as Node);
        const clickedOnTrigger = triggerElement?.contains(event.target as Node);

        if (!clickedOnMenu && !clickedOnTrigger) {
          setColumnMenuOpen(null);
        }
      }
    };

    if (rowMenuOpen !== null || sortMenuOpen || columnMenuOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [rowMenuOpen, sortMenuOpen, columnMenuOpen]);

  // Parse CSV file
  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsLoading(true);
      setFileName(file.name);
      setSelectedRows(new Set());
      setSelectedColumns(new Set());
      setEditHistory([]);
      setHistoryIndex(-1);

      try {
        const result = await loadCSVFile(file, {
          useWorker: false,
          maxRows: undefined,
          workerThreshold: 100000,
        });

        setCsvData(result.data);
        setHeaders(result.headers);
        setEditHistory([{ data: result.data, description: "Initial load" }]);
        setHistoryIndex(0);

        if (result.structure === "inconsistent") {
          toast.warning(
            `CSV has inconsistent structure. Found ${result.headers.length} columns in longest row.`,
            {
              duration: 5000,
            },
          );
        }

        toast.success(
          `Successfully loaded ${result.data.length} rows and ${result.headers.length} columns`,
        );
      } catch (error) {
        console.error("Error parsing CSV:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to parse CSV file",
        );
        setCsvData([]);
        setHeaders([]);
        setFileName("");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Save state to history
  const saveToHistory = useCallback(
    (description: string) => {
      const newHistory = editHistory.slice(0, historyIndex + 1);
      newHistory.push({ data: [...csvData], description });
      setEditHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [csvData, editHistory, historyIndex],
  );

  // Undo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCsvData([...editHistory[newIndex].data]);
      toast.info("Undo: " + editHistory[newIndex].description);
    }
  }, [historyIndex, editHistory]);

  // Redo functionality
  const redo = useCallback(() => {
    if (historyIndex < editHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCsvData([...editHistory[newIndex].data]);
      toast.info("Redo: " + editHistory[newIndex].description);
    }
  }, [historyIndex, editHistory]);

  // Start editing a cell
  const startEditingCell = useCallback(
    (rowIndex: number, column: string, currentValue: string) => {
      setEditingCell({ rowIndex, column, value: currentValue });
    },
    [],
  );

  // Save edited cell
  const saveEditedCell = useCallback(() => {
    if (!editingCell) return;

    const { rowIndex, column, value } = editingCell;
    const newData = [...csvData];
    newData[rowIndex] = { ...newData[rowIndex], [column]: value };

    setCsvData(newData);
    setEditingCell(null);
    saveToHistory(`Edited cell [${rowIndex + 1}, ${column}]`);
  }, [editingCell, csvData, saveToHistory]);

  // Cancel cell editing
  const cancelEditing = useCallback(() => {
    setEditingCell(null);
  }, []);

  // Delete selected rows
  const deleteSelectedRows = useCallback(() => {
    if (selectedRows.size === 0) {
      toast.error("No rows selected");
      return;
    }

    if (selectedRows.has(HEADER_ROW_INDEX)) {
      if (
        confirm(
          "Delete header row? This will promote the first data row to become the new headers.",
        )
      ) {
        if (csvData.length <= 1) {
          toast.error("Cannot delete header row: no data rows remaining");
          return;
        }

        const firstRow = csvData[0];
        const newHeaders = Object.keys(firstRow);
        const remainingData = csvData.slice(1);

        const newData = remainingData.map((row) => {
          const newRow: CSVRow = {};
          newHeaders.forEach((header) => {
            newRow[header] = row[header] || "";
          });
          return newRow;
        });

        setHeaders(newHeaders);
        setCsvData(newData);

        const dataRowIndices = Array.from(selectedRows).filter(
          (index) => index !== HEADER_ROW_INDEX,
        );
        if (dataRowIndices.length > 0) {
          const finalData = newData.filter(
            (_, index) => !dataRowIndices.includes(index),
          );
          setCsvData(finalData);
          saveToHistory(
            `Deleted header row and ${dataRowIndices.length} data row(s)`,
          );
          toast.success(
            `Header row deleted and ${dataRowIndices.length} data row(s) deleted`,
          );
        } else {
          saveToHistory(
            "Deleted header row and promoted first data row to headers",
          );
          toast.success(
            `Header row deleted. New headers: ${newHeaders.join(", ")}`,
          );
        }

        setSelectedRows(new Set());
        setSelectedColumns(new Set());
      }
    } else {
      const newData = csvData.filter((_, index) => !selectedRows.has(index));
      setCsvData(newData);
      setSelectedRows(new Set());
      saveToHistory(`Deleted ${selectedRows.size} row(s)`);
      toast.success(`Deleted ${selectedRows.size} row(s)`);
    }
  }, [selectedRows, csvData, saveToHistory, HEADER_ROW_INDEX]);

  // Delete selected columns
  const deleteSelectedColumns = useCallback(() => {
    if (selectedColumns.size === 0) {
      toast.error("No columns selected");
      return;
    }

    const newHeaders = headers.filter((header) => !selectedColumns.has(header));
    const newData = csvData.map((row) => {
      const newRow: CSVRow = {};
      newHeaders.forEach((header) => {
        newRow[header] = row[header] || "";
      });
      return newRow;
    });

    setHeaders(newHeaders);
    setCsvData(newData);
    setSelectedColumns(new Set());
    saveToHistory(`Deleted ${selectedColumns.size} column(s)`);
    toast.success(`Deleted ${selectedColumns.size} column(s)`);
  }, [selectedColumns, headers, csvData, saveToHistory]);

  // Add new row
  const addNewRow = useCallback(() => {
    const newRow: CSVRow = {};
    headers.forEach((header) => {
      newRow[header] = "";
    });

    const newData = [...csvData, newRow];
    setCsvData(newData);
    saveToHistory("Added new row");
    toast.success("New row added");
  }, [csvData, headers, saveToHistory]);

  // Add row above specific index
  const addRowAbove = useCallback(
    (rowIndex: number) => {
      const newRow: CSVRow = {};
      headers.forEach((header) => {
        newRow[header] = "";
      });

      const newData = [...csvData];
      newData.splice(rowIndex, 0, newRow);

      setCsvData(newData);
      saveToHistory(`Added row above row ${rowIndex + 1}`);
      toast.success(`Added row above row ${rowIndex + 1}`);
      setRowMenuOpen(null);
    },
    [csvData, headers, saveToHistory],
  );

  // Add row below specific index
  const addRowBelow = useCallback(
    (rowIndex: number) => {
      const newRow: CSVRow = {};
      headers.forEach((header) => {
        newRow[header] = "";
      });

      const newData = [...csvData];
      newData.splice(rowIndex + 1, 0, newRow);

      setCsvData(newData);
      saveToHistory(`Added row below row ${rowIndex + 1}`);
      toast.success(`Added row below row ${rowIndex + 1}`);
      setRowMenuOpen(null);
    },
    [csvData, headers, saveToHistory],
  );

  // Delete specific row
  const deleteRow = useCallback(
    (rowIndex: number) => {
      const newData = csvData.filter((_, index) => index !== rowIndex);
      setCsvData(newData);
      saveToHistory(`Deleted row ${rowIndex + 1}`);
      toast.success(`Deleted row ${rowIndex + 1}`);
      setRowMenuOpen(null);
    },
    [csvData, saveToHistory],
  );

  // Add new column
  const addNewColumn = useCallback(() => {
    setShowColumnInput("new");
    setColumnName("");
  }, []);

  // Add column to the left of a specific column
  const addColumnToLeft = useCallback(
    (targetColumn: string) => {
      const columnIndex = headers.indexOf(targetColumn);
      if (columnIndex === -1) return;

      const newColumnName = `Column ${headers.length + 1}`;
      const newHeaders = [...headers];
      newHeaders.splice(columnIndex, 0, newColumnName);

      const newData = csvData.map((row) => {
        const newRow: CSVRow = {};
        newHeaders.forEach((header, idx) => {
          if (header === newColumnName) {
            newRow[header] = "";
          } else {
            newRow[header] = row[header] || "";
          }
        });
        return newRow;
      });

      setHeaders(newHeaders);
      setCsvData(newData);
      saveToHistory(
        `Added column "${newColumnName}" to the left of "${targetColumn}"`,
      );
      toast.success(`Added column "${newColumnName}" to the left`);
      setColumnMenuOpen(null);
    },
    [csvData, headers, saveToHistory],
  );

  // Add column to the right of a specific column
  const addColumnToRight = useCallback(
    (targetColumn: string) => {
      const columnIndex = headers.indexOf(targetColumn);
      if (columnIndex === -1) return;

      const newColumnName = `Column ${headers.length + 1}`;
      const newHeaders = [...headers];
      newHeaders.splice(columnIndex + 1, 0, newColumnName);

      const newData = csvData.map((row) => {
        const newRow: CSVRow = {};
        newHeaders.forEach((header) => {
          if (header === newColumnName) {
            newRow[header] = "";
          } else {
            newRow[header] = row[header] || "";
          }
        });
        return newRow;
      });

      setHeaders(newHeaders);
      setCsvData(newData);
      saveToHistory(
        `Added column "${newColumnName}" to the right of "${targetColumn}"`,
      );
      toast.success(`Added column "${newColumnName}" to the right`);
      setColumnMenuOpen(null);
    },
    [csvData, headers, saveToHistory],
  );

  // Delete a specific column
  const deleteColumn = useCallback(
    (targetColumn: string) => {
      if (headers.length <= 1) {
        toast.error("Cannot delete the last column");
        return;
      }

      const newHeaders = headers.filter((header) => header !== targetColumn);
      const newData = csvData.map((row) => {
        const newRow: CSVRow = {};
        newHeaders.forEach((header) => {
          newRow[header] = row[header] || "";
        });
        return newRow;
      });

      setHeaders(newHeaders);
      setCsvData(newData);
      saveToHistory(`Deleted column "${targetColumn}"`);
      toast.success(`Deleted column "${targetColumn}"`);
      setColumnMenuOpen(null);
    },
    [csvData, headers, saveToHistory],
  );

  // Execute adding columns
  const executeAddColumns = useCallback(() => {
    if (showColumnInput === "new") {
      if (!columnName || !columnName.trim()) {
        toast.error("Please enter a column name");
        return;
      }

      if (headers.includes(columnName.trim())) {
        toast.error("Column already exists");
        return;
      }

      const newHeaders = [...headers, columnName.trim()];
      const newData = csvData.map((row) => ({
        ...row,
        [columnName.trim()]: "",
      }));

      setHeaders(newHeaders);
      setCsvData(newData);
      saveToHistory(`Added column "${columnName.trim()}"`);
      toast.success(`New column "${columnName.trim()}" added`);
    }

    setShowColumnInput(null);
    setColumnName("");
    setColumnCount("1");
  }, [showColumnInput, columnName, headers, csvData, saveToHistory]);

  // Cancel input operations
  const cancelInput = useCallback(() => {
    setShowRowInput(null);
    setShowColumnInput(null);
    setRowCount("1");
    setColumnName("");
    setColumnCount("1");
  }, []);

  // Toggle row selection
  const toggleRowSelection = useCallback((rowIndex: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  }, []);

  // Toggle column selection
  const toggleColumnSelection = useCallback((column: string) => {
    setSelectedColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(column)) {
        newSet.delete(column);
      } else {
        newSet.add(column);
      }
      return newSet;
    });
  }, []);

  // Copy rows to clipboard
  const copyRowsToClipboard = useCallback(async () => {
    if (csvData.length === 0) {
      toast.error("No data to copy");
      return;
    }

    const startRow = parseInt(copyStartRow) || 1;
    const endRow = parseInt(copyEndRow) || csvData.length;

    if (isNaN(startRow) || isNaN(endRow) || startRow < 1 || endRow < 1) {
      toast.error("Please enter valid row numbers");
      return;
    }

    if (startRow > endRow) {
      toast.error("Start row must be less than or equal to end row");
      return;
    }

    if (startRow > csvData.length || endRow > csvData.length) {
      toast.error(`CSV only has ${csvData.length} rows`);
      return;
    }

    const selectedData = csvData.slice(startRow - 1, endRow);

    try {
      const textToCopy = formatCSVForCopy(selectedData, headers, copyFormat);
      await copyToClipboard(textToCopy);

      const formatName = copyFormat.toUpperCase();
      toast.success(`Copied rows ${startRow}-${endRow} as ${formatName}`);

      setShowCopyControls(false);
      setCopyStartRow("");
      setCopyEndRow("");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy to clipboard");
    }
  }, [csvData, headers, copyStartRow, copyEndRow, copyFormat]);

  // Quick copy selected rows
  const copySelectedRows = useCallback(
    async (format: "csv" | "json") => {
      const selectedRowIndices = Array.from(selectedRows).filter(
        (index) => index !== HEADER_ROW_INDEX,
      );

      if (selectedRowIndices.length === 0) {
        toast.error("No rows selected");
        return;
      }

      const selectedData = selectedRowIndices.map((index) => csvData[index]);

      try {
        const textToCopy = formatCSVForCopy(selectedData, headers, format);
        await copyToClipboard(textToCopy);

        const formatName = format.toUpperCase();
        toast.success(
          `Copied ${selectedRowIndices.length} selected rows as ${formatName}`,
        );
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        toast.error("Failed to copy to clipboard");
      }
    },
    [csvData, headers, selectedRows, HEADER_ROW_INDEX],
  );

  // Sort column functionality - cycles through none -> asc -> desc (for header click)
  const toggleSortColumn = useCallback(
    (column: string) => {
      if (csvData.length === 0) return;

      if (sortState.column !== column) {
        // Sorting a new column, start with asc
        const sortedData = sortCSVData(csvData, column, "asc");
        setCsvData(sortedData);
        setSortState({ column, direction: "asc" });
        setSelectedColumns(new Set());
        saveToHistory(`Sorted column "${column}" ascending`);
        toast.success(`Column "${column}" sorted ascending`);
      } else if (sortState.direction === "asc") {
        // Currently asc, switch to desc
        const sortedData = sortCSVData(csvData, column, "desc");
        setCsvData(sortedData);
        setSortState({ column, direction: "desc" });
        setSelectedColumns(new Set());
        saveToHistory(`Sorted column "${column}" descending`);
        toast.success(`Column "${column}" sorted descending`);
      } else {
        // Currently desc, clear sort
        for (let i = editHistory.length - 1; i >= 0; i--) {
          if (editHistory[i].description.includes("Sorted column")) {
            if (i > 0) {
              setCsvData([...editHistory[i - 1].data]);
              setHistoryIndex(i - 1);
            }
            break;
          }
        }
        setSortState({ column: null, direction: null });
        toast.success("Sort cleared");
      }
    },
    [csvData, sortState, editHistory, saveToHistory, setHistoryIndex],
  );

  // Sort column functionality - for toolbar menu (explicit direction)
  const sortColumn = useCallback(
    (column: string, direction: "asc" | "desc") => {
      if (csvData.length === 0) return;

      const sortedData = sortCSVData(csvData, column, direction);

      setCsvData(sortedData);
      setSortState({ column, direction });
      setSelectedColumns(new Set());
      saveToHistory(
        `Sorted column "${column}" ${direction === "asc" ? "ascending" : "descending"}`,
      );

      toast.success(
        `Column "${column}" sorted ${direction === "asc" ? "ascending" : "descending"}`,
      );
    },
    [csvData, saveToHistory],
  );

  // Start editing column header
  const startEditingColumn = useCallback((column: string) => {
    setEditingColumn(column);
    setEditingColumnValue(column);
  }, []);

  // Save edited column header
  const saveEditedColumn = useCallback(() => {
    if (!editingColumn || !editingColumnValue.trim()) return;

    const newName = editingColumnValue.trim();

    if (newName === editingColumn) {
      setEditingColumn(null);
      setEditingColumnValue("");
      return;
    }

    if (headers.includes(newName)) {
      toast.error("Column name already exists");
      setEditingColumn(null);
      setEditingColumnValue("");
      return;
    }

    // Update headers
    const newHeaders = headers.map((h) => (h === editingColumn ? newName : h));
    setHeaders(newHeaders);

    // Update all rows to use new column name
    const newData = csvData.map((row) => {
      const newRow: CSVRow = {};
      newHeaders.forEach((header) => {
        newRow[header] = row[editingColumn] || "";
      });
      return newRow;
    });

    setCsvData(newData);

    // Update sort state if the sorted column was renamed
    if (sortState.column === editingColumn) {
      setSortState({ column: newName, direction: sortState.direction });
    }

    // Update selected columns if the renamed column was selected
    if (selectedColumns.has(editingColumn)) {
      const newSelectedColumns = new Set(selectedColumns);
      newSelectedColumns.delete(editingColumn);
      newSelectedColumns.add(newName);
      setSelectedColumns(newSelectedColumns);
    }

    saveToHistory(`Renamed column "${editingColumn}" to "${newName}"`);
    toast.success(`Column renamed to "${newName}"`);
    setEditingColumn(null);
    setEditingColumnValue("");
  }, [
    editingColumn,
    editingColumnValue,
    headers,
    csvData,
    sortState,
    selectedColumns,
    saveToHistory,
  ]);

  // Cancel column editing
  const cancelEditingColumn = useCallback(() => {
    setEditingColumn(null);
    setEditingColumnValue("");
  }, []);

  // Clear sort
  const clearSort = useCallback(() => {
    if (!sortState.column || !sortState.direction) return;

    for (let i = editHistory.length - 1; i >= 0; i--) {
      if (editHistory[i].description.includes("Sorted column")) {
        if (i > 0) {
          setCsvData([...editHistory[i - 1].data]);
          setHistoryIndex(i - 1);
        }
        break;
      }
    }

    setSortState({ column: null, direction: null });
    toast.success("Sort cleared");
  }, [sortState, editHistory, setHistoryIndex]);

  // Export edited CSV
  const exportCSV = useCallback(() => {
    try {
      exportCSVData(csvData, `edited_${fileName || "data.csv"}`, {
        prefix: "",
        includeHeaders: true,
      });
      toast.success(`Exported ${csvData.length} rows`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to export CSV",
      );
    }
  }, [csvData, fileName]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "z":
            event.preventDefault();
            if (event.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case "s":
            event.preventDefault();
            exportCSV();
            break;
          case "c":
            if (event.shiftKey && selectedRows.size > 0) {
              event.preventDefault();
              copySelectedRows("csv");
            }
            break;
        }
      } else if (event.key === "Escape" && editingCell) {
        cancelEditing();
      } else if (event.key === "Enter" && editingCell) {
        event.preventDefault();
        saveEditedCell();
      } else if (event.key === "Escape" && editingColumn) {
        cancelEditingColumn();
      } else if (event.key === "Enter" && editingColumn) {
        event.preventDefault();
        saveEditedColumn();
      } else if (event.key === "Escape" && (showRowInput || showColumnInput)) {
        cancelInput();
      } else if (event.key === "Enter" && (showRowInput || showColumnInput)) {
        event.preventDefault();
        if (showColumnInput) {
          executeAddColumns();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    editingCell,
    editingColumn,
    undo,
    redo,
    exportCSV,
    saveEditedCell,
    saveEditedColumn,
    cancelEditing,
    cancelEditingColumn,
    showRowInput,
    showColumnInput,
    cancelInput,
    executeAddColumns,
    copySelectedRows,
    selectedRows.size,
  ]);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* File Upload Area */}
          {!csvData.length ? (
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-md p-8 bg-zinc-50 dark:bg-zinc-900">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
                    <Upload className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Upload CSV File
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Choose a file to start editing
                  </p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  size="sm"
                  className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200"
                >
                  {isLoading ? "Loading..." : "Choose CSV File"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-md p-4 bg-zinc-50 dark:bg-zinc-900 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded">
                    <FileSpreadsheet className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {fileName}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-3">
                      {csvData.length} rows × {headers.length} columns
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isLoading}
            className="hidden"
          />

          {csvData.length > 0 && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-md p-4">
                <div className="flex items-center justify-between">
                  {/* Status & Info */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {csvData.length}
                      </span>{" "}
                      rows
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {headers.length}
                      </span>{" "}
                      columns
                    </span>
                    {(selectedRows.size > 0 || selectedColumns.size > 0) && (
                      <>
                        <span className="text-zinc-300 dark:text-zinc-700">
                          •
                        </span>
                        <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                          {selectedRows.size + selectedColumns.size} selected
                        </span>
                      </>
                    )}
                  </div>

                  {/* Main Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={undo}
                      disabled={historyIndex <= 0}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Undo
                    </Button>
                    <Button
                      onClick={redo}
                      disabled={historyIndex >= editHistory.length - 1}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <RotateCcw className="h-4 w-4 rotate-180" />
                      Redo
                    </Button>
                    <Button
                      onClick={exportCSV}
                      size="sm"
                      className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Quick Actions Row */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <Button
                    onClick={addNewRow}
                    variant="outline"
                    size="sm"
                    className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Row
                  </Button>
                  <Button
                    onClick={addNewColumn}
                    variant="outline"
                    size="sm"
                    className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Column
                  </Button>
                  <Button
                    onClick={() => setShowCopyControls(!showCopyControls)}
                    variant="outline"
                    size="sm"
                    className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>

                  {/* Selection Actions */}
                  {(selectedRows.size > 0 || selectedColumns.size > 0) && (
                    <>
                      <span className="text-zinc-300 dark:text-zinc-700">
                        |
                      </span>
                      {selectedRows.size > 0 &&
                        !selectedRows.has(HEADER_ROW_INDEX) && (
                          <Button
                            onClick={deleteSelectedRows}
                            variant="outline"
                            size="sm"
                            className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-zinc-200 dark:border-zinc-700"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete {selectedRows.size} Row
                            {selectedRows.size !== 1 ? "s" : ""}
                          </Button>
                        )}
                      {selectedColumns.size > 0 && (
                        <Button
                          onClick={deleteSelectedColumns}
                          variant="outline"
                          size="sm"
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-zinc-200 dark:border-zinc-700"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete {selectedColumns.size} Column
                          {selectedColumns.size !== 1 ? "s" : ""}
                        </Button>
                      )}
                      {selectedColumns.size === 1 && (
                        <div className="relative">
                          <Button
                            data-sort-menu-trigger
                            onClick={(e) => {
                              e.stopPropagation();
                              setSortMenuOpen(!sortMenuOpen);
                            }}
                            variant="outline"
                            size="sm"
                            className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <ArrowUpDown className="h-3 w-3 mr-1" />
                            Sort
                          </Button>
                          {sortMenuOpen && (
                            <div
                              ref={sortMenuRef}
                              className="absolute left-0 top-full mt-1 min-w-[160px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg py-1 z-50"
                            >
                              <button
                                onClick={() => {
                                  const column = Array.from(selectedColumns)[0];
                                  sortColumn(column, "asc");
                                  setSortMenuOpen(false);
                                }}
                                className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                              >
                                <ArrowUp className="h-4 w-4" />
                                Ascending
                              </button>
                              <button
                                onClick={() => {
                                  const column = Array.from(selectedColumns)[0];
                                  sortColumn(column, "desc");
                                  setSortMenuOpen(false);
                                }}
                                className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                              >
                                <ArrowDown className="h-4 w-4" />
                                Descending
                              </button>
                              {sortState.column &&
                                selectedColumns.has(sortState.column) && (
                                  <>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />
                                    <button
                                      onClick={() => {
                                        clearSort();
                                        setSortMenuOpen(false);
                                      }}
                                      className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                                    >
                                      <RotateCcw className="h-4 w-4" />
                                      Clear Sort
                                    </button>
                                  </>
                                )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Inline Input */}
                {showColumnInput && (
                  <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Column name:
                      </span>
                      <Input
                        type="text"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        placeholder="Name"
                        className="w-24 h-8 text-sm border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                      <Button
                        onClick={executeAddColumns}
                        size="sm"
                        className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200"
                      >
                        Add
                      </Button>
                      <Button
                        onClick={cancelInput}
                        variant="outline"
                        size="sm"
                        className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Copy Controls */}
                {showCopyControls && (
                  <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Copy rows:
                      </span>
                      <Input
                        type="number"
                        min="1"
                        value={copyStartRow}
                        onChange={(e) => setCopyStartRow(e.target.value)}
                        placeholder="from"
                        className="w-16 h-8 text-sm border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        to
                      </span>
                      <Input
                        type="number"
                        min="1"
                        value={copyEndRow}
                        onChange={(e) => setCopyEndRow(e.target.value)}
                        placeholder="to"
                        className="w-16 h-8 text-sm border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      />
                      <select
                        value={copyFormat}
                        onChange={(e) =>
                          setCopyFormat(e.target.value as "csv" | "json")
                        }
                        className="h-8 text-sm border border-zinc-200 dark:border-zinc-700 rounded-md px-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      >
                        <option value="csv">CSV</option>
                        <option value="json">JSON</option>
                      </select>
                      <Button
                        onClick={copyRowsToClipboard}
                        size="sm"
                        className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200"
                      >
                        Copy
                      </Button>
                      <Button
                        onClick={() => setShowCopyControls(false)}
                        variant="outline"
                        size="sm"
                        className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Data Table */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-md overflow-x-auto">
                <ScrollArea ref={tableContainerRef} className="h-[600px]">
                  <div className="min-w-full">
                    <table className="w-full text-sm">
                      {/* Header */}
                      <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
                        <tr>
                          <th className="w-12 p-2 text-center font-medium text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 sticky left-0 z-30 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-zinc-200 dark:after:bg-zinc-700">
                            {selectedRows.has(HEADER_ROW_INDEX) ? (
                              <div className="w-5 h-5 bg-amber-500 rounded-sm flex items-center justify-center mx-auto">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            ) : (
                              "#"
                            )}
                          </th>
                          {headers.map((header, index) => (
                            <th
                              key={index}
                              className={`p-3 text-left font-medium text-xs text-zinc-700 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-700 transition-none ${
                                selectedColumns.has(header)
                                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                                  : ""
                              } ${sortState.column === header ? "bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-300 dark:border-blue-700" : ""}`}
                              onMouseEnter={() => setHoveredColumn(header)}
                              onMouseLeave={() => {
                                setHoveredColumn(null);
                                setColumnMenuOpen(null);
                              }}
                            >
                              <div className="flex items-center justify-between gap-2">
                                {editingColumn === header ? (
                                  <Input
                                    ref={columnInputRef}
                                    value={editingColumnValue}
                                    onChange={(e) =>
                                      setEditingColumnValue(e.target.value)
                                    }
                                    onBlur={saveEditedColumn}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        saveEditedColumn();
                                      } else if (e.key === "Escape") {
                                        cancelEditingColumn();
                                      }
                                    }}
                                    className="w-full h-4 text-xs border-0 shadow-sm focus:ring-2 focus:ring-zinc-400 bg-white dark:bg-zinc-800 p-0"
                                    autoFocus
                                  />
                                ) : (
                                  <div
                                    className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startEditingColumn(header);
                                    }}
                                  >
                                    <span className="truncate" title={header}>
                                      {header}
                                    </span>
                                    {sortState.column === header &&
                                      (sortState.direction === "asc" ? (
                                        <ArrowUp className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                      ) : (
                                        <ArrowDown className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                      ))}
                                    {selectedColumns.has(header) &&
                                      !sortState.column && (
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                                          <span
                                            className="text-white"
                                            style={{ fontSize: "8px" }}
                                          >
                                            ✓
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                )}
                                <div className={`flex items-center gap-1 ${hoveredColumn === header && !editingColumn ? 'opacity-100' : 'opacity-0'}`}>
                                  <button
                                    data-sort-menu-trigger
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSortColumn(header);
                                    }}
                                    className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
                                    title={
                                      sortState.column === header
                                        ? sortState.direction === "asc"
                                          ? "Click to sort descending"
                                          : "Click to clear sort"
                                        : "Click to sort ascending"
                                    }
                                  >
                                    {sortState.column === header ? (
                                      sortState.direction === "asc" ? (
                                        <ArrowUp className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                                      ) : (
                                        <ArrowDown className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                                      )
                                    ) : (
                                      <ArrowUpDown className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                                    )}
                                  </button>
                                  <div className="relative">
                                    <button
                                      data-column-menu-trigger={header}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setColumnMenuOpen(
                                          columnMenuOpen === header
                                            ? null
                                            : header,
                                        );
                                      }}
                                      className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
                                      title="Column options"
                                    >
                                      <MoreVertical className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                                    </button>
                                    {columnMenuOpen === header && (
                                      <div
                                        ref={(el) => {
                                          columnMenuRefs.current.set(
                                            header,
                                            el,
                                          );
                                        }}
                                        className="absolute left-0 top-full mt-1 min-w-[180px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg py-1 z-50"
                                      >
                                        <button
                                          onClick={() =>
                                            addColumnToLeft(header)
                                          }
                                          className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                                        >
                                          <Plus className="h-4 w-4" />
                                          Add column to left
                                        </button>
                                        <button
                                          onClick={() =>
                                            addColumnToRight(header)
                                          }
                                          className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                                        >
                                          <Plus className="h-4 w-4" />
                                          Add column to right
                                        </button>
                                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />
                                        <button
                                          onClick={() => deleteColumn(header)}
                                          className="w-full px-3 py-1.5 text-sm text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          Delete column
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className={`border-b border-zinc-100 dark:border-zinc-800 ${
                              selectedRows.has(rowIndex)
                                ? "bg-emerald-50 dark:bg-emerald-900/20"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                            }`}
                            onMouseEnter={() => setHoveredRow(rowIndex)}
                            onMouseLeave={() => {
                              setHoveredRow(null);
                              setRowMenuOpen(null);
                            }}
                          >
                            <td className="w-12 p-2 text-center cursor-pointer bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 sticky left-0 z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-zinc-200 dark:after:bg-zinc-700">
                              <div className="flex items-center justify-center">
                                {selectedRows.has(rowIndex) ? (
                                  <div className="w-5 h-5 bg-emerald-500 rounded-sm flex items-center justify-center">
                                    <span className="text-white text-xs">
                                      ✓
                                    </span>
                                  </div>
                                ) : hoveredRow === rowIndex ? (
                                  <div className="relative">
                                    <div
                                      data-row-menu-trigger={rowIndex}
                                      className="h-4 w-4 p-0 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setRowMenuOpen(
                                          rowMenuOpen === rowIndex
                                            ? null
                                            : rowIndex,
                                        );
                                      }}
                                    >
                                      <MoreVertical className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                    </div>
                                    {rowMenuOpen === rowIndex && (
                                      <div
                                        ref={(el) => {
                                          menuRefs.current.set(rowIndex, el);
                                        }}
                                        className="absolute left-full top-0 ml-1 min-w-[160px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg py-1 z-50"
                                      >
                                        <button
                                          onClick={() => addRowAbove(rowIndex)}
                                          className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                                        >
                                          <Plus className="h-4 w-4" />
                                          Add row above
                                        </button>
                                        <button
                                          onClick={() => addRowBelow(rowIndex)}
                                          className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center gap-2"
                                        >
                                          <Plus className="h-4 w-4" />
                                          Add row below
                                        </button>
                                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />
                                        <button
                                          onClick={() => deleteRow(rowIndex)}
                                          className="w-full px-3 py-1.5 text-sm text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          Delete row
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-zinc-400">
                                    {rowIndex + 1}
                                  </span>
                                )}
                              </div>
                            </td>
                            {headers.map((header, colIndex) => (
                              <td
                                key={colIndex}
                                className="p-2 text-sm border-r border-zinc-200 dark:border-zinc-700 cursor-text hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                                onClick={() =>
                                  startEditingCell(
                                    rowIndex,
                                    header,
                                    String(row[header] || ""),
                                  )
                                }
                              >
                                {editingCell?.rowIndex === rowIndex &&
                                editingCell?.column === header ? (
                                  <Input
                                    value={editingCell.value}
                                    onChange={(e) =>
                                      setEditingCell((prev) =>
                                        prev
                                          ? { ...prev, value: e.target.value }
                                          : null,
                                      )
                                    }
                                    onBlur={saveEditedCell}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        saveEditedCell();
                                      } else if (e.key === "Escape") {
                                        cancelEditing();
                                      }
                                    }}
                                    className="w-full h-6 text-sm border-0 shadow-sm focus:ring-2 focus:ring-zinc-400 bg-white dark:bg-zinc-800"
                                    autoFocus
                                  />
                                ) : (
                                  <div className="min-h-[18px] text-zinc-900 dark:text-zinc-100 truncate">
                                    {row[header] || ""}
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="text-center py-3 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
                <span className="inline-flex items-center gap-4">
                  <span>Click to edit • Enter to save • Esc to cancel</span>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <span>Ctrl+Z: Undo • Ctrl+S: Export</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CSVEditor;
