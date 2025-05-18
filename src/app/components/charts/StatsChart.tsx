"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, Typography, Box } from "@mui/material"
import { useGetChartData } from "@/api/admin/useAdmin"

type MonthlyData = {
  month: string
  revenue: number
  sales: number
}

const StatisticsChart = () => {
  const { data: chartData, isLoading } = useGetChartData()

  const mergedData: MonthlyData[] =
    chartData?.revenue?.map((revItem: { month: string; amount: number }) => {
      const salesItem = chartData.sales.find(
        (saleItem: { month: string; amount: number }) =>
          saleItem.month === revItem.month
      )

      return {
        month: revItem.month,
        revenue: revItem.amount,
        sales: salesItem?.amount || 0,
      }
    }) || []

  const isEmpty =
    mergedData.length === 0 ||
    mergedData.every((item) => item.revenue === 0 && item.sales === 0)

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Statistics
        </Typography>
        <Typography variant="body2" color="#AAA" mb={3}>
          Revenue and Sales
        </Typography>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isEmpty ? (
          <Box textAlign="center" p={4}>
            <Typography variant="body1" color="textSecondary">
              No data available for this year.
            </Typography>
          </Box>
        ) : (
          <div className="overflow-x-auto md:overflow-x-visible">
            <div className="min-w-[600px]">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={mergedData}
                  margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#7367F0"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#FF9F43"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis
                    stroke="#888"
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A1D",
                      border: "none",
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#1E1E1E"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#5C59E8"
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#E46A11"
                    fillOpacity={1}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {!isEmpty && (
          <Box display="flex" gap={2} mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box width={10} height={10} bgcolor="#7367F0" borderRadius="50%" />
              <Typography variant="body2">Revenue</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Box width={10} height={10} bgcolor="#FF9F43" borderRadius="50%" />
              <Typography variant="body2">Sales</Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default StatisticsChart
