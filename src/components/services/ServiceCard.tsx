
import { Check, Pencil, Trash2 } from "lucide-react";
import { Service } from "@/types/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  return (
    <Card className={`relative ${service.popular ? "border-legal-gold" : ""}`}>
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
            <p className="text-sm text-muted-foreground">
              Pricing may vary based on complexity
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(service)}
            className="flex-1"
            variant="outline"
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button
            onClick={() => onDelete(service.id)}
            variant="destructive"
            className="flex-1"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
        <Button className="w-full">Preview</Button>
      </CardFooter>
    </Card>
  );
}
