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
  Popover,
  MenuItem,
  CircularProgress,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState, useEffect } from "react"
import Modal from "../../modals/Modal"
import useMachineManagement from "@/app/(pages)/(user)/admin/machineManagement/hooks"
import { useRouter } from "next/navigation"
import CardLoader from "@/loaders/CardLoader"
import toast from "react-hot-toast"
import { useSuspendProduct } from "@/api/admin/useAdmin"

// Helper function to extract numeric value from strings like "about 1 hour ago"
const extractNumber = (str: string): number => {
  const matches = str.match(/\d+/)
  return matches ? parseInt(matches[0], 10) : 0
}

interface Column {
  id: string
  label: string
}

interface Row {
  id: string | number
  status?: string
  createdAt?: string | Date
  name?: string
  [key: string]: any
}

const statusColors: Record<string, string> = {
  Approved: "#28C76F",
  Pending: "#E46A11",
  Suspended: "#F04438",
  Success: "#28C76F",
  Failed: "#F04438",
}

const statusBgColors: Record<string, string> = {
  Approved: "#274635",
  Pending: "#4c3422",
  Suspended: "#4f2c2a",
  Success: "#28C76F33",
  Failed: "#F0443833",
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
  onClick2?: () => void
  actions?: boolean
  showHeader?: boolean
  buttonText?: string
  showSearch?: boolean
  showButton?: boolean
  editProduct?: boolean
  navUser?: boolean
  titlePage?: string
}

