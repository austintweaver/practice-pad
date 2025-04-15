
import { Service } from "@/types/services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  service: Partial<Service> | null;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSave: () => void;
  onServiceChange: (
    field: keyof Service,
    value: string | boolean | string[]
  ) => void;
  mode: "add" | "edit";
}

export function ServiceFormDialog({
  isOpen,
  onOpenChange,
  service,
  selectedCategory,
  onCategoryChange,
  onSave,
  onServiceChange,
  mode,
}: ServiceFormDialogProps) {
  const handleDetailChange = (index: number, value: string) => {
    if (!service?.details) return;
    const updatedDetails = [...service.details];
    updatedDetails[index] = value;
    onServiceChange("details", updatedDetails);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Service" : "Edit Service"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Add a new service to your offerings. Fill in all the required fields."
              : "Make changes to your service offering."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceCategory" className="text-right">
              Category
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={onCategoryChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="litigation">Litigation</SelectItem>
                <SelectItem value="family">Family Law</SelectItem>
                <SelectItem value="business">Business Law</SelectItem>
                <SelectItem value="estate">Estate Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceTitle" className="text-right">
              Title
            </Label>
            <Input
              id="serviceTitle"
              value={service?.title || ""}
              onChange={(e) => onServiceChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceDescription" className="text-right">
              Description
            </Label>
            <Input
              id="serviceDescription"
              value={service?.description || ""}
              onChange={(e) => onServiceChange("description", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="serviceDetails" className="text-right pt-2">
              Details
            </Label>
            <div className="space-y-2 col-span-3">
              {service?.details?.map((detail, index) => (
                <Input
                  key={index}
                  placeholder={`Detail ${index + 1}`}
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servicePrice" className="text-right">
              Price
            </Label>
            <Input
              id="servicePrice"
              placeholder="e.g. $250/hour or $1,500 (flat fee)"
              value={service?.price || ""}
              onChange={(e) => onServiceChange("price", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servicePopular" className="text-right">
              Popular
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <input
                type="checkbox"
                id="servicePopular"
                checked={service?.popular || false}
                onChange={(e) =>
                  onServiceChange("popular", e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="servicePopular" className="text-sm font-normal">
                Mark as a popular service
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {mode === "add" ? "Add Service" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
