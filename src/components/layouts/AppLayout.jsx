import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/sonner';
import { Dialog, Transition } from '@headlessui/react';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import { PiSidebar, PiX } from 'react-icons/pi';
import Sidebar from '../layouts/partials/sidebar';
import { Menu } from "lucide-react";

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
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed w-full inset-0 bg-white" />
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
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <PiX className="h-7 w-7 text-black" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <Sidebar auth={auth} url={url} workspaces={workspaces} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* SIDEBAR DESKTOP */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">

              {' '}
              {/* Centering added here
              <Link href="/" className="-m-1.5 p-1.5 mt-5">
                <img src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741442563/sidebarlogo_xx2gbf.png" alt="Plannify logo" className="inline-block w-auto h-10" />
              </Link> */}
            <Sidebar auth={auth} url={url} workspaces={workspaces} />
          </div>
        </div>

        {/* NAVBAR MOBILE */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm dark:bg-gray-900 sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-relaxed tracking-tighter text-foreground">{title}</div>
          <Link href="#">
            <span className="sr-only">Your profile</span>
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
