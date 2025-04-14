
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, Users, Calendar, AlertCircle } from "lucide-react";

// Sample data - would be fetched from backend in a real application
const stats = [
  {
    title: "Active Clients",
    value: "28",
    icon: <Users className="h-5 w-5 text-legal-navy" />,
    description: "4 new this month",
    change: "+14%",
    changeType: "positive",
  },
  {
    title: "Documents",
    value: "142",
    icon: <FileText className="h-5 w-5 text-legal-navy" />,
    description: "12 uploaded today",
    change: "+8%",
    changeType: "positive",
  },
  {
    title: "Messages",
    value: "87",
    icon: <MessageSquare className="h-5 w-5 text-legal-navy" />,
    description: "5 unread messages",
    change: "-2%",
    changeType: "negative",
  },
  {
    title: "Appointments",
    value: "15",
    icon: <Calendar className="h-5 w-5 text-legal-navy" />,
    description: "3 scheduled this week",
    change: "0%",
    changeType: "neutral",
  },
];

// Sample recent client activity
const recentActivity = [
  {
    client: "John Smith",
    action: "Uploaded a new document",
    document: "Complaint Form.pdf",
    time: "10 minutes ago",
  },
  {
    client: "Sarah Johnson",
    action: "Sent a message",
    document: null,
    time: "1 hour ago",
  },
  {
    client: "Michael Davis",
    action: "Booked an appointment",
    document: null,
    time: "2 hours ago",
  },
  {
    client: "Emma Wilson",
    action: "Uploaded a new document",
    document: "Contract Review.docx",
    time: "3 hours ago",
  },
  {
    client: "Robert Brown",
    action: "Signed a document",
    document: "Settlement Agreement.pdf",
    time: "5 hours ago",
  },
];

// Sample recent clients
const recentClients = [
  { name: "John Smith", case: "Divorce Proceedings", status: "Active" },
  { name: "Sarah Johnson", case: "Property Dispute", status: "Active" },
  { name: "Michael Davis", case: "Personal Injury", status: "Pending" },
  { name: "Emma Wilson", case: "Business Contract", status: "Active" },
  { name: "Robert Brown", case: "Will Preparation", status: "Completed" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your client activity and cases.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="bg-legal-gray p-2 rounded-full">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions from your clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="rounded-full bg-legal-navy/10 p-2">
                    {activity.document ? (
                      <FileText className="h-4 w-4 text-legal-navy" />
                    ) : activity.action.includes("message") ? (
                      <MessageSquare className="h-4 w-4 text-legal-navy" />
                    ) : activity.action.includes("appointment") ? (
                      <Calendar className="h-4 w-4 text-legal-navy" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-legal-navy" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.client}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                      {activity.document && (
                        <span className="font-medium text-legal-navy">
                          {" "}
                          {activity.document}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>
              Latest client cases and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {client.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {client.case}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        client.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : client.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
