"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CreateWorkspace from "@/components/workspace/CreateWorkspace";
import {
  Home,
  CheckSquare,
  Plus,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ url }) {
  const [auth, setAuth] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
    const workspacesData = JSON.parse(localStorage.getItem("workspaces")) || [];
    setWorkspaces(workspacesData);

    const handleStorageChange = () => {
      const updatedWorkspaces =
        JSON.parse(localStorage.getItem("workspaces")) || [];
      setWorkspaces(updatedWorkspaces);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isSheetOpen]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const handleWorkspaceAdded = (newWorkspace) => {
    const updatedWorkspaces = [...workspaces, newWorkspace];
    setWorkspaces(updatedWorkspaces);
    localStorage.setItem("workspaces", JSON.stringify(updatedWorkspaces));
  };

  // Generate a color based on workspace name for consistent colors
  const getWorkspaceColor = (name) => {
    const colors = ["bg-blue-300 text-blue-800"];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-border">
      <div className="flex items-center gap-x-3 p-4 border-b">
        <a
          href="/"
          className="flex items-center gap-x-3 rounded-md text-xl font-extrabold"
        >
          <img
            src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742279884/logo_ovq2n3.svg"
            className="w-8 h-8"
            alt="Scheduro Logo"
          />
          <span className="leading-none bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Scheduro
          </span>
        </a>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">
              NAVIGATION
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="/dashboard"
                  className={cn(
                    "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    url?.startsWith("/dashboard")
                      ? "bg-[#CCDAF1] text-blue-800"
                      : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                  )}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                  {url?.startsWith("/dashboard") && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  )}
                </a>
              </li>
              <li>
                <a
                  href="/my-tasks"
                  className={cn(
                    "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    url?.startsWith("/my-tasks")
                      ? "bg-[#CCDAF1] text-blue-800"
                      : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                  )}
                >
                  <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742270944/tasks_dic2lo.svg" alt="My Tasks" className="h-5 w-5" />
                  <span>My Tasks</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Workspaces Section */}
          <div>
            {console.log("Rendering Workspaces Section")} {/* Debugging */}
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xs font-medium text-muted-foreground">
                WORKSPACES
              </h3>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild></SheetTrigger>
                <CreateWorkspace
                  onClose={() => setIsSheetOpen(false)}
                  onWorkspaceAdded={handleWorkspaceAdded}
                />
              </Sheet>
            </div>
            {/* Workspace List */}
            <ul className="space-y-1">
              {workspaces.map((workspace) => (
                <li key={workspace.slug}>
                  <a
                    href={`/workspaces/${workspace.slug}`}
                    className={cn(
                      "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      url?.includes(`/workspaces/${workspace.slug}`)
                        ? "bg-[#CCDAF1] text-blue-800"
                        : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[0.625rem] font-medium",
                          getWorkspaceColor(workspace.name)
                        )}
                      >
                        {workspace.name?.charAt(0) || "W"}
                      </span>
                      <span className="truncate">{workspace.name}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </ScrollArea>

      {/* User Profile */}
      {auth && (
        <>
          <Separator />
          <div className="p-3">
            <div className="flex items-center justify-between rounded-md p-2 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {auth.name?.charAt(0) || "U"}
                  </AvatarFallback>
                  {auth.avatar && <AvatarImage src={auth.avatar} />}
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">
                    {auth.name || "User"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {auth.email || "user@example.com"}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
