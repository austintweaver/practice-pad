
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Users, FileText, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Legal Practice Management
            <span className="block text-muted-foreground mt-2">Simplified</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your legal practice with secure client communication, document management, and service delivery.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <MessageSquare className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Real-Time Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure messaging between attorneys and clients with instant notifications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <FileText className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Document Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organize and share legal documents securely with role-based access.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <Users className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Client Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dedicated space for clients to view services and track case progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join other law firms who have streamlined their practice management.
          </p>
          <Button size="lg" className="min-w-[200px]">
            Create Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

