// components/StatisticsChart.tsx
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const data = [
  { month: "Jan", revenue: 900, sales: 800 },
  { month: "Feb", revenue: 850, sales: 750 },
  { month: "Mar", revenue: 1000, sales: 880 },
  { month: "Apr", revenue: 920, sales: 1020 },
  { month: "May", revenue: 970, sales: 870 },
  { month: "Jun", revenue: 1010, sales: 890 },
  { month: "Jul", revenue: 1080, sales: 910 },
  { month: "Aug", revenue: 1000, sales: 930 },
  { month: "Sep", revenue: 1200, sales: 1000 },
  { month: "Oct", revenue: 870, sales: 880 },
  { month: "Nov", revenue: 960, sales: 1050 },
  { month: "Dec", revenue: 1020, sales: 980 },
];

const StatisticsChart = () => {
  return (
    <Card >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Statistics
        </Typography>
        <Typography variant="body2" color="#AAA" mb={3}>
          Revenue and Sales
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7367F0" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FF9F43" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1A1A1D", border: "none", borderRadius: 8 }}
              labelStyle={{ color: "#fff" }}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E1E1E" />
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
      </CardContent>
    </Card>
  );
};

export default StatisticsChart;
