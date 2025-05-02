
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock team members data
const teamMembers = [
  { id: 1, name: "Jane Doe", role: "Attorney" },
  { id: 2, name: "John Smith", role: "Attorney" },
  { id: 3, name: "Sarah Wilson", role: "Paralegal" },
];

const CreateClientAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    notes: "",
    sendInvite: true,
    accessLevel: "standard",
    assignedTeamMembers: [] as number[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, sendInvite: checked }));
  };

  const handleTeamMemberSelect = (memberId: number) => {
    setFormData((prev) => {
      const currentMembers = [...prev.assignedTeamMembers];
      
      if (currentMembers.includes(memberId)) {
        return {
          ...prev,
          assignedTeamMembers: currentMembers.filter(id => id !== memberId)
        };
      } else {
        return {
          ...prev,
          assignedTeamMembers: [...currentMembers, memberId]
        };
      }
    });
  };

  const handleAccessLevelChange = (value: string) => {
    setFormData((prev) => ({ ...prev, accessLevel: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock client creation process
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Client account created",
        description: formData.sendInvite
          ? `An invitation has been sent to ${formData.email}. They will be prompted to set up a password upon first login.`
          : "The client account has been created without sending an invitation.",
      });
      
      navigate("/clients");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Client Account</CardTitle>
          <CardDescription>
            Add a new client to your practice. An email invitation will be sent to the client with instructions to set up their password.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select onValueChange={handleAccessLevelChange} defaultValue={formData.accessLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limited">Limited Access</SelectItem>
                    <SelectItem value="standard">Standard Access</SelectItem>
                    <SelectItem value="full">Full Access</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Determines what the client can view and access in their portal
                </p>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Assign Team Members</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`member-${member.id}`} 
                        checked={formData.assignedTeamMembers.includes(member.id)}
                        onCheckedChange={() => handleTeamMemberSelect(member.id)}
                      />
                      <Label htmlFor={`member-${member.id}`} className="flex-1 cursor-pointer">
                        {member.name}
                        <span className="text-xs text-muted-foreground ml-2">
                          {member.role}
                        </span>
                      </Label>
                    </div>
                  ))}
                  
                  <div className="pt-2 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => navigate("/team/new")}
                    >
                      Add New Team Member
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional information about this client..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex items-center space-x-2 md:col-span-2">
                <Checkbox 
                  id="sendInvite" 
                  checked={formData.sendInvite} 
                  onCheckedChange={handleCheckboxChange} 
                />
                <Label htmlFor="sendInvite" className="text-sm cursor-pointer">
                  Send email invitation to client (they will set up their password on first login)
                </Label>
              </div>
            </div>
            
            <CardFooter className="flex justify-end space-x-2 px-0 pt-6">
              <Button variant="outline" type="button" onClick={() => navigate("/clients")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
                {isLoading ? "Creating..." : "Create Client Account"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateClientAccount;
