
import { useState } from "react";
import { Check, Info, Plus, Pencil, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Sample service data
const serviceData = {
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
    },
    {
      id: 2,
      title: "Personal Injury",
      description: "Legal representation for injury claims.",
      details: [
        "Case evaluation",
        "Documentation of injuries",
        "Negotiation with insurance companies",
        "Litigation if necessary",
        "Contingency fee basis available",
      ],
      price: "Contingency fee (30-40%)",
      popular: false,
    },
    {
      id: 3,
      title: "Labor & Employment",
      description: "Representation in employment disputes.",
      details: [
        "Wrongful termination",
        "Workplace discrimination",
        "Wage and hour violations",
        "Employment contract disputes",
        "Harassment claims",
      ],
      price: "$225-400/hour",
      popular: false,
    },
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
    },
    {
      id: 5,
      title: "Child Custody",
      description: "Representation in custody disputes.",
      details: [
        "Initial custody evaluation",
        "Parenting plan development",
        "Court representation",
        "Modification of existing orders",
        "Mediation assistance",
      ],
      price: "$250-450/hour",
      popular: false,
    },
    {
      id: 6,
      title: "Adoption",
      description: "Legal assistance with adoption process.",
      details: [
        "Eligibility assessment",
        "Document preparation",
        "Agency coordination",
        "Court representation",
        "Post-adoption legal matters",
      ],
      price: "$3,000-6,000 (flat fee)",
      popular: false,
    },
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
    },
    {
      id: 8,
      title: "Contract Review",
      description: "Legal review of business contracts.",
      details: [
        "Comprehensive contract review",
        "Risk identification",
        "Negotiation assistance",
        "Contract drafting",
        "Contract dispute resolution",
      ],
      price: "$200-350/hour",
      popular: false,
    },
    {
      id: 9,
      title: "Mergers & Acquisitions",
      description: "Legal guidance for M&A transactions.",
      details: [
        "Due diligence review",
        "Transaction structuring",
        "Document preparation",
        "Negotiation assistance",
        "Regulatory compliance",
      ],
      price: "$300-600/hour",
      popular: false,
    },
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
    },
    {
      id: 11,
      title: "Estate Planning",
      description: "Comprehensive estate planning services.",
      details: [
        "Will preparation",
        "Trust establishment",
        "Power of attorney",
        "Healthcare directives",
        "Estate tax planning",
      ],
      price: "$2,500-5,000 (flat fee)",
      popular: false,
    },
    {
      id: 12,
      title: "Probate Administration",
      description: "Assistance with the probate process.",
      details: [
        "Filing of probate documents",
        "Inventory of assets",
        "Debt and tax payment",
        "Asset distribution",
        "Court representation",
      ],
      price: "$250-400/hour",
      popular: false,
    },
  ],
};

interface Service {
  id: number;
  title: string;
  description: string;
  details: string[];
  price: string;
  popular: boolean;
}

