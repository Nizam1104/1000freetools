import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef as TanStackColumnDef,
} from "@tanstack/react-table";

interface TableRenderProps<T> {
  data: T[];
  columns?: TanStackColumnDef<T>[];
  maxTableHeightInPx?: number;
}

export default function TableRender<T extends Record<string, any>>({
  data = [],
  columns: providedColumns = [],
  maxTableHeightInPx = 700,
}: TableRenderProps<T>) {
  const columns = useMemo(() => {
    // Add a line number column as the first column
    const lineNumberColumn: TanStackColumnDef<T> = {
      id: "lineNumber",
      header: "#",
      cell: ({ row }) => row.index + 1,
      size: 50,
    };

    if (providedColumns.length > 0) {
      return [lineNumberColumn, ...providedColumns];
    } else if (data.length > 0) {
      const firstRow = data[0];
      return [
        lineNumberColumn,
        ...Object.keys(firstRow).map((key) => ({
          accessorKey: key as keyof T,
          header: key,
        })),
      ];
    }
    return [lineNumberColumn];
  }, [providedColumns, data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="inline-block bg-background overflow-auto"
      style={{ maxHeight: `${maxTableHeightInPx}px` }}
    >
      <table
        className="
          w-auto table-auto border-collapse font-sans text-sm text-foreground"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className={`
                    sticky top-0 z-10
                    bg-muted/80 backdrop-blur
                    px-4 py-3
                    text-left text-xs font-semibold uppercase tracking-wider
                    text-muted-foreground
                    border-b-2
                    border-r border-border
                    whitespace-nowrap
                    ${header.id === "lineNumber" ? "text-center" : ""}
                  `}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`
                transition-colors
                ${rowIndex % 2 === 0 ? "bg-background" : "bg-muted/30"}
                hover:bg-accent/40
              `}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`
                    px-4 py-2.5
                    text-sm text-foreground
                    border-b
                    border-r border-border
                    align-middle
                    whitespace-nowrap
                    ${cell.column.id === "lineNumber" ? "text-center font-medium" : ""}
                  `}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {table
          .getFooterGroups()
          .some((group) =>
            group.headers.some((header) => header.column.columnDef.footer),
          ) && (
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`
                      px-4 py-2.5
                      text-sm font-semibold text-foreground
                      bg-muted/50
                      border-t-2
                      border-r border-border
                      text-left
                      ${header.id === "lineNumber" ? "text-center" : ""}
                    `}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </div>
  );
}
