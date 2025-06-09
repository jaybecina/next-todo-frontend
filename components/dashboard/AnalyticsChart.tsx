"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import data from "@/data/analytics";

const availableFilters = [
  {
    value: "completed",
    label: "Completed Todos",
  },
  {
    value: "pending",
    label: "Pending Todos",
  },
  {
    value: "total",
    label: "Total Todos",
  },
];

const AnalyticsChart = () => {
  const [selection, setSelection] = useState("total");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo Analytics For This Year</CardTitle>
        <CardDescription>Todo Status Per Month</CardDescription>
        <div className="w-full sm:w-auto">
          <Select onValueChange={setSelection} defaultValue="total">
            <SelectTrigger className="w-full max-w-xs h-10">
              <SelectValue placeholder="Select Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={selection}
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
