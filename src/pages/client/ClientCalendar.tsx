
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
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

// Sample available time slots
const availableTimeSlots = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "4:00 PM", available: true },
];

export default function ClientCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [requestDetails, setRequestDetails] = useState({
    description: "",
    type: "consultation",
  });
  const { toast } = useToast();

  const handleRequestMeeting = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your meeting.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send the request to the backend
    toast({
      title: "Meeting Requested",
      description: `Your meeting request for ${format(
        selectedDate,
        "PPP"
      )} at ${selectedTime} has been submitted.`,
    });
    
    setIsRequestOpen(false);
    setSelectedTime(null);
    setRequestDetails({
      description: "",
      type: "consultation",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Schedule Meeting</h2>
        <p className="text-muted-foreground">
          Request a meeting with your attorney
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>
              Choose a date for your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                // Disable weekends and past dates
                const day = date.getDay();
                const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
                return day === 0 || day === 6 || isPastDate;
              }}
              className="rounded-md border p-3 pointer-events-auto"
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {selectedDate
                ? `Selected: ${format(selectedDate, "PPP")}`
                : "Please select a date"}
            </p>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
              <CardDescription>
                Select an available time for your meeting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableTimeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={
                      selectedTime === slot.time ? "default" : "outline"
                    }
                    disabled={!slot.available}
                    className={slot.available ? "" : "opacity-50"}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    <Clock className="mr-2 h-4 w-4" /> {slot.time}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setIsRequestOpen(true)}
                className="w-full"
              >
                Request Meeting
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>
                Your scheduled meetings with your attorney
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                You have no upcoming meetings scheduled.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Meeting</DialogTitle>
            <DialogDescription>
              Provide details for your meeting request on{" "}
              {selectedDate && format(selectedDate, "PPP")} at {selectedTime}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Meeting Type</Label>
              <Select
                value={requestDetails.type}
                onValueChange={(value) =>
                  setRequestDetails({ ...requestDetails, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="case-review">Case Review</SelectItem>
                  <SelectItem value="document-signing">Document Signing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={requestDetails.description}
                onChange={(e) =>
                  setRequestDetails({
                    ...requestDetails,
                    description: e.target.value,
                  })
                }
                placeholder="Please provide a brief description of what you'd like to discuss"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestMeeting}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
