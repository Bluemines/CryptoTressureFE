import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Pagination,
  Tabs,
  Tab,
  Paper,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"

interface Column {
  id: string
  label: string
}

interface Row {
  id: string | number
  [key: string]: any
}

interface CustomUserTableProps {
  columns: Column[]
  data: Row[]
  total?: number
  rowsPerPage?: number
  icon1?: boolean
  icon2?: boolean
  title?: string
  onClick?: () => void
  actions?: boolean
  showHeader?: boolean; 
  buttonText?:string
}

const statusColors: Record<string, string> = {
  Approved: "#28C76F",
  Pending: "#E46A11",
  Suspend: "#F04438",
  Success: '#28C76F',
  Failed: '#F04438'
}
const statusBgColors: Record<string, string> = {
  Approved: "#274635",
  Pending: "#4c3422",
  Suspend: "#4f2c2a",
  Success: '#28C76F33',
  Failed: '#F0443833'
}

const AdminTable = ({
  columns,
  data,
  total = 100,
  rowsPerPage = 5,
  icon1 = true,
  icon2 = true,
  title,
  onClick,
  actions = true,
  showHeader = false,
  buttonText
}: CustomUserTableProps) => {
  const [page, setPage] = useState(1)
  const [statusTab, setStatusTab] = useState("All")
  const [timeTab, setTimeTab] = useState("All Time")

  const handlePageChange = (_: any, value: number) => {
    setPage(value)
  }

  return (
    <Box sx={{ bgcolor: "#1E1E1E", borderRadius: 3, p: 2 }}>
      <Typography variant='h6' color='white' fontWeight='bold' mb={2}>
        {title}
      </Typography>

      {/* Tabs */}
      {/* <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
        mb={2}
      >
        <Tabs
          value={statusTab}
          onChange={(_, val) => setStatusTab(val)}
          textColor='inherit'
          indicatorColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          sx={{ flex: 1 }}
        >
          {["All", "Approved", "Pending", "Declined"].map((tab) => (
            <Tab
              key={tab}
              value={tab}
              label={tab}
              sx={{
                textTransform: "none",
                color: "white",
                bgcolor: statusTab === tab ? "#7367F0" : "transparent",
                borderRadius: 2,
                px: 2,
                minHeight: 36,
              }}
            />
          ))}
        </Tabs>

        <Tabs
          value={timeTab}
          onChange={(_, val) => setTimeTab(val)}
          textColor='inherit'
          indicatorColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          sx={{ flex: 1 }}
        >
          {["All Time", "12 Months", "30 Days", "7 Days", "24 Hour"].map(
            (tab) => (
              <Tab
                key={tab}
                value={tab}
                label={tab}
                sx={{
                  textTransform: "none",
                  color: "white",
                  bgcolor: timeTab === tab ? "#7367F0" : "transparent",
                  borderRadius: 2,
                  px: 2,
                  minHeight: 36,
                }}
              />
            )
          )}
        </Tabs>
      </Box> */}
      {showHeader ? (
        // Custom Header (Search + Button)
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          gap={2}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            component="input"
            placeholder="Search here"
            sx={{
              flex: 1,
              bgcolor: "#2B2B2B",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: 2,
              px: 2,
              py: 1,
              outline: "none",
              "&::placeholder": {
                color: "#aaa",
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<span style={{ fontSize: 20 }}>＋</span>}
            sx={{
              bgcolor: "#7367F0",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
              "&:hover": {
                bgcolor: "#5e50ee",
              },
            }}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </Box>
      ) : (
        // Tabs Block
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
          mb={2}
        >
          <Tabs
            value={statusTab}
            onChange={(_, val) => setStatusTab(val)}
            textColor="inherit"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flex: 1 }}
          >
            {["All", "Approved", "Pending", "Declined"].map((tab) => (
              <Tab
                key={tab}
                value={tab}
                label={tab}
                sx={{
                  textTransform: "none",
                  color: "white",
                  bgcolor: statusTab === tab ? "#7367F0" : "transparent",
                  borderRadius: 2,
                  px: 2,
                  minHeight: 36,
                }}
              />
            ))}
          </Tabs>

          <Tabs
            value={timeTab}
            onChange={(_, val) => setTimeTab(val)}
            textColor="inherit"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flex: 1 }}
          >
            {["All Time", "12 Months", "30 Days", "7 Days", "24 Hour"].map(
              (tab) => (
                <Tab
                  key={tab}
                  value={tab}
                  label={tab}
                  sx={{
                    textTransform: "none",
                    color: "white",
                    bgcolor: timeTab === tab ? "#7367F0" : "transparent",
                    borderRadius: 2,
                    px: 2,
                    minHeight: 36,
                  }}
                />
              )
            )}
          </Tabs>
        </Box>
      )}

      {/* Table */}
      <TableContainer component={Paper} sx={{ background: "transparent" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    color: "#fff",
                    borderBottom: "1px solid #333",
                    fontWeight: 600,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              {actions && (
                <TableCell
                  sx={{ color: "#fff", borderBottom: "1px solid #333" }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td": { border: 0 } }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.id} sx={{ color: "#ddd" }}>
                      {col.id === "status" ? (
                        <Chip
                          label={row[col.id]}
                          sx={{
                            backgroundColor:
                              statusBgColors[row[col.id]] || "#888",
                            color: statusColors[row[col.id]] || "#888",
                            fontWeight: 500,
                          }}
                        />
                      ) : (
                        row[col.id]
                      )}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      {icon1 && (
                        <IconButton>
                          <MoreVertIcon sx={{ color: "#A78BFA" }} />
                        </IconButton>
                      )}
                      {icon2 && (
                        <IconButton onClick={onClick}>
                          <EditIcon sx={{ color: "#A78BFA" }} />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Pagination */}
      <Box
        mt={2}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='body2' color='#aaa'>
          Showing {Math.min((page - 1) * rowsPerPage + 1, total)}–
          {Math.min(page * rowsPerPage, total)} from {total}
        </Typography>
        <Pagination
          count={Math.ceil(total / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
              borderRadius: "8px",
              backgroundColor: "#2B2B2B",
            },
            "& .Mui-selected": {
              backgroundColor: "#7367F0",
              color: "#fff",
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default AdminTable
