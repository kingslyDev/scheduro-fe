import { useState, useEffect } from 'react';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { PiPlus } from 'react-icons/pi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

export default function CreateWorkspace({ onWorkspaceAdded }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    statusWorkspace: 'On Track',
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

    const newWorkspace = {
      id: Date.now(),
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      statusWorkspace: data.statusWorkspace,
    };

    const existingWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    existingWorkspaces.push(newWorkspace);
    localStorage.setItem('workspaces', JSON.stringify(existingWorkspaces));

    onWorkspaceAdded(newWorkspace);
    toast.success('Workspace created successfully');
    setOpen(false);
  };

  const handleReset = () => {
    setData({ name: '', statusWorkspace: 'On Track' });
    setErrors({});
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-medium hover:text-blue-500">
          <PiPlus className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-1/2 !max-w-[50%] rounded-l-2xl p-8 bg-gray-50 border-l shadow-xl">
        <SheetHeader className="mb-6">
          <p className="text-sm text-gray-500">Add new workspace</p>
        </SheetHeader>

        <div className="flex justify-center">
          <Image src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741447763/buku_yxhzod.png" width={300} height={200} alt="Workspace Illustration" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
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
            <InputLabel htmlFor="status" value="Status" className="text-sm font-medium" />
            <Select value={data.statusWorkspace} onValueChange={(value) => setData({ ...data, statusWorkspace: value })}>
              <SelectTrigger className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="On Track">On Track</SelectItem>
                <SelectItem value="At Risk">At Risk</SelectItem>
                <SelectItem value="Off Track">Off Track</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" className="bg-gray-300 text-gray-700" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-300 text-white hover:bg-blue-700">
              Save
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
