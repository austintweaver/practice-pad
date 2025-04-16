
import { useState } from "react";
import { format, subMonths } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  LineChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample financial data - would be fetched from backend in a real application
const monthlyRevenue = [
  { month: "Jan", revenue: 28000, expenses: 18000 },
  { month: "Feb", revenue: 32000, expenses: 19500 },
  { month: "Mar", revenue: 35000, expenses: 21000 },
  { month: "Apr", revenue: 38000, expenses: 20500 },
  { month: "May", revenue: 36000, expenses: 21500 },
  { month: "Jun", revenue: 42000, expenses: 22000 },
];

const revenueByPracticeArea = [
  { name: "Family Law", value: 35 },
  { name: "Business Law", value: 25 },
  { name: "Estate Planning", value: 20 },
  { name: "Litigation", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Reporting() {
  const [timeframe, setTimeframe] = useState("6m");
  const [quickbooksConnected, setQuickbooksConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const currentMonth = format(new Date(), "MMMM yyyy");

  const handleConnectQuickbooks = () => {
    if (apiKey.trim() === "") {
      // In a real app, we would validate the API key format
      return;
    }

    // Mock API connection
    setQuickbooksConnected(true);
    setApiKey("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Reporting</h2>
          <p className="text-muted-foreground">
            Review your firm's financial performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$211,000</div>
            <p className="text-xs text-muted-foreground">
              +8% from last {timeframe === "1m" ? "month" : "period"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$122,500</div>
            <p className="text-xs text-muted-foreground">
              +5% from last {timeframe === "1m" ? "month" : "period"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$88,500</div>
            <p className="text-xs text-muted-foreground">
              +12% from last {timeframe === "1m" ? "month" : "period"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Outstanding Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,300</div>
            <p className="text-xs text-muted-foreground">21 invoices pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs. Expenses</CardTitle>
            <CardDescription>
              Monthly comparison for the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80"
              config={{
                revenue: { color: "#0080ff" },
                expenses: { color: "#ff4040" },
              }}
            >
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip 
                  content={(props) => {
                    if (!props.active || !props.payload || !props.payload.length) {
                      return null;
                    }
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-1">
                          <p className="text-sm font-medium">{props.label}</p>
                          {props.payload.map((item: any) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-1">
                                <div
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                                <p className="text-xs text-muted-foreground">
                                  {item.name}
                                </p>
                              </div>
                              <p className="text-xs font-medium">
                                ${Number(item.value).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#0080ff" />
                <Bar dataKey="expenses" name="Expenses" fill="#ff4040" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Practice Area</CardTitle>
            <CardDescription>Distribution of revenue sources</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={revenueByPracticeArea}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueByPracticeArea.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QuickBooks Integration</CardTitle>
            <CardDescription>
              Connect to your QuickBooks account for automated financial reporting
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quickbooksConnected ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Connected to QuickBooks</p>
                    <p className="text-xs text-muted-foreground">
                      Last synced: {format(new Date(), "PPP")}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Sync Now
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline">Configure Sync Settings</Button>
                  <Button variant="outline" className="text-red-500">
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">
                  Connect your QuickBooks account to automatically import invoices,
                  expenses, and other financial data.
                </p>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">QuickBooks API Key</Label>
                    <Input
                      id="api-key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your QuickBooks API Key"
                    />
                  </div>
                  <Button onClick={handleConnectQuickbooks}>
                    Connect QuickBooks
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Label component for the API key input
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label 
      htmlFor={htmlFor} 
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  );
}
