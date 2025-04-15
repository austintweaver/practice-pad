import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  FileText,
  Users,
  Book,
  Home,
  X,
  ChevronRight,
  ListTodo,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: <ListTodo className="h-5 w-5" />,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: "Clients",
    path: "/clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Services",
    path: "/services",
    icon: <Book className="h-5 w-5" />,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out h-screen",
        isCollapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="font-semibold text-lg">ClientCounsel</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 py-6">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/20"
              )}
            >
              <div className="flex items-center">
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-medium">
              AT
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Attorney Name</div>
              <div className="text-xs opacity-70">attorney@example.com</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
