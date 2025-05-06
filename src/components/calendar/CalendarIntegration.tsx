
import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Check } from "lucide-react";

type CalendarProvider = "google" | "outlook" | "apple" | "other";

export function CalendarIntegration() {
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [provider, setProvider] = useState<CalendarProvider>("google");
  const { toast } = useToast();

  const handleIntegration = () => {
    setIsIntegrating(true);
    
    // This would trigger the OAuth flow in a real application
    setTimeout(() => {
      setIsIntegrating(false);
      toast({
        title: "Calendar integrated successfully",
        description: `Your ${providerName(provider)} calendar has been connected.`,
      });
    }, 1500);
  };

  const providerName = (provider: CalendarProvider): string => {
    switch (provider) {
      case "google": return "Google Calendar";
      case "outlook": return "Microsoft Outlook";
      case "apple": return "Apple Calendar";
      case "other": return "Other Calendar";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Integration</CardTitle>
        <CardDescription>
          Connect your existing calendar to sync events and meetings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Connect Calendar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Calendar</DialogTitle>
              <DialogDescription>
                Choose your calendar provider to synchronize events
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <RadioGroup value={provider} onValueChange={(value) => setProvider(value as CalendarProvider)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="google" id="google" />
                  <Label htmlFor="google">Google Calendar</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="outlook" id="outlook" />
                  <Label htmlFor="outlook">Microsoft Outlook</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="apple" id="apple" />
                  <Label htmlFor="apple">Apple Calendar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other Calendar</Label>
                </div>
              </RadioGroup>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => null}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleIntegration} disabled={isIntegrating}>
                {isIntegrating ? "Connecting..." : "Connect"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Benefits of calendar integration:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Automatically sync client appointments
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Get reminders for upcoming events
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Schedule meetings without switching apps
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Avoid double-booking and scheduling conflicts
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
