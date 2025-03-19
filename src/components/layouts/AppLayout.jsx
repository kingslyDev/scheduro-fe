import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/sonner';
import { Dialog, Transition } from '@headlessui/react';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import { PiSidebar, PiX } from 'react-icons/pi';
import Sidebar from '../layouts/partials/sidebar';

export default function AppLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const [url, setUrl] = useState('');
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedWorkspaces = localStorage.getItem('workspaces');
    const storedUrl = window.location.pathname;

    if (storedAuth) setAuth(JSON.parse(storedAuth));
    if (storedWorkspaces) setWorkspaces(JSON.parse(storedWorkspaces));
    setUrl(storedUrl);
  }, []);

  return (
    <>
      <Head>
  <title>{title ? `${title} - Scheduro` : 'Scheduro'}</title>
</Head>

      <Toaster position="top-center" richColors />
      <div>
        {/* SIDEBAR MOBILE */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 lg:hidden" onClose={setSidebarOpen}>
            {/* Overlay gelap */}
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                {/* Sidebar */}
                <Dialog.Panel className="relative w-[80%] max-w-xs bg-white dark:bg-gray-900 shadow-lg">
                  {/* Tombol Close */}
                  <div className="absolute right-2 top-2">
                    <button type="button" className="p-2 text-white" onClick={() => setSidebarOpen(false)}>
                      <PiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Sidebar Content */}
                  <div className="h-full overflow-y-auto p-4">
                    <Sidebar auth={auth} url={url} workspaces={workspaces} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* SIDEBAR DESKTOP */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex h-16 shrink-0 items-center justify-center space-x-1.5">
              <Link href="/" className="-m-1.5 p-1.5 mt-5">
                <img src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741442563/sidebarlogo_xx2gbf.png" alt="Scheduro logo" className="inline-block w-auto h-8" />
              </Link>
            </div>
            <Sidebar auth={auth} url={url} workspaces={workspaces} />
          </div>
        </div>

        {/* NAVBAR MOBILE */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm dark:bg-gray-900 sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <PiSidebar className="h-6 w-6 text-foreground" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-relaxed tracking-tighter text-foreground">{title}</div>
          <Link href="#">
            <span className="sr-only">Your profile</span>
            <Avatar>
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* CONTENT AREA */}
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
