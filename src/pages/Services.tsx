import { useState } from "react";
import { Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Service, ServiceData } from "@/types/services";
import { ServicesList } from "@/components/services/ServicesList";
import { ServiceFormDialog } from "@/components/services/ServiceFormDialog";

// Sample service data - keep existing serviceData object the same

export default function Services() {
  const [services, setServices] = useState<ServiceData>(serviceData);
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

  const handleServiceChange = (
    field: keyof Service,
    value: string | boolean | string[]
  ) => {
    if (editingService) {
      setEditingService({ ...editingService, [field]: value });
    } else {
      setNewService({ ...newService, [field]: value });
    }
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
        <Button 
          className="bg-legal-navy hover:bg-legal-navy/80"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <ServiceFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        service={newService}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSave={handleAddService}
        onServiceChange={handleServiceChange}
        mode="add"
      />

      <ServiceFormDialog
        isOpen={!!editingService}
        onOpenChange={(open) => !open && setEditingService(null)}
        service={editingService}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSave={handleUpdateService}
        onServiceChange={handleServiceChange}
        mode="edit"
      />

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
            <ServicesList
              services={items}
              onEdit={setEditingService}
              onDelete={handleDeleteService}
              onAdd={() => setIsAddDialogOpen(true)}
            />
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