const AdminTable = ({
  columns,
  data,
  total: initialTotal = 100,
  rowsPerPage = 5,
  icon1 = true,
  icon2 = true,
  title,
  onClick,
  actions = true,
  showHeader = false,
  buttonText,
  showSearch = true,
  showButton = true,
  editProduct = false,
  onClick2,
  navUser,
  titlePage,
}: CustomUserTableProps) => {
  const router = useRouter()
  const { handleDeleteMachine, handelSetEditValues, pending } =
    useMachineManagement()
  const [page, setPage] = useState(1)
  const [deleteID, setDeleteID] = useState("")
  const [statusTab, setStatusTab] = useState("All")
  const [timeTab, setTimeTab] = useState("All Time")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState<Row[]>(data)
  const [total, setTotal] = useState(initialTotal)

  const { mutate: suspendProduct } = useSuspendProduct()

  const [isApproveWithdrawModalOpen, setIsApproveWithdrawModalOpen] =
    useState(false)
  const [isSuspendedModalOpen, setIsSuspendedModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currentRow, setCurrentRow] = useState<Row | null>(null)

  // Filter data whenever statusTab, timeTab, searchQuery or data changes
  useEffect(() => {
    let filtered = [...data]

    // Filter by status
    if (statusTab !== "All") {
      filtered = filtered.filter((row) => row.status === statusTab)
    }

    // Filter by time
    if (timeTab !== "All Time" && filtered.length > 0) {
      filtered = filtered.filter((row) => {
        if (!row.createdAt) return true

        // Handle relative time strings like "about 1 hour ago"
        const createdAtStr = String(row.createdAt).toLowerCase()

        switch (timeTab) {
          case "12 Months":
            // Keep if contains "month" with number <= 12, or any reference to years/weeks/days/hours
            return (
              !createdAtStr.includes("year") &&
              !(
                createdAtStr.includes("month") &&
                extractNumber(createdAtStr) > 12
              )
            )
          case "30 Days":
            // Keep if contains "day" with number <= 30, or any reference to hours/minutes
            return (
              !createdAtStr.includes("year") &&
              !createdAtStr.includes("month") &&
              !(
                createdAtStr.includes("day") && extractNumber(createdAtStr) > 30
              ) &&
              !(
                createdAtStr.includes("week") && extractNumber(createdAtStr) > 4
              )
            )
          case "7 Days":
            // Keep if contains "day" with number <= 7, or any reference to hours/minutes
            return (
              !createdAtStr.includes("year") &&
              !createdAtStr.includes("month") &&
              !(
                createdAtStr.includes("day") && extractNumber(createdAtStr) > 7
              ) &&
              !(
                createdAtStr.includes("week") && extractNumber(createdAtStr) > 1
              )
            )
          case "24 Hour":
            // Keep if contains "hour" with number <= 24, or any reference to minutes/seconds
            return (
              !createdAtStr.includes("year") &&
              !createdAtStr.includes("month") &&
              !createdAtStr.includes("day") &&
              !createdAtStr.includes("week") &&
              !(
                createdAtStr.includes("hour") &&
                extractNumber(createdAtStr) > 24
              )
            )
          default:
            return true
        }
      })
    }

    // Filter by search query
    if (titlePage === "machine" && searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((row) => {
        if (row.title && typeof row.title === "string") {
          return row.title.toLowerCase().includes(query)
        }
        return false
      })
    }
    if (titlePage === "rewards" && searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((row) => {
        if (row.userName && typeof row.userName === "string") {
          return row.userName.toLowerCase().includes(query)
        }
        return false
      })
    }
    if (titlePage === "transactions" && searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((row) => {
        if (row.transactiontype && typeof row.transactiontype === "string") {
          return row.transactiontype.toLowerCase().includes(query)
        }
        return false
      })
    }

    setFilteredData(filtered)
    setTotal(filtered.length)
    setPage(1) // Reset to first page when filters change
  }, [statusTab, timeTab, searchQuery, data])

  const handlePageChange = (_: any, value: number) => {
    setPage(value)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: Row) => {
    setAnchorEl(event.currentTarget)
    setCurrentRow(row)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "status-popover" : undefined

  const handleOption = (status: string) => {
    if (status === "Approved") {
      setIsApproveWithdrawModalOpen(true)
    }
    if (status === "Suspended") {
      setIsSuspendedModalOpen(true)
    }
    if (status === "Delete") {
      if (currentRow) setDeleteID(String(currentRow.id))
      setIsDeleteModalOpen(true)
    }
    handleClose()
  }

  return (
    <Box sx={{ bgcolor: "#1E1E1E", borderRadius: 3, p: 2 }}>
      <Typography variant='h6' color='white' fontWeight='bold' mb={2}>
        {title}
      </Typography>

      {showHeader ? (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
          gap={2}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          {showSearch ? (
            <>
              <Box
                component='input'
                placeholder='Search Here'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {showButton && (
                <Button
                  variant='contained'
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
              )}
            </>
          ) : (
            <>
              <Box></Box>
              <Button
                variant='contained'
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
                className='flex self-end'
              >
                {buttonText}
              </Button>
            </>
          )}
        </Box>
      ) : (
        // Tabs Block
        <Box
          display='flex'
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
          mb={2}
        >
          {/* Status Tabs */}
          <Tabs
            value={statusTab}
            onChange={(_, val) => setStatusTab(val)}
            textColor='inherit'
            indicatorColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            sx={{ flex: 1 }}
          >
            {["All", "Approved", "Pending", "Suspended"].map((tab) => (
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

          {/* Time Tabs */}
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
            {filteredData
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td": { border: 0 } }}
                >
                  {columns.map((col: any) => (
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
                      ) : col.id === "createdAt" ? (
                        // Just display createdAt as it already comes as relative time string
                        row[col.id]
                      ) : (
                        row[col.id]
                      )}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      {icon1 && (
                        <>
                          <IconButton onClick={(e) => handleClick(e, row)}>
                            <MoreVertIcon sx={{ color: "#A78BFA" }} />
                          </IconButton>

                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            {titlePage === "commission" ? (
                              <>
                                <MenuItem
                                  onClick={() => handleOption("Delete")}
                                >
                                  Delete
                                </MenuItem>
                              </>
                            ) : (
                              <>
                                <MenuItem
                                  onClick={() => handleOption("Approved")}
                                >
                                  Approve
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleOption("Suspended")}
                                >
                                  Suspend
                                </MenuItem>
                              </>
                            )}
                          </Popover>
                        </>
                      )}

                      {icon2 && (
                        <IconButton
                          onClick={() => {
                            if (editProduct) {
                              handelSetEditValues(String(row.id))
                              onClick2 && onClick2()
                            } else if (navUser) {
                              router.push(
                                `/admin/usersManagement/details?id=${row.id}`
                              )
                            } else {
                              onClick2 && onClick2()
                            }
                          }}
                        >
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
          Showing{" "}
          {filteredData.length === 0
            ? 0
            : Math.min((page - 1) * rowsPerPage + 1, total)}
          –{Math.min(page * rowsPerPage, total)} from {total}
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
      <Modal
        open={isApproveWithdrawModalOpen}
        setOpen={setIsApproveWithdrawModalOpen}
      >
        <div className='text-lg font-medium'>Approve withdrawal?</div>
        <div className='text-[#A9A9A9] mt-4'>
          Do you want to approve withdrawal{" "}
          {currentRow?.amount && `of $${currentRow.amount}`} of User{" "}
          {currentRow?.name || "John Doe"}?
        </div>
        <div className='flex'>
          <Button
            sx={{
              backgroundColor: "#008A3D",
              color: "#fff",
              marginTop: "22px",
              marginLeft: "auto",
            }}
            onClick={() => setIsApproveWithdrawModalOpen(false)}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal open={isSuspendedModalOpen} setOpen={setIsSuspendedModalOpen}>
        <div className='text-lg font-medium'>Suspend withdrawal?</div>
        <div className='text-[#A9A9A9] mt-4'>
          Do you want to Suspend withdrawal{" "}
          {currentRow?.amount && `of $${currentRow.amount}`} of User{" "}
          {currentRow?.name || "John Doe"}?
        </div>
        <div className='flex'>
          <Button
            sx={{
              backgroundColor: "#F04438",
              color: "#fff",
              marginTop: "22px",
              marginLeft: "auto",
            }}
            onClick={() => {
              suspendProduct(
                { id: currentRow?.id },
                {
                  onSettled: () => {
                    setIsSuspendedModalOpen(false)
                  },
                }
              )
            }}
          >
            Suspend
          </Button>
        </div>
      </Modal>

      <Modal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen}>
        <div className='text-lg font-medium'>Delete Machine?</div>
        <div className='text-[#A9A9A9] mt-4'>
          Do you want to Delete the Machine?
        </div>
        {pending ? (
          <CircularProgress sx={{ alignSelf: "center" }} />
        ) : (
          <div className='flex'>
            <Button
              sx={{
                backgroundColor: "#F04438",
                color: "#fff",
                marginTop: "22px",
                marginLeft: "auto",
              }}
              onClick={async () => {
                await handleDeleteMachine(deleteID)
                setIsDeleteModalOpen(false)
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </Modal>
    </Box>
  )
}

export default AdminTable
