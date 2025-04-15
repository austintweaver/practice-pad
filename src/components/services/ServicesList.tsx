
import { Service } from "@/types/services";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

interface ServicesListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export function ServicesList({
  services,
  onEdit,
  onDelete,
  onAdd,
}: ServicesListProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No services in this category yet.</p>
        <Button onClick={onAdd} variant="outline" className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Add a service
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
