
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  client?: string;
  description?: string;
  type: "meeting" | "consultation" | "court" | "other";
  status: "confirmed" | "pending" | "cancelled";
};

// Sample data - would be fetched from backend in a real application
const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Client Consultation",
    start: new Date(new Date().setHours(10, 0)),
    end: new Date(new Date().setHours(11, 0)),
    client: "John Smith",
    description: "Initial consultation on divorce proceedings",
    type: "consultation",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Court Hearing",
    start: new Date(new Date().setHours(14, 0)),
    end: new Date(new Date().setHours(16, 0)),
    client: "Sarah Johnson",
    description: "Property dispute hearing",
    type: "court",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Document Review Meeting",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
    client: "Michael Davis",
    description: "Review contract documents",
    type: "meeting",
    status: "pending",
  },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    client: "",
    type: "meeting",
    status: "pending",
  });
  const { toast } = useToast();

  // Filter events for the selected date
  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (event) =>
          event.start.getDate() === selectedDate.getDate() &&
          event.start.getMonth() === selectedDate.getMonth() &&
          event.start.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const startTime = newEvent.start || new Date(selectedDate);
    const endTime = newEvent.end || new Date(selectedDate);
    
    const eventToAdd: Event = {
      id: Math.max(0, ...events.map((e) => e.id)) + 1,
      title: newEvent.title,
      start: startTime,
      end: endTime,
      client: newEvent.client,
      description: newEvent.description,
      type: newEvent.type as "meeting" | "consultation" | "court" | "other",
      status: newEvent.status as "confirmed" | "pending" | "cancelled",
    };

    setEvents([...events, eventToAdd]);
    setIsAddEventOpen(false);
    
    // Reset the new event form
    setNewEvent({
      title: "",
      description: "",
      client: "",
      type: "meeting",
      status: "pending",
    });

    toast({
      title: "Event Added",
      description: `"${eventToAdd.title}" has been added to your calendar.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">
            Manage your schedule and appointments
          </p>
        </div>
        <Button onClick={() => setIsAddEventOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border p-3 pointer-events-auto"
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {selectedDate ? format(selectedDate, "PPP") : "No date selected"}
            </p>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Events for {selectedDate ? format(selectedDate, "PPP") : "Today"}
              </CardTitle>
              <CardDescription>
                All scheduled appointments and meetings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No events scheduled for this date
                </p>
              ) : (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start p-4 border rounded-lg"
                    >
                      <div
                        className={`w-1 self-stretch rounded mr-4 ${
                          event.status === "confirmed"
                            ? "bg-green-500"
                            : event.status === "pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.title}</h4>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              event.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : event.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="inline-block h-3 w-3 mr-1" />{" "}
                          {format(event.start, "h:mm a")} -{" "}
                          {format(event.end, "h:mm a")}
                        </p>
                        {event.client && (
                          <p className="text-sm">Client: {event.client}</p>
                        )}
                        {event.description && (
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar Integrations</CardTitle>
              <CardDescription>
                Connect your existing calendar applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Google Calendar</p>
                    <p className="text-sm text-muted-foreground">
                      Sync events with your Google Calendar
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Microsoft Outlook</p>
                    <p className="text-sm text-muted-foreground">
                      Sync events with your Outlook Calendar
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Apple iCloud Calendar</p>
                    <p className="text-sm text-muted-foreground">
                      Sync events with your iCloud Calendar
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event for {selectedDate ? format(selectedDate, "PPP") : "today"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Event Title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start">Start Time</Label>
                <Input
                  id="start"
                  type="time"
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":");
                    const startDate = selectedDate
                      ? new Date(selectedDate)
                      : new Date();
                    startDate.setHours(parseInt(hours), parseInt(minutes));
                    setNewEvent({ ...newEvent, start: startDate });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end">End Time</Label>
                <Input
                  id="end"
                  type="time"
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":");
                    const endDate = selectedDate
                      ? new Date(selectedDate)
                      : new Date();
                    endDate.setHours(parseInt(hours), parseInt(minutes));
                    setNewEvent({ ...newEvent, end: endDate });
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                value={newEvent.client || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, client: e.target.value })
                }
                placeholder="Client Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) =>
                  setNewEvent({ ...newEvent, type: value as any })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="court">Court Appearance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="Event Description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
