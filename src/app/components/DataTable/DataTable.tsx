"use client";

import DataTableComponent, {
  createTheme,
  TableColumn,
  TableProps,
} from "react-data-table-component";
import styles from "./styles";
import { Box, Typography, Tooltip } from "@mui/material";

createTheme("customDark", {
  text: {
    primary: "#e5e7eb",
    secondary: "#ffffff",
  },
  background: {
    default: "#1f2937",
  },
  divider: {
    default: "#374151",
  },
  highlightOnHover: {
    default: "#374151",
    text: "#ffffff",
  },
});

type ThemeOption = "black" | "gray";

interface CustomDataTableProps<T> extends Partial<TableProps<T>> {
  data: T[];
  columns: TableColumn<T>[];
  themeStyle?: ThemeOption;
  header?: false;
  maxLength?: number; // default limit for truncation
}

const truncate = (value: any, maxLength: number) => {
  const stringValue = String(value ?? "");
  return stringValue.length > maxLength
    ? stringValue.slice(0, maxLength) + "..."
    : stringValue;
};

const DataTable = <T,>({
  header,
  data,
  columns,
  themeStyle = "black",
  maxLength = 40,
  ...rest
}: CustomDataTableProps<T>) => {
  const customStyles = styles[themeStyle];

  const enhancedColumns: TableColumn<T>[] = columns.map((col) => ({
    ...col,
    cell: (row: T) => {
      const value =
        typeof col.selector === "function" ? col.selector(row) : "";
      const displayValue = truncate(value, maxLength);

      return (
        <Tooltip title={String(value)} arrow>
          <span>{displayValue}</span>
        </Tooltip>
      );
    },
  }));

  return (
    <>
      {header && (
        <Box sx={{ bgcolor: "#2C2B2B", padding: 4 }}>
          <Typography>Recents</Typography>
        </Box>
      )}
      <DataTableComponent
        data={data}
        columns={enhancedColumns}
        theme="customDark"
        customStyles={customStyles}
        pagination
        highlightOnHover
        {...rest}
      />
    </>
  );
};

export default DataTable;
