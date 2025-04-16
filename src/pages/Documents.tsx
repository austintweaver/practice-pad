import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  File,
  FileText,
  FolderClosed,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
  Download,
  Trash2,
  FolderPlus,
} from "lucide-react";
import { Client, Document, Folder } from "@/types/documents";

const clientsData: Client[] = [
  {
    id: 1,
    name: "John Smith",
    folders: [
      { id: 1, name: "Legal Filings", clientId: 1 },
      { id: 2, name: "Contracts", clientId: 1 },
    ],
    documents: [
      {
        id: 1,
        name: "Complaint Form.pdf",
        type: "Legal Filing",
        size: "1.2 MB",
        uploaded: "Apr 10, 2025",
        fileType: "pdf",
        clientId: 1,
        folderId: 1,
      },
      {
        id: 2,
        name: "Contract Review.docx",
        type: "Contract",
        size: "850 KB",
        uploaded: "Apr 9, 2025",
        fileType: "docx",
        clientId: 1,
        folderId: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    folders: [
      { id: 3, name: "Evidence", clientId: 2 },
      { id: 4, name: "Statements", clientId: 2 },
    ],
    documents: [
      {
        id: 3,
        name: "Witness Statement.docx",
        type: "Statement",
        size: "1.5 MB",
        uploaded: "Apr 6, 2025",
        fileType: "docx",
        clientId: 2,
        folderId: 4,
      },
    ],
  },
];

export default function Documents() {
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [expandedClients, setExpandedClients] = useState<number[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<number[]>([]);

  const toggleClient = (clientId: number) => {
    setExpandedClients(
      expandedClients.includes(clientId)
        ? expandedClients.filter((id) => id !== clientId)
        : [...expandedClients, clientId]
    );
  };

  const toggleFolder = (folderId: number) => {
    setExpandedFolders(
      expandedFolders.includes(folderId)
        ? expandedFolders.filter((id) => id !== folderId)
        : [...expandedFolders, folderId]
    );
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <File className="h-5 w-5 text-red-500" />;
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "xlsx":
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredClients = clientsData.filter((client) =>
    client.documents.some((doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase())
    ) ||
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">
            Manage and organize client documents.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isUploading} onOpenChange={setIsUploading}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a new document for a client.
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
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" /> New Folder
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Client Documents</CardTitle>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <Collapsible
                key={client.id}
                open={expandedClients.includes(client.id)}
                className="space-y-2"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-4 py-2 hover:bg-muted">
                  <div className="flex items-center gap-2">
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        expandedClients.includes(client.id) ? "rotate-90" : ""
                      }`}
                    />
                    <span className="font-medium">{client.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {client.documents.length} files
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleClient(client.id);
                    }}
                  >
                    {expandedClients.includes(client.id) ? (
                      <FolderOpen className="h-4 w-4" />
                    ) : (
                      <FolderClosed className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 pl-6">
                  {client.folders.map((folder) => (
                    <Collapsible
                      key={folder.id}
                      open={expandedFolders.includes(folder.id)}
                      className="space-y-2"
                    >
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-4 py-2 hover:bg-muted">
                        <div className="flex items-center gap-2">
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${
                              expandedFolders.includes(folder.id) ? "rotate-90" : ""
                            }`}
                          />
                          <span>{folder.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {
                              client.documents.filter(
                                (doc) => doc.folderId === folder.id
                              ).length
                            }{" "}
                            files
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFolder(folder.id);
                          }}
                        >
                          {expandedFolders.includes(folder.id) ? (
                            <FolderOpen className="h-4 w-4" />
                          ) : (
                            <FolderClosed className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>File Name</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Date Uploaded</TableHead>
                              <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {client.documents
                              .filter((doc) => doc.folderId === folder.id)
                              .map((doc) => (
                                <TableRow key={doc.id}>
                                  <TableCell>
                                    <div className="flex items-center space-x-2">
                                      {getFileIcon(doc.fileType)}
                                      <span>{doc.name}</span>
                                    </div>
                                  </TableCell>
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
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
