'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import CreateWorkspace from '@/components/workspace/CreateWorkspace';
import { ChevronRight } from "lucide-react";

export default function Sidebar({ url }) {
  const [auth, setAuth] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem('auth')));
    const workspacesData = JSON.parse(localStorage.getItem('workspaces')) || [];
    setWorkspaces(workspacesData);

    const handleStorageChange = () => {
      const updatedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      setWorkspaces(updatedWorkspaces);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isSheetOpen]);

  const handleWorkspaceAdded = (newWorkspace) => {
    const updatedWorkspaces = [...workspaces, newWorkspace];
    setWorkspaces(updatedWorkspaces);
    localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces));
  };

  return (
    <nav className="flex flex-col w-full bg-white overflow-y-auto">
      <ul className="flex flex-col gap-y-8 pl-6">
        {/* Navigation */}
        <li className="mt-2">
          <a href="/" className={cn('group flex items-center gap-x-3 rounded-md p-3 text-xl font-extrabold leading-relaxed pl-1 mt-5', url === '/' ? 'bg-[#CCDAF1] text-blue-800' : 'text-foreground hover:bg-gray-100')}>
            <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742279884/logo_ovq2n3.svg" className="w-10 h-10" alt="Scheduro Logo" />
            <span className="leading-none">Scheduro</span>
          </a>
        </li>

        <li>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className={cn('group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed', url?.startsWith('/dashboard') ? 'bg-[#CCDAF1] text-blue-800' : 'text-foreground hover:bg-gray-100')}>
                <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742273460/icon-home_ks1yym.svg" className="w-6 h-6" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/my-tasks" className={cn('group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed', url?.startsWith('/my-tasks') ? 'bg-[#CCDAF1] text-blue-800' : 'text-foreground hover:bg-gray-100')}>
                <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742270944/tasks_dic2lo.svg" className="w-6 h-6" />
                My Tasks
              </a>
            </li>
            <li>
              <a href="/logout" className={cn('group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed', url?.startsWith('/logout') ? 'bg-[#CCDAF1] text-blue-800' : 'text-foreground hover:bg-gray-100')}>
                <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742270927/logout_jbrths.svg" className="w-6 h-6" />
                Logout
              </a>
            </li>
          </ul>
        </li>

        {/* Workspaces Section */}
        <li>
          <div className="py-0 flex items-center justify-between">
            <div className="py-2 text-sm font-semibold leading-relaxed text-foreground">WORKSPACES</div>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild></SheetTrigger>
              <CreateWorkspace onClose={() => setIsSheetOpen(false)} onWorkspaceAdded={handleWorkspaceAdded} />
            </Sheet>
          </div>

          {/* Workspace List */}
          <ul className="mt-1 space-y-2">
            {workspaces.map((workspace) => (
              <li key={workspace.slug}>
                <a
                  href={`/workspaces/${workspace.slug}`}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-md p-3 text-sm font-semibold leading-relaxed',
                    url?.includes(`/workspaces/${workspace.slug}`) ? 'bg-[#E2EAF7] text-blue-800' : 'text-foreground hover:bg-gray-100'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border bg-[#AAC3E6] text-[0.625rem] font-medium border-foreground text-foreground">{workspace.name?.charAt(0) || 'W'}</span>
                    <span className="truncate">{workspace.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* User Profile */}
        <li className="mt-auto">
          {auth && (
            <a href="#" className={cn('flex items-center gap-4 px-6 py-3 text-sm font-semibold leading-relaxed', 'text-foreground hover:bg-gray-100')}>
              <Avatar>
                <AvatarFallback>{auth.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <span>{auth.name || 'User'}</span>
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}