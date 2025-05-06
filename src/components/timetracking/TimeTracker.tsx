
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { Timer, TimerOff } from "lucide-react";

interface TimeEntry {
  id: string;
  clientId: string;
  clientName: string;
  description: string;
  duration: number; // in seconds
  date: string;
}

// Sample clients
const clients = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Davis" },
  { id: "4", name: "Emma Wilson" },
];

// Sample time entries
const sampleTimeEntries: TimeEntry[] = [
  {
    id: "1",
    clientId: "1",
    clientName: "John Smith",
    description: "Contract review and analysis",
    duration: 3600, // 1 hour
    date: "2025-05-06",
  },
  {
    id: "2",
    clientId: "2",
    clientName: "Sarah Johnson",
    description: "Client consultation regarding case status",
    duration: 1800, // 30 minutes
    date: "2025-05-06",
  },
];

export function TimeTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(sampleTimeEntries);
  const [seconds, setSeconds] = useState(0);
  const [selectedClient, setSelectedClient] = useState("");
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: number | undefined;
    
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  const startTimer = () => {
    setIsTracking(true);
  };

  const stopTimer = () => {
    setIsTracking(false);
    setIsDialogOpen(true);
  };

  const handleSaveTime = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient || !description) {
      toast({
        title: "Missing information",
        description: "Please select a client and add a description.",
        variant: "destructive",
      });
      return;
    }
    
    const clientName = clients.find(c => c.id === selectedClient)?.name || "";
    
    const newEntry: TimeEntry = {
      id: (timeEntries.length + 1).toString(),
      clientId: selectedClient,
      clientName,
      description,
      duration: seconds,
      date: new Date().toISOString().slice(0, 10),
    };
    
    setTimeEntries([...timeEntries, newEntry]);
    setSeconds(0);
    setSelectedClient("");
    setDescription("");
    setIsDialogOpen(false);
    
    toast({
      title: "Time entry saved",
      description: `Time entry for ${clientName} has been saved.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Time Tracker</CardTitle>
          <CardDescription>
            Track time spent on client matters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-mono font-bold">
              {formatTime(seconds)}
            </div>
            <div>
              {isTracking ? (
                <Button variant="destructive" onClick={stopTimer}>
                  <TimerOff className="mr-2 h-4 w-4" />
                  Stop Timer
                </Button>
              ) : (
                <Button className="bg-red-600 hover:bg-red-700" onClick={startTimer}>
                  <Timer className="mr-2 h-4 w-4" />
                  Start Timer
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Time Entry</DialogTitle>
            <DialogDescription>
              Record details about this time entry
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveTime}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the work you performed"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Time Spent</Label>
                <div className="text-xl font-mono">{formatTime(seconds)}</div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Time Entry</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{entry.clientName}</h4>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-medium">{formatTime(entry.duration)}</span>
                  </div>
                </div>
                <p className="text-sm">{entry.description}</p>
              </div>
            ))}
            
            {timeEntries.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No time entries yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
