import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MessageSquare, FileText, Calendar, Search, Plus, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample client data
const clients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    caseType: "Divorce",
    status: "Active",
    documentsCount: 12,
    messagesCount: 8,
    lastActive: "Today",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 234-5678",
    caseType: "Property Dispute",
    status: "Active",
    documentsCount: 8,
    messagesCount: 3,
    lastActive: "Yesterday",
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "michael.davis@example.com",
    phone: "(555) 345-6789",
    caseType: "Personal Injury",
    status: "Pending",
    documentsCount: 5,
    messagesCount: 2,
    lastActive: "2 days ago",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 456-7890",
    caseType: "Business Contract",
    status: "Active",
    documentsCount: 15,
    messagesCount: 10,
    lastActive: "Today",
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "(555) 567-8901",
    caseType: "Will Preparation",
    status: "Completed",
    documentsCount: 3,
    messagesCount: 0,
    lastActive: "1 week ago",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "(555) 678-9012",
    caseType: "Custody",
    status: "Active",
    documentsCount: 10,
    messagesCount: 15,
    lastActive: "Today",
  },
  {
    id: 7,
    name: "William Thompson",
    email: "william.thompson@example.com",
    phone: "(555) 789-0123",
    caseType: "Criminal Defense",
    status: "Active",
    documentsCount: 20,
    messagesCount: 12,
    lastActive: "Yesterday",
  },
  {
    id: 8,
    name: "Linda Martinez",
    email: "linda.martinez@example.com",
    phone: "(555) 890-1234",
    caseType: "Immigration",
    status: "Pending",
    documentsCount: 7,
    messagesCount: 5,
    lastActive: "3 days ago",
  },
];

export default function Clients() {
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">
            Manage and view your client information.
          </p>
        </div>
        <Button className="bg-legal-navy hover:bg-legal-navy/80">
          <Plus className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Clients</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="pl-8 w-[250px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        <div>{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.email}
                        </div>
                      </TableCell>
                      <TableCell>{client.caseType}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            client.status === "Active"
                              ? "border-green-500 text-green-700 bg-green-50"
                              : client.status === "Pending"
                              ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                              : "border-blue-500 text-blue-700 bg-blue-50"
                          }`}
                        >
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-legal-navy" />
                          {client.documentsCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-legal-navy" />
                          {client.messagesCount}
                        </div>
                      </TableCell>
                      <TableCell>{client.lastActive}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="active" className="m-0">
              {/* Filtered view for active clients */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients
                    .filter((client) => client.status === "Active")
                    .map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          <div>{client.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {client.email}
                          </div>
                        </TableCell>
                        <TableCell>{client.caseType}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-green-500 text-green-700 bg-green-50"
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1 text-legal-navy" />
                            {client.documentsCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1 text-legal-navy" />
                            {client.messagesCount}
                          </div>
                        </TableCell>
                        <TableCell>{client.lastActive}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            {/* Other tab contents would be similar but filtered by status */}
            <TabsContent value="pending" className="m-0">
              {/* Similar table for pending clients */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients
                    .filter((client) => client.status === "Pending")
                    .map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          <div>{client.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {client.email}
                          </div>
                        </TableCell>
                        <TableCell>{client.caseType}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-yellow-500 text-yellow-700 bg-yellow-50"
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1 text-legal-navy" />
                            {client.documentsCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1 text-legal-navy" />
                            {client.messagesCount}
                          </div>
                        </TableCell>
                        <TableCell>{client.lastActive}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="completed" className="m-0">
              {/* Similar table for completed clients */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients
                    .filter((client) => client.status === "Completed")
                    .map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          <div>{client.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {client.email}
                          </div>
                        </TableCell>
                        <TableCell>{client.caseType}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-blue-500 text-blue-700 bg-blue-50"
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1 text-legal-navy" />
                            {client.documentsCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1 text-legal-navy" />
                            {client.messagesCount}
                          </div>
                        </TableCell>
                        <TableCell>{client.lastActive}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
