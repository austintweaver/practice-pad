
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { MessageSquare, FileText, Calendar } from "lucide-react";

// Sample upcoming events
const upcomingEvents = [
  {
    time: "2:00 PM Today",
    title: "Court Hearing - Davis vs. Wilson",
    type: "court",
  },
  {
    time: "10:30 AM Tomorrow",
    title: "Document Review Meeting",
    type: "meeting",
  },
  {
    time: "3:00 PM Friday",
    title: "Settlement Discussion",
    type: "consultation",
  },
];

// Sample recent documents
const recentDocuments = [
  {
    name: "Settlement Agreement.pdf",
    action: "Uploaded by Attorney Smith",
    time: "2 hours ago",
  },
  {
    name: "Case Summary.docx",
    action: "Shared with you",
    time: "Yesterday",
  },
];

// Sample recent messages
const recentMessages = [
  {
    from: "Attorney Sarah Johnson",
    preview: "I've reviewed the settlement offer...",
    time: "1 hour ago",
    unread: true,
  },
  {
    from: "Legal Assistant Mike",
    preview: "Your documents have been filed with...",
    time: "3 hours ago",
    unread: false,
  },
];

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
        <p className="text-muted-foreground">
          Here's an overview of your case and upcoming events
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled meetings and court dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="rounded-full bg-legal-navy/10 p-2">
                    <Calendar className="h-4 w-4 text-legal-navy" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                    <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Latest documents in your case</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="rounded-full bg-legal-navy/10 p-2">
                    <FileText className="h-4 w-4 text-legal-navy" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.action}</p>
                    <p className="text-xs text-muted-foreground">{doc.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest communications from your legal team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="rounded-full bg-legal-navy/10 p-2">
                    <MessageSquare className="h-4 w-4 text-legal-navy" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{message.from}</p>
                      <p className="text-xs text-muted-foreground">{message.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{message.preview}</p>
                    {message.unread && (
                      <span className="inline-flex items-center rounded-full bg-legal-navy px-2 py-0.5 text-xs font-medium text-white">
                        New
                      </span>
                    )}
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
