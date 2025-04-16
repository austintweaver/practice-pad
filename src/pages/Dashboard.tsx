
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";

// Sample events data for the day
const todayEvents = [
  {
    time: "09:00 AM",
    title: "Client Meeting - Johnson Case",
    type: "meeting",
  },
  {
    time: "11:30 AM",
    title: "Document Review - Smith Contract",
    type: "review",
  },
  {
    time: "02:00 PM",
    title: "Court Hearing - Davis vs. Wilson",
    type: "court",
  },
  {
    time: "04:30 PM",
    title: "Client Consultation - Brown Family",
    type: "consultation",
  },
];

// Sample recent activity
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
];

// Sample tasks data
const tasksList = [
  { title: "Review Contract for Johnson Case", status: "In Progress", dueDate: "Today" },
  { title: "File Motion for Smith Case", status: "Pending", dueDate: "Tomorrow" },
  { title: "Client Meeting - Davis Family", status: "Scheduled", dueDate: "Today" },
  { title: "Document Review - Wilson Estate", status: "In Progress", dueDate: "Tomorrow" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayEvents.map((event, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="min-w-[80px] text-sm text-muted-foreground">
                    {event.time}
                  </div>
                  <div className="flex-1 rounded-lg border p-3">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
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
                    ) : (
                      <Calendar className="h-4 w-4 text-legal-navy" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.client}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                      {activity.document && (
                        <span className="font-medium text-legal-navy"> {activity.document}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
            <CardDescription>Your current tasks and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasksList.map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : task.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
