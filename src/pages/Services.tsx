
import { Check, Info } from "lucide-react";
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

// Sample service data
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

export default function Services() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Legal Services</h2>
        <p className="text-muted-foreground">
          Explore our range of legal services and expertise.
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
                  <CardFooter className="flex flex-col items-stretch gap-2">
                    <Button className="w-full">Schedule Consultation</Button>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-blue-700">Need a custom service?</h4>
                <p className="text-sm text-blue-600">
                  We offer tailored legal solutions for complex cases. Contact us for a personalized consultation to discuss your specific legal needs.
                </p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
