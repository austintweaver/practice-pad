
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Check, FileUp, Send, X } from "lucide-react";
import { ServiceData } from "@/types/services";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Using the same initial services data structure as in the attorney Services page
const initialServices: ServiceData = {
  litigation: [
    {
      id: 1,
      title: "Civil Litigation",
      description: "Representation in court for civil disputes.",
      details: [
        "Initial case assessment",
        "Filing of pleadings and motions",
        "Discovery process",
        "Trial representation",
        "Appeals process assistance",
      ],
      price: "$250-500/hour",
      popular: true,
    }
  ],
  family: [
    {
      id: 4,
      title: "Divorce Proceedings",
      description: "Legal representation during divorce.",
      details: [
        "Filing for divorce",
        "Asset division negotiation",
        "Child custody arrangements",
        "Alimony and child support calculation",
        "Mediation services",
      ],
      price: "$250-400/hour",
      popular: true,
    }
  ],
  business: [
    {
      id: 7,
      title: "Business Formation",
      description: "Legal assistance for new businesses.",
      details: [
        "Entity selection guidance",
        "Filing formation documents",
        "Operating agreements/bylaws",
        "Compliance guidance",
        "Initial contracts preparation",
      ],
      price: "$1,500-3,000 (flat fee)",
      popular: true,
    }
  ],
  estate: [
    {
      id: 10,
      title: "Will Preparation",
      description: "Drafting and preparation of wills.",
      details: [
        "Initial consultation",
        "Asset review",
        "Will drafting",
        "Witness execution",
        "Periodic will review",
      ],
      price: "$800-1,500 (flat fee)",
      popular: true,
    }
  ],
};

export default function ClientServices() {
  const [selectedCategory, setSelectedCategory] = useState("litigation");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestingService, setRequestingService] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleRequestService = (serviceId: number, serviceTitle: string) => {
    setRequestingService({ id: serviceId, title: serviceTitle });
    setSelectedFiles([]);
    setIsRequestDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitServiceRequest = () => {
    if (!requestingService) return;
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRequestDialogOpen(false);
      
      const fileDetails = selectedFiles.length > 0 
        ? ` with ${selectedFiles.length} document${selectedFiles.length > 1 ? 's' : ''}`
        : '';
        
      toast({
        title: "Service Requested",
        description: `Your request for ${requestingService.title}${fileDetails} has been sent to the attorney.`,
      });
      
      // Reset state
      setRequestingService(null);
      setSelectedFiles([]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Legal Services</h2>
        <p className="text-muted-foreground">
          Available legal services and pricing information.
        </p>
      </div>

      <Tabs 
        value={selectedCategory} 
        onValueChange={setSelectedCategory}
        className="space-y-6"
      >
        <TabsList className="bg-white border w-full justify-start h-12 overflow-x-auto px-1">
          <TabsTrigger value="litigation" className="flex-1 max-w-[200px]">
            Litigation
          </TabsTrigger>
          <TabsTrigger value="family" className="flex-1 max-w-[200px]">
            Family Law
          </TabsTrigger>
          <TabsTrigger value="business" className="flex-1 max-w-[200px]">
            Business Law
          </TabsTrigger>
          <TabsTrigger value="estate" className="flex-1 max-w-[200px]">
            Estate Planning
          </TabsTrigger>
        </TabsList>
        
        {Object.entries(initialServices).map(([category, items]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <Card key={service.id} className={`relative ${service.popular ? "border-legal-gold" : ""}`}>
                  {service.popular && (
                    <div className="absolute -top-3 right-4 bg-legal-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.details.map((detail, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="mr-2 h-4 w-4 mt-0.5 text-legal-navy" />
                          <span>{detail}</span>
                        </div>
                      ))}
                      <div className="pt-4">
                        <p className="text-xl font-bold">{service.price}</p>
                        <p className="text-sm text-muted-foreground">Pricing may vary based on complexity</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => handleRequestService(service.id, service.title)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Request Service
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {items.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No services available in this category.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Service</DialogTitle>
            <DialogDescription>
              Submit your request for {requestingService?.title}. The attorney will review your request and either accept it or schedule a follow-up call.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">What will happen next:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Your attorney will be notified of your service request</li>
                <li>They will review the details and either accept the work or request a follow-up call</li>
                <li>You will receive a notification when they respond</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="document-upload" className="text-sm font-medium">Upload Relevant Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FileUp className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                  <Input
                    id="document-upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => document.getElementById('document-upload')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2 mt-3">
                  <p className="text-sm font-medium">Selected Documents:</p>
                  <ul className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <span className="text-sm truncate max-w-[280px]">{file.name}</span>
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>Cancel</Button>
            <Button onClick={submitServiceRequest} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
