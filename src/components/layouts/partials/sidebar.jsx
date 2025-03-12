"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PiHouse, PiLockKeyOpen, PiSquaresFour, PiPlus } from "react-icons/pi";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CreateWorkspace from "@/components/CreateWorkspace";
import GetPriorityBadge from "@/components/GetPriorityBadge";
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { PiHouse, PiLockKeyOpen, PiSquaresFour } from 'react-icons/pi';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import CreateWorkspace from '@/components/workspace/CreateWorkspace';

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

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7">
        {/* Navigation */}
        <li>
          <ul className="-mx-2 space-y-2">
            <li>
              <a
                href="/dashboard"
                className={cn(
                  url?.startsWith("/dashboard")
                    ? "bg-blue-300 text-white"
                    : "text-foreground hover:bg-gray-100",
                  "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed"
                )}
              >
                <PiHouse className="h-6 w-6 shrink-0" />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/my-tasks"
                className={cn(
                  url?.startsWith("/my-tasks")
                    ? "bg-blue-300 text-white"
                    : "text-foreground hover:bg-gray-100",
                  "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed"
                )}
              >
                <PiSquaresFour className="h-6 w-6 shrink-0" />
                My Tasks
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="group flex w-full gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
              >
                <PiLockKeyOpen className="h-6 w-6 shrink-0" />
                Logout
              </button>
            </li>
          </ul>
        </li>

        {/* Workspaces Section */}
        <li>
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase leading-relaxed text-foreground">
              Workspaces
            </div>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild></SheetTrigger>
              <CreateWorkspace
                onClose={() => setIsSheetOpen(false)}
                onWorkspaceAdded={handleWorkspaceAdded}
              />
            </Sheet>
          </div>

          {/* Workspace List */}
          <ul className="-mx-2 mt-2 space-y-2">
            {workspaces.map((workspace) => (
              <li key={workspace.slug}>
                <a
                  href={`/workspaces/${workspace.slug}`}
                  className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium border-foreground text-foreground">
                      {workspace.name?.charAt(0) || "W"}
                    </span>
                    <span className="truncate">{workspace.name}</span>
                  </div>
                  <GetPriorityBadge priority={workspace.priority || "LOW"} />
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* User Profile */}
        <li className="-mx-6 mt-auto">
          {auth && (
            <a
              href="#"
              className="flex items-center gap-4 px-6 py-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
            >
              <Avatar>
                <AvatarFallback>{auth.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span>{auth.name || "User"}</span>
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}
