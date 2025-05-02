
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Mail, Phone, ExternalLink, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock client data
const clients = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    dateAdded: "2023-08-15",
    status: "Active",
    teamMembers: ["John Doe", "Sarah Wilson"],
  },
  {
    id: 2,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "(555) 234-5678",
    dateAdded: "2023-09-20",
    status: "Active",
    teamMembers: ["John Doe"],
  },
  {
    id: 3,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "(555) 345-6789",
    dateAdded: "2023-10-05",
    status: "Pending",
    teamMembers: [],
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 456-7890",
    dateAdded: "2023-11-12",
    status: "Active",
    teamMembers: ["Sarah Wilson"],
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResendInvite = (client: typeof clients[0]) => {
    toast({
      title: "Invitation resent",
      description: `A new invitation has been sent to ${client.email}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link to="/clients/new">
              <UserPlus className="mr-2 h-4 w-4" />
              New Client
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Team Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-1 h-3 w-3" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.dateAdded}</TableCell>
                    <TableCell>
                      {client.teamMembers.length > 0 ? (
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {client.teamMembers.length} assigned
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">None assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {client.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {client.status === "Pending" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleResendInvite(client)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Resend Invite</span>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View Client</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No clients found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
