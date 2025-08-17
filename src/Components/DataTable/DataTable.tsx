import React, { useState } from "react";


export interface Column<T> {
  key: keyof T;
  header: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean | "single"; // NEW: allow "single"
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal === bVal) return 0;
    return sortOrder === "asc"
      ? aVal > bVal
        ? 1
        : -1
      : aVal < bVal
      ? 1
      : -1;
  });

  const toggleRow = (row: T) => {
    let updated: T[];
    if (selectable === "single") {
      updated = [row]; // only one row allowed
    } else {
      updated = selectedRows.includes(row)
        ? selectedRows.filter((r) => r !== row)
        : [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onRowSelect?.([]);
    } else {
      setSelectedRows(data);
      onRowSelect?.(data);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-600 dark:text-gray-300">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
        <span className="ml-2 text-sm">Loading data...</span>
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400 italic border rounded-lg shadow-sm bg-white dark:bg-gray-800">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-800">
      <table role="table" className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs tracking-wider">
          <tr role="row">
            {selectable && selectable !== "single" && (
              <th role="columnheader" className="p-3 border-b">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                role="columnheader"
                key={String(col.key)}
                className="p-3 border-b cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => {
                  if (sortKey === col.key) {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortKey(col.key);
                    setSortOrder("asc");
                  }
                }}
              >
                <div className="flex items-center">
                  {col.header}
                  {sortKey === col.key && (
                    <span className="ml-1 text-gray-500">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              role="row"
              key={i}
              className={`transition-colors border-b odd:bg-gray-50 dark:odd:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-700 ${
                selectedRows.includes(row) ? "bg-blue-100 dark:bg-blue-900" : ""
              }`}
            >
              {selectable && (
                <td role="cell" className="p-3">
                  <input
                    type={selectable === "single" ? "radio" : "checkbox"}
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
                    aria-label="Select row"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td role="cell" key={String(col.key)} className="p-3 text-gray-700 dark:text-gray-200">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
