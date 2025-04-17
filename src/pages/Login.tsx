
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("attorney");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, always succeed login and redirect
      toast({
        title: "Logged in successfully",
        description: `Welcome back to the ${userType === "attorney" ? "attorney" : "client"} portal`,
      });
      
      // Redirect based on user type
      if (userType === "attorney") {
        navigate("/"); // Attorney dashboard
      } else {
        navigate("/client"); // Client dashboard
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center mb-8 text-sm">
          ← Back to home
        </Link>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Access your account to manage your legal practice or view your case information
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="attorney" onValueChange={setUserType}>
            <TabsList className="grid grid-cols-2 mx-6">
              <TabsTrigger value="attorney">Attorney</TabsTrigger>
              <TabsTrigger value="client">Client</TabsTrigger>
            </TabsList>
            
            <CardContent className="pt-6">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardFooter className="flex flex-col space-y-2 px-0 pt-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>
                  
                  <TabsContent value="attorney" className="mt-2 p-0">
                    <div className="text-sm text-center space-y-2">
                      <Link to="/forgot-password" className="text-primary hover:underline">
                        Forgot password?
                      </Link>
                      <p>
                        Don't have an account?{" "}
                        <Link to="/attorney/signup" className="text-primary hover:underline">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="client" className="mt-2 p-0">
                    <div className="text-sm text-center space-y-2">
                      <Link to="/forgot-password" className="text-primary hover:underline">
                        Forgot password?
                      </Link>
                      <p>
                        Need an account?{" "}
                        <span className="text-muted-foreground">
                          Contact your attorney for access
                        </span>
                      </p>
                    </div>
                  </TabsContent>
                </CardFooter>
              </form>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
