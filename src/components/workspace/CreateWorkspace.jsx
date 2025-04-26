import React, { useState, useEffect } from 'react';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { PiPlus } from 'react-icons/pi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { PRIORITY } from '@/lib/utils';

export default function CreateWorkspace({ onWorkspaceAdded }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    priority: PRIORITY.HIGH,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) handleReset();
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!data.name.trim()) {
      setErrors({ name: 'Workspace title is required' });
      return;
    }

    const validPriority = Object.values(PRIORITY).includes(data.priority) ? data.priority : PRIORITY.MEDIUM;
    const newWorkspace = {
      id: Date.now(),
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      priority: validPriority,
    };

    const existingWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    existingWorkspaces.push(newWorkspace);
    localStorage.setItem('workspaces', JSON.stringify(existingWorkspaces));

    onWorkspaceAdded(newWorkspace);
    toast.success('Workspace created successfully');
    setOpen(false);
  };

  const handleReset = () => {
    setData({ name: '', priority: PRIORITY.HIGH });
    setErrors({});
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-500">
          <PiPlus className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 !max-w-full rounded-l-2xl p-6 bg-gray-50 border-l shadow-xl">
        <SheetHeader className="mb-1 md:-ml-4">
          <SheetTitle className="text-l font-semibold text-black">Add Workspace</SheetTitle>
          <p className="text-sm text-muted-foreground">Add new workspace</p>
        </SheetHeader>

        <div className="-mt-3 flex justify-center">
          <Image src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741447763/buku_yxhzod.png" width={300} height={200} alt="Workspace Illustration" className="w-full max-w-xs" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-0">
          <div>
            <InputLabel htmlFor="name" value="Title" className="text-sm font-medium" />
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Enter title"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              autoFocus
              className={`mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-blue-300'}`}
            />
            {errors.name && <InputError message={errors.name} />}
          </div>

          <div>
            <InputLabel htmlFor="priority" value="Priority" className="text-sm font-medium" />
            <Select value={data.priority} onValueChange={(value) => setData({ ...data, priority: value })}>
              <SelectTrigger className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PRIORITY.URGENT}>Urgent</SelectItem>
                <SelectItem value={PRIORITY.HIGH}>High</SelectItem>
                <SelectItem value={PRIORITY.MEDIUM}>Medium</SelectItem>
                <SelectItem value={PRIORITY.LOW}>Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="outline" className="bg-gray-300 text-gray-700 cursor-pointer" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-400 cursor-pointer">
              Save
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
