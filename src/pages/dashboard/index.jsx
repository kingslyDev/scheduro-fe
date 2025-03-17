import AppLayout from '@/components/layouts/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserCircle, Briefcase, ClipboardList, CheckCircle } from 'lucide-react';

const data = [
  { week: 'Week 1', todo: 3, ongoing: 6, done: 4 },
  { week: 'Week 2', todo: 8, ongoing: 7, done: 3 },
  { week: 'Week 3', todo: 4, ongoing: 4, done: 3 },
  { week: 'Week 4', todo: 2, ongoing: 3, done: 5 }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="col-span-1 md:col-span-3 space-y-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="w-full h-24 flex items-center justify-start p-3">
            <CardContent className="p-4 flex items-center space-x-3 w-full">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <Briefcase className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium">Workspace</p>
                <p className="text-l">10</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full h-24 flex items-center justify-start p-3">
            <CardContent className="p-4 flex items-center space-x-3 w-full">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <ClipboardList className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium">My Tasks</p>
                <p className="text-l">22</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full h-24 flex items-center justify-start p-3 self-end">
            <CardContent className="p-4 flex items-center space-x-3 w-full">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <CheckCircle className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium">My Tasks Done</p>
                <p className="text-l">8</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md w-full text-center h-[380px]">
          <h2 className="text-lg font-medium mt-8 text-center">Productivity Chart</h2>
          <ResponsiveContainer width="100%" height={250} className="mx-auto">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ marginTop: "10px" }} />
              <Bar dataKey="todo" fill="#1E3A8A" name="To do" />
              <Bar dataKey="ongoing" fill="#3B82F6" name="Ongoing" />
              <Bar dataKey="done" fill="#93C5FD" name="Done" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="col-span-1 space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <UserCircle className="h-12 w-12 mx-auto" />
          <p className="text-lg font-medium">Alex Tan</p>
          <p className="text-sm text-gray-500">alextan@gmail.com</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-center">Your To Do List</h3>
          <ul className="mt-2 space-y-2">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="flex flex-col p-2 bg-white rounded-md shadow space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">📄</span>
                  <span className="font-medium">Build Tailwind CSS</span>
                </div>
                <span className="text-sm text-gray-500">9 Maret 2025</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = (page) => <AppLayout title="Dashboard">{page}</AppLayout>;
