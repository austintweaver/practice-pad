
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
import { Download, File, FileText } from "lucide-react";

// Sample document data for the client
const clientDocuments = [
  {
    id: 1,
    name: "Complaint Form.pdf",
    type: "Legal Filing",
    size: "1.2 MB",
    uploaded: "Apr 10, 2025",
    fileType: "pdf",
  },
  {
    id: 2,
    name: "Contract Review.docx",
    type: "Contract",
    size: "850 KB",
    uploaded: "Apr 9, 2025",
    fileType: "docx",
  },
  {
    id: 4,
    name: "Settlement Agreement.pdf",
    type: "Settlement",
    size: "2.1 MB",
    uploaded: "Apr 7, 2025",
    fileType: "pdf",
  },
];

export default function ClientDocuments() {
  const getFileIcon = (fileType) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Documents</h2>
        <p className="text-muted-foreground">
          Access and download documents shared with you by your legal team.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
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
              {clientDocuments.map((doc) => (
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
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {clientDocuments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No documents available yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
