
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
import { Check, Calendar } from "lucide-react";

// This would typically be fetched from an API
// Using the same structure as the attorney page for now
const services = {
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
  ],
};

export default function ClientServices() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Legal Services</h2>
        <p className="text-muted-foreground">
          Available legal services and pricing information.
        </p>
      </div>

      <Tabs defaultValue="litigation" className="space-y-6">
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
                  <CardFooter>
                    <Button className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Consultation
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
    </div>
  );
}
