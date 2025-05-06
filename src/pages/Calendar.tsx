
import React, { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIntegration } from "@/components/calendar/CalendarIntegration";

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">
          Manage your appointments and schedule
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Your upcoming appointments and events</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <CalendarIntegration />
        </div>
      </div>
    </div>
  );
}
