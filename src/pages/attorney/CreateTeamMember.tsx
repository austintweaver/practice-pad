
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
import { useToast } from "@/hooks/use-toast";

const CreateTeamMember = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "attorney",
    permissions: {
      clients: true,
      documents: true,
      messaging: true,
      finances: false,
      settings: false,
    },
    sendInvite: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    let newPermissions = { ...formData.permissions };

    // Set default permissions based on role
    if (value === "attorney") {
      newPermissions = {
        clients: true,
        documents: true,
        messaging: true,
        finances: true,
        settings: false,
      };
    } else if (value === "paralegal") {
      newPermissions = {
        clients: true,
        documents: true,
        messaging: true,
        finances: false,
        settings: false,
      };
    } else if (value === "admin") {
      newPermissions = {
        clients: true,
        documents: true,
        messaging: true,
        finances: true,
        settings: true,
      };
    } else {
      newPermissions = {
        clients: false,
        documents: false,
        messaging: false,
        finances: false,
        settings: false,
      };
    }

    setFormData((prev) => ({ 
      ...prev, 
      role: value,
      permissions: newPermissions
    }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const handleSendInviteChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, sendInvite: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock team member creation process
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Team member added",
        description: formData.sendInvite
          ? `An invitation has been sent to ${formData.email}. They will be prompted to set up a password upon first login.`
          : "The team member account has been created without sending an invitation.",
      });
      
      navigate("/clients");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Team Member</CardTitle>
          <CardDescription>
            Create an account for a new team member to collaborate on your cases
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
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={handleRoleChange} defaultValue={formData.role}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attorney">Attorney</SelectItem>
                    <SelectItem value="paralegal">Paralegal</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="staff">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Permissions</Label>
                <div className="border rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="perm-clients" 
                      checked={formData.permissions.clients}
                      onCheckedChange={(checked) => 
                        handlePermissionChange("clients", checked === true)
                      }
                    />
                    <Label htmlFor="perm-clients" className="cursor-pointer">
                      Access Clients
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="perm-documents" 
                      checked={formData.permissions.documents}
                      onCheckedChange={(checked) => 
                        handlePermissionChange("documents", checked === true)
                      }
                    />
                    <Label htmlFor="perm-documents" className="cursor-pointer">
                      Manage Documents
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="perm-messaging" 
                      checked={formData.permissions.messaging}
                      onCheckedChange={(checked) => 
                        handlePermissionChange("messaging", checked === true)
                      }
                    />
                    <Label htmlFor="perm-messaging" className="cursor-pointer">
                      Client Messaging
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="perm-finances" 
                      checked={formData.permissions.finances}
                      onCheckedChange={(checked) => 
                        handlePermissionChange("finances", checked === true)
                      }
                    />
                    <Label htmlFor="perm-finances" className="cursor-pointer">
                      Financial Access
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="perm-settings" 
                      checked={formData.permissions.settings}
                      onCheckedChange={(checked) => 
                        handlePermissionChange("settings", checked === true)
                      }
                    />
                    <Label htmlFor="perm-settings" className="cursor-pointer">
                      Account Settings
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:col-span-2">
                <Checkbox 
                  id="sendInvite" 
                  checked={formData.sendInvite} 
                  onCheckedChange={(checked) => 
                    handleSendInviteChange(checked === true)
                  } 
                />
                <Label htmlFor="sendInvite" className="text-sm cursor-pointer">
                  Send email invitation (they will set up their password on first login)
                </Label>
              </div>
            </div>
            
            <CardFooter className="flex justify-end space-x-2 px-0 pt-6">
              <Button variant="outline" type="button" onClick={() => navigate("/clients")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
                {isLoading ? "Adding..." : "Add Team Member"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTeamMember;