export default function Services() {
  const [services, setServices] = useState(serviceData);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    title: "",
    description: "",
    details: ["", "", "", "", ""],
    price: "",
    popular: false,
  });
  const [selectedCategory, setSelectedCategory] = useState("litigation");
  const { toast } = useToast();

  const handleAddService = () => {
    if (!newService.title || !newService.description || !newService.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty details
    const filteredDetails = newService.details?.filter(detail => detail.trim() !== "") || [];
    
    const serviceToAdd: Service = {
      id: Math.max(0, ...Object.values(services).flat().map(s => s.id)) + 1,
      title: newService.title,
      description: newService.description,
      details: filteredDetails.length > 0 ? filteredDetails : ["Service details to be added"],
      price: newService.price,
      popular: !!newService.popular,
    };

    setServices({
      ...services,
      [selectedCategory]: [...(services[selectedCategory] || []), serviceToAdd],
    });

    setNewService({
      title: "",
      description: "",
      details: ["", "", "", "", ""],
      price: "",
      popular: false,
    });

    setIsAddDialogOpen(false);

    toast({
      title: "Service Added",
      description: `"${serviceToAdd.title}" has been added to your services.`,
    });
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    const updatedServices = {
      ...services,
      [selectedCategory]: services[selectedCategory].map(service => 
        service.id === editingService.id ? editingService : service
      ),
    };

    setServices(updatedServices);
    setEditingService(null);

    toast({
      title: "Service Updated",
      description: `"${editingService.title}" has been updated successfully.`,
    });
  };

  const handleDeleteService = (serviceId: number) => {
    const updatedServices = {
      ...services,
      [selectedCategory]: services[selectedCategory].filter(
        service => service.id !== serviceId
      ),
    };

    setServices(updatedServices);

    toast({
      title: "Service Deleted",
      description: "The service has been removed from your offerings.",
    });
  };

  const handleDetailChange = (index: number, value: string) => {
    if (!editingService) return;
    
    const updatedDetails = [...editingService.details];
    updatedDetails[index] = value;
    
    setEditingService({
      ...editingService,
      details: updatedDetails,
    });
  };

  const handleNewDetailChange = (index: number, value: string) => {
    if (!newService.details) return;
    
    const updatedDetails = [...newService.details];
    updatedDetails[index] = value;
    
    setNewService({
      ...newService,
      details: updatedDetails,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Legal Services</h2>
          <p className="text-muted-foreground">
            Manage your service offerings and pricing.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-legal-navy hover:bg-legal-navy/80">
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Add a new service to your offerings. Fill in all the required fields.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serviceCategory" className="text-right">
                  Category
                </Label>
                <Select 
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="litigation">Litigation</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="business">Business Law</SelectItem>
                    <SelectItem value="estate">Estate Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serviceTitle" className="text-right">
                  Title
                </Label>
                <Input
                  id="serviceTitle"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serviceDescription" className="text-right">
                  Description
                </Label>
                <Input
                  id="serviceDescription"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({ ...newService, description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="serviceDetails" className="text-right pt-2">
                  Details
                </Label>
                <div className="space-y-2 col-span-3">
                  {newService.details?.map((detail, index) => (
                    <Input
                      key={index}
                      placeholder={`Detail ${index + 1}`}
                      value={detail}
                      onChange={(e) => handleNewDetailChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="servicePrice" className="text-right">
                  Price
                </Label>
                <Input
                  id="servicePrice"
                  placeholder="e.g. $250/hour or $1,500 (flat fee)"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="servicePopular" className="text-right">
                  Popular
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <input
                    type="checkbox"
                    id="servicePopular"
                    checked={!!newService.popular}
                    onChange={(e) =>
                      setNewService({ ...newService, popular: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="servicePopular" className="text-sm font-normal">
                    Mark as a popular service
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>
                Make changes to your service offering.
              </DialogDescription>
            </DialogHeader>
            {editingService && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editTitle" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="editTitle"
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editDescription" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="editDescription"
                    value={editingService.description}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="editDetails" className="text-right pt-2">
                    Details
                  </Label>
                  <div className="space-y-2 col-span-3">
                    {editingService.details.map((detail, index) => (
                      <Input
                        key={index}
                        value={detail}
                        onChange={(e) => handleDetailChange(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editPrice" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="editPrice"
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({ ...editingService, price: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editPopular" className="text-right">
                    Popular
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <input
                      type="checkbox"
                      id="editPopular"
                      checked={editingService.popular}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          popular: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="editPopular" className="text-sm font-normal">
                      Mark as a popular service
                    </Label>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingService(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateService}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="litigation" className="space-y-6" onValueChange={setSelectedCategory}>
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
        
        {Object.entries(services).map(([category, items]) => (
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
                  <CardFooter className="flex flex-col items-stretch gap-2">
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setEditingService({...service})}
                        className="flex-1"
                        variant="outline"
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button 
                        onClick={() => handleDeleteService(service.id)}
                        variant="destructive"
                        className="flex-1"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </div>
                    <Button className="w-full">Preview</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {items.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No services in this category yet.</p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  variant="outline"
                  className="mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add a service
                </Button>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-blue-700">Managing Your Services</h4>
                <p className="text-sm text-blue-600">
                  Services you add here will be visible to clients in their portal. Make sure to keep pricing and service details up to date.
                </p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
