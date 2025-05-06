
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, MessageSquare, Calendar, BarChart3, ArrowRight, Check } from "lucide-react";

const Home = () => {
  // Scroll to pricing section function
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return <div className="min-h-screen bg-background">
      {/* Navigation Buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-3">
        <Button variant="ghost" onClick={scrollToPricing} className="bg-white/70 backdrop-blur-sm hover:bg-white/90">
          Pricing
        </Button>
        <Button variant="ghost" className="bg-white/70 backdrop-blur-sm hover:bg-white/90">
          Contact
        </Button>
        <Button asChild variant="default" className="bg-red-600 hover:bg-red-700">
          <Link to="/login">Login</Link>
        </Button>
      </div>
      
      {/* Enhanced Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-50/70 to-white z-0"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 left-40 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-56 h-56 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Content */}
        <div className="container relative mx-auto px-4 pt-20 pb-24 flex flex-col items-center z-10">
          <div className="text-center max-w-2xl">
            <div className="text-sm font-medium text-red-600 mb-2 tracking-wider">CLIENT MANAGEMENT SIMPLIFIED</div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
              Client Clubhouse
              <span className="block text-2xl md:text-3xl font-bold mt-2 text-gray-700">For Modern Professionals</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700 max-w-lg mx-auto">
              A secure, elegant platform for professionals to manage clients, documents, and services with dedicated client portals for seamless collaboration.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="min-w-[160px] bg-red-600 hover:bg-red-700">
                <Link to="/professional/signup">Create Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[160px] border-red-600 text-red-600 hover:bg-red-50">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-[60px]">
            <path 
              fill="#FFFFFF" 
              fillOpacity="1" 
              d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,48C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z">
            </path>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={<Shield className="h-10 w-10 text-red-600" />} title="Secure Client Portal" description="Provide clients with secure access to case information, documents, and communication." />
            <FeatureCard icon={<Users className="h-10 w-10 text-red-600" />} title="Client Management" description="Easily manage client relationships and create client accounts with appropriate access controls." />
            <FeatureCard icon={<FileText className="h-10 w-10 text-red-600" />} title="Document Management" description="Securely store, share, and collaborate on legal documents with clients." />
            <FeatureCard icon={<MessageSquare className="h-10 w-10 text-red-600" />} title="Secure Messaging" description="Communicate with clients in a secure environment, maintaining professional-client privilege." />
            <FeatureCard icon={<Calendar className="h-10 w-10 text-red-600" />} title="Calendar & Scheduling" description="Manage appointments, deadlines, and important dates in one central location." />
            <FeatureCard icon={<BarChart3 className="h-10 w-10 text-red-600" />} title="Reporting & Analytics" description="Gain insights into your practice with comprehensive reporting tools." />
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="pricing-section" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Subscription Plans</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose the plan that fits your practice needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Basic" 
              price="$25" 
              description="Perfect for solo practitioners" 
              features={[
                "Up to 25 client accounts", 
                "Document management", 
                "Secure messaging", 
                "Basic calendar", 
                "Email support",
                "+$10/month per additional professional"
              ]} 
              buttonText="Get Started" 
              buttonLink="/professional/signup?plan=basic" 
            />
            
            <PricingCard 
              title="Professional" 
              price="$50" 
              description="Ideal for small firms" 
              features={[
                "Up to 100 client accounts", 
                "All Basic features", 
                "Advanced reporting", 
                "Custom branding", 
                "Custom URL (yourname.clientclubhouse.com)", 
                "Priority support",
                "+$10/month per additional professional"
              ]} 
              buttonText="Get Started" 
              buttonLink="/professional/signup?plan=professional" 
              highlighted={true} 
            />
            
            <PricingCard 
              title="Enterprise" 
              price="$150" 
              description="For established practices" 
              features={[
                "Unlimited client accounts", 
                "All Professional features", 
                "Custom branding", 
                "Custom URL (yourname.clientclubhouse.com)", 
                "Phone support", 
                "Team management"
              ]} 
              buttonText="Get Started" 
              buttonLink="/professional/signup?plan=enterprise" 
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Join other professionals and firms who have streamlined their practice management.</p>
          <Button asChild size="lg" variant="secondary" className="min-w-[200px]">
            <Link to="/professional/signup">Create Account</Link>
          </Button>
        </div>
      </section>
    </div>;
};

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => <Card className="border hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <div className="text-primary mb-4">{icon}</div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>;

// Pricing Card Component
const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
}) => <Card className={`border ${highlighted ? 'border-red-600 shadow-lg relative' : ''}`}>
    {highlighted && <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
        Most Popular
      </div>}
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <div className="text-4xl font-bold my-4">
        {price}<span className="text-base text-muted-foreground font-normal"> /month</span>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {features.map((feature, index) => <li key={index} className="flex items-center">
            <Check className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-sm">{feature}</span>
          </li>)}
      </ul>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full" variant={highlighted ? "default" : "outline"} 
        style={highlighted ? {backgroundColor: "#ea384c", borderColor: "#ea384c"} : {borderColor: "#ea384c", color: "#ea384c"}}>
        <Link to={buttonLink} className="flex items-center justify-center">
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>;

export default Home;
