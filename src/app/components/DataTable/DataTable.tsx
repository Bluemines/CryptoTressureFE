"use client";

import DataTableComponent, {
  createTheme,
  TableColumn,
  TableProps,
} from "react-data-table-component";
import styles from "./styles";
import { Box, Typography } from "@mui/material";

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
  header?:false
}

const DataTable = <T,>({
  header,
  data,
  columns,
  themeStyle = "black",
  ...rest
}: CustomDataTableProps<T>) => {
  const customStyles = styles[themeStyle];

  return (
    <>
      {header && (
        <Box sx={{ bgcolor: "#2C2B2B", padding: 4 }}>
          <Typography>Recents</Typography>
        </Box>
      )}
      <DataTableComponent
        data={data}
        columns={columns}
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
