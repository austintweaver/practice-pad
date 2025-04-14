
import { BellIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-muted/30 border-none rounded-lg focus-visible:ring-1 w-full md:w-[300px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
