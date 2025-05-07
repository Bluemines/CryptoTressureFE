"use client"
import {
  TextField,
  Button,
} from "@mui/material"
import { useState } from "react"
import DistributeRewardsDrawer from "@/app/components/drawers/DistributeRewardsDrawer"
import TableDisplay from "@/app/components/ui/tables/TableDisplay"
import { authStore } from "@/store/authStore"

type RewardRow = {
  id: number
  name: string
  email: string
  level: number
  date: string
  rewardAmount: string
  status: "Success" | "Failed"
}

export type Column<T> = {
  id: keyof T;
  label: string;
  isStatus?: boolean;
};

const Page = () => {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const { user } = authStore()
  console.log('user: ', user)

  const columns = [
    { id: "name", label: "User" },
    { id: "email", label: "Email" },
    { id: "level", label: "Level" },
    { id: "date", label: "Date" },
    { id: "rewardAmount", label: "Reward Amount" },
    { id: "status", label: "Status", isStatus: true },
  ] satisfies Column<RewardRow>[]
  

  const data: RewardRow[] = [
    {
      id: 1,
      name: "John Bushmill",
      email: "Johnb@mail.com",
      level: 2,
      date: "1 min ago",
      rewardAmount: "$1000",
      status: "Failed",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@mail.com",
      level: 3,
      date: "5 min ago",
      rewardAmount: "$500",
      status: "Success",
    },
    {
      id: 3,
      name: "Alice Smith",
      email: "alice@mail.com",
      level: 1,
      date: "10 min ago",
      rewardAmount: "$200",
      status: "Success",
    },
  ]


  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen text-white">
      <div className="font-semibold text-xl py-3">Rewards Distribution</div>
      <div className="flex justify-between items-center py-4 bg-[#1f1f1f] px-4">
        <TextField
          label="Search user"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            label: { color: "#aaa" },
            input: { color: "#eee" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#A78BFA" },
            },
          }}
        />
        <Button variant="contained" sx={{ fontWeight: 600 }} onClick={() => setOpen(true)}>
          Distribute Awards Manually
        </Button>
      </div>

      <TableDisplay columns={columns} data={filteredData} />

      <DistributeRewardsDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Page
