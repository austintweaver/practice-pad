
import React from 'react';
import { TimeTracker } from '@/components/timetracking/TimeTracker';

export default function TimeTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Time Tracking</h2>
        <p className="text-muted-foreground">
          Track and manage billable hours for clients
        </p>
      </div>
      
      <TimeTracker />
    </div>
  );
}
