import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { FileText, Send, DollarSign, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentProcessorIntegration } from "@/components/finance/PaymentProcessorIntegration";

// Mock data for invoices
const invoices = [
  {
    id: "INV-2025-001",
    client: "John Smith",
    amount: 500,
    issued: "2025-05-01",
    due: "2025-05-15",
    status: "Pending",
  },
  {
    id: "INV-2025-002",
    client: "Sarah Johnson",
    amount: 750,
    issued: "2025-04-28",
    due: "2025-05-12",
    status: "Paid",
  },
  {
    id: "INV-2025-003",
    client: "Michael Davis",
    amount: 350,
    issued: "2025-04-25",
    due: "2025-05-09",
    status: "Overdue",
  },
  {
    id: "INV-2025-004",
    client: "Robert Johnson",
    amount: 1200,
    issued: "2025-04-20",
    due: "2025-05-04",
    status: "Paid",
  },
];

// Mock data for payments
const payments = [
  {
    id: "PMT-2025-001",
    client: "Sarah Johnson",
    amount: 750,
    date: "2025-05-01",
    invoiceId: "INV-2025-002",
    method: "Credit Card",
  },
  {
    id: "PMT-2025-002",
    client: "Robert Johnson",
    amount: 1200,
    date: "2025-04-28",
    invoiceId: "INV-2025-004",
    method: "Bank Transfer",
  },
];

const Finances = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [newInvoiceOpen, setNewInvoiceOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    client: "",
    amount: "",
    description: "",
    dueDate: "",
  });
  const { toast } = useToast();

  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invoice created",
      description: `Invoice for ${invoiceData.client} has been created and sent.`,
    });
    setNewInvoiceOpen(false);
    setInvoiceData({
      client: "",
      amount: "",
      description: "",
      dueDate: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finances</h1>
          <p className="text-muted-foreground">
            Manage invoices and track payments
          </p>
        </div>
        <Dialog open={newInvoiceOpen} onOpenChange={setNewInvoiceOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Create and send an invoice to your client.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvoiceSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    name="client"
                    value={invoiceData.client}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={invoiceData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={invoiceData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setNewInvoiceOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">Send Invoice</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Outstanding
              </CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$850.00</div>
              <p className="text-xs text-muted-foreground">
                2 unpaid invoices
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Received
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,950.00</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue
              </CardTitle>
              <FileText className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$350.00</div>
              <p className="text-xs text-muted-foreground">
                1 overdue invoice
              </p>
            </CardContent>
          </Card>
        </div>
        
        <PaymentProcessorIntegration />
      </div>

      <Tabs defaultValue="invoices" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(invoice.issued).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(invoice.due).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {invoice.status !== "Paid" && (
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Send className="h-4 w-4 mr-1" />
                            Remind
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{payment.invoiceId}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finances;
