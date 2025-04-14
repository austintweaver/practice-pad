import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  FileText,
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Trash2,
  Upload,
  Filter,
  File,
} from "lucide-react";
import { Label } from "@/components/ui/label";

// Sample document data
const documents = [
  {
    id: 1,
    name: "Complaint Form.pdf",
    client: "John Smith",
    type: "Legal Filing",
    size: "1.2 MB",
    uploaded: "Apr 10, 2025",
    fileType: "pdf",
  },
  {
    id: 2,
    name: "Contract Review.docx",
    client: "Emma Wilson",
    type: "Contract",
    size: "850 KB",
    uploaded: "Apr 9, 2025",
    fileType: "docx",
  },
  {
    id: 3,
    name: "Evidence Photos.zip",
    client: "Michael Davis",
    type: "Evidence",
    size: "15.7 MB",
    uploaded: "Apr 8, 2025",
    fileType: "zip",
  },
  {
    id: 4,
    name: "Settlement Agreement.pdf",
    client: "Robert Brown",
    type: "Settlement",
    size: "2.1 MB",
    uploaded: "Apr 7, 2025",
    fileType: "pdf",
  },
  {
    id: 5,
    name: "Witness Statement.docx",
    client: "Sarah Johnson",
    type: "Statement",
    size: "1.5 MB",
    uploaded: "Apr 6, 2025",
    fileType: "docx",
  },
  {
    id: 6,
    name: "Property Deed.pdf",
    client: "Sarah Johnson",
    type: "Real Estate",
    size: "3.2 MB",
    uploaded: "Apr 5, 2025",
    fileType: "pdf",
  },
  {
    id: 7,
    name: "Financial Records.xlsx",
    client: "Jennifer Lee",
    type: "Financial",
    size: "5.6 MB",
    uploaded: "Apr 4, 2025",
    fileType: "xlsx",
  },
  {
    id: 8,
    name: "Court Order.pdf",
    client: "William Thompson",
    type: "Court Document",
    size: "1.8 MB",
    uploaded: "Apr 3, 2025",
    fileType: "pdf",
  },
];

export default function Documents() {
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <File className="h-5 w-5 text-red-500" />;
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "xlsx":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "zip":
        return <File className="h-5 w-5 text-amber-500" />;
      case "jpg":
      case "png":
        return <File className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();
    // Here we would handle the actual file upload
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">
            Manage and organize client documents.
          </p>
        </div>
        <Dialog open={isUploading} onOpenChange={setIsUploading}>
          <DialogTrigger asChild>
            <Button className="bg-legal-navy hover:bg-legal-navy/80">
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a new document for a client. Supported file types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="michael-davis">Michael Davis</SelectItem>
                      <SelectItem value="emma-wilson">Emma Wilson</SelectItem>
                      <SelectItem value="robert-brown">Robert Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legal-filing">Legal Filing</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="evidence">Evidence</SelectItem>
                      <SelectItem value="settlement">Settlement</SelectItem>
                      <SelectItem value="statement">Statement</SelectItem>
                      <SelectItem value="financial">Financial Records</SelectItem>
                      <SelectItem value="court-document">Court Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input id="file" type="file" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsUploading(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Documents</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-8 w-[250px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Filter by client</DropdownMenuItem>
                  <DropdownMenuItem>Filter by type</DropdownMenuItem>
                  <DropdownMenuItem>Filter by date</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="legal-filings">Legal Filings</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date Uploaded</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getFileIcon(doc.fileType)}
                          <span>{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.client}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploaded}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            {/* Other tab contents would be filtered by document type */}
            <TabsContent value="legal-filings" className="m-0">
              {/* Similar table but filtered for legal filings */}
            </TabsContent>
            <TabsContent value="contracts" className="m-0">
              {/* Similar table but filtered for contracts */}
            </TabsContent>
            <TabsContent value="evidence" className="m-0">
              {/* Similar table but filtered for evidence */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
