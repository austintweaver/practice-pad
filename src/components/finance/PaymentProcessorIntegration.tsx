
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";

type PaymentProcessor = "stripe" | "square" | "lawpay" | "paypal";

export function PaymentProcessorIntegration() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [processor, setProcessor] = useState<PaymentProcessor>("stripe");
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // In a real app, this would securely store the API key and connect to the payment processor
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Payment processor connected",
        description: `Your ${processorName(processor)} account has been successfully connected.`,
      });
      setApiKey("");
    }, 1500);
  };

  const processorName = (processor: PaymentProcessor): string => {
    switch (processor) {
      case "stripe": return "Stripe";
      case "square": return "Square";
      case "lawpay": return "LawPay";
      case "paypal": return "PayPal";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Processor</CardTitle>
        <CardDescription>
          Connect your payment processor to accept payments from clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Connect Payment Processor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Payment Processor</DialogTitle>
              <DialogDescription>
                Choose your payment processor and provide API credentials
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleConnect}>
              <div className="py-4">
                <RadioGroup value={processor} onValueChange={(value) => setProcessor(value as PaymentProcessor)} className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label htmlFor="stripe">Stripe</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="square" id="square" />
                    <Label htmlFor="square">Square</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="lawpay" id="lawpay" />
                    <Label htmlFor="lawpay">LawPay</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => null}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isConnecting}>
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
