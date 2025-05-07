import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material"

type Column<T> = {
  id: keyof T
  label: string
  isStatus?: boolean
}

type TableDisplayProps<T> = {
  columns: Column<T>[]
  data: T[]
  statusColors?: Record<string, { bg: string; color: string }>
}

export default function TableDisplay<T extends { [key: string]: any }>({
  columns,
  data,
  statusColors = {
    Success: { bg: "#4CAF50", color: "#fff" },
    Failed: { bg: "#F44336", color: "#fff" },
  },
}: TableDisplayProps<T>) {
  return (
    <TableContainer component={Paper} sx={{ background: "#2b2b2b" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={String(col.id)}
                sx={{
                  color: "#eee",
                  borderBottom: "1px solid #444",
                  fontWeight: 600,
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={String(col.id)} sx={{ color: "#ccc" }}>
                  {col.isStatus ? (
                    <Chip
                      label={row[col.id]}
                      sx={{
                        backgroundColor: statusColors[row[col.id]]?.bg || "#888",
                        color: statusColors[row[col.id]]?.color || "#fff",
                        fontWeight: 500,
                      }}
                    />
                  ) : (
                    row[col.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
